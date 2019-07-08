/**
 * 首页左边导航菜单
 * @Author:chenwenzhi
 * @Date:2018-09-26
 */

$(function(){

    $(".icon-ss").click(function(){
        if($(this).html()=="-"){
            $(this).html("+");
            $(this).parent().nextAll().toggle(500);
        }else{
            $(this).html("-");
            $(this).parent().nextAll().toggle(500);
        }
    });

    $('#menuFuncModal').on('click', '.cy-t1-menu span', function(){
        if($(this).html()=="-"){
            $(this).html("+");
            $(this).parent().next().slideUp("cy-n1-menu");
        }else{
            $(".cy-t1-menu span").html("+");
            $(this).html("-");
            $(".cy-n1-menu").slideUp();
            $(this).parent().next().slideDown("cy-n1-menu");
        }
    });


    $('#menuFuncModal').on('click', '.cy-t2-menu span', function(){
        if($(this).html()=="-"){
            $(this).html("+");
            $(this).parent().next().slideUp("cy-n2-menu");
        }else{
            $(this).html("-");
            $(this).parent().next().slideDown("cy-n2-menu");
        }
    });



    var userToken = $('#userToken').val();
    if(!isEmpty(userToken)){
        initUsualMenus();
        initMainLeftNnav();
    }

    if(isEmpty(userToken)){
        $("#mainLeftNavTc").find("a").each(function(){
            var clazz = $(this).attr("class") || '';
            if(clazz.indexOf('nologin') == -1){
                $(this).removeAttr("target");
                $(this).click(function(){
                    window.top.location.href = ctx + "/toLogin.do";
                });
            }
        });

        $("#mainLeftNavTs").find("a:gt(0)").each(function(){
            $(this).removeAttr("target");
            $(this).click(function(){
                window.top.location.href = ctx + "/toLogin.do";
            });
        });
    }
});

function arrayContainsItem(array,item){
    for(var i=0;i<array.length;i++){
        if(array[i].yyfwDm==item){return true;}
    }
    return false;
}

function initUsualMenus(){
    var usualmenus = store.get("cygnList");
    var menuList=store.get('pc_menuList');
    var nsrztDm = $('#nsrztDm').val();
    if(!isEmpty(usualmenus) && usualmenus!='nobody'){
        var html = '';
        for(var i = 0; i< usualmenus.length; i++){
            if(menuList!='nobody' && arrayContainsItem(menuList, usualmenus[i].yyfwDm)){
                var url = ctx + usualmenus[i].url;
                if(usualmenus[i].yyfwDm == 'FU170'){
                    url = "https://fpdk.hunan.chinatax.gov.cn";
                }
                html += '<li><a href="'+ url +'"  target="_blank" title="' + usualmenus[i].yyfwMc + '" class="c4585eb"><i></i><span>' + usualmenus[i].yyfwMc + '</span></a></li>'
            }else{
                var url = ctx + usualmenus[i].url;
                html += '<li><a href="javascript:void(0);" onclick="permitdeny();" title="' + usualmenus[i].yyfwMc + '" target="_blank"><i></i><span>' + usualmenus[i].yyfwMc + '</span></a></li>'
            }
        }
        //$('#usualMenuRegion').find("li:gt(0)").remove();
        $('#usualMenuRegion').html(html);
    }

}

function initMainLeftNnav(){
    var menuList=store.get('pc_menuList');
    $("#mainLeftNavTc").find("a").each(function(){
        var clazz = $(this).attr("class") || '';
        if(clazz.indexOf('nologin') >= 0){
            $(this).removeAttr("href");
            $(this).removeClass("c4585eb");
        }
    });

    $("#mainLeftNavTs").find("a:gt(0)").each(function(){
        $(this).removeAttr("href");
        $(this).removeClass("c4585eb");
    });

    if(!isEmpty(menuList)) {
        for (var i = 0; i < menuList.length; i++) {
            if("ds9" == menuList[i].yyfwDm){
                $("#mainLeftNavTc_ds9").attr("href", ctx+menuList[i].url);
                $("#mainLeftNavTc_ds9").addClass("c4585eb");
            }
            if("FU066" == menuList[i].yyfwDm){
                $("#mainLeftNavTc_FU066").attr("href", ctx+menuList[i].url);
                $("#mainLeftNavTc_FU066").addClass("c4585eb");
            }
            if ("FU171" == menuList[i].yyfwDm) {
                $("#mainLeftNavTc_FU171").attr("href", ctx + menuList[i].url);
                $("#mainLeftNavTc_FU171").addClass("c4585eb");
            }
            if("FU072" == menuList[i].yyfwDm){
                $("#mainLeftNavTs_FU072").attr("href", ctx+menuList[i].url);
                $("#mainLeftNavTs_FU072").addClass("c4585eb");
            }
            if("FU070" == menuList[i].yyfwDm){
                $("#mainLeftNavTs_FU070").attr("href", ctx+menuList[i].url);
                $("#mainLeftNavTs_FU070").addClass("c4585eb");
            }
        }
    }
}





function permitdeny(){
    var nsrztDm = $('#nsrztDm').val();
    if(nsrztDm == '04'){
        layerMsg("用户状态为停业，不能进行此操作！",7);
    }else{
        layerMsg("该功能尚未启用，如需使用请联系所在税务机关授权！",7);
    }
}


//常用功能设置页面
function usualFucSet(){
    var userToken = $('#userToken').val();
    if(!userToken){
        logout("/user/Signin/loginRedirect.do");
    }
    $.blockUI();
    $.ajax({
        url:  ctx +'/menu/getResourceList',
        type:'get',
        dataType: 'json',
        success:function(data){
            $.unblockUI();
            var node = {};
            var nodes = data.result.allqxlist;
            var newNodes = [];
            var i, l,
                key = "yyfwflDm",
                parentKey = "sjyyfwflDm",
                childKey = "childNodes";

            var r = [];
            var tmpMap = {};

            for(i = 0; i < nodes.length; i++){
                tmpMap[nodes[i][key]] = nodes[i];
            }

            for (i = 0, l = nodes.length; i < l; i++) {
                if (tmpMap[nodes[i][parentKey]] && nodes[i][key] != nodes[i][parentKey]) {
                    if (!tmpMap[nodes[i][parentKey]][childKey])
                        tmpMap[nodes[i][parentKey]][childKey] = [];
                    tmpMap[nodes[i][parentKey]][childKey].push(nodes[i]);
                } else {
                    r.push(nodes[i]);
                }
            }
            var htmlStr = '';
            var checked = '';
            var idKey = '';
			for(i = 0; i<r.length; i++){
                var firstNode = r[i];
				if(firstNode.checked) {
                    checked = 'checked';
                }else{
                    checked = '';
                }
                idKey = "first_" + firstNode.yyfwflDm;
				htmlStr += '<li>'+
							'<div class="cy-t1-menu clearfix">' +
								'<div class="checkbox checkbox-info">' +
									'<input id="'+ idKey +'" class="styled" id="first_"' + firstNode.yyfwflDm + ' onclick="applymenu(this);" type="checkbox" '+ checked +' value="' + firstNode.yyfwflDm + '">' +
									'<label for="checkbox8">' + firstNode.yyfwflmc + '</label>' +
								'</div>' +
								'<span>+</span>' +
							'</div>' +
							'<ul class="cy-n1-menu">';

                if(firstNode['childNodes']){
                    for(var j = 0; j < firstNode['childNodes'].length; j++){

                        var secondNode = firstNode['childNodes'][j];
                        if(secondNode.checked) {
                            checked = 'checked';
                        }else{
                            checked = '';
                        }
                        parentKey = "first_" + firstNode.yyfwflDm;
                        idKey = "second_" + secondNode.yyfwflDm;
                        if(secondNode['childNodes']){
                            htmlStr += '<li>' +
									'<div class="cy-t2-menu clearfix">' +
										'<div class="checkbox">' +
											'<input type="checkbox" id="'+ idKey +'" parentKey="'+ parentKey +'" hasThirdNode="1" onclick="applymenu(this);" '+ checked +' value="' + secondNode.yyfwflDm + '">' +
											'<label>' + secondNode.yyfwflmc + '</label>' +
										'</div>' +
										'<span>+</span>' +
									'</div>' +
									'<ul class="cy-n2-menu">';
									
                            for(var k = 0; k < secondNode['childNodes'].length; k++){
                                var thirdNode = secondNode['childNodes'][k];
                                if(thirdNode.checked) {
                                    checked = 'checked';
                                }else{
                                    checked = '';
                                }
                                parentKey = "first_" + firstNode.yyfwflDm + "," + "second_" + secondNode.yyfwflDm;
                                idKey = "third_" + thirdNode.yyfwflDm;
								htmlStr += '<li>' +
											'<div class="checkbox">' +
												'<input type="checkbox" id="'+ idKey +'" parentKey="'+ parentKey +'" onclick="applymenu(this);" '+ checked +' value="' + thirdNode.yyfwflDm + '">' +
												'<label>' + thirdNode.yyfwflmc + '</label>' +
											'</div>' +
										   '</li>';
                            }
							htmlStr += '</ul>';
							
                        }else{
							htmlStr += '<li>' +
                                        '<div class="cy-t2-menu clearfix">' +
											'<div class="checkbox">' +
												'<input type="checkbox" id="'+ idKey +'" parentKey="'+ parentKey +'" hasThirdNode="0" onclick="applymenu(this);"'+ checked +' value="'+ secondNode.yyfwflDm +'">' +
												'<label>' + secondNode.yyfwflmc + '</label>' +
											'</div>' +
                                        '</div>';
                        }
                        htmlStr += '</li>';
                    }
                }
                htmlStr += '</ul>';
                htmlStr += '</li>';
			}

            $('#menuFuncContent').html(htmlStr);
            $('#menuFuncModal').modal('show');
        }
    });

}

function applymenu(obj){

    var parentKey = $(obj).attr('parentKey');
    var key = $(obj).attr("id");
    if(key.startWith("third")){
        var thisChecked = $(obj).prop("checked");
        var keys = parentKey.split(',');
        if(thisChecked){
            $('#'+keys[0]).prop("checked", true);
            $('#'+keys[1]).prop("checked", true);
        }else{
            var flag = false;
            $(obj).parent().parent().siblings().each(function(){
                if($(this).find("input[type='checkbox']").prop("checked")){
                   flag = true;
                }
            });
            if(!flag){
                $('#'+keys[1]).prop("checked", false);
            }
            flag = false;
            $('#'+keys[0]).parent().parent().parent().find("input[type='checkbox']").each(function(){
                if($(this).attr("id")!= keys[0] && $(this).prop("checked")){
                    flag = true;
                }
            });
            if(!flag){
                $('#'+keys[0]).prop("checked", false);
            }
        }

    }else if(key.startWith("second")){
        var thisChecked = $(obj).prop("checked");
        var keys = parentKey.split(',');
        var hasThirdNode = $(obj).attr('hasThirdNode');
        if(hasThirdNode == '1'){
            if(thisChecked){
                $('#'+keys[0]).prop("checked", true);
                $(obj).parent().parent().parent().find("input[type='checkbox']").each(function(){
                    $(this).prop("checked", true);
                })
            }else{
                var flag = false;
                $(obj).parent().parent().parent().siblings().each(function(){
                    if($(this).find("input[type='checkbox']").prop("checked")){
                        flag = true;
                    }
                });
                if(!flag){
                    $('#'+keys[0]).prop("checked", false);
                }
                $(obj).parent().parent().parent().find("input[type='checkbox']").each(function(){
                    $(this).prop("checked", false);
                })
            }
        }else{
            if(thisChecked){
                $('#'+keys[0]).prop("checked", true);
            }else{
                var flag = false;
                $(obj).parent().parent().parent().siblings().each(function(){
                    if($(this).find("input[type='checkbox']").prop("checked")){
                        flag = true;
                    }
                });
                if(!flag){
                    $('#'+keys[0]).prop("checked", false);
                }
            }
        }
    }else{
        var thisChecked = $(obj).prop("checked");
        if(thisChecked){
            $(obj).parent().parent().parent().find("input[type='checkbox']").each(function(){
                $(this).prop("checked", true);
            })
        }else{
            $(obj).parent().parent().parent().find("input[type='checkbox']").each(function(){
                $(this).prop("checked", false);
            })
        }
    }
}

//保存常用功能菜单链接
function addMenuFunc(){

    var count = 0;
    var totalChecked = 0;
    var arr = [];
    $('#menuFuncContent').find("input[type='checkbox']:checked").each(function(){
        arr.push($(this).val());
        count += 1;
        var id = $(this).attr("id");
        if(id.indexOf('third') >= 0){
            totalChecked += 1;
        }else if(id.indexOf('second') >=0 && $(this).attr('hasthirdnode') == '0'){
            totalChecked += 1;
        }
    });
    if($('#usualMenuRegion').find('li').length == 0){
        if(count == 0){
            layerMsg("请勾选相应的功能项");
            return;
        }
    }
    if(totalChecked > 30){
        layerAlert("常用功能最多只能勾选30项！");
        return;
    }
    var usualMenus = arr.join(',');
    $.blockUI();
    $.ajax({
        url:ctx +'/menu/addUsualMenu',
        type:"post",
        data:{usualMenus:usualMenus},
        datatype:"json",
        success:function(data){
            $.unblockUI();
            if(data.result.code == '000'){
                var dataList = data.result.dataList;
                var html = '';
                var menuList=store.get('pc_menuList');
                var nsrztDm = $('#nsrztDm').val();
                var html = '';
                for(var i = 0; i< dataList.length; i++){
                    if(menuList!='nobody' && arrayContainsItem(menuList, dataList[i].yyfwDm)){
                        var url = ctx + dataList[i].url;
                        if(dataList[i].yyfwDm == 'FU170'){
                            url = "https://fpdk.hunan.chinatax.gov.cn";
                        }
                        html += '<li><a href="'+ url +'" class="c4585eb" title="' + dataList[i].yyfwMc + '" target="_blank"><i></i><span>' + dataList[i].yyfwMc + '</span></a></li>'
                    }else{
                        var url = ctx + dataList[i].url;
                        html += '<li><a href="javascript:void(0);" target="_blank" title="' + dataList[i].yyfwMc + '" onclick="permitdeny();"><i></i><span>' + dataList[i].yyfwMc + '</span></a></li>'
                    }
                }
                $('#usualMenuRegion').html(html);
                store.set('cygnList',dataList);
            }else{
                layerMsg(data.result.msg, '2');
            }

            $('#menuFuncModal').modal('hide');

        }
    });
}


function returnMenuFunc(){
    $('#menuFuncContent').show();
    $('#menuFucSearchContent').hide();
    $('#closeMenuFuncBtn').show();
    $('#submitMenuFuncBtn').show();
    $('#returnMenuFuncBtn').hide();
}

function searchCommonMenuClick(obj){

    if(!$('#seachCommonMenuInput').val()){
        layerAlert("请输入搜索内容！");
        return;
    }

    $('#menuFuncContent').hide();
    $('#menuFucSearchContent').show();
    $('#closeMenuFuncBtn').hide();
    $('#submitMenuFuncBtn').hide();
    $('#returnMenuFuncBtn').show();

    var searchTxt = $('#seachCommonMenuInput').val();
    var html = '';
    var totalCount = 0;
    $('#menuFuncContent').find('input[type="checkbox"]').each(function(){
        if(totalCount >= 10){
            return;
        }
        html += "<tr>";
        var id = $(this).attr("id");
        var labelTxt = $(this).parent().find('label').text();
        if(id.indexOf('third') >= 0){
            if(labelTxt.indexOf(searchTxt) >= 0){
                totalCount +=1;
                html += "<td>";
                var tdtxt = '<div class="checkbox">';
                if($(this).prop("checked")){
                    tdtxt += "<input type=\"checkbox\" onclick='seachResutSpanClick(this, \""+ id + "\")' checked=\"checked\">";
                }else{
                    tdtxt += "<input type=\"checkbox\" onclick='seachResutSpanClick(this, \""+ id + "\")'>";
                }
                tdtxt += '<label>'+ labelTxt +'</label>';
                html += tdtxt + '</div>';
            }
        }else if(id.indexOf('second') >=0 && $(this).attr('hasthirdnode') == '0'){
            if(labelTxt.indexOf(searchTxt) >= 0){
                totalCount += 1;
                html += "<td>";
                var tdtxt = '<div class="checkbox">';
                if($(this).prop("checked")){
                    tdtxt += "<input type=\"checkbox\" onclick='seachResutSpanClick(this,\""+ id + "\")' checked=\"checked\">";
                }else{
                    tdtxt += "<input type=\"checkbox\" onclick='seachResutSpanClick(this, \""+ id + "\")'>";
                }
                tdtxt += '<label>'+ labelTxt +'</label>';
                html += tdtxt + '</div>';
            }
        }
        html += "</td>";
        html += "</tr>";
    });

    if(!html){
        html = "<tr><td>未搜索到相关记录！</td></tr>"
    }
    $('#menuFucSearchContent').html(html);

}

function seachResutSpanClick(obj, id){
    if($(obj).prop("checked")){
        $('#' + id).prop("checked", true);
    }else{
        $('#' + id).prop("checked", false);
    }
   applymenu($('#' + id)[0]);
}

//logout，跳转到指定页面
function logout(pageName){
    $.ajax({
        url:  ctx +'/logout.do',
        type:'get',
        dataType: 'json',
        success:function(data){
            store.remove("pc_menuList");
            store.remove("cygnList");
            store.remove("toPopMsgCount");
            store.remove("isCALogin");
            store.remove("zgswskfjDm");
            location.href= ctx+ pageName;
        }
    });
}