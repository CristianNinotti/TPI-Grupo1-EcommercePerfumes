using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ISuperAdminRepository
    {
        List<SuperAdmin> GetAllSuperAdmins();
        SuperAdmin? GetSuperAdminById(int id);
        void AddSuperAdmin(SuperAdmin entity);
        void UpdateSuperAdmin(SuperAdmin entity);
        void SoftDeleteSuperAdmin(SuperAdmin entity);
        void DeleteSuperAdmin(SuperAdmin entity);
    }
}