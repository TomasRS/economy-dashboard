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

namespace FunctionApp
{
    public static class GetMonetaryBase
    {
        [FunctionName("GetMonetaryBase")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "monetarybase")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            try
            {
                HttpClient newClient = new HttpClient();
                HttpRequestMessage newRequest = new HttpRequestMessage(HttpMethod.Get, Environment.GetEnvironmentVariable("CentralBankMonetaryBaseEndpoint"));
                newRequest.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("CentralBankBcraToken")}");

                //Read Server Response
                HttpResponseMessage response = await newClient.SendAsync(newRequest);
                if (response.IsSuccessStatusCode)
                {
                    //Read response content
                    var result = response.Content.ReadAsStringAsync().Result;
                    var apiResponse = CentralBankObjectResponse.DeserializeJson(result);

                    return new OkObjectResult(apiResponse);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
