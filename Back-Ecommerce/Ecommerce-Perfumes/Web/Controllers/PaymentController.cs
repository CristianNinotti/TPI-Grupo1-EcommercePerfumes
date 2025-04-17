using Application.Interfaces;
using Application.Models.Request;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using System.ComponentModel.DataAnnotations;

namespace Web.Controllers
{
    public class PaymentController : Controller
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("All Payments")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]
        public IActionResult GetAllPayments()
        {
            try
            {
                var response = _paymentService.GetAllPayments();
                if (!response.Any())
                {
                    return BadRequest($"No se encontraron pagos registrados en el sistema");
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }


        }
        [HttpGet("PaymentById/{paymentId}")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]
        public IActionResult GetByPayment([FromRoute] int paymentId)
        {
            try
            {
                var response = _paymentService.GetPaymentById(paymentId);
                if (response == null)
                {
                    return BadRequest($"No se pudo encontrar el pago");
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpPost("Create Payment")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]
        public IActionResult CreatePayment([FromBody] PaymentRequest request)
        {
            try
            {
                string? userIdClaim = User.FindFirst("Id")?.Value;

                if (userIdClaim == null)
                {
                    return BadRequest("No esta logueado");
                }
                int userId = int.Parse(userIdClaim);
                var paymentCreated = _paymentService.CreatePayment(userId, request);
                if (!paymentCreated)
                {
                    return BadRequest("No se pudo crear el pago.");
                }
                return Ok("Pago creado con exito");
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Se obtuvieron datos inesperados. Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }
        [HttpPut("UpdatePayment/{paymentId}")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]
        public IActionResult UpdatePayment([FromRoute] int paymentId, [FromBody] PaymentRequest request)
        {
            try
            {
                string? userIdClaim = User.FindFirst("Id")?.Value;

                if (userIdClaim == null)
                {
                    return BadRequest("No esta logueado");
                }
                int userId = int.Parse(userIdClaim);
                var payment = _paymentService.ToUpdatePayment(userId, paymentId, request);
                if (!payment)
                {
                    return BadRequest($"No se pudo actualizar el pago.");
                }
                return Ok("Pago Actualizado");
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Se obtuvieron datos inesperados. Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpDelete("DeletePayment/{paymentId}")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]
        public IActionResult DeletePayment([FromRoute] int paymentId)
        {
            try
            {
                _paymentService.DeletePayment(paymentId);
                return Ok("Pago borrado con éxito");
            }

            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = "No se pudo borrar el pago solicitado. " + ex.Message });
            }
        }

    }
}