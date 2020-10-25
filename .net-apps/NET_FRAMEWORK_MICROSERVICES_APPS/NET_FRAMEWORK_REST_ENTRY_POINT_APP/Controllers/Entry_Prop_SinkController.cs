using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;
using System.Text;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP.Controllers
{
    public class Entry_Prop_SinkController : ApiController
    {
        private string PropogatorAddress; 
        private string PROPOGATOR_API = "/api/Propogator_Sink/";
        private string PROPOGATOR_API_WITH_INPUT = "/api/Propogator_Sink?userInput=" ;
        private static readonly HttpClient client = new HttpClient();

        public Entry_Prop_SinkController()
        {
            this.PropogatorAddress = Environment.GetEnvironmentVariable("NET_FRAMEWORK_PROPOGATOR_EXAMPLE_URL");
        }
        [HttpGet]
        public void Get(string userInput)
        {
            Console.WriteLine("Get(string userInput) got: " + userInput);

            client.GetStringAsync(PropogatorAddress + PROPOGATOR_API_WITH_INPUT + userInput);
        }

        [HttpPost]
        public void Post([FromBody] string inputFromBody)
        {
            Console.WriteLine("Post([FromBody]string inputFromBody) got: " + inputFromBody);

            client.PostAsync(PropogatorAddress + PROPOGATOR_API, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }
        
        [HttpPut]
        public void Put(string input, [FromBody] string inputFromBody)
        {
            Console.WriteLine("Put(string input, [FromBody] string inputFromBody): input = " + input + " inputFromBody = " + inputFromBody);

            client.PutAsync(PropogatorAddress + PROPOGATOR_API_WITH_INPUT + input, new StringContent(JsonConvert.SerializeObject(inputFromBody), System.Text.Encoding.UTF8, "application/json"));
        }

        [HttpDelete]
        public void Delete(string userInput)
        {
            Console.WriteLine("Delete(string userInput) got: " + userInput);

            client.DeleteAsync(PropogatorAddress + PROPOGATOR_API_WITH_INPUT + userInput);
        }
    }
}
