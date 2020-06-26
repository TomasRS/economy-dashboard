using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using FunctionApp.Utils;
using System.Net.Http;

namespace FunctionApp
{
    public static class GetUsdValues
    {
        [FunctionName("GetUsdValues")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Usds")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            try
            {
                HttpClient newClient = new HttpClient();
                HttpRequestMessage newRequest = new HttpRequestMessage(HttpMethod.Get, Environment.GetEnvironmentVariable("DolarSiEndpoint"));

                //Read Server Response
                HttpResponseMessage response = await newClient.SendAsync(newRequest);
                if (response.IsSuccessStatusCode)
                {
                    //Read response content
                    var result = response.Content.ReadAsStringAsync().Result;

                    //Need to deserialize manually because JSON response from previous call does not have property name in order to use a mapper.
                    var dollarTypes = Helper.Deserialize(result);
                
                    //Return
                    return new OkObjectResult(dollarTypes);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch (Exception)
            {
                return new NotFoundResult();
            }
        }
    }
}
