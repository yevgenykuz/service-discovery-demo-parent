using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace CoreMicroService_A.Controllers
{
    [Route("Entry/Sink")]
    [ApiController]
    public class Entry_SinkController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        private Uri url;
        private string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");

        // [GET] Entry_Point/Sink/<input: string>
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);
            client.GetStringAsync(SinkAddress + "/input_which_sent_using_GetStringAsync_"+userInput);
        }

        // [POST, strInput in the body] Entry_Point/Sink
        [HttpPost]
        public void Post([FromBody]string inputFromBody)
        {   
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);
            string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");
            client.PostAsync(SinkAddress, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }

        // [PUT, strInput in the body] Entry_Point/Sink/<input: string>
        [HttpPut("{input}")]
        public void Put(string input, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + input + " inputFromBody = " + inputFromBody);
            string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL") + "/" + input;

            client.PutAsync(SinkAddress, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }

        // DELETE api/values/<input: string>
        [HttpDelete("{userInput}")]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);
            string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");
            client.DeleteAsync(SinkAddress + "/" + userInput);   
        }
    }
}
