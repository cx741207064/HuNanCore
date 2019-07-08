/**
 * 通过识别号查询纳税人自然人信息
 * 
 * @param nsrsbh
 *            纳税人识别号
 * @param func
 *            回调函数
 * @param cxbz
 *            查询标志
 * @return cxbz  1.只查询自然人，
 * 2，只查询纳税人(需要权限过滤)，
 * 3，只查询纳税人(不权限过滤)，
 * 4.查询自然人和纳税人（纳税人需要权限过滤）
 * 5.查询纳税人和自然人信息（不进行权限过滤）
 * 6.只查询纳税人（需要权限过滤，不过滤注销状态的纳税人）
 */
var _func;
function queryNsrxxbyNsrsbh(nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws = /^[A-Za-z0-9]{1,20}$/;
	if (!trws.test(nsrsbh)) {
		swordAlert("纳税人识别号不合法，请重新输入 ");
		return;
	}
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbh");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}
function queryNsrxxbyNsrsbhSsfw(nsrsbh, func, cxbz,djxh) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws = /^[A-Za-z0-9]{1,20}$/;
	if (!trws.test(nsrsbh)) {
		swordAlert("纳税人识别号不合法，请重新输入 ");
		return;
	}
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.pushData('djxh', djxh);

	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbhSsfw");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}
/**
 * 根据纳税人识别号查询纳税人信息(公用,同步核心征管)2016-7-22
 * @param nsrsbh
 * @param func
 * @param cxbz
 * @param slswsxdm
 * @param funcQx
 */
function queryNsrxxbyNsrsbhgy(nsrsbh, func, cxbz,slswsxdm,funcQx) {
	_func = func;
	_funcQx=funcQx;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	if($chk(slswsxdm)&&slswsxdm=="SLSXA011002002"){
			
	} else {
		var trws = /^[A-Za-z0-9]{1,20}$/;
		if (!trws.test(nsrsbh)) {
			swordAlert("纳税人识别号不合法，请重新输入 ");
			return;
		}
	}
	
	//如果纳税人识别号输入15位需要进行提示
	if(nsrsbh.length<15){
		swordConfirm("输入纳税人识别号少于15位，是否继续", {
			okBtnName:"是",
		    cancelBtnName:"否" ,
					onOk : function() {
						querynsrxxvalTggy(nsrsbh, func, cxbz,slswsxdm,funcQx);
					},
					width : 500,
					height : 400
				});
	}else{
		querynsrxxvalTggy(nsrsbh, func, cxbz,slswsxdm,funcQx);
	}	
}
/**
 * 查询纳税人，自然人(公用,同步核心征管)2016-7-22
 * @param resData
 * @return
 */
function querynsrxxvalTggy(nsrsbh, func, cxbz,slswsxdm,funcQx){

	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.pushData('slswsxdm', slswsxdm);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbhgy");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}

//通过识别号查询纳税人信息
function queryNsrxxbyNsrsbh1(nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws=/^[A-Za-z0-9]{1,20}$/;			 
	 if(!trws.test(nsrsbh)){
	 swordAlert("纳税人识别号不合法，请重新输入 ");
	 return ;
	 }
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbh1");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}
// 通过识别号查询纳税人信息和自然人信息
function queryNsrxxbyNsrsbh2(nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws=/^[A-Za-z0-9]{1,20}$/;			 
	 if(!trws.test(nsrsbh)){
	 swordAlert("纳税人识别号不合法，请重新输入 ");
	 return ;
	 }
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbh2");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}

//通过识别号查询纳税人信息和自然人信息
function queryNsrxxbyNsrsbh10(nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws=/^[A-Za-z0-9]{1,20}$/;			 
	 if(!trws.test(nsrsbh)){
	 swordAlert("纳税人识别号不合法，请重新输入 ");
	 return ;
	 }
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbh10");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}


//通过识别号查询纳税人信息和自然人信息,增量房新增方法
function queryNsrxxbyNsrsbhzlf(nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws=/^[A-Za-z0-9]{1,20}$/;			 
	 if(!trws.test(nsrsbh)){
	 swordAlert("纳税人识别号不合法，请重新输入 ");
	 return ;
	 }
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_querycxsbhxx");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}

/**
 * 通过登记序号查询纳税人信息
 * 
 * @param nsrsbh
 *            纳税人登记序号
 * @param func
 *            回调函数
 * @param cxbz
 *            查询标志
 * @return cxbz 1.只查询自然人，
 * 2，只查询纳税人(需要权限过滤)，
 * 3，只查询纳税人(不权限过滤)，
 * 4.查询自然人和纳税人（纳税人需要权限过滤）
 * 5.查询纳税人和自然人信息（不进行权限过滤）
 * 6.只查询纳税人（需要权限过滤，不过滤注销状态的纳税人）
 */ 
function queryNsrxxbyNsrsbhAndDjxh(djxh,nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws=/^[A-Za-z0-9]{1,20}$/;			 
	 if(!trws.test(nsrsbh)){
	 swordAlert("纳税人识别号不合法，请重新输入 ");
	 return ;
	 }
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('djxh', djxh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbh");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}



/**
 * 
 * @param req
 * @param resData
 * @return
 */
function queryNsrxxCommSuccess(req, resData) {
	var nsrjgxx = pc.getResData("nsrjbxxgirdwid", resData);
	var zrrnsrjbxx = pc.getResData("zrrjbxxgirdwid", resData);
	var nsrzgswjg = pc.getResData("nsrzgswjg", resData);
	var nsrSum = resData.getAttr("nsrSum");
	if ($chk(nsrSum)&&nsrSum == 0) {//没有数据
		_func(null, null);
	}
	if ($chk(nsrSum) && nsrSum > 1) {//2条数据
		var submitBtn = pc.create('SwordSubmit');
		submitBtn.setCtrl('GY002CommonCtrl_getMoreNsrxxZrr');
	
		submitBtn.pushData(nsrjgxx);
		submitBtn.pushData(zrrnsrjbxx);
		swordAlertIframe("", {
			titleName : '请确定是否为同一主体',
			width : 800,
			height : 350,
			param : window,
			func : _func,
			nsrzgswjg:nsrzgswjg,
			submit : submitBtn
		});
	} else if ($chk(nsrSum)&&nsrSum ==1) {//一条数据
		var nsrParam=!$chk(nsrjgxx)||!$chk(nsrjgxx.trs)||nsrjgxx.trs.length==0?null:nsrjgxx.trs[0].tds;
		var zrrParam=!$chk(zrrnsrjbxx)||!$chk(zrrnsrjbxx.trs)||zrrnsrjbxx.trs.length==0?null:zrrnsrjbxx.trs[0].tds;

		if($chk(nsrParam)){
		var djxh = nsrParam.djxh.value;
		var nsrzgswjgxxList = nsrzgswjg.data[djxh+'zgswjgList'].value;
	    var zgswjgxx=JSON.decode(nsrzgswjgxxList);
		nsrParam.nsrzgswjgList = {"value":zgswjgxx};
		}
		
		_func(nsrParam,zrrParam);
	}
}
/**
 *  出现异常信息
 * @return
 */
function queryNsrxxCommError(req,res)
{
	
	//swordAlert("查询纳税人失败");

}
//通过识别号查询纳税人信息和自然人信息
function queryNsrxxbyNsrsbhbysfzjhm(sfzjlxDm,sfzjhm, func, cxbz) {
	_func = func;
	if (!$chk(sfzjlxDm)) {
		swordAlert("证件类型不能为空");
		return;
	}
	if (!$chk(sfzjhm)) {
		swordAlert("证件号码不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('sfzjzlDm', sfzjlxDm);
	queryNsrxxBtn.pushData('sfzjhm', sfzjhm);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbh2");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}

/**
 * 查询纳税人，自然人
 * @param resData
 * @return
 */
function querynsrxxvalTg(nsrsbh, func, cxbz){

	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbhclf");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}
function queryNsrxxbyNsrsbhclf(nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws=/^[A-Za-z0-9]{1,20}$/;			 
	 if(!trws.test(nsrsbh)){
	 swordAlert("纳税人识别号不合法，请重新输入 ");
	 return ;
	 }
//	 if(nsrsbh.length<15){
//			swordConfirm("输入纳税人识别号少于15位，是否继续", {
//				okBtnName:"是",
//			    cancelBtnName:"否" ,
//						onOk : function() {
//							querynsrxxvalTg(nsrsbh, func, cxbz);
//						},
//						width : 500,
//						height : 400
//					});
//		}else{
			querynsrxxvalTg(nsrsbh, func, cxbz);
	//}	
	 

}

/**
 * 查询纳税人，自然人
 * @param resData
 * @return
 */
function querynsrxxvalTgcj(nsrsbh, func, cxbz){

	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbhcj");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}
function queryNsrxxbyNsrsbhcj(nsrsbh, func, cxbz) {
	_func = func;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	var trws=/^[A-Za-z0-9]{1,20}$/;			 
	 if(!trws.test(nsrsbh)){
	 swordAlert("纳税人识别号不合法，请重新输入 ");
	 return ;
	 }
//	 if(nsrsbh.length<15){
//			swordConfirm("输入纳税人识别号少于15位，是否继续", {
//				okBtnName:"是",
//			    cancelBtnName:"否" ,
//						onOk : function() {
//							querynsrxxvalTgcj(nsrsbh, func, cxbz);
//						},
//						width : 500,
//						height : 400
//					});
//		}else{
	 querynsrxxvalTgcj(nsrsbh, func, cxbz);
		//}	
	 

}
/**
 * 通过识别号查询纳税人自然人信息
 * 
 * @param nsrsbh
 *            纳税人识别号
 * @param func
 *            回调函数
 * @param cxbz
 *            查询标志
 * @return 
 * cxbz 
 * 1.只查询自然人，
 * 2，只查询纳税人(需要权限过滤)，
 * 3，只查询纳税人(不权限过滤)，
 * 4.查询自然人和纳税人（纳税人需要权限过滤）
 * 5.查询纳税人和自然人信息（不进行权限过滤）
 * 6.只查询纳税人（需要权限过滤，不过滤注销状态的纳税人）
 * 7 根据纳税人识别号查询纳税人信息(有权限校验，并且为外埠纳税人经营地报验登记)
 * 8 根据纳税人识别号查询纳税人信息(无权限校验，并且为单位、个体或临时纳税人)
 * 9 通过识别号查询纳税人信息,有国地税区分（包括注销，核销纳税人信息）
 * 10.查询自然人和纳税人（纳税人需要权限过滤），但是不会抛出异常信息
 * 11.查询自然人方法，如果查询不到，做自然人间接登记
 */
var _func;
var _funcQx;
function queryNsrxxbyNsrsbhForwtdz(nsrsbh, func, cxbz,slswsxdm,funcQx) {
	_func = func;
	_funcQx=funcQx;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	if($chk(slswsxdm)&&slswsxdm=="SLSXA011002002"){
			
	} else {
		var trws = /^[A-Za-z0-9]{1,20}$/;
		if (!trws.test(nsrsbh)) {
			swordAlert("纳税人识别号不合法，请重新输入 ");
			return;
		}
	}
	
	//如果纳税人识别号输入15位需要进行提示
	if(nsrsbh.length<15){
		swordConfirm("输入纳税人识别号少于15位，是否继续", {
			okBtnName:"是",
		    cancelBtnName:"否" ,
					onOk : function() {
						querynsrxxvalTg(nsrsbh, func, cxbz,slswsxdm,funcQx);
					},
					width : 500,
					height : 400
				});
	}else{
		querynsrxxvalTg(nsrsbh, func, cxbz,slswsxdm,funcQx);
	}	
}

/*   
 * MAP对象，实现MAP功能   
 *   
 * 接口：   
 * size()     获取MAP元素个数   
 * isEmpty()    判断MAP是否为空   
 * clear()     删除MAP所有元素   
 * put(key, value)   向MAP中增加元素（key, value)    
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False   
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL   
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL   
 * containsKey(key)  判断MAP中是否含有指定KEY的元素   
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素   
 * values()    获取MAP中所有VALUE的数组（ARRAY）   
 * keys()     获取MAP中所有KEY的数组（ARRAY）   
 */
function Map() {
	this.elements = new Array();

	//获取MAP元素个数     
	this.size = function() {
		return this.elements.length;
	}

	//判断MAP是否为空     
	this.isEmpty = function() {
		return (this.elements.length < 1);
	}

	//删除MAP所有元素     
	this.clear = function() {
		this.elements = new Array();
	}

	//向MAP中增加元素（key, value)      
	this.put = function(_key, _value) {
		this.elements.push( {
			key : _key,
			value : _value
		});
	}

	//删除指定KEY的元素，成功返回True，失败返回False     
	this.remove = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}

	//获取指定KEY的元素值VALUE，失败返回NULL     
	this.get = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return null;
		}
	}

	//获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
	this.element = function(_index) {
		if (_index < 0 || _index >= this.elements.length) {
			return null;
		}
		return this.elements[_index];
	}

	//判断MAP中是否含有指定KEY的元素     
	this.containsKey = function(_key) {
		varbln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}

	//判断MAP中是否含有指定VALUE的元素     
	this.containsValue = function(_value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}

	//获取MAP中所有VALUE的数组（ARRAY）     
	this.values = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	}

	//获取MAP中所有KEY的数组（ARRAY）     
	this.keys = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	}
}

/**
 * 通过识别号查询纳税人自然人信息
 * 
 * @param nsrsbh
 *            纳税人识别号
 * @param func
 *            回调函数
 * @param cxbz
 *            查询标志
 * @return 
 * cxbz 
 * 1.只查询自然人，
 * 2，只查询纳税人(需要权限过滤)，
 * 3，只查询纳税人(不权限过滤)，
 * 4.查询自然人和纳税人（纳税人需要权限过滤）
 * 5.查询纳税人和自然人信息（不进行权限过滤）
 * 6.只查询纳税人（需要权限过滤，不过滤注销状态的纳税人）
 * 7 根据纳税人识别号查询纳税人信息(有权限校验，并且为外埠纳税人经营地报验登记)
 * 8 根据纳税人识别号查询纳税人信息(无权限校验，并且为单位、个体或临时纳税人)
 * 9 通过识别号查询纳税人信息,有国地税区分（包括注销，核销纳税人信息）
 * 10.查询自然人和纳税人（纳税人需要权限过滤），但是不会抛出异常信息
 * 11.查询自然人方法，如果查询不到，做自然人间接登记
 */
var _func;
var _funcQx;
function queryNsrxxbyNsrsbhptfp(nsrsbh, func, cxbz,slswsxdm,funcQx) {
	_func = func;
	_funcQx=funcQx;
	if (!$chk(nsrsbh)) {
		swordAlert("纳税人识别号不能为空");
		return;
	}
	//对纳税人识别号合法性校验
	if($chk(slswsxdm)&&slswsxdm=="SLSXA011002002"){
			
	} else {
		var trws = /^[A-Za-z0-9]{1,20}$/;
		if (!trws.test(nsrsbh)) {
			swordAlert("纳税人识别号不合法，请重新输入 ");
			return;
		}
	}
	
	//如果纳税人识别号输入15位需要进行提示
	if(nsrsbh.length<15){
		swordConfirm("输入纳税人识别号少于15位，是否继续", {
			okBtnName:"是",
		    cancelBtnName:"否" ,
					onOk : function() {
						querynsrxxvalTgptfp(nsrsbh, func, cxbz,slswsxdm,funcQx);
					},
					width : 500,
					height : 400
				});
	}else{
		querynsrxxvalTgptfp(nsrsbh, func, cxbz,slswsxdm,funcQx);
	}	
}
/**
 * 查询纳税人，自然人
 * @param resData
 * @return
 */
function querynsrxxvalTgptfp(nsrsbh, func, cxbz,slswsxdm,funcQx){

		var queryNsrxxBtn = pc.create("SwordSubmit");
		queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
		queryNsrxxBtn.pushData('cxbz', cxbz);
		queryNsrxxBtn.pushData('slswsxdm', slswsxdm);
		queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbhptfp");
		queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess1");
		queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
		queryNsrxxBtn.submit();
	
}

/**
 * 
 * @param req
 * @param resData
 * @return
 */
function querySbfNsrxxCommSuccess(req, resData) {
	var nsrList = pc.getResData("nsrList", resData);
	var zrrList = pc.getResData("zrrList", resData);
	var swjgList = pc.getResData("swjgList", resData);
	var reCode = resData.getAttr("reCode");
	if ($chk(reCode) && reCode == "0") {//没有数据
		_func(null, null);
	}
	if ($chk(reCode) && reCode == "2") {//2条数据
		var submitBtn = pc.create('SwordSubmit');
		submitBtn.setCtrl('GY003CommonCtrl_getMoreNsrxxZrr');
		submitBtn.pushData(nsrList);
		submitBtn.pushData(zrrList);
		submitBtn.pushData(swjgList);
		var t = swordAlertIframe("", {
			titleName : '请确定是否为同一主体',
			width : 1000,
			height : 650,
			param : window,
			func : _func,
			isMax:"true",
			isMin:"true",
			submit : submitBtn,
			onNormal:function(obj) {
			var grid = this.contentIframe.contentWindow.$w("nsrGird");
			grid.options.scrollX="350%";
			grid.buildXY();
			var grid1 = this.contentIframe.contentWindow.$w("zrrGrid");
			grid1.options.scrollX="350%";
			grid1.buildXY();
		},
		onMax:function(obj){
			var grid = this.contentIframe.contentWindow.$w("nsrGird");
			grid.options.scrollX="120%";
			grid.buildXY();
			var grid1 = this.contentIframe.contentWindow.$w("zrrGrid");
			grid1.options.scrollX="120%";
			grid1.buildXY();
		}
		});
		//t.max();	
	} else if ($chk(reCode) && reCode ==1) {//一条数据
		var nsrParam = !$chk(nsrList) || !$chk(nsrList.trs) || nsrList.trs.length == 0 ? null : nsrList.trs[0].tds;
		if($chk(nsrParam)){
			var originNsrParam = JSON.encode(nsrParam);
			var insertStr = '"zgswjgDm":{"value":"' + nsrParam.zgswjDm.value + '"}, "djzclxmc":{"value":""}, "zcdzxzqhszmc":{"zcdzxzqhszmc":""},' +
					'"hymc":{"value":""}, "fddbrsfzjlxmc":{"value":""}, "ssglymc":{"value":""}, "scjydzxzqhszmc":{"value":""}';
			nsrParam = originNsrParam.substr(0,originNsrParam.length-1) + "," + insertStr + "}";
			nsrParam = JSON.decode(nsrParam);
		}
		var zrrParam = !$chk(zrrList.trs) || zrrList.trs.length == 0 ? null : zrrList.trs[0].tds;
		if($chk(zrrParam)){
			var originZrrParam = JSON.encode(zrrParam);
			var insertStr = '"zgswjmc":{"value":"' + zrrParam.xgrDm.value + '"}, "ssglyDm":{"value":""}, "ssglymc":{"zcdzxzqhszmc":""}';
			zrrParam = originZrrParam.substr(0,originZrrParam.length-1) + "," + insertStr + "}";
			zrrParam = JSON.decode(zrrParam);
		}
		_func(nsrParam, zrrParam);
	}
}

/**
 * 查询自然人方法，如果查询不到，做自然人间接登记
 * @param resData
 * @return
 */
function queryZrrxxbyNsrsbhOrSfzjhm(resData, func) {
	_func = func;
	var nsrsbh = resData.get("nsrsbh");
	var sfzjzlDm = resData.get("sfzjzlDm");
	var sfzjhm = resData.get("sfzjhm");
	var gjDm = resData.get("gjDm");
	var xm = resData.get("xm");
	var cxbz = resData.get("cxbz");
	if (!$chk(cxbz)) {
		cxbz = "11";
	}
	// 对纳税人识别号合法性校验
	var trws = /^[A-Za-z0-9]{1,20}$/;
	if ($chk(nsrsbh)&&!trws.test(nsrsbh)) {
		swordAlert("纳税人识别号不合法，请重新输入 ");
		return;
	}
	var queryNsrxxBtn = pc.create("SwordSubmit");
	queryNsrxxBtn.pushData('nsrsbh', nsrsbh);
	queryNsrxxBtn.pushData('sfzjzlDm', sfzjzlDm);
	queryNsrxxBtn.pushData('sfzjhm', sfzjhm);
	queryNsrxxBtn.pushData('gjDm', gjDm);
	queryNsrxxBtn.pushData('xm', xm);
	queryNsrxxBtn.pushData('cxbz', cxbz);
	queryNsrxxBtn.setCtrl("GY002CommonCtrl_queryNsrxxByNsrsbh");
	queryNsrxxBtn.setFunction("onSuccess", "queryNsrxxCommSuccess1");
	queryNsrxxBtn.setFunction("onError", "queryNsrxxCommError");
	queryNsrxxBtn.submit();
}

/**
 * 
 * @param req
 * @param resData
 * @return
 */
function queryNsrxxCommSuccess1(req, resData) {
	var nsrjgxx = pc.getResData("nsrjbxxgirdwid", resData);
	var zrrnsrjbxx = pc.getResData("zrrjbxxgirdwid", resData);
	var nsrzgswjg = pc.getResData("nsrzgswjg", resData);
	var nsrSum = resData.getAttr("nsrSum");
	if ($chk(nsrSum)&&nsrSum == 0) {//没有数据
		_func(null, null);
	}
	if ($chk(nsrSum) && nsrSum > 1) {//2条数据
		var submitBtn = pc.create('SwordSubmit');
		submitBtn.setCtrl('GY002CommonCtrl_getMoreNsrxxZrr');
	
		submitBtn.pushData(nsrjgxx);
		submitBtn.pushData(zrrnsrjbxx);
		var t = swordAlertIframe("", {
			titleName : '请确定是否为同一主体',
			width : 1000,
			height : 650,
			param : window,
			func : _func,
			funcQx:_funcQx,
			nsrzgswjg:nsrzgswjg,
			isMax:'true',
      		isMin:"true",
			submit : submitBtn,
			onNormal:function(obj){
			var grid = this.contentIframe.contentWindow.$w("nsrGird");
        	grid.options.scrollX="350%";
        	grid.buildXY();
        	var grid1 = this.contentIframe.contentWindow.$w("zrrGrid");
        	grid1.options.scrollX="350%";
        	grid1.buildXY();
        },   
        onMax:function(obj){
            var grid = this.contentIframe.contentWindow.$w("nsrGird");
        	grid.options.scrollX="120%";
        	grid.buildXY();
        	var grid1 = this.contentIframe.contentWindow.$w("zrrGrid");
        	grid1.options.scrollX="120%";
        	grid1.buildXY();
        }
	
		});
		//t.max();	
	} else if ($chk(nsrSum)&&nsrSum ==1) {//一条数据
		var nsrParam=!$chk(nsrjgxx)||!$chk(nsrjgxx.trs)||nsrjgxx.trs.length==0?null:nsrjgxx.trs[0].tds;
		var zrrParam=!$chk(zrrnsrjbxx.trs)||zrrnsrjbxx.trs.length==0?null:zrrnsrjbxx.trs[0].tds;

		if($chk(nsrParam)){
		var djxh = nsrParam.djxh.value;
		var nsrzgswjgxxList = nsrzgswjg.data[djxh+'zgswjgList'].value;
	    var zgswjgxx=JSON.decode(nsrzgswjgxxList);
		nsrParam.nsrzgswjgList = {"value":zgswjgxx};
		}
		
		_func(nsrParam,zrrParam);
	}
}