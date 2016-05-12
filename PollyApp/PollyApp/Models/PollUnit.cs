using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PollyApp.Models
{
    public class EmailModel
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public String Title { get; set; }
        public String Message { get; set; }
    }
}