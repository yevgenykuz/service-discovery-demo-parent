using DocumentFormat.OpenXml.Spreadsheet;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP.Controllers
{
    public class Entry_Sink5Controller : ApiController
    {
        private string SinkAddress;
        private string SINK_API_WITH_INPUT = "/api/Sink?userInput=";
        private static readonly HttpClient client = new HttpClient();

        public Entry_Sink5Controller()
        {
            this.SinkAddress = Environment.GetEnvironmentVariable("NET_FRAMEWORK_SINK_EXAMPLE_URL");
        }
        [HttpGet]
        public void Get(string userInput)
        {
            Console.WriteLine("Sending GET request using RestRequest");
            var client = new RestClient(SinkAddress);
            var request = new RestRequest(SINK_API_WITH_INPUT + "input_which_sent_using_RestRequest_" + userInput, Method.GET);
            var queryResult = client.Execute<List<Items>>(request).Data;
        }
    }
}
