var gs_gjj = [
 "{zcfzbxxForm_h15l2}={zcfzbxxForm_h1l2}+{zcfzbxxForm_h2l2}+{zcfzbxxForm_h3l2}+{zcfzbxxForm_h4l2}+" +
     "{zcfzbxxForm_h5l2}+{zcfzbxxForm_h6l2}+{zcfzbxxForm_h7l2}+{zcfzbxxForm_h8l2}+" +
     "{zcfzbxxForm_h9l2}+{zcfzbxxForm_h14l2}",
 "{zcfzbxxForm_h21l2}={zcfzbxxForm_h19l2}-{zcfzbxxForm_h20l2}",
 "{zcfzbxxForm_h30l2}={zcfzbxxForm_h17l2}+{zcfzbxxForm_h18l2}+{zcfzbxxForm_h21l2}+" +
     "{zcfzbxxForm_h22l2}+{zcfzbxxForm_h23l2}+{zcfzbxxForm_h24l2}+{zcfzbxxForm_h25l2}+" +
     "{zcfzbxxForm_h26l2}+{zcfzbxxForm_h27l2}+{zcfzbxxForm_h28l2}+{zcfzbxxForm_h29l2}",
 "{zcfzbxxForm_h31l2}={zcfzbxxForm_h15l2}+{zcfzbxxForm_h30l2}",
 
 "{zcfzbxxForm_h15l3}={zcfzbxxForm_h1l3}+{zcfzbxxForm_h2l3}+{zcfzbxxForm_h3l3}+{zcfzbxxForm_h4l3}+" +
     "{zcfzbxxForm_h5l3}+{zcfzbxxForm_h6l3}+{zcfzbxxForm_h7l3}+{zcfzbxxForm_h8l3}+" +
     "{zcfzbxxForm_h9l3}+{zcfzbxxForm_h14l3}",
 "{zcfzbxxForm_h21l3}={zcfzbxxForm_h19l3}-{zcfzbxxForm_h20l3}",
 "{zcfzbxxForm_h30l3}={zcfzbxxForm_h17l3}+{zcfzbxxForm_h18l3}+{zcfzbxxForm_h21l3}+" +
     "{zcfzbxxForm_h22l3}+{zcfzbxxForm_h23l3}+{zcfzbxxForm_h24l3}+{zcfzbxxForm_h25l3}+" +
     "{zcfzbxxForm_h26l3}+{zcfzbxxForm_h27l3}+{zcfzbxxForm_h28l3}+{zcfzbxxForm_h29l3}",
 "{zcfzbxxForm_h31l3}={zcfzbxxForm_h15l3}+{zcfzbxxForm_h30l3}",
 
 "{zcfzbxxForm_h11l5}={zcfzbxxForm_h1l5}+{zcfzbxxForm_h2l5}+{zcfzbxxForm_h3l5}+{zcfzbxxForm_h4l5}+" +
     "{zcfzbxxForm_h5l5}+{zcfzbxxForm_h6l5}+{zcfzbxxForm_h7l5}+{zcfzbxxForm_h8l5}+" +
     "{zcfzbxxForm_h9l5}+{zcfzbxxForm_h10l5}",
 "{zcfzbxxForm_h17l5}={zcfzbxxForm_h13l5}+{zcfzbxxForm_h14l5}+{zcfzbxxForm_h15l5}+{zcfzbxxForm_h16l5}",
 "{zcfzbxxForm_h18l5}={zcfzbxxForm_h11l5}+{zcfzbxxForm_h17l5}",
 "{zcfzbxxForm_h30l5}={zcfzbxxForm_h26l5}+{zcfzbxxForm_h27l5}+{zcfzbxxForm_h28l5}+{zcfzbxxForm_h29l5}",
 "{zcfzbxxForm_h31l5}={zcfzbxxForm_h18l5}+{zcfzbxxForm_h30l5}",
 
 "{zcfzbxxForm_h11l6}={zcfzbxxForm_h1l6}+{zcfzbxxForm_h2l6}+{zcfzbxxForm_h3l6}+{zcfzbxxForm_h4l6}+" +
     "{zcfzbxxForm_h5l6}+{zcfzbxxForm_h6l6}+{zcfzbxxForm_h7l6}+{zcfzbxxForm_h8l6}+" +
     "{zcfzbxxForm_h9l6}+{zcfzbxxForm_h10l6}",
 "{zcfzbxxForm_h17l6}={zcfzbxxForm_h13l6}+{zcfzbxxForm_h14l6}+{zcfzbxxForm_h15l6}+{zcfzbxxForm_h16l6}",
 "{zcfzbxxForm_h18l6}={zcfzbxxForm_h11l6}+{zcfzbxxForm_h17l6}",
 "{zcfzbxxForm_h30l6}={zcfzbxxForm_h26l6}+{zcfzbxxForm_h27l6}+{zcfzbxxForm_h28l6}+{zcfzbxxForm_h29l6}",
 "{zcfzbxxForm_h31l6}={zcfzbxxForm_h18l6}+{zcfzbxxForm_h30l6}"
 ];
gs_caculate = thgs(gs_gjj);//页面计算
//附表回写
var hxfblrbxx=null;// 子页面返回的利润表信息
var nsrxxForm2hx=null;
var hxfbxjllbxx=null;// 子页面返回的现金流量表信息
var nsrxxForm3hx=null;
var hxfblrbxxNbb=null;// 子页面返回的利润表年报表信息
var nsrxxForm4hx=null;
var hxfbxjllbxxNbb=null;// 子页面返回的现金流量表信息 年报表
var nsrxxForm5hx=null;
var hxfbChdpl=null;// 子页面返回的 存货的披露
var hxfbDqtzdpl=null;// 子页面返回的 短期投资的披露
var hxfbGdzcdpl=null;// 子页面返回的 固定资产的披露
var hxfbLrfpb=null;// 子页面返回的 利润分配表
var hxfbYfzgxcmxb=null;// 子页面返回的 应付职工薪酬明细表
var hxfbYjsfmxb=null;//// 子页面返回的 应交税费明细表


//重复采集
var zcfzbxx=null;
var cjhxfblrbxx=null;// 子页面返回的利润表信息
var nsrxxForm2cj=null;
var cjhxfbxjllbxx=null;// 子页面返回的现金流量表信息
var nsrxxForm3cj=null;
var cjhxfblrbxxNbb=null;// 子页面返回的利润表年报表信息
var nsrxxForm4cj=null;
var cjhxfbxjllbxxNbb=null;// 子页面返回的现金流量表信息 年报表
var nsrxxForm5cj=null;
var cjhxfbChdpl=null;// 子页面返回的 存货的披露
var cjhxfbDqtzdpl=null;// 子页面返回的 短期投资的披露
var cjhxfbGdzcdpl=null;// 子页面返回的 固定资产的披露
var cjhxfbLrfpb=null;// 子页面返回的 利润分配表
var cjhxfbYfzgxcmxb=null;// 子页面返回的 应付职工薪酬明细表
var cjhxfbYjsfmxb=null;//// 子页面返回的 应交税费明细表

var cfdz;//存放地址
var zlsl;//资料数量
var zllx;//资料类型
var zlbsxlDm; //资料小类代码
var zlbsdlDm;//资料大类代码
var zlbsuuid;
var sfcfcj;//是否重复采集
var sncjbz = "N";//上年采集标识

var sfdycbs;// 判断是否第一次报送财务报表
var bszldm;// 报送资料代码
var cjbz;// 采集标记
var sfkybc=false;
var djxh;

var nsrsbh;
var ssqq;// 所属期起
var ssqz;// 所属期止
var bbssq;//报表所属期
var lrbxxList=null;// 成功采集时上期返回的利润表信息
var xjllbxxList=null;// 成功采集时上期返回的现金流量表信息、
var zcfzbxxList=null;
var snlrfpbList=null; //上年末期利润分配表

var sb101_boolean_fb01 = false;
var sb101_boolean_fb02 = false;
var sb101_boolean_fb03 = false;
var sb101_boolean_fb04 = false;
var sb101_boolean_fb05 = false;
var sb101_boolean_fb06 = false;
var sb101_boolean_fb07 = false;
var sb101_boolean_fb08 = false;
var sb101_boolean_fb09 = false;
var sb101_boolean_fb10 = false;
var sqssqq;
var sqssqz;

var bcAndGzUUid;// 受理信息的uuid,用于保存和更新采集表和明细表时使用
var qrcjBz="N";// 上期未成功采集
var sfcfcj;
var nsrxxMapInit;
var Ctrl="SB104xqykjzzcwbsCtrl";
var sbdr;//申报导入标记
var sqcfdz;//上期数据存放地址
var bsfsDm;//决定相关附表能不能进行年报操作
var month2;
var sqzcfzbxxForm;//上期数据
var sqlrblist; //上期利润表
var xjllblist;//上期现金流量表
var zcfzbxxlist;
var fjyscwbbuuid = null;
var fjfzuuid = null;
var sjgsdq = null;

//附件相关
var sfbhfj = null;
var nsrsbh = null;
var zgswskfjDm = null;
var ywzj = null;
var cxbj = null;
var beSbdr = false;//申报导入
/**
 * 初始化处理
 * 
 * @param {Object}
 *            resData
 */
function initV(resData){
	var nsrxxMap = pc.getResData("nsrxxMap", resData);
	cxbj = resData.getAttr("cxbj");
	if(cxbj=='N'){
		$w('zzsybnsrsb').setDisabled('save');
		$w('zzsybnsrsb').setDisabled('import');
		$w('zzsybnsrsb').setDisabled('reset');
		$w('zzsybnsrsb').setDisabled('downloadExcelTemplet');
		$w('zzsybnsrsb').setEnabled('print');
		$w('zzsybnsrsb').setDisabled('export');
		$w('zzsybnsrsb').setDisabled('back');    	
		$w("zcfzbxxForm").disable();   //此段需求看自己用附表FROM表单名置灰。
		$w("nsrxxForm").disable();   //此段需求看自己用附表FROM表单名置灰。
	}
	sqssqq=resData.getAttr("sqssqq");
	sqssqz=resData.getAttr("sqssqz");
	bbssq=resData.getAttr("bbssq");
	sfdycbs=resData.getAttr("reCode");
	bszldm=resData.getAttr("bszldm");
	djxh=resData.getAttr("djxh");
	cfcjbz=resData.getAttr("cfcjbz");
	var skssqq = nsrxxMap.data.skssqq.value;
	var skssqz = nsrxxMap.data.skssqz.value;
	var bbssq = nsrxxMap.data.bbssq.value;
	bcAndGzUUid=resData.getAttr("bcAndGzUUid");
	sfcfcj=resData.getAttr("sfcfcj");
	cfdz=resData.getAttr("cfdz");
	sqcfdz=resData.getAttr("sqcfdz");
	zlsl=resData.getAttr("zlsl");
	zllx=resData.getAttr("zllx");
	zlbsxlDm=resData.getAttr("zlbsxlDm");
	zlbsdlDm=resData.getAttr("zlbsdlDm");
	zlbsuuid=resData.getAttr("zlbsuuid");
	bsfsDm=resData.getAttr("bsfsDm");

	nsrxxMapInit= pc.getResData("nsrxxMap", resData);
	ssqq=nsrxxMapInit.data.skssqq.value;
	ssqz=nsrxxMapInit.data.skssqz.value;
	nsrsbh=nsrxxMapInit.data.nsrsbh.value
	bbssq = nsrxxMapInit.data.bbssq.value
	$w("nsrxxForm").setValue("nsrsbh",nsrsbh);
	$w("nsrxxForm").setValue("bbssq",bbssq);
	$w("nsrxxForm").setValue("nsrmc",nsrxxMapInit.data.nsrmc.value);
	//初始化附件相关信息

	sfbhfj = resData.getAttr("sfbhfj");
	if(sfbhfj=="Y"){
		nsrsbh = nsrxxMapInit.data.nsrsbh.value;
		zgswskfjDm = nsrxxMapInit.data.zgswskfjDm.value;
		ywzj = resData.getAttr("ywzj");
		ATTACH_FlZL_JSOBJ.setNsrsbh(nsrsbh);
		ATTACH_FlZL_JSOBJ.setZgswjDm(zgswskfjDm);
		ATTACH_FlZL_JSOBJ.setYwzj(ywzj);
	}else{
		$("fjxxGrid_id").setStyle("display", "none");
	}

	var year1 =  ssqq.substr(0,4);
	var year2 =  ssqz.substr(0,4); 
	var month1 = ssqq.substr(5,2);
	month2 = ssqq.substr(5,2);

//	(function(){$w("zcfzbxxForm").getFieldEl('h1l2').focus();}).delay(1);

//	查询上年数据存放地址
	var sntqcfdz = resData.getAttr("sntqcfdz");
	var newSubmit = new SwordSubmit();
	newSubmit.pushData('skssqq', skssqq);
	newSubmit.pushData('skssqz', skssqz);
	newSubmit.pushData('cfdz', cfdz);
	newSubmit.pushData('sqcfdz', sqcfdz);
	newSubmit.pushData('sntqcfdz', sntqcfdz);
	newSubmit.pushData('djxh', djxh);
	newSubmit.pushData('bsfsDm', bsfsDm);
	newSubmit.setCtrl("SB151zlbsslCtrl_queryBssq");
	newSubmit.setFunction("onSuccess", "queryBssqSuccess");
	newSubmit.submit();
	queryXmls();
	if(sfcfcj=="Y"){
		initAfter(resData);
		//启用导出按钮
		$w('zzsybnsrsb').setEnabled('export');
	}
}

function queryBssqSuccess(req, resData) {
	bsxxlist = pc.getResData("bsxxlist", resData);// 不同的报送属期
}
/**
 * 初始化后事件
 * 
 * @return
 */
function initAfter(resData){
//	重复采集情况
	var newSubmit=new SwordSubmit();
	newSubmit.pushData("cfdz",cfdz);
	newSubmit.setCtrl(Ctrl+"_queryXmlByzlbsuuid");
	newSubmit.setFunction("onSuccess","cfcjSuccess");
	newSubmit.submit();
}
//1.资产负债表
var sqa31;// 资产负债表反解析的上期数据负债和所有者权益(或股东权益)总计 期末数据
var sqc31;// 上期资产总计期末数据
// 2.利润表
var bnsqa32;// 上期本年累计数
// 3.现金流量表
var bnsqa7,bnsqa13,bnsqa19,bnsqa20,bnsqa22;// 上期本年累计数
var zcfcbCjcgbj='N';// 资产负债表成功采集标记 默认为否
var lrbCjcgbj='N';// 利润表成功采集标记 默认为否
var xjllbCjcgbj='N';// 现金流量表成功采集标记 默认为否

var sqlrbxx_form = null;// 存储上期利润表月报表信息
var sqlrbnbxx_form = null;// 存储上期利润表年报表信息
var sqxjllbnbxx_form = null;// 存储上期现金流量表年报表信息
var sqxjllbxx_from = null;// 存储上期现金流量表月报信息
function cfcjSuccess(req,resData){
	var nsrxxForm1=pc.getResData("gznsrxxForm1", resData);
	//重复采集时,需要给主表缓存的附表数据赋默认值
	setCfcjData(resData);
	
	if(pc.getResData("gzlrbxxForm", resData)){
		hxfblrbxx=pc.getResData("gzlrbxxForm", resData);// 子页面返回的利润表信息
		hxfblrbxx=JSON.decode(JSON.encode(hxfblrbxx));
	}
	nsrxxForm2hx=pc.getResData("gznsrxxForm2", resData);
	if(pc.getResData("gzxjllbxxForm", resData)){
		hxfbxjllbxx=pc.getResData("gzxjllbxxForm", resData);// 子页面返回的现金流量表信息
		hxfbxjllbxx=JSON.decode(JSON.encode(hxfbxjllbxx));
	}
	nsrxxForm3hx=pc.getResData("gznsrxxForm3", resData);
	if(pc.getResData("gzlrbxxnbbForm", resData)){
		hxfblrbxxNbb=pc.getResData("gzlrbxxnbbForm", resData);// 子页面返回的利润表年报表信息
		hxfblrbxxNbb=JSON.decode(JSON.encode(hxfblrbxxNbb));
	}
	nsrxxForm4hx=pc.getResData("gznsrxxForm4", resData);
	if(pc.getResData("gzxjllbxxnbbForm", resData)){
		hxfbxjllbxxNbb=pc.getResData("gzxjllbxxnbbForm", resData);// 子页面返回的现金流量表信息 年报表
		hxfbxjllbxxNbb=JSON.decode(JSON.encode(hxfbxjllbxxNbb));
	}
	nsrxxForm5hx=pc.getResData("gznsrxxForm5", resData);

	if(pc.getResData("chdplForm", resData)){
		hxfbChdpl= pc.getResData("chdplForm", resData);// 子页面返回的 存货的披露
		hxfbChdpl=JSON.decode(JSON.encode(hxfbChdpl));
	}
	if(pc.getResData("dqtzdplForm", resData)){
		hxfbDqtzdpl=pc.getResData("dqtzdplForm", resData);// 子页面返回的 短期投资的披露
		hxfbDqtzdpl=JSON.decode(JSON.encode(hxfbDqtzdpl));
	}
	if(pc.getResData("gdzcdplForm", resData)){
		hxfbGdzcdpl= pc.getResData("gdzcdplForm", resData);// 子页面返回的 固定资产的披露
		hxfbGdzcdpl=JSON.decode(JSON.encode(hxfbGdzcdpl));
	}
	if(pc.getResData("lrfpbForm", resData)){
		hxfbLrfpb=pc.getResData("lrfpbForm", resData);// 子页面返回的 利润分配表
		hxfbLrfpb=JSON.decode(JSON.encode(hxfbLrfpb));
	}
	if(pc.getResData("yfzgxcmxbForm", resData)){
		hxfbYfzgxcmxb=pc.getResData("yfzgxcmxbForm", resData);// 子页面返回的 应付职工薪酬明细表
		hxfbYfzgxcmxb=JSON.decode(JSON.encode(hxfbYfzgxcmxb));
	}
	if(pc.getResData("yjsfmxbForm", resData)){
		hxfbYjsfmxb=pc.getResData("yjsfmxbForm", resData);//// 子页面返回的 应交税费明细表
		hxfbYjsfmxb=JSON.decode(JSON.encode(hxfbYjsfmxb));
	}
	if(pc.getResData("gzzcfzbxxForm", resData)){
		zcfzbxx=pc.getResData("gzzcfzbxxForm", resData);
		zcfzbxx=JSON.decode(JSON.encode(zcfzbxx));
	}
	if(pc.getResData("gzlrbxxForm", resData)){
		cjhxfblrbxx=pc.getResData("gzlrbxxForm", resData);// 子页面返回的利润表信息
		cjhxfblrbxx=JSON.decode(JSON.encode(cjhxfblrbxx));
	}
	if(pc.getResData("gznsrxxForm2", resData)){
		nsrxxForm2cj=pc.getResData("gznsrxxForm2", resData);
		nsrxxForm2cj=JSON.decode(JSON.encode(nsrxxForm2cj));
	}
	if(pc.getResData("gzxjllbxxForm", resData)){
		cjhxfbxjllbxx=pc.getResData("gzxjllbxxForm", resData);// 子页面返回的现金流量表信息
		cjhxfbxjllbxx=JSON.decode(JSON.encode(cjhxfbxjllbxx));
	}
	if(pc.getResData("gznsrxxForm3", resData)){
		nsrxxForm3cj=pc.getResData("gznsrxxForm3", resData);
		nsrxxForm3cj=JSON.decode(JSON.encode(nsrxxForm3cj));
	}
	if(pc.getResData("gzlrbxxnbbForm", resData)){
		cjhxfblrbxxNbb=pc.getResData("gzlrbxxnbbForm", resData);// 子页面返回的利润表年报表信息
		cjhxfblrbxxNbb=JSON.decode(JSON.encode(cjhxfblrbxxNbb));
	}
	if(pc.getResData("gznsrxxForm4", resData)){
		nsrxxForm4cj=pc.getResData("gznsrxxForm4", resData);
		nsrxxForm4cj=JSON.decode(JSON.encode(nsrxxForm4cj));
	}
	if(pc.getResData("gzxjllbxxnbbForm", resData)){
		cjhxfbxjllbxxNbb=pc.getResData("gzxjllbxxnbbForm", resData);// 子页面返回的现金流量表信息 年报表
		cjhxfbxjllbxxNbb=JSON.decode(JSON.encode(cjhxfbxjllbxxNbb));
	}
	if(pc.getResData("gznsrxxForm5", resData)){
		nsrxxForm5cj=pc.getResData("gznsrxxForm5", resData);
		nsrxxForm5cj=JSON.decode(JSON.encode(nsrxxForm5cj));
	}
	if(pc.getResData("chdplForm", resData)){
		cjhxfbChdpl = pc.getResData("chdplForm", resData);
		cjhxfbChdpl=JSON.decode(JSON.encode(cjhxfbChdpl));
	}
	if(pc.getResData("dqtzdplForm", resData)){
		cjhxfbDqtzdpl = pc.getResData("dqtzdplForm", resData);
		cjhxfbDqtzdpl=JSON.decode(JSON.encode(cjhxfbDqtzdpl));
	}
	if(pc.getResData("gdzcdplForm", resData)){
		cjhxfbGdzcdpl = pc.getResData("gdzcdplForm", resData);
		cjhxfbGdzcdpl=JSON.decode(JSON.encode(cjhxfbGdzcdpl));
	}
	if(pc.getResData("lrfpbForm", resData)){
		cjhxfbLrfpb = pc.getResData("lrfpbForm", resData);
		cjhxfbLrfpb=JSON.decode(JSON.encode(cjhxfbLrfpb));
	}
	if(pc.getResData("yfzgxcmxbForm", resData)){
		cjhxfbYfzgxcmxb = pc.getResData("yfzgxcmxbForm", resData);
		cjhxfbYfzgxcmxb=JSON.decode(JSON.encode(cjhxfbYfzgxcmxb));
	}
	if(pc.getResData("yjsfmxbForm", resData)){
		cjhxfbYjsfmxb = pc.getResData("yjsfmxbForm", resData);
		cjhxfbYjsfmxb=JSON.decode(JSON.encode(cjhxfbYjsfmxb));
	}
	
	bnsqa7=zcfzbxx.data.h7l2.value;
	bnsqa13=zcfzbxx.data.h13l2.value;
	bnsqa19=zcfzbxx.data.h19l2.value;
	bnsqa20=zcfzbxx.data.h20l2.value;
	bnsqa22=zcfzbxx.data.h22l2.value;
	bnsqa32=zcfzbxx.data.h31l2.value;
	sqa31=zcfzbxx.data.h31l2.value;
	sqc31=zcfzbxx.data.h3l5.value;
	
	
	
	if(sbdr=='sbdr'){
		var nsrsbhd=nsrxxForm1.data.nsrsbh.value;
		var skssqqd=nsrxxForm1.data.skssqq.value;
		var skssqzd=nsrxxForm1.data.skssqz.value;
		//导入报文与统一受理界面信息一致性校验
		if(nsrsbhd!=nsrsbh){
			swordAlert("导入的XML报文和受理页面的纳税人识别号不一致,请核对后再导入！");
			return;
		}else if(skssqqd.substring(0,10)!=ssqq.substring(0,10)||skssqzd.substring(0,10)!=ssqz.substring(0,10)){
			swordAlert("导入的XML报文和受理页面的所属期起止不一致,请核对后再导入！");
			return;	
		}else{
			$w("zcfzbxxForm").initData(zcfzbxx);
			$w("nsrxxForm").initData(nsrxxForm1);
		}
	}else{
		$w("zcfzbxxForm").initData(zcfzbxx);
		$w("nsrxxForm").initData(nsrxxForm1);
	}
	
}
/**
 * 重复采集时查询上次采集XML
 */
var privatexmlbz = null;
function queryXmls() {
	// 如果属期信息list不是空，那么就查询每个属期的凭证化
	if (bsxxlist != null && bsxxlist != undefined && bsxxlist != "") {
		for ( var i = 0; i < bsxxlist.trs.length; i++) {
			if (bsxxlist.trs[i].tds != null && bsxxlist.trs[i].tds != ""
					&& bsxxlist.trs[i].tds != undefined) {
				privatexmlbz = bsxxlist.trs[i].tds.xmlbz.value;
				var newSubmit = new SwordSubmit();

				if (privatexmlbz != "0" && privatexmlbz != "1"
						&& privatexmlbz != "5") {
					var skssqz = bsxxlist.trs[i].tds.skssqz.value;
					//newSubmit.pushData('skssqq', skssqq);
					newSubmit.pushData('skssqz', skssqz);
				}
				newSubmit.pushData('djxh', djxh);
				newSubmit.pushData('bszldm', bszldm);
				newSubmit.pushData("xmlbz", privatexmlbz);
				newSubmit.pushData('cfdz', cfdz);
				newSubmit.pushData('sqcfdz', sqcfdz);
				newSubmit.setCtrl("SB151zlbsslCtrl_checkSfcfbs");
				newSubmit.setFunction("onSuccess", "checkSuccess");
				newSubmit.submit();
			}
		}
	}
}

function checkSuccess(req,resData){
	if (resData.data.length > 1) {
		var cfdz = resData.data[0].trs[0].tds.cfdz.value;
		if (cfdz != null && cfdz != "" && cfdz != undefined) {
			var newSubmit = new SwordSubmit();
			newSubmit.pushData("xmlbz", privatexmlbz);
			newSubmit.pushData('cfdz', cfdz);
			newSubmit.setCtrl(Ctrl+"_queryXmlByzlbsuuid");
			newSubmit.setFunction("onSuccess", "sqzcfzbxxOnSuccess");
			newSubmit.submit();
		}else if(sfcfcj=="N" && ("3"==privatexmlbz || "5"==privatexmlbz)){ //如果资产负债表为空，给提示
			swordAlert("资产负债表上年未采集数据");
		}
	}
}
var sqncsFlag = false;// 采用上期年初数
var zcfzbxxlistBnsq = null; //本年上期资产负债表
var snnmyszkazljgplForm = null;//上年年末应收账按账龄结构批露
function sqzcfzbxxOnSuccess(req,resData){
	 
	switch(privatexmlbz){
	case "1" :
		zcfzbxxlistBnsq = pc.getResData("zcfzbsnnmlist", resData);
		if (sfcfcj == "N") {
			if(ssqq.substr(5, 2) == "01"){
				break;
			}
			loadBnsqZcfzb();
			sqncsFlag = true;
		}
		break;
	case "3" :
		zcfzbxxlist = pc.getResData("zcfzbsnnmlist", resData);
		snnmyszkazljgplForm = pc.getResData("snnmyszkazljgplForm", resData);
		if (sfcfcj == "N" && !sqncsFlag) {
			loadSnmqZcfzb();
		}
		break;
	case "5" :
		zcfzbxxlist = pc.getResData("zcfzbsnnmlist", resData);
		if (sfcfcj == "N" && !sqncsFlag) {
			loadSnmqZcfzb();
		}
		snlrfpbList = pc.getResData("snlrfpbList", resData);
		break;
	}
	if(zcfzbxxlist!=null&&zcfzbxxlist!=undefined){
		if(zcfzbxxlist.trs.length > 0){
			sncjbz = "Y";
		}
	}
	
}
/**
 * 加载本年上期资产负债表
 */
function loadBnsqZcfzb(){
	 
	var zcfzbxxForm = $w("zcfzbxxForm");
	for ( var i = 0; i < zcfzbxxlistBnsq.trs.length; i++) {
		var ewbhxh = zcfzbxxlistBnsq.trs[i].tds.ewbhxh.value;
		var sqncsZc = zcfzbxxlistBnsq.trs[i].tds.ncyeZc.value;
		var sqncsQy = zcfzbxxlistBnsq.trs[i].tds.ncyeQy.value;
		zcfzbxxForm.setValue("h" + ewbhxh + "l3", sqncsZc);
		zcfzbxxForm.setValue("h" + ewbhxh + "l6", sqncsQy);
	}
}
/**
 * 加载上年末期资产负债表
 */
function loadSnmqZcfzb(){
	 
	var zcfzbxxForm = $w("zcfzbxxForm");
	for ( var i = 0; i < zcfzbxxlist.trs.length; i++) {
		var ewbhxh = zcfzbxxlist.trs[i].tds.ewbhxh.value;
		var qmsZc = zcfzbxxlist.trs[i].tds.qmyeZc.value;
		var qmsQy = zcfzbxxlist.trs[i].tds.qmyeQy.value;
		zcfzbxxForm.setValue("h" + ewbhxh + "l3", qmsZc);
		zcfzbxxForm.setValue("h" + ewbhxh + "l6", qmsQy);
	}
}
/**
 * 
 * @param req
 * @param resData
 * @return
 */
function jySuccess(req,resData){
	var box = this.parent[this.name];
	cjbz=pc.getResData("cjbz", resData).value;
	var nsrxxForm = $w("nsrxxForm");
	if(cjbz=='0'){
		var result=pc.getResData("result", resData).value;
		var out="";
		// 如果纳税人不是第一次报送，并且未查询出上期成功采集，则提示，终止流程，必须重新采集上期
		if(parseInt(result)==1){
			out="月报";
		}else if(parseInt(result)==3){
			out="季报";
		}
		// 提示哪几个月未报送
		var bsSsqq=nsrxxForm.getValue("skssqq");
		var nianBs=bsSsqq.substring(0, 4);// 7
		var yueBs = bsSsqq.substring(5, 7);// 7
		var skNian=sqssqz.substring(0, 4);
		var skYue=sqssqz.substring(5, 7);// 3
		var str="";
		// 如果是隔月报 就是比如先报送了2月份 然后再回头报1月份的情况 回头报送的话 不提示监控
		if(parseInt(yueBs,10) < parseInt(skYue,10) && parseInt(nianBs) <= parseInt(skNian)){
			return;
		}
		// 待优化 监控以后可以由前台移植到后台java代码
		if(parseInt(nianBs)==parseInt(skNian)&&(parseInt(yueBs,10)-1)==(parseInt(skYue,10)+1)){
			str=skNian+"年"+(parseInt(skYue,10)+1)+"月";
		}else{
			if(parseInt(yueBs,10)-1!=0&&parseInt(skYue,10)+1!=12){
				str=skNian+"年"+(parseInt(skYue,10)+1)+"月~"+nianBs+"年"+(parseInt(yueBs,10)-1)+"月";
			}else if(parseInt(yueBs,10)-1==0&&parseInt(skYue,10)+1!=12){
				if(parseInt(nianBs)-parseInt(skNian) > 1){
					str=skNian+"年"+(parseInt(skYue,10)+1)+"月~"+(parseInt(nianBs)-1)+"年12月";
				}else{
					str=skNian+"年"+(parseInt(skYue,10)+1)+"月~12月";
				}
				
			}else if(parseInt(skYue,10)+1==12&&parseInt(yueBs,10)-1!=0){
				str=skNian+"年"+(parseInt(skYue,10)+1)+"月~"+nianBs+"年"+(parseInt(yueBs,10)-1)+"月";
			}else{
				str=skNian+"年"+(parseInt(skYue,10)+1)+"月";
			}
		}
		swordConfirm(str+"份未采集或者未采集成功,报送类型:"+out+",是否进行采集?", {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				qrcjBz="Y";
			},
			onCancel : function() {
				$w("bcBtn").disabled();
			}
		});
	}
	if(cjbz=='1'){
		// 如果上期成功采集,将上期采集的数据带到本期页面
		gyxssq();
	}
	if(cjbz=='2'){
		// 报的是年报
		gyxssq();
	}
}

//校验附表是否报送
function saveBeforeCheck(){
	//表单中数据监控
	if($w("zcfzbxxForm").validate()&&$w("nsrxxForm").validate()){
	}else{
		return;
	}
	
	var zcfzbxxForm = $w("zcfzbxxForm");
	var zczjc = zcfzbxxForm.getValue("h31l2");// 资产总计初
	var zczjm = zcfzbxxForm.getValue("h31l3");// 资产总计末
	var fzzjc = zcfzbxxForm.getValue("h31l5");// 负债总计初
	var fzzjm = zcfzbxxForm.getValue("h31l6");// 负债总计末
	if(parseFloat(zczjc) != parseFloat(fzzjc) || parseFloat(zczjm) != parseFloat(fzzjm)){
		swordAlert("资产负债表中'资产总计'金额不等于'负债和所有者权益(或股东权益)总计'金额,不能保存!");
		return;
	}
	
	var meg = "";
	if(hxfblrbxx==null||hxfblrbxx==undefined||hxfblrbxx==""){
		meg += "利润表信息、";
	}
	if(hxfbxjllbxx==null||hxfbxjllbxx==undefined||hxfbxjllbxx==""){
		meg += "现金流量表信息、";
	}
	if(hxfblrbxxNbb==null||hxfblrbxxNbb==undefined||hxfblrbxxNbb==""){
		meg += "利润表年报表信息、";
	}
	if(hxfbxjllbxxNbb==null||hxfbxjllbxxNbb==undefined||hxfbxjllbxxNbb==""){
		meg += "现金流量表年报表信息、";
	}
	//新增表单
	if(hxfbChdpl==null||hxfbChdpl==undefined||hxfbChdpl==""){
		meg += "存货的披露信息、";
	}
	if(hxfbDqtzdpl==null||hxfbDqtzdpl==undefined||hxfbDqtzdpl==""){
		meg += "短期投资的披露信息、";
	}
	if(hxfbGdzcdpl==null||hxfbGdzcdpl==undefined||hxfbGdzcdpl==""){
		meg += "固定资产的披露信息、";
	}
	if(hxfbLrfpb==null||hxfbLrfpb==undefined||hxfbLrfpb==""){
		meg += "利润分配表信息、";
	}
	if(hxfbYfzgxcmxb==null||hxfbYfzgxcmxb==undefined||hxfbYfzgxcmxb==""){
		meg += "应付职工薪酬明细表信息、";
	}
	if(hxfbYjsfmxb==null||hxfbYjsfmxb==undefined||hxfbYjsfmxb==""){
		meg += "应交税费明细表信息、";
	}
	meg = fbsaveCheck(meg);
	if(meg != ""){
		meg = meg.substring(0, meg.length - 1);
		swordConfirm(meg+" 未采集，是否保存？",{
			onOk:function(){
			checkZcfzbNcye();
		},
			onCancel : function() {
			return;
		}
		});
	}
	else{
		checkZcfzbNcye();
	}
}
/**
 * 检查资产负债表年初余额是否与上年末期期末余额相等
 */
function checkZcfzbNcye(){
 
	var zcfzbxxForm = $w("zcfzbxxForm");
	var names = [];
	if(sncjbz == "Y"){
		for ( var i = 0; i < zcfzbxxlist.trs.length; i++) {
			var ewbhxh = zcfzbxxlist.trs[i].tds.ewbhxh.value;
			var qmsZc = zcfzbxxlist.trs[i].tds.qmyeZc.value;
			var qmsQy = zcfzbxxlist.trs[i].tds.qmyeQy.value;
			var ncsZc = zcfzbxxForm.getValue("h" + ewbhxh + "l3");
			var zcName = zcfzbxxForm.getValue("h" + ewbhxh + "l1");
			var ncsQy = zcfzbxxForm.getValue("h" + ewbhxh + "l6");
			var qyName = zcfzbxxForm.getValue("h" + ewbhxh + "l4");

			if(Number(qmsZc) != Number(ncsZc)){
				names.push(zcName);
			}if(Number(qmsQy) != Number(ncsQy)){
				names.push(qyName);
			}
		}
		
	}
 
	if(names.length > 0){
		var nameStr = names.toString().replace(/(\s|(\u00A0)|(\u3000))/g,'');
		swordConfirm("资产负债表中，年初数与上年末期期末数不相等，是否继续？"
				+ "<br/>数据项：[" + nameStr + "]",
				{
					onOk:function(){
						saveTrue();
					},
					onCancel : function() {
						return false;
					}
				});
	}else{
		saveTrue();
	}
}
//保存
function saveTrue(){
 
	var nsrxxFormData = $w("nsrxxForm").getSubmitData();
	var zcfzbxxFormData = $w("zcfzbxxForm").getSubmitData();
	var saveBtn = new SwordSubmit();
	
	if(hxfblrbxx!=null&&hxfblrbxx!=undefined&&hxfblrbxx!=""){
		hxfblrbxx.name="lrbxxForm";
	}
	if(nsrxxForm2hx!=null&&nsrxxForm2hx!=undefined&&nsrxxForm2hx!=""){
		nsrxxForm2hx.name="nsrxxForm2";
	}
	if(hxfbxjllbxx!=null&&hxfbxjllbxx!=undefined&&hxfbxjllbxx!=""){
		hxfbxjllbxx.name="xjllbxxForm";
	}
	if(nsrxxForm3hx!=null&&nsrxxForm3hx!=undefined&&nsrxxForm3hx!=""){
		nsrxxForm3hx.name="nsrxxForm3";
	}
	if(hxfblrbxxNbb!=null&&hxfblrbxxNbb!=undefined&&hxfblrbxxNbb!=""){
		hxfblrbxxNbb.name="lrbxxnbbForm";
	}
	if(nsrxxForm4hx!=null&&nsrxxForm4hx!=undefined&&nsrxxForm4hx!=""){
		nsrxxForm4hx.name="nsrxxForm4";
	}
	if(hxfbxjllbxxNbb!=null&&hxfbxjllbxxNbb!=undefined&&hxfbxjllbxxNbb!=""){
		hxfbxjllbxxNbb.name="xjllbxxnbbForm";
	}
	if(nsrxxForm5hx!=null&&nsrxxForm5hx!=undefined&&nsrxxForm5hx!=""){
		nsrxxForm5hx.name="nsrxxForm5";
	}
	
	saveBtn.pushData(nsrxxFormData);
	saveBtn.pushData(zcfzbxxFormData);
	// 将主表和附表信息一起提交进行保存
	saveBtn.pushData(hxfblrbxx);// 子页面返回的利润表信息
	saveBtn.pushData(nsrxxForm2hx);
	saveBtn.pushData(hxfbxjllbxx);// 子页面返回的现金流量表信息
	saveBtn.pushData(nsrxxForm3hx);
	saveBtn.pushData(hxfblrbxxNbb);// 子页面返回的利润表年报表信息
	saveBtn.pushData(nsrxxForm4hx);
	saveBtn.pushData(hxfbxjllbxxNbb);// 子页面返回的现金流量表信息 年报表
	saveBtn.pushData(nsrxxForm5hx);
	//新增表单
	saveBtn.pushData(hxfbChdpl);// 子页面返回的 存货的披露
	saveBtn.pushData(hxfbDqtzdpl);// 子页面返回的 短期投资的披露
	saveBtn.pushData(hxfbGdzcdpl);// 子页面返回的 固定资产的披露
	saveBtn.pushData(hxfbLrfpb);// 子页面返回的 利润分配表
	saveBtn.pushData(hxfbYfzgxcmxb);// 子页面返回的 应付职工薪酬明细表
	saveBtn.pushData(hxfbYjsfmxb);// 子页面返回的 应交税费明细表
	
	// xml导入保存数据直接封装
	for(var key in fbXMLData ){
		if(fbXMLData[key] !=undefined && fbXMLData[key] !=null){
			saveBtn.pushData(fbXMLData[key].value);
		}
	}
	
	saveBtn.pushData('cfdz',cfdz);	
	saveBtn.pushData('bszldm',bszldm);	
	saveBtn.pushData('djxh',djxh);	
	saveBtn.pushData('zlsl',zlsl);			
	saveBtn.pushData('zllx',zllx);		
	saveBtn.pushData('zlbsxlDm',zlbsxlDm);		
	saveBtn.pushData('zlbsdlDm',zlbsdlDm);		
	saveBtn.pushData('zlbsuuid',zlbsuuid);			
	saveBtn.pushData('sfcfcj',sfcfcj);
	//保存附件信息
	if(sfbhfj=="Y"){
		var flzlStr = ATTACH_FlZL_JSOBJ.getFlzlList();
		saveBtn.pushData("flzlList", flzlStr);
		saveBtn.pushData("zgswjDm", zgswskfjDm);
		saveBtn.pushData("ywzj", ywzj);
	}
	saveBtn.pushData("sfbhfj", sfbhfj);
	saveBtn = zlbssavePushdata(saveBtn);
	saveBtn.setCtrl(Ctrl+'_saveZcfzb');
	saveBtn.setFunction('onSuccess', 'saveOnSuccess');
	saveBtn.submit();
}
/**
 * 保存成功事件
 * 
 * @param {Object}
 *            req
 * @param {Object}
 *            resData
 */
function saveOnSuccess(req,resData){
	var flag = pc.getResData("flag", resData).value;
	if (flag=="Y") {
		swordAlertRight("财务报表信息采集完成且发送成功！", {
			onOk : function() {
			$w('zzsybnsrsb').setDisabled('save');
			$w('zzsybnsrsb').setDisabled('reset');
			$w('zzsybnsrsb').setDisabled('import');
			$w('zzsybnsrsb').setEnabled('export');
			$w("SwordTreeJSON").clear();
			var tree = $w("SwordTreeJSON");
			tree.reloadTree("{ 'data':[{'code':'000','caption':''}]}");
			}
		});
	} else {
		swordAlert("采集失败");
	}
}
/**
 * 取消
 */
function reset(){
	$w('zcfzbxxForm').resetAll();	
}

var len;// 用来判断年报的标志
function openTab(inputEl){
    tsxx="";
	ccbg="";
	var name = inputEl.get("code");
	// 将资产负债表页面的信息传到子页面
	displayIfram();
	var table00 = $("table00");
	var table01 = $("table01");
	var table02 = $("table02");
	var table03 = $("table03");
	var table04 = $("table04");
	var table01iframe = $("table01iframe");
	var table02iframe = $("table02iframe");
	var table03iframe = $("table03iframe");
	var table04iframe = $("table04iframe");
	//新增表单
	var table05 = $("table05");
	var table06 = $("table06");
	var table07 = $("table07");
	var table08 = $("table08");
	var table09 = $("table09");
	var table10 = $("table10");
	var table05iframe = $("table05iframe");
	var table06iframe = $("table06iframe");
	var table07iframe = $("table07iframe");
	var table08iframe = $("table08iframe");
	var table09iframe = $("table09iframe");
	var table10iframe = $("table10iframe");
	// 新增校验 只有年报时才能打开利润表和现金流量表年报
	if(name=='00'){
     if (cxbj=="N"){
			buDisable();
			table00.setStyle('display', '');
			table01.setStyle('display', 'none');
			table02.setStyle('display', 'none');
			table03.setStyle('display', 'none');
			table04.setStyle('display', 'none');
			table05.setStyle('display', 'none');
			table06.setStyle('display', 'none');
			table07.setStyle('display', 'none');
			table08.setStyle('display', 'none');
			table09.setStyle('display', 'none');
			table10.setStyle('display', 'none');
		}else{
			budEnable();
			table00.setStyle('display', '');
			table01.setStyle('display', 'none');
			table02.setStyle('display', 'none');
			table03.setStyle('display', 'none');
			table04.setStyle('display', 'none');
			table05.setStyle('display', 'none');
			table06.setStyle('display', 'none');
			table07.setStyle('display', 'none');
			table08.setStyle('display', 'none');
			table09.setStyle('display', 'none');
			table10.setStyle('display', 'none');
		}		
	}else if(name=='01'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', '');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb01) {// 没有打开过
			table01iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb01 = true;
		}
	}else if(name=='02'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', '');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb02) {// 没有打开过
			table02iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb02 = true;
		}
	}else if(name=='03'){
//		if(bsfsDm=='3'&&month2=="12"){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', '');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb03) {// 没有打开过
			table03iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb03 = true;
		}
//		}else{
//			swordAlert("当前月份不能进行小企业会计制度利润表年报信息采集");
//			return;
//		}
	}else if(name=='04'){
//		if(bsfsDm=='3'&&month2=="12"){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', '');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb04) {// 没有打开过
			table04iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb04 = true;
		}
//		}else {
//			swordAlert("当前月份不能进行小企业会计制度现金流量表年报信息采集");
//			return;
//			}
	}else if(name=='05'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', '');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb05) {// 没有打开过
			table05iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb05 = true;
		}
	}else if(name=='06'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', '');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb06) {// 没有打开过
			table06iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb06 = true;
		}
	}else if(name=='07'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', '');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb07) {// 没有打开过
			table07iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb07 = true;
		}
	}else if(name=='08'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', '');
		table09.setStyle('display', 'none');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb08) {// 没有打开过
			table08iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb08 = true;
		}
	}else if(name=='09'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', '');
		table10.setStyle('display', 'none');
		if (!sb101_boolean_fb09) {// 没有打开过
			table09iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb09 = true;
		}
	}else if(name=='10'){
		buDisable();
		table00.setStyle('display', 'none');
		table01.setStyle('display', 'none');
		table02.setStyle('display', 'none');
		table03.setStyle('display', 'none');
		table04.setStyle('display', 'none');
		table05.setStyle('display', 'none');
		table06.setStyle('display', 'none');
		table07.setStyle('display', 'none');
		table08.setStyle('display', 'none');
		table09.setStyle('display', 'none');
		table10.setStyle('display', '');
		if (!sb101_boolean_fb10) {// 没有打开过
			table10iframe.src = AddBizCode2URL("/sword?ctrl=SB104xqykjzzcwbsCtrl_toSbfb&id=" + name);
			sb101_boolean_fb10 = true;
		}
	}else{
		zlbstofb(name,zlbsxlDm,nsrxxMapInit);
	}
}
function setHx(a){
	// 将父页面的元素传到子页面
	var nsrxxFormData=$w("nsrxxForm").getSubmitData();
	var nsrsbh=$w("nsrxxForm").getValue("nsrsbh");
	var nsrmc=$w("nsrxxForm").getValue("nsrmc");
	var bsrq=$w("nsrxxForm").getValue("bsrq");
	var skssqq=$w("nsrxxForm").getValue("skssqq");
	var skssqz=$w("nsrxxForm").getValue("skssqz");
	var bbssq=$w("nsrxxForm").getValue("bbssq");
	//年报取值上一年的年初年尾
	var d = new Date(); 
	var year=d.getFullYear()-1;
	var sqsqqnb=year+'-01'+'-01'
	var skssqznb=year+'-12'+'-31';
	 
	if(a=="01"){
		// 利润表
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table01iframe.window.setCfcjInitValue(nsrxxForm2cj,cjhxfblrbxx,lrbCjcgbj,nsrsbh,nsrmc,bsrq,skssqq,skssqz,bbssq);
		}else{
			//nsrsbh,nsrmc,bsrq,skssqq,skssqz,sqlrblist,bbssq
			table01iframe.window.setInitValueYbOpen(nsrxxFormData);
		}
	}else if(a=="02"){
		// 现金流量表
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table02iframe.window.setCfcjInitValue(nsrxxForm3cj,cjhxfbxjllbxx,xjllbCjcgbj,nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}else{
			table02iframe.window.setInitValue(nsrsbh,nsrmc,bsrq,skssqq,skssqz,xjllblist);
		}
	}else if(a=="03"){// 利润表年报表
		if((sfcfcj=='Y'||sbdr=='sbdr')&&(nsrxxForm4cj!=null||nsrxxForm4cj!=undefined)){
			table03iframe.window.setCfcjInitValue(nsrxxForm4cj,cjhxfblrbxxNbb,sfcfcj,nsrsbh,nsrmc,bsrq,sqsqqnb,skssqznb,bbssq,nsrxxFormData);
		}else{
			table03iframe.window.setInitValueNbOpen(nsrsbh,nsrmc,bsrq,skssqq,skssqz,bbssq);
		}
	}else if(a=="04"){
		// 现金流量表年报
		if((sfcfcj=='Y'||sbdr=='sbdr')&&(nsrxxForm5cj!=null||nsrxxForm5cj!=undefined)){
			table04iframe.window.setCfcjInitValue(nsrxxForm5cj,cjhxfbxjllbxxNbb,sfcfcj,nsrsbh,nsrmc,bsrq,sqsqqnb,skssqznb);
		}else{
			table04iframe.window.setInitValue(nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}
	}else if(a=="05"){//存货的披露
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table05iframe.window.setCfcjInitValue(cjhxfbChdpl,nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}else{
			table05iframe.window.setInitValue(nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}
	}else if(a=="06"){//短期投资的披露
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table06iframe.window.setCfcjInitValue(cjhxfbDqtzdpl,nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}else{
			table06iframe.window.setInitValue(nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}
	}else if(a=="07"){//固定资产的披露
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table07iframe.window.setCfcjInitValue(cjhxfbGdzcdpl,nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}else{
			table07iframe.window.setInitValue(nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}
	}else if(a=="08"){//利润分配表
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table08iframe.window.setCfcjInitValue(snlrfpbList, cjhxfbLrfpb,nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}else{
			table08iframe.window.setInitValue(snlrfpbList, nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}
	}else if(a=="09"){//应付职工薪酬明细表
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table09iframe.window.setCfcjInitValue(cjhxfbYfzgxcmxb,nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}else{
			table09iframe.window.setInitValue(nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}
	}else if(a=="10"){//应交税费明细表
		if(sfcfcj=='Y'||sbdr=='sbdr'){
			table10iframe.window.setCfcjInitValue(cjhxfbYjsfmxb,nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}else{
			table10iframe.window.setInitValue(nsrsbh,nsrmc,bsrq,skssqq,skssqz);
		}
	}
}
/**
 * 附表保存回写主表事件
 * 
 * @param sb099Form
 * @param bj
 */
function hxFb(sb104Form,sb104Form1,bj,hx_cfcjbz,isDrInit){
	$w("SwordTreeJSON").setSelectValue("小企业会计制度资产负债表");
	budEnable();
	var table00 = $("table00");
	var table01 = $("table01");
	var table02 = $("table02");
	var table03 = $("table03");
	var table04 = $("table04");
	//新增表单
	var table05 = $("table05");
	var table06 = $("table06");
	var table07 = $("table07");
	var table08 = $("table08");
	var table09 = $("table09");
	var table10 = $("table10");
	
	if(bj=='01'){// 利润表保存回写
		hxfblrbxx=sb104Form;
		nsrxxForm2hx=sb104Form1;
		if(!isDrInit){
			swordAlert("利润表月报信息采集完成且发送成功");
		}
		cjhxfblrbxx=sb104Form;
		nsrxxForm2cj=sb104Form1;
	}else if(bj=='02'){// 现金流量表回写
		hxfbxjllbxx=sb104Form;
		nsrxxForm3hx=sb104Form1;
		if(!isDrInit){
			swordAlert("现金流量表月报信息采集完成且发送成功");
		}
		cjhxfbxjllbxx=sb104Form;
		nsrxxForm3cj=sb104Form1;
	}else if(bj=='03'){// 利润表年报表
		hxfblrbxxNbb=sb104Form;
		nsrxxForm4hx=sb104Form1;
		if(!isDrInit){
			swordAlert("利润表年报信息采集完成且发送成功");
		}
		cjhxfblrbxxNbb=sb104Form;
		nsrxxForm4cj=sb104Form1;
	}else if(bj=='04'){// 现金流量表年报表
		hxfbxjllbxxNbb=sb104Form;
		nsrxxForm5hx=sb104Form1;
		if(!isDrInit){
			swordAlert("现金流量表年报信息采集完成且发送成功");
		}
		cjhxfbxjllbxxNbb=sb104Form;
		nsrxxForm5cj=sb104Form1;
	}else if(bj=='05'){// 存货的披露
		hxfbChdpl=sb104Form;
		if(!isDrInit){
			swordAlert("存货的披露信息采集完成且发送成功");
		}
		cjhxfbChdpl=sb104Form;
	}else if(bj=='06'){// 短期投资的披露
		hxfbDqtzdpl=sb104Form;
		if(!isDrInit){
			swordAlert("短期投资的披露信息采集完成且发送成功");
		}
		cjhxfbDqtzdpl=sb104Form;
	}else if(bj=='07'){// 固定资产存货的披露
		hxfbGdzcdpl=sb104Form;
		if(!isDrInit){
			swordAlert("固定资产的披露信息采集完成且发送成功");
		}
		cjhxfbGdzcdpl=sb104Form;
	}else if(bj=='08'){// 利润分配表
		hxfbLrfpb=sb104Form;
		if(!isDrInit){
			swordAlert("利润分配表信息采集完成且发送成功");
		}
		cjhxfbLrfpb=sb104Form;
	}else if(bj=='09'){// 应付职工薪酬明细表
		hxfbYfzgxcmxb=sb104Form;
		if(!isDrInit){
			swordAlert("应付职工薪酬明细表信息采集完成且发送成功");
		}
		cjhxfbYfzgxcmxb=sb104Form;
	}else if(bj=='10'){// 应交税费明细表
		hxfbYjsfmxb=sb104Form;
		if(!isDrInit){
			swordAlert("应交税费明细表信息采集完成且发送成功");
		}
		cjhxfbYjsfmxb=sb104Form;
	}
	
	// 回写玩将其他子页面全部关闭,只打开父页面
	table00.setStyle('display', '');
	table01.setStyle('display', 'none');
	table02.setStyle('display', 'none');
	table03.setStyle('display', 'none');
	table04.setStyle('display', 'none');
	table05.setStyle('display', 'none');
	table06.setStyle('display', 'none');
	table07.setStyle('display', 'none');
	table08.setStyle('display', 'none');
	table09.setStyle('display', 'none');
	table10.setStyle('display', 'none');
}
/**
 * 导入
 * 
 * @return
 */
var sb101_yzpzzlDm = "ZL1001003_zcfzb";
function getDrxx(){
	var gydrctrl = Ctrl + "_getDrxx";//导入处理自定义的ctrl
	var drxxBtn = new SwordSubmit();
  
	if ($chk(djxh)) {
		drxxBtn.pushData('djxh', djxh);
	}
	drxxBtn.pushData('gydrCtrl', gydrctrl);
//	drxxBtn.options.mask = "true"; 
	drxxBtn.setCtrl('GYDrCtrl_openDr');//公用导入方法
	swordAlertIframe('', {
		titleName : "申报信息导入",
		width : 450,
		height : 300,
		param : window,
		isNormal : 'true',
		isMax : 'true',
		isClose : 'true',
		isMin : "true",
		submit : drxxBtn
	});
}
var sb101_cszForXML;
function boxCallBackForSBdr(resData) {
	sbdr='sbdr';
	resData.data = JSON.decode(JSON.encode(resData.data));
	var data=resData.getAttr("data");
	if(data!='N'){
		cfcjSuccess("",resData);
	}
	//验证计算公式
	var inputs = $$('input');
	inputs.each(function(input,idx){
		if(input.id != "" && gs_caculate.indexOf(input.id) > 0){
			caculate(input.id);
		}
	});
	//打开附表
	beSbdr = true;
	var data = $w('SwordTreeJSON').getAllNode();
	var zb = null;
	data.each(function(item,idx){
		if(idx == 0){
			zb = item;
		}
		openTab(item);
	})
	openTab(zb);
}


/**
 * 申报错误导入，要求所有的button都亮着
 * 
 * @param resData
 * @return
 */
var fbXMLData = {};
var sb101_resDataXMLForSBDR;
function XMLForSBDR(resData) {

	
	sb101_resDataXMLForSBDR = JSON.encode(resData);
	fbXMLData["zcfzbxxForm"] = pc.getResData("zcfzbxxForm", resData);
	if(fbXMLData["zcfzbxxForm"]!=null&&fbXMLData["zcfzbxxForm"]!=undefined&&fbXMLData["zcfzbxxForm"].sword!=null&&fbXMLData["zcfzbxxForm"].sword!=undefined&&fbXMLData["zcfzbxxForm"].sword!=""){
	$w("zcfzbxxForm").initData(fbXMLData["zcfzbxxForm"]);
	$w("zcfzbxxForm").disable();
	}
	
	var qybxxForm = pc.getResData("qybxxForm", resData);
	if(qybxxForm!=null&&qybxxForm!=undefined&&qybxxForm.sword!=null&&qybxxForm.sword!=undefined&&qybxxForm.sword!=""){
	
		fbXMLData["qybxxForm"] = {'value' : qybxxForm};
	}
	
	var lrbxxForm = pc.getResData("lrbxxForm", resData);
	if(lrbxxForm!=null&&lrbxxForm!=undefined&&lrbxxForm.sword!=null&&lrbxxForm.sword!=undefined&&lrbxxForm.sword!=""){
		fbXMLData["lrbxxForm"] = {'value' : lrbxxForm};
	}
	
	var xjllbxxForm = pc.getResData("xjllbxxForm", resData);
	if(xjllbxxForm!=null&&xjllbxxForm!=undefined&&xjllbxxForm.sword!=null&&xjllbxxForm.sword!=undefined&&xjllbxxForm.sword!=""){
		fbXMLData["xjllbxxForm"] = {'value' : xjllbxxForm};
	}
	// 新增的小企业年报表和现金流量表年报表
	var lrbxxnbbForm = pc.getResData("lrbxxnbbForm", resData);
	if(lrbxxnbbForm!=null&&lrbxxnbbForm!=undefined&&lrbxxnbbForm.sword!=null&&lrbxxnbbForm.sword!=undefined&&lrbxxnbbForm.sword!=""){
		fbXMLData["lrbxxnbbForm"] = {'value' : lrbxxnbbForm};
	}
	
	var xjllbxxnbbForm = pc.getResData("xjllbxxnbbForm", resData);
	if(xjllbxxnbbForm!=null&&xjllbxxnbbForm!=undefined&&xjllbxxnbbForm.sword!=null&&xjllbxxnbbForm.sword!=undefined&&xjllbxxnbbForm.sword!=""){
		fbXMLData["xjllbxxnbbForm"] = {'value' : xjllbxxnbbForm};
	}
	 sb101_boolean_fb01 = false;
	 sb101_boolean_fb02 = false;
	 sb101_boolean_fb03 = false;
	 sb101_boolean_fb04 = false;
	 sb101_boolean_fb05 = false;
	 sb101_boolean_fb06 = false;
	 sb101_boolean_fb07 = false;
	 sb101_boolean_fb08 = false;
	 sb101_boolean_fb09 = false;
	 sb101_boolean_fb10 = false;

}
function  formTest(e1){
	
	var zcfzbxxForm=$w("zcfzbxxForm");
	var result = {};    
	var a9=zcfzbxxForm.getValue("h9l2");
	var a10=zcfzbxxForm.getValue("h10l2");
	var a11=zcfzbxxForm.getValue("h11l2");
	var a12=zcfzbxxForm.getValue("h12l2");
	var a13=zcfzbxxForm.getValue("h13l2");
	var toalValue=(a10).accAdd(a11).accAdd(a12).accAdd(a13).round(2);
	if(parseFloat(a9)<toalValue){
		result["state"]=false;  // state值必须为false,否则不显示提示信息
		result["msg"]="9>=10+11+12+13"; // msg为错误的提示信息
	}
	return  result;// 如果想显示错误提示信息被调用的函数最后必须返回对象
}
function  formTest1(e1){
	
	// "{zcfzbxxForm_a9}={zcfzbxxForm_a10}+{zcfzbxxForm_a11}+{zcfzbxxForm_a12}+{zcfzbxxForm_a13}",
	var zcfzbxxForm=$w("zcfzbxxForm");
	var result = {};    
	var b9=zcfzbxxForm.getValue("h9l3");
	var b10=zcfzbxxForm.getValue("h10l3");
	var b11=zcfzbxxForm.getValue("h11l3");
	var b12=zcfzbxxForm.getValue("h12l3");
	var b13=zcfzbxxForm.getValue("h13l3");
	var toalValue=(b10).accAdd(b11).accAdd(b12).accAdd(b13).round(2);
	if(parseFloat(b9)<toalValue){
		result["state"]=false;  // state值必须为false,否则不显示提示信息
		result["msg"]="9>=10+11+12+13"; // msg为错误的提示信息
	}
	return  result;// 如果想显示错误提示信息被调用的函数最后必须返回对象
}

function budEnable(){
	//主表表公共按钮恢复
	$w('zzsybnsrsb').setEnabled('save');
	$w('zzsybnsrsb').setEnabled('import');
	$w('zzsybnsrsb').setEnabled('reset');
}

function buDisable(){
	//附表按钮公共置灰
	$w('zzsybnsrsb').setDisabled('save');
	$w('zzsybnsrsb').setDisabled('import');
	$w('zzsybnsrsb').setDisabled('reset');	
}

function next(){
	var box = this.parent[this.name];
	box.options.reset();//调用父页面重置方法
	box.closePopUpBox();//关闭子页面
}

/**
 * Excel模板下载
 */
function downloadExcelTemplet(){
	var ctrlSub = new SwordSubmit();
	ctrlSub.options.postType="download";
	ctrlSub.setCtrl("GYDrCtrl_download?fileName=/template/sb/sb104/CWBB_XQYKJZZ_V2.0.xls");
	ctrlSub.submit();
}

/**
 * Excel导出
 */
function exportsbxx(){
	var submitBtn = new SwordSubmit();
	submitBtn.pushData("cfdz", cfdz);
    submitBtn.pushData("cfdz", cfdz);
    submitBtn.pushData("djxh", djxh);
    submitBtn.pushData("bszlDm", bszldm);
    submitBtn.pushData("ssqq", $w("nsrxxForm").getValue("skssqq"));
    submitBtn.pushData("ssqz", $w("nsrxxForm").getValue("skssqz"));
	submitBtn.setCtrl(Ctrl + "_exportExcel");
	var options = {};
	options.postType = "download";
	submitBtn.setOptions(options);
	submitBtn.setFunction("onSuccess", "onSuccessDc");
 
	submitBtn.submit();
}


//页面返回
function backSfxywh() {
	var box = this.parent[this.name];
	box.close();
 
}
//主表打印所需变量
var dymbuuid = "sb104_zcfzb";
var hxdyForPrint="N";
var fykg="N";
var zzlx="A4";
var caculateGridHJFlag = "N";
var printMode = '{"PRINT_PAGE_PERCENT":"100%"}';
var printTitle = "小企业会计准则资产负债表";
var printFileType="excel";	
var tsxx;
var ccbg;//超长表格
function setZbdymbuuid(){
	dymbuuid = "sb104_zcfzb";
	hxdyForPrint="N";
	fykg="N";
	zzlx="A4";
	caculateGridHJFlag = "N";
	printMode = '{"PRINT_PAGE_PERCENT":"63%"}';
	printTitle = "小企业会计准则资产负债表";
	printFileType="excel";	
	return dymbuuid;
}
/**
 * 此方法用于覆盖查询页面自带的print()函数
 * @return
 */
function printhtm(){
	return false;
    gyTaxPrintWordOrExcel();
}