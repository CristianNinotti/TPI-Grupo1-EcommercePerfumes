using Domain.Entities;
using Application.Models.Request;
using Application.Models.Response;

namespace Application.Mappings
{
    public static class ProductProfile
    {
        public static Product ToProductEntity(ProductRequest product)
        {
            return new Product
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                Marca = product.Marca,
                Genero = product.Genero,
                CategoryId = product.CategoryId,
                Photos = product.Photos


            };
        }
        public static ProductResponse ToProductResponse(Product product)
        {
            return new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                Marca = product.Marca,
                Genero = product.Genero,
                CategoryId = product.CategoryId,
                Photos = product.Photos,
                Available = product.Available,

            };
        }
        public static List<ProductResponse> ToProductResponse(List<Product> product)
        {
            return product.Select(c => new ProductResponse
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                Price = c.Price,
                Stock = c.Stock,
                Marca = c.Marca,
                Genero = c.Genero,
                CategoryId = c.CategoryId,
                Photos = c.Photos,
                Available = c.Available


            }).ToList();
        }

        public static void ToProductUpdate(Product product, ProductRequest request)
        {
            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Stock = request.Stock;
            product.Marca = request.Marca;
            product.Genero = request.Genero;
            product.CategoryId = product.CategoryId;
            product.Photos = request.Photos;

        }
    }
}
