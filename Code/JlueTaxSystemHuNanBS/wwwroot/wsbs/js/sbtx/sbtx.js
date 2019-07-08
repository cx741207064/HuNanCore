function sbtx() {
    $.ajax({
        type: 'get',
        url: ctx+'/sb/sbtx/notice.do',
        dataType : 'json',
        data : 'json',
        success: function(res){
            if(res.result.code == '000' && res.result.wsbsz){
                store.set("sbtx_data",res);
            }
            //console.log(res);
            //if(res.result.wsbsz){
            //    alert(res.result.wsbtx);
            //}
        }
    });
}

//首页点击搜索
function searchMenuClick(obj) {
    var param = jQuery.trim($(obj).prev().val());
    if(searchMenu(param)){
        window.open(ctx+'/sb/menusearch/view.do');
    }
}

//首页回车搜索
function searchMenuByEnter(obj) {
    var param = jQuery.trim($(obj).val());
    if(searchMenu(param)){
        window.open(ctx+'/sb/menusearch/view.do');
    }
}


//当页点搜索键搜索
function searchMenuClickPrisent(obj) {
    var param = jQuery.trim($(obj).prev().val());
    if(searchMenu(param)){
        refreshResult();
    }
}
//当页回车搜索
function searchMenuByEnterPrisent(obj) {
    var param = jQuery.trim($(obj).val());
    if(searchMenu(param)){
        refreshResult();
    }
}


function searchMenu(param) {
    if(!param || param == ''){
        layerAlert("请输入要搜索的内容！");
        return false;
    }
    var menuList = (store.get("pc_menuList"));
    if(menuList.length >0){
        var searchMenuList = [];
        var reg = /^[a-zA-Z]+$/;

        //如果搜索参数不是全部为字母
        if(!reg.test(param)){
            for(var i = 0; i<menuList.length; i++){
                if(menuList[i].yyfwMc && menuList[i].yyfwMc.indexOf(param) != -1 && menuList[i].url && menuList[i].url != ''){
                    searchMenuList.push(menuList[i]);
                }
            }
        } else{
            param  = param.toLowerCase();
            for(var i = 0; i<menuList.length; i++){
                if(((menuList[i].pyqc && menuList[i].pyqc.indexOf(param) != -1) || (menuList[i].pyjc && menuList[i].pyjc.indexOf(param) != -1)) && menuList[i].url && menuList[i].url != ''){
                    searchMenuList.push(menuList[i]);
                }
            }
        }

        store.set("searchMenuList",searchMenuList);
        return true;
    } else{
        layerAlert("状态异常，请重新登录！");
        return false
    }
}

//展示搜索结果
function showResult() {
    var searchMenuList = store.get("searchMenuList");
    var searchHtml = "<table id=\"result\" class=\"table table-striped\">";
    if(!searchMenuList || searchMenuList.length<1){
        searchHtml += "<tr><td>无结果</td></tr>";
    }else{
        for(var i = 0; i<searchMenuList.length; i++){

            searchHtml += "<tr><td><a target='blank' href='"+ ctx + searchMenuList[i].url +"'>" + searchMenuList[i].yyfwMc + "</a></td></tr>";
        }
    }
    searchHtml += "</table>";
    $("#search").after(searchHtml);
    store.remove("searchMenuList");
}

//根据搜索条件刷新搜索结果展示
function refreshResult() {
    $("#result").remove();
    var searchMenuList = store.get("searchMenuList");
    var searchHtml = "<table id=\"result\" class=\"table table-striped\">";
    if(!searchMenuList || searchMenuList.length<1){
        searchHtml += "<tr><td>无结果</td></tr>";
    }else{
        for(var i = 0; i<searchMenuList.length; i++){
            searchHtml += "<tr><td><a target='blank' href='"+ctx + searchMenuList[i].url +"'>" + searchMenuList[i].yyfwMc + "</a></td></tr>";
        }
    }
    searchHtml += "</table>";
    $("#search").after(searchHtml);
    store.remove("searchMenuList");
}