var sfsl = 0; // 判断是否受理（标志：1,受理;0,不受理）
var sfNext = true;// 是否进入下一步
var mrzlbsdlDm; // 资料报送大类代码
var mrssqq;
var mrssqz;
var bszlDmTo;
var zlbsxlDm;
var zlbsdlDm;
var djxh;
var hyDm;// 行业代码
var djzclxDm;// 登记注册类型代码
var xyh = false;
var ctrl = 'SB151zlbsslCtrl';
var djrq;
var zcdz;// 注册地址
var gdslxDm;// 国地税类型代码
var zgswjmc;// 主管税务局名称
var sqcjbj;
var kjzdzzDm;
var yxqq;
var yxqz;
var cwkjzdbabj = true;
var sqcfdz;
var reCode1;
var zllx;
var zlsl;
var bsfsDm;
var cfcjbz;
var nsqxDm;
var cwfzrxm;// 财务负责人
var bsrxm;// 办税人姓名
var scjydz;
var bsrgddh;
var bszl_btssqwcj = "ZLA0610067"; // 不提示上期未采集的报送种类串
var _gZcfzbCwkjbblxDm = ""; // 非千户集体时有值和使用，财务报告资产负债表对应的纳税期限代码
var _gIsQhjt = "N"; // 是否是千户集体
var shxydm;// 社会信用代码
var nsrsbh;// 纳税人识别号
var cwbbQyjdBz = null; // 网报逻辑
var zlbsbz = "N"; // 大连网报开关
var zlbshtsqkg = "N";// 资料报送回退申请开关
var kjzdbabz = "N";// 山西地税会计制度备案开关
var zlbsxxcjnb_ln = "N";// 辽宁年报需求开关
var kjzdbz = "N";// 广西地税会计制度备案开关
var jltskg = "N";// 吉林会计制度备案开关
var tsxxkg = "N";// 广西国税提示信息开关
var hnXtcs = "N";// 海南系统参数开关
var bsqxDm = '06';
var fbaxlkg = "N";// 济南地税需求无备案过滤配置表开关.
var bzgkba_hb = "N";
var kjzdabz_hb = "N";
var gkurl;// ="http:\/\/www\.hebds\.gov\.cn\/zwxx\/ZXZC\/201712\/t20171201_1200330.html";
var gkdz;
var bz = 0;// 辽宁需求标志，（0表示有备案信息，但是无年度或者季度备案）
var bsqx = 0;// 是否为年报标志
var initrk = "";// 入口有三个税收资料报送，重点税源监控,资料报送信息采集
function init(resData) {
	// 调用此方法隐藏“申报错误更正”按钮
	hidecwgzbtn();
	// $w("nsrxxMap").setValue("zlbsxlDm",{'code':resData.getAttr("zlbsxlDm"),'caption':'1234'});
	jltskg = resData.getAttr("jltskg");// 吉林财务制度备案校验开关
	// 网报特色修改 START
	if ("Y" == jltskg) {
		// 吉林特色 现场要求下方红色字体隐藏
		document.getElementById('zysssm').style.display = "none";
	}
	var zlbsxlList = resData.getDataByDataName("DM_SB_ZLBSXL");// 根据dataName属性值获取后台传送的下拉列表元素的选项数据集对象
	var fxq = zlbsxlList.data; // 获取选项数据
	var len = fxq.length;
	if (len == 1) {
		// 只有一个小类时，直接显示
		var showCode = fxq[0].code;
		$w("nsrxxMap").setValue("zlbsxlDm", showCode);
		zlbsxlDm = showCode;
	} else {
		if ($chk(resData.getAttr("zlbsxlDm"))) {
			// 后台设置的默认小类
			var zlbsxlDmtmp = resData.getAttr("zlbsxlDm");

			for ( var i = 0; i < len; i++) {
				var showCode = fxq[i].code;
				if (zlbsxlDmtmp == showCode) {
					// 后台设置的小类在下来列表中的话，就显示。解决默认页面会显示ZL1001001.但是没有名称
					$w("nsrxxMap").setValue("zlbsxlDm", showCode);
					zlbsxlDm = showCode;
					break;
				} else {
					continue;
				}
			}
		}
	}
	// 网报特色修改 END
	$w('sbToolBar').setEnabled('next');
	// 湖南网报特色 开关打开查询征期日历
	zlbshtsqkg = resData.getAttr("zlbshtsqkg");
	gkurl = resData.getAttr("gkdz");
	gkdz = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + gkurl
			+ "' target='_blank'>公告网址</a>";
	if (zlbshtsqkg == "Y") {
		// 查询征期日历
		queryzqrl();
	}
	hnXtcs = resData.getAttr("hnXtcs");
	zlbsbz = resData.getAttr("zlbsbz");
	tsxxkg = resData.getAttr("tsxxkg");
	kjzdbz = resData.getAttr("kjzdbz");
	kjzdbabz = resData.getAttr("kjzdbabz");
	zlbsxxcjnb_ln = resData.getAttr("zlbsxxcjnb_ln");
	fbaxlkg = resData.getAttr("fbaxlkg");
	bzgkba_hb = resData.getAttr("bzgkba_hb");
	kjzdabz_hb = resData.getAttr("kjzdabz_hb");
	var falg = resData.getAttr("flag");
	initrk = resData.getAttr("initrk");
	var lnXtcs = resData.getAttr("lnXtcs");// 辽宁属期置灰开关
	// 初始化入口为zdsy和sszl时小类代码不再默认赋值需要手动选择以触发onchange方法---陈锐
	if (initrk == 'zdsy' || initrk == 'sszl') {
		$w("nsrxxMap").setValue("zlbsxlDm", "");
	}
	// 页面进入方式开关
	var ymkg = resData.getAttr("ymkg");
	// $w('sbToolBar').setEnabled('next');
	mrzlbsdlDm = resData.getAttr("zlbsdlDm");
	mrssqq = resData.getAttr("ssqq");
	mrssqz = resData.getAttr("ssqz");
	var nsrxxMap = $w("nsrxxMap");
	nsrxxMap.setValue("ssqq", resData.getAttr("ssqq"));
	nsrxxMap.setValue("ssqz", resData.getAttr("ssqz"));
	nsrxxMap.setValue("sfyhd", "Y");
	// 广西特色修改所属期
	if (ymkg == "Y") {
		var syssqq = resData.getAttr("syssqq");
		var syssqz = resData.getAttr("syssqz");
		nsrxxMap.setValue("ssqq", syssqq);
		nsrxxMap.setValue("ssqz", syssqz);
	}

	// 根据纳税人识别号判断是否是从年度申报跳转过来，自动默认触发纳税人回车事件
	var nsrsbh = resData.getAttr("nsrsbh");
	if (nsrsbh != undefined && nsrsbh != null && nsrsbh != '') {
		$w("nsrxxMap").setValue("nsrsbh", nsrsbh);
		fwcq();
	}
	// 根据nsrsbh1判断是否是从一般纳税人申报跳转过来，自动默认触发纳税人回车事件
	var nsrsbh1 = resData.getAttr("nsrsbh1");
	if (nsrsbh1 != undefined && nsrsbh1 != null && nsrsbh1 != '') {
		$w("nsrxxMap").setValue("nsrsbh", nsrsbh1);
		$w("nsrxxMap").disable("nsrsbh");
		fwcq();
	}
	// 初始页面光标默认放在纳税人识别号上面
	// nsrxxMap.getFieldEl('nsrsbh').focus();
	resData.data.push({
		name : "lcswsxDm",
		value : "zlbsyxxcj"
	});// 没有lcswsxDm 自定义
	var nohandle = handleZxtz(resData, $w("nsrxxMap"), queryNsrxxSuccess,
			"nsrsbh", "ssqq", "ssqz", [ 'zlbsdlDm', 'zlbsxlDm' ]);
	if (nohandle) {
		checkByXlDm('xl');
	}
	if (!nohandle) {
		// 实名办税-获取纳税人信息
		handleAndSetNsrsbhByLcswsx("zlbsyxxcj", "nsrxxMap", "nsrsbh", checkNsr);
	}
	var nsrsbh = $w("nsrxxMap").getValue("nsrsbh");
	if (nsrsbh != null && nsrsbh != "") {
		queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, '2');
	}
	// checkByXlDm(); 网报逻辑调整注释此行避免逻辑重复调用
	nsqxDm = $w('nsrxxMap').getValue('nsqxDm');
	var cszkCs = resData.getAttr("cszkCs");
	if (cszkCs == "N") {
		// 海南财税智库对接按钮置灰
		$w("sbToolBar").setHide("zhcwbbbs");
	}
	var zlbsdl = $w("nsrxxMap").getValue('zlbsdlDm').code;
	if (zlbsdl == "ZL1005" || zlbsdl == "ZL1004") {
		$$('#dcnd').setStyle('display', 'block');
		$w("sbToolBar").setHide("zhcwbbbs");
	}
	// if ($chk(zlbsbz) && zlbsbz=="Y" && zlbsbz != undefined) {
	// if (nsqxDm=="06" || nsqxDm=="08" || nsqxDm=="10"){
	// //根据权限过滤下拉树
	// jspt_gy_qx_cwbbByQxFun(resData,"zlbsxlDm","DM_SB_ZLBSXL",nsqxDm);
	// }
	// }
	// 广西特色所属期或小类置灰
	if (ymkg == "Y") {
		var syzlbsxlDm = resData.getAttr("syzlbsxlDm");
		var syssqq = resData.getAttr("syssqq");
		var syssqz = resData.getAttr("syssqz");
		if (syzlbsxlDm != "") {
			nsrxxMap.setValue("zlbsxlDm", syzlbsxlDm);
			$w('nsrxxMap').disable([ 'zlbsxlDm', 'zlsl', 'ssqq', 'ssqz' ]);
			checkByXlDm("xl");
		} else {
			$w('nsrxxMap').disable([ 'ssqq', 'ssqz' ]);
		}
	}

	// 默认季报，不允许修改期止
	if (hnXtcs == "Y") {
		if (undefined != resData.getAttr("zlbsxlFlag")
				&& "0" == resData.getAttr("zlbsxlFlag")) {
			swordAlert("会计制度准则代码为空，无法进行申报！");
		}
		// $w("nsrxxMap").disable("ssqz");海南既有季报，也有年报，默认为季报，也可通过修改属期报年报。
		getSsqz();
	} else {
		$w("nsrxxMap").enable("ssqz");
	}
	if (lnXtcs == "Y") {// 辽宁属期要求置灰
		$w('nsrxxMap').disable([ 'ssqq', 'ssqz' ]);
	}
	// ZOG00_201901040006
	// zlbsxlDm=resData.getAttr("zlbsxlDm");
	// 获取报送资料清单
	if (sfNext) {
		getZlbsbdlb();
	}
}
var zqrl = "";
function queryzqrl() {
	var submit = new SwordSubmit();
	submit.setOptions({
		async : "true",
		mask : "false",
		ctrl : 'DZBSXTKJ017ZqrlCtrl_loadzqrl',
		onSuccess : function(req, res) {
			zqrl = res.getAttr("zqrl");
		},
		onError : function onHandleLoginError() {
			swordAlert("获取征期失败！");
		}
	});
	submit.submit();
}

function sqss(req, resData) {
	mrssqq = resData.Attr("");
}
// 根据纳税人识别号查询纳税人信息
function checkNsr(e) {
	var e = e || window.event;
	if (e.code == 13) {
		// $w('bwlshForm').reset();
		fwcq();
	}
}
function fwcq() {
	xyh = false;
	// $w("nsrxxMap").setValue("zlbsdlDm", "ZL1001");
	var nsrsbh = $w("nsrxxMap").getValue("nsrsbh");
	if (nsrsbh != null && nsrsbh != "") {
		queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, '2');
	}
}
// 回调函数
function queryNsrxxSuccess(nsrParam, zrrParam) {
	var fddbrxm = nsrParam.fddbrxm.value;
	var nsrmc = nsrParam.nsrmc.value;
	djxh = nsrParam.djxh.value;
	hyDm = nsrParam.hyDm.value;
	djzclxDm = nsrParam.djzclxDm.value;
	djrq = nsrParam.djrq.value;
	zcdz = nsrParam.zcdz.value;
	gdslxDm = nsrParam.gdslxDm.value;
	zgswjmc = nsrParam.zgswjmc.value;
	cwfzrxm = nsrParam.cwfzrxm.value;
	bsrxm = nsrParam.bsrxm.value;
	scjydz = nsrParam.scjydz.value;
	bsrgddh = nsrParam.bsrgddh.value;
	shxydm = nsrParam.shxydm.value;
	var fjmqybz = nsrParam.fjmqybz.value;
	var ynsrsbh = nsrParam.ynsrsbh.value;
	// var zgswskfjDm = nsrParam.nsrzgswjgList.value[0].zgswjDm;
	var zgswskfjDm = $chk(nsrParam.nsrzgswjgList) ? nsrParam.nsrzgswjgList.value[0].zgswjDm
			: nsrParam.zgswskfjDm.value;
	$w('nsrxxMap').setValue("nsrmc", nsrmc);
	$w('nsrxxMap').setValue("djxh", djxh);
	$w('nsrxxMap').setValue("fddbrxm", fddbrxm);
	$w('nsrxxMap').setValue("cwfzrxm", cwfzrxm);
	$w('nsrxxMap').setValue("bsrxm", bsrxm);
	$w('nsrxxMap').setValue("scjydz", scjydz);
	$w('nsrxxMap').setValue("bsrgddh", bsrgddh);
	$w('nsrxxMap').setValue("zgswskfjDm", zgswskfjDm);
	$w('nsrxxMap').setValue("shxydm", shxydm);
	$w('nsrxxMap').setValue("ynsrsbh", ynsrsbh);
	$w('nsrxxMap').setValue("fjmqybz", fjmqybz);
	sfsl = 1;
	var ssqq = $w("nsrxxMap").getValue("ssqq");
	var ssqz = $w("nsrxxMap").getValue("ssqz");
	if (!$chk(ssqq) || "" == ssqq || !$chk(ssqz) || "" == ssqz) {
		ssqq = mrssqq;
		ssqz = mrssqz;
	}
	getKjzdba(ssqq, ssqz, "initSsq");
	// $w('sbToolBar').setEnabled('next');
	$w("nsrxxMap").disable("nsrsbh");
	return;
}
// 获取财务制度备案
function getKjzdba(q, z, callback) {
	$w("nsrcwzdxxList").reset();
	var queryBtn = new SwordSubmit();
	queryBtn.pushData("djxh", djxh);
	queryBtn.pushData("ssqq", q);
	queryBtn.pushData("ssqz", z);
	// 由于海南特殊，海南开关打开时 此处必须判断此方法的入口是哪个
	queryBtn.pushData("initrk", initrk);
	queryBtn.setCtrl(ctrl + "_queryKjzdzzDmByDjxh");
	queryBtn.setFunction("onSuccess", callback);
	queryBtn.submit();
}

/**
 * @description 初始所属期起止
 * @param req
 * @param resData
 * 
 */
function initSsq(req, resData) {
	kjzdbaCl(req, resData);
	var form = $w("nsrxxMap");
	var ssqq = pc.getResData("ssqq", resData);
	var ssqz = pc.getResData("ssqz", resData);
	var zlbsxlDm = pc.getResData("zlbsxlDm", resData);
	kjzdzzDm = pc.getResData("kjzdzzDm", resData);
	form.setValue('ssqq', ssqq.value);
	form.setValue('ssqz', ssqz.value);
	if ($chk(zlbsxlDm) && $chk(zlbsxlDm.value)) {
		form.setValue('zlbsxlDm', zlbsxlDm.value);
		checkByXlDm();
	} else if (!$chk(kjzdzzDm)) {
		if (needCwzdba()) {
			swordAlert('该纳税人在此期间没有财务会计制度备案信息!');
		}
	} else {
		if (needCwzdba()) {
			var nsrcwzdxxList = $w("nsrcwzdxxList").getAllGridData().trs;
			// 辽宁特色：财务报表报送与采集的属期选择为“年”时，不去监控财务制度备案中是否有报送期限为“年”的报表备案信息，
			// 即财务报送与采集年报不受限制。但是，当纳税人没有有效的财务制度信息（没有月报且没有季报）时，不允许报送年报。
			if ($chk(zlbsxxcjnb_ln) && zlbsxxcjnb_ln == "Y"
					&& zlbsxxcjnb_ln != undefined) {
				if (nsrcwzdxxList.length == 0) {
					swordAlert('该纳税人没有财务会计制度备案信息,请及时联系主管税务机关进行备案!');
					$w('sbToolBar').setDisabled('next');
					$w("nsrxxMap").disable();
					return;
				} else {
					var bz = 0;
					for ( var i = 0; i < nsrcwzdxxList.length; i++) {
						var cwkjbblxDmTemp = nsrcwzdxxList[i].tds.cwkjbblxDm.value;
						if (cwkjbblxDmTemp == "01" || cwkjbblxDmTemp == "02") {
							bz++;
							break;
						}
					}
					if (bz == 0) {
						swordAlert('该纳税人没有季度或月度财务会计制度备案信息,请及时联系主管税务机关进行备案!');
						$w('sbToolBar').setDisabled('next');
						$w("nsrxxMap").disable();
						return;
					}
				}
			}
			if (nsrcwzdxxList.length == 0) {
				if ($chk(kjzdbabz) && kjzdbabz == "Y" && kjzdbabz != undefined) {
					swordAlert('该纳税人没有财务会计制度备案信息,请及时联系主管税务机关进行备案!');
					$w('sbToolBar').setDisabled('next');
					$w("nsrxxMap").disable();
					return;
				}
				// 河北地税需求（2） 2018-04-30
				if ($chk(kjzdabz_hb) && kjzdabz_hb == "Y"
						&& kjzdabz_hb != undefined) {
					swordAlert("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前纳税人未进行财务会计制度备案，如需填写财务报表请通过电子税务局在线办税功能申请或至税务机关办税服务厅按照公告内容进行财务会计制度备案。<br>"
							+ gkdz);
					$w('sbToolBar').setDisabled('next');
					$w("nsrxxMap").disable();
					return;
				}
				if ($chk(kjzdbz) && kjzdbz == "Y" && kjzdbz != undefined) {
					swordConfirm(
							"该纳税人没有财务会计制度备案信息,请先进行财务会计制度备案才能进行纳税申报",
							{
								okBtnName : "是",
								cancelBtnName : "否",
								onOk : function() {
									swordAlertIframe(
											"/sword?ctrl=NsrdGyEntranceCtrl_initView&lcswsxDm=LCSXA011030001",
											{
												titleName : '财务会计制度备案——待审批预申请',
												width : 1000,
												height : 450,
												isMax : 'true',
												param : window
											});
									$w('sbToolBar').setDisabled('next');
									$w("nsrxxMap").disable();
								},
								onCancel : function() {
									$w('sbToolBar').setDisabled('next');
									$w("nsrxxMap").disable();
									return;
								}
							});
				}
				// 吉林需求
				if ($chk(jltskg) && jltskg != undefined && jltskg == "Y") {
					swordAlert('您尚未进行财务会计制度备案，请及时联系主管税务机关进行备案!');
				}
			}

		}
	}
}

/**
 * 检查是否需要报送合并财务报表
 */
var sfbshbbb;
function checkSfbshbbb() {
	sfbshbbb = "N";
	var zlbsdlDm = $w("nsrxxMap").getValue('zlbsdlDm').code;
	if ("ZL1001" == zlbsdlDm) {
		var ssqq = $w("nsrxxMap").getValue("ssqq");
		var ssqz = $w("nsrxxMap").getValue("ssqz");
		if (ssqz.substring(5, 7) == '12') {
			var submit = new SwordSubmit();
			submit.pushData("djxh", djxh);
			submit.pushData("ssqq", ssqq);
			submit.pushData("ssqz", ssqz);
			submit.setCtrl(ctrl + "_querySfbshbbb");
			submit.setFunction("onSuccess", "checkSfbshbbbSuccess");
			submit.submit();
		}
	}
}

function checkSfbshbbbSuccess(req, resData) {
	sfbshbbb = resData.getAttr('sfbshbbb');
}

// 资料报送大类改变的时候调用----
// 当参与者选择的资料报送大类为财务报告报送与信息采集，系统从后台获取纳税人的适用会计制度代码、报表报送期代码、会计报表等信息
function getNsrcwzdxx() {
	var ssqz = $w("nsrxxMap").getValue("ssqz");
	var ssqq = $w("nsrxxMap").getValue("ssqq");
	var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;

	// 满足业务组提出需求暂时放开此监控
	if (sfsl == 1) {
		if (zlbsdlDm == "ZL1001") {
			if (!$chk(ssqq) || "" == ssqq || !$chk(ssqz) || "" == ssqz) {
				$w("nsrxxMap").setValue("zlbsdlDm", "");
				swordAlert("请先填写所属期！");
				return;
			}
			getKjzdba(ssqq, ssqz, "initSsq");
			getKjzdba(ssqq, ssqq, "ssqzKjzdzzSuccess");// 根据选择的所属期起重新查询会计制度备案
			// var checkNsrcwzdxxBtn = $w("checkNsrcwzdxxBtn");
			// checkNsrcwzdxxBtn.pushData("ssqq", ssqq);
			// checkNsrcwzdxxBtn.pushData("ssqz", ssqz);
			// checkNsrcwzdxxBtn.setCtrl(ctrl + "_getNsrcwzdxx");
			// checkNsrcwzdxxBtn.submit();
		}
	}
	// if(cwkjzdbabj=true){
	// $w('sbToolBar').setEnabled('next');
	// }else{
	// $w('sbToolBar').setDisable('next');
	// }
}

function nsrcwzdxxOnSuccess(req, resData) {
	var codeMesg = pc.getResData("codeMesg", resData);
	if (codeMesg != null && codeMesg != "" && codeMesg != undefined) {
		swordAlert(codeMesg.value);
		// return;
	}
	var sfGetZlbsbdlb = true;
	var yhdCode = pc.getResData("yhdCode", resData);
	if (yhdCode != null && yhdCode != "" && yhdCode != undefined) {
		$w("nsrxxMap").setValue("sfyhd", "Y"); // 已核定
		// getSsqz();
	} else {
		$w("nsrxxMap").setValue("sfyhd", "N");
		if (sfGetZlbsbdlb) {
			getZlbsbdlb();
		}
	}
	setJdSsq();
	checkByXlDm();
}

function getSsqz() {
	var nsqx_dm = "05";
	var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
	var zlbsxlDm = $w("nsrxxMap").getValue("zlbsxlDm").code;
	if ($chk(djxh) && "ZL1001" == zlbsdlDm && "N" == _gIsQhjt) {
		var ssqq = $w('nsrxxMap').getValue("ssqq");
		var ssqz = $w('nsrxxMap').getValue("ssqz");
		if (!$chk(ssqz) || ssqq.substr(0, 4) != ssqz.substr(0, 4)) {
			ssqz = ssqq;
		}
		getKjzdba(ssqq, ssqz, "ssqzKjzdzzSuccess");// 根据选择的所属期起重新查询会计制度备案
	} else {
		jsskssqz(nsqx_dm);
	}
	// 开关打开 济南需求 网报特色
	if (fbaxlkg == "Y" && "N" == _gIsQhjt && "ZL1001" == zlbsdlDm) {
		$w("nsrxxMap").setValue("zlbsxlDm", zlbsxlDm); // 开关打开先清空一下页面小类避免出现未采集过小类显示出来的情况
		getKjzdba($w('nsrxxMap').getValue("ssqq"), $w('nsrxxMap').getValue(
				"ssqz"), "ssqzKjzdzzSuccess");
	}
	// $w('sbToolBar').setEnabled('next');
}
/**
 * 计算所属期止
 * 
 * @param nsqx_dm
 */
function jsskssqz(nsqx_dm) {
	// 辽宁按季申报
	if (hnXtcs == "Y") {
		nsqx_dm = "08";
	}
	// end
	var ssqzBtn = new SwordSubmit();
	ssqzBtn.setCtrl("SBGyCtrl" + "_jsskssqz");
	ssqzBtn.setFunction('onSuccess', 'loadBaseInfo1');
	ssqzBtn.pushData('skssqq', $w('nsrxxMap').getValue("ssqq"));
	ssqzBtn.pushData('nsqxdm', nsqx_dm);
	ssqzBtn.submit();
}

/**
 * 查询会计制度备案处理
 * 
 * @param req
 * @param resData
 */
function kjzdbaCl(req, resData) {
	$w("nsrcwzdxxList").initData(pc.getResData("nsrcwzdxxList", resData));
	kjzdzzDm = pc.getResData("kjzdzzDm", resData);
	yxqq = resData.getAttr("yxqq");
	yxqz = resData.getAttr("yxqz");
	var form = $w("nsrxxMap");
	// 河北地税需求（3） 2018-04-30 存在会计制度备案 并不在101、102、201、216、222中的提示。
	if ($chk(kjzdabz_hb) && kjzdabz_hb == "Y" && kjzdabz_hb != undefined) {
		if (kjzdzzDm != '101' && kjzdzzDm != '102' && kjzdzzDm != '201'
				&& kjzdzzDm != '216' && kjzdzzDm != '222') {
			if ($chk(bzgkba_hb) && bzgkba_hb == "Y" && bzgkba_hb != undefined) {
				swordAlert("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前纳税人财务制度备案与国地税联合公告确定的财务制度备案报表范围不符，请通过电子税务局在线办税功能申请或至税务机关办税服务厅按照公告内容修改财务会计制度备案信息。<br>"
						+ gkdz);
				$w('sbToolBar').setDisabled('next');
				$w("nsrxxMap").disable();
				return;
			}
		}
	}

	if ($chk(kjzdzzDm) && kjzdzzDm != '' && $chk(kjzdzzDm.value)) {
		form.setValue('kjzdzzDm', kjzdzzDm.value);

	} else {
		form.setValue('kjzdzzDm', "");
	}

	_gIsQhjt = resData.getAttr("QfjtBz");
	var zcfzbBblx = resData.getAttr("zcfzbCwkjbblx");
	if ($chk(zcfzbBblx)) {
		_gZcfzbCwkjbblxDm = zcfzbBblx;
	} else {
		_gZcfzbCwkjbblxDm = "";
		// 吉林治标不治本修改方案 by:张俊，2019年1月11日22:00:01
		if (jltskg == "Y") {
			var cwzdxxList = $w("nsrcwzdxxList").getAllNoDeleteGridData();
			if (cwzdxxList.trs.length > 0) {
				var row0 = cwzdxxList.trs[0];
				_gZcfzbCwkjbblxDm = row0.tds.cwkjbblxDm.value;
			}
		}
	}
	bsqxDm = getNsqxDmFromCwkjbblx(_gZcfzbCwkjbblxDm);

}
/**
 * @description 计算所属期止查询会计制度准则后处理
 * @param req
 * @param resData
 * 
 */
function ssqzKjzdzzSuccess(req, resData) {
	kjzdbaCl(req, resData);
	bsqxDm = getNsqxDmFromCwkjbblx(_gZcfzbCwkjbblxDm);
	jsskssqz(bsqxDm);
}

var autossqz;
function loadBaseInfo1(req, resData) {
	autossqz = resData.getAttr('skssqz');
	$w("nsrxxMap").setValue('ssqz', autossqz);
	checkSsqz();
}

// 所属期止变动时校验--------------------------------------------------------------------------------------------------------------------
function changessqz(xlChangeBz) {
	var ssqz = $w("nsrxxMap").getValue("ssqz");
	var ssqq = $w("nsrxxMap").getValue("ssqq");
	var zlbsxlDm = $w("nsrxxMap").getValue("zlbsxlDm");

	// 网报特色 济南需求 通过开关控制112
	if (fbaxlkg == "Y" && $chk(djxh) && "N" == _gIsQhjt && "ZL1001" == zlbsdlDm) {
		$w("nsrxxMap").setValue("zlbsxlDm", zlbsxlDm); // 开关打开先清空一下页面小类避免出现未采集过小类显示出来的情况
		getKjzdba(ssqq, ssqz, "initSsq");
	}
	if (fbaxlkg != "Y" && $chk(djxh) && "N" == _gIsQhjt && "ZL1001" == zlbsdlDm) {
		getKjzdba(ssqq, ssqz, "initSsq");
	}
	if (!compareDate(ssqq, ssqz)) {
		swordAlert("所属期起必须在所属期止前");
		$w("nsrxxMap").setValue("ssqz", "");
		return;
	}

	var year1 = ssqq.substr(0, 4);
	var year2 = ssqz.substr(0, 4);
	var month1 = ssqq.substr(5, 2);
	var month2 = ssqz.substr(5, 2);
	var len = year2 - year1 + month2 - month1;
	if (year1 != year2) {
		swordAlert("所属期止必须与所属期起在同一年份！");
		$w("nsrxxMap").setValue("ssqz", autossqz);
		return;
	}

	var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
	// 非千户集体时才校验是否按财务会计制度备案校验
	if (needCwzdba()) {
		// 判断是否超过财务制度备案的有效期，若超出不校验属期
		// var chkPass = false;
		// if ($chk(yxqq) && "" != yxqq && $chk(yxqz) && "" != yxqz
		// && compareDate(yxqq, ssqq) && compareDate(ssqz, yxqz)) {
		// chkPass = true;
		// }

		// chkPass = chkPass ? checkSsqz(xlChangeBz) : false;
		if (checkSsqz(xlChangeBz)) {
			// checkSfazhdzqbs();
		}
	}
}

var cwkjbblxDm;
// 设置季度所属期
var bbbsqDm;
function setJdSsq() {
	// 非千户集体时才根据财务会计制度备案中财务会计报表类型代码进行设置
	if ("N" != _gIsQhjt && "ZL1001" != zlbsdlDm) {
		return;
	}

	var ssqq = $w("nsrxxMap").getValue("ssqq");
	var ssqz = $w("nsrxxMap").getValue("ssqz");
	var nsrcwzdxxList = $w("nsrcwzdxxList").getAllGridData().trs;
	try {
		if ($chk(_gZcfzbCwkjbblxDm) && "" != _gZcfzbCwkjbblxDm) {
			cwkjbblxDm = _gZcfzbCwkjbblxDm;
		} else {
			cwkjbblxDm = nsrcwzdxxList[0].tds.cwkjbblxDm.value;
		}
	} catch (e) {
		cwkjbblxDm = null;
	}
	if (cwkjbblxDm == null || cwkjbblxDm == undefined || cwkjbblxDm == "") {
		return;
	}
	if (parseInt(cwkjbblxDm) != 2) {
		return;
	}
	// 所属期起止初始化为季度
	var jdArr = [ 1, 4, 7, 10 ];
	var oneday = 1000 * 60 * 60 * 24;
	var qDates = splitStr(ssqq);
	var zDates = splitStr(ssqz);
	if (parseInt(zDates[0], 10) != parseInt(qDates[0], 10)
			|| parseInt(zDates[1], 10) - parseInt(qDates[1], 10) != 2) {
		var ssqqDate = new Date(parseInt(qDates[0], 10),
				parseInt(qDates[1], 10), parseInt(qDates[2], 10));
		ssqqDate.setDate(1);
		ssqqDate.setTime(ssqqDate.getTime() - (oneday * 32 * 2));
		ssqqDate.setMonth(jdArr[parseInt(ssqqDate.getMonth() / 3, 10)] - 1, 1);
		var yearStr = ssqqDate.getFullYear() + "";
		var monthStr = (ssqqDate.getMonth() + 1) + "";
		var dateStr = "01";
		if (monthStr.length == 1) {
			monthStr = "0" + "" + monthStr;
		}
		ssqq = yearStr + "-" + monthStr + "-" + dateStr;// 上季度起
		$w("nsrxxMap").setValue("ssqq", ssqq);

		ssqqDate.setFullYear(yearStr, parseInt(monthStr, 10) + 1, 1);
		ssqqDate.setTime(ssqqDate.getTime() + (oneday * 32));
		ssqqDate.setDate(1);
		ssqqDate.setTime(ssqqDate.getTime() - oneday);

		yearStr = ssqqDate.getFullYear() + "";
		monthStr = (ssqqDate.getMonth() + 1) + "";
		dateStr = ssqqDate.getDate() + "";
		if (monthStr.length == 1) {
			monthStr = "0" + "" + monthStr;
		}
		ssqz = yearStr + "-" + monthStr + "-" + dateStr;// 上季度末
		$w("nsrxxMap").setValue("ssqz", ssqz);
	}
	getSsqz();
}

/**
 * @description 获取纳税期限代码
 * 
 */
function getNsqxDmFromCwkjbblx(cwkjbblx) {
	bsqxDm = "06"; // 默认
	if (hnXtcs == "Y") {
		bsqxDm = "08";
		return bsqxDm;
	}
	if (!$chk(cwkjbblx) || "" == cwkjbblx) {
		return bsqxDm;
	}

	var cwkjbblxInt = parseInt(cwkjbblx);
	if (1 == cwkjbblxInt) { // 月报表
		// 河北地税需求 （4） 2018-04-30
		if ($chk(kjzdabz_hb) && kjzdabz_hb == "Y" && kjzdabz_hb != undefined) {
			if (bsqxDm == "06") {
				swordAlert("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前纳税人的财务报表所属期类型是月报，与公告确定的季报和年报所属期类型不符，请通过电子税务局在线办税功能申请或至税务机关办税服务厅按照公告内容修改财务会计制度备案信息。<br>"
						+ gkdz);
				$w('sbToolBar').setDisabled('next');
				$w("nsrxxMap").disable();
				return;
			}
		} else {
			bsqxDm = "06";
		}
	} else if (2 == cwkjbblxInt) { // 季报表
		bsqxDm = "08";
	} else if (3 == cwkjbblxInt) { // 年报表
		bsqxDm = "10";
	} else if (7 == cwkjbblxInt) {
		bsqxDm = "11"; //
	}

	return bsqxDm;
}

/**
 * 校验所属期止
 */
function checkSsqz(xlChangeBz) {
	if (hnXtcs == "Y") {
		return true;
	}
	if (!needCwzdba()) {
		return true;
	}
	var ssqq = $w("nsrxxMap").getValue("ssqq");
	var ssqz = $w("nsrxxMap").getValue("ssqz");
	bsqx = ssqz.split("-")[1] / 1 - ssqq.split("-")[1] / 1;// 财务报表报送的期限11为年
	var today = $w("slxxForm").getValue("lrrq");
	var nsrcwzdxxList = $w("nsrcwzdxxList").getAllGridData().trs;
	// 辽宁特色：财务报表报送与采集的属期选择为“年”时，不去监控财务制度备案中是否有报送期限为“年”的报表备案信息，
	// 即财务报送与采集年报不受限制。但是，当纳税人没有有效的财务制度信息（没有月报且没有季报）时，不允许报送年报。
	if ($chk(zlbsxxcjnb_ln) && zlbsxxcjnb_ln == "Y"
			&& zlbsxxcjnb_ln != undefined && bsqx == 11) {
		if (nsrcwzdxxList.length == 0) {
			swordAlert('该纳税人没有财务会计制度备案信息,请及时联系主管税务机关进行备案!');
			$w('sbToolBar').setDisabled('next');
			$w("nsrxxMap").disable();
			return;
		} else {
			for ( var i = 0; i < nsrcwzdxxList.length; i++) {
				var cwkjbblxDmTemp = nsrcwzdxxList[i].tds.cwkjbblxDm.value;
				if (cwkjbblxDmTemp == "01" || cwkjbblxDmTemp == "02") {
					bz++;
					break;
				}
			}
			if (bz == 0) {
				swordAlert('该纳税人没有季度或月度财务会计制度备案信息,请及时联系主管税务机关进行备案!');
				$w('sbToolBar').setDisabled('next');
				$w("nsrxxMap").disable();
				return;
			}
		}
	}
	if (nsrcwzdxxList.length == 0) {
		if ($chk(kjzdbabz) && kjzdbabz == "Y" && kjzdbabz != undefined) {
			swordAlert('该纳税人没有财务会计制度备案信息,请及时联系主管税务机关进行备案!');
			$w('sbToolBar').setDisabled('next');
			$w("nsrxxMap").disable();
			return;
		}
		// 河北地税需求 （2） 未备案提示
		if ($chk(kjzdabz_hb) && kjzdabz_hb == "Y" && kjzdabz_hb != undefined) {
			swordAlert("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前纳税人未进行财务会计制度备案，如需填写财务报表请通过电子税务局在线办税功能申请或至税务机关办税服务厅按照公告内容进行财务会计制度备案。<br>"
					+ gkdz);
			$w('sbToolBar').setDisabled('next');
			$w("nsrxxMap").disable();
			return;
		}
		if ($chk(kjzdbz) && kjzdbz == "Y" && kjzdbz != undefined) {
			swordConfirm(
					"该纳税人没有财务会计制度备案信息,请先进行财务会计制度备案才能进行纳税申报",
					{
						okBtnName : "是",
						cancelBtnName : "否",
						onOk : function() {
							swordAlertIframe(
									"/sword?ctrl=NsrdGyEntranceCtrl_initView&lcswsxDm=LCSXA011030001",
									{
										titleName : '财务会计制度备案——待审批预申请',
										width : 1000,
										height : 450,
										isMax : 'true',
										param : window
									});
							$w('sbToolBar').setDisabled('next');
							$w("nsrxxMap").disable();
						},
						onCancel : function() {
							$w('sbToolBar').setDisabled('next');
							$w("nsrxxMap").disable();
							return;
						}
					});
			return;
		}
		// 2017-10-30 当参数无备案参数广西版 Z0000096Z02000050 山西版 Z0000096Z02000077
		// 都配置为N时，修改财务报表所属起时总提示“该纳税人的财务会计制度备案为请填写正确的所属期起止！”
		// 调整所属起js方法，当参数 Z0000096Z02000050 山西版 Z0000096Z02000077
		// 全部配置N时，提示于金三系统操作相同的“该纳税人在此期间没有财务会计制度备案信息!”
		if ($chk(fbaxlkg) && fbaxlkg == "Y" && fbaxlkg != undefined) { // 济南地税需求如果会计制度备案过期或无备案时走参数配置表。无需提示“该纳税人在此期间没有财务会计制度备案信息”。
			// 2018-01-29不进行该纳税人在此期间没有财务会计制度备案信息提示.
		} else {
			swordAlert('该纳税人在此期间没有财务会计制度备案信息!');
			return;
		}

	}
	var bblxStr = "";
	for ( var i = 0; i < nsrcwzdxxList.length; i++) {
		var cwkjbblxDmTemp = nsrcwzdxxList[i].tds.cwkjbblxDm.value;
		var bsqxDmTemp = getNsqxDmFromCwkjbblx(cwkjbblxDmTemp);
		var retStr = qzDateCheck(ssqq, ssqz, today, bsqxDmTemp);
		if ("ok" == retStr) {
			cwkjbblxDm = cwkjbblxDmTemp;
			bsqxDm = bsqxDmTemp;
			return true;
		}
		if ("02" == cwkjbblxDmTemp) {
			if (bblxStr.indexOf("季报表") == -1) {
				bblxStr += "季报表,";
			}
		} else if ("03" == cwkjbblxDmTemp) {
			if (bblxStr.indexOf("年报表") == -1) {
				bblxStr += "年报表,";
			}
		} else {
			if (bblxStr.indexOf("月报表") == -1) {
				bblxStr += "月报表,";
			}
		}
	}
	if (zlbsxxcjnb_ln != "Y") {
		if ($chk(fbaxlkg) && fbaxlkg == "Y" && fbaxlkg != undefined
				&& bblxStr == "") {
			// 2018-01-29济南地税 如果 bblxstr 为空时不考虑 不提示该纳税人的财务会计制度备案为" + bblxStr +
			// "请填写正确的所属期起止！。
		} else if ($chk(fbaxlkg) && fbaxlkg == "Y" && fbaxlkg != undefined
				&& bblxStr != "") {
			// 2018-01-29所属期止校验没通过提示 济南地税 bblxStr 不为空提示
			$w("nsrxxMap").setValue("ssqz", "");
			swordAlert("该纳税人的财务会计制度备案为" + bblxStr + "请填写正确的所属期起止！");
			return false;
		} else {
			// 所属期止校验没通过提示
			$w("nsrxxMap").setValue("ssqz", "");
			swordAlert("该纳税人的财务会计制度备案为" + bblxStr + "请填写正确的所属期起止！");
			return false;
		}
	} else {
		return true;
	}
}

// 系统会根据所属期起和所属期止进行判断，得出财务报表报送的是年报、季报、月报。
// 假如得出结果是季报，这时系统会检测上一个季度纳税人是否报送了季报，如果查询到上一个季度的季报已报送则不进行提示；
// 如果查询上个季度报送记录不存在，提示“纳税人未按核定周期报送资料”，返回到页面。
function checkSfazhdzqbs() {
	if (sfsl == 1) {
		var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
		if (zlbsdlDm == "ZL1001" && cwkjbblxDm != null && cwkjbblxDm != ""
				&& cwkjbblxDm != undefined) {
			zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
			var checkSfazhdzqbsBtn = $w("checkSfazhdzqbsBtn");
			checkSfazhdzqbsBtn.setCtrl(ctrl + "_checkSfazhdzqbs");
			checkSfazhdzqbsBtn.pushData("cwkjbblxDm", cwkjbblxDm);
			checkSfazhdzqbsBtn.submit();
		}
	}
	getZlbsbdlb();
}

function checkSfazhdzqbsOnSuccess(req, resData) {
	var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
	var hdzqCode = pc.getResData("hdzqCode", resData);
	// 只有报送代码为财务会计制度报表时才进行校验
	if (hdzqCode != null && hdzqCode != "" && hdzqCode != undefined
			&& zlbsdlDm == "ZL1001") {
		swordAlert("纳税人未按核定周期报送资料");
		return;
	}

}

// 系统从后台来获取纳税人应该报送的资料清单，并返回到页面上。
function getZlbsbdlb() {
	// $w('sbToolBar').setEnabled('next');
	// $w('sbToolBar').setEnabled('save');
	pc.getWidget("yhdzlGrid").reset();
	pc.getWidget("whdzlGrid").reset();
	// $w('sbToolBar').setDisabled('save');
	if (sfsl == 1) {
		var getZlbsbdlbBtn = $w("getZlbsbdlbBtn");
		// 查看上上期是否报送 财务会计为强制类型
		// getZlbsbdlbBtn.pushData("djrq", djrq);
		getZlbsbdlbBtn.setCtrl(ctrl + "_getZlbsbdlb");
		getZlbsbdlbBtn.submit();
	}

}
function getZlbsbdlbSuccess(req, resData) {
	var jybj = pc.getResData("jybj", resData);
	var zlsl = pc.getResData("zlsl", resData);

	if (zlsl != null && zlsl != "" && zlsl != undefined) {
		$w("nsrxxMap").setValue("zlsl", parseInt(zlsl.value));
		// 将所有呈现的表单全部选中
		// var yhdzlGrid = $w('yhdzlGrid');
		// var yhdzlGriddataDiv = yhdzlGrid.dataDiv();
		// var yhdzchildren = yhdzlGriddataDiv.getChildren();
		// for ( var i = 0; i < yhdzchildren.length; i++) {
		// yhdzchildren[i].getElement("input[name='sftj']").set("checked",
		// true);
		// }
		// var whdzlGrid = $w('whdzlGrid');
		// var whdzlGriddataDiv = whdzlGrid.dataDiv();
		// var whdchildren = whdzlGriddataDiv.getChildren();
		// for ( var i = 0; i < whdchildren.length; i++) {
		// whdchildren[i].getElement("input[name='sftj']")
		// .set("checked", true);
		// }
	} else {
		$w("nsrxxMap").setValue("zlsl", "");
	}
	// $w('sbToolBar').setEnabled('save');

}

// 小类改变时监控--------------------------------------------------------------------------------------------------------
function checkByXlDm(xlChangeBz) {
	var nsrxxForm = $w("nsrxxMap");
	var ssqq = nsrxxForm.getValue("ssqq");
	var ssqz = nsrxxForm.getValue("ssqz");
	if (!$chk(ssqq) || "" == ssqq || !$chk(ssqz) || "" == ssqz) {
		nsrxxForm.setValue("zlbsxlDm", "");
		swordAlert("请先填写所属期！");
		return;
	}

	// 备案类型监控,针对财务报告报送与信息采集大类进行监控
	checkNsrcwkjzdxx();
	/**
	 * Desc:针对企业集团 Date:2012-8-6 am 10:02 Author:侯凯 Content:对企业集团数据采集的资格校验
	 * 
	 */
	zlbsxlDm = $w("nsrxxMap").getValue("zlbsxlDm").code;
	if (zlbsxlDm == 'ZL1004003') {
		djxh = $w("nsrxxMap").getValue("djxh");
		var newBtn = new SwordSubmit();
		newBtn.pushData("djxh", djxh);
		newBtn.setCtrl(ctrl + "_gcheckQyjtcjzg");
		newBtn.setFunction('onSuccess', 'checkSuccess');
		newBtn.submit();
	}
	// //农民专业合作社财务会计特殊监控
	// if(zlbsxlDm == 'ZL1001015'){
	// var newBtn = new SwordSubmit();
	// newBtn.pushData("djxh", djxh);
	// newBtn.pushData("djrq", djrq);
	// newBtn.setCtrl(ctrl + "_jknmzyhzs");
	// newBtn.setFunction('onSuccess', 'checkSuccess');
	// newBtn.submit();
	// }
	$w("nsrxxMap").disable("dcnd");
	/**
	 * Desc:针对税收调查 Date:2012-8-7 pm 14:37 Author:侯凯 Content:对是否做过税收调查企业认定
	 * 
	 */
	if (zlbsxlDm == 'ZL1004002') {
		$w("nsrxxMap").enable("dcnd");
		checkSfzgrd();
	}
	/**
	 * Desc:针对重点税源 Date:2012-8-7 pm 15:05 Author:侯凯 Content:纳税人是否做过重点税源监控纳税人认定
	 * 
	 */
	if (zlbsxlDm == 'ZL1005001') {
		$w("nsrxxMap").enable("dcnd");
		checkSfzgrd();
	}
	if (xyh) {
		sfNext = false;
	}
	// 获取报送资料清单
	if (sfNext) {
		getZlbsbdlb();
	}
	// changessqz(xlChangeBz);
	// getNsrcwzdxx();
}

/**
 * 校验是否做过认定
 * 调查年度改变触发-------------------------------------------------------------------------------------------------
 */
function checkSfzgrd() {
	djxh = $w("nsrxxMap").getValue("djxh");
	zlbsxlDm = $w("nsrxxMap").getValue("zlbsxlDm").code;
	var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;

	var dcnd = $w("nsrxxMap").getValue("dcnd").substr(0, 4);
	var ssqq = $w("nsrxxMap").getValue("ssqq").substr(0, 4);
	var ssqz = $w("nsrxxMap").getValue("ssqz").substr(0, 4);
	if (!$chk(dcnd)) {
		return;
	}
	if (ssqq > dcnd || ssqz < dcnd) {
		swordAlert("调查年度必须在所属期起后且在所属期止前");
		$w("nsrxxMap").setValue("dcnd", "");
		return;
	}
	if (zlbsdlDm == 'ZL1004' && zlbsxlDm == 'ZL1004002') {
		// 校验是否做过税收调查企业认定
		var newBtn = new SwordSubmit();
		newBtn.pushData("djxh", djxh);
		newBtn.pushData("dcnd", dcnd);
		newBtn.setCtrl(ctrl + "_checkSfzgSsdcqyrd");
		newBtn.setFunction('onSuccess', 'checkSsrdSuccess');
		newBtn.submit();
	} else if (zlbsdlDm == 'ZL1005' && zlbsxlDm == 'ZL1005001') {
		// 校验那是人是否做过重点税源监控认定
		var newBtn = new SwordSubmit();
		newBtn.pushData("djxh", djxh);
		newBtn.pushData("jknd", dcnd);
		newBtn.pushData("ssqq", $w("nsrxxMap").getValue("ssqq"));
		newBtn.pushData("ssqz", $w("nsrxxMap").getValue("ssqz"));
		// newBtn.setTid('PBS_SB151_checkSfzgZdsyjkrd');
		newBtn.setCtrl(ctrl + "_checkSfzgZdsyjkrd");
		newBtn.setFunction('onSuccess', 'checkZdsyjkrdSuccess');
		newBtn.submit();
	}
}
function checkSsrdSuccess(req, resData) {
	var reCode = pc.getResData("reCode", resData).value;
	if (reCode != "Y") {
		swordAlert('该纳税人不具备税收资料调查企业资格!');
		$w("nsrxxMap").setValue("dcnd", "");
		$w('sbToolBar').setDisabled('next');
		// return;
	}
}
function checkZdsyjkrdSuccess(req, resData) {
	var reCode = pc.getResData("reCode", resData).value;
	if (reCode != "Y") {
		swordAlert('该纳税人不具备重点税源监控企业资格!');
		$w("nsrxxMap").setValue("dcnd", "");
		$w('sbToolBar').setDisabled('next');
		// return;
	}
}
function checkSuccess(req, resData) {
	var reCode = pc.getResData("reCode", resData).value;
	if (reCode == "Y") {
		sfNext = true;
	} else {
		swordAlert('该纳税人不具备认定企业集团总部资格!');
		sfNext = false;
		$w('sbToolBar').setDisabled('next');
		// return;
	}
}
// 用选择的小类对应的会计制度和纳税人扩展信息中的会计制度进行比对
// 当纳税人选择的资料报送大类为财务报告报送与信息采集，并且系统不存在核定财务报表信息，
// 则允许纳税人选择资料报送小类，这时才会触发事件，监控纳税人当前所选的适用会计制度和
// 在做纳税人登记时的适用会计制度是否相符。
function checkNsrcwkjzdxx() {
	sfNext = true;
	// 暂时修改为0
	if (sfsl == 1) {
		var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
		if (zlbsdlDm == "ZL1001") {
			var checkBalxByXlDmBtn = $w("checkBalxByXlDmBtn");
			checkBalxByXlDmBtn.setCtrl(ctrl + "_checkNsrcwkjzdxx");
			checkBalxByXlDmBtn.submit();
		}
	}

}
function checkBalxByXlDmOnSuccess(req, resData) {
	var balxCode = pc.getResData("balxCode", resData);
	if (balxCode != null && balxCode != "" && balxCode != undefined) {
		var yhdzlGrid = $w("yhdzlGrid");
		var whdzlGrid = $w("whdzlGrid");
		yhdzlGrid.clearData();
		whdzlGrid.clearData();
		// sfNext = false ;
		// swordConfirm("纳税人资料报送类别不匹配,是否继续?", {
		// okBtnName : "是",
		// cancelBtnName : "否",
		// onOk : function() {
		// sfNext = true;
		// $w('sbToolBar').setEnabled('save');
		// },
		// onCancel : function() {
		// sfNext = false;
		// $w('sbToolBar').setDisabled('save');
		// return false;
		// }
		// });
	}
}

/**
 * 
 * @param {Object}
 *            req
 * @param {Object}
 *            resData
 */
function querySuccess(req, resData) {
	var reCode = pc.getResData("reCode", resData).value;
	if (reCode == "1") {
		if ($chk(tsxxkg) && tsxxkg == "Y" && tsxxkg != undefined) {
			msg = '该属期报表已报送，是否进行修改或作废重报？';
		} else {
			msg = '重复报送，是否进行更正';
		}
		swordConfirm(msg, {
			okBtnName : "是",
			cancelBtnName : "否",
			onCancel : function() {
				var check = lrRow.getElement("input[name='sftj']");
				check.set("checked", false);
			}
		});
	}
}
var jyzlsl = true;
function save() {
	var nsrxxMap = $w('nsrxxMap');
	if (zlbsxlDm == 'ZL1005001') {
		var ssqqy = $w("nsrxxMap").getValue("ssqq").substr(5, 2);
		var ssqzy = $w("nsrxxMap").getValue("ssqz").substr(5, 2);
		if (ssqqy != ssqzy) {
			swordAlert("重点税源监控企业数据采集只能按月报送!");
			return;
		}
	}
	if (!nsrxxMap.validate()) {
		return;
	}
	var dcnd = $w("nsrxxMap").getValue("dcnd").substr(0, 4);
	var ssqq1 = $w("nsrxxMap").getValue("ssqq").substr(0, 4);
	var ssqz1 = $w("nsrxxMap").getValue("ssqz").substr(0, 4);
	if (dcnd == null || dcnd == undefined || dcnd == "") {
		dcnd = ssqq1;
	}

	if (ssqq1 > dcnd || ssqz1 < dcnd) {
		swordAlert("调查年度必须在所属期起后且在所属期止前");
		return;
	}
	var ssqz = $w("nsrxxMap").getValue("ssqz");
	var ssqq = $w("nsrxxMap").getValue("ssqq");
	zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;

	if (!compareDate(ssqq, ssqz)) {
		swordAlert("所属期起必须在所属期止前");
		return;
	}

	// 没有备案信息不监控纳税期限
	var nsrcwzdxxList = $w("nsrcwzdxxList").getAllGridData().trs;
	var jyStr = "ok";
	var today = $w("slxxForm").getValue("lrrq");
	if (nsrcwzdxxList.length == 0 || !needCwzdba()) {// 没有会计制度备案信息
		jyStr = qzDateCheck(ssqq, ssqz, today, '');
	} else if (zlbsxxcjnb_ln == "Y"
			&& ssqz.split("-")[1] / 1 - ssqq.split("-")[1] / 1 == 11 && bz >= 0) {// 辽宁需求，年报不监控，只需要有月或者季度备案即可
		jyStr = qzDateCheck(ssqq, ssqz, today, '');
	} else {
		jyStr = qzDateCheck(ssqq, ssqz, today, bsqxDm);
	}
	if ("ok" != jyStr) { // 未通过校验
		swordAlert(jyStr);
		return;
	}

	if (zlbsdlDm == 'ZL1004' && zlbsxlDm == 'ZL1004002' || zlbsdlDm == 'ZL1005'
			&& zlbsxlDm == 'ZL1005001') {// 如果是税收调查或者重点税源则要首先根据调查年度进行采集校验
		if ($w("nsrxxMap").getValue("dcnd") == null
				|| $w("nsrxxMap").getValue("dcnd") == "") {
			swordAlert('报送前,请先选择"调查年度"进行校验认定!');
			return;
		}
	}
	// 必录项监控
	var nsrxxFormJY = pc.getWidget('nsrxxMap');

	if (!nsrxxFormJY.validate()) {
		$w('sbToolBar').setDisabled('next');
		return;
	}
	var zlsl = nsrxxFormJY.getValue("zlsl");
	var yhdChecked = $w("yhdzlGrid").getCheckedData("sftj");
	var yhdCheckedLength = yhdChecked.trs.length;
	if (yhdCheckedLength > 0) {
		// 有已经核定的表单信息
		// if (parseInt(zlsl) != yhdCheckedLength) {
		// swordAlert('资料数量和所要报送的表单数量不匹配!', {
		// onOk : function() {
		// nsrxxFormJY.getFieldEl("zlsl").focus();
		// }
		// });
		// jyzlsl = false;
		// return;
		// } else {
		// jyzlsl = true;
		// }
		var grid = $w("yhdzlGrid").getCheckedData("bb");// 获取grid对象
		for ( var j = 0; j < grid.trs.length; j++) {
			var f = false;
			var xh1 = grid.trs[j].tds.xh.value;
			for ( var i = 0; i < yhdCheckedLength; i++) {
				var xh = yhdChecked.trs[i].tds.xh.value;
				if (xh == xh1) {
					f = true;
					break;
				}
			}
			if (!f) {
				swordAlert("存在必报但是未报送的资料，请重新检查!");
				jyzlsl = false;
				return;
			}
		}
	}
	var whdChecked = $w("whdzlGrid").getCheckedData("sftj");
	var whdCheckedLength = whdChecked.trs.length;
	if (whdCheckedLength > 0) {
		// 有未经核定的表单信息
		if (parseInt(zlsl) != whdCheckedLength) {
			swordAlert('资料数量和所要报送的表单数量不匹配!', {
				onOk : function() {
					nsrxxFormJY.getFieldEl("zlsl").focus();
				}
			});
			jyzlsl = false;
			return;
		} else {
			jyzlsl = true;
		}

		var grid = $w("whdzlGrid").getCheckedData("bb");// 获取grid对象
		for ( var j = 0; j < grid.trs.length; j++) {
			var f = false;
			var xh1 = grid.trs[j].tds.xh.value;
			for ( var i = 0; i < whdCheckedLength; i++) {
				var xh = whdChecked.trs[i].tds.xh.value;
				if (xh == xh1) {
					f = true;
					break;
				}
			}
			if (!f) {
				swordAlert("存在必报但是未报送的资料，请重新检查!");
				jyzlsl = false;
				return;
			}
		}

	}
	if (yhdCheckedLength < 1 && whdCheckedLength < 1) {
		swordAlert("请选择需要报送的资料！");
		$w('bcBtn').stop();
		return;

	}
	if (jyzlsl) {
		var yhdtrs = $w("yhdzlGrid").getAllGridData().trs;
		for ( var i = 0; i < yhdtrs.length; i++) {
			if (yhdtrs[i].tds.sfxcj.value == "Y") {
				// 取出bszldm 有且只有一条
				bszlDmTo = yhdtrs[i].tds.bszlDm.value;
				urlTo = yhdtrs[i].tds.ljwz.value;
				bszlmcTo = yhdtrs[i].tds.bszlmc.value;
			}
		}
		var whdtrs = $w("whdzlGrid").getAllGridData().trs;

		for ( var i = 0; i < whdtrs.length; i++) {
			if (whdtrs[i].tds.sfxcj.value == "Y") {
				// 取出bszldm 有且只有一条
				bszlDmTo = whdtrs[i].tds.bszlDm.value;
				urlTo = whdtrs[i].tds.ljwz.value;
				bszlmcTo = whdtrs[i].tds.bszlmc.value;
			}
		}
		var bcbtn = $w('saveBtn');
		bcbtn.pushData("bszlDm", bszlDmTo);
		bcbtn.pushData("ssqq", ssqq);
		bcbtn.pushData("ssqz", ssqz);
		bcbtn.pushData("hyDm", hyDm);
		bcbtn.pushData("djzclxDm", djzclxDm);
		bcbtn.setCtrl(ctrl + '_save');
		bcbtn.submit();
	}
}
var urlTo, zlbsuuidTo, bszlmcTo, zlbsuuidOld;
function saveOnSuccess(req, resData) {

	zlbsuuidTo = resData.getAttr('zlbsuuidNew');
	zlbsuuidOld = resData.getAttr('zlbsuuidOld');
	// $w('sbToolBar').setDisabled('next');
	// 效验是否报送合并报表
	checkSfbshbbb();
	if (sfbshbbb == "Y" && zlbsxlDm != "ZL1001045") {
		swordAlert("该纳税人需要报送合并报表", {
			onOk : function() {
				saveAfter();
			}
		});
	} else if (sfbshbbb == "YB" && zlbsxlDm != "ZL1001045") {
		swordAlert("该纳税人已报送合并报表", {
			onOk : function() {
				saveAfter();
			}
		});
	} else {
		saveAfter();
	}
}
function saveAfter() {
	var flag = false;
	var yhdtrs = $w("yhdzlGrid").getAllGridData().trs;
	for ( var i = 0; i < yhdtrs.length; i++) {
		if (yhdtrs[i].tds.sfxcj.value == "Y") {
			flag = true;
		}
		if (yhdtrs[i].tds.sfxcj.value == "Y") {
			// 取出bszldm 有且只有一条
			bszlDmTo = yhdtrs[i].tds.bszlDm.value;
			urlTo = yhdtrs[i].tds.ljwz.value;
			bszlmcTo = yhdtrs[i].tds.bszlmc.value;
		}
	}
	var whdtrs = $w("whdzlGrid").getAllGridData().trs;

	for ( var i = 0; i < whdtrs.length; i++) {

		if (whdtrs[i].tds.sfxcj.value == "Y") {
			flag = true;
		}
		if (whdtrs[i].tds.sfxcj.value == "Y") {
			// 取出bszldm 有且只有一条
			bszlDmTo = whdtrs[i].tds.bszlDm.value;
			urlTo = whdtrs[i].tds.ljwz.value;
			bszlmcTo = whdtrs[i].tds.bszlmc.value;
		}
	}
	if (flag) {
		// 校验是否重复采集
		var nsrxxMap = $w("nsrxxMap").getSubmitData();
		var initBtn = new SwordSubmit();
		initBtn.pushData("zlbsuuid", zlbsuuidTo);
		initBtn.pushData("zlbsuuid", zlbsuuidOld);
		initBtn.pushData("bszlmc", bszlmcTo);
		initBtn.pushData("bszldm", bszlDmTo);
		initBtn.pushData(nsrxxMap);
		initBtn.setCtrl(ctrl + "_jysfcfcj");
		initBtn.setFunction("onSuccess", "querySuccess");
		initBtn.submit();

		// 校验上期数据是否采集，倒过来写
		querySqsfcj();
	} else {
		swordAlertRight("受理成功");
	}
}
var cfcjbz;
/**
 * 
 * @param {Object}
 *            req
 * @param {Object}
 *            resData
 */

function querySqsfcj() {
	var bszlDm;
	var yhdtrs = $w("yhdzlGrid").getAllGridData().trs;
	for ( var i = 0; i < yhdtrs.length; i++) {
		if (yhdtrs[i].tds.sfxcj.value == "Y") {
			// 取出bszldm 有且只有一条
			bszlDm = yhdtrs[i].tds.bszlDm.value;
		}
	}
	var whdtrs = $w("whdzlGrid").getAllGridData().trs;
	for ( var i = 0; i < whdtrs.length; i++) {
		if (whdtrs[i].tds.sfxcj.value == "Y") {
			// 取出bszldm 有且只有一条
			bszlDm = whdtrs[i].tds.bszlDm.value;
		}
	}
	var sqsfcjBtn = new SwordSubmit();
	var ssqz = $w("nsrxxMap").getValue("ssqz");
	var ssqq = $w("nsrxxMap").getValue("ssqq");
	sqsfcjBtn.pushData("ssqq", ssqq);
	sqsfcjBtn.pushData("ssqz", ssqz);
	sqsfcjBtn.pushData("bszlDm", bszlDm);
	sqsfcjBtn.pushData("djxh", djxh);
	sqsfcjBtn.setCtrl(ctrl + "_querySqss");
	sqsfcjBtn.setFunction("onSuccess", "querySqsfcjSuccess");
	sqsfcjBtn.submit();
}

function querySqsfcjSuccess(req, resData) {
	sqcfdz = resData.getAttr("sqcfdz");
	var sntqcfdz = resData.getAttr("sntqcfdz");
	if (sqcfdz == null || sqcfdz == undefined) {
		sqcjbz = "N";
		if (reCode1 == "0") {
			if (bszl_btssqwcj.indexOf(bszlDmTo) >= 0) {
				cfcjbz = "";
				var openbdlrjmBtn = $w("openbdlrjmBtn");
				openbdlrjmBtn.pushData("zllx", zllx);
				openbdlrjmBtn.pushData("zlsl", zlsl);
				openbdlrjmBtn.pushData("zlbsxlDm", zlbsxlDm);
				openbdlrjmBtn.pushData("zlbsdlDm", zlbsdlDm);
				openbdlrjmBtn.pushData("cfdz", "");
				openbdlrjmBtn.pushData("cfcjbz", cfcjbz);
				openbdlrjmBtn.pushData("ljwz", urlTo);
				openbdlrjmBtn.pushData("bszlDm", bszlDmTo);
				openbdlrjmBtn.pushData("bszlmc", bszlmcTo);
				openbdlrjmBtn.pushData("sfcfcj", 'N');
				openbdlrjmBtn.pushData("hyDm", hyDm);
				openbdlrjmBtn.pushData("djzclxDm", djzclxDm);
				openbdlrjmBtn.pushData("djrq", djrq);
				openbdlrjmBtn.pushData("zcdz", zcdz);
				openbdlrjmBtn.pushData("gdslxDm", gdslxDm);
				openbdlrjmBtn.pushData("zgswjmc", zgswjmc);
				openbdlrjmBtn.pushData("zlbsuuid", zlbsuuidTo);
				openbdlrjmBtn.pushData("bsfsDm", bsfsDm);
				openbdlrjmBtn.pushData("sqcfdz", sqcfdz);
				openbdlrjmBtn.pushData("sntqcfdz", sntqcfdz);
				openbdlrjmBtn.setCtrl(ctrl + '_initBd');

				swordAlertIframe('', {
					titleName : "表单数据录入",
					width : 900,
					height : 400,
					param : window,
					isNormal : 'true',
					isMax : 'true',
					isClose : 'true',
					isMin : "true",
					max : "true",
					reset : fillreset, // 父页面下一户方法传给子页面
					submit : openbdlrjmBtn
				});

			} else {
				// swordAlert("以前属期有未采集的财务报表",{ onOk: function(){
				cfcjbz = "";
				var openbdlrjmBtn = $w("openbdlrjmBtn");
				openbdlrjmBtn.pushData("zllx", zllx);
				openbdlrjmBtn.pushData("zlsl", zlsl);
				openbdlrjmBtn.pushData("zlbsxlDm", zlbsxlDm);
				openbdlrjmBtn.pushData("zlbsdlDm", zlbsdlDm);
				openbdlrjmBtn.pushData("cfdz", "");
				openbdlrjmBtn.pushData("cfcjbz", cfcjbz);
				openbdlrjmBtn.pushData("ljwz", urlTo);
				openbdlrjmBtn.pushData("bszlDm", bszlDmTo);
				openbdlrjmBtn.pushData("bszlmc", bszlmcTo);
				openbdlrjmBtn.pushData("sfcfcj", 'N');
				openbdlrjmBtn.pushData("hyDm", hyDm);
				openbdlrjmBtn.pushData("djzclxDm", djzclxDm);
				openbdlrjmBtn.pushData("djrq", djrq);
				openbdlrjmBtn.pushData("zcdz", zcdz);
				openbdlrjmBtn.pushData("gdslxDm", gdslxDm);
				openbdlrjmBtn.pushData("zgswjmc", zgswjmc);
				openbdlrjmBtn.pushData("zlbsuuid", zlbsuuidTo);
				openbdlrjmBtn.pushData("bsfsDm", bsfsDm);
				openbdlrjmBtn.pushData("sqcfdz", sqcfdz);
				openbdlrjmBtn.pushData("sntqcfdz", sntqcfdz);
				openbdlrjmBtn.setCtrl(ctrl + '_initBd');

				swordAlertIframe('', {
					titleName : "表单数据录入",
					width : 900,
					height : 400,
					param : window,
					isNormal : 'true',
					isMax : 'true',
					isClose : 'true',
					isMin : "true",
					max : "true",
					reset : fillreset, // 父页面下一户方法传给子页面
					submit : openbdlrjmBtn
				});

				// } });
			}

		}
		// else if(reCode1=="1"){
		// if (bszl_btssqwcj.indexOf(bszlDmTo)>=0) {
		// }
		// else {
		// swordAlert("以前属期有未采集的财务报表");
		// }
		// }
	} else {
		if (reCode1 == "0") {
			cfcjbz = "";
			var openbdlrjmBtn = $w("openbdlrjmBtn");
			openbdlrjmBtn.pushData("zllx", zllx);
			openbdlrjmBtn.pushData("zlsl", zlsl);
			openbdlrjmBtn.pushData("zlbsxlDm", zlbsxlDm);
			openbdlrjmBtn.pushData("zlbsdlDm", zlbsdlDm);
			openbdlrjmBtn.pushData("cfdz", "");
			openbdlrjmBtn.pushData("cfcjbz", cfcjbz);
			openbdlrjmBtn.pushData("ljwz", urlTo);
			openbdlrjmBtn.pushData("bszlDm", bszlDmTo);
			openbdlrjmBtn.pushData("bszlmc", bszlmcTo);
			openbdlrjmBtn.pushData("sfcfcj", 'N');
			openbdlrjmBtn.pushData("hyDm", hyDm);
			openbdlrjmBtn.pushData("djzclxDm", djzclxDm);
			openbdlrjmBtn.pushData("djrq", djrq);
			openbdlrjmBtn.pushData("zcdz", zcdz);
			openbdlrjmBtn.pushData("gdslxDm", gdslxDm);
			openbdlrjmBtn.pushData("zgswjmc", zgswjmc);
			openbdlrjmBtn.pushData("zlbsuuid", zlbsuuidTo);
			openbdlrjmBtn.pushData("bsfsDm", bsfsDm);
			openbdlrjmBtn.pushData("sqcfdz", sqcfdz);
			openbdlrjmBtn.setCtrl(ctrl + '_initBd');

			swordAlertIframe('', {
				titleName : "表单数据录入",
				width : 900,
				height : 400,
				param : window,
				isNormal : 'true',
				isMax : 'true',
				isClose : 'true',
				isMin : "true",
				max : "true",
				reset : fillreset, // 父页面下一户方法传给子页面
				submit : openbdlrjmBtn
			});
		}
	}
}
function querySuccess(req, resData) {
	reCode1 = pc.getResData("reCode", resData).value;
	zllx = $w("nsrxxMap").getValue('zllx').code;
	zlsl = $w("nsrxxMap").getValue('zlsl');
	// zlbsxlDm = $w("nsrxxMap").getValue('zlbsxlDm').code;
	var zlbsxlMc = $w("nsrxxMap").getValue('zlbsxlDm').caption;
	var zlbsdlDm = $w("nsrxxMap").getValue('zlbsdlDm').code;
	var ssqzy = $w("nsrxxMap").getValue("ssqz").substr(5, 2);// 所属起止月份
	bsfsDm = "";
	if (ssqzy == 1 || ssqzy == 2 || ssqzy == 4 || ssqzy == 5 || ssqzy == 7
			|| ssqzy == 8 || ssqzy == 10 || ssqzy == 11) {
		bsfsDm = "0";// 只能报月报
	} else if (ssqzy == 3 || ssqzy == 9) {
		bsfsDm = "1";// 只能同时报月报和季报
	} else if (ssqzy == 6) {
		bsfsDm = "2";// 只能同时报月报、季报、半年报
	} else {
		bsfsDm = "3";// 能同时报月报、季报、半年报和年报
	}

	var fddbrxm = $w("nsrxxMap").getValue('fddbrxm');
	var ssqq = $w("nsrxxMap").getValue('ssqq');
	var ssqz = $w("nsrxxMap").getValue('ssqz');
	if (reCode1 == "1") {
		var msg = "";
		if ($chk(tsxxkg) && tsxxkg == "Y" && tsxxkg != undefined) {
			msg = '该属期报表已报送，是否进行修改或作废重报？';
		} else {
			msg = '重复采集，是否进行更正';
		}
		swordConfirm(msg, {
			okBtnName : "是",
			cancelBtnName : "否",
			onOk : function() {
				if (zlbshtsqkg == "Y") {
					var initBtn = new SwordSubmit();
					initBtn.pushData("sxid", zlbsuuidOld);
					initBtn.pushData("ssqq", ssqq);
					initBtn.pushData("ssqz", ssqz);
					initBtn.pushData("zlbsxlDm", $w("nsrxxMap").getValue(
							'zlbsxlDm').code);
					initBtn.setCtrl("BszlhtCtrl_getBszlspXX");
					// initBtn.options.async= "false";
					initBtn.setFunction("onSuccess", "spSuccessAfter");
					initBtn.submit();

				} else {
					cfcjbz = "Y";
					var newBtn = $w("sfcfbsBtn1");
					newBtn.pushData("zllx", zllx);
					newBtn.pushData("zlsl", zlsl);
					newBtn.pushData("zlbsxlDm", zlbsxlDm);
					newBtn.pushData("zlbsxlMc", zlbsxlMc);
					newBtn.pushData("zlbsdlDm", zlbsdlDm);
					newBtn.pushData("djzclxDm", djzclxDm);
					newBtn.pushData("fddbrxm", fddbrxm);
					newBtn.pushData("djzclxDm", djzclxDm);
					newBtn.pushData("cfcjbz", cfcjbz);
					newBtn.pushData("ljwz", urlTo);
					newBtn.pushData("bszlDm", bszlDmTo);
					newBtn.pushData("bszlmc", bszlmcTo);
					newBtn.pushData("zlbsuuid", zlbsuuidTo);
					newBtn.pushData("zlbsuuidOld", zlbsuuidOld);
					newBtn.pushData("sqcfdz", sqcfdz);
					newBtn.pushData("sfcfcj", "Y");
					newBtn.pushData("bsfsDm", bsfsDm);
					newBtn.setCtrl(ctrl + '_cfcjXx');
					var popbox = swordAlertIframe('', {
						titleName : "资料采集更正信息",
						width : "100%",
						height : 500,
						param : window,
						isNormal : 'true',
						isMax : 'true',
						isClose : 'true',
						isMin : "true",
						// max : "true",
						reset : fillreset, // 父页面下一户方法传给子页面
						submit : newBtn
					});
					popbox.max();
				}
			},
			onCancel : function() {
				return;
			}
		});
	} else {
	}
	var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
}
// 回退申请
function spSuccessAfter(req, resData) {
	var spzt = resData.getAttr('spzt');
	var spyj = resData.getAttr('sply');
	var fwqsj = resData.getAttr('fwqsj');
	if (spzt == "01" || spzt == "02" || spzt == "03") {
		swordAlert("回退审批已经提交，请等待审批通过后修改!");
	} else if (spzt == "N") {
		swordAlert("回退审批未通过!\n审批意见：" + spyj);
	} else if (spzt == "Y") {
		cfcjbz = "Y";
		var newBtn = $w("sfcfbsBtn1");
		newBtn.pushData("zllx", zllx);
		newBtn.pushData("zlsl", zlsl);
		newBtn.pushData("zlbsxlDm", zlbsxlDm);
		newBtn
				.pushData("zlbsxlMc",
						$w("nsrxxMap").getValue('zlbsxlDm').caption);
		newBtn.pushData("zlbsdlDm", zlbsdlDm);
		newBtn.pushData("djzclxDm", djzclxDm);
		newBtn.pushData("fddbrxm", fddbrxm);
		newBtn.pushData("djzclxDm", djzclxDm);
		newBtn.pushData("cfcjbz", cfcjbz);
		newBtn.pushData("ljwz", urlTo);
		newBtn.pushData("bszlDm", bszlDmTo);
		newBtn.pushData("bszlmc", bszlmcTo);
		newBtn.pushData("zlbsuuid", zlbsuuidTo);
		newBtn.pushData("zlbsuuidOld", zlbsuuidOld);
		newBtn.pushData("sqcfdz", sqcfdz);
		newBtn.pushData("sfcfcj", "Y");
		newBtn.pushData("bsfsDm", bsfsDm);
		newBtn.setCtrl(ctrl + '_cfcjXx');
		var popbox = swordAlertIframe('', {
			titleName : "资料采集更正信息",
			width : "100%",
			height : 500,
			param : window,
			isNormal : 'true',
			isMax : 'true',
			isClose : 'true',
			isMin : "true",
			// max : "true",
			reset : fillreset, // 父页面下一户方法传给子页面
			submit : newBtn
		});
		popbox.max();

	} else {
		// var myDate = fwqsj;
		// var curYear = myDate.substring(0, 4);
		// var curMonth = myDate.substring(5, 7);
		// var curDate = myDate.substring(8, 10);
		// var byzqr=zqrl.substring(8,10);
		// var byzqy=zqrl.substring(5, 7);
		// var byzqn=zqrl.substring(0, 4);
		// var ssqqY=$w("nsrxxMap").getValue('ssqq').substring(5, 7);
		// var ssqqN=$w("nsrxxMap").getValue('ssqq').substring(0,4);
		// var ssqY=$w("nsrxxMap").getValue('ssqz').substring(5, 7);
		// var ssqN=$w("nsrxxMap").getValue('ssqz').substring(0,4);
		// var bsqx = "0";
		// //当期判断（今年，月报（征期月超出征期日部分），季报（包含征期月的,征期月超出征期日部分），年报（当年5月31日前））
		// if(curYear==ssqN&&(ssqqY==ssqY&&ssqY==(byzqy-1)||(ssqY-ssqqY)==2&&ssqqY>(byzqy-1)&&ssqY<(byzqy-1)||ssqqY==1&&ssqY=12)){
		// //年报超过当年5月31日的部分需要回退
		// if(ssqqY==1&&ssqY=12&&new Data(myDate)>new Date(byzqn,5,31);){
		// bsqx = "1";
		// }else if(byzqr<curDate){ //月报，季报当前日超出征期日的部分需要回退
		// bsqx = "1";
		// }else{
		// cfcjbz = "Y";
		// var newBtn = $w("sfcfbsBtn1");
		// newBtn.pushData("zllx", zllx);
		// newBtn.pushData("zlsl", zlsl);
		// newBtn.pushData("zlbsxlDm", zlbsxlDm);
		// newBtn.pushData("zlbsxlMc",
		// $w("nsrxxMap").getValue('zlbsxlDm').caption);
		// newBtn.pushData("zlbsdlDm", zlbsdlDm);
		// newBtn.pushData("djzclxDm",djzclxDm);
		// newBtn.pushData("fddbrxm", fddbrxm);
		// newBtn.pushData("djzclxDm",djzclxDm);
		// newBtn.pushData("cfcjbz", cfcjbz);
		// newBtn.pushData("ljwz", urlTo);
		// newBtn.pushData("bszlDm", bszlDmTo);
		// newBtn.pushData("bszlmc", bszlmcTo);
		// newBtn.pushData("zlbsuuid", zlbsuuidTo);
		// newBtn.pushData("zlbsuuidOld", zlbsuuidOld);
		// newBtn.pushData("sqcfdz",sqcfdz);
		// newBtn.pushData("sfcfcj", "Y");
		// newBtn.pushData("bsfsDm", bsfsDm);
		// newBtn.setCtrl(ctrl + '_cfcjXx');
		// var popbox = swordAlertIframe('', {
		// titleName : "资料采集更正信息",
		// width : "100%",
		// height : 500,
		// param : window,
		// isNormal : 'true',
		// isMax : 'true',
		// isClose : 'true',
		// isMin : "true",
		// //max : "true",
		// reset:fillreset, //父页面下一户方法传给子页面
		// submit : newBtn
		// });
		// popbox.max();
		// }
		// }else{ //往期报表回退
		// bsqx = "1";
		// }
		// if(bsqx=="1"){
		// bszlhtsq();
		// }else if(bsqx=="2"){
		// swordAlert("此报送资料为往期报送资料，请在办税大厅修改。");
		// }
		var sub = new SwordSubmit();
		sub.pushData("sbssqq", $w("nsrxxMap").getValue('ssqq'));
		sub.pushData("sbssqz", $w("nsrxxMap").getValue('ssqz'));
		sub.setCtrl("BszlhtCtrl_getBsqxzt");
		sub.setFunction("onSuccess", "bszlhtSuccess");
		sub.submit();
	}
}
function bszlhtSuccess(req, res) {
	var sbssqzt = res.getAttr("sbssqzt");
	if ("N" == sbssqzt) {
		bszlhtsq();
	} else {
		cfcjbz = "Y";
		var newBtn = $w("sfcfbsBtn1");
		newBtn.pushData("zllx", zllx);
		newBtn.pushData("zlsl", zlsl);
		newBtn.pushData("zlbsxlDm", zlbsxlDm);
		newBtn
				.pushData("zlbsxlMc",
						$w("nsrxxMap").getValue('zlbsxlDm').caption);
		newBtn.pushData("zlbsdlDm", zlbsdlDm);
		newBtn.pushData("djzclxDm", djzclxDm);
		newBtn.pushData("fddbrxm", fddbrxm);
		newBtn.pushData("djzclxDm", djzclxDm);
		newBtn.pushData("cfcjbz", cfcjbz);
		newBtn.pushData("ljwz", urlTo);
		newBtn.pushData("bszlDm", bszlDmTo);
		newBtn.pushData("bszlmc", bszlmcTo);
		newBtn.pushData("zlbsuuid", zlbsuuidTo);
		newBtn.pushData("zlbsuuidOld", zlbsuuidOld);
		newBtn.pushData("sqcfdz", sqcfdz);
		newBtn.pushData("sfcfcj", "Y");
		newBtn.pushData("bsfsDm", bsfsDm);
		newBtn.setCtrl(ctrl + '_cfcjXx');
		var popbox = swordAlertIframe('', {
			titleName : "资料采集更正信息",
			width : "100%",
			height : 500,
			param : window,
			isNormal : 'true',
			isMax : 'true',
			isClose : 'true',
			isMin : "true",
			// max : "true",
			reset : fillreset, // 父页面下一户方法传给子页面
			submit : newBtn
		});
		popbox.max();
	}
}
function bdlrOnSuccess() {
}

function bdlrOnError() {
}
function goCj() {
	var nsrxxMap = $w("nsrxxMap");
	var zllxmc = nsrxxMap.getValue("zllx").caption;
	var zlbsdlmc = nsrxxMap.getValue("zlbsdlDm").caption;
	var zlbsxlmc = nsrxxMap.getValue("zlbsxlDm").caption;
	var cjBtn = $w("cjBtn");
	cjBtn.pushData("zllxmc", zllxmc);
	cjBtn.pushData("zlbsdlmc", zlbsdlmc);
	cjBtn.pushData("zlbsxlmc", zlbsxlmc);
	cjBtn.setCtrl(ctrl + "_initcj");
	cjBtn.submit();
}
/**
 * @return
 */
function fillreset() {
	reset();
}
function reset() {
	pc.getWidget("yhdzlGrid").reset();
	pc.getWidget("whdzlGrid").reset();
	pc.getWidget("nsrcwzdxxList").reset();
	var nsrxxMap = $w("nsrxxMap");
	nsrxxMap.getFieldEl('nsrsbh').focus();
	nsrxxMap.setValue("nsrsbh", "");
	nsrxxMap.setValue("nsrmc", "");
	nsrxxMap.setValue("zlbsdlDm", mrzlbsdlDm);
	nsrxxMap.setValue("zlbsxlDm", "");
	nsrxxMap.setValue("zllx", "0");
	nsrxxMap.setValue("zlsl", "");
	nsrxxMap.setValue("ssqq", mrssqq);
	nsrxxMap.setValue("ssqz", mrssqz);
	nsrxxMap.setValue("djxh", "");
	nsrxxMap.setValue("nsrztDm", "");
	nsrxxMap.setValue("djzclxDm", "");
	nsrxxMap.setValue("zgswjDm", "");
	nsrxxMap.setValue("zgswskfjDm", "");
	nsrxxMap.setValue("kjzdzzDm", "");
	nsrxxMap.setValue("blrysfzjlxDm", "");
	nsrxxMap.setValue("blrysfzjhm", "");
	nsrxxMap.setValue("sfyhd", "Y");
	nsrxxMap.setValue("dcnd", "");
	nsrxxMap.disable("dcnd");
	$w('sbToolBar').setEnabled('next');
}

function slxxOnError() {
}
function saveOnError() {
}
function printSwsxslhz() {
	var nsrsbh = $w("nsrxxMap").getValue("nsrsbh");
	var nsrmc = $w("nsrxxMap").getValue("nsrmc");
	var slr = $w("slxxForm").getValue("swrymc");
	var yhdzlGrid = $w("yhdzlGrid");
	var allGridData = yhdzlGrid.getAllGridData();
	var rowGroup = yhdzlGrid.getCheckedRowData("sftj");
	var length = rowGroup.length;
	if (length == 0) {
		swordAlert("请选择需要打印的核定资料！");
		return;
	}

	var ytjxh = "";
	var printBtn = new SwordSubmit();
	for ( var i = 0; i < length; i++) {
		var ytjbszlmc = rowGroup[i].tds.bszlmc.value;
		var xh = rowGroup[i].tds.xh.value;
		ytjxh += xh;
		printBtn.pushData("ytjbszlmc" + i, ytjbszlmc);
	}

	printBtn.pushData("nsrsbh", nsrsbh);
	printBtn.pushData("nsrmc", nsrmc);
	printBtn.pushData("length", length);
	printBtn.pushData(allGridData);
	printBtn.pushData("slr", slr);
	printBtn.pushData("ytjxh", ytjxh);
	printBtn.setCtrl("SB151zlbsslCtrl_printSwsxslhz");
	swordOpenWin(
			'/sword?ctrl=SB151zlbsslCtrl_printSwsxslhz&r=' + Math.random(),
			printBtn);
}

function qxView() {
	// 预审平台
	$w('nsrxxMap').enable([ 'nsrsbh', 'zlbsdlDm', 'zlbsxlDm' ]);
	$w('bwlshForm').reset();
	$w('bwlshForm').enable();
	xyh = true;
	// cfcjbz="";
	$w("yhdzlGrid").reset();
	$w("whdzlGrid").reset();
	$w('nsrxxMap').resetAll([ 'dcnd', 'zllx', 'ssqq', 'ssqz', 'zlbsdlDm' ]);
	$w('sbToolBar').setEnabled('next');
	// sfsl = 0;
	// $w('slxxForm').resetAll();
}

function queryBybwlsh(e) {
	if (e.code == 13) {
		var bwlsh = $w("bwlshForm").getValue("bwlsh");
		var queryBtn = new SwordSubmit();
		queryBtn.pushData("bwlsh", bwlsh);
		queryBtn.setTid("PBS_SB000_getXxByBwlsh");
		queryBtn.setFunction("onSuccess", "querySuccessbwlsh");
		queryBtn.submit();
	}
}

function querySuccessbwlsh(req, resData) {
	$w("bwlshForm").disable();
	verification(req, resData);
	var lsid = resData.getAttr("lsid");
	$w("bwlshForm").setValue("lsid", lsid);
	var nsrxxMap = $w('nsrxxMap');
	nsrxxMap.setValue('zlbsdlDm', 'ZL1009');
	// 资料报送大类事件
	// getNsrcwzdxx();
	nsrxxMap.setValue('zlbsxlDm', 'ZL1009001');
	// 资料报送小类事件
	checkByXlDm();
	nsrxxMap.disable([ 'nsrsbh', 'zlbsdlDm', 'zlbsxlDm' ]);
}

var zlbsdlIgnore = [ "ZL1002" ];// 屏蔽资料报送大类代码
function zlbsdlFilter(dataObj, inputEl, obj) {
	var newData = [];
	dataObj.each(function(item, index) {
		if (zlbsdlIgnore.indexOf(item.ZLBSDL_DM) > -1)
			return;
		newData[newData.length] = item;
	});
	return newData;
}

/**
 * 是否需要判断财务制度备案
 * 
 * @returns {boolean}
 */
function needCwzdba() {
	var zlbsdlDm = $w("nsrxxMap").getValue("zlbsdlDm").code;
	return _gIsQhjt == "N" && zlbsdlDm == "ZL1001"; // 非千户集团 财务报告报送与信息采集
}

function mHptGetZtabBzxxByTabId() {
	var gwxh = pc.getInitData().getAttr('gwxh');
	var zndm = pc.getInitData().getAttr('zndm');
	var caparam = top.$w("catchParam");
	var swjgdm = caparam.getValue("swjgdm");

	var tabname = $w('nsrxxMap').getValue("zlbsxlDm").caption;

	if (tabname != '') {
		var jsonStr = '{"ztabid":{"value":"newxrw12345678rp111"},"ztitle":{"value":"'
				+ tabname
				+ '"},"pzywxx":{"value":"gwxh='
				+ gwxh
				+ '&zndm='
				+ zndm + '&swjgdm=' + swjgdm + '"}}';

		jsonStr = eval('(' + jsonStr + ')');

		return jsonStr;
	} else {
		return "";
	}
}
/**
 * 取消
 */
function reset() {
	// $w('nsrxxMap').resetAll();
	var xl = "";
	var sl = "";
	$w('nsrxxMap').setValue("zlbsxlDm", xl);
	$w('nsrxxMap').setValue("zlsl", sl);
	$w('nsrxxMap').setValue("blrysfzjlxDm", "");
	$w('nsrxxMap').setValue("blrysfzjhm", "");
}

/**
 * description 网报新增方法:报表回请功能 刘牟新增
 * 
 * @return
 */
function bszlhtsq() {
	var nsrxxMap = $w("nsrxxMap").getSubmitData();
	var initBtn = new SwordSubmit();
	initBtn.pushData("zlbsuuid", zlbsuuidTo);
	initBtn.pushData("zlbsuuid", zlbsuuidOld);
	initBtn.pushData("bszlmc", bszlmcTo);
	initBtn.pushData("bszldm", bszlDmTo);
	initBtn.pushData(nsrxxMap);
	initBtn.setCtrl("BszlhtCtrl_initViewBszlhtsq");
	initBtn.setFunction("onSuccess", function() {
	});
	// initBtn.submit();
	swordAlertIframe('', {
		titleName : "报送资料回退申请",
		width : 900,
		height : 400,
		param : window,
		isNormal : 'true',
		isMax : 'true',
		isClose : 'true',
		isMin : "true",
		// max : "true",
		onClose : close,
		reset : fillreset, // 父页面下一户方法传给子页面
		submit : initBtn
	});
}
/**
 * description 网报新增方法
 * 
 * @return
 */
function close() {
	$w('sbToolBar').setEnabled('next');
}

function zhcwbbbs() {
	var sub = new SwordSubmit();
	sub.setCtrl(ctrl + "_queryKeyvalue");
	sub.setFunction("onSuccess", "zhcwbbbsSuccess");
	sub.submit();
}

function zhcwbbbsSuccess(req, resData) {
	var keyValue = resData.getAttr("keyValue");
	var cszkDz = resData.getAttr("cszkDz");
	if (cszkDz == null || cszkDz == "" || cszkDz == undefined) {// 没有配置地址，则默认海南的地址
		cszkDz = "http://rm-hainan.taxplusplus.com/risk/tax-data-list/financial-data?css-key=";
	}
	// alert(keyValue);
	// $("zhcwbbbs").setStyle('display', '');
	// $("zbDiv").setStyle('display', 'none');
	// $("zhcwbbbsiframe").src =
	// AddBizCode2URL(cszkDz+keyValue+"&embedded=true");
	window.open(AddBizCode2URL(cszkDz + keyValue + "&embedded=true"));
}
