using System.Collections.Generic;
using FunctionApp.Models;

namespace FunctionApp.Utils
{
    public static class MockInterannualInflation
    {
        public static CentralBankObject[] GetMockData()
        {
            var result = new List<CentralBankObject>();
            result.Add(new CentralBankObject("2019-04-30","55.8"));
            result.Add(new CentralBankObject("2019-05-31","57.3"));
            result.Add(new CentralBankObject("2019-06-30","55.8"));
            result.Add(new CentralBankObject("2019-07-31","54.4"));
            result.Add(new CentralBankObject("2019-08-31","54.5"));
            result.Add(new CentralBankObject("2019-09-30","53.5"));
            result.Add(new CentralBankObject("2019-10-31","50.5"));
            result.Add(new CentralBankObject("2019-11-30","52.1"));
            result.Add(new CentralBankObject("2019-12-31","53.8"));
            result.Add(new CentralBankObject("2020-01-31","52.9"));
            return result.ToArray();
        }
    }
}