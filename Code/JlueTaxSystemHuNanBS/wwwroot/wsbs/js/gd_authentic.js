var initMneuOver = 0;

function arrayContainsItem(array,item){
    for(var i=0;i<array.length;i++){
        if(array[i].yyfwDm==item){return true;}
    }
    return false;
}

function initMenu(){

    var nsrztDm = $('#nsrztDm').val();
    var dsnsrztDm = $('#dsnsrztDm').val();
    var menuList=store.get('pc_menuList');
    var userToken = $("#userToken").val();
    var roleId = $("#roleId").val();

    //如果用户没有登录
    if(!userToken){
        //我要查询图片置灰

        $('#banshui').find(".tax-title-after").each(function(){
            var obj = $(this).find(".title-name");
            var imageSrc = obj.find("img").attr("src");
            var imagesName = imageSrc.substring(imageSrc.lastIndexOf('/'), imageSrc.length);
            obj.find("img").attr("src", ctx + "/images/icon_img_hui/" + imagesName);
        });

        $("#banshui").find("a").each(function(i,e) {
            var clazz = $(this).attr("class") || '';
            if(clazz == '' || clazz.indexOf('nologin') == -1){
                //不需要登录的保持链接地址，其它的点击直接跳转到登录页面
                $(this).removeAttr('href');
                $(this).removeClass('c4585eb');
                $(this).removeAttr("onclick");
                $(this).click(function(){
                    window.top.location.href = ctx + "/toLogin.do?moduleId=doTax";
                });
            }else{
                var obj = $(this).parents().filter('.parentsLi').find(".tax-title-after");
                var imageSrc = obj.find("img").attr("src");
                var imagesName = imageSrc.substring(imageSrc.lastIndexOf('/'), imageSrc.length);
                obj.find('img').attr("src", ctx + "/images/icon_img/" + imagesName);
            }
        });

        $("#xinxi").find("a").each(function(i,e){
            $(this).removeAttr('href');
            $(this).css("cursor", "pointer");
            $(this).click(function(){
                window.top.location.href = ctx + "/toLogin.do?moduleId=myInfo";
            });
        });
        $("#chauxn").find("a").each(function(i,e){
            $(this).removeAttr('href');
            $(this).css("cursor", "pointer");
            $(this).click(function(){
                window.top.location.href = ctx + "/toLogin.do?moduleId=doQuery";
            });
        });
        $("#hudong").find("a").each(function(i,e){
            $(this).removeAttr('href');
            $(this).css("cursor", "pointer");
            $(this).click(function(){
                window.top.location.href = ctx + "/toLogin.do?moduleId=connectCenter";
            });
        });


    }else{
        if('06' == nsrztDm || '06' == dsnsrztDm){
            layerAlert("您已为‘清算’状态，可继续办理清税注销税（费）申报及缴纳业务，如需撤销请到主管税务机关办理");
        }
        if(!isEmpty(menuList)){
            $("#banshui").find("a").each(function(i,e) {
                if(menuList=='nobody' || !arrayContainsItem(menuList, $(this).attr("id"))){
                    var clazz = $(this).attr("class") || '';
                    if(clazz.indexOf('nologin') >= 0 && $(this).attr("id") != 'FU097'){
                        //登录状态下不能进项操作功能
                        $(this).removeAttr('href');
                        $(this).removeClass('c4585eb');

                    }else if($(this).attr("id") != '' && $(this).attr("id") != undefined){
                        $(this).removeAttr('href');
                        $(this).removeAttr("onclick");
                        //国税用户没权限
                        $(this).click(function(){
                            if(nsrztDm == '04'){
                                layerMsg("用户状态为停业，不能进行此操作！",7);
                            }else{
                                layerMsg("您暂时没有权限使用该模块。",7);
                            }
                        });
                    }
                }else{
                    for(var i = 0;i < menuList.length; i++) {
                        var clazz = $(this).attr("class") || '';
                        if(clazz.indexOf('nologin') >= 0 && $(this).attr("id") != 'FU097' && $(this).attr("id") != 'FU156' && $(this).attr("id") != 'FU170'){
                            //登录状态下不能进项操作功能
                            $(this).removeAttr('href');
                            $(this).removeClass('c4585eb');

                        }/*else if($(this).attr("id") == 'FU081'){
                            $(this).removeAttr('href');
                            $(this).addClass('c4585eb');
                            $(this).click(function(){
                                $('#tzggModal').modal('show');
                            });
                        }*/else if($(this).attr("id") == 'dzsb2' || $(this).attr("id") == 'dzsb3'){
                            $(this).removeAttr('href');
                            $(this).removeAttr('onclick');
                            $(this).addClass('c4585eb');
                            $(this).click(function(){
                                $('#tzggModal').modal('show');
                            });

                        }else if(menuList[i].yyfwDm==$(this).attr("id")){

                            if(menuList[i].dlbz=="Y"){
                                if($(this).attr("id") == 'ds12' || $(this).attr("id") == 'ds13'
                                    || $(this).attr("id") == 'ds14' || $(this).attr("id") == 'ds15'
                                    || $(this).attr("id") == 'ds16' || $(this).attr("id") == 'ds17'){
                                    $(this).attr("url", menuList[i].url);
                                    $(this).addClass('c4585eb');
                                }else{
                                    $(this).attr("href",ctx+menuList[i].url);
                                    $(this).addClass('c4585eb');
                                }
                            }else{
                                $(this).attr("href",menuList[i].url);
                                $(this).addClass('c4585eb');

                            }
                            $(this).unbind();
                        }
                    }
                }
            });

            //我要查询
            $("#chauxn").find("a").each(function(i,e) {
                if(menuList=='nobody' || !arrayContainsItem(menuList, $(this).attr("id"))){
                    var clazz = $(this).attr("class") || '';
                    if($(this).attr("id") != '' && $(this).attr("id") != undefined){
                        $(this).removeAttr('href');
                        $(this).removeAttr("onclick");
                        var imageSrc = $(this).find("img").attr("src");
                        var imagesName = imageSrc.substring(imageSrc.lastIndexOf('/'), imageSrc.length);
                        $(this).find("img").attr("src", ctx + "/images/icon_img_hui/" + imagesName);
                        //国税用户没权限
                        $(this).click(function(){
                            layerMsg("您暂时没有权限使用该模块。",7);
                        });
                    }
                }else{
                    for(var i = 0;i < menuList.length; i++) {
                        var clazz = $(this).attr("class") || '';
                        if(menuList[i].yyfwDm==$(this).attr("id")){
                            if(menuList[i].dlbz=="Y"){
                                $(this).attr("href",ctx+menuList[i].url);
                            }else{
                                $(this).attr("href",menuList[i].url);
                            }
                            $(this).unbind();
                        }
                    }
                }
            });



        }
    }

    initMneuOver = 1;
}





//未进行实名认证用户
function wsmrzHref(msg){

    doWsmrzHref(msg);
    if(initMneuOver <= 0){
      setTimeout(doWsmrzHref(msg), "2000");
    }
}

function doWsmrzHref(msg){
    var roleId = $("#roleId").val();
    $("#banshui").find("a").each(function(i,e) {
        var clazz = $(this).attr("class") || '';
        var id = $(this).attr("id");
        if(clazz.indexOf('nologin') == -1){
            //点击提示未实名认证
            $(this).removeAttr('href');
            $(this).click(function(){
                layerMsg(msg,7);
            });
        }
    });
}


function dssburl(yyfwdm){

    $('#' + yyfwdm).removeAttr('href');
    $('#' + yyfwdm).addClass('c4585eb');
    $('#' + yyfwdm).click(function(){
        $('#tzggModal').modal('show');
    });

    /*$.blockUI();
    $.ajax({
        type: "GET",
        url: ctx + "/sb/taxApplication/fetchNbList.do?yyfwdm=" + yyfwdm,
        success: function (data) {
            $.unblockUI();
            if(yyfwdm == 'dzsb2'){
                layerAlert("尚未到居民企业所得税年报申报期限，请在申报期内再进行操作。");
            }else{
                layerAlert("尚未到关联业务往来年度报告申报期限，请在申报期内再进行操作。");
            }
            return;
            *//*if(data.result.code == '00'){
                if(data.result.gdsBz == 'GS'){
                    var p = {rsv_idx:"FU081"}
                    get(ctx + "/taxApplication/view_hsqj.do", p);
                }else{

                    if(data.result.urlList.length == 1){
                        var dsurl = data.result.urlList[0];
                        var encodeurl = ctx + "/hnds/todsFunc";
                        var p ={name:dsurl.sbbname,dsurl:(new Base64()).encode(dsurl.url)};
                        get(encodeurl, p);
                    }else{
                        var html = '';
                        for(var i=0; i<data.result.urlList.length; i++){
                            var dsurl = data.result.urlList[i];
                            var encodeurl = ctx + "/hnds/todsFunc?name=" + dsurl.sbbname + "&dsurl=" + (new Base64()).encode(dsurl.url);
                            html = html + '<p><a href="'+ encodeurl +'"  target="_blank">'+ dsurl.sbbname +'</a></p>';
                        }
                        layer.open({
                            type: 1
                            ,title: '居民企业所得税年度申报'
                            ,area: ['700px', '450px']
                            ,shade: 0
                            ,closeBtn: 0
                            ,maxmin: false
                            ,content: html
                            ,btn: ['关闭']
                            ,yes: function(){
                                layer.closeAll();
                            }
                            ,zIndex: layer.zIndex
                            ,success: function(layero){
                                layer.setTop(layero);
                            }
                        });
                    }
                }
            }else{
                if(yyfwdm == 'dzsb2'){
                    layerAlert("尚未到居民企业所得税年报申报期限，请在申报期内再进行操作。");
                }else{
                    layerAlert("尚未到关联业务往来年度报告申报期限，请在申报期内再进行操作。");
                }
            }*//*
        },
        error: function () {
            $.unblockUI();
            if(yyfwdm == 'dzsb2'){
                layerAlert("尚未到居民企业所得税年报申报期限，请在申报期内再进行操作。");
            }else{
                layerAlert("尚未到关联业务往来年度报告申报期限，请在申报期内再进行操作。");
            }
        }
    });*/

}



function get(url, params) {
    var temp = document.createElement("form");
    temp.action = url;
    temp.method = "get";
    temp.target = "_blank";
    temp.style.display = "none";
    for (var x in params) {
        var opt = document.createElement("input");
        opt.name = x;
        opt.value = params[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}

