using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;

namespace PollyApp.Models
{
    public class PollWrapper
    {
        public string PollName { get; set; }
        public Int32? UserId { get; set; }
        public Int32? PollShare { get; set; }
        public Int32? PollType { get; set; }
        public Int32? PollAccess { get; set; }
        public List<PollUnit> Poll { get; set; }
        public List<String> CodeSet { get; set; }
        public List<String> UserSet { get; set; }
    }
}