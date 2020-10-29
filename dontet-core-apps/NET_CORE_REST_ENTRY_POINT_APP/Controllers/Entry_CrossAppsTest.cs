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
    [Route("Entry")]
    [ApiController]
    public class Entry_CrossAppsTestController : ControllerBase
    {
        private string PROPOGATOR_API = "/Prop/NodeEntry/";

        private static readonly HttpClient client = new HttpClient();

        //Entry/Prop?name=
        [HttpGet("Prop")]
        public void Get(string name)
        {
            Console.WriteLine("Get(string name) got: " + name);

            string PropogatorAddress = Environment.GetEnvironmentVariable("NET_CORE_PROPOGATOR_EXAMPLE_URL") + PROPOGATOR_API;

            client.GetStringAsync(PropogatorAddress + name);
        }
    }
}
