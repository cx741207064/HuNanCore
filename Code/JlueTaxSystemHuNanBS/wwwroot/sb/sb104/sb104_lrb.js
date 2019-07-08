var beSbdr = false;
var gs_gjj = [
	"{lrbxxForm_h21l2}={lrbxxForm_h1l2}-{lrbxxForm_h2l2}-{lrbxxForm_h3l2}-{lrbxxForm_h11l2}-{lrbxxForm_h14l2}-" +
					"{lrbxxForm_h18l2}+{lrbxxForm_h20l2}",
	"{lrbxxForm_h30l2}={lrbxxForm_h21l2}+{lrbxxForm_h22l2}-{lrbxxForm_h24l2}",
	"{lrbxxForm_h32l2}={lrbxxForm_h30l2}-{lrbxxForm_h31l2}",
	
	"{lrbxxForm_h21l3}={lrbxxForm_h1l3}-{lrbxxForm_h2l3}-{lrbxxForm_h3l3}-{lrbxxForm_h11l3}-{lrbxxForm_h14l3}-" +
					"{lrbxxForm_h18l3}+{lrbxxForm_h20l3}",
	"{lrbxxForm_h30l3}={lrbxxForm_h21l3}+{lrbxxForm_h22l3}-{lrbxxForm_h24l3}",
	"{lrbxxForm_h32l3}={lrbxxForm_h30l3}-{lrbxxForm_h31l3}"
	];
gs_caculate = thgs(gs_gjj);

var sfdycbs;//判断是否第一次报送财务报表
var bszldm;//报送资料代码
var cjbz;//采集标记
var sfkybc=false;
var djxh;
var cfcjbz=null;//重复采集标记

var bnsqa32;//上期本年累计数
var lrbxx_Data=null;
var cjbz;
var lrbCjcgbj='N';//利润表成功采集标记 默认为否
var sqlrbxxForm ;//上期例如表信息
/**
 * 初始化处理
 * @param {Object} resData
 */
function initV(resData){
	if(parent.cxbj == 'N'){
		$w("qykjzdInner").setDisabled('bcBtn');
		$w("qykjzdInner").setDisabled('qxBtn');
		$w("lrbxxForm").disable();   //此段需求看自己用附表FROM表单名置灰。
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
	var resDataXMLForSBDR = parent.cjhxfblrbxx;
	parent.setHx("01");
//	(function(){$w("lrbxxForm").getFieldEl('h1l3').focus();}).delay(1);
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
	sqlrbxxForm = pc.getResData("gzlrbxxForm", resData);
	$w("lrbxxForm").initData(sqlrbxxForm);
	for(var i=1;i<=32;i++){
		$w("lrbxxForm").setValue("h"+i+"l3","0");
	}
}

function jsbnlja(param){
	var lrbxxForm=$w("lrbxxForm");
	if(sqlrbxxForm == null || sqlrbxxForm == undefined ||sqlrbxxForm==""){
		//表明第一次采集  第一次采集 本年累计金额=本月金额
		lrbxxForm.setValue("h"+param+"l2",lrbxxForm.getValue("h"+param+"l3"));
		caculate("lrbxxForm_h"+param+"l2");
		return ;
	}
	//如果上期采集 本期的本年累计的数值等于本月金额加上上期的本年累计额
	var b = lrbxxForm.getValue("h"+param+"l2");
	var a = lrbxxForm.getValue("h"+param+"l3");
	if(parseFloat(a) == 0){
		lrbxxForm.setValue("h"+param+"l2",sqlrbxxForm.data["h"+param+"l2"].value.round(2));
		caculate("lrbxxForm_h"+param+"l2");
	}else{
		lrbxxForm.setValue("h"+param+"l2",a.accAdd(parseFloat(sqlrbxxForm.data["h"+param+"l2"].value)).round(2));
		caculate("lrbxxForm_h"+param+"l2");
	}
}
function setInitValueYbOpen(nsrxxFormData){
	$w("nsrxxForm2").setValue("nsrsbh",nsrxxFormData.data.nsrsbh.value);
	$w("nsrxxForm2").setValue("nsrmc",nsrxxFormData.data.nsrmc.value);
	$w("nsrxxForm2").setValue("bsrq",nsrxxFormData.data.bsrq.value);
	$w("nsrxxForm2").setValue("skssqq",nsrxxFormData.data.skssqq.value);
	$w("nsrxxForm2").setValue("skssqz",nsrxxFormData.data.skssqz.value);
	$w("nsrxxForm2").setValue("bbssq",nsrxxFormData.data.bbssq.value);
}
function setCfcjInitValue(open_cfcjTyNsrxxForm,open_xqykjzdlrbForm,open_cfcjbz,open_nsrsbh,open_nsrmc,open_bsrq,open_skssqq,open_skssqz,open_bbssq){
	if(open_cfcjTyNsrxxForm!=undefined){
		$w("nsrxxForm2").initData(open_cfcjTyNsrxxForm);
	}else {
		$w("nsrxxForm2").setValue("nsrsbh",open_nsrsbh);
		$w("nsrxxForm2").setValue("nsrmc",open_nsrmc);
		$w("nsrxxForm2").setValue("bsrq",open_bsrq);
		$w("nsrxxForm2").setValue("skssqq",open_skssqq);
		$w("nsrxxForm2").setValue("skssqz",open_skssqz);
		$w("nsrxxForm2").setValue("bbssq",open_bbssq);
	}
	$w("lrbxxForm").initData(open_xqykjzdlrbForm);
//	bnsqa32=open_bnsqa32;
	cfcjbz=open_cfcjbz;
}
/**
 * 保存事件
 */
function savefb(){
	if(!$w("nsrxxForm2").validate()||!$w("lrbxxForm").validate("h3l3")){
		return;
	}
//	if(cfcjbz=='Y'){//成功采集并且上期利润表进行了表单采集
//		var lrbxxFormData = $w("lrbxxForm");
//		var dqbnljs=lrbxxFormData.getValue("h32l2");//当期本年累计数
//		var dqbys=lrbxxFormData.getValue("h32l3");//当前本月数
//		//判断当期的本年累计数是否等于本年上期利润表的“本年累计数”加上当期的本月数 如果相等继续执行 
//		if(parseFloat(dqbnljs)!=(parseFloat(bnsqa32)+parseFloat(dqbys))){
//			swordConfirm("本年累计数不正确,是否保存？", {
//				okBtnName : "是",
//				cancelBtnName : "否",
//				onOk:function(){
//				saveTrue();
//			},
//				onCancel : function() {
//					$w('lrbxxForm').resetAll();	
//				}});
//		}else{
			saveTrue1();
//		}
//	}else{
//		saveTrue();
//	}
}
function saveTrue1(){
	var lrbxxForm=$w("lrbxxForm").getSubmitData();
	var nsrxxForm=$w("nsrxxForm2").getSubmitData();
	parent.hxFb(lrbxxForm,nsrxxForm,'01',cfcjbz,beSbdr);//将子页面信息缓存到主表页面
    parent.$w('zzsybnsrsb').setEnabled('save');
	parent.$w('zzsybnsrsb').setEnabled('import');
	parent.$w('zzsybnsrsb').setEnabled('reset');

}
/**
 * 取消
 */
function reset(){
	$w('lrbxxForm').resetAll();	
}
function  formTest(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var a11=lrbxxForm.getValue("h11l2");
	var a12=lrbxxForm.getValue("h12l2");
	var a13=lrbxxForm.getValue("h13l2");
	var toalValue=(a12).accAdd(a13).round(2);
	if(parseFloat(a11)<toalValue){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="11>=12+13"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
	
}
function formTest2(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var a14=lrbxxForm.getValue("h14l2");
	var a15=lrbxxForm.getValue("h15l2");
	var a16=lrbxxForm.getValue("h16l2");
	var a17=lrbxxForm.getValue("h17l2");
	var toalValue=(a15).accAdd(a16).accAdd(a17).round(2);
	if(parseFloat(a14)<toalValue){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="14>=15+16+17"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
function formTest3(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var a18=lrbxxForm.getValue("h18l2");
	var a19=lrbxxForm.getValue("h19l2");
	if(parseFloat(a18)<parseFloat(a19)){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="18>=19"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
function formTest4(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var a22=lrbxxForm.getValue("h22l2");
	var a23=lrbxxForm.getValue("h23l2");
	if(parseFloat(a22)<parseFloat(a23)){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="22>=23"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}

function  form2Test(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var b11=lrbxxForm.getValue("h11l3");
	var b12=lrbxxForm.getValue("h12l3");
	var b13=lrbxxForm.getValue("h13l3");
	var toalValue=(b12).accAdd(b13).round(2);
	if(parseFloat(b11)<toalValue){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="11>=12+13"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
	
}
function form2Test2(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var b14=lrbxxForm.getValue("h14l3");
	var b15=lrbxxForm.getValue("h15l3");
	var b16=lrbxxForm.getValue("h16l3");
	var b17=lrbxxForm.getValue("h17l3");
	var toalValue=(b15).accAdd(b16).accAdd(b17).round(2);
	if(parseFloat(b14)<toalValue){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="14>=15+16+17"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
function form2Test3(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var b18=lrbxxForm.getValue("h17l3");
	var b19=lrbxxForm.getValue("h18l3");
	if(parseFloat(b18)<parseFloat(b19)){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="17>=18"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
function form2Test4(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var b22=lrbxxForm.getValue("h22l3");
	var b23=lrbxxForm.getValue("h23l3");
	if(parseFloat(b22)<parseFloat(b23)){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="22>=23"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
function formTest5(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var a24=lrbxxForm.getValue("h24l2");
	var a25=lrbxxForm.getValue("h25l2");
	var a26=lrbxxForm.getValue("h26l2");
	var a27=lrbxxForm.getValue("h27l2");
	var a28=lrbxxForm.getValue("h28l2");
	var a29=lrbxxForm.getValue("h29l2");
	var toalValue=(a25).accAdd(a26).accAdd(a27).accAdd(a28).accAdd(a29).round(2);

	if(parseFloat(a24)<toalValue){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="24>=25+26+27+28+29"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
function formTestb5(e1){
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var b24=lrbxxForm.getValue("h24l3");
	var b25=lrbxxForm.getValue("h25l3");
	var b26=lrbxxForm.getValue("h26l3");
	var b27=lrbxxForm.getValue("h27l3");
	var b28=lrbxxForm.getValue("h28l3");
	var b29=lrbxxForm.getValue("h29l3");
	
	var toalValue=(b25).accAdd(b26).accAdd(b27).accAdd(b28).accAdd(b29).round(2);
	if(parseFloat(b24)<toalValue){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="24>=25+26+27+28+29"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
//校验营业税金 
function  formTestYysj(e1){
	//b3>=b4+b5+b6+b7+b8+b9+b10
	var lrbxxForm=$w("lrbxxForm");
	var result = {};    
	var b3=lrbxxForm.getValue("h3l3");
	var b4=lrbxxForm.getValue("h4l3");
	var b5=lrbxxForm.getValue("h5l3");
	var b6=lrbxxForm.getValue("h6l3");
	var b7=lrbxxForm.getValue("h7l3");
	var b8=lrbxxForm.getValue("h8l3");
	var b9=lrbxxForm.getValue("h9l3");
	var b10=lrbxxForm.getValue("h10l3");
	var toalValue=(b4).accAdd(b5).accAdd(b6).accAdd(b7).accAdd(b8).accAdd(b9).accAdd(b10).round(2);
	if(parseFloat(b3)<toalValue){
		result["state"]=false;  //state值必须为false,否则不显示提示信息  
		result["msg"]="3>=4+5+6+7+8+9+10"; //msg为错误的提示信息  
	}
	return  result;//如果想显示错误提示信息被调用的函数最后必须返回对象 
}
//附表变量
function setFbdymbuuid(){	
	parent.dymbuuid = "sb104_lrb";
	parent.hxdyForPrint = "N";
	parent.fykg = "N";
	parent.zzlx = "A4";
	parent.caculateGridHJFlag="N";
	parent.printMode = '{"PRINT_PAGE_PERCENT":"70%"}';
	parent.printTitle = "小企业会计准则利润表月报";
	parent.printFileType="excel";
}
function printhtm(){
     gyTaxPrintWordOrExcel();
}