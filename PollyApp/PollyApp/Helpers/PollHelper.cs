using PollyApp.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Data;
using PollyApp.Models;
using PollyApp.Account;
using PollyApp.EFModel;

namespace PollyApp.Helpers
{
    public static class PollHelper
    {
        public static bool CheckUrlProjectCode(string url)
        {
            using (var Db = new Repository())
            {
                return Db.Context.Projects.Where(x => x.UrlCode == url).Any();
            }
        }
        public static Object GetPoll(string url)
        {
            Object data = null;
            using (var Db = new Repository())
            {
                Db.Context.Configuration.LazyLoadingEnabled = false;
                data = Db.Context.Projects
                   .Where(f => f.UrlCode == url)
                   .Select(n => new
                   {
                       Project = n,
                       QuizConfig=n.QuizConfigurator,
                       Questions = Db.Context.Questions
                       .Join(Db.Context.Answers, q => q.Id, a => a.QuestionId, (q, a) => new { q, a })
                       .Where(x => x.q.ProjectId == n.Id)
                       .GroupBy(z => z.q, z => new
                       {
                           Answers = z.a
                       })
                       .Select(x => new
                       {
                           Question = new
                           {
                               Value = x.Key.Value,
                               Id = x.Key.Id,
                               QuestionType=x.Key.QuestionType.Value
                           },
                           Answers = x.Select(k => new { Value = k.Answers.Value, Id = k.Answers.Id }).ToList()
                       })
                       .ToList()
                   })
                   .FirstOrDefault();
            }
            return data;
        }
        public static Int32? GetTimerValue(Int32 projectId)
        {
            using (var Db = new Repository())
            {
                var quizConf= Db.Context.Projects.Where(x => x.Id == projectId).Select(x=>x.QuizConfigurator).FirstOrDefault();
                if (quizConf == null)
                    return null;
                else
                    return quizConf.Timer;
            }
        }
        public static Project GetProjectByURL(String url)
        {
            using (var Db = new Repository())
            {
                return Db.Context.Projects.Where(x => x.UrlCode == url).FirstOrDefault();
            }
        }
        public static Boolean SavePoll(PollResult poll, SafeAdmission admission, HttpRequestBase request)
        {
            var voterId = GetVoterState(admission, request);
            try
            {
                using (var Db = new Repository())
                {

                    poll.PollResultQuestions.ForEach(el =>
                    {
                        el.Answers.ForEach(an =>
                        {
                            Db.Context.Results.Add(new EFModel.Result() { AnswerId = Int32.Parse(an), QuestionId = Int32.Parse(el.Id), VoterId = (Int32)voterId, ProjectId = Db.Context.Projects.Where(x => x.UrlCode == admission.projectUrl).Select(x => x.Id).FirstOrDefault() });
                        });

                    });
                    Db.Save();
                }
                return true;
            }
            catch(Exception ex)
            {
                using (var Db = new Repository())
                {

                    var v = Db.Context.ProjectAccessVoters.Where(x => x.Id == voterId).FirstOrDefault();
                    v.IsUsed = false;
                    v.VotedOn = null;
                    Db.Save();
                }
                return false;
            }
        }

        private static Int32? GetVoterState(SafeAdmission admission, HttpRequestBase request)
        {
            if (admission.UserIdentity != null)
            {
                using (var Db = new Repository())
                {
                    var v = Db.Context.ProjectAccessVoters.Where(x => x.Id == admission.UserIdentity).FirstOrDefault();
                    v.IsUsed = true;
                    v.VotedOn = DateTime.Now;
                    Db.Save();
                }
                return admission.UserIdentity;
            }
            HttpCookie cookie = request.Cookies[MemberWorker.GetAnonymousCookieName()];
            if (cookie != null)
            {
                var val = cookie["Data"];
                var voter = new ProjectAccessVoter();
                using (var Db = new Repository())
                {
                    UserSet user = new UserSet() { CookieValue = val };
                    voter = new ProjectAccessVoter() { ProjectId = Db.Context.Projects.Where(x => x.UrlCode == admission.projectUrl).Select(x => x.Id).FirstOrDefault(), UserSet = user, IsUsed=true,ModifiedOn=DateTime.Now};
                    voter.VotedOn = DateTime.Now;
                    Db.Context.ProjectAccessVoters.Add(voter);
                    Db.Save();
                }
                return voter.Id;
            }
            else
            {
                return null;
            }
        }



    }
}