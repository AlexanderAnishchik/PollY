using Newtonsoft.Json;
using PollyApp.Attributes;
using PollyApp.EFModel;
using PollyApp.GenericRepository;
using PollyApp.Helpers;
using PollyApp.JsonConverters;
using PollyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class AccountController : Controller
    {
        private GenericRepository.Repository Db = new GenericRepository.Repository();
        public ActionResult Index()
        {
            return View();
        }
        [UserAuth]
        public ActionResult GetUser()
        {
            if (Session["user"] != null)
            {
                User user = (User)Session["user"];
                return new JsonResult() { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
                return null;
        }

        [UserAuth]
        public ActionResult GetUserPollInformation()
        {
            if (Session["user"] != null)
            {
                User user = (User)Session["user"];
                var pollSet = new PollSetQuery();
                var userProject = Db.Context.Projects
                    .Where(x => x.UserId == user.Id)
                       .Select(x => new
                       {
                           x.Name,
                           x.IsActive
                       }).ToList();
                var votedProject = Db.Context.Projects
                    .Join(Db.Context.Results, p => p.Id, r => r.ProjectId, (p, r) => new { p, r })
                    .Where(x => x.p.UserId == user.Id)
                    .Select(x => new
                    {
                        x.r.VoterId
                    })
                    .Distinct().Count();
                var answerProjects = Db.Context.Projects
                  .Join(Db.Context.ProjectAccessVoters, p => p.Id, r => r.ProjectId, (p, r) => new { p, r })
                  .Where(x => x.p.UserId == user.Id)
                  .Where(x => x.r.IsUsed == true)
                  .Select(x => new
                  {
                      x.r.Id
                  }).Count();
                var monthAgo = DateTime.Now.AddMonths(-1);
                var lastProjectAction = Db.Context.Projects.Where(x => x.ModifiedOn > monthAgo && x.UserId== user.Id).Select(x => new ProjectActivity() { Name = x.Name,Type="Added/Modified Project", ModifiedOn = x.ModifiedOn!=null?x.ModifiedOn.ToString():null }).ToList();
                var lastUserAction = Db.Context.ProjectAccessVoters.Where(x => x.ModifiedOn > monthAgo && x.Project.UserId== user.Id).Select(x => new ProjectActivity()
                {
                    Name = x.UserSet.User != null ? x.UserSet.User.Email : x.UserSet.IPAdrress!=null ? x.UserSet.IPAdrress:x.CodeSet.CodeText,
                    Type = x.IsUsed==true? "User has voted in the project "+x.Project.Name:"Added User",
                    ModifiedOn = x.IsUsed == true?x.VotedOn != null ? x.VotedOn.ToString() : null:x.ModifiedOn != null ? x.ModifiedOn.ToString() : null
                }).ToList();
                lastUserAction.AddRange(lastProjectAction);
                return new JsonResult() { Data = new { userProject, votedProject, answerProjects, lastAction=lastUserAction }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
                return null;
        }
        [HttpPost]
        public ActionResult GetUserByEmail(string email)
        {
            Object user = null;
            user = Db.Context.Users.Where(x => x.Email == email).Select(x => new
            {
                x.Id,
                x.Email,
                x.FirstName,
                x.LastName,
                x.Logo
            }).FirstOrDefault();
            return new JsonResult() { Data = new { user = user } };
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
        [HttpGet]
        public ActionResult Profile(int id)
        {
            User user = (User)Session["user"];

            if (user != null)
            {
                if (user.Id == id)
                {
                    ViewBag.user = user;
                    return View(ViewBag.user);
                }
                else
                {
                    return RedirectToAction("Profile", new { id = user.Id });
                }
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }

        }
        public ActionResult Results()
        {
            return View();
        }
    }
}