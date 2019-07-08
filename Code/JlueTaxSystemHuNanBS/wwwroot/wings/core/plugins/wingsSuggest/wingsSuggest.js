(function($){
	//wingsSuggest
	$.fn.wingsSuggest= function(options){
		// 参数赋值
		var opt = $.extend({}, $.fn.wingsSuggest.defaults, options);
		$suggestObj = $(this);
		
		opt.id = "suggest_"+ opt.name + "_" + Math.floor(Math.random()*100);
		//初始化页面
		var htmlTemp = '<div class="input-group" > '
                       +' <input type="text" class="form-control" id="'+opt.id+'"> '
                        +' <div class="input-group-btn"> '
                       +'      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> '
                       +'          <span class="caret"></span> '
                       +'      </button> '
                       +'      <ul class="dropdown-menu dropdown-menu-right" role="menu"> '
                       +'      </ul> '
                       +'  </div> '
                    +' </div>';
		$suggestObj.append(htmlTemp);
		try{
			//字符串转对象
			if(opt.headerTitles){
				opt.headerTitlesObj = eval("("+opt.headerTitles+")"); 
			};
		}catch(e){};
		
		var rowsNameArr = [];
		//处理显示的列
		if(opt.rowName){
			rowsNameArr =  opt.rowName.split(',');
		};
		
		
		var sugOpts = {
//	        indexId: 2,             //data.value 的第几个数据，作为input输入框的内容
//	        indexKey: 1,            //data.value 的第几个数据，作为input输入框的内容
//          idField: "id",			//同上
//          keyField: "name",		//同上
			
//			clearable: true,
			showBtn:opt.showBtn=="true"?true:false,
	        allowNoKeyword: false,  //是否允许无关键字时请求数据。为 false 则无输入时不执行过滤请求
	        multiWord: true,        //以分隔符号分割的多关键字支持
	        separator: ",",         //多关键字支持时的分隔符，默认为空格
	        getDataMethod: "url",   //获取数据的方式，总是从 URL 获取
	        autoDropup: true,       //自动判断菜单向上展开
	        showHeader: opt.showHeader=="true"?true:false,       //显示多个字段的表头
	        effectiveFieldsAlias: opt.headerTitlesObj,
	        wingsType:true,//wings特有
	        wingsCtrl:opt.lctrl,//wings特有
	        onLtidBefore:opt.onLtidBefore,//wings特有
	        wingskeyParamsName:opt.name,//wings特有
	        //url: 'http://suggest.taobao.com/sug?code=utf-8&extra234s=1&q=', /*优先从url ajax 请求 json 帮助数据，注意最后一个参数为关键字请求参数*/
	        url: 'test', /*优先从url ajax 请求 json 帮助数据，注意最后一个参数为关键字请求参数*/
	        jsonp: 'callback',               //如果从 url 获取数据，并且需要跨域，则该参数必须设置
	        // url 获取数据时，对数据的处理，作为 fnGetData 的回调函数
	        fnProcessData: function(json){
	        	var list = [];
	        	//处理回调函数
	        	if(json.data){
	        		$.each(json.data, function(i, val) {
	        			if(val.sword == "SwordGrid"){
	        				list = val.trs;
	        			}
	        		});
	        	}
	            var data = {value: []};
	
	            if(! json || ! json.data || ! list || ! list.length) {
	                return false;
	            }
	
	            for (var i = 0; i < list.length; i++) {
	            	var valueMapObj = list[i].tds;
	            	var tempObj = {};
	            	//根据列名，设置下拉显示内容
	            	for(var j=0;j<rowsNameArr.length;j++){
	            		var rowNameTemp = rowsNameArr[j];
	            		tempObj[rowNameTemp] = valueMapObj[rowNameTemp].value;
	            	}
//	                data.value.push({"Id2": i + 1,"Keyword2": valueMapObj["name"].value,"Count2": valueMapObj["id"].value });
	                data.value.push(tempObj);
	            }
	            return data;
	            
	        }
	    };
		
		//设置其他参数
		//哪个项目作为id
		if(opt.idField){
			sugOpts.idField =  opt.idField;
		};
		//哪个项目作为显示
		if(opt.keyField){
			sugOpts.keyField =  opt.keyField;
		};
		
		
		//执行，生成
		$("#"+opt.id).bsSuggest(sugOpts).on('onDataRequestSuccess', function (e, result) {
	        //console.log('onDataRequestSuccess: ', result);
	    }).on('onSetSelectValue', function (e, keyword, data) {
	        //console.log('onSetSelectValue: ', keyword, data);
	    }).on('onUnsetSelectValue', function () {
	        //console.log("onUnsetSelectValue");
	    });
		
		//设置值
  		$suggestObj.setValue = function(value){
  			$("#"+opt.id).val(value);
  		};
  		//获取值
  		$suggestObj.getValue = function(){
  			return $("#"+opt.id).val();
  		};
  		//设置无效
  		$suggestObj.disable = function(){
  			$i = $("#"+opt.id).bsSuggest("disable");
            if (typeof $i === 'object') {
                $i = $i.data('bsSuggest');
            }
  		};
  		//设置有效
  		$suggestObj.enable = function(){
  			$i = $("#"+opt.id).bsSuggest("enable");
            if (typeof $i === 'object') {
                $i = $i.data('bsSuggest');
            }
  		};
  		//展开选择框
  		$suggestObj.show = function(){
  			$i = $("#"+opt.id).bsSuggest("show");
            if (typeof $i === 'object') {
                $i = $i.data('bsSuggest');
            }
  		};
  		//隐藏选择框
  		$suggestObj.hide = function(){
  			$i = $("#"+opt.id).bsSuggest("hide");
            if (typeof $i === 'object') {
                $i = $i.data('bsSuggest');
            }
  		};
  		
		return $suggestObj;
	};
	
	
	$.fn.wingsSuggest.defaults = {
			showHeader:"false",
			showBtn:"true",
			headerTitles:'',
			headerTitlesObj:{},
			rowName:''
		};
	
	
})(window.jQuery);

