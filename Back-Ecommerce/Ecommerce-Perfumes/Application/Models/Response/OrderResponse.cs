using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Response
{
    public class OrderResponse
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public bool OrderStatus { get; set; }
        public int UserId { get; set; }
        public List<OrderItemResponse> OrderItems { get; set; } = new List<OrderItemResponse>();
    }
}