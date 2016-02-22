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
            switch (isLogged)
            {
                case MemberWorker.LoginStatus.Success:
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
                        Session["user"] = user;
                        return new JsonResult() { Data = new { status = "OK", user = user } };

                    }
                case MemberWorker.LoginStatus.NotValid:
                    return new JsonResult() { Data = new { status = "Invalid Email or Password", user = user } };
                default:
                    return new HttpStatusCodeResult(400);
            }
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
                            return new JsonResult() { Data = "Registration completed successfully" };

                        }
                    case MemberWorker.RegisterStatus.NotValid:
                        return new JsonResult() { Data = "Password or login you've entered is invalid" };
                    case MemberWorker.RegisterStatus.EmailExists:
                        return new JsonResult() { Data = "User with this email already exist" };
                    default:
                        return new HttpStatusCodeResult(400);
                }
                if (result == MemberWorker.RegisterStatus.Success)
                {

                    MemberWorker.AddUserCookie(Response, email, 3600);
                    return new JsonResult() { Data = "Registration completed successfully" };
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
        public ActionResult Access()
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