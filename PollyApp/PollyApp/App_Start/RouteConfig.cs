using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace PollyApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(name:"sitemap.xml",
                url: "sitemap.xml",
                defaults: new { controller = "Home", action = "SitemapXml"});
            routes.MapRoute("getPoll",
              url: "Poll/{poll}",
              defaults: new { controller = "Poll", action = "Index", poll = RouteParameter.Optional }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
   
}