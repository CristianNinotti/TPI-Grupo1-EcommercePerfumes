using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAllProductsRepository();
        Product? GetProductByIdRepository(int id);
        IEnumerable<Product> GetProductsByCategoryId(int categoryId);
        void CreateProductRepository(Product product);
        void UpdateProductRepository(Product product);
        void UpdateProducts(IEnumerable<Product> products);
        void SoftDeleteProductsRepository(IEnumerable<Product> products);
        void DeleteProductRepository(Product product);
    }
}
