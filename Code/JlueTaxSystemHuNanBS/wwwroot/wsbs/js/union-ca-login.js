function isEmpty(value) {
    if (!value || value == "null")
        return true;
    else
        return false;
}

function isSuccess(code) {
    if (isEmpty(code)) {
        return false;
    } else if ((code == '000' || code.substring(0, 1) == '1') && code.length < 6) {
        return true;
    }
    return false;
}

/*
 * 证书登陆
 */
function secureLogin(ctx) {
    var pin = $('#pin');
    if (!$.trim(pin.val())) {
        pin.focus();
        return false;
    }
    var rtn = '';
    try {
        rtn = openDevice($.trim(pin.val()));
    } catch (e) {
    }

    if (rtn != 0) {
        alert("打开UsbKey错误!" + rtn);
        return;
    }

    rtn = MakeClientHello();
    if (rtn != 0) {
        return;
    }

    $.blockUI();
    $.ajax({
        type: "post",
        url: ctx + '/caHello.do',
        data: {
            "clientHello": escape(CryptCtrl.strResult)
        },
        dataType: "json",
        async: false,
        success: function (data) {
            if (isSuccess(data.caHelloRespCode)) {
                serverPacket = data.serverRandom;
                rtn = MakeClientAuthCode(); //验证服务器端的serverHello数据包，并生成客户端认证码
                if (rtn != 0) {
                    alert("生成 ClientAuthCode 失败，MakeClientAuthCode() return: " + rtn);
                    return;
                }

                var menuList;
                $.ajax({
                    type: "post",
                    url: ctx + '/login_CA.do',
                    data: {
                        "clientAuthCode": clientAuthCode,
                        "serverRandom": serverPacket,
                        "roleId": 'R0001'
                    },
                    dataType: "json",
                    success: function (data) {

                        //删除前一次的localstore中的信息
                        store.remove("pc_menuList");
                        var moduleId = $("#moduleId").val() || '';
                        $.unblockUI();
                        if (data.result.code == '100000') {
                            $('#nsrsbh').val('');
                            $('#djm').val('');

                            //判断是否在实名认证试点区域范围内
                            //judeJiguanFanweiToPop();

                            //$('#roleId').val('');
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
                            store.set('isCALogin', 'CA');
                            if(!isEmpty(data.redirectpath)){
                                if(data.csmmbz=='Y'){
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
                                }
                                else if(data.redirectpath.indexOf("view_")>0){
                                    location.href= ctx+data.redirectpath;
                                }
                            }else{
                                location.href= ctx+ '/toMainIndex.do?uuid=' + (new Date()).getTime() + '&moduleId=' + moduleId;
                            }
                        } else {
                            if (data.result.code == '204') {  //如果是用户名或密码错误
                                if (isEmpty(data.result.errorCount)) {
                                    layer.msg(data.result.msg, {icon: 2});
                                } else if (data.result.errorCount < 5) {
                                    layer.msg('密码输入错误' + data.result.errorCount + '次，连续输错5次该账户将被锁定！', {icon: 2});
                                } else if (data.result.errorCount >= 5) {
                                    layer.msg('密码连续输入错误达到5次，该账户已被锁定！', {icon: 2});
                                }
                            } else if (data.result.msg != null && data.result.msg != '') {
                                layer.msg(data.result.msg, {icon: 2});
                            } else {
                                layer.msg('登录出错！', {icon: 2});
                            }
                        }
                    },
                    error: function () {
                        $.unblockUI();
                        layer.msg("操作失败！", {icon: 2});
                    }
                });
            } else {
                layer.msg("访问服务器失败，请稍后再试", {icon: 2});
            }
        },
        error: function () {
            $.unblockUI();
            layer.msg("操作失败！", {icon: 2});
        }
    });
}

