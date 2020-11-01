using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Pages.Internal.Account;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.IO;
using System.Net;
using System.Text;


namespace CoreMicroService_A.Controllers
{
    [Route("Entry/Prop/Sink")]
    [ApiController]
    public class Entry_Prop_SinkController : ControllerBase
    {
        private string PROPOGATOR_API = "/Propogator/Sink/";

        private static readonly HttpClient client = new HttpClient();

        // [GET] Entry_Point/Sink/<input: string>
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);

            string PropogatorAddress = Environment.GetEnvironmentVariable("NET_CORE_PROPOGATOR_EXAMPLE_URL") + PROPOGATOR_API;

            client.GetStringAsync(PropogatorAddress + userInput);
        }

        // [POST, strInput in the body] Entry_Point/Sink
        [HttpPost]
        public void Post([FromBody]string inputFromBody)
        {
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);

            string PropogatorAddress = Environment.GetEnvironmentVariable("NET_CORE_PROPOGATOR_EXAMPLE_URL") + PROPOGATOR_API;

            client.PostAsync(PropogatorAddress, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }

        // [PUT, strInput in the body] Entry_Point/Sink/<input: string>
        [HttpPut("{input}")]
        public void Put(string input, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + input + " inputFromBody = " + inputFromBody);

            string PropogatorAddress = Environment.GetEnvironmentVariable("NET_CORE_PROPOGATOR_EXAMPLE_URL") + PROPOGATOR_API;

            client.PutAsync(PropogatorAddress + input, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }

        // DELETE api/values/<input: string>
        [HttpDelete("{userInput}")]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);

            string PropogatorAddress = Environment.GetEnvironmentVariable("NET_CORE_PROPOGATOR_EXAMPLE_URL") + PROPOGATOR_API;

            client.DeleteAsync(PropogatorAddress + userInput);
        }
    }
}
