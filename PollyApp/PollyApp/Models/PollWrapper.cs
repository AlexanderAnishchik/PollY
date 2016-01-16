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
        public int UserId { get; set; }
        public List<PollUnit> PollUnits { get; set; }
    }
}