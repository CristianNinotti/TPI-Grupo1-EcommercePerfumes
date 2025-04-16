using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Interfaces;

namespace Application.Services
{
    public class MinoristaService : IMinoristaService
    {
        private readonly IMinoristaRepository _minoristaRepository;
        private readonly IUserAvailableService _userAvailableService;

        public MinoristaService(IMinoristaRepository minoristaRepository, IUserAvailableService userAvailableService)
        {
            _minoristaRepository = minoristaRepository;
            _userAvailableService = userAvailableService;
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
            if (_userAvailableService.UserExists(minorista.NameAccount, minorista.Email))
            {
                throw new InvalidOperationException("El NameAccount o Email ya están en uso.");
            }
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

            // Validar que el NameAccount o Email no estén en uso por otro usuario
            if (_userAvailableService.UserExists(minorista.NameAccount, minorista.Email, id))
            {
                throw new InvalidOperationException("El NameAccount o Email ya están en uso por otro usuario.");
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
