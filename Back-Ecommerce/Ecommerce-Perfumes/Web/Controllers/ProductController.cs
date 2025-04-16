using Application.Interfaces;
using Application.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpGet("All Products")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult GetAllProducts()
        {
            try
            {
                var products = _productService.GetAllProducts();
                if (!products.Any())
                {
                    return NotFound("No se encontraron productos.");
                }
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpGet("All Products Available")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult GetAllProductsAvailable()
        {
            try
            {
                var products = _productService.GetAllProducts().Where(o => o.Available);
                if (!products.Any())
                {
                    return NotFound("No se encontraron productos.");
                }
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpGet("ProductById/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult GetProductById([FromRoute] int id)
        {
            try
            {
                var product = _productService.GetProductById(id);
                if (product == null)  // Si es nulo, da BadRequest
                {
                    return BadRequest($"No se pudo encontrar el producto.");
                }
                return Ok(product);
            }
            catch (ArgumentException ex)  // Si se detecta un error esperado o un mal parametro de entrada
            {
                return BadRequest($"Se obtuvieron datos inesperados. Error: {ex.Message}");
            }
            catch (Exception ex)  // Para errores internos inesperados
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpGet("ProductsByCategory/{categoryId}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult GetProductsByCategoryId([FromRoute] int categoryId)
        {
            try
            {
                var products = _productService.GetProductsByCategoryId(categoryId);
                if (!products.Any())
                {
                    return BadRequest($"No se encontraron Products asociados a esa categoria.");
                }
                if (products.All(p => p.Available == false))
                {
                    return BadRequest($"La categoría no tiene Products disponibles.");
                }

                return Ok(products);
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


        [HttpPost("CreateProduct")]
        public IActionResult CreateProduct([FromBody] ProductRequest product)
        {
            try
            {
                var (success, message) = _productService.CreateProduct(product);

                if (!success)
                {
                    return BadRequest(new { success, message });
                }
                return Ok(new { success, message });

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

        [HttpPut("UpdateProduct/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult UpdateProduct([FromRoute] int id, [FromBody] ProductRequest product)
        {
            try
            {
                var UpdatedProduct = _productService.ToUpdateProduct(id, product);
                if (!UpdatedProduct)
                {
                    return BadRequest($"No se pudo actualizar el producto");
                }
                return Ok(UpdatedProduct);
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
        [HttpDelete("SoftDeleteProduct/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult SoftDeleteProduct([FromRoute] int id)
        {
            try
            {
                var product = _productService.SoftDeleteProduct(id);
                if (!product)
                {
                    return BadRequest("$No se pudo dar de baja del sistema");
                }
                return Ok("Producto Eliminado");
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

        [HttpDelete("HardDeleteProduct/{id}")]
        [Authorize(Policy = "SuperAdminOnly")]
        public IActionResult HardDeleteProduct([FromRoute] int id)
        {
            try
            {
                var product = _productService.HardDeleteProduct(id);
                if (!product)
                {
                    return BadRequest($"No se pudo borrar del sistema");
                }
                return Ok("Producto Eliminado");
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