using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JlueTaxSystemHuNanBS.Code;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JlueTaxSystemHuNanBS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddSingleton<YsbqcSetting>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddDistributedMemoryCache();
            services.AddSession();

            services.AddMvc(config => { config.Filters.Add<ActionFilter>(); config.Filters.Add<AuthorizationFilter>(); config.Filters.Add<GlobalExceptionFilter>(); }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseDeveloperExceptionPage();
                //app.UseExceptionHandler("/Home/Error");
            }

            app.UseMiddleware<ExceptionHandlingMiddleware>();

            MyMiddlewareExtensions.UseMiddleware(app);


            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseSession();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

            });

            CurrentUser.hca = (IHttpContextAccessor)app.ApplicationServices.GetRequiredService(typeof(IHttpContextAccessor));
            GTXMethod.config = (IConfiguration)app.ApplicationServices.GetRequiredService(typeof(IConfiguration));

        }
    }
}
