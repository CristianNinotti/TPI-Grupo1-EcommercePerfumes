using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/superAdmin")]
[ApiController]
public class SuperAdminController : ControllerBase
{
    private readonly ISuperAdminService _superAdminService;

    public SuperAdminController(ISuperAdminService superAdminService)
    {
        _superAdminService = superAdminService;
    }

    [HttpGet("All SuperAdmins")]
    [Authorize(Policy = "SuperAdminOnly")]
    public IActionResult GetAllSuperAdmin()
    {
        try
        {
            var response = _superAdminService.GetAllSuperAdmins();
            if (!response.Any())
            {
                return BadRequest($"No se encontraron SuperAdmins registrados");
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
        }
    }

    [HttpGet("All SuperAdmins Available")]
    [Authorize(Policy = "SuperAdminOnly")]
    public IActionResult GetAllSuperAdminAvailable()
    {
        var response = _superAdminService.GetAllSuperAdmins().Where(o => o.Available);


        try
        {
            if (!response.Any())
            {
                return BadRequest($"No se encontraron SuperAdmins habilitados.");
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
        }
    }


    [HttpGet("{id}")]
    [Authorize(Policy = "SuperAdminOnly")]
    public ActionResult<SuperAdminResponse?> GetSuperAdminById([FromRoute] int id)
    {

        try
        {
            var response = _superAdminService.GetSuperAdminById(id);
            if (response == null)
            {
                return BadRequest("No se encontro ese SuperAdmin");
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
        }
    }

    [HttpPost]
    public IActionResult CreateSuperAdmin([FromBody] SuperAdminRequest superAdmin)
    {
        try
        {
            _superAdminService.CreateSuperAdmin(superAdmin);

            return Ok($"SuperAdmin creado con exito");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest($"No se pudo crear el SuperAdmin. Error: {ex.Message}");
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

    [HttpPut("{id}")]
    [Authorize(Policy = "SuperAdminOnly")]
    public ActionResult<bool> UpdateSuperAdmin([FromRoute] int id, [FromBody] SuperAdminRequest superAdmin)
    {
        try
        {
            var sAdmin = _superAdminService.UpdateSuperAdmin(id, superAdmin);
            if (!sAdmin)
            {
                return BadRequest($"No se pudo actualizar al SuperAdmin.");
            }
            return Ok($"SuperAdmin actualizado con exito");
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

    [HttpDelete("SoftDeleteAdmin/{id}")]
    [Authorize(Policy = "SuperAdminOnly")]
    public ActionResult<bool> SoftDeleteSuperAdmin([FromRoute] int id)
    {
        try
        {
            var sAdmin = _superAdminService.SoftDeleteSuperAdmin(id);
            if (!sAdmin)
            {
                return BadRequest($"No se encontro al SuperAdmin");
            }
            return Ok($"SuperAdmin dado de baja con exito");
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

    [HttpDelete("HardDeleteAdmin/{id}")]
    [Authorize(Policy = "SuperAdminOnly")]
    public ActionResult<bool> HardDeleteSuperAdmin([FromRoute] int id)
    {
        try
        {
            var sAdmin = _superAdminService.HardDeleteSuperAdmin(id);
            if (!sAdmin)
            {
                return BadRequest("$No se pudo borrar al SuperAdmin del sistema");
            }
        }
        catch (ArgumentException ex)
        {
            return BadRequest($"Se obtuvieron datos inesperados. Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
        }
        return Ok("SuperAdmin Borrado con exito");
    }
}