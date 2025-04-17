using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Interfaces;
using System.Threading.Tasks;
using Application.Models.Response;
using Application.Models.Request;
using Application.Mappings;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IProductRepository _productRepository;
        public PaymentService(IPaymentRepository paymentRepository, IOrderRepository orderRepository, IOrderItemRepository orderItemRepository, IProductRepository productRepository)
        {
            _paymentRepository = paymentRepository;
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _productRepository = productRepository;
        }

        public List<PaymentResponse> GetAllPayments()
        {
            var payments = _paymentRepository.GetAllPayments();
            return PaymentProfile.ToPaymentsResponse(payments);
        }

        public PaymentResponse? GetPaymentById(int id)
        {
            var payment = _paymentRepository.GetPaymentById(id);
            if (payment != null)
            {
                return PaymentProfile.ToPaymentResponse(payment);
            }
            return null;
        }

        public bool CreatePayment(int userId, PaymentRequest payment)
        {
            var paymentEntity = PaymentProfile.ToPaymentEntity(payment);
            if (paymentEntity == null)
            {
                return false;
            }
            var order = _orderRepository.GetOrderByIdRepository(payment.OrderId);
            if (order == null || userId != order.UserId || order.OrderItems == null || order.OrderStatus == false || !order.OrderItems.Any() || order.Payment != null)
            {
                return false;
            }
            if (payment.Amount != order.TotalAmount)
            {
                return false;
            }
            foreach (var orderItem in order.OrderItems)
            {
                var product = _productRepository.GetProductByIdRepository(orderItem.ProductId);
                if (product == null || product.Stock < orderItem.Quantity)
                {
                    throw new InvalidOperationException($"No hay suficiente stock");
                }
                paymentEntity.PaymentDate = DateTime.Now;
                product.Stock -= orderItem.Quantity;
                _productRepository.UpdateProductRepository(product);
                _orderItemRepository.UpdateOrderItemRepository(orderItem);
            }
            order.OrderStatus = false;
            order.Payment = paymentEntity;
            _paymentRepository.CreatePayment(paymentEntity);
            _orderRepository.UpdateOrderRepository(order);
            return true;
        }
        public bool ToUpdatePayment(int userId, int id, PaymentRequest request)
        {
            var paymentEntity = _paymentRepository.GetPaymentById(id);
            var orderEntity = _orderRepository.GetOrderByIdRepository(request.OrderId);
            if (paymentEntity != null && orderEntity != null && orderEntity?.Payment?.Id == paymentEntity.Id && userId == orderEntity.UserId && orderEntity.OrderItems != null && orderEntity.OrderItems.Any() && orderEntity.TotalAmount == request.Amount)
            {
                PaymentProfile.ToPaymentUpdate(paymentEntity, request);
                _paymentRepository.UpdatePayment(paymentEntity);
                return true;
            }
            return false;
        }

        public bool DeletePayment(int id)
        {
            var paymentEntity = _paymentRepository.GetPaymentById(id);
            if (paymentEntity != null)
            {
                _paymentRepository.DeletePayment(paymentEntity);
                return true;
            }
            return false;
        }
    }
}