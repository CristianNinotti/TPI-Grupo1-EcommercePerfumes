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

        public MayoristaService(IMayoristaRepository mayoristaRepository)
        {
            _mayoristaRepository = mayoristaRepository;
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

        public void CreateMayorista(MayoristaRequest mayoristaRequest)
        {
            var mayoristaEntity = MayoristaProfile.ToMayoristaEntity(mayoristaRequest);
            if (mayoristaEntity != null)
            {
                _mayoristaRepository.CreateMayorista(mayoristaEntity);
            }
        }

        public bool UpdateMayorista(int id, MayoristaRequest mayoristaRequest)
        {
            var mayoristaEntity = _mayoristaRepository.GetMayoristaById(id);
            if (mayoristaEntity != null)
            {
                MayoristaProfile.ToUpdateMayorista(mayoristaEntity, mayoristaRequest);
                _mayoristaRepository.UpdateMayorista(mayoristaEntity);
                return true;
            }
            return false;
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