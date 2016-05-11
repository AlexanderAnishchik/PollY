using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PollyApp.Controllers
{
    public class TicketController : Controller
    {
        private GenericRepository.Repository Db = new GenericRepository.Repository();
        [HttpPost]
        public ActionResult AddTicket(String data)
        {
            Db.Context.Tickets.Add(new EFModel.Ticket() { MessageJSON = DateTime.Now.ToShortTimeString() });
            Db.Save();
            return null;
        }

    }
}
