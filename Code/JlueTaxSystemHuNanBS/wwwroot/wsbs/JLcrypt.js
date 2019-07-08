var serverPacket="";  	//服务器回传数据包
var clientAuthCode="";	//客户端认证码
var serverRandom="";    //服务器回传的随机数
var operType="";      	//操作类型
var userId="";        	//用户ID
var userPasswd = "";    //用户口令
var deviceType = "";	//设备类型
var devicePort = "";	//设备端口号
var userName="";        //用户姓名
var clientPubKey="";    //客户端公钥
var sysName="";         //子系统名称
var sysCode="";         //子系统代码
var userAccount="";     //用户登录子系统的帐号
var userPin="";         //用户登录子系统的密码
var CAstrResult=""        //证书信息
var strContainer= "";   //CTAS0001        "
var strProvider = "";   //WatchData Cryptographic Provider v3.0"
var nProvType   = 1;   //用于设备类型的开关选择

/**
 * 保存用户对设备的选择
 * @param userPin
 * @return
 */
function setDeviceParam(userPin)
{
    if (CryptCtrl.IsDeviceOpened()!= 0)
    {
    	CryptCtrl.CloseDevice();
    }
    CryptCtrl.strContainer = "";

    userPasswd = userPin;
}

/**
 * 打开设备
 * @param userPin
 * @return
 */
function openDevice(userPin)
{
   	var err = 0;

    setDeviceParam(userPin);
    
    if (CryptCtrl.IsDeviceOpened()!= 0)
    {
    	CryptCtrl.CloseDevice();
    }
    
   CryptCtrl.OpenDeviceEx(userPasswd) ;
  
    if(CryptCtrl.ErrCode==0x57)
    {
        CryptCtrl.OpenDeviceEx(userPasswd);
    }
    
    if (CryptCtrl.ErrCode != 0 && CryptCtrl.ErrCode != -1)
    {
    	alert(CryptCtrl.ErrMsg);
    }

    devicePort=CryptCtrl.strContainer;

    return CryptCtrl.ErrCode;
}

/**
 * 产生客户端数据包ClientHello
 * @return
 */
function MakeClientHello()
{
    //只要不是纯粹单向认证,就需要服务器证书
	var err = 0;
  	err = openDevice();
  	if (err != 0) 
  	return err;
    var vbNullString="";
    var dwFlag=0;
   	
   	CryptCtrl.ClientHello(dwFlag);
   	if(CryptCtrl.ErrCode != 0)
    {
   		return CryptCtrl.ErrCode
    }

   	return CryptCtrl.ErrCode;
}
/**
 * 从密码设备(即签名服务器)中读取证书函数
 * @return
 */
function ReadCert(){
	//需要读取的证书号:0、CA证书；1、加密证书；2、签名证书
	var certNo = "2";
	var err = 0;
  	err = openDevice();
  	if (err != 0) 
  	return err;
   	CryptCtrl.ReadCert(certNo);
	if (CryptCtrl.ErrCode != 0)
   	{
    	return CryptCtrl.ErrCode;
   	}
	CAstrResult = CryptCtrl.strResult;
    CryptCtrl.CloseDevice();
    return CryptCtrl.ErrCode;
}
/**
 * 取证书信息
 * @return
 */
function GetCertData(strCert,index){
  	var err = 0;
  	err = openDevice();

  	if (err != 0) 
  	return err;
  	
   	CryptCtrl.GetCertInfo(strCert,index);

   	if (CryptCtrl.ErrCode != 0)
   	{
    	return CryptCtrl.ErrCode;
   	}
   	var result = CryptCtrl.strResult;
    CryptCtrl.CloseDevice();
    return result;
}

/**
 * 验证服务器端的serverHello数据包，并生成客户端认证码
 * @return
 */
function MakeClientAuthCode()
{
  	var err = 0;
  	err = openDevice();

  	if (err != 0) 
  	return err;
   	CryptCtrl.ClientAuth(serverPacket);

   	if (CryptCtrl.ErrCode != 0)
   	{
    	alert(CryptCtrl.ErrMsg);
    	return CryptCtrl.ErrCode;
   	}
   	clientAuthCode = CryptCtrl.strResult;
    CryptCtrl.CloseDevice();
    //userId = CryptCtrl.strUserId;
    return CryptCtrl.ErrCode;
}

/**
 * 验证并修改口令
 * @return
 */
function changePin()
{
   if(openDevice()==0)
   {
        CryptCtrl.ChangePinEx();
        alert(CryptCtrl.ErrMsg);
   }
}

/**
 * 对数据进行数字签名
 * @param strData
 * @param signTime
 * @param flag
 * @return
 */
function signData(strData,signTime,flag)
{
	var err = 0;
	err = openDevice();
	if (err != 0) return err;
	CryptCtrl.SignData(strData,strData.length,"SHA1withRSA",signTime,flag);
	if(CryptCtrl.ErrCode != 0)
	{
		alert(CryptCtrl.ErrMsg);
		return CryptCtrl.ErrCode;
	}
	strSignedCode = CryptCtrl.strResult;
	CryptCtrl.CloseDevice();
	return CryptCtrl.ErrCode;
}
/**  
* 执行基本ajax请求,返回XMLHttpRequest  
* Ajax.request(url,{
*      method  请求方式 POST or GET(默认)  
*      data    请求参数 (键值对字符串)  
*      handler 请求后响应函数，参数为返回的数据  
* });
*/ 
IscAjax = function() {  

    function request(url, opt) {  

        function fn(){}  

        var method  = opt.method    || 'GET',  
            data    = opt.data      || null,  
            handler = opt.handler   || fn,
            method  = method.toUpperCase();  

        if ( method == 'GET' && data) {  
            url += (url.indexOf('?') == -1 ? '?' : '&') + data;  
            data = null;  
        }
        
        var xhr = function GetXMLHttpObj()
        {
            var xmlHttpObj = null;
            try {
            	xmlHttpObj = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e) {
                try {
                    xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(sc) {
                    xmlHttpObj = null;
                }
            }
            
            if ( !xmlHttpObj && typeof XMLHttpRequest != "undefined" ) {
                xmlHttpObj = new XMLHttpRequest();
            }
            
            return xmlHttpObj;
        }();

        xhr.onreadystatechange = function() {
            _onStateChange(xhr, handler);
        };

        xhr.open(method, url, false);

        if(method == 'POST'){  
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
        }

        xhr.send(data);
        return xhr;   
    }  

    function _onStateChange(xhr, handler){
        
        if(xhr.readyState == 4){

            var s = xhr.status;  
            if(s>= 200 && s < 300){  
            	handler(xhr.responseText);  
            }
            else{  
            	handler("-1::"+xhr.status);  
            }  
        }
        else{}  
    }  
    return {request:request};     
}(); 

/**
 * 回车事件
 * @return
 */
function OnKeyPress() {
    if (window.event.keyCode == 13) {
        SecureLogin();
    }
} 
