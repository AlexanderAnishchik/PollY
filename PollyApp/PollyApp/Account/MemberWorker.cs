using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PollyApp.Account
{
    public static class MemberWorker
    {
        private const int SaltValueSize = 4;
        private static String[] HashingAlgorithms = new String[] { "SHA256", "MD5" };
        public static bool IsValidEmail(string strIn)
        {
            bool invalid = false;
            if (String.IsNullOrEmpty(strIn))
                return false;

            // Use IdnMapping class to convert Unicode domain names.
            try
            {
                strIn = Regex.Replace(strIn, @"(@)(.+)$", this.DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(200));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }

            if (invalid)
                return false;

            // Return true if strIn is in valid e-mail format.
            try
            {
                return Regex.IsMatch(strIn,
                      @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                      @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                      RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }
        public static Boolean Login(String email, String password)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(email) || String.IsNullOrWhiteSpace(password))
                    throw new Exception("Email or Password is not set");
                if(!IsValidEmail(email) || password.Length>15|| password.Length < 5)
                    throw new Exception("Email or Password is not valid");
                var rep = new GenericRepository.Repository();
                var user = rep.Context.Users.Where(x => x.Email == email).FirstOrDefault();
                if (user != null)
                {
                    var userPass = user.Password;
                    var userSalt = user.Salt;
                    using (MD5 md5Hash = MD5.Create())
                    {
                        return VerifyMd5Hash(md5Hash, password + userSalt, userPass);
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static void AddUserCookie(HttpResponseBase response, string user, int timeOutHours)
        {

            var ticket = new FormsAuthenticationTicket(user, true, timeOutHours * 60);
            string encrypted = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encrypted);
            cookie.Expires = System.DateTime.Now.AddHours(timeOutHours);
            response.Cookies.Add(cookie);
            FormsAuthentication.SetAuthCookie(user, true, ticket.CookiePath);
        }
        public static void SignOut()
        {
            FormsAuthentication.SignOut();
        }
        public static void Register(String password, String email, String firstName, String lastName)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(email) || String.IsNullOrWhiteSpace(password) || String.IsNullOrWhiteSpace(firstName) || String.IsNullOrWhiteSpace(lastName))
                    throw new Exception("Email or Password is not set");
                if (!IsValidEmail(email) || password.Length > 15 || password.Length < 5)
                    throw new Exception("Email or Password is not valid");
                var rep = new GenericRepository.Repository();
                String hash = String.Empty;
                String salt = String.Empty;
                using (MD5 md5Hash = MD5.Create())
                {
                    salt = GetSalt();
                    hash = GetMd5Hash(md5Hash, password + salt);
                }
                rep.Add(new User { Email = email, Password = hash, Salt = salt, FirstName = firstName, LastName = lastName, PermissionId = 1 });
                rep.Save();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private static String GetMd5Hash(MD5 md5Hash, String input)
        {
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
                sBuilder.Append(data[i].ToString("x2"));
            return sBuilder.ToString();
        }

        private static bool VerifyMd5Hash(MD5 md5Hash, String input, String hash)
        {
            String hashOfInput = GetMd5Hash(md5Hash, input);
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;
            if (comparer.Compare(hashOfInput, hash) == 0)
                return true;
            else
                return false;
        }
        private static String GetSalt()
        {
            return Guid.NewGuid().ToString().Remove(SaltValueSize);
        }
    }
}