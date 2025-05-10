namespace Domain.Entities
{
    public class Mayorista : User
    {
        public string Categoria { get; set; } = string.Empty;
        public long CUIT { get; set; }
        public Mayorista()
        {
            TypeUser = "Mayorista";
        }
    }
}