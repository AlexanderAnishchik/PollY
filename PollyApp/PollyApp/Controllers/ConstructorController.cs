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
        [UserAuth]
        public ActionResult SavePoll(PollWrapper configPoll, List<PollUnit> poll)
        {
            try
            {
                configPoll.UserId = ((dynamic)Session["user"]).Id;
              var project=  ConstructorHelper.Save(configPoll, poll);
               return new JsonResult() { Data =new {project.UrlCode } };
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
        public ActionResult GetPoll(string poll)
        {
            if (PollHelper.CheckUrlProjectCode(poll))
            {
                SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == poll).FirstOrDefault();
                if (valid.projectUrl == poll)
                {
                    var data = PollHelper.GetPoll(poll);
                    return new JsonResult() { Data = data };
                }
            }
            return new JsonResult() { Data = null };
        }
        public ActionResult SetTimer(string poll)
        {
            if (PollHelper.CheckUrlProjectCode(poll))
            {
                SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == poll).FirstOrDefault();
                if (valid.projectUrl == poll)
                {
                    
                    Project data = PollHelper.GetProjectByURL(poll);
                    var timerValue= PollHelper.GetTimerValue(data.Id);
                    //NEED TO IMPLEMENT
                    return new JsonResult() { Data = data };
                }
            }
            return new JsonResult() { Data = null };
        }
        public ActionResult SaveResults(PollResult poll,Project project)
        {
            SafeAdmission valid = ((List<SafeAdmission>)Session["admissions"]).Where(x => x.projectUrl == project.UrlCode).FirstOrDefault();
            PollHelper.SavePoll(poll, valid, Request);
            ((List<SafeAdmission>)Session["admissions"]).Remove(valid);
            return new JsonResult() { Data = null };
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}
