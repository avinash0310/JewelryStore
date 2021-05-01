using JewelryStore.Common;
using JewelryStore.DAL;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace JewelryStore.Test
{
    public class CustomerRepositoryTest
    {
        [Fact]
        public async Task TestGetCustomerDetailsAsyncShouldPass()
        {
            /// Arrange
            LoginModel loginModel = MockData.GetLoginModel();
            var options = TestSetup.CreateDbContextOption();
            Customer actualResult = null;

            /// Act
            using (var dbContext = new ApplicationDbContext(options))
            {
                this.UpsertCustomer(dbContext);
                ICustomerRepository customerRepository = new CustomerRepository(dbContext);
                actualResult = await customerRepository.GetCustomerDetailsAsync(loginModel).ConfigureAwait(false);
            }

            /// Assert
            Assert.NotNull(actualResult);
            Assert.Equal(1, actualResult.Id);
            Assert.Equal(loginModel.Username, actualResult.UserName);
            Assert.Equal(TestConstant.Privileged, actualResult.CustomerType.Name);
        }

        [Fact]
        public async Task TestGetCustomerDetailsAsyncShouldReturnNull()
        {
            /// Arrange
            LoginModel loginModel = MockData.GetLoginModel();
            loginModel.Username = TestConstant.Privileged;
            var options = TestSetup.CreateDbContextOption();
            Customer actualResult = null;

            /// Act
            using (ApplicationDbContext dbContext = new ApplicationDbContext(options))
            {
                this.UpsertCustomer(dbContext);
                ICustomerRepository customerRepository = new CustomerRepository(dbContext);
                actualResult = await customerRepository.GetCustomerDetailsAsync(loginModel).ConfigureAwait(false);
            }

            /// Assert
            Assert.Null(actualResult);
        }

        [Fact]
        public async Task TestGetCustomerDetailsByIdAsyncShouldPass()
        {
            /// Arrange
            int customerId = 1;
            var options = TestSetup.CreateDbContextOption();
            Customer actualResult = null;

            /// Act
            using (ApplicationDbContext dbContext = new ApplicationDbContext(options))
            {
                this.UpsertCustomer(dbContext);
                ICustomerRepository customerRepository = new CustomerRepository(dbContext);
                actualResult = await customerRepository.GetCustomerDetailsAsync(customerId).ConfigureAwait(false);
            }

            /// Assert
            Assert.NotNull(actualResult);
            Assert.Equal(customerId, actualResult.Id);
            Assert.Equal(TestConstant.Privileged, actualResult.CustomerType.Name);
        }

        [Fact]
        public async Task TestGetCustomerDetailsByIdAsyncShouldReturnNull()
        {
            /// Arrange
            int customerId = 3;
            var options = TestSetup.CreateDbContextOption();
            Customer actualResult = null;

            /// Act
            using (ApplicationDbContext dbContext = new ApplicationDbContext(options))
            {
                this.UpsertCustomer(dbContext);
                ICustomerRepository customerRepository = new CustomerRepository(dbContext);
                actualResult = await customerRepository.GetCustomerDetailsAsync(customerId).ConfigureAwait(false);
            }

            /// Assert
            Assert.Null(actualResult);
        }

        private void UpsertCustomer(ApplicationDbContext dbContext)
        {
            if (dbContext?.Customers.FirstOrDefault() == null)
            {
                dbContext.Customers.Add(MockData.GetCustomerObject());
                dbContext.SaveChanges();
            }
        }
    }
}