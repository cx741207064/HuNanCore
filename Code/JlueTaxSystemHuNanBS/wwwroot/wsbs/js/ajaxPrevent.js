//刷新页面以后,所有请求重置
store.set("requestQueue", "");

function getRelativePath(url) {

    var paramIndex = url.indexOf("?");
    var anchorIndex = url.indexOf("#");
    if (anchorIndex < paramIndex) {
        return url.split("?")[0];
    } else if (paramIndex >= anchorIndex) {
        return url.split("#")[0];
    }

    return "";
}

//多次ajax请求拦截
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {

    var key = getRelativePath(options.url);
    //console.log("key======="+key);

    var requestQueue = {"data": []};
    try {
        if (JSON.parse(store.get("requestQueue")).data.length > 0) {
            requestQueue = JSON.parse(store.get("requestQueue"));
        }
    } catch (e) {
        requestQueue = {"data": []};
    }

    for (var i = 0; i < requestQueue.data.length; i++) {
        //if (requestQueue.data[i].key == key && key != '/fp/taxApplication/getMcList') {
        if (requestQueue.data[i].key == key) {
            jqXHR.abort();
            layer.msg("服务器正在努力加载中,请稍等片刻!", {icon: 4});
            return;
        }
    }
    requestQueue.data.push({"key": key});
    store.set("requestQueue", JSON.stringify(requestQueue));
    //var modulus, exponent;
    //if (options.type.toUpperCase() == "GET") {
    //    var index = options.url.indexOf("?");
    //    if (index > 0) {
    //        $.ajax({
    //            url: ctx + '/pkparam.do',
    //            type: 'POST',
    //            async: false,
    //            dataType: 'json',
    //            success: function (data) {
    //                modulus = data.modulus;
    //                exponent = data.exponent;
    //                // 页面里，Javascript对明文进行加密：
    //                var RSAkey = RSAUtils.getKeyPair(exponent, '', modulus);
    //                var encryurl;
    //                var str = options.url.substr(index + 1, options.url.length);
    //                alert(str);
    //                str = "encryurl=" + RSAUtils.encryptedString(RSAkey,encodeURIComponent("abcd=1111"));
    //                encryurl = options.url.substr(0, index + 1) + str;
    //                options.url = encryurl;
    //            },
    //            error: function (data) {
    //            }
    //        });
    //    }
    //}
    options.complete = function () {
        //console.log(getRelativePath(this.url));
        var requestQueue = JSON.parse(store.get("requestQueue"));
        for (var i = 0; i < requestQueue.data.length; i++) {
            if (requestQueue.data[i].key == getRelativePath(this.url)) {
                requestQueue.data.splice(i, 1);
                i--;
            }
        }
        store.set("requestQueue", JSON.stringify(requestQueue));
    };

});