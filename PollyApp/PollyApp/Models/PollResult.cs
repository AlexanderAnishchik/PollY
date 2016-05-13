using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Models
{
    public class PollResult
    {
        public List<PollResultQuestion> PollResultQuestions { get; set; }
    }
}