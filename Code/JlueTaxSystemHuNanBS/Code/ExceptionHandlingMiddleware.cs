using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JlueTaxSystemHuNanBS.Code
{
    /// <summary>
    /// 自定义异常处理中间件
    /// </summary>
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                var statusCode = context.Response.StatusCode;
                await HandleExceptionAsync(context, ex.ToString());
            }
        }
        private Task HandleExceptionAsync(HttpContext context, string msg)
        {
            //HandleExceptionHelper hannd = new HandleExceptionHelper();
            //hannd.log.Error(msg);//记录到日志文件
            return context.Response.WriteAsync(msg);
        }
    }
}
