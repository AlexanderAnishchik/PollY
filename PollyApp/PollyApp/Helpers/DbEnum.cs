using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Helpers
{
    public class DbEnum
    {
        public enum PollType
        {
            Single = 1,
            Multiply = 2
        }

        public enum PollShare
        {
            FreeLink = 1,
            PasswordLink = 2,
            CommunityLink = 3
        }
        public enum PollAccess
        {
            Public = 1,
            Anonymous = 2
        }
    }
}