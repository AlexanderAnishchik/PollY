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
    public class ProjectManagmentController : Controller
    {
        public GenericRepository.Repository Db = new GenericRepository.Repository();
        [UserAuth]
        [HttpPost]
        public ActionResult DeletePoll(int Id)
        {
            if (Session["user"] != null)
            {
                var userId = (Int32)((dynamic)Session["user"]).Id;

                var valid = Db.Context.Projects.Where(x => x.Id == Id && x.UserId == userId).FirstOrDefault();
                if (valid != null)
                {
                    Db.Delete<Project>(Id);
                    Db.Save();
                }
                return new JsonResult() { Data = "OK" };
            }
            return new JsonResult() { Data = "Bad Request" };
        }
        [UserAuth]
        public ActionResult GetUserPollInformation()
        {
            if (Session["user"] != null)
            {
                User user = (User)Session["user"];
                var pollSet = new PollSetQuery();
                var weekAgo = DateTime.Now.AddDays(-7);
                var userProject = Db.Context.Projects
                    .Where(x => x.UserId == user.Id)
                       .Select(x => new
                       {
                           x.Id,
                           x.Name,
                           x.IsActive,
                           x.UrlCode,
                           Type = x.PollType.Name,
                           Voted = Db.Context.ProjectAccessVoters.Where(z => z.ProjectId == x.Id).Count(),
                           DateVoters = Db.Context.ProjectAccessVoters.Where(z => z.ProjectId == x.Id && z.VotedOn > weekAgo).GroupBy(n => new { y = n.VotedOn.Value.Year, m = n.VotedOn.Value.Month, d = n.VotedOn.Value.Day }).Select(v => new
                           {
                               date = v.Key,
                               countVoters = v.ToList().Count
                           })
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
                var lastProjectAction = Db.Context.Projects.Where(x => x.ModifiedOn > monthAgo && x.UserId == user.Id).Select(x => new ProjectActivity()
                                            { Name = x.Name, Type = "Added/Modified Project", ModifiedOn = x.ModifiedOn != null ? x.ModifiedOn.ToString() : null }).ToList();
                var lastUserAction = Db.Context.ProjectAccessVoters.Where(x => x.ModifiedOn > monthAgo && x.Project.UserId == user.Id).Select(x => new ProjectActivity()
                {
                    Name = x.UserSet.User != null ? x.UserSet.User.Email : x.UserSet.IPAdrress != null ? x.UserSet.IPAdrress : x.CodeSet.CodeText,
                    Type = x.IsUsed == true ? "User has voted in the project " + x.Project.Name : "Added User",
                    ModifiedOn = x.IsUsed == true ? x.VotedOn != null ? x.VotedOn.ToString() : null : x.ModifiedOn != null ? x.ModifiedOn.ToString() : null
                }).ToList();
                lastUserAction.AddRange(lastProjectAction);
                return new JsonResult() { Data = new { userProject, votedProject, answerProjects, lastAction = lastUserAction }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
                return null;
        }
        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}
