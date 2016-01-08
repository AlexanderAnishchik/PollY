using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class ConstructorController : Controller
    {
        //
        // GET: /Constructor/

        public ActionResult Index()
        {
            return View();
        }
        //public ActionResult SavePoll(Question[] questions,Answer[] answers, string typePoll)
        //{
        //    Int32 userId = Convert.ToInt32(Session["UserId"]);

        //}
    }
}
