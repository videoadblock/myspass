
var project = 'myspass';

function domElem(id){
	return document.getElementById(id);
}

function showElem(id){
	document.getElementById(id).style.display = 'block';
}
function hideElem(id){
	document.getElementById(id).style.display = 'none';
}



function closeFlyout(layoutIndex) {
    hideElem('formatOverlay'+layoutIndex);
    adBoxFlyOut(true);
    $('#arrowNavi').remove();
}


function getUrlAsRubric(){
    
    rubrics = document.location.href.split("/");
    rubrics.shift();
    rubrics.shift();
    rubrics.shift();

    if(rubrics[0] != "myspass")
    {
        rubrics.splice(0, 0, "myspass");
    }

    return rubrics;
}




function createIframe (iframeName, width, height) {
	var iframe;
	if (document.createElement && (iframe = document.createElement('iframe'))) {
		iframe.name = iframe.id = iframeName;
		iframe.width = width;
		iframe.height = height;
		iframe.src = 'about:blank';
		document.body.appendChild(iframe);
	}
	return iframe;
}


function post(URL, PARAMS) {
	var temp=document.createElement("form");
	temp.action=URL;
	temp.method="POST";
	temp.style.display="none";
	for(var x in PARAMS) {
		var opt=document.createElement("textarea");
		opt.name=x;
		opt.value=PARAMS[x];
		temp.appendChild(opt);
	}
	document.body.appendChild(temp);
	temp.submit();
	return temp;
}






function checkTextareaLength(target, errormsg, length){
    var x = document.getElementById(target).value;
    
    var currentTextLength = length - x.length;
    if(currentTextLength < 0)
    currentTextLength = 0;
    
    document.getElementById(errormsg).innerHTML = currentTextLength;
    
    if (x.length > length) {
          x = x.substring(0, length);
          //alert("Du kannst maximal " + length + " Zeichen angeben.");
    };
    document.getElementById(target).value = x;
}



function resetSearch(){
	if(document.getElementById('suchfeld').value == 'Suchbegriff...'){
		document.getElementById('suchfeld').value = '';
	}
}

function redirect(url, timeOut){
	window.setTimeout("location.href='"+url+"';", timeOut*1000);
}



/*
 * RTL NOW Iframe
 */
function coopWriteRTLNOWIframe(iframeUrl, iframeWidth, iframeHeight){
	var iframeCode = '<iframe allowtransparency="true" scrolling="no" frameborder="0" src="'+ iframeUrl +'&width=' + iframeWidth + '&height=' + iframeHeight + '" width="'+ iframeWidth +'" height="'+ iframeHeight +'" style="border:0px;"> Es werden keine Iframes unterstÃ¼tzt!</iframe>';
	return iframeCode;
}
		
		
/***************************
Cookie Handling
****************************/

function SetCookie(name,value,duration){
	now=new Date();
	end=new Date(now.getTime()+duration*86400000);
	document.cookie=name+"="+value+";expires="+end.toGMTString()+";";
}


function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


/***************************
Pageination
****************************/
function setPageByAjaxTextfield(currentPage, pagesTotal, e, ajaxParams, targetId){
	
	var code = (!e) ? event.keyCode : e.which;
	
	if(code == 13)
	{
		var maxPage = parseInt(pagesTotal);
		var pageNumber = document.getElementById(targetId + '_textfield').value;
		pageNumber = parseInt(pageNumber);

		if(pageNumber >= maxPage)
		{
			pageNumber = maxPage;
		}
		else if(pageNumber <= 0)
		{
			pageNumber = 1;
		}
		
		pageNumber = pageNumber - 1;
		var ajaxParams = ajaxParams + "&pageNumber=" + pageNumber;
		ajax('', 'ajax.php', ajaxParams, targetId, '', true);
	}
}















/*
 * GET DATA
 */
function ajax(method, url, action, target, formularId, animation){

  
  if(typeof method == 'undefined' || method == '') method = 'GET';

  if(url == 'ajax.php') url = '/myspass/includes/php/ajax.php';
  if(action != '') action='?action='+action;

  url = url + action;


  if(typeof target == 'undefined'){
    return false;
  }
  

  // todo
  // formularId, formular on the fly erstellen

  if(typeof animation == 'undefined') animation = 'false';


  $.ajax({
    type: method,
    url: url
  })
  .done(function( msg ) {

      if(animation)
      $("#" + target).html(msg).fadeIn();
      else
      $("#" + target).html(msg);  
  });
}











function clickCommentForm(e)
{
  if(e.innerHTML == 'Ein Kommentar hinterlassen...')
  {
    e.innerHTML = '';
    e.style.color = '#333';
  }
        else if (e.innerHTML == '')
        {
            e.innerHTML = 'Ein Kommentar hinterlassen...';
        }            
}
















/*
 * GET DATA
 */

var HTTP_GET_VARS = new Array();
strGET=document.location.search.substr(1,document.location.search.length);
if(strGET!=''){
	gArr=strGET.split('&');
	for(i=0;i<gArr.length;++i){
		v='';vArr=gArr[i].split('=');
		if(vArr.length>1){v=vArr[1];}
		HTTP_GET_VARS[unescape(vArr[0])]=unescape(v);
	}
}
function GET(v){
	if(!HTTP_GET_VARS[v]){return 'undefined';}
	return HTTP_GET_VARS[v];
}

/* ajax Suche */
/*
 * @author RenÃ© Welbers <rwelbers@brainpool.de>
 * @return none
 * @function Starts the Search via YUI Ajax function
 */
function ajaxSearch()
{
	/*
	 * Check the Get Parameter for Searchtype, and if its 'article'
	 * then start the Swish-E Search via Ajax, 
	 * else start the Database Search
	 */
	if(GET('searchtype') == 'articles')
		ajax('GET','/cgi-bin/swish_'+project+'.cgi?query='+document.getElementById('query').value+'&metaname=all&sort=swishrank&start='+GET('start'),'','swish-e_search_container');
	else
		ajax('','ajax.php','search','swish-e_search_container','ajaxSearch');
	
}







// Führende und Abschließende Whitespaces (Leerzeichen, Tabulatoren, ...)
// aus der übergebenen Zeichenkette entfernen.
function trim (zeichenkette) {
  // Erst führende, dann Abschließende Whitespaces entfernen
  // und das Ergebnis dieser Operationen zurückliefern
  return zeichenkette.replace (/^\s+/, "").replace (/\s+$/, "");
}












function top5Over(pointer,imgelem,images,linkelem,links,formats)
{

	document.getElementById(imgelem).src = images[pointer];
	document.getElementById(imgelem).alt = formats[pointer];
	document.getElementById(imgelem + '_href').href = links[pointer];
	
	document.getElementById(linkelem[pointer]).style.backgroundColor = '#FBA400';
	document.getElementById(linkelem[pointer]).style.color = '#FFF';
	document.getElementById(linkelem[pointer]).style.fontWeight = 'bold';
}

function top5Out(linkelem)
{
	document.getElementById(linkelem).style.backgroundColor = '#F5F5F5';
	document.getElementById(linkelem).style.color = '#000';
	document.getElementById(linkelem).style.fontWeight = 'normal';
}	
	
	
	
function toggleElementVisibility(e)
{
	if (typeof(e) != 'object') e = domElem(e);
	if (e.style.display == 'none') e.style.display = 'block';
	else e.style.display = 'none';
}






/*
 * FSK output
 */
function getFSKText()
{
  var cookieValue = $.cookie('_fsk16');
  if((cookieValue == '1') || (cookieValue == 1))
  {

    $("#fskContainer").hide();
  }
}













function flyOut(index)
{ 
    if(index == 1)
    {
        hideElem('formatOverlay1');
        hideElem('formatOverlay2');
        showElem('formatOverlay0');
        adBoxFlyOut(false);
    }
    else if(index == 2)
    {
        hideElem('formatOverlay0');
        hideElem('formatOverlay2');
        showElem('formatOverlay1');
        adBoxFlyOut(false);
    }
    else if(index == 3)
    {
        hideElem('formatOverlay0');
        hideElem('formatOverlay1');
        showElem('formatOverlay2');
        adBoxFlyOut(false);
    }
}

function adBoxFlyOut(status)
{
        var teaserSliderTest = document.getElementById("slideShow");

        if(teaserSliderTest == null)
        {
            if(status == false)
            {
                if(document.getElementById("source_content_ad"))
                {
                    document.getElementById("source_content_ad");
                }
            }
            else
            {
                if(document.getElementById("source_content_ad"))
                {
                    document.getElementById("source_content_ad").style.visibility = "visible";
                }
            }
        }
} 


















//   return YAHOO.util.Dom.hasClass(el, cn) ? YAHOO.util.Dom.removeClass(el, cn) : YAHOO.util.Dom.addClass(el, cn);
// onfocus="clickCommentForm(this);" onblur="clickCommentForm(this);
function refreshCommentTextBox()
{
  var frm = document.getElementById('commentFrom');
  var txt = document.getElementById('writeCommentTextarea');
  if(txt)
  {
      if (get_current_user())
      {
          // show comments
          YAHOO.util.Dom.removeClass(frm, 'disabled');
          txt.innerHTML     = 'Ein Kommentar hinterlassen...';
          txt.style.color   = '#000000'
          txt.style.cursor  = 'text';
          txt.onclick       = '';
          txt.onblur        = 'clickCommentForm(this);';
          txt.onfocus       = 'clickCommentForm(this);';
          txt.removeAttribute("readonly"); 
      }
      else
      {
          // hide 'em
          YAHOO.util.Dom.addClass(frm, 'disabled');
          txt.innerHTML     = 'Um einen Kommentar zu schreiben musst du dich einloggen.';
          txt.style.cursor  = 'pointer';
          txt.onclick       = 'bacs_modal_show_login(); return false;';
          txt.onblur        = '';
          txt.onfocus       = '';
          txt.setAttribute("readonly", true);
      }
  }    
}

function refreshComments() {
    var videoID = 0;
    contentType = 'video';
    
    var elemObject = document.getElementsByTagName( 'input' );
    for(i = 0; elemObject.length>i; i++ )
    {
         if( elemObject[i].getAttribute('name') == 'contentId' )
         {
             videoID = elemObject[i].getAttribute('value');
         }
         if( elemObject[i].getAttribute('name') == 'contentType' )
         {
             contentType = elemObject[i].getAttribute('value');
         }
    }
    


    var idForReload = 'mySpassCContainer_' + videoID;
    var commentContainer = document.getElementById( idForReload );
   
    if(commentContainer)
    {
        ajax('', 'ajax.php', 'getComments&id='+videoID+'&type='+contentType+'&ajax=true&commentsInit=MySpass&pageNumber=0', idForReload , '', false);
        _gaq.push(['_trackPageview', window.location.pathname + '?comment=1']);
    }
}




function trigger_error(msg, e)
{
    alert(e + ' - ' + msg);
}




/*  181111 - save/post vb_comments via ajax
 *      !DRY, ajax() @ yui_functions
 */
function saveComment(contentId, contentType, userId, areaId)
{
    var frm;
    
    if (frm = document.getElementById("commentFrom"))
    {
        if (get_current_user())
        {
            ajax('POST','ajax.php','setComment&id=' + contentId + '&type=' + contentType + '&userID=' + userId + '&text=' + escape(document.getElementById( areaId ).value) + '&ajax=true','commentResponse','commentFrom');
        }
        else
        {
            trigger_error('Du bist nicht ordnungsgemäß eingeloggt. Bitte log dich neu ein und versuche es noch mal.', 'E_ERROR');
        }
    }
}







function registerNewsletter(mail, newsletterId){
   var link = "/myspass/popup/newsletter.html?email=" + mail, 
       newsletterWindow = window.open(link, "Newsletter", "width=600,height=310,status=yes,scrollbars=no,resizable=no");
   newsletterWindow.focus();
}








function collapseTextcontainer(elem)
{
        var animText = $( elem ).parent().parent().find( ".textboxSecondPart");
        var animShow = $( elem ).parent().find( ".textboxLink");
        var animHide = $( elem ).parent().find( ".textboxLinkClose");
        
        $( animText ).toggle( "slow", function() {
            $( animShow ).toggle();
            $( animHide ).toggle();
        });
        
        return false;
}




