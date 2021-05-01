using System.ComponentModel.DataAnnotations;

namespace JewelryStore.Common
{
    public class JewelryCalculationModel
    {
        [Required]
        [Range(Constants.MinimumRange, int.MaxValue, ErrorMessage = ModelValidationMessage.CustomerIdValidationMessage)]
        public int CustomerId { get; set; }

        [Required]
        [Range(double.Epsilon, double.MaxValue, ErrorMessage = ModelValidationMessage.GoldPriceValidationMessage)]
        public double GoldPrice { get; set; }

        [Required]
        [Range(double.Epsilon, double.MaxValue, ErrorMessage = ModelValidationMessage.GoldWeightValidationMessage)]
        public double GoldWeight { get; set; }

        [Range(Constants.MinimumDiscountRange, Constants.MaximumDiscountRange, ErrorMessage = ModelValidationMessage.DiscountValidationMessage)]
        public int Discount { get; set; }
    }
}