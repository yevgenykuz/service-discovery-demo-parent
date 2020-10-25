using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace NET_FRAMEWORK_REST_ENTRY_POINT_APP.Areas.HelpPage.ModelDescriptions
{
    public class EnumTypeModelDescription : ModelDescription
    {
        public EnumTypeModelDescription()
        {
            Values = new Collection<EnumValueDescription>();
        }

        public Collection<EnumValueDescription> Values { get; private set; }
    }
}