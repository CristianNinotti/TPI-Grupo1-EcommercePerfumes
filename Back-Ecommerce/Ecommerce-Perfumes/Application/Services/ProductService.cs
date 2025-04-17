using Domain.Interfaces;
using Application.Mappings;
using Application.Models.Response;
using Application.Models.Request;
using Application.Interfaces;
using Domain.Entities;
using System.Runtime.InteropServices;

namespace Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IProductOrCategoryService _productOrCategoryService;

        public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository, IOrderItemRepository orderItemRepository, IProductOrCategoryService productOrCategoryService)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _orderItemRepository = orderItemRepository;
            _productOrCategoryService = productOrCategoryService;
        }
        public List<ProductResponse> GetAllProducts()
        {
            var products = _productRepository.GetAllProductsRepository();
            return ProductProfile.ToProductResponse(products);
        }

        public ProductResponse? GetProductById(int id)
        {
            var product = _productRepository.GetProductByIdRepository(id);
            if (product != null)
            {
                return ProductProfile.ToProductResponse(product);
            }
            return null;
        }

        public IEnumerable<Product> GetProductsByCategoryId(int categoryId)
        {
            return _productRepository.GetProductsByCategoryId(categoryId);
        }

        public (bool success, string message) CreateProduct(ProductRequest product)
        {
            if (_productOrCategoryService.ProductExists(product.Name))
            {
                return (false, "Ya existe un producto con ese nombre.");
            }
            var category = _categoryRepository.GetCategoryById(product.CategoryId);

            if (category == null)
            {
                return (false, "La categoría no existe.");
            }

            if (!category.Available)
            {
                return (false, "La categoría está eliminada y no puede usarse.");
            }



            var productEntity = ProductProfile.ToProductEntity(product);
            productEntity.Categoria = category;
            _productRepository.CreateProductRepository(productEntity);

            return (true, "Producto creado con éxito.");
        }

        public bool ToUpdateProduct(int id, ProductRequest request)
        {
            var productEntity = _productRepository.GetProductByIdRepository(id);
            var category = _categoryRepository.GetCategoryById(request.CategoryId);
            if (_productOrCategoryService.ProductExists(request.Name) && request.Name != productEntity?.Name)
            {
                throw new InvalidOperationException($"Ya existe un Product con ese nombre");
            }
            if (category != null && productEntity != null && productEntity.Available == true && category.Available == true)
            {
                ProductProfile.ToProductUpdate(productEntity, request);
                productEntity.Categoria = category;
                _productRepository.UpdateProductRepository(productEntity);
                return true;
            }
            return false;
        }
        public bool SoftDeleteProduct(int id)
        {

            // Obtener el producto
            var productEntity = _productRepository.GetProductByIdRepository(id);
            if (productEntity == null)
            {
                return false;
            }
            productEntity.Available = false;
            _productRepository.SoftDeleteProductsRepository(new List<Product> { productEntity });

            var orderItems = _orderItemRepository.GetAllOrderItemsByProductIdRepository(id);
            foreach (var orderItem in orderItems)
            {
                orderItem.Available = false;
                _orderItemRepository.SoftDeleteOrderItemRepository(orderItem);
            }

            return true;

        }


        public bool HardDeleteProduct(int id)
        {
            var productEntity = _productRepository.GetProductByIdRepository(id);
            if (productEntity == null)
            {
                return false;
            }
            _productRepository.DeleteProductRepository(productEntity);
            return true;
        }
    }
}