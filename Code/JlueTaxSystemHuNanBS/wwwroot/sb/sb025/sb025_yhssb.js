var ctrl = 'SB025YhssbCtrl';// 定义全局CTRL
var gt3_yjxxList = null;
var gt3_jmxxList = null;
var gt3_newsbxxList = null;
var gt3_nsqx = null;
var gt3_cwgzMap = null;
var sb025_cszForXML;
var gt3_cszForXML;
var sb025_pxzh = null;
var gt3 = {};
gt3.zxbztzsuuid = "";// 自行补正通知书UUID
gt3.djxh;
var kdqsssrfpbz;
var yhskg = "N";// 优化网上办税系统的印花税申报优惠提醒服务ZOG00_201808090001
var zspmArray = new Array();
var gt3_sbxxList;// 申报信息列表
var gt3_yhshdList;// 印花税核定信息列表
gt3.zsxmDm = "10111";// 印花税
gt3.zrd = "";// 税费种认定标记，默认有税费种认定
gt3.zrrBz = ""; // 自然人标记
gt3.type = ""; // 调用changeSbssqz方法的参数
var yzpzxh = "";
gt3.uniqueNsqx = ""; // 如果认定多个纳税期限，一次只能申报一个
gt3.nsqxList = "";
gt3.ctrl = "SB025YhssbCtrl";
gt3.lybz = "1";// HAD41_201604150036 印花税按次申报所属期起止可以修改为任意一天 2016-04-25
var _arrVars_NOywpt = {};
var zspmDefJmxxMap = new Map();
gt3.DrYhssbGrid = null;
var cszfj = "";// 允许申报"其它营业账簿（101110599）或权利许可证照（101110400）"，并提示纳税人去大厅进行申报并领取印花税票，福建专用。
var qtpzCs = "";// 其他凭证是否提示
var gzsekg;// 更正开关
var ybtseyz;// 原应补退税额
var yhsnsqxDm = "06";
var phjzbl = 0.00;// 普惠减征比例
var bqsfsyxgmyhzc = "";// 本期是否适用小规模优惠政策
var sfsyzs = "";// 是否享用折算
var nsqx2zszg = "";// 纳税期限对折算资格
var phzsbl = 0.00;// 折算比例
var phjmzg = "";
var nsrzgsfxgm = "";
var yqwrdybrBz = "";
// 是否启用导出按钮 by:张俊，2019年3月20日11:30:56
var isEnableExportButton = "";
var nmg_qz = "N";//内蒙特色需求（签章）

/**
 * 点击功能树加载数据初始化方法
 * 
 * @param resData
 * @return
 */
var htmdyzkg = "N";// 是否启用新版打印 网报
var drxzdrmbkg = "Y";// 印花税申报（导入、下载导入模版）是否屏蔽开关
function init(resData) {
	nmg_qz = resData.getAttr("nmg_qz", resData);
	nmxtcs = resData.getAttr("nmxtcs");
	// 调用此方法隐藏“申报错误更正”按钮
	hidecwgzbtn();
	// 从res中获取skssqqNew、skssqzNew参数，如果存在值，则调整页面属期 by:张俊，2018年12月28日09:38:02
	var skssqqNew = resData.getAttr("skssqqNew");
	var skssqzNew = resData.getAttr("skssqzNew");
	if ($chk(skssqqNew) && $chk(skssqzNew)) {
		$w("nsrxxForm").setValue("skssqq", skssqqNew);
		$w("nsrxxForm").setValue("skssqz", skssqzNew);
	}
	jspt_czsm_butncontrol("sbToolBar", "SB025_00");// 填表说明
	gzsekg = resData.getAttr("gzsekg"); // 网报更正税额开关
	htmdyzkg = resData.getAttr("htmdyzkg"); // 网报打印参数
	drxzdrmbkg = resData.getAttr("drxzdrmbkg"); // 网报打印参数
	// 是否启用导出按钮 by:张俊，2019年3月20日11:30:56
	isEnableExportButton = resData.getAttr("isEnableExportButton");
	// 网报特有代码start ++++++++++
	if ($chk(resData.getAttr("sbgnxts"))) {
		$('sbgnxts').innerHTML = resData.getAttr("sbgnxts");// 网报特有逻辑
	}
	var diqu = resData.getAttr("diqu");
	var gridConsole = $w('yhssbGrid').console();
	var csz = resData.getAttr("csz");
	cszfj = resData.getAttr("cszfj");
	qtpzCs = resData.getAttr("qtpzCs");
	yhskg = resData.getAttr("yhskg");
	var nxwrdbz = resData.getAttr("nxwrdbz");
	if ("Y" == nxwrdbz) {// 宁夏无税费种认定给出提示
		$w("yhssbGrid").reset();
		swordAlert("没有可申报的税费种认定信息！");
		return;
	}
	var yhsnsqxkg = "N"; // 默认为N
	yhsnsqxkg = resData.getAttr("yhsnsqxkg");
	// 网上办税系统的印花税申报时纳税期限是否隐藏
	if (yhsnsqxkg == "Y") {
		document.getElementById("zrrTR3").style.display = "block";
		// document.getElementsByName("nsqxkg").style.display="block";
		// document.getElementById("nsqxkg").css('display','block');
	}
	if (drxzdrmbkg = "Y") {
		$$("div[name='import']")[1].style.display = "none";
		$$("div[name='download']")[1].style.display = "none";
	}
	if ("Y" == csz) {
		if ("Y" == qtpzCs) {
			swordAlert("如果需要申报 （101110599）|其他营业账簿 或 （101110400）|权利、许可证照 或 （101119800）|其他凭证 这三个品目，请到大厅进行申报并领取印花税票。");
		} else {
			swordAlert("如果需要申报 （101110599）|其他营业账簿 或 101110400）|权利、许可证照 这两个品目，请到大厅进行申报并领取印花税票。");
		}
	} else if ("Y" == qtpzCs) {
		swordAlert("如果需要申报（101119800）|其他凭证 品目，请到大厅进行申报并领取印花税票。");
	}
	if ("Y" == cszfj) {// 允许申报"其它营业账簿（101110599）或权利许可证照（101110400）"，并提示纳税人去大厅进行申报并领取印花税票，福建专用。
		swordAlert("如果需要领取印花税票贴花，请前往办税服务厅进行相关应税凭证的申报并领取印花税票。");
	}
	var zdyTsnr = resData.getAttr("zdyTsnr"); // 进入印花税申报模块后提示框内容
	if ($chk(zdyTsnr)) {
		swordAlert(zdyTsnr);
	}
	initPhjmxzDms(resData);

	sb025_cszForXML = resData.getAttr("cszForXML");// xml的参数值
	if (sb025_cszForXML != null && sb025_cszForXML != undefined) {
		if (sb025_cszForXML == "SBCWGZ") {// 错误更正
			cwgzbz = 'cwgzbz';
			bqsfsyxgmyhzc = $w('nsrxxForm').getValue("bqsfsyxgmyhzc").code;
			var phjmxzDm = resData.getAttr("phjmxzDm");
			$w('nsrxxForm').setValue("phjmxzDm", phjmxzDm);
			ybtseyz = resData.getAttr("ybtseyz"); // 网报应补退税额原值
			gt3_yhshdList = pc.getResData("yhshdList", resData);
			kdqsssrfpbz = resData.getAttr('kdqsssrfpbz');
			gt3.zrd = resData.getAttr('zrd');// 税费种认定标记
			gt3.zrrBz = resData.getAttr('zrrBz');
			XMLForSBCWGZ(resData);
			if (bqsfsyxgmyhzc == "Y") {
				checkzszg();
			}
			var flzlGrid = $w('flzlGrid');
			if (!flzlGrid.collapseDiv.hasClass('x-tool-s')) {
				flzlGrid.toggle();
			}
			_arrVars_NOywpt['yqtfpGrid'] = pc.getResData("yqtfpGrid", resData);
			$w('sbToolBar').setDisabled('import');// 点亮保存按钮
			$w('sbToolBar').setEnabled('print');
			if ("sbbck" == resData.getAttr("scenceCs")) {
				$w('sbToolBar').setDisabled('save');// 置灰保存按钮
				$w('sbToolBar').setDisabled('import');
				$w("nsrxxForm").disable();
				$w("slxxForm").disable();
				$w("yhssbGrid").readonly();
			}

			// 电子税务局特色改造，判断纳税人是否享受普惠减免 start
			nsrzgsfxgm = resData.getAttr("nsrzgsfxgm");
			if ("Y" == nsrzgsfxgm) {
				$w("nsrxxForm").setValue("bqsfsyxgmyhzc", "Y");
			} else {
				$w("nsrxxForm").setValue("bqsfsyxgmyhzc", "N");
			}
			// zzsxgmnsr();//去掉自动计算的问题普惠被自动计算了
			// 电子税务局特色改造，判断纳税人是否享受普惠减免 end
		} else if ("sbbck" == sb025_cszForXML) {// 申报表单查看
			var nsrxxForm = $w('nsrxxForm');
			var zrrBz = resData.getAttr("zrrBz");
			if ($chk(zrrBz) && "Y" == zrrBz) {
				$("zrrTR1").style.display = "block";
				$("zrrTR2").style.display = "block";
				$("zrrTR3").style.display = "block";
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
			}
			var flzlGrid = $w('flzlGrid');
			if (!flzlGrid.collapseDiv.hasClass('x-tool-s')) {
				flzlGrid.toggle();
			}
			$w("nsrxxForm").disable();
			$w("slxxForm").disable();
			$$("div[sword='SwordToolBar']").each(function(o) {
				var n = o.get("name");
				if (n) {
					o.getElements("div[type]").each(function(i) {
						var type = i.get("type");
						var iname = i.get("name");
						if (iname != "print") {
							$w(n).setHide(iname);
						} else {
							$w(n).setEnabled(iname);
						}
					});
				}
			});
			$w("yhssbGrid").readonly();
			// 控制导出按钮是否可用 by:张俊，2019年2月18日17:08:41
			controlExportButton();
			return;
		}
	} else {
		public_init(resData);
		// 设置表头默认数据信息
		var nsrxxFormInit = pc.getResData("nsrxxForm", resData);
		var slxxForm = pc.getResData("slxxForm", resData);
		var data = {};
		data = nsrxxFormInit.value;
		sbrqInit = nsrxxFormInit.data.sbrq1.value;
		skssqqInit = nsrxxFormInit.data.skssqq.value;
		skssqzInit = nsrxxFormInit.data.skssqz.value;
		var slxxForm1 = $w("slxxForm");
		// slxxForm1.setValue('slr', slxxForm.data.slrDm.value);
		// slxxForm1.setValue('slswjg', slxxForm.data.slswjgDm.value);
		$w("sbToolBar").setEnabled('export');
		// $w("sbToolBar").setEnabled('save');
		$w("sbToolBar").setDisabled('printYhs');
		var yhssbGrid = $w("yhssbGrid");
		yhssbGrid.console().getElements('input[type=button]:not([fenye=true])')
				.each(function(el) {
					yhssbGrid.disableConsoleBtn(el, true);
				});
		var nsrsbh = $w("nsrxxForm").getValue('nsrsbh');
		var cxbz = "4";
		if ($_queryNsrxxFlag == 1) {
			cxbz = "2";
		}
		queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, cxbz);
		var xtcsForDate = isEnableSkssq("BDA0610794");
		if ($chk(xtcsForDate) && xtcsForDate == "Y") {
			$w("nsrxxForm").disable([ "skssqq", "skssqz" ]);
		}
	}
	var dlr = $w("slxxForm").getValue("dlr");
	if (dlr != "") {
		$w("slxxForm")._itemSwitch("dlrsfzjzlDm1", "select", {
			'rule' : 'must'
		});
		$w("slxxForm")._itemSwitch("dlrsfzjhm1", "text", {
			'rule' : 'must'
		});
	}
	var bz = isEnableZcbb("BDA0610794");
	if ($chk(bz) && bz == "Y") {
		$w('nsrxxForm').enable('sblx');
	}
	// 控制导出按钮是否可用 by:张俊，2019年2月18日17:08:41
	controlExportButton();
	// debugger;
}
// 申报导入处理方法
function drxx() {
	var gydrctrl = ctrl + "_getDrxx";// 导入处理自定义的ctrl
	var drxxBtn = new SwordSubmit();
	drxxBtn.pushData('gydrCtrl', gydrctrl);
	drxxBtn.setCtrl('GYDrCtrl_openDr');// 公用导入方法
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

// 导入功能页面表单数据信息回填方法
function boxCallBackForSBdr(resData) {
	resData = JSON.decode(JSON.encode(resData));
	var msg = resData.getAttr("msg");
	if ($chk(msg)) {
		swordConfirm("导入数据校验失败，" + "是否获取日志？", {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				WriteTxt(msg);
			}
		});
		return;
	}
	// 修改此时的申报渠道属性
	gt3_cszForXML = "sbdr";

	// 页面表单头部信息全部置灰并将所有页面表单锁死不允许填写
	// $w("nsrxxForm").disable();
	// 获得主表三个表单元素并将其回写页面
	var yhssbGrid = pc.getResData("yhssbGrid", resData);
	var nsrxxForm = pc.getResData("nsrxxForm", resData);
	var fjxxForm = pc.getResData("fjxxForm", resData);
	var nsrxxmc = nsrxxForm.data.nsrmc.value;
	$w("slxxForm").setValue('slr', nsrxxmc);
	// $w("yhssbGrid").reset();
	// cwgzInsertRowData(yhssbGrid);
	gt3.DrYhssbGrid = yhssbGrid;
	$w("nsrxxForm").initData(nsrxxForm);
	$_cshFlag = "0";
	var yhssbGrid = $w("yhssbGrid");
	yhssbGrid.console().getElements('input[type=button]:not([fenye=true])')
			.each(function(el) {
				yhssbGrid.disableConsoleBtn(el, true);
			});

	var nsrxxFormObj = $w('nsrxxForm');
	var nsrsbh = nsrxxFormObj.getValue("nsrsbh");
	var cxbz = "4";// 4.查询自然人和纳税人（纳税人需要权限过滤）；
	queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, cxbz);
	// $w("yhssbGrid").readonly();// 导入数据不可编辑
}
/**
 * 导入日志的展示
 * 
 * @return
 */
function WriteTxt(drycxx) {
	swordAlertDiv(drycxx, {
		width : 800,
		height : 500
	});
}

/**
 * 导入时，获取页面初始化数据
 * 
 * @return
 */
function getSbdrInitData() {
	if (gt3_cszForXML == "sbdr") {
		$w("yhssbGrid").reset();
		bqsfsyxgmyhzc = $w("nsrxxForm").getValue("bqsfsyxgmyhzc").code;
		if (bqsfsyxgmyhzc == "Y") {
			checkzszg();
		}
		cwgzInsertRowData(gt3.DrYhssbGrid, "Y");
		// 恢复为空
		gt3.DrYhssbGrid = null;
	}
}

// 将弹出的通知书页面选择后的uuid写入到申报页面 然后将保存设置为可用，这是个回调函数
function setNsrzcbbtzsUUID(uuid) {
	if (uuid == "0")
		$w("nsrxxForm").setValue("sblx", "11");
	else
		gt3.zxbztzsuuid = uuid;
}

function nextOne() {
	$w('yhssbGrid').reset();
	$w('nsrxxForm').setValue('nsrsbh');
	$w('nsrxxForm').setValue('nsrmc');
	$w('slxxForm').setValue('slr');
}

/**
 * 从表单跳出到表格（noNextEvent）
 */
function toGrid() {
	if ($w("yhssbGrid").totalRows() == 0) {
		$w("yhssbGrid").insertRow();
	}
	$w("yhssbGrid").setCellFocus(1, "se");
}
/**
 * 从表格跳出到表单（noNextEvent）
 */
function toForm() {
	var firstEl = $w("slxxForm").getFieldEl("bsr");
	firstEl.focus();
}

/**
 * 载入基础数据，更改所属期回调函数
 * 
 * @param reData
 * @param
 */
function loadBaseInfo(req, resData) {
	// 将受理人SET到页面中，获取登记信息中的办税人姓名
	$w("slxxForm").setValue('bsr', nsrxxVO.bsrxm);
	nsrzgsfxgm = resData.getAttr("nsrzgsfxgm");
	phzsbl = resData.getAttr('phzsbl');
	$w("nsrxxForm").setValue("phjmxzDm", "");
	$w("nsrxxForm").setValue("phjzbl", "");
	$w("nsrxxForm").setValue("phjmswsxDm", "");
	$w('yhssbGrid').reset();
	kdqsssrfpbz = resData.getAttr("kdqsssrfpbz", resData);
	var nsrmc = nsrxxVO.nsrmc;
	gt3.djxh = nsrxxVO.djxh;
	$w("sbToolBar").setEnabled('save');
	gt3_nsqx = resData.getAttr('nsqxDm');
	gt3_sbxxList = pc.getResData("sbxxvoList", resData);
	gt3_jmxxList = pc.getResData("jmxxList", resData);
	gt3_yjxxList = pc.getResData("yjxxList", resData);
	gt3_yhshdList = pc.getResData("yhshdList", resData);
	gt3_newsbxxList = pc.getResData("newsbxxList", resData);
	gt3.zrd = resData.getAttr('zrd');// 税费种认定标记
	if (gt3_newsbxxList != null && gt3_newsbxxList != undefined
			&& gt3_newsbxxList != "") {
		for ( var j = 0; j < gt3_newsbxxList.trs.length; j++) {
			yhts(gt3_newsbxxList.trs[j].tds.zspmDm.value);
		}
		var sbxxListTds = gt3_newsbxxList.trs;
		if (sbxxListTds.length > 0) {
			gt3.uniqueNsqx = sbxxListTds[0].tds.nsqxDm.value;
			// 查询过税费中认定默认增加行数
			InitJs(gt3_newsbxxList);
		} else {
			addRow();
		}
	}
	// 自查补报
	changeSblx();

	// 电子税务局特色改造，判断纳税人是否享受普惠减免 start
	if (nsrzgsfxgm == "N") {
		$w('nsrxxForm').setValue("bqsfsyxgmyhzc", "N");
	} else if (nsrzgsfxgm == "Y") {
		$w("nsrxxForm").setValue('bqsfsyxgmyhzc', "Y");
	} else if (nsrzgsfxgm == "X"){
		// 辽宁外省跨区税源户默认值置为空
		$w("nsrxxForm").setValue('bqsfsyxgmyhzc', "");
	} else {
		$w("nsrxxForm").setValue('bqsfsyxgmyhzc', "Y");
		sfsyzs = "Y";
	}
	zzsxgmnsr();
	// 电子税务局特色改造，判断纳税人是否享受普惠减免 end
}

/**
 * 核定比例过滤
 * 
 * @param dataObj
 * @param inputEl
 * @param obj
 * @return
 */
function hdblFilter(dataObj, inputEl, obj) {
	var newData = [];// 新列表数据
	var row = $w("yhssbGrid").getRow(inputEl);
	if (!$chk(row)) {
		dataObj.each(function(item, index) {
			newData[newData.length] = item;
		});
		return dataObj;
	}
	var rowData = $w("yhssbGrid").getOneRowData(inputEl);
	var zspmDm = rowData.getValue("zspmDm");
	var hdzsHdbl = rowData.getValue("hdzsHdbl");
	dataObj.each(function(item, index) {
		if (parseFloat(hdzsHdbl, 10) > 0) {
			if (item.zspmDm == zspmDm) {
				newData[newData.length] = item;
			}
		} else {
			if (item.zspmDm == zspmDm) {
				newData[newData.length] = item;
			}
		}
	});
	return newData;
}

/**
 * 修改申报类型成功返回
 * 
 * @return
 */
function initsblxOnSuccess(req, resData) {

}

/**
 * 修改税款所属期起事件成功返回所属期以及填写表单
 * 
 * @return
 */
function querySuccess(req, res) {
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
 * 保存。
 * 
 * @return
 */
function declare() {
	var grid = $w("yhssbGrid");
	if (gzsekg == "Y" && sb025_cszForXML == "SBCWGZ") {// 申报错误更正只昜大不更小 内蒙地税需求
		// 2018-05-14
		var ynsehj = grid.getHj("bqybtse");
		if (ynsehj.round(2) < ybtseyz.round(2)) {
			swordAlert("申报更正金额小于原申报金额，请到办税服务厅办理");
			return;
		}
	}
	swordConfirm("您是否确认填写无误，提交申报?", {
		onOk : function() {
			save();
		},
		onCancel : function() {
			return;
		}
	});
}
function save() {
	if (!$w("yhssbGrid").validate() || !$w("nsrxxForm").validate()) {
		return;
	}
	var slxxForm = $w("slxxForm");
	if (!$w('slxxForm').validate()) {
		return;
	}
	// ZOG00_201604130040 优化列表删除校验 2016-04-13 begin
	// var children = $w('yhssbGrid').dataDiv().getChildren();
	var children = $w('yhssbGrid').getAllNoDeleteGridData().trs;
	// ZOG00_201604130040 优化列表删除校验 2016-04-13 end
	var yhssbGrid = $w("yhssbGrid").getAllNoDeleteGridData();
	if (children.length < 1) {
		swordAlert("请至少填写一条申报表数据");
		return;
	}
	if (jyyqtfb()) {
		swordAlert("油气田企业税款分配表中存在必录项未填写,或者存在已分配应补退税额合计不等于分配前应补退税额合计的记录,请修改");
		return;
	}
	// 校验表头税款所属期是否与申报表中的纳税期限相符
	var btnsqx = getNsqxDm($w("nsrxxForm").getValue("skssqq"), $w("nsrxxForm")
			.getValue("skssqz"));
	var nsqxByhs = "";
	var jmByhs = "";
	if (yhssbGrid.trs.length > 0) {
		for ( var j = 0; j < yhssbGrid.trs.length; j++) {
			// yhts(yhssbGrid.trs[j].tds.zspmDm.value);
			var sbbnsqx = yhssbGrid.trs[j].tds.nsqxDm.value;
			var ssjmxzDm = yhssbGrid.trs[j].tds.ssjmxzDm.value;
			var jmse = yhssbGrid.trs[j].tds.jmse.value;
			if (sbbnsqx != "11" && btnsqx != sbbnsqx) {
				nsqxByhs += " 第" + (j + 1) + "行，纳税期限为" + getNsqxMcByDm(sbbnsqx)
						+ ",";
			}
			if ((!$chk(ssjmxzDm) && $chk(jmse) && parseFloat(jmse) > 0)
					|| ($chk(ssjmxzDm) && (!$chk(jmse) || parseFloat(jmse) == 0))) {
				jmByhs += (j + 1) + ",";
			}
		}
	}
	if ($chk(nsqxByhs)) {
		nsqxByhs = nsqxByhs.substring(0, nsqxByhs.length - 1);
		swordAlert("["
				+ nsqxByhs
				+ " ]，与纳税人信息中所属时期起止不符，不允许申报。（请检查税（费）种认定信息或者参数表cs_dj_mrqxgz的配置的纳税期限）");
		return;
	}
	if ($chk(jmByhs)) {
		jmByhs = jmByhs.substring(0, jmByhs.length - 1);
		swordAlert("第[" + jmByhs + "]行违反减免性质和减免税额必须同时为空或同时不为空的原则，请重新填写");
		return;
	}
	// 普惠减免税额
	if (yhssbGrid.trs.length > 0) {
		var bqsfsyxgmyhzc = $w("nsrxxForm").getValue("bqsfsyxgmyhzc").code;
		if (bqsfsyxgmyhzc == "Y") {
			for ( var j = 0; j < yhssbGrid.trs.length; j++) {
				var phjmse = yhssbGrid.trs[j].tds.phjmse.value;
				var bqynse = yhssbGrid.trs[j].tds.bqynse.value;
				var jmse = yhssbGrid.trs[j].tds.jmse.value;
				var bqybtse = yhssbGrid.trs[j].tds.bqybtse.value;
				phjzbl = $w('nsrxxForm').getValue("phjzbl");
				var phjmseJs = calPhjmse(bqynse, jmse, phjzbl);
				if (sfsyzs == "Y") {
					phjmseJs = phjmseJs.multiple(phzsbl / 1);
				}
				phjmseJs = phjmseJs.round(2);
				if (phjmse > phjmseJs) {
					swordAlert(" 第" + (j + 1) + "行" + "增值税小规模纳税人减征额不能大于"
							+ phjmseJs.round(2) + "。");
					return;
				} else if (phjmse < 0) {
					swordAlert(" 第" + (j + 1) + "行" + "增值税小规模纳税人减征额不能小于0。");
					return;
				}
			}
		} else {
			for ( var j = 0; j < yhssbGrid.trs.length; j++) {
				var phjmse = yhssbGrid.trs[j].tds.phjmse.value;
				if (phjmse != 0) {
					swordAlert("当选择不适用增值税小规模纳税人减征优惠时,第" + (j + 1) + "行"
							+ "增值税小规模纳税人减征额必须为0。");
					return;
				}
			}
		}
	}
	// 重复申报
	var StringCfsb = "";
	if (children.length > 0) {
		for ( var i = 0; i < yhssbGrid.trs.length; i++) {
			var msg = yhssbGrid.trs[i].tds.msg.value;
			if ($chk(msg)) {
				StringCfsb = StringCfsb + "第" + (i + 1) + "行,";
			}
		}
	}
	if ($chk(StringCfsb)) {
		swordAlert("印花税申报信息表" + StringCfsb + "存在重复申报");
		return;
	}

	// 校验代理人信息
	var dlr = $w("slxxForm").getValue("dlr");
	var dlrsfzjhm1 = $w("slxxForm").getValue("dlrsfzjhm1");
	// if ($chk(dlr) && !$chk(dlrsfzjhm1)) {
	// swordAlert("请填写代理人身份证号");
	// return;
	// } else if (!$chk(dlr) && $chk(dlrsfzjhm1)) {
	// swordAlert("请填写代理人");
	// return;
	// }

	if (kdqsssrfpbz == "Y") {
		var gridDataObj = {
			"sword" : "SwordGrid",
			"name" : "sbxxGrid",
			"trs" : [ {
				"status" : "",
				"tds" : {
					"zsxmDm" : {
						"value" : ""
					},
					"zspmDm" : {
						"value" : ""
					},
					"skssqq" : {
						"value" : ""
					},
					"skssqz" : {
						"value" : ""
					},
					"ynse" : {
						"value" : ""
					},
					"yjse" : {
						"value" : ""
					}
				}
			} ]
		};
		for ( var i = 0, j = 0; i < yhssbGrid.trs.length; i++, j++) {
			gridDataObj.trs[j] = yhssbGrid.trs[i];
			gridDataObj.trs[j].tds["zsxmDm"] = {
				value : "10111"
			};
			gridDataObj.trs[j].tds["zspmDm"] = {
				value : yhssbGrid.trs[i].tds.zspmDm.value
			};
			gridDataObj.trs[j].tds["skssqq"] = {
				value : $w("nsrxxForm").getValue("skssqq")
			};
			gridDataObj.trs[j].tds["skssqz"] = {
				value : $w("nsrxxForm").getValue("skssqz")
			};
			gridDataObj.trs[j].tds["ynse"] = {
				value : yhssbGrid.trs[i].tds.bqynse.value
			};
			gridDataObj.trs[j].tds["yjse"] = {
				value : yhssbGrid.trs[i].tds.bqyjse1.value
			};
		}

		var kstlBtn = new SwordSubmit();
		kstlBtn.setCtrl("SBGyCtrl_openkdqsssrfpFb");
		kstlBtn.pushData(gridDataObj);
		kstlBtn.pushData("djxh", nsrxxVO.djxh);// 要把登记序号传过来
		// 。SBGyCtrl里没有地方取到这个值。
		swordAlertIframe('', {
			titleName : "跨地区税收收入分配表",
			width : 1000,
			height : 800,
			param : window,
			isNormal : 'true',
			isMax : 'true',
			isClose : 'true',
			isMin : "true",
			submit : kstlBtn
		});
	} else {
		sbbSavejx();
	}
}
function sbbSavejx() {
	gt3.djxh = nsrxxVO.djxh;
	var yhssbGrid = $w("yhssbGrid").getAllNoDeleteGridData();
	var saveBtn = new SwordSubmit();
	saveBtn.setCtrl("SB025YhssbCtrl_saveYhsSbxx");
	saveBtn.setFunction('onSuccess', 'saveOnSuccess');
	saveBtn.pushData($w("nsrxxForm").getSubmitData());
	saveBtn.pushData(yhssbGrid);
	saveBtn.pushData($w("slxxForm").getSubmitData());
	saveBtn.pushData("djxh", gt3.djxh);
	saveBtn.pushData("zrrBz", gt3.zrrBz);
	saveBtn.pushData("hyDm", $w("nsrxxForm").getValue("hyDm"));
	saveBtn.pushData("xzqhszDm", $w("nsrxxForm").getValue("xzqhszDm"));
	saveBtn.pushData("jdxzDm", $w("nsrxxForm").getValue("jdxzDm").code);
	saveBtn.pushData("zgswskfjDm", $w("nsrxxForm").getValue("zgswskfjDm"));
	saveBtn.pushData('zxbztzsuuid', gt3.zxbztzsuuid);
	// 添加油气田附表数据
	var yqtfpGrid = null;
	if (yqtfbopen) {
		try {
			yqtfpGrid = $("yqtfb_iframe").contentWindow.$w("yqtfpGrid")
					.getAllNoDeleteGridData();
		} catch (e) {
		}
	} else {
		yqtfpGrid = _arrVars_NOywpt['yqtfpGrid'];
	}
	saveBtn.pushData(yqtfpGrid);
	if (sb025_cszForXML == "SBCWGZ") {// 错误更正
		saveBtn.pushData(gt3_cwgzMap);
		// 错误更正保存前计税
		if (sbcwgzJs != 'sbcwgzJs') {
			saveBtn.pushData("sbcwgzJs", 'sbcwgzJs');
		} else {
			saveBtn.pushData("sbcwgzJs", 'sbcwgzSv');
		}
	}
	if (gt3_cszForXML == 'sbdr' && !$chk(gt3.djxh)) {
		swordAlert("导入的时候请选择一条纳税人信息!");
		return;
	}
	saveBtn.submit();
}
function nextOne() {
	if (sb025_cszForXML != undefined && $chk(sb025_cszForXML)
			&& 'SBCWGZ' == sb025_cszForXML) {// 错误更正的下一户应该是到错误更正公共的初始化页面
		var test = new SwordSubmit();
		test.options.postType = "form";
		test.setCtrl("SB057SbcwgzCtrl_initView");
		test.submit();
	} else {
		top.$w("tab1").refreshCurrentTabItem();
	}
}
function saveOnSuccess(req, resData) {
	$w('sbToolBar').setDisabled('save');
	$w('sbToolBar').setEnabled('print');
	var sbsaveReturnVO = pc.getResData("sbsaveReturnVO", resData);
	var returnBz = sbsaveReturnVO.data.returnBz.value;
	if (returnBz == "Y") {
		$w('sbToolBar').setEnabled('printHz');
		var pzxh = sbsaveReturnVO.data.pzxh.value;
		yzpzxh = pzxh;
		var ybtse = sbsaveReturnVO.data.ybtse.value;
		fromYbSBJumpZskp(pzxh, ybtse, gt3.djxh, resData);
	}
	var swjgDm = pc.getResData("swjgDm", resData).value;
	var nsrxxFrom = $w("nsrxxForm");
	yzpzxh = sbsaveReturnVO.data.pzxh.value;
	var flzlGridData = $w('flzlGrid').getCheckedData("check");
	if (sb025_cszForXML == "SBCWGZ") {// 错误更正
		saveSxslxx(yzpzxh, gt3.djxh, nsrxxFrom.getValue("nsrsbh"), nsrxxFrom
				.getValue("nsrmc"), "SLSXA061001007", "LCSXA061001009", swjgDm,
				flzlGridData);
	}
	// 错误更正保存前计税
	sbcwgzJs = resData.getAttr('sbcwgzJs');
	if (sbcwgzJs == 'sbcwgzJs') {
		var pzxhPre = sbsaveReturnVO.data.pzxh.value;
		var ybtse = sbsaveReturnVO.data.ybtse.value;
		sbcwgzGyjs(pzxhPre, ybtse.round(2), gt3.djxh, resData, 'declare', null);
	} else {
		// $w('sbToolBar').setDisabled('save');
		// $w("sbToolBar").setEnabled('printYhs');
		// $w("sbToolBar").setEnabled('print');
		// controlExportButton();

		$w('sbToolBar').setDisabled('save');
		$w("sbToolBar").setDisabled('printYhs');
		$w("sbToolBar").setDisabled('print');
		alert("申报成功！")

	}

}

function getDefaultJmxx(ssjmxzDm, zspmDm) {
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	var result = null;
	var queryBtn = new SwordSubmit();
	queryBtn.pushData("ssjmxzDm", ssjmxzDm);
	queryBtn.pushData("skssqq", skssqq);
	queryBtn.pushData("skssqz", skssqz);
	queryBtn.pushData("djxh", gt3.djxh);
	queryBtn.pushData("zspmDm", zspmDm);
	queryBtn.setOptions({
		async : 'false',
		mask : 'false',
		ctrl : 'SB025YhssbCtrl_getDefaultJmxx',
		onSuccess : function(req, res) {
			var ssjmxzmc = res.getAttr("ssjmxzmc");
			var jmfd = res.getAttr("jmfd");
			var swsxDm = res.getAttr("swsxDm");
			var jmed = res.getAttr("jmed");
			var jmsl = res.getAttr("jmsl");
			var spbaBz = res.getAttr("spbaBz");
			var jmzlxDm = res.getAttr("jmzlxDm");
			if ($chk(jmzlxDm)) {
				result = new Array(7);
				result[0] = jmzlxDm;
				result[1] = jmfd;
				result[2] = jmed;
				result[3] = jmsl;
				result[4] = ssjmxzmc;
				result[5] = spbaBz;
				result[6] = swsxDm;
			}
		}
	});
	queryBtn.submit();
	return result;
}

/**
 * 申报错误更正不保存
 * 
 * @return
 */
function sbcwgzNotSave() {
	sbcwgzJs = '';// 清空
	$w('sbToolBar').setEnabled('save');// 点亮保存按钮
}

function notJumpZskp($_saveResData) {

}
// 计算本期应纳 应退(补)税额
function jisuanbqynybtse(realvalue, showvalue, rowData, el, row, srcRealvalue) {
	var data;
	var grid1 = $w('yhssbGrid');// 表格对象
	// 计税金额或件数
	var jsjehjs = grid1.getCheckedRowData().getValue('jsje') / 1;
	// 核定计税依据
	var hdjsyj = grid1.getCheckedRowData().getValue('hdzsHdde') / 1;
	// 核定比例
	var hdbl = grid1.getCheckedRowData().getValue('hdzsHdbl') / 1;
	// 适用税率
	var sysl = grid1.getCheckedRowData().getValue('sysl') / 1;
	var zspmDm = grid1.getCheckedRowData().getValue('zspmDm');
	var bqynse = 0.0;// 本期应纳税额
	bqynse = jsjehjs.multiple(sysl) + ((hdjsyj.multiple(hdbl)).multiple(sysl));
	bqynse = bqynse.round(2);
	var jmseOrg = grid1.getCheckedRowData().getValue("jmse");
	var ssjmxzDm = grid1.getCheckedRowData().getValue("ssjmxzDm");
	var jmse = jmseOrg;
	if ($chk(ssjmxzDm)) {
		jmse = getJsjmse(jsjehjs, bqynse.round(2), sysl, grid1);
	}
	jmse = jmse.round(2);
	if (jmse > bqynse) {
		jmse = bqynse;
	}
	var phjmse = 0.0;// 普惠减免税额
	var bqsfsyxgmyhzc = $w("nsrxxForm").getValue("bqsfsyxgmyhzc").code;
	if (bqsfsyxgmyhzc == "Y") {
		phjzbl = $w('nsrxxForm').getValue("phjzbl");
		phjmse = calPhjmse(bqynse, jmse, phjzbl);
	}

	if ((grid1.getCheckedRowData().getValue('bqynse') / 1) >= 0
			&& (jmse / 1) >= 0
			&& (grid1.getCheckedRowData().getValue('bqyjse1') / 1) >= 0) {
		if (sfsyzs == "Y") {
			phjmse = phjmse.multiple(phzsbl / 1);
		}
		phjmse = phjmse.round(2);
		var bqybtse = (bqynse / 1).subtract(jmse / 1).subtract(
				grid1.getCheckedRowData().getValue('bqyjse1') / 1).subtract(
				phjmse / 1);
		zspmDm = grid1.getCheckedRowData().getValue('zspmDm');
		bqybtse = jsyhsje(zspmDm, bqybtse);
		data = {
			"tds" : {
				"bqynse" : {
					"value" : bqynse
				},
				"bqybtse" : {
					"value" : bqybtse
				},
				"jmse" : {
					"value" : jmse
				},
				"jmsemr" : {
					"value" : jmse
				},
				"phjmse" : {
					"value" : phjmse
				}
			}
		};
	} else {
		data = {
			"tds" : {
				"bqynse" : {
					"value" : bqynse
				}
			}
		};
	}
	grid1.updateRow(grid1.getCheckedRow(), data);
	updateDefJmxx($w('yhssbGrid'), row, zspmDm, sysl);
}

// 减免计算--计算本期应退（补）税额
function jisuanbqybtse(realvalue, showvalue, rowData, el, row, srcRealvalue) {
	var data;
	var grid1 = $w('yhssbGrid');// 表格对象
	var jmse = rowData.getValue('jmse') / 1;
	jmse = jmse.round(2);
	// 减免
	var jmsemr = rowData.getValue("jmsemr") / 1;
	if (jmsemr > 0 && jmse > jmsemr) {
		swordAlert("本期减免金额不能大于减免性质自动带出的减免税额");
		jmse = jmsemr;
	}
	var ssjmxzDm = rowData.getValue("ssjmxzDm");
	if (!$chk(ssjmxzDm)) {
		swordAlert("请选择减免性质，再录入减免税额");
		grid1.updateCell(row.getCell("jmse"), "0.00");
		return;
	}

	var bqynse = rowData.getValue("bqynse") / 1;
	bqynse = bqynse.round(2);
	// YND53_201604260003 印花税bqynse保留6位小数，jmse保留2位小数，比较的时候需要四舍五入保留2位小数
	// 2016-05-04 begin
	// if(jmse > bqynse){
	if (jmse > bqynse) {
		// YND53_201604260003 印花税bqynse保留6位小数，jmse保留2位小数，比较的时候需要四舍五入保留2位小数
		// 2016-05-04 end
		swordAlert("减免税额不能大于本期应纳税额");
		jmse = jmsemr;
	}
	if (jmse == 0) {
		grid1.updateCell(row.getCell("ssjmxzDm"), "");
	}
	queryJmxxAndYjsk("jm");
	if (rowData.getValue('bqynse') != null && jmse != null
			&& rowData.getValue('bqyjse1') != null) {
		var phjmse = 0.0;// 普惠减免税额
		if (bqsfsyxgmyhzc == "Y") {
			phjzbl = $w('nsrxxForm').getValue("phjzbl");
			phjmse = calPhjmse(bqynse, jmse, phjzbl);
		}
		if (sfsyzs == "Y") {
			phjmse = phjmse.multiple(phzsbl / 1);
		}
		phjmse = phjmse.round(2);
		var ybtse = (rowData.getValue('bqynse') / 1).subtract(jmse / 1)
				.subtract(rowData.getValue('bqyjse1') / 1).subtract(phjmse / 1);
		var zspmDm = rowData.getValue('zspmDm');
		ybtse = jsyhsje(zspmDm, ybtse);
		var data = {
			"tds" : {
				"jmse" : {
					"value" : jmse
				},
				"bqybtse" : {
					"value" : ybtse
				},
				"phjmse" : {
					"value" : phjmse
				}
			}
		};
		grid1.updateRow(row, data);
	}
}

/**
 * 校验减免税额是否合法
 * 
 * @param jsyj
 *            计税依据（应税项）
 * @param bqynse
 *            本期应纳税额
 * @param ssjmxzDm
 *            减免性质代码
 * @param jme
 *            减免税额
 * @param zsxmDm
 *            征收项目代码
 * @param jmxxList
 *            减免备案信息集合
 * @param pzxh
 *            凭证序号
 * @return
 */
function yhsjmxxCheck(jsyj, bqynse, ssjmxzDm, jme, zsxmDm, jmxxList, pzxh) {
	jmxxList.name = "jmxxList";
	var jmse = 0;// 定义返回参数
	// 校验是否存在减免备案，没有直接返回减免额0
	if (bqynse / 1 < jme / 1) {
		swordAlert("本期减免税额不能大于本期应纳税额。");
		return;
	} else {
		if (jmxxList.trs.length <= 0 && !$chk(ssjmxzDm)) {
			swordAlert("当前纳税人不存在有对应的减免税务事项备案。");
			jmse = jme;
		}
		if (jme / 1 > 0) {
			// 减免税额大于0，进入后台公共方法校验金额
			var ssqzBtn = new SwordSubmit();
			ssqzBtn.setCtrl("SBGyCtrl_getJmxxCheck");
			ssqzBtn.pushData('jsyj', jsyj);
			ssqzBtn.pushData('bqynse', bqynse);
			ssqzBtn.pushData('jme', jme);
			ssqzBtn.pushData('zsxmDm', zsxmDm);
			ssqzBtn.pushData('pzxh', pzxh);
			ssqzBtn.pushData(jmxxList);
			ssqzBtn.setOptions({
				'onSuccess' : function(req, resData) {
					var map = pc.getResData("map", resData);
					var jmBz = map.data.jmBz.value;// 返回减免标志 Y：符合减免
					// N：不符合减免
					var news = map.data.news.value;// 返回不符合减免信息
					if (jmBz == "N") {
						// 不符合，弹出提示信息
						jmse = jme;
						swordAlert(news);
					} else {
						// 符合，返回传入减免税额
						jmse = jme;
					}
				}
			});
			ssqzBtn.submit();
		}
	}
	return jmse;
}

// 已缴金额 --本期应退（补）税额
function jisuanbqybtse1(realvalue, showvalue, rowData, el, row, srcRealvalue) {
	var zspmDm = rowData.getValue('zspmDm');
	var grid1 = $w('yhssbGrid');// 表格对象
	if (!$chk(zspmDm)) {
		swordAlert("请选择征收品目!");
		var data = {
			tds : {
				bqyjse1 : {
					"value" : 0.00
				}
			}
		};
		grid1.updateRow(row, data);
		return;
	}
	queryJmxxAndYjsk("yj");

	var bqyjse = rowData.getValue('bqyjse1');
	var bqyjje = getBqKyyjje(gt3_yjxxList, zspmDm, bqyjse);
	bqyjje = bqyjje.round(2);
	var data;
	if (rowData.getValue('bqynse') != null && rowData.getValue('jmse') != null
			&& rowData.getValue('bqyjse1') != null) {

		var bqybtse = (rowData.getValue('bqynse') / 1).subtract(
				rowData.getValue('jmse') / 1).subtract(bqyjje / 1).subtract(
				rowData.getValue('phjmse') / 1);
		var zspmDm = rowData.getValue('zspmDm');
		bqybtse = jsyhsje(zspmDm, bqybtse);
		var data = {
			"tds" : {
				"bqybtse" : {
					"value" : bqybtse
				},
				"bqyjse1" : {
					"value" : bqyjje
				}
			}
		};
		grid1.updateRow(row, data);
	}
}

// 减免信息操作
function dpmJm(zspmDm) {
	if (gt3_jmxxList == null || gt3_jmxxList == undefined
			|| gt3_jmxxList.trs.length == 0) {
		swordAlert("没有减免税务事项通知书！");
		return 111;
	} else {
		var jmxxList = gt3_jmxxList.trs;
		for ( var i = 0; i < jmxxList.length; i++) {
			jmxx = jmxxList[i];
			var zspmDm1 = jmxx.tds.zspmDm.value;
			if (zspmDm == zspmDm1) {
				return jmxx.tds.yhpzuuid.value;
			}
		}
		swordAlert("没有减免税务事项通知书！");
		return 111;
	}
}

function sethddebl(yhssbbxxGrid) {
	var len = yhssbbxxGrid.getInsertRows().length;
	for ( var j = 0; j < len; j++) {
		var jsje = yhssbbxxGrid.getInsertRows()[j].getChildren()[1].innerHTML;
		var hdzsHdde = yhssbbxxGrid.getInsertRows()[j].getChildren()[2].innerHTML;
		var hdzsHdbl = yhssbbxxGrid.getInsertRows()[j].getChildren()[3].innerHTML;
		var jsjeCell = yhssbbxxGrid.getInsertRows()[j].getCell("jsje");
		var hddeCell = yhssbbxxGrid.getInsertRows()[j].getCell("hdzsHdde");
		var hdblCell = yhssbbxxGrid.getInsertRows()[j].getCell("hdzsHdbl");
		if (parseFloat(hdzsHdde) > 0) {
			yhssbbxxGrid.cellDisable(hddeCell);
			yhssbbxxGrid.cellDisable(hdblCell);
			yhssbbxxGrid.cellDisable(jsjeCell);
		} else if (parseFloat(hdzsHdbl) > 0) {
			yhssbbxxGrid.cellEnable(hddeCell);
			yhssbbxxGrid.cellEnable(hdblCell);
			yhssbbxxGrid.cellDisable(jsjeCell);
		} else {
			yhssbbxxGrid.cellDisable(hddeCell);
			yhssbbxxGrid.cellDisable(hdblCell);
			yhssbbxxGrid.cellEnable(jsjeCell);
		}
	}
}
function InitJs(sbxxList) {
	if (sbxxList.trs.length > 0) {
		var yhssbbxxGrid = $w("yhssbGrid");
		yhssbbxxGrid.reset();
		var tempData;
		// ZOG00_201810170021 根据《XQ20180302 — 关于修改其他账簿印花税申报规则的需求》
		// 当申报印花税，征收品目选择“其他营业账簿”，税款属期为2018年5月1日后的，金三系统自动默认纳税人享受减免税，自动带出减免税性质代码，“应补退税额”自动填为“0”。
		var skssqq = $w("nsrxxForm").getValue("skssqq");
		for ( var i = 0; i < sbxxList.trs.length; i++) {
			var defaultSsjmxzDm = "";// 默认减免性质
			tempData = sbxxList.trs[i].tds;
			var sl = tempData.sl1.value;
			var rdpzuuid = tempData.rdpzuuid.value;
			var zspmDm = tempData.zspmDm.value;
			zspmArray[i] = zspmDm;
			var nsqxDm = tempData.nsqxDm.value;
			if (sl != "") {
				var jmzlxDm = "";
				var jmfd = "";
				var jmed = "";
				var jmsl = "";
				var ssjmxzmc = "";
				var spbaBz = "";

				var hdse = "0";
				var hdbl = "0";
				var bqynse = "0";
				var bqybtse = "0";
				var yjze = 0;
				var hdlx2 = "";
				var phjmse = 0;
				if ($chk(tempData.hdbl)) {
					hdbl = tempData.hdbl.value;
					if (hdbl / 1 > 0) {
						hdlx2 = "2";
					}
				}
				if ($chk(tempData.hdse)) {
					hdse = tempData.hdse.value;
					if (hdse / 1 > 0) {
						hdbl = "1";
						hdlx2 = "1";
					}
				}
				if ($chk(tempData.yjze)) {
					yjze = tempData.yjze.value;
					yjze = yjze.round(2);
				}
				bqynse = (hdbl / 1).multiple(hdse / 1).multiple(sl / 1);
				bqynse = bqynse.round(2);
				var jmse = 0.0;
				var skssqqFloat = parseFloat(skssqq.replace(/-/g, '').replace(
						/\//g, ''));
				if (zspmDm == "101110599"
						&& skssqqFloat >= parseFloat("20180501")) {// 其他营业账簿,
					// 2018-05-01以后
					defaultSsjmxzDm = "0009129907";
					var defJmxxArray = getDefJmxxArray(defaultSsjmxzDm, zspmDm);
					if ($chk(defJmxxArray)) {
						var jsyj = (hdbl / 1).multiple(hdse / 1);
						jmzlxDm = defJmxxArray[0];
						jmfd = defJmxxArray[1];
						jmed = defJmxxArray[2];
						jmsl = defJmxxArray[3];
						ssjmxzmc = defJmxxArray[4];
						spbaBz = defJmxxArray[5];
						jmse = getMrjmseBySsjmxz(jmzlxDm, jsyj / 1, bqynse / 1,
								sl / 1, jmfd / 1, jmed / 1, jmsl / 1);
					}
				}
				if (zspmDm == "101110501"
						&& skssqqFloat >= parseFloat("20180501")) {// 其他营业账簿,
					// 2018-05-01以后
					defaultSsjmxzDm = "0009129906";
					var defJmxxArray = getDefJmxxArray(defaultSsjmxzDm, zspmDm);
					if ($chk(defJmxxArray)) {
						var jsyj = (hdbl / 1).multiple(hdse / 1);
						jmzlxDm = defJmxxArray[0];
						jmfd = defJmxxArray[1];
						jmed = defJmxxArray[2];
						jmsl = defJmxxArray[3];
						ssjmxzmc = defJmxxArray[4];
						spbaBz = defJmxxArray[5];
						jmse = getMrjmseBySsjmxz(jmzlxDm, jsyj / 1, bqynse / 1,
								sl / 1, jmfd / 1, jmed / 1, jmsl / 1);
					}
				}
				var phjzbl = $w("nsrxxForm").getValue("phjzbl");
				if (!$chk(phjzbl)) {
					phjzbl = 0;
				}
				phjmse = calPhjmse(bqynse, jmse, phjzbl);
				if (sfsyzs == "Y") {
					phjmse = phjmse.multiple(phzsbl / 1);
				}
				phjmse = phjmse.round(2);
				bqybtse = (bqynse / 1) - jmse - (yjze / 1) - phjmse;
				bqybtse = jsyhsje(zspmDm, bqybtse);

				var dataObj = {
					'tds' : {
						'sysl' : {
							'value' : sl
						},
						'bqynse' : {
							'value' : bqynse
						},
						'jsjehjs' : {
							'value' : "0.00"
						},
						'jmse' : {
							'value' : jmse
						},
						'bqyjse1' : {
							'value' : yjze
						},
						'jsje' : {
							'value' : "0.00"
						},
						'bqybtse' : {
							'value' : bqybtse + ""
						},
						'hdzsHdde' : {
							'value' : hdse
						},
						'hdzsHdbl' : {
							'value' : hdbl
						},
						'rdpzuuid' : {
							'value' : rdpzuuid
						},
						'bqyjse1' : {
							'value' : yjze
						},
						'zspmDm' : {
							'value' : zspmDm
						},
						'msg' : {
							'value' : ""
						},
						'nsqxDm' : {
							'value' : nsqxDm
						},
						'hdlx2' : {
							'value' : hdlx2
						},
						'jmzlxDm' : {
							'value' : jmzlxDm
						},
						'jmsl' : {
							'value' : jmsl
						},
						'jmed' : {
							'value' : jmed
						},
						'jmfd' : {
							'value' : jmfd
						},
						'phjmse' : {
							'value' : phjmse
						}
					}
				};
				var row = yhssbbxxGrid.insertRow(dataObj);
				yhssbbxxGrid.updateCell(row.getCell("ssjmxzDm"),
						defaultSsjmxzDm, ssjmxzmc);
			}
		}
		// 设置计税金额，核定数据项是否可用
		sethddebl(yhssbbxxGrid);
	}
}

/**
 * 获取默认的减免信息，先从缓存取，再查数据
 * 
 * @param defaultSsjmxzDm
 *            默认减免性质
 * @param zspmDm
 *            征收品目
 * @return
 */
function getDefJmxxArray(defaultSsjmxzDm, zspmDm) {
	var defJmxxArray = zspmDefJmxxMap.get(zspmDm);
	if (!$chk(defJmxxArray)) {// 缓存中没有
		defJmxxArray = getDefaultJmxx(defaultSsjmxzDm, zspmDm);
		if ($chk(defJmxxArray)) {// 查到数据
			zspmDefJmxxMap.remove(zspmDm);
			zspmDefJmxxMap.put(zspmDm, defJmxxArray);
		} else {
			swordAlert("该行征收品目应享受减免，但减免性质（ " + defaultSsjmxzDm
					+ "）未备案且未在系统中配置。");
		}
	}
	return defJmxxArray;
}

function XMLForSBCWGZ(resData) {
	var nsrxxForm = $w('nsrxxForm');
	if (gt3.zrrBz == 'Y') {// 无税费种认定或自然人情况
		$("zrrTR1").style.display = "block";
		$("zrrTR2").style.display = "block";
		$("zrrTR3").style.display = "block";
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
	}
	gt3_cwgzMap = pc.getResData("cwgzMap", resData);
	gt3_sbxxList = pc.getResData("sbxxList", resData);
	gt3_jmxxList = pc.getResData("jmxxList", resData);
	gt3_yjxxList = pc.getResData("yjxxList", resData);

	var yhssbGridGz = pc.getResData("yhssbGridGz", resData);
	cwgzInsertRowData(yhssbGridGz, "N");

	gt3.djxh = gt3_cwgzMap.data.djxh.value;
	nsrxxVO.djxh = gt3.djxh;
	sb025_pxzh = gt3_cwgzMap.data.pzxh.value;
	$w("nsrxxForm").disable();
	$w("nsrxxForm").enable([ 'bqsfsyxgmyhzc' ]);
	$w("slxxForm").enable("slr");
	var flzlGrid = $w('flzlGrid');
	if (!flzlGrid.collapseDiv.hasClass('x-tool-s')) {
		flzlGrid.toggle();
	}
}

function cwgzInsertRowData(yhssbGridGz, drbz) {
	var yhssbGrid = $w("yhssbGrid");
	yhssbGrid.reset();
	if (yhssbGridGz.trs.length > 0) {
		for ( var i = 0; i < yhssbGridGz.trs.length; i++) {
			tempData = yhssbGridGz.trs[i].tds;
			var ssjmxz = tempData.ssjmxzDm;
			var ssjmxzDm = "";
			if (!$chk(ssjmxz) || typeof (ssjmxz) == "undefined") {
				ssjmxzDm = "";
			} else {
				ssjmxzDm = ssjmxz.value;
			}
			var hdlx = !$chk(tempData.hdlx2) ? "" : tempData.hdlx2.value;
			var hdzsHdde = tempData.hdzsHdde.value;
			var hdzsHdbl = tempData.hdzsHdbl.value;
			if (!$chk(tempData.hdlx) || hdlx == "" || hdlx == undefined) {
				if (hdzsHdde / 1 > 0 && (hdzsHdbl / 1) <= 0) {
					hdlx = "1";
					hdzsHdbl = "1";
				} else if (hdzsHdde / 1 <= 0 && (hdzsHdbl / 1) > 0) {
					hdlx = "2";
				}
			}
			var nsqxDm = tempData.nsqxDm.value;
			var dataObj = {
				tds : {
					zspmDm : {
						value : tempData.zspmDm.value
					},
					jsje : {
						value : tempData.jsje.value
					},
					hdzsHdde : {
						value : hdzsHdde
					},
					hdzsHdbl : {
						value : hdzsHdbl
					},
					sysl : {
						value : tempData.sysl.value
					},
					bqynse : {
						value : tempData.bqynse.value
					},
					ssjmxzDm : {
						value : ssjmxzDm
					},
					jmse : {
						value : tempData.jmse.value
					},
					bqyjse1 : {
						value : tempData.bqyjse1.value
					},
					bqybtse : {
						value : tempData.bqybtse.value
					},
					msg : {
						value : ""
					},
					nsqxDm : {
						value : tempData.nsqxDm.value
					},
					hdlx2 : {
						value : hdlx
					},
					phjmse : {
						value : tempData.phjmse.value
					}
				}
			};
			var row = yhssbGrid.insertRow(dataObj);
			if (drbz == "Y") {// 导入才处理
				var zspmDm = tempData.zspmDm.value;
				if (zspmDm == "101110599" && !$chk(ssjmxzDm)) {// 没导入减免性质
					updateDefJmxx(yhssbGrid, row, zspmDm, tempData.sysl.value);
				}
			}
		}
		sethddeblcwgz(yhssbGrid);
	}
}

function sethddeblcwgz(yhssbbxxGrid) {
	var len = yhssbbxxGrid.getInsertRows().length;
	for ( var j = 0; j < len; j++) {
		var jsje = yhssbbxxGrid.getInsertRows()[j].getChildren()[1].innerHTML;
		var hdzsHdde = yhssbbxxGrid.getInsertRows()[j].getChildren()[2].innerHTML;
		var hdzsHdbl = yhssbbxxGrid.getInsertRows()[j].getChildren()[3].innerHTML;
		var hdlx = yhssbbxxGrid.getInsertRows()[j].getChildren()[19].innerHTML;
		var jsjeCell = yhssbbxxGrid.getInsertRows()[j].getCell("jsje");
		var hddeCell = yhssbbxxGrid.getInsertRows()[j].getCell("hdzsHdde");
		var hdblCell = yhssbbxxGrid.getInsertRows()[j].getCell("hdzsHdbl");
		if (hdlx == "1") {
			yhssbbxxGrid.cellDisable(hddeCell);
			yhssbbxxGrid.cellDisable(hdblCell);
			yhssbbxxGrid.cellDisable(jsjeCell);
		} else if (hdlx == "2") {
			yhssbbxxGrid.cellEnable(hddeCell);
			yhssbbxxGrid.cellEnable(hdblCell);
			yhssbbxxGrid.cellDisable(jsjeCell);

		} else {
			yhssbbxxGrid.cellDisable(hddeCell);
			yhssbbxxGrid.cellDisable(hdblCell);
			yhssbbxxGrid.cellEnable(jsjeCell);
		}
	}
}
/**
 * 过滤征收品目
 * 
 * @return
 */
function zsfsFilter(dataObj) {
	// IM23302201804200001
	// 控制印花税申报表里征收品目为‘滞纳金’，‘罚款、滞纳金’在申报表里不要带出，以避免产生的应征税的税款种类是正税情况
	var bkxZspmDm = '101119900,101119901,101119902';
	var newData = [];
	dataObj.each(function(item, index) {
		if (bkxZspmDm.indexOf(item.ZSPM_DM) == -1) {
			if (zspmArray.length > 0 && zspmArray.indexOf(item.ZSPM_DM) > -1) {
				newData[newData.length] = item;
			}
			if (zspmArray.length == 0) {
				newData[newData.length] = item;
			}
		}

	});
	return newData;
}

/**
 * 改变征收品目时修改税率
 * 
 * @return
 */
function changeZspm(option, selItem, obj) {
	var skxxGrid = $w('yhssbGrid');
	var yhssbbxxGrid = skxxGrid;
	var row = skxxGrid.getCheckedRow();
	var rowData = skxxGrid.getCheckedRowData();
	var zspmDm = rowData.getValue("zspmDm");
	checkCfYqSb(skxxGrid, zspmDm, row);// 检查重复申报
	yhts(zspmDm);
	var slArr = getSl(zspmDm);
	var sysl = emptyToZ(slArr[0]) / 1;// 税率
	// 设置计税金额，核定数据项是否可用
	var jsjeZt = "";
	var hddeZt = "";
	var hdblZt = "";
	var jsjeCell = row.getCell("jsje");
	var hddeCell = row.getCell("hdzsHdde");
	var hdblCell = row.getCell("hdzsHdbl");
	var jmxzCell = row.getCell("ssjmxzDm");
	yhssbbxxGrid.updateCell(jmxzCell, "");
	if ($chk(gt3_sbxxList) && gt3_sbxxList.trs.length > 0) {
		var zspmIsRd = "0";
		for ( var i = 0; i < gt3_sbxxList.trs.length; i++) {
			var tempData = gt3_sbxxList.trs[i].tds;
			var zspmDmRd = tempData.zspmDm.value;
			var nsqxDm = tempData.nsqxDm.value;
			if (zspmDm == zspmDmRd) {
				var rdpzuuid = tempData.rdpzuuid.value;
				var hdse = "0";
				var hdlx2 = "";
				var hdbl = "0";
				var bqynse = "0";
				var bqybtse = "0";
				var yjze = "0";
				var phjmse = "0";
				if ($chk(tempData.hdbl)) {
					hdbl = tempData.hdbl.value;
					if (hdbl > 0) {
						hdlx2 = "2";
					}
				}
				if ($chk(tempData.hdse)) {
					hdse = tempData.hdse.value;
					if (hdse > 0) {
						hdbl = "1";
						hdlx2 = "1";
					}
				}
				if (!$chk(tempData.yjze)) {
					yjze = tempData.yjze.value;
					yjze = yjze.round(2);
				}
				// 设置计税金额，核定数据项是否可用
				if (parseFloat(hdse) > 0) {

					yhssbbxxGrid.cellDisable(hddeCell);
					yhssbbxxGrid.cellDisable(hdblCell);
					yhssbbxxGrid.cellDisable(jsjeCell);

				} else if (parseFloat(hdbl) > 0) {
					yhssbbxxGrid.cellEnable(hddeCell);
					yhssbbxxGrid.cellEnable(hdblCell);
					yhssbbxxGrid.cellDisable(jsjeCell);
				} else {
					yhssbbxxGrid.cellDisable(hddeCell);
					yhssbbxxGrid.cellDisable(hdblCell);
					yhssbbxxGrid.cellEnable(jsjeCell);
				}
				bqynse = (hdbl / 1).multiple(hdse / 1).multiple(sysl / 1);
				bqynse = bqynse.round(2);
				bqybtse = jsyhsje(zspmDmRd, bqynse);
				var dataObj = {
					'tds' : {
						'jsje' : {
							'value' : "0.00"
						},
						'hdzsHdde' : {
							'value' : hdse
						},
						'hdzsHdbl' : {
							'value' : hdbl
						},
						'sysl' : {
							'value' : sysl
						},
						'bqynse' : {
							'value' : bqynse
						},
						'jmse' : {
							'value' : "0.00"
						},
						'bqyjse1' : {
							'value' : yjze
						},
						'bqybtse' : {
							'value' : bqybtse + ""
						},
						'msg' : {
							'value' : ""
						},
						'rdpzuuid' : {
							'value' : rdpzuuid
						},
						'nsqxDm' : {
							'value' : nsqxDm
						},
						hdlx2 : {
							'value' : hdlx2
						},
						phjmse : {
							'value' : phjmse
						}
					}
				};
				skxxGrid.updateRow(row, dataObj);
				zspmIsRd = "1";
				break;
			}
		}
		if ("0" == zspmIsRd) {
			yhssbbxxGrid.cellDisable(hddeCell);
			yhssbbxxGrid.cellDisable(hdblCell);
			var dataObj = {
				'tds' : {
					'jsje' : {
						'value' : "0.00"
					},
					'hdzsHdde' : {
						'value' : "0.00"
					},
					'hdzsHdbl' : {
						'value' : "0.0"
					},
					'sysl' : {
						'value' : sysl
					},
					'bqynse' : {
						'value' : "0.00"
					},
					'jmse' : {
						'value' : "0.00"
					},
					'bqyjse1' : {
						'value' : "0.00"
					},
					'bqybtse' : {
						'value' : "0.00"
					},
					'msg' : {
						'value' : ""
					},
					'rdpzuuid' : {
						'value' : ""
					},
					'nsqxDm' : {
						'value' : gt3_nsqx
					},
					hdlx2 : {
						'value' : ""
					},
					phjmse : {
						'value' : "0.00"
					}
				}
			};
			skxxGrid.updateRow(row, dataObj);
		}
	} else {
		var dataObj = null;
		if ($chk(gt3_yhshdList) && gt3_yhshdList.trs.length > 0) {
			for ( var i = 0; i < gt3_yhshdList.trs.length; i++) {
				var tempData = gt3_yhshdList.trs[i].tds;
				var hdlx2 = tempData.hdlx2.value;
				var zspmHd = tempData.zspmDm.value;
				var hdse = "0";
				var hdbl = "0";
				var bqynse = "0";
				var bqybtse = "0";
				if (zspmHd == zspmDm) {
					if (hdlx2 == "1") {// 默认核定类型 (1为定额核定、2为比例核定)
						hdse = tempData.hdde.value;
						yhssbbxxGrid.cellDisable(jsjeCell);
						yhssbbxxGrid.cellDisable(hdblCell);
					} else {
						hdbl = tempData.hdbl.value;
						yhssbbxxGrid.cellEnable(hddeCell);
						yhssbbxxGrid.cellDisable(jsjeCell);
					}

					bqynse = (hdbl / 1).multiple(hdse / 1).multiple(sysl / 1);
					bqynse = bqynse.round(2);
					bqybtse = jsyhsje(zspmDm, bqynse);
					dataObj = {
						'tds' : {
							'jsje' : {
								'value' : "0.00"
							},
							'hdzsHdde' : {
								'value' : hdse
							},
							'hdzsHdbl' : {
								'value' : hdbl
							},
							'sysl' : {
								'value' : sysl
							},
							'bqynse' : {
								'value' : bqynse
							},
							'jmse' : {
								'value' : "0.00"
							},
							'bqyjse1' : {
								'value' : "0.00"
							},
							'bqybtse' : {
								'value' : bqybtse
							},
							'msg' : {
								'value' : ""
							},
							'rdpzuuid' : {
								'value' : ""
							},
							'nsqxDm' : {
								'value' : gt3_nsqx
							},
							hdlx2 : {
								'value' : hdlx2
							},
							'phjmse' : {
								'value' : "0.00"
							}
						}
					};
				} else {
					yhssbbxxGrid.cellDisable(hdblCell);
					yhssbbxxGrid.cellDisable(hddeCell);
					dataObj = {
						'tds' : {
							'jsje' : {
								'value' : "0.00"
							},
							'hdzsHdde' : {
								'value' : "0.00"
							},
							'hdzsHdbl' : {
								'value' : "0.0"
							},
							'sysl' : {
								'value' : sysl
							},
							'bqynse' : {
								'value' : "0.00"
							},
							'jmse' : {
								'value' : "0.00"
							},
							'bqyjse1' : {
								'value' : "0.00"
							},
							'bqybtse' : {
								'value' : "0.00"
							},
							'msg' : {
								'value' : ""
							},
							'rdpzuuid' : {
								'value' : ""
							},
							'nsqxDm' : {
								'value' : gt3_nsqx
							},
							hdlx2 : {
								'value' : ""
							},
							'phjmse' : {
								'value' : "0.00"
							}
						}
					};
				}
			}
		} else {
			yhssbbxxGrid.cellDisable(hdblCell);
			yhssbbxxGrid.cellDisable(hddeCell);
			dataObj = {
				'tds' : {
					'jsje' : {
						'value' : "0.00"
					},
					'hdzsHdde' : {
						'value' : "0.00"
					},
					'hdzsHdbl' : {
						'value' : "0.0"
					},
					'sysl' : {
						'value' : sysl
					},
					'bqynse' : {
						'value' : "0.00"
					},
					'jmse' : {
						'value' : "0.00"
					},
					'bqyjse1' : {
						'value' : "0.00"
					},
					'bqybtse' : {
						'value' : "0.00"
					},
					'msg' : {
						'value' : ""
					},
					'rdpzuuid' : {
						'value' : ""
					},
					'nsqxDm' : {
						'value' : gt3_nsqx
					},
					hdlx2 : {
						'value' : ""
					},
					phjmse : {
						'value' : "0.00"
					}
				}
			};
		}
		jsjeCell.set("disabled", jsjeZt);
		hddeCell.set("disabled", hddeZt);
		hdblCell.set("disabled", hdblZt);
		skxxGrid.updateRow(row, dataObj);
	}
	// //ZOG00_201810170021 根据《XQ20180302 — 关于修改其他账簿印花税申报规则的需求》
	// 当申报印花税，征收品目选择“其他营业账簿”，税款属期为2018年5月1日后的，金三系统自动默认纳税人享受减免税，自动带出减免税性质代码，“应补退税额”自动填为“0”。
	// 当申报印花税，征收品目选择“印花税-资金账簿（101110501）”，税款属期为2018年5月1日后的，金三系统自动默认纳税人享受减免税，自动带出减免税性质代码，减免税额自动带出，且减免税额=本期应纳税额
	// *50%， “应补退税额”自动填为“0”。

	updateDefJmxx(skxxGrid, row, zspmDm, sysl);
}

function updateDefJmxx(grid, row, zspmDm, sysl) {
	grid.cellEnable(row.getCell("ssjmxzDm"));
	grid.cellEnable(row.getCell("jmse"));
	var ssjmxzDmCell = row.getCell("ssjmxzDm");
	var rowData = grid.getOneRowData(row);
	var jsje = emptyToZ(rowData.getValue("jsje")) / 1;
	var hdzsHdde = emptyToZ(rowData.getValue("hdzsHdde")) / 1;
	var hdzsHdbl = emptyToZ(rowData.getValue("hdzsHdbl")) / 1;
	var jsyj = GyFormatRound(
			jsje.accAdd((hdzsHdde / 1).multiple(hdzsHdbl / 1)), 2);
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	bgsfsyxgmyhzc = $w("nsrxxForm").getValue("bqsfsyxgmyhzc").code;
	var bqynse = grid.getCheckedRowData().getValue("bqynse");
	var skssqqFloat = parseFloat(skssqq.replace(/-/g, '').replace(/\//g, ''));
	var spbaBz = "";
	if ((zspmDm == "101110599" || zspmDm == "101110501")
			&& skssqqFloat >= parseFloat("20180501") && bqynse / 1 > 0) {// 其他营业账簿,
																			// 2018-05-01以后
		grid.cellDisable(row.getCell("jmse"));
		grid.cellDisable(ssjmxzDmCell);
		bqynse = GyFormatRound(jsyj.multiple(sysl / 1), 2);
		var jmzlxDm = "";
		var jmfd = "";
		var jmed = "";
		var jmsl = "";
		var ssjmxzmc = "";
		var jmse = 0.0;
		var defaultSsjmxzDm_Qtyyzb = "0009129907";
		if (zspmDm == "101110501") {
			defaultSsjmxzDm_Qtyyzb = "0009129906";
		}
		var defJmxxArray = getDefJmxxArray(defaultSsjmxzDm_Qtyyzb, zspmDm);
		if ($chk(defJmxxArray)) {
			jmzlxDm = defJmxxArray[0];
			jmfd = defJmxxArray[1];
			jmed = defJmxxArray[2];
			jmsl = defJmxxArray[3];
			ssjmxzmc = defJmxxArray[4];
			spbaBz = defJmxxArray[5];
			jmse = getMrjmseBySsjmxz(jmzlxDm, jsyj / 1, bqynse / 1, sysl / 1,
					jmfd / 1, jmed / 1, jmsl / 1);
			jmse= jmse.round(2);
		}
		var yjze = emptyToZ(rowData.getValue("bqyjse1")) / 1;
		var phjmse = 0.0;
		if (bgsfsyxgmyhzc == "Y") {
			phjmse = calPhjmse(bqynse, jmse, phjzbl);
		}
		if (sfsyzs == "Y") {
			phjmse = phjmse.multiple(phzsbl / 1);
		}
		phjmse = phjmse.round(2);
		var bqybtse = (bqynse / 1) - jmse - (yjze / 1) - phjmse;
		bqybtse = jsyhsje(zspmDm, bqybtse);
		var dataObj = {
			'tds' : {
				'jmse' : {
					'value' : jmse
				},
				'bqybtse' : {
					'value' : bqybtse + ""
				},
				'jmzlxDm' : {
					'value' : jmzlxDm
				},
				'jmsl' : {
					'value' : jmsl
				},
				'jmed' : {
					'value' : jmed
				},
				'jmfd' : {
					'value' : jmfd
				},
				'phjmse' : {
					'value' : phjmse
				}
			}
		};
		grid.updateRow(row, dataObj);
		grid.updateCell(ssjmxzDmCell, defaultSsjmxzDm_Qtyyzb, ssjmxzmc);
		if ("Y" == yhskg) {
			grid.cellDisable(ssjmxzDmCell);
		}
	}
	// if (zspmDm == "101110501" && skssqqFloat >= parseFloat("20180501")
	// && bqynse / 1 > 0) {// 其他营业账簿, 2018-05-01以后
	// if ("Y" == nmxtcs) {
	// grid.cellDisable(ssjmxzDmCell);
	// }
	// bqynse = GyFormatRound(jsyj.multiple(sysl / 1), 2);
	// var jmzlxDm = "";
	// var jmfd = "";
	// var jmed = "";
	// var jmsl = "";
	// var ssjmxzmc = "";
	// var jmse = 0.0;
	// var defaultSsjmxzDm_Zjzb = "0009129906";
	// var defJmxxArray = getDefJmxxArray(defaultSsjmxzDm_Zjzb, zspmDm);
	// if ($chk(defJmxxArray)) {
	// jmzlxDm = defJmxxArray[0];
	// jmfd = defJmxxArray[1];
	// jmed = defJmxxArray[2];
	// jmsl = defJmxxArray[3];
	// ssjmxzmc = defJmxxArray[4];
	// spbaBz = defJmxxArray[5];
	// jmse = getMrjmseBySsjmxz(jmzlxDm, jsyj / 1, bqynse / 1, sysl / 1,
	// jmfd / 1, jmed / 1, jmsl / 1);
	// }
	// if (bgsfsyxgmyhzc == "Y") {
	// phjmse = calPhjmse(bqynse, jmse, phjzbl);
	// }
	// var yjze = emptyToZ(rowData.getValue("bqyjse1")) / 1;
	// var bqybtse = (bqynse / 1) - jmse - (yjze / 1);
	// bqybtse = jsyhsje(zspmDm, bqybtse);
	// var dataObj = {
	// 'tds' : {
	// 'jmse' : {
	// 'value' : jmse
	// },
	// 'bqybtse' : {
	// 'value' : bqybtse + ""
	// },
	// 'jmzlxDm' : {
	// 'value' : jmzlxDm
	// },
	// 'jmsl' : {
	// 'value' : jmsl
	// },
	// 'jmed' : {
	// 'value' : jmed
	// },
	// 'jmfd' : {
	// 'value' : jmfd
	// }
	// }
	// };
	// grid.updateRow(row, dataObj);
	// grid.updateCell(ssjmxzDmCell, defaultSsjmxzDm_Zjzb,
	// ssjmxzmc);
	// if ("Y" == yhskg) {
	// grid.cellDisable(ssjmxzDmCell);
	// }
	// }
}

function jsyhsje(zspmDm, je) {
	var jsje = je;
	if (zspmDm == "101110105") {
		if (jsje < 1 && jsje >= 0.1) {
			jsje = 1;
		} else if (jsje < 0.1 && jsje > 0) {
			jsje = 0;
		} else {
			jsje = jsje.round(1);
		}
	} else {
		if (jsje < 0.1 && jsje > 0) {
			jsje = 0;
		}
	}
	jsje = jsje.round(1);
	return jsje;
}
/*******************************************************************************
 * 获取税率,优惠税率，应税所得率
 * 
 * @param {}
 *            zsxmDm 征收项目代码
 * @param {}
 *            zspmDm 征收品目代码
 * @param {}
 *            zszmDm 征收子目代码
 * @return {} Array 税率,优惠税率，应税所得率
 */
function getSl(zspmDm) {
	var arr = new Array();
	var slBtn = new SwordSubmit();
	slBtn.pushData('zspmDm', zspmDm);
	slBtn.pushData('skssqq', $w("nsrxxForm").getValue("skssqq"));
	slBtn.pushData('skssqz', $w("nsrxxForm").getValue("skssqz"));
	slBtn.setCtrl(ctrl + "_getSl");
	slBtn.setOptions({
		"onSuccess" : function(req, res) {
			var sl = res.getAttr("sl");// 税率
			var yhsl = res.getAttr("yhsl");// 优惠税率
			var yssdl = res.getAttr("yssdl");// 应税所得率
			arr.push(sl, yhsl, yssdl);
		}
	});
	slBtn.submit();
	return arr;
}

/*******************************************************************************
 * 空转为0.00数值
 * 
 * @param {}
 *            obj
 * @return {String}
 */
function emptyToZ(obj) {
	if (typeof (obj) == "object") {
		if (!$chk(obj)) {
			return "0.00";
		} else if (!$chk(trimStr(obj.value))) {
			return "0.00";
		} else if (trimStr(obj.value) == "null") {
			return "0.00";
		} else {
			return trimStr(obj.value);
		}
	} else if (typeof (obj) == "number") {
		if (!$chk(obj)) {
			return "0.00";
		} else if (obj == "null") {
			return "0.00";
		} else if (obj == 0) {
			return "0.00";
		} else {
			return obj;
		}
	} else {
		if (!$chk(obj)) {
			return "0.00";
		} else if (!$chk(trimStr(obj))) {
			return "0.00";
		} else if (trimStr(obj) == "null") {
			return "0.00";
		} else if (trimStr(obj) == "0") {
			return "0.00";
		} else {
			return trimStr(obj);
		}
	}
}

function addRow() {
	var yhssbForm = $w("nsrxxForm");
	var skssqq = yhssbForm.getValue("skssqq");
	var skssqz = yhssbForm.getValue("skssqz");
	if (!$chk(skssqq)||!$chk(skssqz)) {
		swordAlert("请先选择税款所属期后再增行!");
		return;
	}
	var yhssbGrid = $w("yhssbGrid");
	var rowdata = {
		tds : {
			jsje : {
				value : '0.00'
			},
			hdzsHdde : {
				value : '0.00'
			},
			hdzsHdbl : {
				value : '0.0'
			},
			bqynse : {
				value : '0.00'
			},
			jmse : {
				value : '0.00'
			},
			bqyjse1 : {
				value : '0.00'
			},
			phjmse : {
				value : '0.00'
			},
			bqybtse : {
				value : '0.00'
			},
			msg : {
				value : ""
			}
		}
	};
	gt3_sjjz = false;

	var row = $w('yhssbGrid').insertRow(rowdata);
	var jsjeCell = row.getCell("jsje");
	var hddeCell = row.getCell("hdzsHdde");
	var hdblCell = row.getCell("hdzsHdbl");
	yhssbGrid.cellDisable(hdblCell);
	yhssbGrid.cellDisable(hddeCell);
	// //设置计税金额，核定数据项是否可用
	var len = $w("yhssbGrid").getInsertRows().length;
	zspmArray = new Array();
}

/*******************************************************************************
 * 通过行政区划代码过滤街道乡镇下列列表数据
 * 
 * @param {}
 *            dataObj
 * @param {}
 *            inputEl
 * @param {}
 *            obj
 * @return {}
 */
function jdxzFilter(dataObj, inputEl, obj) {
	var xzqhDm = $w("nsrxxForm").getValue("xzqhszDm");
	var newData = [];// 新列表数据
	if (!$chk(xzqhDm)) {
		return newData;
	}
	dataObj.each(function(item, index) {
		if (item.xzqhDm == xzqhDm)
			newData[newData.length] = item;
	});
	return newData;
}

/*******************************************************************************
 * 行政区划改变，清空街道乡镇
 * 
 * @param {}
 *            obj
 */
function changeXzqh(obj) {
	$w("nsrxxForm").setValue("jdxzDm", "");
}

// 加载征收品目列表从量
var cxbj = 'N';
function loadZxpmList(rowData, rowEl, item) {
	if (!$chk(gt3.zrd) || cxbj == 'Y') {// 有税费种认定的话，则取税费种认定，不做查询；有过一次查询不在查询第二次
		return;
	}
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	var pmBtn = new SwordSubmit();
	pmBtn.pushData("djzclxDm", nsrxxVO['djzclxDm']);
	pmBtn.pushData("skssqq", skssqq);
	pmBtn.pushData("skssqz", skssqz);
	pmBtn.pushData("flag", "PM");
	pmBtn.pushData("bj", "Y");
	pmBtn.setCtrl("SB024ZyssbCtrl_loadZspmOrZmList");
	pmBtn.setOptions({
		'onSuccess' : function(req, res) {
			var zspmList = pc.getResData("zspmList", res);
			if ($chk(zspmList)) {
				for ( var i = 0; i < zspmList.trs.length; i++) {
					zspmArray[i] = zspmList.trs[i].tds.code.value;
					cxbj = 'Y';
				}
			}
		}
	});
	pmBtn.submit();
}

// 减免或预缴填写前查询
var jmcxbz;
function queryJmxxAndYjsk(e) {
	var grid = $w('yhssbGrid');
	var rowData = grid.getCheckedRowData();
	var zspmDm = rowData.getValue("zspmDm");

	// 对于自然人或无税费种认定情况,需要重新查询预缴,减免
	if (gt3.zrrBz == 'Y' || gt3.zrd == 'N' || cwgzbz == 'cwgzbz') {
		var skssqq = $w("nsrxxForm").getValue("skssqq");
		var skssqz = $w("nsrxxForm").getValue("skssqz");
		var sbsxDm1 = $w("nsrxxForm").getValue('sblx').code;
		var zrrBtn1 = new SwordSubmit();
		zrrBtn1.pushData('djxh', gt3.djxh);
		zrrBtn1.pushData('nsqxDm', gt3_nsqx);
		zrrBtn1.pushData('sbsxDm1', sbsxDm1);
		zrrBtn1.pushData('zsxmDm', gt3.zsxmDm);
		zrrBtn1.pushData('zspmDm', zspmDm);
		zrrBtn1.pushData('skssqq', skssqq);
		zrrBtn1.pushData('skssqz', skssqz);
		zrrBtn1.pushData('bj', "Y");
		zrrBtn1.pushData('cxbz', e);
		zrrBtn1.setCtrl('SB024ZyssbCtrl_queryJmxxAndYjsk');
		zrrBtn1.setOptions({
			'onSuccess' : function(req, res) {
				if (e == 'jm') {
					gt3_jmxxList = pc.getResData("jmxxList", res);
					jmcxbz = 'Y';// 查询一次不在查询
				} else if (e == 'yj') {
					gt3_yjxxList = pc.getResData("yjxxList", res);
				}
			}
		});
		if ((e == 'jm' && jmcxbz != 'Y') || e == 'yj') {
			zrrBtn1.submit();
		}
	}
}

/**
 * 获取默认纳税期限代码
 * 
 * @param {}
 *            zsxmDm 征收项目代码
 * @param {}
 *            zspmDm 征收品目代码
 * @return {} nsqxDm 纳税期限代码
 */
function getMrNsqxDm(zsxmDm, zspmDm) {
	var nsqxDm = null;
	var qxBtn = new SwordSubmit();
	qxBtn.pushData("zsxmDm", zsxmDm);
	qxBtn.pushData("zspmDm", zspmDm);
	qxBtn.setCtrl("SB175FxmtysbCtrl_getMrNsqxDm");
	qxBtn.setOptions({
		"onSuccess" : function(req, res) {
			nsqxDm = res.getAttr("nsqxDm");
		}
	});
	qxBtn.submit();
	return nsqxDm;
}

// 检查重复申报
function checkCfYqSb(grid, zspmDm, row) {
	// 不在税费种认定中，调用公共方法获取纳税期限
	var zspmIsRd = "0";
	if ($chk(gt3_sbxxList)) {
		for ( var i = 0; i < gt3_sbxxList.trs.length; i++) {
			var tempData = gt3_sbxxList.trs[i].tds;
			if (zspmDm == tempData.zspmDm.value) {
				gt3_nsqx = tempData.nsqxDm.value;
				zspmIsRd = "1";
				break;
			}
		}
	}
	if ("0" == zspmIsRd) {
		// 纳税人为自然人默认属期按次
		if (gt3.zrrBz == "Y") {
			gt3_nsqx = "11";
		} else {
			gt3_nsqx = getMrNsqxDm(gt3.zsxmDm, zspmDm);
		}
	}
	if (cwgzbz == 'cwgzbz') {// 错误更正不监控重复申报
		return;
	}

	var msg = "";
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	var subBtn = new SwordSubmit();
	subBtn.pushData("djxh", gt3.djxh);
	subBtn.pushData("skssqq", skssqq);
	subBtn.pushData("skssqz", skssqz);
	subBtn.pushData("nsqxDm", gt3_nsqx);
	subBtn.pushData("zspmDm", zspmDm);
	subBtn.pushData("bj", "Y");
	subBtn.pushData("sbsxDm1", $w("nsrxxForm").getValue('sbsxDm1').code);
	subBtn.setCtrl("SB024ZyssbCtrl_checkCfYqSb");
	subBtn.setOptions({
		"onSuccess" : function(req, res) {
			msg = res.getAttr("msg");
			if ($chk(msg)) {
				data = {
					tds : {
						msg : {
							value : "cfsb"
						}
					}
				};
				grid.updateRow(row, data);
				swordAlert(msg);
			} else {
				data = {
					tds : {
						msg : {
							value : ""
						}
					}
				};
				grid.updateRow(row, data);
			}
		}
	});
	subBtn.submit();
}

// 减免性质变化
function changeJmxz(option, selItem, obj) {
	var ssjmxzDm = selItem.code;

	// 减免性质为空，清空减免税额
	if (!$chk(ssjmxzDm)) {
		var yhssbGrid = $w("yhssbGrid");
		var row = yhssbGrid.getCheckedRow();
		var rowData = yhssbGrid.getCheckedRowData();
		yhssbGrid.updateCell(row.getCell("jmse"), "0.00");
		var bqynse = rowData.getValue("bqynse") / 1;
		var phjmse = 0.00;
		bqsfsyxgmyhzc = $w('nsrxxForm').getValue("bqsfsyxgmyhzc").code;
		if (bqsfsyxgmyhzc == "Y") {
			phjzbl = $w('nsrxxForm').getValue("phjzbl");
			phjmse = calPhjmse(bqynse, 0.00, phjzbl);
		}
		if (sfsyzs == "Y") {
			phjmse = phjmse.multiple(phzsbl / 1);
		}
		phjmse = phjmse.round(2);
		var bqybtse = (bqynse / 1).subtract(rowData.getValue('bqyjse1') / 1)
				.subtract(phjmse / 1);
		var zspmDm = rowData.getValue('zspmDm');
		bqybtse = jsyhsje(zspmDm, bqybtse);
		yhssbGrid.updateCell(row.getCell("phjmse"), phjmse);
		yhssbGrid.updateCell(row.getCell("bqybtse"), bqybtse);
	} else {
		// 校验是否备案
		var skxxGrid = $w('yhssbGrid');
		var row = skxxGrid.getCheckedRow();
		var rowData = skxxGrid.getCheckedRowData();
		var jsyj = rowData.getValue("jsje");
		var bqynse = rowData.getValue("bqynse");

		if (bqynse == 0) {
			skxxGrid.updateCell(row.getCell("ssjmxzDm"), "");
			swordAlert("本期应纳税额为0时，不能录入减免性质");
			return;
		}
		pandSpbz(option, selItem, obj);
		var fdsl = rowData.getValue("sysl");
		var jmse = changeJmxzXXCl(selItem, skxxGrid, jsyj, bqynse.round(2),
				fdsl);
		jmse = jmse.round(2);
		if (jmse > bqynse) {
			jmse = bqynse;
		}
		var phjmse = 0.0;
		if (bqsfsyxgmyhzc == "Y") {
			phjzbl = $w('nsrxxForm').getValue("phjzbl");
			phjmse = calPhjmse(bqynse, jmse, phjzbl);
		}
		if (sfsyzs == "Y") {
			phjmse = phjmse.multiple(phzsbl / 1);
		}
		phjmse = phjmse.round(2);
		var bqybtse = (bqynse / 1).subtract(jmse / 1).subtract(phjmse / 1)
				.subtract(rowData.getValue('bqyjse1') / 1);
		var zspmDm = rowData.getValue('zspmDm');
		bqybtse = jsyhsje(zspmDm, bqybtse);
		var dataObj = {
			tds : {
				jmse : {
					value : jmse
				},
				jmsemr : {
					value : jmse
				},
				bqybtse : {
					value : bqybtse
				},
				phjmse : {
					value : phjmse
				}
			}
		};
		skxxGrid.updateRow(row, dataObj);
	}
}
/*******************************************************************************
 * 所属期起改变
 */
function changeSsqq() {
	var yhssbForm = $w("nsrxxForm");
	var ssqzBtn = new SwordSubmit();
	var skssqq = yhssbForm.getValue("skssqq");
	if (!$chk(skssqq)) {
		swordAlert("税款所属期起不能为空!");
		return;
	}
	queryNsqx(skssqq);
	ssqzBtn.setCtrl("SBGyCtrl" + "_jsskssqz");
	ssqzBtn.setFunction('onSuccess', 'loadBaseInfo1');
	ssqzBtn.setFunction('onError', "loadBaseInfo1OnError");
	ssqzBtn.pushData('skssqq', skssqq);
	ssqzBtn.pushData('nsqxdm', gt3.uniqueNsqx);
	ssqzBtn.submit();
}
function loadBaseInfo1OnError() {
	$w('yhssbGrid').reset();
	$w("nsrxxForm").setValue("skssqq", "");
	$w("nsrxxForm").setValue("skssqz", "");
}
function loadBaseInfo1(req, res) {
	var yhssbForm = $w("nsrxxForm");
	var skssqq = res.getAttr("skssqq");
	var skssqz = res.getAttr("skssqz");
	if ($chk(gt3.uniqueNsqx)) {
		yhssbForm.setValue("skssqz", skssqz);
		yhsnsqxDm = gt3.uniqueNsqx;
		checkSkssqz();
	} else {
		yhssbForm.setValue("skssqz", "");
		// 电子税务局特色改造，.focus()报js错误 start
		// yhssbForm.getFieldEl("skssqz").focus();
		// 电子税务局特色改造，.focus()报js错误 end
		$w("yhssbGrid").reset();
		if (nsrzgsfxgm == "N") {
			$w('nsrxxForm').setValue("bqsfsyxgmyhzc", "N");
		} else {
			$w("nsrxxForm").setValue('bqsfsyxgmyhzc', "");
		}
		$w("nsrxxForm").setValue("phjmxzDm", "");
		$w("nsrxxForm").setValue("phjzbl", "");
		$w("nsrxxForm").setValue("phjmswsxDm", "");
	}
	gt3.uniqueNsqx = "";
}
function queryNsqx(skssqq) {
	var ssqqBtn = new SwordSubmit();
	ssqqBtn.setCtrl("SB025YhssbCtrl_queryYhsRdInfo");
	ssqqBtn.setFunction('onSuccess', 'loadBaseInfo2');
	ssqqBtn.pushData('nsrxxVO', JSON.encode(JSON.decode(nsrxxJsonVO)));
	// 电子税务局特色改造，传nsrxxForm，要不然后台空指针报错 start
	ssqqBtn.pushData($w("nsrxxForm").getSubmitData());
	// 电子税务局特色改造，传nsrxxForm，要不然后台空指针报错 end
	ssqqBtn.pushData('skssqq', skssqq);
	ssqqBtn.submit();
}
function loadBaseInfo2(req, res) {
	gt3.nsqxList = pc.getResData("nsqxList", res);
	if ($chk(gt3.nsqxList)) {
		var sbxxListTds = gt3.nsqxList.trs;
		var sksqq1 = ($w("nsrxxForm").getValue('skssqq')).split("-")[1] / 1;
		var sksqz1 = ($w("nsrxxForm").getValue('skssqz')).split("-")[1] / 1;
		var ssqleng = sksqz1 - sksqq1;
		if (ssqleng == 0) {
			ssqleng = "06";// 月
		} else if (ssqleng == 2) {
			ssqleng = "08";// 季
		} else if (ssqleng == 11) {
			ssqleng = "10";// 年
		} else if (ssqleng == 5) {
			ssqleng = "09";// 半年
		}
		for ( var i = 0; sbxxListTds.length > i; i++) {// 循环sbxxListTds取出与页面属期相匹配的纳税人期限代码
			if (sbxxListTds[i].tds.nsqxDm.value == ssqleng) {// 属期先减结果集与sbxxListTds相匹配并取出纳税期限。
				gt3.uniqueNsqx = sbxxListTds[i].tds.nsqxDm.value;
				break;
			}
		}
		if (!$chk(gt3.uniqueNsqx)) {// 属期相减结果与sbxxListTds中的纳税期限没有匹配成功是默认给出第一条数据的纳税人期限
			gt3.uniqueNsqx = sbxxListTds[0].tds.nsqxDm.value;
		}
	}else{
		gt3.uniqueNsqx = "06";
	}
}
/**
 * 查询认定的纳税期限
 * 
 * @param type
 * @return
 */
function checkYhsRdInfo(type) {
	gt3.type = type;
	gt3.nsqxList = "";
	gt3.uniqueNsqx = "";
	var submitBtn = new SwordSubmit();
	submitBtn.setCtrl("SB025YhssbCtrl_queryYhsRdInfo");
	submitBtn.setFunction('zrrBz', gt3.zrrBz);
	submitBtn.setFunction('onSuccess', 'queryRdOnSuccess');
	submitBtn.pushData($w("nsrxxForm").getSubmitData());
	submitBtn.pushData('nsrxxVO', JSON.encode(JSON.decode(nsrxxJsonVO)));
	submitBtn.submit();
}

/**
 * 查询认定的纳税期限成功回调
 * 
 * @param req
 * @param res
 * @return
 */
function queryRdOnSuccess(req, res) {
	var rdFlag = res.getAttr("rdFlag");
	if (rdFlag == "1") {
		gt3.nsqxList = res.getData("nsqxList");
		var submitBtn = new SwordSubmit();
		submitBtn.setCtrl("SB025YhssbCtrl_openNsqxPage");
		swordAlertIframe('', {
			titleName : '选择印花税申报纳税期限',
			width : 500,
			height : 300,
			param : window,
			isNormal : 'true',
			isMax : 'true',
			isClose : 'false',
			isMin : "false",
			submit : submitBtn
		});
	} else {
		changeSbssqz(gt3.type);
	}
}

/**
 * 选择纳税期限回调
 * 
 * @param nsqxDm
 * @return
 */
function chooseNsqxCallBack(nsqxDm) {
	gt3.uniqueNsqx = nsqxDm;
	if ($chk(nsqxDm)) {
		changeSbssqz(gt3.type);
	}
}

/**
 * 校验所属期是否符合要求
 * 
 * @param ssqq
 * @param ssqz
 * @param nsqxDm
 * @return
 */
function checkDate2(ssqq, ssqz, nsqxDm) {
	var qDates = splitStr(ssqq);
	var zDates = splitStr(ssqz);
	if (ssqq == undefined || ssqq == "") {
		return "所属期起不能为空";
	}
	if (ssqq == "" || ssqz == "") {
		return null;
	}
	if (ssqq.substring(0, 10) > ssqz.substring(0, 10)) {
		return "所属期起不能大于所属期止";
	}
	if (nsqxDm == "11") {
	} else {
		if (parseInt(qDates[2], 10) != 1) {
			return "所属期起必须为某月的第一天";
		}
		if (qDates[0] != zDates[0]) {
			return "所属期起和所属期止必须在同一年!";
		}
		if (!((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 3)
				|| (parseInt(qDates[1], 10) == 4 && parseInt(zDates[1], 10) == 6)
				|| (parseInt(qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 9) || (parseInt(
				qDates[1], 10) == 10 && parseInt(zDates[1], 10) == 12))
				&& !((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 6) || (parseInt(
						qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 12))
				&& !((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 12))
				&& parseInt(qDates[1], 10) != parseInt(zDates[1], 10)) {
			return "所属期不合法，必须为整年、半年、季或月";
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			return "所属期止必须为某月的最后一天";
		}
	}
	return null;
}

/**
 * 根据所属期取纳税期限代码
 * 
 * @param skssqq
 * @param skssqz
 * @return
 */
function getNsqxDm(skssqq, skssqz) {
	var nsqxDm = "";
	var qDates = splitStr(skssqq);// 年月日的数组
	var zDates = splitStr(skssqz);// 年月日的数组
	if (skssqq == skssqz) {
		nsqxDm = "11";// 按次
	} else if (parseInt(zDates[1], 10) == parseInt(qDates[1], 10)) {
		nsqxDm = "06";// 按月申报
	} else if ((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 3)
			|| (parseInt(qDates[1], 10) == 4 && parseInt(zDates[1], 10) == 6)
			|| (parseInt(qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 9)
			|| (parseInt(qDates[1], 10) == 10 && parseInt(zDates[1], 10) == 12)) {
		nsqxDm = "08";// 按季
	} else if ((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 6)
			|| (parseInt(qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 12)) {
		nsqxDm = "09";// 按半年
	} else if ((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 12)) {
		nsqxDm = "10";// 按年
	}
	return nsqxDm;
}

/**
 * 通过纳税期限代码获取纳税期限名称
 * 
 * @param nsqxDm
 * @return
 */
function getNsqxMcByDm(nsqxDm) {
	var nsqxMc = "";
	if ("01" == nsqxDm) {
		nsqxMc = "一天";
	} else if ("02" == nsqxDm) {
		nsqxMc = "三天";
	} else if ("03" == nsqxDm) {
		nsqxMc = "五天";
	} else if ("04" == nsqxDm) {
		nsqxMc = "十天";
	} else if ("05" == nsqxDm) {
		nsqxMc = "十五天";
	} else if ("06" == nsqxDm) {
		nsqxMc = "月";
	} else if ("07" == nsqxDm) {
		nsqxMc = "六十天";
	} else if ("08" == nsqxDm) {
		nsqxMc = "季";
	} else if ("09" == nsqxDm) {
		nsqxMc = "半年";
	} else if ("10" == nsqxDm) {
		nsqxMc = "年";
	} else if ("11" == nsqxDm) {
		nsqxMc = "次";
	} else if ("12" == nsqxDm) {
		nsqxMc = "定额期";
	} else if ("99" == nsqxDm) {
		nsqxMc = "其他";
	}
	return nsqxMc;
}

/**
 * 过滤减免性质
 * 
 * @param dataObj
 * @param inputEl
 * @param obj
 * @return
 */
function jmxzFilter(dataObj, inputEl, obj) {
	var jmxzList = [];
	var zsxmDm;
	var zspmDm;
	var rowData = $w("yhssbGrid").getCheckedRowData();
	if (!$chk(rowData) || rowData == null || rowData == undefined) {
		return dataObj;
	} else {
		zspmDm = rowData.getValue("zspmDm");
	}
	var queryBtn = new SwordSubmit();

	queryBtn.pushData("djxh", gt3.djxh);
	queryBtn.pushData("zsxmDm", "10111");
	queryBtn.pushData("zspmDm", zspmDm);
	queryBtn.pushData("skssqq", $w("nsrxxForm").getValue("skssqq"));
	queryBtn.pushData("skssqz", $w("nsrxxForm").getValue("skssqz"));
	queryBtn.setOptions({
		async : 'false',
		mask : 'false',
		ctrl : 'SBGyCtrl_setJmxzxx',
		onSuccess : function(req, res) {
			jmxzList = res.getDataByDataName("jmxzList").data;
		}
	});
	queryBtn.submit();
	return jmxzList;
}
/**
 * 打印
 * 
 * @param
 * @param
 * @return
 */
function click_printYhs() {
	var printBtn = new SwordSubmit();
	var nsrxxForm = $w("nsrxxForm").getSubmitData();// 纳税人信息
	var yhssbGrid = $w("yhssbGrid").getAllNoDeleteGridData();// 印花税申报表
	var slxxForm = $w("slxxForm").getSubmitData();// 受理信息
	printBtn.pushData("djxh", gt3.djxh);
	printBtn.pushData(nsrxxForm);
	printBtn.pushData(yhssbGrid);
	printBtn.pushData(slxxForm);
	printBtn.setCtrl("SB025YhssbCtrl_printYhsxx");
	swordOpenWin('/sword?ctrl=SB025YhssbCtrl_printYhsxx&r=' + Math.random(),
			printBtn);
	printBtn.setFunction("onError", "onErrorPrint");
}

/**
 * 文书补打
 * 
 * @param resData
 * @return
 */
function initBd(resData) {
	$w("nsrxxForm").disable();
	$w("slxxForm").disable();
	var ywwsuuid = pc.getResData("ywwsuuid", resData) == null ? "" : pc
			.getResData("ywwsuuid", resData).value;
	var dzbzdszlDm = pc.getResData("dzbzdszlDm", resData) == null ? "" : pc
			.getResData("dzbzdszlDm", resData).value;
	if ($chk(ywwsuuid)) {
		var hiddenSubmit = new SwordSubmit();
		hiddenSubmit.pushData("ywwsuuid", ywwsuuid);
		hiddenSubmit.pushData("dzbzdszlDm", dzbzdszlDm);
		hiddenSubmit.setCtrl("SB025YhssbCtrl_initBd");
		hiddenSubmit.submit();
	}
}

/**
 * 检查录入的所属期起止
 * 
 * @param skssqq
 * @param skssqq
 * @return
 */
function checkSkssqqzForyhs(skssqq, skssqz) {
	var qDates = splitStr(skssqq);
	var zDates = splitStr(skssqz);
	if (qDates[0] != zDates[0]) {
		swordAlert("所属期起和所属期止必须在同一年！");
		yhsnsqxDm = "";
		return false;
	}
	if (!((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 3)
			|| (parseInt(qDates[1], 10) == 4 && parseInt(zDates[1], 10) == 6)
			|| (parseInt(qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 9) || (parseInt(
			qDates[1], 10) == 10 && parseInt(zDates[1], 10) == 12))
			&& !((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 6) || (parseInt(
					qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 12))
			&& !((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 12))
			&& parseInt(qDates[1], 10) != parseInt(zDates[1], 10)) {
		swordAlert("所属期不合法，必须为整年、半年、季或月！");
		yhsnsqxDm = "";
		return false;
	}
	if (parseInt(qDates[1], 10) == parseInt(zDates[1], 10)) {
		if (parseInt(qDates[2], 10) != 1) {
			swordAlert("按月申报，所属期起必须为某月的第一天！");
			yhsnsqxDm = "";
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			swordAlert("按月申报，所属期止必须为某月的最后一天！");
			yhsnsqxDm = "";
			return false;
		}
		yhsnsqxDm = "06";
		return true;
	}
	// 按季申报
	if (((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 3)
			|| (parseInt(qDates[1], 10) == 4 && parseInt(zDates[1], 10) == 6)
			|| (parseInt(qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 9) || (parseInt(
			qDates[1], 10) == 10 && parseInt(zDates[1], 10) == 12))) {
		if (parseInt(qDates[2], 10) != 1) {
			swordAlert("按季申报，所属期起必须为季初！");
			yhsnsqxDm = "";
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			swordAlert("按季申报，所属期止必须为为季末！");
			yhsnsqxDm = "";
			return false;
		}
		yhsnsqxDm = "08";
		return true;
	}
	// 按半年申报
	if ((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 6)
			|| (parseInt(qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 12)) {
		if (!(parseInt(qDates[2], 10) == 1)) {
			swordAlert("按半年申报，所属期起必须为某半年的第一天！");
			yhsnsqxDm = "";
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			swordAlert("按半年申报，所属期起必须为某半年的最后一天！");
			yhsnsqxDm = "";
			return false;
		}
		yhsnsqxDm = "09";
		return true;
	}
	// 按年申报
	if ((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 12)) {
		if (parseInt(qDates[2], 10) != 1) {
			swordAlert("按年申报，所属期起必须为年初！");
			yhsnsqxDm = "";
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			swordAlert("按年申报，所属期止必须为年末！");
			yhsnsqxDm = "";
			return false;
		}
		yhsnsqxDm = "10";
		return true;
	}
}

function checkyhsSkssqz() {
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	if (!$chk(skssqq) || !$chk(skssqz)) {
		return;
	}
	if ($chk(skssqz) && skssqz != undefined && $chk(skssqq)
			&& skssqq != undefined) {
		if (skssqq.substring(0, 10) > skssqz.substring(0, 10)) {
			swordAlert("所属期止不能小于所属期起!");
			$w("nsrxxForm").setValue("skssqz", "");
			return;
		}
	}
	var qDates = splitStr(skssqq);
	var zDates = splitStr(skssqz);
	// 按次申报
	if ((parseInt(qDates[0], 10) == parseInt(zDates[0], 10))
			&& (parseInt(qDates[1], 10) == parseInt(zDates[1], 10))
			&& (parseInt(qDates[2], 10) == parseInt(zDates[2], 10))) {
		yhsnsqxDm = "11";
	} else {
		if (!checkSkssqqzForyhs(skssqq, skssqz)) {
			$w("nsrxxForm").setValue("skssqz", "");
			$w("sbToolBar").setDisabled('save');
			return;
		}
	}
	checkSkssqz();
}
// 油气田分配相关js________________________
var yqtfbopen = false;
function setdata(inputEl) {
	var id = inputEl.get("code");
	var dfpGrid = null;
	var btn = new SwordSubmit();
	btn.pushData("id", id);
	// 是否加载附表页面
	btn.pushData("flag", "N");
	btn.pushData($w("yhssbGrid").getAllNoDeleteGridData());
	btn.setOptions({
		'onSuccess' : function(req, res) {
			dfpGrid = pc.getResData("dfpGrid", res);
		}
	});
	btn.setCtrl(ctrl + "_toSbfb");
	btn.submit();
	if (sb025_cszForXML != "SBCWGZ") {
		_arrVars_NOywpt['yqtfpGrid'] = null;
	}

	if ($chk($("yqtfb_iframe")) && $chk($("yqtfb_iframe").contentWindow)
			&& yqtfbopen) {
		try {
			_arrVars_NOywpt['yqtfpGrid'] = $("yqtfb_iframe").contentWindow.$w(
					"yqtfpGrid").getAllNoDeleteGridData();
		} catch (e) {
			_arrVars_NOywpt['yqtfpGrid'] = null;
		}
	}
	_arrVars_NOywpt['dfpGrid'] = dfpGrid;
	openTab(inputEl);
}

function openTab(inputEl) {
	var id = inputEl.get("code");
	if ("00" != id) {
		$("yhssb_div").style.display = "none";
		$("yqtfb_div").style.display = "";
	} else {
		$("yhssb_div").style.display = "";
		$("yqtfb_div").style.display = "none";
	}
	if ("00" != id) {
		var btn = new SwordSubmit();
		btn.pushData("id", id);
		if (!yqtfbopen) {
			// 是否初次加载附表
			yqtfbopen = true;
			btn.options.postType = "form_yqtfb_iframeName";
			btn.pushData("flag", "Y");
			btn.pushData($w("yhssbGrid").getAllNoDeleteGridData());
			btn.setCtrl(ctrl + "_toSbfb");
			btn.submit();
		} else {
			$("yqtfb_iframe").contentWindow.init();
		}
	}
}
// 油气田分配相关js结束____________________
/**
 * 获取默认税款属期起止时间
 */
function getMrSkssqzTime() {
	if (gt3.djxh == undefined || gt3.djxh == null || gt3.djxh == "") {
		return;
	}
	var jyBtn = new SwordSubmit();
	jyBtn.pushData('djxh', gt3.djxh);
	jyBtn.pushData('zrrBz', gt3.zrrBz);
	jyBtn.setCtrl(ctrl + "_getMrSkssqzTime");
	jyBtn.setFunction('onSuccess', 'getSkssqzTimeSuccess');
	jyBtn.submit();
}

/**
 * 获取默认税款属期起止时间成功回调函数
 */
function getSkssqzTimeSuccess(req, resData) {
	// 获得后台传过来的系统日期
	if (!zxswdjFlag) { // 注销税务登记，不计算属期
		$w("nsrxxForm").setValue('skssqq', resData.getAttr('skssqq'));
		$w("nsrxxForm").setValue('skssqz', resData.getAttr('skssqz'));
	}
	checkyhsSkssqz();
}
/*******************************************************************************
 * 打印
 */
function print() {
	// var yhssbGridData = $w("yhssbGrid").getAllNoDeleteGridData();
	// var nsrxxForm = $w("nsrxxForm").getSubmitData();
	// var slxxForm = $w("slxxForm").getSubmitData();
	// var jsjeHj = 0.00;
	// var bqybtseHj = 0.00;
	// if ($chk($w("yhssbGrid"))) {
	// var hjRow = $w('yhssbGrid').hjRow;// 取到合计div元素
	// var HjDiv = hjRow.getElements("div");// 取到合计cell数组
	// jsjeHj = HjDiv[1].get("realvalue");
	// bqybtseHj = HjDiv[9].get("realvalue");
	// }
	// var printBtn = new SwordSubmit();
	// printBtn.pushData(nsrxxForm);
	// printBtn.pushData(slxxForm);
	// printBtn.pushData(yhssbGridData);
	// printBtn.pushData("jsjeHj", jsjeHj);
	// printBtn.pushData("bqybtseHj", bqybtseHj);
	// printBtn.setCtrl(ctrl + "_print");
	// swordOpenWin('/sword?ctrl=' + ctrl + '_print&r=' + Math.random(),
	// printBtn);
	gyTaxPrintWordOrExcel();
}
/*******************************************************************************
 * 打印回执
 */
function printHz() {
	var printBtn = new SwordSubmit();
	printBtn.pushData("yzpzxh", yzpzxh);
	printBtn.pushData("sbbmc", "印花税申报回执");
	printBtn.setCtrl("SBDyCtrl" + "_printHz");
	swordOpenWin('/sword?ctrl=' + "SBDyCtrl" + '_printHz&r=' + Math.random(),
			printBtn);
}

function printhtm() {
	return false;
	gyTaxPrintWordOrExcel();
}

var printTitle = "";
var dymbuuid = "";
var caculateGridHJFlag = "Y";
var hxdyForPrint = "Y";
var printFileType = "excel";
var ccbg;

function setZbdymbuuid() {
	printTitle = "印花税申报信息";
	dymbuuid = "sb025_yhssbprint";
	printMode = '{"PRINT_PAGE_PERCENT":"94%"}';
	ccbg = "Y";
	return "sb025_yhssbprint";
}
// 更改纳税期限调用方法
function checkYhsRdInfonsqx() {
	var nsqxDm = $w("nsrxxForm").getValue("nsqxDm").code;
	var nsqxBtn = new SwordSubmit();
	yhsnsqxDm = nsqxDm;
	if (nsqxDm == "") {
		nsqxBtn.stop;
		return;
	} else {
		nsqxBtn.pushData("nsqxDm", nsqxDm);
		nsqxBtn.setCtrl(ctrl + "_nsqxChange");
		nsqxBtn.setFunction('onSuccess', 'checkSkssqzNsqx');
		nsqxBtn.submit();
	}
}
// 更改纳税期限回调方法
function checkSkssqzNsqx(req, resData) {
	var skssqq = resData.getData("skssqq").value;
	// 更新“skssqq”“skssqz”
	var skssqz = resData.getData("skssqz").value;
	$w("nsrxxForm").setValue("skssqq", skssqq);
	$w("nsrxxForm").setValue("skssqz", skssqz);
	if (gt3.djxh == undefined || gt3.djxh == null || gt3.djxh == "") {
		return;
	}
	var ssqzBtn = new SwordSubmit();
	ssqzBtn.setCtrl(ctrl + "_changeSbssqq");
	ssqzBtn.setFunction('onSuccess', 'loadBaseInfo');
	ssqzBtn.pushData('nsrxxVO', JSON.encode(JSON.decode(nsrxxJsonVO)));
	ssqzBtn.pushData($w("nsrxxForm").getSubmitData());
	ssqzBtn.pushData('zrrBz', gt3.zrrBz);
	ssqzBtn.pushData("gt3nsqx", yhsnsqxDm);
	ssqzBtn.pushData("uniqueNsqx", yhsnsqxDm);
	ssqzBtn.submit();
}
// 根据《财政部 税务总局关于对营业账簿减免印花税的通知》（财税〔2018〕50
// 号）文件要求，为切实落实纳税人税收优惠应享尽享，现对网上申报系统印花税申报模块进行优化。
function yhts(zspmDm) {
	var skssqq = ($w("nsrxxForm").getFormData().skssqq).substring(0, 4);
	if ("Y" == yhskg && Number(skssqq) >= 2018) {
		if ("101110599" == zspmDm) {
			swordAlert("2018年5月1日起，对按件贴花五元的其他账簿，可通过选择减免性质代码‘0009129907|其他账簿免征印花税|《财政部 税务总局关于对营业账簿减免印花税的通知》 财税〔2018〕50号’，享受其他账簿免征印花税");
		}
		if ("101110501" == zspmDm) {
			swordAlert("2018年5月1日之后到账的实收资本和资本公积，可通过选择减免性质代码‘0009129906|资金账簿减半征收印花税|《财政部 税务总局关于对营业账簿减免印花税的通知》 财税〔2018〕50号’，享受资金账簿减半征收印花税");
		}
	}
}
function downloadEX() {
	var ctrlSub = new SwordSubmit();
	ctrlSub.options.postType = "download";
	ctrlSub
			.setCtrl("DrPublicPageCtrl_download?fileName=/template/sb/sb025/TAX_SB_025_Yhssb_V1.0.xls");
	ctrlSub.submit();
}
/*******************************************************************************
 * 打印回执
 */
function printHz() {
	var printBtn = new SwordSubmit();
	printBtn.pushData("yzpzxh", yzpzxh);
	printBtn.pushData("sbbmc", "印花税申报回执");
	printBtn.setCtrl("SBDyCtrl" + "_printHz");
	swordOpenWin('/sword?ctrl=' + "SBDyCtrl" + '_printHz&r=' + Math.random(),
			printBtn);
}

function zzsxgmnsr(selectDiv, selectData, selectObj) {
	sfsyzs = "N";
	nsqx2zszg = "N";
	var yhssbGrid = $w("yhssbGrid");
	var nsrxxForm = $w("nsrxxForm");
	// 电子税务局特色改造，当为一般纳税人且选择是时，提示start
	var bqsfsyxgmyhzc = nsrxxForm.getValue("bqsfsyxgmyhzc").code;
	if ("Y" == nsrzgsfxgm && "N" == bqsfsyxgmyhzc) {
		swordAlert("增值税小规模纳税人应适用增值税小规模纳税人地方税种和相关附加减征政策。");
		$w("nsrxxForm").setValue("bqsfsyxgmyhzc", "Y");
	} else if ("Y" == bqsfsyxgmyhzc && "N" == nsrzgsfxgm) {
		swordAlert("您是增值税一般纳税人，不应享受该减免。");
		$w("nsrxxForm").setValue("bqsfsyxgmyhzc", "N");
	} else if ("Y" != nsrzgsfxgm && "N" != nsrzgsfxgm && "X" != nsrzgsfxgm) {
		swordAlert("该申报属期内同时存在一般人纳税人和小规模纳税人资格信息，系统已经按照规则进行优惠折算。");
		$w("nsrxxForm").setValue("bqsfsyxgmyhzc", "Y");
		sfsyzs = "Y";
	}
	bqsfsyxgmyhzc = nsrxxForm.getValue("bqsfsyxgmyhzc").code;
	// 电子税务局特色改造，当为一般纳税人且选择是时，提示end
	if (bqsfsyxgmyhzc == "Y") {
		// 若选择 是,先取配置信息
		bqsfsyxgmyhzc = "Y";
		var skssqq = $w("nsrxxForm").getValue("skssqq");
		var skssqz = $w("nsrxxForm").getValue("skssqz");
		var result = getPhjmPzxx(null, skssqq, skssqz, gt3.zsxmDm, nsrxxForm);
		if (result) {
			nsrxxForm._itemSwitch("phjzbl", "text", {
				'rule' : 'must'
			});
			nsrxxForm._itemSwitch("phjmxzDm", "select", {
				'rule' : 'must'
			});
			nsrxxForm.disable('phjzbl');
			nsrxxForm.disable('phjmxzDm');
			// 校验资格
			var ret = checkPhjmzg(gt3.djxh, skssqq, skssqz, nsrxxForm);
			if (ret == "1" || ret == "0" || ret == "2") {
				// 若存在yhssbGrid,则自动计算
				if (yhssbGrid.totalRows() != 0) {
					var rowsData = yhssbGrid.getAllNoDeleteGridData();
					var rows = yhssbGrid.dataDiv().getChildren(
							'div[status!=delete]');
					var length = rowsData.trs.length;
					for ( var i = 0; i < length; i++) {
						var row = rows[i];
						var rowData = rowsData.trs[i];
						var zspmDm = rowData.tds.zspmDm.value;
						var bqynse = rowData.tds.bqynse.value;
						var jmse = rowData.tds.jmse.value;
						phjzbl = $w('nsrxxForm').getValue("phjzbl");
						var phjmse = calPhjmse(bqynse, jmse, phjzbl);
						if (sfsyzs == "Y") {
							phjmse = phjmse.multiple(phzsbl / 1);
						}
						phjmse = phjmse.round(2);
						var bqybtse = (bqynse / 1).subtract(jmse / 1).subtract(
								rowData.tds.bqyjse1.value / 1).subtract(
								phjmse / 1);
						bqybtse = jsyhsje(zspmDm, bqybtse);
						yhssbGrid.updateCell(row.getCell("phjmse"), phjmse);
						yhssbGrid.updateCell(row.getCell("bqybtse"), bqybtse);
					}
				}
			} else if (ret == "-1") {
				// 不能享受,操作错误
				bqsfsyxgmyhzc = $w('nsrxxForm').getValue("bqsfsyxgmyhzc").code;
				$w("nsrxxForm")._itemSwitch("phjzbl", "text", {
					'rule' : ''
				});
				$w("nsrxxForm")._itemSwitch("phjmxzDm", "select", {
					'rule' : ''
				});
			} else if (ret == "3") {
				checkzszg();
				if (yhssbGrid.totalRows() != 0) {
					var rowsData = yhssbGrid.getAllNoDeleteGridData();
					var rows = yhssbGrid.dataDiv().getChildren(
							'div[status!=delete]');
					var length = rowsData.trs.length;
					for ( var i = 0; i < length; i++) {
						var row = rows[i];
						var rowData = rowsData.trs[i];
						var zspmDm = rowData.tds.zspmDm.value;
						var bqynse = rowData.tds.bqynse.value;
						var jmse = rowData.tds.jmse.value;
						phjzbl = $w('nsrxxForm').getValue("phjzbl");
						var phjmse = calPhjmse(bqynse, jmse, phjzbl);
						if (sfsyzs == "Y") {
							phjmse = phjmse.multiple(phzsbl / 1);
						}
						phjmse = phjmse.round(2);
						var bqybtse = (bqynse / 1).subtract(jmse / 1).subtract(
								rowData.tds.bqyjse1.value / 1).subtract(
								phjmse / 1);
						bqybtse = jsyhsje(zspmDm, bqybtse);
						yhssbGrid.updateCell(row.getCell("phjmse"), phjmse);
						yhssbGrid.updateCell(row.getCell("bqybtse"), bqybtse);
					}
				}
			}
		} else {
			bqsfsyxgmyhzc = $w('nsrxxForm').getValue("bqsfsyxgmyhzc").code;
			$w("nsrxxForm")._itemSwitch("phjzbl", "text", {
				'rule' : ''
			});
			$w("nsrxxForm")._itemSwitch("phjmxzDm", "select", {
				'rule' : ''
			});
		}
	} else {
		$w("nsrxxForm")._itemSwitch("phjzbl", "text", {
			'rule' : ''
		});
		$w("nsrxxForm")._itemSwitch("phjmxzDm", "select", {
			'rule' : ''
		});
		bqsfsyxgmyhzc = "N";
		nsrxxForm.setValue("phjmxzDm", "");
		nsrxxForm.setValue("phjzbl", "");
		nsrxxForm.setValue("phjmswsxDm", "");
		if (yhssbGrid.totalRows() != 0) {
			var rowsData = yhssbGrid.getAllNoDeleteGridData();
			var rows = yhssbGrid.dataDiv().getChildren('div[status!=delete]');
			var length = rowsData.trs.length;
			for ( var i = 0; i < length; i++) {
				var row = rows[i];
				var rowData = rowsData.trs[i];
				var zspmDm = rowData.tds.zspmDm.value;
				var bqynse = rowData.tds.bqynse.value;
				var jmse = rowData.tds.jmse.value;
				var phjmse = 0.00;
				var bqybtse = (bqynse / 1).subtract(jmse / 1).subtract(
						rowData.tds.bqyjse1.value / 1).subtract(phjmse / 1);
				bqybtse = jsyhsje(zspmDm, bqybtse);
				yhssbGrid.updateCell(row.getCell("phjmse"), phjmse);
				yhssbGrid.updateCell(row.getCell("bqybtse"), bqybtse);
			}
		}
	}
}

// 查看纳税人是否具有则算资格
function checkzszg() {
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	var chkBtn = new SwordSubmit();
	chkBtn.setCtrl("SBGyCtrl_hasPhjmzg");
	chkBtn.setFunction('onSuccess', 'checkZsSuccess');
	chkBtn.pushData("djxh", gt3.djxh);
	chkBtn.pushData("skssqq", skssqq);
	chkBtn.pushData("skssqz", skssqz);
	chkBtn.submit();
}
function checkZsSuccess(req, resData) {
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	var qDates = splitStr(skssqq);// 年月日的数组
	var zDates = splitStr(skssqz);// 年月日的数组
	if (((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 6) || (parseInt(
			qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 12))
			|| ((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 12))) {
		nsqx2zszg = "Y";// 半年或者年 才会有折算
	}
	phzsbl = resData.getAttr("phzsbl");
	if (phzsbl != 1 && nsqx2zszg == "Y") {
		sfsyzs = "Y";
		swordAlert("该申报属期内同时存在一般人纳税人和小规模纳税人资格信息，系统已经按照规则进行优惠折算。");
	}
}
function jisuanafterphjmse() {
	var data;
	var grid1 = $w('yhssbGrid');// 表格对象
	// 普惠减免税额
	var phjmse = grid1.getCheckedRowData().getValue('phjmse') / 1;
	var bqynse = grid1.getCheckedRowData().getValue('bqynse') / 1;
	var jmse = grid1.getCheckedRowData().getValue('jmse') / 1;
	var bqybtse = grid1.getCheckedRowData().getValue('bqybtse') / 1;
	bqsfsyxgmyhzc = $w('nsrxxForm').getValue("bqsfsyxgmyhzc").code;
	if (bqsfsyxgmyhzc == "Y") {
		phjzbl = $w('nsrxxForm').getValue("phjzbl");
		var phjmseJs = calPhjmse(bqynse, jmse, phjzbl);
		if (sfsyzs == "Y") {
			phjmseJs = phjmseJs.multiple(phzsbl / 1);
		}
		if (phjmse > phjmseJs) {
			swordAlert("增值税小规模纳税人减征额不能大于" + phjmseJs.round(2) + "。");
			phjmse = phjmseJs.round(2);
		} else if (phjmse < 0) {
			swordAlert("增值税小规模纳税人减征额不能小于0。");
			phjmse = phjmseJs.round(2);
		}
		bqybtse = (bqynse / 1).subtract(jmse / 1).subtract(
				grid1.getCheckedRowData().getValue('bqyjse1') / 1).subtract(
				phjmse / 1);

		var zspmDm = grid1.getCheckedRowData().getValue('zspmDm');
		bqybtse = jsyhsje(zspmDm, bqybtse);

		data = {
			"tds" : {
				"phjmse" : {
					"value" : phjmse
				},
				"bqybtse" : {
					"value" : bqybtse
				}
			}
		};
		grid1.updateRow(grid1.getCheckedRow(), data);
	} else {
		data = {
			"tds" : {
				"phjmse" : {
					"value" : 0.00
				}
			}
		};
		grid1.updateRow(grid1.getCheckedRow(), data);
		swordAlert("选择不享用增值税小规模纳税人减征优惠时,增值税小规模纳税人减征额必须为0。");
	}
}

/**
 * 导出文档前确认导出文件类型
 * 
 * @return
 */
function beforeExport() {
	if(nmg_qz=="Y"){
		swordConfirm("请插入UK后点确定继续！", {
			okBtnName : "确定",
			//cancelBtnName : "Word文档",
			onOk : function() {
			var drxxBtn = new SwordSubmit();
		    drxxBtn.setCtrl('SB702SbdyCtrl_tzCaPage');
		    swordAlertIframe('', {
		        titleName: "申报加签",
		        width: 450,
		        height: 300,
		        param: window,
		        isNormal: 'true',
		        isMax: 'true',
		        isClose: 'true',
		        isMin: "true",
		        submit: drxxBtn
		    });
			}
		});
	    
	}else{
		swordConfirm("请选择要导出的文件类型！PDF文档适用于打印输出，Word文档可进行二次编辑。", {
			okBtnName : "PDF文档",
			cancelBtnName : "Word文档",
			onOk : function() {
				exportFile("PDF");
			},
			onCancel : function() {
				exportFile("DOC");
			}
		});
	}
	
}

/**
 * 导出文件
 */
function exportFile(format) {
	// 申报保存成功直接就在yzpzxh获取
	var pzxh = yzpzxh;
	if (!$chk(pzxh)) {
		// 错误更正的话，从gt3_cwgzMap获取（非业务平台开发）
		if ($chk(gt3_cwgzMap)) {
			pzxh = gt3_cwgzMap.data.pzxh.value;
		} else if ($chk(parent.$w("sbsjxxGrid"))) {
			// 申报表查看的话，从parent.$w("sbsjxxGrid")获取
			pzxh = parent.$w("sbsjxxGrid").getCheckedData('xz').trs[0].tds.pzxh.value;
		} else if (top.document.URL.indexOf('pzxh') > 0) {
			// 根据部署方式的不同，pzxh有可能在url里
			pzxh = top.document.URL.substring(
					top.document.URL.indexOf('pzxh') + 7, top.document.URL
							.indexOf('pzxh') + 27);
		}
	}
	var submit = new SwordSubmit();
	submit.setCtrl("SB702SbdyCtrl_printByPzxh");
	submit.pushData('pzxh', pzxh);
	submit.pushData('format', format);
	submit.options.postType = "form";
	submit.submit();
	// 下面代码先注释掉，使用pdfjs的时候可以用 by:张俊，2019年2月21日10:50:52
	/*
	 * if("PDF"==format&&(!$chk(document.documentMode)||(($chk(document.documentMode))&&(document.documentMode>10)))){
	 * //如果文档是PDF且浏览器支持html5的话（IE浏览器要求文档模式是10以上）直接打开预览 var
	 * param=encodeURIComponent('/sword?ctrl=SB702SbdyCtrl_printByPzxh?format='+format+'&pzxh='+pzxh);
	 * window.open('/gy/pdfjs/web/viewer.html?file='+param); }else{
	 * submit.submit(); }
	 */
}

/**
 * 控制导出按钮是否可用
 * 
 * @return
 */
function controlExportButton() {
	// 控制新版导出按钮是否可见
	if ('Y' == isEnableExportButton) {
		$w('sbToolBar').setDisplay('export');
		// pzxh不为空的情况下点亮导出按钮
		if ($chk(yzpzxh) || $chk(gt3_cwgzMap)
				|| ($chk(parent.$w("sbsjxxGrid")))
				|| (top.document.URL.indexOf('pzxh') > 0)) {
			$w('sbToolBar').setEnabled('export');
		} else {
			$w('sbToolBar').setDisabled('export');
		}
	} else {
		$w('sbToolBar').setHide('export');
	}
}
function fh(str){
	swordAlert(str);
	return;
}