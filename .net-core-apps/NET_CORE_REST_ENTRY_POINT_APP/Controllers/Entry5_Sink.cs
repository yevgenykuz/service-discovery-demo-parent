using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace NET_CORE_REST_ENTRY_POINT_APP.Controllers
{
    [Route("Entry5/Sink")]
    [ApiController]
    public class Entry5_Sink: ControllerBase
    {
        private Uri url;
        private string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");
        private static readonly HttpClient client = new HttpClient();

        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Sending GET request using RestRequest");
            var client = new RestClient(SinkAddress);
            var request = new RestRequest("/input_which_sent_using_RestRequest_" + userInput, Method.GET);
            var queryResult = client.Execute<List<Items>>(request).Data;
        }
    }
}
