using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using FunctionApp.Utils;
using FunctionApp.Models;
using FunctionApp.Services;
using FunctionApp.Exceptions;

namespace FunctionApp
{
    public static class GetExpectedAnnualInflation
    {
        [FunctionName("GetExpectedAnnualInflation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "inflation/annualexpected")] HttpRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            
            try
            {
                var httpClientService = new HttpClientService();
                var result = await httpClientService.SendAsync<string>(HttpMethod.Get, Environment.GetEnvironmentVariable("CentralBankExpectedAnnualInflationEndpoint"), true, Environment.GetEnvironmentVariable("CentralBankBcraToken"));

                var annualExpectedInflationList = CentralBankObjectResponse.DeserializeJson(result);

                return new OkObjectResult(annualExpectedInflationList);
            }
            catch (ForbiddenException)
            {
                return new OkObjectResult(MockAnnualExpectedInflation.GetMockData());
            }
            catch (NotFoundException)
            {
                return new NotFoundResult();
            }
        }
    }
}
