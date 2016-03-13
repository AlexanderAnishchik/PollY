using PollyApp.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Data;


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
                                Value=x.Key.Value,
                                Id=x.Key.Id
                           },
                           Answers = x.Select(k=>new { Value= k.Answers.Value,Id = k.Answers.Id }).ToList()
                       })
                       .ToList()
                   })
                   .FirstOrDefault();
            }
            return data;
        }
    }
}