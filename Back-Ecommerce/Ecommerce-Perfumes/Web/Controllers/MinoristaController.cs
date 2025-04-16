using Application.Interfaces;
using Application.Models.Request;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MinoristaController : ControllerBase
    {
        private readonly IMinoristaService _minoristaService;
        public MinoristaController(IMinoristaService minoristaService)
        {
            _minoristaService = minoristaService;
        }
        [HttpGet("All Minoristas")]
        [Authorize(Policy = "MinoristaOrSuperAdmin")]
        public IActionResult GetAllMinoristas()
        {
            try
            {
                var minoristas = _minoristaService.GetAllMinorista();
                if (!minoristas.Any())
                {
                    return NotFound("No hay ningún Minorista registrado en el sistema.");
                }
                return Ok(minoristas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpGet("All Minoristas Available")]
        [Authorize(Policy = "MinoristaOrSuperAdmin")]
        public IActionResult GetAllMinoristasAvailable()
        {
            try
            {
                var minoristas = _minoristaService.GetAllMinorista().Where(o => o.Available);
                if (!minoristas.Any())
                {
                    return BadRequest($"No hay ningun Minorista habilitado en el sistema");
                }
                return Ok(minoristas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }


        }
        [HttpPost("Create Minorista")]
        public IActionResult CreateMinorista([FromBody] MinoristaRequest minorista)
        {
            try
            {
                _minoristaService.CreateMinorista(minorista);
                return Ok("Usuario Creado");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"No se pudo crear al Minorista. Error: {ex.Message}");
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
        [HttpPut("UpdateMinorista/{id}")]
        [Authorize(Policy = "MinoristaOrSuperAdmin")]
        public IActionResult UpdateMinorista([FromRoute] int id, MinoristaRequest minorista)
        {
            try
            {
                var updatedMinorista = _minoristaService.UpdateMinorista(id, minorista);
                if (!updatedMinorista)
                {
                    return BadRequest($"No se pudo actualizar Minorista");
                }
                return Ok($"Minorista actualizado con exito");
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
        [HttpDelete("SoftDeleteMinorista/{id}")]
        [Authorize(Policy = "MinoristaOrSuperAdmin")]
        public IActionResult SoftDeleteMinorista([FromRoute] int id)
        {
            try
            {
                var minorista = _minoristaService.SoftDeleteMinorista(id);
                if (!minorista)
                {
                    return BadRequest($"No se pudo dar de baja Minorista");
                }
                return Ok("Minorista dado de baja con exito.");
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

        [HttpDelete("HardDeleteMinorista/{id}")]
        [Authorize(Policy = "MinoristaOrSuperAdmin")]
        public IActionResult HardDeleteMinorista([FromRoute] int id)
        {
            try
            {
                var minorista = _minoristaService.HardDeleteMinorista(id);
                if (!minorista)
                {
                    return BadRequest($"No se pudo borrar Minorista del sistema");
                }
                return Ok("Minorista borrado del sistema con exito");
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Se obtuvieron datos inesperados Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }
    }
}
