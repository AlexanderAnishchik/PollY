using PollyApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class PollController : Controller
    {
        public GenericRepository.Repository Db = new GenericRepository.Repository();

        public ActionResult Index(string poll)
        {

            if (PollHelper.CheckUrlProjectCode(poll))
            {
                var valid = (SafeAdmission)Session["admission"];
                if (valid != null && valid.Status && valid.projectUrl== poll)
                {
                    valid.Status = false;
                    return View();
                }
                   
                return RedirectToAction("RouteAccess", "Admission", new { projectUrl = poll });
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
