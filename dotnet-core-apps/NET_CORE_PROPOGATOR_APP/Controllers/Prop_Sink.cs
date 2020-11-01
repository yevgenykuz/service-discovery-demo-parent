using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace NET_CORE_PROPOGATOR_APP.Controllers
{
    [Route("Propogator/Sink")]
    [ApiController]
    public class Prop_SinkController : ControllerBase
    {
        private static bool debugMode = Environment.GetEnvironmentVariable("NET_CORE_MICRO_SERVICES_DEBUG") == "1";
        private static readonly HttpClient client = new HttpClient();
        private static string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");

        // [GET] Entry_Point/Sink/<input: string>
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);
            printCxHeaders();

            string userInputAfterPropogator = userInput.Replace("--", "");

            client.GetStringAsync(SinkAddress + "/" + userInputAfterPropogator);
        }

        // [POST, strInput in the body] Entry_Point/Sink
        [HttpPost]
        public void Post([FromBody]string inputFromBody)
        {
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);
            printCxHeaders();

            string inputFromBodyAfterPropogator = inputFromBody.Replace("--", "");

            client.PostAsync(SinkAddress, new StringContent(JsonConvert.SerializeObject(inputFromBodyAfterPropogator), System.Text.Encoding.UTF8, "application/json"));
        }

        // [PUT, strInput in the body] Entry_Point/Sink/<input: string>
        [HttpPut("{input}")]
        public void Put(string input, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + input + " inputFromBody = " + inputFromBody);
            printCxHeaders();

            string inputAfterPropogator = input.Replace("--", "");
            string inputFromBodyAfterPropogator = inputFromBody.Replace("--", "");

            client.PutAsync(SinkAddress + "/" + inputAfterPropogator, new StringContent(JsonConvert.SerializeObject(inputFromBodyAfterPropogator), System.Text.Encoding.UTF8, "application/json")); ;
        }

        // DELETE api/values/<input: string>
        [HttpDelete("{userInput}")]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);
            printCxHeaders();

            string userInputAfterPropogator = userInput.Replace("--", "");

            client.DeleteAsync(SinkAddress + "/" + userInputAfterPropogator);
        }

        private void printCxHeaders()
        {
            if (debugMode){
                var re = Request;
                var headers = re.Headers;
                string output = "checkmarx.uuid = " + headers["checkmarx.uuid"] + ", checkmarx.sequence = " + headers["checkmarx.sequence"];
                Console.WriteLine(output);
                Console.WriteLine();
            }            
        }
    }
}
