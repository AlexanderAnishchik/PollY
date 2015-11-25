using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class HomeController : Controller
    {
        public GenericRepository.Repository Db = new GenericRepository.Repository();
        // GET: Home
        public ActionResult Index()
        {
            if (Session["isLogged"] == null)
                Session["isLogged"] = false;
            return View();
        }
    }
}