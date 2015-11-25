using PollyApp.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult SignIn(String login, String pass)
        {
            var data = MemberWorker.Login(login, pass);
            Session["isLogged"] = data;
            return new JsonResult() { Data = data };
        }
        [HttpPost]
        public JsonResult SignUp(String email, String pass, String firstName, String lastName)
        {
            try
            {
                MemberWorker.Register(pass, email, firstName, lastName);
                Session["isLogged"] = true;
                return new JsonResult() { Data = true };
            }
            catch (Exception)
            {
                Session["isLogged"] = false;
                return new JsonResult() { Data = false };
            }
        }
    }
}