using System.Collections.Generic;
using FunctionApp.Models;

namespace FunctionApp.Utils
{
    public static class MockMonetaryBase
    {
        public static CentralBankObject[] GetMockData()
        {
            var result = new List<CentralBankObject>();
            result.Add(new CentralBankObject("2020-02-11","1930746"));
            result.Add(new CentralBankObject("2020-02-12","1928262"));
            result.Add(new CentralBankObject("2020-02-13","1957388"));
            result.Add(new CentralBankObject("2020-02-14","1954965"));
            result.Add(new CentralBankObject("2020-02-17","1966178"));
            result.Add(new CentralBankObject("2020-02-18","1941302"));
            result.Add(new CentralBankObject("2020-02-19","1941904"));
            result.Add(new CentralBankObject("2020-02-20","1887975"));
            result.Add(new CentralBankObject("2020-02-21","1855477"));
            result.Add(new CentralBankObject("2020-02-26","1807042"));
            return result.ToArray();
        }
    }
}