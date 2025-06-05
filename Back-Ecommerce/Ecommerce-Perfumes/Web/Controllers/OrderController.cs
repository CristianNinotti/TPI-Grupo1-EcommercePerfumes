using Application.Interfaces;
using Application.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("AllOrders")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]

        public IActionResult GetAllOrders()
        {
            try
            {
                var orders = _orderService.GetAllOrders();
                if (!orders.Any())
                {
                    return BadRequest($"No se encontraron Orders registradas en el sistema.");
                }
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }


        }

        [HttpGet("AllOrdersStatusTrue")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]

        public IActionResult GetAllOrdersStatusTrue()
        {
            try
            {
                var orders = _orderService.GetAllOrders().Where(o => o.OrderStatus);
                if (!orders.Any())
                {
                    return BadRequest($"No se encontraron Orders habilitadas en el sistema");
                }
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno en el servidor. Error: {ex.Message}");
            }
        }

        [HttpGet("OrderById/{id}")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]

        public IActionResult OrderById([FromRoute] int id)
        {
            try
            {
                var order = _orderService.GetOrderById(id);
                if (order == null)
                {
                    return BadRequest($"No se encontro el Order");
                }
                return Ok(order);
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

        [HttpGet("OrderStatusTrue")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]

        public IActionResult OrderStatusTrue()
        {
            try
            {
                string? userIdClaim = User.FindFirst("Id")?.Value;
                if (userIdClaim == null)
                {
                    return BadRequest("No esta logueado");
                }
                int userId = int.Parse(userIdClaim);

                var order = _orderService.GetOrderStatusTrue(userId);
                if (order == null)
                {
                    return BadRequest($"No se encontro el Order");
                }
                return Ok(order);
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

        [HttpPost("CreateOrder")]

        public IActionResult CreateOrder([FromBody] OrderRequest orderRequest)
        {
            try
            {
                string? userIdClaim = User.FindFirst("Id")?.Value;

                if (userIdClaim == null)
                {
                    return BadRequest("No esta logueado");
                }
                int userId = int.Parse(userIdClaim);

                _orderService.CreateOrder(userId, orderRequest);
                return Ok("Orden creado con exito");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"No se pudo crear el Order. Error: {ex.Message}");
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

        [HttpPut("UpdateOrder/{orderId}")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]

        public IActionResult UpdateOrder([FromRoute] int orderId, [FromBody] OrderRequest orderRequest)
        {
            try
            {
                string? userIdClaim = User.FindFirst("Id")?.Value;

                if (userIdClaim == null)
                {
                    return BadRequest("No esta logueado");
                }
                int userId = int.Parse(userIdClaim);

                var updateSuccess = _orderService.ToUpdateOrder(userId, orderId, orderRequest);

                if (!updateSuccess)
                {
                    return BadRequest($"No se pudo actualizar la Order");
                }

                return Ok($"Order actualizada con exito");
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

        [HttpDelete("SoftDeleteOrder/{id}")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]

        public IActionResult SoftDeleteOrder([FromRoute] int id)
        {
            try
            {
                string? userIdClaim = User.FindFirst("Id")?.Value;

                if (userIdClaim == null)
                {
                    return BadRequest("No esta logueado");
                }
                int userId = int.Parse(userIdClaim);
                var order = _orderService.SoftDeleteOrder(userId, id);
                if (!order)
                {
                    return BadRequest($"No se pudo deshabilitar la Order");
                }
                return Ok("Order dada de baja con exito");
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

        [HttpDelete("HardDeleteOrder/{id}")]
        [Authorize(Policy = "MinoristaOrMayoristaOrSuperAdmin")]

        public IActionResult HardDeleteOrder([FromRoute] int id)
        {
            try
            {
                string? userIdClaim = User.FindFirst("Id")?.Value;

                if (userIdClaim == null)
                {
                    return BadRequest("No esta logueado");
                }
                int userId = int.Parse(userIdClaim);
                var order = _orderService.HardDeleteOrder(userId, id);
                if (!order)
                {
                    return BadRequest($"No se pudo borrar la Order del sistema");
                }
                return Ok("Orden Eliminada");
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
