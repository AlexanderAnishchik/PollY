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
using PollyApp.Seo;
using System.Xml.Linq;
using System.Threading.Tasks;
using SendGrid;
using System.Globalization;
using System.Text;
using System.Net.Mail;
using log4net;

namespace PollyApp.Controllers
{
    [RoutePrefix("")]
    public class HomeController : Controller
    {
        private GenericRepository.Repository Db = new GenericRepository.Repository();
        private static readonly ILog Logger = LogManager.GetLogger("AppLogger");

        // SEO *******************************************
        public dynamic getPublicPolls()
        {
            var polls = Db.Context.Projects.Where(x => x.AccessId == 1);
            return polls;
        }
        public IReadOnlyCollection<SitemapNode> GetSitemapNodes(UrlHelper urlHelper)
        {
            List<SitemapNode> nodes = new List<SitemapNode>();
            nodes.Add(
                new SitemapNode()
                {
                    Url = new System.UriBuilder(Request.Url.AbsoluteUri)
                    {
                        Path = Url.Content("~/"),
                        Query = null,
                    }.ToString(),
                    Priority = 1
                });
            nodes.Add(
                new SitemapNode()
                {
                    Url = new System.UriBuilder(Request.Url.AbsoluteUri)
                    {
                        Path = Url.Content("~/Constructor"),
                        Query = null,
                    }.ToString(),
                    Priority = 0.9
                });
            foreach (dynamic project in getPublicPolls())
            {
                nodes.Add(
                    new SitemapNode()
                    {
                        Url = urlHelper.AbsoluteRouteUrl("getPoll", new { poll = project.UrlCode }),
                        Frequency = SitemapFrequency.Weekly,
                        Priority = 0.8
                    });
            }

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
                        sitemapNode.Priority.Value.ToString("F1", CultureInfo.InvariantCulture)));
                root.Add(urlElement);
            }

            XDocument document = new XDocument(root);
            return document.ToString();
        }

       
        public ContentResult RobotsText()
        {
            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.AppendLine("user-agent: *");
            stringBuilder.AppendLine("disallow: /Account/");
            stringBuilder.AppendLine("allow: /Scripts/*.js");
            stringBuilder.AppendLine("allow: /Scripts/angular-material/*.js");
            stringBuilder.AppendLine("allow: /Scripts/angular-aria/*.js");
            stringBuilder.AppendLine("allow: /Scripts/angular-ui/*.js");
            stringBuilder.AppendLine("allow: /Scripts/App/*.js");
            stringBuilder.AppendLine("allow: /Scripts/App/Controllers/*.js");
            stringBuilder.AppendLine("allow: /Scripts/App/Directives/*.js");
            stringBuilder.AppendLine("allow: /Scripts/App/Factory/*.js");
            stringBuilder.AppendLine("allow: /Scripts/App/Modules/*.js");
            stringBuilder.AppendLine("allow: /Scripts/App/Route/*.js");
            stringBuilder.AppendLine("allow: /Scripts/App/Services/*.js");
            stringBuilder.AppendLine("allow: /Scripts/*");
            stringBuilder.AppendLine("allow: /Content/*.css");
            stringBuilder.AppendLine("allow: /Content/css/*.css");
            stringBuilder.Append("sitemap: ");
            stringBuilder.AppendLine(this.Url.RouteUrl("getSitemapXml", null, this.Request.Url.Scheme).TrimEnd('/'));

            return this.Content(stringBuilder.ToString(), "text/plain", Encoding.UTF8);
        }

        public ActionResult SitemapXml()
        {
            var sitemapNodes = GetSitemapNodes(this.Url);
            string xml = GetSitemapDocument(sitemapNodes);
            Response.ContentType = "text/xml";
            return this.Content(xml);
        }

        //END SEO ***********************************


        // GET: Home
        [UserAuth]
        public ActionResult Index()
        {
            //237
            //918,922
            var users = PollHelper.GetFilteredPoll(237, new List<int>() { 918 });
            PollHelper.ChartPollData("0057436918", users);
            Logger.InfoFormat("Path {0} Method {1}", HttpContext.Request.Url, HttpContext.Request.HttpMethod);
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