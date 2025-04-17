using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IOrderRepository
    {
        List<Order> GetAllOrdersRepository();
        Order? GetOrderByIdRepository(int id);
        void CreateOrderRepository(Order order);
        void UpdateOrderRepository(Order order);
        void SoftDeleteOrderRepository(Order order);
        void DeleteOrderRepository(Order order);
    }
}
