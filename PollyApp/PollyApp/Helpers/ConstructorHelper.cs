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
            codes = codes.Select(x => x.Trim()).ToList();
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
        public static void SetUserArray(List<String> users, int projectId)
        {
            users = users.Select(x => x.Trim()).ToList();
            using (var Db = new Repository())
            {
                var usersList = Db.Context.Users.Where(x => users.Contains(x.Email)).Select(x => x.Id).ToList();
                List<UserSet> userSets= new List<UserSet>();
                foreach (var user in usersList)
                {
                    userSets.Add(new UserSet() { UserId = user});
                }
                Db.Context.UserSets.AddRange(userSets);
                Db.Save();
                foreach (var user in userSets)
                {
                    Db.Context.ProjectAccessVoters.Add(new ProjectAccessVoter() { UserSetId = user.Id, ProjectId = projectId, IsUsed = false });
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
                        if (poll.Poll == null)
                            throw new Exception("Poll null");
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
                                    answer.OrderValue = order;
                                    answer.Value = answerString;
                                    order++;
                                    answList.Add(answer);
                                }
                                Db.AddRange(answList);
                                Db.Save();
                            }
                        }
                        dbContextTransaction.Commit();
                        SetAccess(poll, newProj.Id);
                    }
                    catch (Exception ex)
                    {
                        dbContextTransaction.Rollback();
                    }
                }
            }

        }
        public static void SetAccess(PollWrapper poll,int projectId)
        {
            var id = poll.PollAccess;
            using (var Db = new Repository())
            {
                var access = Db.Context.PollAccesses.Where(x => x.Id == id).Select(x => x.Value).FirstOrDefault();
                
                if(access== (Int32)DbEnum.PollAccess.CodeSet)
                    SetCodeArray(poll.CodeSet, projectId);
                else
                      if (access == (Int32)DbEnum.PollAccess.UserSet)
                    SetUserArray(poll.UserSet, projectId);
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
