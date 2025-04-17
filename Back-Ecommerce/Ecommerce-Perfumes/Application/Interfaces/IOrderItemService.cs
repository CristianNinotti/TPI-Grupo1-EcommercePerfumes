using Application.Models.Request;
using Application.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IOrderItemService
    {
        List<OrderItemResponse> GetAllOrderItems();
        List<OrderItemResponse> GetAllOrderItemsByProductId(int id);
        OrderItemResponse? GetOrderItemById(int id);
        void CreateOrderItem(int userId, OrderItemRequest orderItem);
        bool ToUpdateOrderItem(int userId, int orderItemId, OrderItemRequest orderItem);
        bool SoftDeleteOrderItem(int userId, int id);
        bool HardDeleteOrderItem(int userId, int id);
    }
}
