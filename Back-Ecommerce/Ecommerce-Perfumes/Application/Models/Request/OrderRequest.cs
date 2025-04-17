using System.ComponentModel.DataAnnotations;

namespace Application.Models.Request
{
    public class OrderRequest
    {
        public int UserId { get; set; }
        public bool OrderStatus { get; set; }
    }
}