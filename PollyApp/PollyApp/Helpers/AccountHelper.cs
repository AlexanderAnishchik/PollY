using PollyApp.GenericRepository;
using System;
using System.Linq;

namespace PollyApp.Helpers
{
    public class AccountHelper
    {
        public void GetPollInformationByUser(Int32 userId)
        {
            Object data = null;
            using (var Db = new Repository())
            {
                data = Db.Context.Users
                    .Join(Db.Context.Projects, u => u.Id, p => p.UserId, (u, p) => new { u, p })
                    .Join(Db.Context.Questions, u_p => u_p.p.Id, q => q.ProjectId, (u_p, q) => new { u_p, q });
                    
            }
        }
    }
}