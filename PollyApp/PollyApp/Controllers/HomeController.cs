using PollyApp.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PollyApp.Controllers
{
    public class HomeController : Controller
    {
        public GenericRepository.Repository Db = new GenericRepository.Repository();
        // GET: Home
        [UserAuth]
        public ActionResult Index()
        {
            
            return View();
        }
    }
}