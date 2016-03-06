using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Helpers
{
    public class SafeAdmission
    {
        public Int32 AccessType { get; set; }
        public String projectUrl { get; set; }
        public string UserIdentity { get; set; }
        public Boolean Status { get; set; }
    }
}