using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        Category? GetCategoryById(int id);
        void CreateCategory(Category category);
        void UpdateCategory(Category category);
        void SoftDeleteCategory(Category category);
        void DeleteCategory(Category category);

    }
}
