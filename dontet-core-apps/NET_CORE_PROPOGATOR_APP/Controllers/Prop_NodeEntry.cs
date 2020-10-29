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
    [Route("Prop/NodeEntry")]
    [ApiController]
    public class Prop_NodeEntryController : ControllerBase
    {
        private static bool debugMode = Environment.GetEnvironmentVariable("NET_CORE_MICRO_SERVICES_DEBUG") == "1";
        private static readonly HttpClient client = new HttpClient();
        private static string NodeEntryPointAddress = Environment.GetEnvironmentVariable("NODEJS_REST_ENTRY_POINT_EXAMPLE_URL");
        private static string NodeEntryPointAPI = "/sendToService2?id=";
       
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);
            printCxHeaders();

            string userInputAfterPropogator = userInput.Replace("--", "");

            client.GetStringAsync(NodeEntryPointAddress + NodeEntryPointAPI + userInputAfterPropogator);
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
