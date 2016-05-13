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
            String route = String.Empty;
            var project = Db.Context.Projects.Where(x => x.UrlCode == projectUrl).FirstOrDefault();
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
            Session["admission"] = new SafeAdmission
            {
                projectUrl = projectUrl,
                AccessType = project.PollAccess.Value
            };
            if (!String.IsNullOrEmpty(route))
                return RedirectToAction(route);
            return RedirectToAction("/", "Home");
        }

        public ActionResult SetCode()
        {
            var valid = (SafeAdmission)Session["admission"];
            if (valid != null && valid.AccessType==(Int32)DbEnum.PollAccess.CodeSet)
            {
                return View();
            }
            return RedirectToAction("/", "Home");
        }
        public ActionResult SetUser()
        {
            var valid = (SafeAdmission)Session["admission"];
            if (valid != null && valid.AccessType == (Int32)DbEnum.PollAccess.UserSet)
            {
                return View();
            }
            return RedirectToAction("/", "Home");
        }
        public ActionResult FreeLink()
        {

            var valid = (SafeAdmission)Session["admission"];
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
                        return RedirectToAction("Index", "Poll", new { poll = valid.projectUrl });
                    }
                }
            }
            return RedirectToAction("/", "Home");
        }
        public ActionResult ValidateCode(string access_code)
        {
            
            var valid = (SafeAdmission)Session["admission"];
            if(valid!=null && valid.AccessType == (Int32)DbEnum.PollAccess.CodeSet)
            {
                var project = Db.Context.Projects
                    .Join(Db.Context.ProjectAccessVoters, p => p.Id, pav => pav.ProjectId, (p, pav) => new { p, pav })
                    .Join(Db.Context.CodeSets, z => z.pav.CodeSetId, c => c.Id, (z, c) => new { z, c })
                    .Where(x => x.c.CodeText.Equals(access_code))
                    .Where(x => x.z.p.UrlCode.Equals(valid.projectUrl))
                    .Select(x => new { x.z.pav.Id })
                    .FirstOrDefault();
                if (project!=null)
                {
                    valid.UserIdentity=project.Id;
                    return RedirectToAction("Index", "Poll", new { poll = valid.projectUrl });
                }
                    
            }
            return Redirect("/");
        }
        public ActionResult NotExist()
        {
            return View();
        }
        public ActionResult ValidateUser(string email,string pass)
        {

            var valid = (SafeAdmission)Session["admission"];
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
