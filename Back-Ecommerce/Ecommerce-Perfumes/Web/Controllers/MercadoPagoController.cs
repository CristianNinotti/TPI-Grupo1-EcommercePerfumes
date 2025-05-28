using Infrastructure.ThirstService;
using MercadoPago.Resource.Preference;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Text;
using Application.Interfaces;
using Application.Models.Dtos;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MercadoPagoController : ControllerBase
    {
        private readonly IMercadoPagoService _mercadoPagoService;

        public MercadoPagoController(IMercadoPagoService mercadoPagoService)
        {
            _mercadoPagoService = mercadoPagoService;
        }

        [HttpPost("create-preference")]
        public async Task<IActionResult> CreatePreference([FromBody] List<CreatePreferenceDto> dtos)
        {
            var preferenceId = await _mercadoPagoService.CreatePreferenceAsync(dtos);
            return Ok(new { preferenceId });
        }
    }
}
