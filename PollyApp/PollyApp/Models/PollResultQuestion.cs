using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Models
{
    public class PollResultQuestion
    {
        public String Id { get; set; }
        public List<String> Answers { get; set; }
    }
}