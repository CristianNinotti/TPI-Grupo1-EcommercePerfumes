using Application.Models.Request;
using Application.Models.Response;

namespace Application.Interfaces
{
    public interface IOrderService
    {
        List<OrderResponse> GetAllOrders();
        OrderResponse? GetOrderById(int id);
        OrderResponse? GetOrderStatusTrue(int id);
        int CreateOrder(int userId);
        bool ToUpdateOrder(int userId, int orderId, OrderRequest request);
        bool SoftDeleteOrder(int userId, int orderId);
        bool HardDeleteOrder(int userId, int orderId);
    }
}