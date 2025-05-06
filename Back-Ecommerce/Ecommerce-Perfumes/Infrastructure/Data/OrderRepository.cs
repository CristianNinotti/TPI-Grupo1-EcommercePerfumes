using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly EcommercePerfumesDbContext _order;

        public OrderRepository(EcommercePerfumesDbContext order)
        {
            _order = order;
        }

        public List<Order> GetAllOrdersRepository()
        {
            return _order.Orders
                .Include(o => o.OrderItems)
                .Select(o => new Order
                {
                    Id = o.Id,
                    OrderDate = o.OrderDate,
                    TotalAmount = o.OrderItems.Where(oi => oi.Available).Sum(oi => oi.TotalPrice),
                    OrderStatus = o.OrderStatus,
                    UserId = o.UserId,
                    OrderItems = o.OrderItems
                })
                .ToList();
        }


        public Order? GetOrderByIdRepository(int id)
        {
            return _order.Orders.Include(o => o.OrderItems).FirstOrDefault(m => m.Id == id);
        }

        public void CreateOrderRepository(Order order)
        {
            _order.Orders.Add(order);
            _order.SaveChanges();
        }

        public void UpdateOrderRepository(Order order)
        {
            _order.Orders.Update(order);
            _order.SaveChanges();
        }

        //SoftDelete
        public void SoftDeleteOrderRepository(Order order)
        {
            order.OrderStatus = false;
            _order.SaveChanges();
        }

        //HardDelete
        public void DeleteOrderRepository(Order order)
        {
            _order.Orders.Remove(order);
            _order.SaveChanges();
        }

    }


}