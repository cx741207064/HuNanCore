/**
 * Created by Liaobo on 2016-03-23.
 */

$(function(){
    $(".searchInput").keydown(function(e){
        if(e.keyCode==13){
            publicServiceSearch(this);
            return false;
        }
    });
})


var staticMapJson = {"dataList":[{"taxDhId":"3","bstname":"长沙市芙蓉区国家税务局","bstdz":"长沙市芙蓉区晚报大道115号","jd":"28.186015","wd":"112.986548","gsbz":"Y","phone":"0731-84185602","img":null,"swjgDm":"14301020000","swjgMc":"长沙市芙蓉区国家税务局","xzqhszDm":"430102","xzqhMc":"芙蓉区","url":null,"bz":null,"ssjk":null,"file":null},{"taxDhId":"5","bstname":"长沙市天心区国家税务局","bstdz":"长沙市天心区裕南街向东南路206号","jd":"28.178071","wd":"112.982442","gsbz":"Y","phone":"0731-85131263","img":null,"swjgDm":"14301030000","swjgMc":"长沙市天心区国家税务局","xzqhszDm":"430103","xzqhMc":"天心区","url":null,"bz":null,"ssjk":null,"file":null},{"taxDhId":"7","bstname":"长沙市岳麓区国家税务局","bstdz":"长沙市岳麓区金星北路一段17号","jd":"28.233993","wd":"112.940196","gsbz":"Y","phone":"0731-84185602","img":null,"swjgDm":"14301040000","swjgMc":"长沙市岳麓区国家税务局","xzqhszDm":"430104","xzqhMc":"岳麓区","url":null,"bz":null,"ssjk":null,"file":null},{"taxDhId":"9","bstname":"长沙市开福区国家税务局","bstdz":"长沙市开福区三一大道273号","jd":"28.236364","wd":"113.011701","gsbz":"Y","phone":"0731-84485355","img":null,"swjgDm":"14301050000","swjgMc":"长沙市开福区国家税务局","xzqhszDm":"430105","xzqhMc":"开福区","url":null,"bz":null,"ssjk":null,"file":null},{"taxDhId":"13","bstname":"长沙市高新区国家税务局","bstdz":"长沙市桐梓坡西路191号","jd":"28.222297","wd":"112.899606","gsbz":"Y","phone":"0731-88992230","img":null,"swjgDm":"14301940000","swjgMc":"长沙市高新区国家税务局","xzqhszDm":"430104","xzqhMc":"岳麓区","url":null,"bz":null,"ssjk":null,"file":null},{"taxDhId":"23","bstname":"长沙市车购税征收管理分局","bstdz":"长沙县星沙镇蒸湘路351号","jd":"28.244049","wd":"113.075875","gsbz":"Y","phone":"0731-86189110","img":null,"swjgDm":"14301900000","swjgMc":"长沙市国家税务局车辆购置税征收管理分局","xzqhszDm":"430105","xzqhMc":"开福区","url":null,"bz":null,"ssjk":null,"file":null}]};
function ajaxLoadMap()
{
    //$.ajax({
        //type: 'get',
        //url:ctx+'/publicService/bsdt',
        //dataType : 'json',
        //success: function(res){
            var listHtml = template("bsdtList", staticMapJson);
            //console.log(JSON.stringify(staticMapJson));
            $("#bsdt-content").append(listHtml);
        //},
        //error: function(err){
        //    $.unblockUI();
        //}
    //});
};

//刷新所有缓存
function ajaxRefreshOsCache(){
    $.ajax({
        type: 'get',
        url: ctx+'/publicService/loadOsCache',
        dataType : 'json',
        success: function(res){
        },
        error: function(err){
        }
    });
}
//-------------------------------四个模块通用全局----------------------
var currentTypeJson = {};
var numOfPerPage = 10;//每页多少条
//当前选择类型 应用于有分类的模块  如政策法规，办税指南
var listType;

var ZCFG ='zcfg';//政策法规
var TZGG ='tzgg';//通知公告
var BSZN ='bszn';//办税指南
var RDWD ='rdwd';//热点问答
var CREDITA='credita';



var NoticeListJson;
//加载公告通知
function ajaxLoadNotice(pageType)
{
    $.ajax({
        type: 'get',
        url: ctx+'/publicService/notice/index',
        dataType : 'json',
        data : 'json',
        success: function(res){
            NoticeListJson = res.dataList;
            if(!isEmpty(NoticeListJson)){
                for(var i=0;i<NoticeListJson.length;i++){
                    var notice=NoticeListJson[i].afficheTitle;
                    //对于有new图标的标题，要截取得短一点，腾出地方放图标
                    if(NoticeListJson[i].thirstyBz=='N'){
                        NoticeListJson[i].afficheTitle1=stringsubString(notice,21);
                    }else{
                        NoticeListJson[i].afficheTitle1=stringsubString(notice,24);
                    }

                }
            }

            if(pageType=='index'){
                var listHtml = template("noticeIndexList", res);
                $("#notice-index-content").html(listHtml);
            }else if(pageType=='12366'){
                var listHtml = template("noticeList", res);
                $("#notice-index-content").html(listHtml);
            }else if(pageType=='more'){
                //默认取第一页
                refleshNoticeContent(1);
            }else if(!pageType){
                //var listHtml = template("noticeIndexList", res);
                //$("#notice-index-content").html(listHtml);
                refleshNoticeContent(1);
            }

        },
        error: function(err){
            $.unblockUI();
        }
    });
};

var creditAJson;
//加载A类通知公告通知
function ajaxLoadCreditANotice(pageType)
{
    $.ajax({
        type: 'get',
        url: ctx+'/publicService/notice/creditA',
        dataType : 'json',
        data : 'json',
        success: function(res){
            creditAJson = res.dataList;
            if(!isEmpty(creditAJson) && creditAJson.length > 0){
                for(var i=0;i<creditAJson.length;i++){
                    var notice=creditAJson[i].afficheTitle;
                    //对于有new图标的标题，要截取得短一点，腾出地方放图标
                    if(creditAJson[i].thirstyBz=='N'){
                        creditAJson[i].afficheTitle1=stringsubString(notice,21);
                    }else{
                        creditAJson[i].afficheTitle1=stringsubString(notice,24);
                    }
                }

                if (pageType == 'index') {
                    var listHtml = template("hotSpotsIndexList", res);
                    $("#hotSpots-index-content").html(listHtml);
                }
                ;
                if (pageType == 'more') {
                    //默认取第一页
                    refleshReditAContent(1)
                }
                ;
            }
        },
        error: function(err){
            $.unblockUI();
        }
    });
};

function refleshReditAContent(currentPage){
    currentTypeJson = creditAJson;
    var newJson = changePageNav(currentPage);
    if(getJsonObjLength(newJson)>0){
        //var param = {};
        //param.dataList = newJson;
        var listHtml = template("creditAList", newJson);
        $("#creditA-content").html(listHtml);
    }else{
        $("#creditA-content").html(listHtml);
    }

}

function refleshNoticeContent(currentPage){
    currentTypeJson = NoticeListJson;
    var newJson = changePageNav(currentPage);
    if(getJsonObjLength(newJson)>0){
        var listHtml = template("noticeList1", newJson);
        $("#notice-content").html(listHtml);
    }else{
        $("#taxGuide-content").html("");
    }

}
var hotSpotsJson;
//加载热点咨询
function ajaxLoadHotSpots(pageType)
{
    $.ajax({
        type: 'get',
        url: ctx+'/publicService/hotSpots/index',
        dataType : 'json',
        //data: {'minNum':minNum,'maxNum':maxNum},
        success: function(res){
            hotSpotsJson =  res.dataList;
            if(!isEmpty(hotSpotsJson)) {
                for (var i = 0; i < hotSpotsJson.length; i++) {
                    var message = hotSpotsJson[i].title;
                    //对于有new图标的标题，要截取得短一点，腾出地方放图标
                    if(hotSpotsJson[i].thirstyBz=='N'){
                        hotSpotsJson[i].title1 = stringsubString(message,21);
                    }else{
                        hotSpotsJson[i].title1 = stringsubString(message,24);
                    }
                }
            }
            if(pageType=='index'){
                var listHtml = template("hotSpotsIndexList", res);
                $("#hotSpots-index-content").html(listHtml);
            };
            if(pageType=='more'){
                //默认取第一页
                refleshHotSpotsContent(1)
            };

        },
        error: function(err){
            $.unblockUI();
        }
    });
};

function refleshHotSpotsContent(currentPage){
    currentTypeJson = hotSpotsJson;
    var newJson = changePageNav(currentPage);
    if(getJsonObjLength(newJson)>0){
        var listHtml = template("hotSpotsList", newJson);
        $("#hotSpots-content").html(listHtml);
    }else{
        $("#hotSpots-content").html(listHtml);
    }

}

var lawsListJson;
//加载政策法规
function ajaxLoadLaws(pageType)
{
    $.ajax({
        type: 'get',
        url: ctx+'/publicService/laws/index',
        dataType : 'json',
        //data: {'minNum':minNum,'maxNum':maxNum},
        success: function(res){
            lawsListJson = res.dataList;
            if(pageType=='index'){
                if(!isEmpty(lawsListJson['4'])) {
                    for (var i = 0; i < lawsListJson['4'].length; i++) {
                        var message = lawsListJson['4'][i].bt;
                        //lawsListJson['4'][i].bt1 = stringsubString(message,24);

                        //对于有new图标的标题，要截取得短一点，腾出地方放图标
                        if(lawsListJson['4'][i].thirstyBz=='N'){
                            lawsListJson['4'][i].bt1 = stringsubString(message,21);
                        }else{
                            lawsListJson['4'][i].bt1 = stringsubString(message,24);
                        }
                    }
                }
                var listHtml = template("lawsIndexList", lawsListJson['4']);
                $("#laws-content").append(listHtml);
            };
            if(pageType=='more'){
                var typeListHtml = template("lawsTypeList", res);
                //默认取第一个类别显示
                listType = res.dataTypeList[0].zcfgDm;
                $('#zcfg_title').html(res.dataTypeList[0].zcfgmc);  //设置列表顶部的大标题
                refleshLawsContent(1)
                $("#laws-type").append(typeListHtml);
            };
        },
        error: function(err){
            $.unblockUI();
        }
    });
}
function refleshLawsContent(currentPage){
    currentTypeJson = lawsListJson[listType];
    //如果该分类下面没有一条数据则空白（一般不会有）
    if(getJsonObjLength(currentTypeJson)>0){
        var newJson = changePageNav(currentPage);
        var listHtml = template("lawsList", changePageNav(currentPage));
        $("#laws-content").html(listHtml);
    }else{
        $("#laws-content").html("");
        $("#pageNav").html("");

    }

}
function changeLawsType(id,mc){
    $('#laws-type li').removeAttr("class");
    $('#laws-type-'+id).attr("class","zcfg-hover");
    $('#zcfg_title').html(mc);  //设置列表顶部的大标题
    listType = id;
    refleshContent(1);
}



var taxGuideListJson;
//加载办税指南
function ajaxLoadTaxGuide(pageType)
{
    $.ajax({
        type: 'get',
        url:ctx+'/publicService/taxGuide/index',
        dataType : 'json',
        //data: {'minNum':minNum,'maxNum':maxNum},
        success: function(res){
            taxGuideListJson = res.dataList;
            if(pageType=='index'){
                if(!isEmpty(taxGuideListJson['0'])) {
                    for (var i = 0; i < taxGuideListJson['0'].length; i++) {
                        var message = taxGuideListJson['0'][i].title;
                        //taxGuideListJson['0'][i].titles = stringsubString(message,24);

                        //对于有new图标的标题，要截取得短一点，腾出地方放图标
                        if(taxGuideListJson['0'][i].thirstyBz=='N'){
                            taxGuideListJson['0'][i].titles = stringsubString(message,21);
                        }else{
                            taxGuideListJson['0'][i].titles = stringsubString(message,24);
                        }
                    }
                }
                var listHtml = template("taxGuideIndexList", taxGuideListJson['0']);
                $("#taxGuide-content").append(listHtml);
            };
            if(pageType=='12366'){
                if(!isEmpty(taxGuideListJson['0'])) {
                    for (var i = 0; i < taxGuideListJson['0'].length; i++) {
                        var message = taxGuideListJson['0'][i].title;
                        //taxGuideListJson['0'][i].titles = stringsubString(message,24);

                        //对于有new图标的标题，要截取得短一点，腾出地方放图标
                        if(taxGuideListJson['0'][i].thirstyBz=='N'){
                            taxGuideListJson['0'][i].titles = stringsubString(message,21);
                        }else{
                            taxGuideListJson['0'][i].titles = stringsubString(message,24);
                        }
                    }
                }
                var listHtml = template("taxGuideList", taxGuideListJson['0']);
                $("#taxGuide-content").append(listHtml);
            };
            if(pageType=='more'){
                var typeListHtml = template("taxGuideTypeList", res);
                //默认取第一个类别显示
                listType = res.dataTypeList[0].znfldm;
                $('#bszn_title').html(res.dataTypeList[0].znflmc);  //设置列表顶部的大标题
                refleshTaxGuideContent(1)
                $("#taxGuide-type").append(typeListHtml);
            };
        },
        error: function(err){
            $.unblockUI();
        }
    });
}
function changeTaxGuideType(id,mc){
    $('#taxGuide-type li').removeAttr("class");
    $('#taxGuide-type-'+id).attr("class","zcfg-hover");
    $('#bszn_title').html(mc);  //设置列表顶部的大标题
    listType = id;
    refleshContent(1);
}
//通过选择办税指南分类刷新列表数据
function refleshTaxGuideContent(currentPage){
    currentTypeJson = taxGuideListJson[listType];
    //如果该分类下面没有一条数据则空白（一般不会有）
    if(getJsonObjLength(currentTypeJson)>0){
        var newJson = changePageNav(currentPage);
        var listHtml = template("taxGuideList", newJson);
        $("#taxGuide-content").html(listHtml);
    }else{
        var listHtml = $("#taxGuideList1").html();
        $("#taxGuide-content").html(listHtml);
        $("#pageNav").html("");

    }

}
/**
 * 分页方法
 * @param jsonObject json对象
 * @param numOfPerPage 每页多少条记录
 * @param currentPage 当前页码
 * @returns {{}} 返回当前页的json对象
 */
function changePageNav(currentPage){
    var mountOfPage = 1;

    mountOfPage = Math.ceil(getJsonObjLength(currentTypeJson)/numOfPerPage);

    var mop = {};
    for (var i=1;i<mountOfPage+1;i++)
    {
        //如果是最后一条
        if(i==(mountOfPage)){
            mop[i-1] = (person(i-1,i,i));
        }else{
            mop[i-1] = (person(i-1,i,i+1));
        }

    }
    var listHtml = template("pageNavBlock", mop);
    $("#pageNav").html(listHtml);

    //给当前页码加上选中样式
    $(".pagination li").removeAttr("class");
    $(".pagination #page_"+currentPage).attr("class","active");

    var newJsonObject ={};
    var newJsonObjectIndex = 0;
    //该页第一条序号
    var indexBegin = (currentPage-1)*numOfPerPage;
    //该页最后一条序号
    var indexEnd = currentPage*numOfPerPage-1;
    //若是最后一页，则该页最后一条是json最后一条
    if(currentPage==mountOfPage){
        indexEnd = getJsonObjLength(currentTypeJson)-1;
    }
    while (indexBegin<=indexEnd && currentTypeJson!=null)
    {
        newJsonObject[newJsonObjectIndex] = currentTypeJson[indexBegin];
        indexBegin++;
        newJsonObjectIndex++;
    }
    //返回当前页的json对象
    return newJsonObject;
}
//改变页码后刷新当前页内容
function refleshContent(currentPage){
    if($('#yyfwmc').val()==ZCFG){
        refleshLawsContent(currentPage);
    }
    if($('#yyfwmc').val()==BSZN){
        refleshTaxGuideContent(currentPage);
    }
    if($('#yyfwmc').val()==TZGG){
        refleshNoticeContent(currentPage);
    }
    if($('#yyfwmc').val()==RDWD){
        refleshHotSpotsContent(currentPage);
    }
    if($('#yyfwmc').val()==CREDITA){
        refleshReditAContent(currentPage);
    }

}

//返回页码对象
function person(previous,current,next)
{
    return {previous:previous,current:current,next:next};
}

function getJsonObjLength(jsonObj) {
    var Length = 0;
    for (var item in jsonObj) {
        Length++;
    }
    return Length;
}

function prePage(){
    var current = $('.pagination [class="active"]  .page_current').val();
    if(current==1){
        layerMsg("这已经是第一页！", 4);
        //alert("这已经是第一页！");
        return;
    }else{
        refleshContent(current-1);
    }
}
function nextPage(){
    var next = $('.pagination [class="active"]  .page_next').val();
    var current = $('.pagination [class="active"]  .page_current').val();
    if(current== next){
        layerMsg("这已经是最后一页！", 4);
        //alert("这已经是最后一页！");
        return;
    }else{
        refleshContent(next);
    }
}


//对暂不提供的功能链接，点击弹出提示
function popZbtggfwgn(){
    layerMsg("暂不提供该服务功能！",7);
}



/**
 * 根据keywords和范围进行搜索
 * @param btn
 */
function publicServiceSearch(btn){
    var keywords = $($(btn).parent().children().get(0)).val();
    var zlflag = -1;

    zlflag = $('#searchType').val();

    //var btnId = $(btn).attr('id');
    //if(btnId=='qbnrssBtn'){
    //    zlflag=-1;
    //}else if(btnId=='wtjdssBtn'){
    //    zlflag=2;
    //}else if(btnId=='bslcssBtn'){
    //    zlflag=3;
    //}else if(btnId=='ssfgssBtn'){
    //    zlflag=1;
    //}
    zsk_more_jump("",zlflag,keywords);
}

function zsk_more_jump(type,zlflag,keywords){
    var url = "http://12366.chinatax.gov.cn//SearchBLH_toMain.do";
    var name = Math.random();
    var tempForm = document.createElement("form");
    tempForm.id="tempForm2";
    tempForm.method="post";
    tempForm.action=url;
    tempForm.target=name;

    var hideInput1 = document.createElement("input");
    hideInput1.type="hidden";
    hideInput1.name= "type";
    hideInput1.value= type;

    var hideInput2 = document.createElement("input");
    hideInput2.type="hidden";
    hideInput2.name= "zlflag";
    hideInput2.value= zlflag;

    var hideInput3 = document.createElement("input");
    hideInput3.type="hidden";
    hideInput3.name= "keywords";
    hideInput3.value= keywords;

    tempForm.appendChild(hideInput1);
    tempForm.appendChild(hideInput2);
    tempForm.appendChild(hideInput3);
    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);
}

/**
 * 热词链接搜索
 */
function hotWordSearch(obj){
    var keywords = $(obj).text();
    var zlflag = -1;

    zlflag = $('#searchType').val();

    zsk_more_jump("",zlflag,keywords);
}