using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP.Controllers
{
    public class Entry_Sink3Controller : ApiController
    {
        private static readonly HttpClient client = new HttpClient();
        private Uri url;
        private string SinkAddress;
        private string SINK_API_WITH_INPUT = "/api/Sink?userInput=";

        public Entry_Sink3Controller()
        {
            this.SinkAddress = Environment.GetEnvironmentVariable("NET_FRAMEWORK_SINK_EXAMPLE_URL");
        }
        [HttpGet]
        public void Get(string userInput)
        {
            Console.WriteLine("Sending GET request using WebClient.Create");
            url = new Uri(SinkAddress + SINK_API_WITH_INPUT + "input_which_sent_using_WebClient.Create(url)_" + userInput);
            WebClient webClient = new WebClient();
            Stream data = webClient.OpenRead(url);
            data.Close();
        }
    }
}
