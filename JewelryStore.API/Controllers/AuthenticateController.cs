using JewelryStore.API.Authentication;
using JewelryStore.BL;
using JewelryStore.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace JewelryStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly ICustomerBusiness customerBusiness;
        private readonly IConfiguration configuration;
        public AuthenticateController(ICustomerBusiness customerBusiness, IConfiguration configuration)
        {
            this.customerBusiness = customerBusiness;
            this.configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            try
            {
                CustomerDTO customer = await this.customerBusiness.GetCustomerDetails(model).ConfigureAwait(false);
                if (customer != null)
                {
                    var token = JwtToken.GenerateJwtToken(customer, configuration[Constants.Secret]);
                    return this.Ok(new
                    {
                        Token = token,
                        Customer = customer
                    });
                }

                return this.Unauthorized();
            }
            catch
            {
                return this.StatusCode(500);
            }
        }
    }
}