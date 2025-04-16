using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;

namespace Infrastructure.Data
{
    public class MinoristaRepository : IMinoristaRepository
    {
        private readonly EcommercePerfumesDbContext _minorista;

        public MinoristaRepository(EcommercePerfumesDbContext minorista)
        {
            _minorista = minorista;
        }

        public List<Minorista> GetAllMinoristas()
        {
            return _minorista.Minoristas.ToList();
        }

        public Minorista? GetMinoristaById(int id)
        {
            return _minorista.Minoristas.FirstOrDefault(m => m.Id == id);
        }

        public void CreateMinorista(Minorista minorista)
        {
            _minorista.Minoristas.Add(minorista);
            _minorista.SaveChanges();
        }

        public void UpdateMinorista(Minorista minorista)
        {
            _minorista.Minoristas.Update(minorista);
            _minorista.SaveChanges();
        }

        //SoftDelete
        public void SoftDeleteMinorista(Minorista minorista)
        {
            minorista.Available = false;
            _minorista.SaveChanges();
        }

        //HardDelete
        public void DeleteMinorista(Minorista minorista)
        {
            _minorista.Minoristas.Remove(minorista);
            _minorista.SaveChanges();
        }
    }
}
