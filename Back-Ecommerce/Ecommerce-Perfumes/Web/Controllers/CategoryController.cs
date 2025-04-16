using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Models.Response;
using Application.Models.Request;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;

        public CategoryController(ICategoryService categoryService, IProductService productService)
        {
            _categoryService = categoryService;
            _productService = productService;
        }

        [HttpGet("All Categories")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult GetAllCategories()
        {
            try
            {
                var categories = _categoryService.GetAllCategories();
                if (!categories.Any())
                {
                    return BadRequest($"No se encontraron Categy en el sistema");
                }
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }

        }


        [HttpGet("All Categories Available")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult GetAllCategoriesAvailable()
        {
            try
            {
                var categories = _categoryService.GetAllCategories().Where(o => o.Available);
                if (!categories.Any())
                {
                    return BadRequest($"No se encontraron Category habilitados en el sistema");
                }
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }

        }

        [HttpGet("CategoryId/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public ActionResult<CategoryResponse?> GetCategoryById([FromRoute] int id)
        {
            try
            {
                var category = _categoryService.GetCategoryById(id);
                if (category == null)
                {
                    return BadRequest($"No se pudo encontrar Category en el sistema");
                }
                return Ok(category);
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

        [HttpGet("CategoryWithProducts/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public ActionResult<ProductResponse?> GetAllProducts([FromRoute] int id)
        {
            try
            {
                var productInCategory = _productService.GetAllProducts().Where(m => m.CategoryId == id).ToList();
                if (!productInCategory.Any())
                {
                    return BadRequest($"No se encontraron productos en ese Category");
                }
                return Ok(productInCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }

        }

        [HttpPost("CreateCategory")]

        public IActionResult CreateCategory([FromBody] CategoryRequest request)
        {
            try
            {
                _categoryService.CreateCategory(request);
                return Ok($"Category creado con exito");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"No se pudo crear la Categoria Error: {ex.Message}");
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

        [HttpPut("UpdateCategory/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]

        public ActionResult<bool> UpdateCategory([FromRoute] int id, [FromBody] CategoryRequest request)
        {
            try
            {
                var category = _categoryService.UpdateCategory(id, request);
                if (!category)
                {
                    return BadRequest($"No se pudo actualizar Category");
                }
                return Ok($"Category actualizado con exito");
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

        [HttpDelete("SoftDeleteCategory/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public ActionResult<bool> SoftDeleteCategory([FromRoute] int id)
        {
            try
            {
                var category = _categoryService.SoftDeleteCategory(id);
                if (!category)
                {
                    return BadRequest($"No se pudo dar de baja Category del sistema");
                }
                return Ok($"Category dado de baja del sistema con exito");
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
        [HttpDelete("HardDeleteCategory/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public ActionResult<bool> HardDeleteCategory([FromRoute] int id)
        {
            try
            {
                var category = _categoryService.HardDeleteCategory(id);
                if (!category)
                {
                    return BadRequest($"No se pudo borrar esa Category del sistema");
                }
                return Ok($"Category borrado del sistema con exito");
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
