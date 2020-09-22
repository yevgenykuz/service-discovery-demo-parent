using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace CoreMicroService_A
{
    public class Program
    {

        public static async Task Main(string[] args)
        {
            string appAddress = Environment.GetEnvironmentVariable("NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL");


            new WebHostBuilder()
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseStartup<Startup>()
            .UseUrls(appAddress)
            .Build()
            .Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}