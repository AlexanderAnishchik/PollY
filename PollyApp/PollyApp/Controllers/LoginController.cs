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
            var isLogged = MemberWorker.SignIn(login, pass);
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
                MemberWorker.AddUserCookie(Response, ((dynamic)user).Email, 3600);
            }
            Session["user"] = user;
            return new JsonResult() { Data = new { status = isLogged, user = user } };
        }
        [HttpPost]
        public ActionResult SignUp(String firstName, String lastName, String email, String pass)
        {
            try
            {
                var result = MemberWorker.Register(pass, email, firstName, lastName);
                switch (result)
                {
                    case MemberWorker.RegisterStatus.Success:
                        {
                            MemberWorker.AddUserCookie(Response, email, 3600);
                            return new JsonResult() { Data = "OK" };

                        }
                    case MemberWorker.RegisterStatus.NotValid:
                        return new JsonResult() { Data = "Invalid Email or Password" };
                    case MemberWorker.RegisterStatus.EmailExists:
                        return new JsonResult() { Data = "Email is exists" };
                    default:
                        return new HttpStatusCodeResult(400);
                }
                if (result == MemberWorker.RegisterStatus.Success)
                {

                    MemberWorker.AddUserCookie(Response, email, 3600);
                    return new JsonResult() { Data = "OK" };
                }
                else
                {
                    return new JsonResult() { Data = false };
                }
            }
            catch (Exception)
            {
                return new JsonResult() { Data = false };
            }
        }
        public ActionResult LogOut()
        {
            MemberWorker.SignOut();
            Session["user"] = null;
            return RedirectToAction("Index", "Home");
        }
    }
}