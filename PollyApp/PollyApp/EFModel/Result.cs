//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PollyApp.EFModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Result
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
    
        public virtual Answer Answer { get; set; }
        public virtual Project Project { get; set; }
        public virtual Question Question { get; set; }
        public virtual User User { get; set; }
    }
}
