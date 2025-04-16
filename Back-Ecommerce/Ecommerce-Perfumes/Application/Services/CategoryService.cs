using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Interfaces;

namespace Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public List<CategoryResponse> GetAllCategories()
        {
            var categories = _categoryRepository.GetAllCategories();
            return CategoryProfile.ToCategoryResponse(categories);
        }

        public CategoryResponse? GetCategoryById(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category != null)
            {
                return CategoryProfile.ToCategoryResponse(category);
            }
            return null;
        }

        public void CreateCategory(CategoryRequest category)
        {
            var CategoryEntity = CategoryProfile.ToCategoryEntity(category);
            _categoryRepository.CreateCategory(CategoryEntity);
        }

        public bool UpdateCategory(int id, CategoryRequest category)
        {
            var CategoryEntity = _categoryRepository.GetCategoryById(id);
            if (CategoryEntity == null)
            {
                return false;
            }
            CategoryProfile.ToCategoryEntityUpdate(CategoryEntity, category);
            _categoryRepository.UpdateCategory(CategoryEntity);
            return true;
        }

        //Soft Delete
        public bool SoftDeleteCategory(int id)
        {
            var categoryEntity = _categoryRepository.GetCategoryById(id);

            if (categoryEntity == null)
            {
                return false;
            }

            // Marcar la categoría como eliminada
            categoryEntity.Available = false;

            // Guardar cambios en la categoría (soft delete)
            _categoryRepository.SoftDeleteCategory(categoryEntity);

            return true;
        }



        //Hard Delete
        public bool HardDeleteCategory(int id)
        {
            var CategoryEntity = _categoryRepository.GetCategoryById(id);
            if (CategoryEntity == null)
            {
                return false;
            }
            _categoryRepository.DeleteCategory(CategoryEntity);
            return true;
        }
    }
}
