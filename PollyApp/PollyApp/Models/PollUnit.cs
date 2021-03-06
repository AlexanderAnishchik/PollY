﻿using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Models
{
    public class PollUnit
    {
        public Question Question { get; set; }
        public Int32? QuestionType { get; set; }
        public List<String> Answers { get; set; }
    }
}