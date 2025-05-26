using Domain.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using Application.Mappings;
using Application.Interfaces;


namespace Application.Services
{
    public class MayoristaService : IMayoristaService
    {
        private readonly IMayoristaRepository _mayoristaRepository;
        private readonly IUserAvailableService _userAvailableService;

        public MayoristaService(IMayoristaRepository mayoristaRepository, IUserAvailableService userAvailableService)
        {
            _mayoristaRepository = mayoristaRepository;
            _userAvailableService = userAvailableService;
        }

        public MayoristaResponse? GetMayoristaById(int id)
        {
            var mayoristaEntity = _mayoristaRepository.GetMayoristaById(id);
            if (mayoristaEntity != null)
            {
                return MayoristaProfile.ToMayoristaResponse(mayoristaEntity);
            }
            return null;
        }

        public List<MayoristaResponse>? GetAllMayoristas()
        {
            var mayoristas = _mayoristaRepository.GetAllMayoristas();
            if (mayoristas != null)
            {
                return MayoristaProfile.ToMayoristaResponse(mayoristas);
            }
            return null;
        }
        public void CreateMayorista(MayoristaRequest mayorista)
        {
            if (_userAvailableService.UserExists(mayorista.NameAccount, mayorista.Email))
            {
                throw new InvalidOperationException("El NameAccount o Email ya están en uso.");
            }

            var mayoristaEntity = MayoristaProfile.ToMayoristaEntity(mayorista);
            _mayoristaRepository.CreateMayorista(mayoristaEntity);
        }

        public bool UpdateMayorista(int id, MayoristaRequest mayorista)
        {
            var mayoristaEntity = _mayoristaRepository.GetMayoristaById(id);
            if (mayoristaEntity == null)
            {
                return false;  // No se encontró el mayorista, no se puede actualizar
            }

            // Validar que el NameAccount o Email no estén en uso por otro usuario
            if (_userAvailableService.UserExists(mayorista.NameAccount, mayorista.Email, id))
            {
                throw new InvalidOperationException("El NameAccount o Email ya están en uso por otro usuario.");
            }

            MayoristaProfile.ToUpdateMayorista(mayoristaEntity, mayorista);
            _mayoristaRepository.UpdateMayorista(mayoristaEntity);

            return true;  // La actualización fue exitosa
        }

        public bool UpdateMayoristaDiscount(int id, decimal discountRate)
        {
            var mayoristaEntity = _mayoristaRepository.GetMayoristaById(id);
            if (mayoristaEntity == null)
            {
                return false;
            }

            mayoristaEntity.DiscountRate = discountRate;
            _mayoristaRepository.UpdateMayorista(mayoristaEntity);

            return true;
        }



        public bool SoftDeleteMayorista(int id)
        {
            var mayoristaEntity = _mayoristaRepository.GetMayoristaById(id);
            if (mayoristaEntity != null && mayoristaEntity.Available)
            {
                _mayoristaRepository.SoftDeleteMayorista(mayoristaEntity);
                return true;
            }
            return false;
        }

        public bool HardDeleteMayorista(int id)
        {
            var mayoristaEntity = _mayoristaRepository.GetMayoristaById(id);
            if (mayoristaEntity != null)
            {
                _mayoristaRepository.HardDeleteMayorista(mayoristaEntity);
                return true;
            }
            return false;
        }
    }
}