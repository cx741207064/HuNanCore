var $cacheObj = (function () {
	var topCache = $swfcacheobject;
	var isCache = false;
	if(!topCache){
		return null;
	}
	isCache = true;
	return {
		get: function(key,fn){
			return $swfcacheobject.get(key,fn);
		},
		set: function(key,val,fn){
			$swfcacheobject.set(key,val,fn);
		},
		remove: function(key,fn){
			return $swfcacheobject.remove(key,fn);
		}
	}
}());
