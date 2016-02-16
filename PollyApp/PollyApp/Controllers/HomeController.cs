using PollyApp.Attributes;
using PollyApp.EFModel;
using PollyApp.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PollyApp.Controllers
{
    public class HomeController : Controller
    {
        public GenericRepository.Repository Db = new GenericRepository.Repository();
        // GET: Home
        [UserAuth]
        public ActionResult Index()
        {
            User product = new User();
            product.Email = "Apple";
            product.Password = "fsdfsdf";
            var b = new AnswerConverter();
           // b.Serializer(product);
            return View();
        }
    }
}