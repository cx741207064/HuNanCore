// JavaScript Document


//弹出层（新增、修改、查看）等信息弹出窗口
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
 
$('#myModal2').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
 


$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
}) 
$('#myTabs a[href="#profile"]').tab('show') // Select tab by name
$('#myTabs a:first').tab('show') // Select first tab
$('#myTabs a:last').tab('show') // Select last tab
$('#myTabs li:eq(2) a').tab('show') // Select third tab (0-indexed)

 $(function () {
        // Invoke the plugin
      //  $('input, textarea').placeholder();
    });

/*
function onClickInsertBtn(){
	$("#wizard").height($(".page-nr").height()+120);
}
*/
	
	
	

//弹出层的左右移动（上一步下一步提交）代码-------------------------------------------------------------------
$(function(){

	$("#wizard").scrollable({
		onSeek: function(event,i){
			$("#status li").removeClass("activet").eq(i).addClass("activet");
		}
	});
	
	$("#sub").click(function(){
		var data = $("form").serialize();
		alert(data);
	});
	
});

//弹出层的左右移动（上一步下一步提交）代码-------------------------------------------------------------------




