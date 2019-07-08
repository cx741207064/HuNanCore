var nsrxxVO = {}; // 缓存纳税人主体数据信息
var nsrxxJsonVO = {}; // 缓存纳税人主体json对象,解决弹出纳税人选择框后引用对象失效,无法在自己JS里面通过JSON.encode(nsrxxVO)的问题

/**
 * 点击功能树加载数据初始化方法
 * 
 * @param resData
 * @return
 */
function public_init(resData) {
	nsrxxForm = $w('nsrxxForm');
	var flzlGrid = $w('flzlGrid');

	// 初始化按钮规则（保存按钮设置为灰色、附列资料默认收起、纳税人识别号获取焦点、页面表头数据信息对应）
	$w('sbToolBar').setDisabled('save');
	if (!flzlGrid.collapseDiv.hasClass('x-tool-s')) {
		flzlGrid.toggle();
	}
	nsrxxForm.getFieldEl('nsrsbh').focus();
	nsrxxForm.disable( [ 'nsrmc', 'sbrq1' ]);

	(function() {
		try {
			nsrxxForm.getFieldEl('nsrsbh').focus();
		} catch (err) {
		}
		;
	}).delay(1);
}

/**
 * 
 * 检查是否是Enter键
 */
function isEnterUp(e) {
	var code = e.keyCode ? e.keyCode : e.code;
	return code == 13 || code == 32;
}

/**
 * 查询纳税人信息,skssqq回车后触发
 * 
 * @param e
 * @return
 */

var $_queryNsrxxFlag = 0;// 该标志用于控制不同用例查询单位纳税人还是自然人
function queryNsrxx(e) {
	if (isEnterUp(e)) {
		//var nsrxxFormObj = $w('nsrxxForm');
		//var nsrsbh = nsrxxFormObj.getValue("nsrsbh");
		// cxbz 查询标志：
		// 1.只查询自然人
		// 2.只查询纳税人(需要权限过滤)
		// 3.只查询纳税人(不权限过滤)
		// 4.查询自然人和纳税人（纳税人需要权限过滤）；
		var cxbz = "4";
		if ($_queryNsrxxFlag == 1) {
			cxbz = "2";
		}
		queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, cxbz);
	}
}

/**
 * onFinish时执行，绑定date类型keyup时事件
 * 
 * @return
 */
function addEventForDate() {
	$w("nsrxxForm").getFieldEl('skssqq').addEvent("keyup", function(e) {
		var flag = true;
		if (pc.calendar && pc.calendar.dateInput.get('show') == "true") {
			flag = false;
		}
		if (isEnterUp(e) && flag) {
			queryNsrxx(e);
		}

	});
}

/**
 * 纳税人识别号校验，必填
 * 
 * @param el
 * @param v
 * @returns {___anonymous24909_24911}
 */
function rklxDmCheck(el, v) {
	var result = {};
	if (v == "") {
		// state值必须为false,否则不显示提示信息
		result["state"] = false;
		// msg为错误的提示信息
		result["msg"] = "请输入纳税人识别号";
		nsrxxForm.getFieldEl('nsrsbh').focus();
	}
	return result;
}
/**
 * 查询纳税人信息成功回调函数
 * 
 * @param nsrParam
 *            纳税人信息返回参数
 * @param zrrParam
 *            自然人信息返回参数
 * @return
 */
var $_cshFlag = 1; // 1 初始化 0 不初始化
function queryNsrxxSuccess(nsrParam, zrrParam) {
	var nsrxxForm = $w("nsrxxForm");
	if ((nsrParam == "" || nsrParam == null || nsrParam == undefined)
			&& (zrrParam == "" || zrrParam == null || zrrParam == undefined)) {
		swordAlert("未能根据当前纳税人识别号查询到当前纳税人基本数据信息，请重新输入！", {
			// 确定：所属期起获得焦点
				onOk : function() {
					(function() {
						nsrxxForm.getFieldEl("nsrsbh").focus();
					}).delay(500);
					nsrxxForm.setValue("nsrsbh", "");
				}
			});
		return;
	}
	var nsrxxParam=null;
	if (nsrParam != "" && nsrParam != null && nsrParam != undefined) {
		nsrxxParam = nsrParam;
	} else if (zrrParam != "" && zrrParam != null && zrrParam != undefined) {
		nsrxxParam = zrrParam;
	}

	// 开始遍历
	for ( var prop in nsrxxParam) {
		if (typeof (nsrxxParam[prop]) == " function ") { // 方法
			nsrxxParam[prop]();
		} else { // p 为属性名称，nsrParam[p]为对应属性的值
			nsrxxVO[prop] = nsrxxParam[prop].value;
		}
	}
	
	if (zrrParam != "" && zrrParam != null && zrrParam != undefined) {
		gt3.zrrBz="Y";
		$("zrrTR1").style.display = "block";
		$("zrrTR2").style.display = "block";
		nsrxxForm._itemSwitch("hyDm", "pulltree", {
					'rule' : 'must'
				});
		nsrxxForm._itemSwitch("xzqhszDm", "pulltree", {
					'rule' : 'must'
				});
		nsrxxForm._itemSwitch("jdxzDm", "select", {
					'rule' : 'must'
				});
		nsrxxForm._itemSwitch("zgswskfjDm", "pulltree", {
					'rule' : 'must'
				});
		nsrxxForm._itemSwitch("dwlsgxDm", "select", {
					'rule' : 'must'
		});
		nsrxxForm.setValue("hyDm", "9419");
	}else {
		gt3.zrrBz="N";
		$("zrrTR1").style.display = "none";
		$("zrrTR2").style.display = "none";
		nsrxxForm._itemSwitch("hyDm", "pulltree", {
					'rule' : '',
					'value' : ''
				});
		nsrxxForm._itemSwitch("xzqhszDm", "pulltree", {
					'rule' : '',
					'value' : ''
				});
		nsrxxForm._itemSwitch("jdxzDm", "select", {
					'rule' : '',
					'value' : ''
				});
		nsrxxForm._itemSwitch("zgswskfjDm", "pulltree", {
					'rule' : '',
					'value' : ''
				});
		nsrxxForm._itemSwitch("dwlsgxDm", "select", {
			'rule' : '',
			'value' : ''
		});
	}
	
	var yhssbGrid = $w("yhssbGrid");
	yhssbGrid.console().getElements('input[type=button]:not([fenye=true])').each(
			function(el) {
				yhssbGrid.disableConsoleBtn(el, false);
			});
	
	nsrxxForm.setValue('nsrmc', nsrxxVO['nsrmc']);
	nsrxxJsonVO = JSON.encode(nsrxxVO);
	gt3.djxh=nsrxxVO.djxh;
	//加载纳税人类型和身份证件号码
	if("N" == gt3.zrrBz){
		nsrxxForm.setValue("nsrlx", "0");
		nsrxxForm.setValue("sfzjhm", nsrParam.fddbrsfzjhm.value);
		nsrxxForm.setValue("sfzjlxDm", nsrParam.fddbrsfzjlxDm.value);
		nsrxxForm.disable("sfzjlxDm");
		nsrxxForm.disable("sfzjhm");
		//调用加载纳税人主附行业方法
		reloadNsrzfhy(nsrxxVO.djxh, nsrxxVO.hyDm);
	}
	else{
		nsrxxForm.setValue("nsrlx", "1");
		nsrxxForm.setValue("sfzjhm", zrrParam.zjhm.value);
		nsrxxForm.setValue("sfzjlxDm", zrrParam.zjzlDm.value);
		nsrxxForm.setValue("dwlsgxDm", "90");
	}
	//加载登记注册类型
	nsrxxForm.setValue("djzclxDm", nsrxxVO.djzclxDm);	

	// 纳税人状态监控
	var nsrztDm = nsrxxVO.nsrztDm;
	if (nsrztDm == "07") {
		swordAlert("纳税人为注销状态，请先办理重新税务登记！");
		//nsrxxForm.disable('skssqz');
		return;
	} else if (nsrztDm == "08") {
		swordAlert("纳税人为非正常户注销状态，请先办理重新税务登记！");
		// nsrxxForm.disable('skssqz');
		return;
	} else if (nsrztDm == "04") {// 停业控制纳税人为停业状态且申报属期内全月停业,不允许进行申报
		// swordAlert("本纳税人在本属期内停业。");
		// nsrxxForm.disable('skssqz');
		// return;
	} else if (nsrztDm == "05") {
		swordAlert("纳税人处于非正常户状态，可继续进行申报，请尽快进行非正常户解除。");
	} else if (nsrztDm == "06") {
		swordAlert("纳税人处于清算状态，可继续进行申报。");
	}

	// 导入时，获取页面初始化数据
	if (typeof getSbdrInitData != 'undefined'
			&& getSbdrInitData instanceof Function) {
		getSbdrInitData();
	}

	// 导入时，不能执行changeSbssqz()
	if ($_cshFlag == 1) {
		nsrxxForm.enable('skssqq');
		changeSsqq();
		
	} else{
		$_cshFlag = 1;
	}
}

/**
 * 加载纳税人主附行业
 * @param djxh
 * @return
 */
function reloadNsrzfhy(djxh, hyDm){
	var submitBtn = new SwordSubmit();
	submitBtn.pushData("djxh", djxh);
	submitBtn.pushData("hyDm", hyDm);
	submitBtn.setCtrl(ctrl + "_reloadNsrzfhy");
	submitBtn.setFunction("onSuccess", "reloadNsrzfhySuc");
	submitBtn.submit();
}

/**
 * 加载纳税人主附行业成功回调
 * @param req
 * @param res
 * @return
 */
function reloadNsrzfhySuc(req, res){
	var zhyDm = res.getAttr("zhyDm");
	var zhyMc=res.getAttr("zhyMc");
	if($chk(zhyMc)){
		$w('nsrxxForm').setValue("hyDm", "code,"+zhyDm+"|caption,"+zhyMc);
	}

}

/**
 * 修改税款所属期起事件触发
 * 
 * @param a
 * @param b
 * @return
 */
function checkSkssqz() {
	var skssqq = $w('nsrxxForm').getValue("skssqq");
	var skssqz = $w('nsrxxForm').getValue("skssqz");
	var sbrq = $w('nsrxxForm').getValue("sbrq1");
	
	
	var nsqxdm = yhsnsqxDm;
//	if (nsqxdm != null && nsqxdm != undefined) {
//		if (checkDate3(skssqq, skssqz, sbrq, nsqxdm)) {
//			var ssqzBtn = new SwordSubmit();
//			ssqzBtn.setCtrl(ctrl + "_changeSbssqq");
//			ssqzBtn.setFunction('onSuccess', 'loadBaseInfo');
//			ssqzBtn.pushData('nsrxxVO', JSON.encode(JSON.decode(nsrxxJsonVO)));
//			ssqzBtn.pushData($w("nsrxxForm").getSubmitData());
//			ssqzBtn.pushData("lybz", gt3.lybz);//HAD41_201604150036 印花税按次申报所属期起止可以修改为任意一天 2016-04-25
//			ssqzBtn.pushData('zrrBz', gt3.zrrBz);
//			ssqzBtn.pushData("gt3nsqx", gt3_nsqx);
//			ssqzBtn.pushData("uniqueNsqx", nsqxdm);
//			ssqzBtn.submit();
//		}
//	} else {
	if(gt3.djxh==undefined || gt3.djxh==null || gt3.djxh==""){
		return;
	}
		var ssqzBtn = new SwordSubmit();
		ssqzBtn.setCtrl(ctrl + "_changeSbssqq");
		ssqzBtn.setFunction('onSuccess', 'loadBaseInfo');
		ssqzBtn.setFunction('onError', "sb025OnError");
		
		ssqzBtn.pushData('nsrxxVO', JSON.encode(JSON.decode(nsrxxJsonVO)));
		ssqzBtn.pushData($w("nsrxxForm").getSubmitData());
		ssqzBtn.pushData('zrrBz', gt3.zrrBz);
//		ssqzBtn.pushData("lybz", gt3.lybz);//HAD41_201604150036 印花税按次申报所属期起止可以修改为任意一天 2016-04-25
		ssqzBtn.pushData("uniqueNsqx", yhsnsqxDm);
		ssqzBtn.submit();
//	}
}
function sb025OnError(){
	$w('sbToolBar').setDisabled('save');
}
//改变税款所属期起止时需要的校验函数，return true和false
function checkDate3(skssqq, skssqz, sbrq1, nsqxdm) {
	var qDates = splitStr(skssqq);// 年月日的数组
	var zDates = splitStr(skssqz);// 年月日的数组
	var succMsg = "ok";
	if (!compareDate2(skssqq, skssqz)) {
		swordAlert("所属期起不能大于所属期止!");
		return false;
	}
	if (skssqq == undefined || skssqq == "") {
		swordAlert("所属期起不能为空!");
		return false;
	}
	if (skssqz == undefined || skssqz == "") {
		swordAlert("所属期止不能不能为空!");
		return false;
	}
	if (nsqxdm != "11" && parseInt(qDates[0], 10) != parseInt(zDates[0], 10)) {
		swordAlert("必须为同一年");
		return false;
	}
	if (nsqxdm == "06") { // 按月return值开头为2
		if (parseInt(qDates[1], 10) != parseInt(zDates[1], 10)) {
			swordAlert("按月申报，所属期起和所属期止必须在同一个月！");
			return false;
		}
		if (parseInt(qDates[2], 10) != 1) {
			swordAlert("按月申报，所属期起必须为某月的第一天！");
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			swordAlert("按月申报，所属期止必须为某月的最后一天！");
			return false;
		}
		return true;
	} else if (nsqxdm == "08") { // 按季度return值开头为3
		// 季度信息
		if (!(parseInt(qDates[2], 10) == 1)) {
			swordAlert("按季申报，所属期起必须为某季度的第一天！");
			return false;
		}		
		if (!(zDates[2] == monthDay(zDates[0], parseInt(zDates[1], 10)))
				|| (zDates[1] - qDates[1] + 1) > 3) {			
			swordAlert("按季申报，所属期起止间隔不能超过3个月！");
			return false;
		}		
		if (!((parseInt(qDates[1], 10) >= 1 && parseInt(qDates[1], 10) <= 3 && parseInt(
				zDates[1], 10) <= 3)
				|| (parseInt(qDates[1], 10) >= 4
						&& parseInt(qDates[1], 10) <= 6 && parseInt(zDates[1],
						10) <= 6)
				|| (parseInt(qDates[1], 10) >= 7
						&& parseInt(qDates[1], 10) <= 9 && parseInt(zDates[1],
						10) <= 9) || (parseInt(qDates[1], 10) >= 10
				&& parseInt(qDates[1], 10) <= 12 && parseInt(zDates[1], 10) <= 12))) {
			swordAlert("按季申报，所属期起和所属期止必须在同一个季度！");
			return false;
		}

		return true;
	} else if (nsqxdm == "09") { // 按半年return值开头为4
		if (!(parseInt(qDates[2], 10) == 1)) {
			swordAlert("按半年申报，所属期起必须为某半年的第一天！");
			return false;
		}
		if (!(zDates[2] == monthDay(zDates[0], parseInt(zDates[1], 10)))
				|| (zDates[1] - qDates[1] + 1) > 6) {
			swordAlert("按半年申报，所属期起止间隔不能超过6个月！");
			return false;
		}		
		if (!((parseInt(qDates[1], 10) >= 1 && parseInt(qDates[1], 10) <= 6 && parseInt(
				zDates[1], 10) <= 6) || (parseInt(qDates[1], 10) >= 7
				&& parseInt(qDates[1], 10) <= 12 && parseInt(zDates[1], 10) <= 12))) {
			swordAlert("按半年申报，所属期起和所属期止必须同属于1-6月或7-12月！");
			return false;
		}

		return true;
	} else if (nsqxdm == "10") { // 按年return值开头为5
		if (qDates[0] != zDates[0]) {
			swordAlert("按年申报，所属期起和所属期止必须在同一年！");
			return false;
		}
		return true;
	}
	else if(nsqxdm == "11"){
		return true;
	}
	else {
		if (qDates[0] != zDates[0]) {// return值开头为0
			swordAlert("所属期起和所属期止必须在同一年!");
			return false;
		}
		return true;
	}
}
