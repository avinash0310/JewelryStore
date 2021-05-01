using JewelryStore.Common;
using JewelryStore.DAL;
using System.Threading.Tasks;

namespace JewelryStore.BL
{
    public class JewelryStoreBusiness : IJewelryStoreBusiness
    {
        private readonly IJewelryStoreRepository jewelryStoreRepository;
        private readonly ICustomerRepository customerRepository;
        public JewelryStoreBusiness(IJewelryStoreRepository jewelryStoreRepository, ICustomerRepository customerRepository)
        {
            this.jewelryStoreRepository = jewelryStoreRepository;
            this.customerRepository = customerRepository;
        }

        public async Task<JewelryCalculationDTO> Calculate(JewelryCalculationModel calculationModel)
        {
            Customer customer = await this.customerRepository.GetCustomerDetailsAsync(calculationModel.CustomerId).ConfigureAwait(false);
            if (customer != null)
            {
                this.CalculateDiscount(customer, calculationModel);
                double totalPrice = this.jewelryStoreRepository.Calculate(calculationModel);
                return this.BuildJewelryCalculationDTO(calculationModel, totalPrice);
            }

            return null;
        }


        private void CalculateDiscount(Customer customer, JewelryCalculationModel calculationModel)
        {
            if (customer.CustomerType.Name == Constants.Privileged && calculationModel.Discount == 0)
            {
                calculationModel.Discount = Constants.DefaultDiscount;
            }
            else if (customer.CustomerType.Name == Constants.Regular)
            {
                calculationModel.Discount = Constants.ZeroDiscount;
            }
        }

        private JewelryCalculationDTO BuildJewelryCalculationDTO(JewelryCalculationModel calculationModel, double totalPrice)
        {
            return new JewelryCalculationDTO
            {
                CustomerId = calculationModel.CustomerId,
                TotalPrice = totalPrice,
                Discount = calculationModel.Discount,
                GoldPrice = calculationModel.GoldPrice,
                GoldWeight = calculationModel.GoldWeight
            };
        }
    }
}