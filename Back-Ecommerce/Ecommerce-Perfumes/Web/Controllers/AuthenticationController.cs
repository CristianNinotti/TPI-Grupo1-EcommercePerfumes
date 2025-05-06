
﻿using Application.Interfaces;
using Application.Models.Request;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationService _customAuthenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _customAuthenticationService = authenticationService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticationRequest authenticationRequest)
        {
            try
            {
                string token = _customAuthenticationService.Authenticate(authenticationRequest);
                return Ok(token);
            }
            catch (UnauthorizedAccessException ex)
            {
                if (ex.Message == "El usuario ha sido desactivado.")
                {
                    return Unauthorized(new { message = "El usuario ha sido desactivado. Contacte con soporte." });
                }
                return Unauthorized(new { message = "Credenciales incorrectas. Por favor, inténtelo de nuevo." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor.", details = ex.Message });
            }
        }

    }
}
