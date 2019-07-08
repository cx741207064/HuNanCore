var unionLogin = (function (document, layer) {

    var _imgLoad = 1;

    var getImage = function (ctx, selector) {
        if (_imgLoad) {
            _imgLoad = 0;
            $.rest.get({ url: ctx + '/init' }).done(function (result) {
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
        hngsLogin(ctx);
    };

    var hngsLogin = function (ctx) {
        $.rest.post({
            url: ctx + '/login.do',
            data: {
            }
        }).done(function (data) {
            doHngsLogin(ctx, data);
        }).fail(function () {
            getImage(ctx, document.getElementById('yzmImg'));
            layer.msg('登录出错,请稍后重试!', { icon: 2 });
        });
    };

    var doHngsLogin = function (ctx, data) {
        if (data.result.code == '100000') {

            var menuList = data.pc_menuList;
            var cygnList = data.cygnList;
            if (menuList.length > 0) {
                store.set('pc_menuList', menuList);
                store.set("cygnList", cygnList);
            } else {
                store.set('pc_menuList', "nobody");
                store.set("cygnList", "nobody");
            }

            store.set('zgswskfjDm', data.zgswskfjDm);
            sessionStorage.setItem("userToken", data.userToken);
            sessionStorage.setItem("roleId", data.roleId);
            var moduleId = $("#moduleId").val() || '';
            if (!isEmpty(data.redirectpath)) {
                if (data.csmmbz == 'Y') {   //首次登录，跳转到用户资料修改页面，提示用户修改密码
                    $.rest.get({
                        url: ctx + '/ggcx/smrz/isSmrz.do',
                        success: function (data) {
                            if (typeof data === 'string') {
                                data = JSON.parse(data);
                            }
                            if (data.result.code == '000') {
                                location.href = ctx + '/myInfo/toUpdatePwd.do?uuid=' + (new Date()).getTime();
                            } else {
                                location.href = ctx + '/toMainIndex.do?uuid=' + (new Date()).getTime() + '&moduleId=' + moduleId;
                            }
                        },
                        error: function () {
                            location.href = ctx + '/toMainIndex.do?uuid=' + (new Date()).getTime() + '&moduleId=' + moduleId;
                        }
                    });
                } else if (data.redirectpath.indexOf("mdss") > 0) {
                    location.href = ctx + data.redirectpath.substring(0, data.redirectpath.indexOf("mdss=") - 1) + '#' + data.redirectpath.substring(data.redirectpath.indexOf("mdss=") + 5, data.redirectpath.length);
                } else if (data.redirectpath.indexOf("view_") > 0) {
                    location.href = ctx + data.redirectpath;
                }
            } else {
                //申报提醒
                //sbtx();
                //location.href = ctx + '/toMainIndex.do?uuid=' + (new Date()).getTime() + '&moduleId=' + moduleId;
            }
        } else {
            //如果是用户名或密码错误
            if (data.result.code == '204') {
                if (isEmpty(data.result.errorCount)) {
                    layer.msg(data.result.msg, { icon: 2 });
                } else if (data.result.errorCount < 5) {
                    layer.msg('密码输入错误' + data.result.errorCount + '次，连续输错5次该账户将被锁定！', { icon: 2 });
                } else if (data.result.errorCount >= 5) {
                    layer.msg('密码连续输入错误达到5次，该账户已被锁定！', { icon: 2 });
                }
            } else if (data.result.msg) {
                layer.msg(data.result.msg, { icon: 2 });
            } else {
                layer.msg('登录出错！', { icon: 2 });
            }
        }
    };


    return {
        getImage: getImage,
        unionLogin: unionLogin
    };
})(document, layer);

unionLogin.unionLogin('/wsbs');