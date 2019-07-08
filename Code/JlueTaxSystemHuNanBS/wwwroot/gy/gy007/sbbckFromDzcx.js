/**
 * ä¸ºå®šåˆ¶æŸ¥è¯¢ç³»ç»Ÿæä¾›ç”³æŠ¥è¡¨ä¿¡æ¯æŸ¥çœ‹åŠŸèƒ½ï¼Œå¤ç”¨ç”³æŠ¥é”™è¯¯æ›´æ­£çš„æºä»£ç ï¼Œé€šè¿‡æœ¬jsè¿›è¡ŒæœåŠ¡è½¬å‘è°ƒç”¨
 */

var gt3_sbbdck_djxh = null;
var gt3_sbbdck_pzxh = null;
var gt3_sbbdck_sbuuid = null;
var gt3_sbbdck_skssqq = null;
var gt3_sbbdck_skssqz = null;
var gt3_sbbdck_sbrq = null;
var gt3_sbbdck_yzpzzlDm = null;
var gt3_sbbdck_sbsxDm1 = null;
var gt3_sbbdck_sbbckdxlmc = null;
var gt3_sbbdck_gsdz = null;

// é¡µé¢æ‰“å¼€åˆå§‹åŒ–æ–¹æ³•ï¼ˆå®šåˆ¶æŸ¥è¯¢è·³è½¬ç”³æŠ¥è¡¨æŸ¥çœ‹åŠŸèƒ½ç»Ÿä¸€å…¥å£ï¼‰
function init(resData){
	// èŽ·å–é¡µé¢åˆå§‹åŒ–æ–¹æ³•
	gt3_sbbdck_djxh = resData.getAttr('djxh');
	gt3_sbbdck_pzxh = resData.getAttr('pzxh');
	gt3_sbbdck_sbuuid = resData.getAttr('sbuuid');
	gt3_sbbdck_skssqq = resData.getAttr('skssqq');
	gt3_sbbdck_skssqz = resData.getAttr('skssqz');
	gt3_sbbdck_sbrq = resData.getAttr('sbrq');
	gt3_sbbdck_yzpzzlDm = resData.getAttr('yzpzzlDm');
	gt3_sbbdck_sbsxDm1 = resData.getAttr('sbsxDm1');
	gt3_sbbdck_sbbckdxlmc = resData.getAttr('sbbckdxlmc');
	//gt3_sbbdck_sbbckdxlmc ="SB217QysdsCzzsYjd2015BO";//å…ˆæ¨¡æ‹Ÿä¸€ä¸‹
	var serviceName = "";
	var cxbj = "Y"; // 20160922
	if (gt3_sbbdck_yzpzzlDm == "BDA0610040" || gt3_sbbdck_yzpzzlDm == "BDA0610039" 
	       || "BDA0610994" == gt3_sbbdck_yzpzzlDm 
	       || gt3_sbbdck_yzpzzlDm == "BDA0610688" || gt3_sbbdck_yzpzzlDm =="BDA0610756" 
	       || gt3_sbbdck_yzpzzlDm =="BDA0610108" || gt3_sbbdck_yzpzzlDm =="BDA0610036" ||gt3_sbbdck_yzpzzlDm=='BDA0610098' 
	       || gt3_sbbdck_yzpzzlDm=='BDA0610099' || gt3_sbbdck_yzpzzlDm =="BDA0610070"|| gt3_sbbdck_yzpzzlDm =="BDA0610069"|| gt3_sbbdck_yzpzzlDm =="BDA0610289"
					 || "BDA0610084" == gt3_sbbdck_yzpzzlDm || "BDA0610114" == gt3_sbbdck_yzpzzlDm 
					 || "BDA0610748" == gt3_sbbdck_yzpzzlDm || "BDA0610118" == gt3_sbbdck_yzpzzlDm 
					 || "BDA0610749" == gt3_sbbdck_yzpzzlDm || "BDA0610095" == gt3_sbbdck_yzpzzlDm 
					 || "BDA0610678" == gt3_sbbdck_yzpzzlDm || "BDA0610017" == gt3_sbbdck_yzpzzlDm 
					 || "BDA0610019" == gt3_sbbdck_yzpzzlDm || "BDA0610090" == gt3_sbbdck_yzpzzlDm 
					 || "BDA0610109" == gt3_sbbdck_yzpzzlDm || "BDA0610110" == gt3_sbbdck_yzpzzlDm 
		             || "BDA0610732" == gt3_sbbdck_yzpzzlDm || "BDA0610735" == gt3_sbbdck_yzpzzlDm 
		             || "BDA0610738" == gt3_sbbdck_yzpzzlDm || "BDA0610744" == gt3_sbbdck_yzpzzlDm
		             || "BDA0619905" == gt3_sbbdck_yzpzzlDm//åœŸåœ°äº¤æ˜“ç”³æŠ¥
		             || "BDA0610764" == gt3_sbbdck_yzpzzlDm//æ ¸å®š2015
		             || "BDA0610809" == gt3_sbbdck_yzpzzlDm//åºŸå¼ƒç”µå­åŸºé‡‘2015
		             || "BDA0610100" == gt3_sbbdck_yzpzzlDm//é€šç”¨ç”³æŠ¥
		             || "BDA0610606" == gt3_sbbdck_yzpzzlDm//ä¸€èˆ¬äºº
		             || "BDA0610611" == gt3_sbbdck_yzpzzlDm//å°è§„æ¨¡
	                 || "BDA0610786" == gt3_sbbdck_yzpzzlDm//åœŸå¢žè¡¨ä¸ƒ         
		             || "BDA0610785" == gt3_sbbdck_yzpzzlDm//åœŸå¢žè¡¨å…­       
		             || "BDA0610683" == gt3_sbbdck_yzpzzlDm//åœŸå¢žè¡¨ä¸€   
		             || "BDA0610682" == gt3_sbbdck_yzpzzlDm//åœŸå¢žè¡¨ä¸‰
		             || "BDA0610783" == gt3_sbbdck_yzpzzlDm//åœŸå¢žè¡¨å››
		             || "BDA0610784" == gt3_sbbdck_yzpzzlDm//åœŸå¢žè¡¨äº”
		             || "BDA0610681" == gt3_sbbdck_yzpzzlDm//åœŸå¢žè¡¨äºŒ
		             || "BDA0610865" == gt3_sbbdck_yzpzzlDm//å¢žå€¼ç¨Žé¢„ç¼´
		             || "BDA0610058" == gt3_sbbdck_yzpzzlDm//å±…æ°‘ä¼ä¸šæ¸…ç®—ä¼ä¸šæ‰€å¾—ç¨Žç”³æŠ¥
		             || "BDA0610922" == gt3_sbbdck_yzpzzlDm//ä¼ä¸šå¹´åº¦å…³è”ä¸šåŠ¡å¾€æ¥æŠ¥å‘Š2016
		             || "BDA0610068" == gt3_sbbdck_yzpzzlDm//ä¼ä¸šå¹´åº¦å…³è”ä¸šåŠ¡å¾€æ¥æŠ¥å‘Šæ—§ç‰ˆ
		             || "BDA0611033" == gt3_sbbdck_yzpzzlDm//å±…æ°‘ä¼ä¸šï¼ˆæŸ¥è´¦å¾æ”¶ï¼‰ä¼ä¸šæ‰€å¾—ç¨Žæœˆï¼ˆå­£ï¼‰åº¦ç”³æŠ¥ï¼ˆ2018å¹´ç‰ˆï¼‰
		             || "BDA0610987" == gt3_sbbdck_yzpzzlDm//æ°´èµ„æºç¨Žç”³æŠ¥è¡¨A
		             || "BDA0610988" == gt3_sbbdck_yzpzzlDm) //æ°´èµ„æºç¨Žç”³æŠ¥è¡¨B	    
    {
		serviceName = "SBGyCtrl_sbbCkInitView";
	}
	else{
		serviceName = resData.getAttr('serviceName');
	}
	
	// 20160922 ç”³æŠ¥æœ‰æ‰“å°æŒ‰é’®ä¸é€‚ç”¨æž¶æž„çš„æ‰“å°
	if (gt3_sbbdck_yzpzzlDm == "BDA0610994"
			|| gt3_sbbdck_yzpzzlDm == "BDA0610987"
			|| gt3_sbbdck_yzpzzlDm == "BDA0610069"
			|| gt3_sbbdck_yzpzzlDm == "BDA0610070"
			|| gt3_sbbdck_yzpzzlDm == "BDA0610108"
			|| gt3_sbbdck_yzpzzlDm == "BDA0610794"
			|| gt3_sbbdck_yzpzzlDm == "BDA0610857"
			|| gt3_sbbdck_yzpzzlDm == "BDA0610887"
			|| "BDA0610088" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610809" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610750" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610081" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610865" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610611" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610988" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610986" == gt3_sbbdck_yzpzzlDm
			|| "BDA0611033" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610988" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610987" == gt3_sbbdck_yzpzzlDm
			|| "BDA0619905" == gt3_sbbdck_yzpzzlDm
			|| "BDA0610007" == gt3_sbbdck_yzpzzlDm
			|| "BDA0611054" == gt3_sbbdck_yzpzzlDm
			||"BDA0611055"==gt3_sbbdck_yzpzzlDm
			||"BDA0611056"==gt3_sbbdck_yzpzzlDm
			) {
		cxbj = "N";
	}
	
	gt3_sbbdck_gsdz = resData.getAttr('gsdz');
	if(gt3_sbbdck_gsdz=="Y"){
		// 20160922 ç”³æŠ¥æœ‰æ‰“å°æŒ‰é’®ä¸é€‚ç”¨æž¶æž„çš„æ‰“å°
		if (gt3_sbbdck_yzpzzlDm == "BDA0610994"
				|| gt3_sbbdck_yzpzzlDm == "BDA0610987"
				|| gt3_sbbdck_yzpzzlDm == "BDA0610069"
				|| gt3_sbbdck_yzpzzlDm == "BDA0610070"
				|| gt3_sbbdck_yzpzzlDm == "BDA0610108"
				|| gt3_sbbdck_yzpzzlDm == "BDA0610794"
				|| gt3_sbbdck_yzpzzlDm == "BDA0610857"
				|| gt3_sbbdck_yzpzzlDm == "BDA0610887"
				|| "BDA0610088" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610809" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610750" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610081" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610865" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610611" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610988" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610986" == gt3_sbbdck_yzpzzlDm
				|| "BDA0611033" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610988" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610987" == gt3_sbbdck_yzpzzlDm
				|| "BDA0619905" == gt3_sbbdck_yzpzzlDm
				|| "BDA0610007" == gt3_sbbdck_yzpzzlDm
				|| "BDA0611054" == gt3_sbbdck_yzpzzlDm
				||"BDA0611055"==gt3_sbbdck_yzpzzlDm
				||"BDA0611056"==gt3_sbbdck_yzpzzlDm		
		) {
			cxbj = "N";
		}
	}
	
	serviceName = serviceName+"?sName="+serviceName+"&cxbj="+cxbj; //cxbjä¸ºYè¡¨ç¤ºä¸èƒ½ä¿å­˜ï¼Œå¯æŸ¥çœ‹ï¼Œå¯æ‰“å°ã€‚ä¸ºNæ ‡è¯†æ›´æ­£åˆ†æ”¯ï¼Œå¯ä¿å­˜ã€‚
	
	// è½¬å‘æœåŠ¡è°ƒç”¨
	var serviceForwardBtn = new SwordSubmit();
	serviceForwardBtn.pushData('pzxh', gt3_sbbdck_pzxh);
	serviceForwardBtn.pushData('skssqq', gt3_sbbdck_skssqq);
	serviceForwardBtn.pushData('skssqz', gt3_sbbdck_skssqz);
	serviceForwardBtn.pushData('sbuuid', gt3_sbbdck_sbuuid);
	serviceForwardBtn.pushData('sblxDm', gt3_sbbdck_sbsxDm1);
	serviceForwardBtn.pushData('sbrq1', gt3_sbbdck_sbrq);
	serviceForwardBtn.pushData('djxh', gt3_sbbdck_djxh);
	serviceForwardBtn.pushData('yzpzzlDm', gt3_sbbdck_yzpzzlDm);
	serviceForwardBtn.pushData('sbbckdxlmc', gt3_sbbdck_sbbckdxlmc);
	serviceForwardBtn.pushData('cwgzbz', "cwgzbz");
	serviceForwardBtn.pushData('scenceCs', "sbbck");
	serviceForwardBtn.options.postType = "form";
	serviceForwardBtn.setCtrl(serviceName);
	serviceForwardBtn.submit();
}

/*
 * ä»¥ä¸‹ä¸ºç”³æŠ¥åŸŸç”³æŠ¥è¡¨æŸ¥çœ‹åŠŸèƒ½ç»Ÿä¸€æœåŠ¡å…¥å£
 * @param {Object} djxh ç™»è®°åºå·
 * @param {Object} pzxh å‡­è¯åºå·
 * @param {Object} sbuuid ç”³æŠ¥uuid
 * @param {Object} skssqq ç¨Žæ¬¾æ‰€å±žæœŸèµ·
 * @param {Object} skssqz ç¨Žæ¬¾æ‰€å±žæœŸæ­¢
 * @param {Object} sbrq ç”³æŠ¥æ—¥æœŸ
 * @param {Object} yzpzzlDm åº”å¾å‡­è¯ç§ç±»ä»£ç 
 * @param {Object} sbsxDm1 ç”³æŠ¥å±žæ€§ä»£ç 
 * @return {TypeName} å„ä¸ªç”¨ä¾‹æ•°æ®ä¿¡æ¯
 */
function sbbdckEntranceFromDzcx(djxh, pzxh, sbuuid, skssqq, skssqz, sbrq, yzpzzlDm, sbsxDm1) {
	if (djxh == null || djxh == undefined || djxh == "") {
		swordAlert("å½“å‰çº³ç¨Žäººç™»è®°åºå·ä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_djxh = djxh;
	}
	if (pzxh == null || pzxh == undefined || pzxh == "") {
		swordAlert("å½“å‰çº³ç¨ŽäººæŸ¥çœ‹ç”³æŠ¥æ•°æ®å‡­è¯åºå·ä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_pzxh = pzxh;
	}
	if (sbuuid == null || sbuuid == undefined || sbuuid == "") {
		swordAlert("å½“å‰çº³ç¨ŽäººæŸ¥çœ‹ç”³æŠ¥æ•°æ®ä¸»é”®ä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_sbuuid = sbuuid;
	}
	if (skssqq == null || skssqq == undefined || skssqq == "") {
		swordAlert("å½“å‰çº³ç¨ŽäººæŸ¥çœ‹ç”³æŠ¥æ•°æ®ç¨Žæ¬¾æ‰€å±žæœŸèµ·ä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_skssqq = skssqq;
	}
	if (skssqz == null || skssqz == undefined || skssqz == "") {
		swordAlert("å½“å‰çº³ç¨ŽäººæŸ¥çœ‹ç”³æŠ¥æ•°æ®ç¨Žæ¬¾æ‰€å±žæœŸæ­¢ä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_skssqz = skssqz;
	}
	if (sbrq == null || sbrq == undefined || sbrq == "") {
		swordAlert("å½“å‰çº³ç¨ŽäººæŸ¥çœ‹ç”³æŠ¥æ•°æ®ç”³æŠ¥æ—¥æœŸä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_sbrq = sbrq;
	}
	if (yzpzzlDm == null || yzpzzlDm == undefined || yzpzzlDm == "") {
		swordAlert("å½“å‰çº³ç¨ŽäººæŸ¥çœ‹ç”³æŠ¥æ•°æ®åº”å¾å‡­è¯ç§ç±»ä»£ç ä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_yzpzzlDm = yzpzzlDm;
	}
	if (sbsxDm1 == null || sbsxDm1 == undefined || sbsxDm1 == "") {
		swordAlert("å½“å‰çº³ç¨ŽäººæŸ¥çœ‹ç”³æŠ¥æ•°æ®ç”³æŠ¥å±žæ€§ä»£ç ä¸ºç©ºï¼Œè¯·é‡æ–°ä¼ å…¥ã€‚");
		return;
	} else {
		gt3_sbbdck_sbsxDm1 = sbsxDm1;
	}
	
	// æ ¹æ®åº”å¾å‡­è¯ç§ç±»ä»£ç èŽ·å–å¯¹åº”çš„å„ä¸ªç”¨ä¾‹Ctrlç±»æœåŠ¡åˆå§‹åŒ–æ•°æ®ä¿¡æ¯
	var getServiceNameBtn = new SwordSubmit();
	getServiceNameBtn.pushData('yzpzzlDm', gt3_sbbdck_yzpzzlDm);
	getServiceNameBtn.setCtrl("GY007SbSbbdxxCkCtrl_getServiceNameToYzpzzlDm");
	getServiceNameBtn.setFunction("onSuccess", "getServiceNameOnSuccess");
	getServiceNameBtn.submit();
}

// æ ¹æ®æŸ¥è¯¢å‡ºæ¥çš„æœåŠ¡åç§°å¼€å§‹è¿›è¡Œæ•°æ®è½¬å‘ï¼Œè°ƒç”¨å„ä¸ªå¯¹åº”ç”¨ä¾‹çš„ç”³æŠ¥é”™è¯¯æ›´æ­£æœåŠ¡è¿›è¡Œæ•°æ®å±•ç¤ºï¼ˆç”³æŠ¥åŸŸç”³æŠ¥è¡¨æŸ¥çœ‹å¤ç”¨è¯¥ä¸šåŠ¡é€»è¾‘ï¼‰
function getServiceNameOnSuccess(req, resData) {
	var serviceName = pc.getResData("serviceName", resData);

	// è½¬å‘æœåŠ¡è°ƒç”¨
	var serviceForwardBtn = new SwordSubmit();
	serviceForwardBtn.pushData('pzxh', gt3_sbbdck_pzxh);
	serviceForwardBtn.pushData('skssqq', gt3_sbbdck_skssqq);
	serviceForwardBtn.pushData('skssqz', gt3_sbbdck_skssqz);
	serviceForwardBtn.pushData('sbuuid', gt3_sbbdck_sbuuid);
	serviceForwardBtn.pushData('sblxDm', gt3_sbbdck_sbsxDm1);
	serviceForwardBtn.pushData('sbrq1', gt3_sbbdck_sbrq);
	serviceForwardBtn.pushData('djxh', gt3_sbbdck_djxh);
	serviceForwardBtn.pushData('yzpzzlDm', gt3_sbbdck_yzpzzlDm);
	serviceForwardBtn.pushData('cwgzbz', "cwgzbz");
	serviceForwardBtn.pushData('sbbck', "sbbck");
	serviceForwardBtn.setCtrl(serviceName.value);
	var t =swordAlertIframe('', {
		titleName : 'ç”³æŠ¥è¡¨å•æŸ¥çœ‹',
		width : 850,
		height : 400,
		param : window,
		submit : serviceForwardBtn,
		isNormal : 'false',
		isMax : 'true',
		isClose : 'true',
		isMin : "true"
	});
}
