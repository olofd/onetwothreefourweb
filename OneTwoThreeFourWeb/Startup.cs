using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OneTwoThreeFourWeb.Startup))]
namespace OneTwoThreeFourWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
