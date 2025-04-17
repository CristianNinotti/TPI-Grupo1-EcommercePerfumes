using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context
{
    public class EcommercePerfumesDbContext:DbContext
    {
        public EcommercePerfumesDbContext(DbContextOptions<EcommercePerfumesDbContext> options) : base(options) { }
        public DbSet<Minorista> Minoristas { get; set; }
        public DbSet<Mayorista> Mayoristas { get; set; }
        public DbSet<SuperAdmin> SuperAdmins { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
