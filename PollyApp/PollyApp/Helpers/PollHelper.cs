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

            //Project newProj = new Project();
            //newProj.UserId = (Int32)poll.UserId;
            //newProj.Name = poll.PollName;
            //using (var Db = new Repository())
            //{
            //    using (var dbContextTransaction = Db.Context.Database.BeginTransaction())
            //    {
            //        try
            //        {
            //            var pollShare = Db.Context.PollShares.Where(x => x.Value == poll.PollShare).Select(x => x.Id).First();
            //            var pollAccess = Db.Context.PollAccesses.Where(x => x.Value == poll.PollAccess).Select(x => x.Id).First();
            //            var pollTypes = Db.Context.PollTypes.Where(x => x.Value == poll.PollType).Select(x => x.Id).First();
            //            newProj.AccessId = pollAccess;
            //            newProj.ShareId = pollShare;
            //            newProj.TypeId = pollTypes;
            //            Db.Add(newProj);
            //            Db.Save();
            //            if (poll.Poll != null)
            //            {
            //                foreach (var el in poll.Poll)
            //                {
            //                    el.Question.ProjectId = newProj.Id;
            //                    Db.Add(el.Question);
            //                    Db.Save();
            //                    foreach (var an in el.Answers)
            //                    {
            //                        an.QuestionId = el.Question.Id;
            //                    }
            //                    Db.AddRange(el.Answers);
            //                    Db.Save();
            //                }
            //            }
            //            dbContextTransaction.Commit();
            //        }
            //        catch (Exception ex)
            //        {
            //            dbContextTransaction.Rollback();
            //        }
            //    }
            //}

        }
    }
}
