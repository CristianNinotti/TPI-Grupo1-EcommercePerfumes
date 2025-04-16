using Application.Interfaces;
using Application.Services;
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


// Configuraci�n de DbContext
builder.Services.AddDbContext<EcommercePerfumesDbContext>(dbContextOptions => dbContextOptions.UseSqlite(
    builder.Configuration["ConnectionStrings:DBConnectionString"]));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Configuraci�n de servicios de aplicaci�n e infraestructura
#region
builder.Services.AddScoped<IMinoristaService, MinoristaService>();
builder.Services.AddScoped<IMayoristaService, MayoristaService>();
builder.Services.AddScoped<ISuperAdminService, SuperAdminService>();
#endregion


// Configuraci�n de repositorios de aplicaci�n e infraestructura
#region
builder.Services.AddScoped<IMinoristaRepository, MinoristaRepository>();
builder.Services.AddScoped<IMayoristaRepository, MayoristaRepository>();
builder.Services.AddScoped<ISuperAdminRepository, SuperAdminRepository>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
