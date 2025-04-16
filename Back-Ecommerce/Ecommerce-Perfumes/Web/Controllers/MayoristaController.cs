using Application.Interfaces;
using Application.Models.Request;
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
        [Authorize(Policy = "MayoristaOrSuperAdmin")]
        public IActionResult GetAllMayoristas()
        {
            try
            {
                var mayoristas = _mayoristaService.GetAllMayoristas();
                if (!mayoristas.Any())
                {
                    return BadRequest($"No se encontro ningun Mayorista registrado en el sistema");
                }
                return Ok(mayoristas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }

        }


        [HttpGet("All Mayoristas Available")]
        [Authorize(Policy = "MayoristaOrSuperAdmin")]
        public IActionResult GetAllMayoristasAvailable()
        {
            try
            {
                var mayoristas = _mayoristaService.GetAllMayoristas().Where(o => o.Available);
                if (!mayoristas.Any())
                {
                    return BadRequest($"No se encontro ningun Mayorista habilitado en el sistema");
                }
                return Ok(mayoristas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }

        }

        [HttpPost("CreateMayorista")]
        public IActionResult CreateMayorista([FromBody] MayoristaRequest mayorista)
        {
            try
            {
                _mayoristaService.CreateMayorista(mayorista);
                return Ok("Mayorista Creado con exito");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"No se pudo crear al Mayorista. Error: {ex.Message}");
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
        [Authorize(Policy = "MayoristaOrSuperAdmin")]
        public IActionResult UpdateMayorista([FromRoute] int id, MayoristaRequest mayorista)
        {
            try
            {
                var mayoristaUpdated = _mayoristaService.UpdateMayorista(id, mayorista);
                if (!mayoristaUpdated)
                {
                    return BadRequest($"No se pudo actualizar al Mayorista");
                }
                return Ok($"Mayorista actualizado con exito");
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Se obtuvieron datos inesperados. Error: {ex.Message}");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = $"Mayorista con ID {id} no encontrado. Error: {ex.Message}" }); // Específico para no encontrado
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ha ocurrido un error inesperado", detail = ex.Message }); // Captura de errores generales
            }
        }


        [HttpDelete("SoftDelete/{id}")]
        [Authorize(Policy = "MayoristaOrSuperAdmin")]
        public IActionResult SoftDeleteMayorista([FromRoute] int id)
        {
            try
            {
                var mayorista = _mayoristaService.SoftDeleteMayorista(id);
                if (!mayorista)
                {
                    return BadRequest($"No se pudo dar de baja al Mayorista");
                }
                return Ok("Mayorista dado de baja con exito");
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
        [HttpDelete("HardDelete/{id}")]
        [Authorize(Policy = "MayoristaOrSuperAdmin")]
        public IActionResult HardDeleteMayorista([FromRoute] int id)
        {
            try
            {
                var mayorista = _mayoristaService.HardDeleteMayorista(id);
                if (!mayorista)
                {
                    return BadRequest($"No se pudo borrar al Mayorista del sistema");
                }
                return Ok("Mayorista borrado con exito");
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
    }
}