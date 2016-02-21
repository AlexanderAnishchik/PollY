using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PollyApp.JsonConverters
{
    public abstract class ConverterBase
    {
        public String Serialize(Object obj)
        {
            try
            {
                return JsonConvert.SerializeObject(obj);
            }
            catch
            {
                return String.Empty;
            }
        }
        public abstract Object Deserialize(string json, string type);
        public Object Deserialize(string json)
        {
            return JsonConvert.DeserializeObject(json);
        }
    }
}
