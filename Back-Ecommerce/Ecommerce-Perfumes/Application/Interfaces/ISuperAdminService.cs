using Application.Models.Request;
using Application.Models.Response;

namespace Application.Interfaces
{
    public interface ISuperAdminService
    {
        List<SuperAdminResponse> GetAllSuperAdmins();
        SuperAdminResponse? GetSuperAdminById(int id);
        void CreateSuperAdmin(SuperAdminRequest entity);
        bool UpdateSuperAdmin(int id, SuperAdminRequest superAdmin);
        bool SoftDeleteSuperAdmin(int id);
        bool HardDeleteSuperAdmin(int id);
    }
}