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
    public static class GetInterannualVsExpectedInflation
    {
        [FunctionName("GetInterannualVsExpectedInflation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "inflation/interannualvsexpected")] HttpRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            
            try
            {
                var httpClientService = new HttpClientService();
                var token = Environment.GetEnvironmentVariable("CentralBankToken");
                var endpointUrl = $"{Environment.GetEnvironmentVariable("CentralBankDomain")}{Environment.GetEnvironmentVariable("CentralBankInterannualVsExpectedInflationEndpoint")}";
                var result = await httpClientService.SendAsync<string>(HttpMethod.Get, endpointUrl, true, token);

                var diffInflationList = CentralBankObjectResponse.DeserializeJson(result);

                return new OkObjectResult(diffInflationList);
            }
            catch (ForbiddenException)
            {
                return new OkObjectResult(MockDiffInflation.GetMockData());
            }
            catch (NotFoundException)
            {
                return new NotFoundResult();
            }
        }
    }
}
