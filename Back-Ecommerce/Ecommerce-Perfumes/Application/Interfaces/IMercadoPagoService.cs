using Application.Models.Dtos;
using Application.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMercadoPagoService
    {
        Task<string> CreatePreferenceAsync(List<CreatePreferenceDto> dtos);
    }
}
