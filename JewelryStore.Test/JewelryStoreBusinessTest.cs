using JewelryStore.BL;
using JewelryStore.Common;
using JewelryStore.DAL;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace JewelryStore.Test
{
    public class JewelryStoreBusinessTest
    {
        private readonly Mock<ICustomerRepository> mockCustomerRepository;
        private readonly IJewelryStoreRepository jewelryStoreRepository;
        private readonly JewelryStoreBusiness jewelryStoreBusiness;

        public JewelryStoreBusinessTest()
        {
            this.jewelryStoreRepository = new JewelryStoreRepository();
            this.mockCustomerRepository = new Mock<ICustomerRepository>();
            this.jewelryStoreBusiness = new JewelryStoreBusiness(this.jewelryStoreRepository, this.mockCustomerRepository.Object);
        }

        [Theory]
        [InlineData(2, 2, 2, 3.92)]
        [InlineData(2, 2, 0, 3.92)]
        [InlineData(1.0, 1.0, 4, 0.96)]
        [InlineData(1.1, 5.1, 10, 5.05)]
        [InlineData(2, 2, 100, 0)]
        public async Task TestCalculationForPrivilegedUser(double goldPrice, double goldWeight, int discount, double expectedResult)
        {
            /// Arrange
            JewelryCalculationModel calculationModel = MockData.GetJewelryCalculationModel();
            calculationModel.Discount = discount;
            calculationModel.GoldPrice = goldPrice;
            calculationModel.GoldWeight = goldWeight;
            this.MockCustomerRepository();

            /// Act
            JewelryCalculationDTO actualResult = await this.jewelryStoreBusiness.Calculate(calculationModel).ConfigureAwait(false);

            /// Assert
            Assert.Equal(expectedResult, actualResult.TotalPrice);
        }

        [Theory]
        [InlineData(2, 2, 4)]
        [InlineData(2, 5, 10)]
        [InlineData(1.0, 1.0, 1)]
        [InlineData(1.1, 5.1,  5.61)]
        public async Task TestCalculationForRegularUser(double goldPrice, double goldWeight, double expectedResult)
        {
            /// Arrange
            int customerId = 2;
            JewelryCalculationModel calculationModel = MockData.GetJewelryCalculationModel(customerId);
            calculationModel.GoldPrice = goldPrice;
            calculationModel.GoldWeight = goldWeight;
            this.MockCustomerRepository(customerId, TestConstant.Regular);

            /// Act
            JewelryCalculationDTO actualResult = await this.jewelryStoreBusiness.Calculate(calculationModel).ConfigureAwait(false);

            /// Assert
            Assert.Equal(expectedResult, actualResult.TotalPrice);
        }


        private void MockCustomerRepository(int customerId = 1, string customerType = TestConstant.Privileged)
        {
            var customerObject = MockData.GetCustomerObject(customerId, customerType);
            this.mockCustomerRepository.Setup(x => x.GetCustomerDetailsAsync(customerId)).Returns(Task.FromResult(customerObject));
        }
    }
}