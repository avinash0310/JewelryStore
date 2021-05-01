using JewelryStore.Common;
using Microsoft.EntityFrameworkCore;

namespace JewelryStore.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; }

        public virtual DbSet<CustomerType> CustomerType { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().ToTable(Constants.Customer);
            modelBuilder.Entity<CustomerType>().ToTable(Constants.CustomerType);

            modelBuilder.Entity<Customer>()
            .HasOne(s => s.CustomerType)
            .WithMany(g => g.Customers)
            .HasForeignKey(s => s.CustomerTypeId);


            modelBuilder.Entity<CustomerType>().HasData(
            new CustomerType
            {
                Id = 999,
                Name = Constants.Privileged
            }, new CustomerType
            {
                Id = 998,
                Name = Constants.Regular
            });

            modelBuilder.Entity<Customer>().HasData(
                new
                {
                    Email = "test01@gmail.com",
                    Password = "test@123",
                    UserName = "test123",
                    CustomerTypeId = 999,
                    Id = 1
                },
                new
                {
                    Email = "test02@gmail.com",
                    Password = "test@1234",
                    UserName = "test1234",
                    CustomerTypeId = 998,
                    Id = 2
                });
        }
    }
}