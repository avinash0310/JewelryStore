using JewelryStore.Common;

namespace JewelryStore.Test
{
    public static class MockData
    {
        public static JewelryCalculationModel GetJewelryCalculationModel()
        {
            return new JewelryCalculationModel
            {
                CustomerId = TestConstant.DefaultCustomerId,
                Discount = TestConstant.DefaultDiscount,
                GoldPrice = TestConstant.DefaultGoldPrice,
                GoldWeight = TestConstant.DefaultGoldWeight 
            };
        }

        public static Customer GetCustomerObject(int customerId = 1, string customerType = TestConstant.Privileged, 
            string userName = TestConstant.UserName, string password = TestConstant.Password)
        {
            return new Customer
            {
                CustomerType = new CustomerType { Name = customerType, Id = customerId },
                Id = customerId,
                UserName = userName,
                Password = password
            };
        }

        public static LoginModel GetLoginModel(string userName = TestConstant.UserName, string password = TestConstant.Password)
        {
            return new LoginModel
            {
                Username = userName,
                Password = password
            };
        }

        public static JewelryCalculationModel GetJewelryCalculationModel(int customerId = 1)
        {
            return new JewelryCalculationModel
            {
                CustomerId = customerId
            };
        }
    }
}