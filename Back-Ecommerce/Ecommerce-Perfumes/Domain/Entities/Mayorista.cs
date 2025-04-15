namespace Domain.Entities
{
    public class Mayorista : User
    {
        public string Categoria { get; set; } = string.Empty;
        public int CUIT { get; set; }
        public Mayorista()
        {
            TypeUser = "Mayorista";
        }
    }
}