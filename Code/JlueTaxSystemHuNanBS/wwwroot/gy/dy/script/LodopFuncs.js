var LODOP; // 打印控件句柄

// 打印控件配置参数
LODOP_CONFIG = {
	BACKGROUND_IMG : "chenying.jpg",
	BKIMG_IN_PREVIEW : 1,
	BKIMG_WIDTH : "209mm",
	BKIMG_HEIGHT : "150mm",

	intOrient : "2",
	PageWidth : "1500",
	PageHeight : "2090",
	strPageName : "B5",
	PRINT_PAGE_PERCENT : "Full-Page",
	HIDE_PAPER_BOARD : true,

	intDispMode : 0,
	intToolMode : 3,
	blDirectPrint : 0,
	inWidth : 0,
	intHeight : 0,
	strTitleButtonCaptoin : "",

	PREVIEW_IN_BROWSE : ""

};

// 全局变量，保存从数据库中获取的配置信息。
var dbSave = {
	dyrwh : '',
	dyscdm : '',
	bbkzbl : '',
	syjgDm : '',
	mzmc_1 : '',
	hjj : '',
	myhs : '',
	whjgDm : '',
	xgryDm : '',
	xgsj : '',
	printer : ''
};

/**
 * 打印初始化
 * @return
 */
function printInit() {
	var doc = document;
	LODOP = getLodop(doc.getElementById('LODOP'), doc
			.getElementById('LODOP_EM'));
}
/*******************************************************************************
 * 本函数根据浏览器类型决定采用哪个对象作为控件实例： IE系列、IE内核系列的浏览器采用oOBJECT，
 * 其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED。
 ******************************************************************************/

/**
 * 获取Lodop
 */
function getLodop(oOBJECT, oEMBED) {
	/***************************************************************************
	 * 本函数根据浏览器类型决定采用哪个对象作为控件实例： IE系列、IE内核系列的浏览器采用oOBJECT，
	 * 其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED。
	 **************************************************************************/
	var strHtml1 = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='../gy/dy/script/install_lodop.exe'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
	var strHtml2 = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='../gy/dy/script/install_lodop.exe'>执行升级</a>,升级后请重新进入。</font>";
	var strHtml3 = "<br><br><font color='#FF00FF'>注意：<br>1：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它;<br>2：如果浏览器表现出停滞不动等异常，建议关闭其“plugin-container”(网上搜关闭方法)功能;</font>";
	var LODOP = oEMBED;
	try {
		if (navigator.appVersion.indexOf("MSIE") >= 0)
			LODOP = oOBJECT;

		if ((LODOP == null) || (typeof (LODOP.VERSION) == "undefined")) {
			if (navigator.userAgent.indexOf('Firefox') >= 0)
				document.documentElement.innerHTML = strHtml3
						+ document.documentElement.innerHTML;
			if (navigator.appVersion.indexOf("MSIE") >= 0)
				document.write(strHtml1);
			else
				document.documentElement.innerHTML = strHtml1
						+ document.documentElement.innerHTML;
			return LODOP;
		} else if (LODOP.VERSION < "6.0.5.6") {
			if (navigator.appVersion.indexOf("MSIE") >= 0)
				document.write(strHtml2);
			else
				document.documentElement.innerHTML = strHtml2
						+ document.documentElement.innerHTML;
			return LODOP;
		}
		// *****如下空白位置适合调用统一功能:*********
//		LODOP.SET_LICENSES("中国软件与技术服务股份有限公司", "851666581718172897677969682941",
//				"", "");

		// *******************************************
		return LODOP;
	} catch (err) {
		document.documentElement.innerHTML = "Error:" + strHtml1
				+ document.documentElement.innerHTML;
		return LODOP;
	}
}

/**
 * 本函数需要在getTaskCodeSetUp函数调用之后使用。 参数：Params,打印替换参数 Task_id printType
 * (0连续打印,一张一张打印。默认为连续打印) isView是否预览(0表示预览，1表示不预览默认预览)
 * 返回：实际打印次数如果返回零，则表示未打印或打印失败。 作者：殷文旭 时间：2011-06-25
 */
function printTask(task_id, params, printType, isView) {

	if (!$chk(printType))
		printType = 0;
	if (!$chk(isView))
		isView = 0;
	//if (!$chk(kshs)) kshs = 0;
	var textCode = getLocalAttribute(task_id, "dyscdm"); // 获取本地保存的打印代码。
	var dyscdmArr = textCode.split(";");
	var printer_id = LODOP.GET_PRINTER_NAME(-1);//getDefaultPrinter(task_id);
	for ( var i = 0, leng = dyscdmArr.length; i < leng; i++) {
		if (/(LODOP.SET_PRINT_PAGESIZE)/i.test(dyscdmArr[i])) {
			eval(dyscdmArr[i] + ";");
		} else if (dyscdmArr[i].indexOf('PRINT_INITA') > 0) {
			if (printer_id != null && printer_id != '') {
				var filename = LODOP.GET_PRINT_INIFFNAME("PrinterPyl");
				//var printer_ids = getDefaultPrinter(task_id);
				var textStr = LODOP.GET_FILE_TEXT(filename);
				var ddpyl = "0";
				var zcpyl = "0";
				var pattern = new RegExp("[//s]+$", "gi");
				var textNr = textStr.replace('\r\n', '');
				textNr = textNr.replace(pattern, '');
				var alllineArr = textNr.split(";");
				var codes = "";
				for ( var j = 0; j < alllineArr.length - 1; j++) {
					var textdyjArr = alllineArr[j].split(",");
					if (textdyjArr[0] == printer_id) {
						ddpyl = textdyjArr[1];
						zcpyl = textdyjArr[2];
						break;
					}

				}
				var cshText = dyscdmArr[i];
				var cshTextArr = cshText.split(",");
				var topvalue = cshTextArr[0];
				var yleftValue = cshTextArr[1];
				var ytopValue = topvalue.substring(topvalue.indexOf('(') + 1,
						topvalue.length);
				var xtopValue = parseInt(ytopValue) + parseInt(ddpyl);
				var xleftValue = parseInt(yleftValue) + parseInt(zcpyl);
				var xInitA = "LODOP.PRINT_INITA(" + xtopValue + ","
						+ xleftValue + "," + cshTextArr[2] + ","
						+ cshTextArr[3] + "," + cshTextArr[4] + ";";
				dyscdmArr[i] = xInitA;
				eval(dyscdmArr[i] + ";");
			} else {
				eval(dyscdmArr[i] + ";");
			}
		} else {
			break;
		}
	}

	if ($chk(printer_id)) {
		LODOP.SET_PRINTER_INDEX(printer_id); // 使用设定打印机
	}

	var leng = params.length;
	if (!leng) {
		return 0;
	}
	var print_times = 0; // 实际打印次数如果返回零，则表示未打印或打印失败。
	for ( var i = 0; i < leng; i++) {
		/*
		 * if (!$chk(params[i].list) && printType == 0) { LODOP.NewPage(); }
		 */

		printLodop(task_id, params[i]); // 调用打印代码
		if (printType == 1 && isView == 0) {
			print_times += LODOP.PREVIEW();
		} else if (printType == 1 && isView == 1) {
			if (LODOP.PRINT()) {
				print_times += 1;
			}
		}
	}

	if (printType == 0 && isView == 0) {
		print_times += LODOP.PREVIEW();
	} else if (printType == 0 && isView == 1) {
		if (LODOP.PRINT()) {
			print_times += 1;
		}
	}

	return print_times;

}

function printLodop(task_id, pages) {
	var startLine = 0;
	var textCodes = getLocalAttribute(task_id, "dyscdm"); // 获取本地保存的打印代码。
	textCodes = textCodes.replace(/[\r\n]/g, "");
	var dyscdmArrs = textCodes.split(";");
	//	var printer_id = getDefaultPrinter(task_id);
	for ( var i = 0, leng = dyscdmArrs.length; i < leng; i++) {
		if (/(LODOP.PRINT_INITA)|(LODOP.SET_PRINT_PAGESIZE)/i
				.test(dyscdmArrs[i])) {
			dyscdmArrs[i] = '';
		} else {
			break;
		}
	}
	textCodes = dyscdmArrs.join(";") + ";";
	var pageArr = textCodes.split(/LODOP.NEWPAGE\(\);/i);
	for ( var k = 0, l = pageArr.length; k < l; k++) {
		var params = pages[k];
		var startLine = 0;
		var paramHash = new Hash(params); // 将参数封装为一个HashMap对象。
		do {
			LODOP.NewPage();
			var textCode = pageArr[k]; // 获取本地保存的打印代码。
			paramHash.each(function(val, key) { // 通过正则表达式替换维护模板中的变量，替换成实际值。
						if (key != "list") {
							//var reg = new RegExp("\\$" + key + "([\\s\\S]*)\\$" + key);
							// textCode = textCode.replace(reg, val);

							var reg = new RegExp('\\$' + key + '.*\\$' + key
									+ '\"', "g");
							var valLx = typeof (val);
							if (valLx == "string") {
								val = val.replace(/[\r\n]/g, "");
								//添加过滤名称中的\
								val = val.replace(/\\/g, '\\\\');

								val = val.replace(/\\\\n/g, '\\n');
								val = val.replace(/\\\\b/g, '\\b');
								val = val.replace(/\\\\r/g, '\\r');
								val = val.replace(/\\\\f/g, '\\f');
								val = val.replace(/\\\\t/g, '\\t');
								val = val.replace(/\\\\\'/g, '\\\'');

								val = val.replace(/\"/g, '\\\"');
							}

							textCode = textCode.replace(reg, val + '"');

						}
					});
			textCode = textCode.split('[PRNSETUP]')[0];
			// 如果没有不定高打印，则直接运行打印代码。
			if (!$defined(params) || !params.list) {
				// textCode = textCode.split('[PRNSETUP]')[0];
				textCode = textCode.replace(/[\r\n]/g, "");
				eval(textCode);
				break;
			}

			// 后续代码处理不定高打印。
			var firstRowHigh = 0; // 第一行明细的高度坐标
			var pageSize = getLocalAttribute(task_id, "myhs"); // 每页最多打印条数。
			var rowSpace = getLocalAttribute(task_id, "hjj"); // 行间距。

			var dyscdmArr = textCode.split(";") // 将打印代码字符格局分号分隔为一个数组。

			for ( var i = 0, leng = dyscdmArr.length; i < leng; i++) {
				if (/(LODOP.PRINT_INIT)|(LODOP.SET_PRINT_PAGESIZE)/i
						.test(dyscdmArr[i])) {
					dyscdmArr[i] = "";
				} else {
					break;
				}
			}

			var leng = dyscdmArr.length; // 获取代码行数。
			var ok = 0; // 循环使用的标记，主要作用是找到一个行元素记录状态，同时获取接下来的所有样式设置代码。
			var templateArr = []; // 行模板代码。通过模板克隆出多行。
			debugger;
			var listRowHigh = 0;//列表的行高
			for ( var i = 0; i < leng; i++) {
				// 获取针对行元素的样式设置代码。
				var lineCode = dyscdmArr[i];
				if (ok == 1 && lineCode.search(/LODOP\.SET_PRINT_STYLEA/) != -1) {
					templateArr[templateArr.length] = lineCode;
					dyscdmArr[i] = "";
				} else {
					ok = 0;
				}
				// 获取行元素代码。
				if (lineCode.search(/\^([^\^]+)\^/) != -1) {
					index = lineCode.search(/[0-9]+/);
					if (index != -1) {
						firstRowHigh = lineCode.substring(index, lineCode
								.search(/,/));
						firstRowHigh = parseInt(firstRowHigh);
						first = lineCode.substring(0, index);
						last = lineCode.substring(lineCode.search(/,/));
						lineCode = first + "^__^" + last;
					}

					var listCsArr = [];//获取list宽高相关参数
					var listCsz = lineCode.lastIndexOf(",");
					var listCsStr = lineCode.substring(index, listCsz);
					listCsArr = listCsStr.split(",");
					//第四个参数为行高
					if (parseFloat(listCsArr[3]) > parseFloat(listRowHigh)) {
						listRowHigh = parseFloat(listCsArr[3]);
					}

					templateArr[templateArr.length] = lineCode;
					dyscdmArr[i] = "";
					ok = 1
				}
			}

			var templageStr = templateArr.join(";") + ";";
			var runCode = "";
			// 根据行模板克隆出多行数据，并设定行高。
			var i = startLine;
			startLine = startLine + parseFloat(pageSize);
			var paramLeng = params.list.length;
			var listArr = templageStr.split(";")
			for (; i < paramLeng && i < startLine; i++) {
				runCode += templageStr;
				var list = params.list;

				var lineHash = new Hash(list[i]);
				lineHash.each(function(val, key) {
					var reg = new RegExp("\"([^\"]*)\\\^" + key + "\\\^");
					var valLx = typeof (val);
					if (valLx == "string") {
						val = val.replace(/[\r\n]/g, "");
						val = val.replace(/\"/g, '\\\"');
					}

					runCode = runCode.replace(reg, "\"" + val);
					runCode = runCode.replace(/\^__\^/, firstRowHigh);
				});

				firstRowHigh = parseInt(firstRowHigh) + parseInt(listRowHigh);
			}
			eval(dyscdmArr.join(";") + runCode);

		} while (startLine < (params.list ? params.list.length : 0))
	}
}

/*******************************************************************************
 * 获取本地所有可用打印机列表 返回：返回二维数组[[打印机编号1,打印机1],[打印机编号2,打印机2]]。如果没有打印机则返回null 作者：殷文旭
 * 时间：2011-06-25
 */
function getPrinters() {
	var iPrinterCount = LODOP.GET_PRINTER_COUNT(); // 获取打印机总数
	if (iPrinterCount == 0) {
		return null;
	}
	var printers = [];
	for ( var i = 0; i < iPrinterCount; i++) {

		var printer = [];
		printer[0] = i;
		printer[1] = LODOP.GET_PRINTER_NAME(i);
		printers[printers.length] = printer;
	}
	return printers;
}

/*******************************************************************************
 * 根据task_id获取本地默认打印机 返回：打印机编号 作者：殷文旭 时间：2011-06-25
 */
function getDefaultPrinter(task_id) {
	return getLocalAttribute(task_id, "printer");
}

/*******************************************************************************
 * 根据task_id,jg_dm获取最新版打印配置参数代码用来绘制维护界面。 参数：task_id表示打印任务唯一表示(必须),
 * jg_dm表示同步机关的代码(必须)。 返回：true表示绘制维护界面成功,false表示绘制维护界面失败。 作者：殷文旭 时间：2011-06-25
 */
function getTaskCodeSetUp(task_id, jg_dm) {
	if (!$chk(task_id))
		return false;
	if (!$chk(jg_dm))
		return false;
	getRemoteData(task_id, jg_dm); // 请求远程数据
	var TextCode = dbSave.dyscdm;
	if (!$chk(TextCode))
		return false;
	var dyscdmArr = TextCode.split(";");
	var init = '';
	for ( var i = 0, leng = dyscdmArr.length; i < leng; i++) {
		if (/(LODOP.PRINT_INIT)|(LODOP.SET_PRINT_PAGESIZE)/i.test(dyscdmArr[i])) {
			init += dyscdmArr[i] + ";";
			dyscdmArr[i] = "";
		} else {
			break;
		}
	}
	dbSave.dyscdm = '';
	var pageArr = dyscdmArr.join(";").split(/LODOP.NEWPAGE\(\);/i);
	for ( var j = 0, leng = pageArr.length; j < leng; j++) {
		dbSave.dyscdm = dbSave.dyscdm == '' ? dbSave.dyscdm
				: dbSave.dyscdm + 'LODOP.NEWPAGE();';
		var result = init.match(/LODOP.PRINT_INIT\("([^)"]+)/i);
		if (result) {
			eval(init.replace(/LODOP.PRINT_INIT\("([^)"]+)/i,
					'LODOP.PRINT_INIT\("' + result[1] + j)
					+ pageArr[j]);
		} else {
			eval(init + pageArr[j]);
		}

		// LODOP.SET_PRINT_MODE("PRINT_SETUP_PROGRAM", 1);
		// LODOP.ADD_PRINT_SETUP_BKIMG(LODOP_CONFIG.BACKGROUND_IMG);
		// LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW",LODOP_CONFIG.BKIMG_IN_PREVIEW);

		// LODOP.SET_SHOW_MODE("BKIMG_WIDTH",LODOP_CONFIG.BKIMG_WIDTH);
		// LODOP.SET_SHOW_MODE("BKIMG_HEIGHT",LODOP_CONFIG.BKIMG_HEIGHT);
		// LODOP.SET_PRINT_PAGESIZE(("intOrient",LODOP_CONFIG.intOrient),("PageWidth",LODOP_CONFIG.PageWidth),("PageHeight",LODOP_CONFIG.PageHeight),("strPageName",LODOP_CONFIG.strPageName));
		// LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",LODOP_CONFIG.PRINT_PAGE_PERCENT);
		// LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD",LODOP_CONFIG.HIDE_PAPER_BOARD);
		// LODOP.SET_PREVIEW_WINDOW(LODOP_CONFIG.intDispMode,LODOP_CONFIG.intToolMode,LODOP_CONFIG.blDirectPrint,LODOP_CONFIG.inWidth,LODOP_CONFIG.intHeight,LODOP_CONFIG.strTitleButtonCaptoin);
		// LODOP.SET_SHOW_MODE("PREVIEW_IN_BROWSE",LODOP_CONFIG.PREVIEW_IN_BROWSE);
		// LODOP.ADD_PRINT_SETUP_BKIMG("../print/chenying.jpg");

		var dm = LODOP.PRINT_SETUP();
		// dm = dm.replace(/LODOP.PRINT_INIT([^)]+)\);/i,'');
		// dm = dm.replace(/LODOP.SET_PRINT_PAGESIZE([^)]+)\);/i,'');
		// dm = dm.replace(/LODOP.SET_PRINT_MODE([^)]+)\);/i,'');
		dm = LODOP.GET_VALUE("ProgramCodes", 0);
		dbSave.dyscdm += dm;
	}
	// dbSave.dyscdm = init + dbSave.dyscdm;
	dbSave.dyscdm = dbSave.dyscdm;
	return true;
}

/*******************************************************************************
 * 保存最新版打印配置参数代码到数据库中。 返回：true表示绘制维护界面成功,false表示绘制维护界面失败。 作者：殷文旭 时间：2011-06-25
 */
function setTaskCodeSetUp(hjj, myhs) {
	if (!$chk(dbSave)) {
		return false;
	}

	dbSave.hjj = hjj || dbSave.hjj;
	dbSave.myhs = myhs || dbSave.myhs;

	var result = false;
	// 调用远程方法保存数据到数据库中。
	saveRemoteData();
	return result;
	function saveRemoteData() {
		var req = {
			'ctrl' : 'DY001DycspzCtrl_updateTaskCode',
			'data' : dbSave,
			'async' : false,
			'onSuccess' : function(res) {
				result = true;
			}
		};
		jsDelegate(req);
	}
}

function getLocalTaskCode(task_id) {

	var textCode = getLocalAttribute(task_id, "dyscdm");
	var headerOptions = getLocalAttribute(task_id, "attributes");
	var dyscdmArr = textCode.split(";");
	var init = '';
	for ( var i = 0, leng = dyscdmArr.length; i < leng; i++) {
		if (/(LODOP.PRINT_INIT)|(LODOP.SET_PRINT_PAGESIZE)/i.test(dyscdmArr[i])) {
			init += dyscdmArr[i] + ";";
			dyscdmArr[i] = "";
		} else {
			break;
		}
	}
	dbSave.dyscdm = '';
	var pageArr = dyscdmArr.join(";").split(/LODOP.NEWPAGE\(\);/i);
	for ( var j = 0, leng = pageArr.length; j < leng; j++) {
		dbSave.dyscdm = dbSave.dyscdm == '' ? dbSave.dyscdm
				: dbSave.dyscdm + 'LODOP.NEWPAGE();';
		var result = init.match(/LODOP.PRINT_INIT\("([^)"]+)/i);
		if (result) {
			eval(init.replace(/LODOP.PRINT_INIT\("([^)"]+)/i,
					'LODOP.PRINT_INIT\("' + result[1] + j)
					+ pageArr[j]);
		} else {
			eval(init + pageArr[j]);
		}
		LODOP.SET_PRINT_MODE("PRINT_SETUP_PROGRAM", 1);
		LODOP.SET_SHOW_MODE("SETUP_ENABLESS", "10000000000001");
		var dm = LODOP.PRINT_SETUP();
		dm = dm.replace(/LODOP.PRINT_INITA([^)]+)\);/i, '');
		dm = dm.replace(/LODOP.SET_PRINT_PAGESIZE([^)]+)\);/i, '');
		dm = dm.replace(/LODOP.SET_PRINT_MODE([^)]+)\);/i, '');
		dbSave.dyscdm += dm;
	}
	dbSave.dyscdm = init + dbSave.dyscdm;
	dbSave.dyrwh = task_id;
	dbSave.syjgDm = headerOptions[1];
	dbSave.bbkzbl = headerOptions[2];
	dbSave.myhs = headerOptions[3];
	dbSave.hjj = headerOptions[4];
	dbSave.printer = headerOptions[5];
	return true;

}

function setLocalTaskCode(printer_id) {

	var task_id = dbSave.dyrwh;
	if (!$chk(task_id)) {
		return false;
	}
	dbSave.printer = printer_id;
	if ($chk(printer_id)) {
		setLocalAttribute(task_id, "printer", printer_id);
	}

	if ($chk(dbSave.dyscdm)) {
		setLocalAttribute(task_id, "dyscdm", dbSave.dyscdm);
		return true;
	} else {
		return false;
	}

}

/**
 * 根据任务名和机关代码判断本地持有版本是否与上级机构下发版本一致。 区别于bbkzblValidation,本方法将覆盖页面内容给予用户提示信息。
 * true表示版本一致 false表示版本不一致 作者：殷文旭 时间：2011-06-25
 */
function versionValidationShowMessage(task_id, jg_dm, message) {
	if (!versionValidation(task_id, jg_dm)) {
		versionValidationMessage(message);
		return false;
	}
	return true;
}
/*******************************************************************************
 * 如果本地打印样式版本不是最新版本则覆盖页面已构建元素，显示提示信息，指导用户更新版本。 针对IE于非IE浏览器不同代码中有特殊处理。 无返回值
 * 作者：殷文旭 时间：2011-06-25
 */
function versionValidationMessage(mesg) {
	var doc = document;
	var message = "本打印样式已经更新，请您及时通过【打印维护】功能同步打印样式！";
	if ($chk(mesg)) {
		message = mesg;
	}

	if (navigator.appVersion.indexOf("MSIE") >= 0) {
		doc.write(message);
	} else {
		doc.documentElement.innerHTML = message;
	}
}

/**
 * 根据任务名和机关代码判断本地持有版本是否与上级机构下发版本一致。 true表示版本一致 false表示版本不一致 作者：殷文旭 时间：2011-06-25
 */
function versionValidation(task_id, jg_dm) {
	if (!$chk(task_id))
		return false;
	if (!$chk(jg_dm))
		return false;
	var bbkzbl = getLocalAttribute(task_id, "bbkzbl");
	if (!$chk(bbkzbl) || bbkzbl == 0) {
		dbSave.dyscdm = "";
		return false
	}
	;

	var remoteVersion = 0;

	var data = {
		TASK_ID : task_id,
		SYJG : jg_dm
	};
	getRemoteData(task_id, jg_dm);

	remoteVersion = dbSave.bbkzbl;

	if (isNaN(parseInt(bbkzbl)) || isNaN(parseInt(remoteVersion))) {
		return false;
	} else if (parseInt(bbkzbl) == parseInt(remoteVersion)) {
		return true;
	}
	return false;
}

/*******************************************************************************
 * 根据任务名和机关代码将本地代码同步为最新下发版本 参数：task_id表示打印任务唯一表示(必须),
 * jg_dm表示同步机关的代码(可选)，首次同步不准为空。 返回：true表示同步成功,false表示同步失败 作者：殷文旭 时间：2011-06-25
 */
function versionSynchronize(task_id, jg_dm) {
    if (!$chk(task_id)) return false;

    if (!$chk(jg_dm)) return false;
    if (!$chk(dbSave.dyscdm))  
    	getRemoteData(task_id, jg_dm); // 请求远程数据
    if (!$chk(dbSave.dyscdm))
    	return false;
    	
    return setLocalAttribute(task_id, "all", task_id + "|" + jg_dm + "|" + dbSave.bbkzbl + "|" + dbSave.myhs + "|" + dbSave.hjj + "|;" + dbSave.dyscdm); // 将所有参数一次性同步到本地样式存档文件中。

}

/**
 * 功能:根据task_id将键对应的属性值保存到本地打印配置存档文件中。 key目前仅支持 "task_id","bbkzbl", "jg_dm",
 * "dyscdm","printer","hjj","myhs","all","attributes"
 * 返回值，如果获取到属性值则返回，如果未找到对应的属性值则返回null 作者：殷文旭 时间：2011-06-25
 */
function setLocalAttribute(task_id, key, value) {

    if (task_id == null || task_id == "") return false;
    var filename = LODOP.GET_PRINT_INIFFNAME(task_id); // 获取本地打印配置存档文件名

    if (filename == null || filename == "") return false;

    if (key == "all" && $chk(value)) {
        if ("ok" == LODOP.WRITE_FILE_TEXT(0, filename, value)) {
            return true;
        }
        return false;
    }

    var allStr = "";
    var textHeadArr = getLocalAttribute(task_id, "attributes");
    var textCode = getLocalAttribute(task_id, "dyscdm");

    if (key == "attributes" && $chk(value)) {
        if ("ok" == LODOP.WRITE_FILE_TEXT(0, filename, value + textCode)) {
            return true;
        }
        return false;
    }

    if (key == "task_id" && $chk(value)) {
        textHeadArr[0] = value;
    }
    if (key == "jg_dm" && $chk(value)) {
        textHeadArr[1] = value;
    }
    if (key == "bbkzbl" && $chk(value)) {
        textHeadArr[2] = value;
    }
    if (key == "myhs" && $chk(value)) {
        textHeadArr[3] = value;
    }
    if (key == "hjj" && $chk(value)) {
        textHeadArr[4] = value;
    }
    if (key == "printer" && $chk(value)) {
        textHeadArr[5] = value;
    }

    textHeadStr = textHeadArr.join("\|");
    if (key == "dyscdm") {
        textCode = value;
    }
    allStr = textHeadArr.join("|") + ";" + textCode;

    if ("ok" == LODOP.WRITE_FILE_TEXT(0, filename, allStr)) {
        return true;
    }
    return false;
}

/**
 * 功能:根据task_id及键获取本次保存的属性值。 key目前仅支持 "task_id","bbkzbl", "jg_dm",
 * "dyscdm","printer","all","attributes","hjj","myhs"
 * 返回值，如果获取到属性值则返回，如果未找到对应的属性值则返回null 作者：殷文旭 时间：2011-06-25
 */

function getLocalAttribute(task_id, key) {
    if (!$chk(task_id)) return null;
    var filename = LODOP.GET_PRINT_INIFFNAME(task_id); // 获取本地打印配置存档文件名

    if (!$chk(filename)) return null;

    var textStr = LODOP.GET_FILE_TEXT(filename);        // 获取文档全部内容。
    if (textStr == null || textStr == "" || textStr.trim() == "") {
        return null;
    }

    if (key == "all") {
        return textStr;
    }
    var alllineArr = textStr.split(";");
    var textHead = alllineArr[0];
    var textHeadArr = textHead.split("\|");                       // 获得属性头数组
    if (key == "attributes") {
        return textHeadArr;
    }
    var textCode = alllineArr.slice(1).join(";");                   // 获得代码

    if (key == "dyscdm") {
        if (textCode == null || textCode.trim() == "") {
            return null;
        }
        return textCode;
    }
    var valueLength = 0;
    var val = "";
    if (key == "task_id") {
        val = textHeadArr[0];
        return attributeIsNull(val);
    }
    if (key == "jg_dm") {
        val = textHeadArr[1];
        return attributeIsNull(val);
    }
    if (key == "bbkzbl") {
        val = textHeadArr[2];
        return attributeIsNull(val);
    }
    if (key == "myhs") {
    	val = textHeadArr[3];
    	return attributeIsNull(val);
    }
    if (key == "hjj") {
    	val = textHeadArr[4];
    	return attributeIsNull(val);
    }
    if (key == "printer") {
        val = textHeadArr[5];
        return attributeIsNull(val);
    }
    return null;
}



// 判断字符串儿是否为空，val为待判定字符串,仅支持getLocalAttribute函数使用。
function attributeIsNull(val) {

    if (val == null || val.trim() == "") {
        return null;
    }
    return val;
}

function getRemoteData(task_id, jg_dm) {
    var data = { 'dyrwh': task_id, 'syjgDm': jg_dm };
    var req = {
        'ctrl': 'DY001DycspzCtrl_getTaskCode',
        'data': data,
        'async': false,
        'onSuccess': function (res) {
        	if($chk(res.data) && $chk(res.data[0].data)){
        		var resultData = res.data[0].data;
        		for( var e in resultData ){
        			dbSave[e] = resultData[e].value;
        		}
        	}
            if (!$chk(dbSave.hjj)) {
            	dbSave.hjj = 20;
            }
            if (!$chk(dbSave.myhs)) {
            	dbSave.myhs = 10;
            }
        }
    };
    jsDelegate(req);
}

/**
 *  获取打印系统参数
 * @param tdmbbh
 * @param swjgDm
 * @return
 */
function getCsxx(tdmbbh,swjgDm){	
	var data = { 'tdmbbh': tdmbbh, 'swjgDm': swjgDm };
    var req = {
        'ctrl': 'DY001DycsxxCtrl_getCsxx',
        'data': data,
        'tdmbbh': tdmbbh,
        'swjgDm': swjgDm,
        'async': false,
        'onSuccess' : function(res) {
    	if($chk(res.data) && $chk(res.data[0])){
    		dbSave.bbkzbl=res.getAttr('bbkzbl');
    		dbSave.dyrwh=res.getAttr('dyrwh');
    		dbSave.syjgDm=res.getAttr('syjgDm');
    		dbSave.myhs=res.getAttr('myhs');
    	}
	}

    };
    jsDelegate(req);  
}

function setLocalByFilename(task_id,key,hjj,myhs,jg_dm,bbkzbl,code,printer){
	// getLocalTaskCode(task_id);
	 var filename = LODOP.GET_PRINT_INIFFNAME(task_id); // 获取本地打印配置存档文件名
	 dbSave.hjj = hjj || dbSave.hjj;
	 dbSave.myhs = myhs || dbSave.myhs;
     dbSave.dyscdm=code || dbSave.dyscdm;
     dbSave.printer=printer||dbSave.printer;
     var code=task_id + "|" + jg_dm + "|" + bbkzbl + "|" + dbSave.myhs + "|" + dbSave.hjj +"|"+dbSave.printer+"|;" + dbSave.dyscdm;
	    if (filename == null || filename == "") return false;

	    if (key == "all" && $chk(code)) {
	        if ("ok" == LODOP.WRITE_FILE_TEXT(0, filename, code)) {
	            return true;
	        }
	        return false;
	    }

}

function getDyrwh(tdmbbh,swjgDm){
	 var data = { 'tdmbbh': tdmbbh, 'swjgDm': swjgDm };
	    var req = {
	        'tid': 'dy002getDyrwh',
	        'data': data,
	        'async': false,
	        'onSuccess' : function(res) {
	    	if($chk(res.data)&& $chk(res.data[0])){
	    		dbSave.dyrwh=res.getAttr('dyrwh');
     		
	    	}
		}

	    };
	    jsDelegate(req);
}

/*******************************************************************************
 * 根据task_id,jg_dm获取最新版打印配置参数代码用来绘制维护界面。 参数：task_id表示打印任务唯一表示(必须),
 * jg_dm表示同步机关的代码(必须)。 返回：true表示绘制维护界面成功,false表示绘制维护界面失败。 作者：殷文旭 时间：2011-06-25
 */
function getCodeDesignUp(task_id, jg_dm) {
    if (!$chk(task_id)) return false;
    if (!$chk(jg_dm)) return false;
    getRemoteData(task_id, jg_dm); // 请求远程数据
    var TextCode = dbSave.dyscdm;
    var ycTools='LODOP.SET_SHOW_MODE("HIDE_ABUTTIN_SETUP",1);';
	var ycyyan='LODOP.SET_SHOW_MODE("SETUP_ENABLESS",10000000000001);';
    TextCode=TextCode+ycyyan+ycTools;
    dbSave.dyscdm=TextCode;
    if (!$chk(TextCode)) return false;
    var dyscdmArr = TextCode.split(";");
    var init = '';
    for(var i = 0,leng = dyscdmArr.length; i < leng; i++){
    	if(/(LODOP.PRINT_INIT)|(LODOP.SET_PRINT_PAGESIZE)/i.test(dyscdmArr[i])){
    		init += dyscdmArr[i] + ";";
    		dyscdmArr[i] = "";
    	}else{
    		break;
    	}
    }
    dbSave.dyscdm = '';
    var pageArr = dyscdmArr.join(";").split(/LODOP.NEWPAGE\(\);/i);
    for(var j = 0, leng = pageArr.length; j < leng ; j++){
    	dbSave.dyscdm = dbSave.dyscdm == '' ? dbSave.dyscdm : dbSave.dyscdm + 'LODOP.NEWPAGE();';
    	var result = init.match(/LODOP.PRINT_INIT\("([^)"]+)/i);
    	if(result){
    		eval(init.replace(/LODOP.PRINT_INIT\("([^)"]+)/i, 'LODOP.PRINT_INIT\("' + result[1] + j) + pageArr[j]);
    	}else{
    		eval(init + pageArr[j]);
    	}
    	
    	var dm = LODOP.PRINT_SETUP();
    	dbSave.dyscdm += dm;
    }
   
    dbSave.dyscdm = init + dbSave.dyscdm;
    return true;  
}

/**
 * 解析Form---JSON变成数组
 * @param printData
 * 2012-07-31  
   
 * @return
 */
function TranslationFormData (printData) {
	var jsonobj=JSON.decode(printData);
	var data=jsonobj.data;
	var resData = {};
	var resDataArr= new Array();　
	for (var key in data) {
		resDataArr.push(key+':'+data[key].value);
	}
	
	return resDataArr;
}
/**
 * 解析Grid---JSON变成数组
 * 2012-07-31 
 * @return
 */
function transferGridData(printData){
	var jsonobj=JSON.decode(printData);
	var data=jsonobj.data;
	var resGridArr=[];
	var resGridArrList=[];
	var resData = {};

	for(var i=0;i<data.length;i++){
		var datas=data[i];
		var trs=datas.trs;
		
		for(var j=0;j<trs.length;j++){
			var tds=trs[j].tds;
			var gridStr='';
			for(var key in tds){
				tds[key] = tds[key].value;
			}
			resGridArrList[j]=tds;
		}
		
	}
	if ($chk(resGridArrList))
		resGridArr[0] = {
			list : resGridArrList
		};
	return resGridArr;
}	 

/**
*本函数需要在getTaskCodeSetUp函数调用之后使用。
*参数：Params,打印替换参数,fontParams字体大小动态替换
*      Task_id
*      printType (0连续打印,一张一张打印。默认为连续打印)
*      isView是否预览(0表示预览，1表示不预览默认预览)
       ksHs 开始行数
*返回：实际打印次数如果返回零，则表示未打印或打印失败。
*作者：金立楠
*时间：2012-08-1
*/
function printParamsFontTask(task_id, params, printType, isView,ksHs,fontParams) {

    if (!$chk(printType)) printType = 0;
    if (!$chk(isView)) isView = 0;
    if (!$chk(ksHs)) ksHs = 0;
    var textCode = getLocalAttribute(task_id, "dyscdm");  //获取本地保存的打印代码。
    var dyscdmArr = textCode.split(";");
    for(var i = 0,leng = dyscdmArr.length; i < leng; i++){
    	if(/(LODOP.PRINT_INIT)|(LODOP.SET_PRINT_PAGESIZE)/i.test(dyscdmArr[i])){
    		eval(dyscdmArr[i] + ";");
    	}else{
    		break;
    	}
    }
    var printer_id = getDefaultPrinter(task_id);
    if ($chk(printer_id)) {
        LODOP.SET_PRINTER_INDEX(printer_id); //使用设定打印机
    }

    var leng = params.length;
    if (!leng) {
        return 0;
    }
    var print_times = 0;     //实际打印次数如果返回零，则表示未打印或打印失败。
    for (var i = 0; i < leng; i++) {
      /*  if (!$chk(params[i].list) && printType == 0) {
            LODOP.NewPage();
        }*/

        printParamsFont(task_id, params[i],ksHs,fontParams); //调用打印代码
        if (printType == 1 && isView == 0) {
            print_times += LODOP.PREVIEW();
        } else if (printType == 1 && isView == 1) {
            if (LODOP.PRINT()) {
                print_times += 1;
            }
        }
    }
    
    if (printType == 0 && isView == 0) {
        print_times += LODOP.PREVIEW();
    } else if (printType == 0 && isView == 1) {
        if (LODOP.PRINT()) {
            print_times += 1;
        }
    }

    return print_times;

}

function printParamsFont(task_id, pages,ksHs,fontParams) {
	
    var startLine = 0;
    var textCodes = getLocalAttribute(task_id, "dyscdm");  //获取本地保存的打印代码。
    textCodes=textCodes.replace(/[\r\n]/g, "");
    var dyscdmArrs = textCodes.split(";");
    for(var i = 0,leng = dyscdmArrs.length; i < leng; i++){
    	if(/(LODOP.PRINT_INIT)|(LODOP.SET_PRINT_PAGESIZE)/i.test(dyscdmArrs[i])){
    		dyscdmArrs[i] = '';
    	}else{
    		break;
    	}
    }
    textCodes  = dyscdmArrs.join(";") + ";";
    var pageArr = textCodes.split(/LODOP.NEWPAGE\(\);/i);
    for(var k = 0, l = pageArr.length; k < l; k++){
    var params = pages[k];
     var startLine = 0;
    var paramHash = new Hash(params);                   //将参数封装为一个HashMap对象。
    do {
    	LODOP.NewPage();
        var textCode = pageArr[k];  //获取本地保存的打印代码。
        paramHash.each(function (val, key) {                //通过正则表达式替换维护模板中的变量，替换成实际值。 
            if (key != "list") {
                //var reg = new RegExp("\\" + key + "([\\s\\S]*)\\" + key+"$/i");
            	var reg = new RegExp('\\$'+key+'.*\\$'+key+'\"',"g");
            	var valLx=typeof(val);
                if(valLx=="string"){
            	val=val.replace(/[\r\n]/g, "");
            	//添加过滤名称中的\
                val=val.replace(/\\/g,'\\\\');           
                
                val=val.replace(/\\\\n/g,'\\n');	
                val=val.replace(/\\\\b/g,'\\b');	
                val=val.replace(/\\\\r/g,'\\r');
                val=val.replace(/\\\\f/g,'\\f');
                val=val.replace(/\\\\t/g,'\\t');
                val=val.replace(/\\\\\'/g,'\\\'');
            	
            	val=val.replace(/\"/g,'\\\"');
            	}
                
                textCode = textCode.replace(reg, val+'"');

            }
        });
        var leng = fontParams.length;
        if (!leng) {
            return 0;
        }
        for(var i=0;i<leng;i++){
        	var fontparam=fontParams[i];
        	 var fontparamHash = new Hash(fontparam); 
        	 fontparamHash.each(function (val, key) {  //通过正则表达式替换维护模板中的变量，替换成实际值。
                 if (key != "list") {
                 //	var reg = new RegExp('\\$'+key+'.*\\$'+key+'\"',"g");
                     textCode = textCode.replace(key, val);

                 }
             });
        }

        //如果没有不定高打印，则直接运行打印代码。
        if (!$defined(params) || ! params.list) {
        	textCode=textCode.replace(/[\r\n]/g, ""); 
            eval(textCode);
            break;
        }

        //后续代码处理不定高打印。
        var firstRowHigh = 0;                               //第一行明细的高度坐标
        var pageSize = getLocalAttribute(task_id, "myhs");                                //每页最多打印条数。
        var rowSpace = getLocalAttribute(task_id, "hjj");                                  //行间距。

        var dyscdmArr = textCode.split(";")                 //将打印代码字符格局分号分隔为一个数组。

        for(var i = 0,leng = dyscdmArr.length; i < leng; i++){
        	if(/(LODOP.PRINT_INIT)|(LODOP.SET_PRINT_PAGESIZE)/i.test(dyscdmArr[i])){
        		dyscdmArr[i] = "";
        	}else{
        		break;
        	}
        }
        
        var leng = dyscdmArr.length;                          //获取代码行数。                 
        var ok = 0;                                         //循环使用的标记，主要作用是找到一个行元素记录状态，同时获取接下来的所有样式设置代码。
        var templateArr = [];                               //行模板代码。通过模板克隆出多行。

        for (var i = 0; i < leng; i++) {
            //获取针对行元素的样式设置代码。
            var lineCode = dyscdmArr[i];
            if (ok == 1 && lineCode.search(/LODOP\.SET_PRINT_STYLEA/) != -1) {
                templateArr[templateArr.length] = lineCode;
                dyscdmArr[i] = "";
            } else {
                ok = 0;
            }
            //获取行元素代码。
            if (lineCode.search(/\^([^\^]+)\^/) != -1) {
                index = lineCode.search(/[0-9]+/);
                if (index != -1) {
                    firstRowHigh = lineCode.substring(index, lineCode.search(/,/));
                    firstRowHigh = parseInt(firstRowHigh) + parseInt(ksHs*rowSpace);
                    first = lineCode.substring(0, index);
                    last = lineCode.substring(lineCode.search(/,/));
                    lineCode = first + "^__^" + last;
                }

                templateArr[templateArr.length] = lineCode;
                dyscdmArr[i] = "";
                ok = 1
            }
        }

        var templageStr = templateArr.join(";") + ";";
        var runCode = "";
        //根据行模板克隆出多行数据，并设定行高。
        var i = startLine;
        startLine = startLine + parseFloat(pageSize);
        var paramLeng = params.list.length;
        for (; i < paramLeng && i < startLine; i++) {
            runCode += templageStr;
            var list = params.list;

            var lineHash = new Hash(list[i]);
            lineHash.each(function (val, key) {
                var reg = new RegExp("\"([^\"]*)\\\^" + key + "\\\^");
                var valLx=typeof(val);
                if(valLx=="string"){
                val=val.replace(/[\r\n]/g, "");
                val=val.replace(/\"/g,'\\\"');
                }
                
                runCode = runCode.replace(reg, "\"" + val);
                runCode = runCode.replace(/\^__\^/, firstRowHigh);
            });

            firstRowHigh = parseInt(firstRowHigh) + parseInt(rowSpace);
        }
        eval(dyscdmArr.join(";")+ runCode);
      
    } while (startLine < (params.list ? params.list.length : 0))
    }
}
function SzmrDyj(task_id,params){
	var viewBtn = new SwordSubmit();
	viewBtn.setTid("Dy004InitView");
	viewBtn.pushData('dyrwh',task_id);
//	viewBtn.pushData('params',params);
//	viewBtn.pushData('printType',printType);
//	viewBtn.pushData('isView',isView);
//	swordAlertIframe('', {
//		titleName : "默认打印机/偏移量设置",
//		width : 700,
//		height : 300,
//		param : window,
//		isNormal : 'true',
//		isMax : 'true',
//		isClose : 'true',
//		isMin : "true",
//		submit : viewBtn
//		});
	
//	var param = '';
	var glgxBh= 'GGGL_DYPYLPZ';
//	var localQxxx = decodeURI(location.search).substring(decodeURI(location.search).indexOf("&"));
	var localQxxx = '';
	var  bbb=parent.callserv||top.callserv;
	bbb("&dyrwh="+task_id+"&params="+params,glgxBh, localQxxx);

}