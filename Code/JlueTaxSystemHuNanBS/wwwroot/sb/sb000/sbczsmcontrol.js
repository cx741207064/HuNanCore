
var _operatDesc_variate = {};

//操作说明按钮隐藏与显示控制；并初始化要显示操作说明内容
function jspt_czsm_butncontrol(btnobj,smcode){
	_operatDesc_variate["operatdescDate"]="N";
	_operatDesc_variate["btnobj"]=btnobj;
	_operatDesc_variate["smcode"]=smcode;
	//调用淇耀接口查看是否配置说明若没配置，隐藏按钮。
	//需要新建一个参数，是否要开启操作说明流程参数。也要查询一下。
	var sub = new SwordSubmit();
	var sub = new SwordSubmit();
	sub.setCtrl("SBGyCtrl_operatDesc");
	sub.pushData("smcode",smcode);
	sub.pushData("operatdescDate","N");
	sub.setFunction("onSuccess", "getZcbzSuccess()");
	sub.submit();
	
}
//处理返回数据,控制按钮显示隐藏。
function getZcbzSuccess(req,res){
	var isShowButn= pc.getResData("isShowButn", res).value;
	var btnobj= _operatDesc_variate["btnobj"];
	var isOperatdescDate = pc.getResData("isOperatdescDate", res).value;
	if((isShowButn=="N" || isOperatdescDate =="N") && btnobj && btnobj!="" ){
		//刘元宏，我们js报错，设置此按钮
		try {
			$w(btnobj).setHide("jspt_operatdesc_button");
		} catch (e) {

		}
	}
	if(isShowButn=="Y" && isOperatdescDate=="Y"){
		_operatDesc_variate["operatdescDate"]=pc.getResData("operatdescDate", res).value;
		$w(btnobj).setDisplay("jspt_operatdesc_button");
	}
}

//展示操作说明弹窗；
function operatDesc(){
	// 调用淇耀接口查询操作说明内容并展示，可能不会再次调用淇耀接口，把之前的查询回来的数据传给也弹窗页面展示出来即可。
	var smcode =  _operatDesc_variate["smcode"];
	var operatdescDate = _operatDesc_variate["operatdescDate"];
	var sub = new SwordSubmit();
	sub.setCtrl("SBGyCtrl_operatDesc");
	sub.pushData("smcode",smcode);
	sub.pushData("operatdescDate",operatdescDate);
	sub.pushData("isWin","Y");
	swordAlertIframe('', {
			titleName : "操作规范",
			width : 800,
			height : 400,
			param : window,
			submit : sub
		});
}
