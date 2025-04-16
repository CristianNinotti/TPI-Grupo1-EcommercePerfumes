using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public static class CategoryProfile
    {
        public static Category ToCategoryEntity(CategoryRequest request)
        {
            return new Category
            {
                Name = request.Name,
            };
        }
        public static CategoryResponse ToCategoryResponse(Category response)
        {
            if (response == null)
            {
                throw new ArgumentNullException("La categoria no puede ser nula");
            }
            return new CategoryResponse
            {
                Id = response.Id,
                Name = response.Name,
                Available = response.Available,
            };
        }
        public static List<CategoryResponse> ToCategoryResponse(List<Category> category)
        {
            return category.Select(c => new CategoryResponse
            {
                Id = c.Id,
                Name = c.Name,
                Available = c.Available
            }).ToList();
        }

        public static void ToCategoryEntityUpdate(Category category, CategoryRequest request)
        {
            category.Name = request.Name;
        }
    }

}
