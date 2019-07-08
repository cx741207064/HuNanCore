var $swfcacheobject = (function () {
	var isCache = false;
	var servercache = new Hash();
//	var localcache = $H();	 
	function getswfcacheobjct() {
		var  o ;
		if (Browser.Engine.trident || window.hasOwnProperty("ActiveXObject")){
//			o = document.getElementById("_persist_flash");
			if(!!window.ActiveXObject){//ie5-ie10
				o = document.getElementById("_persist_flash");
			}else{//ie11
				o = document.getElementById("ex_persist_flash");
			}
		}else{
			o = document.getElementById("ex_persist_flash");
		}		 
		return o;
	}
	function esc(str) {
		 return 'PS' + str.replace(/_/g, '__').replace(/ /g, '_s');  
	} 
	function initServerCache() {// 加载服务器版本信息
		try{
		   var ec = "false";
		   ec = top.executeCache || window.executeCache;
		}catch(e){
			ec = window.executeCache;
		}
		if (ec!="true") {
			window.executeCache="true";
			var allver = "";
			var allobj = null;
			$swfcacheobject.get("sword_localcache_version", function(ok, obj) {
						if (ok) {
							allobj = JSON.decode(obj);
							allver = allobj["allver"];
						}
					});
			var tag = false;
			var options = {
				url : "ajax.sword?ctrl=CacheCtrl_getAllVersion",
				 async:false,
				method : "post", // 提交方式
				data : {
					"allver" : allver
				}, // 发送的数据
				onSuccess : function(res) {
					var resData = JSON.decode(res).data;
					if(resData){
					resData.each(function(el) {
								if (el.name == 'sword_localcache_version') {
									tag = true;
									var ev = el.value;
									var evs = JSON.decode(ev);
									for (var i in evs) {
										servercache.set(i, evs[i]);
									}
									$swfcacheobject.setnoflush("sword_localcache_version", ev);
								}
							});						
					}
					if (tag == false) {
						for (var i in allobj) {
							servercache.set(i, allobj[i]);
						}
					}
					isCache = true;
				},
				onFailure : function() {
					// alert('获取服务器缓存代码表信息出错！')
				}
			};
			new Request(options).send(options.data)
		}
	}
	if(Browser.Engine.trident) {
	    window.attachEvent("onload", initServerCache);
	} else {
		window.addEvent('domready', initServerCache);
	}
//	initServerCache();
	return {
	 	get : function(key, fn, scope) {
			var val = null;
			var o = getswfcacheobjct();
			if(o && o.so_get){
				val = unescape(o.so_get(key, esc(key)));
			}
			var tname = key.substring(0, key.indexOf('_version'));
			if (fn) {
			  fn.call(scope || o, val != "null" && val != null, val, tname);
			 }
			return val;
		},
	 	setnoflush : function(key, val, fn, scope) {
			var t = document.getElementById("_persist_flash_text");
			var o = getswfcacheobjct();
			if (o && o.setnoflush) {
				return o.setnoflush(key, esc(key), val); // set value
			}
		},
	 	set : function(key, val, fn, scope) {
			var getcd;
			var t = document.getElementById("_persist_flash_text");
			var wrap = document.getElementById("_persist_flash_wrap");
			var o = getswfcacheobjct();
			if (o && o.so_set) {
				var old_val = o.so_set(key, esc(key), val); // set value
				var topframe = top._swordframe;
				if (old_val == "pending") {
					var h = document.body.clientHeight;
					var w = window.screen.width;
					 wrap.style.width=w+"px";
				     wrap.style.height=h+"px";
				     wrap.style.background="#B3B3B3";
				     wrap.style.zIndex="99999";
					if (t){
					t.style.display="";
					}
					o.width = w;
					o.height = "350";
					if(window._swordwincache!="true" && $chk(topframe)){
						top.document.getElementById(topframe).setAttribute(top._frameAttr.attr,top._frameAttr.newvalue);
					}
				} else {
					o.width = "1";
					o.height = "1";
					 wrap.style.width="1px";
				     wrap.style.height="1px";
					if (t){
					t.style.display="none";
					}
					if(window._swordwincache!="true" && $chk(topframe))top.document.getElementById(topframe).setAttribute(top._frameAttr.attr,top._frameAttr.ovalue);
				}
				getcd = o.so_get(key, esc(key));
				if (fn) {
					fn.call(scope || this, true, val, getcd);
				}
			}
		},
	 	 remove : function(key, fn, scope) {
			var o = getswfcacheobjct();
			if (o && o.so_remove) {
				var val = o.so_remove(key, esc(key));
				if (fn) {
					fn.call(scope || this, true, val);
				}
			}
		},
		 uncompress: function(data) {
        	 return data; 
         }
		,
	    getServerCache: function(key){
	    	return  servercache.get(key);
	    }
		,
		setServerCache: function(key,val){
	    	servercache.set(key,val);
	    }
		,
		isCache: function(){
	    	return  isCache;
	    },
	    initServerCache:initServerCache,
	    flushstatus: function(status,key,val){
	    	var o = getswfcacheobjct();
	    	var t = document.getElementById("_persist_flash_text");
	    	var wrap = document.getElementById("_persist_flash_wrap");
			if(status=="SharedObject.Flush.Success"){
				wrap.style.width="1px";
				wrap.style.height="1px";
//				setStyles({"width":1,"height":1});
 		    	o.width = "1";
 		    	o.height = "1";
 		    	if(t)t.style.display='none';
 		    	if(window._swordwincache!="true" && $chk(top._swordframe))top.document.getElementById(top._swordframe).setAttribute(top._frameAttr.attr,top._frameAttr.ovalue);
	 		}else if(status=="SharedObject.Flush.Failed"){ 
	 			var old_val = o.so_set(key, esc(key), val);  // set value
	 		     if(old_val == "pending"){
	 		    	var h=document.body.clientHeight;
	 		    	 var w=window.screen.width;
	 		    	 wrap.style.width=w+"px";
				     wrap.style.height=h+"px";
//	 		    	 wrap.setStyles({"width":w,"height":h});
	 		    	if(t)t.style.display='';
//	 		    	t.setStyle("display","");
	 		    	o.width = w;
	 		    	o.height = "350";
	 		     }else{
	 		    	o.width = "1";
	 		    	o.height = "1";
	 		    	wrap.style.width="1px";
				    wrap.style.height="1px";
//	 		    	wrap.setStyles({"width":1,"height":1});
	 		    	if(t)t.style.display='none';
//	 		    	t.setStyle("display","none");
	 		     }
	 		}
	    }
	}
}());