using System.Web;
using System.Web.Mvc;

namespace NET_FRAMEWORK_SINK_APP
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
