using JewelryStore.Common;

namespace JewelryStore.DAL
{
    public interface IJewelryStoreRepository
    {
        double Calculate(JewelryCalculationModel calculationModel);
    }
}