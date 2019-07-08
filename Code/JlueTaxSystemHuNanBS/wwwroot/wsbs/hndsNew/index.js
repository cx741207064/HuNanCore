

var menuObj = {};//保存所有的
var byhlx = null;
var dllx = null;
var openfunType = "";
var openfunCode = "";
var openfunName = "";
var isInitFunction = false;
/**
 * 页面初始化方法
 */
function initSuccess(resData){
	$("#main-tabs").hide();
	openfunType = resData.getAttr("openfunType");
	openfunUrl = resData.getAttr("openfunUrl");
	openfunName = resData.getAttr("openfunName");
	
	if(openfunType=="01" && openfunUrl=="/sword?ctrl=DZBSXTKJ027HndsHomePagelCtrl_initDsbAndBsxxPage" && !isInitFunction){
		openItem(openfunName,openfunUrl);
		isInitFunction=true;
	}else if(openfunType=="01" && !isInitFunction){
		openItem(openfunName,openfunUrl);
	}


}

/**
 * 初始化菜单
 */

function fn_init_menus(p_treeID,p_menuDivId,gndm){
//	var gndm = "F251000100000000";//
	var submit = new WingsSubmit();// /根据功能代码查询功能菜单
	submit.pushData("gndm", gndm);
	submit.setOptions( {
				async : "true",
				mask : "false",
				ctrl : 'DZBSXTKJ019SearchGnsCtrl_getSystemGnsTree',
				onSuccess : function(res) {
					var treeData = res.getData('systemTree');
					if ($chk(treeData)) {
						
						var treeStr = JSON.stringify(treeData);
						
						if(openfunType=="01" && !isInitFunction && treeStr.indexOf(openfunUrl)>-1){
					    	openItem(openfunName,openfunUrl);
					    	isInitFunction=true;
						}
						//(1)保存格式化的菜单数据，为点击弹出tab窗口做准备
						pojoMenuNodes(p_treeID,treeData.data);

						//(2)生成页面的菜单项目
						buildMene(p_treeID,treeData.data,p_menuDivId);
					} else {
						WingsDialog.alertWrong("没有符合该条件的功能！");
					}
					//去掉loading
					$('#loading_'+p_menuDivId).remove();
//					setAccordionSize();
				},
				onError : function onHandleLoginError() {
					WingsDialog.alert("功能查询出错！");
				}
			});
	//追加loading
	var loadingDiv = $('<div id="loading_'+p_menuDivId+'">'
            	+'<h5 style="line-height:260px; font-size:14px; color:rgb(245,71,47);text-align:center;">加载中，请稍候~~~</h5>'
            	+'</div>')
    $('#'+p_menuDivId).append(loadingDiv);
	submit.submit();
}
/**
 * 将菜单数据，保存到js对象里，以便菜单可以使用
 */
function pojoMenuNodes(treeID,treeDataArr){
	var dataArrObj = {};
	//递归保存所有的节点到 dataArrObj中
	dg_saveNode(dataArrObj,treeDataArr);
	menuObj[treeID] = dataArrObj;
}

//递归保存所有的节点到 dataArrObj中
function dg_saveNode(dataArrObj,nodes){
	if(nodes){
		$.each(nodes,function(i,e){
			dataArrObj[e.code] = e;
			if(e.children){
				dg_saveNode(dataArrObj,e.children);
			}
		});
	}
}


/**
 * 生成菜单列表
 * 目前只支持到一层菜单，以后扩展
 */
function buildMene(treeID,treeDataArr,menuDivId){
	$.each(treeDataArr,function(i,e){
		if(e.children ){
			var re_tr=$('<tr></tr>');
			//一级菜单
			var pnodeDiv =$('<td><span a href="###">'+e.caption+'</span><h5>></h5></td>');
			re_tr.append(pnodeDiv);
			//二级菜单
			var nodeStr = "";
			$.each(e.children,function(j,obj){
				nodeStr += '<a href="#" onclick=\'openTreeNode("'+obj.code+'","'+treeID+'")\' >'+ obj.caption + '</a>'
				//此处暂时注释掉切勿删除
				//if(openfunType=="01" && openfunCode==obj.code){
			    //	openTreeNode(openfunCode,treeID)
			    //}
			});
			var snodeDiv =$('<td class="child"></td>');
			snodeDiv.append(nodeStr);
			re_tr.append(snodeDiv);

			var re_table=$('<table border="0" class="title2"></table>');
			re_table.append(re_tr);
			
			$('#'+menuDivId).append(re_table);
		}
	});
}
/**
 * 生成菜单列表 搜索特别版
 * 目前只支持到一层菜单，以后扩展
 */
function buildMene_forSearch(treeID,treeDataArr,menuDivId){
	var re_tr=$('<tr></tr>');
	//一级菜单
	var pnodeDiv =$('<td><span a href="###">搜索结果</span></td>');
	re_tr.append(pnodeDiv);
	//二级菜单
	var nodeStr = "";
	$.each(treeDataArr,function(j,obj){
		//遍历，只显示叶子节点
		nodeStr += loopNode(treeID,obj);
	});
	var snodeDiv =$('<td class="child"></td>');
	snodeDiv.append(nodeStr);
	re_tr.append(snodeDiv);

	var re_table=$('<table border="0" class="title2" id="search_div_temp" ></table>');
	re_table.append(re_tr);

	$('#loading_'+menuDivId).remove();//去掉loading
	$('#'+menuDivId).append(re_table);
}

function loopNode(treeID,obj){
	var nodeStr = "";
	if(obj.children){
		$.each(obj.children,function(i,obj_son){
			//遍历
			nodeStr += loopNode(treeID,obj_son);
		});
	}else if(obj.leaftype == '1'){
		//只有叶子节点才能显示
		nodeStr += '<a href="#" onclick=\'openTreeNode("'+obj.code+'","'+treeID+'")\' >'+ obj.caption + '</a>'
	}
	return nodeStr;
}

/**
 * 根据点击数节点，在主窗口中创建新的tab。
 */
function openTreeNode(nodeId,treeID) {
	var node;
	var treeObj = menuObj[treeID];
	if(treeObj && treeObj[nodeId]){
		node = treeObj[nodeId];
	}
	if(!node){
		//没有该阶段
		return;
	}
	$wings_formatObjWtoS(node);

	var src = node.get('path');
	var leaftype = node.get('leaftype');
	if (leaftype && leaftype != 1) {
		return;
	}
	if (src == null || src == "") {
		WingsDialog.alert("当前功能的访问地址为空，请检查服务器地址和功能URL访问路径!");
		return;
	}
	if (src.indexOf("?") == -1) {
		src += "?";
	}
	if (src.indexOf("&") > -1) {
		src += "&";
	} else {
		
		if (src.charAt(src.length - 1) != "?") {
			src += "&";
		}
	}
	var randomnumber = Math.floor(Math.random() * 100000);
	src = src + randomnumber + "&sDate=" + new Date().getTime() + "&rUUID="
			$wings_getRandomUUID+ "&sName=" + $wings_getServerName(src);

	
	var pathcuyy = node.get('pathcuyy');
	if (pathcuyy == "1") {
		WingsDialog.alert("当前功能的系统服务器地址为空！");
		return;
	}
	if (pathcuyy == "2") {
		WingsDialog.alert("当前功能的访问地址为空！");
		return;
	}
	var id = node.get('code') +randomnumber;
	var obj = {
		id : node.get('caption'),
		title : node.get('caption'),
		tabContentType : 'iframe',
		src : src,
//		iframeWidth:l_iframeWidth,
		inCss:"margin:10px auto 0 auto;",
		isCloseBtn : 'true',
		tabItemWidth : 150,
		isShowMenuItem : [ "false", "true", "true", "true" ]
	};
	var src2 = obj.src.substr(obj.src.lastIndexOf("/"), obj.src.length);
	obj.src = src2;
	addTabItems(obj);
	//关闭菜单
	m_hide();
}

//新增Tab页
function addTabItems(obj){
	if($chk(obj)){
		obj.isShowMenuItem = ["false","true","true","true"];
//		obj.iframeWidth=l_iframeWidth;
		obj.inCss="margin:10px auto 0 auto;";
		$.wingsWidget('tab1').addTabItem(obj);
		$.wingsWidget('tab1').scrollRight();
	}
}

//新增Tab页
function addTabItem(obj){
	if($chk(obj)){
//		obj.iframeWidth=l_iframeWidth;
		obj.inCss="margin:10px auto 0 auto;";
		obj.isShowMenuItem = ["false","true","true","true"];
		$.wingsWidget('tab1').addTabItem(obj);
		$.wingsWidget('tab1').scrollRight();
	}
}

/**
 * 打开Frametab窗
 * @param titleName
 * @param url
 */
function openItem(titleName,url){
	var obj = {
			id : titleName,
			title : titleName,
			tabContentType : 'iframe',
			src : url,
			isCloseBtn : 'true',
//			iframeWidth:l_iframeWidth,
			inCss:"margin:10px auto 0 auto;",
			tabItemWidth : 120,
			isShowMenuItem : [ "false", "true", "true", "true" ]
	};
	addTabItems(obj);
}


/**
 * 去掉字符串中间空格的方法。(方法只使用一次。)
 */
function changeTrim(vStr) {
	var regExp = new RegExp(" ", "g")
	vStr = vStr.replace(regExp, "");
	return vStr;
}

function bky(seach) {
	var pattern = /^[*]*$/;
	if (seach.match(pattern))
		return false
	else
		return true
}




function m_show() {
	var f=document.getElementById("menu1");
    f.style.display='block';  
}
function m_hide() {
	var f=document.getElementById("menu1");
	f.style.display = "none";
	
}


//=========================================

	//报验户身份信息切换
	function byh(flagbyh){
		var submitBtn = new WingsSubmit();
		submitBtn.pushData("flagbyh",flagbyh);
		submitBtn.setCtrl('DZBSXTKJ001YhmMmDlCtrl_byhsfxxQh');
		WingsDialog.showModalDialog({   
	    		titleName : '报验户身份信息',
	    		width : '1000px',
	    		height :'350px',
	    		params:window,
	    		submit:submitBtn,
	    		isClose : 'true' 
	            });   
	}

	
	//退出 或重新登录
	function exitOnclick(obj){
		var className = obj
		var submitBtn1 = new WingsSubmit();
		submitBtn1.setOptions({
			async : "true",
			mask : "false",
			ctrl : 'WBLoginCtrl_logout',
			onSuccess : function(res) {
				var flag = res.getAttr("flag");
				var path = res.getAttr("path");
				var lnflag = res.getAttr("lnflag");
				if(flag=="0"){
					if(className == "out"){
	        			window.opener = null;
	        			window.open('', '_self');
	        			window.close();
					}else{
						if("01"==path&&lnflag== "N"){						
							path="http://etax.hntax.gov.cn";
						}
						if("01"==path&&lnflag== "Y"){						
							path="http://etax.hntax.gov.cn";
						}
	                	location.replace(path);
					}

				}else{
					WingsDialog.alert("注销失败！");
				}
			},
			onError : function onHandleLoginError() {
				WingsDialog.alert("注销失败！");
			}
		});
		if(className=="CARelist"){
		    submitBtn1.submit();
		}else{
		    WingsDialog.confirm('提示', '确认退出系统吗?', function(result){
			if(result) {
			    submitBtn1.submit();
			}
		    });
		}
	}
	/**
	 * 
	 * @param xtbm 系统编码
	 * @param obj obj对象
	 * @return
	 */
	function openXtgnToIframeTab(xtbm,obj){
			addTabItem(obj);
	}


	//弹出强制修改密码窗口
	function qzxgmm(){
		WingsDialog.showModalDialog({
			title:'修改密码',
			url:'sword?ctrl=XgmmCtrl_entry&type=qztk',
			width:'800px',
			height:'500px',
			closable:false,
			closeByBackdrop:false
			
		});
	}
	

	// 跨系统调用js
	function callserv(serviceCs, BM, lo, x, y) {
		if(BM==undefined){
			WingsDialog.alertWrong("跨系统调用参数输入错误，第一位输入调用参数如果为空输入'',第二位输入关联关系编号！");
			return;
		}
		var sub = new WingsSubmit();
		var host=window.location.host;
		sub.pushData("host", host);
		sub.pushData("bm", BM);
		sub.pushData("loca", lo);
		sub.setOptions( {
			async : "false",
			mask : "false",
			ctrl : 'DZBSXTKJ020KxtdyCtrl_xtdyCstq',
			onSuccess : function(res) {
				var dataArray = res.data;
				if (!$chk(dataArray)) {
					WingsDialog.alertWrong("获取跨系统调用配置出错！");
					return;
				}

				var loca = '';
				var url = null;
				var tcms = '';
				$.each(dataArray,function(index,item){
					if(item.name == "loca"){
						loca = item.value;
					}else if(item.name == "URL"){
						url = item.value;
					}else if(item.name == "tcms"){
						tcms = item.value;
					}
				});
				if(url == null){
					WingsDialog.alertWrong("获取跨系统调用配置出错！");
					return;
				}

				// 还一个业务系统调用编号，需要有个独立配置用例，在此先写死，如xh=‘123’
				var str = "";
				if(loca!="")str=loca.indexOf("&") == 0 ? loca : "&" + loca;
				
				var paramstr="";
				if(serviceCs!=undefined && typeof(serviceCs)=='string'){
					paramstr = serviceCs.replace(/(^\s*)(\s*$)/g, '');	//trim（）
					if(paramstr!="")var paramstr = serviceCs.indexOf("&") == 0 ? serviceCs : "&" + serviceCs;
				} else if (serviceCs != undefined && typeof (serviceCs) == 'object') {
//					if (url.lastIndexOf("?") <= 0) {
//						url = url + str.substring(1);
//					} else {
//						url = url + str;
//					}
//					url = url + "&" + Math.random();
//					openTreeNodedyJson(Math.random(),url,serviceCs);
//					return;
				}
				if (url.lastIndexOf("?") <= 0) {
					url = url + str.substring(1) + paramstr;
				} else {
					url = url + str + paramstr;
				}
				url = url + "&" + Math.random();
				/**
				 *单点登录漫游问题
				 
				if($chk(mycs)){
					url = url + "&fromZone="+mycs;
				}*/
				if (tcms == 0) { // 判断弹出模式0为模态，1为非模态
					if (x == undefined || y == undefined || x == "" || y == "") {
						openXtgnToAlertIframe("","业务系统间调用",768,600,url);
					} else {
					   openXtgnToAlertIframe("","业务系统间调用",x,y,url);
					}
				} else {
					openTreeNodedy(Math.random(), url);
				}
				
				
			}
		});
		sub.submit();
		
	}
	
	//用弹出窗口打开
	function openXtgnToAlertIframe(xtbm,title,width,height,url){
		if(xtbm == undefined || xtbm == null || xtbm == ""){
			window.top.WingsDialog.showModalDialog({   
				title : title,
				url:url,
				width : width,
				height : height,
	    		params:window,
	    		isClose : 'true' 
	            }); 
		}
	}

	// 业务系统间调用，在主窗口中创建新的tab。
	function openTreeNodedy(gndm, url) {
		var title = "业务系统间调用";
		if(url.indexOf("&title=") != -1){
			var title = url.substring(url.indexOf("&title=") + 7);
			if(title.indexOf("&")!=-1){
				title = title.substring(0,title.indexOf("&"));
			}
			title = decodeURI(title);
		}
		var obj = {
				id : gndm,
				title : title,
				tabContentType : 'iframe',
				src : url,
				isCloseBtn : 'true',
				iframeWidth:'1006px',
				inCss:"margin:10px auto 0 auto;",
				tabItemWidth : 120,
				isShowMenuItem : [ "false", "true", "true", "true" ]
		};
		addTabItem(obj);
	}

function openCommontTab4Sbgy(zskpBtn){
	//调用场景：例如房产税申报或者城镇土地申报的异常批量申报是如果parent.$w('tab1').tabItems为空或不是对象时
	var obj = {
				id : "zskp.jsp",
				title : "网上扣款",
				tabContentType : 'iframe',
				submit : zskpBtn,
				isCloseBtn : 'true'
			}	
			addTabItem(obj);
	return;
}


/**
 * 检验是否安装控件
 * @return
 */
function ischeckKj(){
	var NewObj;  
    try {  
        NewObj = new ActiveXObject("Cryp_Ctl.CryptCtl");  
        if (typeof(NewObj) != 'undefined') {  
            NewObj = null;  
            return true; 
            }  
    } catch (e) {  
        NewObj = null;
        return false;
    }  
}
//检查CAKey是否被拔出 
function checkCAKey(){
    if($("#dllx").val()=="CA"){
	if(ischeckKj()==true){
	    var rtn = ReadCert();
	    if (rtn != 0) {
		exitOnclick("CARelist")
		return; 
	    }
	}else{
	    WingsDialog.alertWrong("您的证书控件发生错误，请重新安装后登录")
	    exitOnclick("CARelist")
	}
    }
}
