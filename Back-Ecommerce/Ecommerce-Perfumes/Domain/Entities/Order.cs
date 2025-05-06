namespace Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public bool OrderStatus { get; set; } = true;
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public Payment? Payment { get; set; }
        

    }
}
