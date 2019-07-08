(function($) {
	/* 兼容ie8 数据没有 indexOf方法*/
	if (!Array.prototype.indexOf){
		Array.prototype.indexOf = function(elt /*, from*/){
		    var len = this.length >>> 0;
		    var from = Number(arguments[1]) || 0;
		    from = (from < 0)? Math.ceil(from): Math.floor(from);
		    if (from < 0){
		      from += len;
		    }
		    for (; from < len; from++){
				if (from in this && this[from] === elt){
		        	return from;
				}
		    }
		    return -1;
	  	};
	}

		 
	
	$.fn.wingsFrameTab = function(options) {
		
		// 参数赋值
		var opts = $.extend({}, $.fn.wingsFrameTab.defaults, options);
		// 设置数据方法
		var $frameThis = $(this);
		$frameThis.tabs = opts.tabs;
		
		//向右转
		$frameThis.scrollRight = function(){
			$frameThis.moveTabs(false);
		}
		//向左转
		$frameThis.scrollLeft = function(){
			$frameThis.moveTabs(true);
		}
		
		if(opts.hasScroll == "true"){
				$('#'+opts.mainTabId).append('<li class="right frame_tab_li">' 
					+'	<a id="tab-goleft_'+opts.mainTabId+'" class="tab-sm frame_tab_a_left" href="javascript:;">'
					+'	<i class="icon-chevron-left frame_tab_icon_left"></i></a>'
					+'	<a id="tab-goright_'+opts.mainTabId+'" class="tab-sm frame_tab_a_right" href="javascript:;">'
					+'		<i class="icon-chevron-right frame_tab_icon_right"></i></a>'
				    +'</li>')
				
				$('#tab-goleft_'+opts.mainTabId).click(function(){
					$frameThis.scrollLeft();
				});
				$('#tab-goright_'+opts.mainTabId).click(function(){
					$frameThis.scrollRight();
				});
		}
						
		function _findWId(id){
			var w_id;
			jQuery.each(opts.tabItems.container, function(key, val) {  
				if(val == id){
					w_id = key;
				}
			}); 
			return w_id;
		}
		
		//fn 打开tab页 
		$frameThis.newTab = function(id,title,icon,url,isClose){
			var obj = {
				id : id,
				title : title,
				tabContentType : 'iframe',
				src : url,
				isCloseBtn : isClose,
				tabItemWidth : 150,
				icon:icon,
				submit : "",
				isShowMenuItem : [ "false", "true", "true", "true" ],
				tempData : ''
			};
			$frameThis.addTabItem(obj);
		}
		
		/**
		 * 打开新的tab页
		 * @param {Object} objParm
		 * @return {TypeName} 
		 */
		$frameThis.addTabItem = function(objParm){
//			var obj = {
//				id : id,
//				title : node.get('caption'),
//				tabContentType : 'iframe',
//				src : src,
//				isCloseBtn : 'true',
//				tabItemWidth : 150,
//				isShowMenuItem : [ "false", "true", "true", "true" ],
//				tempData : temp
//			};
			var objOpts = $.extend({}, $.fn.wingsFrameTab.defaults_objOpts, objParm);
			var w_id = objOpts.id;
			var title = objOpts.title;
			var icon = objOpts.icon;
			var url = objOpts.src;
			var isClose = objOpts.isCloseBtn;
			var submitObj = objOpts.submit;
			var tabItemWidth = objOpts.tabItemWidth;
			
			if(objOpts.spType == 'inUlHtml'){
				//设置ul 中显示的项目
				$('#'+opts.mainTabId).append(objOpts.inUlHtml);
				return;
			}
			
			//转换内部id
			//如果不存在，则新增一对信息
			var id = opts.tabItems.get(w_id);
			if(!id){
				id = $wings_getRandomUUID();
			}else{
				_findWId(id);
			}
			
			if(opts.currentOpenMenuId === id){
				return;
			}
			
			var icon = '<i class="'+icon+' icon-large"></i> ';
			//查看是否已存在
			var exists = false;
			$(opts.tabs).each(function(i,e){
				if(e===id){
					exists = true;
				}
			});
			if(exists){
				//已存在，则活跃显示
				$('#tab-'+opts.currentOpenMenuId).parent().removeClass('active');
				$('#tab-panel-'+opts.currentOpenMenuId).removeClass('active');
				$('#tab-'+id).parent().addClass('active');
				$('#tab-panel-'+id).addClass('active');
				$frameThis.onTabActive(w_id);
			}else{
				//判断最大数量
				if(opts.maxTabsNum && opts.tabs){
					if(opts.maxTabsNum < opts.tabs.length +1){
						WingsDialog.alert("最多可以同时打开" + opts.maxTabsNum + "个tab页！");
						return;
					}
				}
				
				//添加新的tab及iframe
				$('#tab-'+opts.currentOpenMenuId).parent().removeClass('active');
				$('#tab-panel-'+opts.currentOpenMenuId).removeClass('active');
				//追加id
				opts.tabs.push(id);
				opts.tabItems.put(w_id, id);//保存外部id 和 内部用id 对照关系
				var tabWidth = "";
				if(tabItemWidth){
					tabWidth = "width:"+tabItemWidth+";'";
				}
				//追加tab
				if(isClose==false || isClose !='true'){
					//添加标签
					$('#'+opts.mainTabId).append("<li class='active tabLi' >" +
							"<a id='tab-"+id+"' data-toggle='tab' title='"+title+"' style='"+ tabWidth +"' " +
									" class='wings_frame_a' href='#tab-panel-"+id+"'>" +
							icon+title+"</a></li>");
				}else{
					//添加标签
					$('#'+opts.mainTabId).append("<li class='active tabLi' >" +
							"<a id='tab-"+id+"' data-toggle='tab' title='"+title+"' style='"+ tabWidth +"' " +
									"class='wings_frame_a' href='#tab-panel-"+id+"'>" +
							icon+title+"</a><a  href='javascript:;'>" +
							"<i class='icon-remove' ></i></a></li>");
					//添加关闭tab事件
					$('#tab-'+id).parent().find('a:eq(1)').click(function(){
						$frameThis.closeTab(w_id);
						$frameThis.refreshTabs();
					});
				}
				$('#'+opts.mainTabId).find('#tab-'+id).click(function(){
					$frameThis.onTabActive(w_id);
				});
				
			
				//追加iframe
				var panelDiv = $('<div></div>');
				panelDiv.attr('id','tab-panel-'+id);
				panelDiv.addClass('tab-pane in active');
				var loadDiv = $('<div class="spinner" ng-if="loading">\
						  <span style="position:fixed; left:49%; top:50%; display:none;">数据加载中...</span>\
						</div>');
				panelDiv.append(loadDiv);
				$('#'+opts.mainTabContentId).append(panelDiv);
				
				$('#tab-'+id).click(function(){
					if(opts.currentOpenMenuId == id){
						return;
					}
					opts.currentOpenMenuId = id;
//					$frameThis.refreshTabs();
				});
		//		$.get(url, function(result){
			//		loadDiv.remove();
			//		panelDiv.html(result);
			//	});
				$frameThis.getTabFrame(url,loadDiv,panelDiv,submitObj,objOpts,id);
				opts.displayTabs[opts.displayTabs.length]=id;//追加进显示的清单
			}
			opts.currentOpenMenuId = id;
			$frameThis.refreshTabs();
		}
	
		
		//fn 活跃显示
		$frameThis.onTabActive = function(w_id){
			var id = opts.tabItems.get(w_id);
			if(opts.currentOpenMenuId === id){
				return;
			}
			//激活tab事件,调用子页面的onActive方法
			var tabIframe = $('#tab-panel-'+id).find('iframe')[0].contentWindow;
			if(tabIframe.onActive){
				tabIframe.onActive();
			}
			if(opts.onActived ){
				var activeFunc = wings_getFunc(opts.onActived);
				for (var b = 0; b < activeFunc.length; b++) {
		            var  func = eval(activeFunc[b]);
			       	if (typeof func == "function") {
			       		var iframeObj ;
			       		if($('#tab-panel-'+id)){
			       			iframeObj = $('#tab-panel-'+id).find("iframe")[0]
			       		}
		            	var result = new func(w_id,iframeObj);
			       	}
			    }
			}
		}
		
		var exceptNum = 0;//排除掉的个数（左侧，真实）
		if(opts.holdTabsNum){
			try{
				exceptNum = Number(opts.holdTabsNum);
			}catch(e){
				
			}
		}
			
		//fn 刷新  （包含隐藏和显示 哪些）
		$frameThis.refreshTabs = function(){
			//【按个数算】
			if(opts.showTabsNum){
				var maxNum = opts.showTabsNum ;
				var activeIndex = 0;
				$(opts.tabs).each(function(i,e){
					if(e==opts.currentOpenMenuId){
						activeIndex = i;
					}
				});
				
				if(opts.tabs.length >= maxNum){
					var leftIndex=activeIndex,rightIndex=activeIndex,displayIds=[opts.tabs[activeIndex]];
					for(var i=1; i< opts.tabs.length +1  ;i++){
						if(leftIndex >0){
							leftIndex -= 1;
							if(displayIds.length <maxNum ){
								displayIds.splice(0,0,opts.tabs[leftIndex]);
							}else{
								break;
							}
						}
						
						if(rightIndex < opts.tabs.length-1){
							rightIndex += 1;
							if(displayIds.length< maxNum ){
								displayIds.push(opts.tabs[rightIndex]);
							}else{
								break;
							}
						}
					}
					opts.displayTabs = displayIds;
					
					
				}else{
					var i=opts.tabs.length-1;
					for(;i>=0;i--){
						if(opts.displayTabs.indexOf(opts.tabs[i])<0){
							opts.displayTabs[opts.displayTabs.length]=opts.tabs[i];
							break
						}
					}
				}
				
			}else{
				//【按长度算】
				var maxWidth = $('#'+opts.mainTabId).width() -68; 
				if(opts.showTabsWidth){
					//设置 
					maxWidth = opts.showTabsWidth;
				}
				var activeIndex,sumWidth=0;
				$(opts.tabs).each(function(i,e){
					if(e==opts.currentOpenMenuId){
						activeIndex = i;
					}
					sumWidth += $('#tab-'+e).parent().width();
				});
				//如果总宽度大于当前宽度，隐藏左右部分tab
				if(sumWidth>maxWidth){
					//从index 向两端递增计算宽度到小于最大宽度为止
					var leftIndex=activeIndex,rightIndex=activeIndex,sumWidth2=$('#tab-'+opts.tabs[activeIndex]).parent().width(),displayIds=[opts.tabs[activeIndex]];
					while(true){
						var tmpWidth;
						if(leftIndex>0){
							leftIndex -= 1;
							tmpWidth = $('#tab-'+opts.tabs[leftIndex]).parent().width();
							if((sumWidth2+tmpWidth)<maxWidth){
								sumWidth2 +=tmpWidth;
								displayIds.splice(0,0,opts.tabs[leftIndex]);
							}else{
								break;
							}
						}
						
						if(rightIndex<opts.tabs.length-1){
							rightIndex += 1;
							tmpWidth = $('#tab-'+opts.tabs[rightIndex]).parent().width();
							if((sumWidth2+tmpWidth)<maxWidth){
								sumWidth2 +=tmpWidth;
								displayIds.push(opts.tabs[rightIndex]);
							}else{
								break;
							}
						}
					}
					opts.displayTabs = displayIds;
				}else{
					if(maxWidth-sumWidth>0){
						var i=opts.tabs.length-1;
						for(;i>=0;i--){
							if(opts.displayTabs.indexOf(opts.tabs[i])<0){
								opts.displayTabs[opts.displayTabs.length]=opts.tabs[i];
								break
							}
						}
					}
			//		opts.displayTabs = opts.tabs;
				}
			}
			
			
			//【菜单固定其一】对于新加的菜单，先追加，再替换固定的菜单
			if(opts.holdTabsNum){
				opts.displayTabs.splice(0,opts.holdTabsNum);//删除第N个
				//在追加N个
				for(var i = opts.holdTabsNum -1 ;i >= 0  ;i--){
					opts.displayTabs.splice(0,0,opts.tabs[i]);
				}
			}
			//设置显示
			setTabsShow();
			
		}
		//fn 打开iframe页面
		$frameThis.getTabFrame = function(url,loadDiv,panelDiv,submit,objOpts,id){
			var iframeHeight = '100%';
			var iframeWidth= '100%';
			
			if(opts.topHeight){
				var winH = $(window).height();
				iframeHeight = winH- opts.topHeight+"px";
			}
			
			if(opts.iframeHeight){
				iframeHeight = opts.iframeHeight;
			}
			if(opts.iframeWidth){
				iframeWidth= opts.iframeWidth;
			}
			//自定义长度高度
			if(objOpts.iframeHeight){
				iframeHeight = objOpts.iframeHeight;
			}
			if(objOpts.iframeWidth){
				iframeWidth= objOpts.iframeWidth;
			}
			var inCss ='';
			if(objOpts.inCss){
				inCss= objOpts.inCss;
			}
			
			var temp_frameId ="wingsFrame_" + Math.floor(Math.random()*100);//随机数
			var frameHtml = '<iframe id="lei' + temp_frameId +'" name ="'+temp_frameId+'"' 
					 + 'style="'+inCss+'; width:'+iframeWidth+';height:'+iframeHeight+';' +
					 'frameborder:no; border:0; " ></iframe>';
			var tabFrame = $(frameHtml);
			
			//保存iframe id  lei
			opts.iFrameItems.put(id,'lei' + temp_frameId +'');
			
//			var tabFrame = $('<iframe allowfullscreen ></iframe>');
//			var isIe8 = /msie 8\.0/i.test(window.navigator.userAgent.toLowerCase());
//			var display = isIe8?'block':'none';
//			tabFrame.css({'display':display,
//				'width':opts.iframeWidth,'frameborder':'no','border':'0',
//				'height':opts.iframeHeight,'overflow-x':'x:hidden'//,
//				//'marginheight':'0','marginwidth':'0','scrolling':'no'
//				});
				
			tabFrame.attr('frameborder',"0");
			tabFrame.css('display','block');
			tabFrame.load(function(){
				loadDiv.remove();
			});
			panelDiv.append(tabFrame);
//			
//			//【重要】提交到iframe页面
//			var submitObj = submit;
//			//应对sword的 swordSubmit组件
//			if(submit && submit.$family && submit.$family.name == "SwordSubmit"){
//				//创建新的wingsSubmit组件
//				var wingsSub = new WingsSubmit();
//				wingsSub.setCtrl(submit.options.ctrl);//ctrl
//				var d_temp = submit.dataContainer.toJSON();//转成json再转回来，对象不一样 
//				wingsSub.options.data = $.parseJSON(d_temp);;//data
//				
//				submitObj = wingsSub;
//			}
//			//判断跳转方式 是submit组件，还是url
//			if(!submitObj || submitObj==''){
//				tabFrame.attr('src',url);
//			}else{
//				if(submitObj.options){			
//					//设置为form提交方式
//					submitObj.options.postType = 'form';
//					submitObj.options.target = temp_frameId;
//					submitObj.submit();
//				}
//			}
			
			var submitObj = submit;
			//判断跳转方式 是submit组件，还是url
			if (url) {
				tabFrame.attr('src',url);
            } else {
            	if(submitObj.options){		
					if(submit && submit.$family && submit.$family.name == "SwordSubmit"){
						//swordSubmit组件
		            	var c = submit;
		                var a = temp_frameId;
		                c.isContinue = true;
		                c.initSubmitWidget(c.container);
		                c.doBeforeEvents();
		                c.options.postType = "form_" + a;
		                c.submit();
					}else{
						//wingsSubmit组件
						//设置为form提交方式
						submitObj.options.postType = 'form';
						submitObj.options.target = temp_frameId;
						submitObj.submit();
					}
				}
            }
			
		}
		
		//fn 关闭frameTab
		$frameThis.closeTab = function(w_id){
			var id = opts.tabItems.get(w_id);
			//如果当前是active激活前一个
			if(!w_id){
				id = opts.currentOpenMenuId;
				w_id = _findWId(opts.currentOpenMenuId);
			}
			var isActive = opts.currentOpenMenuId == id;
			//确定上一个是谁
			var preIndex,index=-1;
			$(opts.tabs).each(function(i,e){
				if(e==id){
					index = i;
					preIndex = i-1;
				}
			});
			if(index==-1){
				return;
			}
			//移除一个字段
			opts.tabs.splice(index,1);
			
			//移除当前tab
			$("#tab-"+id).parent().remove();
			$("#tab-panel-"+id).remove();
			opts.tabItems.remove(w_id);
			if(isActive){
				opts.currentOpenMenuId = opts.tabs[preIndex];
				$('#tab-'+opts.tabs[preIndex]).parent().addClass('active');
				$('#tab-panel-'+opts.tabs[preIndex]).addClass('active');
				var per_w_id = _findWId(opts.tabs[preIndex]);
				$frameThis.onTabActive(per_w_id);
			}
			$frameThis.refreshTabs();
		}
		
		
		//设置哪些tabs显示
		function setTabsShow(){
			
			$(opts.tabs).each(function(i,e){
				//先隐藏
				$('#tab-'+e).parent().hide();
				$(opts.displayTabs).each(function(j,el){
					if(e == el){
						//显示
						$('#tab-'+e).parent().show();
					}
				});
			});
		}
		
		//fn 窗口左右移动 true 向左 false 向右
		$frameThis.moveTabs = function(isPre){
			if(opts.displayTabs.length<opts.tabs.length){
				//【菜单固定其二】对于左右滑动，先去掉固定的，然后计算，再加回来
				if(isPre){//前移-最后一个隐藏，取出前一个显示
					//(1)到头了，不移动：显示的第一个与 实际的第一个相同，则说明移动到头了
					if(opts.displayTabs[0 + exceptNum] == opts.tabs[0 + exceptNum ]){
						return;
					}
					//（1）先去掉固定的，去掉N个
					var TempArr;
					if(opts.holdTabsNum){
						TempArr = opts.displayTabs.splice(0,exceptNum);
					}
					//（2）计算
					//隐藏右侧的
					opts.displayTabs.splice(opts.displayTabs.length-1,1);//去掉最后一个
					//从左边显示一个
					$(opts.tabs).each(function(i,e){
						if(e==opts.displayTabs[0]){
							opts.displayTabs.splice(0,0,opts.tabs[i-1]);//左边追加一个
							return false;
						}
					});
					//（3）追加上固定的，追加N个
					if(opts.holdTabsNum){
						if(TempArr && TempArr.constructor == Array){
							for(var i = TempArr.length -1 ; i>=0;i--){
								opts.displayTabs.splice(0,0,TempArr[i]);
							}
						}
					}
					//设置显示
					setTabsShow();
					
				}else{//后移-
					//(1)到头了，不移动：显示的最后一个与 实际的最后一个相同，则说明移动到头了
					if(opts.displayTabs[opts.displayTabs.length-1]==opts.tabs[opts.tabs.length-1]){
						return;
					}
					//（1）先去掉固定的，去掉第一个
					var TempArr;
					if(opts.holdTabsNum){
						TempArr = opts.displayTabs.splice(0,exceptNum);//去掉最后一个
					}
					//（2）计算
					//隐藏左侧的
					opts.displayTabs.splice(0,1);
					//显示右侧的
					$(opts.tabs).each(function(i,e){
						if(e==opts.displayTabs[opts.displayTabs.length-1]){
							opts.displayTabs.push(opts.tabs[i+1]);
							return false;
						}
					});
					//（3）追加上固定的，追加第一个
					if(opts.holdTabsNum){
						if(TempArr && TempArr.constructor == Array){
							for(var i = TempArr.length -1 ; i>=0;i--){
								opts.displayTabs.splice(0,0,TempArr[i]);
							}
						}
					}
					//设置显示
					setTabsShow();
				}
			}
		}
		
		
		//fn 刷新当前的iframe窗口 lei
		$frameThis.refreshCurrentTabItem = function(){
			var id = opts.currentOpenMenuId; //当前id
			var iFrameId = opts.iFrameItems.get(id);
			var iFrameObj = document.getElementById(iFrameId);
			if(iFrameObj){
				iFrameObj.contentWindow.location.reload();
			}
		};
		
		//fn 刷新当前的iframe窗口  by id
		$frameThis.refreshTabItemById = function(w_id){
			var id =  opts.tabItems.get(w_id); //当前id
			var iFrameId = opts.iFrameItems.get(id);
			var iFrameObj = document.getElementById(iFrameId);
			if(iFrameObj){
				iFrameObj.contentWindow.location.reload();
			}
		};
		
		//tab左右移动事件
		$('#tab-goleft').click(function(){
			$frameThis.moveTabs(true);
		});
		$('#tab-goright').click(function(){
			$frameThis.moveTabs(false);
		});
		
		//设置默认选中的tab  
		if(opts.defaultSelectId){
			opts.currentOpenMenuId = opts.defaultSelectId;
			$frameThis.refreshTabs();
		}
		
		//返回frameTab对象
		return $frameThis;
	}
	$.fn.wingsFrameTab.defaults={
		menuId:'mainpage_menu',
		mainTabId : 'main-tabs',
		mainTabContentId : 'main-tabs-content',
		maxTabsNum:15,
		tabs:[],
		displayTabs:[],
		currentOpenMenuId:'',
		menuData:[],
		tabItems : new Map(),
		iFrameItems : new Map(),
		topHeight:140
	}
	$.fn.wingsFrameTab.defaults_objOpts = {
		id : 'id',
		title : 'title',
		tabContentType : 'iframe',
		src : '',
		isCloseBtn : 'true',
		tabItemWidth : 150,
		isShowMenuItem : [ "false", "true", "true", "true" ]
	};
			
	
})(window.jQuery);