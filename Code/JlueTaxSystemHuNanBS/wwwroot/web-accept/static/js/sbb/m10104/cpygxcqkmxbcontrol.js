
var cpygxcqkmxbcontrol = {
    //增加成品油项目
    addcpy: function (tdobj) {
        var ctx = $("#ctx").val();
        var newRowStr ='<tr style="height:32px;" >\n'+
            "<td    class=' bg1 br0'   ><a href='javascript:void(0)'   onclick='cpygxcqkmxbcontrol.removecpy(this);' class='jiajian'><img src='"+ctx+"/static/css/images/jian.png'></a></td>\n" +
        '<td   class=" ft0 fs9 al vm nl bg0 br3 cpyidx"  name="wbsbzzsybnsrcpygxcb.ypxh"  index="0"  type="list"  dn="wbsbzzsybnsrcpygxcb.ypxhmc"  divname="wbsbzzsybnsrcpygxcb.ypxh.list" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.qckczgsl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.qckcdcsl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.qckczgje"  format="l18x2d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ac vm nl bg1 br2"  >—</td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqrkzgsl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqrkdcsl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqrkzgje"  format="l18x2d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ac vm nl bg1 br2"  >—</td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqckyssl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqckysje"  format="l18x2d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqckfyszysl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqckfysdcsl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcb.bqckfyszyje"  format="l18x2d" index="0"  type="input" ></td>\n'+
        '<td   class=" ft0 fs9 ac vm nl bg1 br2"  >—</td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg_ne br2"   name="wbsbzzsybnsrcpygxcb.qmkczgsl"  format="l16x4d" index="0"  type="input"  isEditable=false ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg_ne br2"   name="wbsbzzsybnsrcpygxcb.qmkcdcsl"  format="l16x4d" index="0"  type="input"  isEditable=false ></td>\n'+
        '<td   class=" ft0 fs9 ar vm nl bg_ne br2"   name="wbsbzzsybnsrcpygxcb.qmkczgje"  format="l18x2d" index="0"  type="input"  isEditable=false ></td>\n'+
        '<td   class=" ft0 fs9 ac vm nl bg1 br2"  >—</td>\n'+
        "<td   class='  ar vm nw bg1 br0' ><a href='javascript:void(0)'  onclick='cpygxcqkmxbcontrol.removecpy(this);' class='jiajian'><img src='"+ctx+"/static/css/images/jian.png'></a></td>\n" +
        '</tr>';

        $(tdobj).parent().parent().after(newRowStr);
        this.reloadcpyidx();
        this.reloadtable();
        //this.recountcpy();
    },

    //删除表格行
    removecpy: function (tdobj) {
        var trobj =  $(tdobj).parent().parent();
        trobj.remove();
        this.reloadcpyidx();
        this.reloadtable();
        this.recountcpy();
    },

    //重新设置表格索引 （没有栏次）
    reloadcpyidx:function () {
        $("td.cpyidx").each(function(i){
            var tdobj = $(this);
            tdobj.parent().find("td").each(function(){
                if($(this).attr("index")){
                    $(this).attr("index",i+5);
                }
            });
        });
    },

    recountcpy:function (){
        var cpygxcqkmxb = getTableObj("cpygxcqkmxb");
        cpygxcqkmxb.isEdited = true;
        cpygxcqkmxbcheck.cf_L3(cpygxcqkmxb, "wbsbzzsybnsrcpygxcb.qckczgje",  "0", false);
        cpygxcqkmxbcheck.cf_L7(cpygxcqkmxb, "wbsbzzsybnsrcpygxcb.bqrkzgje",  "0", false);
        cpygxcqkmxbcheck.cf_L10(cpygxcqkmxb, "wbsbzzsybnsrcpygxcb.bqckysje",  "0", false);
        cpygxcqkmxbcheck.cf_L13(cpygxcqkmxb, "wbsbzzsybnsrcpygxcb.bqckfyszyje",  "0", false);
        cpygxcqkmxbcheck.cf_L17(cpygxcqkmxb, "wbsbzzsybnsrcpygxcb.qmkczgje",  "0", false);
    },
    //初始化表格
    reloadtable: function () {
        $("#cpygxcqkmxb").reload();
    }
}