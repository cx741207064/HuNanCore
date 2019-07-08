using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using JlueTaxSystemHuNanBS.Code;

namespace JlueTaxSystemHuNanBS.Controllers
{
    public class mainController : Controller
    {
        private readonly IHostingEnvironment he;

        private YsbqcSetting set { get; }

        GDTXUserYSBQC qc;

        public mainController(IHostingEnvironment _he, YsbqcSetting _set)
        {
            he = _he;
            set = _set;
        }

        [Route("web-accept/wssb/main/toDsPage.html")]
        public IActionResult toDsPage(string type, string zsxmDm, string yzpzzlDm)
        {
            string path = he.WebRootPath + "/web-accept/wssb/main/toDsPage";
            path += "." + type;
            if (!string.IsNullOrEmpty(zsxmDm))
            {
                path += "." + zsxmDm;
            }
            if (!string.IsNullOrEmpty(yzpzzlDm))
            {
                path += "." + yzpzzlDm;
            }
            path += ".json";
            string str = System.IO.File.ReadAllText(path);
            return Content(str, "application/json;charset=utf-8");
        }

        [Route("web-accept/wssb/main/dspage.html")]
        public IActionResult dspage(string type, string yzpzzlDm)
        {
            switch (type)
            {
                case "cwbbcx":
                    return View("FunctionNotOpen");
                default:
                    break;
            }
            string path = he.WebRootPath + "/web-accept/wssb/main/dspage";
            path += "." + type;
            if (!string.IsNullOrEmpty(yzpzzlDm) && yzpzzlDm != "undefined")
            {
                path += "." + yzpzzlDm;
            }
            path += ".html";
            string str = System.IO.File.ReadAllText(path);
            return Content(str, "text/html;charset=utf-8");
        }

        [Route("web-accept/wssb/main/yqsbjkqtbb.html")]
        public ActionResult<JObject> yqsbjkqtbb(string dm)
        {
            JObject re_json = new JObject();
            string str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/main/yqsbjkqtbb.json");
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            return re_json;
        }

        [Route("web-accept/wssb/main/index_qyxx.html")]
        public IActionResult index_qyxx()
        {
            return View("FunctionNotOpen");
        }

        [Route("web-accept/wssb/main/index_yqsb.html")]
        public IActionResult index_yqsb()
        {
            return View("FunctionNotOpen");
        }

        [Route("web-accept/wssb/main/index_nssb.html")]
        public IActionResult index_nssb()
        {
            List<GDTXUserYSBQC> listQC = set.getUserYSBQC();
            var query = from qc in listQC where qc.BDDM != set.BDDM.XqykjzzCwbb select qc;
            listQC = query.ToList();
            return View(RouteData.Values["action"].ToString(), listQC);
        }

        [Route("web-accept/wssb/main/index_szxx_nssb.html")]
        public IActionResult index_szxx_nssb()
        {
            List<GDTXUserYSBQC> listQC = set.getUserYSBQC();
            var query = from qc in listQC where qc.BDDM != set.BDDM.XqykjzzCwbb select qc;
            listQC = query.ToList();
            return View("index_nssb", listQC);
        }

        [Route("web-accept/wssb/main/index_sbzf.html")]
        public IActionResult index_sbzf()
        {
            List<GDTXUserYSBQC> listQC = set.getYsbUserYSBQC();
            var query = from qc in listQC where qc.BDDM != set.BDDM.XqykjzzCwbb select qc;
            listQC = query.ToList();
            return View(RouteData.Values["action"].ToString(), listQC);
        }

        [Route("web-accept/wssb/main/index_bbcx.html")]
        public IActionResult index_bbcx()
        {
            return View(RouteData.Values["action"].ToString());
        }

        [Route("web-accept/wssb/main/indexBbcxForPage.html")]
        public ActionResult<JObject> indexBbcxForPage(string sbzldms)
        {
            JObject re_json = new JObject();
            JArray wbSbSbxxes = new JArray();
            JObject jo = new JObject();
            JToken reportData;
            string ybtse;
            int count = 0;
            string str="";
            string path = he.WebRootPath + "/web-accept/wssb/main/indexBbcxForPage." + sbzldms + ".json";
            if (!System.IO.File.Exists(path))
            {
                str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/main/indexBbcxForPage.json");
            }
            else
            {
                str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/main/indexBbcxForPage." + sbzldms + ".json");
            }
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            switch (sbzldms)
            {
                case "01":
                    qc = set.getUserYSBQC(set.BDDM.YbnsrZzs);
                    reportData = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
                    if (!reportData.HasValues)
                    {
                        break;
                    }
                    jo["sbuuid"] = "D175734A41B14DD391B85088B1DCFEA9";
                    jo["nsrsbh"] = "91430105MA4L4UB74U";
                    jo["shxydm"] = "91430105MA4L4UB74U";
                    jo["djxh"] = 10114301010000046000;
                    jo["sbzlDm"] = qc.BDDM;
                    jo["skssqq"] = qc.SKSSQQ;
                    jo["skssqz"] = qc.SKSSQZ;
                    jo["bbzt"] = "0";
                    jo["bbztDisplay"] = "申报成功";
                    jo["ztxx"] = "申报成功";
                    jo["sbrq"] = qc.HappenDate;
                    jo["sbzlMc"] = qc.TaskName;
                    var query = from d in reportData
                                from dd in d["data"]
                                where dd["name"].ToString() == "wbsbzzsybnsrzb.ybbys"
                                select dd;
                    ybtse = query.Where(a => a["idx"].ToString() == "33").FirstOrDefault()["value"].ToString();

                    jo["bbbbh"] = "v4";
                    jo["ybtse"] = decimal.Parse(ybtse);
                    jo["ybtseDisplay"] = ybtse;
                    wbSbSbxxes.Add(jo);
                    count++;
                    re_json["pagination"]["totalNum"] = count;
                    break;
                case "ds01":
                    qc = set.getUserYSBQC(set.BDDM.Fjs);
                    reportData = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
                    if (!reportData.HasValues)
                    {
                        break;
                    }
                    jo["sbuuid"] = "D175734A41B14DD391B85088B1DCFEA9";
                    jo["nsrsbh"] = "91430105MA4L4UB74U";
                    jo["shxydm"] = "91430105MA4L4UB74U";
                    jo["djxh"] = 10114301010000046000;
                    jo["sbzlDm"] = qc.BDDM;
                    jo["skssqq"] = qc.SKSSQQ;
                    jo["skssqz"] = qc.SKSSQZ;
                    jo["bbzt"] = "0";
                    jo["bbztDisplay"] = "申报成功";
                    jo["ztxx"] = "申报成功";
                    jo["sbrq"] = qc.HappenDate;
                    jo["sbzlMc"] = qc.TaskName;

                    query = from d in reportData.SelectToken("[0].data") where d["name"].ToString() == "common.bqybtsehj" select d;
                    ybtse = query.FirstOrDefault()["value"].ToString();
                    jo["bbbbh"] = "v2";
                    jo["ybtse"] = decimal.Parse(ybtse);
                    jo["ybtseDisplay"] = ybtse;
                    wbSbSbxxes.Add(jo);
                    count++;
                    re_json["pagination"]["totalNum"] = count;
                    break;
                case "dsyhs":
                    qc = set.getUserYSBQC(set.BDDM.Yhs);
                    reportData = set.getUserYSBQCReportData(qc.Id, qc.BDDM);
                    if (!reportData.HasValues)
                    {
                        break;
                    }
                    jo["sbuuid"] = "D175734A41B14DD391B85088B1DCFEA9";
                    jo["djxh"] = 10114301010000046000;
                    jo["zsxmDm"] = qc.BDDM;
                    jo["skssqq"] = qc.SKSSQQ;
                    jo["skssqz"] = qc.SKSSQZ;
                    jo["lrrDm"] = "000000dzswj";
                    jo["yzpzxh"] = "10014319000020623817";
                    jo["sbrq"] = qc.HappenDate;
                    jo["sbzlMc"] = "《印花税纳税申报（报告）表》";
                    jo["yzpzzlDm"] = "BDA0610794";
                    jo["dsbz"] = "Y";
                    query = from d in reportData
                            where d["trs"] != null
                            select d["trs"];
                    foreach (JObject q in query.FirstOrDefault())
                    {
                        JObject joYhs = new JObject(jo);
                        joYhs["ybtse"] = q.SelectToken("tds.bqybtse.value");
                        joYhs["ybtseDisplay"] = q.SelectToken("tds.bqybtse.value");
                        joYhs["zspmDm"] = q.SelectToken("tds.zspmDm.value");
                        wbSbSbxxes.Add(joYhs);
                        count++;
                    }
                    re_json["pagination"]["totalNum"] = count;
                    break;
            }
            re_json["wbSbSbxxes"] = wbSbSbxxes;

            return re_json;
        }

        [Route("web-accept/wssb/main/index_zf.html")]
        public ActionResult<JObject> index_zf(string sbzlDm)
        {
            qc = set.getUserYSBQC(sbzlDm);
            GTXMethod.DeleteUserReportData(qc.Id.ToString(), sbzlDm);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.SBZT.WTX);
            JObject re_json = new JObject();
            string str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/main/index_zf.json");
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            return re_json;
        }

        [Route("web-accept/wssb/main/checkhasfjs.html")]
        public ActionResult<JObject> checkhasfjs()
        {
            JObject re_json = new JObject();
            string str = System.IO.File.ReadAllText(he.WebRootPath + "/web-accept/wssb/main/checkhasfjs.json");
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            return re_json;
        }

    }
}