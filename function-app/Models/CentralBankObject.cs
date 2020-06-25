using System.Linq;
using Newtonsoft.Json;

namespace FunctionApp.Models
{
    public class CentralBankObjectResponse
    {
        //Central Bank API Response consist of date (d) and value (v)
        public string d;
        public double v;

        public static CentralBankObject[] DeserializeJson(string json)
        {
            return JsonConvert
                    .DeserializeObject<CentralBankObjectResponse[]>(json)
                    .ToList()
                    .Select(dateValue => new CentralBankObject(dateValue.d, dateValue.v.ToString()))
                    .ToArray();
        }
    }

    public class CentralBankObject
    {
        public string Date { get; set; }

        public string Value { get; set; }

        public CentralBankObject(string date, string value)
        {
            Date = date;
            Value = value;
        }
    }
}