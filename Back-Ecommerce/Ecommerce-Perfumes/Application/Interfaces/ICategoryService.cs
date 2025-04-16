using Application.Models.Request;
using Application.Models.Response;

namespace Application.Interfaces
{
    public interface ICategoryService
    {
        List<CategoryResponse> GetAllCategories();
        CategoryResponse? GetCategoryById(int id);
        void CreateCategory(CategoryRequest category);
        bool UpdateCategory(int id, CategoryRequest category);
        bool SoftDeleteCategory(int id);
        bool HardDeleteCategory(int id);
    }
}
