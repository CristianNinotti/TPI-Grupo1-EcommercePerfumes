using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductOrCategoryService _productOrCategoryService;

        public CategoryService(ICategoryRepository categoryRepository, IProductRepository productRepository, IProductOrCategoryService productOrCategoryService)
        {
            _categoryRepository = categoryRepository;
            _productRepository = productRepository;
            _productOrCategoryService = productOrCategoryService;
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
            if (_productOrCategoryService.CategoryExists(category.Name))
            {
                throw new InvalidOperationException($"Ya existe una Category con ese nombre");
            }
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
            if (_productOrCategoryService.CategoryExists(category.Name) && category.Name != CategoryEntity.Name)
            {
                throw new InvalidOperationException($"Ya existe una Category con ese nombre");
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

            // Obtener todos los productos asociados y marcarlos como eliminados
            var products = _productRepository.GetProductsByCategoryId(id);
            foreach (var product in products)
            {
                product.Available = false;
            }

            // Guardar cambios en la categoría (soft delete)
            _categoryRepository.SoftDeleteCategory(categoryEntity);

            // Guardar cambios en los productos (soft delete)
            _productRepository.SoftDeleteProductsRepository(products);

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
