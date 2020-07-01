
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using Newtonsoft.Json;
using FunctionApp.Models;
using FunctionApp.Services;
using FunctionApp.Exceptions;

namespace FunctionApp
{
    public static class GetMonthlyInflation
    {
        [FunctionName("GetMonthlyInflation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "inflation/monthly")] HttpRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            try
            {
                var httpClientService = new HttpClientService();
                var result = await httpClientService.SendAsync(HttpMethod.Get, Environment.GetEnvironmentVariable("CentralBankMonthlyInflationEndpoint"), true, Environment.GetEnvironmentVariable("CentralBankBcraToken"));

                var currencyCirculationList = CentralBankObjectResponse.DeserializeJson(result);

                return new OkObjectResult(currencyCirculationList);
            }
            catch (ForbiddenException)
            {
                return new StatusCodeResult(403);
            }
            catch (NotFoundException)
            {
                return new NotFoundResult();
            }
        }
    }
}
