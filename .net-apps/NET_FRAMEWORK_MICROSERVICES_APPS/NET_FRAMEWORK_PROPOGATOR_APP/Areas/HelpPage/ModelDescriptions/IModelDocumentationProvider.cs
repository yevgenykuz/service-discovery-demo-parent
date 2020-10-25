using System;
using System.Reflection;

namespace NET_FRAMEWORK_PROPOGATOR_APP.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}