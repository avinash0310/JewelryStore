using JewelryStore.Common;
using System.Threading.Tasks;

namespace JewelryStore.BL
{
    public interface IJewelryStoreBusiness
    {
        Task<JewelryCalculationDTO> Calculate(JewelryCalculationModel calculationModel);
    }
}