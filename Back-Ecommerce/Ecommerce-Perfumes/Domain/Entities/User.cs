namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public bool Available { get; set; } = true;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string NameAccount { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Dni { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string TypeUser { get; set; } = string.Empty;
        public List<Order> Orders { get; set; } = new List<Order>();

    }
}
