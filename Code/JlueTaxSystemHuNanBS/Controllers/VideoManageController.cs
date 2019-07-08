using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ActionResult = JlueTaxSystemHuNanBS.Code.ActionResult;

namespace JlueTaxSystemHuNanBS.Controllers
{
    public class VideoManageController : Controller
    {
        [Route("VideoManage/GetVideo.ashx")]
        public IActionResult GetVideo(string CourseId)
        {
            string res = "";
            try
            {
                publicmethod p = new publicmethod();
                string path = AppConfigurtaionServices.Configuration["appSettings:Practicepath"] + "/APIPractice/VideoManage.asmx/GetByCourseId?CourseId=" + CourseId;
                res = p.HttpGetFunction(path);
            }
            catch
            {
            }

            return Content(res, "text/html;charset=utf-8"); ;
        }

        [Route("VideoManage/VideoManage.aspx")]
        public IActionResult VideoManage()
        {
            publicmethod p = new publicmethod();
            string path = AppConfigurtaionServices.Configuration["appSettings:Practicepath"] + "/APIPractice/VideoManage.asmx/GetByCourseId?CourseId=" + AppConfigurtaionServices.Configuration["appSettings:CourseId"];
            string resut = p.HttpGetFunction(path);
            ActionResult ar = JsonConvert.DeserializeObject<ActionResult>(resut);
            HttpContext.Session.SetString("VideoManage", ar.Data);

            return View();
        }

    }
}