namespace Application.Models.Request
{
    public class ProductRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }

        // Agregar CategoryId para la relación con la categoría
        public int CategoryId { get; set; }
        public List<string>? Photos { get; set; }


    }
}
