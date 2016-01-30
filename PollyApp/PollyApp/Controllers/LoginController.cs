using PollyApp.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PollyApp.EFModel;
using System.Web.Security;

namespace PollyApp.Controllers
{
    public class LoginController : Controller
    {
        public GenericRepository.Repository Db = new GenericRepository.Repository();
        public ActionResult SignIn(String login, String pass)
        {
            object user = null;
            var isLogged = MemberWorker.Login(login, pass);
            if (isLogged)
            {
               
                user = Db.Context.Users.Where(x => x.Email == login).Select(x => new
                {
                    x.Id,
                    x.Email,
                    x.FirstName,
                    x.LastName,
                    x.Logo
                }).FirstOrDefault();
                MemberWorker.AddUserCookie(Response, ((dynamic)user).Email,3600);
            }
            Session["user"] = user;
            return new JsonResult() { Data = new { status = isLogged, user = user } };
        }
        [HttpPost]
        public JsonResult SignUp(String email, String pass, String firstName, String lastName)
        {
            try
            {
                MemberWorker.Register(pass, email, firstName, lastName);
                MemberWorker.AddUserCookie(Response, email, 3600);
                return new JsonResult() { Data = true };
            }
            catch (Exception)
            {
                return new JsonResult() { Data = false };
            }
        }
        public ActionResult LogOut()
        {
            MemberWorker.SignOut();
            return RedirectToAction("Index", "Home");
        }
    }
}