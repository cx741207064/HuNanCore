/**
 * 作废时变量 
 */
var _tempdel_arrVars = {};

/**
 * 作废初始化方法
 * 默认调用
 */
function tempdel_init(toolbarName, retry){
	if(retry == null || retry == undefined) retry = 5;
	if(retry-- < 0) return;
	var bVisible = true;
	try{
		if(_tempdel_arrVars['jspt_gds_bczfan']=='Y'){
			if(!toolbarName && _tempdel_arrVars['toolBarName']){
				toolbarName = _tempdel_arrVars['toolBarName'];
			}
			$w(toolbarName).setDisplay("tempsave_zf");
		}else{
			if(!toolbarName && _tempdel_arrVars['toolBarName']){
				toolbarName = _tempdel_arrVars['toolBarName'];
			}
			$w(toolbarName).setHide("tempsave_zf");
		}		
	}catch(e){
		setTimeout('tempdel_init("'+toolbarName+'",'+retry+')', 500);
	}
}

function click_open_sbcwgz(){
	try{
		var dsymdz = _tempdel_arrVars['jspt_gds_dsymdz'];
		var jspt_gds_dzqh = _tempdel_arrVars['jspt_gds_dzqh'];
		var jspt_gds_nx12xq = _tempdel_arrVars['jspt_gds_nx12xq'];
		var zcurl = "";
		if(jspt_gds_dzqh=="LNNEW"){
			zcurl = dsymdz+"/sword?ctrl=DZBSXTKJ027HomePagelCtrl_initPageln&gnlj="+encodeURIComponent(dsymdz+"/sword?ctrl=SB058SbzfGSDSCtrl_initView")
		}else if(jspt_gds_dzqh=="JLNEW"){
			zcurl = dsymdz+"/sword?ctrl=DZBSXTKJ027HomePagelCtrl_initPagejl&gnlj="+encodeURIComponent(dsymdz+"/sword?ctrl=SB058SbzfGSDSCtrl_initView")
		}else{
	        if (jspt_gds_nx12xq=="Y"){
	        	zcurl = "/sword?ctrl=LnGdsPortalCtrl_initPageln&gnlj="+encodeURIComponent("/sword?ctrl=SB058SbzfCtrl_initView");
	        }else{
	        	zcurl = dsymdz+"/sword?ctrl=LnGdsPortalCtrl_initPageln&gnlj="+encodeURIComponent(dsymdz+"/sword?ctrl=SB058SbzfCtrl_initView");
	        }
		}
		if(window.top){
		       window.top.location.href=zcurl;
		}else{
		       window.location.href=zcurl;
		}
	}catch (e){
		
	}
}