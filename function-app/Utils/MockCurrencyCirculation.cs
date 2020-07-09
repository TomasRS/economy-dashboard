using System.Collections.Generic;
using FunctionApp.Models;

namespace FunctionApp.Utils
{
    public static class MockCurrencyCirculation
    {
        public static CentralBankObject[] GetMockData()
        {
            var result = new List<CentralBankObject>();
            result.Add(new CentralBankObject("2020-02-11","1148652"));
            result.Add(new CentralBankObject("2020-02-12","1146436"));
            result.Add(new CentralBankObject("2020-02-13","1143423"));
            result.Add(new CentralBankObject("2020-02-14","1140644"));
            result.Add(new CentralBankObject("2020-02-17","1139830"));
            result.Add(new CentralBankObject("2020-02-18","1138218"));
            result.Add(new CentralBankObject("2020-02-19","1136784"));
            result.Add(new CentralBankObject("2020-02-20","1138611"));
            result.Add(new CentralBankObject("2020-02-21","1141783"));
            result.Add(new CentralBankObject("2020-02-26","1145091"));
            return result.ToArray();
        }
    }
}