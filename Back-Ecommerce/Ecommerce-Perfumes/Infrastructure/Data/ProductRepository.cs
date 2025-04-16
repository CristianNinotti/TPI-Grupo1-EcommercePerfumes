using Infrastructure.Context;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly EcommercePerfumesDbContext _product;
        public ProductRepository(EcommercePerfumesDbContext product)
        {
            _product = product;
        }
        public List<Product> GetAllProductsRepository()
        {
            return _product.Products.ToList();
        }
        public Product? GetProductByIdRepository(int id)
        {
            return _product.Products.FirstOrDefault(m => m.Id == id);
        }

        public IEnumerable<Product> GetProductsByCategoryId(int categoryId)
        {
            return _product.Products.Where(p => p.CategoryId == categoryId).ToList();
        }

        public void CreateProductRepository(Product product)
        {
            _product.Products.Add(product);
            _product.SaveChanges();
        }
        public void UpdateProductRepository(Product product)
        {
            _product.Products.Update(product);
            _product.SaveChanges();
        }
        // Para actualizar todos los productos a la vez cuando una categoria sea seteada por Available = False
        public void UpdateProducts(IEnumerable<Product> products)
        {
            _product.Products.UpdateRange(products);
            _product.SaveChanges();
        }


        //SoftDelete

        public void SoftDeleteProductsRepository(IEnumerable<Product> products)
        {
            foreach (var product in products)
            {
                product.Available = false;
            }
            _product.SaveChanges();
        }

        //HardDelete

        public void DeleteProductRepository(Product product)
        {
            _product.Products.Remove(product);
            _product.SaveChanges();
        }
    }
}