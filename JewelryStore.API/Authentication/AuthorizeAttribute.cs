using JewelryStore.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace JewelryStore.API.Authentication
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            Customer customer = (Customer)context.HttpContext.Items[Constants.Customer];
            if (customer == null)
            {
                // not logged in
                context.Result = new JsonResult(new { message = Constants.Unauthorized }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}