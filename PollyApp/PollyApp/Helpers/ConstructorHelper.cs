using PollyApp.EFModel;
using PollyApp.GenericRepository;
using PollyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Helpers
{
    public static class ConstructorHelper
    {
        public static void SetCodeArray(List<String>codes,int projectId)
        {
            using (var Db = new Repository())
            {
                List<CodeSet> codesList = new List<CodeSet>();
                foreach (var code in codes)
                {
                    codesList.Add(new CodeSet() { CodeText = code });
                }
                Db.Context.CodeSets.AddRange(codesList);
                Db.Save();
                foreach (var code in codesList)
                {
                    Db.Context.ProjectAccessVoters.Add(new ProjectAccessVoter() { CodeSetId = code.Id, ProjectId = projectId, IsUsed = false });
                }
                Db.Save();
            }
        }
        public static void Save(PollWrapper poll)
        {

            
            using (var Db = new Repository())
            {
                using (var dbContextTransaction = Db.Context.Database.BeginTransaction())
                {
                    try
                    {
                        var questionType = Db.Context.QuestionTypes.Where(x => x.Id == 1).Select(x => x.Id).First();
                        var pollShare = Db.Context.PollShares.Where(x => x.Value == poll.PollShare).Select(x => x.Id).First();
                        var pollAccess = Db.Context.PollAccesses.Where(x => x.Value == poll.PollAccess).Select(x => x.Id).First();
                        var pollTypes = Db.Context.PollTypes.Where(x => x.Value == poll.PollType).Select(x => x.Id).First();
                        Project newProj = new Project();
                        newProj.UserId = (int)poll.UserId;
                        newProj.Name = poll.PollName;
                        newProj.ShareId = pollShare;
                        newProj.AccessId = pollAccess;
                        newProj.TypeId = pollTypes;
                        newProj.CreatedOn = DateTime.Now;
                        newProj.ModifiedOn= DateTime.Now;
                        newProj.IsActive = true;
                        newProj.UrlCode = GenerateProjectCode();
                        Db.Add(newProj);
                        Db.Save();
                        if (poll.Poll != null)
                        {
                            foreach (var el in poll.Poll)
                            {
                                el.Question.ProjectId = newProj.Id;
                                el.Question.QuestionTypeId = questionType;
                                Db.Add(el.Question);
                                Db.Save();
                                int order = 1;
                                List<Answer> answList = new List<Answer>();
                                foreach (var answerString in el.Answers)
                                {
                                    var answer = new Answer();
                                    answer.QuestionId = el.Question.Id;
                                    answer.OrderValue = 1;
                                    answer.Value = answerString;
                                    order++;
                                }
                                Db.AddRange(el.Answers);
                                Db.Save();
                            }
                        }
                        dbContextTransaction.Commit();
                        SetCodeArray(poll.CodeSet, newProj.Id);
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
