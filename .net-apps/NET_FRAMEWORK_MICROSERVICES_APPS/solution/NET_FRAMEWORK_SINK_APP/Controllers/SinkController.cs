using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NET_FRAMEWORK_SINK_APP.Controllers
{
    public class SinkController : ApiController
    {
        [HttpGet]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);
            injectToDB(userInput);
        }

        // [POST, strInput in the body] /
        [HttpPost]
        public void Post([FromBody] string inputFromBody)
        {
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);
            injectToDB(inputFromBody);
        }

        [HttpPut]
        public void Put(string userInput, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + userInput + " inputFromBody = " + inputFromBody);
            injectToDB(userInput + "_" + inputFromBody);
        }

        [HttpDelete]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);
            injectToDB(userInput);
        }

        private void injectToDB(string userInput)
        {
            if (!String.IsNullOrEmpty(userInput))
            {
                new SqlCommand().CommandText = userInput.ToUpper();
                new SqlCommand().CommandText = userInput.ToUpper();
            }
        }
    }
}
