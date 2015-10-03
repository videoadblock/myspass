/*
 * In dieser datei sind Javascript funktionen zur steuerung und initialisierung
 * des video players enthalten
*/

var project = "myspass";
var vp_global=new Array();  // Achtung, das vp_global array kann zusaetzliche config variablen zu einer video id enthalten!
var videoAppBasePath="/"+project+"/includes/apps/player";
var defaultDivId="player";

/*
function initializeVideo(videoid,divid,startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
	_initializePlayer(videoid,divid,startposition,videoAppBasePath+"/standard/")	
}
*/
function initializeVideoSOI(videoid, chapter, divid, startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
        
        vp_global[videoid] = new Array();   
        vp_global[videoid]["flashid"]      = divid; 
        _initializePlayer(videoid,divid,startposition,videoAppBasePath+"/standard_soi/", chapter);
}



function initializeVideo(videoid, chapter, divid, startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
	_initializePlayer(videoid,divid,startposition,videoAppBasePath+"/standard_as3/", chapter);
}


function initializeFSKVideo(videoid, chapter, divid, startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
	_initializePlayer(videoid,divid,startposition,videoAppBasePath+"/standard_as3_fsk/", chapter);
}


function initializeVideoStroeerSmartClip(videoid, chapter, divid, startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
	_initializePlayer(videoid,divid,startposition,videoAppBasePath+"/standard_test201108/", chapter);
}
// Adtest is Smartclip only
function initializeAdTest(videoid,divid,startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
	_initializePlayer(videoid,divid,startposition,videoAppBasePath+"/adplayersmartclip/")	
}

// Stroeer only
function initializeAdTestStroeer(videoid,divid,startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
	_initializePlayer(videoid,divid,startposition,videoAppBasePath+"/adplayerstroeer/")	
}

// Stroeer +Smartclip
function initializeAdTestStroerSmart(videoid,divid,startposition) {  
	if(typeof divid=="undefined"){
		divid=defaultDivId;
	}
	_initializePlayer(videoid,divid,startposition,videoAppBasePath+"/adplayerstroersmart/")	
}

function onPlayerInitialized(){
        // Trigger autoplay, after video is initialised, and SOI ADS ARE AVAILABLE!
        setFlashPlayerRequest(defaultDivId,"startplay");
}


function onVideoplayerInitialize(){}



 // Diese funktion liefert einfach ein Flash Object zurueck welches man bis
 // version 8 einfach mit punkt notation ansprechen kann              
                
function getFlashMovieObject(movieName)
{
  if (window.document[movieName]) 
  {
      return window.document[movieName];
  }
  if (navigator.appName.indexOf("Microsoft Internet")==-1)
  {
    if (document.embeds && document.embeds[movieName])
      return document.embeds[movieName]; 
  }
  else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
  {
    return document.getElementById(movieName);
  }
}



// Diese Funktion dient dazu einen Ad Server Request an den Flashplayer in der div id "flashid" zu setzen
// aufgerufen wird diese funktion DIREKT aus dem FlashVideoPlayer
// Parameter: 
// flashid: Die DIV Id des Flash Elementes
// adtype: dies kann ein beliebiger strin sein ist aber meistens: (sponsor1,preroll1,postroll1)
// PSD-Funktionen, soi, som
function fpWriteAvtData(flashid, adtype, industry) {
	if(  flashid=="undefined"){
		flashid = defaultDivId;
	}
         
	var url = TVT_VideoAdRequest(adtype, industry);
	 
	    getFlashMovieObject(flashid).SetVariable("avtUrl", url); 
}


function fpGetAdd2Tag(objId) {
    if (objId != undefined) {
        getFlashMovieObject(objId).SetVariable("add2tag", add2tag);
    } else {
        getFlashMovieObject(defaultDivId).SetVariable("add2tag", add2tag);
    }
}

var mys_playerready=false;
var mys_adsready=false;

var mys_intervalcount=1000;
var mys_intervalid;
                /**
 * This is the callback function called by the videoplayer upon finishing initialisation
 */
function onPlayerInitialized(){
        mys_playerready=true;
        // Trigger autoplay, after video is initialised, and SOI ADS ARE AVAILABLE!
		//alert("Player ready!");

        mys_CheckStart();
}


function mys_AdsReady(){
	//alert("Adsready");
        mys_adsready=true
        mys_CheckStart();
                }


function mys_CheckStart(){
        mys_intervalcount--;
        clearInterval(mys_intervalid);

        if(mys_adsready&&mys_playerready||mys_intervalcount<0)
        {
		//	alert("Starting Play");
             setFlashPlayerRequest(defaultDivId,"startplay");
        }else{
            mys_intervalid=setInterval(mys_CheckStart,100);
        }
}


function setFlashPlayerRequest(flashid,request){ 
    //getFlashMovieObject(flashid).SetVariable("setRequest",request)
	// AS3 
	getFlashMovieObject(flashid).setCommand(request);
}




 

// Diese funktion sollte nicht direkt aufgerufen werden, das "_" signalisiert
// eine private funktion ;)
function _initializePlayer(videoid,divid,startposition,configpath, chapter){
	 
	var so = new SWFObject(configpath+"player_core.swf", "player", "100%", "100%", "10","#000000");
//	var adAp = ";"+getAvtSubRubric()+"tile=3;sz=320x240;";
	//var adAp=";formt=28;subfm=8;tile=4;sz=320x240;"
	so.useExpressInstall("/"+project+"/media/flash/player/expressinstall.swf");
	so.addParam("menu","false");
	so.addParam("wmode","opaque");
	so.addParam("quality","high");
	so.addParam("allowScriptAccess","always");
	so.addParam("allowFullScreenInteractive","true");
	so.addParam("allowFullScreen","true");
	so.addVariable("asf", videoid);	 
	if(typeof startposition!="undefined"){
		so.addVariable("startposition",startposition);
	}
	if (!isNaN(GET('sp')))
	{
		vp_global[videoid] = new Array();
		vp_global[videoid]['startposition'] = GET('sp');
	}
	if(typeof chapter != "undefined" && chapter != ''){
		vp_global[videoid] = new Array();
		vp_global[videoid]['chapter'] = chapter;
	}
		
	for (i in vp_global[videoid]) {
	//	alert(i+"=="+vp_global[videoid][i])
		so.addVariable(i,vp_global[videoid]	[i])
	}
        
        
        if(typeof n_pbt != 'undefined')
        {
		so.addVariable("adAp",";"+n_pbt);
	}
	
	//alert(adAp);
	if(configpath.search(/.*\/standard\/.*/)==-1){
	so.addVariable("config", configpath+"config.xml");	
	
	}else{
		// Fix für falsch eingebundenen facebook embed player, umleiten der standard
		// myspass config auf neue config
		so.addVariable("config", configpath+"config_myspass.xml");	
	}
        

        obj = deconcept.SWFObjectUtil.getPlayerVersion();
        if(obj.major <= 0){
            noFlashMessage = '<p style="width:100%; text-align: center; margin-top:150px;font-size:12px;">Wie du siehst, siehst du nichts! Das liegt einfach daran, dass du anscheinend keinen Flashplayer installiert hast.  <br /><a href="http://www.adobe.com/go/getflashplayer" target="_blank">Kein Problem, hier kannst du Adobe Flash kostenlos herunterladen!</a><br /><br /><br /><br /><br /></p>';
            if(document.getElementById(divid))
                document.getElementById(divid).innerHTML = noFlashMessage;
        }
        else if(obj.major <= 9){
            //alert("Flasj installiert, aber kleiner als Version 9");
        }

	so.write(divid);
}



function initializeNoAdVideo(videoid,chapter,divid, startposition){
    //var so = new SWFObject("/myspass/includes/apps/player/standard/player_core.swf", "player", "100%", "100%", "9","#000000");
    var so = new SWFObject("/myspass/includes/apps/player/standard_as3/player_core.swf", "player", "100%", "100%", "9","#000000");
        so.useExpressInstall("/"+project+"/media/flash/player/expressinstall.swf");
	so.addParam("menu","false");
	so.addParam("wmode","opaque");
	so.addParam("quality","high");
	so.addParam("allowScriptAccess","always");
	so.addParam("allowFullScreenInteractive","true");
	so.addParam("allowFullScreen","true");
	so.addVariable("asf", videoid);	
        

	if(typeof startposition!="undefined"){
		so.addVariable("startposition",startposition);
	}
	if (!isNaN(GET('sp')))
	{
		vp_global[videoid] = new Array();
		vp_global[videoid]['startposition'] = GET('sp');
	}
	if(typeof chapter != "undefined" && chapter != ''){
		vp_global[videoid] = new Array();
		vp_global[videoid]['chapter'] = chapter;
	}
		
	for (i in vp_global[videoid]) {
	//	alert(i+"=="+vp_global[videoid][i])
		so.addVariable(i,vp_global[videoid]	[i])
	}
        
        
        if(typeof n_pbt != 'undefined')
        {
		so.addVariable("adAp",";"+n_pbt);
	}
	
        so.addVariable("config", "/myspass/includes/apps/player/standard_as3/config_noavt.xml");
	//so.addVariable("config", "/myspass/includes/apps/player/standard/config_myspass_noads.xml");	
        
        
        
        obj = deconcept.SWFObjectUtil.getPlayerVersion();
        if(obj.major <= 0){
            noFlashMessage = '<p style="width:100%; text-align: center; margin-top:150px;font-size:12px;">Wie du siehst, siehst du nichts! Das liegt einfach daran, dass du anscheinend keinen Flashplayer installiert hast.  <br /><a href="http://www.adobe.com/go/getflashplayer" target="_blank">Kein Problem, hier kannst du Adobe Flash kostenlos herunterladen!</a><br /><br /><br /><br /><br /></p>';
            if(document.getElementById(divid))
                document.getElementById(divid).innerHTML = noFlashMessage;
        }
        else if(obj.major <= 9){
            //alert("Flash installiert, aber kleiner als Version 9");
        }
        
        
	so.write(divid);  
}


function initializeNoAdNoAutoplayVideo(videoid,chapter,divid, startposition){
    var so = new SWFObject("/myspass/includes/apps/player/standard_as3/player_core.swf", "player", "100%", "100%", "9","#000000");
        so.useExpressInstall("/"+project+"/media/flash/player/expressinstall.swf");
	so.addParam("menu","false");
	so.addParam("wmode","opaque");
	so.addParam("quality","high");
	so.addParam("allowScriptAccess","always");
	so.addParam("allowFullScreenInteractive","true");
	so.addParam("allowFullScreen","true");
	so.addVariable("asf", videoid);	
        

	if(typeof startposition!="undefined"){
		so.addVariable("startposition",startposition);
	}
	if (!isNaN(GET('sp')))
	{
		vp_global[videoid] = new Array();
		vp_global[videoid]['startposition'] = GET('sp');
	}
	if(typeof chapter != "undefined" && chapter != ''){
		vp_global[videoid] = new Array();
		vp_global[videoid]['chapter'] = chapter;
	}
		
	for (i in vp_global[videoid]) {
	//	alert(i+"=="+vp_global[videoid][i])
		so.addVariable(i,vp_global[videoid]	[i])
	}
        
        
        if(typeof n_pbt != 'undefined')
        {
		so.addVariable("adAp",";"+n_pbt);
	}
	
        
	so.addVariable("config", "/myspass/includes/apps/player/standard_as3/config_noavt_noautoplay.xml");	
        
        obj = deconcept.SWFObjectUtil.getPlayerVersion();
        if(obj.major <= 0){
            noFlashMessage = '<p style="width:100%; text-align: center; margin-top:150px;font-size:12px;">Wie du siehst, siehst du nichts! Das liegt einfach daran, dass du anscheinend keinen Flashplayer installiert hast.  <br /><a href="http://www.adobe.com/go/getflashplayer" target="_blank">Kein Problem, hier kannst du Adobe Flash kostenlos herunterladen!</a><br /><br /><br /><br /><br /></p>';
            if(document.getElementById(divid))
                document.getElementById(divid).innerHTML = noFlashMessage;
        }
        else if(obj.major <= 9){
            //alert("Flash installiert, aber kleiner als Version 9");
        }
        
        
	so.write(divid);  
}