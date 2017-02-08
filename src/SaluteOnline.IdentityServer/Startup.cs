using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Validation;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SaluteOnline.Domain.Enums;
using SaluteOnline.IdentityServer.DAL;

namespace SaluteOnline.IdentityServer
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityServer()
                .SetTemporarySigningCredential()
                .AddInMemoryStores()
                .AddInMemoryScopes(new List<Scope>
                {
                    StandardScopes.OpenId,
                    StandardScopes.ProfileAlwaysInclude,
                    StandardScopes.EmailAlwaysInclude,
                    StandardScopes.OfflineAccess,
                    StandardScopes.RolesAlwaysInclude,
                    new Scope
                    {
                        Name = "SaluteOnlineApi",
                        DisplayName = "Salute Online API",
                        Description = "Salute Online API",
                        Type = ScopeType.Resource,
                        ScopeSecrets = new List<Secret>
                        {
                            new Secret("secret".Sha512())
                        },
                        Claims = new List<ScopeClaim>
                        {
                            new ScopeClaim("role")
                        }
                    },
                    new Scope
                    {
                        Name = "Self",
                        DisplayName = "Identity Server",
                        Description = "Identity Server",
                        Type = ScopeType.Resource,
                        ScopeSecrets = new List<Secret>
                        {
                            new Secret("secret".Sha512())
                        },
                        Claims = new List<ScopeClaim>
                        {
                            new ScopeClaim("role")
                        }
                    }
                });
            services.AddTransient<IRepository, MongoDbRepository>();
            services.AddTransient<IClientStore, MongoClientStore>();
            services.AddTransient<IProfileService, MongoDbProfileService>();
            services.AddTransient<IResourceOwnerPasswordValidator, MongoDbResourceOwnerPasswordValidator>();
            services.AddTransient<IPasswordHasher<Domain.User.MongoUser>, PasswordHasher<Domain.User.MongoUser>>();
            services.AddTransient<LoginService>();
            services.AddCors(
                options =>
                        options.AddPolicy("AllowSpecificOrigin", builder => builder.WithOrigins("http://localhost:8080")));
            services.AddAuthorization(
                options =>
                {
                    options.AddPolicy(Role.User.ToString(), policyUser => policyUser.RequireClaim("role", Role.User.ToString()));
                    options.AddPolicy(Role.Admin.ToString(), policyUser => policyUser.RequireClaim("role", Role.Admin.ToString()));
                    options.AddPolicy(Role.SilentDon.ToString(), policyUser => policyUser.RequireClaim("role", Role.SilentDon.ToString()));
                });
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            app.UseDeveloperExceptionPage();
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());
            app.UseIdentityServer();
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = "http://localhost:9657/",
                ScopeName = "Self",
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                RequireHttpsMetadata = false
            });
            app.UseMvc();
        }
    }
}

