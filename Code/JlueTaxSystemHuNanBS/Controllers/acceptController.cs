using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using JlueTaxSystemHuNanBS.Code;
using JlueTaxSystemHuNanBS.Models;

namespace JlueTaxSystemHuNanBS.Controllers
{
    public class acceptController : Controller
    {
        private readonly IHostingEnvironment he;
        private readonly IConfiguration config;
        private readonly YsbqcSetting set;

        GDTXUserYSBQC qc;

        public acceptController(IHostingEnvironment _he, IConfiguration _config, YsbqcSetting _set)
        {
            he = _he;
            config = _config;
            set = _set;
        }

        [Route("web-accept/wssb/common/jumptowebsb.html")]
        public void jumptowebsb()
        {
            Response.StatusCode = (int)HttpStatusCode.Redirect;
            Response.Headers["location"] = "dzsb.html";
            //string str = System.IO.File.ReadAllText(he.WebRootPath + "dzsb.html");
            //return Content(str, "text/html;charset=utf-8");
        }

        [Route("web-accept/wssb/static/js.html")]
        public IActionResult js(string p, string dm)
        {
            string path = he.WebRootPath + "/web-accept/wssb/static/js";
            path += "." + p;
            if (!string.IsNullOrEmpty(dm))
            {
                path += "." + dm;
            }
            path += ".html";
            string str = System.IO.File.ReadAllText(path);
            return Content(str, "application/javascript;charset=utf-8");
        }

        [Route("web-accept/wssb/{dm}e/saveSbb.html")]
        public ActionResult<JObject> saveSbb(string dm, string tablejsons)
        {
            JObject re_json = new JObject();
            GDTXUserYSBQC qc = set.getUserYSBQC(dm);
            set.saveUserYSBQCReportData(tablejsons, qc.Id.ToString(), dm);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.SBZT.DSB);
            string str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/" + dm + "e/saveSbb.json");
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            return re_json;
        }

        [Route("web-accept/wssb/{dm}/reset.html")]
        public ActionResult<JObject> reset(string dm)
        {
            JObject re_json = new JObject();
            string str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/" + dm + "/reset.json");
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            return re_json;
        }

        [Route("web-accept/wssb/{dm}e/sb.html")]
        public ActionResult<JObject> sb(string dm)
        {
            GDTXUserYSBQC qc = set.getUserYSBQC(dm);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.SBZT.YSB);
            JObject re_json = new JObject();
            string str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/" + dm + "e/sb.json");
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            return re_json;
        }

        [Route("web-accept/wssb/20101v2/view.html")]
        public IActionResult view_20101()
        {
            qc = set.getUserYSBQC(set.BDDM.Fjs);
            JToken reportData = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
            FjsModel model = new FjsModel { SBZT = set.SBZT.WTX };
            List<FjsData> listFjsData = new List<FjsData>();
            if (reportData.HasValues)
            {
                model.SBZT = set.SBZT.DSB;
                for (int i = 0; i < 3; i++)
                {
                    IEnumerable<JToken> datas = reportData.SelectToken("[0].data").Where(a => a["idx"] != null && int.Parse(a["idx"].ToString()) == i);
                    JObject jo = new JObject();
                    jo.Add("index", i.ToString());
                    foreach (JObject item in datas)
                    {
                        jo.Add(item["name"].ToString().Split('.')[1], item["value"]);
                    }
                    FjsData fjsData = JsonConvert.DeserializeObject<FjsData>(JsonConvert.SerializeObject(jo));
                    listFjsData.Add(fjsData);
                }
            }
            else
            {
                listFjsData = new List<FjsData> { new FjsData(0), new FjsData(1), new FjsData(2) };
            }
            model.FjsData = listFjsData;
            return View("view_20101", model);
        }

        [Route("web-accept/wssb/20101e/edit.html")]
        public IActionResult edit_20101()
        {
            qc = set.getUserYSBQC(set.BDDM.Fjs);
            JToken reportData = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
            FjsModel model = new FjsModel { SBZT = set.SBZT.WTX };
            List<FjsData> listFjsData = new List<FjsData>();
            if (reportData.HasValues)
            {
                model.SBZT = set.SBZT.DSB;
                for (int i = 0; i < 3; i++)
                {
                    IEnumerable<JToken> datas = reportData.SelectToken("[0].data").Where(a => a["idx"] != null && int.Parse(a["idx"].ToString()) == i);
                    JObject jo = new JObject();
                    jo.Add("index", i.ToString());
                    foreach (JObject item in datas)
                    {
                        jo.Add(item["name"].ToString().Split('.')[1], item["value"]);
                    }
                    FjsData fjsData = JsonConvert.DeserializeObject<FjsData>(JsonConvert.SerializeObject(jo));
                    listFjsData.Add(fjsData);
                }
            }
            else
            {
                listFjsData = new List<FjsData> { new FjsData(0), new FjsData(1), new FjsData(2) };
            }
            model.FjsData = listFjsData;
            return View(model);
        }

        [Route("web-accept/wssb/10104v4/view.html")]
        public IActionResult view_10104()
        {
            qc = set.getUserYSBQC(set.BDDM.YbnsrZzs);
            JToken reportData = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
            YbnsrzzsModel model = new YbnsrzzsModel();
            model.reportData = reportData;
            model.GDTXDate = set.getGDTXDate(set.BDDM.YbnsrZzs);
            model.Nsrxx = set.getNsrxx();
            return View(model);
        }

        [Route("web-accept/wssb/10104e/edit.html")]
        public IActionResult edit_10104()
        {
            qc = set.getUserYSBQC(set.BDDM.YbnsrZzs);
            JToken reportData = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
            YbnsrzzsModel model = new YbnsrzzsModel();
            model.reportData = reportData;
            model.GDTXDate = set.getGDTXDate(set.BDDM.YbnsrZzs);
            model.Nsrxx = set.getNsrxx();
            return View(model);
        }

        [Route("web-accept/wssb/10104e/editSm.html")]
        public IActionResult editSm()
        {
            return View(set.functionNotOpen);
        }

        [Route("web-accept/wssb/common/dzsb.html")]
        public IActionResult dzsb()
        {
            Model m = new Model();
            m.Nsrxx = set.getNsrxx();
            return View(m);
        }

    }
}