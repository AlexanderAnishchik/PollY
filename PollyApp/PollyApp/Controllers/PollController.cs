using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class PollController : Controller
    {
        //
        // GET: /Poll/

        public ActionResult Index(string poll)
        {

                return View();
        }

    }
}
