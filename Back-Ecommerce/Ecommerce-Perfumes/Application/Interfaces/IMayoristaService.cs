using Application.Models.Request;
using Application.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMayoristaService
    {
        MayoristaResponse? GetMayoristaById(int id);
        List<MayoristaResponse>? GetAllMayoristas();
        void CreateMayorista(MayoristaRequest mayoristaRequest);
        bool UpdateMayorista(int id, MayoristaRequest mayoristaRequest);
        bool SoftDeleteMayorista(int id);
        bool HardDeleteMayorista(int id);

    }
}
