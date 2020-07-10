using System.Net.Http;
using System.Threading.Tasks;
using AzureFunctions.Extensions.Swashbuckle;
using AzureFunctions.Extensions.Swashbuckle.Attribute;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FunctionApp
{
    public static class SwaggerFunctions
    {
        [FunctionName("SwaggerJson")]
        [SwaggerIgnore]
        public static Task<HttpResponseMessage> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "swagger/json")]
        HttpRequestMessage req,
        ILogger log,
        [SwashBuckleClient] ISwashBuckleClient swashBuckleClient)
        {
            var response = Task.FromResult(swashBuckleClient.CreateSwaggerDocumentResponse(req));
            return response;
        }

        [FunctionName("SwaggerUI")]
        [SwaggerIgnore]
        public static Task<HttpResponseMessage> RunUI(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "swagger")]
        HttpRequestMessage req,
        ILogger log,
        [SwashBuckleClient] ISwashBuckleClient swashBuckleClient)
        {
            return Task.FromResult(swashBuckleClient.CreateSwaggerUIResponse(req, "swagger/json"));
        }
    }
}