using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Application.Mappings
{
    public static class MayoristaProfile
    {
        public static Mayorista ToMayoristaEntity(MayoristaRequest request)
        {
            return new Mayorista
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                CUIT = request.CUIT,
                Categoria = request.Categoria,
                NameAccount = request.NameAccount,
                Password = request.Password,
                Email = request.Email,
                Dni = request.Dni,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
            };
        }

        public static MayoristaResponse ToMayoristaResponse(Mayorista mayoristaEntity)
        {
            return new MayoristaResponse
            {
                Id = mayoristaEntity.Id,
                FirstName = mayoristaEntity.FirstName,
                LastName = mayoristaEntity.LastName,
                CUIT = mayoristaEntity.CUIT,
                Categoria = mayoristaEntity.Categoria,
                NameAccount = mayoristaEntity.NameAccount,
                Password = mayoristaEntity.Password,
                Email = mayoristaEntity.Email,
                Dni = mayoristaEntity.Dni,
                PhoneNumber = mayoristaEntity.PhoneNumber,
                Address = mayoristaEntity.Address,
                Available = mayoristaEntity.Available,
                DiscountRate = mayoristaEntity.DiscountRate
            };
        }

        public static List<MayoristaResponse> ToMayoristaResponse(List<Mayorista> mayoristas)
        {
            return mayoristas.Select(m => new MayoristaResponse
            {
                Id = m.Id,
                FirstName = m.FirstName,
                LastName = m.LastName,
                CUIT = m.CUIT,
                Categoria = m.Categoria,
                NameAccount = m.NameAccount,
                Password = m.Password,
                Email = m.Email,
                Dni = m.Dni,
                PhoneNumber = m.PhoneNumber,
                Address = m.Address,
                Available = m.Available,
                DiscountRate = m.DiscountRate
            }).ToList();
        }

        public static void ToUpdateMayorista(Mayorista mayoristaEntity, MayoristaRequest request)
        {
            mayoristaEntity.FirstName = request.FirstName;
            mayoristaEntity.LastName = request.LastName;
            mayoristaEntity.CUIT = request.CUIT;
            mayoristaEntity.Categoria = request.Categoria;
            mayoristaEntity.NameAccount = request.NameAccount;
            mayoristaEntity.Password = request.Password;
            mayoristaEntity.Email = request.Email;
            mayoristaEntity.Dni = request.Dni;
            mayoristaEntity.PhoneNumber = request.PhoneNumber;
            mayoristaEntity.Address = request.Address;
        }


        public static void ToUpdateDiscount(Mayorista mayorista, decimal discountRate)
        {
            mayorista.DiscountRate = discountRate;
        }

    }
}