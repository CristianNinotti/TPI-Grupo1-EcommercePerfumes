namespace Application.Models.Request
{
    public class OrderItemRequest
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}