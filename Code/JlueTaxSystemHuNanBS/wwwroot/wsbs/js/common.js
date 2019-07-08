/**
create by JiangZuoWei 2015-12-02
*/
function isEmpty(value) {
	if(!value || value=="null")
		return true;
	else
		return false;
}

$(function () {
	//window.event.cancelBubble=true;
	window.onhelp = function(){return false;};
	document.onkeydown=function(event){
		event = event ? event : window.event;
		//var keycode = (window.event) ? event.which : event.keyCode;
		var keycode = event.keyCode || event.which || event.charCode;
		//if(event.preventDefault){
		//	event.preventDefault();
		//}else{event.returnValue = false;}
		if(keycode == 112){
			var hosts = window.location.host;
			window.open('http://'+hosts+'/wsbspc/ggcx/publicService/instruction/view_caozuoshuoming.do?pageId=1');
		}
	};
});

function isSuccess(code) {
	if(isEmpty(code)){
		return false;
	}else if((code == '000' || code.substring(0,1) == '1') && code.length < 6){
		return true;
	}
	return false;
}

function isLogout(code) {
	return (code == '202'|| code == '203' || code=='806');
}
function isFileSizeBig(code) {
	return code == '100204';
}
function isPass(code) {
	return code == '513';
}
function showLogin() {
	$('#loginalert').show();
}
function showLogoutMessage() {
	layerAlert('您还未登录或登录超时，请重新登录系统！');
	setTimeout("logout('/user/Signin/loginRedirect.do')",2000);
}

function getTableTr(tableId, isAll) {
	var tr = '';
	var find = !isEmpty(isAll) ? '' : ':not(:first)';
	$('#' + tableId).find('tr' + find).each(function() {
		//带入原有TR的Class
		var clas = $(this).attr("class");
		if(clas != "unbuild") {
			copyTr = '<tr>';
			if (!isEmpty(clas) && clas != 'unbuild') {
				var copyTr =  '<tr class="'+clas+'">';
			}
			tr += copyTr;

			$(this).children().each(function() {
				var text = $(this).find('input[type="text"]');
				var radio = $(this).find('input[type="radio"]:checked');
				var select = $(this).find('select');
				var span = $(this).find('span[class="msg-box n-top"]');
				var checkbox = $(this).find('input[type="checkbox"]');

				if ($(this).attr('class') != 'unbuild') {
					if (span.length > 0) {
						span.remove();
					}
					var _each = $(this).clone()[0].outerHTML;;
					if (radio.length > 0) {
						var radioText = radio.parent().text();
						_each = _each.replace($(this).clone()[0].innerHTML, radioText);
					}
					if (text.length > 0) {
						text.each(function() {
							if("NO_BGHZ" == $(this).val()){  //变更登记 用到
								_each = _each.replace("NO_BGHZ", "");///<input[^>]+>/g
							}else{
								_each = _each.replace($(this).clone()[0].outerHTML, $(this).val());///<input[^>]+>/g
							}
							//_each = _each.replace($(this).clone()[0].outerHTML, $(this).val());///<input[^>]+>/g
						})
					}
					if (select.length > 0) {
						select.each(function() {
							if ($(this).find("option:selected").val() == undefined || $(this).find("option:selected").val() == ""){
                                _each = _each.replace($(this).clone()[0].outerHTML, "");
							} else{
								_each = _each.replace($(this).clone()[0].outerHTML, $(this).find("option:selected").text());///<input[^>]+>/g
							}
						})
					}
					if (checkbox.length > 0) {  //对checkbox，复制一个checkbox用来显示，以显示的checkbox不能再变动勾选
						checkbox.each(function() {
							var checkboxCopy = checkbox.clone();
							checkboxCopy = checkboxCopy.removeAttr("id");
							checkboxCopy = checkboxCopy.removeAttr("name");
							checkboxCopy = checkboxCopy.attr("onclick","return false");

							_each = _each.replace($(this).clone()[0].outerHTML, checkboxCopy[0].outerHTML);
						})
					}
					
					tr += _each;
				}
			})
			tr += '</tr>';
		}
	})

	return tr;
}

function copyTr(id, addBtn) {
	var _tr = '<tr>';
	var lastTrId = $(addBtn).parent().parent().parent().find('tr:last').find('input[type=text]:last').attr('id');
	var curNum = isEmpty(lastTrId) ? 0 : (Number(lastTrId.split('_')[1]) + 1);
	$('#' + id).find('tr').find('td').each(function() {
		var obj = null, isContain = false;
		var input = $(this).find('input[type="text"]');
		var inputHidden = $(this).find('input[type="hidden"]');
		var select = $(this).find('select');
		var button = $(this).find('a[type=button]');
		if (input.length > 0) {
			obj = input.clone();
			isContain = true;
		} else if (select.length > 0) {
			obj = select.clone();
			isContain = true;
		} else if (button.length > 0) {
			obj = button.clone();
			isContain = true;
		} 
		
		if (isContain) {
			//_tr += '<td colspan="' + $(this).attr("colspan") + '" class="' + $(this).attr("class") + '">';
			_tr += '<td ';
			_tr += isEmpty($(this).attr("colspan")) ? '' : ' colspan="'+ $(this).attr("colspan") + '"';
			_tr += isEmpty($(this).attr("class")) ? '' : ' class="'+ $(this).attr("class") + '"';
			_tr += ' >';
			if (button.length <= 0) {
				obj.attr('id', obj.attr('name') + '_' + curNum);
				if (inputHidden.length > 0) {
					inputHidden.each(function() {
						var eachHide = $(this).clone().attr('id', $(this).attr('name') + '_' + curNum);
						_tr += eachHide[0].outerHTML;
					})
				}
			}
			_tr += obj[0].outerHTML;
			_tr += '</td>';
		} else {
			_tr += $(this).clone()[0].outerHTML;
		}
	})
	_tr += '</tr>';
	return _tr;
}

function createFields(obj, ids, idsRule) {
	var fields = '';
	if (!isEmpty($(obj).attr('id'))) {
		var array = $(obj).attr('id').split('_');
		var index = $.inArray(array[0], ids);
		if (index > -1) {
			fields += '"#' + $(obj).attr('id') + '" : "' + idsRule[index] + '",'
		}
	} else {
		for(var i = 0; i < ids.length; i++) {
			fields += '"' + ids[i] + '" : "' + idsRule[i] + '",'
		}
	}
	return fields;
}

function layerMsg(msg, type) {
	layer.msg(msg, {icon: type, time: 4000});
}

//iscolse 是否关闭弹窗
function layerAlert(msg, isClose,resultCode) {
	//var triggerElement = document.activeElement;
	//triggerElement.blur();
	var iconType = 2;
	if('000' == resultCode){
		iconType = 1;
	}

	if(isEmpty(resultCode)){

	}else if(resultCode.substring(0,1) == '1'){
		iconType = 1;
	}


	/*alert(msg);
	if (isClose) {
		$("#showDialog").dialog("close");
	}*/
	if (isClose) {
		layer.alert(msg, {
			icon: iconType
	        ,closeBtn: 0
	    }, function(index){
	    	layer.close(index);
			$("#queryBtn").trigger("click");
			// 浏览器初始化点击时showDialog存在cannot call methods on dialog
			try {
				$("#showDialog").dialog("close");
			} catch(err) {
				// 暂时不进行处理
			}
	    });
	} else {
		layer.alert(msg, {
			icon: iconType
			,closeBtn: 0
		});
	}
}

function addEvaluate(wsid, yyfwdm) {
	var uri = '/evaluate/publicService/view_evaluate.do?wsid=' + wsid + '&yyfwdm=' + yyfwdm;
	openDialog(uri, '900', '580', '新增用户评论');
}

function cancel(wsid){
	layer.confirm('确认撤销该记录?', {
		btn: ['确定', '取消']
	}, function () {
		$.ajax({
			url:  ctx +'/ws/taxApplication/cancelWs.do',
			type:'get',
			dataType: 'json',
			data:{wsid:wsid},
			success:function(data){
				if(isSuccess(data.result.code)){
					// 修复页面初始化时点击撤销无法刷新页面BUG
					//layer.msg(data.result.msg, {icon: 1});
					//$("#queryBtn").trigger("click");
					layerAlert(data.result.msg, true, data.result.code);
				}else{
					layerAlert(data.result.msg, true, '200');
				}
			}
		});
	});
}


function detailEvaluate(wsid, yyfwdm) {
	var uri = '/evaluate/publicService/detail_evaluate.do?wsid=' + wsid + '&yyfwdm=' + yyfwdm;
	openDialog(uri, '900', '580', '查看用户评论');
}

function addXzxkEvaluate(wsid, wszlDm) {
	var url = "/ws/taxApplication/xzxk_evaluate.do" ;
	if(wsid){
		url =  url+"?wsid="+wsid+"&yyfwdm="+getQueryString("rsv_idx");
	}
	openDialog(url, '94%', 620, '服务评价');
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function changStep(step) {
	$("#status").find('li').attr("class","");
	$("#status").find('li:eq(' + (step - 1) + ')').attr("class", "activet");
}

Date.prototype.format = function(format) {
	var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate(),    //day
			"h+" : this.getHours(),   //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
			"S" : this.getMilliseconds() //millisecond
	};

	if(/(y+)/.test(format))
	{
		format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}

	for(var k in o)
	{
		if(new RegExp("("+ k +")").test(format))
		{
			format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}
function getsssq(){
	var mydate=new Date();
	//mydate.setMonth(mydate.getMonth()-1);

	var year=mydate.getFullYear();
	var month=mydate.getMonth()+1;
	var date=mydate.getDate();
	if(month<10){
		month="0"+month;
	}
	if(date<10){
		date="0"+date;
	}
	return ""+year+""+month+""+date;
}

function FormatNumber(srcStr, nAfterDot)//nAfterDot小数位数
{
	var srcStr, nAfterDot;
	var resultStr, nTen;
	srcStr = "" + srcStr + "";
	strLen = srcStr.length;
	dotPos = srcStr.indexOf(".", 0);
	if (dotPos == -1) {
		resultStr = srcStr + ".";
		for (i = 0; i < nAfterDot; i++) {
			resultStr = resultStr + "0";
		}
		return resultStr;
	}
	else {
		if ((strLen - dotPos - 1) >= nAfterDot) {
			nAfter = dotPos + nAfterDot + 1;
			nTen = 1;
			for (j = 0; j < nAfterDot; j++) {
				nTen = nTen * 10;
			}
			resultStr = Math.round(parseFloat(srcStr) * nTen) / nTen;
			return resultStr;
		}
		else {
			resultStr = srcStr;
			for (i = 0; i < (nAfterDot - strLen + dotPos + 1); i++) {
				resultStr = resultStr + "0";
			}
			return resultStr;
		}
	}
}

//身份证验证
function IdentityCodeValid(code) { 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    if(!pass);
    return pass;
}

function toJson(fields) {
	var res = '{';
	res += fields.substr(0, fields.length - 1) + '}';
	return JSON.parse(res);
}


//金额转中文大写
function chineseNumber(num)
{
	if (isNaN(num) || num > Math.pow(10, 13))
		return ""
	var cn = "零壹贰叁肆伍陆柒捌玖"
	var unit = new Array("拾百千", "分角")
	var unit1 = new Array("万亿兆", "")
	var numArray = num.toString().split(".")
	var start = new Array(numArray[0].length - 1, 2)

	function toChinese(num, index)
	{
		var num = num.replace(/\d/g, function($1)
		{
			return cn.charAt($1) + unit[index].charAt(start-- % 4 ? start % 4 : -1)
		})
		return num
	}

	for (var i = 0; i < numArray.length; i++)
	{
		var tmp = ""
		for (var j = 0; j * 4 < numArray[i].length; j++)
		{
			var strIndex = numArray[i].length - (j + 1) * 4
			var str = numArray[i].substring(strIndex, strIndex + 4)
			var start = i ? 2 : str.length - 1
			var tmp1 = toChinese(str, i)
			tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "")
			tmp1 = tmp1.replace(/^壹拾/, "拾")
			tmp = (tmp1 + unit1[i].charAt(j - 1)) + tmp
		}
		numArray[i] = tmp
	}

	numArray[1] = numArray[1] ? numArray[1] : ""
	numArray[0] = numArray[0] ? numArray[0] + "元" : numArray[0], numArray[1] = numArray[1].replace(/^零+/, "")
	numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1] + "整"
	return numArray[0] + numArray[1]
}


/*
 *数组元素去重
 */
//if(typeof Array.prototype.distinct != "function"){
//
//	Array.prototype.distinct = function distinctArray(){
//		this.sort();
//		for(var i=0;i<this.length-1;i++){
//			if($.isPlainObject(this[i]) && $.isPlainObject(this[i+1])){
//				if(o2o(this[i],this[i+1])){
//					this.splice(i,1);
//				}
//			}else if($.isArray(this[i]) && $.isArray(this[i+1])){
//				if(a2a(this[i],this[i+1])){
//					this.splice(i,1);
//				}
//			}else if(this[i]===this[i+1]){
//				this.splice(i,1);
//			}
//		}
//	}
//}

function arrayDistinct(arry){
	arry.sort();
	for(var i=0;i<arry.length-1;i++){
		if($.isPlainObject(arry[i]) && $.isPlainObject(arry[i+1])){
			if(o2o(arry[i],arry[i+1])){
				arry.splice(i,1);
			}
		}else if($.isArray(arry[i]) && $.isArray(arry[i+1])){
			if(a2a(arry[i],arry[i+1])){
				arry.splice(i,1);
			}
		}else if(arry[i]===arry[i+1]){
			arry.splice(i,1);
		}
	}
	return arry;
}

/*
 *比较对象是否相同
 */
function o2o(o1,o2){
	if(!($.isPlainObject(o1) && $.isPlainObject(o2))){
		return false;
	}
	var k1k2=[],k1 =[],k2=[];
	$.each(o1,function(k,v){
		k1.push(k);
	});
	$.each(o2,function(k,v){
		k2.push(k);
	});
	if(k1.length != k2.length){
		return false;
	}
	k1k2 = k1;
	k1k2 = k1k2.concat(k2);
	//k1k2.distinct();
	k1k2 = arrayDistinct(k1k2);
	if(k1.length != k1k2.length || k2.length != k1k2.length){
		return false;
	}
	var flag=true;
	$.each(k1k2,function(i,v){
		var v1= o1[v];
		var v2 =o2[v];
		if(typeof v1 != typeof v2){
			flag= false;
		}else{
			if($.isPlainObject(v1) && $.isPlainObject(v2)){//recursion
				flag = o2o(v1,v2);
				if(!flag){
					return false;
				}
			}else if($.isArray(v1) && $.isArray(v2)){
				flag = a2a(v1,v2);
				if(!flag){
					return false;
				}
			}else{
				if(v1 !== v2){
					flag= false;
				}
			}
		}
	});
	return flag;
}

function isNumber(val){

	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
	if(regPos.test(val) || regNeg.test(val)){
		return true;
	}else{
		return false;
	}

}
/*
 *比较数组是否完全相同
 */
function a2a(a1,a2){
	if(!($.isArray(a1) && $.isArray(a2))){
		return false;
	}
	if(a1.length != a2.length){
		return false;
	}
	a1.sort();
	a2.sort();
	for(var i=0;i<a1.length;i++){
		if(typeof a1[i] != typeof a2[i]){
			return false;
		}
		if($.isPlainObject(a1[i]) && $.isPlainObject(a2[i])){
			var retVal = o2o(a1[i],a2[i]);
			if(!retVal){
				return false;
			}
		}else if($.isArray(a1[i]) && $.isArray(a2[i]) ){//recursion
			if(!a2a(a1[i],a2[i])){
				return false;
			}
		}else if(a1[i] !== a2[i]){
			return false;
		}
	}
	return true;
}

//function printme(divId) {
//	$("#" + divId).printArea({mode: 'popup',popClose:true,popHt:600,popWd:800});
//}

function printme(divId) {
	var htmlValue = $("#"+divId).html();
	store.set("htmlValue",htmlValue);
	//alert(htmlValue);
	window.open(ctx+'/toPrintPage.jsp');
}

function truePrint(divId) {
	$("#" + divId).printArea({mode: 'popup',popClose:true,popHt:600,popWd:800});
}

function closeDialog() {
	$('#showDialog').dialog('close');
}

function downLoadFile(node,url,filename){
	if($(node).siblings("input[name='isModified']").val()=="yes"){
		layerAlert("点击保存或提交后方可下载");
		return;
	}
	if(!filename){
		layerAlert("没有附件可供下载");
		return;
	}
	if(!url){
		layerAlert("文件下载地址错误,下载失败");
		return;
	}
	window.open(url);
}

//序列化转Json
$.fn.serializeJson=function(){
	var serializeObj={};
	var array=this.serializeArray();
	$(array).each(function(){
		if(serializeObj[this.name]){
			if($.isArray(serializeObj[this.name])){
				serializeObj[this.name].push(this.value);
			}else{
				serializeObj[this.name]=[serializeObj[this.name],this.value];
			}
		}else{
			serializeObj[this.name]=this.value;
		}
	});
	return serializeObj;
};

String.prototype.startWith = function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substr(0,str.length)==str)
		return true;
	else
		return false;
	return true;
}

/**
 * 对日期进行格式化，
 * @param substring 进行截取的字符串
 * @param sublength 截取到多长
 * @return String
 */
function stringsubString(substring,sublength){
	//var sublength=24;
	var beforsubstring="";
	if(!isEmpty(substring)){
		if(substring.length>sublength){
			beforsubstring=substring.substr(0,sublength)+"...";
		}else{
			beforsubstring=substring.substr(0,substring.length);
		}

	}
	return beforsubstring;
}


/**
 * js打开url地址
 * @param url
 * @param target  新开窗口，
 */
function windowOpen(aTag, url, target){

	var openLink = $(aTag);
	openLink.attr('href',url);
	openLink.attr('target',target);
	openLink[0].click();

}



function getUrlEncode(val) {
	return encodeURIComponent(val).replace(/%/g,'@');
}

String.prototype.replaceAll = function(s1,s2) {
	return this.replace(new RegExp(s1,"gm"),s2);
}

function getCAFieldOrder(formJQueryNode){

	var result = {},tmpObj,groupName;
	var objName;
	formJQueryNode.find("input,span,select,textarea,tr[ca-need-scan=true]").each(function(){
		var tagName = $(this).get(0).tagName;
		if((tagName=="INPUT" || tagName=="SELECT") && $(this).attr("ca-field-name") && !$(this).attr("ca-group-name")){
			if(!$(this).attr("ca-obj-name")) return;
			objName = $(this).attr("ca-obj-name");
			if(!result[objName]) result[objName] = {};
			if(!$(this).attr("ca-field-name")) return;
			result[objName][$(this).attr("ca-field-name")] = $(this).val();

			if(tagName=="SELECT" && $(this).attr("ca-need-selecthtml")=="true"){
				if(!$(this).attr("ca-html-value")) return;
				result[objName][$(this).attr("ca-html-value")] = $(this).find("option:selected").html();
			}
		}else if((tagName=="SPAN" || tagName=="TEXTAREA") && $(this).attr("ca-field-name") && !$(this).attr("ca-group-name")){
			if(!$(this).attr("ca-obj-name")) return;
			objName = $(this).attr("ca-obj-name");
			if(!result[objName]) result[objName] = {};
			if(!$(this).attr("ca-field-name")) return;
			result[objName][$(this).attr("ca-field-name")] = $(this).html();
		}else if(tagName=="TR"){
			tmpObj = {};
			$(this).find("input,span,select,textarea").each(function () {
				var tmpTagName = $(this).get(0).tagName;
				if ((tmpTagName == "INPUT" || tmpTagName == "SELECT") && $(this).attr("ca-field-name")) {

					if($(this).val()) {
						tmpObj[$(this).attr("ca-field-name")] = $(this).val();
					}else{
						if($(this).siblings(".inputFileProxy").html()){
							tmpObj[$(this).attr("ca-field-name")] = $(this).siblings(".inputFileProxy").html();
						}
					}
					if (tmpTagName == "SELECT" && $(this).attr("ca-need-selecthtml") == "true") {
						tmpObj[$(this).attr("ca-html-value")] = $(this).find("option:selected").html();
					}
				} else if ((tmpTagName == "SPAN" || tmpTagName == "TEXTAREA") && $(this).attr("ca-field-name")) {
					tmpObj[$(this).attr("ca-field-name")] = $(this).html();
				}
			});

			//if (jQuery.isEmptyObject(tmpObj)) return;
			groupName = $(this).attr("ca-group-name");

			if($(this).attr("ca-obj-name")){
				var innerObjName = $(this).attr("ca-obj-name");
				if(!result[innerObjName]){
					result[innerObjName] = {};
				}
				if (!result[innerObjName][groupName]) {
					result[innerObjName][groupName] = new Array();
				}
				result[innerObjName][groupName].push(tmpObj);
			}else{
				if (!result[groupName]) {
					result[groupName] = new Array();
				}
				result[groupName].push(tmpObj);
			}
		}
	});
	for(var i_jfList in result["fjList"]){
		var filename = result["fjList"][i_jfList]["fileName"];
		if(!filename){
			result["fjList"][i_jfList]["fileName"] = "";
		}else{
			filename = filename.substring(filename.lastIndexOf("\\")+1);
			result["fjList"][i_jfList]["fileName"] = filename;
		}


	}
	//console.log(JSON.stringify(result));
	eval("var returnStr = '"+JSON.stringify(result)+"';");  //为兼容IE8，避免其将json中的中文转为Unicode编码，采用eval方法
	return returnStr;
}

/**
 *隐藏带搜索功能的下拉框
 */
function hideSearchSelect(){
	$("div .chosen-container").each(function(){
		$(this).hide();
	});
}

/**
 * 显示带搜索功能的下拉框
 */
function showSearchSelect(){
	$("div .chosen-container").each(function(){
		$(this).show();
	});
}

function decimalInput(obj){
	var v = $(obj).val();
	if(v != ''){
		if(v.indexOf('.') == -1){
			$(obj).val(v+'.00');
		}
	}
}


function setSelectedText(obj,element){
	var sel = $(obj).val();
	var text = $(obj).find('option:selected').text();
	if(sel != ''){
		$("#"+element).val(text);
	}else{
		$("#"+element).val('');
	}
}

function setTrSelectedText(obj,element){
	var id = obj.id;
	var split = id.split('_');
	var sel = $(obj).val();
	var text = $(obj).find('option:selected').text();
	if(sel != ''){
		$("#"+element+split[1]).val(text);
	}else{
		$("#"+element+split[1]).val('');
	}
}