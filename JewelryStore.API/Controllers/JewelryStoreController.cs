using JewelryStore.BL;
using JewelryStore.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace JewelryStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryStoreController : ControllerBase
    {
        private readonly IJewelryStoreBusiness jewelryStoreBusiness;
        public JewelryStoreController(IJewelryStoreBusiness jewelryStoreBusiness)
        {
            this.jewelryStoreBusiness = jewelryStoreBusiness;
        }

        [HttpPost]
        /// [AuthorizeAttribute]
        [Route("Calculate")]
        public async Task<IActionResult> CalculateAsync([FromBody] JewelryCalculationModel calculationModel)
        {
            try
            {
                if (calculationModel == null)
                {
                    this.BadRequest();
                }

                return this.Ok(await this.jewelryStoreBusiness.Calculate(calculationModel).ConfigureAwait(false));
            }
            catch
            {
                return this.StatusCode(500);
            }
        }
    }
}