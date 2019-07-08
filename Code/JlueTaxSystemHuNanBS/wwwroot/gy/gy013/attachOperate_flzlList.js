var ATTACH_FlZL_JSOBJ = (function() {
	var slswsxDm = "";// 受理税务事项代码
	var slswsxmc = "";// 受理税务事项名称
	var ywzj = ""; // 业务主键
	var zgswjDm = ""; // 主管税务局代码
	var slswsxDm = ""; // 受理税务事项代码
	var nsrsbh = ""; // 纳税人识别号
	var strSeparator = "T0]kEn";
	function queryFlzl(slswsxDm, ywzj) {// 查询附列资料、基本信息
		var queryBtn = new SwordSubmit();
		queryBtn.pushData('slswsxDm', slswsxDm);
		queryBtn.pushData('ywzj', ywzj);
		queryBtn.setOptions({
			async : "true",
			mask : "false",
			ctrl : "GY013AttachOperateCtrl_initFlzl",
			onSuccess : function(req, res) {
				slswsxDm = res.getAttr('slswsxDm');
				slswsxmc = res.getAttr('slswsxmc');
				//增加附列资料上传开关控制begin
				var ftpkg = res.getAttr("ftpkg");
				var flzlGrid = document.getElementById("ftpkg");
				if("Y"==ftpkg){
					flzlGrid.style.display = "none";
				}
				//附列资料开关end
			}
		});
		queryBtn.submit();
	}
	function getFlzlList() { // 得到需要增加附件
		var flzlDm = "";
		var fileMsg = "";
		var flzlGrid = $w("flzlGrid");
		var rowsData = flzlGrid.getAllGridData().trs;// 表格的所有数据中的每一行数据
		var rtnStr = "";
		for (var i = 0; i < rowsData.length; i++) {
			fileMsg = rowsData[i].tds.serverFileName.value;
			flzlDm = rowsData[i].tds.flzlDm.value;
			var wjmArr = new Array(); // 本行需要新增的文件
			if ($chk(fileMsg)) {
				// 获取本行所有需要新增的文件数组
				var uuidArr = fileMsg.split(",");
				for (var j = 0; j < uuidArr.length; j++) {
					if ($chk(uuidArr[j])) {
						var tmpArr = uuidArr[j].split(strSeparator);
						if (tmpArr[0] == "noUuid") {
							wjmArr.push(uuidArr[j]);
						}
					}
				}
				// 组装本行所有需要新增的文件名和路径，格式：附列资料_路径_文件名,附列资料_路径_文件名
				if ($chk(wjmArr) && wjmArr.length > 0) {
					for (var m = 0; m < wjmArr.length; m++) {
							var lineFile = wjmArr[m].split(strSeparator);
							rtnStr = rtnStr + flzlDm + strSeparator + lineFile[3] + strSeparator
							+ lineFile[4] + ",";
					}
				}
			}
		}
		if ($chk(rtnStr)) {
			rtnStr = rtnStr.substr(0, rtnStr.length - 1);
		}
		return rtnStr;
	}
	setTimeout(function() { // 当后台返回值中包含流程税务事项代码时，附列资料可直接根据流程税务事项代码获取
		if (typeof pc != "undefined") {
			slswsxDm = pc.getInitData().getAttr('slswsxDm');// 获取流程税务事项代码,
			ywzj = pc.getInitData().getAttr('ywzj');// 获取业务主键,
			if ($chk(slswsxDm)) {// 当是默认流程时，初始化会存在流程税务事项代码
				queryFlzl(slswsxDm, ywzj);
			}
		} else {
			setTimeout(arguments.callee, 10);
		}
	}, 10);
	function flushFlzlGrid() {
		var flzlGrid = $w("flzlGrid");
		var dataDivs = flzlGrid.dataDiv().getChildren();
		dataDivs.each(function(dataDiv, index) {
			var rowData = flzlGrid.getOneRowData(dataDiv);
			var row = flzlGrid.getRow(dataDiv);
			// 采集状态
			var flzlzt = rowData.getValue("flzlzt");
			// 若当前附列资料为必采，但尚未采集，则将变量isCjCompletely赋值为N，并将必采集但未采集所在行标红
			if (flzlzt == 'N' || flzlzt == null) { // 未采集
				row.setStyle("color", "red");
				row.disable('qc');// 将清除置为不可用
				row.enable('cj');// 将采集置为可用
			} else { // 采集
				//row.setStyle("color", "black");
				row.setStyle("color", "red");
				row.enable('qc');// 将清除置为可用
				row.disable('cj');// 将采集置为不可用
			}
		});
	}

	return {
		queryFlzl : function() {
			if (typeof ATTACH_FlZL_JSOBJ != "undefined") {// 只有在同一受理页面才会需要选择受理税务事项
				if ($chk(ATTACH_FlZL_JSOBJ.getSlswsxDm())) {
					queryFlzl(slswsxDm, ywzj);
				}
			}
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
		setYwzj : function(ywzj1) {
			ywzj = ywzj1;
		},
		getYwzj : function() {
			return ywzj;
		},
		setZgswjDm : function(zgswjDm1) {
			zgswjDm = zgswjDm1;
		},
		getZgswjDm : function() {
			return zgswjDm;
		},
		setSlswsxDm : function(slswsxDm1) {
			slswsxDm = slswsxDm1;
		},
		getSlswsxDm : function() {
			return slswsxDm;
		},
		setNsrsbh : function(nsrsbh1) {
			nsrsbh = nsrsbh1;
		},
		getNsrsbh : function() {
			return nsrsbh;
		},
		getFlzlList : function() {
			return getFlzlList();
		},
		validate : function() {
			var form = $w('jbxxForm');
			var tag = form.validate();
			return tag;
		},
		getSeparator : function() {
			return strSeparator;
		}
	}
}());

// 附列资料作废
function flzlZf(flzlMsg) {
	if ($chk(flzlMsg)) {
		//获得要删除的文件数量
		var flzlArr = flzlMsg.split(",");
		var selectedNum = 0;
		for (var i = 0; i < flzlArr.length; i ++) {
			if ($chk(flzlArr[i])) {
				selectedNum ++;
			}
		}
		// 如果附件主键不为空，则说明在数据库有数据，需要删除数据
		var queryBtn = new SwordSubmit();
		queryBtn.pushData('flzlMsg', flzlMsg);
		queryBtn.setOptions({
			async : "true",
			mask : "false",
			ctrl : "GY013AttachOperateCtrl_zfFlzl",
			onSuccess : function(req, res) {
				zfNum = res.getAttr('zfNum');
				if (selectedNum == zfNum) {
					swordAlert("文件作废成功，作废数量：" + zfNum);
				} else if (zfNum > 0) {
					var faildNum = (parseFloat(selectedNum) / 1 ).subtract(parseFloat(zfNum) / 1 );
					swordAlert("文件作废数量：" + zfNum + "，未作废数量：" + faildNum + "，可能由于国地税服务器未联通导致跨国地税的文件未作废成功");
				} else {
					swordAlert("文件未作废");
				}
			}
		});
		queryBtn.submit();
	}
}
// 清空cell
function clearCell(rowData, rowEl) {
	var flzlGrid = $w("flzlGrid");
	flzlGrid.updateCell(rowEl.getCell('serverFileName'), '', '');
	flzlGrid.updateCell(rowEl.getCell('flzlzt'), 'N', 'N');
	rowEl.disable('qc');// 将清除置为不可用
	rowEl.disable('ck');// 将查看置为不可用
}

// 附件grid上点击删除按钮时调用
function flzlDel(rowData, rowEl) {
	var fileName = rowData.getValue("serverFileName");
	//0.如果本行没有数据，更新单元格状态，返回
	if (!$chk(fileName)) {
		swordAlert("文件已清空");
		clearCell(rowData, rowEl);
		return;
	}
	//1.获取本行有多少文件
	var fileArr = fileName.split(",");
	var arrayObj = new Array();
	for (var i = 0; i < fileArr.length; i++) {
		if ($chk(fileArr[i])) {
			arrayObj.push(fileArr[i]);
		}
	}
	if (arrayObj.length == 0) { //2.判断如果文件数量为0，更新单元格状态，返回
		swordAlert("文件已清空");
		clearCell(rowData, rowEl);
		return;
	} else if (arrayObj.length == 1) { //3.如果文件数量为1，直接删除操作，不弹出选择框
		//文件ID_外网路径_外网文件名称——内网路径-内网文件名称-远程标志-时间
		var flzlUuid = arrayObj[0].split(ATTACH_FlZL_JSOBJ.getSeparator())[0];
		var wwlj = arrayObj[0].split(ATTACH_FlZL_JSOBJ.getSeparator())[1];
		var wwwj = arrayObj[0].split(ATTACH_FlZL_JSOBJ.getSeparator())[2];
		var nwlj =arrayObj[0].split(ATTACH_FlZL_JSOBJ.getSeparator())[3];
		var nwwj = arrayObj[0].split(ATTACH_FlZL_JSOBJ.getSeparator())[4];
		var ycbz = arrayObj[0].split(ATTACH_FlZL_JSOBJ.getSeparator())[5]; //远程标志
		var time = arrayObj[0].split(ATTACH_FlZL_JSOBJ.getSeparator())[6];
		if ($chk(flzlUuid) && flzlUuid != "noUuid") { //3a.如果文件存在uuid，说明数据库已经存在记录，需要更新数据库操作
			var ywzj = pc.getInitData().getAttr('ywzj');
			var flzlDm = rowData.getValue("flzlDm");
			flzlZf(flzlUuid + ATTACH_FlZL_JSOBJ.getSeparator() + wwlj + ATTACH_FlZL_JSOBJ.getSeparator() +wwwj
					+ ATTACH_FlZL_JSOBJ.getSeparator() + nwlj + ATTACH_FlZL_JSOBJ.getSeparator() +nwwj 
					+ ATTACH_FlZL_JSOBJ.getSeparator() +ycbz + ATTACH_FlZL_JSOBJ.getSeparator()+ flzlDm
					+ ATTACH_FlZL_JSOBJ.getSeparator() + ywzj +",");
			//swordAlert("文件已清空");
			clearCell(rowData, rowEl);
			return;
		} else { //3b.如果文件不存在uuid，说明数据库无记录，直接更新单元格状态即可（此处不删除已上传的文件，为简化处理）
			swordAlert("文件已清空");
			clearCell(rowData, rowEl);
			return;
		}
	} else { //4.如果文件数量大于1，弹出选择框
		var cjBtn = new SwordSubmit();
		cjBtn.setCtrl('GY013AttachOperateCtrl_initFlzlDelView');
		cjBtn.pushData('flzlDm', rowData.getValue("flzlDm"));
		cjBtn.pushData('flzlmc', rowData.getValue("flzlmc"));
		cjBtn.pushData('serverFileName', rowData.getValue("serverFileName"));
		swordAlertIframe('', {
			titleName : "附件删除：" + rowData.getValue("flzlmc"),
			width : 700,
			height : 400,
			param : window,
			isNormal : 'true',
			isMax : 'true',
			isClose : 'true',
			isMin : "true",
			rowData : rowData,
			row : rowEl,
			submit : cjBtn
		});
	}
}

// 附送资料采集链接，初始化采集界面
function flzlCj(rowData, rowEl) {
	var cjBtn = new SwordSubmit();
	cjBtn.setCtrl('GY013AttachOperateCtrl_initFlzlCjView');
	cjBtn.pushData('ywzj', ATTACH_FlZL_JSOBJ.getYwzj());
	cjBtn.pushData('zgswjDm', ATTACH_FlZL_JSOBJ.getZgswjDm());
	cjBtn.pushData('slswsxDm', ATTACH_FlZL_JSOBJ.getSlswsxDm());
	cjBtn.pushData('nsrsbh', ATTACH_FlZL_JSOBJ.getNsrsbh());
	cjBtn.pushData('flzlDm', rowData.getValue("flzlDm"));
	cjBtn.pushData('flzlmc', rowData.getValue("flzlmc"));
	swordAlertIframe('', {
		titleName : "附件上传：" + rowData.getValue("flzlmc"),
		width : 500,
		height : 200,
		param : window,
		isNormal : 'true',
		isMax : 'true',
		isClose : 'true',
		isMin : "true",
		rowData : rowData,
		row : rowEl,
		submit : cjBtn
	});
}

// 删除文件弹出框点击删除按钮时调用。附送资料删除回调方法
function fillBackFlzlDel(param) {
	var delwj = param[0];
	var flzlDm = param[1];
	if ($chk(delwj)) {
		var flzlGrid = $w("flzlGrid");
		var dataDivs = flzlGrid.dataDiv().getChildren();
		var delFlzl = "";
		dataDivs
				.each(function(dataDiv, index) {
					var rowData = flzlGrid.getOneRowData(dataDiv);
					var row = flzlGrid.getRow(dataDiv);
					var flzlDmTMP = rowData.getValue("flzlDm");
					if ($chk(flzlDmTMP) && flzlDmTMP == flzlDm) {
						var curServerFileName = rowData
								.getValue("serverFileName");
						var curFiles = curServerFileName.split(","); // 原grid内的文件名
						var wjArr = delwj.split(","); // 要删除的文件名
						if ($chk(wjArr) && wjArr.length > 0) {
							//1.从原文件名中删掉要删除的文件名，如果要删除的文件名中存在主键，则记录，后续做处理。
							for (var i = 0; i < wjArr.length; i++) {
								if ($chk(wjArr[i])) {
									for (var j = 0; j < curFiles.length; j++) {
										if ($chk(curFiles)
												&& curFiles[j]
														.indexOf(wjArr[i]) != -1) { // 如果原数据包含要删除的数据
											// 处理存在uuid的情况，需要更新数据表
											var uuidArr = curFiles[j]
													.split(ATTACH_FlZL_JSOBJ.getSeparator());
											if ($chk(uuidArr[0])
													&& uuidArr[0] != "noUuid") {
												//优化，此处改为批量删除的方式
												//flzlZf(uuidArr[0], uuidArr[5]);
												var ywzj = pc.getInitData().getAttr('ywzj');
												delFlzl = delFlzl + uuidArr[0] + ATTACH_FlZL_JSOBJ.getSeparator() + uuidArr[1] + ATTACH_FlZL_JSOBJ.getSeparator()
												+uuidArr[2] + ATTACH_FlZL_JSOBJ.getSeparator()+uuidArr[3] + ATTACH_FlZL_JSOBJ.getSeparator()
												+uuidArr[4] + ATTACH_FlZL_JSOBJ.getSeparator()+ uuidArr[5] + ATTACH_FlZL_JSOBJ.getSeparator()
												+ flzlDm + ATTACH_FlZL_JSOBJ.getSeparator()+ ywzj+",";
											}
											curFiles.splice(j, 1); // 删除数组中的数据
											break;
										}
									}
								}
							}
							//2.将删掉文件后的原文件数据重新组合成逗号分隔的结构
							var newFlzlData = "";
							if ($chk(curFiles) && curFiles.length > 0) { // 组合
								for (var m = 0; m < curFiles.length; m++) {
									if ($chk(curFiles[m])) {
										newFlzlData = newFlzlData + curFiles[m]
												+ ",";
									}
								}
							}
							//3.更新附列资料grid内的数据和单元格状态
							flzlGrid.updateCell(row.getCell('serverFileName'),
									newFlzlData, newFlzlData); // 回写附送资料文件名
							if ($chk(newFlzlData)) {
								flzlGrid.updateCell(row.getCell('flzlzt'), 'Y',
										'Y'); // 更新附送资料采集状态
								row.enable('qc');// 将清除置为可用
							} else {
								flzlGrid.updateCell(row.getCell('flzlzt'), 'N',
										'N'); // 更新附送资料采集状态
								row.disable('qc');// 将清除置为不可用
							}
							//swordAlert("文件删除成功");
						}
					}
				});
		//4.如果存在有主键的文件，需要调用后台删除方法
		if ($chk(delFlzl)) {
			flzlZf(delFlzl);
		} else {
			swordAlert("文件删除成功");
		}
	} else {
		swordAlert("请先选择文件");
	}
}

// 附送资料采集回调方法
function fillBackServerPath(param) {
	var uploadSuc = param[0];
	var flzlDm = param[1];
	var serverFileName = param[2];
	if (uploadSuc == "Y") {
		var flzlGrid = $w("flzlGrid");
		var dataDivs = flzlGrid.dataDiv().getChildren();
		dataDivs.each(function(dataDiv, index) {
			var rowData = flzlGrid.getOneRowData(dataDiv);
			var row = flzlGrid.getRow(dataDiv);
			var flzlDmTMP = rowData.getValue("flzlDm");
			var curServerFileName = rowData.getValue("serverFileName");
			if (flzlDmTMP != null && flzlDmTMP == flzlDm) {
				flzlGrid.updateCell(row.getCell('serverFileName'),
						curServerFileName + serverFileName, curServerFileName
								+ serverFileName); // 回写附送资料文件名
				flzlGrid.updateCell(row.getCell('flzlzt'), 'Y', 'Y'); // 更新附送资料采集状态
				row.enable('qc');// 将清除置为可用
				row.enable('ck');// 将查看置为可用
			}
		});
		swordAlert("上传成功！");
	} else {
		swordAlert("附列资料上传失败，请重新上传！");
	}
}

// 点击查看按钮
function flzlCk(rowData, rowEl) {
	var fileName = rowData.getValue("serverFileName");
	if (!$chk(fileName)) {
		swordAlert("文件不存在");
		clearCell(rowData, rowEl);
		return;
	}
	var fileArr = fileName.split(",");
	var arrayObj = new Array();
	for (var i = 0; i < fileArr.length; i++) {
		if ($chk(fileArr[i])) {
			arrayObj.push(fileArr[i]);
		}
	}
	if (arrayObj.length == 0) {
		swordAlert("文件不存在");
		clearCell(rowData, rowEl);
		return;
	} else if (arrayObj.length == 1) {
		// 下载
		var xzSubmit = $w("xzSubmit2");
		xzSubmit.pushData("wjlj", arrayObj[0]);
		xzSubmit.submit();
		return;
	} else {
		var cjBtn = new SwordSubmit();
		cjBtn.setCtrl('GY013AttachOperateCtrl_initFlzlCkView');
		cjBtn.pushData('flzlDm', rowData.getValue("flzlDm"));
		cjBtn.pushData('flzlmc', rowData.getValue("flzlmc"));
		cjBtn.pushData('serverFileName', rowData.getValue("serverFileName"));
		swordAlertIframe('', {
			titleName : "附件查看：" + rowData.getValue("flzlmc"),
			width : 700,
			height : 400,
			param : window,
			isNormal : 'true',
			isMax : 'true',
			isClose : 'true',
			isMin : "true",
			rowData : rowData,
			row : rowEl,
			submit : cjBtn
		});
	}
}