/**
 * Created by JiangZuoWei on 2015-09-07.
 */
var PPage = (function(window) {
	return function(divId, curNum, maxNum, totalCount, funcName, url, condition, tableId, pageCallback, isRemoveAll) {
		function onClickPage(curPageNum) {
			if (funcName == 'queryBacklog') {
				return "onclick=\"" + funcName + "('" + url + "','POST','" + curPageNum + "', true,'" + divId + "');\"";
			} else {
				return "onclick=\"" + funcName + "(" + curPageNum + ", " + totalCount + ", false, '" + url + "', '" + condition + "', '" + tableId + "', '" + divId + "', '" + pageCallback + "', '" + isRemoveAll + "');\"";
			}
		}
		function getAHtml(num) {
			return '<li><a href="javascript:void(0);" ' + onClickPage(num) + '>' + num + '</a></li>';
		};
		var page = typeof divId == "string" ? document.getElementById(divId) : divId,
			sFirst = '',//'<a href="javascript:void(0);" class="first" ' + onClickPage(1) + '></a>',
			sPrev = '',
			sNext = '',
			sLast = '',//'<a href="javascript:void(0);" class="last" ' + onClickPage(maxNum) + '></a>',
			sResult = '',
			sp = '',
			sn = '',
			//sCur = '<span class="check_page">' + curNum + '</span>',
			sCur = '<li class="active"><a href="javascript:void(0);">' + curNum + '</a></li>',
			gd = '<li><a href="javascript:void(0);">...</a></li>',
			prevNum,
			nextNum,
			i;
		if (curNum == 1) {
			sFirst = '';
			sPrev='';
		} else {
			prevNum = curNum - 1;
			sPrev = '<li><a href="javascript:void(0);" aria-label="Previous" ' + onClickPage(prevNum) + '><span aria-hidden="true">&laquo;</span></a></li>';
		}
		if (curNum == maxNum) {
			sNext = '';
			sLast = '';
		} else {
			nextNum = Number(curNum) + Number(1);
			sNext = '<li><a href="javascript:void(0);" aria-label="Next" ' + onClickPage(nextNum) + '><span aria-hidden="true">&raquo;</span></a></li>';
		}
		if (maxNum <= 6) {
			for (i = 1; i < curNum; i++) {
				sp += getAHtml(i);
			}
			for(i = Number(curNum) + Number(1); i <= maxNum; i++) {
				sn += getAHtml(i);
			}
			sResult = sFirst + sPrev + sp + sCur + sn + sNext + sLast;
		} else {
			if (curNum <= 4) {
				for (i = 1; i < curNum; i++) {
					sp += getAHtml(i);
				}
				for (i = Number(curNum) + Number(1); i <= 5; i++) {
					sn += getAHtml(i);
				}
				sNext = getAHtml(maxNum) + sNext;
				gd = '<li><a href="javascript:void(0);" ' + onClickPage(6) + '>...</a></li>';
				sResult = sFirst + sPrev + sp + sCur + sn + gd + sNext + sLast;
			} else {
					sPrev = sPrev + getAHtml(1);
					if (curNum < maxNum - 3) {
						for (i = curNum-2; i < curNum; i++) {
							sp += getAHtml(i);
						}
						for (i = Number(curNum) + Number(1); i <= Number(curNum) + Number(2); i++) {
							sn += getAHtml(i);
						}
						sNext = getAHtml(maxNum) + sNext;
						var gdPre = '<li><a href="javascript:void(0);" ' + onClickPage(curNum - 3) + '>...</a></li>';
						var gdLast = '<li><a href="javascript:void(0);" ' + onClickPage(Number(curNum) + Number(3)) + '>...</a></li>';
						sResult = sFirst + sPrev + gdPre + sp + sCur + sn + gdLast + sNext + sLast;
					} else {
						for (i = maxNum - 4; i < curNum; i++) {
							sp += getAHtml(i);
						}
						for (i = Number(curNum) + Number(1); i <= maxNum; i++) {
							sn += getAHtml(i);
						}
						gd = '<li><a href="javascript:void(0);" ' + onClickPage(maxNum - 5) + '>...</a></li>';
						sResult = sFirst + sPrev + gd + sp + sCur + sn + sNext + sLast;
					}
				}
			}
		page.innerHTML = sResult;
	};
})(window);

function pageJump(page, totalCount, isFlush, url, condition, tableId, pageDivId, createTr, isRemoveAll) {
	$.ajax({
		type: 'POST',
		url: url,
		dataType : 'json',
		data : "page=" + page + '&totalCount=' + totalCount + '&' + condition,
		beforeSend : function() {
			loadPic(tableId, isRemoveAll, true);
		},
		success : function(data) {
			loadPic(tableId, isRemoveAll, false);
			if (data.result.success) {
				$.unblockUI();
				var content = "", isContain = false;
				if (data.list.length == 0 && pageDivId == 'page_qb') {
					setMsgCount(0, 1);
				} 
				$.each(data.list, function(num, obj) {
					isContain = true;
					var jsonStr = JSON.stringify(obj);
					var callback = createTr + '(' + num + ',' + jsonStr + ',' + page + ',' + data.dto.pageSize + ',' + data.dto.count + ')';
					content += eval(callback);
				});
				content = isContain ? content : createDefaultTr('无相关数据！');
				$("#" + tableId).append(content);
				if (isFlush) {
					$("#" + pageDivId).children().remove();
				}
				$($("#" + pageDivId).prev().find("span")[0]).html(data.dto.count);
				$($("#" + pageDivId).prev().find("span")[1]).html(data.dto.pageSize);
				$($("#" + pageDivId).prev().find("span")[2]).html(data.dto.totalPageCount);
				if (data.dto.totalPageCount > 0) {
					PPage(pageDivId, data.dto.page, data.dto.totalPageCount, data.dto.count, "pageJump", url, condition, tableId, createTr, isRemoveAll);
				}
				if (isContain && !isEmpty(pageDivId.split('_')[1])) {
					$('#specialPage_' + pageDivId.split('_')[1]).show();
					//checkAll($('#cheqx'));
				} else {
					$('#specialPage_' + pageDivId.split('_')[1]).hide();
				}
				if(url.indexOf("simpleReport")>-1){
					$('#declaratPassword').modal('hide');
				}
			} else if (isLogout(data.result.code)) {
				//showLogin();
				//layerAlert(data.result.msg);
				//layerAlert('您还未登录或登录超时，请重新登录系统！');
				//setTimeout("location.href= ctx+ '/login.jsp'",2000);
				//setTimeout("logout('/login.jsp')",2000);
				showLogoutMessage();
			} else {
				$.unblockUI();
				//简易申报特别处理，如果非密码错误可以进入业务模块
				if(!isPass(data.result.code)&& data.result.code!='502'){
					$('#declaratPassword').modal('hide');
				}
				layerAlert(data.result.msg);
			}
		},
		error: function(res) {
			var jsonStr = JSON.stringify(res);
			if(jsonStr.indexOf('logoutpage')>-1){	//如果返回的是页面，就是拦截器返回的session超时后跳转到sessioon.jsp的页面，现在ajax下则用js登出
				$.unblockUI();
				showLogoutMessage();
			}else{
				$.unblockUI();
				layerAlert("操作失败,请稍后再试！");
			}
			//layerAlert("操作失败,请稍后再试！");
		}
	});
}

function createDefaultTr(content) {
	return '<tr><td colspan="30" align="center">' + content + '</td></tr>';
}

function loadPic(tableId, isRemoveAll, isAppend) {
	if (isRemoveAll == 'true' || isRemoveAll == true) {
		$("#" + tableId).children().remove();
	} else {
		$("#" + tableId + " tr:not(:first)").remove();
	}
	if (isAppend) {
		var pic = '<img src="' + ctx + '/images/loading/loadList.gif"/>';
		$("#" + tableId).append(createDefaultTr(pic));
	}
}

function createWsTr(num, res, curPage, pageSize) {
	var tr_num = ((curPage - 1) * pageSize + num + 1);
	var tr = '', slrq = isEmpty(res.slrq) ? '' : res.slrq;
	var wszlDm = isEmpty(res.wszlDm) ? '' : res.wszlDm;
	tr += '<tr>';
	tr += '<td>' + tr_num + '</td>';
	tr += '<td>' + res.wsid + '</td>';
	tr += '<td>' + res.wszlMc + '</td>';
	tr += '<td>' + res.sqrq + '</td>';
	tr += '<td>' + res.wsztMc + '</td>';
	tr += '<td>' + slrq + '</td>';
	tr += '<td data-wszlDm="'+wszlDm+'">';
	if (res.wsztDm == 'A' || res.wsztDm == 'C' || res.wsztDm == '3') {
		tr += '<a href="javascript:void(0);" onclick="edit(\'' + res.wsid + '\', \''+ wszlDm +'\')">';
		tr += '<i class="glyphicon glyphicon-wrench" style="color: #090;"></i> 修改</a>&nbsp;&nbsp;';
		tr += '<a href="javascript:void(0);" onclick="del(\'' + res.wsid + '\', \''+ wszlDm +'\')">';
		tr += '<i class="glyphicon glyphicon-trash" style="color: #F00;"></i> 删除</a> &nbsp;&nbsp;';
	}

	if(res.wsztDm == 'B'){
		tr += '<a href="javascript:void(0);" onclick="cancel(\'' + res.wsid + '\')">';
		tr += '<i class="glyphicon glyphicon-wrench" style="color: #090;"></i> 撤销</a>&nbsp;&nbsp;';
	}

	tr += '<a href="javascript:void(0);" onclick="detail(\'' + res.wsid + '\', \''+ yyfwDm +'\', \'' + res.pjbz + '\', \'' + wszlDm + '\')">';
	tr += '<i class="glyphicon glyphicon-file" style="color: #0CF;"></i> 查看</a>';


	if (res.pjbz == 'N' && (res.wsztDm == '1' || res.wsztDm == '2'  || res.wsztDm == '4')) {
		tr += '<a href="javascript:void(0);" onclick="addEvaluate(\'' + res.wsid + '\', \''+ yyfwDm +'\')">';
		tr += '<i class="glyphicon glyphicon-heart" style="color:#F60;"></i> 服务评价</a>';
	}

	tr += '</td>';
	tr += '</tr>';
	return tr;
}
