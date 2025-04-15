using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class SuperAdminService : ISuperAdminService
    {
        private readonly ISuperAdminRepository _superAdminRepository;
        

        public SuperAdminService(ISuperAdminRepository superAdminRepository)
        {
            _superAdminRepository = superAdminRepository;
            
        }

        public List<SuperAdminResponse> GetAllSuperAdmins()
        {
            var superAdmins = _superAdminRepository.GetAllSuperAdmins();
            return SuperAdminProfile.ToSuperAdminResponse(superAdmins);
        }

        public SuperAdminResponse? GetSuperAdminById(int id)
        {
            var superAdmin = _superAdminRepository.GetSuperAdminById(id);

            if (superAdmin != null)
            {
                return SuperAdminProfile.ToSuperAdminResponse(superAdmin);
            }
            return null;
        }

        public void CreateSuperAdmin(SuperAdminRequest superAdmin)
        {
            
            var superAdminEntity = SuperAdminProfile.ToSuperAdminEntity(superAdmin);
            _superAdminRepository.AddSuperAdmin(superAdminEntity);
        }

        public bool UpdateSuperAdmin(int id, SuperAdminRequest superAdmin)
        {
            var superAdminEntity = _superAdminRepository.GetSuperAdminById(id);
            if (superAdminEntity == null)
            {
                return false;  // No se encontró el mayorista, no se puede actualizar
            }

            
            
            SuperAdminProfile.ToSuperAdminUpdate(superAdminEntity, superAdmin);
            _superAdminRepository.UpdateSuperAdmin(superAdminEntity);
            return true;
        }

        public bool SoftDeleteSuperAdmin(int id)
        {
            var superAdmin = _superAdminRepository.GetSuperAdminById(id);
            if (superAdmin != null)
            {
                superAdmin.Available = false;
                _superAdminRepository.SoftDeleteSuperAdmin(superAdmin);
                return true;
            }
            return false;
        }

        public bool HardDeleteSuperAdmin(int id)
        {
            var superAdmin = _superAdminRepository.GetSuperAdminById(id);
            if (superAdmin != null)
            {
                _superAdminRepository.DeleteSuperAdmin(superAdmin);
                return true;
            }
            return false;
        }
    }
}