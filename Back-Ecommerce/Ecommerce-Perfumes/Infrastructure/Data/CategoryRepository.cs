using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;


namespace Infrastructure.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly EcommercePerfumesDbContext _category;

        public CategoryRepository(EcommercePerfumesDbContext category)
        {
            _category = category;
        }

        public List<Category> GetAllCategories()
        {
            return _category.Categories.ToList();
        }

        public Category? GetCategoryById(int id)
        {
            return _category.Categories.FirstOrDefault(m => m.Id == id);
        }

        public void CreateCategory(Category category)
        {
            _category.Categories.Add(category);
            _category.SaveChanges();
        }

        public void UpdateCategory(Category category)
        {
            _category.Categories.Update(category);
            _category.SaveChanges();
        }

        //SoftDelete
        public void SoftDeleteCategory(Category category)
        {
            category.Available = false;
            _category.SaveChanges();
        }

        //HardDelete
        public void DeleteCategory(Category category)
        {
            _category.Categories.Remove(category);
            _category.SaveChanges();
        }
    }
}