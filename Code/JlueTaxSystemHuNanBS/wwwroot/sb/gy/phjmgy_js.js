
var zsxmArray="10107,10109,10110,10111,10112,10118,30127,30203,30216";

var tsjkphjmxzdms = "";//提示监控普惠减免性质代码
var qzjkphjmxzdms = "";//强制监控普惠减免性质代码
var phjmzgMap = null;//缓存普惠减免资格

/**
 * 初始化时调用此方法，初始化普惠减免性质代码
 * @param res
 * @return
 */
function initPhjmxzDms(res){
	if($chk(res)){
		tsjkphjmxzdms = res.getAttr("tsjkphjmxzdms");
		qzjkphjmxzdms = res.getAttr("qzjkphjmxzdms");
	}
}

/**
 * 计算普惠减免税额
 * @param ynse 应纳税额
 * @param qtjmse 其他减免税额
 * @param phjzbl 减征比例
 * @return 普惠减免税额
 */
function calPhjmse(ynse, qtjmse, phjzbl){
	var ynseTmp = (ynse/1).subtract(qtjmse);
	if(ynseTmp <= 0){
		return 0;
	}
	var phjmse = ynseTmp.multiple(phjzbl.divide(100));
	phjmse = phjmse.round(2);
	if(phjmse < 0){
		phjmse = 0;
	}
	return phjmse;
}


/**
 * 获取普惠减免配置信息（适用于数据项在Form中的）
 * @param swjgDm 税务机关代码（可空，税源类的，传税源主管机关）
 * @param skssqq 税款所属期起
 * @param skssqz 税款所属期止
 * @param zsxmDm 征收項目代碼
 * @param formObj Form 对象（包含：bqsfsyxgmyhzc， phjmxzDm， phjmswsxDm， phjzbl）
 * @return
 */
function getPhjmPzxx(swjgDm, skssqq, skssqz, zsxmDm ,formObj){
	if(!$chk(skssqq)||!$chk(skssqz)){//传入参数空
		swordAlert("请先录入税款所属期起止。");
		return false;
	}
	if(compareDate(skssqq,'2018-12-31')){
		swordAlert("本期不适用增值税小规模纳税人减征政策！");
		if($chk(formObj.widgets.bqsfsyxgmyhzc)){
			formObj.setValue("bqsfsyxgmyhzc", "N");
		}
		if($chk(formObj.widgets.phjmxzDm)){
			formObj.setValue("phjmxzDm", "");
		}
		if($chk(formObj.widgets.phjmswsxDm)){
			formObj.setValue("phjmswsxDm", "");
		}
		if($chk(formObj.widgets.phjzbl)){
			formObj.setValue("phjzbl", "");
		}
		if($chk(formObj.widgets.syxgmjzzcqssj)){
			formObj.disable(['syxgmjzzcqssj']);
			formObj.setValue("syxgmjzzcqssj", "");
		}
		if($chk(formObj.widgets.syxgmjzzczzsj)){
			formObj.disable(['syxgmjzzczzsj']);
			formObj.setValue("syxgmjzzczzsj", "");
		}
		return;
	}
	var phjmxzDm = "";
	var phjmswsxDm = "";
	var phjzbl = "";
	var queryBtn = new SwordSubmit();
	queryBtn.pushData("skssqq",skssqq);
	queryBtn.pushData("skssqz",skssqz);
	queryBtn.pushData("swjgDm",swjgDm);
	queryBtn.pushData("zsxmDm",zsxmDm);
	queryBtn.setOptions({
		async:'false',
		mask:'false',
		ctrl:'SBGyCtrl_getPhjmPzxx',
		onSuccess:function(req,res){
			phjmxzDm = res.getAttr("phjmxzDm");
			phjmswsxDm = res.getAttr("phjmswsxDm");
			phjzbl = res.getAttr("phjzbl");
		}
	});
	queryBtn.submit();
	formObj.setValue("phjmxzDm", phjmxzDm);
	formObj.setValue("phjmswsxDm", phjmswsxDm);
	formObj.setValue("phjzbl", phjzbl);
	if(!$chk(phjmxzDm)){//未配置普惠减免性质
		swordAlert("该属期内未查询到有效的普惠减免性质，如需享受增值税小规模纳税人优惠，请检查CS_SB_PHJMPZB配置表。");
		return false;
	}
	/*if($chk(formObj.widgets.syxgmjzzcqssj)){
		//截取到月份
		formObj.setValue("syxgmjzzcqssj", skssqq);
	}
	if($chk(formObj.widgets.syxgmjzzczzsj)){
		//截取到月份
		formObj.setValue("syxgmjzzczzsj", skssqz);
	}*/
	return true;
}

/**
 * 校验纳税人普惠减免资格（适用于数据项在Form中的）
 * @param djxh 登记序号
 * @param skssqq 税款所属期起
 * @param skssqz 税款所属期止
 * @param formObj Form 对象（包含：bqsfsyxgmyhzc， phjmxzDm， phjmswsxDm， phjzbl）
 * @return
 */
function checkPhjmzg(djxh, skssqq, skssqz, formObj){
	if(!$chk(djxh)){//传入参数空
		swordAlert("请先录入纳税人识别号。");
		formObj.setValue("bqsfsyxgmyhzc", "");
		formObj.setValue("phjmxzDm", "");
		formObj.setValue("phjmswsxDm", "");
		formObj.setValue("phjzbl", "");
		return "-1";//
	}
	if(!$chk(skssqq)||!$chk(skssqz)){//传入参数空
		formObj.setValue("bqsfsyxgmyhzc", "");
		formObj.setValue("phjmxzDm", "");
		formObj.setValue("phjmswsxDm", "");
		formObj.setValue("phjzbl", "");
		swordAlert("请先录入税款所属期起止。");
		return "-1";//
	}
	var bqsfsyxgmyhzc = formObj.getValue("bqsfsyxgmyhzc").code;
	if("N" == bqsfsyxgmyhzc || !$chk(bqsfsyxgmyhzc)){//选择不享受减免
		formObj.setValue("phjmxzDm", "");
		formObj.setValue("phjmswsxDm", "");
		formObj.setValue("phjzbl", "");
		return "0";
	}
	
	//var hasPhjmzg = getPhjmzg(djxh,skssqq,skssqz);
	var phjmzgMap = getPhjmzg(djxh,skssqq,skssqz);
	var key = djxh + skssqq + skssqz;
	var key_phzsbl=key+"phzsbl";
	var key_phjmssqq=key+"phjmssqq";
	var key_phjmssqz=key+"phjmssqz";
	var hasPhjmzg=phjmzgMap.get(key);
	var phjmssqq=phjmzgMap.get(key_phjmssqq);
	var phjmssqz=phjmzgMap.get(key_phjmssqz);
	if($chk(phjmssqq)&&$chk(formObj.widgets.syxgmjzzcqssj)){
		formObj.setValue("syxgmjzzcqssj", phjmssqq);
	}
	if($chk(phjmssqz)&&$chk(formObj.widgets.syxgmjzzczzsj)){
		formObj.setValue("syxgmjzzczzsj", phjmssqz);
	}
	return checkPhZg(hasPhjmzg,skssqq,skssqz);
}

function jynsrzg(nsrzg, formObj) {
	var bqsfsyxgmyhzc = formObj.getValue("bqsfsyxgmyhzc").code;
	var phjmxzDm = formObj.getValue("phjmxzDm");
	if (nsrzg == "Y" && bqsfsyxgmyhzc == "N") {
		swordAlert("温馨提示:增值税小规模纳税人应适用增值税小规模纳税人地方税种和相关附加减征政策。");
		if (!$chk(phjmxzDm)) {
			formObj.setValue("bqsfsyxgmyhzc", "");
		} else {
			formObj.setValue("bqsfsyxgmyhzc", "Y");
		}
	} else if (nsrzg == "N" && bqsfsyxgmyhzc == "Y") {
		swordAlert("温馨提示:您是增值税一般纳税人，不应享受该减免。");
		formObj.setValue("bqsfsyxgmyhzc", "N");
		formObj.setValue("phjmxzDm", "");
		formObj.setValue("phjmswsxDm", "");
		formObj.setValue("phjzbl", "");
	}
}

/**
 * 校验纳税人普惠减免资格（适用于数据项在Form中的）
 * @param djxh 登记序号
 * @param skssqq 税款所属期起
 * @param skssqz 税款所属期止
 * @param row Grid 对象（包含：bqsfsyxgmyhzc， phjmxzDm， phjmswsxDm， phjzbl，phjmse）
 * @param grid Grid 对象
 * @param bqsfsyxgmyhzc  本期是否适用增值税小规模纳税人优惠政策
 * @return
 */
function checkGridPhjmzg(djxh, skssqq, skssqz,row,grid,bqsfsyxgmyhzc){
	if(!$chk(djxh)){//传入参数空
		swordAlert("请先录入纳税人识别号。");
		if($chk(grid) && $chk(row)){
			grid.updateCell(row.getCell("bqsfsyxgmyhzc"), "", "");
		}
		resetGridPhjmData(gird, row);
		return "-1";//
	}
	if(!$chk(skssqq)||!$chk(skssqz)){//传入参数空
		if($chk(grid) && $chk(row)){
			grid.updateCell(row.getCell("bqsfsyxgmyhzc"), "", "");
		}
		resetGridPhjmData(gird, row);
		swordAlert("请先录入税款所属期起止。");
		return "-1";//
	}
	if("N" == bqsfsyxgmyhzc || !$chk(bqsfsyxgmyhzc)){//选择不享受减免
		resetGridPhjmData(grid, row);
		return "-1";
	}
	
	var phjmzgMap = getPhjmzg(djxh,skssqq,skssqz);
	var key = djxh + skssqq + skssqz;
	var key_phzsbl=key+"phzsbl";
	var phzsbl=phjmzgMap.get(key_phzsbl);
	var hasPhjmzg=phjmzgMap.get(key);
	return checkPhZg(hasPhjmzg,skssqq,skssqz);
}
/**
 * 
 * @param hasPhjmzg 资格
 * @return 普惠资格信息
 */
function checkPhZg(hasPhjmzg,skssqq,skssqz){
//	var xtgn_ctrl="SB402CztdsyssbCtrl,SB175FxmtysbCtrl,SB404FcssbCtrl";
//	if(hasPhjmzg == "N"){//没有减免资格
//		swordAlert("温馨提示：本属期该纳税人是增值税一般纳税人，不应享受该减免。");
//		return "1";
//	}else if(hasPhjmzg == "Y"){//有减免资格
//		return "0";
//	}else if(hasPhjmzg == "X"&&(!$chk(gt3.ctrl)|| xtgn_ctrl.indexOf(gt3.ctrl)==-1)){
//		if(gt3.ctrl=="SB025YhssbCtrl"){
//			return "3";
//		}
//		if(qzDateCheck(skssqq, skssqz, '', '08')=='ok'){//除开房产税和城镇土地使用税，如果
//			swordAlert("该纳税人申报属期内同时存在一般人和小规模两种纳税人状态，若使用该申报功能，系统会全额计算减征额，请自行折算并修改减征额。");
//		}
//		return "2";
//	}else 
		if(hasPhjmzg == "XX"){
		swordAlert("查询不到国税纳税人信息或者国地税纳税人通过纳税人名称匹配不成功。");
		return "2";
	}
	return "0";
}

function resetGridPhjmData(grid, row){
	if($chk(grid) && $chk(row)){
		grid.updateCell(row.getCell("phjmxzDm"), "", "");
		grid.updateCell(row.getCell("phjmswsxDm"), "", "");
		grid.updateCell(row.getCell("phjzbl"), "", "");
		grid.updateCell(row.getCell("phjmse"), "0.0", "0.0");
	}
}

///**
// * 校验普惠减免性质，如果不具有减免资格，则:
// * 【1.如果CS_SB_PHJMPZB配置的是提示监控，则只给出提示，2.如果CS_SB_PHJMPZB配置的是强制监控，则清空减免性质，清空减免性质后的处理逻辑，由各调用者后续自行处理】
// * @param ssjmxzDm 税收减免性质代码
// * @param djxh 登记序号
// * @param skssqq 税款所属期起
// * @param skssqz 税款所属期止
// * @param gridObj 减免性质所在的Grid对象【如果减免性质是在grid中，则传Grid对象】
// * @param jmxzcellObj 减免性质对象【如果减免性质是在grid中，则传row.getCell("***")对象】
// * @param formObj 减免性质所在Form对象【如果减免性质是在form中，则传form对象】
// * @param jmxzName 减免性质数据项名称【如果减免性质是在form中，则传减免性质的名称】
// * @return 0:无需校验或校验通过，1：已提示。2.需强制监控，如果传入了grid或form对象，已强制清空减免性质
// */
//function checkPhjmxzDm(ssjmxzDm,djxh,skssqq,skssqz,gridObj,jmxzcellObj,formObj,jmxzName){
//	if(!$chk(ssjmxzDm)||!$chk(djxh)||!$chk(skssqq)||!$chk(skssqz)){//传入参数空，无需校验
//		return "0";
//	}
//	
//	var istsjk = false;
//	var isqzjk = false;
//	var mydms = ssjmxzDm.split("|");//减免性质代码可能包含税务事项代码
//	var realSsjmxzDm = mydms[0];
//	if(tsjkphjmxzdms.indexOf(realSsjmxzDm)!= -1){
//		istsjk = true;
//	}
//	if(qzjkphjmxzdms.indexOf(realSsjmxzDm)!= -1){
//		isqzjk = true;
//	}
//	if(istsjk || isqzjk){//是普惠减免性质
//		var hasPhjmzg = getPhjmzg(djxh,skssqq,skssqz);
//		if(hasPhjmzg == "N"){//没有减免资格
//			if(istsjk){
//				swordAlert("温馨提示：该纳税人是增值税一般纳税人，不应享受该减免。");
//				return "1";
//			}else if(isqzjk){
//				swordAlert("该纳税人是增值税一般纳税人，不能享受该减免。");
//				if($chk(gridObj) && $chk(jmxzcellObj)){//是Grid
//					gridObj.updateCell(jmxzcellObj, "", "");
//				}else if($chk(formObj)){
//					formObj.setValue(jmxzName, "");
//				}
//				return "2";
//			}
//		} else if(hasPhjmzg == "X"){
//			swordAlert("纳税人属期内部分时段是小规模纳税人，部分时段是一般纳税人。");
//			return "1";
//		}
//	}
//	return "0";
//}

/**
 * 获取普惠减免资格
 * @param djxh 登记序号
 * @param skssqq 税款所属期起
 * @param skssqz 税款所属期止
 * @return Y/N
 */
function getPhjmzg(djxh,skssqq,skssqz){
	if(!$chk(djxh)||!$chk(skssqq)||!$chk(skssqz)){
		return null;
	}
	var key = djxh + skssqq + skssqz;
	var key_phzsbl=key+"phzsbl";
	var key_phjmssqq=key+"phjmssqq";
	var key_phjmssqz=key+"phjmssqz";
	if(!$chk(phjmzgMap)){
		phjmzgMap = new Map();
	}
	var hasPhjmzg = phjmzgMap.get(key);
	var phzsbl=phjmzgMap.get(key_phzsbl);
	var phjmssqq=phjmzgMap.get(key_phjmssqq);
	var phjmssqz=phjmzgMap.get(key_phjmssqz);
	if(!$chk(hasPhjmzg)){//没有缓存的
		var queryBtn = new SwordSubmit();
		queryBtn.pushData("skssqq",skssqq);
		queryBtn.pushData("skssqz",skssqz);
		queryBtn.pushData("djxh",djxh);
		queryBtn.setOptions({
			async:'false',
			mask:'false',
			ctrl:'SBGyCtrl_hasPhjmzg',
			onSuccess:function(req,res){
				hasPhjmzg = res.getAttr("hasPhjmzg");
				var phzsbl=res.getAttr("phzsbl");
				var phjmssqq=res.getAttr("phjmssqq");
				var phjmssqz=res.getAttr("phjmssqz");
				
				//TODO 需要处理小规模起止时间
				phjmzgMap.remove(key);//需要先删除
				phjmzgMap.remove(key_phzsbl);//需要先删除
				phjmzgMap.remove(key_phjmssqq);//需要先删除
				phjmzgMap.remove(key_phjmssqz);//需要先删除
				phjmzgMap.put(key, hasPhjmzg);
				phjmzgMap.put(key_phzsbl, phzsbl);
				phjmzgMap.put(key_phjmssqq, phjmssqq);
				phjmzgMap.put(key_phjmssqz, phjmssqz);
			}
		});
		queryBtn.submit();
	}
	return phjmzgMap;
}

/**
 * 设置Grid种普惠相关信息不可录
 * @param grifNmae
 * @param disableCols 可不传，默认为"bqsfsyxgmyhzc,phjmxzDm,phjzbl,phjmse"
 * @return
 */
function afterInitSkxx(grifNmae, disableCols) {
	var sbGrid = $w(grifNmae);
	var rowDatas = sbGrid.getCurPageGridData().trs;
	var rowCount = sbGrid.rows();
	var rows = sbGrid.dataDiv().getChildren();
	
	if(!$chk(disableCols)){
		disableCols = "bqsfsyxgmyhzc,phjmxzDm,phjzbl,phjmse";
	}
	for (var i = 0; i < rowCount; i++) {
		var row = rows[i];
		var rowData = rowDatas[i];
		var zsxmDm = rowData.getValue("zsxmDm");
		if(zsxmArray.indexOf(zsxmDm)<0){
			var cols = disableCols.split(","); 
			for ( var i = 0; i < cols.length; i++) {
				var colName = cols[i];
				var colCell = row.getCell(colName);
				if($chk(colCell)){
					colCell.disable = "true";
				}
			}
		}
	}
}

/**
 * 设置Grid种普惠相关信息不可录 
 * @param zsxmDm
 * @param row
 * @param disableCols 可不传，默认为"bqsfsyxgmyhzc,phjmxzDm,phjzbl,phjmse"
 * @return
 */
function gridDisable(zsxmDm, row, disableCols){
	if(zsxmArray.indexOf(zsxmDm)<0){
		if(!$chk(disableCols)){
			disableCols = "bqsfsyxgmyhzc,phjmxzDm,phjzbl,phjmse";
		}
		var cols = disableCols.split(","); 
		for ( var i = 0; i < cols.length; i++) {
			var colName = cols[i];
			var colCell = row.getCell(colName);
			if($chk(colCell)){
				colCell.disable = "true";
			}
		}
	}
}

/**
 * 获取普惠减免配置信息（适用于数据项在Grid中的）
 * 
 * @param swjgDm
 *            税务机关代码（可空，税源类的，传税源主管机关）
 * @param skssqq
 *            税款所属期起
 * @param skssqz
 *            税款所属期止
 * @param zsxmDm
 *            征收項目代碼
 * @param
 * @return
 */
function getGridPhjmPzxx(swjgDm, skssqq, skssqz, zsxmDm) {
	var result = null;
	if (!$chk(skssqq) || !$chk(skssqz)) {// 传入参数空
		swordAlert("请先录入税款所属期起止。");
		return false;
	}
	var phjmxzDm = "";
	var phjmswsxDm = "";
	var phjzbl = "";
	var phjmxzDmList;
	var queryBtn = new SwordSubmit();
	queryBtn.pushData("skssqq", skssqq);
	queryBtn.pushData("skssqz", skssqz);
	queryBtn.pushData("swjgDm", swjgDm);
	queryBtn.pushData("zsxmDm", zsxmDm);
	queryBtn.setOptions( {
		async : 'false',
		mask : 'false',
		ctrl : 'SBGyCtrl_getPhjmPzxx',
		onSuccess : function(req, res) {
			result = new Array(4);
			phjmxzDm = res.getAttr("phjmxzDm");
			phjmswsxDm = res.getAttr("phjmswsxDm");
			phjzbl = res.getAttr("phjzbl");
			phjmxzDmList = res.getDataByDataName("phjmxzDmList").data;
			result[0] = phjmxzDm;
			result[1] = phjmswsxDm;
			result[2] = phjzbl;
			result[3] = phjmxzDmList;
		}
	});
	queryBtn.submit();
	if (!$chk(result)) {// 未配置普惠减免性质
		swordAlert("该属期内未查询到有效的普惠减免性质，如需享受增值税小规模纳税人优惠，请检查CS_SB_PHJMPZB配置表。");
	}
	return result;
}

/**
 * 校验财行税纳税人普惠减免资格（适用于数据项在Form中的）
 * @param djxh 登记序号
 * @param skssqq 普惠所属期起
 * @param skssqz 普惠所属期止
 * @param formObj Form 对象（包含：bqsfsyxgmyhzc， phjmxzDm， phjmswsxDm， phjzbl）
 * @return
 */
function checkCxsPhjmzg(djxh, skssqq, skssqz){
	var phjmzgMap = getPhjmzg(djxh,skssqq,skssqz);
	var key = djxh + skssqq + skssqz;
	var key_phzsbl=key+"phzsbl";
	var key_phjmssqq=key+"phjmssqq";
	var key_phjmssqz=key+"phjmssqz";
	var hasPhjmzg=phjmzgMap.get(key);
	return checkPhZg(hasPhjmzg,skssqq,skssqz);
}
