using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Dtos
{
    public class CreatePreferenceDto
    {
        public string Title { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

}
