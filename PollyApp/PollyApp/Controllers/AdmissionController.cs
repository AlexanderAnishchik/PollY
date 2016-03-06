using PollyApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
                AccessType = project.PollAccess.Value,
                Status=true
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
                return RedirectToAction("Index", "Poll", new { poll= valid.projectUrl });
            }
            return RedirectToAction("/", "Home");
        }

        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}
