var beSbdr = false;
var gs_gjj = [
	"{xjllbxxForm_h7l2}={xjllbxxForm_h1l2}+{xjllbxxForm_h2l2}-{xjllbxxForm_h3l2}-{xjllbxxForm_h4l2}-" +
					"{xjllbxxForm_h5l2}-{xjllbxxForm_h6l2}",
	"{xjllbxxForm_h13l2}={xjllbxxForm_h8l2}+{xjllbxxForm_h9l2}+{xjllbxxForm_h10l2}-{xjllbxxForm_h11l2}-" +
					"{xjllbxxForm_h12l2}",
	"{xjllbxxForm_h19l2}={xjllbxxForm_h14l2}+{xjllbxxForm_h15l2}-{xjllbxxForm_h16l2}-{xjllbxxForm_h17l2}-" +
					"{xjllbxxForm_h18l2}",
	"{xjllbxxForm_h20l2}={xjllbxxForm_h7l2}+{xjllbxxForm_h13l2}+{xjllbxxForm_h19l2}",
	"{xjllbxxForm_h22l2}={xjllbxxForm_h20l2}+{xjllbxxForm_h21l2}",

	"{xjllbxxForm_h7l3}={xjllbxxForm_h1l3}+{xjllbxxForm_h2l3}-{xjllbxxForm_h3l3}-{xjllbxxForm_h4l3}-" +
					"{xjllbxxForm_h5l3}-{xjllbxxForm_h6l3}",
	"{xjllbxxForm_h13l3}={xjllbxxForm_h8l3}+{xjllbxxForm_h9l3}+{xjllbxxForm_h10l3}-{xjllbxxForm_h11l3}-" +
					"{xjllbxxForm_h12l3}",
	"{xjllbxxForm_h19l3}={xjllbxxForm_h14l3}+{xjllbxxForm_h15l3}-{xjllbxxForm_h16l3}-{xjllbxxForm_h17l3}-" +
					"{xjllbxxForm_h18l3}",
	"{xjllbxxForm_h20l3}={xjllbxxForm_h7l3}+{xjllbxxForm_h13l3}+{xjllbxxForm_h19l3}",
	"{xjllbxxForm_h22l3}={xjllbxxForm_h20l3}+{xjllbxxForm_h21l3}"
	];
gs_caculate = thgs(gs_gjj);

var sfdycbs;//判断是否第一次报送财务报表
var bszldm;//报送资料代码
var cjbz;//采集标记
var sfkybc=false;
var djxh;
var cfcjbz;//重复采集标记

var bnsqa7,bnsqa13,bnsqa19,bnsqa20,bnsqa22;//上期本年累计数
var xjllbxx_Data=null;
var cjbz;
var xjllbCjcgbj='N';//现金流量表成功采集标记
var sqxjllbxxForm;
/**
 * 初始化处理
 * @param {Object} resData
 */
function initV(resData){
	if(parent.cxbj == 'N'){
		$w("qykjzdInner").setDisabled('bcBtn');
		$w("qykjzdInner").setDisabled('qxBtn');
		$w("xjllbxxForm").disable();   //此段需求看自己用附表FROM表单名置灰。
		$w("bcBtn").disabled();   
		$w("qxBtn").disabled();
	}
	//查询上期数据
	var newSubmit=new SwordSubmit();
	var sqcfdz=parent.sqcfdz;
	newSubmit.pushData("cfdz",sqcfdz);
	newSubmit.setCtrl(parent.Ctrl+"_queryXmlByzlbsuuid");
	newSubmit.setFunction("onSuccess","sqzcfzbxxOnSuccess");
	if(sqcfdz!=null&&sqcfdz!=undefined&&sqcfdz!=""){
		newSubmit.submit();
	}
	var resDataXMLForSBDR = parent.cjhxfbxjllbxx;
	parent.setHx("02");
	//(function(){$w("xjllbxxForm").getFieldEl('h1l3').focus();}).delay(1);
	parent.$w("zzsybnsrsb").setDisabled("save");
	parent.$w("zzsybnsrsb").setDisabled("reset");
	parent.$w("zzsybnsrsb").setDisabled("import");
	//开始需要增加网报特色
	if(parent.beSbdr && beSbdr == false){
		parent.$w('zzsybnsrsb').setEnabled('save');
		parent.$w('zzsybnsrsb').setEnabled('import');
		parent.$w('zzsybnsrsb').setEnabled('reset');
		beSbdr = true;
		if (resDataXMLForSBDR != null && resDataXMLForSBDR != undefined
				&& "" != resDataXMLForSBDR) {
			(function(){
				var inputs = $$('input');
				inputs.each(function(input,idx){
					if(input.id != ""){
						caculate(input.id);
					}
				});
				savefb();			
			    beSbdr=false;
			}).delay(1);
		}
	}
}
function sqzcfzbxxOnSuccess(req,resData){
	if(parent.month2=="1"||parent.month2=="01"){//本年第一次采集，不查询上期本年累计数
		return;
	}
	sqxjllbxxForm = pc.getResData("gzxjllbxxForm", resData);
	$w("xjllbxxForm").initData(sqxjllbxxForm);
	for(var i=1;i<=22;i++){
		$w("xjllbxxForm").setValue("h"+i+"l3","0");
	}
}

function setInitValue(open_nsrsbh,open_nsrmc,open_bsrq,open_skssqq,open_skssqz){
	$w("nsrxxForm3").setValue("nsrsbh",open_nsrsbh);
	$w("nsrxxForm3").setValue("nsrmc",open_nsrmc);
	$w("nsrxxForm3").setValue("bsrq",open_bsrq);
	$w("nsrxxForm3").setValue("skssqq",open_skssqq);
	$w("nsrxxForm3").setValue("skssqz",open_skssqz);
}
function jsbnlja(param){
	var xjllbxxForm=$w("xjllbxxForm");
	if(sqxjllbxxForm == null || sqxjllbxxForm == undefined ||sqxjllbxxForm==""){
		//表明第一次采集  第一次采集 本年累计金额=本月金额
		xjllbxxForm.setValue("h"+param+"l2",xjllbxxForm.getValue("h"+param+"l3"));
		caculate("xjllbxxForm_h"+param+"l2");
		return ;
	}
	//如果上期采集 本期的本年累计的数值等于本月金额加上上期的本年累计额
	var b = xjllbxxForm.getValue("h"+param+"l2");
	var a = xjllbxxForm.getValue("h"+param+"l3");
	if(parseFloat(a) == 0){
		xjllbxxForm.setValue("h"+param+"l2",sqxjllbxxForm.data["h"+param+"l2"].value.round(2));
		caculate("xjllbxxForm_h"+param+"l2");
	}else{
		xjllbxxForm.setValue("h"+param+"l2",a.accAdd(parseFloat(sqxjllbxxForm.data["h"+param+"l2"].value)).round(2));
		caculate("xjllbxxForm_h"+param+"l2");
	}
	
}
function setCfcjInitValue(open_cfcjTyNsrxxForm,open_xqykjzdXjllbForm,open_cfcjbz,open_nsrsbh,open_nsrmc,open_bsrq,open_skssqq,open_skssqz){
	if(open_cfcjTyNsrxxForm!=undefined){
		$w("nsrxxForm3").initData(open_cfcjTyNsrxxForm);
	}else {
		$w("nsrxxForm3").setValue("nsrsbh",open_nsrsbh);
		$w("nsrxxForm3").setValue("nsrmc",open_nsrmc);
		$w("nsrxxForm3").setValue("bsrq",open_bsrq);
		$w("nsrxxForm3").setValue("skssqq",open_skssqq);
		$w("nsrxxForm3").setValue("skssqz",open_skssqz);
	}
	$w("xjllbxxForm").initData(open_xqykjzdXjllbForm);
	cfcjbz=open_cfcjbz;
}
/**
 * 保存前验证
 */
function savefb(){
	if($w("xjllbxxForm").validate()&&$w("nsrxxForm3").validate()){
	}else{
		return;
	}
//	if(xjllbCjcgbj=='Y'){//上期成功采集并且上期的现金流量表已采集
//		var xjllbxxFormData = $w("xjllbxxForm");
//		var dqbna7=xjllbxxFormData.getValue("a7");//当期本年累计数
//		var dqbna13=xjllbxxFormData.getValue("a13");//当期本年累计数
//		var dqbna19=xjllbxxFormData.getValue("a19");//当期本年累计数
//		var dqbna20=xjllbxxFormData.getValue("a20");//当期本年累计数
//		var dqbna22=xjllbxxFormData.getValue("a22");//当期本年累计数
//		var dqbysb7=xjllbxxFormData.getValue("b7");//当前本月数
//		var dqbysb13=xjllbxxFormData.getValue("b13");//当前本月数
//		var dqbysb19=xjllbxxFormData.getValue("b19");//当前本月数
//		var dqbysb20=xjllbxxFormData.getValue("b20");//当前本月数
//		var dqbysb22=xjllbxxFormData.getValue("b22");//当前本月数		
//		//判断当期的本年累计数是否等于本年上期利润表的“本年累计数”加上当期的本月数 如果相等继续执行 
//		if(parseFloat(dqbna7)!=(parseFloat(bnsqa7)+parseFloat(dqbysb7))||parseFloat(dqbna13)!=(parseFloat(bnsqa13)+parseFloat(dqbysb13))
//				||parseFloat(dqbna19)!=(parseFloat(bnsqa19)+parseFloat(dqbysb19))||parseFloat(dqbna20)!=(parseFloat(bnsqa20)+parseFloat(dqbysb20))
//						||parseFloat(dqbna22)!=(parseFloat(dqbysb22)+parseFloat(bnsqa22))){
//			swordConfirm("本年累计数不正确，是否保存？", {
//				okBtnName : "是",
//				cancelBtnName : "否",
//				onOk:function(){
//				saveTrue();
//			},
//				onCancel : function() {
//					$w('xjllbxxForm').resetAll();	
//				}});
//		}else{
			saveTrue1();
//		}
//	}else if(cfcjbz=="Y"||xjllbCjcgbj!="Y"){//第一次报送或者上期现金流量表未采集
//		saveTrue();
//	}
}
function saveTrue1(){
	var xjllbxxForm=$w("xjllbxxForm").getSubmitData();
	var nsrxxForm=$w("nsrxxForm3").getSubmitData();
	parent.hxFb(xjllbxxForm,nsrxxForm,'02',cfcjbz,beSbdr);//将子页面信息缓存到主表页面
	parent.$w('zzsybnsrsb').setEnabled('save');
	parent.$w('zzsybnsrsb').setEnabled('import');
	parent.$w('zzsybnsrsb').setEnabled('reset');;
}

/**
 * 取消
 */
function reset(){
	$w('xjllbxxForm').resetAll();	
}
//附表变量
function setFbdymbuuid(){	
	parent.dymbuuid = "sb104_xjllb";
	parent.hxdyForPrint = "N";
	parent.fykg = "N";
	parent.zzlx = "A4";
	parent.caculateGridHJFlag="N";
	parent.printMode = '{"PRINT_PAGE_PERCENT":"85%"}';
	parent.printTitle = "现金流量表_月报（适用执行小企业会计准则的企业）";
	parent.printFileType="excel";
}
function printhtm(){
     gyTaxPrintWordOrExcel();
}