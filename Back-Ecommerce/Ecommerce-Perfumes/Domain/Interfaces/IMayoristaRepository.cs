using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IMayoristaRepository
    {
        List<Mayorista> GetAllMayoristas();
        Mayorista? GetMayoristaById(int id);
        void CreateMayorista(Mayorista mayorista);
        void UpdateMayorista(Mayorista mayorista);
        void SoftDeleteMayorista(Mayorista mayorista);
        void HardDeleteMayorista(Mayorista mayorista);
    }
}
