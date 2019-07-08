(function($) {
	$.wingsDialog = function(options) {
		// 参数赋值
		var opts = $.extend({}, $.wingsDialog.defaults, options);
		
		var popWindow = window;
		this.alert = function(){
			var title='提示',msg="";
			var numargs = arguments.length;
			if(numargs>1){
				title = arguments[0],
				msg = arguments[1];
			}else if(numargs==1){
				msg = arguments[0];
			}
			popWindow.BootstrapDialog.show({
				title: title,
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
		};
		this.confirm = function(){
			
		};
		
		return this;
	};
	// 默认设置
	$.wingsDialog.defaults = {
			type: BootstrapDialog.TYPE_PRIMARY,
	        size: BootstrapDialog.SIZE_NORMAL,
	        cssClass: '',
	        title: null,
	        message: null,
	        nl2br: true,
	        closable: true,
	        closeByBackdrop: true,
	        closeByKeyboard: true,
	        spinicon: BootstrapDialog.ICON_SPINNER,
	        autodestroy: true,
	        draggable: false,
	        animate: true,
	        description: '',
	        tabindex: -1
	};
})(window.jQuery);

var WingsDialog = {
	data : null,
	currentModalDialog: null,
	forceTopHTML: '<iframe src="about:blank" width="100%" height="100%" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;left:0px;right:0px;bottom:0px;z-index:-1; filter:alpha(opacity=0);"></iframe>',
	getData: function(key){
		var d = null;
		if(this.data){
			d = this.data[key];
		}
		return d;
	},
	setData:function(data){
		this.data = data;
	},
	getModalDialog:function(){
		return this.currentModalDialog;
	},
	setModalDialog:function(dialog){
		this.currentModalDialog = dialog
	},
	closeModalDialog:function(){
		if(this.currentModalDialog){
			this.currentModalDialog.close();
		}
	},
	setLastHeight:function(height){
		this.lastHeight = height;
	},
	setLastWidth:function(width){
		this.lastWidth = width;
	},
	alert : function(){
		var title='提示',msg="";
		var numargs = arguments.length;
		if(numargs>1){
			title = arguments[0],
			msg = arguments[1];
		}else if(numargs==1){
			msg = arguments[0];
		}
		var options = {};
		if(numargs == 3){
			options = arguments[2];
		}
		if(!options.titleIconClass){
			options.titleIconClass = "icon-info-sign";
		}
		if(!options.okBtnName){
			options.okBtnName = "确定";
		}
		
		var popWindow = window;		
		var dialog = new popWindow.BootstrapDialog({
			title: title,
			message:function(){
				var div = $("<div></div>");
				var picDiv = $("<div></div>").addClass("wings-alert-img");
				var messageDiv = $("<div>" + msg + "</div>").addClass("wings-alert-message");
				div.append(picDiv); 
				div.append(messageDiv); 
				return div;
			},
			draggable: true,
			size:this.SIZE_SMALL,
			onhidden: function(dialog){
				dialog.getModal().prev('.modal-backdrop').find('iframe').remove();
	        	if(options.onhidden){
	        		options.onhidden();
	        	}
	        },
			buttons: [{
				icon: 'icon-ok', 
				cssClass: 'btn-sm btn-primary', 
				autospin: false,
				label: options.okBtnName,
				action: function(dialog) {
					dialog.close();
				}
			}]
		});
		
		var dialogWidth = 400; // firm width
		if(options.width){
			dialogWidth = options.width;
		}
		var windowHeight = $(popWindow).height();
		var windowWidth = $(popWindow).width();
		dialog.onShown(function() {
			var $modalDialog = dialog.getModalDialog();
			dialog.getModal().prev('.modal-backdrop').append(WingsDialog.forceTopHTML);
			var dialogHeight = $modalDialog.height();
			// dialogWidth = $modalDialog.width();
			// When dialog height greater than window height,
			// use default margin top value to set dialog position.
			/*if (windowHeight < dialogHeight) {
				// do nothing
				return;
			}*/
			$modalDialog.css({
				"position" : "absolute",
				"left" : "50%",
				"margin-left" : -(dialogWidth / 2)
			});
		});
		
		dialog.onShow(function() {
			var lines = Math.ceil(msg.length / 25); //25 characters per line
			var paddingTop = (windowHeight - 260 - lines*20) / 2; 
			dialog.getModalDialog().css({
		        'padding-top': paddingTop,
		        'width':dialogWidth
		    });
		});
		
		dialog.open();	
		if(options.titleIconClass){
			var header = dialog.getModalHeader();
			var titleIcon = $("<li></li>");
			titleIcon.addClass(options.titleIconClass).css({"vertical-align":"-10%","font-size":"1.3333333333333333em","padding-right":"8px"});
			header.find(".bootstrap-dialog-title ").prepend(titleIcon);
			
			//header.find(".bootstrap-dialog-close-button").append("<button class='close'>还原</button>").append("<button class='close'>最大化</button>");
		}
	},
	alertWrong : function(){
		var title='提示',msg="";
		var numargs = arguments.length;
		if(numargs>1){
			title = arguments[0],
			msg = arguments[1];
		}else if(numargs==1){
			msg = arguments[0];
		}
		var options = {};
		if(numargs == 3){
			options = arguments[2];
		}
		if(!options.titleIconClass){
			options.titleIconClass = "icon-warning-sign";
		}
		
		this.alert(title, msg, options);
		
	},
	alertRight : function(){
		var title='提示',msg="";
		var numargs = arguments.length;
		if(numargs>1){
			title = arguments[0],
			msg = arguments[1];
		}else if(numargs==1){
			msg = arguments[0];
		}
		var options = {};
		if(numargs == 3){
			options = arguments[2];
		}
		if(!options.titleIconClass){
			options.titleIconClass = "icon-ok-sign";
		}
		this.alert(title, msg, options);
	},
	alertWarn : function(){
		var title='提示',msg="";
		var numargs = arguments.length;
		if(numargs>1){
			title = arguments[0],
			msg = arguments[1];
		}else if(numargs==1){
			msg = arguments[0];
		}
		
		var options = {};
		if(numargs == 3){
			options = arguments[2];
		}
		if(!options.titleIconClass){
			options.titleIconClass = "icon-warning-sign";
		}
		
		var popWindow = window;
		var dialog = new popWindow.BootstrapDialog({
			title: title,
			message:function(){
				var div = $("<div></div>");
				//var picDiv = $("<div><i class='icon-ok-sign icon-4x' style='color: green'></i></div>")//.addClass("wings-alert-img");
				var picDiv = $("<div><img src='/wings/core/img/tsc.png' width='61' height='84' /></div>").addClass("wings-alert-img");
				var messageDiv = $("<div>" + msg + "</div>").addClass("wings-alert-message");
				div.append(picDiv); 
				div.append(messageDiv); 
				return div;
			},
			draggable: true,
			size:this.SIZE_SMALL,
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
		
		var dialogWidth = 400; // firm width
		var windowHeight = $(popWindow).height();
		var windowWidth = $(popWindow).width();
		dialog.onShown(function() {
			var $modalDialog = dialog.getModalDialog();
			var dialogHeight = $modalDialog.height();
			if (windowHeight < dialogHeight) {
				return;
			}
			$modalDialog.css({
				"position" : "absolute",
				"left" : "50%",
				"margin-left" : -(dialogWidth / 2)
			});
		});
		
		dialog.onShow(function() {
			var lines = Math.ceil(msg.length / 25); //25 characters per line
			var paddingTop = (windowHeight - 260 - lines*20) / 2; 
			dialog.getModalDialog().css({
		        'padding-top': paddingTop,
		        'width':dialogWidth
		    });
		});
		dialog.open();	
	},
	confirm: function(){
		var title='提示',msg="",callback;
		var numargs = arguments.length;
		title = arguments[0],
		msg = arguments[1];
		if(numargs>=3){
			callback = arguments[2];
		}
		var options = {};
		if(numargs==4){
			options = arguments[3];
		}
		var popWindow = window;
		var btnObjArr = [];
		btnObjArr.push({ 
			label: options && options.okBtnName ? options.okBtnName : '确定',
                    cssClass: 'btn-sm btn-primary', 
                    action: function(dialog) {
                    	if(callback){
                    		callback(true);
                    	}
                    	dialog.close();
                    }
                });
		//lei 追加单个的按钮的 提示窗口，提供页面阻断操作的提示框
		if(options && options.isNoCancel != 'true'){
			btnObjArr.push({
				label: options && options.cancelBtnName ? options.cancelBtnName : '取消',
	             action: function(dialog) {
	             	if(callback){
	             		callback(false);
	             	}
	             	dialog.close();
	             }
	         });
		}
		
		var dialog = new popWindow.BootstrapDialog({
			title: title,
			message:msg,
            draggable: true, // <-- Default value is false
            size:this.SIZE_SMALL,
            closable: false,
            buttons: btnObjArr,
            onhidden: function(dialog){
            	dialog.getModal().prev('.modal-backdrop').find('iframe').remove();
            }
		});
		
		
		var dialogWidth = 400; // firm width
		var windowHeight = $(popWindow).height();
		var windowWidth = $(popWindow).width();
		dialog.onShown(function() {
			dialog.getModal().prev('.modal-backdrop').append(WingsDialog.forceTopHTML);
			var $modalDialog = dialog.getModalDialog();
			var dialogHeight = $modalDialog.height();
			// dialogWidth = $modalDialog.width();
			// When dialog height greater than window height,
			// use default margin top value to set dialog position.
			if (windowHeight < dialogHeight) {
				// do nothing
				return;
			}
			$modalDialog.css({
				"position" : "absolute",
				"left" : "50%",
				"margin-left" : -(dialogWidth / 2)
			});
		});
		
		dialog.onShow(function() {
			var lines = Math.ceil(msg.length / 25); //25 characters per line
			var paddingTop = (windowHeight - 260 - lines*20) / 2; 
			dialog.getModalDialog().css({
		        'padding-top': paddingTop,
		        'width':dialogWidth
		    });
		});
		dialog.open();
	},
	show: function(options){
		var popWindow = window;		
		var dialog = new popWindow.BootstrapDialog.show(options);
		if(options.width){
			dialog.getModalDialog().css("width",options.width);
			dialog.getModalDialog().find(".modal-content").css("width",options.width);
		}
		if(options.height){
			dialog.getModalDialog().css("height",options.height);
			dialog.getModalDialog().find(".modal-content").css("height",options.height);
		}
	},
	showForm: function(options){
		
	},
	prompt: function(){
		var title=arguments[0],msg=arguments[1],value=arguments[2],okCallback=arguments[3],cancelCallback=arguments[4];
		var popWindow = window;
		popWindow.BootstrapDialog.show({
			//size: BootstrapDialog.SIZE_SMALL,
			title: title,
			message:msg+'<input type="text" class="form-control" value="'+value+'">',
			draggable: true,
			buttons: [{
				icon: 'icon-ok', 
				cssClass: 'btn-xs btn-primary', 
		        autospin: false,
	            label: '确定',
	            action: function(dialog) {
	            	var val = dialog.getModalBody().find('input').val();
	            	var returnV = okCallback(val);
	            	if(returnV!=false){
	            		dialog.close();
	            	}
	            }
	        },{
				icon: 'icon-ban-circle',
				cssClass: 'btn-xs btn-primary', 
		        autospin: false,
	            label: '取消',
	            action: function(dialog) {
	            	if(cancelCallback){
	            		var val = dialog.getModalBody().find('input').val();
	                	var returnV = cancelCallback(val);
	                	if(returnV!=false){
	                		dialog.close();
	                	}
	            	}else{
	            		dialog.close();
	            	}
	            }
	        }]
		});
	},
	/**
	 * 模态对话框
	 * 参数options 实例window.showModalDialog({
	 * 	title:'标题'
	 * 	url:'/sword?ctrl=xxxxxx
	 *  buttons:[{label: '按钮1',action: handler,icon: 'icon-ban-circle',cssClass: 'btn-sm btn-primary'},
	 *  {label: '按钮2',action: handler,icon: 'icon-ban-circle',cssClass: 'btn-sm btn-primary'}]
	 * });
	 * 
	 */
	showModalDialog:function(options){
		options = $.extend({}, WingsDialog.defaultOptions, options);
		if(options.dialog && options.dialog.open){
			if(options.reload){
				options.dialog.getModalBody().find('iframe').prop('contentWindow').location.reload(true);
			}
			options.dialog.open();
			return options.dialog;
		}
		var buttons = [];
		if(options.buttons){
			$(options.buttons).each(function(i,b){
				var btn = {label:'',icon:'',cssClass:'btn-sm btn-primary'};
				btn.label = b.label;
				if(b.id)
					btn.id = b.id;
				if(b.icon)
					btn.icon = b.icon;
				if(b.cssClass)
					btn.cssClass = b.cssClass;
				if(b.action){
					btn.action = function(dialog){
						var doc = dialog.getModalBody();
						if(!options.noiframe){
							doc = $(dialog.getModalBody().find('iframe').prop('contentWindow').document);
						}
						b.action(dialog,doc,this);
					};
				}
				buttons.push(btn);
			});
		}
            
		var popWindow = window;
		
		var winH = $(popWindow).height()-160;

		if(options.height){
			winH = parseInt(options.height);
		}
		
		var data = {};
		if(options.param){
			data = options.param;
		}
		
		var dataStr = JSON.stringify(data);
		dataStr = dataStr.replace(/\"/g, "&quot;");
		if(options.url){
			//options.url += '?wingsBoxParams=' + dataStr;
		}
		$.each(data,function(name,value) {
			//options.url += ('&' + name + '=' + value);
		});
		
		
		var temp_frameId ="wingsDialog_iframe_" + Math.floor(Math.random()*1000);//随机数
		
		var message = function(dialog) {
			var $message = $('<div></div>');
			if(options.noiframe){
				$message.load(options.url);
			}else{
				if(AddBizCode2URL){
					options.url = AddBizCode2URL(options.url);
				}
				$message = $('<iframe frameborder="0" name = "'+temp_frameId+'" ' +
				'style="frameborder:no; border:0; width:100%;height:'+winH+'px" src="'+options.url+'"></iframe>');				
			}
			return $message;
		};

		if(!options.width){
			options.width = "800px"; //default width
		}
		
		/*if(options.cssClass == '' && options.width){
			var style=$("<style>.wings-dialog-width .modal-dialog {width:" + options.width + "}</style>");
			$("head").append(style);  
			options.cssClass = "wings-dialog-width";
    	}*/
		
		
		var windowHeight = $(popWindow).height();
		var windowWidth = $(popWindow).width();
		var dialog = new popWindow.BootstrapDialog.show({
			size:options.size?options.size:BootstrapDialog.SIZE_WIDE,
			title:options.title,
			draggable: true,
	        message:message,
	        buttons:buttons,
	        closable:options.closable,
	        cssClass:options.cssClass,
	        data:data,
	        animate: options.animate,
	        autodestroy:options.reload?false:true,//解决ie8下，焦点问题
	        closeByBackdrop:options.closeByBackdrop,
	        onshow: function(dialog){
	        	if(options.onshow){
	        		var doc = dialog.getModalBody();
	        		options.onshow(dialog,doc);
	        	}
	        },
	        onshown: function(dialog){
	        	dialog.getModal().prev('.modal-backdrop').append(WingsDialog.forceTopHTML);
	        	var maxBtn = $("<div></div>")
	        	var $modalDialog = dialog.getModalDialog();
	        	$modalDialog.css('width', options.width);
	        	var dialogWidth = $modalDialog.width();
				var dialogHeight = $modalDialog.height();
				//暂时去掉高度判断限制对居中设置的影响
				//if (windowHeight < dialogHeight) {
				$modalDialog.css({
					"position" : "absolute",
					"left" : "50%",
					"top" : "50%",
					"margin-left" : -(dialogWidth / 2),
					"margin-top" : -(dialogHeight / 2),
					"margin-bottom" : 0 //else scroll bar 
				});
				//}
				//在打开之后，触发提交事件
				var submitObj = options.submit;
				//判断跳转方式 是submit组件，还是url
				if(!submitObj || submitObj==''){
				}else{
					if(submitObj.options){			
						//设置为form提交方式
						submitObj.options.postType = 'form';
						submitObj.options.target = $(dialog.getModalBody().find('iframe')).attr('name');
						submitObj.submit();
					}
				}
				if(options.onshown){
					var doc = dialog.getModalBody();
					options.onshown(dialog,doc);
				}
	        },
	        onhide: function(dialog){
	        	if(options.onhide){
	        		var doc = dialog.getModalBody();
	        		if(!options.noiframe){
						doc = $(dialog.getModalBody().find('iframe').prop('contentWindow').document);
					}
	        		options.onhide(dialog,doc);
	        	}
	        },
	        onhidden: function(dialog){
	        	dialog.getModal().prev('.modal-backdrop').find('iframe').remove();
	        	if(options.onhidden){
	        		var doc = dialog.getModalBody();
	        		if(!options.noiframe){
						doc = $(dialog.getModalBody().find('iframe').prop('contentWindow').document);
					}
	        		options.onhidden(dialog,doc);
	        	}
	        }
	    });
		
		var dialogWidth = options.width ? options.width : 800;
		dialogWidth = parseInt(dialogWidth);
		dialog.getModalDialog().css({
			"width":dialogWidth,
			"position" : "absolute",
			"left" : "50%",
			//"top" : "50%",
			"margin-left" : -(dialogWidth / 2),
			//"margin-top" : -(dialogHeight / 2),
			"margin-bottom" : 0 //else scroll bar 
		});
		
		dialog.getModalBody().css({
			padding:'5px'
		});
		//dialog.open();
		
		var swordDialog = {
			close:function(){
				dialog.close();
			},
			options:{
				param:options.params
			} 
		};
        //修改后
        window.lei_iframeObjMap[temp_frameId] = swordDialog;
		
		
        
        //最大化start
		var header = dialog.getModalHeader();
		var titleIcon = $("<li></li>");
		titleIcon.addClass("icon-question-sign").addClass("icon-large").css("padding-right","8px");
		header.find(".bootstrap-dialog-title ")//.prepend(titleIcon).prepend();
		//原生close没有干掉这个div
		if($("#dialog-max")){
			$("#dialog-max").remove();
		}
		if(options.showChange){
			var html = "<img class='close img-max' src='/wings/core/img/becomeBig.png' id='dialog-max' onclick='WingsDialog.maxmize()'></img>"
		    var maxBtns = $("<div></div>").addClass("bootstrap-dialog-max-button").append($(html));

			header.find(".bootstrap-dialog-close-button").after(maxBtns);
		}
		//最大化end
		this.setModalDialog(dialog);
	},
    //最大化方法
	maxmize:function(dialog){
		var dialog = this.currentModalDialog;
		var popWindow = window;
		var windowHeight = $(popWindow).height();
		var windowWidth = $(popWindow).width();
		var $modalDialog = dialog.getModalDialog();
		var dialogWidth = $modalDialog.width();
		var dialogHeight = $modalDialog.height();
		var headerHeight = dialog.getModalHeader().height();
		var footerHeight = dialog.getModalFooter().height();
		var bodyHeight = dialog.getModalBody().height();
		

		if(!this.bigFlag){
			this.bigFlag = true
			$("#dialog-max").attr('src',"/wings/core/img/backSmall.png");
			this.setLastHeight(dialogHeight);
			this.setLastWidth(dialogWidth);
			$modalDialog.css({
				"position" : "absolute",
				"left" : "0",
				"top" : "0",
				"margin-left" : 0,
				"margin-top" : 0,
				"width":windowWidth,
				"height":windowHeight,
				"margin-bottom" : 0 //else scroll bar 
			});
			$modalDialog.find("iframe").css("height", windowHeight-footerHeight-headerHeight-60);
		}else{
			this.bigFlag = false
			$("#dialog-max").attr('src',"/wings/core/img/becomeBig.png");
			$modalDialog.css({
				"position" : "absolute",
				"left" : "50%",
				"top" : "50%",
				"width":this.lastWidth,
				"height":this.lastHeight,
				"margin-left" : -(this.lastWidth / 2),
				"margin-top" : -(this.lastHeight / 2),
			});
			$modalDialog.find("iframe").css("height", this.lastHeight);
		}
	},
	recover:function(){
		
	},
	alertDebugMsg : function(debugObj){
		var style=$("<style>.wings-dialog-width .modal-dialog {width:800px}</style>");
		$("head").append(style);  
		var popWindow = window;
		popWindow.BootstrapDialog.show({
			size: this.SIZE_NORMAL,
			type:BootstrapDialog.TYPE_DANGER,
			title: '系统提示',
			message:function(dialog){
				var div = $('<div></div>').addClass("wings-alert-exception").addClass("shut-text");
				var div1 = $('<div></div>').addClass("wings-alert-wrapper");
				var picDiv = $("<div><img src='/wings/core/img/zz.png' width='61' height='61' /></div>").addClass("wings-alert-img");
				div1.append(picDiv);
				
				var msg = $('<table style="table-layout:fixed;width:420px;word-wrap:break-word;"><tr><td><div class="wings-alert-message">' + debugObj.exceptionMes + '</div></td></tr></table>');
				div1.append(msg);
				div.append(div1);
				
				//var newMessage = $('<div></div>').addClass('BRshut').prepend('详细信息') ;
				//var upDownBtn   = $('<span></span>').addClass('shut-down');
				//var ywptBtn = $('<a href="#">运维平台</a>').addClass('txt');
				//var zxbzBtn = $('<a href="#">在线帮助</a>').addClass('txt');
				//newMessage.append(upDownBtn);
				////newMessage.append(ywptBtn);
				////newMessage.append(zxbzBtn);
				//div.append(newMessage);
				
				//var detail = $('<div></div>');
				//detail.css({'display':'none',
				//	'padding-top':'10px',
				//	'overflow-y':'scroll',
				//	'height':'300px'});
				//debugObj.debugMes = debugObj.debugMes.replace(/\n/g,'</br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');
				//detail.html(debugObj.debugMes);
				//newMessage.after(detail);
				
				//$(upDownBtn).click(function(){
				//	if(upDownBtn.css("background-image").indexOf("down.png") > 0){
				//		upDownBtn.css("background-image", "url(../img/up.png)");
				//		detail.show();
				//	}else{
				//		upDownBtn.css("background-image", "url(../img/down.png)");
				//		detail.hide();
				//	}
				//});
				
				return div;
			},
			draggable: true,
			closeByBackdrop: false,
			onshown: function(dialog){
	        	dialog.getModal().prev('.modal-backdrop').append(WingsDialog.forceTopHTML);
	        	var $modalDialog = dialog.getModalDialog();
	        	$modalDialog.css('width', '600px');
	        	var dialogWidth = $modalDialog.width();
				$modalDialog.css({
					"position" : "absolute",
					"left" : "50%",
					"margin-left" : -(dialogWidth / 2),
					"margin-bottom" : 0 //else scroll bar 
				});
	        },
	        onhidden: function(dialog){
	        	dialog.getModal().prev('.modal-backdrop').find('iframe').remove();
	        }
		}).getModalDialog().css('padding-top', '60px');
		
		
	},
	
	currentDialog: null
	,
	SIZE_NORMAL:BootstrapDialog.SIZE_NORMAL,
	SIZE_SMALL:BootstrapDialog.SIZE_SMALL,
	SIZE_WIDE:BootstrapDialog.SIZE_WIDE,
	SIZE_LARGE:BootstrapDialog.SIZE_LARGE,
	configDefaultOptions : function (options) {
        this.defaultOptions = $.extend(true, this.defaultOptions, options);
    },
	defaultOptions : {
	        type: BootstrapDialog.TYPE_PRIMARY,
	        size: BootstrapDialog.SIZE_WIDE,
	        cssClass: '',
	        title: null,
	        message: null,
	        nl2br: true,
	        closable: true,
	        closeByBackdrop: false,
	        closeByKeyboard: true,
	        spinicon: BootstrapDialog.ICON_SPINNER,
	        autodestroy: true,
	        draggable: false,
	        animate: true,
	        description: '',
	        tabindex: -1,
	        reload:true //重新加载时是否刷新
	    }
	
} || BootstrapDialog

