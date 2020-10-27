using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NET_CORE_REST_ENTRY_POINT_APP.Controllers
{
    [Route("Entry4/Sink")]
    [ApiController]
    public class Entry4_Sink: ControllerBase
    {
        private Uri url;
        private string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");
        private static readonly HttpClient client = new HttpClient();

        // [GET] Entry_Point/Sink/<input: string>
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Sending GET request using HttpClient.SendAsync");
            url = new Uri(SinkAddress + "/input_which_sent_using_HttpClient.SendAsync()_" + userInput);
            HttpClient httpClient = new HttpClient();
            httpClient.SendAsync(new HttpRequestMessage(HttpMethod.Get, url));
        }
    }
}
