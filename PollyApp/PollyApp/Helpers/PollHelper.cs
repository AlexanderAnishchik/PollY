using PollyApp.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
    }
}