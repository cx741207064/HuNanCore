/**
 * 登录页
 * @author ljun51@outlook.com
 * @date   2018-05-19
 */
var unionLogin = (function (document, layer) {

    var _imgLoad = 1;

    var getImage = function (ctx, selector) {
        if (_imgLoad) {
            _imgLoad = 0;
            $.rest.get({url: ctx + '/init'}).done(function (result) {
                if (result.rescode) {
                    $(selector).attr("src", ctx + '/get/' + result.code);
                    $(selector).load(function () {
                        _imgLoad = 1;
                    });
                }
            });
        }
    };

    var unionLogin = function (ctx) {
        var nsrsbh = document.getElementById('nsrsbh');
        var password = document.getElementById('password');
        var zzh = document.getElementById('zzh');
        var yzm = document.getElementById('yzm');


        if (!$.trim(nsrsbh.value)) {
            $(nsrsbh).focus();
            return false;
        }
        if (!$.trim(password.value)) {
            $(password).focus();
            return false;
        }
        if (!$.trim(yzm.value) || !validator.isAlphanumeric(yzm.value)) {
            $(yzm).focus();
            return false;
        }

        nsrsbh = $.trim(nsrsbh.value);
        password = $.md5($.trim(password.value));
        zzh = zzh.value;
        var code = $.trim(yzm.value);
        var zzrdlbz = 'N';
        if($('#zzrdlbz').prop('checked')){
            zzrdlbz = 'Y';
        }
        hngsLogin(ctx, nsrsbh, password, zzh, code, zzrdlbz, yzm);
    };


    var hngsLogin = function (ctx, nsrsbh, password, zzh, code, zzrdlbz, yzm) {
        $.blockUI();
        $.rest.post({
            url: ctx + '/login.do',
            data: {
                "nsrsbh": nsrsbh,
                "djm": password,
                "zzh": zzh,
                "zzrdlbz":zzrdlbz,
                "yzm": code,
                'ctm': $(yzm).data('ctm')
            }
        }).done(function (data) {
            $.unblockUI();
            doHngsLogin(ctx, data);
        }).fail(function () {
            $.unblockUI();
            getImage(ctx, document.getElementById('yzmImg'));
            layer.msg('登录出错,请稍后重试!', {icon: 2});
        });
    };

    var doHngsLogin = function (ctx, data) {
        getImage(ctx, document.getElementById('yzmImg'));
        if (data.result.code == '100000') {

            var menuList=data.pc_menuList;
            var cygnList=data.cygnList;
            if(menuList.length>0) {
                store.set('pc_menuList',menuList);
                store.set("cygnList", cygnList);
            }else{
                store.set('pc_menuList',"nobody");
                store.set("cygnList", "nobody");
            }

            store.set('zgswskfjDm',data.zgswskfjDm);
            sessionStorage.setItem("userToken", data.userToken);
            sessionStorage.setItem("roleId", data.roleId);
            var moduleId = $("#moduleId").val() || '';
            if(!isEmpty(data.redirectpath)){
                if(data.csmmbz=='Y'){   //首次登录，跳转到用户资料修改页面，提示用户修改密码
                    $.rest.get({
                        url: ctx+'/ggcx/smrz/isSmrz.do',
                        success: function (data) {
                            if(typeof data === 'string'){
                                data = JSON.parse(data);
                            }
                            if (data.result.code == '000') {
                                location.href= ctx+'/myInfo/toUpdatePwd.do?uuid=' + (new Date()).getTime();
                            } else {
                                location.href= ctx+ '/toMainIndex.do?uuid=' + (new Date()).getTime() + '&moduleId=' + moduleId;
                            }
                        },
                        error :function() {
                            location.href= ctx+ '/toMainIndex.do?uuid=' + (new Date()).getTime() + '&moduleId=' + moduleId;
                        }
                    });
                }else if(data.redirectpath.indexOf("mdss")>0){
                    location.href= ctx+data.redirectpath.substring(0,data.redirectpath.indexOf("mdss=")-1)+'#'+data.redirectpath.substring(data.redirectpath.indexOf("mdss=")+5,data.redirectpath.length);
                }else if(data.redirectpath.indexOf("view_")>0){
                    location.href= ctx+data.redirectpath;
                }
            }else{
                //申报提醒
                sbtx();
                location.href= ctx+ '/toMainIndex.do?uuid=' + (new Date()).getTime() + '&moduleId=' + moduleId;
            }
            //window.location.href = ctx + '/unionindex.do';
        } else {
            //如果是用户名或密码错误
            if (data.result.code == '204') {
                if (isEmpty(data.result.errorCount)) {
                    layer.msg(data.result.msg, {icon: 2});
                } else if (data.result.errorCount < 5) {
                    layer.msg('密码输入错误' + data.result.errorCount + '次，连续输错5次该账户将被锁定！', {icon: 2});
                } else if (data.result.errorCount >= 5) {
                    layer.msg('密码连续输入错误达到5次，该账户已被锁定！', {icon: 2});
                }
            } else if (data.result.msg) {
                layer.msg(data.result.msg, {icon: 2});
            } else {
                layer.msg('登录出错！', {icon: 2});
            }
        }
    };


    return {
        getImage: getImage,
        unionLogin: unionLogin
    };
})(document, layer);


function toReg(){
    location.href = ctx + "/toUnionRegisterInfo.do";
}

function findPwd(){
    location.href = ctx + "/tofindpwd.do";
}

function isIE(){
    //获取IE浏览器版本
    if(window.ActiveXObject || "ActiveXObject" in window)
    {
        var version = navigator.appVersion;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(version);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 5 || fIEVersion == 6 || fIEVersion == 7 || fIEVersion == 8)
        {
            //alert("尊敬的纳税人您好：为保证电子税局系统业务操作体验，请使用IE9或IE9以上浏览器访问本系统！");
            alert("为保证您正常使用网上税务局相关功能，请您确认您的浏览器版本为IE9或者IE9以上！");
        }
        if((fIEVersion == 5 || fIEVersion == 6 || fIEVersion == 7 || fIEVersion == 8 || fIEVersion == 9 || fIEVersion == 10) && document.documentMode != fIEVersion){
            alert("您的IE浏览器文本模式或文档模式设置不正确，请将浏览器重置或向税务机关请求技术支持！");
        }
    }else{
        alert("为保证您正常使用网上税务局相关功能，请您确认您的浏览器版本为IE9或者IE9以上！");
    }
}


/*注册弹出提示*/
function popReg(){
    //var zcsqb = ctx+"/download.jsp?filename=wsbszcsqb.doc";
    //var bgsqb = ctx+"/download.jsp?filename=wsbssxbgsqb.doc";
    var zcsqb = ctx+"/ws/fileOption/downLoadStaticFile/"+(new Base64()).encode("wsbszcsqb.rar");
    var bgsqb = ctx+"/ws/fileOption/downLoadStaticFile/"+(new Base64()).encode("wsbssxbgsqb.rar");

    //bgsqb = encodeURI(bgsqb);

    var content = '<p>&nbsp;&nbsp;&nbsp;&nbsp;如果您已到主管国税机关办理网上办税业务开通手续，请凭国税机关赋予的随机初始密码，以注册用户身份从左上角登录网上办税服务厅；登录后，请及时修改初始密码。</p>'
        + '<p>&nbsp;&nbsp;&nbsp;&nbsp;如果您已办理税务登记，但未开通网上办税业务，将无法访问电子申报、申请事项、涉税信息查询等面向纳税人的服务页面，请及时到主管国税机关办理开通手续。</p>'
        +'<p>&nbsp;&nbsp;&nbsp;&nbsp;如果您未办理税务登记，可点击 &nbsp;<a href="'+zcsqb+ '" class="label label-info" style="font-size:14px; font-weight:100;">“网上办税注册表单”</a> &nbsp;按钮申请办理设立税务登记。</p>'
        +'<p>&nbsp;&nbsp;&nbsp;&nbsp;如果您要变更办税事项，可点击 &nbsp;<a href="' +bgsqb+ '" class="label label-warning" style="font-size:14px; font-weight:100;">“网上办税事项变更申请表”</a> &nbsp;按钮申请变更办税事项。</p>';
    //+'<a href="'+ctx+'/down_center.jsp?filename=wsbssxbgsqb.doc">下载</a>';
    $("#popReg .modal-body").html(content);

    $('#popReg').modal({backdrop: 'static', keyboard: false});
    $('#popReg').modal('show');
    // $("#popReg").dialog({
    //     bgiframe: false,
    //     modal: true,
    //     width: 500,
    //     height: 500,
    //     //title: false,
    //     dialogClass: 'alert',
    //     autoOpen: true,
    //     hide: 'slide',
    //     show: 'slide',
    //     resizable: false,
    //     cache: false
    //     //close: function(ev, ui) {}
    // });
}

/**
 *下载证书登录安全控件
 */
function downloadZsdlkj(){
    var zskj = ctx+"/ws/fileOption/downLoadStaticFile/"+(new Base64()).encode("zsdlaqkj.rar");
    window.open(zskj);
}

/**
 * js判断浏览器
 */
function browersCheck(){
    var explorer = window.navigator.userAgent;
    if(IECheck(explorer)=='IE'){
        return 'IE';
    }
    else if(explorer.indexOf("OPR")!=-1 || explorer.indexOf("Opera")!=-1){
        return("Opera");
    }else if(explorer.indexOf("Chrome")!=-1){
        return("Chrome");

    }else if(explorer.indexOf("Firefox")!=-1){
        return("Firefox!!");
    }else if(explorer.indexOf("Safari")!=-1){
        return("Safari");
    }
}

function IECheck(explorer) {
    if (explorer.indexOf("rv:11.0") != -1 || explorer.indexOf("MSIE 10.0") != -1 || explorer.indexOf("MSIE 9.0") != -1 || explorer.indexOf("MSIE 8.0") != -1 || explorer.indexOf("MSIE 7.0") != -1) {
        return 'IE';
    }
}
