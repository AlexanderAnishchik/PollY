using PollyApp.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult GetUser()
        {
            if (Session["user"] != null)
                return Json(Session["user"],JsonRequestBehavior.AllowGet);
            else
                return null;
        }
    }
}