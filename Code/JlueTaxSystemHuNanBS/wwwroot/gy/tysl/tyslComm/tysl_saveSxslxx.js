function saveSxslxx(lcslid, djxh, nsrsbh, nsrmc, slswsxDm, lcswsxDm, zgswjgDm,
		flzlGridData) {
	//debugger;
	var submit = pc.create('SwordSubmit');
	submit.setCtrl('TyslCtrl_saveSxslxx');
	submit.pushData("lcslid", lcslid);
	submit.pushData("djxh", djxh);
	submit.pushData("nsrsbh", nsrsbh); // 纳税人识别号
	submit.pushData("nsrmc", nsrmc); // 纳税人名称
	submit.pushData("slswsxDm", slswsxDm);
	submit.pushData("lcswsxDm", lcswsxDm);
	submit.pushData("zgswjgDm", zgswjgDm);
	submit.pushData(flzlGridData);
	submit.submit();
}