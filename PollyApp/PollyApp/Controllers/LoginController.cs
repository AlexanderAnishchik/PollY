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
            Object user = null;
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
            }
            HttpCookie cookie = new HttpCookie("MyName");
            //Set an expiration on the cookie, which indicates that after 10 minutes, the cookie will expire, so the user will have to recreate it.
            cookie.Expires = DateTime.Now.AddMinutes(10);
            cookie.Value = "ZXZXC";
            Response.Cookies.Add(cookie);
            Session["user"] = user;
            Session["isLogged"] = isLogged;
            var ticket = new FormsAuthenticationTicket(((dynamic)user).Email, true, 30);
            string encrypted = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encrypted);
            cookie.Expires = System.DateTime.Now.AddMonths(1);
            Response.Cookies.Add(cookie);
            return new JsonResult() { Data = new { status = isLogged, user = user } };
        }
        [HttpPost]
        public JsonResult SignUp(String email, String pass, String firstName, String lastName)
        {
            try
            {
                MemberWorker.Register(pass, email, firstName, lastName);
                //Session["isLogged"] = true;
                return new JsonResult() { Data = true };
            }
            catch (Exception)
            {
                //Session["isLogged"] = false;
                return new JsonResult() { Data = false };
            }
        }
        public ActionResult LogOut()
        {
            Session["isLogged"] = null;
            return RedirectToAction("Index", "Home");
        }
    }
}