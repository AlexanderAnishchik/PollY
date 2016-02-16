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

            
            using (var Db = new Repository())
            {
                using (var dbContextTransaction = Db.Context.Database.BeginTransaction())
                {
                    try
                    {
                        var pollShare = Db.Context.PollShares.Where(x => x.Value == poll.PollShare).Select(x => x.Id).First();
                        var pollAccess = Db.Context.PollAccesses.Where(x => x.Value == poll.PollAccess).Select(x => x.Id).First();
                        var pollTypes = Db.Context.PollTypes.Where(x => x.Value == poll.PollType).Select(x => x.Id).First();
                        Project newProj = new Project();
                        newProj.UserId = (int)poll.UserId;
                        newProj.Name = poll.PollName;
                        newProj.ShareId = pollShare;
                        newProj.TypeId = pollTypes;
                        newProj.CreatedOn = DateTime.Now;
                        newProj.ModifiedOn= DateTime.Now;
                        newProj.IsActive = true;
                        newProj.UrlCode = GenerateProjectCode();
                        Db.Add(newProj);
                        Db.Save();
                        //if (poll.Poll != null)
                        //{
                        //    foreach (var el in poll.Poll)
                        //    {
                        //        el.Question.ProjectId = newProj.Id;
                        //        Db.Add(el.Question);
                        //        Db.Save();
                        //        foreach (var an in el.Answers)
                        //        {
                        //            an.QuestionId = el.Question.Id;
                        //        }
                        //        Db.AddRange(el.Answers);
                        //        Db.Save();
                        //    }
                        //}
                        dbContextTransaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        dbContextTransaction.Rollback();
                    }
                }
            }

        }
        public static String GenerateProjectCode()
        {
            var code = Guid.NewGuid().ToString().Replace("-", String.Empty).Substring(0, 10);
            bool exist = false;
            using (var Db = new Repository())
            {
                exist = Db.Context.Projects.Where(x => x.UrlCode == code).Any();
            }
            if (exist)
               return GenerateProjectCode();
            else
            return code;
        }
    }
}
