namespace Application.Models.Response
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string Marca { get; set; } = string.Empty;
        public string Genero { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public List<string>? Photos { get; set; }
        public bool Available { get; set; }
    }
}
