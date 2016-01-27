using PollyApp.EFModel;
using PollyApp.Helpers;
using PollyApp.Models;
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
    //        var Question = { value:"xcvxcv" }
    //        var Answer = { value:"xcvxcv" }
    //       var Answers =[Answer, Answer, Answer]
    //     var PollUnits =[{Question, Answers},{Question,Answers
    //},{Question,Answers}]
        
    //       jQuery.ajax({
    //         method: "POST",
    //         url: "/Constructor/SavePoll",

    //                  data: JSON.stringify({PollUnits,PollName:"zxcxc"}),
    //                  contentType: 'application/json; charset=utf-8',

    //        });
        public string SavePoll(PollWrapper newPoll)
        {
            try
            {
                newPoll.UserId=((dynamic)Session["user"]).Id;
                PollHelper.Save(newPoll);
                return "S";
            }
            catch (Exception ex)
            {
                return "S";
            }

        }
    }
}
