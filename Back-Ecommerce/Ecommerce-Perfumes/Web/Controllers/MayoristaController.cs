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
    public class MayoristaController : ControllerBase
    {
        private readonly IMayoristaService _mayoristaService;
        public MayoristaController(IMayoristaService mayoristaService)
        {
            _mayoristaService = mayoristaService;
        }
        [HttpGet("All Mayoristas")]
        public IActionResult GetAllMayoristas()
        {
            try
            {
                var mayoristas = _mayoristaService.GetAllMayoristas();
                if (mayoristas == null || !mayoristas.Any())
                {
                    return NotFound("No hay ningún Minorista registrado en el sistema.");
                }
                return Ok(mayoristas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpGet("All Mayoristas Available")]

        public IActionResult GetAllMayoristasAvailable()
        {
            try
            {
                var mayoristas = _mayoristaService.GetAllMayoristas().Where(m => m.Available);
                if (mayoristas == null || !mayoristas.Any())
                {
                    return BadRequest($"No hay ningun Minorista habilitado en el sistema");
                }
                return Ok(mayoristas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }


        }
        [HttpPost("Create Mayorista")]
        public IActionResult CreateMayorista([FromBody] MayoristaRequest mayorista)
        {
            try
            {
                _mayoristaService.CreateMayorista(mayorista);
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
        [HttpPut("UpdateMayorista/{id}")]

        public IActionResult UpdateMayorista([FromRoute] int id, MayoristaRequest mayorista)
        {
            try
            {
                var updatedMayorista = _mayoristaService.UpdateMayorista(id, mayorista);
                if (!updatedMayorista)
                {
                    return BadRequest($"No se pudo actualizar Mayorista");
                }
                return Ok($"Mayorista actualizado con exito");
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
        [HttpDelete("SoftDeleteMayorista/{id}")]

        public IActionResult SoftDeleteMayorista([FromRoute] int id)
        {
            try
            {
                var mayorista = _mayoristaService.SoftDeleteMayorista(id);
                if (!mayorista)
                {
                    return BadRequest($"No se pudo dar de baja Mayorista");
                }
                return Ok("Mayorista dado de baja con exito.");
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

        [HttpDelete("HardDeleteMayorista/{id}")]

        public IActionResult HardDeleteMayorista([FromRoute] int id)
        {
            try
            {
                var mayorista = _mayoristaService.HardDeleteMayorista(id);
                if (!mayorista)
                {
                    return BadRequest($"No se pudo borrar Mayorista del sistema");
                }
                return Ok("Mayorista borrado del sistema con exito");
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
