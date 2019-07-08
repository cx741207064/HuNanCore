var contentTsxx="";

/**
 * 为contentTsxx变量赋值并把导出提示按钮置为可编辑
 * @param data
 */
function setTsxx(data,kjname){
	contentTsxx = data;
	if(!$chk(kjname)){
		$w("zzsybnsrsb").setEnabled("downloadtsxx");
		return;
	}
	$w(kjname).setEnabled("downloadtsxx");
}

function downloadTsxx(){
	var submitBtn = new SwordSubmit();
    submitBtn.pushData("tsxx", contentTsxx);
    submitBtn.setCtrl("ExportTsxxCtrl_exportExcel");
    submitBtn.options.postType="download";
    submitBtn.submit();
}

