var cpygxcslmxbcontrol = {
    //增加成品油项目
    addcpy: function (tdobj) {
        var ctx = $("#ctx").val();
        var newRowStr = '<tr style="height:32px;" >\n'+
            "<td    class=' bg1 br0'   ><a href='javascript:void(0)'   onclick='cpygxcslmxbcontrol.removecpy(this);' class='jiajian'><img src='"+ctx+"/static/css/images/jian.png'></a></td>\n" +
        '<td    class=" ft0 fs12 al vm nl bg0 br3 cpyslidx"   name="wbsbzzsybnsrcpygxcslmxb.ylxh"  index="0"  type="list"  dn="wbsbzzsybnsrcpygxcslmxb.ylxhmc"  divname="wbsbzzsybnsrcpygxcslmxb.ylxh.list" ></td>\n'+
        '<td    class=" ft0 fs12 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcslmxb.qckcl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcslmxb.bqgjl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcslmxb.bqckxsl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 ar vm nl bg0 br2"   name="wbsbzzsybnsrcpygxcslmxb.bqckkcl"  format="l16x4d" index="0"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 ar vm nw bg_ne br2"   name="wbsbzzsybnsrcpygxcslmxb.qmkcl"  format="l16x4d" index="0"  type="input"  isEditable=false ></td>\n'+
        "<td    class='  ar vm nw bg1 br0' ><a href='javascript:void(0)'  onclick='cpygxcslmxbcontrol.removecpy(this);' class='jiajian'><img src='"+ctx+"/static/css/images/jian.png'></a></td>\n"+
        '</tr>';
        $(tdobj).parent().parent().after(newRowStr);
        this.reloadcpyidx();
        this.reloadtable();
        this.recountcpy();
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
        $("td.cpyslidx").each(function(i){
            var tdobj = $(this);
            tdobj.parent().find("td").each(function(){
                if($(this).attr("index")){
                    $(this).attr("index",i+5);
                }
            });
        });
    },

    recountcpy:function (){
        var cpygxcslmxb = getTableObj("cpygxcslmxb");
        cpygxcslmxb.isEdited = true;
    },
    //初始化表格
    reloadtable: function () {
        $("#cpygxcslmxb").reload();
    }
}