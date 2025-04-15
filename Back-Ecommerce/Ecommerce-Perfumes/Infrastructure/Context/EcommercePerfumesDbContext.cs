using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context
{
    public class EcommercePerfumesDbContext:DbContext
    {
        public EcommercePerfumesDbContext(DbContextOptions<EcommercePerfumesDbContext> options) : base(options) { }
        public DbSet<Minorista> Minoristas { get; set; }
        public DbSet<Mayorista> Mayoristas { get; set; }
    }
}
