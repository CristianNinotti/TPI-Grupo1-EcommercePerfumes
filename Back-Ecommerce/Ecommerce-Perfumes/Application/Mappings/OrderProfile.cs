using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public class OrderProfile
    {

        public static Order ToOrderEntity(OrderRequest orderRequest)
        {
            return new Order()
            {
                OrderDate = DateTime.Now,
                OrderStatus = orderRequest.OrderStatus,
                UserId = orderRequest.UserId,

            };
        }

        public static OrderResponse ToOrderResponse(Order order)
        {
            return new OrderResponse
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                OrderStatus = order.OrderStatus,
                UserId = order.UserId,
                OrderItems = OrderItemProfile.ToOrderItemResponse(order.OrderItems),
            };
        }

        public static List<OrderResponse> ToOrderResponse(List<Order> orders)
        {
            return orders.Select(ToOrderResponse).ToList();
        }
        public static void ToOrderUpdate(Order order, OrderRequest request)
        {
            order.OrderStatus = request.OrderStatus;
        }
    }
}
