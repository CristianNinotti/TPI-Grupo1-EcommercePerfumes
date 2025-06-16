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
using MercadoPago.Client.Payment;
using MercadoPago.Resource.Payment;

namespace Infrastructure.ThirstService
{
    public class MercadoPagoService : IMercadoPagoService
    {
        public MercadoPagoService(IConfiguration configuration)
        {
            MercadoPagoConfig.AccessToken = configuration["MercadoPago:AccessToken"];
        }

        public async Task<string> CreatePreferenceAsync(List<CreatePreferenceDto> dtos)
        {
            var request = new PreferenceRequest
            {
                Purpose = "wallet_purchase",
                Items = dtos.Select(dto => new PreferenceItemRequest
                {
                    Title = dto.Title,
                    Quantity = dto.Quantity,
                    CurrencyId = "ARS",
                    UnitPrice = dto.UnitPrice
                }).ToList(),
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Success = "https://localhost:5173/pagoExitoso?status=success",
                    Failure = "https://localhost:5173/pagoExitoso?status=failure",
                    Pending = "https://localhost:5173/pagoExitoso?status=pending"
                },
                AutoReturn = "approved"
            };

            var client = new PreferenceClient();
            var preference = await client.CreateAsync(request);
            return preference.Id;
        }

    }
}
