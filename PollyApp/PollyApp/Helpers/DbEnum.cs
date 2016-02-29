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
            Multiply = 2,
            Quiz=3
        }

        public enum PollShare
        {
            Public = 1,
            Private = 2
            
        }
        public enum PollAccess
        {
            FreeLink = 1,
            UserSet = 2,
            CodeSet = 3
        }
    }
}