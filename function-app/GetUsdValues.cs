using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using FunctionApp.Utils;
using System.Net.Http;
using FunctionApp.Services;
using FunctionApp.Exceptions;

namespace FunctionApp
{
    public static class GetUsdValues
    {
        [FunctionName("GetUsdValues")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "currency/usds")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            try
            {
                var httpClientService = new HttpClientService();
                var result = await httpClientService.SendAsync<string>(HttpMethod.Get, Environment.GetEnvironmentVariable("DolarSiEndpoint"));

                var currencyCirculationList = Helper.Deserialize(result);

                return new OkObjectResult(currencyCirculationList);
            }
            catch (NotFoundException)
            {
                return new NotFoundResult();
            }
        }
    }
}
