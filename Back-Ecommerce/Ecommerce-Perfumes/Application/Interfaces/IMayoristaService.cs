using Application.Models.Request;
using Application.Models.Response;


namespace Application.Interfaces
{
    public interface IMayoristaService
    {
        MayoristaResponse? GetMayoristaById(int id);
        List<MayoristaResponse>? GetAllMayoristas();
        void CreateMayorista(MayoristaRequest mayoristaRequest);
        bool UpdateMayorista(int id, MayoristaRequest mayoristaRequest);
        bool UpdateMayoristaDiscount(int id, decimal discountRate);
        bool SoftDeleteMayorista(int id);
        bool HardDeleteMayorista(int id);

    }
}
