(function($){
	$.fn.wingsToolbar=function(options){
		var opt= $.extend({}, $.fn.wingsToolbar.defaults, options);
		var $toolbar = $(this);
		$toolbar.attr({"class":"btn-toolbar btn-group btn-group-xs wingsToolbar"})
		//所有图标增加样式
	 	$toolbar.find("div").each(function(index,el){
	 		    var enabled = $(el).attr("enabled");
	 		    var typeOut=$(el).attr("type");
				$(el).attr({"type":"button","class":"btn btn-primary"});
				var wingsPostion=$(el).attr("position");
				if("right" == wingsPostion){
					$(el).attr("style","float:right");
				}
				var wingsName=$(el).attr("name");
				if(wingsName == "" && wingsName==null){
					wingsName=$.trim(wingsName);
				}
				
				if(typeOut == "" || typeOut==null){
					typeOut=wingsName;
				}
			if(typeOut !=null && typeOut !=""){
				var wingsType=$.trim(typeOut);
				if("add"===wingsType){
					$(el).attr("class","add");
				}else if("close"===wingsType){
					$(el).attr("class","clos");
				}else if("print"===wingsType){
					$(el).attr("class","print");
				}else if("export"===wingsType){
					$(el).attr("class","export");
				}else if("import"===wingsType){
					$(el).attr("class","import");
				}else if("back"===wingsType){
					$(el).attr("class","back");
				}else if("preview"===wingsType){
					$(el).attr("class","preview");
				}else if("inspect"===wingsType){
					$(el).attr("class","inspect");
				}else if("previousPage"===wingsType){
					$(el).attr("class","previousPage");
				}else if("nextPage"===wingsType){
					$(el).attr("class","nextPage");
				}else if("firstPage"===wingsType){
					$(el).attr("class","firstPage");
				}else if("endPage"===wingsType){
					$(el).attr("class","endPage");
				}else if("delete"===wingsType){
					$(el).attr("class","delete");
				}else if("edit"===wingsType){
					$(el).attr("class","edit");
				}else if("find"===wingsType){
					$(el).attr("class","find");
				}else if("save"===wingsType){
					$(el).attr("class","save");
				}else if("refresh"===wingsType){
					$(el).attr("class","refresh");
				}else{
					$(el).attr("class","default");
				}
				var color=$(el).attr("color");
				
				if(color != "" && color!=null){
					$(el).css("background-color",color);
				}
				
				if($(el).attr('onclick')){
					opt.clickFunc[wingsName] = $(el).attr('onclick');
				}
				
				if(enabled=="false"){
					$(el).addClass('unused');
					$(el).removeAttr("onclick").css("cursor","text")
				}
				
				opt.widgetMap[wingsName] = $(el);

	 		}
			
	 	})
	 	
	 	$toolbar.setHide = function(key){
			opt.widgetMap[key].hide();
		};
		var txt='<div style="height:'+opt.wingsHeight+';">';
	 	if($.trim(opt.isFixed)=="false"){
	 		opt.wingsFixed="";
	 		txt='';
	 	}
	 	"position:"+opt.wingsFixed+";z-index:99;"
	 	//$toolbar.attr({"style":"position:"+opt.wingsFixed+";width:"+opt.wingsWidth+";height:"+opt.wingsHeight+";top:"+opt.wingsTop+";background-color:"+opt.backgroundColor+";z-index:99;"});
		$toolbar.after(txt);
	 	
	 	var ctrlKeydown = false;
		
	 	$(document).keyup(function(event){
	 		if(event.keyCode==17){
	 			ctrlKeydown = false;
			}
	 	});
		$(document).keydown(function(event){
			var keyArr1=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q",
			             "r","s","t","u","v","w","x","y","z"];
			if(event.keyCode==17){
				ctrlKeydown = true;
			}
			if(event.keyCode>=65 && event.keyCode<=90){
				var qk="ctrl+"+keyArr1[event.keyCode-65];
				$("[wings='WingsToolBar'] div").each(function(index,domElement){
					var quickKey=$.trim($(this).attr("quickKey")).toLowerCase();
					if(null!=quickKey && ""!=quickKey){
						var qks=new Array();
					    qks=quickKey.split("+");
					    quickKey=$.trim(qks[0])+"+"+$.trim(qks[1]);
					}
					
					if(qk==quickKey && ctrlKeydown){
						$(this).click();
					  }
				  });
			}
		});
		
		
		$toolbar.setDisplay=function(key){
			opt.widgetMap[key].show();
		}

		$toolbar.setDisabled=function(key){
			opt.widgetMap[key].addClass('unused');
			opt.widgetMap[key].removeAttr("onclick").css("cursor","text");
		}
		
		$toolbar.setEnabled=function(key){
			opt.widgetMap[key].css("cursor","pointer");
			opt.widgetMap[key].removeClass('unused');
			if(opt.clickFunc[key]){
				opt.widgetMap[key].attr("onclick",opt.clickFunc[key]);
			}
		}
		
		return $toolbar;
	};
	
	
	
	
	
	      
			

	$.fn.wingsToolbar.defaults = {
		 isFixed:"true",
	    wingsFixed:"fixed",
		wingsWidth:"100%",
		wingsHeight:"40px",
		wingsTop:"0px",
		widgetMap:[],
		clickFunc:[],
		backgroundColor:"#f7f7f7",
		color:null
	};
})(window.jQuery);

