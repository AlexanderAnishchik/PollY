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
using System.Xml.Linq;
using System.Data.Entity;
using System.Web.Security;
using PollyApp.Models;
using System.Threading.Tasks;
using SendGrid;
using System.Net.Mail;
using PollyApp.Seo;

namespace PollyApp.Controllers
{

    public class HomeController : Controller
    {
        private GenericRepository.Repository Db = new GenericRepository.Repository();
        // GET: Home
        [UserAuth]
        public ActionResult Index()
        {
            //237
            //918,922
           var users= PollHelper.GetFilteredPoll(237, new List<int>() { 918});
            PollHelper.ChartPollData("0057436918",users);
            return View();
        }

        public IReadOnlyCollection<SitemapNode> GetSitemapNodes(UrlHelper urlHelper)
        {
            List<SitemapNode> nodes = new List<SitemapNode>();

            nodes.Add(
                new SitemapNode()
                {
                    Url = urlHelper.AbsoluteRouteUrl("HomeGetIndex"),
                    Priority = 1
                });
            nodes.Add(
                new SitemapNode()
                {
                    Url = urlHelper.AbsoluteRouteUrl("ConstructorGetIndex"),
                    Priority = 0.9
                });

            return nodes;
        }
        public string GetSitemapDocument(IEnumerable<SitemapNode> sitemapNodes)
        {
            XNamespace xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9";
            XElement root = new XElement(xmlns + "urlset");

            foreach (SitemapNode sitemapNode in sitemapNodes)
            {
                XElement urlElement = new XElement(
                      xmlns + "url",
                      new XElement(xmlns + "loc", Uri.EscapeUriString(sitemapNode.Url)),
                      sitemapNode.LastModified == null ? null : new XElement(
                          xmlns + "lastmod",
                          sitemapNode.LastModified.Value.ToLocalTime().ToString("yyyy-MM-ddTHH:mm:sszzz")),
                      sitemapNode.Frequency == null ? null : new XElement(
                          xmlns + "changefreq",
                          sitemapNode.Frequency.Value.ToString().ToLowerInvariant()),
                      sitemapNode.Priority == null ? null : new XElement(
                          xmlns + "priority",
                          sitemapNode.Priority.Value.ToString()));
                      root.Add(urlElement);
              }

              XDocument document = new XDocument(root);
              return document.ToString();
        }

        [Route("sitemap.xml")]
        public ActionResult SitemapXml()
        {
            var sitemapNodes = GetSitemapNodes(this.Url);
            string xml = GetSitemapDocument(sitemapNodes);
            Response.ContentType = "text/xml";
            return this.Content(xml);
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