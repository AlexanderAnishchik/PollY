using PollyApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Data.Entity;
using PollyApp.Account;
using System.Net.Http.Headers;

namespace PollyApp.Controllers
{
    public class AdmissionController : Controller
    {
        public GenericRepository.Repository Db = new GenericRepository.Repository();
        public ActionResult RouteAccess(string projectUrl)
        {
            try {
                String route = String.Empty;
                var project = Db.Context.Projects.Where(x => x.UrlCode == projectUrl).First();
                switch (project.PollAccess.Value)
                {
                    case (Int32)DbEnum.PollAccess.CodeSet:
                        route = "SetCode";
                        break;
                    case (Int32)DbEnum.PollAccess.UserSet:
                        route = "SetUser";
                        break;
                    case (Int32)DbEnum.PollAccess.FreeLink:
                        route = "FreeLink";
                        break;
                    default:
                        break;
                }
                SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == projectUrl).FirstOrDefault();
                if (valid == null)
                {
                    ((List<SafeAdmission>)Session["admissions"]).Add(new SafeAdmission()
                    {
                        projectUrl = projectUrl,
                        AccessType = project.PollAccess.Value
                    });
                }
                if (!String.IsNullOrEmpty(route))
                    return RedirectToAction(route, new { projectUrl = projectUrl });
                return RedirectToAction("/", "Home");
            }
            catch(Exception ex)
            {
                return RedirectToAction("/", "Home");
            }
        }

        public ActionResult SetCode(string projectUrl, string error)
        {
            try
            {
				if (error != null && error != String.Empty)
				{
					ViewBag.Error = error;
				}
                SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == projectUrl).First();
                if (valid != null && valid.AccessType == (Int32)DbEnum.PollAccess.CodeSet)
                {
                    return View(valid);
                }
                return RedirectToAction("/", "Home");
            }
            catch(Exception ex)
            {
                return RedirectToAction("/", "Home");
            }
        }
        public ActionResult SetUser(string projectUrl)
        {
            try
            {
                SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == projectUrl).First();
                if (valid != null && valid.AccessType == (Int32)DbEnum.PollAccess.UserSet)
                {

                    return View((object)projectUrl);
                }
                return RedirectToAction("/", "Home");
            }
            catch (Exception ex)
            {
                return RedirectToAction("/", "Home");
            }
        }
        public ActionResult FreeLink(string projectUrl)
        {

            SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == projectUrl).First();
            if (valid != null && valid.AccessType == (Int32)DbEnum.PollAccess.FreeLink)
            {
                HttpCookie cookie = Request.Cookies[MemberWorker.GetAnonymousCookieName()];
                if (cookie == null)
                {
                    Response.SetCookie(MemberWorker.SetAnonymousCookie());
                    return RedirectToAction("Index", "Poll", new { poll = valid.projectUrl });
                }
                else {
                    var cookieData = cookie["Data"];
                    var project = Db.Context.Projects
                        .Join(Db.Context.ProjectAccessVoters, p => p.Id, pav => pav.ProjectId, (p, pav) => new { p, pav })
                        .Join(Db.Context.UserSets, z => z.pav.UserSetId, c => c.Id, (z, c) => new { z, c })
                        .Where(x => x.c.CookieValue.Equals(cookieData))
                        .Where(x => x.z.p.UrlCode.Equals(valid.projectUrl))
                        .Select(x => new { x.z.pav.Id })
                        .FirstOrDefault();
                    if (project == null)
                    {
                        valid.Status = true;
                        return RedirectToAction("Index", "Poll", new { poll = valid.projectUrl });
                    }
                }
            }
            return RedirectToAction("/", "Home");
        }
        public ActionResult ValidateCode(string access_code,string projectUrl)
        {

            SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == projectUrl).First();
            if (valid!=null && valid.AccessType == (Int32)DbEnum.PollAccess.CodeSet)
            {
                var project = Db.Context.Projects
                    .Join(Db.Context.ProjectAccessVoters, p => p.Id, pav => pav.ProjectId, (p, pav) => new { p, pav })
                    .Join(Db.Context.CodeSets, z => z.pav.CodeSetId, c => c.Id, (z, c) => new { z, c })
                    .Where(x => x.c.CodeText.Equals(access_code))
                    .Where(x => x.z.p.UrlCode.Equals(valid.projectUrl) && x.z.pav.IsUsed==false)
                    .Select(x => new { x.z.pav.Id })
                    .FirstOrDefault();
                if (project!=null)
                {
                    valid.UserIdentity=project.Id;
                    valid.Status = true;
                    return RedirectToAction("Index", "Poll", new { poll = valid.projectUrl });
                }
				else
				{
					return RedirectToAction("SetCode", "Admission", new { projectUrl = projectUrl, error = "Code has already been used or incorrect!" });
				}
                    
            }
            return Redirect("/");
        }
        public ActionResult ValidateUser(string email,string pass,string projectUrl)
        {

            SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == projectUrl).First();
            if (valid != null && valid.AccessType == (Int32)DbEnum.PollAccess.UserSet)
            {
                var project = Db.Context.Projects
                    .Join(Db.Context.ProjectAccessVoters, p => p.Id, pav => pav.ProjectId, (p, pav) => new { p, pav })
                    .Join(Db.Context.UserSets, z => z.pav.UserSetId, c => c.Id, (z, c) => new { z, c })
                     .Join(Db.Context.Users, u => u.c.UserId, s => s.Id, (z, c) => new { z, c })
                    .Where(x => x.c.Email.Equals(email))
                    .Where(x => x.z.z.p.UrlCode.Equals(valid.projectUrl))
                    .Select(x => new { UserSetId = x.z.z.pav.Id, User = x.c })
                    .FirstOrDefault();
                if (project!=null)
                {
                    var hasUser = MemberWorker.SignIn(email, pass);
                    if (hasUser== MemberWorker.LoginStatus.Success)
                    {
                        valid.UserIdentity = project.UserSetId;
                        valid.Status = true;
                        return RedirectToAction("Index", "Poll", new { poll = valid.projectUrl });
                    }
                }

            }
            return Redirect("/");
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}
