using System.Collections.Generic;
using FunctionApp.Models;

namespace FunctionApp.Utils
{
    public static class MockAnnualExpectedInflation
    {
        public static CentralBankObject[] GetMockData()
        {
            var result = new List<CentralBankObject>();
            result.Add(new CentralBankObject("2019-04-30","31.4"));
            result.Add(new CentralBankObject("2019-05-31","31"));
            result.Add(new CentralBankObject("2019-06-30","30"));
            result.Add(new CentralBankObject("2019-07-31","30.2"));
            result.Add(new CentralBankObject("2019-08-31","48.3"));
            result.Add(new CentralBankObject("2019-09-30","48"));
            result.Add(new CentralBankObject("2019-10-31","48.2"));
            result.Add(new CentralBankObject("2019-11-30","45.6"));
            result.Add(new CentralBankObject("2019-12-31","42.2"));
            result.Add(new CentralBankObject("2020-01-31","40"));
            return result.ToArray();
        }
    }
}