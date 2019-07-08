try{
(function(){
	var hostname = window.location.hostname;
	if(!(/^\d+\.\d+\.\d+\.\d+$/.test(hostname))){
		var harr = hostname.split(".");
		var hl = harr.length;
		if(hl>1){
			try{
				document.domain=harr[hl-2]+"."+harr[hl-1];
			}catch(e){
				document.domain=harr[hl-3]+"."+harr[hl-2]+"."+harr[hl-1];
			}
		}
	}
}());
}catch(e){}
