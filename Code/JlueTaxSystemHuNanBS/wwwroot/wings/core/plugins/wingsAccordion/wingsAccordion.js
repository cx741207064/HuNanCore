
//添加选中的颜色
function wingsAccChooseItem(obj){
//	if(obj){
//		var $obj = $(obj);
//		$obj.addClass('wingsAccChooseItemIn');
//	}
}

(function($){
	//wingsAccordion
	$.fn.wingsAccordion= function(options){
		// 参数赋值
		var opt = $.extend({}, $.fn.wingsAccordion.defaults, options);
		$accordion = $(this);
		
		
	    //按序号展开，flag 为true时，则重复点击不关闭
		$accordion.showAccordion = function(num,flag){
			var tempid = '';
			$.each(opt.cols, function(i, val) {
				if(val.num == num || val.name == num){
					tempid = val.sid;
				}
			});
			var temp = $('#a_'+tempid);
			if(temp){
				var tempDiv =$('#'+tempid);
				if(flag && tempDiv && tempDiv.hasClass('in')){
					
				}else{
					temp.click(); 
				}
			}
  		};
			
		return $accordion;
	};
	
	
	$.fn.wingsAccordion.defaults = {
			cols :[]
		};
	
	
	
})(window.jQuery);

