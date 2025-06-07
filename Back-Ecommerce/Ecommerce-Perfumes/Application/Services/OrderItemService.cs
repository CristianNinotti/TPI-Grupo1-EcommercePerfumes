using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Interfaces;

namespace Application.Services
{
    public class OrderItemService : IOrderItemService
    {
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IMayoristaRepository _mayoristaRepository;


        public OrderItemService(IOrderItemRepository orderItemRepository, IProductRepository productRepository, IOrderRepository orderRepository, IMayoristaRepository mayoristaRepository)
        {
            _orderItemRepository = orderItemRepository;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _mayoristaRepository = mayoristaRepository;
        }

        public List<OrderItemResponse> GetAllOrderItems()
        {
            var orderItems = _orderItemRepository.GetAllOrderItemsRepository();
            return OrderItemProfile.ToOrderItemResponse(orderItems);
        }

        public List<OrderItemResponse> GetAllOrderItemsByProductId(int id)
        {
            var orderItems = _orderItemRepository.GetAllOrderItemsByProductIdRepository(id);
            return OrderItemProfile.ToOrderItemResponse(orderItems);
        }

        public OrderItemResponse? GetOrderItemById(int id)
        {
            var orderItem = _orderItemRepository.GetOrderItemByIdRepository(id);
            if (orderItem != null)
            {
                return OrderItemProfile.ToOrderItemResponse(orderItem);
            }
            return null;
        }

        public void CreateOrderItem(int userId, OrderItemRequest orderItem)
        {
            var product = _productRepository.GetProductByIdRepository(orderItem.ProductId);
            var orderEntity = _orderRepository.GetOrderByIdRepository(orderItem.OrderId);
            if (product != null && orderEntity != null && userId == orderEntity.UserId && orderEntity.OrderStatus && product.Available && orderItem.Quantity <= product.Stock)
            {
                var mayoristaEntity = _mayoristaRepository.GetMayoristaById(orderEntity.UserId);
                var totalPrice = orderItem.Quantity * product.Price;
                var orderItemEntity = OrderItemProfile.ToOrderItemEntity(orderItem, product.Price);
                orderItemEntity.TotalPrice = totalPrice;

                if (mayoristaEntity != null)
                {
                    orderItemEntity.TotalPrice *= mayoristaEntity.DiscountRate;
                }

                _orderItemRepository.CreateOrderItemRepository(orderItemEntity);
                orderEntity.TotalAmount = _orderItemRepository.GetOrderItemsByOrderIdRepository(orderItem.OrderId).Where(oi => oi.Available).Sum(oi => oi.TotalPrice);
                _orderRepository.UpdateOrderRepository(orderEntity);
            }
            else
            {
                throw new InvalidOperationException("No se pudo crear OrderItem");
            }
        }

        public bool ToUpdateOrderItem(int userId, int orderItemId, OrderItemRequest request)
        {
            var orderEntity = _orderRepository.GetOrderByIdRepository(request.OrderId);
            var orderItemEntity = _orderItemRepository.GetOrderItemByIdRepository(orderItemId);
            var product = _productRepository.GetProductByIdRepository(request.ProductId);
            if (orderEntity != null && userId == orderEntity.UserId && orderItemEntity != null && orderEntity.OrderItems.Contains(orderItemEntity) && orderItemEntity.Available == true && product != null && orderEntity.OrderStatus == true && product.Available == true)
            {
                var mayoristaEntity = _mayoristaRepository.GetMayoristaById(orderEntity.UserId);
                var stockDisponible = product.Stock + orderItemEntity.Quantity;
                if (request.Quantity <= stockDisponible)
                {
                    orderItemEntity.TotalPrice = request.Quantity * product.Price;
                    if (mayoristaEntity != null)
                    {
                        orderItemEntity.TotalPrice *= mayoristaEntity.DiscountRate; 
                    }

                    OrderItemProfile.ToOrderItemUpdate(orderItemEntity, request, product.Price);
                    _orderItemRepository.UpdateOrderItemRepository(orderItemEntity);
                    orderEntity.TotalAmount = _orderItemRepository.GetOrderItemsByOrderIdRepository(orderEntity.Id).Where(oi => oi.Available == true).Sum(oi => oi.TotalPrice);
                    _orderRepository.UpdateOrderRepository(orderEntity);
                    return true;
                }
            }
            return false;
        }

        public bool SoftDeleteOrderItem(int userId, int id)
        {
            var orderItemEntity = _orderItemRepository.GetOrderItemByIdRepository(id);
            if (orderItemEntity == null || userId != orderItemEntity?.Order?.UserId)
            {
                return false;
            }
            if (userId != orderItemEntity?.Order?.UserId)
            {
                return false;
            }
            orderItemEntity.Available = false;
            _orderItemRepository.SoftDeleteOrderItemRepository(orderItemEntity);
            var orderEntity = _orderRepository.GetOrderByIdRepository(orderItemEntity.OrderId);
            if (orderEntity == null)
            {
                return false;
            }
            var updatedTotalAmount = _orderItemRepository.GetOrderItemsByOrderIdRepository(orderEntity.Id)
                .Where(oi => oi.Available)
                .Sum(oi => oi.TotalPrice);
            orderEntity.TotalAmount = updatedTotalAmount;
            _orderRepository.UpdateOrderRepository(orderEntity);
            return true;
        }

        public bool HardDeleteOrderItem(int userId, int id)
        {
            var orderItemEntity = _orderItemRepository.GetOrderItemByIdRepository(id);
            if (orderItemEntity == null || userId != orderItemEntity?.Order?.UserId)
            {
                return false;
            }
            _orderItemRepository.DeleteOrderItemRepository(orderItemEntity);
            return true;
        }
    }
}