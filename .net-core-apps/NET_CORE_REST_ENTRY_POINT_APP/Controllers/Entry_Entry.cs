using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NET_CORE_REST_ENTRY_POINT_APP.Controllers
{
    [Route("Entry/Entry")]
    [ApiController]
    public class Entry_Entry: ControllerBase
    {
        private Uri url;
        private string EntryAddress = Environment.GetEnvironmentVariable("NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL");
        private static readonly HttpClient client = new HttpClient();
        private int iterationsInt;

        [HttpGet("{iterations}")]
        public void Get(string iterations)
        {
            try
            {
                if ((iterationsInt =  Int32.Parse(iterations)) > 0)
                {
                    iterations = (iterationsInt-1).ToString();
                    Console.WriteLine("Sending to my self: " + iterations);
                    url = new Uri(EntryAddress + "/Entry/Entry/" + iterations);
                    HttpClient httpClient = new HttpClient();
                    Thread.Sleep(100);
                    httpClient.SendAsync(new HttpRequestMessage(HttpMethod.Get, url));
                }
            }
            catch (Exception e) 
            {
                Console.WriteLine(e.ToString());
            }           
        }
    }
}
