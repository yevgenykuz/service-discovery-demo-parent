using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NET_CORE_PROPOGATOR_APP.Controllers
{
    [Route("api/sql_injection_propogator")]
    [ApiController]
    public class SqlInjectionController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();

        // GET api/sql_injection/safe_code/<input: string>
        [HttpGet("{userInput}")]
        public async Task<ActionResult<IEnumerable<string>>> Get(string userInput)
        {
            string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");
            string userInputAfterPropogator = userInput.Replace("--", "");
            var stringTask = client.GetStringAsync(SinkAddress + "/api/sql_injection_sink/" + userInputAfterPropogator);
            var msg = await stringTask;
            
            return new string[] { "NET_CORE_PROPOGATOR_APP >>> :" +  msg.ToString() };

        }
    }
}
