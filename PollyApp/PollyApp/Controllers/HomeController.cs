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

namespace PollyApp.Controllers
{
    public class HomeController : Controller
    {
        private GenericRepository.Repository Db = new GenericRepository.Repository();
        // GET: Home
        [UserAuth]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SendEmail(EmailModel mail)
        {
            SendGridMessage myMessage = new SendGridMessage();
            myMessage.AddTo(mail.Email);
            myMessage.From = new MailAddress("info@yourpolly.com");
            myMessage.Subject = mail.Title;
            myMessage.Text = mail.Message;

            // Create a Web transport, using API Key
            var transportWeb = new Web("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");
            transportWeb.DeliverAsync(myMessage).RunSynchronously();
            return new JsonResult() { Data = new { status = "True" } };
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}