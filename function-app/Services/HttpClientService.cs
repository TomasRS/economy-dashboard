using System;
using System.Net;
using System.Threading.Tasks;
using System.Net.Http;
using FunctionApp.Exceptions;

namespace FunctionApp.Services
{
    public class HttpClientService
    {
        public async Task<string> SendAsync<T>(HttpMethod httpMethod, string uri, bool withAuthorizationBearer = false, string bearer = null)
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

        public async Task<HttpResponseMessage> SendAsync(HttpMethod httpMethod, string uri){
            var client = new HttpClient();
            var request = new HttpRequestMessage(httpMethod, uri);
            var response = await client.SendAsync(request);
            return response;
        }
    }
}