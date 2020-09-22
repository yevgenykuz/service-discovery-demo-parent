using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NET_CORE_REST_ENTRY_POINT_APP.Controllers
{
    [Route("api/sql_injection/safe_code/")]
    [ApiController]
    public class SafeSqlInjectionController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        
        // GET api/sql_injection/safe_code/<input: string>
        [HttpGet("{userInput}")]
        public async Task<ActionResult<IEnumerable<string>>> Get(string userInput)
        {
            string PropogatorAddress = Environment.GetEnvironmentVariable("NET_CORE_PROPOGATOR_EXAMPLE_URL");
            var stringTask = client.GetStringAsync(PropogatorAddress + "/api/sql_injection_propogator/" + userInput);
            var msg = await stringTask;

            return new string[] { "NET_CORE_REST_ENTRY_POINT_APP >>> " + msg.ToString() };

        }
    }
}