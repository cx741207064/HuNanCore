//var ctx = 'http://localhost:8080/';


$(document).ready(function () {

    //initPageHead();

    $("#logoutBtn").click(function(){
        return false;
        logout("/toLogin.do");
    });

    $('#loginBtn').click(function(){
        location.href = ctx + '/toLogin.do?number=' + new Date().getTime();
    });

    var k = !0;

    $(".loginmask").css("opacity", 0.8);

    /*
     if($.browser.version <= 6){
     $('#reg_setp,.loginmask').height($(document).height());
     }
     */

    $(".thirdlogin ul li:odd").css({marginRight: 0});

    $(".openlogin").click(function () {
        //k && "0px" != $("#loginalert").css("top") && ($("#loginalert").show(), $(".loginmask").fadeIn(500), $("#loginalert").animate({top: 200}, 400, "easeOutQuart"))
        location.href=ctx+"login.html";
    });

    $(".loginmask,.closealert").click(function () {
        k && (k = !1, $("#loginalert").animate({top: -600}, 400, "easeOutQuart", function () {
            $("#loginalert").hide();
            k = !0
        }), $(".loginmask").fadeOut(500))
    });


    $("#sigup_now,.reg a").click(function () {
        $("#reg_setp,#setp_quicklogin").show();
        $("#reg_setp").animate({left: 0}, 500, "easeOutQuart")
    });

    $(".back_setp").click(function () {
        "block" == $("#setp_quicklogin").css("display") && $("#reg_setp").animate({left: "100%"}, 500, "easeOutQuart", function () {
            $("#reg_setp,#setp_quicklogin").hide()
        })
    });

//    $('#loginButton').click(function(){
//        var date = new Date();
//        var data = {
//            userName: $('#userName').val(),
//            password: $('#password').val(),
//            role: 'SYT',
//            appversion: 'V1.0'
////                        logintime: formatDate(date),
////                        errornum:'0'
//        };
//    });



});
$(window).resize(function() {

    //if($(window).width()<1200){
    //    $(".slider .bd .ul").css("padding-left")
    //}

});

$(document).ready(function(){

    /* 设置第一张图片 */
    $(".slider .bd li").first().before($(".slider .bd li").last());

    /* 鼠标悬停箭头按钮显示 */
    $(".slider").hover(function(){
        $(this).find(".arrow").stop(true,true).fadeIn(300)
    },function(){
        $(this).find(".arrow").fadeOut(300)
    });

    /* 滚动切换 */
    $(".slider").slide({
        titCell:".hd ul",
        mainCell:".bd ul",
        effect:"leftLoop",
        autoPlay:true,
        vis:3,
        autoPage:true,
        trigger:"click",
        interTime:5000
    });

});

//function initPageHead(){
//    $.ajax({
//        url:  ctx +'/getLoginUser.do',
//        type:'post',
//        dataType: 'json',
//        success:function(data){
//            if(data.result.code=='100000'){
//
//                $('#loginBtn').hide();
//                $('#logoutBtn').show();
//                $('#infoBtn').text(data.nsrmc);  //设置办税人名称
//                $('#infoBtn').show();
//            }else{
//                //alert('请重新登录');
//            }
//        }
//    });
//}


//logout，跳转到指定页面
function logout(pageName){
    $.ajax({
        url:  ctx +'/logout.do',
        type:'get',
        dataType: 'json',
        success:function(data){
            store.remove("pc_menuList");
            store.remove("cygnList")
            store.remove("toPopMsgCount");
            store.remove("isCALogin");
            store.remove("zgswskfjDm");
            sessionStorage.removeItem('userToken');
            location.href= ctx+ pageName;
        }
    });
}