//1、如果多个页面有公共js，则无需对应修改每个页面，只需在公共js （如申报用例的 sb_gy.js, ywpt_zypz_gy.js,在线办税的 ysp009_gyFrame.js）头部增加如下代码：

try {
	document.write('<script type="text/javascript" src="../jspt/styles/style.js"></script>');
} catch (e) {}


/* 按月按次均考虑的情况下，判断是否享受起征点 */
// function sb040_wdqzdAll(xssr,qzd,qzdAc,djzclxDm,wdqzdZg,wdqzdZgAc){
// var wdqzdBj = "N";
// //按次
// if($chk(wdqzdZgAc)&&wdqzdZgAc=="Y"){
// wdqzdBj = sb040_wdqzdJs(xssr,qzdAc,"N");
// }
// //按月
// else if($chk(wdqzdZg)&&wdqzdZg=="Y"){
// wdqzdBj = sb040_wdqzd(xssr,qzd,djzclxDm,wdqzdZg);
// }
// return wdqzdBj;
// }
/* 只有按月的情况下，判断是否享受起征点 */
// function sb040_wdqzd(xssr,qzd,djzclxDm,wdqzdZg){
// var wdqzdBj = "N";
// if($chk(wdqzdZg)&&wdqzdZg=="Y"&&$chk(djzclxDm)){
// //个体
// if(djzclxDm.substring(0, 2)=="41"){
// wdqzdBj = sb040_wdqzdJs(xssr,qzd,"N");
// }
// //企业
// else if(djzclxDm.substring(0, 1)!="4"&&djzclxDm.substring(0, 1)!="9"){
// wdqzdBj = sb040_wdqzdJs(xssr,qzd,"Y");
// }
// }
// return wdqzdBj;
// }
/* 计算是否享受起征点 */
// function sb040_wdqzdJs(xssr,qzd,sfbhqzd){
// var wdqzdBj = "N";
// if($chk(xssr)&&$chk(qzd)&&$chk(sfbhqzd)){
// if(xssr<qzd ||(sfbhqzd=="Y"&&xssr==qzd) ){
// wdqzdBj="Y";
// }
// }
// return wdqzdBj;
// }
function sb012_check(name) {// 012里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb014_check(name) {// 014里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb033_check(name) {// 033里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb156_check(name) {// 033里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb031_check(name) {// 031里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb058_check(name) {// 058里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb068_check(name) {// 068里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb069_check(name) {// 069里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb070_check(name) {// 070里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb072_check(name) {// 072里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb035_check(name) {// 035里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}

function sb040_check(name) {// 040里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (valid.$family.name == "SwordGrid") {
		valid.errorCells.length = 0;
		var rowDivArray = valid.dataDiv()
				.getChildren("div.sGrid_data_row_div[status!='delete']");
		rowDivArray.each(function(rowItem) {
			rowItem.getChildren().each(function(cellDiv) {
				if (cellDiv.get('rule')) {// 执行一遍校验
					if (!this.vObj.doValidate(cellDiv).state) {// 校验没有通过
						cellDiv.addClass('sGrid_data_cell_insert_error_div');
						this.addError(rowItem.get('rowNum'), cellDiv
										.get('name'));
						cellDiv.addEvent('click', function() {
							cellDiv
									.removeClass('sGrid_data_cell_insert_error_div');
						}.bind(this));
					}
				}
			}, valid);
		});
	}
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb167_check(name) {// 167里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb014_reset(names) {// 014里面的重置功能

	var namesLength = names.length;
	for (var i = 0; i < namesLength; i++) {
		try {
			$w(names[i]).resetAll();
		} catch (e) {
			try {
				$w(names[i]).reset();
			} catch (e) {
				continue;
			}
		}
	}
}
function sb033_reset(names) {// 033里面的重置功能

	var namesLength = names.length;
	for (var i = 0; i < namesLength; i++) {
		try {
			$w(names[i]).resetAll();
		} catch (e) {
			try {
				$w(names[i]).reset();
			} catch (e) {
				continue;
			}
		}
	}
}
function sb031_reset(names) {// 031里面的重置功能

	var namesLength = names.length;
	for (var i = 0; i < namesLength; i++) {
		try {
			$w(names[i]).resetAll();
		} catch (e) {
			try {
				$w(names[i]).reset();
			} catch (e) {
				continue;
			}
		}
	}
}
function sb070_reset(names) {// 070里面的重置功能

	var namesLength = names.length;
	for (var i = 0; i < namesLength; i++) {
		try {
			$w(names[i]).resetAll();
		} catch (e) {
			try {
				$w(names[i]).reset();
			} catch (e) {
				continue;
			}
		}
	}
}
function sb016_changeZhl(option, selItem, sel, hbmc, zhl) {// 014中的grid联动当选择156人民币时，需要将后面的一项设置成1
	var grid = sel.grid;
	var row = grid.getCheckedRow();
	var cell = row.getCell(hbmc);

	var cellRealValue = cell.get("realvalue");
	if (cellRealValue != null && cellRealValue != undefined
			&& cellRealValue != "") {
		if (cellRealValue == "156") {
			var cell1 = row.getCell(zhl);
			grid.updateCell(cell1, "1", "1");
		} else {
			var cell2 = row.getCell('zhl');
			grid.updateCell(cell2, "", "");
		}
	} else {
		var cell2 = row.getCell('zhl');
		grid.updateCell(cell2, "", "");
	}
}

function sb014_checkGridData(gridName) {// 申报014中判断附表是grid时是否填值，true为有值，false为无值
	// 判断附表是否填值了，在点确定的时候进行判断，点退出和重置不改变该附表在主表上的状态
	var gridData = $w(gridName).getCurPageGridData();
	if (gridData == null || gridData == undefined || gridData == ""
			|| gridData.trs == null || gridData.trs == undefined
			|| gridData.trs == "" || gridData.trs.length == 0) {
		return false;
	} else {
		return true;
	}
}
function sb033_checkGridData(gridName) {// 申报014中判断附表是grid时是否填值，true为有值，false为无值
	// 判断附表是否填值了，在点确定的时候进行判断，点退出和重置不改变该附表在主表上的状态
	var gridData = $w(gridName).getCurPageGridData();
	if (gridData == null || gridData == undefined || gridData == ""
			|| gridData.trs == null || gridData.trs == undefined
			|| gridData.trs == "" || gridData.trs.length == 0) {
		return false;
	} else {
		return true;
	}
}
function sb031_checkGridData(gridName) {// 申报031中判断附表是grid时是否填值，true为有值，false为无值
	// 判断附表是否填值了，在点确定的时候进行判断，点退出和重置不改变该附表在主表上的状态
	var gridData = $w(gridName).getCurPageGridData();
	if (gridData == null || gridData == undefined || gridData == ""
			|| gridData.trs == null || gridData.trs == undefined
			|| gridData.trs == "" || gridData.trs.length == 0) {
		return false;
	} else {
		return true;
	}
}
function sb031_checkFormIsNull(formData) {// 检查两个附表是否填值
	var allData = formData.data;
	for (var tmp in allData) {
		if (!(allData[tmp].value / 1 == 0)) {
			return false;
		}
	}
	return true;
}
function sb202_checkFormIsNull(formData) {// 检查两个附表是否填值
	var allData = formData.data;
	for (var tmp in allData) {
		if (!(allData[tmp].value / 1 == 0)) {
			return false;
		}
	}
	return true;
}
/**
 * 截取前后空格
 */
function trimStr(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 根据相应字符截取字符串
 * 
 * @param {Object}
 *            dateStr
 * @param {Object}
 *            chars
 * @return {TypeName}
 */
function splitStrToChar(dateStr, splitChar) {
	return trimStr(dateStr).split(splitChar);
}

/**
 * 截取日期，以数组形式返回年月日
 * 
 * @param {Object}
 *            dataStr
 */
var splitStr = function(dataStr) {
	// 截取前面年月日
	var dateStr = splitStrToChar(dataStr, " ")[0];
	// 分割字符
	var splitChar = dateStr.indexOf("-") != -1 ? "-" : "/";

	return splitStrToChar(dateStr, splitChar);
};

/**
 * 校验日期基本格式yyyy-mm-dd 当校验不通过时，若msg非空则弹出提示信息，否则直接返回false
 */
function checkDateBasic(inDate, msg) {
	if (inDate != "") {
		var pattern = /\d{4}-\d{1,2}-\d{1,2}( \d{2}:\d{2}:\d{2}){0,1}$/;
		if (pattern.exec(inDate) == null) {
			if (!(msg == undefined || msg == null)) {
				swordAlert(msg + "格式不正确!");
			}
			return false;
		}
	}
	return true;
}

/**
 * 比较日期 小于
 * 
 * @param {Object}
 *            startDateStr
 * @param {Object}
 *            endDateStr
 * @return {TypeName} true:开始日期小于结束日期
 */
var compareDate = function(startDateStr, endDateStr) {
	// 将年月日分割保存在数组中
	var startDates = splitStr(startDateStr);
	var endDates = splitStr(endDateStr);
	// 转换为日期
	var startDate = new Date(startDates[0], parseInt(startDates[1] - 1, 10),
			startDates[2]);
	var endDate = new Date(endDates[0], parseInt(endDates[1] - 1, 10),
			endDates[2]);

	// return startDate<endDate?true:false;
	return startDate <= endDate ? true : false;// 2011-12-15更改
};

/**
 * 比较日期 小于等于
 * 
 * @param {Object}
 *            startDateStr
 * @param {Object}
 *            endDateStr
 * @return {TypeName} true:开始日期小于等于结束日期
 */
var compareDate2 = function(startDateStr, endDateStr) {
	// 将年月日分割保存在数组中
	var startDates = splitStr(startDateStr);
	var endDates = splitStr(endDateStr);

	// 转换为日期
	var startDate = new Date(startDates[0], parseInt(startDates[1] - 1, 10),
			startDates[2]);
	var endDate = new Date(endDates[0], parseInt(endDates[1] - 1, 10),
			endDates[2]);

	return startDate > endDate ? false : true;
};

var compareDate5 = function(startDateStr, endDateStr) {
	// 将年月日分割保存在数组中
	var startDates = splitStr(startDateStr);
	var endDates = splitStr(endDateStr);

	// 转换为日期
	var startDate = new Date(startDates[0], parseInt(startDates[1] - 1, 10),
			startDates[2]);
	var endDate = new Date(endDates[0], parseInt(endDates[1] - 1, 10),
			endDates[2]);

	return startDate >= endDate ? false : true;
};

/**
 * 比较日期 等于
 * 
 * @param {Object}
 *            startDateStr
 * @param {Object}
 *            endDateStr
 * @return {TypeName} true:开始日期等于结束日期
 */
var compareDate3 = function(startDateStr, endDateStr) {
	// 将年月日分割保存在数组中
	var startDates = splitStr(startDateStr);
	var endDates = splitStr(endDateStr);

	// 转换为日期
	var startDate = new Date(startDates[0], parseInt(startDates[1] - 1, 10),
			startDates[2]);
	var endDate = new Date(endDates[0], parseInt(endDates[1] - 1, 10),
			endDates[2]);

	return startDate.getTime() == endDate.getTime() ? true : false;
};
/**
 * 根据年月返回该月天数
 * 
 * @param {Object}
 *            year
 * @param {Object}
 *            month
 */
var monthDay = function(year, month) {
	var feb = (year % 4 == 0) ? 29 : 28;
	var monthDay = new Array(31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	return monthDay[month - 1];
};

/**
 * 申报验证申报日期必须小于等于当天
 * 
 * @param {Object}
 *            sbDate
 * @param {Object}
 *            today
 */
var sbData = function(sbDate, today) {
	if (!compareDate2(sbDate, today)) {

		return false;
	} else {
		return true;
	}

};

/**
 * 按不同类型（次、月、季、半年、年），验证申报、终止日期
 * 
 * @param {Object}
 *            skssqq
 * @param {Object}
 *            skssqz
 * @param {Object}
 *            today
 * @param {Object}
 *            nsqxdm
 * @return {TypeName} 通过返回true
 */
function qzDate(skssqq, skssqz, today, nsqxdm, sfzjybz) {
	var succMsg = qzDateCheck(skssqq, skssqz, today, nsqxdm, sfzjybz);
	if (succMsg == "ok") {
		return true;
	} else {
		swordAlert(succMsg);
		return false;
	}
}
function qzDateCheck(skssqq, skssqz, today, nsqxdm, sfzjybz) {
	var qDates = splitStr(skssqq);
	var zDates = splitStr(skssqz);
	var succMsg = "ok";
	if (skssqq == undefined || skssqq == "") {
		return "所属期起不能不能为空!";
	}
	if (skssqz == undefined || skssqz == "") {
		return "所属期止不能不能为空!";
	}
	if (skssqq.substring(0, 10) > skssqz.substring(0, 10)) {
		return "所属期起不能大于所属期止!";
	}
	if (nsqxdm == "11") { // 按次//return值开头为1
		if (parseInt(qDates[1], 10) != parseInt(zDates[1], 10)
				|| parseInt(qDates[2], 10) != parseInt(zDates[2], 10)) {
			return "按次申报，所属期起必须等于所属期止！";
		}
		return succMsg;
	}
	if (qDates[0] != zDates[0]) {
		return "所属期起和所属期止必须在同一年!";
	}
	if (nsqxdm == "06") { // 按月return值开头为2
		if (parseInt(qDates[1], 10) != parseInt(zDates[1], 10)) {
			return "按月申报，所属期起和所属期止必须在同一个月！";
		}
		if (parseInt(qDates[2], 10) != 1) {
			return "按月申报，所属期起必须为某月的第一天！";
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			return "按月申报，所属期止必须为某月的最后一天！";
		}
		return succMsg;
	} else if (nsqxdm == "08") { // 按季度return值开头为3
		// 季度信息
		if (!((parseInt(qDates[1], 10) >= 1 && parseInt(zDates[1], 10) <= 3)
				|| (parseInt(qDates[1], 10) >= 4 && parseInt(zDates[1], 10) <= 6)
				|| (parseInt(qDates[1], 10) >= 7 && parseInt(zDates[1], 10) <= 9) || (parseInt(
				qDates[1], 10) >= 10 && parseInt(zDates[1], 10) <= 12))) {
			return "按季申报，所属期起和所属期止必须在同一个季度！";
		}
		//通用申报按半年、按年的情况:N:税款属期可修改与税费种认定的纳税期限不一致；Y：通用申报时税款属期必须与税费种认定的纳税期限一致
		if((!$chk(sfzjybz) || 'Y' == sfzjybz)){
			if (!(parseInt(qDates[2], 10) == 1 && (parseInt(qDates[1], 10) == 1
					|| parseInt(qDates[1], 10) == 4 || parseInt(qDates[1], 10) == 7 || parseInt(
					qDates[1], 10) == 10))) {
				return "按季申报，所属期起必须为某季度的第一天！";
			}
			if (!(zDates[2] == monthDay(zDates[0], parseInt(zDates[1], 10)) && (parseInt(
					zDates[1], 10) == 3
					|| parseInt(zDates[1], 10) == 6 || parseInt(zDates[1], 10) == 9 || parseInt(
					zDates[1], 10) == 12))) {
				return "按季申报，所属期止必须为某季度的最后一天！";
			}
		}
		return succMsg;
	} else if (nsqxdm == "09") { // 按半年return值开头为4
		if (!((parseInt(qDates[1], 10) >= 1 && parseInt(zDates[1], 10) <= 6) || (parseInt(
				qDates[1], 10) >= 7 && parseInt(zDates[1], 10) <= 12))) {
			return "按半年申报，所属期起和所属期止必须在同一个半年！";
		}
		//通用申报按半年、按年的情况:N:税款属期可修改与税费种认定的纳税期限不一致；Y：通用申报时税款属期必须与税费种认定的纳税期限一致
		if((!$chk(sfzjybz) || 'Y' == sfzjybz)){
			if (!(parseInt(qDates[2], 10) == 1 && (parseInt(qDates[1], 10) == 1 || parseInt(
					qDates[1], 10) == 7))) {
				return "按半年申报，所属期起必须为某半年的第一天！";
			}
			if (!(zDates[2] == monthDay(zDates[0], parseInt(zDates[1], 10)) && (parseInt(
					zDates[1], 10) == 6 || parseInt(zDates[1], 10) == 12))) {
				return "按半年申报，所属期止必须为某半年的最后一天！";
			}
		}
		return succMsg;
		} else if (nsqxdm == "10") { // 按年return值开头为5
			if (qDates[0] != zDates[0]) {
				return "按年申报，所属期起和所属期止必须在同一年！";
			}
			if(!$chk(sfzjybz) || 'Y' == sfzjybz){
				if (!(parseInt(qDates[1], 10) == 1 && parseInt(qDates[2], 10) == 1)) {
					return "按年申报，所属期起必须为某年的第一天！";
				}
				if (!(parseInt(zDates[1], 10) == 12 && parseInt(zDates[2], 10) == 31)) {
					return "按年申报，所属期止必须为某年的最后一天！";
				}
			}
		return succMsg;
		// } else if (nsqxdm == "11") { // 按次
		// if (skssqq != skssqz) {
		// return "按次申报，所属期起和所属期止为同一天！";
		// }
		// return succMsg;
	} else {
		if (qDates[0] != zDates[0]) {// return值开头为0
			return "所属期起和所属期止必须在同一年!";
		}
		return succMsg;
	}
}
// 作者：戴宜通
// 内容：一般申报前台公共方法

// 1.临时税费种认定进入界面
// 调用场景：初始化成功，针对未做税费种认定的进行操作
function GYopenLssfzrd(nsrxxSubData, djxh, zsxm_dm_in, zspm_dm_in,
		zsxm_dm_notin, zspm_dm_notin) {
	var initBtn = new SwordSubmit();
	if (nsrxxSubData != undefined) {
		initBtn.pushData('nsrxxSubData', nsrxxSubData);// （不在用例申报范围）
	} else {
		initBtn.pushData('nsrxxSubData', {});
	}
	if (djxh != undefined) {
		initBtn.pushData('djxh', djxh);
	} else {
		initBtn.pushData('djxh', "");
	}
	if (zsxm_dm_in != undefined) {
		initBtn.pushData('zsxm_dm_in', zsxm_dm_in);
	} else {
		initBtn.pushData('zsxm_dm_in', "");
	}
	if (zspm_dm_in != undefined) {
		initBtn.pushData('zspm_dm_in', zspm_dm_in);
	} else {
		initBtn.pushData('zspm_dm_in', "");
	}
	// 一般用例只传zsxm_dm_in和zspm_dm_in即可
	if (zsxm_dm_notin != undefined) {
		initBtn.pushData('zsxm_dm_notin', zsxm_dm_notin);// （不在用例申报范围）
	} else {
		initBtn.pushData('zsxm_dm_notin', "");
	}
	if (zspm_dm_notin != undefined) {
		initBtn.pushData('zspm_dm_notin', zspm_dm_notin);// （不在用例申报范围）
	} else {
		initBtn.pushData('zspm_dm_notin', "");
	}
	initBtn.setTid('PBS_SB000_toLssfzrd');
	swordAlertIframe('', {
				titleName : "临时税费种认定",
				width : 800,
				height : 400,
				param : window,
				isNormal : 'true',
				isMax : 'true',
				isClose : 'true',
				isMin : "true",
				submit : initBtn
			});
}

// 2.自查补报通知书进入界面
// 调用场景：选择申报类型为自查补报时，进入自查补报通知书界面
function GYopenZcbbtzs(nsrzcbbtzsGrid) {
	var toNsrzcbbBtn = new SwordSubmit();
	toNsrzcbbBtn.setTid("PBS_SB000_toNsrzcbb");
	toNsrzcbbBtn.pushData(nsrzcbbtzsGrid);
	swordAlertIframe('', {
				titleName : "纳税评估自查补报通知书",
				width : 800,
				height : 500,
				param : window,
				isNormal : 'true',
				isMax : 'true',
				isClose : 'false',
				isMin : "true",
				submit : toNsrzcbbBtn
			});
}

// 3.进入减免信息界面
// 调用场景：点击减免项时，跳入减免界面
function GYopenJmxx(jmxxList) {
	var openJmxxPageBtn = new SwordSubmit();
	openJmxxPageBtn.setTid("PBS_SB000_openJmxxPage");
	swordAlertIframe('', {
				titleName : "减免信息税务事项通知书",
				width : 600,
				height : 500,
				param : window,
				jmxxList : jmxxList,
				isNormal : 'true',
				isMax : 'true',
				isClose : 'true',
				isMin : "true",
				submit : openJmxxPageBtn
			});
}

// 4.保存成功(支持基本上所有申报用例)
// 调用场景：点击保存后，保存成功时，触发的事件
// 参数说明bcfs：0-征收开票;1-征收开票+附加税;2；征收开票+附加税+比对;其他-征收开票
function GYsaveSuccess(bcfs, resData, ybtse, ynse, Tid) {
	resDataOnSave = resData;// 这里面包括征收开票，附加税的信息
	$w('bcBtn').disabled();
	// swordAlert("保存成功");
	// 开始进行比对
	if (bcfs == 2) {// 有附加税，有比对
		var nsrxxMap = pc.getResData("nsrxxMap", resData);
		// 如果是自查补报就不进行比对，在前台进行控制
		var sblxDm = nsrxxMap.data.sblxDm.value;
		if (sblxDm == "0") {
			var bdBtn = $w('bdBtn');
			bdBtn.pushData(nsrxxMap);
			bdBtn.setTid(Tid);
			bdBtn.submit();
		} else {
			GYsaveSbxxOnSuccessFjs(bcfs, resDataOnSave, ynse, ybtse);
		}
	} else {
		GYsaveSbxxOnSuccessFjs(bcfs, resDataOnSave, ynse, ybtse);
	}
}

// 4.1进入附加税申报界面
// 调用场景：当主税(消费税，增值税，营业税)保存时，会保存附加税
// 参数说明：点击关闭，若fjsfs为"Y"时，迭代附加；为"N"时，跳入征收开票
function GYopenFjs(fjsfs, tid, nsrxxMap, sbxxList, nsrzcbbtzsGridForm, zsxmDm,
		i, length, fjstsxxListTrs, resDataOnSave, ybtse) {
	var fjsBtn = new SwordSubmit();
	if (fjsfs == "Y") {
		fjsBtn.pushData(nsrxxMap);
		fjsBtn.pushData(sbxxList);
		fjsBtn.pushData(nsrzcbbtzsGridForm);
		fjsBtn.pushData("zsxmDm", zsxmDm);
		fjsBtn.pushData("cs", "initzstz");
		fjsBtn.setTid(tid);
		swordAlertIframe('', {
					titleName : "附加税申报",
					width : 600,
					height : 500,
					param : window,
					isNormal : 'true',
					isMax : 'true',
					isClose : 'true',
					isMin : "true",
					submit : fjsBtn,
					onClose : function() {
						i++;
						// 把附加税生成的pzxh填//递归跳转
						GYalertFjsSbOn1(i, length, fjstsxxListTrs, nsrxxMap,
								sbxxList, nsrzcbbtzsGridForm, resDataOnSave,
								ybtse);
					}
				});
	} else if (fjsfs == "N") {
		fjsBtn.pushData(nsrxxMap);
		fjsBtn.pushData(sbxxList);
		fjsBtn.pushData(nsrzcbbtzsGridForm);
		fjsBtn.setTid(tid);
		swordAlertIframe('', {
					titleName : "附加税申报",
					width : 600,
					height : 500,
					param : window,
					isNormal : 'true',
					isMax : 'true',
					isClose : 'true',
					isMin : "true",
					submit : fjsBtn,
					onClose : function() {
						// close调之后就调一般征收开票
						GYsaveSbxxOnSuccessFjsOnCancel(resDataOnSave, ybtse);
					}
				});
	}

}

// 4.2附加税申报
// 调用场景：出发保存事件,且bcfs为1或2时
function GYsaveSbxxOnSuccessFjs(bcfs, resDataOnSave, ynse, ybtse) {
	// 根据后台返回的fjstsxx为2时，提示是否进行附加税申报，选择是时，弹出附加税申报界面（详见附加税（费）申报用例），进行附加税申报，
	// 如果后台返回的fjstsxx为0时，则继续下一步后续操作，
	// 如果后台返回的fjstsxx为1时，根据后台返回的fjstsxxList进行提示并弹出相应的单独附加税的页面，
	// 如果后台返回的是3，则提示是否用专门的申报表进行附加税申报，
	// 选择是时与fjstsxx为1时处理一致，否则提示是否用通用申报表进行附加税申报，
	// 选择是时与fjstsxx为2时处理一致，否则按不进行附加税申报处理；
	// 系统判断应补（退）税额是否小于零，小于零则提示“纳税人应申请办理退抵税（费）审批”，
	// 大于零则提示“是否进行一般征收开票”，选择是时调用一般征收开票页面。

	if (bcfs == 1) {// 有附加税
		// 每一个都要把主税带过去
		var sbxxList = pc.getResData("sbxxList", resDataOnSave);
		// 附加税
		var fjstsxx = pc.getResData("fjstsxx", resDataOnSave);// 提示标志0,1,2,3.value就行了，不用判断空了必须得有
		// 大于0提示附加税申报
		if (ynse == "") {
			ynse = sbxxList.trs[0].tds.ynse.value / 1;
		}
		if (ynse > 0) {
			var fjstsxxBz = fjstsxx.value;
			switch (fjstsxxBz) {
				case "0" :// 不进行附加税申报
					// 直接提示是否进行征收开票
					GYsaveSbxxOnSuccessFjsOnCancel(resDataOnSave, ybtse);
					break;
				case "1" :// 单独的
					GYfjsSbOn1(resDataOnSave, ybtse);
					break;
				case "2" :// 通用的
					GYfjsSbOn2(resDataOnSave, ybtse);
					break;
				case "3" :// 选择通用还是单独的
					GYfjsSbOn3(resDataOnSave);
					break;
			}
		} else {// 直接提示是否征收开票
			GYsaveSbxxOnSuccessFjsOnCancel(resDataOnSave, ybtse);
		}
	} else {
		GYsaveSbxxOnSuccessFjsOnCancel(resDataOnSave, ybtse);
	}
}

// 4.3附加税申报
// 调用场景：情况1
function GYfjsSbOn1(resDataOnSave, ybtse) {
	// 根据后台返回的fjstsxx为2时，提示是否进行附加税申报，选择是时，弹出附加税申报界面（详见附加税（费）申报用例），进行附加税申报，
	// 如果后台返回的fjstsxx为0时，则继续下一步后续操作，
	// 如果后台返回的fjstsxx为1时，根据后台返回的fjstsxxList进行提示并弹出相应的单独附加税的页面，
	// 如果后台返回的是3，则提示是否用专门的申报表进行附加税申报，
	// 选择是时与fjstsxx为1时处理一致，否则提示是否用通用申报表进行附加税申报，
	// 选择是时与fjstsxx为2时处理一致，否则按不进行附加税申报处理；
	var nsrxxMap = pc.getResData("nsrxxMap", resDataOnSave);
	var sbxxList = pc.getResData("sbxxList", resDataOnSave);
	var nsrzcbbtzsGridForm = pc.getResData("nsrzcbbtzsGridForm", resDataOnSave);
	var yzpzxhList = pc.getResData("yzpzxhList", resDataOnSave);// 这个在每个附加税进行修改时都要修改

	// 附加税
	var fjstsxx = pc.getResData("fjstsxx", resDataOnSave);// 提示标志0,1,2,3.value就行了，不用判断空了必须得有
	var fjstsxxList = pc.getResData("fjstsxxList", resDataOnSave);// 提示信息.trs[0].tds.value就行了

	fjstsxxListTrs = fjstsxxList.trs;
	var i = 0;
	var length = fjstsxxListTrs.length;

	// 连续弹出函数
	GYalertFjsSbOn1(0, length, fjstsxxListTrs, nsrxxMap, sbxxList,
			nsrzcbbtzsGridForm, resDataOnSave, ybtse);
}

// 4.3.1附加税申报
// 调用场景：情况1-1
function GYalertFjsSbOn1(i, length, fjstsxxListTrs, nsrxxMap, sbxxList,
		nsrzcbbtzsGridForm, resDataOnSave, ybtse) {
	if (i < length) {
		var fjstsxxListTds = fjstsxxListTrs[i];
		var tsxx = fjstsxxListTds.tds.tsxx.value;
		var tid = fjstsxxListTds.tds.tid.value;
		var zsxmDm = fjstsxxListTds.tds.zsxmDm.value;
		swordConfirm(tsxx, {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				GYopenFjs("Y", tid, nsrxxMap, sbxxList, nsrzcbbtzsGridForm,
						zsxmDm, i, length, fjstsxxListTrs, resDataOnSave, ybtse);
			},
			onCancel : function() {
				// 递归跳转
				i++;
				GYalertFjsSbOn1(i, length, fjstsxxListTrs, nsrxxMap, sbxxList,
						nsrzcbbtzsGridForm, resDataOnSave, ybtse);
			}
		});

	} else {
		GYsaveSbxxOnSuccessFjsOnCancel(resDataOnSave, ybtse);
	}
}

// 4.4进入征收开票界面
// 调用场景：保存成功后，进入征收开票界面
function GYsaveSbxxOnSuccessFjsOnCancel(resDataOnSave, ybtse) {// 征收开票
	var sbxxList = pc.getResData("sbxxList", resDataOnSave);
	// 大于0提示征收开票
	// 小于0提示纳税人应申请退抵税（费）审批
	if (ybtse == "") {
		var ybtse = sbxxList.trs[0].tds.ybtse.value / 1;
	}
	if (ybtse >= 1) {
		swordConfirm("是否进行网上纳税", {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				GYyesZskp(resDataOnSave);
			},
			onCancel : function() {
				GYnoZskp();
			}
		});
	} else if (ybtse < 0) {
		swordAlert("纳税人应申请退抵税（费）审批");
		// $w('bcBtn').disabled();
		// $w('drBtn').disabled();
		// $w('qxBtn').disabled();
		return;
	} else {
		// swordAlert("保存成功");
	}
}

// 4.4.1进入征收开票界面
// 调用场景：进入征收开票界面,选择跳转征收域后
function GYyesZskp(resDataOnSave) {
	var yzpzxhList = pc.getResData("yzpzxhList", resDataOnSave);
	var djxh = pc.getResData("djxh", resDataOnSave);
	var zskpBtn = new SwordSubmit();
	zskpBtn.options.postType = "form";
	zskpBtn.pushData(yzpzxhList);
	zskpBtn.pushData(djxh);
	zskpBtn.setTid("PBS_ZS040_initViewBysb");
	zskpBtn.submit();
}

// 4.4.2进入征收开票界面
// 调用场景：进入征收开票界面,不选择跳转征收域后
function GYnoZskp() {

}

// 4.5附加税申报
// 调用场景：情况2
function GYfjsSbOn2(resDataOnSave, ybtse) {// 这个也需要回调函数
// 根据后台返回的fjstsxx为2时，提示是否进行附加税申报，选择是时，弹出附加税申报界面（详见附加税（费）申报用例），进行附加税申报，
// 如果后台返回的fjstsxx为0时，则继续下一步后续操作，
// 如果后台返回的fjstsxx为1时，根据后台返回的fjstsxxList进行提示并弹出相应的单独附加税的页面，
// 如果后台返回的是3，则提示是否用专门的申报表进行附加税申报，
// 选择是时与fjstsxx为1时处理一致，否则提示是否用通用申报表进行附加税申报，
// 选择是时与fjstsxx为2时处理一致，否则按不进行附加税申报处理；

	var nsrxxMap = pc.getResData("nsrxxMap", resDataOnSave);
	var sbxxList = pc.getResData("sbxxList", resDataOnSave);
	var nsrzcbbtzsGridForm = pc.getResData("nsrzcbbtzsGridForm", resDataOnSave);
	var yzpzxhList = pc.getResData("yzpzxhList", resDataOnSave);

	// 附加税
	var fjstsxx = pc.getResData("fjstsxx", resDataOnSave);// 提示标志0,1,2,3.value就行了，不用判断空了必须得有
	var fjstsxxList = pc.getResData("fjstsxxList", resDataOnSave);// 提示信息.trs[0].tds.value就行了

	var fjstsxxListTds = fjstsxxList.trs[0];
	// 得到名称，tid，还得加button，把能put进去的都得put进去
	var tsxx = fjstsxxListTds.tds.tsxx.value;
	var tid = fjstsxxListTds.tds.tid.value;
	// var zsxmDm = fjstsxxListTds.tds.zsxmDm.value;
	swordConfirm(tsxx, {
				okBtnName : "是",
				cancelBtnName : "否",
				onOk : function() {
					GYopenFjs("N", tid, nsrxxMap, sbxxList, nsrzcbbtzsGridForm,
							null, null, null, null, resDataOnSave, ybtse);
				},
				onCancel : function() {
					// 调之后就调一般征收开票
					GYsaveSbxxOnSuccessFjsOnCancel(resDataOnSave, ybtse);
				}
			});
}

// 4.6附加税申报
// 调用场景：情况3
function GYfjsSbOn3(resDataOnSave) {
	// 根据后台返回的fjstsxx为2时，提示是否进行附加税申报，选择是时，弹出附加税申报界面（详见附加税（费）申报用例），进行附加税申报，
	// 如果后台返回的fjstsxx为0时，则继续下一步后续操作，
	// 如果后台返回的fjstsxx为1时，根据后台返回的fjstsxxList进行提示并弹出相应的单独附加税的页面，
	// 如果后台返回的是3，则提示是否用专门的申报表进行附加税申报，
	// 选择是时与fjstsxx为1时处理一致，否则提示是否用通用申报表进行附加税申报，
	// 选择是时与fjstsxx为2时处理一致，否则按不进行附加税申报处理；
	var nsrxxMap = pc.getResData("nsrxxMap", resDataOnSave);
	var sbxxList = pc.getResData("sbxxList", resDataOnSave);
	var nsrzcbbtzsGridForm = pc.getResData("nsrzcbbtzsGridForm", resDataOnSave);
	var yzpzxhList = pc.getResData("yzpzxhList", resDataOnSave);

	// 附加税
	var fjstsxx = pc.getResData("fjstsxx", resDataOnSave);// 提示标志0,1,2,3.value就行了，不用判断空了必须得有
	var fjstsxxList = pc.getResData("fjstsxxList", resDataOnSave);// 提示信息.trs[0].tds.value就行了

	var fjstsxxListTds = fjstsxxList.trs[0];
	// 得到名称，tid，还得加button，把能put进去的都得put进去
	var tsxx = fjstsxxListTds.tds.tsxx.value;
	var tid = fjstsxxListTds.tds.tid.value;

	swordConfirm("是否用专门的申报表", {
				okBtnName : "是",
				cancelBtnName : "否",
				onOk : function() {
					GYfjsSbOn1();
				},
				onCancel : function() {
					GYfjsSbOn2();
				}
			});
}

/**
 * 计算值四舍五入方法 传入值：v当前数据(字符串与数值均可) e为需要保留的位数 作者：刘巍
 */
function GyFormatRound(v, e) {
	var t = 1;
	for (; e > 0; t *= 10, e--);
	for (; e < 0; t /= 10, e++);
	return Math.round(v * t) / t;
}

/**
 * 减免 作者：戴宜通
 */
function GyIsTdjm(jmxxList) {
	if (jmxxList != null) {
		// var swsxDm = jmxxList.trs[0].tds.jmsspsxDm.value;
		// tdjmbz特定减免标志：0个体 1企业 非特定减免时为空
		var tdjmbz = $chk(jmxxList.trs[0].tds.tdjmbz)
				? jmxxList.trs[0].tds.tdjmbz.value
				: "";
		return jmxxList.trs.length == 1 &&
				// swsxDm=="SXA031005214"||swsxDm=="SXA031005030"||swsxDm=="SXA031005324"||swsxDm=="SXA031005099"||swsxDm=="SXA031005113"||//
				// 个人减免1
				// swsxDm=="SXA031005215"||swsxDm=="SXA031005091"||swsxDm=="SXA031005112"||swsxDm=="SXA031005277"||//
				// 企业减免1
				// swsxDm=="SXA031003033"||swsxDm=="SXA031003016"||swsxDm=="SXA031003060"||swsxDm=="SXA031003021"||//
				// 个人减免2
				// swsxDm=="SXA031003034"||swsxDm=="SXA031003012"||swsxDm=="SXA031003017"||swsxDm=="SXA031003059"//
				// 企业减免2
				tdjmbz == "0" || tdjmbz == "1" ? true : false;
	} else {
		return false;
	}
}

// 减免回调前的调用,房产交易申报、土地交易申报、增量房申报中减免相关的控制
function jmkz(row, rowData, jmxxList) {
	var ynse = rowData.getValue("ynse");
	if (ynse == null || ynse == "") {
		ynse = 0;
	}
	var kcse = rowData.getValue("kcse");
	if (kcse == null || kcse == "") {
		kcse = 0;
	}
	var jsyj = rowData.getValue("jsyj");
	if (jsyj == null || jsyj == "") {
		jsyj = 0;
	}
	if (jmxxList != undefined && jmxxList != null && jmxxList.trs[0] != null) {
		for (var i = 0; i < jmxxList.trs.length; i++) {
			var zspmDm = jmxxList.trs[i].tds.zspmDm.value;
			if (zspmDm == rowData.getValue("zspmDm")) {

				var ssyhlxDm = jmxxList.trs[i].tds.ssyhlxDm.value;
				// ssyhlxDm，如果是02代表免征，自动将减免税额赋值为应纳税额－扣除税额
				if (ssyhlxDm == "02") {
					ynse = (ynse).divide(1);
					kcse = (kcse).divide(1);
					return (ynse).subtract(kcse);
				} else if (ssyhlxDm == "01")// 如果是01代表减征
				{
					// jzed是否大于零，如果大于零将减免税额赋值为（应纳税额－扣除税额）与jzed的最小值
					var jzed = jmxxList.trs[i].tds.jzed.value;
					if (jzed != null && jzed != "" && jzed / 1 > 0) {
						ynse = (ynse).divide(1);
						kcse = (kcse).divide(1);
						if ((ynse).subtract(kcse) > (jzed).divide(1)) {
							return (jzed).divide(1);
						} else {
							return (ynse).subtract(kcse);
						}
					}
					// 判断jzfd是否大于零，如果大于零则将减免税额赋值为（应纳税额－扣除税额）×（1－jzfd）
					var jzfd = jmxxList.trs[i].tds.jzfd.value;
					if (jzfd != null && jzfd != "" && jzfd / 1 > 0) {
						ynse = (ynse).divide(1);
						kcse = (kcse).divide(1);
						jzfd = (jzfd).divide(1);
						jzfd = (1).subtract(jzfd);
						return (ynse).subtract(kcse).multiple(jzfd);
					}
					// 判断jzsl是否大于零，如果大于零则将减免税额赋值为（应纳税额－扣除税额）-（jsyj*jzsl）
					var jzsl = jmxxList.trs[i].tds.jzsl.value;
					if (jzsl != null && jzsl != "" && jzsl / 1 > 0) {
						ynse = (ynse).divide(1);
						jsyj = (jsyj).divide(1);
						kcse = (kcse).divide(1);
						jzsl = (jzsl).divide(1);
						var se = (jsyj).multiple(jzsl);

						return (ynse).subtract(kcse).subtract(se);
					}
				}

			}
		}
	}

	return null;
}

/**
 * 比较日期 校验止是否超过起5年
 * 
 * @param {Object}
 *            startDateStr
 * @param {Object}
 *            endDateStr
 * @return {TypeName} true:开始日期小于结束日期5年返回true
 */
var compareDatefive = function(startDateStr, endDateStr) {
	// 将年月日分割保存在数组中
	var startDates = splitStr(startDateStr);
	var endDates = splitStr(endDateStr);
	// 转换为日期
	var startDate = new Date(startDates[0], parseInt(startDates[1] - 1, 10),
			startDates[2]);
	var endDate = new Date(endDates[0] - 5, parseInt(endDates[1] - 1, 10),
			endDates[2]);
	return startDate <= endDate ? true : false;// 2011-12-15更改
};
// 点击关闭按钮，页面退出请调用此方法。
// function tcExit() {
// window.close();
// }
function ajaxInit(submitObj) {
	var submitObj = pc.create("SwordSubmit");
	parent.tyslFrame.getSubData(submitObj, true);
	submitObj.setFunction('onSuccess', 'ajaxInitOnSuccess');
	submitObj.submit({
		"tid" : "Pre_HxzgTyslProxy_startDiplomaAccept?serverName=Pre_HxzgTyslProxy_startDiplomaAccept&sDate="
				+ new Date().getTime(),
		'postType' : 'ajax'
	});
}

function sb071_check(name) {// 014里面的判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb071_checkGridData(gridName) {// 申报014中判断附表是grid时是否填值，true为有值，false为无值
	// 判断附表是否填值了，在点确定的时候进行判断，点退出和重置不改变该附表在主表上的状态
	var gridData = $w(gridName).getCurPageGridData();
	if (gridData == null || gridData == undefined || gridData == ""
			|| gridData.trs == null || gridData.trs == undefined
			|| gridData.trs == "" || gridData.trs.length == 0) {
		return false;
	} else {
		return true;
	}
}

function sb_gy_check(name) {// 判断填写是否合法
	var valid = pc.getWidget(name);
	if (!valid.validate()) {
		// swordAlert("请填写数据后保存！");
		return false;
	} else {
		return true;
	}
}
function sb_gy_checkGridData(gridName) {// 判断附表是grid时是否填值，true为有值，false为无值
	// 判断附表是否填值了，在点确定的时候进行判断，点退出和重置不改变该附表在主表上的状态
	var gridData = $w(gridName).getCurPageGridData();
	if (gridData == null || gridData == undefined || gridData == ""
			|| gridData.trs == null || gridData.trs == undefined
			|| gridData.trs == "" || gridData.trs.length == 0) {
		return false;
	} else {
		return true;
	}
}

// 票证号码补充零
function fillZero(value, phcd) {
	value = value.toString();
	if (typeof phcd == 'number') {
		while (value.length < phcd) {
			value = '0' + value;
		}
	} else if (typeof phcd == 'string') {
		phcd = parseInt(phcd, 10);
		while (value.length < phcd) {
			value = '0' + value;
		}
	}
	return value;
}
var sbcwgzJs;//申报错误更正计税方法
/**
 * 申报错误更正计税返回以后公用方法
 * @param pzxh
 * @param ybtse
 * @param djxh
 * @param resData
 * @param saveName
 * @return
 */
function sbcwgzGyjs(pzxh,ybtse,djxh,resData,saveName,param){
	$_saveResData = resData;
	swordConfirm("本次更正以后该纳税人的欠税金额：" + ybtse
			+ " 元(不含滞纳金、多缴)。是否需要保存?", {
		okBtnName : "是",
		cancelBtnName : "否",
		onOk : function() {
		     var  func=eval(saveName);
		     new  func(param);
		  //setTimeout(saveName,1);
		},
		onCancel : sbcwgzNotSave
	});
}
///**
// * 申报错误更正不保存   每个js自己写
// * @return
// */
//function sbcwgzNotSave(){
//	sbcwgzJs='';//清空
//	$w('sbToolBar').setEnabled('save');//点亮保存按钮
//}
/**
 * 跳转一般征收开票方法
 */
var $_saveResData = null;
var gt3_zskp_djxh;
var gt3_zskp_pzxh;
var gt3_zskp_tzfs;// 跳转方式
var gt3_zskp_tzfs_WSSB="newTab";//网报特殊处理
var swordWSSB = {};
swordWSSB.pzxh = null;
swordWSSB.ybtse = null;
swordWSSB.djxh = null;
swordWSSB.resData = null;
function fromYbSBJumpZskp(pzxh, ybtse, djxh, resData) {
	// 2016-12-01 ZOG00_201611260006 增加系统参数控制调整方式
	swordWSSB.pzxh = pzxh;
	swordWSSB.ybtse = ybtse;
	swordWSSB.djxh = djxh;
	swordWSSB.resData = resData;
	var submitXtcs = new SwordSubmit();
	submitXtcs.pushData("xtcsbm", "Z0000096Z02000031");
	submitXtcs.setCtrl("SBGyCtrl_getXtcsDzswj");
	submitXtcs.setFunction('onSuccess', 'afterGetTzfsXtcsForZskp');
	submitXtcs.submit();
}


function afterGetTzfsXtcsForZskp(req,res){
	var cs = res.getAttr("xtcsz");
	if(cs=="1"){
		gt3_zskp_tzfs_WSSB = "";
	}
	fromYbSBJumpZskpTRUE(swordWSSB.pzxh, swordWSSB.ybtse, swordWSSB.djxh, swordWSSB.resData);
	swordWSSB.pzxh = null;
	swordWSSB.ybtse = null;
	swordWSSB.djxh = null;
	swordWSSB.resData = null;
}


function  fromYbSBJumpZskpTRUE(pzxh, ybtse, djxh, resData){
	//网报特色改造，获取特色提示标志及缴款期限
	//start
	var tsbz = "";
	var jkqx = "";
	var jkqxSub = new SwordSubmit();
	jkqxSub.pushData("yzpzxh", pzxh);
	jkqxSub.setOptions({
		async : 'false',
		mask : 'false',
		ctrl : 'SBGyCtrl_getTsbzAndJkqx',
		onSuccess : function(req, res) {
			tsbz = res.getAttr("tsbz");
			jkqx = res.getAttr("jkqx");
		}
	});
	jkqxSub.submit();
	
	var djsk=resData.getAttr("djsk");
	ybtse = parseFloat(ybtse).round(2);//网报修改，防止ybtse值为科学计数法时，round后数据显示不对
	var msg="";
	//申报错误更正产生多缴税款 广西国税需求 不要动 begin
//	if((ybtse-0)==0){
//		msg="申报错误更正产生多缴税款,请到办税大厅窗口办理多缴税费抵缴手续。</br>";
//	}
	if(djsk=="Y"){
		if(typeof(xmgsFlag)!="undefined"){
			if(xmgsFlag=="Y"){
				msg="</br>更正申报产生多缴税款,请办理多缴税费退抵缴手续。";
			} else {
				msg="申报错误更正产生多缴税款,请到办税大厅窗口办理多缴税费抵缴手续。</br>";
			}
		} else {
			msg="申报错误更正产生多缴税款,请到办税大厅窗口办理多缴税费抵缴手续。</br>";
		}
	}
	//申报错误更正产生多缴税款 广西国税需求 不要动 end
	$_saveResData = resData;
	gt3_zskp_djxh = djxh;
	gt3_zskp_pzxh = pzxh;
	
	var yzpzzlDm = "";
	try {
		yzpzzlDm = resData.getAttr("yzpzzlDm");
		gt3_zskp_tzfs = resData.getAttr("tzfs");
	} catch (e) {
		gt3_zskp_tzfs = '';
	}
	gt3_zskp_tzfs = gt3_zskp_tzfs_WSSB;//"newTab"; // 网报特殊处理 
	if (ybtse < 0) {
		swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元,请进行退抵税审批。");
		return;
	} else if (ybtse >= 0 && ybtse <= 1 &&(!$chk(yzpzzlDm) || yzpzzlDm != "BDA0610136")) {

		if(typeof(xmgsFlag)!="undefined"){
			if(xmgsFlag=="Y"){
				swordAlertRight("更正申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
						+ " 元，无需进行网上扣款。"+msg);
			} else {
				swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
						+ " 元，无需进行网上扣款。");
			}
		} else {
			swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元，无需进行网上扣款。");
		}
		return;
	}
	
	for(var i=0; i<resData.data.length; i++){
		if(resData.data[i].name =='kpbz'){
			var kpbz = resData.data[i].value;
			if(kpbz=='N'){				
				swordAlert(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
						+ " 元。");
				return;
			}
		}
	}
	if(typeof(xmgsFlag)!="undefined"){
		if(xmgsFlag=="Y"){
			var tsxx = "更正申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
			+ " 元。是否需要调用网上扣款？"+msg;
			if("Y" == tsbz && jkqx != null){
				tsxx = tsxx + "请于" + jkqx + "前及时缴纳税款，超过规定的缴纳期限缴款的，将从税款滞纳次日按日加收滞纳税款万分之五的滞纳金。";
			}
			swordConfirm(tsxx, {
				okBtnName : "是",
				cancelBtnName : "否",
				onOk : function() {
					var zskpBtn = new SwordSubmit();
					zskpBtn.pushData('yzpzxh', gt3_zskp_pzxh);
					zskpBtn.pushData('djxh', gt3_zskp_djxh);
					zskpBtn.setCtrl("ZS040YbzskpCtrl_xmgszjjk");
					zskpBtn.setFunction('onSuccess', 'xmgszjjkSuccess');
					zskpBtn.submit();
				},
				onCancel : notJumpZskp
			});
		} else {
			var tsxx = msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
			+ " 元。是否需要调用网上扣款？";
			if("Y" == tsbz && jkqx != null){
				tsxx = tsxx + "请于" + jkqx + "前及时缴纳税款，超过规定的缴纳期限缴款的，将从税款滞纳次日按日加收滞纳税款万分之五的滞纳金。";
			}
			swordConfirm(tsxx, {
				okBtnName : "是",
				cancelBtnName : "否",
				onOk : function() {
					var insertdata = [{
								tds : {
									yzpzxh : {
										value : gt3_zskp_pzxh
									}
								}
							}];
					var yzpzxhList = {
						'sword' : 'SwordGrid',
						'name' : 'yzpzxhList',
						'trs' : insertdata
					};
		
					// 获取一般申报跳转征收开票后回跳一般申报用例页面参数变量
					var locationForKpStr = "";
					try {
						var locationForKp = pc.getResData("locationForKp", resData);
						if (locationForKp != undefined && locationForKp != null
								&& locationForKp != "") {
							locationForKpStr = locationForKp.value;
						}
					}  catch (e) {
						locationForKpStr = "";
					}																	
		
					var zskpBtn = new SwordSubmit();
					zskpBtn.pushData(yzpzxhList);
					zskpBtn.pushData('djxh', gt3_zskp_djxh);
					zskpBtn.pushData('locationForKpStr', locationForKpStr);
					zskpBtn.options.postType = "form";
					zskpBtn.setCtrl("ZS040YbzskpCtrl_initViewBysb");
					//swordOpenWin('/sword?ctrl=' + gt3.ctrl + '_print&r=' + Math.random(), zskpBtn);
					//swordOpenWin('', zskpBtn);
					if (gt3_zskp_tzfs == 'newTab' ) {
						top.openCommontTab4Sbgy(zskpBtn);
					}  else {
						swordOpenWin('', zskpBtn);
					}
					
				},
				onCancel : notJumpZskp
			});
		}
	} else {
		var tsxx = msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
		+ " 元。是否需要调用网上扣款？";
		if("Y" == tsbz && jkqx != null){
			tsxx = tsxx + "请于" + jkqx + "前及时缴纳税款，超过规定的缴纳期限缴款的，将从税款滞纳次日按日加收滞纳税款万分之五的滞纳金。";
		}
		swordConfirm(tsxx, {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				var insertdata = [{
							tds : {
								yzpzxh : {
									value : gt3_zskp_pzxh
								}
							}
						}];
				var yzpzxhList = {
					'sword' : 'SwordGrid',
					'name' : 'yzpzxhList',
					'trs' : insertdata
				};
	
				// 获取一般申报跳转征收开票后回跳一般申报用例页面参数变量
				var locationForKpStr = "";
				try {
					var locationForKp = pc.getResData("locationForKp", resData);
					if (locationForKp != undefined && locationForKp != null
							&& locationForKp != "") {
						locationForKpStr = locationForKp.value;
					}
				}  catch (e) {
					locationForKpStr = "";
				}																	
	
				var zskpBtn = new SwordSubmit();
				zskpBtn.pushData(yzpzxhList);
				zskpBtn.pushData('djxh', gt3_zskp_djxh);
				zskpBtn.pushData('locationForKpStr', locationForKpStr);
				zskpBtn.options.postType = "form";
				zskpBtn.setCtrl("ZS040YbzskpCtrl_initViewBysb");
				//swordOpenWin('/sword?ctrl=' + gt3.ctrl + '_print&r=' + Math.random(), zskpBtn);
				//swordOpenWin('', zskpBtn);
				if (gt3_zskp_tzfs == 'newTab' ) {
					top.openCommontTab4Sbgy(zskpBtn);
				}  else {
					swordOpenWin('', zskpBtn);
				}
				
			},
			onCancel : notJumpZskp
		});
	}
}

function xmgszjjkSuccess(req,res){
	var result = res.getAttr("result");
	if($chk(result)){
		swordAlert(result);
	}
}

function fromYbSBJumpZskpnew(pzxh, ybtse, djxh, bz,resData) {
	var djsk=resData.getAttr("djsk");
	var msg="";
	//申报错误更正产生多缴税款 广西国税需求 不要动 begin
	if(djsk=="Y"){
		msg="申报错误更正产生多缴税款,请到办税大厅窗口办理多缴税费抵缴手续。</br>";
	}
	$_saveResData = resData;
	gt3_zskp_djxh = djxh;
	gt3_zskp_pzxh = pzxh;
	ybtse = parseFloat(ybtse).round(2);//网报修改，防止ybtse值为科学计数法时，round后数据显示不对
	try {
		gt3_zskp_tzfs = resData.getAttr("tzfs");
	} catch (e) {
		gt3_zskp_tzfs = '';
	}
	if (ybtse < 0) {
		swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元,请进行退抵税审批。");
		return;
	} else if (ybtse >= 0 && ybtse <= 1) {
		swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元，无需进行网上扣款。");
		return;
	}
	for(var i=0; i<resData.data.length; i++){
		if(resData.data[i].name =='kpbz'){
			var kpbz = resData.data[i].value;
			if(kpbz=='N'){
				swordAlert(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
						+ " 元。");
				return;
			}
		}
	}
	swordConfirm(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
			+ " 元。是否需要调用网上扣款？", {
		okBtnName : "是",
		cancelBtnName : "否",
		onOk : function() {
			var insertdata = [{
						tds : {
							yzpzxh : {
								value : gt3_zskp_pzxh
							}
						}
					}];
			var yzpzxhList = {
				'sword' : 'SwordGrid',
				'name' : 'yzpzxhList',
				'trs' : insertdata
			};

			// 获取一般申报跳转征收开票后回跳一般申报用例页面参数变量
			var locationForKpStr = "";
			var locationForKp = pc.getResData("locationForKp", resData);
			if (locationForKp != undefined && locationForKp != null
					&& locationForKp != "") {
				locationForKpStr = locationForKp.value;
			}

			var zskpBtn = new SwordSubmit();
			zskpBtn.pushData(yzpzxhList);
			zskpBtn.pushData('djxh', gt3_zskp_djxh);
			zskpBtn.pushData('locationForKpStr', locationForKpStr);
			zskpBtn.options.postType = "form";
			zskpBtn.setCtrl("ZS040YbzskpCtrl_initViewBysb");
			swordOpenWin('/sword?ctrl=' + ctrl + '_print&r=' + Math.random(), zskpBtn);
//			if (gt3_zskp_tzfs == 'newTab') {
//				var tmpObj = parent.$w("tab1").tabItems.get("zskp.jsp");
//				if ($chk(tmpObj)) {
//					parent.$w('tab1').removeTabItem("zskp.jsp");
//				}
//				parent.$w('tab1').addTabItem({
//							id : "zskp.jsp",
//							title : "《网上扣款》",
//							tabContentType : 'iframe',
//							submit : zskpBtn,
//							isCloseBtn : 'true'
//						});
//				// 关闭小叉叉的问题
//				parent.$$(".tab_box ul li").each(function(el, i) {
//							el.setStyle("width", "150px");
//						});
//				parent.setTabSpanWidth();
//				parent.$w('tab1').scrollRight();
//				return;
//			}
//			zskpBtn.submit();
		},
		onCancel : notJumpZskp
	});
}
// 征收开票点击否处理方式
var sb004NotTzZskpAndTzGlbg;
var sb073NotTzZskp;
function notJumpZskp($_saveResData) {
	// 企业所得税查账征收年度申报（点击是否征收开票为"否"的时候处理方式:在sb004js中跳转关联业务往来报告）
	if (sb004NotTzZskpAndTzGlbg != 'undefined'
			&& sb004NotTzZskpAndTzGlbg instanceof Function) {
		sb004NotTzZskpAndTzGlbg();
	}
	
	if (sb073NotTzZskp != 'undefined'
			&& sb073NotTzZskp instanceof Function) {
		sb073NotTzZskp();
	}
}

// 减免
var jmxxList;
function getJmxx() {
	var jmxxBtn = new SwordSubmit();// $w("jmxxBtn");
	// jmxxBtn.pushData(object);
	jmxxBtn.setFunction('onSuccess', 'getJmxxOnSuccess');
	jmxxBtn.setCtrl("SBGyCtrl_getJmxx");// 查询 减免的路径
	jmxxBtn.submit();
}

function getJmxxOnSuccess(req, resData) {
	jmxxList = pc.getResData("jmxxList", resData);
	if ($chk(jmxxList) && jmxxList.trs.length > 0) {
		openJmxxPage();
	} else {
		swordAlert("没有减免税务事项通知书，不能输入减免金额");
	}
}
/**
 * 打开减免信息界面
 * 
 * @return
 */
function openJmxxPage1() {
	var openFlag = 3;
	var openJmxxPageBtn = new SwordSubmit();
	openJmxxPageBtn.setCtrl("SBGyCtrl_openJmxxPage");
	swordAlertIframe('', {
				titleName : "减免信息税务事",
				width : 600,
				height : 300,
				param : window,
				jmxxList : jmxxList,
				isNormal : 'true',
				isMax : 'true',
				isClose : 'true',
				isMin : "true",
				submit : openJmxxPageBtn
			});
}

// 自查补报一般通知书
function getZcbbtzs() {
	var zcbbtzsBtn = new SwordSubmit();// $w("zcbbtzsBtn");
	zcbbtzsBtn.pushData("");
	zcbbtzsBtn.setCtrl("SBGyCtrl_getZcbbtzs");
	zcbbtzsBtn.setFunction('onSuccess', 'initSblxOnSuccess');
	zcbbtzsBtn.setFunction('onError', 'initSblxOnError');
	zcbbtzsBtn.submit();
}
/**
 * 更改成自查补报后的成功返回的函数
 * 
 * @param req
 * @param resData
 * @return
 */
function initSblxOnSuccess(req, resData) {
	var nsrzcbbtzsGrid = pc.getResData("nsrzcbbtzsGrid", resData);
	var toNsrzcbbBtn = new SwordSubmit();
	toNsrzcbbBtn.pushData(nsrzcbbtzsGrid);
	toNsrzcbbBtn.setCtrl("SBGyCtrl_openZcbbPage");
	swordAlertIframe('', {
				titleName : "纳税评估自查补报通知书",
				width : 600,
				height : 300,
				param : window,
				isNormal : 'true',
				isMax : 'true',
				isClose : 'false',
				isMin : "true",
				submit : toNsrzcbbBtn
			});
}
function initSblxOnError(req, resData) {
	$w("XX").setValue("sblxDm", "0");// 把申报类型置为 一般申报
}

/**
 * 获得可用的预缴金额
 * 
 * @param yjxxList
 *            预缴税款列表
 * @param zspmDm
 *            征收品目代码
 * @param bqyjje
 *            页面输入的本期预缴金额
 * @return 可以使用的预缴金额
 */
function getBqKyyjje(yjxxList, zspmDm, bqyjje) {
	if (bqyjje > 0) {
		var yjye1 = 0;
		if ($chk(yjxxList) && $chk(yjxxList.trs) && yjxxList.trs.length > 0) {
			for (var i = 0; i < yjxxList.trs.length; i++) {
				var zspmDm1 = yjxxList.trs[i].tds.zspmDm.value;
				if (zspmDm == zspmDm1)
					yjye1 = yjye1 + yjxxList.trs[i].tds.yjye1.value.round(2);
			}
			

			if (bqyjje > yjye1) {
				bqyjje = yjye1;
			}
		} else {
			swordAlertWrong("没有查询到纳税人的已缴税款信息,不能录入本期已缴税款!");
			bqyjje = 0.0;
		}

	} else if (bqyjje <= 0) {
		bqyjje = 0.00;
	}
	return bqyjje;

}

/**
 * 申报类型修改处理： 1，对于自查补报的情况，弹出自查补报文书； 选择自查补报文书后,将自行补正通知书赋值到页面的gt3.zxbztzsuuid
 * 如果选择自行申报，则清空gt3.zxbztzsuuid
 * 
 * @param option
 * @param selItem
 * @param obj
 * @return
 */
function changeSblx(option, selItem, obj,func) {
	var nsrxxForm = $w('nsrxxForm');
	var sbsxDm = nsrxxForm.getValue("sbsxDm1").code;
	var skssqq = nsrxxForm.getValue("skssqq");
	var skssqz = nsrxxForm.getValue("skssqz");
	if (!$chk(sbsxDm)) {
		sbsxDm=nsrxxForm.getValue("sblx").code;
	}

	if ($chk(gt3.djxh)) {
		if (sbsxDm == '11') {// 正常申报
			gt3.zxbztzsuuid = "";
		} else if (sbsxDm == '21') {// 自查补报
			// 查询自查补报文书信息，有自查补报文书，则 弹出自查补报文书
			var zcbbBtn = new SwordSubmit();
			zcbbBtn.pushData("djxh", gt3.djxh);
			zcbbBtn.pushData("skssqq", skssqq);
			zcbbBtn.pushData("skssqz", skssqz);
			zcbbBtn.pushData("func", func);
			zcbbBtn.setCtrl('SBGyCtrl_toNsrzcbb');
			swordAlertIframe('', {
						titleName : '纳税评估自查补报通知书',
						width : 850,
						height : 400,
						param : window,
						submit : zcbbBtn,
						isNormal : 'false',
						isMax : 'false',
						isClose : 'false',
						isMin : "false"
					});
		}
	}
}
// 将弹出的通知书页面选择后的uuid写入到申报页面
function setNsrzcbbtzsUUID(uuid) {
	if (uuid == "0"){
		$w("nsrxxForm").setValue("sbsxDm1", "11");
	}else{
		gt3.zxbztzsuuid = uuid;
		try{
			if($chk(func)&&$chk(func.value)){
				eval(func.value+"()");
			}
		}catch(e){
		}
	}
}

/**
 * 刷新当前页面
 * 
 * @return
 */
var cwgzbz;
function nextOne() {
	if (cwgzbz != undefined && $chk(cwgzbz) && 'cwgzbz' == cwgzbz
			&& cwgzbz != '' && cwgzbz != null) {// 错误更正的下一户应该是到错误更正公共的初始化页面
		var test = new SwordSubmit();
		test.options.postType = "form";
		test.setCtrl("SB057SbcwgzCtrl_initView");
		test.submit();
	} else {
		top.$w("tab1").refreshCurrentTabItem();
	}
}


/**
 * 附加税信息（销售不动产）
 * 
 * @return
 */
function fjssbopenTabByXsbdc(sbxxList,djxh,qzdBz) {
	var name = "66";
	var table_name = "table" + name;
	var iframe_name = table_name + "iframeName";
	var initBtn = new SwordSubmit();
	initBtn.pushData('id', name);
	initBtn.pushData(sbxxList);
	initBtn.pushData("djxh",djxh);
	initBtn.pushData("qzdBz",qzdBz);
	initBtn.setCtrl("SBGyCtrl" + '_xmbdcToSbfb');
	initBtn.options.postType = "form_" + iframe_name;
	initBtn.submit();
	tables.set(table_name, true);
	var initBtn = new SwordSubmit();
	initBtn.pushData('id', name);
	initBtn.pushData(sbxxList);
	initBtn.pushData("djxh",djxh);
	initBtn.pushData("qzdBz",qzdBz);
	initBtn.setCtrl("SBGyCtrl" + '_xmbdcToSbfb');
	initBtn.options.postType = "form_" + iframe_name;
	initBtn.submit();
	tables.each(function(v, k) {
				k == table_name ? $(k).setStyle('display', '') : $(k).setStyle(
						'display', 'none');
				if (name != "00") {
					if (!tables.get(table_name)) {
						tables.set(table_name, true);
					}
				}
			});// 双击form格打开新的子页面
}


/**
 * 附加税信息
 * 
 * @return
 */
function fjssbopenTab(sbxxList,djxh,qzdBz,fjssjName) {
	var name = "66";
	var table_name = "table" + name;
	var iframe_name = table_name + "iframeName";
	var initBtn = new SwordSubmit();
	initBtn.pushData('id', name);
	initBtn.pushData('fjssjName', fjssjName);
	initBtn.pushData(sbxxList);
	initBtn.pushData("djxh",djxh);
	initBtn.pushData("qzdBz",qzdBz);
	initBtn.setCtrl("SBGyCtrl" + '_toSbfb');
	initBtn.options.postType = "form_" + iframe_name;
	initBtn.submit();
	tables.set(table_name, true);
	var initBtn = new SwordSubmit();
	initBtn.pushData('id', name);
	initBtn.pushData(sbxxList);
	initBtn.pushData("djxh",djxh);
	initBtn.pushData("qzdBz",qzdBz);
	initBtn.pushData('fjssjName', fjssjName);
	initBtn.setCtrl("SBGyCtrl" + '_toSbfb');
	initBtn.options.postType = "form_" + iframe_name;
	initBtn.submit();
	tables.each(function(v, k) {
				k == table_name ? $(k).setStyle('display', '') : $(k).setStyle(
						'display', 'none');
				if (name != "00") {
					if (!tables.get(table_name)) {
						tables.set(table_name, true);
					}
				}
			});// 双击form格打开新的子页面
}
function beforeSave() {
	var fjsSbxxGrid = $w("fjsSbxxGrid").getAllGridData();
	var dataxml = {};
	dataxml['gridName'] = {
		'value' : 'fjsSbxxGrid'
	};
	dataxml['gridData'] = {
		'value' : fjsSbxxGrid
	};
	dataxml['flag'] = {
		'value' : 1
	};
	parent.TheMainPage(dataxml);
}
// 改变税款所属期起止时需要的校验函数，return true和false
function checkDate(skssqq, skssqz, sbrq1, nsqxdm) {
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
	if (parseInt(qDates[0], 10) != parseInt(zDates[0], 10)) {
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
		// if(!(zDates[2] == monthDay(zDates[0],parseInt(zDates[1],10)) &&
		// (parseInt(zDates[1],10)==3 || parseInt(zDates[1],10)==6
		// || parseInt(zDates[1],10)==9 || parseInt(zDates[1],10)==12))){
		if (!(zDates[2] == monthDay(zDates[0], parseInt(zDates[1], 10)))
				|| (zDates[1] - qDates[1] + 1) > 3) {
			// swordAlert( "按季申报，所属期止必须为某季度的最后一天！");
			swordAlert("按季申报，所属期起止间隔不能超过3个月！");
			return false;
		}
		// if(!((parseInt(qDates[1],10)>=1 &&parseInt(qDates[1],10)<=3&&
		// parseInt(zDates[1],10)==3) ||
		// (parseInt(qDates[1],10)>=4 &&parseInt(qDates[1],10)<=6 &&
		// parseInt(zDates[1],10)==6) ||
		// (parseInt(qDates[1],10)>=7 &&parseInt(qDates[1],10)<=9&&
		// parseInt(zDates[1],10)==9) ||
		// (parseInt(qDates[1],10)>=10 &&parseInt(qDates[1],10)<=12&&
		// parseInt(zDates[1],10)==12))){
		// swordAlert("按季申报，所属期起和所属期止必须在同一个季度！") ;
		// return false;
		// }
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
		// if(!((parseInt(qDates[1],10)>=1 && parseInt(qDates[1],10)<=6
		// &&parseInt(zDates[1],10)==6) ||
		// (parseInt(qDates[1],10)>=7 && parseInt(qDates[1],10)<=12
		// &&parseInt(zDates[1],10)==12))){
		// swordAlert("按半年申报，所属期起和所属期止必须同属于1-6月或7-12月！") ;
		// return false;
		// }
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
		// if(!(parseInt(qDates[1],10) == 1 )){
		// swordAlert("按年申报，所属期起必须为某月的第一天！");
		// return false;
		// }
		// if(!((parseInt(qDates[1],10)>=1 && parseInt(qDates[1],10)<=12 &&
		// parseInt(zDates[1],10)<=12))){
		// swordAlert("按年申报，所属期起和所属期止必须同属于1-12月！") ;
		// return false;
		// }
		// if(!(parseInt(zDates[2],10) == 31) || (zDates[1]-qDates[1]+1)>12){
		// swordAlert("按年申报，所属期起止间隔不能超过12个月！");
		// return false;
		// }
		return true;
	} else {
		if (qDates[0] != zDates[0]) {// return值开头为0
			swordAlert("所属期起和所属期止必须在同一年!");
			return false;
		}
		return true;
	}
}
function onchangSkssq() {
	nsqx_dm = gt3_nsqx;
	var ssqzBtn = new SwordSubmit();
	ssqzBtn.setCtrl(ctrl + "_changeSbssqq");
	ssqzBtn.setFunction('onSuccess', 'loadBaseInfo');
	ssqzBtn.pushData('nsqxdm', nsqx_dm);
	ssqzBtn.pushData($w("nsrxxForm").getSubmitData());
	ssqzBtn.submit();
}
function calSkssqz(skssqq, nsqxDm, calSkssqzSuc) {
	var ssqzBtn = new SwordSubmit();
	if (skssqq == undefined || skssqq == null || skssqq == "") {
		swordAlert("税款所属期起不能为空!");
		return;
	}
	ssqzBtn.setCtrl("SBGyCtrl_jsskssqz");
	ssqzBtn.setFunction('onSuccess', calSkssqzSuc);
	ssqzBtn.pushData('skssqq', skssqq);
	ssqzBtn.pushData('nsqxdm', nsqxDm);
	ssqzBtn.submit();
}

/*******************************************************************************
 * 校验减免税额是否合法
 * 
 * @param {}
 *            jsyj 计税依据（应税项）
 * @param {}
 *            bqynse 本期应纳税额
 * @param {}
 *            jme 减免税额
 * @param {}
 *            zsxmDm 征收项目代码
 * @param {}
 *            jmxxList 减免备案信息集合
 * @return {Number} jmse 返回减免税额，将该返回值覆盖页面减免税额
 */
function jmxxCheck(jsyj, bqynse, jme, zsxmDm, jmxxList,pzxh) {
//	jmxxList.name="jmxxList";
	var jmse = jme;// 定义返回参数
	// 校验是否存在减免备案，没有直接返回减免额0
	if (bqynse / 1 < jme / 1) {
		swordAlert("本期减免税额不能大于本期应纳税额。");
		return;
	}
//	else {
//		if (jmxxList.trs.length <= 0) {
//			swordAlert("当前纳税人不存在有对应的减免税务事项备案。");
//			jmse = jme;
//		}
//		if (jme / 1 > 0) {
//			// 减免税额大于0，进入后台公共方法校验金额
//			var ssqzBtn = new SwordSubmit();
//			ssqzBtn.setCtrl("SBGyCtrl_getJmxxCheck");
//			ssqzBtn.pushData('jsyj', jsyj);
//			ssqzBtn.pushData('bqynse', bqynse);
//			ssqzBtn.pushData('jme', jme);
//			ssqzBtn.pushData('zsxmDm', zsxmDm);
//			ssqzBtn.pushData('pzxh', pzxh);
//			ssqzBtn.pushData(jmxxList);
//			ssqzBtn.setOptions({
//						'onSuccess' : function(req, resData) {
//							var map = pc.getResData("map", resData);
//							var jmBz = map.data.jmBz.value;// 返回减免标志 Y：符合减免
//															// N：不符合减免
//							var news = map.data.news.value;// 返回不符合减免信息
//							if (jmBz == "N") {
//								// 不符合，弹出提示信息
//								jmse = jme;
//								swordAlert(news);
//							} else {
//								// 符合，返回传入减免税额
//								jmse = jme;
//							}
//						}
//					});
//			ssqzBtn.submit();
//		}
//	}
	return jmse;
}


/*******************************************************************************
 * 获取特定属期内的减免信息，未获取到时后台查询
 * 
 * @param {} djxh 登记信息
 * @param {} sbsxDm 申报属性代码
 * @param {} yzpzzlDm 应征凭证种类代码
 * @return {} jmxxList 减免信息List(选中的行)
 */
function getJmxxListOneRow(djxh,sbsxDm,yzpzzlDm,rowData) {
   if(!$chk(djxh)){
		swordAlert("登记序号为空，无法获取减免信息！");
		return;
	}
	rowData.name="skxxGrid";
	var jmBtn = new SwordSubmit();
	jmBtn.pushData('djxh', djxh);
	jmBtn.pushData('sbsxDm1', sbsxDm);
	jmBtn.pushData('yzpzzlDm',yzpzzlDm);
	jmBtn.pushData(rowData);
	jmBtn.setCtrl('SBGyCtrl_getJmxxList');
	jmBtn.setOptions({
				'onSuccess' : function(req, res) {
					jmxxList = pc.getResData("jmxxList", res);
				}
			});
	jmBtn.submit();
	return jmxxList;
}

/**
 * 特殊减免规则处理
 * @param djxh
 * @param zsxmDm
 * @param zspmDm
 * @param sksqq
 * @param skssqz
 * @param jsyj
 * @param ysx
 * @param ynse
 * @param jmse
 * @param yjse
 * @param ybtse
 * @param sl1
 * @return arr
 */
function processTsjmxx(djxh,zsxmDm,zspmDm,skssqq,skssqz,jsyj,ysx,ynse,jmse,yjse,ybtse,sl1){
	var tsjmxxArr = new Array();
	if(tsswjggzlx=="1"&&(zsxmDm=="30138"||zsxmDm=="30127"||zsxmDm=="30216"||zsxmDm=="30221")){//执行特殊减免处理
		var slBtn = new SwordSubmit();
		slBtn.pushData("zsxmDm", zsxmDm);
		slBtn.pushData("zspmDm", zspmDm);
		slBtn.pushData("skssqq", skssqq);
		slBtn.pushData("skssqz", skssqz);
		slBtn.pushData("jsyj", jsyj);
		slBtn.pushData("ysx", ysx);
		slBtn.pushData("ynse", ynse);
		slBtn.pushData("jmse", jmse);
		slBtn.pushData("yjse", yjse);
		slBtn.pushData("ybtse",ybtse);
		slBtn.pushData("djxh",djxh);
		slBtn.pushData("sl1",sl1);
		slBtn.pushData("tsswjggzlx",tsswjggzlx);
		slBtn.setCtrl("SBGyCtrl_processTsjmxx");
		slBtn.setOptions({
			"onSuccess" : function(req, res) {
			    
				var jmse1 = res.getAttr("jmse");// 减免税额
				var yjse1 = res.getAttr("yjse");// 已缴税额
				var ybtse1 = res.getAttr("ybtse");// 应补退税额
				
				tsjmxxArr.push(jmse1,yjse1,ybtse1);
			}
		});
	    slBtn.submit();
	    return tsjmxxArr;
	}else{
		tsjmxxArr.push(jmse,yjse,ybtse);
		return tsjmxxArr;
	}
}
/**
 *  改变税务机关代码触发是否管户机关的校验事件
 * @param nsrxxForm  form名称
 * @param zgswskfjDm dm名称
 * @param el
 */
function changeZgswskfjDm(nsrxxForm,zgswskfjDm,el) {
	var zgswjgDm = el.getAttribute('code');// 主管税务机关代码
	var ghbz=checkSwjgDmGhbz(zgswjgDm);
	if("N"==ghbz){
		swordAlert("该税务机关非管户机关，请重新选择", {
			onOk : function() {
				$w(nsrxxForm).setValue(zgswskfjDm,'');
			}
		});
	}
}
/**
 *   校验税务机关代码是否管户标识
 * @param swjgDm
 */
function checkSwjgDmGhbz(swjgDm){
	var ghbz="N";
	if($chk(swjgDm)){
		var btn = new SwordSubmit();
		btn.pushData("swjgDm", swjgDm);
		btn.setCtrl("SBGyCtrl_checkSwjgDmGhbz");
		btn.setOptions({
			"onSuccess" : function(req, res) {
				ghbz = res.getAttr("ghbz");// 管户标识
			}
		});
		btn.submit();
	}
	return ghbz;
}


/*******************************************************************************
 * 空转为0.00数值
 * 
 * @param {}
 *            obj
 * @return {String}
 */
function emptyToZ(obj) {
	if (typeof(obj) == "object") {
		if (!$chk(obj)) {
			return "0.00";
		} else if (!$chk(trimStr(obj.value))) {
			return "0.00";
		} else if (trimStr(obj.value) == "null") {
			return "0.00";
		} else {
			return trimStr(obj.value);
		}
	} else if (typeof(obj) == "number") {
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


/**
 * 批扣清册状态提示：获取批扣提示信息，对于定期定额自行申报、小规模申报、通用申报、营业税申报增加批扣提示处理,对于已经产生批扣清册的，则给予提示，避免重复申报
 * @param djxh  登记序号
 * @param skssqq  税款所属期起
 * @param skssqz  税款所属期止
 * @return  
 */
function getPkqcztts(djxh,skssqq,skssqz){
	if($chk(djxh)&&$chk(skssqq)&&$chk(skssqz)){
		var slBtn = new SwordSubmit();
		slBtn.pushData("djxh", djxh);
		slBtn.pushData("skssqq", skssqq);
		slBtn.pushData("skssqz", skssqz);
		
		slBtn.setCtrl("SBGyCtrl_getPktsxx");
		slBtn.setOptions({
			"onSuccess" : function(req, res) {
			    var  pktsxx = res.getAttr("pktsxx");// 批扣提示信息
			    if($chk(pktsxx)){
			    	swordAlert(pktsxx);
			    }
			}
		});
    slBtn.submit();
	}
}
	
/**
 * 选择减免性质后，获取默认带出的减免税额
 * @param jsyj - 计税依据
 * @param ynse - 应纳税额
 * @param fdsl - 法定税率
 * @param jmfd - 减免幅度
 * @param jmed - 减免额度
 * @param jmsl - 减免（减按）税率
 * @return
 */
function getMrjmseBySsjmxz(jmzlxDm,jsyj,ynse,fdsl,jmfd,jmed,jmsl)
{
	var jmse = 0.00 ;
	var sljmje = 0.00 ;
	var flag = false;//是否非按照税率(超额累进税率的情况)计税标志
	//if(ynse != jsyj.multiple(fdsl).round(2)){//非按照税率计税的情况,此时对于税率减免和幅度减免不做减免税额计算，需要前台手工录入减免税额
	///	flag = true;
	//}
	if(ynse.round(2) != jsyj.multiple(fdsl).round(2)){//非按照税率计税的情况,此时对于税率减免和幅度减免不做减免税额计算，需要前台手工录入减免税额
		flag = true;  //sword.js未升级
	}
	
	if(jmzlxDm == '02')
	{
		jmse = ynse ;
	}
	else if (jmzlxDm == '01')
	{
		if(jmed > 0)
		{
			if(jmed > ynse)
			{
				jmse = ynse ;
			}
			else
			{
				jmse = jmed ;
			}
		}
		else if(jmsl > 0 && fdsl > jmsl)
		{
			sljmje = jsyj.multiple(fdsl - jmsl) ;
			if(sljmje > ynse )
			{
				jmse = ynse ;
			}
			else 
			{
				jmse = sljmje ;
			}
			if(flag){
				jmse = 0;
			}
		}
		else if (jmfd > 0 && jmfd < 1)
		{
			jmse = jsyj.multiple(jmfd).multiple(fdsl) ;
			if(flag){
				jmse = 0;
			}
		}
	}
	return jmse ;
}

/**
 * 获取减免税额
 * @param selItem 下拉对象
 * @param jsyj 计税依据
 * @param ynse应纳税额
 * @param ynse法定税率
 * @return
 */
function getjmsebySsjmxzDm(selItem,jsyj,ynse,fdsl){
	
	var  jmzlxDm=selItem.jmzlxDm;
	var  jmsl=selItem.jmsl;
	var  jmed=selItem.jmed;
	var  jmfd=selItem.jmfd;
	var jmse=0.0; 
	if(jmzlxDm!= undefined &&$chk(jmzlxDm)){
		 jmse =  getMrjmseBySsjmxz(jmzlxDm,jsyj/1,ynse/1,fdsl/1,jmfd/1,jmed/1,jmsl/1);//增加自动转换为数字处理，否则比较运算符会出现结果错误的问题
	}
	return jmse;
}
/**
 * 计算小型微利企业减免税率
 * @param xxwlqycsList 小型微利企业参数配置表
 * @param ynssdeLj  应纳税额累计值，不是累计类的传ynssde
 * @param sfNb 是否年报标志  0月季度申报，1年报
 * @param cyrsQsc  从业人数
 * @param zczeQcs  资产总额
 * @param hyDmQcs  行业代码   工业传1 其他行业传9
 * @return xxwlqyjmsl
 */
function jsXxwlqyJmslForQysds(xxwlqycsList,ynssdeLj,sfNb,cyrsQsc,zczeQcs,hyDmQcs){
	var xxwlqysysl_jsyj=0.00;//小微税率
	var sfJbsl="N";//计算的小微减免的税率是否是减半征收的税率
	var ljjme = 0.00;//累进减免额，2019年属期开始使用
	var xxwlqyObj={};
	if(sfNb=='0'){// 月季度
		if(xxwlqycsList!=null &&xxwlqycsList !=undefined &&xxwlqycsList.trs!=undefined&&xxwlqycsList.trs!=null){
			for(var i=0;i<=xxwlqycsList.trs.length-1;i++){
				var xxpdBz=false;// 下限判断标志，默认不包含下限
				var sxpdbz=false;// 上线判断标志，默认不包含上限
				var xxValue=0.00;// 下限额度
				var sxValue=0.00;// 上限额度
				if(xxwlqycsList.trs[i].tds.xxpdbz.value =='Y'){// 下限标志
					xxpdBz=true;
				}
				if(xxwlqycsList.trs[i].tds.sxpdbz.value =='Y'){// 上限标志
					sxpdbz=true;
				}
				// 计算减免率
				if(xxpdBz){// 包含下限
					if(sxpdbz){// 包含上限
						if(ynssdeLj>=xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<=xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}else{// 不包含上限
						if(ynssdeLj>=xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}
				}else{// 不包含下限
					if(sxpdbz){// 包含上限
						if(ynssdeLj>xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<=xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}else{// 不包含上限
						if(ynssdeLj>xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}
				}
			 }
			xxwlqyObj['xxwlqysysl_jsyj']={'value':xxwlqysysl_jsyj};
			xxwlqyObj['sfJbsl']={'value':sfJbsl};
			xxwlqyObj['ljjme']={'value':ljjme};
	   }
	   return xxwlqyObj;
	}else{
		if(cyrsQsc==null||cyrsQsc==undefined){
			cyrsQsc=0.0;
		}
		if(zczeQcs==null||zczeQcs==undefined){
			zczeQcs=0.0;
		}
		if(hyDmQcs==null||hyDmQcs==undefined){
			hyDmQcs="";
		}
		var jkbzObj="";
		if(xxwlqycsList!=null &&xxwlqycsList !=undefined &&xxwlqycsList.trs!=undefined&&xxwlqycsList.trs!=null){
			for(var i=0;i<=xxwlqycsList.trs.length-1;i++){
				//年报的时候先判断是否满足三项指标,如果满足继续下找本年应纳对应的关系
				jkbzObj=xxwlqycsList.trs[i].tds.jksjxx.value;//三项监控标准的字符串
				if(jkbzObj==null||jkbzObj==undefined){
					continue;
				}
				try{
					// 将三项指标的字符串解析成2个数组，以‘;’分隔
					var isThreeValue=false;
					var jkbzObjList= jkbzObj.split(";");
					for(var j=0;j<jkbzObjList.length;j++){
						var jkbzmxList=jkbzObjList[j];
						if(jkbzmxList==null||jkbzmxList==undefined){
							continue;
						}
						// 将明细的三项标准以逗号叉开，0位置为行业，1位置为从业人数，2位置为资产总额
						var jkbz=jkbzmxList.split(',');
						if(hyDmQcs==jkbz[0]&&cyrsQsc>0&&cyrsQsc<=jkbz[1]&&zczeQcs>0&&zczeQcs<=jkbz[2]){
							isThreeValue=true;
							break;
						}
					}
				}catch(e){
					throw new Error(swordAlert("请检查小型微利企业的参数表CS_SB_QYSDS_XXWLQYCSPZB配置的信息,是否符合标准")); 
				}
				//如果不满足三项标准，直接跳到下一次循序
				if(!isThreeValue){
					continue;//跳到下一次循序
				}
				var xxpdBz=false;// 下限判断标志，默认不包含下限
				var sxpdbz=false;// 上线判断标志，默认不包含上限
				var xxValue=0.00;// 下限额度
				var sxValue=0.00;// 上限额度
				if(xxwlqycsList.trs[i].tds.xxpdbz.value =='Y'){// 下限标志
					xxpdBz=true;
				}
				if(xxwlqycsList.trs[i].tds.sxpdbz.value =='Y'){// 上限标志
					sxpdbz=true;
				}
				// 计算减免率
				if(xxpdBz){// 包含下限
					if(sxpdbz){// 包含上限
						if(ynssdeLj>=xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<=xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}else{// 不包含上限
						if(ynssdeLj>=xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}
				}else{// 不包含下限
					if(sxpdbz){// 包含上限
						if(ynssdeLj>xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<=xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}else{// 不包含上限
						if(ynssdeLj>xxwlqycsList.trs[i].tds.xxwlqyedxx.value/1 && ynssdeLj<xxwlqycsList.trs[i].tds.xxwlqyedsx.value/1){
							xxwlqysysl_jsyj=(xxwlqycsList.trs[i].tds.xxwlqysyjmsl.value)/1;
							sfJbsl=xxwlqycsList.trs[i].tds.sfjbsl.value;
							ljjme=xxwlqycsList.trs[i].tds.ljjme.value;
						}
					}
				}
			}
			xxwlqyObj['xxwlqysysl_jsyj']={'value':xxwlqysysl_jsyj};
			xxwlqyObj['sfJbsl']={'value':sfJbsl};
			xxwlqyObj['ljjme']={'value':ljjme};
		}
		return xxwlqyObj;
	}
	return xxwlqyObj;
}
/**
 * 新版本的小微减免政策
 * @param zxrq
 * @param djrq
 * @param skssqz
 * @param xxwlqycsList
 * @param ynssdeLj
 * @return
 */
function jsXxwlqyJmslForQysdsForNew(zxrq,djrq,skssqz,xxwlqycsList,ynssdeLj){
	var xxwlqyObj={};
	var year=skssqz.substring(0,4).substring(0,4)/1;
	var month=skssqz.substring(5,7)/1;
	if(year==2015 && month>=10 &&month<=12 && ynssdeLj>200000 &&ynssdeLj<=300000){//2015-10起执行小微新政策
		//分登记和注销时间场景判断吧   所有的本年指的2015年
		//1，非本年开业，非本年注销
		//2，非本年开业，本年注销
		//3，本年开业，非本年注销
		//4，本年开业，本年注销
		if(djrq!=null &&djrq!=undefined &&djrq!=''&&djrq.substring(0,4)/1<2015){//非本年开业的场景
			if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1>2015){//非本年注销的场景
				var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
				var slValue = 0.05.multiple(9).divide(skssqzValue);//TODO税率   记得用架构的公式 截取两位
				slValue =slValue.accAdd(0.15.multiple(skssqzValue-9).divide(skssqzValue));
				xxwlqyObj['xxwlqysysl_jsyj']={'value':slValue};
				xxwlqyObj['sfJbsl']={'value':'Y'};
			}else if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1==2015 &&zxrq.substring(5,7)/1>=10){//本年注销的场景
				var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
				var zxMonth=zxrq.substring(5,7)/1;// 注销的月份
				var slValue=0.05.multiple(9).divide(zxMonth);//TODO税率   记得用架构的公式 截取两位
				slValue=slValue.accAdd(0.15.multiple(zxMonth-9).divide(zxMonth));
				xxwlqyObj['xxwlqysysl_jsyj']={'value':slValue};
				xxwlqyObj['sfJbsl']={'value':'Y'};
			}else{//没有注销的场景
				//如果是2015年十月之前走正常配置
				var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
				var slValue = 0.05.multiple(9).divide(skssqzValue);//TODO税率   记得用架构的公式 截取两位
				slValue=slValue.accAdd(0.15.multiple(skssqzValue-9).divide(skssqzValue));
				xxwlqyObj['xxwlqysysl_jsyj']={'value':slValue};
				xxwlqyObj['sfJbsl']={'value':'Y'};
			}
		}else if(djrq!=undefined &&djrq!=undefined &&djrq!=''&&djrq.substring(0,4)/1==2015){//本年开业的场景
			//开业日期分10月份之前 和10月份之后
			var kyMonth=djrq.substring(5,7)/1;
			if(kyMonth<10){//也得同步考虑注销时间
                if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1>2015){//非本年注销的场景
                	var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
					var sjJyyf=skssqzValue-kyMonth+1;
					var slValue=0.05.multiple(9-kyMonth+1).divide(sjJyyf);
					slValue=slValue.accAdd(0.15.multiple(skssqzValue-9).divide(sjJyyf));
					xxwlqyObj['xxwlqysysl_jsyj']={'value':slValue};
					xxwlqyObj['sfJbsl']={'value':'Y'};
				}else if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1==2015 &&zxrq.substring(5,7)/1>=10){//本年注销的场景
					var zxMonth=zxrq.substring(5,7)/1;
					var sjJjyf=zxMonth-kyMonth+1;
					var slValue=0.05.multiple(9-kyMonth+1).divide(sjJjyf);
					slValue=slValue.accAdd(0.15.multiple(zxMonth-9).divide(sjJjyf));
					xxwlqyObj['xxwlqysysl_jsyj']={'value':slValue};
					xxwlqyObj['sfJbsl']={'value':'Y'};
				}else{//没有注销的场景
					var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
					var sjJyyf=skssqzValue-kyMonth+1;
					var slValue=0.05.multiple(9-kyMonth+1).divide(sjJyyf);
					slValue=slValue.accAdd(0.15.multiple(skssqzValue-9).divide(sjJyyf));
					xxwlqyObj['xxwlqysysl_jsyj']={'value':slValue};
					xxwlqyObj['sfJbsl']={'value':'Y'};
				}
			}else{//十月之后  直接走配置信息 全部0.15减免
				if(xxwlqycsList!=undefined&&xxwlqycsList!=null){
					xxwlqyObj=jsXxwlqyJmslForQysds(xxwlqycsList,ynssdeLj,"0");
				}
			}
		}else{
			//16年开业的  直接走参数配置表即可
			if(xxwlqycsList!=undefined&&xxwlqycsList!=null){
				xxwlqyObj=jsXxwlqyJmslForQysds(xxwlqycsList,ynssdeLj,"0");
			}	
		}
	}else{
		if(xxwlqycsList!=undefined&&xxwlqycsList!=null){
			xxwlqyObj=jsXxwlqyJmslForQysds(xxwlqycsList,ynssdeLj,"0");
		}
	}
	return xxwlqyObj;
}
/**
 * 小微减半征收税率
 * @param zxrq 注销日期
 * @param djrq 登记日期
 * @param skssqz 税款所属期止
 * @param xxwlqycsList 小微企业减免税率
 * @param ynssdeLj 应补退税额累计
 * @param xxwlqysysl_jsyj 小微税率
 * @return
 */
function jsXxwlqyJbzsslForqysdsNew(zxrq,djrq,skssqz,xxwlqycsList,ynssdeLj,xxwlqysysl_jsyj){
	var jbzsl=0.00;
	//分登记和注销时间场景判断吧   所有的本年指的2015年
	//1，非本年开业，非本年注销
	//2，非本年开业，本年注销
	//3，本年开业，非本年注销
	//4，本年开业，本年注销
	if(djrq!=null &&djrq!=undefined &&djrq!=''&&djrq.substring(0,4)/1<2015){//非本年开业的场景
		if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1>2015){//非本年注销的场景
			var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
			jbzsl = (0.15).multiple(skssqzValue-9).divide(skssqzValue);
		}else if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1==2015 &&zxrq.substring(5,7)/1>=10){//本年注销的场景
			var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
			var zxMonth=zxrq.substring(5,7)/1;// 注销的月份
			jbzsl=(0.15).multiple(zxMonth-9).divide(zxMonth);
		}else{//没有注销的场景
			//如果是2015年十月之前走正常配置
			var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
			jbzsl = 0.15.multiple(skssqzValue-9).divide(skssqzValue);
		}
	}else if(djrq!=undefined &&djrq!=undefined &&djrq!=''&&djrq.substring(0,4)/1==2015){//本年开业的场景
		//开业日期分10月份之前 和10月份之后
		var kyMonth=djrq.substring(5,7)/1;
		if(kyMonth<10){//也得同步考虑注销时间
            if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1>2015){//非本年注销的场景
            	var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
				var sjJyyf=skssqzValue-kyMonth+1;
				jbzsl=0.15.multiple(skssqzValue-9).divide(sjJyyf);
			}else if(zxrq!=null&&zxrq!=undefined&&zxrq!=''&&zxrq.substring(0,4)/1==2015 &&zxrq.substring(5,7)/1>=10){//本年注销的场景
				var zxMonth=zxrq.substring(5,7)/1;
				var sjJjyf=zxMonth-kyMonth+1;
				jbzsl=0.15.multiple(zxMonth-9).divide(sjJjyf);
			}else{//没有注销的场景
				var skssqzValue=skssqz.substring(5,7)/1;//申报日期止
				var sjJyyf=skssqzValue-kyMonth+1;
				jbzsl=0.15.multiple(skssqzValue-9).divide(sjJyyf);
			}
		}else{//十月之后  直接走配置信息 全部0.15减免
			jbzsl=xxwlqysysl_jsyj;
		}
	}
	
	return jbzsl.round(4);
}
/**
 * 获取减免税额
 * @param jsyj 计税依据
 * @param ynse应纳税额
 * @param ynse法定税率
 * @return
 */
function getJsjmse(jsyj,ynse,fdsl,gridName){
	
	var data=gridName.getCheckedRowData(); 
	var jmzlxDm=data.getValue("jmzlxDm");
	var  jmsl=data.getValue("jmsl");
	var  jmed=data.getValue("jmed");
	var  jmfd=data.getValue("jmfd");
	var jmse=0.0; 
	if(jmzlxDm!= undefined &&$chk(jmzlxDm) && jmzlxDm!='null'){
		 jmse =  getMrjmseBySsjmxz(jmzlxDm,jsyj/1,ynse/1,fdsl/1,jmfd/1,jmed/1,jmsl/1);
	}
	return jmse;
}

//选择减免性质代码时，对隐藏的减免幅度，减免税率等属性赋值
function changeJmxzXXCl(selItem,girdName,jsyj,ynse,fdsl) {
	var  jmzlxDm=selItem.jmzlxDm;
	var  jmsl=selItem.jmsl;
	var  jmed=selItem.jmed;
	var  jmfd=selItem.jmfd;
	var data;
	var jmse=0.0;
	//var data=girdName.getCheckedRowData();
	if(jmzlxDm!= undefined &&$chk(jmzlxDm)){
		data={
				 "tds" : {
			           "jmzlxDm":{
			                 "value" : jmzlxDm
		                      },
		                "jmsl":{
		                     "value" : jmsl  
		                      },
		                      "jmed":{
				                     "value" : jmed  
				                      },
		                      "jmfd":{
			                        "value" : jmfd  
			                }
		               } 
		 };
		 jmse =  getMrjmseBySsjmxz(jmzlxDm,jsyj/1,ynse/1,fdsl/1,jmfd/1,jmed/1,jmsl/1);
	}else{
		data={
				 "tds" : {
			           "jmzlxDm":{
			                 "value" : ""
		                      },
		                "jmsl":{
		                     "value" : 0.0  
		                      },
		                      "jmed":{
				                     "value" : 0.0  
				                      },
		                      "jmfd":{
			                     "value" : 0.0 
			                  }
		               } 
		 };
	}
	
	var row = girdName.getCheckedRow();
	girdName.updateRow(row, data);
	return jmse;
}
/**
 * 清空隐藏字段的值
 * @param girdName
 * @return
 */
function clearData(girdName){
	var data={
			 "tds" : {
		           "jmzlxDm":{
		                 "value" : ""
	                      },
	                "jmsl":{
	                     "value" : 0.0 
	                      },
	                 "jmed":{
			               "value" : 0.0
			               },
	                  "jmfd":{
		                   "value" :0.0 
		                  },
		               "yhsl":{
		                	"value":0.0  
		                }, 
		                "yhjmje":{
		                	"value":0.0 
		                }
	               } 
	 };
	var row = girdName.getCheckedRow();
	girdName.updateRow(row, data);
}

/**
 * 征收子目减免税额
 * @param fdsl
 * @param yhsl
 * @param ysyj
 * @return
 */
function getzszmJmse(fdsl,yhsl,jsyj){
	var jmse=(jsyj/1)*((fdsl/1)-(yhsl/1));
	return jmse;
}

function getjmsebyYhslOrJmba(zszmDm,ssjmxzDm,ssjmxzDm2,fdsl,yhsl,jsyj,ynse,gridName){
	var jmse=0.0;
	if($chk(zszmDm) && zszmDm!=undefined &&$chk(ssjmxzDm) && $chk(ssjmxzDm2) && ssjmxzDm==ssjmxzDm2){
		if(!$chk(yhsl)||yhsl=='null'||yhsl==undefined){
			yhsl=0.0;
		}
		jmse=(jsyj/1)*((fdsl/1)-(yhsl/1));
	}else{
		
		jmse=getJsjmse(jsyj,ynse,fdsl,gridName);
	}
	return jmse;
}


/*******************************************************************************
 * 考虑到各地历史车辆的实际情况，对于车架号的校验规则如下：
 *1.对于车架号码为17位以下的，考虑到外部数据交换的因素，按实际号码录入，不需要补零，系统暂不进行校验
 *2.对于车架号码位数为17位以上的，按实际号码录入，系统暂不进行校验
 *3.对于车架号码位数为17位的，系统对车架号的规范进行提示性校验
 * 
 * 使用 rule="must_customFunction;cjhVal()"
 */
function cjhVal (obj) {
	var result = {};
	var cjh = obj.value;

	if(!$chk(cjh)){
		return result;
	}else {
		var cjhLen = cjh.length;
		if(cjhLen == "17"){
			var zcjygz = "^(?![0-9]+$)(?![A-Z]+$)([0-9A-Z]{17})$";//正常校验规则：车辆识别代码应由大写字母和数字组成，且17位。
			if(!cjh.test(zcjygz) ){
				//result["state"] = false;
			    //result["msg"] = "“车辆识别代码应由大写字母和数字组成，且17位”";
			    swordAlert("注意：车辆识别代码应由大写字母和数字组成！");
			}
		}else{
			swordAlert("注意：当前录入的车辆识别代码不是标准的17位！");
		}
	}
	return result;
}
/**
 * 判断审批标志
 * @param option
 * @param selItem
 * @param obj
 * @return
 */
function pandSpbz(option,selItem,obj) {
	if(selItem!=undefined && selItem!=null){
		if(selItem.spbaBz!='Y'&&selItem.code!=0099129999){//2018-12-6(以下减免性质不需要备案：0099129999︱小微企业免征地方教育附加︱其他)
		      swordAlert('所选择的税收减免性质没有进行税收减免备案。');
		}
	}
}

/**
 * 获取当前日期
 * @return 返回yyyy-MM-dd
 */
function getCurrentDate(){
  var nowDate = new Date();
  var nowYear = nowDate.getFullYear();
  var nowMonth = nowDate.getMonth() + 1;
  if(parseInt(nowMonth,10)<10){
	  nowMonth = '0' + nowMonth;
  }
  var nowD = nowDate.getDate();
  if(parseInt(nowD,10) < 10){
	  nowD = '0' + nowD;
  }
  return nowYear + "-" + nowMonth + "-" + nowD;
}

/**
 * 获取输入日期当月最后一天
 * @param date yyyy-MM-dd
 * @return
 */
function getLastDayOfMonth(date){
    if ((date == null) || (date == '') ){
        return;    
    }
    var Dates= splitStr(date);    
    var day= new Date(Dates[0],Dates[1],0);    
    return Dates[0]+'-'+Dates[1]+'-'+day.getDate();
}

/**
 * 获取输入日期次月第一天
 * @param date yyyy-MM-dd
 * @return
 */
function getFirstDayOfNextMonth(date){
  if ((date == null) || (date == '') ){
        return;    
    }
  var dtStr = getLastDayOfMonth(date);
  var dtAry = splitStr(dtStr);
  var year = '';
  var month = '';
  var dt = '01';
  if(dtAry[1] == '12'){
    year = parseInt(dtAry[0],10) + 1 + '';
    month = '01';    
  }
  else{
    year = dtAry[0];
    month = parseInt(dtAry[1],10) + 1;
    if(month < 10){
      month = '0' + month;
    }
  }
  return year + "-" + month + "-" + dt;
}

/**
 * 获取输入日期的前一个月的最后一天
 * @param date yyyy-MM-dd
 * @return
 */
function getLastDayOfLastMonth(date){
  var dtAry = splitStr(date);
  var year = '';
  var month = '';
  if(dtAry[1] == '01'){
    year = parseInt(dtAry[0],10) - 1 + '';
    month = '12';
  }
  else{
    year = dtAry[0];
    month = parseInt(dtAry[1],10) - 1 + '';
    if(month < 10){
      month = '0' + month;
    }
  }
  var day= new Date(year,month,0);
  return year + '-' + month + '-' + day.getDate();
}

function getMonthOfDiff(rqq, rqz){
	var rqqAry = splitStr(rqq);
	var rqzAry = splitStr(rqz);
	var rqqNum = parseInt(rqqAry[0],10)*12 + parseInt(rqqAry[1],10);
	var rqzNum = parseInt(rqzAry[0],10)*12 + parseInt(rqzAry[1],10);
	var result = rqzNum - rqqNum + 1;
	return result;
}

function checkjmxz(jmxzDm,mj,gmffwtcDm){
	if(!$chk(jmxzDm)||!$chk(mj)||!$chk(gmffwtcDm)){
		return false;
	}
	if(jmxzDm=="0015011724"){
		if(mj/1>90||gmffwtcDm!="11"){
			return false;
		}else{
			return true;
		}
	}else if(jmxzDm=="0015011725"){
		if(mj/1<=90||gmffwtcDm!="11"){
			return false;
		}else{
			return true;
		}
	}else if(jmxzDm=="0015011726"){
		if(mj/1>90||gmffwtcDm!="12"){
			return false;
		}else{
			return true;
		}
	}else if(jmxzDm=="0015011727"){
		if(mj/1<=90||gmffwtcDm!="12"){
			return false;
		}else{
			return true;
		}
	}
	return true;
}
//根据参数值获取税款所属期起止
//0按照申报日期获取，1按照合同签订时间获取减免性质，2税款所属期起止时间获取，3当前时间获取。默认按照申报日期获取契税减免性质。
function getCxsSkssqqz(csz,sbrq,htqdrq,skssqq,skssqz,dqrq){
	var skssqqz = [];//税款所属期起止
	var tempSkssqq=sbrq;
	var tempSkssqz=sbrq;
	if(csz=="0"){
		tempSkssqq=sbrq;
		tempSkssqz=sbrq;
	}
	else if(csz=="1"){
		tempSkssqq=htqdrq;
		tempSkssqz=htqdrq;
	}
	else if(csz=="2"){
		tempSkssqq=skssqq;
		tempSkssqz=skssqz;
	}
	else if(csz=="3"){
		tempSkssqq=dqrq;
		tempSkssqz=dqrq;
	}
	if(tempSkssqq.length>10){
		tempSkssqq=tempSkssqq.substr(0,10);
	}
	if(tempSkssqz.length>10){
		tempSkssqz=tempSkssqz.substr(0,10);
	}
	skssqqz[0]=tempSkssqq;
	skssqqz[1]=tempSkssqz;
	return skssqqz;
}

/**
 * @name    组装select字符串
 * @description 相关说明 
 * @time    创建时间:2016-3-29 下午03:04:21
 * @param dm 代码
 * @param mc 名称
 * @return select字符串
 * @author   作者 段敏
 * @history 修订历史（历次修订内容、修订人、修订时间等）
 */
function configSelStr(dm, mc) {
	return "code," + dm + "|caption," + mc;
}

/**
 * @name 判空
 * @description
 * @time    创建时间:2016-3-29 下午03:05:30
 * @param val 源值
 * @return true， false
 * @author   作者 段敏
 * @history 修订历史（历次修订内容、修订人、修订时间等）
 */
function isNull(val) {
	if (!$chk(val) || "" == val) {
		return true;
	}
	
	return false;
}
var flag = true;
function openSlpage(yzpzzlDm,hscjjg){
	var btn = new SwordSubmit();
	btn.setCtrl("SBGyCtrl_openSlPage");
	btn.pushData("yzpzzlDm",yzpzzlDm);
	btn.pushData("hscjjg",hscjjg);
	if(flag){
		flag=false;
		swordAlertIframe('', {
			titleName : "计算不含税价格",
			width : 560,
			height : 200,
			param : window,
			submit : btn,
			onClose:onclose
		});
	}
	
}
function onclose(){
	flag=true;
}
/**
 *  启用grid下面的name按钮 
 */
function controlGridConsoleByName(grid, name, flag) {
	grid.console().getElements('input[type=button][name="' + name + '"]').each(
			function(el) {
				grid.disableConsoleBtn(el, flag);
			});
}
/**
 * 判断千户集团是否资料报送的公用方法
 * @param req
 * @param resData
 * @return
 */
function qhSuccess(req,resData){
	var succesHdFun=resData.getAttr('succesHdFun');//需要继续报送的方法
	var errorHdFun=resData.getAttr('errorHdFun');//无需继续报送的方法
	var sfqhjt =resData.getAttr("sfqhjt");//是否是千户集团Y是千户集团，N不是千户集团
	var qycwbbjykgall =resData.getAttr("qycwbbjykgall");//所有企业都校验财务报表资料报送开关（20181029 辽宁吉林新电子税务局增加）
	var ningxiaQzjkKg = resData.getAttr("ningxiaQzjkKg");
	var yzpzzldm = resData.getAttr("yzpzzldm");
	if(ningxiaQzjkKg == 'Y' && yzpzzldm == 'BDA0610994'){
		var sfzlbs=resData.getAttr('sfzlbs');
		if(sfzlbs!='Y'){
			//没有资料报送的时候,强制不允许申报
			swordAlert("您还没有申报财务报表，请先申报财务报表，再进行年度申报。");
			var func=eval(errorHdFun);
		    new func(); 
		    return;
		}else{
			var func = eval(succesHdFun);
		    new func();//参数暂时定义为空吧。
		    return;
		}
	} 
	if(sfqhjt=='Y'){
		var sfzlbs=resData.getAttr('sfzlbs');
		if(sfzlbs!='Y'){
			//没有资料报送的时候  弹框提示，是否需要继续申报
			var message="当前企业属于千户集团企业，该纳税人未报送本属期的财务会计报表。请按期报送，逾期未报送的按《税收征收管理法》（以下简称征管法）有关规定进行处理。请确认是否继续申报？";
			//网报特色修改，增加系统参数，控制千户企业未进行资料报送，是否可以申报begin
			var qhqysbkg = resData.getAttr('qhqysbkg');
			if($chk(qhqysbkg) && qhqysbkg =="N"){
				var message1="当前企业属于千户集团企业，该纳税人未报送本属期的财务会计报表。请按期报送，逾期未报送的按《税收征收管理法》（以下简称征管法）有关规定进行处理，且报送完之后方可进行该报表申报！";
				swordAlert(message1);
				return;
			}
			//网报特色修改，增加系统参数，控制千户企业未进行资料报送，是否可以申报end
			swordConfirm(message, {onOk : function() {
					var func = eval(succesHdFun);
				    new func();// 参数暂时定义为空吧。
		    	    },
		    	   onCancel : function() {
		    		  var func=eval(errorHdFun);
		    		  new func();
		    	    }});
		}else{
			var func = eval(succesHdFun);
		    new func();//参数暂时定义为空吧。
		}
	}else{
		if(qycwbbjykgall == "Y"){
			var sfzlbs=resData.getAttr('sfzlbs');
			if(sfzlbs!='Y'){
				if(ningxiaQzjkKg=='Y'){//宁夏不监控月报---liuyao
					if(yzpzzldm == 'BDA0610994'){
						//没有资料报送的时候  弹框提示，是否需要继续申报
						var message="当前企业未报送本属期的财务会计报表。请按期报送，逾期未报送的按《税收征收管理法》（以下简称征管法）有关规定进行处理。请确认是否继续申报？";
						//网报特色修改，增加系统参数，控制千户企业未进行资料报送，是否可以申报begin
						var qhqysbkg = resData.getAttr('qhqysbkg');
						if($chk(qhqysbkg) && qhqysbkg =="N"){
							var message1="当前企业未报送本属期的财务会计报表。请按期报送，逾期未报送的按《税收征收管理法》（以下简称征管法）有关规定进行处理，且报送完之后方可进行该报表申报！";
							swordAlert(message1);
							return;
						}
						//网报特色修改，增加系统参数，控制千户企业未进行资料报送，是否可以申报end
						swordConfirm(message, {onOk : function() {
								var func = eval(succesHdFun);
							    new func();// 参数暂时定义为空吧。
					    	    },
					    	   onCancel : function() {
					    		  var func=eval(errorHdFun);
					    		  new func();
					    	    }});
					}else{
						var func = eval(succesHdFun);
					    new func();//参数暂时定义为空吧。
					}
					
				}else{
					//没有资料报送的时候  弹框提示，是否需要继续申报
					var message="当前企业未报送本属期的财务会计报表。请按期报送，逾期未报送的按《税收征收管理法》（以下简称征管法）有关规定进行处理。请确认是否继续申报？";
					//网报特色修改，增加系统参数，控制千户企业未进行资料报送，是否可以申报begin
					var qhqysbkg = resData.getAttr('qhqysbkg');
					if($chk(qhqysbkg) && qhqysbkg =="N"){
						var message1="当前企业未报送本属期的财务会计报表。请按期报送，逾期未报送的按《税收征收管理法》（以下简称征管法）有关规定进行处理，且报送完之后方可进行该报表申报！";
						swordAlert(message1);
						return;
					}
					//网报特色修改，增加系统参数，控制千户企业未进行资料报送，是否可以申报end
					swordConfirm(message, {onOk : function() {
							var func = eval(succesHdFun);
						    new func();// 参数暂时定义为空吧。
				    	    },
				    	   onCancel : function() {
				    		  var func=eval(errorHdFun);
				    		  new func();
				    	    }});
				}
				
			}else{
				var func = eval(succesHdFun);
			    new func();//参数暂时定义为空吧。
			}
		}else{
			var func = eval(succesHdFun);
		    new func();//参数暂时定义为空吧。
		}
	}
}


function openGssbxxFords(djxh,skssqq,skssqz){
	var btn = new SwordSubmit();
	btn.setCtrl("SBGyCtrl_queryGssbxx");
	btn.pushData("djxh",djxh);
	btn.pushData("skssqq",skssqq);
	btn.pushData("skssqz",skssqz);
	
	swordAlertIframe('', {
		titleName : "查询国税申报信息",
		width : 800,
		height : 500,
		param : window,
		submit : btn
		});
}
/**
 * 过滤出自然人可以选择的身份证件类型代码
 * @param selectDatas
 * @param inputDiv
 * @param selectObj
 * @return
 */
function dataFiltersfzzl(selectDatas,inputDiv,selectObj){
	if(!$chk(window.event)||!$chk(window.event.srcElement)){
		return selectDatas;
	}
	var newData = [];
	var zrrjjdjsfzjlx='201,202,203,204,208,210,213,219,220,221,227,233,291';
	selectDatas.each(function(item, index) {
		if (zrrjjdjsfzjlx.indexOf(item.SFZJLX_DM)!= -1) {
			newData[newData.length] = item; 
		}
		});
	return newData;
}
/**
 * 检查录入的所属期起止
 * @param skssqq
 * @param skssqq
 * @return
 */
function checkSkssqqz(skssqq,skssqz){
	var qDates = splitStr(skssqq);
	var zDates = splitStr(skssqz);
	if (qDates[0] != zDates[0]) {
		swordAlert("所属期起和所属期止必须在同一年！");
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
		swordAlert("所属期必须为整年、半年、季或一个月。");
		return false;
	}
    if(parseInt(qDates[1], 10) == parseInt(zDates[1], 10)){
	    if(parseInt(qDates[2], 10) != 1) {
			swordAlert("按月申报，所属期起必须为某月的第一天。");
			return false;
		  }
		 if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2],
				10)) {
			swordAlert("按月申报，所属期止必须为某月的最后一天。");
			return false;
		 }
		 return true; 
	}
	//按季申报
	if(((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 3)
			|| (parseInt(qDates[1], 10) == 4 && parseInt(zDates[1], 10) == 6)
			|| (parseInt(qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 9) || (parseInt(
			qDates[1], 10) == 10 && parseInt(zDates[1], 10) == 12))){
		if (parseInt(qDates[2], 10) != 1) {
			swordAlert("按季申报，所属期起必须为季初。");
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2], 10)) {
			swordAlert("按季申报，所属期止必须为为季末。");
			return false;
		}
		return true;
	}
	//按半年申报
	if((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 6) || (parseInt(
			qDates[1], 10) == 7 && parseInt(zDates[1], 10) == 12)){
		if (!(parseInt(qDates[2], 10) == 1)) {
			swordAlert("按半年申报，所属期起必须为某半年的第一天。");
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2], 10)) {
			swordAlert("按半年申报，所属期起必须为某半年的最后一天。");
			return false;
		}
		return true;
	}
	//按年申报
	if((parseInt(qDates[1], 10) == 1 && parseInt(zDates[1], 10) == 12)){
		if (parseInt(qDates[2], 10) != 1) {
			swordAlert("按年申报，所属期起必须为年初。");
			return false;
		}
		if (monthDay(zDates[0], parseInt(zDates[1], 10)) != parseInt(zDates[2], 10)) {
			swordAlert("按年申报，所属期止必须为年末。");
			return false;
		}
		return true;
	}
}
/**
 * 导航式跳转征收开票
 * @param pzxh
 * @param ybtse
 * @param djxh
 * @param resData
 * @return
 */
function fromYbSBJumpZskpDh(pzxh, ybtse, djxh, resData) {
	var djsk=resData.getAttr("djsk");
	var msg="";
	//申报错误更正产生多缴税款 广西国税需求 不要动 begin
	if(djsk=="Y"){
		msg="申报错误更正产生多缴税款,请到办税大厅窗口办理多缴税费抵缴手续。</br>";
	}
	$_saveResData = resData;
	gt3_zskp_djxh = djxh;
	gt3_zskp_pzxh = pzxh;
	ybtse = ybtse.round(2);
	try {
		gt3_zskp_tzfs = resData.getAttr("tzfs");
	} catch (e) {
		gt3_zskp_tzfs = '';
	}
	if (ybtse < 0) {
		swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元,请进行退抵税审批。");
		return;
	} else if (ybtse >= 0 && ybtse <= 1) {
		swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元，无需进行网上扣款。");
		return;
	}
	swordConfirm(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
			+ " 元。是否需要调用网上扣款？", {
		okBtnName : "是",
		cancelBtnName : "否",
		onOk : function() {
			var insertdata = [{
						tds : {
							yzpzxh : {
								value : gt3_zskp_pzxh
							}
						}
					}];
			var yzpzxhList = {
				'sword' : 'SwordGrid',
				'name' : 'yzpzxhList',
				'trs' : insertdata
			};

			// 获取一般申报跳转征收开票后回跳一般申报用例页面参数变量
			var locationForKpStr = "";
			var locationForKp = pc.getResData("locationForKp", resData);
			if (locationForKp != undefined && locationForKp != null
					&& locationForKp != "") {
				locationForKpStr = locationForKp.value;
			}

			var zskpBtn = new SwordSubmit();
			zskpBtn.pushData(yzpzxhList);
			zskpBtn.pushData('djxh', gt3_zskp_djxh);
			zskpBtn.pushData('locationForKpStr', locationForKpStr);
			zskpBtn.options.postType = "form";
			zskpBtn.setCtrl("ZS040YbzskpCtrl_initViewBysbdh");
			//swordOpenWin('/sword?ctrl=' + gt3.ctrl + '_print&r=' + Math.random(), zskpBtn);
			//swordOpenWin('', zskpBtn);
			zskpBtn.submit();

//			if (gt3_zskp_tzfs == 'newTab') {
//				var tmpObj = parent.$w("tab1").tabItems.get("zskp.jsp");
//				if ($chk(tmpObj)) {
//					parent.$w('tab1').removeTabItem("zskp.jsp");
//				}
//				parent.$w('tab1').addTabItem({
//							id : "zskp.jsp",
//							title : "《网上扣款》",
//							tabContentType : 'iframe',
//							submit : zskpBtn,
//							isCloseBtn : 'true'
//						});
//				// 关闭小叉叉的问题
//				parent.$$(".tab_box ul li").each(function(el, i) {
//							el.setStyle("width", "150px");
//						});
//				parent.setTabSpanWidth();
//				parent.$w('tab1').scrollRight();
//				return;
//			}
//			zskpBtn.submit();
		},
		onCancel : notJumpZskp
	});
}
/**
 * 导航式跳转征收开票
 * @param pzxh
 * @param ybtse
 * @param djxh
 * @param resData
 * @return
 */
function fromYbSBJumpZskpDh_ys(pzxh, ybtse, djxh, resData,skssqq,skssqz) {
	var djsk=resData.getAttr("djsk");
	var msg="";
	//申报错误更正产生多缴税款 广西国税需求 不要动 begin
	if(djsk=="Y"){
		msg="申报错误更正产生多缴税款,请到办税大厅窗口办理多缴税费抵缴手续。</br>";
	}
	$_saveResData = resData;
	gt3_zskp_djxh = djxh;
	gt3_zskp_pzxh = pzxh;
	ybtse = ybtse.round(2);
	try {
		gt3_zskp_tzfs = resData.getAttr("tzfs");
	} catch (e) {
		gt3_zskp_tzfs = '';
	}
	if (ybtse < 0) {
		swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元,请进行退抵税审批。");
		return;
	} else if (ybtse >= 0 && ybtse <= 1) {
		swordAlertRight(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
				+ " 元，无需进行网上扣款。");
		return;
	}
	swordConfirm(msg+"申报成功，当前纳税人申报凭证序号为： " + pzxh + " ,应缴纳税款为：" + ybtse
			+ " 元。是否需要调用网上扣款？", {
		okBtnName : "是",
		cancelBtnName : "否",
		onOk : function() {
			var insertdata = [{
						tds : {
							yzpzxh : {
								value : gt3_zskp_pzxh
							}
						}
					}];
			var yzpzxhList = {
				'sword' : 'SwordGrid',
				'name' : 'yzpzxhList',
				'trs' : insertdata
			};

			// 获取一般申报跳转征收开票后回跳一般申报用例页面参数变量
			var locationForKpStr = "";
			var locationForKp = pc.getResData("locationForKp", resData);
			if (locationForKp != undefined && locationForKp != null
					&& locationForKp != "") {
				locationForKpStr = locationForKp.value;
			}

			var zskpBtn = new SwordSubmit();
			zskpBtn.pushData(yzpzxhList);
			zskpBtn.pushData('djxh', gt3_zskp_djxh);
			zskpBtn.pushData('skssqq', skssqq);
			zskpBtn.pushData('skssqz', skssqz);
			zskpBtn.pushData('ybtse', ybtse);
			zskpBtn.pushData('locationForKpStr', locationForKpStr);
			zskpBtn.options.postType = "form";
			zskpBtn.setCtrl("ZS0401YbzskpCtrl_initView");
			//swordOpenWin('/sword?ctrl=' + gt3.ctrl + '_print&r=' + Math.random(), zskpBtn);
			//swordOpenWin('', zskpBtn);
			zskpBtn.submit();

//			if (gt3_zskp_tzfs == 'newTab') {
//				var tmpObj = parent.$w("tab1").tabItems.get("zskp.jsp");
//				if ($chk(tmpObj)) {
//					parent.$w('tab1').removeTabItem("zskp.jsp");
//				}
//				parent.$w('tab1').addTabItem({
//							id : "zskp.jsp",
//							title : "《网上扣款》",
//							tabContentType : 'iframe',
//							submit : zskpBtn,
//							isCloseBtn : 'true'
//						});
//				// 关闭小叉叉的问题
//				parent.$$(".tab_box ul li").each(function(el, i) {
//							el.setStyle("width", "150px");
//						});
//				parent.setTabSpanWidth();
//				parent.$w('tab1').scrollRight();
//				return;
//			}
//			zskpBtn.submit();
		},
		onCancel : notJumpZskp
	});
}
function querySblsxx(djxh,skssqq,skssqz,zxbztzsuuid){
	var saveBtn = new SwordSubmit();
	saveBtn.setCtrl("SBGyCtrl_querySblsxx");
	saveBtn.setFunction('onSuccess', 'querySblsSuccess');
	saveBtn.pushData("djxh", djxh);
	saveBtn.pushData("skssqq", skssqq);
	saveBtn.pushData("skssqz", skssqz);
	saveBtn.pushData('zxbztzsuuid', zxbztzsuuid);
	saveBtn.submit();
}

//查询申报流水信息成功处理方法
function querySblsSuccess(req, resData){
	var dzswjSbLszxxGrid = pc.getResData("dzswjSbLszxxGrid", resData);
	var len = dzswjSbLszxxGrid.trs.length;
	if (len > 0) {
		swordConfirm('该属期申报数据已经暂存，是否带出修改？', {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				if (len > 1) {
					// 跳转子页面
					swordAlertIframe('/sb/gy/sbls.jsp',
							{
								titleName : "申报流水查询",
								width : 800,
								height : 400,
								isNormal : 'true',
								isMax : 'true',
								isClose : 'true',
								isMin : "true",
								param : dzswjSbLszxxGrid
								
							});
				} else {
					for (var i = 0; i < dzswjSbLszxxGrid.trs.length; i++) {
						sblsuuid = dzswjSbLszxxGrid.trs[i].tds.sblsuuid.value;
						jumpToTbsbb();
					}
				}

			},
			onCancel : function() {
				jumpToTbsbb();
			}
		});
	}else{
		jumpToTbsbb();
	}

}
/**
 * @name 判空
 * @description
 * @time    创建时间:2016-3-29 下午03:05:30
 * @param val 源值
 * @return true， false
 * @author   作者 段敏
 * @history 修订历史（历次修订内容、修订人、修订时间等）
 */
function isNull(val) {
	if (!$chk(val) || "" == val) {
		return true;
	}
	
	return false;
}

/************************************校验油气田附表*****************************/
function jyyqtfb(){
	if ($chk($("yqtfb_iframe")) && $chk($("yqtfb_iframe").contentWindow)){
		var yqtfpGrid;
		try{
			yqtfpGrid = $("yqtfb_iframe").contentWindow.$w("yqtfpGrid").getAllNoDeleteGridData();
		}catch(e){
			return false;
		}
		var dfpGrid = $("yqtfb_iframe").contentWindow.$w("dfpGrid").getAllGridData();
		if($chk(yqtfpGrid)&&$chk(yqtfpGrid.trs)){
			if(!($("yqtfb_iframe").contentWindow.$w("yqtfpGrid").validate())){
				return true;
			}
			var map = {}; 
			//TODO 校验数据是否正确
			for(var i=0;i<yqtfpGrid.trs.length;i++){
				var zspmDm = yqtfpGrid.trs[i].tds.zspmDm.value;
				var ybtsein = yqtfpGrid.trs[i].tds.ybtse.value;
				
				var ybtse = map[zspmDm];
				if(!$chk(ybtse)||ybtse==0){
					map[zspmDm] = ybtsein;
				}else{
					map[zspmDm] = (parseFloat(map[zspmDm],10)).accAdd(parseFloat(ybtsein,10));//  网报
				}

			}

			for (var key in map) { 
				var ybtsehj = map[key];
				var bqybtsehj = 0.0;
				for(var j=0;j<dfpGrid.trs.length;j++){
					var zspmDm_ = dfpGrid.trs[j].tds.zspmDm.value;
					if(zspmDm_==key){
						var bqybtse =  dfpGrid.trs[j].tds.bqybtse.value;
						bqybtsehj = (parseFloat(bqybtsehj,10)).accAdd(parseFloat(bqybtse,10)); //  网报
					}
				}
				if(ybtsehj.round(2)!=bqybtsehj.round(2)){
					return true;
				}
			}  
			
			return false; 
		}else{
			return false;
		}
	}else{
		return false;
	}
}

// 网报调整，校验分配比例是否合计为1
function jyyqtfbFpblHj(){
	if ($chk($("yqtfb_iframe")) && $chk($("yqtfb_iframe").contentWindow)){
		var yqtfpGrid;
		try{
			yqtfpGrid = $("yqtfb_iframe").contentWindow.$w("yqtfpGrid").getAllNoDeleteGridData();
		}catch(e){
			return false;
		}
		var dfpGrid = $("yqtfb_iframe").contentWindow.$w("dfpGrid").getAllGridData();
		if($chk(yqtfpGrid)&&$chk(yqtfpGrid.trs)){
			if(!($("yqtfb_iframe").contentWindow.$w("yqtfpGrid").validate())){
				return true;
			}
			var mapfpbl = {}; // 网报增加逻辑，校验同品目比例为1%
			//TODO 校验数据是否正确
			for(var i=0;i<yqtfpGrid.trs.length;i++){
				var zspmDm = yqtfpGrid.trs[i].tds.zspmDm.value;
				var fpblin = yqtfpGrid.trs[i].tds.fpbl.value/1; // 网报逻辑校验比例
				var fpbl = mapfpbl[zspmDm];
				if(!$chk(fpbl)||fpbl==0){
					mapfpbl[zspmDm] = fpblin;
				}else{
					mapfpbl[zspmDm] = (parseFloat(mapfpbl[zspmDm],10)).accAdd(parseFloat(fpblin,10));//  网报
				}
			}
			
			for (var key in mapfpbl) { 
				var fpblhj = mapfpbl[key];
				if(fpblhj>1 || fpblhj<1){
					//swordAlert("油气田企业税款分配表中品目"+key+"已分配比例之和不等于1,请修改");
					return true;
				}
			}
			return false;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

/************************************校验油气田附表*****************************/
/**
 * 印花稅計算應補退
 */
function jsyhsje(zspmDm,je){
	var jsje=je;
	if (zspmDm == "101110105") {
		if (jsje < 1 && jsje >= 0.1) {
			jsje = 1;
		} else if (jsje < 0.1 && jsje > 0){
			jsje = 0;
		}
		else {
			jsje = jsje.round(1);				
		}
	} else {
		if(jsje<0.1&& jsje > 0){
			jsje=0;
		}
					
	}
	jsje = jsje.round(1);	
	return jsje;
}


function zlbstydy(){
	LODOP = getLodop($( 'LODOP_X'), $('LODOP_EM' ));
	var num = document.frames.length;
	for( var i=0;i<=num;i++){
		var tab = "table0";
		if(i>9){
			tab = "table";
		}
		var dis = document.getElementById( tab+i).style.display;
		if(!$chk(dis)||dis!="none" ){
			var inhtml = "";
			if(0==i){
				inhtml = document.getElementById(tab +i).innerHTML;
			} else{
				inhtml = document.getElementById(tab +i+"iframe"). contentWindow.document.body.innerHTML;
			}
			//防止取值错误
			inhtml = inhtml.replace(new RegExp(/(defValue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(oValue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(ovalue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(returnRealValue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(defaultValue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(widgetgetvalue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(realvalue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(showvalue)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(\;\>)/g),'#');
			inhtml = inhtml.replace(new RegExp(/(TEXTAREA)/g),'DIV');
			//将grid内部标签转换成table形式进行处理
			var inTable = 0;//table标识
			var inTR = 0;//tr标识
			var inTD = 0;//td标识
			var tableTag = false;
			//遍历html中所有标签
			while(inhtml.indexOf("<")>=0){
				var oldc = inhtml.substring(inhtml.indexOf("<"), inhtml.indexOf(">")+1);
				if(oldc.indexOf("tb_mini_box")>=0){//不显示toolbar
					inhtml = inhtml.replace("tb_mini_box", "tb_mini_box style='DISPLAY: none'");
					inhtml = inhtml.replace("<", "∪");
					inhtml = inhtml.replace(">", "∩");
					continue;
				}
				//标签内只有单个内容不
				 if(oldc.indexOf(" ")<0){
					if(inTable>0){
						if(oldc.indexOf("</TABLE>")>=0||oldc.indexOf("<TBODY>")>=0||oldc.indexOf("</TBODY>")>=0){
							inhtml = inhtml.replace(oldc, "");
							continue;
						}
						if(oldc.indexOf("<COLGROUP>")>=0||oldc.indexOf("</COLGROUP>")>=0||oldc.indexOf("<TR>")>=0||oldc.indexOf("</TR>")>=0
								||oldc.indexOf("<TH>")>=0||oldc.indexOf("</TH>")>=0||oldc.indexOf("</COL>")>=0){
							inhtml = inhtml.replace("<", "∪");
							inhtml = inhtml.replace(">", "∩");
							continue;
						}
					}
					//grid内部处理结束标签，
					if(oldc.indexOf("</")>=0){
						if(inTable>0){
							if(inTR>0){
								if(inTD>0){
									inTD--;
									if(inTD==0){
										inhtml = inhtml.replace(oldc, "∪/DIV∩</TD>");
									}
								}else{
									inTR--;
									if(inTR==0){
										inhtml = inhtml.replace(oldc, "</TR>");
									}
								}
							}else{
								inTable--;
								if(tableTag){
									inhtml = inhtml.replace(oldc, "∪TABLE∩");
									tableTag = false;
								}else{
									//删除DIV标签
									inhtml = inhtml.replace(oldc, "");
									if(inTable==0){
										inhtml = inhtml.replace(oldc, "</TABLE>");
									}
								}
								continue;
							}
						}
					}
					inhtml = inhtml.replace("<", "∪");
					inhtml = inhtml.replace(">", "∩");
				}else{
					//替换字符串
					var retain = oldc.substring(0,oldc.indexOf(" ")) + ">";	
					//<TH、<COL标签不加入计算
					if(inTable>0&&oldc.indexOf("<TH ")<0&&oldc.indexOf("<COL ")<0){
						//消除独立标签，消除内部<TABLE>标签
						if((oldc.indexOf("<TABLE")>=0&&oldc.indexOf("id=xxGrid_id")>=0)||oldc.indexOf("<INPUT ")>=0){
							inhtml = inhtml.replace(oldc, "");
							continue;
						}
						//grid中插入<TABLE>标签的位置
						if(oldc.indexOf("class=swordgird_panel_header_caption")>=0){
							tableTag = true;
						}
						if(inTR>0){
							if(inTD>0){
								inTD++;
							}else{
								if(oldc.indexOf("class=sGrid_header_item_div")>=0||oldc.indexOf("class=\"sGrid_data_row_item_div")>=0
										||oldc.indexOf("class=sGrid_hj_row_item_div")>=0||oldc.indexOf("class=page_left")>=0
										){
									retain = "<TD>∪DIV∩";
									inTD++;
								}else{
									inTR++;
								}
							}
						}else{
							if(oldc.indexOf("class=sGrid_header_div")>=0||oldc.indexOf("class=\"sGrid_data_row_div")>=0||
									oldc.indexOf("sGrid_hj_row_div")>=0||oldc.indexOf("class=sGrid_console_div")>=0){
								retain = "<TR>";
								inTR++;
							}else{
								//Table标签内，tr标签外，所有标签删除
								inhtml = inhtml.replace(oldc, "");
								inTable++;
								continue;
							}
						}
					}
					if(oldc.indexOf("sword=\"SwordGrid\"")>=0){
						inTable ++;
						inhtml = inhtml.replace(oldc, "");
						continue;
					}
					if(oldc.indexOf("DISPLAY: none")>=0&&inTable<=0){
						inhtml = inhtml.replace("<", "∪");
						inhtml = inhtml.replace(">", "∩");
						continue;
					}	
					//获取保留值
					var flag = false; 
					if(oldc.indexOf("<INPUT")>=0&&oldc.indexOf("value")>=0){
						var value = "";
						var array = oldc.split(" ");
						for(var i=0;i<array.length;i++){
							var single = array[i];
							//存在colspan、rowspan的标签
							if(single.indexOf("value")>=0){
								value = single.substring(6,single.lenght);
								inhtml = inhtml.replace(oldc, value);
								flag = true;
								break;
							}
						}
					}
					if(flag){//跳出循环嵌套
						continue;
					}
					//单元格格式保留
					if(oldc.indexOf("colSpan")>=0||oldc.indexOf("rowSpan")>=0){
						var colspan = "";
						var rowspan = "";
						var array = oldc.split(" ");
						for(var i=0;i<array.length;i++){
							var single = array[i];
							//存在colspan、rowspan的标签
							if(single.indexOf("colSpan")>=0){
								colspan = single.replace(">","");
							}else if(single.indexOf("rowSpan")>=0){
								rowspan = single.replace(">","");
							}
							retain = oldc.substring(0,oldc.indexOf(" ")+1 ) + colspan +" "+ rowspan +">" ;
						}
					}
					inhtml = inhtml.replace(oldc, retain);
					inhtml = inhtml.replace("<", "∪");
					inhtml = inhtml.replace(">", "∩");
				}
			}
			inhtml = inhtml.replace(new RegExp(/(∪)/g),'<');
			inhtml = inhtml.replace(new RegExp(/(∩)/g),'>');
			inhtml = inhtml.replace(new RegExp(/(\*)/g),'');
			inhtml = inhtml.replace(new RegExp(/(null)/g),'');
			inhtml = inhtml.replace(new RegExp(/(<INPUT>)/g),'');
			inhtml = inhtml.replace(new RegExp(/(<DIV><\/DIV>)/g),'');
			inhtml = inhtml.replace(new RegExp(/(<SPAN><\/SPAN>)/g),'');
			inhtml = inhtml.replace(new RegExp(/(<DIV><lable>)/g),'');
			inhtml = inhtml.replace(new RegExp(/(<\/lable><lable>)/g),'');
			inhtml = inhtml.replace(new RegExp(/(<\/lable><\/DIV>)/g),'');
			var strStyleCSS="<link href='../../sb/sb000/zlbs.css' type='text/css' rel='stylesheet'>";
			LODOP.PRINT_INIT( "表单打印" );
			LODOP.ADD_PRINT_HTM( "1%", "0" , "100%" , "98%", strStyleCSS+inhtml);
			LODOP.PREVIEW(); //打印预览
			break;
		}
	}
}
function getClassName(obj,sName)      //-->obj是要获取元素的父级
{                                     //-->sName是class名字
    if(document.getElementsByClassName) 
    {
        return obj.getElementsByClassName('sName');
    }
    else
    {      
        var aTmp = obj.getElementsByTagName('*');
        var aRes=[];
        var arr =[];
 
        for(var i=0;i<aTmp.length;i++)
        {  
            arr = aTmp[i].className.split(' ');
            for (var j=0;j<arr.length;j++)
            {
                if(arr[j] == sName)
                {
                    aRes.push(aTmp[i]);
                }
            }
        }
        return aRes;
    }
}
function replacetag(inhtml,bigintag,endtag,endnum){
	var ht = "";
	var cpht = inhtml.substring(inhtml.indexOf(bigintag)+bigintag.length, inhtml.indexOf(endtag));
	var lis = cpht.split(bigintag);
	endnum = endnum +1;
	if(lis.length==endnum){
		//匹配退出
		cpht = inhtml.substring(inhtml.indexOf(bigintag), inhtml.indexOf(endtag)+endtag.length);
		inhtml = inhtml.replace(cpht,""); 
	}else{
		inhtml = inhtml.replace(endtag,"");
		inhtml = replacetag(inhtml,bigintag,endtag,endnum);
	}
	return inhtml;
}

function replacegridtag(inhtml,bigintag,endtag,endnum){
	var ht = "";
	var cpht = inhtml.substring(inhtml.indexOf(bigintag)+bigintag.length, inhtml.indexOf(endtag));
	var lis = cpht.split(bigintag);
	endnum = endnum +1;
	if(lis.length==endnum){
		//匹配退出
		return inhtml;
	}else{
		var rpendtag = endtag.replace(new RegExp(/(<)/g),'∪');
		rpendtag = rpendtag.replace(new RegExp(/(>)/g),'∩');
		inhtml = inhtml.replace(endtag,rpendtag);
		inhtml = replacegridtag(inhtml,bigintag,endtag,endnum);
	}
	return inhtml;
}


/************************************资料报送**************************/

/************************************资料报送**************************/
var zlbsNsrxxMap = null;
var tablesgy = new Hash();
function zlbstofb(name,zlbsxlDm,nsrxxMap){
	$w('zzsybnsrsb').setDisabled('save');
	zlbsNsrxxMap = nsrxxMap;
    var table_name = "table" + name;
    var iframe_name = table_name + "iframe";
    
    var isopen = tablesgy.get(table_name);
    if(!$chk(isopen)){
    	var iframe = $(iframe_name);        	    
        iframe.src = AddBizCode2URL("/sword?ctrl=SBGyCtrl_toCwbbSbfb&id=" + name+"&zlbsxlDm="+zlbsxlDm);;
        tablesgy.set(table_name,true);
    }else{
    	if(!isopen){
    		 var iframe = $(iframe_name);        	    
             iframe.src = AddBizCode2URL("/sword?ctrl=SBGyCtrl_toCwbbSbfb&id=" + name+"zlbsxlDm="+zlbsxlDm);;
             tablesgy.set(table_name,true) ;
    	}
    }
    if(name!='00'){
    	var id = "table00";
    	$("table00").setStyle('display', 'none');
    }
    var iframes = document.getElementsByTagName('iframe');
    for(var num = 0; num<iframes.length;num++){
    	var ifram = iframes[num];
    	var iframid = ifram.id;
    	var tableid = iframid.substring(0,iframid.indexOf("iframe"));
    	if($chk(tableid)){
    		if(tableid==table_name){
        		$(tableid).setStyle('display', '');
        	}else{
        		$(tableid).setStyle('display', 'none');
        	}
    	}
    }
}

function displayIfram(){
	$("table00").setStyle('display', 'none');
	var iframes = document.getElementsByTagName('iframe');
	for(var num = 0; num<iframes.length;num++){
		var ifram = iframes[num];
		var iframid = ifram.id;
		var tableid = iframid.substring(0,iframid.indexOf("iframe"));
		if($chk(tableid)){
			$(tableid).setStyle('display', 'none');
		}
	}
}

function SbHash(){
	this.obj = new Hash();
	this.get = function(key){
		return this.obj.get(key);
	};
	this.set = function(key, value){
		this.obj.set(key, JSON.decode(JSON.encode(value)));
	};
	this.each = function(func){
		this.obj.each(func);
	};
	
}

var zlbsfbsaveData = new SbHash();
//保存校验
function fbsaveCheck(mesg){
	
	var btn = new SwordSubmit();
	btn.pushData("zlbsxlDm",zlbsxlDm);
	btn.setCtrl("SBGyCtrl_getbsfbxx");
	var res = btn.submit();
	var bsList = pc.getResData("bsList",res);
	for(var num=0;num<bsList.trs.length;num++){
		var tr = bsList.trs[num];
		var flag = false;
		var bszlmc=tr.tds.bszlmc.value;
		zlbsfbsaveData.each(function (v,k){
			if(k==bszlmc){
				if(v!=null&&v!=undefined&&v!=""){
					flag = true;
				}
			}
		});
		if(!flag){
			mesg = mesg+bszlmc+"、";
		}
	}
	return mesg;
}

function zlbssavePushdata(btn){
	zlbsfbsaveData.each(function (v,k){
		btn.pushData(v);
	});
	return btn;
}

function setCfcjData(resData){
	var ndcwkjbgshbgForm=pc.getResData("ndcwkjbgshbgForm" , resData);
	if(ndcwkjbgshbgForm)zlbsfbsaveData.set( "年度财务会计报告审计报告" ,ndcwkjbgshbgForm);
	var fyazxzfldbcclGrid=pc.getResData("fyazxzfldbcclGrid" , resData);
	if($chk(fyazxzfldbcclGrid)){
		fyazxzfldbcclGrid.trs = [].concat(fyazxzfldbcclGrid.trs);
	}
	if(fyazxzfldbcclGrid)zlbsfbsaveData.set( "费用按照性质分类的补充资料" ,JSON.decode(JSON.encode(fyazxzfldbcclGrid)));
	var qykjzzfzForm=pc.getResData("qykjzzfzForm" , resData);
	if(qykjzzfzForm)zlbsfbsaveData.set( "企业会计准则附注" ,qykjzzfzForm);
	var xqykjzzfzForm=pc.getResData("xqykjzzfzForm" , resData);
	if(xqykjzzfzForm)zlbsfbsaveData.set( "小企业会计准则附注" ,xqykjzzfzForm);
	var qykjzdfzForm=pc.getResData("qykjzdfzForm" , resData);
	if(qykjzdfzForm)zlbsfbsaveData.set( "企业会计制度附注" ,qykjzdfzForm);
	var yszkdplForm=pc.getResData("yszkdplForm" , resData);
	if(yszkdplForm)zlbsfbsaveData.set( "应收账款的披露（适用执行企业会计制度的企业）" ,yszkdplForm);
	var chdplGrid=pc.getResData("chdplGrid" , resData);
	if($chk(chdplGrid)){
		chdplGrid.trs = [].concat(chdplGrid.trs);
	}
	if(chdplGrid)zlbsfbsaveData.set( "存货的披露（适用执行企业会计制度的企业）" ,JSON.decode(JSON.encode(chdplGrid)));
	var cqtzdplForm=pc.getResData("cqtzdplForm" , resData);
	if(cqtzdplForm)zlbsfbsaveData.set( "长期投资的披露（适用执行企业会计制度的企业）" ,cqtzdplForm);
	var dqtzdplForm=pc.getResData("dqtzdplForm" , resData);
	if(dqtzdplForm)zlbsfbsaveData.set( "短期投资的披露（适用执行企业会计制度的企业）" ,dqtzdplForm);
	var qtsygxmjsdshzrsyqkGrid1=pc.getResData("qtsygxmjsdshzrsyqkGrid1" , resData);
	if($chk(qtsygxmjsdshzrsyqkGrid1)){
		qtsygxmjsdshzrsyqkGrid1.trs = [].concat(qtsygxmjsdshzrsyqkGrid1.trs);
	}
		zlbsfbsaveData.set( "其他综合收益各项目及其所得税影响和转入损益情况1" ,JSON.decode(JSON.encode(qtsygxmjsdshzrsyqkGrid1)));
		zlbsfbsaveData.set( "其他综合收益各项目及其所得税影响和转入损益情况" ,"1");
	var qtsygxmjsdshzrsyqkGrid2=pc.getResData("qtsygxmjsdshzrsyqkGrid2" , resData);
	if($chk(qtsygxmjsdshzrsyqkGrid2)){
		qtsygxmjsdshzrsyqkGrid2.trs = [].concat(qtsygxmjsdshzrsyqkGrid2.trs);
	}
		zlbsfbsaveData.set( "其他综合收益各项目及其所得税影响和转入损益情况2" ,JSON.decode(JSON.encode(qtsygxmjsdshzrsyqkGrid2)));
		zlbsfbsaveData.set( "其他综合收益各项目及其所得税影响和转入损益情况" ,"1");
	var qtsygxmjsdshzrsyqkGrid3=pc.getResData("qtsygxmjsdshzrsyqkGrid3" , resData);
	if($chk(qtsygxmjsdshzrsyqkGrid3)){
		qtsygxmjsdshzrsyqkGrid3.trs = [].concat(qtsygxmjsdshzrsyqkGrid3.trs);
	}
		zlbsfbsaveData.set( "其他综合收益各项目及其所得税影响和转入损益情况3" ,JSON.decode(JSON.encode(qtsygxmjsdshzrsyqkGrid3)));
		zlbsfbsaveData.set( "其他综合收益各项目及其所得税影响和转入损益情况" ,"1");
	//zlbsfbsaveData.set( "其他综合收益各项目及其所得税影响和转入损益情况" ,"1");
	var qtzhsygxmdtjqkForm=pc.getResData("qtzhsygxmdtjqkForm" , resData);
	if(qtzhsygxmdtjqkForm)zlbsfbsaveData.set( "其他综合收益各项目的调节情况" ,qtzhsygxmdtjqkForm);
	var cqgptzdplGrid=pc.getResData("cqgptzdplGrid" , resData);
	if($chk(cqgptzdplGrid)){
		cqgptzdplGrid.trs = [].concat(cqgptzdplGrid.trs);
	}
	if(cqgptzdplGrid)zlbsfbsaveData.set( "长期股票投资的披露（适用执行企业会计制度的企业）" ,JSON.decode(JSON.encode(cqgptzdplGrid)));	
	var cqzqtzdplGrid=pc.getResData("cqzqtzdplGrid" , resData);
	if($chk(cqzqtzdplGrid)){
		cqzqtzdplGrid.trs = [].concat(cqzqtzdplGrid.trs);
	}
	if(cqzqtzdplGrid)zlbsfbsaveData.set( "长期债券投资的披露（适用执行企业会计制度的企业）" ,JSON.decode(JSON.encode(cqzqtzdplGrid)));
	var wxzcdplGrid=pc.getResData("wxzcdplGrid" , resData);
	if($chk(wxzcdplGrid)){
		wxzcdplGrid.trs = [].concat(wxzcdplGrid.trs);
	}
	if(wxzcdplGrid)zlbsfbsaveData.set( "无形资产的披露（适用执行企业会计制度的企业）" ,JSON.decode(JSON.encode(wxzcdplGrid)));
	var cqdtfydplGrid=pc.getResData("cqdtfydplGrid" , resData);
	if($chk(cqdtfydplGrid)){
		cqdtfydplGrid.trs = [].concat(cqdtfydplGrid.trs);
	}
	if(cqdtfydplGrid)zlbsfbsaveData.set( "长期待摊费用的披露（适用执行企业会计制度的企业）" ,JSON.decode(JSON.encode(cqdtfydplGrid)));
	var gdzcdplGrid1=pc.getResData("gdzcdplGrid1" , resData);
    //导入时grid时数据对象被释放，重新构建数组对象
	if($chk(gdzcdplGrid1)){
		gdzcdplGrid1.trs = [].concat(gdzcdplGrid1.trs);
	}
	if(gdzcdplGrid1){
		zlbsfbsaveData.set( "固定资产的披露（适用执行企业会计制度的企业）1" ,JSON.decode(JSON.encode(gdzcdplGrid1)));
		zlbsfbsaveData.set( "固定资产的披露（适用执行企业会计制度的企业）" ,"a");
	}
	var gdzcdplGrid2=pc.getResData("gdzcdplGrid2" , resData);
    //导入时grid时数据对象被释放，重新构建数组对象
    if($chk(gdzcdplGrid2)){
        gdzcdplGrid2.trs = [].concat(gdzcdplGrid2.trs);
    }
	if(gdzcdplGrid2){
		zlbsfbsaveData.set( "固定资产的披露（适用执行企业会计制度的企业）2" ,JSON.decode(JSON.encode(gdzcdplGrid2)));
		zlbsfbsaveData.set( "固定资产的披露（适用执行企业会计制度的企业）" ,"a");
	}
	var gdzcdplGrid3=pc.getResData("gdzcdplGrid3" , resData);
    //导入时grid时数据对象被释放，重新构建数组对象
    if($chk(gdzcdplGrid3)){
        gdzcdplGrid3.trs = [].concat(gdzcdplGrid3.trs)
    }
	if(gdzcdplGrid3){
		zlbsfbsaveData.set( "固定资产的披露（适用执行企业会计制度的企业）3" ,JSON.decode(JSON.encode(gdzcdplGrid3)));
		zlbsfbsaveData.set( "固定资产的披露（适用执行企业会计制度的企业）" ,"a");
	}
	var yfzcfzzhzbGrid=JSON.decode(JSON.encode(pc.getResData("yfzcfzzhzbGrid" , resData)));
	//导入时grid时数据对象被释放，重新构建数组对象
	if($chk(yfzcfzzhzbGrid)){
		yfzcfzzhzbGrid.trs = [].concat(yfzcfzzhzbGrid.trs);
	}
	if(yfzcfzzhzbGrid){
		zlbsfbsaveData.set( "“研发支出”辅助账汇总表2" ,JSON.decode(JSON.encode(yfzcfzzhzbGrid)));
		zlbsfbsaveData.set( "“研发支出”辅助账汇总表" ,"a");
	}
	var yfzcfzzhzbForm=JSON.decode(JSON.encode(pc.getResData("yfzcfzzhzbForm" , resData)));
	if(yfzcfzzhzbForm){
		zlbsfbsaveData.set( "“研发支出”辅助账汇总表1" ,yfzcfzzhzbForm);
		zlbsfbsaveData.set( "“研发支出”辅助账汇总表" ,"a");
	}
	var yszkazljgplForm=pc.getResData("yszkazljgplForm" , resData);
	if(yszkazljgplForm)zlbsfbsaveData.set( "应收账款按账龄结构披露" ,yszkazljgplForm);
	var sydwkjzdfzForm=pc.getResData("sydwkjzdfzForm" , resData);
	if(sydwkjzdfzForm)zlbsfbsaveData.set( "事业单位会计制度附注" ,sydwkjzdfzForm);
	var zxxxkjzdfzForm=pc.getResData("zxxxkjzdfzForm" , resData);
	if(zxxxkjzdfzForm)zlbsfbsaveData.set( "中小学校会计制度附注" ,zxxxkjzdfzForm);
	var cpjgkjzdfzForm=pc.getResData("cpjgkjzdfzForm" , resData);
	if(cpjgkjzdfzForm)zlbsfbsaveData.set( "彩票机构会计制度附注" ,cpjgkjzdfzForm);
	var mjfylzzkjzdfzForm=pc.getResData("mjfylzzkjzdfzForm" , resData);
	if(mjfylzzkjzdfzForm)zlbsfbsaveData.set( "民间非营利组织会计制度附注" ,mjfylzzkjzdfzForm);
	var gdxxkjzdfzForm=pc.getResData("gdxxkjzdfzForm" , resData);
	if(gdxxkjzdfzForm)zlbsfbsaveData.set( "高等学校会计制度附注" ,gdxxkjzdfzForm);
	var kxsydwkjzdfzForm=pc.getResData("kxsydwkjzdfzForm" , resData);
	if(kxsydwkjzdfzForm)zlbsfbsaveData.set( "科学事业单位会计制度附注" ,kxsydwkjzdfzForm);
	var yykjzdfzForm=pc.getResData("yykjzdfzForm" , resData);
	if(yykjzdfzForm)zlbsfbsaveData.set( "医院会计制度附注" ,yykjzdfzForm);
}

function alertmes(mes){
	swordAlert(mes);
	try{
		$w("SwordTreeJSON").setSelectNode("00");
	}catch(e){}
	
}

/************************************资料报送**************************/
var dzswj_zcbb ="N";//是否置亮自查补报标志
/**
 * @param dzbzdszlDm
 * @return dzswj_zcbb
 * @descripe 自查补报按钮显示公共方法
 */
function isEnableZcbb(dzbzdszlDm){
	if(!$chk(dzbzdszlDm)){
		return;
	}
	var submit = new SwordSubmit();
	submit.pushData("dzbzdszlDm",dzbzdszlDm);
	submit.setCtrl("SBGyCtrl_isEnableZcbb");
	submit.setFunction('onSuccess', 'isEnableZcbbSuccess');
	submit.submit();
	return dzswj_zcbb;
}
/**
 * @param req
 * @param res
 * @return dzswj_zcbb
 * @descripe 自查补报按钮显示公共方法
 */
function isEnableZcbbSuccess(req,res){
	dzswj_zcbb = res.getAttr("csz");
	return dzswj_zcbb;
}
var dzswj_sqkzkg ="N";//是否置亮税款所属期
/**
 * @param dzswj_sqkzkg
 * @return dzswj_sqkzkg
 * @descripe 税款所属期显示公共方法
 */
function isEnableSkssq(dzbzdszlDm){
	if(!$chk(dzbzdszlDm)){
		return;
	}
	var submit = new SwordSubmit();
	submit.pushData("dzbzdszlDm",dzbzdszlDm);
	submit.setCtrl("SBGyCtrl_isEnableSkssq");
	submit.setFunction('onSuccess', 'isEnableSkssqSuccess');
	submit.submit();
	return dzswj_sqkzkg;
}
/**
 * @param req
 * @param res
 * @return dzswj_sqkzkg
 * @descripe 税款所属期显示公共方法
 */
function isEnableSkssqSuccess(req,res){
	dzswj_sqkzkg = res.getAttr("csz");
	return dzswj_sqkzkg;
}
function hydjxxcx(){
	var mfgyrxxGrid = $w("mfgyrxxGrid").getAllNoDeleteGridData();
	var gmfgyrxxGrid = $w("gmfgyrxxGrid").getAllNoDeleteGridData();
	var mflength = mfgyrxxGrid.trs.length;
	var gmflength= gmfgyrxxGrid.trs.length;
	if(mflength<1||gmflength<1){
		swordAlertWrong("卖方信息或者购买方信息不能为空！");
		return;
	}
	var zcbbBtn = new SwordSubmit();
	zcbbBtn.pushData(mfgyrxxGrid);
	zcbbBtn.pushData(gmfgyrxxGrid);
	zcbbBtn.setCtrl('SB410FcjysbCtrl_getHydjxx');
	swordAlertIframe('', {
				titleName : '婚姻登记状况',
				width : 850,
				height : 400,
				param : window,
				submit : zcbbBtn,
				isNormal : 'false',
				isMax : 'false',
				isClose : 'true',
				isMin : "false"
			});
}

/**
 * 公用初始化
 * @param resData
 */
function sbgyInit(resData){
	gySmbs(resData);
}

/**
 * 实名办税
 * @param resData
 */
function gySmbs(resData) {
	addJsFile("/gy/gy017/gy017zjsmbs.js", function () {
		if ($chk(resData)) {
			var cwgzbz = resData.getAttr("cwgzbz");
			var cszForXML = resData.getAttr("cszForXML");
			var scenceCs = resData.getAttr("scenceCs");
			if ($chk(cwgzbz) && ("cwgzbz" == cwgzbz || "sbbck" == cwgzbz)) {
				return;
			}
			if ($chk(scenceCs) && ("cwgzbz" == scenceCs || "sbbck" == scenceCs)) {
				return;
			}
			if ($chk(cszForXML) && ("SBCWGZ" == cszForXML || "sbbck" == cszForXML || "SBZF" == cszForXML)) {
				return;
			}
			var lcswsxDm = resData.getAttr("lcswsxDm");
			handleNsrsbhByLcswsx(lcswsxDm,function(nsrsbh){
				var e = new Object();
				e.code = 13;
				var nsrsbhName = "nsrsbh";
				var queryNsrxxFun = "queryNsrxx";
				var formName = "nsrxxForm";
				if ('LCSXA061005005' == lcswsxDm || 'LCSXA061005004' == lcswsxDm ) {
					nsrsbhName = "dkdjywrsbh";
				} else if ('LCSXA061004001' == lcswsxDm) {
					queryNsrxxFun = "queryNsrxxforWtdz";
				} else if ('LCSXA061001034' == lcswsxDm) {
					nsrsbhName = "fjmnsrsbm";
				} else if ('LCSXA061001014' == lcswsxDm) {
					queryNsrxxFun = "queryNsrxxforfjssb";
				} else if ('LCSXA061001012' == lcswsxDm) {
					queryNsrxxFun = 'queryJmqyczzssbData';
				}
				$w(formName).setValue(nsrsbhName,nsrsbh);
				eval(queryNsrxxFun+"(e)");
			});
		} else {
			try {
				if ("cwgzbz" != _arrVars['cwgzbz'] &&  "sbbck" != _arrVars['cwgzbz']) {
					handleNsrsbhByLcswsx( _arrVars['lcswsxDm'],function(nsrsbh){
						$w("nsrxxForm").setValue("nsrsbh",nsrsbh);
						queryNsrxxForYwptInSmrz("nsrxxForm", "nsrsbh");
					});
				}
			} catch (e) {
			}
		}
	});
}

/**
 * 动态添加js文件
 * @param jsPath
 * @param callback
 */
function addJsFile(jsPath, callback) {
	var es = document.getElementsByTagName('script');
	for (var i = 0; i < es.length; i++) {
		if (es[i]['src'] == jsPath) {//已经引用直接回调
			callback.apply();
			return false;
		}
	}
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = script.onreadystatechange = function () {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {//JS加载完成再回调
			callback.apply();
			script.onload = script.onreadystatechange = null;
		}
	};
	script.src = jsPath;
	head.appendChild(script);
}

/// +++dm17 TODO

/**
 * @description 从Attr属性中初始化全局变量
 * @Info 数组项的格式为“xx:xxx,defVal:22”或“xx”；没有“:”分隔符时，默认变量名和传入字符串相同；有分隔符时分隔符前为变量名，
 * 		分隔符后为attr的属性名，defVal为未取到值时的默认值
 * @param paramArr 全局变量名数组
 * @resData 原始数据
 * 
 */
function initGlobalParamAttr(paramArr, resData) {
	if (!$chk(paramArr) || 1 > paramArr.length) {
		return;
	}
	
	for (var i = 0; i < paramArr.length; i++) {
		var nameVals = paramArr[i].split(",");
		if (!$chk(nameVals) || 1 > nameVals.length) {
			continue;
		}
		
		var strs = nameVals[0].split(":");
		if (!$chk(strs) || 1 > strs.length) {
			continue;
		}
		
		var paramName = strs[0];
		var itemStr = strs.length > 1 ? strs[1] : strs[0];
		if ($chk(paramName) && "" != paramName && $chk(itemStr) && "" != itemStr) {
            var value = null;
            try {
                value = resData.getAttr(itemStr);
            } catch (e) {
                value = null;
            }            
			
			if (!$chk(value)) {
				// 解析默认值
				var defVal = nameVals.length > 1 ? nameVals[1] : "";
				if ($chk(defVal) && "" != defVal) {
					defVal = defVal.contains("defVal:") ? defVal.substring("defVal:".length) : "";
				}
                if (!$chk(defVal) || "" == defVal) {
                    continue;
                } else {
                    value = defVal;
                }
			}
			
			// eval有作用域的问题，故弃用，改用window取全局变量值
//			// 拼装执行语句
//			var gsStr = paramName + "=\"" + value + "\";"
//			// 执行语句
//			eval(gsStr);
			window[paramName] = value;
		}
	}
}

/**
 * @description 从resData的对象属性中初始化全局变量
 * @Info 数组项的格式为“xx:xxx”或“xx”；没有“:”分隔符时，默认变量名和传入字符串相同；有分隔符时分隔符前为变量名，
 * 		分隔符后为原始数据中的属性名
 * @param paramArr 全局变量名数组
 * @resData 原始数据
 * 
 */
function initGlobalParamObject(paramArr, resData) {
	if (!$chk(paramArr) || 1 > paramArr.length) {
		return;
	}
	
	for (var i = 0; i < paramArr.length; i++) {
		var strs = paramArr[i].split(":");
		if (!$chk(strs) || 1 > strs.length) {
			continue;
		}
		
		var paramName = strs[0];
		var itemStr = strs.length > 1 ? strs[1] : strs[0];
		if ($chk(paramName) && "" != paramName && $chk(itemStr) && "" != itemStr) {
			var value = null;
            try {
                value = pc.getResData(itemStr, resData);
            } catch (e) {
                value = null;
            }            

			if (!$chk(value)) {
				// value = null;
                continue;
			}
			// eval有作用域的问题，故弃用，改用window取全局变量值
//			// 拼装执行语句
//			var gsStr = paramName + "=" + value + ";"
//			// 执行语句
//			eval(gsStr);
			window[paramName] = value;
		}
	}
}

/**
 * @description 为其他页面提供获取页面全局变量的方法
 * @param glNames 全局变量名称数组
 * @returns
 */
function supGlobalDataForOthers(glNames) {
	if (!$chk(glNames) || glNames.length < 1) {
		return null;
	}
	
	var retArr = {};
	for (var i = 0; i < glNames.length; i++) {
		// eval有作用域的问题，故弃用，改用window取全局变量值
//		eval("retArr[\"" + glNames[i] + "\"]=" + glNames[i] + ";");
		retArr[glNames[i]] = window[glNames[i]];
	}
	
	return retArr;
}


/**
 * @description 为其他也提供取本页面的form数据
 * @param formArr form名称数组
 * @returns form的提交数据
 */
function supFormDataForOthers(formArr) {
	if (!$chk(formArr) || formArr.length < 1) {
		return null;
	}
	
	var retArr = {};
	for (var i = 0; i < formArr.length; i++) {
		var formObj = $w(formArr[i]);
		if (!$chk(formObj)) {
			retArr[formArr[i]] = null;
		} else {
			retArr[formArr[i]] = formObj.getSubmitData().data;
		}		
	}
	
	return retArr;
}

/**
 * @description 为其他也提供取本页面的grid数据
 * @param gridArr grid名称数组
 * @returns grid的提交数据(trs后)和合计行数据
 * 
 */
function supGridDataForOthers(gridArr) {
	if (!$chk(gridArr) || gridArr.length < 1) {
		return null;
	}
	
	var retArr = {};
	for (var i = 0; i < gridArr.length; i++) {
		var gridObj = $w(gridArr[i]);
		if (!$chk(gridObj)) {
			retArr[gridArr[i]] = null;
		} else {
			var gridData = gridObj.getAllNoDeleteGridData().trs;
			if ($chk(gridObj.hjRow) && $chk(gridData)) {
				var hjDiv = gridObj.hjRow;
				var cellArray = hjDiv.getElements("div");
				var hjData = {};
				for (var j = 0; j < cellArray.length; j++) {
					if (!$chk(cellArray[j])) {
						continue;
					}
					var hjCellName = cellArray[j].get("name");
					var hjVal = cellArray[j].get("realvalue");
					hjData[hjCellName] = hjVal;
				}
				
				gridData.HjRowData = hjData;
			}
			retArr[gridArr[i]] = gridData;
		}		
	}
	
	return retArr;
}
/** 170.03
 * @description 查询是否存在自行补正通知书
 * @param djxh   登记序号
 * @param skssqq 税款所属期起
 * @param  skssqz 税款所属期止
 */
function checkNsrZxbzTzs(djxh, skssqq, skssqz) {
	var zcbbBtn = new SwordSubmit();
	zcbbBtn.pushData("djxh", djxh);
	zcbbBtn.pushData("skssqq", skssqq);
	zcbbBtn.pushData("skssqz", skssqz);
	zcbbBtn.setOptions({
		async : 'true',
		mask : 'false',
		ctrl : 'SBGyCtrl_checkNsrzxbzTzs',
		onSuccess : function(req, res) {
			var zcbbBz = res.getAttr("zcbbBz");
			if ($chk(zcbbBz) && zcbbBz == "Y") {
				var zcbbMes = res.getAttr("zcbbMes");
				swordAlert(zcbbMes);
			}
		}
	});
	zcbbBtn.submit();
}

//兼容IE FF的ByName方法
var getElementsByName = function(tag, name){
    var returns = document.getElementsByName(name);
    if(returns.length > 0) return returns;
    returns = new Array();
    var e = document.getElementsByTagName(tag);
    for(var i = 0; i < e.length; i++){
        if(e[i].getAttribute("name") == name){
            returns[returns.length] = e[i];
        }
    }
    return returns;
}
/// ---

function xmgscheck(e){
	var id = e.target.id;
	var n = e.target.name;
	var ysval = (e.target.value).replace(/,/g,"");
	var v = ysval;
	var formName = id.split("_")[0];
	var reg_fd = /^(-?\d+)(\.\d+)?$/;
	//若输入的不是浮点型，则默认设置0
	if (!reg_fd.test(v)) {
		$w(formName).setValue(n,0.00);
		caculate(id);
		v = "0";
	}
	for (var i = 0;i < xmgsCheckArr.length;i++) {
		if (xmgsCheckArr[i].name == n) {
			xmgsJygz(id,n,v,xmgsCheckArr[i].bds,xmgsCheckArr[i].tsxx,xmgsCheckArr[i].mrz,formName);
		}
	}
}

function xmgsJygz(id,n,v,bds,tsxx,mrz,formName){
	var reg = new RegExp("([0-9a-zA-Z_]{1,})","g");
	//var arr = n.match(reg);
	var evalScr = bds.replace(reg,function(){
		var reg_sz = /^\d+$/;
		//非数字的进入验证是否是form表单中的name
		if (!reg_sz.test(arguments[0])) {
			if (n == arguments[0]) {
				return $chk(v)?v:"0";
			} else if ($w(formName).getFieldEl(arguments[0])) {
				return $chk($w(formName).getValue(arguments[0]))?$w(formName).getValue(arguments[0]):"0";
			}
		}
		return arguments[0];
	});
	var t = eval(evalScr);
	if (!t) {
		if ($chk(tsxx)) {
			swordAlert(tsxx);
		}
		if ($chk(mrz)) {
			if (mrz == "nochange") {
				
			} else {
				var evalMrz = mrz.replace(reg,function(){
					if (n == arguments[0]) {
						return $chk(v)?v:"0";
					} else if ($w(formName).getFieldEl(arguments[0])) {
						return $chk($w(formName).getValue(arguments[0]))?$w(formName).getValue(arguments[0]):"0";
					}
					return arguments[0];
				});
				var mrz_t = eval(evalMrz);
				$w(formName).setValue(n, mrz_t);
				caculate(id);
			}
		} else {
			$w(formName).setValue(n, 0.00);
			caculate(id);
		}
		return false;
	}
	return true;
}
function toDsfjssb(gdsyybz,xtgnDm,skssqq,skssqz,nsrxxVO,sbsxDm1,sbcwgzbz,zfstzjhljbz,zxbztzsuuid,pzxh){
	var mesg = "";
	if("A0000001A0600190"==xtgnDm){//附加税才提示
		mesg = "是否跳转附加税申报？";
	}else if("A0000001A0600123"==xtgnDm){
		mesg = "是否作废附加税？";
		return;
	}
	
	if("Y"!=zfstzjhljbz&&$chk(mesg)&&mesg.length>0){
		swordConfirm(mesg, {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				dsfjssb(gdsyybz,xtgnDm,skssqq,skssqz,nsrxxVO,sbsxDm1,sbcwgzbz,zxbztzsuuid,pzxh);
		},
		onCancel : function() {
			return;
		},
		onClose : function() {
			return;
		}
		});
	}else{
		dsfjssb(gdsyybz,xtgnDm,skssqq,skssqz,nsrxxVO,sbsxDm1,sbcwgzbz,zxbztzsuuid,pzxh);
	}
}

function dsfjssb(gdsyybz,xtgnDm,skssqq,skssqz,nsrxxVO,sbsxDm1,sbcwgzbz,zxbztzsuuid,pzxh){
	var nsrmc = nsrxxVO.nsrmc;
	var ssdabh = nsrxxVO.ssdabh;
	var kzztdjlxDm = nsrxxVO.kzztdjlxDm;
	var kqccsztdjbz = nsrxxVO.kqccsztdjbz;
	var sbsxDm = $chk(sbsxDm1)?sbsxDm1:"11";
	var cwgzbz = $chk(sbcwgzbz)?sbcwgzbz:"N";
	var nsrData = "nsrmc="+nsrmc+"&ssdabh="+ssdabh+"&kzztdjlxDm="+kzztdjlxDm+"&kqccsztdjbz="
	+kqccsztdjbz+"&skssqq="+skssqq+"&skssqz="+skssqz+"&sbsxDm1="+sbsxDm+"&sbcwgzbz="+cwgzbz
	+"&zxbztzsuuid="+zxbztzsuuid+"&pzxh="+pzxh;
	var xtbm = "A0000001";//核心征管
	var param = {
			xtbm     : "A0000001",//核心征管
			dyxtgndm : xtgnDm,//调用的系统功能代码，功能代码A0000001A0200083
			gdsdybz  : gdsyybz,//国地税调用标志，调国税功能传固定值gsyy,调地税功能传固定值dsyy
			sfpzgwxh : 'Y',//是否拼装岗位序号，Y拼装业务参数。类似于功能树打开，N不拼装业务参数
			ywdata   : nsrData//传业务数据，多数据用&分隔	
	};
	try{
		if(gdsyybz!='dsyy'){
            var submit = new SwordSubmit();
            submit.pushData('nsrmc',nsrmc);
            submit.pushData('ssdabh',ssdabh);
            submit.pushData('kzztdjlxDm',kzztdjlxDm);
            submit.pushData('kqccsztdjbz',kqccsztdjbz);
            submit.pushData('skssqq',skssqq);
            submit.pushData('skssqz',skssqz);
            submit.pushData('sbsxDm1',sbsxDm);
            submit.pushData('sbcwgzbz',cwgzbz);
            submit.pushData('zxbztzsuuid',zxbztzsuuid);
            submit.pushData('pzxh',pzxh);
            submit.setCtrl("SB246FjsfnssbCtrl_initView");
            var tmpObj = parent.$w("tab1").tabItems.get("fjsfsb");
            if ($chk(tmpObj)) {
                parent.$w('tab1').removeTabItem("fjsfsb");
            }
            parent.$w('tab1').addTabItem({
                id : "fjsfsb",
                title : "附加税（费）申报",
                tabContentType : 'iframe',
                submit : submit,
                isCloseBtn : 'true'
            });
		}else {
            top.openGdsXtgnToIframeTab(param);
        }
	}catch (e) {
	}
}
/**
 * 
 */
function fromYbSBJumpZskp2(pzxh, ybtse, djxh, resData) {
	$_saveResData = resData;
	var returnVO = pc.getResData("sbsaveReturnVO",resData);
	gt3_zskp_djxh = djxh;
	gt3_zskp_pzxh = pzxh;
	ybtse = ybtse.round(2);
	
	var ybse = resData.getAttr("ybse");
	var ytse = resData.getAttr("ytse");
	
	var yzpzzlDm = "";
	var istszskp = false;
	if(returnVO!=null && returnVO!=undefined){
		if(returnVO.data.iszsskBz.value=="Y"){
			istszskp = true;
		}else{
			istszskp = false;
		}
	}
	
	// by liuwei 根据BJD11_201707050012问题且咨询全国70家单位，均同意跳转一般征收开票时新打开一个tab页
	try {
		yzpzzlDm = resData.getAttr("yzpzzlDm");
		// gt3_zskp_tzfs = resData.getAttr("tzfs");
	} catch (e) {
		// gt3_zskp_tzfs = '';
	}

	try{
		if(sftzzskp()=='N'){//是否跳转征收开票
			return;
		}
	}catch (e) {}
	// 根据应补退税额是否大于0进行相关提示
	if(emptyToZ(ybse)/1 < 1){//
		if(emptyToZ(ytse)/1 > 0){//存在应退
			swordAlertRight("保存成功，当前纳税人申报凭证序号为： " + pzxh + ",应缴纳税款为：" + GyFormatRound(emptyToZ(ytse)*(-1), 2).toFixed(2) + " 元,请进行退抵税审批。");
		}else{
			swordAlertRight("保存成功，当前纳税人申报凭证序号为： " + pzxh + ",应缴纳税款为：" + ybse + " 元，无需进行征收开票。");
		}
		return;
	}
	//存在应补
	var msgs = "";
	if(emptyToZ(ytse)/1 > 0){//存在应退
		msgs = "保存成功，当前纳税人申报凭证序号为： " + pzxh + ",应退税款为："+ytse+" 元,应缴纳税款为：" + ybse + " 元(不含滞纳金，滞纳金将在开票环节计算)。是否需要调用征收开票？";
	}else{
		msgs = "保存成功，当前纳税人申报凭证序号为： " + pzxh + ",应缴纳税款为：" + ybse + " 元(不含滞纳金，滞纳金将在开票环节计算)。是否需要调用征收开票？";
	}
	swordConfirm(msgs, {
		okBtnName : "是",
		cancelBtnName : "否",
		onOk : function() {
			var insertdata = [{ tds : { yzpzxh : { value : gt3_zskp_pzxh } } }];
			var yzpzxhList = {
				'sword' : 'SwordGrid',
				'name' : 'yzpzxhList',
				'trs' : insertdata
			};

			// 获取一般申报跳转征收开票后回跳一般申报用例页面参数变量
			var locationForKpStr = "";
			try {
				var locationForKp = pc.getResData("locationForKp", resData);
				if (locationForKp != undefined && locationForKp != null
						&& locationForKp != "") {
					locationForKpStr = locationForKp.value;
				}
			}  catch (e) {
				locationForKpStr = "";
			}																	

			var zskpBtn = new SwordSubmit();
			zskpBtn.pushData(yzpzxhList);
			zskpBtn.pushData('djxh', gt3_zskp_djxh);
			zskpBtn.pushData('locationForKpStr', locationForKpStr);
			zskpBtn.options.postType = "form";
			zskpBtn.setCtrl("ZS040YbzskpCtrl_initViewBysb");
			if('SB246FjsfnssbCtrl_initView'==locationForKpStr){//附加税
				var skssqq = resData.getAttr("skssqq");
				var skssqz = resData.getAttr("skssqz");
                zskpBtn.pushData('skssqq', skssqq);
                zskpBtn.pushData('skssqz', skssqz);
			}
			if (gt3_zskp_tzfs == 'newTab') {
				var tmpObj = parent.$w("tab1").tabItems.get("zskp.jsp");
				if ($chk(tmpObj)) {
					parent.$w('tab1').removeTabItem("zskp.jsp");
				}
				parent.$w('tab1').addTabItem({
							id : "zskp.jsp",
							title : "一般征收开票",
							tabContentType : 'iframe',
							submit : zskpBtn,
							isCloseBtn : 'true'
						});
				// 关闭小叉叉的问题
				parent.$$(".tab_box ul li").each(function(el, i) { el.setStyle("width", "150px"); });
				parent.setTabSpanWidth();
				parent.$w('tab1').scrollRight();
				return;
			}
			zskpBtn.submit();
		},
		onCancel : notJumpZskp
	});
}

var zxswdjFlag = false;
/**
 * @description 处理登记注销跳转申报界面
 * @param res 输入数据
 * @param nsrFormObj 纳税人信息form对象
 * @param callFun 回调函数
 * @param args 回调函数参数（如：按键值）
 * @param nsrsbhStr 纳税人识别号在form中的名称， 不传默认为“nsrsbh”
 * @param skssqqStr 税款所属期起在form中的名称
 * @param skssqzStr 税款所属期止在form中的名称
 * @param otherFieldsArr 其他字段,格式"[“xx:dd”]"，xx为nsrxxMap或otherMap字段，dd为表单字段,
 *                      若xx和dd相同，可写一个
 *
 */
function handleZxtz(res, nsrFormObj, callFun, nsrsbhStr, skssqqStr
    , skssqzStr, otherFieldsArr) {
    var retB = false;
    var nsrxxMap = null;
    var otherMap = null;
    var zrrBz = null;
    if ($chk(res)) {
    	nsrxxMap = pc.getResData("gy_nsrxxForm", res);
        otherMap = pc.getResData("gy_otherForm", res);
        zrrBz = res.getAttr("zrrBz");
    } else { // 支持业务平台的方式
    	nsrxxMap = _arrVars['gy_nsrxxForm'];
        otherMap = _arrVars['gy_otherForm'];
        zrrBz = _arrVars['zrrBz'];
    }
    nsrxxMap = $chk(nsrxxMap) && $chk(nsrxxMap["data"]) ? nsrxxMap["data"] : null;
    otherMap = $chk(otherMap) && $chk(otherMap["data"]) ? otherMap["data"] : null;
    if (!$chk(nsrxxMap) || !$chk(otherMap) || !$chk(nsrFormObj)) {
        return retB;
    }
    window.zxswdjFlag = true;
    var nsrsbhField = $chk(nsrsbhStr) && "" != nsrsbhStr ? nsrsbhStr : "nsrsbh";
    // var skssqqField = $chk(skssqqStr) && "" != skssqqStr ? skssqqStr : "skssqq";
    // var skssqzField = $chk(skssqzStr) && "" != skssqzStr ? skssqzStr : "skssqz";
    var nsrsbhVal = nsrxxMap.nsrsbh.value;
    nsrFormObj.setValue(nsrsbhField, nsrsbhVal);
    
    if ($chk(skssqqStr) && "" != skssqqStr) {
        var skssqqVal = otherMap.skssqq.value;
        nsrFormObj.setValue(skssqqStr, skssqqVal);
    }
    if ($chk(skssqzStr) && "" != skssqzStr) {
        var skssqzVal = otherMap.skssqz.value;
        nsrFormObj.setValue(skssqzStr, skssqzVal);
    }
    
    // 给其他字段赋值
    var fieldsCount = $chk(otherFieldsArr) && $chk(otherFieldsArr["length"]) ? otherFieldsArr["length"] : 0;
    if (fieldsCount > 0) {
        for (var i = 0; i < fieldsCount; i++) {
            var fieldStr = otherFieldsArr[i];
            if (!$chk(fieldStr) || "" == fieldStr) {
                continue;
            }
            
            var fieldArr = fieldStr.split(":");
            var fieldSize = $chk(fieldArr) && $chk(fieldArr["length"]) ? fieldArr["length"] : 0;
            if (fieldSize < 1) {
                continue;
            }
            
            var valName = fieldArr[0];
            var fieldName = fieldSize > 1 ? fieldArr[1] : fieldArr[0];
            if (!$chk(valName) || "" == valName || !$chk(fieldName) || "" == fieldName) {
                continue;
            }
            
            var valVal = "";
            if ($chk(nsrxxMap[valName])) {
                valVal = nsrxxMap[valName].value;
            } else if ($chk(otherMap[valName])) {
                valVal = otherMap[valName].value;
            }
            
            if ($chk(valVal)) {
                nsrFormObj.setValue(fieldName, valVal);
            }
        }
    }
    
    if ($chk(callFun)) {
        retB = true;
        var args = [nsrxxMap, null];
        if ($chk(zrrBz) && "Y" == zrrBz) {
            args = [null, nsrxxMap];
        } 
		
        callFun.apply(this, args);
	}	
    window.zxswdjFlag=false;
    return retB;
}

function onchangesfzzl() {
	
	var slxxForm = $w("slxxForm");
	var slxxForm1 = $w("fjxxForm");
	var slxxForm2 = $w("xmslxxForm");
	var slxxForm3 = $w("whfjxxForm");
	var slxxForm4 = $w("slxxdyForm");
	var slxxForm5 = $w("nsrqtxxForm");
    var sfzjbm="";
    //form名为slxxForm  xmslxxForm  whfjxxForm slxxdyForm nsrqtxxForm 其身份证对应字段名为blrysfzjlxDm blrysfzjhm
    //form 名为fjxxForm  其身份证对应字段名为dlrsfzjzlDm1 dlrsfzjhm1
    var ly;
	if (slxxForm!=null && slxxForm!="" && slxxForm!=undefined) {
		 sfzjbm = (!$chk(slxxForm.getValue("blrysfzjlxDm").code))==true?(slxxForm.getValue("dlrsfzjzlDm1").code):(slxxForm.getValue("blrysfzjlxDm").code);
		 ly="0";
	}
	if (slxxForm1!=null && slxxForm1!="" && slxxForm1!=undefined) {
		 sfzjbm = (!$chk(slxxForm1.getValue("blrysfzjlxDm").code))==true?(slxxForm1.getValue("dlrsfzjzlDm1").code):(slxxForm1.getValue("blrysfzjlxDm").code);
		 slxxForm=slxxForm1;
		 ly="1";
	}
	if (slxxForm2!=null && slxxForm2!="" && slxxForm2!=undefined) {
		 sfzjbm = (!$chk(slxxForm2.getValue("blrysfzjlxDm").code))==true?(slxxForm2.getValue("dlrsfzjzlDm1").code):(slxxForm2.getValue("blrysfzjlxDm").code);
		 slxxForm=slxxForm2;
		 ly="0";
	}
	if (slxxForm3!=null && slxxForm3!="" && slxxForm3!=undefined) {
		 sfzjbm = (!$chk(slxxForm3.getValue("blrysfzjlxDm").code))==true?(slxxForm3.getValue("dlrsfzjzlDm1").code):(slxxForm3.getValue("blrysfzjlxDm").code);
		 slxxForm=slxxForm3;
		 ly="0";
	}
	if (slxxForm4!=null && slxxForm4!="" && slxxForm4!=undefined) {
		 sfzjbm = (!$chk(slxxForm4.getValue("blrysfzjlxDm").code))==true?(slxxForm4.getValue("dlrsfzjzlDm1").code):(slxxForm4.getValue("blrysfzjlxDm").code);
		 slxxForm=slxxForm4;
		 ly="0";
	}
	if (slxxForm5!=null && slxxForm5!="" && slxxForm5!=undefined) {
		 sfzjbm = (!$chk(slxxForm4.getValue("blrysfzjlxDm").code))==true?(slxxForm5.getValue("dlrsfzjzlDm1").code):(slxxForm5.getValue("blrysfzjlxDm").code);
		 slxxForm=slxxForm5;
		 ly="0";
	}
		if (sfzjbm == "201") { 
			if (ly=="0") {
				slxxForm._itemSwitch("blrysfzjhm", "text", {
					'rule' : 'must_idcard'
				});	
			}else {
				slxxForm._itemSwitch("dlrsfzjhm1", "text", {
					'rule' : 'must_idcard'
				});
			}
		} else {
			if (ly=="0") {
				slxxForm._itemSwitch("blrysfzjhm", "text", {
					'rule' : 'must_length;0,20'
				});	
			}else {
				slxxForm._itemSwitch("dlrsfzjhm1", "text", {
					'rule' : 'must_length;0,20'
				});
			}
		}
		slxxForm.setValue("blrysfzjhm","");
		slxxForm.setValue("dlrsfzjhm1","");
}

function  returnCwgz(){
	var bcBtn = new SwordSubmit();
	bcBtn.setCtrl("SB057SbcwgzCtrl_returnCwgz");
	bcBtn.options.postType = "form"; // 在用form提交一次跳转到各个页面
	bcBtn.submit();
}

(function addbtn() {
	
	if (!$chk(top.$pc)) {
		return;
	}
	var gnname = top.$pc._initData.data[7].value;// 获取功能名称
	if ("申报更正" == gnname || "申报错误更正" == gnname) {
		addCwgzFhButton();
	}
})();

function addCwgzFhButton() {
    var a = $(document.body).getElements("div[sword=SwordToolBar]").get("name");
    var docele = $(document.body);
    if(a.length == 0){
    	a = parent.document.getElements("div[sword=SwordToolBar]").get("name");
    	docele = parent.document;
    }
    
    if (a.length != 0) {
        var b = a[0];
        if (!$chk(b)) {
            return;
        }
        var toolbardiv = docele.getElements("div[name=" + b + "]");
        var d = new Element("div", {
            name: "fhcwgz",
            type: "back",
            caption: "申报错误更正",
            onclick: "returnCwgz()",
            enabled: "true"
        });
        if(!toolbardiv.contains("fhcwgz")){
        	toolbardiv.grab(d);
        }
    } else {
        var d = new Element("div", {
            name: "ToolBarButton",
            sword: "SwordToolBar",
            showType: "mini"
        });
        var c = new Element("div", {
            name: "fhcwgz",
            type: "back",
            caption: "申报错误更正",
            onclick: "returnCwgz()",
            enabled: "true"
        });
        $(d).grab(c);
        var f = $(document.body).getElements("div[class=wrapper]")[0];
        if ($chk(f)) {
            $(f).grab(d, "top");
        } else {
            $(document.body).grab(d, "top");
        }
    }
}
/*
 * 隐藏申报错误更正按钮
 * */
function hidecwgzbtn(){
	var a = $(document.body).getElements("div[sword=SwordToolBar]").get("name");
	$w(a[0]).setHide("fhcwgz");
}


/**
 * @description 用户pulltree（treeType = 1的除外）拦截退格键
 *
 */
function banBackspace() {
	var e = window.event;
	if ($chk(e) && e.keyCode == 8) {
		e.returnValue = false;
	}
}

/**
 * 启动税费种认定待办任务
 * @param {Object} djxh
 */
function startSfzrdDbrw(djxh){
    var btn = new SwordSubmit();
    btn.pushData('djxh', djxh);
    btn.setCtrl('SBGyCtrl_startSfzrdDbrw');
    btn.setFunction('onSuccess', 'dbrwOnSuccess');
    btn.submit();
}    

function dbrwOnSuccess(){
	$w('sbToolBar').setDisabled('save');
	swordAlert("请及时联系主管税务机关变更申报期限。");
}

/**
 * 显示ToolTips信息
 * 
 * @param obj
 * @param id
 * @param html
 * @param width
 * @param height
 * @return
 */
function showTooltip(obj, id, html, width, height) {
	if (document.getElementById(id) == null) {
		var tooltipBox;
		tooltipBox = document.createElement('div');
		tooltipBox.style.display = 'block';
		tooltipBox.style['line-height'] = '1.6';
		tooltipBox.style['background-color'] = 'white';
		tooltipBox.style['backgroundColor'] = 'white';
		tooltipBox.style['font-size'] = '20px';
		tooltipBox.style.border = '1px solid #000';
		tooltipBox.style['box-shadow'] = '1px 1px 8px #000'
		tooltipBox.style.overflow = 'auto';
		tooltipBox.id = id;
		tooltipBox.innerHTML = html;
		tooltipBox.style.position = "absolute";
		tooltipBox.style.width = width ? width + 'px' : 'auto';
		tooltipBox.style.height = height ? height + 'px' : 'auto';
		tooltipBox.style.left = obj.offsetLeft + 'px';
		tooltipBox.style.top = obj.offsetTop + 50 + 'px';
		obj.appendChild(tooltipBox);
		obj.onmouseleave = function() {
			document.getElementById(id).style.display = "none";
		};
	} else {
		document.getElementById(id).style.display = "block";
	}
}

/**
 * 给SwordToolBar按钮增加Tips提示
 * 
 * @param btnName
 * @param altMsg
 * @return
 */
function addToolTips(btnName, altMsg) {
	var elements = getElementsByClassName('mini_tb tb_mini');
	for ( var i = 0; i < elements.length; i++) {
		var dom = elements[i];
		if (btnName == dom.getAttribute('name')) {
			dom.onmouseenter = function() {
				showTooltip(this, btnName + "_tips", altMsg);
			}
		}
	}
}

/**
 * 解决IE9以下不支持getElementsByClassName的问题
 * 
 * @param node
 * @param className
 * @return
 */
function getElementsByClassName(className) {
	if (document.getElementsByClassName) {
		// 使用现有方法
		return document.getElementsByClassName(className);
	} else {
		// 循环遍历所有标签，返回带有相应类名的元素
		var results = [], elems = document.getElementsByTagName("*");
		for ( var i = 0, len = elems.length; i < len; i++) {
			if (elems[i].className.indexOf(className) != -1) {
				results[results.length] = elems[i];
			}
		}
		return results;
	}
}

/**
 * 修改SwordToolBar按钮显示名称
 * @param btnName
 * @param caption
 * @return
 */
function changeToolBarButtonCaption(btnName,caption){
	var elements = getElementsByClassName('mini_tb tb_mini');
	for ( var i = 0; i < elements.length; i++) {
		var dom = elements[i];
		if (btnName == dom.getAttribute('name')) {
			var subElements = dom.childNodes;
			for ( var j = 0; j < subElements.length; j++) {
				var subDOM = subElements[j];
				if ('caption' == subDOM.getAttribute('name')) {
					subDOM.innerText = caption;
				}
			}
		}
	}
}

(function() {
	if(document.URL.indexOf("cxbj=Y") > 0){
		setTimeout(function() {
			fixPrintBtnForSbbck();
			}, 2000);
	}
})();

/**
 * 统一修复申报表查看的打印按钮问题
 * @return
 */
function fixPrintBtnForSbbck(){
	var toolbars=$(document.body).getElements("div[sword=SwordToolBar]");
	if(toolbars.length>0){
		var toolbarName=toolbars[0].get("name");
		var elements = getElementsByClassName('mini_tb tb_mini');
		for ( var i = 0; i < elements.length; i++) {
			var dom = elements[i];
			if ('print' == dom.getAttribute('type')) {
				var name=dom.getAttribute('name');
				$w(toolbarName).setEnabled(name);
			}
		}
		$w(toolbarName).setHide('tybddy');
		$w(toolbarName).setHide('printHz');
	}
}
function getCxsmonthDay(year, month) {
	var feb = (year % 4 == 0) ? 29 : 28;
	var monthDay = new Array(31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	return monthDay[month - 1];
}