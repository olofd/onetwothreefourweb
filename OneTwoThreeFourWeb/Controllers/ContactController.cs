using System;
using System.Net.Mail;
using System.Web.Http;

namespace olofdahlbom.se.Controllers
{
    public class ContactMailMessage
    {
        public string name { get; set; }
        public string email { get; set; }
        public string message { get; set; }
    }
    public class ContactController : ApiController
    {
        public bool Post(ContactMailMessage mailIn)
        {
            try
            {
                var mail = new MailMessage();
                var smtpServer = new SmtpClient("olofd.asuscomm.com");
                mail.From = new MailAddress(mailIn.email);
                mail.To.Add("kontakt@onetwothreefour.se");
                mail.Subject = "[Mail från onetwothreefour.se]";
                mail.Body = "-------------------FRÅN: " + mailIn.name + ", " + mailIn.email +
                            "-------------------" + "\r\n" + mailIn.message;

                smtpServer.Send(mail);
            }
            catch (Exception)
            {
                
                return false;
            }


            return true;
        }
    }
}
