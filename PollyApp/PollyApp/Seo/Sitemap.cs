using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PollyApp.Seo
{
  public class SitemapNode
  {
      public SitemapFrequency? Frequency { get; set; }
      public DateTime? LastModified { get; set; }
      public double? Priority { get; set; }
      public string Url { get; set; }


  }

  public enum SitemapFrequency
  {
      Never,
      Yearly,
      Monthly,
      Weekly,
      Daily,
      Hourly,
      Always
  }

  public static class UrlHelperExtensions
    {
      public static string AbsoluteRouteUrl(
          this UrlHelper urlHelper,
          string routeName,
          object routeValues = null)
      {
          string scheme = urlHelper.RequestContext.HttpContext.Request.Url.Scheme;
          return urlHelper.RouteUrl(routeName, routeValues, scheme);
      }
  }
}