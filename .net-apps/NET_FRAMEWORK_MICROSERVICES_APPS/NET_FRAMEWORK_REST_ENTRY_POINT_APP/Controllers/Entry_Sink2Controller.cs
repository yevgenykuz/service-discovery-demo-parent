using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP.Controllers
{
    public class Entry_Sink2Controller : ApiController
    {
        private static readonly HttpClient client = new HttpClient();
        private Uri url;
        private string SinkAddress;
        private string SINK_API_WITH_INPUT = "/api/Sink?userInput=";
        
        public Entry_Sink2Controller()
        {
            this.SinkAddress = Environment.GetEnvironmentVariable("NET_FRAMEWORK_SINK_EXAMPLE_URL");
        }
        [HttpGet]
        public void Get(string userInput)
        {
            Console.WriteLine("Sending GET request using WebRequest.Create(url)");
            
            url = new Uri(SinkAddress + SINK_API_WITH_INPUT + "input_which_sent_using_WebRequest.Create(url)_" + userInput);
            WebRequest myWebRequest = WebRequest.Create(url); // Create a 'WebRequest' object with the specified url. 
            WebResponse myWebResponse = myWebRequest.GetResponse(); // Send the 'WebRequest' and wait for response.
            myWebResponse.Close(); // Release resources of response object.
        }
    }
}
