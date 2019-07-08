/**
 * Created by lihongwei on 14-11-13.
 */
;(function($){
    var selObj = function (ele, opt) {
        this.$element = ele;
        this.defaults = {
            'selected': "",
            'no_results_text': "\u627e\u4e0d\u5230:",
            'width': "120px",
            'css': "from",
            'search': "show",
            'height': "150px",
            'search_contains' : true
        };
        this.options = $.extend({}, this.defaults, opt);
    };

    selObj.prototype = {
        _showSel : function () {
            if (this.options.selected != "") {
                this.$element.find('option[value="' + this.options.selected + '"]').attr("selected", true);
            }
            var oChosen = this.$element.chosen({
                width: this.options.width,
                no_results_text: this.options.no_results_text,
                disable_search: this.options.search == "show" ? false : true,
                search_contains : this.options.search_contains
            });
            if (this.options.css != "") {
                var o_chosen = $("#" + this.$element.attr("id") + "_chosen");
                if (this.options.css == "dialog") {
                    var dialog_select = {
                        "height": "24px",
                        "line-height": "24px"
                    };
                    o_chosen.find(".chosen-single").css(dialog_select);
                    o_chosen.css({"margin": "4px 0"});

                }
            }
            //�����˵��߶�
            if(this.options.height != "") {
                //o_chosen.find('.chosen-drop').css("height", this.options.height);
                o_chosen.find('.chosen-results').css("height", (parseInt(this.options.height.split("px")[0]) - 10) + "px");
            }

            return oChosen;
        }
    };

    $.fn.sel = function (options) {
        var oSel = new selObj(this, options);
        return oSel._showSel();
    };
})(jQuery);
