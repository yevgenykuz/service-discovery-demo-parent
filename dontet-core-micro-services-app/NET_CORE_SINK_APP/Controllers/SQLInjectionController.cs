using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreMicroService_B.Controllers
{
    [Route("api/sql_injection_sink/")]
    [ApiController]
    public class SQLInjectionController : ControllerBase
    {
        // GET api/values/anyString
        [HttpGet("{userInput}")]
        public ActionResult<string> Get(string userInput)
        {
            if (!String.IsNullOrEmpty(userInput))
            {
                new SqlCommand().CommandText = userInput.ToUpper();
            }
            
            return "NET_CORE_SINK_APP: got this input: " + userInput + " and injected it to the DB ";
        }
    }
}