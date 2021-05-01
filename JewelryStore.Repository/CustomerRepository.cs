using JewelryStore.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace JewelryStore.DAL
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext context;

        public CustomerRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Customer> GetCustomerDetailsAsync(LoginModel loginModel)
        {
            try
            {
                return await this.context.Customers.Include(x => x.CustomerType)
                    .FirstOrDefaultAsync(x => x.UserName == loginModel.Username && x.Password == loginModel.Password).ConfigureAwait(false);
            }
            catch(Exception ex)
            {
                string message = ex.Message;
                return null;
            }
        }

        public async Task<Customer> GetCustomerDetailsAsync(int customerId)
        {
            return await this.context.Customers.Include(x => x.CustomerType).FirstOrDefaultAsync(x => x.Id == customerId).ConfigureAwait(false);
        }
    }
}