//1、如果多个页面有公共js，则无需对应修改每个页面，只需在公共js （如申报用例的 sb_gy.js, ywpt_zypz_gy.js,在线办税的 ysp009_gyFrame.js）头部增加如下代码：

try {
	document.write('<script type="text/javascript" src="../jspt/styles/style.js"></script>');
} catch (e) {}


var fbisshow = {};
var _arrVars = {};
var nsrxxFormVar = null;
var nsrxxReturn  = null;
var arrRes = {};
var scenceCs="";
var cwgzbz = "zcsb";
var noFbDisplay = "";
var nextOneCtrl = "";
var initFlag = false;
var wssbbz = "";// 网上申报标志
var zrrBz = "";// 自然人标志
var alreadyQueryNsr = "";
var fbTree = "";// 取得附表树的表名
var ybjckg = "";//一表集成开关

//增加初始化延时执行，优化页面展现效果
function onSuccessFormDelay(res){
	(function(){onSuccessForm(res);}).delay(100);
}

function onSuccessForm(res) {
    receiveResData(res);
    var treeXML = pageContainer.getWidget("SwordTreeJSON");
	if (treeXML != undefined && treeXML != null && treeXML != ""){
		fbTree = treeXML.options.dataStr.data;// 执行init方法之前取得附表树,防止有用例的效果开始隐藏附表树而导致附表树取不到数据的情况
	}
	var iszb = ywpt_iszb();
	if (iszb){
    	if (cwgzbz != "cwgzbz" && cwgzbz != "sbdr"){
    		init();
    	}
	}else{
		if(parent.cwgzbz != "cwgzbz" && parent.cwgzbz != "sbdr"){
			init();
		}
	}
    
    // 初始化完成
    initFlag = true;
    
    var flzlGrid = $w('flzlGrid');
    if (flzlGrid != null){
		if (!flzlGrid.collapseDiv.hasClass('x-tool-s')) {
			flzlGrid.toggle();
		}
		if ('ywpt_flzltoggle' in window){
			if (_arrVars['ywpt_flzltoggle'] != undefined && _arrVars['ywpt_flzltoggle'] != null && _arrVars['ywpt_flzltoggle'] != ""){
				if(_arrVars['ywpt_flzltoggle'] == 'Y'){
					flzlGrid.toggle();
				}
			}
		}
    }
    if (iszb){
    	if (cwgzbz == "cwgzbz" || cwgzbz == "sbdr" || cwgzbz == "sbzcdr"){
	        $$("div[sword='SwordForm']").each(function(o) {
				var n = o.get("name");
				$w(n).initData(_arrVars[n]);
			});
	        $$("div[sword='SwordGrid']").each(function(o) {
				var n = o.get("name");
				$w(n).initData(_arrVars[n]);
			});
	        if(cwgzbz != "sbzcdr"){
	        	init();
	        }
    	}
    }else{
    	if (parent.cwgzbz == "cwgzbz" || parent.cwgzbz == "sbdr" || parent.cwgzbz == "sbzcdr"){

		    $$("div[sword='SwordForm']").each(function(o) {
				var n = o.get("name");
				$w(n).initData(parent._arrVars[n]);

			});
		    $$("div[sword='SwordGrid']").each(function(o) {
				var n = o.get("name");
				$w(n).initData(parent._arrVars[n]);

			});
		    if(parent.cwgzbz != "sbzcdr"){
	        	init();
	        }
		    
    	}
    }
    // 电子税务局网上申报系统统一对画面进行处理
    if (wssbbz == "Y"){
    	// 1、置灰纳税人识别号
    	var nsrxxFormArr = "nsrxxForm:nsrsbh,nsrxxForm:nsrmc".split(",");
    	// 2、隐藏受理信息FORM
    	var slxxFormArr = "fjxxForm,slrxxForm".split(",");
    	$$("div[sword='SwordForm']").each(function(o) {
//    		//网报特色修改：置灰非居民所属期begin
//    		if(res && res.getAttr){
//    			var qysdsskssq_cs = res.getAttr('qysdsskssq_cs');
//    			if($chk(qysdsskssq_cs) && qysdsskssq_cs=='Y' ){
//    				$w('nsrxxForm').disable('skssqq');
//    				$w('nsrxxForm').disable('skssqz');
//    			}
//    		}
//    		//网报特色修改：置灰非居民所属期end
    		var n = o.get("name");
    		for(var i = 0;i < nsrxxFormArr.length;i++){
    			if (n == nsrxxFormArr[i].split(":")[0]){
    				nsrxxFormVar = $w(n);
    				$w(n).disable([nsrxxFormArr[i].split(":")[1]]);
    				break;
    			}
    		}
    		for(var i = 0;i < slxxFormArr.length;i++){
    			if (n == slxxFormArr[i]){
    				ywpt_disable(slxxFormArr[i],"DISPLAY:none");
    				break;
    			}
    		}
		});
    	// 3、将保存按钮调整为“申报”
    	// 4、将打印按钮置亮
//    	var arrToolBar = document.all.tags("DIV");
		// 修改 ie11 360  兼容性问题 by lei 
    	var arrToolBar = document.getElementsByTagName("DIV");
    	for (var i = 0;i < arrToolBar.length;i++){
    		if (arrToolBar[i].getAttribute('sword') == 'SwordToolBar'){
    			for (var l = 0;l < arrToolBar[i].children.length;l++){
    				if (arrToolBar[i].children[l].getAttribute('type') == 'save'){
    					var caption = arrToolBar[i].children[l].getAttribute('caption');
    					// 增加对保存的判断，if(caption=="保存")type=="save"还有叫别的按钮名称。
    					if(caption=="保存"){
    						var arrCap = getElementsByName("div","caption");
        					for (var j = 0;j < arrCap.length;j++){
        						if (arrCap[j].innerText.substr(0,caption.length) == caption){
        							arrCap[j].innerText = arrCap[j].innerText.replace(caption,'申报');
        							break;
        						}
        					}
    					}
    					
    				}
    				if (arrToolBar[i].children[l].getAttribute('name') == 'printSbb'){
    					$w(arrToolBar[i].getAttribute('name')).setEnabled(arrToolBar[i].children[l].getAttribute('name'));
    				}
    				if (arrToolBar[i].children[l].getAttribute('name') == 'edit' || arrToolBar[i].children[l].getAttribute('name') == 'openBtn'  || 

arrToolBar[i].children[l].getAttribute('name') == 'nextBtn'  ){
    					ywpt_butdisen("", arrToolBar[i].getAttribute('name'),arrToolBar[i].children[l].getAttribute('name'), 'hid');
    				}
    				if (arrToolBar[i].children[l].getAttribute('name') == 'printHz'){
    					ywpt_butdisen("", arrToolBar[i].getAttribute('name'),arrToolBar[i].children[l].getAttribute('name'), 'dis');
    				}
    				
    				if(arrToolBar[i].children[l].getAttribute('name') == 'zntb' || arrToolBar[i].children[l].getAttribute('name') == 'zxzntb'){
    					if(iszb){
    						if(cwgzbz == "cwgzbz" || cwgzbz == "sbdr" || cwgzbz == "sbzcdr"){
    		    				ywpt_butdisen("", arrToolBar[i].getAttribute('name'),arrToolBar[i].children[l].getAttribute('name'), 'dis');
    						}
    					} else {
    						if(parent.cwgzbz == "cwgzbz" || parent.cwgzbz == "sbdr" || parent.cwgzbz == "sbzcdr"){
    							ywpt_butdisen("", arrToolBar[i].getAttribute('name'),arrToolBar[i].children[l].getAttribute('name'), 'dis');
    						}
    					}
    				}
    			}
    			break;
    		}
    	}
    	if(alreadyQueryNsr != "Y"){
    		queryNsrxxSuccess(nsrxxReturn, null);
    	}
    }
}

// 兼容IE FF的ByName方法
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

// createMyRow =
// gridName11:name11=value11;name12=value12#gridName21:name21=value21;name22=value22
function insertOneRow(name) {
	if (name + "_insertEvent" in window){
		if (eval(name + "_insertEvent") != ""){
			if (eval(_arrVars[name + "_insertEvent"] + "()")){
				
			}else{
				return;
			}
		}
	}
	if ('createMyRow' in window){
	    if (createMyRow != undefined && createMyRow != ""){
	    	var grids = createMyRow.split("#");
	    	var obj = new Array(grids.length);
    		for (var i = 0;i < grids.length;i++){
    			obj[i] = "{'tds' : {";
    			var gridName = grids[i].split(":")[0];
    			var cols = grids[i].split(":")[1];
    			var colsNameAndValues = cols.split(";");
    			for(var m = 0;m < colsNameAndValues.length;m++){
    				var colName = colsNameAndValues[m].split("=")[0];
    				var colValue = colsNameAndValues[m].split("=")[1];
    				obj[i] = obj[i] + "'"+colName+"':{'value':" + "'" + eval("("+colValue+")") + "'" + "},"
    			}
    			obj[i] = obj[i].substring(0, obj[i].length-1);
    			obj[i] = obj[i] + "}}";
    			if(name == gridName){
    				$w(name).insertRow(eval("("+obj[i]+")"));
    				break;
    			}
    		}
	    }
	}else{
		$w(name).insertRow();
	}
}

function deleteOneRow(name){
	if (name + "_deleteEvent" in window){
		if (eval(name + "_deleteEvent") != ""){
			if (eval(_arrVars[name + "_deleteEvent"] + "()")){
				
			}else{
				return;
			}
		}
	}
	var gridName = $w(name);
	var row=gridName.getCheckedRow();// 处理删除单行的情况
	var rowGroup = gridName.getCheckedRow("xz");// 处理带复选框删除选中行的情况
	var rowGroupLength = rowGroup.length;
	
	if(rowGroupLength > 0){
		for ( var i = 0; i < rowGroupLength; i++) {
			gridName.deleting(rowGroup[i]);
		}
		return;
	}
	if(rowGroupLength == 0 && row == null){
		swordAlert('请选择要删除的行');
		return;
	}
	gridName.deleteRow(row);	
	gridName.rereshHjRowData();
	if (name + "_deleteAfterEvent" in window){
		if (eval(name + "_deleteAfterEvent") != ""){
			eval(_arrVars[name + "_deleteAfterEvent"] + "()");
		}
	}
}

function ywpt_createrow(rowData, rowEl, items, obj){
	// VARC.operaterCol.c.operate=rwczA,clickBg,ysuuid:yxqq:yxqz:tddjDm:dwse:ystdmj,【变更】
	if ('operaterCol' in window){
	    if (operaterCol != undefined && operaterCol != ""){
			var htmlStr = "";
			var arrCols = operaterCol.split("#");
			for (var i = 0;i < arrCols.length;i++){
				var arrOps = arrCols[i].split("=");
				var col = arrOps[0];
				if($chk(rowEl.getCell(col))){
					var arrHref = arrOps[1].split(";");
					for (var c = 0;c < arrHref.length;c++){
					    var id = "";
					    var arrA = "";
					    var arrB = arrHref[c].split("@");
					    if(arrB.length > 1){
					        var arrTj = arrB[1].split(",");
					        var flag = true;
					        for(var j = 0; j < arrTj.length; j++){
					            if($chk(eval("rowData.tds['" + arrTj[j] + "']")) && $chk(eval("rowData.tds['" + arrTj[j] + "'].value"))){
					                flag = false;
					            }
					        }
					        if(flag){
					        	arrA = arrB[0].split(",");
					        }
				            else{
				                arrA = arrB[2].split(",");
				            }
				            var arrParam = arrA[2].split(":");
				            for(var k = 0; k < arrParam.length; k++){
				            	var idtmp = "";
				                if(arrParam[k].indexOf("'") >= 0){
				                    idtmp = eval(arrParam[k]);
				                }
				                else{
				                    idtmp = rowData.tds[arrParam[k]];
				                    if(idtmp != undefined){
						                idtmp = idtmp.value;
					                }
				                }
				                if(0 == k){
				                	id = idtmp;
				                }
				                else{
				                    id += "','" + idtmp;
				                }				        
				            }
					    }
					    else{
					        arrA = arrHref[c].split(",");
					        var arrParam = arrA[2].split(":");
					        for(var p = 0; p < arrParam.length; p++){
					        	var idtmp = "";
					            if(arrParam[p].indexOf("'") >= 0){
					                idtmp = eval(arrParam[p]);
					            }
					            else{
					                idtmp = rowData.tds[arrParam[p]];
					                if(idtmp != undefined){
							            idtmp = idtmp.value;
						            }
					            }				        
					            if(0 == p){
				                	id = idtmp;
				                }
				                else{
				                    id += "','" + idtmp;
				                }	
					        }
					    }					
						htmlStr = htmlStr + "<a name=\"" + arrA[0] + "\" onclick=\"" + arrA[1] + "('" + id + "')\" ";
						htmlStr = htmlStr + "class=\"sGrid_data_row_item_a\">" + arrA[3] + "</a>"
					}
					rowEl.getCell(col).innerHTML = htmlStr;
				}				
			}
	    }
	}
}

// 打开附表
function openTab(zbname,inputEl) {
	if (nsrxxReturn == null){
		swordAlert("请选择纳税人！");
		return;
	}
	if ('openTabTJ' in window){
		if (openTabTJ != undefined && openTabTJ != ""){
			if (eval(openTabTJ)){
				swordAlert(openTabTS);
				return;
			}
		}
	}
	
	if ('openValidate' in window){// 如果在打开附表之前需要做校验,就定义这个变量,变量的值是留给用例自己实现的方法来处理校验逻辑
		if (openValidate != undefined && openValidate != null && openValidate != ""){
			var validateMethod = _arrVars["openValidate"];
			eval(validateMethod + "();");
		}
	}

	if ('validateFlag' in window){// 如果在页面中有校验逻辑不通过的地方,需要终止跳转附表的方法的时候,在页面上定义这个全局变量,并且为这个全局变量赋值为N
		if (validateFlag != undefined && validateFlag != null && validateFlag != ""){
			if(_arrVars["validateFlag"] == "N"){
				return;
			}
		}
	}
	
	var name = inputEl.get("code");
	for(var i=0;i < $(name + "_div").parentNode.childNodes.length;i++){
		var node = $(name + "_div").parentNode.childNodes[i];
		if (node.id && node.id != ""){ //注意 此行 不要修改 解决ie9 ie11 360申报附表打不开问题   by lei
			if (node.id.substr(node.id.length-4,4) == "_div"){
				if (node.style.display != "none"){
					node.style.display = "none";
				}
			}
		}
	}
	
	$(name + "_div").style.display = "block";
	if (zbname != name){
		var values = "";
		if ('openTabTiJiao' in window){
			if (openTabTiJiao != undefined && openTabTiJiao != ""){
				var arr = openTabTiJiao.split(",");
				for (var i = 0;i < arr.length;i++){
					var value = "";
					var key = arr[i].split("=")[0];
					var valueName = arr[i].split("=")[1];
					// 如果是表单的某个数据项，例如：nsrxxForm[nsrsbh]
					if (valueName.indexOf("[") >= 0){
						var form = $w(valueName.substr(0, valueName.indexOf("[")));
						value = form.getValue(valueName.substr(valueName.indexOf("[")+1,valueName.indexOf("]") - valueName.indexOf("[") - 1));
						if (typeof(value) == "object"){
							value = value.code;
						}
						values = values + "&" + key + "=" + value;
					}else{
						if (valueName == "nsrxxReturn"){
							var nsrxxVO = {};
							// 开始遍历
							for ( var prop in nsrxxReturn) {
								if (typeof (nsrxxReturn[prop]) == " function ") { // 方法
									nsrxxReturn[prop]();
								} else { // p 为属性名称，nsrParam[p]为对应属性的值
									nsrxxVO[prop] = nsrxxReturn[prop].value;
								}
							}
							var nsrxxJsonVO = JSON.encode(nsrxxVO);
							submitButton.pushData(key, JSON.encode(JSON.decode(nsrxxJsonVO)));
						}else{
							// 如果变量是定义变量中的内容
							if (_arrVars[valueName] != null && _arrVars[valueName] != undefined){
								value = _arrVars[valueName];
								values = values + "&" + key + "=" + value;
							}else{
								// 当提交数据的内容为一个常量,例如sblx='0'
								if (valueName.indexOf("'") >= 0){
									value = eval(valueName);
								}else{
									var _arrVarName = valueName.split(".");
									if (_arrVarName[0] in window){
										value = eval(valueName);
									}
								}
								values = values + "&" + key + "=" + value;
							}
						}
					}
				}
			}
		}
		if (!$chk(fbisshow[name]) || fbisshow[name].value == "N"){
//			document.all(name + "_iframe").src = AddBizCode2URL("/sword?ctrl=" + _arrVars['CtrlClass'] + "&id=" + name + values);
			// 修改 ie11 360  兼容性问题 by lei 
	    	document.getElementById(name + "_iframe").src = AddBizCode2URL("/sword?ctrl=" + _arrVars['CtrlClass'] + "&id=" + name + values);
			fbisshow[name] = {"value":"Y"};
		}else{
			if ("openTabInit" in window){
				if (openTabInit != undefined && openTabInit == "init"){
					try{
						$(name + "_iframe").contentWindow.init();
					}catch(e){}
				}else if (openTabInit != undefined && openTabInit == "ctrl"){
//					document.all(name + "_iframe").src = AddBizCode2URL("/sword?ctrl=" + _arrVars['CtrlClass'] + "&id=" + name + values);
					// 修改 ie11 360  兼容性问题 by lei 
			    	document.getElementById(name + "_iframe").src = AddBizCode2URL("/sword?ctrl=" + _arrVars['CtrlClass'] + "&id=" + name + values);

					fbisshow[name] = {"value":"Y"};
				}
			}
		}
	}
}
function changeDate(fieldName){
	if ('changeDateEvent' in window){
		if (changeDateEvent != undefined && changeDateEvent != null && changeDateEvent != ""){
			var arr = changeDateEvent.split(",");
			for (var i = 0;i < arr.length;i++){
				if (arr[i].split("=")[0] == fieldName.name){
					eval(arr[i].split("=")[1] + "();");
					break;
				}
			}
		}
	}
	return true;
}


function isEnterUp(e) {
	var code = e.keyCode ? e.keyCode : e.code;
	return code == 13 || code == 32;
}

function queryNsrxx(form){
	if (!isEnterUp(window.event)) {
		return;
	}
	var nsrsbh = window.event.srcElement.value;
	nsrxxFormVar = $w(form);
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
	//网报修改queryNsrxxbyNsrsbh方法修改为queryNsrxxbyNsrsbhgy方法
	if ('ywpt_cxbz' in window){
		if (_arrVars['ywpt_cxbz'] != undefined && _arrVars['ywpt_cxbz'] != null && _arrVars['ywpt_cxbz'] != ""){
			queryNsrxxbyNsrsbhgy(nsrsbh, queryNsrxxSuccess, _arrVars['ywpt_cxbz']);
		}else{
			queryNsrxxbyNsrsbhgy(nsrsbh, queryNsrxxSuccess, 3);
		}
	}else{
		queryNsrxxbyNsrsbhgy(nsrsbh, queryNsrxxSuccess, 3);
	}
}

/**
 *  出现异常信息
 * @return
 */
function queryNsrxxCommError(req,res){
	var exceptionMes;
	if($chk(res) && $chk(res.exceptionMes)){
		exceptionMes = res.exceptionMes.split(":")[0];// 非正常异常码，需要和后台对应,如果修改异常码，需要同时修改
		if ('ywpt_tsbz' in window){
			if (_arrVars['ywpt_tsbz'] != undefined && _arrVars['ywpt_tsbz'] != null && _arrVars['ywpt_tsbz'] != ""){
				if(_arrVars['ywpt_tsbz'] == "1" && exceptionMes == "1010010094000001"){
					swordAlert("纳税人在系统中不存在，请做间接登记");
				}
			}
		}
	}
}

/**
 * 校验纳税人状态
 * 
 * @param param
 *            根据查的纳税人或是自然人传值
 * @return
 */
function checkNsrzt(param){
	var nsrztDm = param.nsrztDm.value;
	var checkFlags = "";
	if ('ywpt_checkNsrzt' in window){
		if (_arrVars['ywpt_checkNsrzt'] != undefined && _arrVars['ywpt_checkNsrzt'] != null && _arrVars['ywpt_checkNsrzt'] != ""){
		    checkFlags = _arrVars['ywpt_checkNsrzt'];
		}
	}
	if (nsrztDm == "07") {
		swordAlert("纳税人为注销状态，请先办理重新税务登记！");
		if(checkFlags.indexOf("07") >= 0){
			return true;
		}
		return false;
	} else if (nsrztDm == "04") {
		swordAlert("本纳税人在本属期内停业！");
		if(checkFlags.indexOf("04") >= 0){
			return true;
		}
		return false;
	} else if (nsrztDm == "05") {
	    if(checkFlags.indexOf("05") >= 0){
			swordAlert("非正常户不能使用此功能！");
			return false;
		}
		swordAlert("纳税人处于非正常户状态，可继续进行申报，请尽快进行非正常户解除。", {
		});
	} else if (nsrztDm == "06") {
		swordAlert("纳税人处于清算状态，可继续进行申报。", {
		});
	} 
	return true;
}

/*******************************************************************************
 * 查询纳税人信息成功回调函数
 * 
 * @param nsrParam
 *            纳税人信息返回参数
 * @param zrrParam
 *            自然人信息返回参数
 * @return
 */
function queryNsrxxSuccess(nsrParamVar, zrrParam) {
	var nsrParam = {};
	if(typeof nsrParamVar === "object" ){
		nsrParam = nsrParamVar;
	}else{
		nsrParam = JSON.decode(nsrParamVar);
	}
	if((nsrParam == "" || nsrParam == null || nsrParam == undefined) && (zrrParam == "" || zrrParam == null || zrrParam == undefined) && 'ywpt_cxbz' in window){
		if (_arrVars['ywpt_cxbz'] != undefined && _arrVars['ywpt_cxbz'] != null && _arrVars['ywpt_cxbz'] != "" && _arrVars['ywpt_cxbz'] == '10'){
			if ('jumpZrrJjdj' in window){// 跳转自然人间接登记
				if (eval("jumpZrrJjdj") != ""){
					eval(_arrVars["jumpZrrJjdj"] + "()");
				}
			}
		}else if(_arrVars['ywpt_cxbz'] != undefined && _arrVars['ywpt_cxbz'] != null && _arrVars['ywpt_cxbz'] != ""){
			if((nsrParam == "" || nsrParam == null || nsrParam == undefined) && zrrParam == null){
				if('ywpt_queryError' in window){
					if (_arrVars['ywpt_queryError'] != undefined && _arrVars['ywpt_queryError'] != null && _arrVars['ywpt_queryError'] != ""){
						if (eval(ywpt_queryError + "()")){
						}else{
							return;
						}
					}
				}else{
					swordAlert("未能根据当前纳税人识别号查询到当前纳税人基本数据信息，请重新输入！");
					return;
				}
			}
		}
	}else if ((nsrParam == "" || nsrParam == null || nsrParam == undefined) && zrrParam == null) {
		swordAlert("未能根据当前纳税人识别号查询到当前纳税人基本数据信息，请重新输入！");
		return;
	}else if((nsrParam == "" || nsrParam == null || nsrParam == undefined) && zrrParam != null){
		nsrxxReturn = zrrParam;
		zrrBz = "Y";
		if(fbTree != "" && fbTree != null && fbTree != undefined){
			$w('SwordTreeJSON').setSelectValue(fbTree[0].caption);
		}
		if ('getAndSetNsrxxVar' in window && getAndSetNsrxxVar != undefined && getAndSetNsrxxVar != null){
			var arr = getAndSetNsrxxVar.split(",");// "nsrmc=nsrmc,fjmqysdsNdnssbbForm[djxh]=djxh,fjmqysdsNdnssbbForm[hyDm]=hyDm";
			for (var i = 0;i < arr.length;i++){
				if (arr[i].indexOf("[") >= 0){
					var value = eval("zrrParam." + arr[i].split("=")[1] + ".value");
					$w(arr[i].substr(0, arr[i].indexOf("["))).setValue(arr[i].substr(arr[i].indexOf("[")+1,arr[i].indexOf("]") - arr[i].indexOf

("[") - 1), value);
				}else{
					var value = eval("zrrParam." + arr[i].split("=")[1] + ".value");
					nsrxxFormVar.setValue(arr[i].split("=")[0], value);
				}
			}
		}
		if ('getNsrxxSuccess' in window && getNsrxxSuccess != undefined && getNsrxxSuccess != null){
			if (getNsrxxSuccess != ""){
				eval(getNsrxxSuccess + "();");
			}
		}
	}else {
		var nsrztFlag = checkNsrzt(nsrParam);// 校验纳税人状态
		if(nsrztFlag == true){
			nsrxxReturn = nsrParam;
			zrrBz = "N";
			if(fbTree != "" && fbTree != null && fbTree != undefined){
				$w('SwordTreeJSON').setSelectValue(fbTree[0].caption);
			}
			if ('getAndSetNsrxxVar' in window && getAndSetNsrxxVar != undefined && getAndSetNsrxxVar != null){
				var arr = getAndSetNsrxxVar.split(",");
				for (var i = 0;i < arr.length;i++){
					if (arr[i].indexOf("[") >= 0){
						var value = eval("nsrParam." + arr[i].split("=")[1] + ".value");
						$w(arr[i].substr(0, arr[i].indexOf("["))).setValue(arr[i].substr(arr[i].indexOf("[")+1,arr[i].indexOf("]") - arr

[i].indexOf("[") - 1), value);
					}else{
						var value = eval("nsrParam." + arr[i].split("=")[1] + ".value");
						if(nsrxxFormVar != undefined && nsrxxFormVar != null){
							nsrxxFormVar.setValue(arr[i].split("=")[0], value);
						}
					}
				}
			}
			if ('getNsrxxSuccess' in window && getNsrxxSuccess != undefined && getNsrxxSuccess != null){
				if (getNsrxxSuccess != ""){
					eval(getNsrxxSuccess + "();");
				}
			}
		}
	}
}

/**
 * 向画面内部的某个表单付值
 * 
 * @param formName
 *            要付值的表单名称
 * @param item
 *            要付值的数据项名称
 * @param value
 *            要付值的值
 */
function ywpt_bnfz(formName,item,value){
	if (formName == ""){
		return;
	}
	var form = $w(formName);
	if (form == undefined){
		return;
	}
	if (item == ""){
		return;
	}else if (item == "initData"){
		form.initData(value);
		return;
	}
	var itemValue = form.getValue(item);
	if (itemValue == undefined){
		return;
	}
	if (!isNaN(parseFloat(value))){
		form.setValue(item,value);
	}else if(value == undefined){
		return;
	}else{
		form.setValue(item,value.replace("。","."));
	}
}
/**
 * 向其他画面的某个表单的某个数据项付值
 * 
 * @param toIframe
 *            要付值的画面（如果为空，则就是想当前画面付值）
 * @param toFormName
 *            要付值的表单名称
 * @param toItem
 *            要付值的数据项名称
 * @param value
 *            要付值的值（可以是变量，也可以是常量）
 */
function ywpt_bjfz(toIframe,toFormName,toItem,value){
	var iszb = ywpt_iszb();
	var toForm;
	// 要向当前表单的画面数据项付值
	if (toIframe == ""){
		toForm = $w(toFormName);
		// 如果当前画面的表单不存在，则不做处理直接返回
		if (toForm == undefined){
			return;
		}
	// 要向其他画面的表单数据项付值
	}else{
		// 如果当前画面不是主表
		if (iszb == false){
			// 如果要付值的附表已经打开，可以付值
			if ($chk(parent.fbisshow[toIframe]) && parent.fbisshow[toIframe].value == "Y"){
				toForm = parent.$(toIframe + "_iframe").contentWindow.$w(toFormName);
				// 如果当前画面的表单不存在，则不做处理直接返回
				if (toForm == undefined){
					return;
				}
			// 附表往主表赋值
			}else if(parent.$w(toFormName) != undefined && parent.$w(toFormName) != null && parent.$w(toFormName) != ""){
				// 如果要付值的附表已经打开，可以付值
				toForm = parent.$w(toFormName);
				// 如果当前画面的表单不存在，则不做处理直接返回
				if (toForm == undefined){
					return;
				}
			}else{
				return;
			}
		// 如果当前画面为主表
		}else{
			// 如果要付值的附表已经打开，可以付值
			if ($chk(fbisshow[toIframe]) && fbisshow[toIframe].value == "Y"){
				toForm = $(toIframe + "_iframe").contentWindow.$w(toFormName);
				// 如果当前画面的表单不存在，则不做处理直接返回
				if (toForm == undefined){
					return;
				}
			// 如果要付值的附表未打开，则不做处理直接返回
			}else{
				return;
			}
		}
	}
	// 如果要付值的数据项不存在，则不做处理直接返回
	if (toItem == "") {
		return;
	}else if (toItem == "initData"){
		toForm.initData(value);
		return;
	}
	var itemValue = toForm.getValue(toItem);
	// 如果要付值的数据项不存在，则不做处理直接返回
	if (itemValue == undefined) {
		return;
	}
	if (!isNaN(parseFloat(value))){
		toForm.setValue(toItem,value);
	}else{
		toForm.setValue(toItem,value.replace("。","."));
	}
}

function ywpt_getvalue(iframe,formName,jisuanitem){
	// 记录当前事件触发者的相关数据项
	if (_arrVars["_eventSrcElement"] == undefined || _arrVars["_eventSrcElement"] == ""){
		if (window.event != null){
			if (window.event.srcElement != undefined && window.event.srcElement != null){
				if (jisuanitem.indexOf(window.event.srcElement.name) >=0){
					_arrVars["_eventSrcElement"] = window.event.srcElement.name + "," + jisuanitem;
				}
			}else{
				_arrVars["_eventSrcElement"] = jisuanitem;
			}
		}else{
			_arrVars["_eventSrcElement"] = jisuanitem;
		}
	}else{
		_arrVars["_eventSrcElement"] = _arrVars["_eventSrcElement"] + "," + jisuanitem;
	}
	var iszb = ywpt_iszb();
	var toForm;
	// 要向当前表单的画面数据项付值
	if (iframe == ""){
		toForm = $w(formName);
		// 如果当前画面的表单不存在，则不做处理直接返回
		if (toForm == undefined){
			return;
		}
	// 要向其他画面的表单数据项付值
	}else{
		// 如果当前画面不是主表
		if (iszb == false){
			if (iframe == "zb"){
				toForm = parent.$w(formName);
				// 如果当前画面的表单不存在，则不做处理直接返回
				if (toForm == undefined){
					return;
				}
			}else{
				// 如果要付值的附表已经打开，可以付值
				if ($chk(parent.fbisshow[iframe]) && parent.fbisshow[iframe].value == "Y"){
					toForm = parent.$(iframe + "_iframe").contentWindow.$w(formName);
					// 如果当前画面的表单不存在，则不做处理直接返回
					if (toForm == undefined){
						return;
					}
				// 如果要付值的附表未打开，则不做处理直接返回
				}else{
					return;
				}
			}
		// 如果当前画面为主表
		}else{
			// 如果要付值的附表已经打开，可以付值
			if ($chk(fbisshow[iframe]) && fbisshow[iframe].value == "Y"){
				toForm = $(iframe + "_iframe").contentWindow.$w(formName);
				// 如果当前画面的表单不存在，则不做处理直接返回
				if (toForm == undefined){
					return;
				}
			// 如果要付值的附表未打开，则不做处理直接返回
			}else{
				return;
			}
		}
	}
	if (jisuanitem.substr(0,1) == "="){
		hj = ywpt_exceljs(jisuanitem,form);// 調用解析計算公式方法,返回合計值
	}else{
		// 解析jisuanitem
		var arrh = jisuanitem.replace("(","").replace(")","").split(",");
		if (arrh.length == 1){
			var je = toForm.getSubmitData().data[arrh[0]];
			// 如果不是画面上的值，而是一个变量
			if (je == undefined){
				je = _arrVars[arrh[0]];
				if (je == undefined){
					eval("je = " + arrh[0] + ";");
				}
			}else{
				je = toForm.getValue(arrh[0]);
			}
			return je;
		}
		// 开始计算
		var hj = ywpt_jxjsgs(arrh,toForm,formName);// 調用解析計算公式方法,返回合計值
	}
	return hj.round(2);
}
function ywpt_getDataValue(iframe,formName,jisuanitem){
	if (iframe == ""){
		return ywpt_getvalue(iframe,formName,jisuanitem);
	}else{
		if (fbisshow[iframe] == undefined || fbisshow[iframe].value != "Y"){
			return getYwptVars(formName,jisuanitem,0.00);
		}else{
			return ywpt_getvalue(iframe,formName,jisuanitem);
		}
	}
}
/**
 * 表内数据计算公式
 * 
 * @param formName
 *            画面中的表单名称
 * @param item
 *            要付值的数据项名称
 * @param jisuanitem
 *            计算源数据项，多个数据项之间使用逗号分割， 可以使用加、减、乘、除、绝对值五则运算符号
 *            如果计算公式中存在的常量（带小数点的），小数点需要用“。”表示，例如：0。3
 * @param rand
 *            付值的精度
 * @returns {Number} 无返回值
 */
function ywpt_bnjs(formName,item,jisuanitem,rand){
	if (formName.substr(formName.length-4,4) == "Grid"){
		setGridMoreLvalue(formName,item,jisuanitem,"",rand);
		return;
	}
	// 记录当前事件触发者的相关数据项
	if (_arrVars["_eventSrcElement"] == undefined || _arrVars["_eventSrcElement"] == ""){
		if (window.event != null){
			if (window.event.srcElement != undefined && window.event.srcElement != null){
				if (jisuanitem.indexOf(window.event.srcElement.name) >=0){
					_arrVars["_eventSrcElement"] = window.event.srcElement.name + "," + item;
				}
			}else{
				_arrVars["_eventSrcElement"] = item;
			}
		}else{
			_arrVars["_eventSrcElement"] = item;
		}
	}else{
		_arrVars["_eventSrcElement"] = _arrVars["_eventSrcElement"] + "," + item;
	}
	// 解析jisuanitem
	var arrh = null;
	if (jisuanitem.substr(0,1) == "="){
		var gsitem = jisuanitem.substr(1).replace(/iif\(/g,"").replace(/\(/g,"").replace(/\)/g,"");
		gsitem = gsitem.replace(/\*/g,"#****#");
		gsitem = gsitem.replace(/\//g,"#****#");
		gsitem = gsitem.replace(/\+/g,"#****#");
		gsitem = gsitem.replace(/-/g,"#****#");
		gsitem = gsitem.replace(/>=/g,"#****#");
		gsitem = gsitem.replace(/<=/g,"#****#");
		gsitem = gsitem.replace(/!=/g,"#****#");
		gsitem = gsitem.replace(/==/g,"#****#");
		gsitem = gsitem.replace(/>/g,"#****#");
		gsitem = gsitem.replace(/</g,"#****#");
		gsitem = gsitem.replace(/,/g,"#****#");
		arrh = gsitem.split("#****#");
	}else{
		arrh = jisuanitem.replace("(","").replace(")","").split(",");
	}
	var canyujs = false;
	if (window.event != null){
		for (var i = 0;i < arrh.length;i++){
			// 判断每一个参与计算的数据项是否是与本次事件的触发者有关系，如果有关系向下进行处理
			if (_arrVars["_eventSrcElement"] != undefined && _arrVars["_eventSrcElement"].indexOf(arrh[i].substr(1)) >=0){
				_arrVars["_eventSrcElement"] = _arrVars["_eventSrcElement"] + "," + item;
				canyujs = true;
				break;
			}
		}
	}
	if (canyujs == false && window.event != null && initFlag != false){
		return;
	}
	// alert(_arrVars["_eventSrcElement"] + "====" + jisuanitem);
	if (formName == ""){
		return;
	}
	var form = $w(formName);
	if (form == undefined){
		return;
	}
	if (item == ""){
		return;
	}
	var itemValue = form.getValue(item);
	if (itemValue == undefined){
		return;
	}
	var hj = 0;
	// 开始计算
	if (jisuanitem.substr(0,1) == "="){
		hj = ywpt_exceljs(jisuanitem,form);// 調用解析計算公式方法,返回合計值
	}else{
		hj = ywpt_jxjsgs(arrh,form,formName);// 調用解析計算公式方法,返回合計值
	}
	// 将计算结果付值给对应的数据项
	if (rand == null){
		if(hj == 0){
			form.setValue(item,"0.00");
		}else{			
			form.setValue(item,hj.round(2));
		}
	}else{
		if(hj == 0){
			form.setValue(item,"0.00");
		}else{			
			form.setValue(item,hj.round(rand));
		}
	}
}
/**
 * 表间数据公式计算
 * 
 * @param toIframe
 *            将计算结果保存到哪一个画面
 * @param toFormName
 *            将计算结果保存到哪一个表单
 * @param toItem
 *            将计算结果保存到哪一个数据项
 * @param fromFormName
 *            从当前画面的哪一个表单获取数据
 * @param jisuanitem
 *            计算源数据项，多个数据项之间使用逗号分割， 可以使用加、减、乘、除、绝对值五则运算符号
 *            如果计算公式中存在的常量（带小数点的），小数点需要用“。”表示，例如：0。3
 * @param rand
 *            付值的精度
 */
function ywpt_bjjs(toIframe,toFormName,toItem,fromFormName,jisuanitem,rand){
	// 由于表间计算是属于最后一个计算环节，所以清空事件触发者的影响数据项
	_arrVars["_eventSrcElement"] = "";
	var iszb = ywpt_iszb();
	var toForm;
	// 要向当前表单的画面数据项付值
	if (toIframe == ""){
		toForm = $w(toFormName);
		// 如果当前画面的表单不存在，则不做处理直接返回
		if (toForm == undefined){
			return;
		}
	// 要向其他画面的表单数据项付值
	}else{
		// 如果当前画面不是主表
		if (iszb == false){
			if (toIframe == "zb"){
				toForm = parent.$w(toFormName);
				// 如果当前画面的表单不存在，则不做处理直接返回
				if (toForm == undefined){
					return;
				}
			}else{
				// 如果要付值的附表已经打开，可以付值
				if ($chk(parent.fbisshow[toIframe]) && parent.fbisshow[toIframe].value == "Y"){
					toForm = parent.$(toIframe + "_iframe").contentWindow.$w(toFormName);
					// 如果当前画面的表单不存在，则不做处理直接返回
					if (toForm == undefined){
						return;
					}
				// 如果要付值的附表未打开，则不做处理直接返回
				}else{
					return;
				}
			}
		// 如果当前画面为主表
		}else{
			// 如果要付值的附表已经打开，可以付值
			if ($chk(fbisshow[toIframe]) && fbisshow[toIframe].value == "Y"){
				toForm = $(toIframe + "_iframe").contentWindow.$w(toFormName);
				// 如果当前画面的表单不存在，则不做处理直接返回
				if (toForm == undefined){
					return;
				}
			// 如果要付值的附表未打开，则不做处理直接返回
			}else{
				return;
			}
		}
	}
	// 如果要付值的数据项不存在，则不做处理直接返回
	if (toItem == "") {
		return;
	}
	var itemValue = toForm.getValue(toItem);
	// 如果要付值的数据项不存在，则不做处理直接返回
	if (itemValue == undefined) {
		return;
	}
	var fromForm = $w(fromFormName);
	// 如果当前画面的要提取数据的源表单不存在，则不做处理直接返回
	if (fromForm == undefined){
		return;
	}
	// 解析jisuanitem
	var arrh = jisuanitem.replace("(","").replace(")","").split(",");
	// 开始计算
	var hj = ywpt_jxjsgs(arrh,fromForm,fromFormName);// 調用解析計算公式方法,返回合計值
	// 将计算结果付值给对应的数据项
	if (rand == null) {
		if(hj == 0){
			toForm.setValue(toItem,"0.00");
		}else{			
			toForm.setValue(toItem,hj.round(2));
		}
	} else {
		if(hj == 0){
			toForm.setValue(toItem,"0.00");
		}else{			
			toForm.setValue(toItem,hj.round(rand));
		}
	}
}
/**
 * 调用某个画面的JS函数
 * 
 * @param iframe
 *            要调用JS函数的画面
 * @param func
 *            要调用的JS函数
 * @param canshu
 *            该函数的入参
 */
function ywpt_call(iframe,func,canshu){
	var iszb = ywpt_iszb();
	// 要向当前表单的画面数据项付值
	if (iframe == ""){
		if (canshu == ""){
			eval(func + "();");
		}else{
			eval(func + "(" + canshu + ");");
		}
		return;
	// 要向其他画面的表单数据项付值
	}else{
		// 如果当前画面不是主表
		if (iszb == false){
			if (iframe == "zb"){
				if (canshu == ""){
					eval("parent." + func + "();");
				}else{
					eval("parent." + func + "(" + canshu + ");");
				}
			}else{
				// 如果要付值的附表已经打开，可以付值
				if ($chk(parent.fbisshow[iframe]) && parent.fbisshow[iframe].value == "Y"){
					if (canshu == ""){
						eval("parent.$('" + iframe + "_iframe').contentWindow." + func + "();");
					}else{
						eval("parent.$('" + iframe + "_iframe').contentWindow." + func + "(" + canshu + ");");
					}
				// 如果要付值的附表未打开，则不做处理直接返回
				}else{
					return;
				}
			}
		// 如果当前画面为主表
		}else{
			// 如果要付值的附表已经打开，可以付值
			if ($chk(fbisshow[iframe]) && fbisshow[iframe].value == "Y"){
				if (canshu == ""){
					eval("$('" + iframe + "_iframe').contentWindow." + func + "();");
				}else{
					eval("$('" + iframe + "_iframe').contentWindow." + func + "(" + canshu + ");");
				}
			// 如果要付值的附表未打开，则不做处理直接返回
			}else{
				return;
			}
		}
	}
}

/**
 * 发起一次提交
 * 
 * @param iframe
 * @param ctrl
 * @param tijiao
 * @param onSuccess
 * @param onError
 * @param submitType
 */
function ywpt_submit(iframe,ctrl,tijiao,onSuccess,onError,submitType){
	var submitButton;
	var treeXML = pageContainer.getWidget("SwordTreeJSON");
	var fbTree = "";
	if (treeXML != undefined && treeXML != null && treeXML != ""){
		fbTree = treeXML.options.dataStr.data;
	}
	var ctrlData = [];
	ctrlData = ctrl.split(",");
	var noSaveAction = false;
	if(ctrlData[ctrlData.length-1] == "noSave"){
		noSaveAction = true;
	}
	if (iframe == ""){
		submitButton = new SwordSubmit();
	}else{
		var iszb = ywpt_iszb();
		// 如果当前画面不是主表
		if (iszb == false){
			if (iframe == "zb"){
				submitButton = parent.$w("cshBtn");
			}else{
				// 如果要付值的附表已经打开，可以付值
				if ($chk(parent.fbisshow[iframe]) && parent.fbisshow[iframe].value == "Y"){
					submitButton = parent.$(iframe + "_iframe").contentWindow.$w("cshBtn");
				// 如果要付值的附表未打开，则不做处理直接返回
				}else{
					return;
				}
			}
		// 如果当前画面为主表
		}else{
			// 如果要付值的附表已经打开，可以付值
			if ($chk(fbisshow[iframe]) && fbisshow[iframe].value == "Y"){
				submitButton = $(iframe + "_iframe").contentWindow.$w("cshBtn");
			// 如果要付值的附表未打开，则不做处理直接返回
			}else{
				return;
			}
		}
	}
	var arr = tijiao.split(",");
	for (var i = 0;i < arr.length;i++){
		// 如果是提交某个变量，则必须格式为xxx=vvv
		if (arr[i].indexOf("=") >= 0){
			var value = "";
			var key = arr[i].split("=")[0];
			var valueName = arr[i].split("=")[1];
			// 如果是表单的某个数据项，例如：nsrxxForm[nsrsbh]
			if (valueName.indexOf("[") >= 0){
				var form = $w(valueName.substr(0, valueName.indexOf("[")));
				value = form.getValue(valueName.substr(valueName.indexOf("[")+1,valueName.indexOf("]") - valueName.indexOf("[") - 1));
				if (typeof(value) == "object"){
					value = value.code;
				}
				submitButton.pushData(key, value);
			}else{
				if (valueName == "nsrxxReturn"){
					var nsrxxVO = {};
					// 开始遍历
					for ( var prop in nsrxxReturn) {
						if (typeof (nsrxxReturn[prop]) == " function ") { // 方法
							nsrxxReturn[prop]();
						} else { // p 为属性名称，nsrParam[p]为对应属性的值
							nsrxxVO[prop] = nsrxxReturn[prop].value;
						}
					}
					var nsrxxJsonVO = JSON.encode(nsrxxVO);
					submitButton.pushData(key, JSON.encode(JSON.decode(nsrxxJsonVO)));
				}else{
					// 如果变量是定义变量中的内容
					if (_arrVars[valueName] != null && _arrVars[valueName] != undefined){
						value = _arrVars[valueName];
						if (typeof(value) == "object"){
							submitButton.pushData(value);
						}else{
							submitButton.pushData(key, value);
						}
					}else{
						// 当提交数据的内容为一个常量,例如sblx='0'
						if (valueName.indexOf("'") >= 0){
							value = eval(valueName);
						}else{
							var _arrVarName = valueName.split(".");
							if (_arrVarName[0] in window){
								if(_arrVarName.length > 2){
									if(eval(_arrVarName[0] + "." + _arrVarName[1]) != undefined){
										value = eval(valueName);
									}else{
										value = "";
									}
								}else{
									value = eval(valueName);
								}
							}
						}
						submitButton.pushData(key, value);
					}
				}
			}
		// 如果是提交整个表单
		}else{
			var valueName = arr[i];
			if (valueName == "ALLDATA"){
				var _checkData = true;
				// 获取当前显示的表单
				var _currbd = getCurDisFb();
				var _zbbdid = getCurDisFb("zb");
				$$("div[sword='SwordForm']").each(function(o) {
					if (_checkData){
						var n = o.get("name");
						var validateObj = $w(n).getFieldEls();
						for(var m = 0;m < validateObj.length;m++){
							if(validateObj[m] != undefined){
								var name  = validateObj[m].name;
								var isParentTRHidden = false;
								if(checkExistValue(name) && name.indexOf("cshBtn") < 0 && checkExistValue(validateObj[m].getParent("td")) && checkExistValue(validateObj[m].getParent("td").getParent("tr")) && checkExistValue(validateObj[m].getParent("td").getParent("tr").style)){
									if(validateObj[m].getParent("td").getParent("tr").style.display == "none"){
										isParentTRHidden = true;
									}
								}
								if (checkExistValue(name) && name.indexOf("cshBtn") < 0 && !isParentTRHidden && !$w(n).validate(name)){//父节点tr没有隐藏才校验rule
									_checkData = false;
									break;
								}
							}
						}
						if (!_checkData){
							if(validateObj[m].getParent("td").getPrevious("th") != undefined && validateObj[m].getParent("td").getPrevious("th") != null){
								var validateShowText = validateObj[m].getParent("td").getPrevious("th").innerText.toString().replace("*","");
								swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
							}else if(validateObj[m].getParent("table") != undefined && validateObj[m].getParent("table") != null && validateObj[m].getParent("table").getParent("td") != undefined && validateObj[m].getParent("table").getParent("td") != null && 
									validateObj[m].getParent("table").getParent("td").getPrevious("th") !=undefined && validateObj[m].getParent("table").getParent("td").getPrevious("th") != null){
								var validateShowText = validateObj[m].getParent("table").getParent("td").getPrevious("th").innerText.toString().replace("*","");
								swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
							}else{
								swordAlert("页面中数据项未按要求录入,请先录入再保存");
							}
							return false;
						}
						
//						if (!$w(n).validate()){
//							_checkData = false;
//							return false;
//						}
						submitButton.pushData($w(n).getSubmitData());
					}
				});
				if (!_checkData){
					if (_zbbdid != _currbd){
						openZbFb(_zbbdid,_currbd);
					}
//					swordAlert("页面中有数据项未按要求录入,请先录入再保存1");
					return;
				}
				$$("div[sword='SwordGrid']").each(function(o) {
					if (_checkData){
						var n = o.get("name");
						if (!$w(n).validate()){
							_checkData = false;
							return false;
						}
						submitButton.pushData($w(n).getAllNoDeleteGridData());
					}
				});
				if (!_checkData){
					if (_zbbdid != _currbd){
						openZbFb(_zbbdid,_currbd);
					}
					swordAlert("页面中有数据项未按要求录入,请先录入再保存");
					return;
				}
//				var iframes = document.all.tags("IFRAME");
				// 修改 ie11 360  兼容性问题 by lei 
		    	var iframes = document.getElementsByTagName("IFRAME");
				for (var ii = 0;ii < iframes.length;ii++){
					if ($chk(fbisshow[iframes[ii].id.split("_")[0]]) && fbisshow[iframes[ii].id.split("_")[0]].value == "Y"){
						$(iframes[ii].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {
							if (_checkData){
								var n = o.get("name");
								var validateObj = $(iframes[ii].id).contentWindow.$w(n).getFieldEls();
								for(var m = 0;m < validateObj.length;m++){
									if(validateObj[m] != undefined){
										var name  = validateObj[m].name;
										
										var isParentTRHidden = false;
										if(checkExistValue(name) && name.indexOf("cshBtn") < 0 && checkExistValue(validateObj[m].getParent("td")) && checkExistValue(validateObj[m].getParent("td").getParent("tr")) && checkExistValue(validateObj[m].getParent("td").getParent("tr").style)){
											if(validateObj[m].getParent("td").getParent("tr").style.display == "none"){
												isParentTRHidden = true;
											}
										}
										if (checkExistValue(name) && name.indexOf("cshBtn") < 0 && !isParentTRHidden && !$(iframes[ii].id).contentWindow.$w(n).validate(name)){//父节点tr没有隐藏才校验rule
											_checkData = false;
											break;
										}
									}
								}
								if (!_checkData){
									if(validateObj[m].getParent("td").getPrevious("th") != undefined && validateObj[m].getParent("td").getPrevious("th") != null){
										var validateShowText = validateObj[m].getParent("td").getPrevious("th").innerText.toString().replace("*","");
										swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
									}else if(validateObj[m].getParent("table") != undefined && validateObj[m].getParent("table") != null && validateObj[m].getParent("table").getParent("td") != undefined && validateObj[m].getParent("table").getParent("td") != null && 
											validateObj[m].getParent("table").getParent("td").getPrevious("th") !=undefined && validateObj[m].getParent("table").getParent("td").getPrevious("th") != null){
										var validateShowText = validateObj[m].getParent("table").getParent("td").getPrevious("th").innerText.toString().replace("*","");
										swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
									}else{
										swordAlert("页面中数据项未按要求录入,请先录入再保存");
									}
									return false;
								}
								
//								if (!$(iframes[ii].id).contentWindow.$w(n).validate()){
//									_checkData = false;
//									return false;
//								}
								submitButton.pushData($(iframes[ii].id).contentWindow.$w(n).getSubmitData());
							}
						});
						if (!_checkData){
							if (iframes[ii].id.split("_")[0] != _currbd){
								openZbFb(iframes[ii].id.split("_")[0],_currbd);
							}
							//swordAlert("页面中有数据项未按要求录入,请先录入再保存3");
							return;
						}
						$(iframes[ii].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {
							if (_checkData){
								var n = o.get("name");
								if (!$(iframes[ii].id).contentWindow.$w(n).validate()){
									_checkData = false;
									return false;
								}
								submitButton.pushData($(iframes[ii].id).contentWindow.$w(n).getAllNoDeleteGridData());
							}
						});
						if (!_checkData){
							if (iframes[ii].id.split("_")[0] != _currbd){
								openZbFb(iframes[ii].id.split("_")[0],_currbd);
							}
							swordAlert("页面中有数据项未按要求录入,请先录入再保存");
							return;
						}
					}
				}
			}else{
				// 如果是要提交附表的数据，则格式为iframe.formName 获取 iframe.gridName 或者
				// iframe.gridName$$CHECKEDDATA
				if (valueName.indexOf(".") >= 0){
					var arrFb = valueName.split(".");
					if ($chk(fbisshow[arrFb[0]]) && fbisshow[arrFb[0]].value == "Y"){
						var arrSubmits=arrFb[1].split("$$");
						var submitData = $(arrFb[0] + "_iframe").contentWindow.$w(arrSubmits[0]);
						if(arrSubmits.length>1){
							if(arrSubmits[1]=="CHECKEDDATA"){
								if (submitData.name == "SwordGrid"){
									submitButton.pushData(submitData.getCheckedData("xz"));
								}
							}
						}else{
							if (submitData.name == "SwordForm"){
								var validateObj = submitData.getFieldEls();
								for(var m = 0;m < validateObj.length;m++){
									if(validateObj[m] != undefined){
										var name  = validateObj[m].name;
										
										var isParentTRHidden = false;
										if(checkExistValue(name) && name.indexOf("cshBtn") < 0 && checkExistValue(validateObj[m].getParent("td")) && checkExistValue(validateObj[m].getParent("td").getParent("tr")) && checkExistValue(validateObj[m].getParent("td").getParent("tr").style)){
											if(validateObj[m].getParent("td").getParent("tr").style.display == "none"){
												isParentTRHidden = true;
											}
										}
										
										if (checkExistValue(name) && name.indexOf("cshBtn") < 0 && !isParentTRHidden && !submitData.validate(name)){
											if(noSaveAction == false){// 是要做保存操作的时候再做页面上必填项必录的校验
												if (fbTree != undefined && fbTree != null && fbTree != ""){
													for(var index = 0;index < fbTree.length;index++){
														if($(fbTree[index].code + "_div").style.display == "block"){
															$(fbTree[index].code + "_div").style.display = "none";
															break;
														}
													}
													$(arrFb[0] + "_div").style.display = "block";
												}
												if(validateObj[m].getParent("td").getPrevious("th") != undefined && validateObj[m].getParent("td").getPrevious("th") != null){
													var validateShowText = validateObj[m].getParent("td").getPrevious("th").innerText.toString().replace("*","");
													swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
												}else if(validateObj[m].getParent("table") != undefined && validateObj[m].getParent("table") != null && validateObj[m].getParent("table").getParent("td") != undefined && validateObj[m].getParent("table").getParent("td") != null && 
														validateObj[m].getParent("table").getParent("td").getPrevious("th") !=undefined && validateObj[m].getParent("table").getParent("td").getPrevious("th") != null){
													var validateShowText = validateObj[m].getParent("table").getParent("td").getPrevious("th").innerText.toString().replace("*","");
													swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
												}else{
													swordAlert("页面中数据项未按要求录入,请先录入再保存");
												}
												return;
											}
										}
									}
								}
								submitButton.pushData(submitData.getSubmitData());
							}else if (submitData.name == "SwordGrid"){
								if (!submitData.validate()){
									if(noSaveAction == false){// 是要做保存操作的时候再做页面上必填项必录的校验
										if (fbTree != undefined && fbTree != null && fbTree != ""){
											for(var index = 0;index < fbTree.length;index++){
												if($(fbTree[index].code + "_div").style.display == "block"){
													$(fbTree[index].code + "_div").style.display = "none";
													break;
												}
											}
											$(arrFb[0] + "_div").style.display = "block";
										}
										swordAlert("页面中有数据项未按要求录入,请先录入再保存");
										return;
									}
								}
								submitButton.pushData(submitData.getAllNoDeleteGridData());
							}
						}
					}else{
						if (cwgzbz == "cwgzbz"|| cwgzbz == "sbdr" || noFbDisplay == "noFbDisplay"){
							submitButton.pushData(_arrVars[arrFb[1]]);
						}
					}
				}else{
					// 如果是要提交当前画面的表单的内容,格式为fromname 或者 gridname 或者
					// gridname$$CHECKEDDATA
					var index = valueName.indexOf("$$");
					var isGrid = false;
					var formOrGridName = "";
					if(index == -1 || index == 0){
						formOrGridName = null;
					}else{
						formOrGridName = valueName.substring(0,index);
						isGrid = true;
					}
					if(!isGrid){
						formOrGridName = valueName;
					}
					if (formOrGridName != null && formOrGridName != ""){
						var arrSubmits = valueName.split("$$");
						var submitData = $w(arrSubmits[0]);
						if(arrSubmits.length>1){
							if(arrSubmits[1]=="CHECKEDDATA"){
								if (submitData.name == "SwordGrid"){
									submitButton.pushData(submitData.getCheckedData("xz"));
								}
							}
						}else{
							if(submitData != null){
								if (submitData.name == "SwordForm"){
									var validateObj = submitData.getFieldEls();
									for(var m = 0;m < validateObj.length;m++){
										if(validateObj[m] != undefined){
											var name  = validateObj[m].name;
											
											var isParentTRHidden = false;
											if(checkExistValue(name) && name.indexOf("cshBtn") < 0 && checkExistValue(validateObj[m].getParent("td")) && checkExistValue(validateObj[m].getParent("td").getParent("tr")) && checkExistValue(validateObj[m].getParent("td").getParent("tr").style)){
												if(validateObj[m].getParent("td").getParent("tr").style.display == "none"){
													isParentTRHidden = true;
												}
											}
											
											if (checkExistValue(name) && name.indexOf("cshBtn") < 0 && !isParentTRHidden && !submitData.validate(name)){
												if(noSaveAction == false){// 是要做保存操作的时候再做页面上必填项必录的校验
													if (fbTree != undefined && fbTree != null && fbTree != ""){
														for(var index = 0;index < fbTree.length;index++){
															if($(fbTree[index].code + "_div").style.display == "block"){
																$(fbTree[index].code + "_div").style.display = "none";
																break;
															}
														}
														$(fbTree[0].code + "_div").style.display = "block";
													}
													if(validateObj[m].getParent("td").getPrevious("th") != undefined && validateObj[m].getParent("td").getPrevious("th") != null){
														var validateShowText = validateObj[m].getParent("td").getPrevious("th").innerText.toString().replace("*","");
														swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
													}else if(validateObj[m].getParent("table") != undefined && validateObj[m].getParent("table") != null && validateObj[m].getParent("table").getParent("td") != undefined && validateObj[m].getParent("table").getParent("td") != null && 
															validateObj[m].getParent("table").getParent("td").getPrevious("th") !=undefined && validateObj[m].getParent("table").getParent("td").getPrevious("th") != null){
														var validateShowText = validateObj[m].getParent("table").getParent("td").getPrevious("th").innerText.toString().replace("*","");
														swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
													}else{
														swordAlert("页面中数据项未按要求录入,请先录入再保存");
													}
													return;
												}
											}
										}
									}
									for(var m = 0;m < validateObj.length;m++){
										if(validateObj[m] != undefined){
											var name  = validateObj[m].name;
											
											var isParentTRHidden = false;
											if(checkExistValue(name) && name.indexOf("cshBtn") < 0 && checkExistValue(validateObj[m].getParent("td")) && checkExistValue(validateObj[m].getParent("td").getParent("tr")) && checkExistValue(validateObj[m].getParent("td").getParent("tr").style)){
												if(validateObj[m].getParent("td").getParent("tr").style.display == "none"){
													isParentTRHidden = true;
												}
											}
											
											if (checkExistValue(name) && name.indexOf("cshBtn") < 0 && !isParentTRHidden && !submitData.validate(name)){
												if(noSaveAction == false){// 是要做保存操作的时候再做页面上必填项必录的校验
													if (fbTree != undefined && fbTree != null && fbTree != ""){
														for(var index = 0;index < fbTree.length;index++){
															if($(fbTree[index].code + "_div").style.display == "block"){
																$(fbTree[index].code + "_div").style.display = "none";
																break;
															}
														}
														$(fbTree[0].code + "_div").style.display = "block";
													}
													if(validateObj[m].getParent("td").getPrevious("th") != undefined && validateObj[m].getParent("td").getPrevious("th") != null){
														var validateShowText = validateObj[m].getParent("td").getPrevious("th").innerText.toString().replace("*","");
														swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
													}else if(validateObj[m].getParent("table") != undefined && validateObj[m].getParent("table") != null && validateObj[m].getParent("table").getParent("td") != undefined && validateObj[m].getParent("table").getParent("td") != null && 
															validateObj[m].getParent("table").getParent("td").getPrevious("th") !=undefined && validateObj[m].getParent("table").getParent("td").getPrevious("th") != null){
														var validateShowText = validateObj[m].getParent("table").getParent("td").getPrevious("th").innerText.toString().replace("*","");
														swordAlert("页面中" + validateShowText.trim() + "未按要求录入,请先录入再保存");
													}else{
														swordAlert("页面中数据项未按要求录入,请先录入再保存");
													}
													return;
												}
											}
										}
									}
									submitButton.pushData(submitData.getSubmitData());
								}else if (submitData.name == "SwordGrid"){
									if (!submitData.validate()){
										if(noSaveAction == false){// 是要做保存操作的时候再做页面上必填项必录的校验
											if (fbTree != undefined && fbTree != null && fbTree != ""){
												for(var index = 0;index < fbTree.length;index++){
													if($(fbTree[index].code + "_div").style.display == "block"){
														$(fbTree[index].code + "_div").style.display = "none";
														break;
													}
												}
												$(fbTree[0].code + "_div").style.display = "block";
											}
											swordAlert("页面中有数据项未按要求录入,请先录入再保存");
											return;
										}
									}
									submitButton.pushData(submitData.getAllNoDeleteGridData());
								}
							}else{
								if (formOrGridName in window){
									submitButton.pushData(eval(formOrGridName));
								}
								if (_arrVars[formOrGridName] != undefined && typeof(_arrVars[formOrGridName]) == "object"){
									submitButton.pushData(_arrVars[formOrGridName]);
								}
							}
						}
					}
				}
			}
		}
	}
	submitButton.setCtrl(ctrl.split(",")[0]);
	if (submitType == undefined || submitType == "ajax"){
		//ajax方式或者未指定提交方式的话，配置为异步调用方式，减少页面卡顿造成的阻塞  by:张俊，2019年1月10日16:28:56
		submitButton.options.async="true";
		if (onSuccess != undefined && onSuccess != ""){
			_arrVars["_onsuccess"] = onSuccess;
		}else{
			_arrVars["_onsuccess"] = null;
		}
		submitButton.setFunction('onSuccess', "ywpt_onsuccess");
		if (onError != undefined && onError != ""){
			_arrVars["_onerror"] = onError;
		}else{
			_arrVars["_onerror"] = null;
		}
		submitButton.setFunction("onError", "ywpt_onerror");
		submitButton.submit();
	}else if (submitType == "form"){
		submitButton.options.postType = "form";
		if (onSuccess != undefined && onSuccess != ""){
			_arrVars["_onsuccess"] = onSuccess;
		}else{
			_arrVars["_onsuccess"] = null;
		}
		submitButton.setFunction('onSuccess', "ywpt_onsuccess");
		if (onError != undefined && onError != ""){
			_arrVars["_onerror"] = onError;
		}else{
			_arrVars["_onerror"] = null;
		}
		submitButton.setFunction("onError", "ywpt_onerror");
		submitButton.submit();
	}else if (submitType.substring(submitType.length-3,submitType.length) == "TAB"){// 弹出TAB页
		var param = "&";
		var tijiaoArrs = tijiao.split(",");
		for(var i = 0;i < tijiaoArrs.length; i=i+2){
			param = param + tijiaoArrs[i] + "=" + eval(tijiaoArrs[i+1]) + "&";
		}
		param = param.substring(0, param.length-1);
		var pathparam = decodeURI(location.search);
		var obj ={
				id : pc.getRandomUUID(),
				title : submitType.substring(0,submitType.indexOf("TAB")),
				tabContentType : 'iframe',
				src : AddBizCode2URL('/sword?ctrl=' + ctrl.split(",")[0] + '&' + pathparam.substring(pathparam.indexOf("&")) + param),
				isCloseBtn : 'true'
		};
		top.openXtgnToIframeTab('A0000001',obj);
	}else{
		var width = 768;
		var height = 600;
		if (ctrl.split(",").length > 2){
			// 设置弹出画面的宽度
			if (ctrl.split(",")[1] != undefined && !isNaN(ctrl.split(",")[1])){
				width = parseFloat(ctrl.split(",")[1]);
			}else{
				if (ctrl.split(",")[1] == "MAX"){
					width = document.body.clientWidth;
				}
			}
			// 设置弹出画面的高度
			if (ctrl.split(",")[2] != undefined && !isNaN(ctrl.split(",")[2])){
				height = parseFloat(ctrl.split(",")[2]);
			}else{
				if (ctrl.split(",")[2] == "MAX"){
					height = document.body.clientHeight;
				}
			}
		}
		swordAlertIframe('', {
			titleName : submitType,
			width : width,
			height : height,
			param : window,
			isNormal : 'true',
			isMax : 'true',
			isClose : 'true',
			isMin : 'true',
			submit : submitButton
		});
	}
}

function ywpt_onsuccess(req, res){
	
	receiveResData(res);
	
	if (_arrVars["_onsuccess"] != undefined && _arrVars["_onsuccess"] != null){
		eval(_arrVars["_onsuccess"] + "(req,res);");
	}
}

function receiveResData(res){
	if(res != undefined && res.data != undefined){
		for (var j = 0;j < res.data.length;j++){
			if (res.data[j].sword == undefined){
				if (res.data[j].name in window){
					if (typeof(eval(res.data[j].name)) == "string"){
						eval(res.data[j].name + " = '" + res.data[j].value + "'");
					}else if (typeof(eval(res.data[j].name)) == "number"){
						eval(res.data[j].name + " = " + res.data[j].value + "");
					}else{
						try{
							eval(res.data[j].name + " = '" + res.data[j].value + "'");
						}catch(e){}
					}
				}
				_arrVars[res.data[j].name] = res.data[j].value;
			}else{
				var name = res.data[j].name;
				if (name == undefined){
					name = res.data[j].dataName;
				}
				if (name in window){
					if (typeof(eval(name)) == "object"){
						if (name == "nsrxxReturn"){
							try{
								eval(name + " = (" + obj2Str(res.data[j].data) + ")");
							}catch(e){}
						}else{
							if (res.data[j].sword != "SwordTree"){
								try{
									eval(name + " = (" + obj2Str(res.data[j]) + ")");
								}catch(e){}
							}
						}
					}
				}
				_arrVars[name] = res.data[j];
			}
		}
	}
}

function obj2Str(obj) {
	switch (typeof (obj)) {
	case 'object':
		var ret = [];
		if (obj instanceof Array) {
			for ( var i = 0, len = obj.length; i < len; i++) {
				ret.push(obj2Str(obj[i]));
			}
			return '[' + ret.join(',') + ']';
		} else if (obj instanceof RegExp) {
			return obj.toString();
		} else {
			for ( var a in obj) {
				ret.push(a + ':' + obj2Str(obj[a]));
			}
			return '{' + ret.join(',') + '}';
		}
	case 'function':
		return 'function() {}';
	case 'number':
		return obj.toString();
	case 'string':
		return "\""
				+ obj.replace(/(\\|\")/g, "\\$1").replace(
						/\n|\r|\t/g,
						function(a) {
							return ("\n" == a) ? "\\n" : ("\r" == a) ? "\\r"
									: ("\t" == a) ? "\\t" : "";
						}) + "\"";
	case 'boolean':
		return obj.toString();
	default:
		return obj.toString();
	}
} 
function ywpt_onerror(req, res){
	if (_arrVars["_onerror"] != undefined && _arrVars["_onerror"] != null){
		eval(_arrVars["_onerror"] + "(req,res);");
	}
}

/**
 * 显示或者隐藏附表树下拉框中的附表选项
 * 
 * @param fbName
 *            附表选项的name
 * @param disandhid
 *            显示隐藏标志：d为显示，h为隐藏
 */
function ywpt_disandhid(fbName,disandhid){
	if (disandhid != "h" && disandhid != "d"){
		return;
	}
	var treeXML = pageContainer.getWidget("SwordTreeJSON");
	if (_arrVars['treeDataAll'] == undefined){
		_arrVars['treeDataAll'] = treeXML.select.options.dataStr.data;
	}
	_arrVars['treeData'] = treeXML.options.dataStr.data;
    // 如果要显示，即从原始的下拉列表中显示
    if (disandhid == "d"){
        var arr = fbName.split(",");
    	var dataStr = "{ 'data': [  ";
    	// 如果要显示的下拉树，在现在列表中，将不做任何处理
    	for (var i = 0;i < _arrVars['treeData'].length;i++){
	    	for (var j = 0;j < arr.length;j++){
	    		if (_arrVars['treeData'][i].code == arr[j]){
	    			fbName = fbName.replace(arr[j],"").replace(",,","");
	    			break;
	    		}
	    	}
	    	if (dataStr != "{ 'data': [  "){
    			dataStr = dataStr + ", ";
    		}
    		dataStr = dataStr + "{'code': '" + _arrVars['treeData'][i].code + "'";
    		dataStr = dataStr + ",'caption': '" + _arrVars['treeData'][i].caption + "'}";
	    }
    	arr = fbName.split(",");
    	for (var i = 0;i < _arrVars['treeDataAll'].length;i++){
	    	for (var j = 0;j < arr.length;j++){
	    		if (_arrVars['treeDataAll'][i].code == arr[j]){
	    			if (dataStr != "{ 'data': [  "){
		    			dataStr = dataStr + ", {'code': '" + _arrVars['treeDataAll'][i].code + "'";
		        		dataStr = dataStr + ",'caption': '" + _arrVars['treeDataAll'][i].caption + "'}";
		        		break;
	    			}else{
	    				dataStr = dataStr + "{'code': '" + _arrVars['treeDataAll'][i].code + "'";
		        		dataStr = dataStr + ",'caption': '" + _arrVars['treeDataAll'][i].caption + "'}";
		        		break;
	    			}
	    		}
	    	}
    	}
    	dataStr = dataStr + " ] }";
	    treeXML.reloadTree(dataStr);
    }else{
    	var dataStr = "{ 'data': [  ";
    	if(fbName == "noFb"){
    		for (var i = 0;i < _arrVars['treeDataAll'].length;i++){
	    		if (dataStr != "{ 'data': [  "){
	    			dataStr = dataStr + ", ";
	    		}
	    		dataStr = dataStr + "{'code': '" + _arrVars['treeDataAll'][i].code + "'";
	    		dataStr = dataStr + ",'caption': '" + _arrVars['treeDataAll'][i].caption + "'}";
    	    }
    	}else{
    		var arr = fbName.split(",");
    		for (var i = 0;i < _arrVars['treeData'].length;i++){
    			var dis = true;
    			for (var j = 0;j < arr.length;j++){
    				if (_arrVars['treeData'][i].code == arr[j]){
    					dis = false;
    					break;
    				}
    			}
    			if (dis){
    				if (dataStr != "{ 'data': [  "){
    					dataStr = dataStr + ", ";
    				}
    				dataStr = dataStr + "{'code': '" + _arrVars['treeData'][i].code + "'";
    				dataStr = dataStr + ",'caption': '" + _arrVars['treeData'][i].caption + "'}";
    			}
    		}
    	}
	    dataStr = dataStr + " ] }";
	    treeXML.reloadTree(dataStr);
   }
}

/**
 * 给画面中JS的变量付值
 * 
 * @param iframe
 *            画面的标识
 * @param varName
 *            变量的名称
 * @param value
 *            要付的值
 */

function ywpt_resetvar(iframe,varName,value){
	if (iframe == ""){
		if(value == null || value == undefined || value.length == 0){
			value = "''";
		}
		if (typeof(value) == "object"){
			eval(varName + " = (" + obj2Str(value) + ")");
		}else if (typeof(value) == "string"){
			eval(varName + " = " + value + "");
		}else if(typeof(value) == "number"){
			eval(varName + " = " + parseFloat(value));
		}else{
			eval(varName + " = " + value);
		}
		_arrVars[varName] = value;
	}else{
		if (iframe == "zb" && eval("parent." + varName) != undefined){
			eval("parent." + varName + " = " + value);
			eval("parent._arrVars['" + varName + "'] = " + value);
		}else{
			if (iframe == "res"){
				var arr = varName.split(",");
				for (var i = 0;i < arr.length;i++){
					arrRes = value.data;
					for (var j = 0;j < arrRes.length;j++){
						if (arrRes[j].name == arr[i]){
							if (arrRes[j].sword == undefined){
								if (typeof(eval(arr[i])) == "string"){
									eval(arr[i] + " = '" + arrRes[j].value + "'");
								}else if (typeof(eval(arr[i])) == "number"){
									eval(arr[i] + " = " + arrRes[j].value + "");
								}
								_arrVars[arr[i]] = arrRes[j].value;
							}else{
								if (typeof(eval(arr[i])) == "object"){
									eval(arr[i] + " = (" + obj2Str(arrRes[j]) + ")");
								}
								_arrVars[arr[i]] = arrRes[j];
							}
							break;
						}
					}
				}
				return;
			}
		}
	}
}

/**
 * 在js中为页面上的字段定义录入规则
 * 
 * @param iframe
 *            页面
 * @param formOrGridName
 *            Form或Grid的名字
 * @param item
 *            数据项名称
 * @param type
 *            类型
 * @param rules
 *            给字段自定义的规则
 * @return
 */
function ywpt_itemswitch(iframe,formOrGridName,item,type,rules){// ITEMSWITCH.iframe.form.item.type.rules
	var form = $w(formOrGridName);
	var itemRules = "";
	var rule = rules.split(",");
	for(var i = 0;i < rule.length;i++){
		var ruleContent = rule[i].split(":");
		itemRules = itemRules + "{'" + ruleContent[0] +"':'" + ruleContent[1]+"',";
	}
	itemRules = itemRules.substring(0, itemRules.length-1);
	itemRules = itemRules + "}";
	if (iframe == ""){
		form._itemSwitch(item ,type ,eval("("+itemRules+")"));
	}else{
		if (iframe == "zb"){
			parent.form._itemSwitch(item ,type ,eval("("+itemRules+")"));
		}
	}
}

/**
 * 解析計算公式
 * 
 * @param arrh
 * @return 合計值
 */
function ywpt_jxjsgs(arrh,toForm,formName){
	// 循环每一个计算数据项
	var hj=0;
	for (var i=0;i < arrh.length;i++){
		var jsitem = "";
		var je = 0;
		var first = arrh[i].substring(0,1);
		if (first == "-" || first == "/" 
			|| first == "|" || first == "*" 
			|| first == ">"|| first == "<" 
			|| first == "?" || first == "+"){
			jsitem = arrh[i].substring(1,arrh[i].length).replace("。",".");
		}else{
			jsitem = arrh[i].replace("。",".");
		}
		// 如果本身计算公式中存在数字
		if (!isNaN(parseFloat(jsitem))){
			je = parseFloat(jsitem);
		}else if (jsitem == "HJ"){
			je = 1;
		}else{
			if (formName != null){
				if (document.getElementById(formName + "_" + jsitem)){
					je = document.getElementById(formName + "_" + jsitem).value.replace(/,/g,"");
				}else{
					je = toForm.getSubmitData().data[jsitem];
				}
			}else{
				je = toForm.getSubmitData().data[jsitem];
			}
			// 如果不是画面上的值，而是一个变量
			if (je == undefined){
				je = _arrVars[jsitem];
				if (je == undefined){
					if (jsitem in window){
						eval("je = " + jsitem + ";");
					}
				}else{
					if (je == ""){
						je = 0;
					}else{
						je = je / 1;
					}
				}
			// 如果是画面上的数据项的值
			}else{
				if (document.getElementById(formName + "_" + jsitem)){
					je = document.getElementById(formName + "_" + jsitem).value.replace(/,/g,"");
				}else{
					je = toForm.getValue(jsitem);
				}
				if (je == ""){
					je = 0.00;
				}else{
					je = je / 1;
				}
			}
		}
		if (first == "-"){
			hj = hj - je;
		}else if (first == "/"){
			if (je == 0){
				hj = 0;
			}else{
				hj = hj / je;
			}
		}else if (first == "|"){
			if (je < 0){
				je = je.multiple(-1);
			}
			hj = hj.accAdd(je);
		}else if (first=="*"){
			if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
				je = parseFloat(je.substring(0, je.length - 1)) / 100;
			}
			hj = hj.multiple(je);
		}else if (first==">"){
			if (jsitem == "HJ"){
				if (hj <= 0){
					hj = 0;
				}
			}else{
				if (je > 0){
					hj = hj.accAdd(je);
				}else{
					hj = hj.accAdd(0);
				}
			}
		}else if (first=="<"){
			if (jsitem == "HJ"){
				if (hj >= 0){
					hj = 0;
				}
			}else{
				if (je < 0){
					hj = hj.accAdd(je);
				}else{
					hj = hj.accAdd(0);
				}
			}
		}else if (first=="?"){
			if (je <= hj){
				hj = je;
			}
		}else{
			hj = hj.accAdd(je);
		}
		if(isNaN(hj) || hj == undefined){
			hj = 0.00;
		}
	}
	return hj;
}
/*
 * 按照Excel的公式模式进行计算 jsitem：计算公式 form：计算画面的表单Form
 */
function ywpt_exceljs(jsitem,form){
	// 第一步将计算公式中的+-*/全部替换为特殊字符#****#，并将（）都去掉
	var gsitem = jsitem.substr(1).replace(/iif\(/g,"").replace(/\(/g,"").replace(/\)/g,"");
	gsitem = gsitem.replace(/\*/g,"#****#");
	gsitem = gsitem.replace(/\//g,"#****#");
	gsitem = gsitem.replace(/\+/g,"#****#");
	gsitem = gsitem.replace(/-/g,"#****#");
	gsitem = gsitem.replace(/>=/g,"#****#");
	gsitem = gsitem.replace(/<=/g,"#****#");
	gsitem = gsitem.replace(/!=/g,"#****#");
	gsitem = gsitem.replace(/==/g,"#****#");
	gsitem = gsitem.replace(/>/g,"#****#");
	gsitem = gsitem.replace(/</g,"#****#");
	gsitem = gsitem.replace(/,/g,"#****#");
	// 第二步按照#****#进行分割
	var arrItem = gsitem.split("#****#");
	// 第三步按照分割后的数组的数据项进行获取画面上相关的数据项内容
	// 第四步将各个数据项的值带回到原始的jsitem中
	for (var i = 0;i < arrItem.length;i++){
		var key = arrItem[i].replace(/(^\s*)|(\s*$)/g, "");
		var value = form.getSubmitData().data[key];
		// 如果不是画面上的值，而是一个变量
		if (value == undefined){
			value = _arrVars[key];
			if (value == undefined){
				if (key in window){
					eval("value = " + key + ";");
				}
			}else{
				if (value == ""){
					value = 0;
				}else{
					value = value / 1;
				}
			}
		// 如果是画面上的数据项的值
		}else{
			value = form.getValue(key);
			if (value == ""){
				value = 0.00;
			}else{
				value = value / 1;
			}
		}
		if (isNaN(parseFloat(key))){
			jsitem = jsitem.replace(key,value);
		}
	}
	// 第五步使用eval计算字符串的计算结果，返回
	return eval(jsitem.substr(1));
}

function iif(tj,v1,v2){
	if (eval(tj)){
		return v1;
	}else{
		return v2;
	}
}
function ywpt_disable(formName,item,row,col){
	// 定义某一行，或者某一列都置灰
	if ((item.substr(0,5) == "hang_") || (item.substr(0,4) == "lie_") || (item.substr(0,8) == "hanglie_")){
		if (formName.substr(formName.length-4,4) == "Grid"){
			var _grid = $w(formName);
			if ($chk(_grid.getCheckedRow())){
				if (item.substr(0,5) == "hang_"){
					if ($chk(_grid.getCheckedRow().getCell(item.substr(5)))){
						_grid.cellDisable(_grid.getCheckedRow().getCell(item.substr(5)));
					}
				}else{
					return;
				}
			}
			return;
		}
		
//		var arrTable = document.all.tags("TABLE");
		// 修改 ie11 360  兼容性问题 by lei 
		var arrTable = document.getElementsByTagName("TABLE");
		for (var i = 0;i < arrTable.length;i++){
			// formName表单的Table列表
			if (arrTable[i].parentElement.getAttribute("name") == formName){
				if (item.substr(0,5) == "hang_"){
					var hang = item.substr(5).split(",");
					for (var r = 0;r < hang.length;r++){
						var realhang = 0;
						if (!isNaN(parseFloat(hang[r])) && row != undefined && !isNaN(parseFloat(row))){
							realhang = parseFloat(hang[r]) + row;
						}
						if (!isNaN(parseFloat(hang[r])) && realhang < arrTable[i].rows.length){
							var cells = arrTable[i].rows[realhang].cells;
							for (var c = 0;c < cells.length;c++){
								if (cells[c].childNodes.length == 2){
									if (cells[c].childNodes[1].getAttribute("type") == "text"){
										try{
											$w(formName).disable(eval("['" + cells[c].childNodes[1].getAttribute("name") + "']"));
										}catch(e){}
									}
								}
							}
						}
					}
				}else if (item.substr(0,4) == "lie_"){
					var lie = item.substr(4).split(",");
					// 循环每一行
					for (var r = 1;r < arrTable[i].rows.length;r++){
						var cells = arrTable[i].rows[r].cells;
						for (var c = 0;c < lie.length;c++){
							var reallie = 0;
							if (!isNaN(parseFloat(lie[c])) && col != undefined && !isNaN(parseFloat(col))){
								reallie = parseFloat(lie[c]) + col;
							}
							if (!isNaN(parseFloat(lie[c])) && reallie < cells.length){
								if (cells[reallie].childNodes.length == 2){
									if (cells[reallie].childNodes[1].getAttribute("type") == "text"){
										try{
											$w(formName).disable(eval("['" + cells[reallie].childNodes[1].getAttribute("name") + "']"));
										}catch(e){}
									}
								}
							}
						}
					}
				}else{
					var hanglie = item.substr(8).split(",");
					for (var rc = 0;rc < hanglie.length;rc++){
						var realhang = 0;
						var reallie = 0;
						if (!isNaN(parseFloat(hanglie[rc].split("_")[0])) && row != undefined && !isNaN(parseFloat(row))){
							realhang = parseFloat(hanglie[rc].split("_")[0]) + row;
						}
						if (!isNaN(parseFloat(hanglie[rc].split("_")[1])) && col != undefined && !isNaN(parseFloat(col))){
							reallie = parseFloat(hanglie[rc].split("_")[1]) + col;
						}
						var cells = arrTable[i].rows[realhang].cells;
						if (!isNaN(parseFloat(hanglie[rc].split("_")[1])) && reallie < cells.length 
								&& !isNaN(parseFloat(hanglie[rc].split("_")[0])) && realhang < arrTable[i].rows.length){
							if (cells[reallie].childNodes.length == 2){
								if (cells[reallie].childNodes[1].getAttribute("type") == "text"){
									try{
										$w(formName).disable(eval("['" + cells[reallie].childNodes[1].getAttribute("name") + "']"));
									}catch(e){}
								}
							}
						}
					}
				}
				break;
			}
		}
	}else if (item == "ALLITEM"){
		var arrForm = formName.split(",");
		for (var i = 0;i < arrForm.length;i++){
			try{
				if (arrForm[i].substr(arrForm[i].length-4,arrForm[i].length) == "Grid"){
					var insertBtn1 = $w(arrForm[i]).console()
					.getElement('input[value="增行"]');
					var insertBtn2 = $w(arrForm[i]).console()
					.getElement('input[value="删行"]');
					$w(arrForm[i]).disableConsoleBtn(insertBtn1, true);
					$w(arrForm[i]).disableConsoleBtn(insertBtn2, true);
				}else{
					$w(arrForm[i]).disable();
				}
			}catch(e){}
		}
	}else if (item.substr(0,8) == "DISPLAY:" || item.substr(0,9) == "DISPLAYA:" || item.substr(0,9) == "DISPLAYH:"){
		var arrDis = item.split(":");
		if (arrDis.length >= 2){
//			var arrTable = document.all.tags("DIV");
			// 修改 ie11 360  兼容性问题 by lei 
			var arrTable = document.getElementsByTagName("DIV");
			for (var i = 0;i < arrTable.length;i++){
				// formName表单的Table列表
				if (arrTable[i].getAttribute("name") == formName){
					if (arrDis.length > 2){
						var arrItem = arrDis[2].split(",");
						for (var l = 0;l < arrItem.length;l++){
							//var arrDiv = arrTable[i].all.tags("DIV"); //.all ie11,360 not support
							//兼容性 fix by muyx
							var arrDiv = arrTable[i].getElementsByTagName("DIV");
							for (var d = 0;d < arrDiv.length;d++){
								if (arrDiv[d].getAttribute("name") == arrItem[l]){
									if (arrDis[1] == "block"){
										arrDiv[d].parentElement.style.display = "block";
										if (item.substr(0,9) == "DISPLAYA:"){
											arrDiv[d].parentElement.previousSibling.style.display = "block";
										}else if (item.substr(0,9) == "DISPLAYH:"){
											arrDiv[d].parentElement.parentNode.style.display = "block";
										}
									}else if (arrDis[1] == "none"){
										arrDiv[d].parentElement.style.display = "none";
										if (item.substr(0,9) == "DISPLAYA:"){
											arrDiv[d].parentElement.previousSibling.style.display = "none";
										}else if (item.substr(0,9) == "DISPLAYH:"){
											arrDiv[d].parentElement.parentNode.style.display = "none";
										}
									}
									break;
								}
							}
						}
					}else{
						if (arrDis[1] == "block"){
							arrTable[i].parentElement.style.display = "block";
							return;
						}else if (arrDis[1] == "none"){
							arrTable[i].parentElement.style.display = "none";
							return;
						}
					}
					break;
				}
			}
		}
	}else{
		var arrItem = item.split(",");
		var strItem = "";
		for (var i = 0;i < arrItem.length;i++){
			if (strItem == ""){
				strItem = strItem + "'" + arrItem[i] + "'";
			}else{
				strItem = strItem + ",'" + arrItem[i] + "'";
			}
		}
		try{
			$w(formName).disable(eval("[" + strItem + "]"));
		}catch(e){}
	}
}

function ywpt_enable(formName,item,row,col){
	// 定义某一行，或者某一列都置灰
	if ((item.substr(0,5) == "hang_") || (item.substr(0,4) == "lie_") || (item.substr(0,8) == "hanglie_")){
//		var arrTable = document.all.tags("TABLE");
		// 修改 ie11 360  兼容性问题 by lei 
		var arrTable = document.getElementsByTagName("TABLE");
		for (var i = 0;i < arrTable.length;i++){
			// formName表单的Table列表
			if (arrTable[i].parentElement.getAttribute("name") == formName){
				if (item.substr(0,5) == "hang_"){
					var hang = item.substr(5).split(",");
					for (var r = 0;r < hang.length;r++){
						var realhang = 0;
						if (!isNaN(parseFloat(hang[r])) && row != undefined && !isNaN(parseFloat(row))){
							realhang = parseFloat(hang[r]) + row;
						}
						if (!isNaN(parseFloat(hang[r])) && realhang < arrTable[i].rows.length){
							var cells = arrTable[i].rows[realhang].cells;
							for (var c = 0;c < cells.length;c++){
								if (cells[c].childNodes.length == 2){
									if (cells[c].childNodes[1].getAttribute("type") == "text"){
										try{
											$w(formName).enable(eval("['" + cells[c].childNodes[1].getAttribute("name") + "']"));
										}catch(e){}
									}
								}
							}
						}
					}
				}else if (item.substr(0,4) == "lie_"){
					var lie = item.substr(4).split(",");
					// 循环每一行
					for (var r = 1;r < arrTable[i].rows.length;r++){
						var cells = arrTable[i].rows[r].cells;
						for (var c = 0;c < lie.length;c++){
							var reallie = 0;
							if (!isNaN(parseFloat(lie[c])) && col != undefined && !isNaN(parseFloat(col))){
								reallie = parseFloat(lie[c]) + col;
							}
							if (!isNaN(parseFloat(lie[c])) && reallie < cells.length){
								if (cells[reallie].childNodes.length == 2){
									if (cells[reallie].childNodes[1].getAttribute("type") == "text"){
										try{
											$w(formName).enable(eval("['" + cells[reallie].childNodes[1].getAttribute("name") + "']"));
										}catch(e){}
									}
								}
							}
						}
					}
				}else{
					var hanglie = item.substr(8).split(",");
					for (var rc = 0;rc < hanglie.length;rc++){
						var realhang = 0;
						var reallie = 0;
						if (!isNaN(parseFloat(hanglie[rc].split("_")[0])) && row != undefined && !isNaN(parseFloat(row))){
							realhang = parseFloat(hanglie[rc].split("_")[0]) + row;
						}
						if (!isNaN(parseFloat(hanglie[rc].split("_")[1])) && col != undefined && !isNaN(parseFloat(col))){
							reallie = parseFloat(hanglie[rc].split("_")[1]) + col;
						}
						var cells = arrTable[i].rows[realhang].cells;
						if (!isNaN(parseFloat(hanglie[rc].split("_")[1])) && reallie < cells.length 
								&& !isNaN(parseFloat(hanglie[rc].split("_")[0])) && realhang < arrTable[i].rows.length){
							if (cells[reallie].childNodes.length == 2){
								if (cells[reallie].childNodes[1].getAttribute("type") == "text"){
									try{
										$w(formName).enable(eval("['" + cells[reallie].childNodes[1].getAttribute("name") + "']"));
									}catch(e){}
								}
							}
						}
					}
				}
				break;
			}
		}
	}else if (item == "ALLITEM"){
		var arrForm = formName.split(",");
		for (var i = 0;i < arrForm.length;i++){
			try{
				if (arrForm[i].substr(arrForm[i].length-4,arrForm[i].length) == "Grid"){
					var insertBtn1 = $w(arrForm[i]).console()
					.getElement('input[value="增行"]');
					var insertBtn2 = $w(arrForm[i]).console()
					.getElement('input[value="删行"]');
					$w(arrForm[i]).disableConsoleBtn(insertBtn1, false);
					$w(arrForm[i]).disableConsoleBtn(insertBtn2, false);
				}else{
					$w(arrForm[i]).enable();
				}
			}catch(e){}
		}
	}else if (item == "RESET"){
		var arrForm = formName.split(",");
		for (var i = 0;i < arrForm.length;i++){
			try{
				if (arrForm[i].substr(formName.length-4,4) == "Grid"){
					$w(arrForm[i]).reset();
				}else{
					$w(arrForm[i]).resetAll();
				}
			}catch(e){}
		}
	}else{
		var arrItem = item.split(",");
		var strItem = "";
		for (var i = 0;i < arrItem.length;i++){
			if (strItem == ""){
				strItem = strItem + "'" + arrItem[i] + "'";
			}else{
				strItem = strItem + ",'" + arrItem[i] + "'";
			}
		}
		try{
			$w(formName).enable(eval("[" + strItem + "]"));
		}catch(e){}
	}
}

function ywpt_iszb(){
// //var arrItem = document.all.tags("DIV");
// var arrItem = document.getElementsByTagName('DIV');
// for (var i = 0;i < arrItem.length;i++){
// if (arrItem[i].id == "sbToolBarHaveTrees"){
// iszb = true;
// break;
// }
// }
	if (document.getElementById("sbToolBarHaveTrees") != undefined){
		return true;
	}else{
		return false;
	}
}

function _selectDataChange(option,selItem,obj){
	var change = _arrVars[obj.box.get("name") + "_changeEvent"];
	if (change == undefined	|| change == "" || change == null){
		change = _arrVars["ALLSELECT_changeEvent"];
	}
	if (change != undefined	&& change != "" && change != null){
		eval(change + "(option,selItem,obj);");
	}
}
function _selectDataFilter(dataObj, inputEl, obj){
	if (window.event.srcElement == null && dataObj != null){
		return dataObj;
	}else if (window.event.srcElement == null){
		
	}
	var mc = window.event.srcElement.getAttribute('name');
	var filter = _arrVars[mc + "_filterTj"];
	if (filter == undefined	|| filter == "" || filter == null){
		filter = _arrVars["ALLSELECT_filterTj"];
	}
	if (filter != undefined	&& filter != "" && filter != null){
		if (filter.indexOf("dataName=") >= 0){
			return eval(filter.split("=")[1]);
		}else{
			var newData = [];
			dataObj.each(function(item, index) {
						if (eval(filter))
							newData[newData.length] = item;
					});
			return newData;
		}
	}else{
		return dataObj;
	}
}
function ywpt_addalljeevent(formName,event,func){
//	var _arrJeItem = document.all.tags('INPUT');
	//lei 修改 ie11 360  兼容新问题 by lei 
	var _arrJeItem = document.getElementsByTagName('INPUT');
	 
    for (var i = 0;i < _arrJeItem.length;i++){
    	var className = _arrJeItem[i].className;
    	var format = _arrJeItem[i].format;
    	var defvalue = "";
    	var b = false;
    	if (className != undefined){
    		if (className.trim() == 'swordform_item_oprate swordform_item_input'){
    			b = true;
    		}
    	}
    	if (format == undefined || format == null){
    		try{
    		format = _arrJeItem[i].get("format");
    		defvalue = _arrJeItem[i].get("defaultValue")
    		}catch(e){}
    	}
    	if (format != undefined){
    		if ((format.trim().indexOf("{'type':'number','format':'#,##0.00") >= 0 || 
    				format.trim().indexOf("{\'type\':\'number\','format\':\'#,##0.00") >= 0 || 
    				format.trim().indexOf("{\'type\':\'number\','format\':\'#,##0") >= 0) && b){
    			b = true;
    		}else{
    			b = false;
    		}
    	}else{
    		if (defvalue == "0.00"){
    			b = true;
    		}else{
    			b = false;
    		}
		}
    	
    	if(($chk(_arrJeItem[i].get) && _arrJeItem[i].get('disable') != 'true' && b) || (!$chk(_arrJeItem[i].get))){
    		try{
    			$w(formName).getFieldEl(_arrJeItem[i].name).addEvent(event,eval(func));
    		}catch(e){}
    	}
    }
}
/**
 * 下一户方法
 * 
 * @return
 */
function nextOne(){
	if (cwgzbz == "cwgzbz"){
		nextOneCtrl = "SB057SbcwgzCtrl_initView";
	}
	swordConfirm("是否确定要进行下一户的操作?", {
		onOk : function() {
		var test = new SwordSubmit();
		test.options.postType = "form";
		if (nextOneCtrl == ""){
			return;
		}
		test.setCtrl(nextOneCtrl+"_initView");
		test.submit();
	},
	onCancel : function() {
		return;
	}
	});

}

/**
 * 将按钮置灰
 * 
 * @param iframe
 * @param form
 * @param button
 * @param disen
 * @return
 */
function ywpt_butdisen(iframe,form,button,disen){
	var buttonItem = button.split(",");
	if (iframe == ""){
		for (var i = 0;i < buttonItem.length;i++){
			if (disen == "d"){
				$w(form).setDisabled(buttonItem[i]);
				if(buttonItem[i] == 'save' && "function" == typeof tempsave_disable){
					tempsave_disable(form);
				}
			}else if (disen == "e"){
				$w(form).setEnabled(buttonItem[i]);
				if(buttonItem[i] == 'save' && "function" == typeof tempsave_enable){
					tempsave_enable(form);
				}
			}else if (disen == "hid"){// 按钮隐藏
				$w(form).setHide(buttonItem[i]);
			}else if (disen == "dis"){// 按钮显示
				$w(form).setDisplay(buttonItem[i]);
			}else if (disen.substring(0,2) == "sd"){// sheet页不可点击
				if(disen.split("_").length>1){
	                var index = disen.split("_")[1];
					$w(form).disOrEnClick(index, "disable");// $w("tab1").disOrEnClick(1,
															// "disable");
				}
			}else if (disen.substring(0,2) == "se"){// sheet页可点击
				if(disen.split("_").length>1){
	                var index = disen.split("_")[1];
					$w(form).disOrEnClick(index, "enable");// $w("tab1").disOrEnClick(1,
															// "enable");
				}
			}else if (disen == "toggle"){// 将Grid展开与收缩
				$w(form).toggle();
			}else if (disen == "formToggle"){// 将Form展开与收缩
				$w(form).toggleFormDisplay();
			}
		}
	}else{
		var iszb = ywpt_iszb();
		// 如果当前画面不是主表
		if (iszb == false){
			if (iframe == "zb"){
				for (var i = 0;i < buttonItem.length;i++){
					if (disen == "d"){
						parent.$w(form).setDisabled(buttonItem[i]);
					}else if (disen == "e"){
						parent.$w(form).setEnabled(buttonItem[i]);
					}else if (disen == "hid"){
						parent.$w(form).setHide(buttonItem[i]);
					}else if (disen == "dis"){
						parent.$w(form).setDisplay(buttonItem[i]);
					}else if (disen.substring(0,2) == "sd"){// sheet页不可点击
						if(disen.split("_").length>1){
			                var index = disen.split("_")[1];
			                parent.$w(form).disOrEnClick(index, "disable");// $w("tab1").disOrEnClick(1,
																			// "disable");
						}
					}else if (disen.substring(0,2) == "se"){// sheet页可点击
						if(disen.split("_").length>1){
			                var index = disen.split("_")[1];
			                parent.$w(form).disOrEnClick(index, "enable");// $w("tab1").disOrEnClick(1,
																			// "enable");
						}
					}else if (disen == "toggle"){// 将Grid展开与收缩
						$w(form).toggle();
					}else if (disen== "formToggle"){// 将Form展开与收缩
						$w(form).toggleFormDisplay();
					}
				}
			}else{
				// 如果要付值的附表已经打开，可以付值
				if ($chk(parent.fbisshow[iframe]) && parent.fbisshow[iframe].value == "Y"){
					for (var i = 0;i < buttonItem.length;i++){
						if (disen == "d"){
							parent.$(iframe + "_iframe").contentWindow.$w(form).setDisabled(buttonItem[i]);
						}else if (disen == "e"){
							parent.$(iframe + "_iframe").contentWindow.$w(form).setEnabled(buttonItem[i]);
						}else if (disen == "hid"){
							parent.$(iframe + "_iframe").contentWindow.$w(form).setHide(buttonItem[i]);
						}else if (disen == "dis"){
							parent.$(iframe + "_iframe").contentWindow.$w(form).setDisplay(buttonItem[i]);
						}else if (disen.substring(0,2) == "sd"){// sheet页不可点击
							if(disen.split("_").length>1){
				                var index = disen.split("_")[1];
				                parent.$(iframe + "_iframe").contentWindow.$w(form).disOrEnClick(index, "disable");
							}
						}else if (disen.substring(0,2) == "se"){// sheet页可点击
							if(disen.split("_").length>1){
				                var index = disen.split("_")[1];
				                parent.$(iframe + "_iframe").contentWindow.$w(form).disOrEnClick(index, "enable");
							}
						}else if (disen == "toggle"){// 将Grid展开与收缩
							$w(form).toggle();
						}else if (disen == "formToggle"){// 将Form展开与收缩
							$w(form).toggleFormDisplay();
						}
					}
				// 如果要付值的附表未打开，则不做处理直接返回
				}else{
					return;
				}
			}
		// 如果当前画面为主表
		}else{
			// 如果要付值的附表已经打开，可以付值
			if ($chk(fbisshow[iframe]) && fbisshow[iframe].value == "Y"){
				for (var i = 0;i < buttonItem.length;i++){
					if (disen == "d"){
						$(iframe + "_iframe").contentWindow.$w(form).setDisabled(buttonItem[i]);
					}else if (disen == "e"){
						$(iframe + "_iframe").contentWindow.$w(form).setEnabled(buttonItem[i]);
					}else if (disen == "hid"){
						$(iframe + "_iframe").contentWindow.$w(form).setHide(buttonItem[i]);
					}else if (disen == "dis"){
						$(iframe + "_iframe").contentWindow.$w(form).setDisplay(buttonItem[i]);
					}else if (disen.substring(0,2) == "sd"){// sheet页不可点击
						if(disen.split("_").length>1){
			                var index = disen.split("_")[1];
			                $(iframe + "_iframe").contentWindow.$w(form).disOrEnClick(index, "disable");
						}
					}else if (disen.substring(0,2) == "se"){// sheet页可点击
						if(disen.split("_").length>1){
			                var index = disen.split("_")[1];
			                $(iframe + "_iframe").contentWindow.$w(form).disOrEnClick(index, "enable");
						}
					}else if (disen == "toggle"){// 将Grid展开与收缩
						$w(form).toggle();
					}else if (disen == "formToggle"){// 将Form展开与收缩
						$w(form).toggleFormDisplay();
					}
				}
			// 如果要付值的附表未打开，则不做处理直接返回
			}else{
				return;
			}
		}
	}
}
/**
 * 
 * @param showInfo
 *            根据提示信息showInfo用户判断是确定还是取消
 * @param okJump
 *            确定进行的跳转操作
 * @return
 */
function ywpt_confirm(showInfo,onOkJump,onCancelJump,onCloseJump){
	// ywpt_confirm('该非居民对应的合同信息已经减免备案，是否要重新备案?',openFjmxsssxddyPage();,,);
	swordConfirm(showInfo, {
		onOk : function() {
			if(onOkJump!="doNothing" && onOkJump != undefined && onOkJump != ""){
				try{
					eval(onOkJump + "();");
				}catch(e){}
			}
		},
		onCancel : function() {
			if(onCancelJump!="doNothing" && onCancelJump != undefined && onCancelJump != ""){
				try{
					eval(onCancelJump + "();");
				}catch(e){}
			}
			return;
		},
		onClose : function() {
			if(onCloseJump!="doNothing" && onCloseJump != undefined && onCloseJump != ""){
				try{
					eval(onCloseJump + "();");
				}catch(e){}
			}
		}
	});
}

/**
 * 
 * @param showInfo
 *            swordAlert弹出的提示信息
 * @param onOkJump
 *            点击确定调用的方法
 * @param onCancelJump
 * @param onCloseJump
 * @return
 */
function ywpt_alert(showInfo,onOkJump,onCancelJump,onCloseJump){
	swordAlert(showInfo, {
		onOk : function() {
			if(onOkJump!="doNothing" && onOkJump != undefined && onOkJump != ""){
				try{
					eval(onOkJump + "();");
				}catch(e){}
			}
		},
		onCancel : function() {

		},
		onClose : function() {
			if(onCloseJump!="doNothing" && onCloseJump != undefined && onCloseJump != ""){
				try{
					eval(onCloseJump + "();");
				}catch(e){}
			}
		}
	});
}

/**
 * 
 * @param id
 *            数据项的id
 * @param property
 *            数据项需要被改变的属性
 * @param value
 *            数据项属性改变成的值
 * @return
 */
function ywpt_hover(id,property,value){
	var valueArrs = value.split(",");
	if("style" == property){
		$(id).style.display = valueArrs[0];
	}else if("innerText" == property){
		var innerText = "";
		for(var i = 0;i < valueArrs.length; i++){
			innerText = innerText + eval(valueArrs[i]);
		}
		$(id).innerText = innerText;
	}else if("innerHTML" == property){
		var innerHtml = "";
		for(var i = 0;i < valueArrs.length; i++){
			innerHtml = innerHtml + eval(valueArrs[i]);
		}
		$(id).innerHTML = innerHtml;
	}else if("transDisplay" == property){
		if(">"==$(id).innerHTML.substring(23, 24)){
			$(id).innerHTML = $(id).innerHTML.substring(0, 24) + value;
		}else{
			$(id).innerHTML = $(id).innerHTML.substring(0, 26) + value;
		}
	}else if(property.indexOf("setStyle:") >= 0){
		$(id).setStyle(property.replace("setStyle:",""),value);
	}
}

/**
 * 
 * @param id
 *            工作流组件的name
 * @param bz
 *            标志 addBtn表示增加按钮 callMethod表示调用方法
 * @param value
 *            按钮的内容或者方法名
 * @param btnName
 *            方法名的参数
 * @return
 */
function ywpt_gzl(id,bz,value,btnName){// ywpt_gzl(id,addBtn/callMethod,value,btnName)
	if("callMethod" == bz){
		if(btnName != ""){
			eval("$w('" + id + "')." + value + "('" + btnName + "')");
		}else{
			eval("$w('" + id + "')." + value + "()");
		}
	}else if("addBtn" == bz){
		// GZL.id.addBtn/callMethod.name:printBtn,pclass:print,caption:打印延期申报申请表单,enabled:false,onclick:print()
		var btn = "{";
		var properties = value.split(",");
		for(var m = 0;m < properties.length;m++){
			var propertyName = properties[m].split(":")[0];
			var propertyValue = properties[m].split(":")[1];
			btn = btn + propertyName + ":" + "'" + propertyValue + "'," ;
		}
		btn = btn.substring(0, btn.length-1);
		btn = btn + "}";
		$w(id).addButton(eval("(" + btn + ")"));
	}
}

function ywpt_windowclose(exefunc){
	var box = this.parent[this.name];
	if (exefunc != undefined && exefunc != ""){
		box.options.param.callBackData(eval(exefunc)); 
	}
	box.close();
}

// 申报导入处理方法
function drxx() {
	var gydrctrl="";
	if (nextOneCtrl != undefined && nextOneCtrl != ""){// 导入处理自定义的ctrl
		gydrctrl = nextOneCtrl+"_getDrxx";
	}else{
		return;
	}
	var drxxBtn = new SwordSubmit();
	if($chk(nsrxxReturn)){
		if ($chk(nsrxxReturn.djxh.value)) {
			drxxBtn.pushData('djxh', nsrxxReturn.djxh.value);
		}
	}
	
	if(_arrVars['cwgzbz']=="cwgzbz")
	{
		drxxBtn.pushData(_arrVars['cwgzMap']);
	}
	drxxBtn.pushData('gydrCtrl', gydrctrl);
	drxxBtn.setCtrl('GYDrCtrl_openDr');// 公用导入方法
	swordAlertIframe('', {
		titleName : "申报信息导入",
		width : 650,
		height : 500,
		param : window,
		isNormal : 'true',
		isMax : 'true',
		isClose : 'true',
		isMin : "true",
		submit : drxxBtn
	});
}
// 导入功能页面表单数据信息回填方法
function boxCallBackForSBdr(resData){
	//网报特色修改，只保留wssbbz=Y的逻辑
//	var res = JSON.decode(resData);
//	if(wssbbz == "Y"){
		var callBackResData = JSON.decode(callbackres);
		onSuccessForm(callBackResData);
//	}else{
//		onSuccessForm(res);
//	}
}

function _checkRadio(obj){
	var change = _arrVars[obj + "_checkRadio"];
	if (change == undefined	|| change == "" || change == null){
		change = _arrVars["ALLRADIO_checkRadio"];
	}
	if (change != undefined	&& change != "" && change != null){
		eval(change + "();");
	}
}

/**
 * 校验参数是空字符串,undefined,null或是0的时候,显示为0
 * 
 * @param num
 * @return
 */
function checkNumValue(num){
	if(num == "" || num ==undefined || num == null || num == 0){
		return "0.00";
	}else{
		return num;
	}
}

// ////////////////////////////////////////////////////
function getGridhj(gridName,colName){// 是获取某一个grid的某一列的合计
	  var arrGrid = gridName.split(",");
	  var hj = 0;
	  for (var i=0;i < arrGrid.length;i++){
		  if($w(arrGrid[i]).getAllNoDeleteGridData().trs.length>0){
			  var grid = $w(arrGrid[i]);
			  var hjDiv1 = grid.hjRow;
			  var cellArray1 = hjDiv1.getElements("div");
			  hj = hj + grid.getColumnSum(colName);
		  }
	  }
	  return hj;
}


function gridhcjs(rowData,row,gridName,setColName,jisuanItem,value){// 是grid中的行次计算，就相当于form中的bnjs,计算gridName中的l1列=l2计算公式所得
	var grid= $w(gridName);
	var hj = 0;
	if (jisuanItem == ""){
		return;
	}
	var arrh = jisuanItem.split(",");
	for (var i=0;i < arrh.length;i++){
		if (arrh[i].substring(0,1)=="-"){
			var je = rowData.getValue(gridName + "_" + arrh[i].substring(1,arrh[i].length)) / 1;
			hj = hj.subtract(je);
		}else if (arrh[i].substring(0,1)=="*"){
			var je = rowData.getValue(gridName + "_" + arrh[i].substring(1,arrh[i].length)) / 1;
			hj = hj.multiple(je);
		}else if (arrh[i].substring(0,1)=="/"){
			var je = rowData.getValue(gridName + "_" + arrh[i].substring(1,arrh[i].length)) / 1;
			if (je == 0){
				hj = 0;
			}else{
				hj = hj / je;
			}
		}else if (arrh[i].substring(0,1)=="|"){
			var je = rowData.getValue(gridName + "_" + arrh[i].substring(1,arrh[i].length)) / 1;
			if (je < 0){
				je = je.multiple(-1);
			}
			hj = hj.accAdd(je);
		}else if (arrh[i].substring(0,1)=="x"){
			var je = rowData.getValue(gridName + "_" + arrh[i].substring(1,arrh[i].length)) / 1;
			if (i==0){
				hj = je;
			}else{
				if (hj > je){
					hj = je;
				}
			}
		}else if (arrh[i].substring(0,1)=="^"){
			var je = parseFloat(arrh[i].substring(1,arrh[i].length)) / 1;
			hj = hj.multiple(je);// 计算方法待确定
		}else{
			var je = rowData.getValue(gridName + "_" + arrh[i]) / 1;
			hj = hj.accAdd(je);
		}
	}
	if (value != null){
		hj = hj.accAdd(parseFloat(value));
	}
	var td = gridName+"_"+setColName;
	eval("var d1={'tds':{'"+td+"': {'value':"+hj+"}}};");
	grid.updateRow(row, d1);
	grid.rereshHjRowData();
}

// 在条件为tj的时候，计算l列的合计
function getGridLhj(iframe,gridName,colName,tj){
	if (iframe != "" ){
		if (ywpt_iszb()){
			if (fbisshow[iframe] == undefined || fbisshow[iframe].value != "Y"){
				return getDataGridLhj(iframe,gridName,colName,tj);
			}
		}else{
			if (parent.fbisshow[iframe] == undefined || parent.fbisshow[iframe].value != "Y"){
				return getDataGridLhj(iframe,gridName,colName,tj);
			}
		}
	}
	var arrCol = colName.split(",");
	var grid = null;
	if (iframe == null || iframe == ""){
		grid = $w(gridName);
	}else{
		grid = getZbForm(iframe,gridName);
	}
	var hj = 0;
	// 如果是计算所有行的记录
	if (tj == "" && arrCol.length > 1 && arrCol[1] == "COUNT"){
		return grid.getAllNoDeleteGridData().trs.length;
	}
	var gridData = grid.getAllNoDeleteGridData().trs;
	var dataLength = gridData.length;
	// 如果是按照条件（一个条件）计算某一列的合计，或者符合条件的记录行数
	if (tj != ""){
			var arr = tj.split("=");
			if (dataLength <= 0){
				return hj;
			}
			for ( var i =0 ; i < dataLength; i++){
					var rowEI = gridData[i].tds;
					var tt = eval("rowEI."+arr[0]+".value");
					if (tt == null){
						tt = "";
					}
					if (arr[1] == tt){
						if (arrCol.length > 1 && arrCol[1] == "COUNT"){
							hj = hj + 1;
						}else{
							hj = hj + eval("rowEI."+colName+".value") / 1;
						}
					}
			}
	// 如果是计算某一列的合计金额
	}else{
		if (dataLength <= 0){
			return hj;
		}
			for ( var i =0 ; i < dataLength; i++){
					var rowEI = gridData[i].tds;
					var tt = eval("rowEI."+arrCol[0]+".value");
					// if (arr[1] == tt){
						hj = hj + eval("rowEI."+colName+".value") / 1;
					// }
			}
	}
	return hj;
}
// 在条件为tj的时候，计算l列的合计
function getDataGridLhj(iframe,gridName,colName,tj){
	var arrCol = colName.split(",");
	var grid = _arrVars[gridName];
	var hj = 0;
	if (grid == undefined){
		return hj;
	}
	// 如果是计算所有行的记录
	if (tj == "" && arrCol.length > 1 && arrCol[1] == "COUNT"){
		return grid.trs.length;
	}
	var gridData = grid.trs;
	var dataLength = gridData.length;
	// 如果是按照条件（一个条件）计算某一列的合计，或者符合条件的记录行数
	if (tj != ""){
			var arr = tj.split("=");
			for ( var i =0 ; i < dataLength; i++){
					var rowEI = gridData[i].data;
					var tt = eval("rowEI."+arr[0]+".value");
					if (tt == null){
						tt = "";
					}
					if (arr[1] == tt){
						if (arrCol.length > 1 && arrCol[1] == "COUNT"){
							hj = hj + 1;
						}else{
							hj = hj + eval("rowEI."+colName+".value") / 1;
						}
					}
			}
	// 如果是计算某一列的合计金额
	}else{
			for ( var i =0 ; i < dataLength; i++){
					var rowEI = gridData[i].data;
					var tt = eval("rowEI."+arrCol[0]+".value");
					// if (arr[1] == tt){
						hj = hj + eval("rowEI."+colName+".value") / 1;
					// }
			}
	}
	return hj;
}
function setGridMoreLvalue(gridName,setColName,jisuanItem,tj,round){// 在条件=tj时,
	// 解析jisuanitem
	var zbForm = $w(gridName);
	if (zbForm == null) return;
	var grid = zbForm;
	var gridData = grid.getAllNoDeleteGridData().trs;
	var dataLength = gridData.length;
	var arrl = jisuanItem.replace("(","").replace(")","").split(",");
	var jisuanItemTemp = jisuanItem;
	
	if (tj != "" && tj != undefined){
		if(tj.indexOf("=") > 0){
			var arr = tj.split("=");
			for (var i =0 ; i < dataLength; i++){
				var rowEI = gridData[i].tds;
				var tt = eval("rowEI."+arr[0]+".value");
				if (arr[1] == tt){
					if (jisuanItem.substr(0,1) == "="){
						var gsitem = jisuanItem.substr(1).replace(/iif\(/g,"").replace(/\(/g,"").replace(/\)/g,"");
						gsitem = gsitem.replace(/\*/g,"#****#");
						gsitem = gsitem.replace(/\//g,"#****#");
						gsitem = gsitem.replace(/\+/g,"#****#");
						gsitem = gsitem.replace(/-/g,"#****#");
						gsitem = gsitem.replace(/>=/g,"#****#");
						gsitem = gsitem.replace(/<=/g,"#****#");
						gsitem = gsitem.replace(/!=/g,"#****#");
						gsitem = gsitem.replace(/==/g,"#****#");
						gsitem = gsitem.replace(/>/g,"#****#");
						gsitem = gsitem.replace(/</g,"#****#");
						gsitem = gsitem.replace(/,/g,"#****#");
						arrl = gsitem.split("#****#");
						for(var i = 0;i < dataLength;i++){
							var rowEI = gridData[i].tds;
							//var rowEI = grid.getCheckedRowData().tds;// 取最后点击的行
							var je = 0.00;
							jisuanItem = jisuanItemTemp;
							for (var j=0;j < arrl.length;j++){
								var ff = arrl[j];
								if (!isNaN(parseFloat(ff))){
									je = parseFloat(ff);
								}else{
									if(eval("rowEI." + ff) != undefined){
										je = eval("rowEI." + ff +".value");
										if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
											je = parseFloat(je.substring(0, je.length - 1)) / 100;
										}
									}else{
										je = _arrVars[ff];
									}
								}
								if (isNaN(parseFloat(ff))){
									jisuanItem = jisuanItem.replace(ff,je);
								}
							}
							var hj = eval(jisuanItem.substr(1));
							if(!(hj == Number.POSITIVE_INFINITY) && !(isNaN(parseFloat(hj)))){
								var cells = grid.getCells(setColName)[i];
								grid.updateCell(cells,hj.round(2));
								grid.rereshHjRowData();
								continue;
							}
						}
						return;
					}else{
						var hj = 0;
						for (var j=0;j < arrl.length;j++){
							var first = arrl[j].substring(0,1);
							var ff = arrl[j].substring(1,arrl[j].length);
							if (first == "-" || first == "*" || first == "/" || first == "|" || first == "^"){
								
							}else{
								ff = arrl[j];
							}
							var je = 0.00;
							if (!isNaN(parseFloat(ff))){
								je = parseFloat(ff);
							}else{
								if(eval("rowEI." + ff) != undefined){
									je = eval("rowEI." + ff +".value");
									if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
										je = parseFloat(je.substring(0, je.length - 1)) / 100;
									}
								}else{
									je = _arrVars[ff];
								}
							}
							if (arrl[j].substring(0,1) == "-"){
								if (je == null) je = 0;
								hj = hj.subtract(je);
							}else if (arrl[j].substring(0,1) == "*"){
								if (je == null) je = 0;
								if (round == null){
									hj = hj.multiple(je).round(2);
								}else{
									if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
										je = parseFloat(je.substring(0, je.length - 1)) / 100;
									}
									hj = hj.multiple(je).round(round);
								}
							}else if (arrl[j].substring(0,1) == "/"){
								if (je == null) je = 0;
								if (je == 0){hj = 0;}
								else {
									if (round == null){
										hj = (hj / je).round(2);
									}else{
										hj = (hj / je).round(round);
									}
								}
							}else if (arrl[j].substring(0,1) == "|"){
								if (je == null) je = 0;
								if (je < 0){
									je = je.multiple(-1);
								}
								hj = hj.accAdd(je);
							}else if (arrl[j].substring(0,1)=="^"){
								je = parseFloat(ff) / 1;
								hj = hj.multiple(je);
							}else{
								if (je == null) je = 0;
								hj = hj.accAdd(je);
							}
							
						}
						var cells = grid.getCells(setColName)[i];
						grid.updateCell(cells,hj);
						grid.rereshHjRowData();
						break;
					}
				}
			}
		}else if(tj.indexOf("<>") > 0){
			var arr = tj.split("<>");
			for (var i =0 ; i < dataLength; i++){
				var rowEI = gridData[i].tds;
				var tt = eval("rowEI."+arr[0]+".value");
				if (arr[1] != tt){
					if (jisuanItem.substr(0,1) == "="){
						var gsitem = jisuanItem.substr(1).replace(/iif\(/g,"").replace(/\(/g,"").replace(/\)/g,"");
						gsitem = gsitem.replace(/\*/g,"#****#");
						gsitem = gsitem.replace(/\//g,"#****#");
						gsitem = gsitem.replace(/\+/g,"#****#");
						gsitem = gsitem.replace(/-/g,"#****#");
						gsitem = gsitem.replace(/>=/g,"#****#");
						gsitem = gsitem.replace(/<=/g,"#****#");
						gsitem = gsitem.replace(/!=/g,"#****#");
						gsitem = gsitem.replace(/==/g,"#****#");
						gsitem = gsitem.replace(/>/g,"#****#");
						gsitem = gsitem.replace(/</g,"#****#");
						gsitem = gsitem.replace(/,/g,"#****#");
						arrl = gsitem.split("#****#");
						for(var i = 0;i < dataLength;i++){
							var rowEI = gridData[i].tds;
							//var rowEI = grid.getCheckedRowData().tds;// 取最后点击的行
							var je = 0.00;
							jisuanItem = jisuanItemTemp;
							for (var j=0;j < arrl.length;j++){
								var ff = arrl[j];
								if (!isNaN(parseFloat(ff))){
									je = parseFloat(ff);
								}else{
									if(eval("rowEI." + ff) != undefined){
										je = eval("rowEI." + ff +".value");
										if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
											je = parseFloat(je.substring(0, je.length - 1)) / 100;
										}
									}else{
										je = _arrVars[ff];
									}
								}
								if (isNaN(parseFloat(ff))){
									jisuanItem = jisuanItem.replace(ff,je);
								}
							}
							var hj = eval(jisuanItem.substr(1));
							if(!(hj == Number.POSITIVE_INFINITY) && !(isNaN(parseFloat(hj)))){
								var cells = grid.getCells(setColName)[i];
								grid.updateCell(cells,hj.round(2));
								grid.rereshHjRowData();
								continue;
							}
						}
						return;
					}else{
						var hj = 0;
						for (var j=0;j < arrl.length;j++){
							var first = arrl[j].substring(0,1);
							var ff = arrl[j].substring(1,arrl[j].length);
							if (first == "-" || first == "*" || first == "/" || first == "|" || first == "^"){
								
							}else{
								ff = arrl[j];
							}
							var je = 0.00;
							if (!isNaN(parseFloat(ff))){
								je = parseFloat(ff);
							}else{
								if(eval("rowEI." + ff) != undefined){
									je = eval("rowEI." + ff +".value");
									if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
										je = parseFloat(je.substring(0, je.length - 1)) / 100;
									}
								}else{
									je = _arrVars[ff];
								}
							}
							if (arrl[j].substring(0,1) == "-"){
								if (je == null) je = 0;
								hj = hj.subtract(je);
							}else if (arrl[j].substring(0,1) == "*"){
								if (je == null) je = 0;
								if (round == null){
									if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
										je = parseFloat(je.substring(0, je.length - 1)) / 100;
									}
									hj = hj.multiple(je).round(2);
								}else{
									if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
										je = parseFloat(je.substring(0, je.length - 1)) / 100;
									}
									hj = hj.multiple(je).round(round);
								}
							}else if (arrl[j].substring(0,1) == "/"){
								if (je == null) je = 0;
								if (je == 0){hj = 0;}
								else {
									if (round == null){
										hj = (hj / je).round(2);
									}else{
										hj = (hj / je).round(round);
									}
								}
							}else if (arrl[j].substring(0,1) == "|"){
								if (je == null) je = 0;
								if (je < 0){
									je = je.multiple(-1);
								}
								hj = hj.accAdd(je);
							}else if (arrl[j].substring(0,1)=="^"){
								je = parseFloat(ff) / 1;
								hj = hj.multiple(je);
							}else{
								if (je == null) je = 0;
								hj = hj.accAdd(je);
							}
							
						}
						var cells = grid.getCells(setColName)[i];
						grid.updateCell(cells,hj);
						grid.rereshHjRowData();
					}
				}
			}
		}
	}else{
		if (jisuanItem.substr(0,1) == "="){
			var gsitem = jisuanItem.substr(1).replace(/iif\(/g,"").replace(/\(/g,"").replace(/\)/g,"");
			gsitem = gsitem.replace(/\*/g,"#****#");
			gsitem = gsitem.replace(/\//g,"#****#");
			gsitem = gsitem.replace(/\+/g,"#****#");
			gsitem = gsitem.replace(/-/g,"#****#");
			gsitem = gsitem.replace(/>=/g,"#****#");
			gsitem = gsitem.replace(/<=/g,"#****#");
			gsitem = gsitem.replace(/!=/g,"#****#");
			gsitem = gsitem.replace(/==/g,"#****#");
			gsitem = gsitem.replace(/>/g,"#****#");
			gsitem = gsitem.replace(/</g,"#****#");
			gsitem = gsitem.replace(/,/g,"#****#");
			arrl = gsitem.split("#****#");
			for(var i = 0;i < dataLength;i++){
				var rowEI = gridData[i].tds;
				//var rowEI = grid.getCheckedRowData().tds;// 取最后点击的行
				var je = 0.00;
				jisuanItem = jisuanItemTemp;
				for (var j=0;j < arrl.length;j++){
					var ff = arrl[j];
					if (!isNaN(parseFloat(ff))){
						je = parseFloat(ff);
					}else{
						if(eval("rowEI." + ff) != undefined){
							je = eval("rowEI." + ff +".value");
							if(je == null || je == ""){
								je = 0;
							}
							if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
								je = parseFloat(je.substring(0, je.length - 1)) / 100;
							}
						}else{
							je = _arrVars[ff];
						}
					}
					if (isNaN(parseFloat(ff))){
						jisuanItem = jisuanItem.replace(ff,je);
					}
				}
				var hj = eval(jisuanItem.substr(1));
				if(!(hj == Number.POSITIVE_INFINITY) && !(isNaN(parseFloat(hj)))){
					var cells = grid.getCells(setColName)[i];
					grid.updateCell(cells,hj.round(2));
					grid.rereshHjRowData();
					continue;
				}
			}
			return;
		}else{
			for (var i =0 ; i < dataLength; i++){
				var rowEI = gridData[i].tds;
				var hj = 0;
				for (var j=0;j < arrl.length;j++){
					var first = arrl[j].substring(0,1);
					var ff = arrl[j].substring(1,arrl[j].length);
					if (first == "-" || first == "*" || first == "/" || first == "|" || first == "^"){
						
					}else{
						ff = arrl[j];
					}
					var je = 0.00;
					if (!isNaN(parseFloat(ff))){
						je = parseFloat(ff);
					}else{
						if(eval("rowEI." + ff) != undefined){
							je = eval("rowEI." + ff +".value");
						}else{
							je = _arrVars[ff];
						}
					}
					if (arrl[j].substring(0,1) == "-"){
						if (je == null) je = 0;
						hj = hj.subtract(je);
					}else if (arrl[j].substring(0,1) == "*"){
						if (je == null) je = 0;
						if (round == null){
							hj = hj.multiple(je).round(2);
						}else{
							if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
								je = parseFloat(je.substring(0, je.length - 1)) / 100;
							}
							hj = hj.multiple(je).round(round);
						}
					}else if (arrl[j].substring(0,1) == "/"){
						if (je == null) je = 0;
						if (je == 0){hj = 0;}
						else {
							if (round == null){
								hj = (hj / je).round(2);
							}else{
								hj = (hj / je).round(round);
							}
						}
					}else if (arrl[j].substring(0,1) == "|"){
						if (je == null) je = 0;
						if (je < 0){
							je = je.multiple(-1);
						}
						hj = hj.accAdd(je);
					}else if (arrl[j].substring(0,1)=="^"){
						je = parseFloat(ff) / 1;
						hj = hj.multiple(je);
					}else{
						if (je == null) je = 0;
						hj = hj.accAdd(je);
					}
					
				}
				var cells = grid.getCells(setColName)[i];
				grid.updateCell(cells,hj);
				grid.rereshHjRowData();
			}
		}
	}
}
// /////////////////////////////////////////////////////////////////
// setGridLvalue(gridName1,'',colName,'je1=100',realValue);
function setGridLvalue(iframe,gridName,l,tj,value){// 在某种条件下单独为某列付值
		var zbForm = getZbForm(iframe,gridName);
		if (zbForm == null) return;
		var grid = zbForm;
		var gridData = grid.getAllNoDeleteGridData().trs;
		var dataLength = gridData.length;
		var row = null;
		if (tj != ""){
				var arr = tj.split("=");
				for ( var i =0 ; i < dataLength; i++){
						var rowEI = gridData[i].tds;
						
						var tt = eval("rowEI."+arr[0]+".value");
						if (arr[1] == tt){
								var cells = grid.getCells(l)[i];
								grid.updateCell(cells,value);
								break;
						}
				}
		}
		return;
}

// 为gridName的rowEI行colName列赋值realValue，调用方法updateRowColValue('gridName','colName',realValue)
function updateRowColValue(gridName,colName,value,caption){// 在某种条件下单独为某列付值
	var grid = $w(gridName);
	var rowEI = grid.getCheckedRow();// 取最后点击的行
	if (rowEI != null){
		if (caption != null && caption != undefined){
			grid.updateCell(rowEI.getCell(colName), value, caption);
		}else{
			grid.updateCell(rowEI.getCell(colName), value);
		}
	}
}

function getCurRowColValue(gridName,colName){
	var rowEI = $w(gridName).getCheckedRow();// 取最后点击的行
	if (rowEI == null){
		return "";
	}
	return rowEI.getCell(colName).get("realvalue");
}

function getCurRowColCaptionValue(gridName,colName){
	var rowEI = $w(gridName).getCheckedRow();// 取最后点击的行
	if (rowEI == null){
		return "";
	}
	return rowEI.getCell(colName).get("caption");
}

function getZbForm(iframe,formName){
	if (iframe == ""){
		return $w(formName);
	}else{
		var iszb = ywpt_iszb();
		// 如果当前画面不是主表
		if (iszb == false){
			if (iframe == "zb"){
				return parent.$w(formName);
			}else{
				// 如果要付值的附表已经打开，可以付值
				if ($chk(parent.fbisshow[iframe]) && parent.fbisshow[iframe].value == "Y"){
					return parent.$(iframe + "_iframe").contentWindow.$w(formName);
				// 如果要付值的附表未打开，则不做处理直接返回
				}else{
					return;
				}
			}
		// 如果当前画面为主表
		}else{
			// 如果要付值的附表已经打开，可以付值
			if ($chk(fbisshow[iframe]) && fbisshow[iframe].value == "Y"){
				return $(iframe + "_iframe").contentWindow.$w(formName);
			// 如果要付值的附表未打开，则不做处理直接返回
			}else{
				return;
			}
		}
	}
}

function getYwptVars(varsName,item,def){
	if (_arrVars[varsName] == undefined){
		return def;
	}else{
		var arrh = item.split(",");
		if (arrh.length > 1){
			var hj = 0.00;
			for (var i = 0;i < arrh.length;i++){
				var jsitem = "";
				var je = 0;
				var first = arrh[i].substring(0,1);
				if (first == "-" || first == "/" 
					|| first == "|" || first == "*" 
					|| first == ">"|| first == "<" 
					|| first == "?" || first == "+"){
					jsitem = arrh[i].substring(1,arrh[i].length).replace("。",".");
				}else{
					jsitem = arrh[i].replace("。",".");
				}
				// 如果本身计算公式中存在数字
				if (!isNaN(parseFloat(jsitem))){
					je = parseFloat(jsitem);
				}else if (jsitem == "HJ"){
					je = 1;
				}else{
					if (typeof(_arrVars[varsName]) == "object"){
						if (_arrVars[varsName].data == undefined){
							je = eval("_arrVars['" + varsName + "']." + jsitem);
						}else{
							je = eval("_arrVars['" + varsName + "'].data." + jsitem + ".value");
						}
					}
				}
				if (first == "-"){
					hj = hj - je;
				}else if (first == "/"){
					if (je == 0){
						hj = 0;
					}else{
						hj = hj / je;
					}
				}else if (first == "|"){
					if (je < 0){
						je = je.multiple(-1);
					}
					hj = hj.accAdd(je);
				}else if (first=="*"){
					if(typeof(je) == "string" && je.lastIndexOf("%") >= 0){
						je = parseFloat(je.substring(0, je.length - 1)) / 100;
					}
					hj = hj.multiple(je);
				}else if (first==">"){
					if (jsitem == "HJ"){
						if (hj <= 0){
							hj = 0;
						}
					}else{
						if (je > 0){
							hj = hj.accAdd(je);
						}else{
							hj = hj.accAdd(0);
						}
					}
				}else if (first=="<"){
					if (jsitem == "HJ"){
						if (hj >= 0){
							hj = 0;
						}
					}else{
						if (je < 0){
							hj = hj.accAdd(je);
						}else{
							hj = hj.accAdd(0);
						}
					}
				}else if (first=="?"){
					if (je <= hj){
						hj = je;
					}
				}else{
					hj = hj.accAdd(je);
				}
				if(isNaN(hj) || hj == undefined){
					hj = 0.00;
				}
			}
		}else{
			if (typeof(_arrVars[varsName]) == "object"){
				var je = "";
				if (_arrVars[varsName].data == undefined){
					je = eval("_arrVars['" + varsName + "']." + item);
				}else{
					if (eval("_arrVars['" + varsName + "'].data") != undefined){
						if (eval("_arrVars['" + varsName + "'].data." + item) != undefined){
							je = eval("_arrVars['" + varsName + "'].data." + item + ".value");
						}
					}
				}
				if (def == 0.00){
					if (je == undefined){
						je = def;
					}
				}
				return je;
			}else{
				return _arrVars[varsName];
			}
		}
	}
}
// ///////////////////////////////////////

var mouseX, mouseY; 
var objX, objY; 
var isDowm = false; // 是否按下鼠标
function mouseDown(obj, e) { 
	objX = obj.style.left; 
	objY = obj.style.top; 
	mouseX = e.clientX; 
	mouseY = e.clientY; 
	isDowm = true; 
} 
function mouseMove(e) { 
	var div = document.getElementById("tsxx"); 
	var x = e.clientX; 
	var y = e.clientY; 
	if (isDowm) { 
		div.style.left = parseInt(objX) + parseInt(x) - parseInt(mouseX) + "px"; 
		div.style.top = parseInt(objY) + parseInt(y) - parseInt(mouseY) + "px"; 
	} 
} 
function mouseUp(e) { 
	if (isDowm) { 
		var x = e.clientX; 
		var y = e.clientY; 
		div = document.getElementById("tsxx"); 
		div.style.left = (parseInt(x) - parseInt(mouseX) + parseInt(objX)) + "px"; 
		div.style.top = (parseInt(y) - parseInt(mouseY) + parseInt(objY)) + "px"; 
		mouseX = x; 
		rewmouseY = y; 
		isDowm = false; 
	} 
}

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
 * 截取前后空格
 */
function trimStr(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function openZbFb(fbName,curName){
	var iszb = ywpt_iszb();
	if (iszb){
		if ($chk(fbisshow[fbName])){
			if (fbisshow[fbName].value == "Y"){
				$(fbName + "_div").style.display = "block";
				$(curName + "_div").style.display = "none";
			}else{
				
			}
		}else{
			try
			{
				$(fbName + "_div").style.display = "block";
				$(curName + "_div").style.display = "none";
			}catch(e){}
		}
	}else{
		if ($chk(parent.fbisshow[fbName])){
			if (parent.fbisshow[fbName].value == "Y"){
				parent.$(fbName + "_div").style.display = "block";
				parent.$(curName + "_div").style.display = "none";
			}
		}else{
			try
			{
				parent.$(fbName + "_div").style.display = "block";
				parent.$(curName + "_div").style.display = "none";
			}catch(e){}
		}
	}
}

function ywpt_addevent(formName,item,eventItem,func){
	if (formName.substr(formName.length-4,formName.length) == "Form"){
		var arrItem = item.split(",");
		for (var i = 0;i < arrItem.length;i++){
			$w(formName).getFieldEl(arrItem[i]).addEvent(eventItem,eval(func));
		}
	}
	if (formName.substr(formName.length-4,formName.length) == "Grid"){
		var arrItem = item.split(",");
		for (var i = 0;i < arrItem.length;i++){
			eventItem = "on" + eventItem;
			func = func + "()";
			$w(formName)._switchColumn(arrItem[i],"text",{eventItem : func},true);
		}
	}
}

function getCurDisFb(zb){
	if (!$chk(_arrVars['treeData'])){
		return "";
	}
	if (zb == "zb"){
		return _arrVars['treeData'][0].code;
	}
	for (var i = 0;i < _arrVars['treeData'].length;i++){
//		if (document.all(_arrVars['treeData'][i].code + "_div").style.display == "block"){
		// 修改 ie11 360  兼容性问题  by lei 
		if (document.getElementById(_arrVars['treeData'][i].code + "_div").style.display == "block"){
			return _arrVars['treeData'][i].code;
		}
    }
}

function ywpt_initSelectData(dataName,obj){
	var widgetData = { "data" :[{   
        "sword": "SwordSelect",   
        "dataName": dataName,   
        "data": obj
    }]}   
	pc.reloadSel(dataName,widgetData);
}

function ywpt_saveOnSuccess(req,res){
	if($w('sbToolBar') != undefined && $w('sbToolBar') != null && $w('sbToolBar') != ''){
		ywpt_butdisen('','sbToolBar','save','d');

	}
	if('saveOnSuccessEvent' in window){
		if (saveOnSuccessEvent != undefined && saveOnSuccessEvent != null && saveOnSuccessEvent != ""){
			eval(saveOnSuccessEvent + "();");
		}
	}
	
	var sbsaveReturnVO = pc.getResData("sbsaveReturnVO", res);
	var returnBz = sbsaveReturnVO.data.returnBz.value;
	if (returnBz == "Y") {
		var pzxh = sbsaveReturnVO.data.pzxh.value;
		var ybtse = sbsaveReturnVO.data.ybtse.value;
		fromYbSBJumpZskp(pzxh, ybtse, nsrxxReturn.djxh.value, res);
	}
}
function ywpt_saveOnSuccessFor203(req,res){
	if($w('sbToolBar') != undefined && $w('sbToolBar') != null && $w('sbToolBar') != ''){
		ywpt_butdisen('','sbToolBar','save','d');

	}
	if('saveOnSuccessEvent' in window){
		if (saveOnSuccessEvent != undefined && saveOnSuccessEvent != null && saveOnSuccessEvent != ""){
			eval(saveOnSuccessEvent + "(req,res);");
		}
	}
}
//function fjscallbackfor203(req,res){
//	if('initSuccessEvent' in window){
//		if (initSuccessEvent != undefined && initSuccessEvent != null && initSuccessEvent != ""){
//			eval(initSuccessEvent + "(req,res);");
//		}
//	}
//}
function checkExistValue(value){
	if(value == undefined || value == null || value == ""){
		return false;
	}
	return true;
}

/**
 * 
 * @param iframe
 * @param formName
 * @param item
 * @return 为formName中的item数据项指定获得焦点
 */
function ywpt_getFocus(iframe,formName,item){
	if($w(formName) != undefined){
		$w(formName).getFieldEl(item).focus();
	}
}

function ywpt_getJdxzData(formName,qxxzqh,jdxzxzqh){
    var sub = new SwordSubmit();
    var xzqhDm = $w(formName).getValue(qxxzqh).code;
    ywpt_clearJdxzData(formName, jdxzxzqh);
    sub.pushData('xzqhDm', xzqhDm);
    sub.setCtrl("SBGyCtrl_getJdxzByXzqh");//定义返回下拉列表数据集的目标服务   
    sub.submit();
}   

function ywpt_clearJdxzData(formName, jdxzxzqh){
	
	
	var obj = [];
	$w(formName).setValue(jdxzxzqh, "");
	ywpt_initSelectData("DM_GY_YWPTJDXZ", obj);
}


/**
 * 暂存导入功能页面表单数据信息回填方法 add by muyx
 */
function boxCallBackForSBzcdr(resData){
	boxCallBackForSBdr(resData);
}

