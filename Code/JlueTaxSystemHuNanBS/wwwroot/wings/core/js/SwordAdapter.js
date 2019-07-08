//扩展jquery ajax 使之支持sword
(function ($) {
	$.getUrlParam = function (url,name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = url.substr(url.indexOf('?')+1).match(reg);
		if (r != null) return unescape(r[2]); return "";
	}
	$.getUrlParams = function (url) {
		var params = {};
		var args = url.substr(url.indexOf('?')+1);
		if (args != null){
			var kvs = args.split('&');
			$(kvs).each(function(i,v){
				var kv = v.split('=');
				params[kv[0]] = kv[1];
			});
			return params;
		} 
		return null;
	}
	$.ajaxSetup({
		url:'ajax.sword?ctrl=',
		//type:'POST',
		//dataType:'json',
		cache:false,
		beforeSend:function(a,b){
			//不是sword请求直接放过，不转||(/^\/?upload.sword/g).test(b.url)
			if(!(/^\/?(.*\.)?sword/g).test(b.url)){
				return true;
			}
			//放过WingsSubmit 的提交请求
			if(b.wingsSubmitAjax == true){
				return true;
			}
			
			var params={},ctrl,tid="",baseUrl = b.url.substr(0,b.url.indexOf('?'));
			if(b.ctrl){ctrl = b.ctrl;}else{ctrl = $.getUrlParam(b.url,'ctrl');}
			if(!ctrl){alert("未指定ctrl！");return false;}
			//处理tid
			if(b.tid){tid = b.tid;}else{tid = $.getUrlParam(b.url,'tid');}
			//处理其他参数
			if(b.type==='POST'||b.type==='post'){
				if(Object.prototype.toString.call(b.data) !== "[object String]"){
					//文件上传不做处理
					return;
				}
				if(b.data){
					$(b.data.split('&')).each(function(i,v){
						var kv = v.split('=');
						params[kv[0]]=kv[1];
					});
				}
				var postData={tid:tid,ctrl:ctrl};
				if(params){
					var datas = new Array();
					for(var k in params){
						if(params[k]!=='ctrl'&&params[k]!=='tid'){
							var pData = {name:k,value:params[k],sword:'attr'};
							datas.push(pData);
						}
					}
					postData.data = datas;
				}
				b.data = 'postData='+JSON.stringify(postData);
				b.url = baseUrl+"?ctrl="+ctrl;
				b.data = 'postData='+JSON.stringify(postData);
			}
		},
		dataFilter:function(data,type){
			//如果url是/ajax开头直接返回数据
			if((/^\/?sword?.*/g).test(this.url) ||!(/^\/?(.*\.)?sword/g).test(this.url)){
				return data;
			}
			
			var jsonObj=$.parseJSON(data);
			if(this.wingsHasException != true && typeof (jsonObj.message) != "undefined"){//打印异常信息
				SwordAdapter.alertErrorMsg(jsonObj.message);
				return null;
			}
			if(this.wingsHasException != true &&jsonObj.debugMes){// 调试信息
				SwordAdapter.alertDebugMsg(jsonObj);
				return null;
			}
			
			if(this.wingsHasException == true 
					&& (jsonObj.message || jsonObj.debugMes)){
				//有sword的错误，并且有处理的方法
				jsonObj.HasException = true;
				return JSON.stringify(jsonObj);
			}
			
			//放过WingsSubmit 的提交请求
			if(this.wingsSubmitAjax == true){
				return data;
			}
			if(jsonObj.page){
				window.location = jsonObj.page;
				return null;
			}
			var jsonresult;
			$(jsonObj.data).each(function(index, obj) {
				if(obj.name==='jsonresult'){
					jsonresult = obj.value;
					return;
				}
				if(obj.name==='wingsTreeJson'){
					jsonresult = obj.value;
					return;
				}
			});
			return jsonresult;
		},
		error : function(jqXHR, textStatus, errorThrown) {
			SwordAdapter.alertMsg(errorThrown.toString());
		}
	});
})(jQuery);


/**
 * @title sword adapter
 * @version 1.0
 * @auther 
 * @descetion sword ajax adapter
 * @other depend jquery
 */
var SwordAdapter = SwordAdapter || {
	alertMsg : function(msg){
		window.BootstrapDialog.show({
			type:BootstrapDialog.TYPE_PRIMARY,
			title: '提示',
			message:msg,
			draggable: true,
			buttons: [{
				icon: 'icon-ok', 
				cssClass: 'btn-sm btn-primary', 
		        autospin: false,
	            label: '确定',
	            action: function(dialog) {
	            	dialog.close();
	            }
	        }]
		});
	},
	alertErrorMsg : function(msg){
		window.BootstrapDialog.show({
			type:BootstrapDialog.TYPE_DANGER,
			title: '错误',
			message:msg,
			draggable: true,
			buttons: [{
				icon: 'icon-ok', 
				cssClass: 'btn-sm btn-primary', 
		        autospin: false,
	            label: '确定',
	            action: function(dialog) {
	            	dialog.close();
	            }
	        }]
		}).getModalDialog().css('padding-top', '80px');
	},
	alertDebugMsg : function(debugObj){
		WingsDialog.alertDebugMsg(debugObj);
	}
};


/**
 * 以下是Swordweb兼容内容
 */

function $w(name){
	return $.wingsWidget(name)
}

function $$(name){
	return $(name);
}

var pc = {
		getWidget:function(name){
			return $.wingsWidget(name);
		},
		getWidgetsByType:function(name){
			return {
				getValues:function(){
					return [];
				}
			};
		}
}

function $H(){
	var obj = {};
	obj.get = function(name){
		return obj[name];
	}
	obj.set = function(name,value){
		obj[name]=value;
	}
	return obj;
}

function SwordSubmit(){
	WingsSubmit.apply(this, arguments);
};

