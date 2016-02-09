using PollyApp.Attributes;
using PollyApp.EFModel;
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
        public GenericRepository.Repository Db = new GenericRepository.Repository();
        public ActionResult Index()
        {
            return View();
        }
        [UserAuth]
        public ActionResult GetUser()
        {
            if (Session["user"] != null)
            {
                User user = (User)Session["user"];
                return new JsonResult() { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
                return null;
        }
        [HttpPost]
        public ActionResult GetUserById(int id)
        {
            Object user = null;
            user = Db.Context.Users.Where(x => x.Id == id).Select(x => new
            {
                x.Id,
                x.Email,
                x.FirstName,
                x.LastName,
                x.Logo
            }).FirstOrDefault();
            return new JsonResult() { Data = new { user = user } };
        }
    }
}