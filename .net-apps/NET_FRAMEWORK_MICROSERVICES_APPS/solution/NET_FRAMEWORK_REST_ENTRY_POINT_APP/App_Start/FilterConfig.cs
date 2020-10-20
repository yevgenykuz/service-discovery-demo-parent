using System.Web;
using System.Web.Mvc;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
