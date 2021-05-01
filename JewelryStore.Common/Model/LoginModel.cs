using System.ComponentModel.DataAnnotations;

namespace JewelryStore.Common
{
    public class LoginModel
    {
        [Required]
        [StringLength(Constants.MaximumLength, MinimumLength = Constants.MinimumLength)]
        public string Username { get; set; }

        [Required]
        [StringLength(Constants.MaximumLength, MinimumLength = Constants.MinimumLength)]
        public string Password { get; set; }
    }
}