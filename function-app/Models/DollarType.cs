using System.Collections.Generic;

namespace FunctionApp.Models
{
    public class DollarType
    {
        public string Name { get; set; }

        public string BuyValue { get; set; }

        public string SellValue { get; set; }
    }

    public class DollarTypes
    {
        public List<DollarType> DollarValues { get; set; }
    }
}