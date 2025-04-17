using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public static class OrderItemProfile
    {
        public static OrderItem ToOrderItemEntity(OrderItemRequest orderItem, decimal price)
        {
            return new OrderItem()
            {
                OrderId = orderItem.OrderId,
                ProductId = orderItem.ProductId,
                Quantity = orderItem.Quantity,
                Price = price,
            };
        }


        // Método para convertir OrderItem a OrderItemResponse
        public static OrderItemResponse ToOrderItemResponse(OrderItem orderItem)
        {
            return new OrderItemResponse
            {
                Id = orderItem.Id,
                OrderId = orderItem.OrderId,
                ProductId = orderItem.ProductId,
                Quantity = orderItem.Quantity,
                Price = orderItem.Price,
                TotalPrice = orderItem.TotalPrice,
                Available = orderItem.Available,
            };
        }

        public static List<OrderItemResponse> ToOrderItemResponse(List<OrderItem> orderItem)
        {
            return orderItem.Select(c => new OrderItemResponse
            {
                Id = c.Id,
                OrderId = c.OrderId,
                ProductId = c.ProductId,
                Quantity = c.Quantity,
                Price = c.Price,
                TotalPrice = c.TotalPrice,
                Available = c.Available
            }).ToList();
        }

        public static void ToOrderItemUpdate(OrderItem orderItem, OrderItemRequest request, decimal price)
        {
            orderItem.OrderId = request.OrderId;
            orderItem.ProductId = request.ProductId;
            orderItem.Quantity = request.Quantity;
            orderItem.Price = price;
        }
    }
}
