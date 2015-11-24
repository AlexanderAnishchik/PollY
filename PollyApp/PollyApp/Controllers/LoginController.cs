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
            return new JsonResult() { Data = MemberWorker.Login(login, pass) };
        }
        [HttpPost]
        public JsonResult SignUp(String email, String pass, String firstName, String lastName)
        {
            try
            {
                MemberWorker.Register(pass, email, firstName, lastName);
                return new JsonResult() { Data = true };
            }
            catch (Exception)
            {
                return new JsonResult() { Data = false };
            }
        }
    }
}