using JewelryStore.API.Authentication;
using JewelryStore.BL;
using JewelryStore.Common;
using JewelryStore.DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace JewelryStore.API
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
            services.AddControllers();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString(Constants.DefaultConnection)), ServiceLifetime.Transient, ServiceLifetime.Transient);
            services.AddCors(options =>
            {
                options.AddPolicy(Constants.AllowAll, builder => builder.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader());
            });

            // Swagger Configuration
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(SwaggerConstants.SwaggerVersion, new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = SwaggerConstants.PlaceInfoService,
                    Version = SwaggerConstants.SwaggerVersion,
                    Description = SwaggerConstants.PlaceInfoService,
                });
            });

            // Dependency registartion
            services.AddTransient<ICustomerBusiness, CustomerBusiness>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IJewelryStoreRepository, JewelryStoreRepository>();
            services.AddTransient<IJewelryStoreBusiness, JewelryStoreBusiness>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCors(Constants.AllowAll);
            app.UseRouting();
            app.UseMiddleware<JwtMiddleware>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSwagger();
            app.UseSwaggerUI(options => options.SwaggerEndpoint(SwaggerConstants.SwaggerPath, SwaggerConstants.PlaceInfo));
        }
    }
}
