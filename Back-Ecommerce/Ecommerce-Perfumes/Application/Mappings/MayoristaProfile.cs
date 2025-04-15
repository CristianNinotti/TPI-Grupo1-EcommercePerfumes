using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                PhoneNumber = request.PhoneNumer,
                Address = request.Address,
            };
        }

        public static MayoristaResponse ToMayoristaResponse(Mayorista mayoristaEntity)
        {

            return new MayoristaResponse();
        }
    }
}
