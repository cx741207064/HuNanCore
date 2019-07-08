function queryBacklog(url, type, page, isFlush, pageDivId) {
    loadPic("backlog_content", true, true);
    $.ajax({
        type: type,
        url: url,
        data: {
            page: page,
            pageSize:5
        },
        success: function (data) {
            var msg = JSON.parse(data);
            var isContain = false;
            $("#backlog_content").empty();
            if(msg && msg.result) {
                if(isLogout(msg.result.code)) {
                    showLogoutMessage();
                    return;
                }else if(msg.result.code == '00001'){
                    //未进行实名认证
                    wsmrzHref("您还未进行法人的实名认证，请您到主管税务机关办税厅进行实名认证！");
                    return;
                }
                var listHtml = template("list_backlog", msg.result);
                $("#backlog_content").append(listHtml);
                //分页处理
                if (msg.result.count > 0) {
                    isContain = true;
                }
                if (isFlush) {
                    $("#" + pageDivId).children().remove();
                }
                /*$($("#" + pageDivId).prev().find("span")[0]).html(msg.result.count);
                 $($("#" + pageDivId).prev().find("span")[1]).html(msg.result.pageSize);
                 $($("#" + pageDivId).prev().find("span")[2]).html(msg.result.totalPageCount);*/
                if (msg.result.totalPageCount > 0) {
                    PPage(pageDivId, msg.result.page, msg.result.totalPageCount, msg.result.count, "queryBacklog", url, null, null, null, null);
                }
                if (isContain && !isEmpty(pageDivId.split('_')[1])) {
                    $('#specialPage_' + pageDivId.split('_')[1]).show();
                    //checkAll($('#cheqx'));
                } else {
                    $('#specialPage_' + pageDivId.split('_')[1]).hide();
                }
                if (url.indexOf("simpleReport") > -1) {
                    $('#declaratPassword').modal('hide');
                }

            } else{
                $("#backlog_content").empty();
                alert("查询失败,请稍后再试！");
            }
            introJs().start();
        },
        error: function(error) {
            $("#backlog_content").empty();
            alert("查询失败,请稍后再试！");
        }
    });
}

function goToPage(ctx,wszlDm){
    $.ajax({
        type: "POST",
        url: ctx+"/ws/taxApplication/do_backlog.do",
        data: {
            wszlDm: wszlDm
        },
        success: function (data) {
            var msg = JSON.parse(data);
            if(msg && msg.url && msg.code=='000'){
                window.open(ctx+msg.url);
            }else if(msg&& msg.code=='-2'){
                layerMsg("当前登陆的办税角色没有操作权限！",7);
            }
        },
        error: function(error) {
            layerAlert("打开处理页面失败,请稍后再试！");
        }
    });
}