using PollyApp.Attributes;
using PollyApp.EFModel;
using PollyApp.Helpers;
using PollyApp.JsonConverters;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Web.Security;
using PollyApp.Models;
using System.Threading.Tasks;
using SendGrid;
using System.Net.Mail;
using log4net;

namespace PollyApp.Controllers
{
    public class HomeController : Controller
    {
        private GenericRepository.Repository Db = new GenericRepository.Repository();
        private static readonly ILog Logger = LogManager.GetLogger("AppLogger");

        // GET: Home
        [UserAuth]
        public ActionResult Index()
        {
            //237
            //918,922
           var users = PollHelper.GetFilteredPoll(237, new List<int>() { 918});
            PollHelper.ChartPollData("0057436918",users);

            return View();
            
        }
        [HttpPost]


        public async Task<ActionResult> SendEmail(EmailModel mail)
        {
            SendGridMessage myMessage = new SendGridMessage();

            myMessage.AddTo("pollyukraine@gmail.com");
            myMessage.From = new MailAddress("info@yourpolly.com");
            myMessage.Subject = mail.Email;
            myMessage.Text = mail.Message;

            // Create a Web transport, using API Key
            var transportWeb = new Web("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");
            await transportWeb.DeliverAsync(myMessage);
            return new JsonResult() { Data = new { status = "True" } };
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}