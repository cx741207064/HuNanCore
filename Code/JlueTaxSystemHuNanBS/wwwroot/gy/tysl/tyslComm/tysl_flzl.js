var TYSL_FlZL_JSOBJ = (function() {
	var lcswsxDm = "";// 流程税务事项
	var ywlcDm = "";// 业务流程代码
	var zsxmDm = "";// 征收项目代码
	var slswsxDm = ""// 受理税务事项代码
	var slswsxmc = ""// 受理税务事项名称
	function queryFlzl(lcswsxDm) {// 查询附列资料、基本信息
		// debugger;
		var queryBtn = new SwordSubmit();
		queryBtn.pushData('lcswsxDm', lcswsxDm);
		queryBtn.setOptions({
			async : "true",
			mask : "false",
			ctrl : "TyslCtrl_initFlzl",
			onSuccess : function(req, res) {
				slswsxDm = res.getAttr('slswsxDm');
				ywlcDm = res.getAttr('ywlcDm');
				slswsxmc = res.getAttr('slswsxmc');
			}
		});
		queryBtn.submit();
	}
	function queryFlzlForYh(slswsxDm) {// 查询附列资料、基本信息
		// debugger;
		var queryBtn = new SwordSubmit();
		queryBtn.pushData('slswsxDm', slswsxDm);
		queryBtn.setOptions({
			async : "true",
			mask : "false",
			ctrl : "TyslCtrl_initFlzlForYh",
			onSuccess : function(req, res) {
				// slswsxDm = res.getAttr('slswsxDm');
				// ywlcDm = res.getAttr('ywlcDm');
				// slswsxmc = res.getAttr('slswsxmc');
			}
		});
		queryBtn.submit();
	}
//	function queryLcswsx(async) {// 查询流程税务事项
//		// debugger;
//		var selDataKey = zsxmDm + ywlcDm;
//		var ctrl = "TyslCtrl_getSlswsxByYwlcdm";
//		var queryBtn = new SwordSubmit();
//		if ($chk(zsxmDm)) {
//			queryBtn.pushData('zsxmDm', zsxmDm);
//			ctrl = "TyslCtrl_getSlswsxByZsxmdmAndYwlcdm";
//		}
//		queryBtn.pushData('ywlcDm', ywlcDm);
//		queryBtn.pushData('selDataKey', selDataKey);
//		queryBtn.setOptions({
//			async : async,
//			mask : "false",
//			ctrl : ctrl,
//			onSuccess : function(req, res) {
//				$w('jbxxForm').enable('SWSX_DM');
//			}
//		});
//		queryBtn.submit();
//	}
	function queryZsxm(djxh, nsrztDm, kzztdjlxDm, zgswskfjDm) {// 查询流程税务事项
		var queryBtn = new SwordSubmit();
		queryBtn.pushData('djxh', djxh);
		queryBtn.pushData('nsrztDm', nsrztDm);
		queryBtn.pushData('kzztdjlxDm', kzztdjlxDm);
		queryBtn.pushData('ywlcDm', TYSL_FlZL_JSOBJ.getYwlcDm());
		queryBtn.pushData('zgswskfjDm', zgswskfjDm);
		queryBtn.setOptions({
			async : "true",
			mask : "false",
			ctrl : "TyslCtrl_getZsxmListByDjxh",
			onSuccess : function(req, res) {
				// 判断查询的征收项目下拉数据长度，只有一条则直接执行显示，不可选，并查询受理税务事项下拉数据
				var zsxmList = res.getDataByDataName('ZSXM_DM');
				if ($chk(zsxmList)) {
					if (zsxmList.data.length == 1) {
						zsxmDm = zsxmList.data[0].code;
//						queryLcswsx("true");
						(function() {
							$w('jbxxForm').setValue('ZSXM_DM', zsxmDm);
						}).delay(10);
					} else {
						$w('jbxxForm').enable([ 'ZSXM_DM', 'SWSX_DM' ]);
					}
				} else {// 未查到征收项目、提示？

				}
			}
		});
		queryBtn.submit();
	}
	function checkBb() { // 检查必报内容是否勾选
		var gridData = $w("flzlGrid").getCurPageGridData().trs;
		var bbStr = "";
		gridData.each(function(el, index) {
			if ($chk(el.tds.check)) {
				var sfbb = el.tds.sfbb.value;
				var check = el.tds.check.value;
				if (sfbb == 1 && check != 1) {
					var flzlmc = el.tds.flzlmc.value;
					bbStr = bbStr + flzlmc + "\n";
				}
			}
		});
		return bbStr;
	}
	setTimeout(function() { // 当后台返回值中包含流程税务事项代码时，附列资料可直接根据流程税务事项代码获取
		if (typeof pc != "undefined") {
			lcswsxDm = pc.getInitData().getAttr('lcswsxDm');// 获取流程税务事项代码,
			ywlcDm = pc.getInitData().getAttr('ywlcDm');// 获取业务流程代码,
			if ($chk(lcswsxDm)) {// 当是默认流程时，初始化会存在流程税务事项代码
				queryFlzl(lcswsxDm);
			} else {
				if (ywlcDm == 'LCA031002') {// 业务流程代码为该值时,征收项目为固定值
					// 10101,不可修改,也不必显示，直接查询流程税务事项下拉数据，设置流程税务事项为可编辑
					zsxmDm = "10101";
//					queryLcswsx("true");
				} else if (ywlcDm == 'LCA031003' || ywlcDm == 'LCA031005') {// 显示征收项目下拉，但不可选择，待查询完纳税人登记序号后，根据登记序号、业务流程查询征收项目下拉数据，设置征收项目下拉可选
					$('zsxm').setStyle('display', '');
					$w('jbxxForm')._itemSwitch("ZSXM_DM", "select", {
						'rule' : 'must'
					});
				} else {// 不显示征收项目，流程税务事项不可选，待查询完纳税人登记序号后，与业务流程一起查询流程税务事项下拉数据，设置流程税务事项可选
//					queryLcswsx("true");
				}
			}
		} else {
			setTimeout(arguments.callee, 10);
		}
	}, 10);
	return {
		saveFlzl : function() {
			var flzlGridData = $w('flzlGrid').getCheckedData("check");
			var queryBtn = new SwordSubmit();// /根据登记序号查询纳税人税费种认定信息
			queryBtn.pushData(flzlGridData);
			queryBtn.setOptions({
				async : "true",
				mask : "false",
				ctrl : "TyslCtrl_saveFlzl",
				onSuccess : function(req, res) {

				}
			});
			queryBtn.submit();
		},
		resetFlzl : function() {
			if ($chk(ywlcDm)) {// 业务流程代码不为空的情况下，需要进行项目，税务事项的选择，此时才进行附列资料、基本信息的清空
				// $w('jbxxForm').reset(['YWFL_DM','YWLC_DM'],true);
				// debugger;
				$w('jbxxForm').setValue('ZSXM_DM', '');
				$w('jbxxForm').setValue('SWSX_DM', '');
				if (typeof TYSL_FlZL_JSOBJ != "undefined") {
					if(ywlcDm != 'LCA031002'){
						TYSL_FlZL_JSOBJ.setZsxm('');
					}
					TYSL_FlZL_JSOBJ.setLcswsxDm('');
				}
				if (ywlcDm == 'LCA031003' || ywlcDm == 'LCA031005') {// 此时才会显示征收项目的选项，并且输完纳税人后才进行项目的加载，选完项目才进行事项的加载
					$w('jbxxForm').disable([ 'ZSXM_DM', 'SWSX_DM' ]);
				}
				$w('flzlGrid').reset();
			}
		},
		queryflzl : function() {
			// debugger;
			if (typeof TYSL_JSOBJ != "undefined") {// 只有在同一受理页面才会需要选择受理税务事项
				if ($chk(lcswsxDm)) {
					queryFlzl(lcswsxDm);
				}
			}
		},
		queryflzlForYh : function() {
			// debugger;
			if (typeof TYSL_JSOBJ != "undefined") {
				if ($chk(slswsxDm)) {
					queryFlzlForYh(slswsxDm);
				}
			}
		},
		setLcswsxDm : function(lcswsx) {
			lcswsxDm = lcswsx;
		},
		getLcswsxDm : function() {
			return lcswsxDm;
		},
		setSlswsxDm : function(slswsx) {
			slswsxDm = slswsx;
		},
		getSlswsxDm : function() {
			return slswsxDm;
		},
		setSlswsxmc : function(slswsx) {
			slswsxmc = slswsx;
		},
		getSlswsxmc : function() {
			return slswsxmc;
		},
		getYwlcDm : function() {
			return ywlcDm;
		},
		getZsxm : function() {
			return zsxmDm;
		},
		setZsxm : function(zsxm) {
			zsxmDm = zsxm;
		},
		queryZsxm : function(djxh, nsrztDm, kzztdjlxDm, zgswskfjDm) {
			if (ywlcDm == 'LCA031003' || ywlcDm == 'LCA031005') {// 只有这两种情况下需要加载征收项目代码供选择
				queryZsxm(djxh, nsrztDm, kzztdjlxDm, zgswskfjDm);
			}
		},
		queryLcswsx : function(async) {
//			queryLcswsx(async);
		},
		checkBb : function() {
			return checkBb();
		},
		validate : function() {
			var form = $w('jbxxForm');
			var tag = form.validate();
			return tag;
		}
	}
}());

/**
 * 创建完cell后执行，判断是否必报若为否，则设置下拉可选
 */
function SwordGrid_onAfterCreateCell_flzlGrid(rowData, cellData, cell) {
	var name = cell.get('name');
	if ("sfbb" == name && cellData == "2") { // 若是否 可选择
		cell.set("disable", "false");
	}
}
/**
 * 当鼠标点击sfbb-select选项时触发
 * 
 * @param :
 *            {Element} option html元素
 * @param :
 *            {JsonObj} selItem json对象
 * @param :
 *            {select} obj 下拉列表
 */
function select_onChange_sfbb(option, selItem, obj) {
	var grid = $w('flzlGrid');
	var row = grid.getCheckedRow();
	// var code = selItem.get('code');
	var code = selItem.code; // modify by fanyl 20140911
	if (code == "1") {// 选中必报
		row.getElements('input:[name=check]').set('checked', true);
	} else {
		row.getElements('input:[name=check]').set('checked', false);
	}

}

/**
 * 选中状态变化时触发
 * 
 * @param :
 *            {Element} option html元素
 * @param :
 *            {JsonObj} selItem json对象
 * @param :
 *            {select} obj 下拉列表
 */
function select_onClick_xz(option, selItem, obj) {
	//debugger;
	var grid = $w('flzlGrid');
	var row = grid.getCheckedRow();
	var isChecked = row.getElements('input:[name=check]')[0].get('checked');
	if (!isChecked) { //如果取消选中或者未选中
		if (option.tds.sfbb.value == "1") { // 如果资料是必报
			var msg = "此项附列资料为必报，是否要选中？";
			swordConfirm(msg, {
				okBtnName : "是",
				cancelBtnName : "否",
				onOk : function(promptValue) {
					row.getElements('input:[name=check]').set('checked', true);
				}
			});
		}
	}
}

/**
 * @function: _onclick_nextPage
 * @des: 執行下一步逻辑
 * @modify:
 * @date: 2012
 */
function _onclick_nextPage() {
	if (typeof TYSL_YCJK_JSOBJ != "undefined" && TYSL_YCJK_JSOBJ.nextCheck()) {// 通过监控，执行下一步
		var sfczfxd = TYSL_YCJK_JSOBJ.getSfczfxd();
		if (sfczfxd == "Y") {// 存在风险点
			var msg = "异常信息中存在提示类监控不通过的项目，是否要进入下一步操作？";
			swordConfirm(msg, {
				okBtnName : "是",
				cancelBtnName : "否",
				onOk : function(promptValue) {
					TYSL_JSOBJ.next();
				}
			});
		} else {
			TYSL_JSOBJ.next();
		}
	}
}

/**
 * 当鼠标点击SWSX_DM-select选项时触发
 * 
 * @param :
 *            {Element} option html元素
 * @param :
 *            {JsonObj} selItem json对象
 * @param :
 *            {select} obj 下拉列表
 */
function select_onChange_SWSX_DM(option, selItem, obj) {
	// debugger;
	TYSL_FlZL_JSOBJ.setLcswsxDm(selItem.lcsxdm);// 设置lcswsxDm
	TYSL_FlZL_JSOBJ.setSlswsxDm(selItem.code);
	TYSL_FlZL_JSOBJ.setSlswsxmc(selItem.caption);
	TYSL_FlZL_JSOBJ.queryflzlForYh(selItem.code); // 初始化附列资料
	if (typeof TYSL_JSOBJ != "undefined") {
		//TYSL_JSOBJ.enableNext();
		TYSL_JSOBJ.enableBysl();
		TYSL_JSOBJ.enableBznr();
	}
	if (typeof TYSL_YCJK_JSOBJ != "undefined"
			&& typeof TYSL_NSRJBXX_JSOBJ != "undefined") {
		var djxh = TYSL_NSRJBXX_JSOBJ.getDjxh();
		TYSL_YCJK_JSOBJ.queryJkxx(djxh); // 初始化监控信息
	}
}

function select_onChange_ZSXM_DM(option, selItem, obj) {
	$w('jbxxForm').setValue('SWSX_DM', '');
	if ($chk(selItem)) {
		TYSL_FlZL_JSOBJ.setZsxm(selItem.code);
	} else {
		TYSL_FlZL_JSOBJ.setZsxm("");
	}
}
/**
 * 当点击税务事项下拉时触发,过滤下拉数据
 * 
 * @param :
 *            {JsonObj} loadData 所有下拉数据
 * @param :
 *            {Element} box 文本框
 * @param :
 *            {selObj} obj 下拉列表 当前SwordSelect对象
 */
function swsxDataFilter(loadData, box, selObj) {
	// debugger;
	var zsxmDm = TYSL_FlZL_JSOBJ.getZsxm();
	var ywlcDm = TYSL_FlZL_JSOBJ.getYwlcDm();
	var selDataKey = zsxmDm + ywlcDm;
	var selData = pageContainer.getInitDataByDataName(selDataKey);
	if ($chk(selData)) {// 若该条件加载过则不再去后台加载
		return selData.data;
	} else {
		if (!$chk(zsxmDm)) {
			var form = $w('jbxxForm');
			form.validate('ZSXM_DM');
			return;
		}
		TYSL_FlZL_JSOBJ.queryLcswsx("false");
		selData = pageContainer.getInitDataByDataName(selDataKey);
		if ($chk(selData)) {
			return selData.data;
		}
	}
}