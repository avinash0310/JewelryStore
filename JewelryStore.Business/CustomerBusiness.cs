using JewelryStore.Common;
using JewelryStore.DAL;
using System.Threading.Tasks;

namespace JewelryStore.BL
{
    public class CustomerBusiness : ICustomerBusiness
    {
        private readonly ICustomerRepository customerRepository;

        public CustomerBusiness(ICustomerRepository customerRepository)
        {
            this.customerRepository = customerRepository;
        }

        public async Task<CustomerDTO> GetCustomerDetails(LoginModel loginModel)
        {
            Customer customer = await this.customerRepository.GetCustomerDetailsAsync(loginModel).ConfigureAwait(false);
            if (customer != null)
            {
                return new CustomerDTO
                {
                    CustomerType = customer.CustomerType.Name,
                    CustomerId = customer.Id,
                    UserName = customer.UserName
                };
            }

            return null;
        }
    }
}