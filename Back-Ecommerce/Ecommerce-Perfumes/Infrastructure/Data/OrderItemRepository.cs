using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;

namespace Infrastructure.Data
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly EcommercePerfumesDbContext _orderItem;

        public OrderItemRepository(EcommercePerfumesDbContext orderItem)
        {
            _orderItem = orderItem;
        }

        public List<OrderItem> GetAllOrderItemsRepository()
        {
            return _orderItem.OrderItems.ToList();
        }

        public List<OrderItem> GetAllOrderItemsByProductIdRepository(int id)
        {
            return _orderItem.OrderItems.Where(m => m.ProductId == id).ToList();
        }

        public OrderItem? GetOrderItemByIdRepository(int id)
        {
            return _orderItem.OrderItems.FirstOrDefault(m => m.Id == id);
        }
        public IEnumerable<OrderItem> GetOrderItemsByOrderIdRepository(int orderId)
        {
            return _orderItem.OrderItems.Where(m => m.OrderId == orderId).ToList();
        }

        public void CreateOrderItemRepository(OrderItem orderItem)
        {
            _orderItem.OrderItems.Add(orderItem);
            _orderItem.SaveChanges();
        }

        public void UpdateOrderItemRepository(OrderItem orderItem)
        {
            _orderItem.OrderItems.Update(orderItem);
            _orderItem.SaveChanges();

        }

        //SoftDelete
        public void SoftDeleteOrderItemRepository(OrderItem orderItem)
        {
            orderItem.Available = false;
            _orderItem.SaveChanges();
        }

        //HardDelete
        public void DeleteOrderItemRepository(OrderItem orderItem)
        {
            _orderItem.OrderItems.Remove(orderItem);
            _orderItem.SaveChanges();
        }
    }
}