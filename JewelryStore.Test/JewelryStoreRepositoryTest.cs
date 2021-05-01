using JewelryStore.Common;
using JewelryStore.DAL;
using Xunit;

namespace JewelryStore.Test
{
    public class JewelryStoreRepositoryTest
    {
        public readonly JewelryStoreRepository jewelryStore;
        public JewelryStoreRepositoryTest()
        {
            this.jewelryStore = new JewelryStoreRepository();
        }

        [Theory]
        [InlineData(2, 2, 2, 3.92)]
        [InlineData(2, 2, 0, 4)]
        [InlineData(1.0, 1.0, 4, 0.96)]
        [InlineData(1.1, 5.1, 10, 5.05)]
        [InlineData(2, 2, 100, 0)]
        [InlineData(double.MaxValue, double.MaxValue, 10, double.NaN)]
        [InlineData(double.MaxValue, double.MaxValue, 0, double.PositiveInfinity)]
        public void CalculateShouldPass(double goldPrice, double goldWeight, int discount, double expectedResult)
        {
            /// Arrange
            JewelryCalculationModel calculationModel = MockData.GetJewelryCalculationModel();
            calculationModel.Discount = discount;
            calculationModel.GoldPrice = goldPrice;
            calculationModel.GoldPrice = goldPrice;
            calculationModel.GoldWeight = goldWeight;

            /// Act
            double actualResult = this.jewelryStore.Calculate(calculationModel);

            /// Assert
            Assert.Equal(expectedResult, actualResult);
        }
    }
}
