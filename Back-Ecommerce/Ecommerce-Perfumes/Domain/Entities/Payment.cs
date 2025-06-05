using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        Order? Order { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public Paymethod PayMethod { get; set; } = Paymethod.Transferencia;
    }
}
