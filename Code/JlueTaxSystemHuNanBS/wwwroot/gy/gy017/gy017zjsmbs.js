/**
 * 浙江实名办税标识 N未启用Y启用
 */
var zjsmbsbz = "N";

/**
 * 获取实名认证需要的相关数据
 */
function getCsz(){
	var rxxtBtn = pc.create("SwordSubmit");
	rxxtBtn.setCtrl("GY017ZjsmbsCtrl_getCsz");
	rxxtBtn.setFunction("onSuccess", "getCszSuccess");
	rxxtBtn.submit();
}

/**
 * 获取实名认证参数成功
 * @param req
 * @param resData
 */
function getCszSuccess(req, resData){	
	zjsmbsbz = resData.getAttr("zjsmbsbz");
}

/**
 * 浙江国税实名办税获取纳税人信息方法，未开启参数或获取失败返回null，使用时请先判断对象是否为空
 * nsrxxAndBsry对象成功返回包含如下内容：
 * nsrxxAndBsry.bsrymc   办税人员名称
 * nsrxxAndBsry.djxh     纳税人登记序号
 * nsrxxAndBsry.nsrsbh   纳税人识别号
 * nsrxxAndBsry.sfzjlxDm 身份证件种类
 * nsrxxAndBsry.sfzjhm   身份证件号码
 * 请根据实际情况获取nsrxxAndBsry对象中的数据
 */
function getZjNrsxxAndBsry() {
	getCsz();
	//浙江实名办税参数未开启，返回
	if(!($chk(zjsmbsbz) && zjsmbsbz == 'Y')){
		return null;
	}
	var nsrxxAndBsry = null;
	try{
		if(typeof parent.getNrsxxAndBsry == "function"){
			nsrxxAndBsry = parent.getNrsxxAndBsry();
		}
	}catch (e) {
		return null;
	}
	return nsrxxAndBsry;
}

/**
 * @description 处理原界面为录入纳税人识别号触发获取纳税人信息的形式
 * @param preInitNsrsbh 是否初始化界面纳税人识别号的值
 * @param nsrxxForm 界面纳税人信息表单
 * @param nsrsbhEleName 界面纳税人信息表单中纳税人识别号元素名称
 * @param callFun 回调函数
 * @param args 回调函数参数（如：按键值）
 */
function handleSmbsForNsrsbh(preInitNsrsbh, nsrxxForm, nsrsbhEleName, callFun, args) {
	var nsrxxAndBsry = getZjNrsxxAndBsry();
	if (!$chk(nsrxxAndBsry) || !nsrxxAndBsry) {
		return;
	}
	
	// 实名办税人信息
	var bsry_sfzjhm = nsrxxAndBsry.sfzjhm;
	var bsry_sfzjlxDm = nsrxxAndBsry.sfzjlxDm;
	var bsry_nsrsbh = nsrxxAndBsry.nsrsbh;	
	if (!$chk(bsry_nsrsbh) || "" == bsry_nsrsbh) {
		return;
	}
	
	if (preInitNsrsbh) {
		nsrxxForm.setValue(nsrsbhEleName, bsry_nsrsbh)
	}
	
	if ($chk(callFun)) {
		callFun.apply(this, args);
	}	
}

/**
 * @description 专用于用业务平台的实现的前端，必须和ywpt_zypz_gy.js中queryNsrxx中的一致（不校验按键事件）
 * @param form 表单名称
 * @param nsrsbhStr 纳税人识别号控件名称
 */
function queryNsrxxForYwptInSmrz(form, nsrsbhStr) {	
	// 和ywpt_zypz_gy.js处理必须一致
	nsrxxFormVar = $w(form);
	var nsrsbh = nsrxxFormVar.getValue(nsrsbhStr);
	// cxbz 查询标志：
	// 1.只查询自然人
	// 2.只查询纳税人(需要权限过滤)
	// 3.只查询纳税人(不权限过滤)
	// 4.查询自然人和纳税人（纳税人需要权限过滤）
	// 5.查询自然人和纳税人（纳税人不权限过滤）
	// 6.只查询纳税人（需要权限过滤，不过滤注销状态的纳税人）
	// 7.根据纳税人识别号查询纳税人信息(有权限校验，并且为外埠纳税人经营地报验登记)
	// 8.根据纳税人识别号查询纳税人信息(无权限校验，并且为单位、个体或临时纳税人)
	// 9.通过识别号查询纳税人信息,有国地税区分（包括注销，核销纳税人信息）
	// 10.查询自然人和纳税人（纳税人需要权限过滤），但是不会抛出异常信息
	// 11.增加查询自然人方法，如果查询不到，做自然人间接登记----只查询自然人
	// 12.查询自然人和纳税人---纳税人需要通过主管税务机关全5位
	// 13.查询自然人和纳税人(有权限过滤。包括注销纳税人)
	// 14.查询自然人和纳税人权限过滤（包括注销和核销的纳税人）
	// 15.只查询单位纳税人登记（没有权限过滤，不包括注销和核销），除过跨区税源登记的
	// 16.查询单位纳税人登记，个体纳税人,临时纳税人（没有权限过滤，不包括注销和核销）
	// 17.通过组织机构代码查询纳税人信(没有权限过滤，不包括注销和核销：除过报验登记基本纳税人信息）
	// 18.查询单位纳税人登记，个体纳税人,临时纳税人（权限过滤，不包括注销和核销）
	// 19.查询自然人和纳税人（纳税人不权限过滤,包括自然人和核销纳税人）
	// 20.只查询纳税人（需要特殊权限过滤:稽查职能和受理职能，不过滤注销状态的纳税人）
	// 21 根据纳税人识别号查询纳税人信息(无权限校验，并且为单位、个体或临时纳税人) 可以用纳税人是查询，如果存在社会信用代码
	// 22 根据纳税人识别号查询纳税人信息(无权限校验，并且为单位、个体或临时纳税人) 可以用纳税人是查询，如果存在社会信用代码 ，排除掉跨区税源登记纳税人为报验登记纳税人信息
	// var cxbz = "3";
	if ('ywpt_cxbz' in window){
		if (_arrVars['ywpt_cxbz'] != undefined && _arrVars['ywpt_cxbz'] != null && _arrVars['ywpt_cxbz'] != ""){
			queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, _arrVars['ywpt_cxbz']);
		}else{
			queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, 3);
		}
	}else{
		queryNsrxxbyNsrsbh(nsrsbh, queryNsrxxSuccess, 3);
	}
}
/**
 * @description 处理原界面为录入纳税人识别号触发获取纳税人信息的形式
 * @param lcswsxDm 流程税务事项代码
 */
function handleNsrsbhByLcswsx(lcswsxDm,callFun) {
	var rxxtBtn = new SwordSubmit();
	rxxtBtn.setCtrl("GY017ZjsmbsCtrl_getCsz");
	if($chk(lcswsxDm)){
		rxxtBtn.pushData("lcswsxDm", lcswsxDm);
	}
	rxxtBtn.setOptions({
		"onSuccess": function (req, resData) {
			var bz = resData.getAttr("zjsmbsbz");
			if (!($chk(bz) && bz == 'Y')) {//浙江实名办税参数未开启，返回
				return;
			}
			try {
				if (typeof parent.getNrsxxAndBsry == "function") {
					var nsrxxAndBsry = parent.getNrsxxAndBsry();
					var bsry_nsrsbh = nsrxxAndBsry.nsrsbh;
					if (!$chk(bsry_nsrsbh) || "" == bsry_nsrsbh) {
						return;
					}
					if ($chk(callFun)) {
						callFun(bsry_nsrsbh);
					}
				}
			} catch (e) {
				return;
			}
		}
	});
	rxxtBtn.submit();
}

/**
 * @description 处理原界面为录入纳税人识别号触发获取纳税人信息的形式
 * @param lcswsxDm 流程税务事项代码
 * @param forName 表单名
 * @param nsrsbhName 纳税人识别号
 */
function handleAndSetNsrsbhByLcswsx(lcswsxDm,forName,nsrsbhName,callFun){
	handleNsrsbhByLcswsx(lcswsxDm,function(nsrsbh){
		$w(forName).setValue(nsrsbhName,nsrsbh);
		var e = new Object();
		e.code = 13;
		callFun(e);
	});
}