$(function(){
    $("#forDateShow")[0].click();
    $dp.hide();
    $('body').find('iframe:last').parent().css('display', 'none');
});

function onclick_openWeiHeyanTishi(){
    $.ajax({
        type: 'GET',
        url: ctx + '/ggcx/smrz/renZhengInfoList.do',
        data: {smrzztdm:'01'},
        //dataType:'json',
        success: function(msg){
            try{
                msg = JSON.parse(msg);
            }catch(e){
            }
            if(msg && msg.list && msg.list.length>0) {
                var params = {
                    dataList : msg.list
                };
                var html = template('weiHeyanTpl', params);
                $("#weiheyanTable").html(html);
                //$("#rzrqz").html(store.get('rzrqz'));
                //if(store.get('zgswjgInRange')=='GDQH'){ //过渡期后，不让关闭弹出框
                //    $('#closeWeiHeyan_Btn').hide();
                //}

                $("#weiheyantishi_div").show();
                $("#weiheyantishi_div2").show();
            }
        },
        error: function(err){
            $.unblockUI();
            layerAlert("查询实名认证信息失败，请稍后再试！");
        }
    });

    /*var paramList = [{name:'张三',type:'法人代表',zhuangtai:'未认证'},{name:'李经历',type:'财务负责人',zhuangtai:'未认证'},{name:'王慧',type:'购票员',zhuangtai:'已认证'},
        {name:'张三',type:'法人代表',zhuangtai:'未认证'},{name:'李经历',type:'财务负责人',zhuangtai:'未认证'},{name:'王慧',type:'购票员',zhuangtai:'已认证'},
        {name:'张三',type:'法人代表',zhuangtai:'未认证'},{name:'李经历',type:'财务负责人',zhuangtai:'未认证'},{name:'王慧',type:'购票员',zhuangtai:'已认证'},
        {name:'张三',type:'法人代表',zhuangtai:'未认证'},{name:'李经历',type:'财务负责人',zhuangtai:'未认证'},{name:'王慧',type:'购票员',zhuangtai:'已认证'}];
    var params = {
        dataList : paramList
    };
    var html = template('weiHeyanTpl', params);
    $("#weiheyanTable").html(html);

    $("#weiheyantishi_div").show();
    $("#weiheyantishi_div2").show();*/

}

function toHeyanPage(){
    //store.set('openHeyanPage','HeyanPage');
    if($('#csmmbz').val()!="Y"){
        location.href= ctx+'/userInfoPage.do#HeyanPage';
    }else{
        location.href= ctx+'/userInfoPage.do';
    }

}

function closeWeiHeyanPop(){
    $("#weiheyantishi_div").hide();
    $("#weiheyantishi_div2").hide();

}

//cookie存入根目录下 7天内不提示
function setCookie(value, name){
    var Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name+"="+value + ";expires=" + exp.toGMTString()+ ";path=/";
}

function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return arr[2];
    return null;

}

//删除cookie
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null){
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
    }
}
