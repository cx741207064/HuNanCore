/**
 * 首页
 * @author ljun51@outlook.com
 * @date   2018-05-19
 */
var unionIndex = (function (document, layer) {


    var setHeadInfo = function (userInfo) {
        if (sessionStorage.getItem('bind')) {
            if (sessionStorage.getItem('bind') == 'hngs') {
                var hngs = JSON.parse(sessionStorage.getItem('hngs'));
                if (hngs && hngs.nsrsbh && hngs.nsrmc) {
                    userInfo.html(hngs.nsrsbh + '<br/>' + hngs.nsrmc);
                    userInfo.css("display", "");
                }
            }
            if (sessionStorage.getItem('bind') == 'hnds') {
                var hnds = JSON.parse(sessionStorage.getItem('hnds'));
                if (hnds && hnds.nsrsbh && hnds.nsrmc) {
                    userInfo.html(hnds.nsrsbh + '<br/>' + hnds.nsrmc);
                    userInfo.css("display", "");
                }
            }
        }
    };

    var logout = function (ctx) {
        $.rest.get({url: ctx + '/logout.do'})
            .done(function () {
                sessionStorage.removeItem('hngs');
                sessionStorage.removeItem('hnds');
                sessionStorage.removeItem('bind');
                sessionStorage.removeItem('sign');
                sessionStorage.removeItem('userToken');
                location.href = ctx + '/toLogin.do';
            });
    };

    var login = function (ctx) {
        location.href = ctx + '/toLogin.do?number=' + new Date().getTime();
    };

    return {
        logout: logout,
        login: login
    };
})(document, layer);


$(function(){

    //我要办税三级菜单显示
    $(".gongzhongfuwu ul li").click(function(){
        $(this).find(".popover").show();
    });

    $(".gongzhongfuwu ul li").mouseleave(function(){
        $(this).find(".popover").hide(200);
    });

    $(".closes").click(function(){
        $(".popover").hide(200);
    });

    var userToken = $('#userToken').val();
    var moduleId = $('#moduleId').val() || "myInfo";

    if(userToken){
        setTimeout('openMsg()', 1000);
    }

    if(moduleId == 'myInfo'){
        $("#dbsx-region").show();
        $("#tzgg-region").hide();
        $('#myInfo').find('a').tab('show');

    }else if(moduleId == 'doTax'){
        $("#dbsx-region").show();
        $("#tzgg-region").hide();
        $('#doTax').find('a').tab('show');

    }else if(moduleId == 'doQuery'){
        $("#dbsx-region").show();
        $("#tzgg-region").hide();
        $('#doQuery').find('a').tab('show');

    }else if(moduleId == 'connectCenter'){
        $("#dbsx-region").show();
        $("#tzgg-region").hide();
        $('#connectCenter').find('a').tab('show');
    }else if(moduleId == 'commonService'){
        $('#commonService').find('a').tab('show');
        $("#dbsx-region").hide();
        $("#tzgg-region").show();
    }

    initMenu();

    if(!isEmpty(userToken)){
        //queryBacklog(ctx + "/ws/taxApplication/list_backlog.do", 'POST');
        queryBacklog(ctx + "/ws/taxApplication/list_backlog.do", 'POST', 1, true, 'page');
        //申报提醒
        //sbtx();
    }


    $("#myInfo").click(function(){
        if(!userToken){
            location.href = ctx + "/toLogin.do?moduleId=myInfo";
            return;
        }
        $("#dbsx-region").show();
        $("#tzgg-region").hide();

    });

    $("#doTax").click(function(){
        $("#dbsx-region").show();
        $("#tzgg-region").hide();
    });

    $("#doQuery").click(function(){
        if(!userToken){
            location.href = ctx + "/toLogin.do?moduleId=doQuery";
            return;
        }
        $("#dbsx-region").show();
        $("#tzgg-region").hide();
    });

    $("#connectCenter").click(function(){
        if(!userToken){
            location.href = ctx + "/toLogin.do?moduleId=connectCenter";
            return;
        }
        $("#dbsx-region").show();
        $("#tzgg-region").hide();
    });
    $("#commonService").click(function(){
        $("#dbsx-region").hide();
        $("#tzgg-region").show();
    });

});


function openMsg() {
    $.ajax({
        type: "POST",
        url: ctx + "/ggcx/taxSelect/list_my_info.do",
        success: function (data) {

            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(isSuccess(data.result.code)){
                if(data.dto.count == 0) {
                    return;
                }
                var html = '<div style="padding:10px 15px;"><a href="' +  ctx + '/ggcx/taxSelect/view_my_info.do?rsv_idx=HDZX01" target="_blank" >您有' + data.dto.count + '条消息提醒,请点击查看</a></div>';
                if(data.wsffCount > 0) {
                    html += '<div style="padding:10px 15px;"><a href="' +  ctx + '/ws/taxApplication/wsff/view_wsff_list.do?rsv_idx=WDXX03" target="_blank" >您有' + data.wsffCount + '条文书信息未接收,请点击查看</a></div>';
                }
                layer.open({
                    type: 1,
                    title:['消息提醒', 'background:#74b1ee; color:#fff'],
                    content: html,
                    shade: false,
                    time: 5000,
                    btn: false,
                    offset: 'rb',
                    area: ['280px', '150px']
                });
            }
        },
        error: function () {
            alert("请求错误");
        }
    });

}
