using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JlueTaxSystemHuNanBS.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using JlueTaxSystemHuNanBS.Code;

namespace JlueTaxSystemHuNanBS.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment he;

        private YsbqcSetting set { get; }

        GDTXUserYSBQC qc;

        public HomeController(IHostingEnvironment _he, YsbqcSetting _set)
        {
            he = _he;
            set = _set;
        }

        [Route("sword")]
        public IActionResult sword(string ctrl, string functionUrl)
        {
            string viewName = "";
            ViewBag.functionUrl = functionUrl;
            string action = ctrl.Split('?')[0];
            Nsrxx xx = set.getNsrxx();
            GDTXDate gd;
            Model m;
            switch (action)
            {
                case "SB025YhssbCtrl_initView":
                    gd = set.getGDTXDate(set.BDDM.Yhs);
                    m = new Model { Nsrxx = xx, GDTXDate = gd };
                    viewName = ctrl.Split('?')[0];
                    return View(viewName, m);
                case "SB104xqykjzzcwbsCtrl_toSbfb":
                case "SBGyCtrl_toCwbbSbfb":
                    viewName = set.functionNotOpen;
                    break;
                case "SB151zlbsslCtrl_initView":
                    m = new Model { Nsrxx = xx };
                    viewName = ctrl.Split('?')[0];
                    return View(viewName, m);
                default:
                    viewName = ctrl.Split('?')[0];
                    break;
            }
            return View(viewName);
        }

        [Route("ajax.sword")]
        public IActionResult ajax(string ctrl, string postData)
        {
            string dir = "ajax.sword";
            string path = "";
            string str = "";
            if (postData != null)
            {
                postData pd = JsonConvert.DeserializeObject<postData>(postData);
                string action = pd.ctrl.Split('?')[0];
                JObject re_json;
                GDTXDate gd;
                Nsrxx xx;
                switch (action)
                {
                    case "SB025YhssbCtrl_saveYhsSbxx":
                        qc = set.getUserYSBQC(set.BDDM.Yhs);
                        set.saveUserYSBQCReportData(pd.data, qc.Id.ToString(), qc.BDDM);
                        GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.SBZT.YSB);
                        path = he.WebRootPath + "/" + dir + "/" + action + ".json";
                        str = System.IO.File.ReadAllText(path);
                        break;
                    case "SB151zlbsslCtrl_queryKjzdzzDmByDjxh":
                        path = he.WebRootPath + "/" + dir + "/" + action + ".json";
                        str = System.IO.File.ReadAllText(path);
                        re_json = JsonConvert.DeserializeObject<JObject>(str);
                        gd = set.getGDTXDate(set.BDDM.XqykjzzCwbb);
                        re_json["data"].Where(a => a["name"].ToString() == "ssqq").FirstOrDefault()["value"] = gd.skssqq;
                        re_json["data"].Where(a => a["name"].ToString() == "ssqz").FirstOrDefault()["value"] = gd.skssqz;

                        str = JsonConvert.SerializeObject(re_json);
                        break;
                    case "GY002CommonCtrl_queryNsrxxByNsrsbh":
                        path = he.WebRootPath + "/" + dir + "/" + action + ".json";
                        str = System.IO.File.ReadAllText(path);
                        re_json = JsonConvert.DeserializeObject<JObject>(str);
                        gd = set.getGDTXDate(set.BDDM.XqykjzzCwbb);
                        xx = set.getNsrxx();
                        JToken tds = re_json.SelectToken("data[1].trs[0].tds");
                        tds["nsrmc"]["value"] = xx.NSRMC;
                        tds["fddbrsfzjhm"]["value"] = xx.IDCardNum;
                        tds["bsrxm"]["value"] = xx.Name;

                        str = JsonConvert.SerializeObject(re_json);
                        break;
                    case "SB025YhssbCtrl_reloadNsrzfhy":
                        path = he.WebRootPath + "/" + dir + "/" + action + ".json";
                        str = System.IO.File.ReadAllText(path);
                        re_json = JsonConvert.DeserializeObject<JObject>(str);
                        xx = set.getNsrxx();
                        re_json.SelectToken("data").Where(a => a["name"].ToString() == "zhyMc").FirstOrDefault()["value"] = xx.GBHY;
                        str = JsonConvert.SerializeObject(re_json);
                        break;
                    case "SB025YhssbCtrl_getDefaultJmxx":
                        string zspmDm = pd.data.Where(a => a["name"].ToString() == "zspmDm").FirstOrDefault()["value"].ToString();
                        path = he.WebRootPath + "/" + dir + "/" + action + "." + zspmDm + ".json";
                        str = System.IO.File.ReadAllText(path);
                        break;
                    case "SB104xqykjzzcwbsCtrl_saveZcfzb":
                        qc = set.getUserYSBQC(set.BDDM.XqykjzzCwbb);
                        set.saveUserYSBQCReportData(pd.data, qc.Id.ToString(), qc.BDDM);
                        path = he.WebRootPath + "/" + dir + "/" + action + ".json";
                        str = System.IO.File.ReadAllText(path);
                        break;
                    case "SBGyCtrl_jsskssqz":
                        path = he.WebRootPath + "/" + dir + "/" + action + ".json";
                        str = System.IO.File.ReadAllText(path);
                        re_json = JsonConvert.DeserializeObject<JObject>(str);
                        gd = set.getGDTXDate(set.BDDM.Yhs);
                        re_json["data"].Where(a => a["name"].ToString() == "skssqq").FirstOrDefault()["value"] = gd.skssqq;
                        re_json["data"].Where(a => a["name"].ToString() == "skssqz").FirstOrDefault()["value"] = gd.skssqz;

                        str = JsonConvert.SerializeObject(re_json);
                        break;
                    default:
                        path = he.WebRootPath + "/" + dir + "/" + action + ".json";
                        str = System.IO.File.ReadAllText(path);
                        break;
                }
            }
            else
            {
                path = he.WebRootPath + "/" + dir + "/" + ctrl + ".json";
                str = System.IO.File.ReadAllText(path);
            }
            return Content(str, "application/json;charset=utf-8");
        }

        [Route("form.sword")]
        public IActionResult form(string postData)
        {
            string dir = "form.sword";
            string path = "";
            postData pd = JsonConvert.DeserializeObject<postData>(postData);
            string str = "";
            JObject re_json;
            Nsrxx xx = set.getNsrxx();
            string action = pd.ctrl.Split('?')[0];
            GDTXDate gd;
            Model model;
            switch (action)
            {
                case "SB151zlbsslCtrl_initBd":
                    gd = set.getGDTXDate(set.BDDM.XqykjzzCwbb);
                    model = new Model { Nsrxx = xx, GDTXDate = gd };
                    return View(action, model);
                case "SB025YhssbCtrl_cwgzInitView":
                    path = he.WebRootPath + "/" + dir + "/" + action + ".SwordPageData.json";
                    str = System.IO.File.ReadAllText(path);
                    re_json = JsonConvert.DeserializeObject<JObject>(str);
                    gd = set.getGDTXDate(set.BDDM.Yhs);
                    var q = from d in re_json["data"] where d["name"] != null && d["name"].ToString() == "nsrxxForm" select d;
                    JToken nsrxxForm = q.FirstOrDefault();
                    JToken nsrxxForm_data = nsrxxForm["data"];
                    nsrxxForm_data["skssqq"]["value"] = gd.skssqq;
                    nsrxxForm_data["skssqz"]["value"] = gd.skssqz;
                    nsrxxForm_data["sbrq1"]["value"] = gd.tbrq;
                    nsrxxForm_data["nsrsbh"]["value"] = xx.NSRSBH;
                    nsrxxForm_data["nsrmc"]["value"] = xx.NSRMC;
                    nsrxxForm_data["sfzjhm"]["value"] = xx.IDCardNum;

                    q = from d in re_json["data"] where d["name"] != null && d["name"].ToString() == "slxxForm" select d;
                    JToken slxxForm = q.FirstOrDefault();
                    JToken slxxForm_data = slxxForm["data"];
                    slxxForm_data["slrq"]["value"] = gd.tbrq;
                    slxxForm_data["slswjg"]["value"] = xx.ZGDSSWJFJMC;
                    slxxForm_data["bsr"]["value"] = xx.Name;

                    qc = set.getUserYSBQC(set.BDDM.Yhs);
                    JToken data_json = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
                    JToken yhssbGrid = data_json.Where(a => a["name"] != null && a["name"].ToString() == "yhssbGrid").FirstOrDefault();
                    yhssbGrid["name"] = "yhssbGridGz";

                    q = from d in re_json["data"] where d["name"] != null && d["name"].ToString() == "yhssbGridGz" select d;
                    JToken yhssbGridGz = q.FirstOrDefault();
                    yhssbGridGz.Remove();
                    ((JArray)re_json["data"]).Add(yhssbGrid);
                    model = new Model { data = JsonConvert.SerializeObject(re_json) };
                    return View(action, model);
                case "GYDrCtrl_openDr":
                    return View(set.functionNotOpen);
                default:
                    return View(action);
            }
        }

        [Route("download.sword")]
        public IActionResult download(string postData)
        {
            return View(set.functionNotOpen);
        }

        [Route("QuestionMain")]
        public IActionResult QuestionMain()
        {
            return View();
        }

        [Route("ChuShiHua.ashx")]
        public IActionResult ChuShiHua()
        {
            string method = Request.Query["Method"].ToString();
            string ClassId = Request.Query["ClassId"].ToString();
            string userId = Request.Query["userId"].ToString();
            string SortId = Request.Query["SortId"].ToString();
            string res = "";
            try
            {
                if (method == "Clear")
                {
                    //国地税题目                
                    publicmethod p = new publicmethod();
                    string path = AppConfigurtaionServices.Configuration["appSettings:Practicepath"] + "/APIPractice/Chongzuo.asmx/GetHuNanData?UserId=" + userId + "&ClassId=" + ClassId + "&SortId=" + SortId;
                    string resut = p.HttpGetFunction(path);
                    string billpath = AppConfigurtaionServices.Configuration["appSettings:tikupath"] + "/GTX/GDTXHuNanUserYSBQC/RedoAllQuestionsHuNan";
                    res = p.HttpPost(billpath, string.Format("jsonData={0}", resut));

                }
            }
            catch
            {

            }

            return Content(res, "text/html;charset=utf-8"); ;
        }

    }
}
