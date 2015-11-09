using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace PollyApp.Account
{
    public static class MemberWorker
    {
        private const int SaltValueSize=4;
        private static string[] HashingAlgorithms = new string[] { "SHA256", "MD5" };
        public static Boolean Login(string email, string password)
        {
            return false;
        }
        private static String GetSalt()
        {
            return null;
        }
    }
}