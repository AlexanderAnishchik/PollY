using PollyApp.Controllers;
using PollyApp.EFModel;
using PollyApp.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Mvc;
using System.Web.Routing;

namespace PollyApp.Attributes
{
    public class UserAuthAttribute : System.Web.Mvc.ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Session != null)
            {
                var user = filterContext.HttpContext.Session["user"] as User;
                if (user != null)
                    base.OnActionExecuting(filterContext);
                else
                {
                    if (filterContext.HttpContext.User.Identity.IsAuthenticated == true)
                    {
                        var currUser = new User();
                        using (var Db = new Repository())
                        {
                            Db.Context.Configuration.ProxyCreationEnabled = false;
                            currUser = Db.Context.Users.Where(x => x.Email == filterContext.HttpContext.User.Identity.Name).FirstOrDefault();
                        }
                        if (currUser != null)
                            filterContext.HttpContext.Session["user"] = currUser;
                    }
                    base.OnActionExecuting(filterContext);
                }
            }
        }
    }
}