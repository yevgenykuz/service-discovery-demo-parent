using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreMicroService_B.Controllers
{
    [Route("")]
    [ApiController]
    public class SinkController : ControllerBase
    {
        private static bool debugMode = Environment.GetEnvironmentVariable("NET_CORE_MICRO_SERVICES_DEBUG") == "1";

        // [GET /<input: string>]
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);
            printCxHeaders();
            injectToDB(userInput);
        }

        // [POST, strInput in the body] /
        [HttpPost]
        public void Post([FromBody]string inputFromBody)
        {   
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);
            printCxHeaders();
            injectToDB(inputFromBody);
        }

        // [PUT, strInput in the body] /<input: string>
        [HttpPut("{input}")]
        public void Put(string input, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + input + " inputFromBody = " + inputFromBody);
            printCxHeaders();
            injectToDB(input + "_" + inputFromBody);
        }

        // [DELETE /<input: string>]
        [HttpDelete("{userInput}")]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);
            printCxHeaders();
            injectToDB(userInput);
        }

        private void injectToDB(string userInput)
        {
            if (!String.IsNullOrEmpty(userInput))
            {
                new SqlCommand().CommandText = userInput.ToUpper();
            }
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