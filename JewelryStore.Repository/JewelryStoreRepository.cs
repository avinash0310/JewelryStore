using JewelryStore.Common;
using System;

namespace JewelryStore.DAL
{
    public class JewelryStoreRepository : IJewelryStoreRepository
    {
        public double Calculate(JewelryCalculationModel calculationModel)
        {
            double totalPrice = calculationModel.GoldPrice * calculationModel.GoldWeight;
            if (calculationModel.Discount != Constants.ZeroDiscount)
            {
                double discount = calculationModel.Discount / 100f * totalPrice;
                totalPrice -= discount;
            }

            return Math.Round(totalPrice, 2);
        }
    }
}