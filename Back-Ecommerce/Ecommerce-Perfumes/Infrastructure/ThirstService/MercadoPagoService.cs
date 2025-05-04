using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Infrastructure.ThirstService
{
    public class MercadoPagoService : IMercadoPagoService
    {
        public MercadoPagoService(IConfiguration configuration)
        {
            var accessToken = configuration["MercadoPago:AccessToken"];
            MercadoPago.Config.AccessToken = accessToken;
        }
    }
}
