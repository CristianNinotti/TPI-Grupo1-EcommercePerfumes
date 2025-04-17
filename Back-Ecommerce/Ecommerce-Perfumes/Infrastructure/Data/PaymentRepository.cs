using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly EcommercePerfumesDbContext _payment;
        public PaymentRepository(EcommercePerfumesDbContext payment)
        {
            _payment = payment;

        }

        public List<Payment> GetAllPayments()
        {
            return _payment.Payments.ToList();
        }

        public Payment? GetPaymentById(int id)
        {
            return _payment.Payments.FirstOrDefault(p => p.Id == id);
        }

        public void CreatePayment(Payment payment)
        {
            _payment.Payments.Add(payment);
            _payment.SaveChanges();
        }

        public void UpdatePayment(Payment payment)
        {
            _payment.Payments.Update(payment);
            _payment.SaveChanges();
        }

        public void DeletePayment(Payment payment)
        {
            _payment.Payments.Remove(payment);
            _payment.SaveChanges();
        }
    }
}