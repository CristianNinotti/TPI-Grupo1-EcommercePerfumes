using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Response
{
    public class MayoristaResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int CUIT { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public string NameAccount { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Dni { get; set; }
        public string PhoneNumer { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool Available { get; set; }
    }
}