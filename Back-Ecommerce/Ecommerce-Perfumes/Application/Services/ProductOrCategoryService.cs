using Application.Interfaces;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ProductOrCategoryService : IProductOrCategoryService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;


        public ProductOrCategoryService(IProductRepository productRepository, ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        public bool ProductExists(string product)
        {
            var productName = product.Trim().ToLower();
            var products = _productRepository.GetAllProductsRepository().Select(o => o.Name.Trim().ToLower());
            return products.Contains(productName);
        }

        public bool CategoryExists(string category)
        {
            var categoryName = category.Trim().ToLower();
            var categories = _categoryRepository.GetAllCategories().Select(o => o.Name.Trim().ToLower());
            return categories.Contains(categoryName);
        }
    }
}
