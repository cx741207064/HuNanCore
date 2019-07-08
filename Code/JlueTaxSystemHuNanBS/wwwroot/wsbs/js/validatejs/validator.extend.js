/**
 * Desc: validator extend
 * Author: ljun
 * Date: 1/15/16-12:26
 * Version: v1.0
 */

/**
 * 是否为密码: 至少为数字,字母,特殊字符两种组合;6-16位
 */
validator.extend('isPassword', function (str) {
    var Modes = 0;
    for (var i = 0; i < str.length; i++) {
        Modes |= CharMode(str.charCodeAt(i));
    }
    return bitTotal(Modes) && validator.isLength(str, 6, 16);

    function CharMode(iN) {
        if (iN >= 48 && iN <= 57)//数字
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母
            return 2;
        if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
            return 4; //大小写
        else
            return 8; //特殊字符
    }

    function bitTotal(num) {
        var modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes > 1;
    }
});

/**
 * 是否为身份证
 */
validator.extend('isIDCard', function (str) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(str);
});

/**
 * 是否为证件号码
 */
validator.extend('isIDNum', function (str) {
    return validator.isLength(str, 6, 18) && validator.isAlphanumeric(str);
});

/**
 * 是否为电话号码
 */
validator.extend('isPhone', function (str) {
    return /^0\d{2,3}-?\d{7,8}$/.test(str);
});

/**
 * 是否为手机号码
 */
validator.extend('isPhoneNumber', function (str) {
    return /^1\d{10}$/.test(str);
});
