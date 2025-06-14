using Application.Interfaces;
using Application.Models.Helpers;
using Application.Services;
using Domain.Interfaces;
using Infrastructure.Context;
using Infrastructure.Data;
using Infrastructure.ThirdServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using MercadoPago.Config;
using Infrastructure.ThirstService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Configuración de DbContext
builder.Services.AddDbContext<EcommercePerfumesDbContext>(dbContextOptions => dbContextOptions.UseSqlite(
    builder.Configuration["ConnectionStrings:DBConnectionString"]));

// Configuración de autenticación
builder.Services.Configure<AuthenticationServiceOptions>(builder.Configuration.GetSection("AuthenticationServiceOptions"));

// Configuración de Swagger
builder.Services.AddSwaggerGen(setupAction =>
{
    setupAction.AddSecurityDefinition("EcommerceApiBearerAuth", new OpenApiSecurityScheme()
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "Please, paste the token to login for use all endpoints."
    });

    setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "EcommerceApiBearerAuth"
                        }
                    },
                    new List<string>()
                }
            });
});

// Configuración de autenticación con JWT
builder.Services.AddAuthentication("Bearer")
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true, // Valida el tiempo de vida del token
                    ClockSkew = TimeSpan.Zero, // Elimina la tolerancia por defecto de 5 minutos del token
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["AuthenticationServiceOptions:Issuer"],
                    ValidAudience = builder.Configuration["AuthenticationServiceOptions:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["AuthenticationServiceOptions:SecretForKey"]!))
                };
            }
        );

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Configuración de políticas de autorización
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("MinoristaOnly", policy => policy.RequireClaim("TypeUser", "Minorista"));
    options.AddPolicy("MayoristaOnly", policy => policy.RequireClaim("TypeUser", "Mayorista"));
    options.AddPolicy("SuperAdminOnly", policy => policy.RequireClaim("TypeUser", "SuperAdmin"));

    options.AddPolicy("MinoristaOrSuperAdmin", policy =>
    policy.RequireAssertion(context =>
        context.User.HasClaim("TypeUser", "Minorista") ||
        context.User.HasClaim("TypeUser", "SuperAdmin")));

    options.AddPolicy("MayoristaOrSuperAdmin", policy =>
    policy.RequireAssertion(context =>
        context.User.HasClaim("TypeUser", "Mayorista") ||
        context.User.HasClaim("TypeUser", "SuperAdmin")));

    options.AddPolicy("MinoristaOrMayoristaOrSuperAdmin", policy =>
    policy.RequireAssertion(context =>
          context.User.HasClaim("TypeUser", "Minorista") ||
          context.User.HasClaim("TypeUser", "Mayorista") ||
          context.User.HasClaim("TypeUser", "SuperAdmin")));
});

//Servicios de terceros
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IMercadoPagoService, MercadoPagoService>();



// Configuración de servicios de aplicación e infraestructura
#region
builder.Services.AddScoped<IMinoristaService, MinoristaService>();
builder.Services.AddScoped<IMayoristaService, MayoristaService>();
builder.Services.AddScoped<ISuperAdminService, SuperAdminService>();
builder.Services.AddScoped<IUserAvailableService, UserAvailableService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductOrCategoryService, ProductOrCategoryService>();
builder.Services.AddScoped<IOrderItemService, OrderItemService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

#endregion

// Configuración de repositorios de aplicación e infraestructura
#region
builder.Services.AddScoped<IMinoristaRepository, MinoristaRepository>();
builder.Services.AddScoped<IMayoristaRepository, MayoristaRepository>();
builder.Services.AddScoped<ISuperAdminRepository, SuperAdminRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
#endregion



var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configuración de Middleware previo al uso de controladores

app.UseMiddleware<UserValidationMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();


// Habilitación de CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
