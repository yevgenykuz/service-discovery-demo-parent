using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.IO;
using RestSharp;
using DocumentFormat.OpenXml.Spreadsheet;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP.Controllers
{
    public class Entry_SinkController : ApiController
    {
        private static readonly HttpClient client = new HttpClient();
        private Uri url;
        private string SinkAddress; 
        private string SINK_API_WITH_INPUT = "/api/Sink?userInput=";
        private string SINK_API = "/api/Sink";

        public Entry_SinkController()
        {
            this.SinkAddress = Environment.GetEnvironmentVariable("NET_FRAMEWORK_SINK_EXAMPLE_URL");
        }
        [HttpGet]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);
            var client = new RestClient(SinkAddress);
            var request = new RestRequest(SINK_API_WITH_INPUT + userInput, Method.GET);

            IRestResponse response = client.Execute(request);
            var content = response.Content; 
        }

        // [POST, strInput in the body] Entry_Point/Sink
        [HttpPost]
        public void Post([FromBody] string inputFromBody)
        {
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);
            client.PostAsync(SinkAddress + SINK_API, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }

        // [PUT, strInput in the body] Entry_Point/Sink/<input: string>
        [HttpPut]
        public void Put(string input, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + input + " inputFromBody = " + inputFromBody);
            client.PutAsync(SinkAddress + SINK_API_WITH_INPUT, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }

        // DELETE api/values/<input: string>
        [HttpDelete]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);
            client.DeleteAsync(SinkAddress + SINK_API_WITH_INPUT + userInput);
        }
    }
}

