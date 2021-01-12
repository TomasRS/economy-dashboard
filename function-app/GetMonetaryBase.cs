using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using FunctionApp.Models;
using FunctionApp.Utils;
using FunctionApp.Exceptions;
using FunctionApp.Services;

namespace FunctionApp
{
    public static class GetMonetaryBase
    {
        [FunctionName("GetMonetaryBase")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "currency/monetarybase")] HttpRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            
            try
            {
                var httpClientService = new HttpClientService();
                var token = Environment.GetEnvironmentVariable("CentralBankToken");
                var endpointUrl = $"{Environment.GetEnvironmentVariable("CentralBankDomain")}{Environment.GetEnvironmentVariable("CentralBankMonetaryBaseEndpoint")}";
                var result = await httpClientService.SendAsync<string>(HttpMethod.Get, endpointUrl, true, token);

                var monetaryBaseList = CentralBankObjectResponse.DeserializeJson(result);

                return new OkObjectResult(monetaryBaseList);
            }
            catch (ForbiddenException)
            {
                return new OkObjectResult(MockMonetaryBase.GetMockData());
            }
            catch (NotFoundException)
            {
                return new NotFoundResult();
            }
        }
    }
}
