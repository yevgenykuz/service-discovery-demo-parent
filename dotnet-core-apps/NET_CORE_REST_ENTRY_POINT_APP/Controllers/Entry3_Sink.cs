using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NET_CORE_REST_ENTRY_POINT_APP.Controllers
{
    [Route("Entry3/Sink")]
    [ApiController]
    public class Entry3_Sink : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        private Uri url;
        private string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");

        // [GET] Entry_Point/Sink/<input: string>
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Sending GET request using WebClient.Create");
            url = new Uri(SinkAddress + "/input_which_sent_using_WebClient.Create(url)_" + userInput);
            WebClient webClient = new WebClient();
            Stream data = webClient.OpenRead(url);
            data.Close();
        }
    }
}
