using PollyApp.Attributes;
using PollyApp.EFModel;
using PollyApp.Helpers;
using PollyApp.JsonConverters;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Web.Security;

namespace PollyApp.Controllers
{
    public class HomeController : Controller
    {
        private GenericRepository.Repository Db = new GenericRepository.Repository();
        // GET: Home
        [UserAuth]
        public ActionResult Index()
        {
            return View();
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}