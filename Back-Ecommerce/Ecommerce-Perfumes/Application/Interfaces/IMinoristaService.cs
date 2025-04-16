using Application.Models.Response;
using Application.Models.Request;


namespace Application.Interfaces
{
    public interface IMinoristaService
    {
        List<MinoristaResponse> GetAllMinorista();
        MinoristaResponse? GetMinoristaById(int id);
        void CreateMinorista(MinoristaRequest minorista);
        bool UpdateMinorista(int id, MinoristaRequest minorista);
        bool SoftDeleteMinorista(int id);
        bool HardDeleteMinorista(int id);

    }
}
