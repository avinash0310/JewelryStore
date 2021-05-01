using JewelryStore.Common;
using System.Threading.Tasks;

namespace JewelryStore.BL
{
    public interface ICustomerBusiness
    {
        Task<CustomerDTO> GetCustomerDetails(LoginModel loginModel);
    }
}