using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NET_FRAMEWORK_PROPOGATOR_APP.Controllers
{
    public class Propogator_SinkController : ApiController
    {
        private static readonly HttpClient client = new HttpClient();
        private string SinkAddress;
        private string SINK_API_WITH_INPUT = "/api/Sink?userInput=";
        private string SINK_API = "/api/Sink";

        public Propogator_SinkController()
        {
            this.SinkAddress = Environment.GetEnvironmentVariable("NET_FRAMEWORK_SINK_EXAMPLE_URL");
        }

        [HttpGet]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);

            string userInputAfterPropogator = userInput.Replace("--", "");

            client.GetStringAsync(SinkAddress + SINK_API_WITH_INPUT + userInputAfterPropogator);
        }

        [HttpPost]
        public void Post([FromBody] string inputFromBody)
        {
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);

            string inputFromBodyAfterPropogator = inputFromBody.Replace("--", "");

            client.PostAsync(SinkAddress + SINK_API, new StringContent(JsonConvert.SerializeObject(inputFromBodyAfterPropogator), System.Text.Encoding.UTF8, "application/json"));
        }

        [HttpPut]
        public void Put(string userInput, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + userInput + " inputFromBody = " + inputFromBody);

            string inputAfterPropogator = userInput.Replace("--", "");
            string inputFromBodyAfterPropogator = inputFromBody.Replace("--", "");

            client.PutAsync(SinkAddress + SINK_API_WITH_INPUT + inputAfterPropogator, new StringContent(JsonConvert.SerializeObject(inputFromBodyAfterPropogator), System.Text.Encoding.UTF8, "application/json")); ;
        }

        [HttpDelete]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);

            string userInputAfterPropogator = userInput.Replace("--", "");

            client.DeleteAsync(SinkAddress + SINK_API_WITH_INPUT + userInputAfterPropogator);
        }
    }
}
