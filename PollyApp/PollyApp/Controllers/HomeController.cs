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
            //var user = Db.Context.Users.First();
            //user.FirstName = "Sanya";
            //Db.Update(user);
            //Db.Save();
            return View();
        }
    }
}