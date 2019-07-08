//(function($){
//	//wingsProgressbar begin
//	$.fn.wingsProgressbar= function(options){
//		// 参数赋值
//		var opt= $.extend({}, $.fn.wingsProgressbar.defaults, options);
//		//opt.color = getRandomColor();
//	    var spinner = new Spinner(opt).spin($(this).get(0));
//	    
//	    
//		this.close = function(){
//			spinner.spin();
//		};
//		
//		return this;
//	};
//	//wingsProgressbar end 
//	
//	//获取随机颜色
//	this.getRandomColor = function(){
//		var colors=["#33cc99","#47b8e0","#ffc952","#ff7473","#5d538a","#4f98e0","#e71f19","#ffff00","#5be7f4","#e174fc"];
//        var i=Math.floor(Math.random()*10);
//        return colors[i];
//        
//	};
//	
//	
//})(window.jQuery);

//======================(2)=========================
	//默认参数值
	var wingsProgressbar_defaults = {
		      lines: 12,            // 花瓣数目
		      length: 7,            // 花瓣长度
		      width: 5,             // 花瓣宽度
		      radius: 10,           // 花瓣距中心半径
		      scale: 1.0,           // Scales overall size of the spinner
		      corners: 1,           // 花瓣圆滑度 (0-1)
		      color: '#4f98e0',        // 花瓣颜色
		      opacity: 1/4,         // Opacity of the lines
		      rotate: 0,            // 花瓣旋转角度
		      direction: 1,        // 花瓣旋转方向 1: 顺时针, -1: 逆时针
		      speed: 1,             // 花瓣旋转速度
		      trail: 100,           // 花瓣旋转时的拖影(百分比)
		      fps: 20,              // Frames per second when using setTimeout()
		      zIndex: 2e9,          // spinner的z轴 (默认是2000000000)
		      className: 'spinner', // spinner css 样式名称
		      top: '50%',            // spinner 相对父容器Top定位 单位 px
		      left: '50%',          // spinner 相对父容器Left定位 单位 px
		      shadow: false,        // 花瓣是否显示阴影
		      hwaccel: false,       //spinner 是否启用硬件加速及高速旋转 
		      position: 'absolute'  // Element positioning        
		};
////进度条model页面
var wingsProgressbar ={
	opt:$.extend({}, wingsProgressbar_defaults, {}),
	setOption:function(options){
		this.opt = $.extend({}, wingsProgressbar_defaults, options);
	},
	show:function(){
		//追加model页面
	   	 $(document.body).append('<div class="modal-backdrop fade in wingsModel " style="background-color:black;" />');
		this.opt.spin = new Spinner(this.opt).spin($(".modal-backdrop.wingsModel").get(0));
	},
	hide:function(){
		if(this.opt.spin){
			//this.opt.barObj.close();
			this.opt.spin.spin();
			$(".modal-backdrop.wingsModel").remove();
		}
	}
}

//======================(2)=========================
	
//======================(3)=========================

//
//	var wingsPageLoading_defaults = {
//		      lines: 12
//		};
//
////进度条model页面（简单版）
//var wingsPageLoading ={
//	opt:$.extend({}, wingsPageLoading_defaults, {}),
//	setOption:function(options){
//		this.opt = $.extend({}, wingsPageLoading_defaults, options);
//	},
//	show:function(){
//		//追加model页面
//		var html = '<div class="modal-backdrop fade in wingsPageLoading " style="background-color:#73848c;" >'
//				+ ' <div class="wingsPageLoadingDiv" ' 
//				+ ' style="color:red;position: absolute;width:400px;height:200px;left:50%;top:50%; margin-left:-200px;margin-top:-100px"> ' 
//				+ ' <img src="/wings/core/img/timg_loading.gif">' 
//				+ '</div> '
//			+ '</div>';
//	   	 $(document.body).append(html);
//	},
//	hide:function(){
//		 $(".modal-backdrop.wingsPageLoading").remove();
//	}
//}
//======================(3)=========================