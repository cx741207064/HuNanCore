/**
 * 
 */
//复写sword中accMul方法
function accMul(k, g) {
    if (k == null) {
        k = 0
    }
    if (g == null) {
        g = 0
    }
    var tempk = k.toString();
	var tempg = g.toString();
	if((tempk.indexOf("E") != "-1")||(tempk.indexOf("e") != "-1")){
		k = new Number(k);
		k = k.toFixed(10);
	}
	if((tempg.indexOf("E") != "-1")||(tempg.indexOf("e") != "-1")){
		g = new Number(g);
		g = g.toFixed(10);
	}
    var d = 0,
        l = k.toString(),
        h = g.toString();
    var f = l.split(".");
    d += f.length > 1 ? f[1].length : 0;
    var c = h.split(".");
    d += c.length > 1 ? c[1].length : 0;
    return Number(l.replace(".", "")) * Number(h.replace(".", "")) / Math.pow(10, d)
}
//复写sword日期控件
var SwordCalendar = new Class({
    Implements: [Events, Options],
    options: {
        name: null,
        sword: null,
        caption: "日期控件",
        pNode: null,
        defaultValue: null,
        defValue: null,
        dataformat: "yyyy-MM-dd",
        yearNames: {
            beginYear: "1900",
            endYear: "9999"
        },
        monthNames: i18n.months,
        monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        weekNames: i18n.days,
        lazyMinute: 500,
        showOptions: "true,true,true,false,false,false",
        rule: null,
        showCurDate: false,
        isReadonly: "false",
        edit: null,
        msg: null,
        isShow: "true",
        returnRealValue: "false",
        isShowCloseBtn: "false",
        isShowEraseBtn: "false",
        isShowTodayBtn: "false",
        disable: null,
        toZero: false,
        handInput: "true",
        yearCap: "年",
        autoCtrl: "true",
        dateControl: null
    },
    validate: null,
    parent: null,
    defaultdataformat: "yyyy-MM-dd",
    submitDateformat: "yyyy-MM-dd HH:mm:ss",
    dateDiv: null,
    dateInput: null,
    dateBtn: null,
    datepopDiv: null,
    SelYear: null,
    SelMonth: null,
    SelDay: null,
    SelHour: null,
    SelMinute: null,
    SelSecond: null,
    DivTable: null,
    DivTbody: null,
    oldDate: new Date(),
    grid_onFinished: null,
    CloseBtn: null,
    bcContainer2: null,
    monthContent: null,
    yearContent: null,
    initialize: function(a) {
        if (!pc.SwordCalendarWindowClick) {
            window.document.addEvent("click", function(g) {
                var c = pc.getCalendar();
                var h = c.dateInput;
                if ($defined(h)) {
                    if (h.get("show") == "true") {
                        var f = $(g.target);
                        if (f.hasClass("sGrid_data_row_item_date")) {
                            return
                        }
                        var d = f.parentNode;
                        if (!d) {
                            return
                        }
                        var b = d.parentNode;
                        if (f != h && null != c.dateBtn && null != c.datepopDiv && f != c.dateBtn && f != c.ymContainer && f != c.ymct && f != c.SelHour && f != c.SelMinute && f != c.SelSecond && d != c.ymContainer && d != c.ymct && d != c.SelHour && d != c.SelMinute && d != c.SelSecond && d != c.topDiv && f != c.topDiv && b != c.monthContent && b != c.yearContent) {
                            if (Browser.Engine.trident4 || Browser.Engine.trident5) {
                                if (d != c.dateBtn) {
                                    c.hide()
                                }
                            } else {
                                c.hide()
                            }
                        }
                    }
                }
            });
            pc.SwordCalendarWindowClick = true
        }
    },
    initParam: function(b, a) {
        if (!$defined(b.get("dataformat"))) {
            b.setProperty("dataformat", this.defaultdataformat)
        }
        this.parent = a;
        $extend(this.options, {
            disable: null,
            defValue: null,
            returnRealValue: "false",
            showOptions: "true,true,true,false,false,false",
            isShowCloseBtn: "false",
            isShowEraseBtn: "false",
            isShowTodayBtn: "false",
            showCurDate: false,
            handInput: "true",
            rule: null,
            toZero: false,
            isShow: "true",
            autoCtrl: "true"
        });
        this.htmlOptions(b);
        this.options.defaultValue = this.options.defValue;
        this.build_input(b.get("rule"), b);
        this.build_inputBtn();
        Sword.utils.setWidth(b.get("width"), a ? a.userSize : null, this.dateContentDiv, this.dateInput, true);
        if ((this.options.rule || "").indexOf("must") > -1 && this.parent && this.parent.options.requiredSign == "field") {
            new Element("span", {
                styles: {
                    color: "red",
                    "float": "left"
                },
                html: "*"
            }).inject(this.dateContentDiv)
        }
        this.getValidate();
        return this.dateInput
    },
    setValidate: function(a) {
        this.validate = a
    },
    getValidate: function() {
        if (this.validate == null) {
            this.validate = new SwordValidator();
            this.validate.initParam("intime")
        }
    },
    initData: function(b, a) {
        if (!$defined(b) && !$defined(a)) {
            return
        }
        var c = a.get("dataformat");
        a.set("realvalue", b);
        if ($defined(c)) {
            if (b.split(".").length == 2) {
                b = b.split(".")[0];
                a.set("realvalue", b);
                b = SwordDataFormat.formatStringToString(b, this.submitDateformat, c)
            } else {
                b = SwordDataFormat.formatStringToString(b, this.submitDateformat, c)
            }
        }
        a.set("value", b);
        a.set("oValue", b)
    },
    createCalendar: function() {
        if ($chk(this.dateInput.value)) {
            if (SwordDataFormat.isDate(this.dateInput.value, this.dateInput.get("dataformat"))) {
                this.oldDate = SwordDataFormat.formatStringToDate(this.dateInput.value, this.dateInput.get("dataformat"))
            } else {
                this.oldDate = new Date()
            }
        } else {
            this.oldDate = new Date();
            if (this.options.toZero == "true") {
                this.oldDate.setSeconds(0);
                this.oldDate.setMinutes(0);
                this.oldDate.setHours(0)
            }
        }
        this.buildCalendar2();
        this.build_firstPopDiv();
        this.build_SecondpopDiv()
    },
    showCalendar2: function(a) {
        this.datepopDiv.setStyle("display", "none");
        this.bcContainer2.setStyle("display", "");
        if (a == "month") {
            this.monthContent.setStyle("display", "");
            this.monthContent.set("show", true);
            this.yearContent.setStyle("display", "none");
            this.yearContent.set("show", false)
        } else {
            this.monthContent.setStyle("display", "none");
            this.monthContent.set("show", false);
            this.yearContent.setStyle("display", "");
            this.yearContent.set("show", true)
        }
    },
    hideCalendar2: function(a) {
        if (this.dateInput.get("dataformat") == "yyyy-MM") {
            this.validateText(this.dateInput.value)
        }
        this.dateInput.set("realvalue", this.dateInput.value);
        this.bcContainer2.setStyle("display", "none");
        if (this.dateInput.get("oValue") == null) {
            this.dateInput.set("oValue", " ")
        }
        var d = this.dateInput.get("oValue");
        if (!$chk(d)) {
            d = " "
        }
        if (d.trim() != this.dateInput.value) {
            var c = this.execGridOnFinished();
            if (this.dateInput.get("show") == "true") {
                var b = this.dateInput.get("onChange") || this.dateInput.get("_onChange");
                if (b) {
                    this.getFunc(b)[0](this.dateInput, this, c)
                }
            }
            this.dateInput.set("oValue", this.dateInput.value)
        }
        if (this.dateInput.get("show") == "true") {
            if (this.dateInput.get("onHide")) {
                this.getFunc(this.dateInput.get("onHide"))[0](this.dateInput)
            }
        }
        this.dateInput.set("show", "false");
        if (this.dateInput.get("rule")) {
            this.validate.validate(this.dateInput)
        }
    },
    top_m: null,
    top_l: null,
    top_r: null,
    topDiv: null,
    topDivClone: null,
    buildCalendar2: function() {
        if (this.bcContainer2) {
            return
        }
        this.bcContainer2 = new Element("div").inject($(document.body));
        this.bcContainer2.addClass("calendar2");
        this.bcContainer2.setStyle("display", "none");
        this.topDiv = new Element("div").inject(this.bcContainer2);
        this.topDiv.addClass("cd2_top");
        this.top_l = new Element("div").inject(this.topDiv);
        this.top_l.addClass("cd2_top_l");
        this.top_m = this.top_l.clone();
        this.top_m.addClass("cd2_top_m");
        this.top_m.inject(this.topDiv);
        this.testMonthDaysFebruary(this.top_m.get("text"));
        this.top_r = this.top_l.clone();
        this.top_r.addClass("cd2_top_r");
        this.top_r.inject(this.topDiv);
        this.top_l.addClass("cd2_top_z");
        this.topDivClone = this.topDiv.clone(false, false);
        this.topDivClone.setStyles({
            display: "none",
            "line-height": "28px",
            "text-align": "center",
            "font-weight": "bold"
        });
        this.topDivClone.set("text", "请选择月份");
        this.topDivClone.inject(this.topDiv, "after");
        this.yearContent = new Element("div").inject(this.bcContainer2);
        this.yearContent.setStyle("display", "none");
        this.yearContent.addClass("cdCellContent");
        var m = new Element("div").setStyle("cursor", "pointer");
        var h = new Element("div").addClass("cd2_cell");
        h.addEvent("mouseover", function(p) {
            var o = new Event(p);
            var n = $(o.target);
            n.addClass("cd2_cell_mouseover")
        }.bind(this));
        h.addEvent("mouseout", function(p) {
            var o = new Event(p);
            var n = $(o.target);
            n.removeClass("cd2_cell_mouseover")
        }.bind(this));
        var g = new Date().getFullYear() + "";
        var k = g / 1 - 1;
        for (var c = 0; c < 3; c++) {
            var l = m.clone();
            l.inject(this.yearContent);
            for (var b = 0; b < 4; b++) {
                var a = h.clone().inject(l);
                a.set("text", k++);
                a.cloneEvents(h);
                if ((c == 0 && b == 0) || (c == 2 && b == 3)) {
                    a.setStyle("color", "gray")
                }
            }
        }
        this.monthContent = new Element("div").inject(this.bcContainer2);
        this.monthContent.setStyle("display", "none");
        this.monthContent.addClass("cdCellContent");
        var f = 1;
        for (var c = 0; c < 3; c++) {
            var d = m.clone();
            d.inject(this.monthContent);
            for (var b = 0; b < 4; b++) {
                var a = h.clone().inject(d);
                a.set("text", (f++) + "月");
                a.cloneEvents(h)
            }
        }
        h.destroy();
        m.destroy();
        this.bcContainer2.addEvent("click", function(q) {
            var p = new Event(q);
            var o = $(p.target);
            var r = o.get("text");
            var n = this.bcContainer2.get("cdtype");
            if (n == "month") {
                if (o.hasClass("cd2_top_z")) {
                    this.dealTopL()
                } else {
                    if (o.hasClass("cd2_top_m")) {
                        this.dealTopM()
                    } else {
                        if (o.hasClass("cd2_top_r")) {
                            this.dealTopR()
                        } else {
                            if (o.hasClass("cd2_cell")) {
                                this.dealMonth(q)
                            }
                        }
                    }
                }
            } else {
                if (n == "year") {
                    if (o.hasClass("cd2_top_z")) {
                        this.dealTopL()
                    } else {
                        if (o.hasClass("cd2_top_m")) {
                            this.dealTopM()
                        } else {
                            if (o.hasClass("cd2_top_r")) {
                                this.dealTopR()
                            } else {
                                if (o.hasClass("cd2_cell")) {
                                    this.dealMonth(q, n)
                                }
                            }
                        }
                    }
                } else {
                    this.dateInput.set("value", SwordDataFormat.formatStringToString(r, "yyyy", this.dateInput.get("dataformat")));
                    this.hideCalendar2(o)
                }
            }
        }.bind(this));
        this.top_l.addEvent("mouseover", function() {
            this.top_l.addClass("cd2_top_l_over")
        }.bind(this));
        this.top_l.addEvent("mouseout", function() {
            this.top_l.removeClass("cd2_top_l_over")
        }.bind(this));
        this.top_r.addEvent("mouseover", function() {
            this.top_r.addClass("cd2_top_r_over")
        }.bind(this));
        this.top_r.addEvent("mouseout", function() {
            this.top_r.removeClass("cd2_top_r_over")
        }.bind(this));
        this.changeTopMidState("pointer")
    },
    dealTopR: function() {
        if (this.yearContent.get("show") == "true") {
            this.yearContent.getElements("div.cd2_cell").each(function(b) {
                b.set("text", b.get("text") / 1 + 10);
                if (b.get("text") == this.dateInput.get("selYear")) {
                    b.addClass("cd2_cell_selected")
                } else {
                    b.removeClass("cd2_cell_selected")
                }
            }.bind(this));
            var a = this.top_m.get("text").split("-");
            this.top_m.set("text", (a[0] / 1 + 10) + "-" + (a[1] / 1 + 10))
        } else {
            this.top_m.set("text", this.top_m.get("text") / 1 + 1);
            if (this.top_m.get("text") != this.dateInput.get("selYear")) {
                this.monthContent.getElements("div.cd2_cell").removeClass("cd2_cell_selected")
            } else {
                this.monthContent.getElements("div.cd2_cell[text=" + this.dateInput.get("selMonth") + "]").addClass("cd2_cell_selected")
            }
        }
    },
    dealTopL: function() {
        if (this.yearContent.get("show") == "true") {
            this.yearContent.getElements("div.cd2_cell").each(function(b) {
                b.set("text", b.get("text") / 1 - 10);
                if (b.get("text") == this.dateInput.get("selYear")) {
                    b.addClass("cd2_cell_selected")
                } else {
                    b.removeClass("cd2_cell_selected")
                }
            }.bind(this));
            var a = this.top_m.get("text").split("-");
            this.top_m.set("text", (a[0] / 1 - 10) + "-" + (a[1] / 1 - 10))
        } else {
            this.top_m.set("text", this.top_m.get("text") / 1 - 1);
            if (this.top_m.get("text") != this.dateInput.get("selYear")) {
                this.monthContent.getElements("div.cd2_cell").removeClass("cd2_cell_selected")
            } else {
                this.monthContent.getElements("div.cd2_cell[text=" + this.dateInput.get("selMonth") + "]").addClass("cd2_cell_selected")
            }
        }
    },
    dealTopM: function() {
        if (this.monthContent.get("show") == "true") {
            this.monthContent.setStyle("display", "none");
            this.monthContent.set("show", false);
            this.changeTopMidState("default");
            this.yearContent.setStyle("display", "");
            this.yearContent.set("show", true);
            var a = this.top_m.get("text");
            a = a.substring(0, 3) + "0";
            this.yearContent.getElements("div.cd2_cell").each(function(c, b) {
                var d = a / 1 + b - 1 + "";
                c.set("text", d);
                if (d == this.dateInput.get("selYear")) {
                    c.addClass("cd2_cell_selected")
                } else {
                    c.removeClass("cd2_cell_selected")
                }
            }.bind(this));
            this.top_m.set("text", a + "-" + (a / 1 + 9))
        }
    },
    dealMonth: function(c, d) {
        var b = new Event(c);
        var a = $(b.target);
        var k = a.get("text");
        if (k.contains("月")) {
            var f = k.split("月")[0];
            this.testMonthDaysFebruary(this.top_m.get("text"));
            var h = this.options.monthDays[f - 1];
            var l = this.top_m.get("text") + "-" + (f.length == 1 ? "0" + f : f);
            if (this.options.dateControl == "minDay") {
                this.dateInput.set("dataformat", "yyyy-MM-dd");
                this.dateInput.set("value", SwordDataFormat.formatStringToString(l + "-01", "yyyy-MM-dd", this.dateInput.get("dataformat")))
            } else {
                if (this.options.dateControl == "maxDay") {
                    this.dateInput.set("dataformat", "yyyy-MM-dd");
                    this.dateInput.set("value", SwordDataFormat.formatStringToString(l + "-" + h, "yyyy-MM-dd", this.dateInput.get("dataformat")))
                } else {
                    this.dateInput.set("value", SwordDataFormat.formatStringToString(l, "yyyy-MM", this.dateInput.get("dataformat")))
                }
            }
            this.hideCalendar2(a)
        } else {
            if (d != "year") {
                this.monthContent.setStyle("display", "");
                this.monthContent.set("show", true)
            }
            this.changeTopMidState("pointer");
            if (d != "year") {
                this.yearContent.setStyle("display", "none");
                this.yearContent.set("show", false);
                this.top_m.set("text", k)
            }
            if (k == this.dateInput.get("selYear")) {
                this.monthContent.getElements("div.cd2_cell[text=" + this.dateInput.get("selMonth") + "]").addClass("cd2_cell_selected")
            } else {
                this.monthContent.getElements("div.cd2_cell").removeClass("cd2_cell_selected")
            } if (d === "year") {
                var g = a.get("text");
                this.dateInput.set("value", g);
                this.hideCalendar2(a)
            }
        }
    },
    changeTopMidState: function(a) {
        if (a == "pointer") {
            this.top_m.setStyle("cursor", "pointer");
            this.top_m.addEvent("mouseover", function() {
                this.topDiv.addClass("cd2_top_over")
            }.bind(this));
            this.top_m.addEvent("mouseout", function() {
                this.topDiv.removeClass("cd2_top_over")
            }.bind(this))
        } else {
            this.top_m.setStyle("cursor", "default");
            this.top_m.removeEvents("mouseover");
            this.top_m.removeEvents("mouseout");
            this.topDiv.removeClass("cd2_top_over")
        }
    },
    build_SecondpopDiv: function() {
        var a = this.dateInput.get("showOptions").split(",");
        if (a[2] == "false" && a[3] == "false" && a[4] == "false" && a[5] == "false") {
            this.bcContainer2.setStyle("display", "");
            var b = new Date().getFullYear() + "";
            if (a[1] == "true" && a[0] == "true") {
                var g = new Date().getMonth() + 1 + "月";
                var d = b;
                if (this.defaultdataformat == this.dateInput.get("dataformat")) {
                    if (this.options.dateControl != "minDay" && this.options.dateControl != "maxDay") {
                        this.dateInput.set("dataformat", "yyyy-MM")
                    }
                }
                this.topDivClone.setStyle("display", "none");
                this.topDiv.setStyle("display", "");
                this.changeTopMidState("pointer");
                this.showCalendar2("month");
                this.bcContainer2.set("cdtype", "month");
                if (this.dateInput.value != "") {
                    var f = SwordDataFormat.formatStringToDate(this.dateInput.value, this.dateInput.get("dataformat"));
                    g = f.getMonth() + 1 + "月";
                    d = f.getFullYear() + ""
                }
                this.top_m.set("text", d);
                this.dateInput.set("selYear", d);
                this.dateInput.set("selMonth", g);
                this.monthContent.getElements("div.cd2_cell").each(function(k, h) {
                    if (k.get("text") == g) {
                        k.addClass("cd2_cell_selected")
                    } else {
                        k.removeClass("cd2_cell_selected")
                    }
                })
            } else {
                if (a[0] == "true" && a[1] == "false") {
                    if (this.defaultdataformat == this.dateInput.get("dataformat")) {
                        this.dateInput.set("dataformat", "yyyy")
                    }
                    this.topDivClone.setStyle("display", "none");
                    this.topDiv.setStyle("display", "");
                    this.changeTopMidState("default");
                    this.showCalendar2("year");
                    this.bcContainer2.set("cdtype", "year");
                    if (this.dateInput.value != "") {
                        b = SwordDataFormat.formatStringToDate(this.dateInput.value, this.dateInput.get("dataformat")).getFullYear() + ""
                    }
                    this.dateInput.set("selYear", b);
                    var c = b.substring(0, 3) + "0";
                    this.top_m.set("text", c + "-" + (c / 1 + 9));
                    this.yearContent.getElements("div.cd2_cell").each(function(k, h) {
                        k.set("text", c / 1 + h - 1);
                        if ((c / 1 + h - 1) + "" == b) {
                            k.addClass("cd2_cell_selected")
                        } else {
                            k.removeClass("cd2_cell_selected")
                        }
                    })
                } else {
                    var g = new Date().getMonth() + 1 + "月";
                    if (this.defaultdataformat == this.dateInput.get("dataformat")) {
                        this.dateInput.set("dataformat", "MM")
                    }
                    this.topDivClone.setStyle("display", "");
                    this.topDiv.setStyle("display", "none");
                    this.showCalendar2("month");
                    this.bcContainer2.set("cdtype", "month");
                    if (this.dateInput.value != "") {
                        var f = SwordDataFormat.formatStringToDate(this.dateInput.value, this.dateInput.get("dataformat"));
                        g = f.getMonth() + 1 + "月"
                    }
                    this.top_m.set("text", b);
                    this.dateInput.set("selMonth", g);
                    this.monthContent.getElements("div.cd2_cell").each(function(k, h) {
                        if (k.get("text") == g) {
                            k.addClass("cd2_cell_selected")
                        } else {
                            k.removeClass("cd2_cell_selected")
                        }
                    })
                }
            }
        } else {
            this.bcContainer2.setStyle("display", "none");
            this.bcContainer2.erase("cdtype");
            if (a[0] == "true") {
                this.build_popSelectYear();
                this.SelYear.inject(this.ymct)
            } else {
                this.build_popSelectYear();
                this.SelYear.setStyle("display", "none")
            } if (a[1] == "true") {
                this.build_popSelectMonth();
                this.SelMonth.inject(this.ymct)
            } else {
                this.SelMonth.setStyle("display", "none")
            } if (a[0] == "true" || a[1] == "true") {
                this.show4YearAndMonth(a[0], a[1])
            }
            if (a[3] == "true") {
                this.build_popSelectHour()
            } else {
                this.SelHour.setStyle("display", "none")
            } if (a[4] == "true") {
                this.build_popSelectMinute()
            } else {
                this.SelMinute.setStyle("display", "none")
            } if (a[5] == "true") {
                this.build_popSelectSecond()
            } else {
                this.SelSecond.setStyle("display", "none")
            } if (a[3] == "false" && a[4] == "false" && a[5] == "false") {
                if (this.DivTable.getElement("thead").getChildren().length > 1) {
                    this.DivTable.getElement("thead").getChildren()[1].setStyle("display", "none")
                }
            } else {
                if (this.DivTable.getElement("thead").getChildren().length > 1) {
                    this.DivTable.getElement("thead").getChildren()[1].setStyle("display", "")
                }
            }
        }
    },
    ymContainer: null,
    ymct: null,
    show4YearAndMonth: function(b, a) {
        if (b == "false") {
            $("navImgll").setStyle("display", "none");
            $("navImgrr").setStyle("display", "none");
            this.ymct.setStyle("width", "150px")
        } else {
            $("navImgll").setStyle("display", "");
            $("navImgrr").setStyle("display", "");
            this.ymct.setStyle("width", "110px")
        } if (a == "false") {
            $("navImgl").setStyle("display", "none");
            $("navImgr").setStyle("display", "none")
        }
    },
    build_YearAndMonth: function() {
        this.ymContainer = new Element("div").set("id", "ymContainer").setStyles({
            height: "20px",
            "float": "left"
        }).inject(this.ymCtTh);
        var d = new Element("div").inject(this.ymContainer);
        d.set({
            id: "navImgll",
            "class": "navImgll",
            title: "上一年"
        });
        var a = new Element("div").inject(this.ymContainer);
        a.set({
            id: "navImgl",
            "class": "navImgl",
            title: "上个月"
        });
        this.ymct = new Element("div").set("id", "ymct").inject(this.ymContainer).setStyles({
            align: "center",
            width: "110px",
            height: "20px",
            "float": "left",
            "line-height": "20px"
        });
        var c = new Element("div").inject(this.ymContainer);
        c.set({
            id: "navImgr",
            "class": "navImgr",
            title: "下个月"
        });
        var b = new Element("div").inject(this.ymContainer);
        b.set({
            id: "navImgrr",
            "class": "navImgrr",
            title: "下一年"
        });
        this.ymContainer.addEvent("click", function(h) {
            var g = h.target;
            if (g != this.SelYear) {
                this.SelYear.setStyle("background", "transparent");
                this.SelYearPopDiv.setStyle("display", "none")
            }
            if (g != this.SelMonth) {
                this.SelMonth.setStyle("background", "transparent");
                this.SelMonthPopDiv.setStyle("display", "none")
            }
            if (g == this.SelYear || g == this.SelMonth) {
                g.setStyles({
                    background: "#fff"
                });
                g.focus();
                g.select();
                if (g == this.SelYear) {
                    this.build_year();
                    this.SelMonth.setStyle("background", "transparent");
                    this.SelYearPopDiv.setStyles({
                        display: ""
                    });
                    xyposition(this.SelYear, this.SelYearPopDiv)
                } else {
                    this.SelMonthPopDiv.setStyles({
                        display: ""
                    });
                    xyposition(this.SelMonth, this.SelMonthPopDiv)
                }
            } else {
                if (g == d) {
                    this.SelYear.set("code", this.SelYear.get("code") / 1 - 1);
                    this.SelYear.set("value", this.SelYear.get("code") + this.options.yearCap);
                    this.refreshDate(this.SelYear.get("code"))
                }
                if (g == a) {
                    var f = this.SelMonth.get("code") / 1 - 1;
                    if (f == -1) {
                        this.SelYear.set("code", this.SelYear.get("code") / 1 - 1);
                        this.SelYear.set("value", this.SelYear.get("code") + this.options.yearCap);
                        this.SelMonth.set("code", 11);
                        this.SelMonth.set("value", this.options.monthNames[11]);
                        this.refreshDate(this.SelYear.get("code"), 11)
                    } else {
                        this.SelMonth.set("code", this.SelMonth.get("code") / 1 - 1);
                        this.SelMonth.set("value", this.options.monthNames[this.SelMonth.get("code")]);
                        this.refreshDate(null, this.SelMonth.get("code"))
                    }
                }
                if (g == c) {
                    var f = this.SelMonth.get("code") / 1 + 1;
                    if (f == 12) {
                        this.SelYear.set("code", this.SelYear.get("code") / 1 + 1);
                        this.SelYear.set("value", this.SelYear.get("code") + this.options.yearCap);
                        this.SelMonth.set("code", 0);
                        this.SelMonth.set("value", this.options.monthNames[0]);
                        this.refreshDate(this.SelYear.get("code"), 0)
                    } else {
                        this.SelMonth.set("code", this.SelMonth.get("code") / 1 + 1);
                        this.SelMonth.set("value", this.options.monthNames[this.SelMonth.get("code")]);
                        this.refreshDate(null, this.SelMonth.get("code"))
                    }
                }
                if (g == b) {
                    this.SelYear.set("code", this.SelYear.get("code") / 1 + 1);
                    this.SelYear.set("value", this.SelYear.get("code") + this.options.yearCap);
                    this.refreshDate(this.SelYear.get("code"))
                }
                this.giveOutValue()
            }
        }.bind(this))
    },
    show: function(a) {
        this.dateInput = a;
        $extend(this.options, {
            autoCtrl: this.dateInput.get("autoCtrl"),
            isShow: this.dateInput.get("isShow"),
            toZero: this.dateInput.get("toZero"),
            name: this.dateInput.get("name"),
            defaultValue: this.dateInput.get("defaultValue"),
            dataformat: this.dateInput.get("dataformat"),
            dateControl: this.dateInput.get("dateControl")
        });
        this.dateInput.set("show", "true");
        this.createCalendar();
        this.options.onShow = this.dateInput.get("onShow") || this.dateInput.retrieve("onShow");
        if ($defined(this.options.onShow) && $chk(this.options.onShow)) {
            this.getFunc(this.options.onShow)[0](this)
        }
        if (this.bcContainer2.get("cdtype")) {
            xyposition(this.dateInput, this.bcContainer2)
        } else {
            this.datepopDiv.setStyles({
                display: ""
            });
            xyposition(this.dateInput, this.datepopDiv);
            this.datepopDiv.fade("in")
        }
        this.dateBtn.addClass("dateBtn_active");
        this.datepopDiv.addEvent("mouseenter", SwordSelectTemplate.mouseenter.bind(this));
        this.datepopDiv.addEvent("mouseleave", SwordSelectTemplate.mouseleave.bind(this));
        this.bcContainer2.addEvent("mouseenter", SwordSelectTemplate.mouseenter.bind(this));
        this.bcContainer2.addEvent("mouseleave", SwordSelectTemplate.mouseleave.bind(this))
    },
    dateContentDiv: null,
    boxtd: null,
    imgtd: null,
    build_input: function(b, a) {
        this.dateContentDiv = Sword.utils.createTable(this, true, true);
        this.dateInput = new Element("input", {
            rule: b,
            type: "text",
            widget: "calendar",
            name: this.options.name,
            defaultValue: this.options.defaultValue,
            msg: this.options.msg,
            dataformat: this.options.dataformat,
            "class": "swordform_item_oprate swordform_item_input",
            widgetGetValue: "true",
            returnRealValue: this.options.returnRealValue,
            showOptions: this.options.showOptions,
            isShowCloseBtn: this.options.isShowCloseBtn,
            isShowEraseBtn: this.options.isShowEraseBtn,
            isShowTodayBtn: this.options.isShowTodayBtn,
            isShow: this.options.isShow,
            toZero: this.options.toZero,
            autoCtrl: this.options.autoCtrl,
            dateControl: a.get("dateControl"),
            styles: {
                "float": "left",
                "margin-left": "2px"
            },
            oValue: " "
        }).inject(this.boxtd);
        this.dateInput.store("widgetObj", this);
        if (a.get("onHide")) {
            this.dateInput.set("onHide", a.get("onHide"))
        }
        if (a.get("onChange")) {
            this.dateInput.set("_onChange", a.get("onChange"));
            if (this.parent && this.parent.name != "SwordGrid") {
                a.set({
                    onChange: "",
                    onchange: ""
                })
            }
        }
        if (this.options.isReadonly == "true" || this.options.edit == "false") {
            this.dateInput.set("readonly", true)
        }
        if (this.options.disable == "true") {
            this.dateInput.set("disabled", true);
            this.dateInput.setStyle("cursor", "default")
        }
        if (this.options.showCurDate == "true") {
            this.oldDate = new Date();
            this.dateInput.value = SwordDataFormat.formatDateToString(this.oldDate, this.dateInput.get("dataformat"));
            this.dateInput.set("realvalue", this.dateInput.value);
            this.dateInput.set("oValue", this.dateInput.value)
        } else {
            if ($chk(this.options.defaultValue)) {
                this.dateInput.value = this.options.defaultValue;
                this.dateInput.set("realvalue", this.dateInput.value);
                this.dateInput.set("oValue", this.dateInput.value)
            }
        }
    },
    hide: function() {
        if (!$chk(this.dateInput)) {
            return
        }
        if (this.dateInput.get("dataformat") == "yyyy-MM-dd") {
            this.validateText(this.dateInput.value)
        }
        if (this.dateInput.get("show") == "true") {
            this.dateInput.set("realvalue", this.dateInput.value);
            if (this.bcContainer2.get("cdtype")) {
                this.hideCalendar2();
                this.isOnHide = true
            } else {
                if (this.SelMonthPopDiv) {
                    this.SelMonthPopDiv.setStyle("display", "none")
                }
                if (this.SelYearPopDiv) {
                    this.SelYearPopDiv.setStyle("display", "none")
                }
                this.datepopDiv.setStyles({
                    left: "-500px",
                    top: "-500px"
                });
                this.datepopDiv.fade("out")
            }
            this.dateBtn.removeClass("dateBtn_active");
            if (this.dateInput.get("oValue") == null) {
                this.dateInput.set("oValue", " ")
            }
            if (this.dateInput.get("rule")) {
                var d = this.validate.validate(this.dateInput)
            }
            var c = this.execGridOnFinished();
            var b = this.dateInput.get("oValue");
            if (!$chk(b)) {
                b = " "
            }
            if (b.trim() != this.dateInput.value) {
                var a;
                if (this.parent && this.parent.name == "SwordGrid") {
                    a = this.dateInput.retrieve("onChange")
                }
                var a = this.dateInput.get("onChange") || this.dateInput.get("_onChange");
                if (a) {
                    this.getFunc(a)[0](this.dateInput, this, c)
                }
                this.dateInput.set("oValue", this.dateInput.value)
            }
            if (!this.isOnHide && this.dateInput.get("onHide")) {
                this.getFunc(this.dateInput.get("onHide"))[0](this.dateInput)
            }
            this.dateInput.set("show", "false");
            this.defaultValidate(this.dateInput.value, this.dateInput)
        }
    },
    validateText: function(m) {
        var f = this.options.yearNames.beginYear;
        var d = this.options.yearNames.endYear;
        var r = this.dateInput.get("showOptions").split(",");
        var b = this.dateInput.get("dateControl");
        if (r[0] == "true" && r[1] == "true") {
            var k = "";
            var h = "";
            var l = "";
            var c = 0;
            var a = 0;
            if (m.test("^\\d{4}-\\d{1,2}-\\d{0,2}$")) {
                k = m.substring(0, 4);
                h = m.substring(5, 7);
                if (h.contains("-")) {
                    h = h.substring(0, 1);
                    if (h.toInt() == 0) {
                        h = "01"
                    } else {
                        h = "0" + h
                    }
                    c = 7
                } else {
                    if (h.toInt() > 12) {
                        h = "12"
                    } else {
                        if (h.toInt() == 0) {
                            h = "01"
                        }
                    }
                    c = 8
                }
                a = m.length
            } else {
                if (m.test("^\\d{5,7}-\\d{0,2}$")) {
                    k = m.substring(0, 4);
                    h = m.substring(4, 7);
                    if (h.contains("-")) {
                        h = h.replace(/-/g, "");
                        c = 7
                    } else {
                        c = 8
                    } if (h.toInt() > 12) {
                        h = "12"
                    } else {
                        if (h.toInt() == 0) {
                            h = "01"
                        }
                    }
                    a = m.length
                } else {
                    if (m.test("^\\d{4}-\\d{2,5}$")) {
                        k = m.substring(0, 4);
                        var g = m.substring(5, m.length);
                        var q = g.length;
                        if (q == 2) {
                            h = g.substring(0, 2);
                            if (h.toInt() > 12) {
                                h = "12"
                            } else {
                                if (h.toInt() == 0) {
                                    h = "01"
                                }
                            }
                            c = 6;
                            a = 7
                        } else {
                            if (q == 3) {
                                var p = g.substring(0, 1).toInt();
                                var o = g.substring(1, 2).toInt();
                                if (p == 0) {
                                    if (o == 0) {
                                        h = "01"
                                    } else {
                                        if (o != 0) {
                                            h = "0" + o
                                        }
                                    }
                                    c = 7;
                                    a = 8
                                } else {
                                    if (p == 1) {
                                        if (o < 3) {
                                            h = p + o
                                        } else {
                                            h = "0" + h
                                        }
                                    } else {
                                        h = "0" + p;
                                        c = 6;
                                        a = 8
                                    }
                                }
                            } else {
                                var h = g.substring(0, 2);
                                c = 7;
                                a = 9;
                                if (h.toInt() > 12) {
                                    h = "12"
                                } else {
                                    if (h.toInt() == 0) {
                                        h = "01"
                                    }
                                }
                            }
                        }
                    } else {
                        if (m.test("^\\d{6,10}$")) {
                            k = m.substring(0, 4);
                            var g = m.substring(4, m.length);
                            var q = g.length;
                            var p = m.substring(4, 5).toInt();
                            if (q == 2) {
                                if (p == 0) {
                                    p = 1
                                }
                                h = "0" + p;
                                c = 9;
                                a = 10
                            } else {
                                if (q == 3) {
                                    var o = g.substring(1, 2).toInt();
                                    if (p == 0) {
                                        if (o == 0) {
                                            h = "01"
                                        } else {
                                            if (o != 0) {
                                                h = "0" + o
                                            }
                                        }
                                        c = 6;
                                        a = 7
                                    } else {
                                        if (p == 1) {
                                            if (o < 3) {
                                                h = p + o
                                            } else {
                                                h = "0" + h
                                            }
                                        } else {
                                            h = "0" + p;
                                            c = 5;
                                            a = 7
                                        }
                                    }
                                } else {
                                    if (q >= 4) {
                                        var h = g.substring(0, 2);
                                        c = 7;
                                        a = 9;
                                        if (h.toInt() > 12) {
                                            h = "12"
                                        } else {
                                            if (h.toInt() == 0) {
                                                h = "01"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } if (k != "" && h != "") {
                if (k.toInt() < f.toInt()) {
                    k = f
                } else {
                    if (k.toInt() > d.toInt()) {
                        k = d
                    }
                } if (h.length == 1) {
                    h = "0" + h
                }

                var n = parseInt(this._getDays(k, h));
                if (b == "minDay") {
                    l = "-01"
                } else {
                    if (b == "maxDay") {
                        l = "-" + n
                    } else {
                        if (r[2] == "true") {
                            if (c == m.length) {
                                l = "-01"
                            } else {
                                var l = m.substring(c, a);
                                if (l.toInt() > n) {
                                    l = n
                                } else {
                                    if (l.toInt() == 0) {
                                        l = "01"
                                    }
                                } if (l.length == 1) {
                                    l = "0" + l
                                }
                                l = "-" + l
                            }
                        } else {
                            l = ""
                        }
                    }
                } if (h.length == 1) {
                    h = "0" + h
                }
                this.dateInput.value = k + "-" + h + l
            } else {
                this.dateInput.value = ""
            }
        } else {
            if (r[0] == "true" && r[1] == "false") {
                if (m.test("^\\d{1,10}$")) {
                    var k = "";
                    if (m.length > 3) {
                        k = m.substring(0, 4)
                    } else {
                        k = m
                    } if (k.toInt() < f.toInt()) {
                        k = f
                    } else {
                        if (k.toInt() > d.toInt()) {
                            k = d
                        }
                    }
                    this.dateInput.value = k
                } else {
                    this.dateInput.value = ""
                }
            } else {
                if (r[0] == "false" && r[1] == "true" && r[2] == "false") {
                    if (m.test("^\\d{1,10}")) {
                        var h = "";
                        if (m.length > 2) {
                            h = m.substring(0, 2)
                        } else {
                            h = m
                        } if (h.toInt() > 12) {
                            h = "12"
                        } else {
                            if (h.toInt() == 0) {
                                h = "01"
                            }
                        } if (h.length == 1) {
                            h = "0" + h
                        }
                        this.dateInput.value = h
                    } else {
                        this.dateInput.value = ""
                    }
                }
            }
        }
        this.dateInput.set("realvalue", this.dateInput.value)
    },
    execGridOnFinished: function() {
        if ($defined(this.grid_onFinished)) {
            var a = this.grid_onFinished(this.dateInput.get("value"));
            this.grid_onFinished = null;
            return a
        }
    },
    build_inputBtn: function() {
        this.dateBtn = this.imgtd;
        this.dateBtn.addClass("dateBtn").addEvents({
            mouseover: function(a) {
                this.dateBtn.addClass("dateBtn_active")
            }.bind(this),
            mouseout: function(a) {
                this.dateBtn.removeClass("dateBtn_active")
            }.bind(this)
        });
        if ($defined(this.parent) && this.parent.isVal() && $defined(this.options.rule)) {
            Sword.utils.createElAfter(this.dateContentDiv.getChildren()[0].getChildren()[0], this.dateInput)
        }
        if (this.options.disable == "true") {
            this.disable(this.dateInput)
        }
        this.addEventToEl("div")
    },
    ymCtTh: null,
    build_firstPopDiv: function() {
        var d = this.dateInput.get("showOptions").split(",");
        if (this.datepopDiv) {
            if (!$chk(this.ymContainer)) {
                if (d[0] == "true" || d[1] == "true") {
                    this.build_YearAndMonth();
                    this.ymCtTh.setStyle("display", "")
                }
            } else {
                if (d[0] == "false" && d[1] == "false") {
                    this.ymContainer.setStyle("display", "none");
                    this.ymCtTh.setStyle("display", "none")
                } else {
                    this.ymContainer.setStyle("display", "");
                    this.ymCtTh.setStyle("display", "")
                }
            } if (d[2] == "true") {
                this.DivTbody.setStyle("display", "");
                if (!this.buildWeek) {
                    this.build_popSelectDate()
                }
                this.giveDataTopopDiv_selectDay(this.oldDate.getFullYear(), this.oldDate.getMonth().toInt() + 1, this.oldDate.getDate())
            } else {
                this.DivTbody.setStyle("display", "none")
            }
            this.build_popCloseBtn();
            return
        }
        this.datepopDiv = new Element("div", {
            "class": "dp_cal"
        }).inject(document.body);
        this.DivTable = new Element("table").inject(this.datepopDiv);
        var k = new Element("thead").inject(this.DivTable);
        var h = new Element("tr").inject(k);
        this.ymCtTh = new Element("th", {
            colspan: "7"
        }).inject(h);
        if (d[0] == "true" || d[1] == "true") {
            this.build_YearAndMonth()
        } else {
            this.ymCtTh.setStyle("display", "none")
        }
        this.SelYear = new Element("input", {
            id: "yearSelect"
        });
        this.SelYear.addEvents({
            blur: function(o) {
                var l = o.target;
                var m = l.value.split(this.options.yearCap)[0];
                var n = this.options.yearNames.beginYear.toInt();
                var p = this.options.yearNames.endYear.toInt();
                if (m < n) {
                    m = n
                }
                if (m > p) {
                    m = p
                }
                this.SelYear.set("code", m);
                this.SelYear.set("value", m + this.options.yearCap);
                this.SelYear.setStyle("display", "").empty();
                this.SelYear.setStyle("background", "transparent");
                this.refreshDate(m);
                this.giveOutValue()
            }.bind(this),
            keydown: function(l) {
                var m = l.code;
                if ((m < 48 || m > 57) && m != 8) {
                    return false
                }
            }.bind(this),
            keyup: function(l) {
                if (l.code == 13) {
                    this.dateInput.focus();
                    this.SelYearPopDiv.setStyle("display", "none")
                }
            }.bind(this)
        });
        this.SelYear.set("value", this.oldDate.getFullYear() + this.options.yearCap);
        this.SelYear.set("code", this.oldDate.getFullYear());
        this.SelMonth = new Element("input", {
            id: "monthSelect",
            readOnly: true
        });
        this.SelMonth.set("value", this.options.monthNames[this.oldDate.getMonth()]);
        this.SelMonth.set("code", this.oldDate.getMonth());
        var b = new Element("tr").inject(k);
        var g = new Element("th", {
            colspan: "7"
        }).inject(b);
        this.SelHour = new Element("select", {
            id: "hourSelect"
        });
        this.SelHour.set("title", "时");
        var c = new Element("option", {
            value: this.oldDate.getHours()
        }).appendText(this.oldDate.getHours());
        c.inject(this.SelHour);
        this.SelHour.inject(g);
        this.SelMinute = new Element("select", {
            id: "minuteSelect"
        });
        this.SelMinute.set("title", "分");
        var f = new Element("option", {
            value: this.oldDate.getMinutes()
        }).appendText(this.oldDate.getMinutes());
        f.inject(this.SelMinute);
        this.SelMinute.inject(g);
        this.SelSecond = new Element("select", {
            id: "secondSelect"
        });
        var a = new Element("option", {
            value: this.oldDate.getSeconds()
        }).appendText(this.oldDate.getSeconds());
        a.inject(this.SelSecond);
        this.SelSecond.inject(g);
        this.SelSecond.set("title", "秒");
        this.DivTbody = new Element("tbody").inject(this.DivTable);
        if (d[2] == "true") {
            this.build_popSelectDate()
        }
        this.build_popCloseBtn()
    },
    build_popCloseBtn: function() {
        var m = this.dateInput.get("isShowCloseBtn");
        var a = this.dateInput.get("isShowEraseBtn");
        var k = this.dateInput.get("isShowTodayBtn");
        var b;
        if (m == "true" || a == "true" || k == "true") {
            b = "true"
        }
        if (this.CloseBtn != null) {
            this.CloseBtn.destroy();
            this.CloseBtn = null
        }
        if (b == "true") {
            this.CloseBtn = new Element("table").inject(this.datepopDiv);
            var f = new Element("tbody").inject(this.CloseBtn);
            var h = new Element("tr", {
                name: "dayTr"
            }).inject(f);
            var d = new Element("th", {
                colspan: "7"
            }).inject(h);
            if (m == "true") {
                var g = new Element("div", {
                    "class": "dp_error"
                }).inject(d);
                g.addEvent("click", function(o) {
                    var n = o.target;
                    this.giveOutValue()
                }.bind(this))
            }
            if (k == "true") {
                var c = new Element("div", {
                    "class": "dp_todayBtn"
                }).inject(d);
                c.addEvent("click", function() {
                    this.oldDate = new Date();
                    this.giveOutValue()
                }.bind(this))
            }
            if (a == "true") {
                var l = new Element("div", {
                    "class": "dp_clear"
                }).inject(d);
                l.addEvent("click", function(n) {
                    this.dateInput.set("value", "");
                    this.dateInput.set("realvalue", "");
                    this.dateInput.set("oValue", "")
                }.bind(this))
            }
        }
    },
    SelYearPopDiv: null,
    SelMonthPopDiv: null,
    build_popSelectYear: function() {
        this.SelYear.setStyle("display", "").empty();
        this.SelYear.setStyle("background", "transparent");
        this.SelYear.set("code", this.oldDate.getFullYear());
        this.SelYear.set("value", this.oldDate.getFullYear() + this.options.yearCap);
        if (this.SelYearPopDiv) {
            return
        }
        this.SelYearPopDiv = new Element("div").addClass("selPopDiv").setStyle("display", "none").inject($(document.body));
        this.build_year()
    },
    getYearMonthDayNum: function(a, b) {
        var c = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (new Date(a, 1, 29).getDate() == 29) {
            c[1] = 29
        }
        return c[b - 1]
    },
    refreshDate: function(a, c) {
        var g;
        if (a != null && c != null) {
            if (this.dateInput.get("showOptions").split(",")[2] == "true") {
                this.giveDataTopopDiv_selectDay(a, c.toInt() + 1, this.oldDate.getDate())
            }
            this.oldDate.setMonth(c);
            this.oldDate.setFullYear(a)
        } else {
            if (c) {
                if (this.dateInput.get("showOptions").split(",")[2] == "true") {
                    g = this.oldDate.getDate();
                    var d = this.oldDate.getFullYear();
                    var b = c.toInt() + 1;
                    var f = this.getYearMonthDayNum(d, b);
                    if (g > f) {
                        g = f
                    }
                    this.giveDataTopopDiv_selectDay(d, b, g)
                }
                this.oldDate.setDate(g);
                this.oldDate.setMonth(c)
            } else {
                if (a) {
                    if (this.dateInput.get("showOptions").split(",")[2] == "true") {
                        this.giveDataTopopDiv_selectDay(a, this.oldDate.getMonth().toInt() + 1, this.oldDate.getDate())
                    }
                    this.oldDate.setFullYear(a)
                }
            }
        }
        this.build_popCloseBtn()
    },
    mtbody: null,
    ytbody: null,
    yctbody: null,
    build_popSelectMonth: function() {
        this.SelMonth.setStyle("display", "").empty();
        this.SelMonth.setStyle("background", "transparent");
        this.SelMonth.set("code", this.oldDate.getMonth());
        this.SelMonth.set("value", this.options.monthNames[this.oldDate.getMonth()]);
        if (this.SelMonthPopDiv) {
            return
        }
        this.SelMonthPopDiv = new Element("div").addClass("selPopDiv").setStyle("display", "none").inject($(document.body));
        if (Browser.Engine.trident4) {
            var b = new Element("iframe");
            b.setStyles({
                width: "100%",
                border: "0px",
                height: "60px",
                filter: "alpha(opacity=0)",
                "-moz-opacity": "0",
                position: "absolute",
                "z-index": "-1"
            });
            b.inject(this.SelMonthPopDiv)
        }
        var h = new Element("table").set({
            cellpadding: "3",
            cellspacing: "0",
            nowrap: "nowrap",
            width: "80px"
        }).inject(this.SelMonthPopDiv);
        this.mtbody = new Element("tbody").inject(h);
        var f = new Element("tr");
        var k = new Element("td").addClass("yttd");
        k.addEvent("click", function(n) {
            var m = n.target;
            var l = m.get("code");
            this.SelMonthPopDiv.setStyle("display", "none");
            this.SelMonth.set("code", l);
            this.SelMonth.set("value", m.get("text"));
            this.SelMonth.setStyle("background", "transparent");
            this.refreshDate(null, l);
            this.giveOutValue();
            return false
        }.bind(this));
        k.addEvent("mouseover", function(n) {
            var m = new Event(n);
            var l = $(m.target);
            l.addClass("td_mouseover")
        });
        k.addEvent("mouseout", function(n) {
            var m = new Event(n);
            var l = $(m.target);
            l.removeClass("td_mouseover")
        });
        for (var d = 0; d < 6; d++) {
            var a = f.clone().inject(this.mtbody);
            var c = k.clone().inject(a);
            c.set({
                text: this.options.monthNames[d],
                code: d
            });
            c.cloneEvents(k);
            var g = k.clone().inject(a);
            g.set({
                text: this.options.monthNames[d + 6],
                code: d + 6
            });
            g.cloneEvents(k)
        }
        f.destroy();
        k.destroy()
    },
    build_year: function() {
        this.SelYearPopDiv.empty();
        if (Browser.Engine.trident4) {
            var g = new Element("iframe");
            g.setStyles({
                width: "100%",
                border: "0px",
                height: "60px",
                filter: "alpha(opacity=0)",
                "-moz-opacity": "0",
                position: "absolute",
                "z-index": "-1"
            });
            g.inject(this.SelYearPopDiv)
        }
        var a = new Element("table").set({
            cellpadding: "3",
            cellspacing: "0",
            nowrap: "nowrap",
            width: "80px"
        }).inject(this.SelYearPopDiv);
        this.ytbody = new Element("tbody").inject(a);
        var n = new Element("tr");
        var f = new Element("td").addClass("yttd");
        f.addEvent("click", function(u) {
            this.SelYearPopDiv.setStyle("display", "none");
            var v = u.target.get("text");
            this.SelYear.set("code", v);
            this.SelYear.set("value", v + this.options.yearCap);
            this.SelYear.setStyle("background", "transparent");
            this.refreshDate(v);
            this.giveOutValue();
            return false
        }.bind(this));
        f.addEvent("mouseover", function(w) {
            var v = new Event(w);
            var u = $(v.target);
            u.addClass("td_mouseover")
        });
        f.addEvent("mouseout", function(w) {
            var v = new Event(w);
            var u = $(v.target);
            u.removeClass("td_mouseover")
        });
        var k = this.SelYear.get("code") / 1;
        var b = this.options.yearNames.beginYear.toInt();
        var r = this.options.yearNames.endYear.toInt();
        for (var l = 0; l < 5; l++) {
            var t = n.clone().inject(this.ytbody);
            var c = f.clone().inject(t);
            c.set("text", k - 5 + l);
            c.cloneEvents(f);
            var q = f.clone().inject(t);
            var s = k + l;
            if (s > r) {
                s = b - 1 + l
            }
            q.set("text", s);
            q.cloneEvents(f)
        }
        var o = new Element("table").set({
            id: "asdf",
            nowrap: "nowrap",
            width: "80px"
        }).inject(this.SelYearPopDiv);
        this.yctbody = new Element("tbody").inject(o);
        var d = n.clone().inject(this.yctbody);
        var p = f.clone().addClass("yttd").inject(d);
        p.cloneEvents(f, "mouseover");
        p.cloneEvents(f, "mouseout");
        p.set("text", "←");
        p.addEvent("click", function() {
            a.getElements("td.yttd").each(function(v, u) {
                v.set("text", v.get("text") / 1 - 10)
            });
            return false
        }.bind(this));
        var m = f.clone().inject(d);
        m.cloneEvents(f, "mouseover");
        m.cloneEvents(f, "mouseout");
        m.set("text", "×");
        m.addEvent("click", function() {
            this.SelYearPopDiv.setStyle("display", "none");
            this.SelYear.setStyle("background", "transparent");
            return false
        }.bind(this));
        var h = f.clone().inject(d);
        h.cloneEvents(f, "mouseover");
        h.cloneEvents(f, "mouseout");
        h.set("text", "→");
        h.addEvent("click", function() {
            a.getElements("td.yttd").each(function(v, u) {
                v.set("text", v.get("text") / 1 + 10)
            });
            return false
        }.bind(this));
        n.destroy();
        f.destroy()
    },
    build_popSelectDate: function() {
        var a = new Element("tr").inject(this.DivTbody);
        this.build_popTRWeek(a);
        this.build_popTRDays(this.DivTbody, this.oldDate.getFullYear(), this.oldDate.getMonth(), this.oldDate.getDate())
    },
    build_popSelectHour: function() {
        this.SelHour.setStyle("display", "").empty();
        for (var a = 0; a < 24; a++) {
            var b = new Element("option", {
                value: a
            }).appendText(a);
            b.inject(this.SelHour);
            if (this.oldDate.getHours() == a) {
                b.selected = true
            }
        }
        this.SelHour.addEvent("change", function(f) {
            var d = f.target;
            var c = d.getSelected()[0].value;
            this.oldDate.setHours(c)
        }.bind(this))
    },
    build_popSelectMinute: function() {
        this.SelMinute.setStyle("display", "").empty();
        for (var a = 0; a < 60; a++) {
            var b = new Element("option", {
                value: a
            }).appendText(a);
            b.inject(this.SelMinute);
            if (this.oldDate.getMinutes() == a) {
                b.selected = true
            }
        }
        this.SelMinute.addEvent("change", function(f) {
            var d = f.target;
            var c = d.getSelected()[0].value;
            this.oldDate.setMinutes(c)
        }.bind(this))
    },
    build_popSelectSecond: function() {
        this.SelSecond.setStyle("display", "").empty();
        for (var a = 0; a < 60; a++) {
            var b = new Element("option", {
                value: a
            }).appendText(a);
            b.inject(this.SelSecond);
            if (this.oldDate.getSeconds() == a) {
                b.selected = true
            }
        }
        this.SelSecond.addEvent("change", function(f) {
            var d = f.target;
            var c = d.getSelected()[0].value;
            this.oldDate.setSeconds(c)
        }.bind(this))
    },
    build_popTRWeek: function(c) {
        for (var a = 0; a < this.options.weekNames.length; a++) {
            var b = new Element("th").appendText(this.options.weekNames[a]);
            b.inject(c)
        }
        this.buildWeek = true
    },
    build_popTRDays: function(d, g, f, a) {
        this.testMonthDaysFebruary(g);
        var c = (1 - (7 + new Date(g, f, 1).getDay() - this.getWeekStartDay()) % 7);
        var h;
        while (c <= this.options.monthDays[f]) {
            h = new Element("tr", {
                name: "dayTr"
            });
            for (i = 0; i < 7; i++) {
                if ((c <= this.options.monthDays[f]) && (c > 0)) {
                    var b = new Element("td").appendText(c).inject(h);
                    b.addEvent("mouseover", function() {
                        $(this).addClass("dp_roll")
                    });
                    b.addEvent("mouseout", function() {
                        $(this).removeClass("dp_roll")
                    });
                    b.addEvent("click", function(m) {
                        var k = this.options.monthDays.filter(function(o, n) {
                            if (this.SelMonth.get("code") == n) {
                                return o
                            }
                        }.bind(this))[0];
                        var l = m.target;
                        if (this.options.dateControl == "minDay") {
                            if (l.innerHTML.toInt() != 1) {
                                this.dateInput.getParent("div").set("title", "只能是当前选择月的月初");
                                this.dateInput.set("ovalue", "").set("value", "").focus();
                                return
                            } else {
                                this.dateInput.getParent("div").set("title", "")
                            }
                        }
                        if (this.options.dateControl == "maxDay") {
                            if (l.innerHTML.toInt() != k) {
                                this.dateInput.getParent("div").set("title", "只能是当前选择月的月末");
                                this.dateInput.set("ovalue", "").set("value", "").focus();
                                return
                            } else {
                                this.dateInput.getParent("div").set("title", "")
                            }
                        }
                        this.oldDate.setDate(l.innerHTML.toInt());
                        this.giveOutValue()
                    }.bind(this))
                } else {
                    b = new Element("td", {
                        "class": "dp_empty"
                    }).inject(h)
                } if ((c == this.oldDate.getDate()) && (f == this.oldDate.getMonth()) && (g == this.oldDate.getFullYear())) {
                    b.addClass("dp_selected")
                }
                if ((c == new Date().getDate()) && (f == new Date().getMonth()) && (g == new Date().getFullYear())) {
                    b.addClass("dp_today")
                }
                c++
            }
            h.inject(d)
        }
    },
    testMonthDaysFebruary: function(a) {
        if (this.isLeapYear(a)) {
            this.options.monthDays[1] = 29
        } else {
            this.options.monthDays[1] = 28
        }
    },
    isLeapYear: function(a) {
        return (a % 4 == 0 && a % 100 != 0) || (a % 400 == 0)
    },
    getWeekStartDay: function() {
        return 7
    },
    giveDataTopopDiv: function(a) {
        this.giveDataTopopDiv_selectYear(a.getFullYear());
        this.giveDataTopopDiv_selectMonth(a.getMonth().toInt());
        this.giveDataTopopDiv_selectHour(a.getHours());
        this.giveDataTopopDiv_selectMinute(a.getMinutes());
        this.giveDataTopopDiv_selectSecond(a.getSeconds())
    },
    giveDataTopopDiv_selectYear: function(a) {},
    giveDataTopopDiv_selectMonth: function(a) {},
    giveDataTopopDiv_selectHour: function(a) {
        this.SelHour.getSelected.selected = false;
        this.SelHour.getElement("option[value=" + a + "]").selected = true
    },
    giveDataTopopDiv_selectMinute: function(a) {
        this.SelMinute.getSelected.selected = false;
        this.SelMinute.getElement("option[value=" + a + "]").selected = true
    },
    giveDataTopopDiv_selectSecond: function(a) {
        this.SelSecond.getSelected.selected = false;
        this.SelSecond.getElement("option[value=" + a + "]").selected = true
    },
    giveDataTopopDiv_selectDay: function(b, c, a) {
        this.remove_popTRDays(this.DivTbody);
        this.build_popTRDays(this.DivTbody, b, c.toInt() - 1, a)
    },
    remove_popTRDays: function(a) {
        a.getElements("tr[name=dayTr]").each(function(c, b) {
            c.destroy()
        })
    },
    giveOutValue: function() {
        this.dateInput.value = SwordDataFormat.formatDateToString(this.oldDate, this.dateInput.get("dataformat"));
        this.dateInput.set("realvalue", this.dateInput.value)
    },
    getValue: function(c) {
        var b, a = c.get("dataformat");
        if ($defined(c.get("realvalue"))) {
            b = c.get("realvalue")
        } else {
            b = c.get("value")
        } if (c.get("returnRealValue") == "false") {
            b = SwordDataFormat.formatStringToString(b, a, c.get("submitDateformat") || this.submitDateformat)
        } else {
            b = $defined(c.get("value")) ? c.get("value") : ""
        }
        return b
    },
    getShowValue: function(c, b) {
        var a = c.get("dataformat") || this.defaultdataformat;
        if (!$chk(b)) {
            if (c.get("showCurDate") == "true") {
                return SwordDataFormat.formatDateToString(new Date(), a)
            } else {
                return b
            }
        }
        if (b.split(".").length == 2) {
            b = b.split(".")[0]
        }
        return SwordDataFormat.formatStringToString(b, this.submitDateformat, a)
    },
    getRealValue: function(c, b) {
        if (!$chk(b)) {
            return b
        }
        if (b.split(".").length == 2) {
            b = b.split(".")[0]
        }
        var a = c.get("dataformat");
        if (c.get("returnRealValue") == "false") {
            b = SwordDataFormat.formatStringToString(b, a, c.get("submitDateformat") || this.submitDateformat)
        }
        return b
    },
    clear: function() {
        this.dateInput.destroy();
        this.dateBtn.destroy();
        this.datepopDiv.fade("out")
    },
    hand_Input1: function(a) {
        var f = a.target;
        try {
            var h = a.code;
            if (((h > 47) && (h < 58)) || ((h > 96) && (h < 106))) {
                var c = f.value;
                var d = String.fromCharCode(h);
                if (c.length == 0) {
                    if (["1", "2"].contains(d)) {
                        f.value = (d == "1") ? 199 : 20
                    }
                    return false
                } else {
                    if (c.length == 1) {
                        if (c == 1) {
                            f.value = 19
                        } else {
                            f.value = c + d
                        }
                        return false
                    } else {
                        if (c.length == 3) {
                            f.value = c + d + "-";
                            return false
                        } else {
                            if (c.length == 4) {
                                if (parseInt(d) > 1) {
                                    f.value = c.substring(0, 4) + "-0" + d + "-";
                                    return false
                                } else {
                                    f.value = c.substring(0, 4) + "-" + d;
                                    return false
                                }
                            } else {
                                if (c.length == 5) {
                                    if (parseInt(d) > 1) {
                                        f.value = c.substring(0, 5) + "0" + d + "-";
                                        return false
                                    }
                                } else {
                                    if (c.length == 6) {
                                        if (parseInt(c.substring(5, 6) + d) > 12) {
                                            f.value = c.substring(0, 5) + "12-"
                                        } else {
                                            if (parseInt(c.substring(5, 6) + d) == 0) {
                                                f.value = c + 1 + "-"
                                            } else {
                                                f.value = c + d + "-"
                                            }
                                        }
                                        return false
                                    } else {
                                        if (c.length == 7) {
                                            if (c.substring(5, 7) == "02" && parseInt(d) > 2) {
                                                f.value = c + "-";
                                                return false
                                            } else {
                                                if (c.substring(5, 7) != "02" && parseInt(d) > 3) {
                                                    f.value = c.substring(0, 7) + "-0" + d;
                                                    return false
                                                } else {
                                                    f.value = c.substring(0, 7) + "-" + d;
                                                    return false
                                                }
                                            }
                                        } else {
                                            if (c.length == 8) {
                                                if (c.substring(5, 7) == "02" && parseInt(d) > 2) {
                                                    return false
                                                } else {
                                                    if (parseInt(d) > 3) {
                                                        f.value = c.substring(0, 8) + "0" + d;
                                                        return false
                                                    }
                                                }
                                            } else {
                                                if (c.length == 9) {
                                                    var b = c.substring(8, 9) + d;
                                                    var l = parseInt(b);
                                                    var k = parseInt(this._getDays(c.substring(0, 4), c.substring(5, 7)));
                                                    if (l > k) {
                                                        f.value = c.substring(0, 8) + k
                                                    } else {
                                                        if (l == 0) {
                                                            f.value = c + 1
                                                        } else {
                                                            f.value = c + d
                                                        }
                                                    }
                                                    return false
                                                } else {
                                                    if (c.length >= 10) {
                                                        f.value = (c + d).substring(0, 10);
                                                        return false
                                                    } else {
                                                        return true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                return (h == 8 || h == 37 || h == 39 || (a.control && h == 86) || (a.shift && h == 36))
            }
        } catch (g) {}
    },
    hand_Input: function(p) {
        var k = p.target;
        try {
            var u = p.code;
            var a = k.value;
            var h = this.getCursortPosition(k);
            var f = a.length;
            var n = document.selection.createRange().text.length;
            var d = this.dateInput.get("showOptions").split(",");
            var b = this.options.dateControl;
            if ((u >= 96) && (u < 106)) {
                u = u - 48
            }
            var o = String.fromCharCode(u);
            if (((u > 47) && (u < 58))) {
                if (h == f && n == 0) {
                    if (f == 2) {
                        if (d[0] == "false" && d[1] == "true" && d[2] == "false") {
                            return false
                        }
                    } else {
                        if (f == 3) {
                            var c = "";
                            if (d[1] == "true") {
                                c = "-"
                            }
                            var m = a + o;
                            if (m.toInt() < this.options.yearNames.beginYear.toInt()) {
                                k.value = this.options.yearNames.beginYear + c
                            } else {
                                if (m.toInt() > this.options.yearNames.endYear.toInt()) {
                                    k.value = this.options.yearNames.endYear + c
                                } else {
                                    k.value = a + o + c
                                }
                            }
                            return false
                        } else {
                            if (f == 4) {
                                if (d[1] == "true") {
                                    if (parseInt(o) > 1 && d[2] == "true") {
                                        k.value = a.substring(0, 4) + "-0" + o + "-";
                                        return false
                                    } else {
                                        k.value = a.substring(0, 4) + "-0" + o;
                                        return false
                                    }
                                } else {
                                    return false
                                }
                            } else {
                                if (f == 5) {
                                    if (parseInt(o) > 1) {
                                        var d = this.dateInput.get("showOptions").split(",");
                                        var c = "";
                                        if (d[2] == "true") {
                                            c = "-"
                                        }
                                        k.value = a + "0" + o + c;
                                        return false
                                    }
                                } else {
                                    if (f == 6) {
                                        var d = this.dateInput.get("showOptions").split(",");
                                        var c = "";
                                        if (d[2] == "true") {
                                            c = "-"
                                        }
                                        var v = (a.substring(5, 6) + o).toInt();
                                        if (v > 12) {
                                            k.value = a.substring(0, 5) + "12" + c
                                        } else {
                                            if (v == 0) {
                                                k.value = a + 1 + c
                                            } else {
                                                k.value = a + o + c
                                            }
                                        }
                                        return false
                                    } else {
                                        if (f == 7) {
                                            if (d[2] == "true") {
                                                if (a.substring(5, 7) == "02" && parseInt(o) > 2) {
                                                    k.value = a + "-";
                                                    return false
                                                } else {
                                                    if (a.substring(5, 7) != "02" && parseInt(o) > 3) {
                                                        k.value = a.substring(0, 7) + "-0" + o;
                                                        return false
                                                    } else {
                                                        k.value = a.substring(0, 7) + "-" + o;
                                                        return false
                                                    }
                                                }
                                            } else {
                                                return false
                                            }
                                        } else {
                                            if (f == 8) {
                                                if (a.substring(5, 7) == "02" && parseInt(o) > 2) {
                                                    k.value = a.substring(0, 8) + "0" + o;
                                                    return false
                                                } else {
                                                    if (parseInt(o) > 3) {
                                                        k.value = a.substring(0, 8) + "0" + o;
                                                        return false
                                                    }
                                                }
                                            } else {
                                                if (f == 9) {
                                                    var v = a.substring(8, 9) + o;
                                                    var l = v.toInt();
                                                    var g = parseInt(this._getDays(a.substring(0, 4), a.substring(5, 7)));
                                                    if (l > g) {
                                                        k.value = a.substring(0, 8) + g;
                                                        return false
                                                    } else {
                                                        if (l == 0) {
                                                            k.value = a + 1;
                                                            return false
                                                        }
                                                    }
                                                } else {
                                                    if (f >= 10) {
                                                        if (n < 10) {
                                                            k.value = (a + o).substring(0, 10);
                                                            return false
                                                        } else {
                                                            a = o;
                                                            k.value = "";
                                                            return true
                                                        }
                                                    } else {
                                                        return true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (d[1] == "true") {
                        if (d[2] == "true") {
                            if (f >= 10) {
                                if (n < 10) {
                                    k.value = (a + o).substring(0, 10);
                                    return false
                                } else {
                                    a = o;
                                    k.value = "";
                                    return true
                                }
                            } else {
                                return true
                            }
                        } else {
                            var s = 7;
                            if (d[0] == "false") {
                                s = 2
                            }
                            if (b == "minDay" || b == "maxDay") {
                                s = 10
                            }
                            if (f >= s) {
                                if (n < s) {
                                    k.value = (a + o).substring(0, s);
                                    return false
                                } else {
                                    a = o;
                                    k.value = "";
                                    return true
                                }
                            } else {
                                return true
                            }
                        }
                    } else {
                        if (d[0] == "true") {
                            if (f > 4) {
                                if (n < 4) {
                                    k.value = (a + o).substring(0, 4);
                                    return false
                                } else {
                                    a = o;
                                    k.value = "";
                                    return true
                                }
                            } else {
                                return true
                            }
                        }
                    }
                    return true
                }
            } else {
                if (u == 229) {
                    if (n > 0) {
                        k.value = "";
                        return true
                    }
                    if (d[1] == "true") {
                        var s = 7;
                        if (b == "minDay" || b == "maxDay") {
                            s = 10
                        }
                        if (d[2] == "true" || s == 10) {
                            if (f == 4) {
                                k.value = a + "-"
                            } else {
                                if (f == 6) {
                                    var q = a.substring(5, 6);
                                    if (q > 1) {
                                        k.value = a + "-"
                                    }
                                } else {
                                    if (f == 7) {
                                        var q = a.substring(6, 7);
                                        if (q < 3) {
                                            k.value = a + "-"
                                        }
                                    }
                                }
                            } if (f >= 10) {
                                return false
                            }
                        } else {
                            if (d[0] == "false") {
                                if (f >= 2) {
                                    return false
                                }
                            } else {
                                if (f >= s) {
                                    return false
                                }
                            }
                        }
                    } else {
                        if (f > 3) {
                            return false
                        }
                    }
                } else {
                    return (u == 8 || u == 46 || u == 37 || u == 39 || (p.control && u == 86) || (p.shift && u == 36) || u == 229)
                }
            }
        } catch (r) {}
    },
    hand_Input_nctrl: function(b) {
        try {
            var h = b.code;
            if ((h >= 96) && (h < 106)) {
                h = h - 48
            }
            if (((h > 47) && (h < 58)) || (h == 189 && !b.shift) || (!Browser.Engine.trident && h == 45)) {
                var d = b.target,
                    c = d.value,
                    a = c.length,
                    f = d.get("dataformat").length;
                var l = this.getTextRangeIndex(d);
                var k;
                if (Browser.Engine.trident) {
                    k = c.substring(0, l[1]) + (h == 189 ? "-" : String.fromCharCode(h)) + c.substring(l[0], a)
                } else {
                    k = c.substring(0, l[0]) + (h == 45 ? "-" : String.fromCharCode(h)) + c.substring(l[1], a)
                } if (a <= f - 1) {
                    this.defaultValidate(k, d);
                    return true
                } else {
                    if (a == f) {
                        if (l[1] - l[0] == 0) {
                            return false
                        }
                        this.defaultValidate(k, d);
                        return true
                    }
                }
            } else {
                return (h == 8 || h == 46 || h == 37 || h == 39 || (b.control && h == 86) || (b.shift && h == 36))
            }
        } catch (g) {}
    },
    _getDays: function(b, a) {
        a = parseInt(a, 10);        
        return new Date(b , a ,0).getDate()
    },
    defaultValidate: function(b, a) {
        if (this.options.autoCtrl != "true") {
            if (!a.get("rule") || !a.get("rule").contains("date")) {
                if ($chk(b) && !SwordDataFormat.isDate(b, a.get("dataformat"))) {
                    this.validate.showIntimeMes(a, "格式不符合" + a.get("dataformat"));
                    this.validate.showIntimeError(a)
                } else {
                    if (!a.get("rule")) {
                        this.validate.showIntimeCorrect(a);
                        this.validate.tooltips.hide(a.get("name"))
                    }
                }
            }
        }
    },
    keyEvents: function(d) {
        if (d.key == "backspace" || d.key == "delete") {
            var b = d.target;
            if (b.get("readonly")) {
                return false
            }
            var k;
            var h = b.value,
                f = h.length;
            if (this.options.autoCtrl == "true") {
                var g = this.getCursortPosition(b);
                var a = document.selection.createRange().text.length;
                if (a == 0) {
                    a = 1
                }
                h = h.substring(0, g - a) + h.substring(g, h.length);
                b.set("value", h);
                b.set("realvalue", h);
                var c = b.createTextRange();
                c.collapse(true);
                c.moveEnd("character", g - a);
                c.moveStart("character", g - a);
                c.select()
            } else {
                var l = this.getTextRangeIndex(d.target);
                if (Browser.Engine.trident) {
                    if (l[1] == l[0]) {
                        k = h.substring(0, l[1] - 1) + h.substring(l[1], f)
                    } else {
                        k = h.substring(0, l[1]) + h.substring(l[0], f)
                    }
                } else {
                    if (l[1] == l[0]) {
                        k = h.substring(0, l[1] - 1) + h.substring(l[1], f)
                    } else {
                        k = h.substring(0, l[0]) + h.substring(l[1], f)
                    }
                }
            }
            this.defaultValidate(k, b);
            return true
        }
    },
    getCursortPosition: function(a) {
        var c = 0;
        if (document.selection) {
            a.focus();
            var b = document.selection.createRange();
            b.moveStart("character", -a.value.length);
            c = b.text.length
        } else {
            if (a.selectionStart || a.selectionStart == "0") {
                c = a.selectionStart
            }
        }
        return (c)
    },
    getTextRangeIndex: function(d) {
        var b = [];
        if ($defined(document.selection)) {
            var c = document.selection.createRange();
            var a = d.createTextRange();
            c.setEndPoint("StartToStart", a);
            b[0] = c.text.length;
            c = document.selection.createRange();
            a = d.createTextRange();
            c.setEndPoint("EndToStart", a);
            b[1] = c.text.length
        } else {
            b[0] = d.selectionStart;
            b[1] = d.selectionEnd
        }
        return b
    },
    setSelYear: function(a) {
        this.SelYear.set("value", a + this.options.yearCap);
        this.SelYear.set("code", a)
    },
    getBoxEl: function(a) {
        return a.getPrevious().getElement(".swordform_item_oprate")
    },
    getImgEl: function(a) {
        return a.getParent().getNext()
    },
    disable: function(b) {
        if ($defined(b)) {
            var a = this.getImgEl(b);
            b.set("disabled", true).addClass("calendar_input_disable").setStyle("background-color", "");
            a.addClass("dateBtn_disable")
        }
    },
    enable: function(c) {
        if ($defined(c)) {
            var a = this.getImgEl(c);
            c.erase("disabled").removeClass("calendar_input_disable");
            a.removeClass("dateBtn_disable");
            c.setStyle("cursor", "");
            var b = c.get("rule");
            if ($defined(b) && b.contains("must")) {
                c.setStyle("background-color", "#fffadb")
            }
        }
    },
    addEventToEl: function(a) {
        if (a == "input") {
            this.dateInput.addEvent("click", function(d) {
                var c = $(new Event(d).target);
                if (c.get("isShow") == "false") {
                    return
                }
                if (Browser.Engine.trident) {
                    var b = c.createTextRange();
                    b.moveEnd("character", c.value.length);
                    b.moveStart("character", 0);
                    b.select()
                }
                this.show(c)
            }.bind(this));
            this.dateInput.addEvent((Browser.Engine.trident || Browser.Engine.webkit) ? "keydown" : "keypress", this.keyEvents.bind(this));
            this.dateInput.addEvent((Browser.Engine.trident || Browser.Engine.webkit) ? "keydown" : "keypress", this.options.autoCtrl == "true" ? this.hand_Input.bind(this) : this.hand_Input_nctrl.bind(this))
        } else {
            this.dateBtn.addEvent("click", function(d) {
                var c = $(new Event(d).target);
                if (c.hasClass("dateBtn_disable")) {
                    return
                }
                if (Browser.Engine.trident4) {
                    var b = c.getParent("td").getElement("input.swordform_item_oprate");
                    this.dateInput = $(b);
                    this.dateBtn = c.getParent("td").getElement(".dateBtn")
                } else {
                    this.dateBtn = c;
                    this.dateInput = this.getBoxEl(this.dateBtn)
                }
            }.bind(this))
        }
    }
});