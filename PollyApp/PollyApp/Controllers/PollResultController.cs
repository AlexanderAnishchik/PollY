using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class PollResultController : Controller
    {
        // GET: PollResult
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Credentials()
        {
            return View();
        }
    }
}