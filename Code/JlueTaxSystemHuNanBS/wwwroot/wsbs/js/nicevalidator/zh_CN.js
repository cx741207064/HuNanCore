/*********************************
 * Themes, rules, and i18n support
 * Locale: Chinese; 中文
 *********************************/
(function(factory) {
    if (typeof define === 'function') {
        define(function(require, exports, module){
            var $ = require('jquery');
            $._VALIDATOR_URI = module.uri;
            require('../src/jquery.validator.js')($);
            factory($);
        });
    } else {
        factory(jQuery);
    }
}(function($) {
    /* Global configuration
     */
    $.validator.config({
        //stopOnError: false,
        //theme: 'yellow_right',
        defaultMsg: "{0}格式不正确",
        loadingMsg: "正在验证...",
        focusCleanup: true,
        timely: 2,
        //focusInvalid: false,
        // Custom rules
        rules: {
            nsrsbh: function (element, params) {
                //^([0-9a-zA-Z]){15}$|^\1{17}$|^\1{18}$|^\1{20}$
                return /^([0-9a-zA-Z]){15,20}$/.test(element.value) ||
                    '只能是15到20位数字或字母,当前' + (element.value).length + '位';
            }
            ,
            agencyCreditCode: function (element, params) {
                return /^([0-9a-zA-Z]){18}$/.test(element.value) ||
                    '只能是18位数字或字母,当前' + (element.value).length + '位';
            }
            ,
            digits: [/^\d+$/, "请输入整数"]
            ,
            positive_digits: [/^[1-9]\d*$/, "请输入正整数"]
            ,
            letters: [/^[a-z]+$/i, "{0}只能输入字母"]
            ,
            tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$|^\d{7,8}$/, "电话格式应如：0731-88992611"]
            ,
            mobile: [/^1[3-9]\d{9}$/, "手机号格式不正确"]
            ,
            email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "邮箱格式不正确"]
            ,
            qq: [/^[1-9]\d{4,}$/, "QQ号格式不正确"]
            ,
            date: [/^\d{4}-\d{1,2}-\d{1,2}$/, "请输入正确的日期,例:yyyy-MM-dd"]
            ,
            onlyYear: [/^\d{4}$/, "请输入正确的日期,例:yyyy"]
            ,
            time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请输入正确的时间,例:14:30或14:30:00"]
            ,
            datetime: [/^\d{4}-\d{1,2}-\d{1,2}\s([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请输入正确的日期,例:yyyy-MM-dd HH:mm:ss"]
            ,
            ID_card: [/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/, "请输入正确的身份证号码"]
            ,
            lxr: [/^[\u0391-\uFFE5]{2,8}$|^([A-Za-z]{1,10}\s?){1,3}$/, "请输入2到8位中文，或英文名"]
            ,
            url: [/^(https?|ftp):\/\/[^\s^\u4e00-\u9fa5]+$/i, "网址格式不正确"]
            ,
            postcode: [/^[0-9]{6}$/, "邮政编码格式不正确"]
            ,
            chinese: [/^[\u0391-\uFFE5]+$/, "请输入中文"]
            ,
            chineseName: [/^[\u0391-\uFFE5]{2,25}$/, "请输入中文,2-25位"]
            ,
            username: [/^\w{6,20}$/, "请输入6-15位数字、字母、下划线"]
            ,
            password: [/^[0-9a-zA-Z]{6,16}$/, "密码由6-16位数字、字母组成"]
            ,
            password1: [/^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}$/, "密码由8-16位数字、字母、和特殊字符中至少两种组成"]
            ,
            je_0: [/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/, "含税销售额必须大于0"]
            ,
            je: [/^\d{1,14}$|^\d{1,14}\.\d{1,2}$/, "请输入小于15位的整数或整数加1-2位小数,如9.10"]
            ,
            je_VatOff: [/^\d{1,14}$|^\d{1,14}\.\d{1,2}$/, "可抵免增值税数额不合法"]
            ,
            je1: [/^\d{1,13}$|^\d{1,13}\.\d{1,2}$/, "请输入小于13位的整数或整数加1-2位小数,如9.10"]
            ,
            je2: [/^\d{1,10}$|^\d{1,10}\.\d{1,3}$/, "请输入小于10位的整数或整数加1-3位小数,如9.100"]
            ,
            je4: [/^\d{1,15}$|^\d{1,15}\.\d{1,4}$/, "请输入小于15位的整数或整数加1-4位小数,如9.1000"]
            ,
            je6: [/^\d{1,15}$|^\d{1,15}\.\d{1,6}$/, "请输入小于15位的整数或整数加1-6位小数,如9.100000"]
            ,
            je8: [/^\d{1,15}$|^\d{1,15}\.\d{1,8}$/, "请输入小于15位的整数或整数加1-8位小数,如9.10000000"]
            ,
            je_12: [/^\d{1,12}$|^\d{1,12}\.\d{1,2}$/, "请输入小于等于12位的整数或整数加1-2位小数,如9.10"]
            ,
            je_13: [/^\d{1,13}$|^\d{1,13}\.\d{1,2}$/, "请输入小于等于13位的整数或整数加1-2位小数,如9.10"]
            ,
            je_15: [/^\d{1,15}$|^\d{1,15}\.\d{1,2}$/, "请输入小于等于15位的整数或整数加1-2位小数,如9.10"]
            ,
            je_15_n: [/^[\-\+]?\d{1,15}$|^[\-\+]?\d{1,15}\.\d{1,2}$/, "请输入最大15位的整数或整数加1-2位小数，可输入负数，如-9.10"]
            ,
            je_16: [/^\d{1,16}$|^\d{1,16}\.\d{1,2}$/, "请输入小于等于16位的整数或整数加1-2位小数,如12345678.81"]
            ,
            je_16n: [/^[\-\+]?\d{1,16}$|^[\-\+]?\d{1,16}\.\d{1,2}$/, "请输入小于等于16位的整数或整数或负数加1-2位小数,如12345678.81"]
            ,
            num: [/^\d{1,14}$|^\d{1,14}\.\d{1,2}$/, "请输入整数或整数加1-2位小数,如9.00)"]
            ,
            smalNum: [/^0\.\d{1,2}$/, "请输入小数,格式如:0.10"]
            ,
            bl: [/^1$|^0\.\d{1,6}$/, "输入1或小于1的小数(小数位最多6位)"]
            ,
            bl4: [/^0$|^1$|^0\.\d{1,4}$/, "输入0、1或小于1的小数(小数位最多4位)"]
            ,
            bl0: [/^0|^1$|^0\.\d{1,7}$/, "输入0、1或小于1的小数(小数位最多6位)"]
            ,
            bl1: [/^0$|^1$|^0\.\d{1,6}$/, "输入0到1之间的数值(小数位最多2位)"]
            ,
            bl2: [/^1$|^0\.\d{1,6}$/, "输入大于0小于等于1之间的数值(小数位最多6位)"]
            ,
            smallAmount: [/^\d{1,7}$|^\d{1,7}\.\d{1,2}$/, "小额最多为7位整数加2位小数"]
            ,
            je17: [/^\d{1,8}$|^\d{1,8}\.\d{1,2}$/, "请输入小于等于8位的整数或整数加1-2位小数,如9.10"]
            ,
            je17_n: [/^[\-\+]?\d{1,8}$|^[\-\+]?\d{1,8}\.\d{1,2}$/, "请输入小于等于8位的整数或整数加1-2位小数，可输入负数，如-9.10"]
            ,
            je18: [/^\d{1,3}$|^\d{1,3}\.\d{1,4}$/, "请输入小于等于3位的整数或整数加1-4位小数,如9.10"]
            ,
            je19: [/^\d{1,12}$|^\d{1,12}\.\d{1,6}$/, "请输入小于等于12位的整数或整数加1-6位小数,如9.10"]
            ,
            dw1: [/^\d{1,6}$|^\d{1,6}\.\d{1,2}$/, "请输入小于等于6位的整数或整数加1-2位小数,如9.10"]
            ,
            szzm: [/^[0-9a-zA-Z]+$/, "只能是数字或字母"]
            ,
            nottszf: [/^[a-zA-Z\d\u4E00-\u9FA5]+$/i, "只能是中文字母或数字"]
            ,
            ctszf: [/^[a-zA-Z\d\u4E00-\u9FA5，。；：（）【】{}、\-\/]+$/i, "只能是中文字母或数字或，。；：（）【】{}-/、"]
            ,
            chineseEnglish: [/^[a-zA-Z\u4E00-\u9FA5]+$/i, "只能是中文或字母"]
            ,
            telmobilefp: [/^\d+(\-\d+)?$/, "电话格式错误,只能是数字或数字带-"]
            ,
            telmobile: [/^((?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$)|^\d{7,8}$|^1[3-9]\d{9}$/, "手机或电话格式不正确"]
            ,
            zzjgdm: [/^[0-9a-zA-Z]{9}$/, "请输入9位数字或字母"]   //组织机构代码，只能是9位数字或字母的组合
            ,
            xm: [/^[\u4E00-\u9FA5]{2,8}$/, "姓名须为汉字，长度为2-8个字符"]
            ,
            quarter_bbq: [/^([1-9]\d{3})年第(一|二|三|四)季度$/, "系统固定报送属期标准格式：XXXX年第X季度如2017年第三季度"]
            ,
            maxLength: [/^[\s\S]{1,500}$/, "长度为1-500个字符"]
            ,
            bzLength: [/^[\s\S]{1,1000}$/, "长度为1-1000个字符"]
            ,
            bfb: [/^(\d{1,2}(\.\d{1,2})?|100?|100.00)%$/, "请输入0%-100%之间的数字"]
            ,
            bfbl: [/^(\d{0,2}(\.\d{1,2})?|100?|100.00)$/, "请输入0-100之间的数字"]
            ,
            hhryqtry_01: [/^(\d{17}|[a-zA-Z]\d{14})$/, "律师证书编号应为17位数字或一位字母+14位数字"]
            ,
            hhryqtry_06: [/^(\d{12}$|[a-zA-z]{2}\d{9})$/, "注册会计师证书编号应为12位数字或两位字母+9位数字"]
            ,
            hhryqtry_39: [/^\d{7,8}$|^[S]{1}[W]{1}\d{8}$|^[R]{1}[D]{1}\d{1,10}$|^\d{13}$/, "税务师证书编号应为7位数字、8位数字或SW+8位数字或RD+10位及以下数字或13位数字"]
            ,
            ajbh:  [/^[0-9a-zA-Z]{0,20}$/, "请输入20位以内数字或字母"]
            ,
            ajmc:  [/^[/\s/\S]{0,150}$/, "请输入150位以内字符"]
            ,
            szzm60:  [/^[0-9a-zA-Z]{0,60}$/, "请输入60位以内数字或字母"]
            ,
            validateKjskrq: function (element, name){
                var value = element.value;
                var split = value.split("-");
                return split[2] <=30  || "您办理的业务已逾期，请前往主管税务机关大厅办理";
            },
            containSpecial: function(element, param){

                var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
                if(containSpecial.test(element.value)){
                    return "不能录入特殊字符";
                }else{
                    return true;
                }
            },
            tzbl: function (element, _name) {
                var total = 0;
                var res = true;
                $('#c_addTable7').find('input[name=' + _name + ']').each(function () {
                    total = total + Number($(this).val());
                })
                // if (total != 1){
                //     alert('投资方的投资比例相加必须为1。');
                //     return;
                // }
                res = (total.toFixed(6) == 1.000000);
                return res === true || "投资方的投资比例相加必须为1";
            },

            lsnsrtzbl: function (element, _name) {
                var total = 0;
                var res = true;
                $('#temp_addTable7').find('input[name=' + _name + ']').each(function () {
                    total = total + Number($(this).val());
                })
                // if (total != 1){
                //     alert('投资方的投资比例相加必须为1。');
                //     return;
                // }
                res = (total.toFixed(6) == 1.000000);
                return res === true || "投资方的投资比例相加必须为1";
            }
            ,
            tzftzje: function (element, _name) {
                var total = 0;
                var res = true;
                var tzze = Number($("#tzze").val());
                $('#c_addTable7').find('input[name=' + _name + ']').each(function () {
                    total = total + Number($(this).val());
                })
                total = total * 10000;
                res = (total <= tzze);
                return res === true || "投资方投资金额大于投资总额。";
            }
            ,
            gytzbl :function (element,params){
                var res = true;
                var gykglx = $('#gykglx').val();
                if (gykglx == 1 && Number(element.value) <= 0.5) {
                    res = false;
                }
                return res === true || "国有控股类型为国有绝对控股时，<br/>国有投资比例不得小于50%";
            }
            ,
            sum_bl_eq_1: function (element, params) {
                var res = true;
                var id1 = params[0];
                var id2 = params[1];
                var id3 = params[2];
                var val1 = 0;
                var val2 = 0;
                var val3 = 0;
                if (!isEmpty($("#" + id1).val())) {
                    val1 = $("#" + id1).val();
                }
                if (!isEmpty($("#" + id2).val())) {
                    val2 = $("#" + id2).val();
                }
                if (!isEmpty($("#" + id3).val())) {
                    val3 = $("#" + id3).val();
                }
                var sum = Number(val1) * 1000000 + Number(val2) * 1000000 + Number(val3) * 1000000;
                sum = sum / 1000000;
                res = (1.000000 == sum.toFixed(6) || 1.000000 > sum.toFixed(6));
                return res === true || "自然人投资比例、外资投资比例、国有投资比例之和必须小于等于1";
            }
            ,
            sfzhm: function (element, params) {
                var res = true;
                var array = element.id.split('_');
                if ($('#sfzlx_' + array[1]).val() == '201') {
                    /*var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    if (reg.test(element.value) === false) {
                        res = false;
                    }  */
                    res = IdentityCodeValid(element.value);
                }
                return res === true || "身份证号码格式有误";
            }
            ,
            ID_card2: function (element, params) {
                var res = true;
                var array = element.id.split('_');
                res = IdentityCodeValid(element.value);
                return res === true || "身份证号码格式有误";
            }
            ,
            accept: function (element, params) {
                if (!params) return true;
                var ext = params[0];
                return (ext === '*') ||
                    (new RegExp(".(?:" + (ext || "png|jpg|jpeg|gif") + ")$", "i")).test(element.value) ||
                    this.renderMsg("只接受{1}后缀", ext.replace('|', ','));
            },
            yzm: function (element, params) {
                var data = {
                    code: $("#yzm").data('code'),
                    ctm: $("#yzm").data('ctm'),
                    input: $("#yzm").val()
                };
                return $.rest.post({
                    url: ctx + '/check',
                    data: data,
                    async: false,
                    success: function (result) {
                        if (result.error != null) {
                            getImage();
                        }
                    }
                });
            },
            kprqz: function (element, params) {
                var res = false;
                var array = element.id.split('_');
                var dt1 = $('#kprqq_' + array[1]).val();
                var dt2 = element.value;
                dt1 = new Date(dt1.replace(/-/g, "/"));
                dt2 = new Date(dt2.replace(/-/g, "/"));
                if ((element.value >= $('#kprqq_' + array[1]).val()) && (dt1.getFullYear() == dt2.getFullYear() && dt1.getMonth() == dt2.getMonth())) {
                    res = true;
                }
                return res === true || "在同一月份且不能小于开票起始时间";
            },
            validateJZDate: function (element, params) {
                var array = element.id.split('_');
                return (element.value >= $('#sssqQ_' + array[1]).val()) || "截止时间不能小于开始时间";
            },
            validateTyDate: function (element, params) {
                return (element.value < $('#tyqxz').val()) || "停业期限起不能大于停业期限止";
            },
            validateYxqzDate: function (element, params) {
                if($('#yxqz_0').val() != ''){
                    return (element.value < $('#yxqz_0').val()) || "有效期起不能大于有效期止";
                }
            },
            validateQssqqDate: function (element, params) {
                if($('#qssqz').val() != ''){
                    return (element.value < $('#qssqz').val()) || "清算期间起不能大于清算期间止";
                }
            },
            validateSsqzDate: function (element, params) {
                if($('#skssqz').val() != ''){
                    return (element.value < $('#skssqz').val()) || "所属期起不能大于所属期止";
                }
            },
            validateDezxqq: function (element, params) {
                var flag = false;
                var sfrdjbbz = $('#sfrdjbbz').val();
                var value = element.value;
                if(sfrdjbbz == 'Y'){
                    if(value != ''){
                        var split = value.split('-');
                        if(split[1] != '01' && split[1] != '04' && split[1] != '07' && split[1] != '10' && split[2] !='01'){
                            return (flag) || "核定有效期起须为季初";
                        }
                    }
                }else{
                    var today = new Date();
                    var year = today.getFullYear();
                    var month = today.getMonth();
                    if(month == 0){
                        month = 12;
                        year = year - 1;
                    }
                    if(value != ''){
                        var split = value.split('-');
                        if(year != split[0] || split[1] < month || split[2] != '01'){
                            return (flag) || "核定有效期起不能早于上月月初";
                        }
                    }
                }
            },
            validateHdyxq: function (element, params) {
                //var dezxqz = element.value;
                //var dezxqq = $('#dezxqq').val();
                //dezxqq = dezxqq.replaceAll('-','');
                //if(dezxqq != '' && ){
                //    dezxqz = dezxqz.replaceAll('-','');
                //    return (Number(dezxqq) > Number(dezxqz)) || "核定有效期止不能小于核定有效期起";
                //}
                return (element.value > $('#dezxqq').val()) || "核定有效期止不能小于核定有效期起";
            },
            validateHdyxqz: function (element, params) {
                if (element.value != '' && $('#dezxqq').val() != '') {
                    //var today = new Date();
                    //var year = today.getFullYear();
                    var yxqq = $('#dezxqq').val();
                    var arrs = element.value.split("-");
                    var yxqqArrs = yxqq.split("-");
                }
                //return (arrs[0] == year ) || "核定有效期止不能超过申请年度的12月31日";
                return (arrs[0] == yxqqArrs[0] ) || "核定有效期止不能超过申请年度的12月31日";
            },
            validateNowDate: function (element, params) {
                if (element.value != '') {
                    var today = new Date();
                    var month = today.getMonth() + 1;
                    var nowDate = today.getFullYear() + "-" + month + "-" + today.getDate();
                    var arr = nowDate.split("-");
                    var starttime = new Date(arr[0], arr[1], arr[2]);
                    var starttimes = starttime.getTime();

                    var arrs = element.value.split("-");
                    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
                    var lktimes = lktime.getTime();
                    return (lktimes <= starttimes) || "不能大于当前日期";

                }
            },
            validateXYNowDate: function (element, params) {
                if (element.value != '') {
                    var today = new Date();
                    var month = today.getMonth() + 1;
                    var nowDate = today.getFullYear() + "-" + month + "-" + today.getDate();
                    var arr = nowDate.split("-");
                    var starttime = new Date(arr[0], arr[1], arr[2]);
                    var starttimes = starttime.getTime();

                    var arrs = element.value.split("-");
                    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
                    var lktimes = lktime.getTime();
                    return (lktimes >= starttimes) || "不能小于当前日期";
                }
            },
            validateKHDate: function (element, params) {
                if (element.value != '') {
                    var today = new Date();
                    var month = today.getMonth() + 1;
                    var nowDate = today.getFullYear() + "-" + month + "-" + today.getDate();
                    var arr = nowDate.split("-");
                    var starttime = new Date(arr[0], arr[1], arr[2]);
                    var starttimes = starttime.getTime();

                    var arrs = element.value.split("-");
                    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
                    var lktimes = lktime.getTime();
                    return (lktimes <= starttimes) || "开户时间不能大于当前时间";
                }
            },
            validateYHKHDJZHDate: function (element, params) {
                var array = element.id.split('_');
                var zhxz = $('#zhxz_' + array[1]).val();
                //网上存款账户账号备案，账户性质为基本存款账户或专用存款账户或临时存款账户时，银行开户登录证号应为必录
                if (zhxz == '1110' || zhxz == '1130' || zhxz == '1140') {
                    if (isEmpty($.trim(element.value))) {
                        return '不能为空';
                    }
                }
            },
            validateFFRQDate: function (element, params) {
                var array = element.id.split('_');
                var zhxz = $('#zhxz_' + array[1]).val();
                //网上存款账户账号备案，账户性质为基本存款账户或专用存款账户或临时存款账户时，银行开户登录证号应为必录
                if (zhxz == '1110' || zhxz == '1130' || zhxz == '1140') {
                    if (isEmpty($.trim(element.value))) {
                        return '不能为空';
                    }
                }
            },
            validateKH1Date: function (element, params) {
                if (element.value != '') {
                    var array = element.id.split('_');
                    if($('#ffrq_' + array[1]).val() != ''){
                        return (element.value <= $('#ffrq_' + array[1]).val()) || "开户时间不能晚于发证日期";
                    }
                }
            },
            validateBGDate: function (element, params) {
                if (element.value != '') {
                    var array = element.id.split('_');
                    return (element.value >= $('#khsj_' + array[1]).val()) || "变更时间不能小于开户时间";
                }
            },
            validateQXDate: function (element, params) {
                if (element.value != '') {
                    return (element.value >= $('#scjyqxq').val()) || "生产经营期限止不能小于生产经营期限起";
                }
            },
            validateScjyqxq: function (element, params) {
                if (element.value != '') {
                    return (element.value >= $('#kyslrq').val()) || "生产经营期限起不能小于开业（设立）日期";
                }
            },
            validatebgsjDate: function (element, params) {
                if (element.value != '') {
                    var array = element.id.split('_');
                    return (new Date(element.value) >= new Date($("#khsj_" + array[1]).val())) || "变更时间不能小于开户时间";
                }
            },
            validateZX1Date: function (element, params) {
                if (element.value != '') {
                    var array = element.id.split('_');
                    return (element.value >= $('#khsj_' + array[1]).val()) || "注销时间不能小于开户时间";
                }
            },
            validateZX2Date: function (element, params) {
                if (element.value != '') {
                    var array = element.id.split('_');
                    if ($('#bgsj_' + array[1]).val() != '') {
                        return (element.value >= $('#bgsj_' + array[1]).val()) || "注销时间不能小于变更时间";
                    }
                }
            },
            validateSeDate: function (element, params) {
                if (element.value != '') {
                    var ljysfwxsejssjq = $('#ljysfwxsejssjq').val();
                    var ljysfwxsejssjz = $('#ljysfwxsejssjz').val();
                    var arr = ljysfwxsejssjq.split("-");
                    var arr1 = ljysfwxsejssjz.split("-");
                    var starttime = new Date(arr[0], arr[1], arr[2]);
                    var endtime = new Date(arr1[0], arr1[1], arr1[2]);
                    var starttimes = starttime.getTime();
                    var endtimes = endtime.getTime();
                    return (endtimes >= starttimes) || "应税服务销售额计算时间止不能小于应税服务销售额计算时间起";
                }
            },
            validateHwDate: function (element, params) {
                if (element.value != '') {
                    var ljyshwxsejssjq = $('#ljyshwxsejssjq').val();
                    var ljyshwxsejssjz = $('#ljyshwxsejssjz').val();
                    var arr = ljyshwxsejssjq.split("-");
                    var arr1 = ljyshwxsejssjz.split("-");
                    var starttime = new Date(arr[0], arr[1], arr[2]);
                    var endtime = new Date(arr1[0], arr1[1], arr1[2]);
                    var starttimes = starttime.getTime();
                    var endtimes = endtime.getTime();
                    return (endtimes >= starttimes) || "应税货物销售额计算时间止不能小于应税货物销售额计算时间起";
                }
            },
            validateTdse: function(element, params) {
                if (element.value != '') {
                    var array = element.id.split('_');
                    return (Number(element.value) <= Number($('#syktdje_' + array[1]).val())) || "申请退抵多缴税费额不能大于尚余可退抵金额";
                }
            },
            validateYqjnse: function(element, params) {
                if (element.value != '') {
                    var array = element.id.split('_');
                    return (parseFloat(element.value) <= parseFloat($('#ynse_' + array[1]).val())) || "申请延期缴纳税额不能大于应纳税额";
                }
            },

            validateSKSSQDate: function (element, params) {
                if (element.value != '' && $('#skssqz').val() != '') {
                    return (element.value <= $('#skssqz').val()) || "税款所属期起不能大于税款所属期止";
                }
            },
            validateWtdzsbSkssqz: function (element, params) {
                if (element.value != '' && $('#skssqq1').val() != '') {
                    return (element.value >= $('#skssqq1').val()) || "税款所属期止不能小于税款所属期起";
                }
            },
            validateJKRQDate: function (element, params) {
                if (element.value != '' && $('#jkrqz').val() != '') {
                    return (element.value <= $('#jkrqz').val()) || "缴（退）款日期起不能大于缴（退）款日期止";
                }

            },
            validateYXQDate: function (element, params) {
                return (element.value >= $('#yxqq').val()) || "有效期止不能小于有效期起";
            },
            validateZZQDate: function (element, params) {
                return (element.value >= $('#zzrqq').val()) || "中止日期止不能小于中止日期起";
            },
            validateHTYXQDate: function (element, params) {
                var array = element.id.split('_');
                return (element.value >= $('#wcjylwyxqxq_' + array[1]).val()) || "有效期止不能小于有效期起";
            },
            validateHWYXQDate: function (element, params) {
                var array = element.id.split('_');
                return (element.value >= $('#wcjyhwyxqxq_' + array[1]).val()) || "有效期止不能小于有效期起";
            },
            fpzh: function (element, params) {
                var array = element.id.split('_');
                return (element.value - $('#' + params[0] + '_' + array[1]).val() >= 0) || "不能小于发票起始号码";
            },
            kpfs: function (element, params) {
                var array = element.id.split('_');
                if ($('#' + params[0] + '_' + array[1]).val() == '' || $('#' + params[0] + '_' + array[1]).val()) {
                    //如果起号或止号未填，则不进行本验证（验证份数是否正确）
                    return true;
                } else {
                    return ((element.value - 1) === ($('#' + params[1] + '_' + array[1]).val() - $('#' + params[0] + '_' + array[1]).val())) || "发票份数与填写的发票起止号码结算不一致";
                }

            },
            yjse: function (element, params) {
                var isTrue = true;
                var array = element.id.split('_');
                var rate = FormatNumber(element.value / $('#je_' + array[1]).val(), 4) * 100;
                if (($('#je_' + array[1]).val() - element.value) <= 0 || element.value <= 0 || rate > 17.5 || rate < 1) {
                    isTrue = false;
                }
                if (element.value == 0) {
                    isTrue = true;
                }
                return isTrue === true || "应不大于金额*17.5%且不小于金额*1%";
            },
            zffphmIsContainYjfphm: function (element, params) {
                var totalresult = false;

                var array = element.id.split('_');
                var isGteYjqh = false, isLteYjzh = false;
                $('#table_fpyj').find('input[name=fpqh]').each(function () {
                    //判断当前一条作废/红字发票信息  与   总信息中记录中“起号”关系
                    if ($('#' + params[0] + '_' + array[1]).val() - $(this).val() >= 0) {
                        isGteYjqh = true;
                    } else {
                        isGteYjqh = false;
                    }
                    //alert('作废发票止号='+$('#' + params[1] + '_' + array[1]).val());
                    //alert('可验旧发票止号'+$(this).parent().parent().find("input[name=fpzh]:eq(0)").val());
                    //判断当前一条作废/红字发票信息  与   总信息中记录中“止号”关系
                    if ($('#' + params[1] + '_' + array[1]).val() - $(this).parent().parent().find("input[name=fpzh]:eq(0)").val() <= 0) {
                        isLteYjzh = true;
                    } else {
                        isLteYjzh = false;
                    }
                    //alert('isGteYjqh='+isGteYjqh+'| isLteYjzh='+isLteYjzh);
                    if (isGteYjqh === true && isLteYjzh === true) {
                        totalresult = true;
                    }
                });
                return (totalresult === true) || "不在验旧列表范围内";
            },
            zffp_hzfp_rq_IsContainYjfphm: function (element, params) {
                //判断作废票/红字票日期是否在 总发票信息范围中，首先判断号码范围在某条总信息中，再看日期是否在范围中

                var totalresult = false;

                var isInDmRange = false;
                var array = element.id.split('_');

                $('#table_fpyj').find('input[name=fpqh]').each(function () {
                    var isGteYjqh = false, isLteYjzh = false;
                    var isInThisLineDmRange = false;
                    var isInThisLineTimeRange = false;  //是否在号码范围内，是否在时间范围内

                    //判断当前一条作废/红字发票信息  与   总信息中记录中“起号”关系
                    if ($('#' + params[0] + '_' + array[1]).val() - $(this).val() >= 0) {
                        isGteYjqh = true;
                    }
                    //判断当前一条作废/红字发票信息  与   总信息中记录中“止号”关系
                    if ($('#' + params[1] + '_' + array[1]).val() - $(this).parent().parent().find("input[name=fpzh]:eq(0)").val() <= 0) {
                        isLteYjzh = true;
                    }
                    if (isGteYjqh === true && isLteYjzh === true) {
                        //在号码范围内
                        isInDmRange = true;
                        isInThisLineDmRange = true;
                    }

                    if (isInThisLineDmRange = true) {
                        var zf_hz_date = ($('#' + array[0] + '_' + array[1]).val()); //作废，红字发票的开票时间
                        var timestamp1 = new Date(Date.parse(zf_hz_date.replace(/-/g, "/")));
                        timestamp1 = timestamp1.getTime();

                        var kprqq = $(this).parent().parent().find("input[name=kprqq]:eq(0)").val();  //已开具发票总信息中当条记录的开启日期起
                        var timestamp2 = new Date(Date.parse(kprqq.replace(/-/g, "/")));
                        timestamp2 = timestamp2.getTime();

                        var kprqz = $(this).parent().parent().find("input[name=kprqz]:eq(0)").val();  //已开具发票总信息中当条记录的开启日期止
                        var timestamp3 = new Date(Date.parse(kprqz.replace(/-/g, "/")));
                        timestamp3 = timestamp3.getTime();


                        if (timestamp2 <= timestamp1 && timestamp1 <= timestamp3) {
                            isInThisLineTimeRange = true;
                        } else {
                            isInThisLineTimeRange = false;
                        }

                        //alert('isInDmRange='+isInDmRange);
                        //alert('isInThisLineTimeRange='+isInThisLineTimeRange);

                        if (totalresult == true) {

                        } else if (isInDmRange == true && isInThisLineTimeRange == true) {
                            totalresult = true;
                        } else if (isInDmRange == true && isInThisLineTimeRange == false) {
                            totalresult = false;
                        }
                        //isInThisLineDmRange = false;
                    }
                });
                if (isInDmRange == false) {  //不在号码范围内，就不用判断时间是否在范围内了
                    totalresult = true;
                }
                return (totalresult === true) || "不在验旧时间范围内";
            },

            zf_IsIn_hz: function (element, params) {
                //作废发票在红字发票列表中
                var totalresult = true;  //通过验证为true

                var array = element.id.split('_');
                var isAfter_Zfqh = false, isBefore_Zfzh = false;
                $('#table_hzfp').find('input[name=hzfpqh]').each(function () {
                    //判断当前一条作废/红字发票信息  与   总信息中记录中“起号”关系
                    if (element.value - $(this).val() >= 0 && element.value - $(this).parent().parent().find("input[name=hzfpzh]:eq(0)").val() <= 0) {
                        totalresult = false;
                    }
                });
                return (totalresult === true) || "作废发票与红字发票有重复";
            },
            hz_IsIn_zf: function (element, params) {
                //红字发票在作废发票列表中
                var totalresult = true;

                var array = element.id.split('_');
                var isAfter_Zfqh = false, isBefore_Zfzh = false;
                $('#table_fpzf').find('input[name=zffpqh]').each(function () {
                    //判断当前一条作废/红字发票信息  与   总信息中记录中“起号”关系
                    if (element.value - $(this).val() >= 0 && element.value - $(this).parent().parent().find("input[name=zffpzh]:eq(0)").val() <= 0) {
                        totalresult = false;
                    }
                });
                return (totalresult === true) || "红字发票与作废发票有重复";
            },

            isMulti: function (element) {
                var array = element.id.split('_');
                var isContain = true;
                $('select[name=' + array[0] + ']').each(function () {
                    if ($(this).attr("id") != element.id && (element.value == $(this).val())) {
                        isContain = false;
                    }
                });
                return (isContain === true) || "重复条目";
            },
            ID_card_Must: function (element, params) {
                var isContain = true;
                var id = params[0];
                var index = element.id.split('_');
                var typeCode = $("#" + id).val();
                if (!isEmpty(index[1])) {
                    typeCode = $("#" + id + "_" + index[1]).val();
                }
                if ("201" == typeCode) {
                    isContain = IdentityCodeValid(element.value);
                    /*isContain = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/.test(element.value);*/
                }
                return (isContain === true) || "身份证号码不正确";
            },
            ifput_line_must: function (element, params) {
                var isContain = true;
                var index = element.id.split('_');
                var length = params.length;
                var S = "";
                for (i = 0; i < length; i++) {
                    var value = $("#" + params[i] + "_" + index[1]).val();
                    if (isEmpty(value) || " " == value) {
                        S = S + "Y"
                    } else {
                        S = S + "X"
                    }
                }
                var ind1 = S.indexOf("XY");
                var ind2 = S.indexOf("YX");
                if (-1 != ind1 || -1 != ind2) {
                    isContain = false;
                }
                return (isContain === true) || "该行内容不完整";
            },
            mustChose: function (element) {
                var result = true;
                var bgxmDm = element.value;
                var bgxmDms = "";
                var msg = "请同时修改该人的身份证件种类、证件号码、移动电话信息";
                var msg1 = "对应身份证件种类、证件号码需同时修改(确认)";
                var msg2 = "该行变更后值对应的身份证号码格式不正确";
                if ("030" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("031") == -1 || bgxmDms.indexOf("032") == -1 || bgxmDms.indexOf("034") == -1) {
                        result = false;
                        return result === true || msg;
                    }
                }
                if ("036" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("037") == -1 || bgxmDms.indexOf("038") == -1 || bgxmDms.indexOf("040") == -1) {
                        result = false;
                        return result === true || msg;
                    }
                }
                if ("042" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("043") == -1 || bgxmDms.indexOf("044") == -1 || bgxmDms.indexOf("046") == -1) {
                        result = false;
                        return result === true || msg;
                    }
                }
                if ("086" == bgxmDm) {//业主姓名
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("091") == -1 || bgxmDms.indexOf("092") == -1 || bgxmDms.indexOf("089") == -1) {
                        result = false;
                        return result === true || msg;
                    }
                }

                //证件类型与证件号码必同时修改
                if ("031" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("032") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                }
                if ("032" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("031") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                    //身份证校验
                    var bflage = null;
                    $("#addTable_1").find('select[name="bgxmDm"]').each(function () {
                        if ("031" == $(this).val()) {
                            var lxHz = $(this).parent().siblings().find('select[name="bghz"]').val().split("#")[0];
                            if ("201" == lxHz && bflage == null) {
                                var bghzHm = $(element).parent().siblings().find('input[name="bghz"]').val();
                                bflage = IdentityCodeValid(bghzHm);
                            }
                        }
                    });
                    if (bflage != null && !bflage) {
                        return msg2;
                    }
                }

                if ("037" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("038") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                }
                if ("038" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("037") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                    //身份证校验
                    var bflage = null;
                    $("#addTable_1").find('select[name="bgxmDm"]').each(function () {
                        if ("037" == $(this).val()) {
                            var lxHz = $(this).parent().siblings().find('select[name="bghz"]').val().split("#")[0];
                            if ("201" == lxHz && bflage == null) {
                                var bghzHm = $(element).parent().siblings().find('input[name="bghz"]').val();
                                bflage = IdentityCodeValid(bghzHm);
                            }
                        }
                    });
                    if (bflage != null && !bflage) {
                        return msg2;
                    }
                }

                if ("043" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("044") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                }
                if ("044" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("043") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                    //身份证校验
                    var bflage = null;
                    $("#addTable_1").find('select[name="bgxmDm"]').each(function () {
                        if ("043" == $(this).val()) {
                            var lxHz = $(this).parent().siblings().find('select[name="bghz"]').val().split("#")[0];
                            if ("201" == lxHz && bflage == null) {
                                var bghzHm = $(element).parent().siblings().find('input[name="bghz"]').val();
                                bflage = IdentityCodeValid(bghzHm);
                            }
                        }
                    });
                    if (bflage != null && !bflage) {
                        return msg2;
                    }
                }
                if ("091" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("092") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                }
                if ("092" == bgxmDm) {
                    $('select[name="bgxmDm"]').each(function () {
                        bgxmDms = bgxmDms + "," + $(this).val();
                    });
                    if (bgxmDms.indexOf("091") == -1) {
                        result = false;
                        return result === true || msg1;
                    }
                    //身份证校验
                    var bflage = null;
                    $("#addTable_1").find('select[name="bgxmDm"]').each(function () {
                        if ("091" == $(this).val()) {
                            var lxHz = $(this).parent().siblings().find('select[name="bghz"]').val().split("#")[0];
                            if ("201" == lxHz && bflage == null) {
                                var bghzHm = $(element).parent().siblings().find('input[name="bghz"]').val();
                                bflage = IdentityCodeValid(bghzHm);
                            }
                        }
                    });
                    if (bflage != null && !bflage) {
                        return msg2;
                    }
                }
            },
            chgTaxHz: function (element, params) {//税务变更登记后值校验
                var isTrue = true;
                var errorMsg = "格式不正确";
                var $validateStr = $(element).attr("validateStr");
                if (!isEmpty($validateStr)) {
                    var $valid = $validateStr.split("#")[0];
                    var reg = eval($.trim($valid));
                    errorMsg = $validateStr.split("#")[1];
                    isTrue = reg.test($.trim(element.value));
                }
                return (isTrue === true) || errorMsg;
            },
            bgjgry: function (element, params) {
                var isTrue = true;
                var errorMsg = $(element).attr("msg");
                var $validateStr = $(element).attr("validateStr");
                if (!isEmpty($validateStr)) {
                    var $valid = $validateStr;
                    var reg = eval($.trim($valid));
                    isTrue = reg.test($.trim(element.value));
                }
                return (isTrue === true) || errorMsg;
            },
            fphmIsRepeat: function (element, params) {
                var isTrue = true;
                $('#' + params[0]).find('tr').each(function () {
                    if ($(this).find('input[name=' + params[3] + ']').attr('id') != element.id) {
                        if ((element.value - $(this).find('input[name=' + params[1] + ']').val() >= 0)
                            && (element.value - $(this).find('input[name=' + params[2] + ']').val() <= 0)) {
                            isTrue = false;
                        }
                    }
                });
                return (isTrue === true) || "不能在其它添加行的发票起止范围内";
            },
            isDate: function (element, params) {
                var res = true;
                if (element.value != '') {
                    res = (new RegExp("/^\d{4}-\d{1,2}-\d{1,2}$/", "i")).test(element.value);
                }
                return res === true || "日期格式错误";
            },
            cpzgsl: function (element, params) {//发票票种核定 持票最高数量
                var array = element.id.split('_');
                var fpzl = $('#fpzlDm_' + array[1]).find('option:selected').text();
                if (fpzl.indexOf('定额') >= 0) {
                    if (!isEmpty($.trim(element.value))) {
                        return /^[1-9]\d*$/.test(element.value.trim()) || '只能是正整数';
                    }
                    return true;
                } else {
                    if (isEmpty($.trim(element.value))) {
                        return '不能为空';
                    } else {
                        var isTrue = /^[1-9]\d*$/.test(element.value.trim());
                        if (!isTrue) {
                            return '只能是正整数';
                        }
                    }
                }
                return (element.value - $('#mczglpsl_' + array[1]).val() >= 0) || "应不小于每次最高领票数量";
            },
            docFileType: function (element, params) {
                var tp = ".doc,.pdf";
                var file_name = (element.value).toString().toLowerCase();
                var filePostfix = /\.[^\.]+/.exec(file_name);
                var ifTypeRright = tp.indexOf(filePostfix);
                return ifTypeRright > -1 || "文件类型错误";
            },
            picFileType: function (element, params) {
                var tp = ".png,.jpg";
                var file_name = (element.value).toString().toLowerCase();
                var filePostfix = /\.[^\.]+/.exec(file_name);
                var ifTypeRright = tp.indexOf(filePostfix);
                return ifTypeRright > -1 || "文件类型错误";
            },
            fileType: function (element, params) {
                //var tp =".png,.jpg";
                var file_name = (element.value).toString().toLowerCase();
                //var filePostfix =/\.[^\.]+/.exec(file_name);
                var filePostfix = file_name.substring(file_name.lastIndexOf('.'));
                //var paramsArry = (params+'').split(',');
                var ifTypeRright = (params + '').indexOf(filePostfix);
                return ifTypeRright > -1 || "文件类型错误";
            },
            fileSize: function (element, params) {

                try {
                    var file = document.getElementById(element.id).files[0];
                    if (file) {
                        if (Math.round(file.size * 100 / (1024 * 1024)) / 100 > params) {
                            //resetFileInput($('#file_pic'));
                            return '图片文件大小超过了' + params + 'M';
                        }
                    }
                } catch (e) {

                }
                return true;
            },
            yqsbsmRepeat: function (element, params) {  //判断延期申报的税目是否有重复

                //判断是否同一税目重复填写了（税种相同、所属期相同）
                var total = ($(element).parent().parent().parent().find("a").length) / 2;    //根据a标签按钮，计算出有几条数据
                var num = parseInt(element.id.split('_')[1]);       //当前验证的是第几条数据，从0起

                var allDelayInput = [];
                var excepteCurrentDelayInput = [];  //除了当前这条数据的其他数据组成的array
                for (var i = 0; i < total; i++) {
                    var zsxmDmVal = $('#zsxmDm_' + i).val();
                    var skssqqVal = $('#skssqq_' + i).val();
                    var skssqzVal = $('#skssqz_' + i).val();
                    allDelayInput.push({'zsxmDm': zsxmDmVal, 'skssqq': skssqqVal, 'skssqz': skssqzVal});
                    if (i != num) {
                        excepteCurrentDelayInput.push({'zsxmDm': zsxmDmVal, 'skssqq': skssqqVal, 'skssqz': skssqzVal});
                    }
                }

                var afterDisCount_all = arrayDistinct(allDelayInput).length;  //全部记录去重后的条数
                var afterDisCount_exceptCurrent = arrayDistinct(excepteCurrentDelayInput).length; //除了当前记录，余下记录去重后的条数

                //alert(afterDisCount_all+'|'+afterDisCount_exceptCurrent);
                if (afterDisCount_exceptCurrent == afterDisCount_all) {
                    return "申请延期的税目有重复";
                } else {
                    return true;
                }
                //if(delayInput.length!=cnt){
                //    return "申请延期的税目有重复";
                //}else{
                //    return true;
                //}
            },
            fppzhdpt: function (element, params) {//发票票种核定 普通发票特殊处理
                var array = element.id.split('_');
                var fpzl = $('#fpzlDm_' + array[1]).find('option:selected').text();
                if (fpzl.indexOf('定额') >= 0) {
                    if (!isEmpty($.trim(element.value))) {
                        return /^[1-9]\d*$/.test(element.value) || '只能是正整数';
                    }
                    return true;
                } else {
                    if (isEmpty($.trim(element.value))) {
                        return '不能为空';
                    } else {
                        return /^[1-9]\d*$/.test(element.value.trim()) || '只能是正整数';
                    }
                }



            },
            tcsfwmyzglpsl: function (element, params) {
                var array = element.id.split('_');
                var fpzl = $('#fpzlDm_' + array[1]).find('option:selected').text();
                if (fpzl.indexOf('定额') >= 0) {
                    if (!isEmpty($.trim(element.value))) {
                        return /^[1-9]\d*$/.test(element.value) || '只能是正整数';
                    }
                    return true;
                } else {
                    if (isEmpty($.trim(element.value))) {
                        return '不能为空';
                    } else {
                        var isTrue = /^[1-9]\d*$/.test(element.value);
                        if (!isTrue) {
                            return '只能是正整数';
                        }

                        //var res = true;
                        //res = (new RegExp("/^[1-9]\d*$/", "i")).test(element.value);
                        //return res === true || "只能是正整数";
                    }
                }

                var fpzlval = $('#fpzlDm_' + array[1]).val();//发票种类
                //增值税专用发票1130、1160；增值税普通发票（折叠票）04、05；机动车销售统一发票000008102600；二手车销售统一发票000008103600、000008103500、17；
                if ((fpzlval == "1130" || fpzlval == "1160" || fpzlval == "04" || fpzlval == "05" || fpzlval == "000008102600" || fpzlval == "000008103600" || fpzlval == "000008103500" || fpzlval == "17") && (element.value > 25)) {
                    return '根据您选择的‘' + $('#fpzlDm_' + array[1]).find('option:selected').text() + '\',<br/>新办套餐首次核定即办数量不能超出25份，<br/>如有需要请到主管税务机关办税服务厅办理。';
                }
                //增值税普通发票（卷票）06、07；
                if ((fpzlval == "06" || fpzlval == "07") && (element.value > 1)) {
                    return '根据您选择的‘' + $('#fpzlDm_' + array[1]).find('option:selected').text() + '\',<br/>新办套餐首次核定即办数量不能超出1份，<br/>如有需要请到主管税务机关办税服务厅办理。';
                }
                //增值税电子普通发票11、12；
                if ((fpzlval == "11" || fpzlval == "12") && (element.value > 100)) {
                    return '根据您选择的‘' + $('#fpzlDm_' + array[1]).find('option:selected').text() + '\',<br/>新办套餐首次核定即办数量不能超出100份，<br/>如有需要请到主管税务机关办税服务厅办理。';
                }

            },
            tcsfwmczglpsl: function (element, params) {//发票票种核定 持票最高数量
                var array = element.id.split('_');
                var fpzl = $('#fpzlDm_' + array[1]).find('option:selected').text();
                if (fpzl.indexOf('定额') >= 0) {
                    if (!isEmpty($.trim(element.value))) {
                        return /^[1-9]\d*$/.test(element.value) || '只能是正整数';
                    }
                    return true;
                } else {
                    if (isEmpty($.trim(element.value))) {
                        return '不能为空';
                    } else {
                        var isTrue = /^[1-9]\d*$/.test(element.value);
                        if (!isTrue) {
                            return '只能是正整数';
                        }
                    }
                }
                if (element.value - $('#myzglpsl_' + array[1]).val() > 0) {
                    return "不能大于每月最高领票数量";
                } else if (element.value - $('#cpzgsl_' + array[1]).val() > 0) {
                    return "不能大于持票最高数量";
                } else {
                    return true;
                }
                //return (element.value - $('#myzglpsl_' + array[1]).val() <= 0) || "不能大于每月最高领票数量";
            },
            tcsfwcpzgsl: function (element, params) {//发票票种核定 持票最高数量
                var array = element.id.split('_');
                if (!isEmpty($.trim(element.value))) {
                    return /^[1-9]\d*$/.test(element.value) || '只能是正整数';
                }
            },
            tcfwTzyxq: function (element, params) {//发票票种核定 普通发票特殊处理
                var array = element.id.split('_');
                var tzyxqq = $('#tzyxqq_' + array[1]).val();
                var tzyxqz = $('#tzyxqz_' + array[1]).val();
                var kyslrq = $('#kyslrq').val();

                if (tzyxqq < kyslrq) {
                    return "投资有效期限起不能早于开业（设立）日期"
                }
                return (tzyxqz == '' || tzyxqq < tzyxqz) || "投资有效期限起必须早于投资有效期限止";
            },
            tcsfwdffpzgkpxe: function (element, params) {
                var array = element.id.split('_');
                var fpzlval = $('#fpzlDm_' + array[1]).val();//发票种类
                //当“发票种类名称”选择为增值税专用发票、增值税普通发票（卷票）、机动车销售统一发票和二手车销售统一发票时，该栏置灰，不可选；其他发票种类名称时必选。
                if (fpzlval == "1130" || fpzlval == "1160") {

                } else {
                    if (isEmpty($.trim(element.value)) || "-1" == $.trim(element.value)) {
                        return '不能为空';
                    }
                }

                //当“发票种类名称”选择为增值税专用发票1130、1160；和增值税普通发票（折叠票）04、05时，“单份发票最高开票限额”不得超过10万元
                if ((fpzlval == "1130" || fpzlval == "1160" || fpzlval == "04" || fpzlval == "05") && (element.value == "1000000-3-一百万元")) {
                    return '根据您选择的‘' + $('#fpzlDm_' + array[1]).find('option:selected').text() + '\',<br/>新办套餐首次核定单份发票最高开票限额不得超过10万元，<br/>如有需要请到主管税务机关办税服务厅办理。';
                }
                //当“发票种类名称”选择为增值税普通发票（卷票）06、07和增值税电子普通发票时11、12
                if ((fpzlval == "06" || fpzlval == "07" || fpzlval == "11" || fpzlval == "12") && (element.value == "100000-4-十万元" || element.value == "1000000-3-一百万元")) {
                    return '根据您选择的‘' + $('#fpzlDm_' + array[1]).find('option:selected').text() + '\',<br/>新办套餐首次核定单份发票最高开票限额不得超过1万元，<br/>如有需要请到主管税务机关办税服务厅办理。';
                }
                //当“发票种类名称”选择为机动车销售统一发票000008102600和二手车销售统一发票000008103600、000008103500、17时
                if ((fpzlval == "000008102600" || fpzlval == "000008103600" || fpzlval == "000008103500" || fpzlval == "17") && (element.value > 100)) {
                    return '根据您选择的‘' + $('#fpzlDm_' + array[1]).find('option:selected').text() + '\',<br/>新办套餐首次核定单份发票最高开票限额不得超过100万元，<br/>如有需要请到主管税务机关办税服务厅办理。';
                }

            },

            bijiaosjdaxiao: function (element, params) {
                var array = element.id.split('_');
                var val = $('#' + element.id).val();
                var mydate = new Date();
                var str = mydate.getFullYear() + "-";
                str += (mydate.getMonth() + 1) < 10 ? '0' + (mydate.getMonth() + 1) : (mydate.getMonth() + 1) + "-";
                str += mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate();
                if (Date.parse(str) < Date.parse(val)) {
                    return '日期必须小于等于当前日期';
                }
            },
            sjsfweidangqian: function (element, params) {
                var array = element.id.split('_');
                var val = $('#' + element.id).val();
                var mydate = new Date();
                var str = $('#khsj_' + array[1]).val();
                var str1 = mydate.getFullYear() + "-";
                str1 += (mydate.getMonth() + 1) < 10 ? '0' + (mydate.getMonth() + 1) : (mydate.getMonth() + 1) + "-";
                str1 += mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate();
                if (Date.parse(str) > Date.parse(val) && Date.parse(str1) < Date.parse(val)) {
                    return '变更日期必须大于开户时间且小于等于当前日期';
                }
            },
            zxsjyz: function (element, params) {
                var array = element.id.split('_');
                var val = $('#' + element.id).val();
                var mydate = new Date();
                var str = $('#khsj_' + array[1]).val();
                var str2 = $('#bgsj_' + array[1]).val();
                var str1 = mydate.getFullYear() + "-";
                str1 += (mydate.getMonth() + 1) < 10 ? '0' + (mydate.getMonth() + 1) : (mydate.getMonth() + 1) + "-";
                str1 += mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate();
                if (Date.parse(str) > Date.parse(val) && Date.parse(str2) > Date.parse(val) && Date.parse(str1) < Date.parse(val)) {
                    return '注销日期必须大于开户时间和变更时间且小于等于当前日期';
                }
            },
            validatelj: function (element, params) {
                var retv = "实际缴纳税款与营业收入之比不能超过50%";
                if($(element).attr("id") == "sjjnskbq" || $(element).attr("id") == "yysrbq"){
                    if (parseFloat($("#sjjnskbq").val()) / parseFloat($("#yysrbq").val()) > 0.5) {
                        $("#sjjnskbq").focus();
                        return retv;
                    }
                }else if($(element).attr("id") == "sjjnsksntq" || $(element).attr("id") == "yysrsntq"){
                    if (parseFloat($("#sjjnsksntq").val()) / parseFloat($("#yysrsntq").val()) > 0.5) {
                        $("#sjjnsksntq").focus();
                        return retv;
                    }
                }
            },
            validatelj1: function (element, params) {
                var retv = "净利润不能超过营业收入";
                if($(element).attr("id") == "jlrbq" || $(element).attr("id") == "yysrbq"){
                    if (parseFloat($("#jlrbq").val()) > parseFloat($("#yysrbq").val())) {
                        $("#jlrbq").focus();
                        return retv;
                    }
                }else if($(element).attr("id") == "jlrsntq" || $(element).attr("id") == "yysrsntq"){
                    if (parseFloat($("#jlrsntq").val()) > parseFloat($("#yysrsntq").val())) {
                        $("#jlrsntq").focus();
                        return retv;
                    }
                }
            },
            validateSjjnskbq: function (element, params) {
                var retv = "实际缴纳税款不能小于国内增值税和企业所得税之和";
                if($(element).attr("id") == "sjjnskbq" || $(element).attr("id") == "gnzzsbq"){
                    if (parseFloat($("#sjjnskbq").val()) < (parseFloat($("#gnzzsbq").val()) + parseFloat($("#qysdsbq").val()))) {
                        $("#sjjnskbq").focus();
                        return retv;
                    }
                }else if($(element).attr("id") == "sjjnsksntq" || $(element).attr("id") == "gnzzssntq"){
                    if (parseFloat($("#sjjnsksntq").val()) < (parseFloat($("#gnzzssntq").val()) + parseFloat($("#qysdssntq").val()))) {
                        $("#sjjnsksntq").focus();
                        return retv;
                    }
                }
            },
            //若营业收入小于境外营业收入和出口营业收入，提示异常。
            validateYysrbq: function (element, params) {
                var retv = "营业收入不能小于境外营业收入和出口营业收入之和";
                if (parseFloat($("#yysrbq").val()) < (parseFloat($("#jwyysrbq").val()) + parseFloat($("#ckyysrbq").val()))) {
                    $("#yysrbq").focus();
                    return retv;
                }

                if($(element).attr("id") == "yysrbq" || $(element).attr("id") == "jwyysrbq" || $(element).attr("id") == "ckyysrbq"){
                    if (parseFloat($("#yysrbq").val()) < (parseFloat($("#jwyysrbq").val()) + parseFloat($("#ckyysrbq").val()))) {
                        $("#yysrbq").focus();
                        return retv;
                    }
                }else if($(element).attr("id") == "yysrsntq" || $(element).attr("id") == "jwyysrsntq" || $(element).attr("id") == "ckyysrsntq"){
                    if (parseFloat($("#yysrsntq").val()) < (parseFloat($("#jwyysrsntq").val()) + parseFloat($("#ckyysrsntq").val()))) {
                        $("#yysrsntq").focus();
                        return retv;
                    }
                }

            },
            //若资产总计不等于负债合计与所有者权益之和，提示异常。
            validateZchjbq: function (element, params) {
                var retv = "资产总计需要等于负债合计与所有者权益之和";
                if($(element).attr("id") == "zchjbq" || $(element).attr("id") == "fzhjbq" || $(element).attr("id") == "syzqybq"){
                    if (parseFloat($("#zchjbq").val()).toFixed(2)  != (parseFloat($("#fzhjbq").val())   + parseFloat($("#syzqybq").val())).toFixed(2)) {
                        $("#zchjbq").focus();
                        return retv;
                    }
                }else if($(element).attr("id") == "zchjsntq" || $(element).attr("id") == "fzhjsntq" || $(element).attr("id") == "syzqysntq"){
                    if (parseFloat($("#zchjsntq").val()).toFixed(2)  != (parseFloat($("#fzhjsntq").val())   + parseFloat($("#syzqysntq").val())).toFixed(2)) {
                        $("#zchjsntq").focus();
                        return retv;
                    }
                }
            },
            validatelgg: function (element, params) {
                var reg = /^([1-9][0-9]*)mm(×|\*)([1-9][0-9]*)mm$/;
                if (!reg.test(element.value)) {
                    return '规格格式应如：11mm*11mm';
                }
            },
            validateXy: function (element, params) {
                //录入委托服务项目为“030000专业税务顾问”或“040000税收筹划”或“050000涉税鉴证”“060000纳税情况审查”时
                //受托人的机构类别是否为“01税务师事务所”或“02注册会计师事务所”或“03律师事务所”
                //如否，系统提示“受托人不属于三所机构，专项服务业务不能办理”
                var v = element.value.split("-")[0];
                if (v == "030000" || v == "040000" || v == "050000" || v == "060000") {
                    if ($("#sszyfwjglbDm").val() != "01" && $("#sszyfwjglbDm").val() != "02" && $("#sszyfwjglbDm").val() != "03") {
                        return "受托人不属于三所机构，专项服务业务不能办理";
                    }
                }
            },
            validateHblx: function (element, params) {
                if ($("#zxyy").val() == '02' && (isEmpty(element.value))) {
                    return "不能为空";
                } else {
                    return true;
                }
            },
            sfbxsf: function (element, params) {
                if ($("#hblx").val() == 11 && (isEmpty(element.value))) {
                    return "不能为空";
                } else {
                    return true;
                }
            },
            bghdz: function (element) {
                if ($("#zxyy").val() == '08' && (isEmpty(element.value))) {
                    return "不能为空";
                } else {
                    return true;
                }
            },
            pzjgmc: function (element) {
                if ($("#zxyy").val() == '10' && (isEmpty(element.value))) {
                    return "不能为空";
                } else {
                    return true;
                }
            },
            pzwh: function (element) {
                if (!isEmpty($("#pzjgmc").val()) && (isEmpty(element.value))) {
                    return "不能为空";
                } else {
                    return true;
                }
            },
            xnsrxx: function (element) {
                if (!isEmpty($("#sfbxsf").find('option:selected').val()) && (isEmpty(element.value))) {
                    return "不能为空";
                } else {
                    return true;
                }
            },
            dssfxy: function (element) {
                if (!isEmpty($("#dsswjgdm").val()) && (isEmpty(element.value))) {
                    return "不能为空";
                } else {
                    return true;
                }
            },
            changOne: function (element) {
                var array = element.id.split('_');
                var jzfd = "";
                var jzed = "";
                if (array[0] == "jzfd") {
                    jzfd = element.value;
                    jzed = $("#jzed_" + array[1]).val();
                } else if (array[0] == "jzed") {
                    jzfd = $("#jzfd_" + array[1]).val();
                    jzed = element.value;
                }

                if (jzfd == "" && jzed == "") {
                    return "减征额度、减征幅度 只能选填一项";
                } else if (jzfd != "" && jzed != "") {
                    return "减征额度、减征幅度 只能选填一项";
                } else {
                    return true;
                }
            },
            yearLastDate: function (element) {
                var datefirst = $("#dezxqq").val().split("-");
                var datelast = element.value.split("-");
                var firstDate = new Date(datefirst[0], datefirst[1], datefirst[2]);
                var lastDate = new Date(datelast[0], datelast[1], datelast[2]);
                var firstyear = firstDate.getFullYear();
                var lastyear = lastDate.getFullYear();
                var firstMonth = firstDate.getMonth() + 1;
                var lastMonth = lastDate.getMonth() + 1;
                var firstDay = firstDate.getDate();
                var lastDay = lastDate.getDate();
                if (firstyear > lastyear) {
                    return "有效起期不能大于有效止期"
                } else if (firstyear == lastyear) {
                    if (firstMonth > lastMonth) {
                        return "有效起期不能大于有效止期"
                    } else if (firstMonth == lastMonth) {
                        if (firstDay > lastDay) {
                            return "有效起期不能大于有效止期"
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
            fwmybaHtje:function(element){
                var id=element.id;
                var bzid="yzfjebzszDm";
                if(id=="bcfhje"){
                    bzid="bcfhjebzszDm";
                }
                var bz=$("#"+bzid).val();
                if(bz=="840"&&element.value<=50000){
                    return "单笔付汇金额小于等值5万美元（含等值5万美元），无需备案";
                }
                return true;
            },
            xmlxRequired: function (element) {
                var flag=false;
                $("input[name='jnjghgrfbgczyhlwxmbgb.xmlx']").each(function(){
                    if($(this).is(':checked')){
                        flag=true;
                        return;
                    }
                });
                if(!flag) return "项目类型必须选择";
                return true;
            },
            fwmybaHtzje:function(element) {
                var htzje=Number($(element).val());
                var yzfje = Number($("#yzfje").val());
                var bcfhje = Number($("#bcfhje").val());
                var hj=yzfje+bcfhje;
                if (htzje<hj) {
                    return "累计付汇金额大于合同总金额，请审核后重新录入";
                }
                return true;
            },
            fwmybajnwjggl:function(element){
                var val = $("input[name='jnwjgglbz']:checked").val();
                if(!val){
                    return "境内外机构是否关联必选";
                }else{
                    return true;
                }
            },
            crdqrDateDiff:function(element, params){
                var endDate =new Date(element.value.replace(/-/g, "/"));
                var currentDate = new Date();
                var dateDiff = endDate.getTime() - currentDate.getTime();
                var dayDiff = Math.floor(dateDiff/(24*3600*1000));
                if(dayDiff > params[0]){
                    return "承诺期限不得超过六个月";
                }else{
                    return true;
                }
            },
            sqyqqxDateDiff:function(element, params){
                var array = element.id.split('_');
                var gdsbqx = $('#gdsbqx_' + array[1]).val();
                var sqyqqx = element.value;
                if(gdsbqx > sqyqqx){
                    return "申请延期缴纳期限不能小于规定申报期限";
                }
                var datefirst = $('#gdsbqx_' + array[1]).val().split("-");
                var datelast = element.value.split("-");
                var firstDate = new Date(datefirst[0], datefirst[1], datefirst[2]);
                var lastDate = new Date(datelast[0], datelast[1], datelast[2]);
                var firstyear = firstDate.getFullYear();
                var lastyear = lastDate.getFullYear();
                var firstMonth = firstDate.getMonth() + 1;
                var lastMonth = lastDate.getMonth() + 1;
                var firstDay = firstDate.getDate();
                var lastDay = lastDate.getDate();

                if (firstyear == lastyear) {
                    if((firstMonth +3) < lastMonth){
                        return "申请延期缴纳期限最长不能超过规定申报期限三个月";
                    }else if((firstMonth + 3) == lastMonth){
                        if(firstDay < lastDay){
                            return "申请延期缴纳期限最长不能超过规定申报期限三个月";
                        }
                    }
                }else if(firstyear < lastyear){
                    if((firstMonth + 3) < (lastMonth + 12)){
                        return "申请延期缴纳期限最长不能超过规定申报期限三个月";
                    }else if((firstMonth + 3) == (lastMonth + 12)){
                        if(firstDay < lastDay){
                            return "申请延期缴纳期限最长不能超过规定申报期限三个月";
                        }
                    }
                }
            },
            kce:function(element, params){
                var hsje = $(element).parent().parent().find("input[name='hsje']").val();
                if(hsje){
                    if(parseFloat(element.value) >= parseFloat(hsje)){
                        $(element).val('');
                        return "扣除额不能大于等于含税销售额！";
                    }
                }else{
                    return true;
                }
            },
            shsl:function(element, params){
                var hsje = $(element).parent().parent().find("input[name='dqgjncpsl']").val();
                if(hsje){
                    if(parseFloat(element.value) > parseFloat(hsje)){
                        $(element).val('');
                        return "损耗数量不能大于购进数量！";
                    }
                }else{
                    return true;
                }
            },
            ydzse:function(element, params){
                var ydzse = $(element).parent().parent().find("input[name='ydzse']").val();
                if(ydzse){
                    if(parseFloat(element.value) > parseFloat(ydzse)){
                        $(element).val('');
                        return "已代征税额不能大于应代征税额！";
                    }
                }else{
                    return true;
                }
            },
            //使用加计验证
            syjjdjzcdsm:function(element, params){
                var ydzse = $(element).parent().parent().find("input[name='ydzse']").val();
                var msg = $(element).attr("validMsg");
                if(msg != null || msg != undefined || msg != ""){
                    return msg;
                }else{
                    return true;
                }
            }

        }
    });

    /* Default error messages
     */
    $.validator.config({
        messages: {
        	required1: "测试",
            required: "{0}不能为空",
            remote: "{0}已被使用",
            integer: {
                '*': "请输入整数",
                '+': "请输入正整数",
                '+0': "请输入正整数或0",
                '-': "请输入负整数",
                '-0': "请输入负整数或0"
            },
            match: {
                eq: "{0}与{1}不一致",
                neq: "{0}与{1}不能相同",
                lt: "{0}必须小于{1}",
                gt: "{0}必须大于{1}",
                lte: "{0}必须小于或等于{1}",
                gte: "{0}必须大于或等于{1}"
            },
            range: {
                rg: "请输入{1}到{2}的数",
                gte: "请输入大于或等于{1}的数",
                lte: "请输入小于或等于{1}的数"
            },
            checked: {
                eq: "请选择{1}项",
                rg: "请选择{1}到{2}项",
                gte: "请至少选择{1}项",
                lte: "请最多选择{1}项"
            },
            length: {
                eq: "长度应为{1}位",
                rg: "长度应为{1}到{2}位",
                gte: "长度不能少于{1}位",
                lte: "长度不能超过{1}位",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"><b>◆</b><i>◆</i></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_bottom': {
            formClass: 'n-yellow',
            msgClass: 'n-bottom',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({
                        left: '20px',
                        opacity: 0
                    }).delay(100).show().stop().animate({
                        left: '-4px',
                        opacity: 1
                    }, 150).animate({
                        left: '3px'
                    }, 80).animate({
                        left: 0
                    }, 80);
                } else {
                    $el.css({
                        left: 0,
                        opacity: 1
                    }).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show().animate({
                    left: '20px',
                    opacity: 0
                }, 300, function(){
                    $msgbox.hide();
                });
            }
        }
    });
}));