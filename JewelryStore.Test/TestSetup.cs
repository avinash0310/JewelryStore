using JewelryStore.DAL;
using Microsoft.EntityFrameworkCore;

namespace JewelryStore.Test
{
    public static class TestSetup
    {
        public static DbContextOptions<ApplicationDbContext> CreateDbContextOption()
        {
            return new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDb")
                .Options;
        }
    }
}