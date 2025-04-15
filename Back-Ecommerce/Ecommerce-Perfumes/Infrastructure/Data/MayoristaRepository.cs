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
    public class MayoristaRepository : IMayoristaRepository
    {
        private readonly EcommercePerfumesDbContext _mayorista;
        public MayoristaRepository(EcommercePerfumesDbContext mayorista)
        {
            _mayorista = mayorista;
        }

        public List<Mayorista> GetAllMayoristas()
        {
            return _mayorista.Mayoristas.ToList();
        }

        public Mayorista? GetMayoristaById(int id) 
        { 
            return _mayorista.Mayoristas.FirstOrDefault(m => m.Id == id);
        }

        public void CreateMayorista(Mayorista mayorista)
        {
            _mayorista.Mayoristas.Add(mayorista);
            _mayorista.SaveChanges();
        }

        public void UpdateMayorista(Mayorista mayorista)
        {
            _mayorista.Mayoristas.Update(mayorista);
            _mayorista.SaveChanges();
        }

        public void SoftDeleteMayorista (Mayorista mayorista)
        {
            mayorista.Available = false;
            _mayorista.SaveChanges();
        }

        public void HardDeleteMayorista (Mayorista mayorista)
        {
            _mayorista.Mayoristas.Remove(mayorista);
            _mayorista.SaveChanges();
        }
    }
}
