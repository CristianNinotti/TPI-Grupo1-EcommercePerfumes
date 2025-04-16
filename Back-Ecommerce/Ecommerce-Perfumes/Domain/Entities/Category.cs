namespace Domain.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Available { get; set; } = true;
        public List<Product> Products { get; set; } = new List<Product>();

    }
}