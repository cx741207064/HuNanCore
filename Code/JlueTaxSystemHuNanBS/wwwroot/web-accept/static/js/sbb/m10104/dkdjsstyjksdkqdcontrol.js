var dkdjsstyjksdkqdcontrol = {
    //增加代扣代缴项目
    addkdj: function (tdobj) {
        var ctx = $("#ctx").val();
        var newRowStr='<tr style="height:32px;" >\n'+
            "<td    class=' bg1 br0'   ><a href='javascript:void(0)'   onclick='dkdjsstyjksdkqdcontrol.removedkdj(this);' class='jiajian'><img src='"+ctx+"/static/css/images/jian.png'></a></td>\n" +
        '<td    class=" ft0 fs12 al vm nw bg0 br3 dkdjidx"   name="wbsbzzsybnsrdkdjdkqd.kjnsrsbh"  format="l20" index="1"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 al vm nw bg0 br2"   name="wbsbzzsybnsrdkdjdkqd.kjrmc"  format="l300" index="1"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 al vm nw bg0 br2"   name="wbsbzzsybnsrdkdjdkqd.zsjgmc"  format="l150" index="1"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 al vm nw bg0 br2"   name="wbsbzzsybnsrdkdjdkqd.dkdjxm"  format="l150" index="1"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 al vm nw bg0 br2"   name="wbsbzzsybnsrdkdjdkqd.dkdjpzbh"  format="l20" index="1"  type="input" ></td>\n'+
        '<td    class=" ft0 fs12 ar vm nw bg0 br2"   colspan="2"   name="wbsbzzsybnsrdkdjdkqd.se"  format="l18x2d" index="1"  type="input" ></td>\n'+
        "<td    class='  ar vm nw bg1 br0' ><a href='javascript:void(0)'  onclick='dkdjsstyjksdkqdcontrol.removedkdj(this);' class='jiajian'><img src='"+ctx+"/static/css/images/jian.png'></a></td>\n" +
        "</tr>";
        $(tdobj).parent().parent().after(newRowStr);
        this.reloaddkdjidx();
        this.reloadtable();
        this.recountdkdj();
    },

    //删除表格行
    removedkdj: function (tdobj) {
        var trobj =  $(tdobj).parent().parent();
        trobj.remove();
        this.reloaddkdjidx();
        this.reloadtable();
        this.recountdkdj();
    },

    //重新设置表格索引 （没有栏次）
    reloaddkdjidx:function () {
        $("td.dkdjidx").each(function(i){
            var tdobj = $(this);
            tdobj.parent().find("td").each(function(){
                if($(this).attr("index")){
                    $(this).attr("index",i+5);
                }
            });
        });
    },

    recountdkdj:function (){
        var dkdjsstyjksdkqd = getTableObj("dkdjsstyjksdkqd");
        dkdjsstyjksdkqd.isEdited = true;
        dkdjsstyjksdkqdcheck.cf_L6(dkdjsstyjksdkqd, "wbsbzzsybnsrdkdjdkqd.se", false);
    },
    //初始化表格
    reloadtable: function () {
        $("#dkdjsstyjksdkqd").reload();
    }
}