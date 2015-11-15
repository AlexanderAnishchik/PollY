using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace PollyApp.Account
{
    public static class MemberWorker
    {
        private const int SaltValueSize = 4;
        private static String[] HashingAlgorithms = new String[] { "SHA256", "MD5" };
        public static Boolean Login(String email, String password)
        {
            try
            {
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
        public static void Register(String password, String email, String firstName, String lastName)
        {
            try
            {
                var rep = new GenericRepository.Repository();
                String hash = String.Empty;
                String salt = String.Empty;
                using (MD5 md5Hash = MD5.Create())
                {
                    salt = GetSalt();
                    hash = GetMd5Hash(md5Hash, password + salt);
                }
                rep.Add(new User { Email = email, Password = hash, Salt = salt, FirstName = firstName, LastName = lastName });
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