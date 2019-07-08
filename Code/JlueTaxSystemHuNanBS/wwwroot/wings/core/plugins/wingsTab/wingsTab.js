(function($){
	//wingsRadio
	$.fn.wingsTab= function(options){
		// 参数赋值
		var opts = $.extend({}, $.fn.wingsTab.defaults, options);
		$tabObj = $(this);
		
		if(!opts.tabTitles&&!opts.tabDivs){
			return null;
		};
		
		opts.divIds = opts.tabDivs.split(',');
		var divTitles = opts.tabTitles.split(',');
		if(opts.divIds.length < opts.tabSelectedIndex){
			opts.tabSelectedIndex = 0;
		}
		
		var titleClassArr = [];
		if(opts.titleClass){
			titleClassArr = opts.titleClass.split(',');
		}
		var title_a_ClassArr = [];
		if(opts.titleAClass){
			title_a_ClassArr = opts.titleAClass.split(',');
		}
		
		//处理参数
		var onSelectfnMap = new Map();
		$tabObj.find("div").each(function(j,el){
	  		if($(el).attr("type") == "wingsTabItem"){
				var el_opts = {
					obj:$(el),
					id:$(el).attr("id"),
				  	onSelect:$(el).attr("onSelect")
				};
				opts.tabs.push(el_opts);
				$(el).addClass('tab-pane');
				if(el_opts.id && el_opts.id == opts.divIds[opts.tabSelectedIndex]){
					$(el).addClass('in active');
				};
				onSelectfnMap.put(el_opts.id,el_opts.onSelect);
  			};
  		});
		var inputClass = '';
		if(opts.inputClass){
			inputClass = opts.inputClass;
		}else{
			inputClass = 'one';//默认样式
		}
		//处理div体
		$tabObj.wrapInner('<div  class="tab-content "></div>');
		
		
		//生成tab头
		opts.the_tab_id = opts.name+"_wingsTab_" + Math.floor(Math.random()*100);//随机数
		var tempHeadHtml = '<ul id="'+opts.the_tab_id+'" class="nav2 nav-tabs '+inputClass+' ">';
		
//		var tempLiId = opts.name+"_wingsTab_a"+  Math.floor(Math.random()*100);
		for(var i = 0;i< opts.divIds.length;i++){
			var zdy_class ="";
			if(titleClassArr[i]){
				zdy_class = titleClassArr[i];//自定义样式
			}
			var zdy_a_class ="";
			if(title_a_ClassArr[i]){
				zdy_a_class = title_a_ClassArr[i];//自定义样式
			}
			if(i == opts.tabSelectedIndex){
				tempHeadHtml += '<li  class="active '+zdy_class+'" id="'+opts.name+'_wingsTab_li_'+opts.divIds[i]+'">';
			}else{
				tempHeadHtml += '<li class="'+zdy_class+'" id="'+opts.name+'_wingsTab_li_'+opts.divIds[i]+'" >';
			};
			tempHeadHtml += '<a id="'+opts.name+'_wingsTab_a_'+opts.divIds[i]+'" mun="'+i+'" ' 
				+ ' class ="'+zdy_a_class+'"  href="#'+ opts.divIds[i]+'" data-toggle="tab">'+divTitles[i]+'</a></li> ';
		}
        tempHeadHtml += '</ul>'; 
		$tabObj.prepend(tempHeadHtml);
		
		//追加onclick时间
		for(var i = 0;i< opts.divIds.length;i++){
			var onSelectfn = onSelectfnMap.get(opts.divIds[i]);
			if(onSelectfn){
				//追加方法
				$("#"+opts.name+'_wingsTab_a_'+opts.divIds[i]).click(function(){
					$tabObj.onSelect($("#" + this.id).attr('mun') );
				});
			}
		}
		
		$tabObj.onSelect = function(num){
			var onSelectfn = onSelectfnMap.get(opts.divIds[num]);
			var tempFn =  wings_getFunc(onSelectfn);
			for (var b = 0; b < tempFn.length; b++) {
	            var  func = eval(tempFn[b]);
		       	if (typeof func == "function") {
	            	var result = new func();
		       	}
		    }
		}
		//设置tab的title
		$tabObj.setTabTitle = function(tabId,tabTitle){
			var tab_a = $("#"+opts.name+'_wingsTab_a_' + tabId);
			if(tab_a){
				tab_a.text(tabTitle);
			}
		}
		//获得tab的title
		$tabObj.getTabTitle = function(tabId){
			var tab_a = $("#"+opts.name+'_wingsTab_a_' + tabId);
			if(tab_a){
				return tab_a.text();
			}
			return "";
		}
		//设置tab是否隐藏 true：显示,false 隐藏
		$tabObj.showTab = function(tabId,flag){
			var tab_li = $("#"+opts.name+'_wingsTab_li_' + tabId);
			if(tab_li){
				if(flag){
					tab_li.show();
				}else{
					tab_li.hide();
				}
			}
		}
		//判断tab是否隐藏 
		$tabObj.isTabShow = function(tabId){
			var tab_li = $("#"+opts.name+'_wingsTab_li_' + tabId);
			if(tab_li){
				return !tab_li.is(':hidden');
			}
		}
		
		//tab的储物间
		$tabObj.infoObj = new Object();
		
		$tabObj.getTabInfo = function(tabId,key){
			var map = $tabObj.infoObj[tabId];
			if(map){
				return map[key];
			}
		}
		$tabObj.setTabInfo = function(tabId,key,value){
			var map = $tabObj.infoObj[tabId];
			if(map){
				map[key] = value;
			}else{
				map = new Object();
				map[key] = value;
				$tabObj.infoObj[tabId] = map;
			}
		}
		//选中某个tab
		$tabObj.setTabActive = function(tabId){
			
			$('#'+opts.the_tab_id).find("li").each(function(j,el){
				$(el).removeClass('active');
				if($(el).attr("id")== opts.name+'_wingsTab_li_'+ tabId){
					$(el).addClass('active');
				}
			});
			
			
			$tabObj.find("div").each(function(j,el){
				$(el).removeClass('in active');
		  		if($(el).attr("type") == "wingsTabItem"){
					if($(el).attr("id") == tabId){
						$(el).addClass('in active');
					};
	  			};
	  		});
		}
		
		
         
		return $tabObj;
	};
	
	
	$.fn.wingsTab.defaults = {
  			tabTitles:'',
  			tabDivs:'',
  			tabs:[],
  			tabSelectedIndex:0
		};
	
	
	
})(window.jQuery);

