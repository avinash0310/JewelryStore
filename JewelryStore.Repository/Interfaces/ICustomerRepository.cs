using JewelryStore.Common;
using System.Threading.Tasks;

namespace JewelryStore.DAL
{
    public interface ICustomerRepository
    {
        Task<Customer> GetCustomerDetailsAsync(LoginModel loginModel);
        Task<Customer> GetCustomerDetailsAsync(int customerId);
    }
}