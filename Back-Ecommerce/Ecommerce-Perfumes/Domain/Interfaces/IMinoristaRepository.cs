using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMinoristaRepository
    {
        List<Minorista> GetAllMinoristas();
        Minorista? GetMinoristaById(int id);
        void CreateMinorista(Minorista minorista);
        void UpdateMinorista(Minorista minorista);
        void SoftDeleteMinorista(Minorista minorista);
        void DeleteMinorista(Minorista minorista);

    }
}
