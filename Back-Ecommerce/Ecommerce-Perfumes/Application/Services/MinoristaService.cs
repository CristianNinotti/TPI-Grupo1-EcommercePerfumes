
using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class MinoristaService : IMinoristaService
    {
        private readonly IMinoristaRepository _minoristaRepository;


        public MinoristaService(IMinoristaRepository minoristaRepository)
        {
            _minoristaRepository = minoristaRepository;

        }
        public List<MinoristaResponse> GetAllMinorista()
        {
            var minoristas = _minoristaRepository.GetAllMinoristas();
            return MinoristaProfile.ToMinoristaResponse(minoristas);
        }

        public MinoristaResponse? GetMinoristaById(int id)
        {
            var minorista = _minoristaRepository.GetMinoristaById(id);
            if (minorista != null)
            {
                return MinoristaProfile.ToMinoristaResponse(minorista);
            }
            return null;
        }

        public void CreateMinorista(MinoristaRequest minorista)
        {

            var minoristaEntity = MinoristaProfile.ToMinoristaEntity(minorista);
            _minoristaRepository.CreateMinorista(minoristaEntity);
        }

        public bool UpdateMinorista(int id, MinoristaRequest minorista)
        {
            var minoristaEntity = _minoristaRepository.GetMinoristaById(id);
            if (minoristaEntity == null)
            {
                return false;  // No se encontró el mayorista, no se puede actualizar
            }

            MinoristaProfile.ToMinoristaUpdate(minoristaEntity, minorista);
            _minoristaRepository.UpdateMinorista(minoristaEntity);
            return true;
        }

        public bool SoftDeleteMinorista(int id)
        {
            var minoristaEntity = _minoristaRepository.GetMinoristaById(id);
            if (minoristaEntity == null)
            {
                return false;
            }
            minoristaEntity.Available = false;
            _minoristaRepository.SoftDeleteMinorista(minoristaEntity);
            return true;
        }

        public bool HardDeleteMinorista(int id)
        {
            var minoristaEntity = _minoristaRepository.GetMinoristaById(id);
            if (minoristaEntity == null)
            {
                return false;
            }
            _minoristaRepository.DeleteMinorista(minoristaEntity);
            return true;
        }
    }
}
