using Newtonsoft.Json;
using PollyApp.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace PollyApp.JsonConverters
{
    public class AnswerConverter
    {
        public string SerializeAnswer(Object vb)
        {
            try
            {
                return JsonConvert.SerializeObject(vb);
            }
            catch
            {
                return String.Empty;
            }
        }
        public Object DeserializeAnswer(string json, string type)
        {
            try
            {
                String typeName = "PollyApp.JsonConverters.Helpers." + type;
                Type t = Type.GetType(typeName);
                if (t == null)
                {
                    throw new Exception("Type " + type + " not found.");
                }
                return JsonConvert.DeserializeObject(json, t);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public bool ValidateAnswerModel(Object model)
        {
            return model.GetType().GetProperties().Select(pi => (object)pi.GetValue(model)).Any(value => value == null);
        }
    }
}