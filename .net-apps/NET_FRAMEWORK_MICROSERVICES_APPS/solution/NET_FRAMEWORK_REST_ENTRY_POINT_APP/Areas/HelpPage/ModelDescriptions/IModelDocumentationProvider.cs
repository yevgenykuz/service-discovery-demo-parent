using System;
using System.Reflection;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}