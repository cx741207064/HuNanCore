$(document).ready(function () {

    $('#hjjcbtn').click(function () {
        layer.open({
            type:1,
            content:$("#panelbox").html(),
            title: "环境检测",
            area:['850px','450px'],
            show: 'slide',
            resizable: false
        });
    });

    var msg = "<div style='color:red;'>ㄨ&nbsp;&nbsp;系统检测到您正在使用非IE9及以上版本的IE浏览器访问湖南省电子税务局</div>";
    var isIE9 = brower();
    if(isIE9){
        msg="<div style='color:green;'>√  &nbsp;&nbsp;您的浏览器版本符合系统要求，祝您使用愉快</div>";
    }
    $("#eval_version").html(msg);
    checkSystemInfo();
    //isBelieve();
    imgnet();
});

String.prototype.StartWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
        return false;
    if(this.substr(0,s.length)==s)
        return true;
    else
        return false;
}

//检查网络连通性
function imgnet() {
    var testnet_on=function(){
        var img=new Image();
        img.id="testnet";

        img.onload = function(){
            $("#testnet").remove();
            net_on=1;
            $('#eval_network').html("<div style='color:green;'>√  &nbsp;&nbsp;通过</div>");
            //$('#eval_network').empty().append(' <span>网络连接情况:</span><span>连接正常</span><span class="right-span">通过</span>');
        };

        img.onerror=function(){
            $('#eval_network').html("<div style='color:red;'>ㄨ  &nbsp;&nbsp;未通过</div>");
            //$('#network').empty().append('<span>网络连接情况:</span><span>未连接</span><span class="wrong right-span">未通过<img src="/zjgfcdn/zjimg/hjjc/wrong.png"></span>');

            $("#testnet").remove();
            net_on=0;
        };
        img.src= ctx + "/images/point.png";
        img.style.display="none";
        document.body.appendChild(img);
    }
    var net_on=1;

    testnet_on();

    test_interval=setInterval(testnet_on,5000);
}

//检验操作系统版本
function checkSystemInfo(){
    var sysVersion = checkSystemVersion();
    if(sysVersion.StartWith("WinXP") || sysVersion.StartWith("Win7")|| sysVersion.StartWith("Win10")){
        $("#eval_sys")[0].innerHTML = "<div style='color:green;'>√  &nbsp;&nbsp;已安装"+ sysVersion +"操作系统，满足运行要求！</div>";
    }else{
        $("#eval_sys")[0].innerHTML = "<div style='color:red;'>ㄨ&nbsp;&nbsp;已安装"+sysVersion+"操作系统，不满足运行要求，请安装Win7系统！</div>";
    }
}

//检查操作系统版本
function checkSystemVersion(){
    var sUserAgent = navigator.userAgent;
    var isWin = navigator.platform;
    if (isWin.StartWith("Win")) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8) return "Win8";
        var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    return "other";
}


//----------------------------检查是否为可信任站点-----------------------------
/*
 * 判断可信任站点(可信任站点可以为IP地址也可以为域名)
 */
function isBelieve(){
    if(navigator.userAgent.indexOf("MSIE") == -1){
        // alert("只支持IE浏览器！");
        $("#eval_trustedSites")[0].innerHTML = "<div style='color:red;'>ㄨ&nbsp;&nbsp;您当前使用的为非IE浏览器，请使用IE浏览器访问！</div>";
        //$("#isBelieve").append("<span>只支持IE浏览器！</span>");
        //$("#isOK6").append("<span class='error'>×</span>");
        return;
    }
    var hostname = window.location.hostname;
    var WshShell=null;
    try{
        WshShell = new ActiveXObject("WScript.Shell");
    }catch(e){
        $("#eval_trustedSites")[0].innerHTML = "<div style='color:red;'>ㄨ&nbsp;&nbsp;受信任站点设置不满足系统要求，受信任站点网址为：https://etax.hunan.chinatax.gov.cn</div>";
        /*$("#isBelieve").append("<span>未知</span>");
        $("#isOK6").append("<span class='error'><a href='#' onclick='tip_isBelieve()'>×</a></span>");*/
        return;
    }
    //IP的正则表达式
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    //根据域名判断是否存在可信站点
    if(hostname != "localhost" && !reg.test(hostname)){
        var domainSFlag = false,domainEFlag = false,domainSEFlag = false,domainSSEFlag = true;
        var hostnamePrefix = "",hostnameSuffix = "";
        var indexOf = hostname.indexOf(".");
        if(indexOf != -1){
            hostnamePrefix = hostname.substring(0, indexOf);
            hostnameSuffix = hostname.substring(indexOf+1, hostname.length);
            try{
                WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostname + "\\http");
            }catch(e){
                domainEFlag = true;
            }
            if(domainEFlag){
                try{
                    WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostnameSuffix + "\\" + hostnamePrefix + "\\http");
                }catch(e){
                    domainSFlag = true;
                }
            }
            //判断其合法性
            if(domainEFlag && domainSFlag){
                try{
                    WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostnameSuffix + "\\" + hostnamePrefix + "\\*");
                    $("#eval_trustedSites")[0].innerHTML = "<div style='color:red;'>ㄨ&nbsp;&nbsp;您加入的可信站点不是合法的可信站点，请以\"http://\"开头,受信任站点网址为：https://etax.hunan.chinatax.gov.cn</div>";
                    /*$("#isBelieve").append("<span>您加入的可信站点不是合法的可信站点，请以\"http://\"开头！</span>");
                    $("#isOK6").append("<span class='error'>×</span>");*/
                    return;
                }catch(e){}
            }
        }else{
            try{
                WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostname + "\\http");
            }catch(e){
                domainSEFlag = true;
            }
            //判断其合法性
            if(domainSEFlag){
                try{
                    WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostname + "\\*");
                    $("#eval_trustedSites")[0].innerHTML = "<div style='color:red;'>ㄨ&nbsp;&nbsp;您加入的可信站点不是合法的可信站点，请以\"http://\"开头,受信任站点网址为：https://etax.hunan.chinatax.gov.cn</div>";
                    /*$("#isBelieve").append("<span>您加入的可信站点不是合法的可信站点，请以\"http://\"开头！</span>");
                    $("#isOK6").append("<span class='error'>×</span>");*/
                    return;
                }catch(e){}
            }
        }
        if((domainSFlag && domainEFlag) || domainSEFlag){
            $("#eval_trustedSites")[0].innerHTML = "<div style='color:red;'>ㄨ&nbsp;&nbsp;受信任站点设置不满足系统要求，受信任站点网址为：https://etax.hunan.chinatax.gov.cn</div>";
            /*$("#isBelieve").append("<span>否</span>");
            $("#isOK6").app*/end("<span class='error'>×</span>");
            return;
        }
    }else{
        //获取可信任站点IP,数字2000没法解释，主要涉及到注册表的问题
        var str = [];
        for(var i = 1;i < 2000;i++){
            try{
                str[i] = WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range" + i + "\\:Range");
            }catch(e){
            }
        }
        var count = true;
        for(var i = 1;i < str.length;i++){
            if(str[i] == undefined){
                continue;
            }else{
                if(str[i] == hostname){
                    count = false;
                    break;
                }
            }
        }
        if(count){
            $("#eval_trustedSites")[0].innerHTML = "<div style='color:red;'>ㄨ&nbsp;&nbsp;受信任站点设置不满足系统要求，受信任站点网址为：https://etax.hunan.chinatax.gov.cn</div>";
            //$("#isBelieve").append("<span>否</span>");
            //$("#isOK6").append("<span class='error'>×</span>");
            return;
        }
    }
    $("#eval_trustedSites")[0].innerHTML = "<div style='color:green;'>√&nbsp;&nbsp;受信任站点设置正确，满足系统要求！</div>";
    /*$("#isBelieve").html("是");
    $("#isOK6").append("<span class='correct'>√</span>");*/
}


function brower() {
    var brower = getBrowser();
    if(brower.browser == 'IE' && (brower.version == 'Undefined' || brower.version == '8')){
        //$('#brower').append('<span>'+brower.browser + '--' +brower.version+'</span><span class="wrong right-span">未通过<img src="/zjgfcdn/zjimg/hjjc/wrong.png"></span>');
        return false;
    }else{
        //$('#brower').append('<span>'+brower.browser + '--' +brower.version+'</span><span class="right-span">通过<img src="/zjgfcdn/zjimg/hjjc/right.png"></span>');
        return true;
    }
}

function getBrowser() {
    var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
    var rTrident = /(trident)\/([\w.]+)/;
    var rFirefox = /(firefox)\/([\w.]+)/;
    var rOpera = /(opera).+version\/([\w.]+)/;
    var rNewOpera = /(opr)\/(.+)/;
    var rChrome = /(chrome)\/([\w.]+)/;
    var rSafari = /version\/([\w.]+).*(safari)/;
    var ua = navigator.userAgent.toLowerCase();
    var matchBS, matchBS2;
    matchBS = rMsie.exec(ua);
    if (matchBS != null) {
        matchBS2 = rTrident.exec(ua);
        if (matchBS2 != null) {
            switch (matchBS2[2]) {
                case "4.0":
                    return {
                        browser:
                            "IE",
                        version: "8"
                    };
                    break;
                case "5.0":
                    return {
                        browser:
                            "IE",
                        version: "9"
                    };
                    break;
                case "6.0":
                    return {
                        browser:
                            "IE",
                        version: "10"
                    };
                    break;
                case "7.0":
                    return {
                        browser:
                            "IE",
                        version: "11"
                    };
                    break;
                default:
                    return {
                        browser:
                            "IE",
                        version: "Undefined"
                    };
            }
        } else {
            return {
                browser: "IE",
                version: matchBS[2] || "0"
            };
        }
    }
    matchBS = rFirefox.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
        return {
            browser: matchBS[1] || "",
            version: matchBS[2] || "0"
        };
    }
    matchBS = rOpera.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: matchBS[1] || "",
            version: matchBS[2] || "0"
        };
    }
    matchBS = rChrome.exec(ua);
    if ((matchBS != null) && ( !! (window.chrome)) && (!(window.attachEvent))) {
        matchBS2 = rNewOpera.exec(ua);
        if (matchBS2 == null) {
            return {
                browser: matchBS[1] || "",
                version: matchBS[2] || "0"
            };
        } else {
            return {
                browser: "Opera",
                version: matchBS2[2] || "0"
            };
        }
    }
    matchBS = rSafari.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
        return {
            browser: matchBS[2] || "",
            version: matchBS[1] || "0"
        };
    }
}