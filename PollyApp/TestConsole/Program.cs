﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using SendGrid;

namespace TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            String route = String.Empty;
            SendGridMessage myMessage = new SendGridMessage();
            myMessage.AddTo("help3@yourpolly.com");
            myMessage.From = new MailAddress("info@yourpolly.com");
            myMessage.Subject = "Testing the SendGrid";
            myMessage.Text = "!It is working!!!!";

            // Create a Web transport, using API Key
            var transportWeb = new Web("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");

            // Send the email.
            try
            {
                 transportWeb.DeliverAsync(myMessage).Wait();
                Console.WriteLine("Sent!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
