using JewelryStore.BL;
using JewelryStore.Common;
using JewelryStore.DAL;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace JewelryStore.Test
{
    public class CustomerBusinessTest
    {
        private readonly Mock<ICustomerRepository> mockCustomerRepository;
        private readonly CustomerBusiness customerBusiness;

        public CustomerBusinessTest()
        {
            this.mockCustomerRepository = new Mock<ICustomerRepository>();
            this.customerBusiness = new CustomerBusiness(this.mockCustomerRepository.Object);
        }

        [Fact]
        public async Task TestGetCustomerDetailsShouldReturnCustomerDTO()
        {
            /// Arrange
            LoginModel loginModel = MockData.GetLoginModel();
            this.MockCustomerRepository();

            /// Act
            CustomerDTO actualResult = await this.customerBusiness.GetCustomerDetails(loginModel).ConfigureAwait(false);

            /// Assert
            Assert.NotNull(actualResult);
            Assert.Equal(1, actualResult.CustomerId);
            Assert.Equal(loginModel.Username, actualResult.UserName);
            Assert.Equal(TestConstant.Privileged, actualResult.CustomerType);
        }

        [Fact]
        public async Task TestGetCustomerDetailsShouldReturnNull()
        {
            /// Arrange
            LoginModel loginModel = MockData.GetLoginModel();
            loginModel.Username = TestConstant.Regular;
            this.MockCustomerRepository();

            /// Act
            CustomerDTO actualResult = await this.customerBusiness.GetCustomerDetails(loginModel).ConfigureAwait(false);

            /// Assert
            Assert.Null(actualResult);
        }

        private void MockCustomerRepository()
        {
            Customer customerObject = MockData.GetCustomerObject();
            LoginModel loginModel = MockData.GetLoginModel();
            this.mockCustomerRepository.Setup(x => x.GetCustomerDetailsAsync(It.Is<LoginModel>(x=> x.Username == loginModel.Username && x.Password == loginModel.Password)))
                .Returns(Task.FromResult(customerObject));
        }
    }
}