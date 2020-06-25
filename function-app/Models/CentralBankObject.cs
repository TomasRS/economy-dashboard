using Newtonsoft.Json;

namespace FunctionApp.Models
{
    public class CentralBankObject
    {
        //Central Bank API Response consist of date (d) and value (v)
        public string d;
        public double v;

        public static CentralBankObject[] DeserializedJson(string json)
        {
            return JsonConvert.DeserializeObject<CentralBankObject[]>(json);
        }
    }
}