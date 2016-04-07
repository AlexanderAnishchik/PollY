using PollyApp.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Helpers
{
    public class PollSetQuery
    {
        private Repository db = new Repository();
        public IQueryable<Object> pollStructure
        {
            get
            {
                return db.Context.Users
                     .Join(db.Context.Projects, u => u.Id, p => p.UserId, (u, p) => new { u, p })
                     .Join(db.Context.Questions, u_p => u_p.p.Id, q => q.ProjectId, (u_p, q) => new { u_p, q })
                     .Join(db.Context.QuestionTypes, u_p_q => u_p_q.q.QuestionTypeId, qt => qt.Id, (u_p_q, qt) => new { u_p_q, qt })
                     .Join(db.Context.Answers, u_p_q_qt => u_p_q_qt.u_p_q.q.Id, a => a.QuestionId, (u_p_q_qt, a) => new { u_p_q_qt, a })
                     .Join(db.Context.PollAccesses, u_p_q_qt_a => u_p_q_qt_a.u_p_q_qt.u_p_q.u_p.p.AccessId, acc => acc.Id, (u_p_q_qt_a, acc) => new { u_p_q_qt_a, acc })
                     .Join(db.Context.PollShares, u_p_q_qt_a_acc => u_p_q_qt_a_acc.u_p_q_qt_a.u_p_q_qt.u_p_q.u_p.p.ShareId, sh => sh.Id, (u_p_q_qt_a_acc, sh) => new { u_p_q_qt_a_acc, sh })
                     .Join(db.Context.PollTypes, u_p_q_qt_a_acc_sh => u_p_q_qt_a_acc_sh.u_p_q_qt_a_acc.u_p_q_qt_a.u_p_q_qt.u_p_q.u_p.p.TypeId, t => t.Id, (u_p_q_qt_a_acc_sh, t) => new { u_p_q_qt_a_acc_sh, t });
            }
        }
        public IQueryable<Object> pollResult
        {
            get
            {
                return db.Context.Users
                     .Join(db.Context.Projects, u => u.Id, p => p.UserId, (u, p) => new { u, p })
                     .Join(db.Context.Questions, u_p => u_p.p.Id, q => q.ProjectId, (u_p, q) => new { u_p, q })
                     .Join(db.Context.QuestionTypes, u_p_q => u_p_q.q.QuestionTypeId, qt => qt.Id, (u_p_q, qt) => new { u_p_q, qt })
                     .Join(db.Context.Answers, u_p_q_qt => u_p_q_qt.u_p_q.q.Id, a => a.QuestionId, (u_p_q_qt, a) => new { u_p_q_qt, a })
                     .Join(db.Context.Results, u_p_q_qt_a => u_p_q_qt_a.u_p_q_qt.u_p_q.u_p.p.Id, r => r.ProjectId, (u_p_q_qt_a, r) => new { u_p_q_qt_a, r })
                     .Join(db.Context.ProjectAccessVoters, u_p_q_qt_a_r => u_p_q_qt_a_r.u_p_q_qt_a.u_p_q_qt.u_p_q.u_p.p.Id, pav => pav.ProjectId, (u_p_q_qt_a_r, pav) => new { u_p_q_qt_a_r, pav })
                     .Join(db.Context.CodeSets, u_p_q_qt_a_r_pav => u_p_q_qt_a_r_pav.pav.CodeSetId, cs => cs.Id, (u_p_q_qt_a_r_pav, cs) => new { u_p_q_qt_a_r_pav, cs })
                     .Join(db.Context.UserSets, u_p_q_qt_a_r_pav_cs => u_p_q_qt_a_r_pav_cs.u_p_q_qt_a_r_pav.pav.UserSetId, us => us.Id, (u_p_q_qt_a_r_pav_cs, us) => new { u_p_q_qt_a_r_pav_cs, us });
            }
        }
    }
}