using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NET_CORE_REST_ENTRY_POINT_APP.Controllers
{
    [Route("Entry2/Sink")]
    [ApiController]
    public class Entry2_Sink : ControllerBase
    {
        private Uri url;
        private string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");

        // [GET] Entry_Point/Sink/<input: string>
        [HttpGet("{userInput}")]
        public void Get(string userInput)
        {
            Console.WriteLine("Sending GET request using WebRequest.Create(url)");
            url = new Uri(SinkAddress + "/input_which_sent_using_WebRequest.Create(url)_" + userInput);
            WebRequest myWebRequest = WebRequest.Create(url); // Create a 'WebRequest' object with the specified url. 
            WebResponse myWebResponse = myWebRequest.GetResponse(); // Send the 'WebRequest' and wait for response.
            myWebResponse.Close(); // Release resources of response object.
        }
    }
}
