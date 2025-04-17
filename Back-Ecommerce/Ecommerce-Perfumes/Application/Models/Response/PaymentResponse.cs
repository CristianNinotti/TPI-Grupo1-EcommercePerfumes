using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Response
{
    public class PaymentResponse
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; }
        public Paymethod PayMethod { get; set; }
        public bool Available { get; set; }
    }
}
