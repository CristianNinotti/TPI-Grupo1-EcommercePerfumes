using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Interfaces;

namespace Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMayoristaRepository _mayoristaRepository;
        private readonly IMinoristaRepository _minoristaRepository;
        private readonly ISuperAdminRepository _superAdminRepository;

        public OrderService(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository, IProductRepository productRepository, IMayoristaRepository mayoristaRepository, IMinoristaRepository minoristaRepository, ISuperAdminRepository superAdminRepository)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _productRepository = productRepository;
            _mayoristaRepository = mayoristaRepository;
            _minoristaRepository = minoristaRepository;
            _superAdminRepository = superAdminRepository;
        }

        public List<OrderResponse> GetAllOrders()
        {
            var orders = _orderRepository.GetAllOrdersRepository();
            return OrderProfile.ToOrderResponse(orders);
        }
        public OrderResponse? GetOrderById(int id)
        {
            var order = _orderRepository.GetOrderByIdRepository(id);
            if (order != null)
            {
                return OrderProfile.ToOrderResponse(order);
            }
            return null;
        }

        public OrderResponse? GetOrderStatusTrue(int id)
        {
            var order = _orderRepository.GetOrderStatusTrue(id);
            if (order != null)
            {
                return OrderProfile.ToOrderResponse(order);
            }
            return null;
        }

        public int CreateOrder(int userId)
        {
            var order = OrderProfile.ToOrderEntity(userId);
            var mayorista = _mayoristaRepository.GetMayoristaById(userId);
            var minorista = _minoristaRepository.GetMinoristaById(userId);
            var superAdmin = _superAdminRepository.GetSuperAdminById(userId);

            if (userId == order.UserId && (mayorista != null && mayorista.Available == true || minorista != null && minorista.Available == true || superAdmin != null && superAdmin.Available == true))
            {
                _orderRepository.CreateOrderRepository(order);
                return order.Id;
            }
            else
            {
                throw new InvalidOperationException("No se pudo crear Order");
            }
        }

        public bool ToUpdateOrder(int userId, int orderId, OrderRequest request)
        {
            var orderEntity = _orderRepository.GetOrderByIdRepository(orderId);
            if (orderEntity == null || userId != orderEntity.UserId || orderEntity.User == null || orderEntity.User.Available == false)
            {
                return false;
            }
            orderEntity.OrderStatus = request.OrderStatus;
            _orderRepository.UpdateOrderRepository(orderEntity);
            return true;
        }

        public bool SoftDeleteOrder(int userId, int orderId)
        {
            var orderEntity = _orderRepository.GetOrderByIdRepository(orderId);
            if (orderEntity == null || userId != orderEntity.UserId)
            {
                return false;
            }
            orderEntity.OrderStatus = false;
            foreach (var orderItem in orderEntity.OrderItems)
            {
                orderItem.Available = false;
            }
            _orderRepository.SoftDeleteOrderRepository(orderEntity);
            return true;
        }
        public bool HardDeleteOrder(int userId, int orderId)
        {
            var orderEntity = _orderRepository.GetOrderByIdRepository(orderId);
            if (orderEntity == null || userId != orderEntity.UserId)
            {
                return false;
            }
            orderEntity.OrderStatus = false;
            _orderRepository.DeleteOrderRepository(orderEntity);
            return true;
        }
    }
}
