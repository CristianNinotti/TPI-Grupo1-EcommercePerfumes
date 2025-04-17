using Application.Models.Request;
using Application.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPaymentService
    {
        List<PaymentResponse> GetAllPayments();
        PaymentResponse? GetPaymentById(int id);
        bool CreatePayment(int userId, PaymentRequest payment);
        bool ToUpdatePayment(int userId, int id, PaymentRequest request);
        bool DeletePayment(int id);
    }
}