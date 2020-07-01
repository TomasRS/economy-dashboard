using System;
using System.Net;
using System.Threading.Tasks;
using System.Net.Http;
using FunctionApp.Exceptions;

namespace FunctionApp.Services
{
    public class HttpClientService
    {
        public async Task<string> SendAsync(HttpMethod httpMethod, string uri, bool withAuthorizationBearer = false, string bearer = null)
        {
            var newClient = new HttpClient();
            var newRequest = new HttpRequestMessage(httpMethod, uri);
            if (withAuthorizationBearer)
                newRequest.Headers.Add("Authorization", $"Bearer {bearer}");

            //Read Server Response
            var response = await newClient.SendAsync(newRequest);
            if (response.IsSuccessStatusCode)
            {
                //Read response content
                var result = response.Content.ReadAsStringAsync().Result;
                return result;
            }
            else if (response.StatusCode.ToString() == HttpStatusCode.Forbidden.ToString())
            {
                throw new ForbiddenException();
            }
            else
            {
                throw new NotFoundException();
            }

        }
    }
}