namespace Domain.Entities
{
    public class Mayorista : User
    {
        public string Categoria { get; set; } = string.Empty;
        public long CUIT { get; set; }

        // Agregamos la tasa de descuento personalizada
        public decimal DiscountRate { get; set; } = 0.9m;
        public Mayorista()
        {
            TypeUser = "Mayorista";
        }
    }
}