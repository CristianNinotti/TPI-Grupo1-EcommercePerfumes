using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IProductService
    {
        List<ProductResponse> GetAllProducts();
        ProductResponse? GetProductById(int id);
        IEnumerable<Product> GetProductsByCategoryId(int categoryId);
        (bool success, string message) CreateProduct(ProductRequest product);
        bool ToUpdateProduct(int id, ProductRequest product);
        bool SoftDeleteProduct(int id);
        bool HardDeleteProduct(int id);
    }
}