using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JlueTaxSystemHuNanBS.Code
{
    public class AuthorizationFilter : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            string Path = context.HttpContext.Request.Path;
            if (Path == "/wsbs/toMainIndex.do")
            {
            }
        }
    }
}
