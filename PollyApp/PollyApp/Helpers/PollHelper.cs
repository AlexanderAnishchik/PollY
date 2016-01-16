using PollyApp.EFModel;
using PollyApp.GenericRepository;
using PollyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Helpers
{
    public static class PollHelper
    {
        public static void Save(PollWrapper poll)
        {
            Project newProj = new Project();
            newProj.UserId = poll.UserId;
            newProj.Name=poll.PollName;
            using (var Db = new Repository())
            {
                Db.Add(newProj);
                Db.Save();
                if (poll.PollUnits != null)
                {
                    foreach (var el in poll.PollUnits)
                    {
                        el.Question.ProjectId = newProj.Id;
                        Db.Add(el.Question);
                        Db.Save();
                        foreach (var an in el.Answers)
                        {
                            an.QuestionId = el.Question.Id;
                        }
                        Db.AddRange(el.Answers);
                        Db.Save();
                    }
                }
            }
        }
    }
}
