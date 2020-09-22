using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreMicroService_A.Controllers
{
    [Route("api/sql_injection/unsafe_code/")]
    [ApiController]
    public class SQLInjectionController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();

        // GET api/sql_injection/unsafe_code/<input: string>
        [HttpGet("{userInput}")]
        public async Task<ActionResult<IEnumerable<string>>> Get(string userInput)
        {
            //return new string[] { await forwardMsgToB(false, userInput) };

            string SinkAddress = Environment.GetEnvironmentVariable("NET_CORE_SINK_EXAMPLE_URL");
            var stringTask = client.GetStringAsync(SinkAddress + "/api/sql_injection_sink/" + userInput);
            var msg = await stringTask;

            return new string[] {"NET_CORE_REST_ENTRY_POINT_APP >>> " +  msg.ToString() };

        }
    }
}
