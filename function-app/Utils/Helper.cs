using FunctionApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace FunctionApp.Utils
{
    public static class Helper
    {
        public static string BuildNumber(IEnumerable<IEnumerable<string>> list, int firstListIndex, int secondListFirstIndex, int secondListSecondIndex)
        {
            var firstNumber = list.ToList().ElementAt(firstListIndex).ElementAt(secondListFirstIndex).Replace("\"", "");
            var secondNumber = list.ElementAt(firstListIndex).ElementAt(secondListSecondIndex).Replace("\"", "");

            return  firstNumber + ',' + secondNumber.Remove(secondNumber.Length - 1);
        }

        public static string BuildName(IEnumerable<IEnumerable<string>> list, int firstListIndex, int secondListIndex)
        {
            return list.ToList().ElementAt(firstListIndex).ElementAt(secondListIndex).Replace("\"", "");
        }

        public static DollarType[] Deserialize(string result)
        {
                List<List<string>> listOfValues = new List<List<string>>();
                foreach(var item in result.Split(':'))
                {
                    var value = item.Split(',');
                    listOfValues.Add(value.ToList());
                }

                #region deserialiation
                var dollarTypes = new DollarTypes();
                dollarTypes.DollarValues = new List<DollarType>();
                dollarTypes.DollarValues.Add(new DollarType()
                {
                    Name = Helper.BuildName(listOfValues, 5, 0),
                    BuyValue = Helper.BuildNumber(listOfValues, 2, 0, 1),
                    SellValue = Helper.BuildNumber(listOfValues, 3, 0 , 1)
                });
                dollarTypes.DollarValues.Add(new DollarType()
                {
                    Name = Helper.BuildName(listOfValues, 13, 0),
                    BuyValue = Helper.BuildNumber(listOfValues, 10, 0, 1),
                    SellValue = Helper.BuildNumber(listOfValues, 11, 0 , 1)
                });
                dollarTypes.DollarValues.Add(new DollarType()
                {
                    Name = "Dolar CCL",
                    BuyValue = Helper.BuildNumber(listOfValues, 26, 0, 1),
                    SellValue = Helper.BuildNumber(listOfValues, 27, 0 , 1)
                });
                dollarTypes.DollarValues.Add(new DollarType()
                {
                    Name = Helper.BuildName(listOfValues, 37, 0),
                    BuyValue = Helper.BuildNumber(listOfValues, 34, 0, 1),
                    SellValue = Helper.BuildNumber(listOfValues, 35, 0 , 1)
                });
                #endregion

                return dollarTypes.DollarValues.ToArray();
        }
    }
}