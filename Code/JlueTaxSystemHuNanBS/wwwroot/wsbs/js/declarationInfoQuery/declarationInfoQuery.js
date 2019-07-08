$(function() {

    myMultiSelect("sbztsel", function(res){
        $("#sbzt").val(res.join(","));
    });

    myMultiSelect("zsxm", function(res){
        $("#zsxmDm").val(res.join(","));
    });

    $('#queryButton').click(function() {
        if(  ($('#skssqq').val()!='' && $('#skssqz').val()=='') ||  ($('#skssqq').val()=='' && $('#skssqz').val()!='')){
            layerMsg("税款所属期起止时间必须同时填写",2);
            return;
        }

        if ($('#skssqq').val() > $('#skssqz').val()) {
            layerMsg("税款所属期起始日期不能大于截止日期", 2);
            return;
        }

        if(  ($('#nssbrqq').val()!='' && $('#nssbrqz').val()=='') ||  ($('#nssbrqq').val()=='' && $('#nssbrqz').val()!='')){
            layerMsg("申报起止日期必须同时选择！",2);
            return;
        }

        if ($('#nssbrqq').val() > $('#nssbrqz').val()) {
            layerMsg("申报日期起不能大于等于申报日期止！", 2);
            return;
        }
        pageJump(1, 0, true, ctx+"/sb/taxSelect/declarationInfo/list_declarationQuery.do?rsv_idx=FU035", $('#formSelect').serialize(), 'table_query_res', 'page', 'createDeclarationInfoTr');
    });
    //$("#queryButton").trigger("click");

});
function myMultiSelect(selectId, onChange){
    //width = width || "32px";
    var mulSelect = "<div id=\""+ selectId +"\" class=\"mySelect\"></div>";
    var multiParam = {};
    multiParam.mult = true;
    multiParam.option = [];
    $("#"+selectId).find("option").each(function(){
        if($(this).attr("value")){
            var temp = {};
            temp.label = $(this).text();
            temp.value = $(this).attr("value");
            multiParam.option.push(temp);
        }
    });
    multiParam.onChange = onChange;
    $('#'+selectId).parent().append(mulSelect);
    $('#'+selectId).remove();
    $('#'+selectId).mySelect(multiParam);


}

function setZsxmDm(obj){
    $this=$(obj);
    var thisvar = $this.val();
    var ids = [];
    $this.find(":checked").each(function () {
        ids.push($(this).attr("value"));
    });
    if(thisvar){
        $('#zsxmDm').val(ids.join(","));
    }else{
        $('#zsxmDm').val(ids);
    }
}

function createDeclarationInfoTr(num, res, curPage, pageSize) {
    var tr_num = ((curPage - 1) * pageSize + num + 1);
    var tr = '';
    tr += '<tr>';
    tr += '<td>' + tr_num + '</td>';
    tr += '<td>' + res.zsxmmc + '</td>';
    tr += '<td>' + res.zspmmc + '</td>';
    tr += '<td>' + res.sbqx + '</td>';
    tr += '<td>' + res.skssqq + '</td>';
    tr += '<td>' + res.skssqz + '</td>';
    tr += '<td>' + res.sbrq + '</td>';
    tr += '<td style="text-align: right;">' + res.ysxssr + '</td>';
    tr += '<td style="text-align: right;">' + res.ynse + '</td>';
    tr += '<td style="text-align: right;">' + res.ybtse + '</td>';
    tr += '<td style="text-align: center">' + res.sbsxmc + '</td>';
    tr += '</tr>';
    return tr;
}