using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Account
{
    public class SignInController
    {
        public JsonResult SignIn(String login, String pass)
        {
            return new JsonResult() { Data = MemberWorker.Login(login, pass) };
        }
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