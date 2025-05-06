using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using Microsoft.AspNetCore.Mvc;
using Application.Models.Dtos;


namespace Infrastructure.ThirstService
{
    public class MercadoPagoService : IMercadoPagoService
    {
        public MercadoPagoService(IConfiguration configuration)
        {
            MercadoPagoConfig.AccessToken = configuration["MercadoPago:AccessToken"];
        }

        public async Task<string> CreatePreferenceAsync(CreatePreferenceDto dto)
        {
            var request = new PreferenceRequest
            {
                Purpose = "wallet_purchase",
                Items = new List<PreferenceItemRequest>
                {
                    new PreferenceItemRequest
                    {
                        Title = dto.Title,
                        Quantity = dto.Quantity,
                        CurrencyId = "ARS",
                        UnitPrice = dto.UnitPrice
                    }
                }
            };

            var client = new PreferenceClient();
            var preference = await client.CreateAsync(request);
            return preference.Id;
        }
    }
}
