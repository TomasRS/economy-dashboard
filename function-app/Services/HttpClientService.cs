using System;
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
            if(withAuthorizationBearer)
                newRequest.Headers.Add("Authorization", $"Bearer {bearer}");

            try
            {
                //Read Server Response
                var response = await newClient.SendAsync(newRequest);
                if (response.IsSuccessStatusCode)
                {
                    //Read response content
                    var result = response.Content.ReadAsStringAsync().Result;
                    return result;
                }
                else
                {
                    throw new NotFoundException();
                }
            }
            catch(Exception)
            {
                throw new NotFoundException();
            }
        } 
    }
}