using System.Collections.Generic;
using FunctionApp.Models;

namespace FunctionApp.Utils
{
    public static class MockDiffInflation
    {
        public static CentralBankObject[] GetMockData()
        {
            var result = new List<CentralBankObject>();
            result.Add(new CentralBankObject("2019-04-30","24.4"));
            result.Add(new CentralBankObject("2019-05-31","26.3"));
            result.Add(new CentralBankObject("2019-06-30","25.8"));
            result.Add(new CentralBankObject("2019-07-31","24.2"));
            result.Add(new CentralBankObject("2019-08-31","6.2"));
            result.Add(new CentralBankObject("2019-09-30","5.5"));
            result.Add(new CentralBankObject("2019-10-31","2.3"));
            result.Add(new CentralBankObject("2019-11-30","6.5"));
            result.Add(new CentralBankObject("2019-12-31","11.6"));
            result.Add(new CentralBankObject("2020-01-31","12.9"));
            return result.ToArray();
        }
    }
}