using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Models.Request;
using Application.Models.Response;

namespace Application.Mappings
{
    public class PaymentProfile
    {

        public static Payment ToPaymentEntity(PaymentRequest request)
        {

            return new Payment()
            {
                Amount = request.Amount,
                OrderId = request.OrderId,
                PayMethod = request.PayMethod

            };
        }


        public static PaymentResponse ToPaymentResponse(Payment entity)
        {
            return new PaymentResponse()
            {
                Id = entity.Id,
                Amount = entity.Amount,
                OrderId = entity.OrderId,
                PayMethod = entity.PayMethod,
                PaymentDate = entity.PaymentDate,

            };
        }

        public static List<PaymentResponse> ToPaymentsResponse(List<Payment> payments)
        {
            return payments.Select(x => new PaymentResponse
            {
                Id = x.Id,
                Amount = x.Amount,
                OrderId = x.OrderId,
                PayMethod = x.PayMethod,
                PaymentDate = x.PaymentDate,
            }).ToList();

        }

        public static void ToPaymentUpdate(Payment payment, PaymentRequest request)
        {
            payment.Amount = request.Amount;
            payment.OrderId = request.OrderId;
            payment.PayMethod = request.PayMethod;

        }
    }
}