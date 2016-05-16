using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Models
{
    public class ProjectActivity
    {
        public String Name { get; set; }
        public String Type { get; set; }
        public String ModifiedOn { get; set; }

        public String Additional { get; set; }
    }
}