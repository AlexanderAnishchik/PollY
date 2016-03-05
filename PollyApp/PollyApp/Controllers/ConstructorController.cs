using PollyApp.Attributes;
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
        private GenericRepository.Repository Db = new GenericRepository.Repository();

        public ActionResult Index()
        {
            return View();
        }
//        var Question = { value:"xcvxcv" }
//                var Answer = { value:"xcvxcv" }
//               var Answers =[Answer, Answer, Answer]
//             var PollUnits =[{Question, Answers},{Question,Answers
//},{Question,Answers}]

//               jQuery.ajax({
//                 method: "POST",
//                 url: "/Constructor/SavePoll",

//                          data: JSON.stringify({PollUnits,PollName:"zxcxc"}),
//                          contentType: 'application/json; charset=utf-8',

//                });
        [UserAuth]
        public ActionResult SavePoll(PollWrapper newPoll)
        {
            try
            {
                newPoll.UserId = ((dynamic)Session["user"]).Id;
              var project=  ConstructorHelper.Save(newPoll);
               return new JsonResult() { Data = project };
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                return new JsonResult() { Data = null };
            }
        }
        [HttpPost]
        public ActionResult GenerateCode(int count)
        {
            string[] arr = new string[count];
            if (count>0)
            { 
                
                for (int i = 0; i < arr.Length; i++)
                {
                    arr[i] = Guid.NewGuid().ToString().Replace("-", String.Empty).Substring(0, 10);
                }
                return new JsonResult() { Data = new { status = true, codes = arr } };
            }
            else
                return new JsonResult() { Data = new { status = false} };
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}
