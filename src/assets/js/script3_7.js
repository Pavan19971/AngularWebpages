/*
 * Author		: Rajasekhar Chittattooru
 * Description 	: Common JavaScripts for MVC Project
 */

// popup window properties
var winProps = 'toolbars=0, menubar=0,scrollbars=1,resizable=1,location=0,status=0,copyhistory=0,directories=0';

var PAGE_SIZE = 10; // default number of records per page
var ADULT_ID = 16;
var CHILD_ID = 17;
var MALE_ID = 24;
var FEMALE_ID = 25;

// report engine URL path
var rptServerPath = "";
var accomPrice=0;

// global function identify the browser type and version
(function(){
	var userAgent = navigator.userAgent.toLowerCase();
	window.browser = {
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
		safari: /webkit/.test( userAgent ),
		opera: /opera/.test( userAgent ),
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
		chrome: /chrome/.test( userAgent )
	};
})();

function $() {
    var elements = new Array();

    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];

        if (typeof element == 'string')
            element = document.getElementById(element);

        if (arguments.length == 1)
            return element;

        elements.push(element);
    }
    return elements;
}
function recordOutboundLink(link, category, action) {
  try {
    var pageTracker=_gat._getTracker("UA-XXXXX-X");
    pageTracker._trackEvent(category, action);
    setTimeout('document.location = "' + link.href + '"', 100);
  }catch(err){}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showClock() {
	var dayarray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	serverdate.setSeconds(serverdate.getSeconds()+1);
    var hours = serverdate.getHours();
    var minutes = serverdate.getMinutes();
    var seconds = serverdate.getSeconds();
    var day = serverdate.getDay();
    var date = serverdate.getDate();
    var month = serverdate.getMonth();
    var year = serverdate.getYear();

    var dn = "PM";
    if (hours < 12) {
        dn = "AM";
    }
    if (hours > 12) {
        hours = hours-12;
    }
    if (hours == 0) {
        hours=12;
    }
    if (minutes <= 9) {
        minutes = "0"+minutes;
    }
    if (seconds <= 9) {
        seconds = "0"+seconds;
    }

    if (year < 1000) {
        year += 1900;
    }

    var ctime = hours+": "+minutes+": "+seconds+" "+dn+", "+dayarray[day]+", "+date+" " + montharray[month]+" "+year;
	document.getElementById("clock").innerHTML = ctime;
	setTimeout("showClock()",1000);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function disableCtrlKeyCombination(e) {
	// list all CTRL + key combinations you want to disable
    var forbiddenKeys = new Array("a", "n", "c", "x", "v", "j", "p");
    var key;
    var isCtrl;
    if(window.event) {
    	key = window.event.keyCode;     // IE
        if(window.event.ctrlKey)
        	isCtrl = true;
        else
        	isCtrl = false;
    } else {
    	key = e.which;     // firefox
        if(e.ctrlKey)
        	isCtrl = true;
        else
        	isCtrl = false;
    }
    // if ctrl is pressed check if other key is in forbidenKeys array
    if(isCtrl) {
    	for(var i=0; i<forbiddenKeys.length; i++) {
    		// case-insensitive comparation
            if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
            	alert("Key combination CTRL + "+String.fromCharCode(key)+" has been disabled.");
                return false;
            }
    	}
    }
    return true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeDiv(parentDiv, childDiv) {
	
	if(parentDiv != null && parentDiv != "" && childDiv != null && childDiv != "") {
		var parent = document.getElementById(parentDiv);
		if(parent != null) {
			var children = parent.getElementsByTagName('div')[0];
			if(children != null) {
				parent.removeChild(children);
			}
		}
	}
}
function removeComboItems(obj){
    var selctdVal = obj.options[obj.selectedIndex].value;
    for (var i=0; i<obj.options.length; i++) {
		if(obj.options[i].value == selctdVal)  {
			continue;
		}
    	obj.remove(i);
    }
}
function createDiv(divId) {
	var divTag = document.createElement("div");
    divTag.id = divId;
    divTag.setAttribute("align","center");
    divTag.style.margin = "0px auto";
    return divTag;
}
function setAutocompleteOff() {
	if (document.getElementsByTagName) {
		var inputElements = document.getElementsByTagName("input");
		for (var i=0; inputElements[i]; i++) {
			if (inputElements[i].className && (inputElements[i].className.indexOf("disableAutoComplete") != -1)) {
				inputElements[i].setAttribute("autocomplete","off");
			}
		}
	}
}
function submitLogin(srcObj, eventObj) {
	var charCode = (eventObj.which) ? eventObj.which : event.keyCode;
	if(charCode == '13') {
		document.getElementById("submitBtn").click();
	}
}
/*
 * This function extends the basic JavaScript escape() functionality by also
 * encoding the '+' sign, which will otherwise be mistaken for a space.
 */
function URLencode(str)
{
    ns = escape(str);
    os = "";

    for(var i=ns.indexOf("+");-1!=i;i=ns.indexOf("+"))
    {
        os += ns.substr(0,i);
        os += "%2B";
        ns = ns.substr(i+1);
    }
    if(0 == os.length)
    {
        os = ns;
    }

    return os;
}

/*
 * This function extends the basic JavaScript escape() functionality by also
 * encoding the '+' sign, which will otherwise be mistaken for a space.
 */
function URLencode(str)
{
    ns = escape(str);
    os = "";

    for(var i=ns.indexOf("+");-1!=i;i=ns.indexOf("+"))
    {
        os += ns.substr(0,i);
        os += "%2B";
        ns = ns.substr(i+1);
    }
    if(0 == os.length)
    {
        os = ns;
    }

    return os;
}

// Returns an array containing old items (in current URL) check
function getQueryArgs()
{
    if(null == location.search)
    {		
        return new Array();	
    }	
    args = location.search.split("?");	
    if(args.length < 2)	
    {		
        return new Array();	
    }	
    s = args[1];
    args = s.split("&");
    return args;
}

/*
 * 
 * Scans the query-string of the URL of the current page and returns an array
 * holding the values for the elements of the requested name. That is, if the
 * current query string is
 * 
 * ?arg1=val1&arg2=val2U&arg2=val3&arg4=val4
 * 
 * then getFromUrl("arg1") would return ["val1"], and getFromUrl("arg2") would
 * return ["arg2","arg3"]
 * 
 */
function getFromUrl(param)
{
    n = new Array();
    count = 0;
    args = getQueryArgs();
    for(var i=0;i<args.length;i++)
    {
        nv = args[i].split("=");
        if(nv[0] != param)
        {
            continue;
        }
        n[count++] = nv[1];
    }
    return n;
}

function popUpWin(url, winName) {
	var childWin = window.open(url, winName, winProps+',width=1100, height=780');
}
function serviceHaltPopUp(url, winName) {
	var childWin = window.open(url, winName, winProps+',width=700, height=400, resizable=0');
}
/*
 * Redirect to another specified URL
 */
function gotoPage(url) {
	if (url == '') {
		url = '#';
	}
    location.href=url;
}
function gotoBack(path, btnObj) {
	var agree=confirm("Are you leaving the current page? The data you entered can not be recovered.\n Do you want to continue?");
	if (agree){
		btnObj.disabled = true;
		gotoPage(path);
	}
}
// This function used to reset the action
function setAction(action, formname) {
	var objForm = formname != '' ? document.forms[formname] : document.forms[0];
	objForm.action = action;
}
// This function used to get the radio value from form
function getRadioValue(radio) {
	for (var i=0;i<radio.length;i++) {
		if (radio[i].checked) return radio[i].value;
	}
}
/*
 * This function used for paging based on the start index
 */
function gotoIndex2(objForm, startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	
	// alert("form obj:"+document.forms[objForm]+" start Index "+startIdx);
	
	document.forms[objForm].startIndex.value = startIdx;
	document.forms[objForm].submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoIndex(startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.startIndex.value = startIdx;
	objForm.submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoIndex3(startIdx, next20) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.next20Page.value = next20;
	objForm.startIndex.value = startIdx;
	objForm.submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoNext20Index(startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.next20Page.value = startIdx;
	if(objForm.pageSize != null) {
		PAGE_SIZE = objForm.pageSize.value;
	}
	objForm.startIndex.value = (startIdx - 1) * PAGE_SIZE;
	objForm.submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoPrevious20Index(startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.next20Page.value = startIdx - 19;
	if(objForm.pageSize != null) {
		PAGE_SIZE = objForm.pageSize.value;
	}
	objForm.startIndex.value = (startIdx - 20) * PAGE_SIZE;
	objForm.submit();
}
/*
 * This function used for sort the column
 */
function sort(id) {
	var objForm = document.forms[0];
	var previousId = objForm.sortId.value;
	var previousOrder = objForm.sortOrder.value;
	var nextId = id;
	var nextOrder = "ASC";
	
	if ((previousId != null) && (previousId == nextId)) {
		if ((previousOrder != null) && (previousOrder == "ASC")) {
			nextOrder = "DESC";
		} else {
			nextOrder = "ASC";
		}
	}
	objForm.sortId.value = nextId;
	objForm.sortOrder.value = nextOrder;
	
	var startIdx = objForm.startIndex;
	if ((startIdx != null)) {
	objForm.startIndex.value = "0";
	}
	objForm.submit();
}
/*
 * This function used for sort the column
 */
function sort2(id, next20) {
	var objForm = document.forms[0];
	objForm.next20Page.value = next20;
	var previousId = objForm.sortId.value;
	var previousOrder = objForm.sortOrder.value;
	var nextId = id;
	var nextOrder = "ASC";
	
	if ((previousId != null) && (previousId == nextId)) {
		if ((previousOrder != null) && (previousOrder == "ASC")) {
			nextOrder = "DESC";
		} else {
			nextOrder = "ASC";
		}
	}
	
	objForm.sortId.value = nextId;
	objForm.sortOrder.value = nextOrder;
	
	var startIdx = objForm.startIndex;
	if ((startIdx != null)) {
	objForm.startIndex.value = "0";
	}
	objForm.submit();
}
// Removes leading whitespaces
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
function validNumber(val) {
	return val.match(/^\d+$/);
}
function validDecimal(val) {
	var reg = /^\d+(\.\d+)?$|^\.\d+$/;
	return reg.test(val);
}
function validAlphabet(val) {
	var reg = /[a-zA-z ]/;
	return reg.test(val);
}
function validAlphaNumeric(val) {
	var reg = /^[a-zA-Z0-9]+$/;
	return reg.test(val);
}
function validEmail(val) {
	var reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return reg.test(val);
}
//////////////////////////////////////
function getSelectedTextInCombo(fieldName) {
	var combObj = document.getElementById(fieldName);
	if(combObj == null || combObj.options == null) {
		return "";
	}
	return combObj.options[combObj.selectedIndex].text;
}
function checkTimeFormat(starttime, id) {
   // regular expression to match required time format
   var re = /^\d{1,4}:\d{2}([ap]m)?$/;
   if(starttime != '' && !starttime.match(re)) {
     alert("Invalid time format: " +starttime);
	  document.getElementById(id).value="";
     document.getElementById(id).focus();
     return false;
   }
}
function isNumber(txtObj) {
	var val = txtObj.value;
	if(val == "" || txtObj.value == "0.00") {
		return false;
	}
	if(validNumber(val)) {
		return true;
	} else {
		txtObj.value = "0";
		txtObj.focus();
		alert("Please enter valid number.");
		return false;
	}
}
function isDecimal(txtObj) {
	var val = txtObj.value;
	if(val == "" || txtObj.value == "0.00") {
		return true;
	}
	if(validDecimal(val)) {
		return true;
	} else {
		alert("Please enter valid decimal number.");
		txtObj.value = "";
		txtObj.focus();
		return false;
	}
}
function validateDate(dtValue) {
	var dtRegex = new RegExp(/\b\d{1,2}[\/]\d{1,2}[\/]\d{4}\b/);
	return dtRegex.test(dtValue);
}

function validateAlphabet(txtObj, fieldName) {
	if(txtObj.value == "" || validAlphabet(txtObj.value)) {
		return true;
	} else {
		alert("Please enter valid " + fieldName);
		txtObj.value = "";
		txtObj.focus();
		return false;
	}
}
function validateEmail(txtObj) {
	if(txtObj.value == "" || validEmail(txtObj.value)) {
		return true;
	} else {
		alert("Please enter valid email address.");
		txtObj.value = "";
		txtObj.focus();
		return false;
	}
}
function maxLengthMoveToDest(val, maxLength, destName) {
	if(val.length == maxLength && document.getElementById(destName) != null) {
		document.getElementById(destName).focus();
	}
}
function getElementY(element){
	var targetTop = 0;
	if (element.offsetParent) {
		while (element.offsetParent) {
			targetTop += element.offsetTop;
            element = element.offsetParent;
		}
	} else if (element.y) {
		targetTop += element.y;
    }
	return targetTop;
}
// this function is used to reset the form,
// it reset the text, drop down boxes only and hidden fields.
function restForm(formObj) {
	var inputArray = document.getElementsByTagName("input");
	var size = inputArray.length;
	for(var i = 0; i < size; i++) {
		if (inputArray[i].type == "text") {
			inputArray[i].value = "";
		} else if (inputArray[i].type == "hidden") {
			if(inputArray[i].name == "ajaxAction"
				|| document.getElementById("ajaxAction").value == 'ticketHistory'
				|| inputArray[i].name == "contextPath"
				|| inputArray[i].name == "currentIndex") {
				continue;
			}
			inputArray[i].value = "";
		} else if(inputArray[i].type == 'select-one') {
			inputArray[i].value = "";
		} else if(inputArray[i].type == 'radio') {
			inputArray[i].checked = false;
		} else if(inputArray[i].type == 'checkbox'){
			inputArray[i].checked = false;
		}
	}// end of for loop
	
	if(document.getElementById("startIndex") != null) {
		document.getElementById("startIndex").value = 0;
	}
	
	if(document.getElementById("next20Page") != null) {
		document.getElementById("next20Page").value = 0;
	}
	
	if(document.getElementById("convertedFuel") != null) {
		document.getElementById("convertedFuel").value = 0.00;
	}
}// end of restForm()

// this function is used to reset the pagination form element,
function resetPaginationForm(formObj) {
	if(document.getElementById("startIndex") != null) {
		document.getElementById("startIndex").value = 0;
	}
	
	if(document.getElementById("next20Page") != null) {
		document.getElementById("next20Page").value = 0;
	}
	
}// end of resetPaginationForm()

/**
 * Thie method is used to select all the check boxes in a form, for a give
 * check box object.
 * 
 */
function  selectAllCheckBoxes(chkBoxObj) {
	// get the form object.
	var formObj= chkBoxObj.form;
	var inputArray = document.getElementsByTagName("input");
	// get the form elements size.
	var size = inputArray.length;
	// is the check box checked or not
	var isSelected = chkBoxObj.checked;
	
	for (var j=0; j < size;j++) {
		if(inputArray[j].type == 'checkbox'){
			// set the checked status as the given check object status.
			inputArray[j].checked = isSelected;
		}
		
	}// end of for loop
}// end of selectAllCheckBoxes() method.

function disableAllBtns() {
	var iAry = document.getElementsByTagName("input");
	// get the form elements size.
	var size = iAry.length;
	for (var j=0; j < size;j++) {
		// disable all buttons
		if(iAry[j].type == 'button' || iAry[j].type == 'submit')
			iAry[j].disabled = "disabled";
		
	}// end of for loop
}

function submitFormAction(path, id) {
	disableAllBtns();
	var formObj = document.getElementById(id);
	formObj.action = path;
	formObj.submit();
}
/**
 * This method is used to submit the download action and to set the form
 * action back
 */
function submitDownload(actionStr, formName) {
	var objForm = formName != '' ? document.forms[formName] : document.forms[0];
	
	if(objForm != null) {
		var prevAction = objForm.action;
		
		objForm.action = actionStr;
		objForm.submit();
		objForm.action  = prevAction;
	}
	else {
		var downWin = window.open(actionStr, 'downloadWin', 'height=10, width=10,scrollbars=1,resizable=1');
	}
}// end of submitDownload()
function trim(str) {
    if(!str || typeof str != 'string')
        return null;

    return str.replace(/^[\s]+/,'').replace(/[\s]+$/,'').replace(/[\s]{2,}/,' ');
}

function calendarPopup(id) {
	if(self.gfPop) {
		gfPop.fPopCalendar(document.getElementById(id));
	}
	return false;
}

function currCalPopup(id) {
	var d = serverdate.getDate();
    var m = serverdate.getMonth() + 1;
    var y = serverdate.getFullYear();
	
	if(self.gfPop) {
		gfPop.fPopCalendar(document.getElementById(id),[[y,m,d]]);
	}
	return false;
}

// textarea maxlength check.
function checklength(srcObj, maxLength) {
	var str =  srcObj.value;
	maxLen = parseInt(maxLength); // 200; // max number of characters
									// allowed
	if (str.length >= maxLen) {
		// Alert message if maximum limit is reached.
		// If required Alert can be removed.
		alert("You have reached your maximum limit of characters allowed");
		// Reached the Maximum length so trim the textarea
		srcObj.value = srcObj.value.substring(0, maxLen);
	}else{ // Maximum length not reached so update the value of my_text
			// counter
		document.getElementById('textnum').value = maxLen - srcObj.value.length;
	}
}
function printPageByDiv(printDivId) {
	if(printDivId == null || document.getElementById(printDivId) == null) {
		return false;
	}
	var contentObj = document.getElementById(printDivId).innerHTML; 
    var newWin = window.open("", "_blank"
    		, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=1100, height=780");
    if(document.getElementById("contextPath") != null) {
    	var contextPath = document.getElementById("contextPath").value;
    	var cssLink = '<link id="skinCssID" href="' + contextPath + '/_assets/skin/skin.css" rel="stylesheet" type="text/css"/>';
    	newWin.document.write(cssLink);
    }
    newWin.document.write(contentObj); 
    newWin.document.close(); 
    myDelay = setInterval(checkReadyState, 10);
	
	function checkReadyState() {
        if (newWin.document.readyState == "complete") {
            clearInterval(myDelay);
            newWin.focus(); // necessary for IE >= 10
            newWin.print(); 
            newWin.close();
        }
    }
    // --------------------------------------- 
}

function printCurrentPage(objName) {
 	var x = document.getElementById(objName);
	x.style.visibility = 'hidden';	
	window.print();
	x.style.visibility = 'visible';	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////MODULE RELATED JAVASCRIPT CODE 														//////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function reduceOnMeal(obj, qt) {
	if(!isNumber(obj)) return false;
	var v = parseInt(obj.value);
	if(v > qt) {
		alert("Please enter valid quantity to be cancelled.");
		obj.value = qt; 
		obj.focus();
	}
}
function isFemaleSeatBooked(requestType, tdId, seatIndx, currentIdx, seatType) {
	if(seatType != null && seatType != '' && seatType == 'B') {
		return false;
	}
	var columns = parseInt(document.getElementById("columns" + requestType).value);
	var nextIdx = parseInt(seatIndx) + columns;
	var seatTd = document.getElementById((requestType + nextIdx));
	var femSt = 'ladiesSeatClass' + seatType;
	if(seatTd != null) {
		if(seatTd.className == femSt  
			&& document.getElementById(("genderCodeId" + requestType + currentIdx)).value == MALE_ID) {
			return true;
		}
	}
	nextIdx = parseInt(seatIndx) - columns;
	seatTd = document.getElementById((requestType + nextIdx));
	
	if(seatTd != null) {
		if(seatTd.className == femSt 
			&& document.getElementById(("genderCodeId" + requestType + currentIdx)).value == MALE_ID) {
			return true;
		}
	}
	return false;
}

function isAdjusantConductorSeat(requestType, tdId, seatIndx, currentIdx, seatType) {
	if(seatType != null && seatType != '' && seatType == 'B') {
		return false;
	}
	var columns = parseInt(document.getElementById("columns" + requestType).value);
	var nextIdx = parseInt(seatIndx) + columns;
	var seatTd = document.getElementById((requestType + nextIdx));
	var femSt = 'conductorSeatClass' + seatType;
	if(seatTd != null) {
		if(seatTd.className == femSt  
			&& document.getElementById(("genderCodeId" + requestType + currentIdx)).value == MALE_ID) {
			return true;
		}
	}
	nextIdx = parseInt(seatIndx) - columns;
	seatTd = document.getElementById((requestType + nextIdx));
	
	if(seatTd != null) {
		if(seatTd.className == femSt 
			&& document.getElementById(("genderCodeId" + requestType + currentIdx)).value == MALE_ID) {
			return true;
		}
	}
	return false;
}

function lockFemaleAdjacentSeat(requestType, tdId, seatIndx, currentIdx, seatType) {
	if(seatType != null && seatType != '' && seatType == 'B') {
		return false;
	}	
	var columns = parseInt(document.getElementById("columns" + requestType).value);	
	var nextIdx = parseInt(seatIndx) + columns;
	var seatTd = document.getElementById((requestType + nextIdx));
	var femSt = 'ladiesSeatClass' + seatType;
	if(seatTd != null) {
		if(seatTd.className == femSt) {
			var fOb = document.getElementById(("genderCodeId" + requestType + currentIdx));
			if(fOb != null) {
				fOb.value = FEMALE_ID;
				removeComboItems(fOb);
			}
		}
	}
	nextIdx = parseInt(seatIndx) - columns;
	seatTd = document.getElementById((requestType + nextIdx));
	
	if(seatTd != null) {
		if(seatTd.className == femSt ) {
			document.getElementById(("genderCodeId" + requestType + currentIdx)).value = FEMALE_ID;
			removeComboItems(document.getElementById(("genderCodeId" + requestType + currentIdx)));
		}
	}	
}

function checkWLSeatsOrder(requestType){
	for(var j=1004;j>=1000;j--) {
		wlObj = document.getElementById(requestType + j);
		if(wlObj != null && wlObj.className.indexOf('selec') != -1) {
			if(!checkWaitingListSeats(requestType, j)) {
				return false;
			}
		}
	}
	return true;
}

function checkWaitingListSeats(requestType, seatIndx) {
	for(var i=1;i<=4;i++){
		var minIdx = parseInt(seatIndx)-i;
		if(minIdx < 0) {
			break;
		}
		var mintdId = document.getElementById((requestType + minIdx));
		
		if(mintdId != null && mintdId.className.indexOf('avail') != -1) {
			alert('Please select minimum waiting list seat number');
			return false;
		} 
	}
	return true;
}

function setSelectedSeatDetail(requestType, seatNumber, seatType, seatIndx) {	
	var indx = parseInt(document.getElementById("currSeatIndex" + requestType).value);
	
	var size = 1 ;
	
	var tdId = document.getElementById((requestType + seatIndx));
		
	if(seatNumber.indexOf('WL') != -1 && tdId.className.substring(0,5) == "avail") {
		var flag = checkWaitingListSeats(requestType, seatIndx);
		if(!flag) return false;
	}
	
	var maxSeatsAllowed = parseInt(document.getElementById("maxPassengerAllowed").value);
	size = maxSeatsAllowed;
	if(indx < 0) {
		indx = 0;
	}
	if(indx >= size && tdId.className == ("availSeatClass" + seatType)) {
		alert("Maximum " + size + " seat(s) allowed to book.");
		return false;
	}
	
	var tblId = 'PaxTbl'+requestType;
	var fvs = document.getElementById("femaleSeatSpanId" + requestType);
	if(fvs != null) {
		fvs.innerHTML = "";
		fvs.className = "";
	}
	
	
	// set seat details and calculate total price details 
	if(tdId != null) {
		if(tdId.className == ("selectedSeatClass" + seatType)) {
			tdId.className = "availSeatClass" + seatType;
			
			indx = indx - 1;
			var vb = false;
			for(var sIdx = 0; sIdx < indx; sIdx++) {
				if(document.getElementById(("seatDetails" + requestType + sIdx)).value == seatNumber) {
					vb = true;	
				}
				if(vb && document.getElementById(("seatDetails" + requestType + (sIdx+1)))) {
					document.getElementById(("seatDetails" + requestType + sIdx)).value = document.getElementById(("seatDetails" + requestType + (sIdx+1))).value;
					document.getElementById(("categoryCodeId" + requestType + sIdx)).value = document.getElementById(("categoryCodeId" + requestType + (sIdx+1))).value;
					document.getElementById(("genderCodeId" + requestType + sIdx)).value = document.getElementById(("genderCodeId" + requestType + (sIdx+1))).value;
					document.getElementById(("passengerName" + requestType + sIdx)).value = document.getElementById(("passengerName" + requestType + (sIdx+1))).value;
					document.getElementById(("passengerAge" + requestType + sIdx)).value = document.getElementById(("passengerAge" + requestType + (sIdx+1))).value;
				}
			}
			document.getElementById(("seatDetails" + requestType + indx)).value = "";
			document.getElementById(("genderCodeId" + requestType + indx)).value = "";
			document.getElementById(("passengerName" + requestType + indx)).value = "";
			document.getElementById(("passengerAge" + requestType + indx)).value = "";
			removePaxRow(requestType, indx, tblId);			
		} else {
			addNewPaxRow(requestType, indx, tblId);
			tdId.className = "selectedSeatClass" + seatType;
			copyPrimaryPaxName();
			
			if(isAdjusantConductorSeat(requestType, tdId, seatIndx, indx, seatType)) {
				var tmsg = "Only Male is allowed next to Driver Seat.";
				var b = confirm(tmsg);
				if(!b) {
					tdId.className = "availSeatClass" + seatType;
					document.getElementById(("seatDetails" + requestType + indx)).value = "";
					document.getElementById(("genderCodeId" + requestType + indx)).value = "";
					document.getElementById(("passengerName" + requestType + indx)).value = "";
					document.getElementById(("passengerAge" + requestType + indx)).value = "";
					removePaxRow(requestType, indx, tblId);
					return false;
				}
				document.getElementById(("genderCodeId" + requestType + indx)).value = MALE_ID;
				removeComboItems(document.getElementById(("genderCodeId" + requestType + indx)));
				fvs = document.getElementById("femaleSeatSpanId" + requestType);
				if(fvs != null) {
					fvs.innerHTML = tmsg;
					fvs.className = "errormsg";
				}
			}
			
			if(isFemaleSeatBooked(requestType, tdId, seatIndx, indx, seatType)) {
				tdId.className = "selectedSeatClass" + seatType;
				var tmsg = "Only a female is allowed to book next to female seat";
				var b = confirm(tmsg);
				// if not confirmed then do not allow the user to continue the seat selection.
				if(!b) {
					tdId.className = "availSeatClass" + seatType;
					document.getElementById(("seatDetails" + requestType + indx)).value = "";
					document.getElementById(("genderCodeId" + requestType + indx)).value = "";
					document.getElementById(("passengerName" + requestType + indx)).value = "";
					document.getElementById(("passengerAge" + requestType + indx)).value = "";
					removePaxRow(requestType, indx, tblId);
					return false;
				}
				document.getElementById(("genderCodeId" + requestType + indx)).value = FEMALE_ID;
				removeComboItems(document.getElementById(("genderCodeId" + requestType + indx)));
				fvs = document.getElementById("femaleSeatSpanId" + requestType);
				if(fvs != null) {
					fvs.innerHTML = tmsg;
					fvs.className = "errormsg";
				}
			}
			
			
			lockFemaleAdjacentSeat(requestType, tdId, seatIndx, indx, seatType);
			document.getElementById(("seatDetails" + requestType + indx)).value = seatNumber;
			indx = indx + 1;			
		}
	}
	calculateTotalFare(requestType);
	document.getElementById("currSeatIndex" + requestType).value = indx;
	//set reward points
	hidediv("ShowRewardPoinstDiv");
	showdiv("ShowBtnRedeemDivID");
	if(document.getElementById("redeemCheck") != null)
		document.getElementById("redeemCheck").checked = false;
}
function ttdAlert(reqType){

if(document.getElementById("alertTtd")!= null){
	if(document.getElementById("alertTtd").value=="1" && reqType=="Forward"){
		
	alert("Rs.300/- E-SPL Entry Darshan Tickets to avail the Darshan of \nLord Sri Venketeswara, Tirumala are available for for this service. You can book now");
	}
}
}
function calculateBalance(collectedAmt) {
	var balanceObj = document.getElementById("BalanceAmtId");
	
	if(collectedAmt == "") 
		collectedAmt = 0.00;
	var prevTotalVal = 0.00;
	if(document.getElementById("totalAmount") != null) {
		prevTotalVal = parseFloat(document.getElementById("totalAmount").value);
	}
	var balancePrice = parseFloat(collectedAmt) - parseFloat(document.getElementById("grandTotal").value) + prevTotalVal;
	
	balanceObj.innerHTML = balancePrice.toFixed(2); 
	if(balancePrice >= 0) {
		balanceObj.className = "greenBgColor";
		document.getElementById("SavePassengersBtn").disabled = "";
	} else {
		balanceObj.className = "redFontColor";
		document.getElementById("SavePassengersBtn").disabled = "disabled";
	}
}
function hideBookingLayout() {
	hideDivision("ShowLayoutDiv");
	hideDivision("ShowReturnLayoutDiv");
}
function validateBookingForm(requestType) {
	var size = 10; 
	// set seat details and calculate total price details
	var ageObj, seatObj, nm, ad; 
	ad = false;
	var pax = 0;
	for(var i=0; i<size; i++) {
		nm = document.getElementById(("passengerName" + requestType + i));
		ageObj = document.getElementById(("passengerAge" + requestType + i));
		seatObj = document.getElementById(("seatDetails" + requestType + i));
		if(seatObj == null) { continue; }
		if(document.getElementById(("categoryCodeId" + requestType + i)).value == ADULT_ID) {
			ad = true;
		}
		if(seatObj.value == "") {
			alert("Please select " + size + " number of seat(s).");
			ageObj.focus();
			return false;
		} else if(ageObj.value == "") {
			alert("Please enter passenger age.");
			ageObj.focus();
			return false;
		} else if(nm.value == "") {
			alert("Please enter passenger name.");
			nm.focus();
			return false;
		}
		++pax;
	}
	document.getElementById("currSeatIndex" + requestType).value = pax;
	if(ad == false) {
		alert("Atleast one adult passenger is required to continue.");
		return false;
	}
	return true;
}

function validateMandatoryFields() {
	var inputArray = document.getElementsByTagName("input");
	var size = inputArray.length;
	// validate form here
	for(var i = 0; i < size; i++) {
		if(inputArray[i].type == "text"
			&& inputArray[i].className == 'requiredfield' 
			&& inputArray[i].value == '') {
			alert("Please fill the required fields to continue.");
			return false;
		}
	}
	return true;
}

function validateMobileNo(ob)  {
	var msg = "";
	var val = ob.value;
	if(val.length != 10) msg = "Please enter valid 10 digits mobile number.";
	else if(val.charAt(0) != '6' && val.charAt(0) != '7' && val.charAt(0) != '8' && val.charAt(0) != '9')
		msg = "Mobile number must start with 6 or 7 or 8 or 9.";
	if(msg != "") {
		alert(msg);
		ob.value = "";
		ob.focus();
		return false;
	}
	return true;
}

function validateSubmitBookingLayout() {
	// validate Mobile number
	var txtObj = document.getElementById("mobileNo");
	var val = "";
	var msg = "";
	
	if(!validateMobileNo(txtObj)) {
		return false;
	}
	
	// validate Passenger Name for 150 characters
	txtObj = document.getElementById("bookedByName");
	val = txtObj.value;
	if(val.length > 100) msg = "The Passenger Name   can not be more than 100 characters.";
	else if(LTrim(RTrim(val)).length < 1) 
		msg = "Please enter valid Passenger Name.";
	
	if(msg != "") {
		alert(msg);
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("email");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter valid email address.");
		txtObj.focus();
		return false;
	}
	
	// validate Address field for 100 characters
	txtObj = document.getElementById("address");
	if(txtObj != null) {
		val = txtObj.value;
		msg = "Address can not be more than 100 characters.";
		if(val.length > 100) {
			alert(msg);
			txtObj.focus();
			return false;
		}
	}
	txtObj = document.getElementById("cardNumber");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter card number.");
		txtObj.focus();
		return false;
	}
	if(!validateBookingForm("Forward")) return false;
	
	if(!checkWLSeatsOrder("Forward")) return false;
	
	var txtObj = document.getElementById("totalAmount");
	if(txtObj != null) {
		document.getElementById("oldBookingAmt").value = txtObj.value;
		var grandTotal = parseFloat(document.getElementById("grandTotal").value);
		grandTotal = grandTotal - parseFloat(txtObj.value);
		document.getElementById("collectedAmt").value = grandTotal.toFixed(2);
	}
	
	
	var fwCurIdx = 0,  rtCurIdx = 0;
	
	fwCurIdx = parseInt(document.getElementById("currSeatIndexForward").value);
	if(document.getElementById("currSeatIndexReturn") != null) {
		rtCurIdx = parseInt(document.getElementById("currSeatIndexReturn").value);
		
		if(!checkWLSeatsOrder("Return")) return false;
		
		if(!validateBookingForm("Return")) {
			return false;
		}
		if(fwCurIdx != rtCurIdx) {
			alert("Please select same number of seats in Onward and return journey.");
			return false;
		}
	}
	return true;
}

function bookingFormSubmitAction(path, formObj) {
	if(!validateSubmitBookingLayout()) {
		return false;
	}
	if(!checkRedeemRewardEnable()) {
		return false;
	}
	if(!validateTTDDarsanPassengers('Forward')) {
		return false;
	}
	if(document.getElementById("currSeatIndexReturn") != null) {
		if(!validateTTDDarsanPassengers('Return')) {
			return false;
		}
	}
 	var ob = document.getElementById("copyPaxChk");
 	if(ob != null) {
		populatePaxDetails(true);
	}
	formObj.action = path;
	formObj.submit();
}

function addDay(dtVal, days) {
    var curDate;
    var dateObj;
	
	curDate = getDateObj(new Date());
	
    if(dtVal == 'Depart On') {
    	return curDate;
    }
	
    var dtAr = dtVal.split("/");
	var yy = parseInt(dtAr[2]);
	var mm = parseInt(dtAr[1]) - 1;
	var dd = parseInt(dtAr[0]);
	dateObj = new Date(yy, mm, dd); // year, month, day
	dateObj.setDate(dateObj.getDate() + days);
	dateObj = getDateObj(dateObj);
	
	if (dateObj >= curDate) {
        // alert("Date Obj is greather then equal to Current Date.");
    	return dateObj;
    } else {
      // alert("Date Two is greather then Date One.");
    }
    return dateObj;
}

function padDt(s) { 
	return (s < 10) ? '0' + s : s; 
}

function getDateObj(d) {
	return [padDt(d.getDate()), padDt(d.getMonth()+1), d.getFullYear()].join('/');
}

function convertDateStr(dateObj) {
	return getDateObj(dateObj);
}

function refineSearchResults(days) {
	var contextPath = document.getElementById("contextPath").value;
	var path = contextPath + '/avail/services.do';
	
	var ob = document.getElementById("txtJourneyDate");
	formObj = ob.form;
	
	var t = "";
	if(ob != null) {
		t = addDay(ob.value, days);
		
		if(t == null) {
			return false;
		}
		ob.value = t;
	}
	
	ob = document.getElementById("txtReturnJourneyDate");
	
	if(ob != null && ob.value != "" && ob.value != 'For Roundtrip') {
		t = addDay(ob.value, days);
		if(t != null) {
			ob.value = t;
		}
		
	}
	validateBookingSearch(formObj, path);
}

function validateBookingSearch(formObj, path) {
	var txtObj;
	var t;
	txtObj = document.getElementById("fromPlaceName");
	if(txtObj.value == "" || txtObj.value == "0" || txtObj.value == "From") {
		alert("Please select start place.");
		return false;
	}
	t = txtObj.value;
	txtObj = document.getElementById("toPlaceName");
	if(txtObj.value == "" || txtObj.value == "0" || txtObj.value == "To") {
		alert("Please select end place.");
		return false;
	}
	if(t == txtObj.value) {
		alert("End Place cannot be same as Start Place.");
		return false;
	}
	if(document.getElementById("adultMale") != null)
		adultMale = document.getElementById("adultMale").value;
	
	if(document.getElementById("txtJourneyDate") != null)
		t = document.getElementById("txtJourneyDate").value;
	
	if(t != null && t != "" && !validateDate(t)) {
		// alert("Please select a valid Journey Date to continue.");
		$('#txtJourneyDate').datepicker("show");
		return false;
	}
	if(document.getElementById("txtReturnJourneyDate") != null){
		t = document.getElementById("txtReturnJourneyDate").value;
		if(document.getElementById("txtLinkJourneyDate") != null)
			document.getElementById("txtLinkJourneyDate").value = t;
	}
	if(t == null || t == "" || t == "For Roundtrip") {
		document.getElementById("txtReturnJourneyDate").value = "";
	} else if(t != null && t != "" && !validateDate(t)) {
		// alert("Please select a valid Journey Date to continue.");
		$('#txtReturnJourneyDate').datepicker("show");
		return false;
	}
	
	formObj.action = path;
	formObj.submit();
}

function submitTrack(formObj,path) {
	
	txtObj = document.getElementById("id");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Ticket Number value");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("uidNumber");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter UID Number");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("mobileNo");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Mobile Number");
		txtObj.focus();
		return false;
	}
	formObj.action = path;
	formObj.submit();
}

function ttdRefAlert(){
	if(document.getElementById("ttdNoRefund")!= null){
		if(document.getElementById("ttdNoRefund").value=="1"){
		alert("TTD dharshan amount will not be refunded");
		}
	}
}

function showCancelTicket() {
	
	var divName = 'BookedTicketsDivId';
	hideMessages();
	
	var path =  "/ajax/cancel/details/load.do?searchType=0"
				+ "&id=" + document.getElementById("id").value
				+ "&uidNumber=" + document.getElementById("uidNumber").value
				+ "&mobileNo=" + document.getElementById("mobileNo").value
	;
	var txtObj = document.getElementById("id");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Ticket Number value");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("uidNumber");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter UID Number");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("mobileNo");
	if(!validateMobileNo(txtObj)) {
		return false;
	}
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function validateAgeField(txtObj, actType, idx) {
	if(!isNumber(txtObj)) {
		return false;
	}
	var max = parseInt(document.getElementById("maxAgeCh").value);
	var age = parseInt(txtObj.value);
	var id = 0;
	
	if(document.getElementById("categoryCodeId" + actType + idx) != null) {
		id = document.getElementById("categoryCodeId" + actType + idx).value;
	}
	
	if(CHILD_ID == id && age > max) {
		alert("Child age must be less than or equal to " + max + " years.");
		txtObj.value = "";
		return false;
	}
	var destName = "passengerName" + actType + (parseInt(idx) + 1);
	maxLengthMoveToDest(txtObj.value, 2, destName);
}

function setThisValueTo(destName, sourceObj) {
	var destObj = document.getElementById(destName);
	if(destObj != null) {
		destObj.value = sourceObj.value;
	}
}
function hideMessages() {
	hidediv('errorMsg');
	hidediv('successmsg');
}

function submitRepeatBooking(formObj) {
	document.getElementById("repeat").value = '1';
	formObj.submit();	
}
function showRepeatBookingLayout() {
	if(document.getElementById("repeat").value == '1'
		&& document.getElementById("serviceId").value != "") {
		document.getElementById("repeat").value = '0';
		document.getElementById("aType").value = "search";
		getAvailableServiceList('/booking/specific/search.do?aType=search');
	}
}
function showFareTypeScheduleDiv(val) {
	if(val == '0') {
		hidediv('fareTypeScheduleDivId');
	} else {
		showdiv('fareTypeScheduleDivId');
		setSelectedDays('0');
	}
}
function showMinTravelDistanceScheduleDetail(val) {
	if(val == '' || parseFloat(val) <= 0.00) {
		hidediv('minTravelScheduleDivId');
	} else {
		showdiv('minTravelScheduleDivId');
		checkSelectedDayDetails('0', 'minDay_');
	}
}
function submitBookingForm(param) {
	if(param == '') {
		hidediv('ForwardAvailableServicesDiv');
		hidediv('ReturnAvailableServicesDiv');
		hidediv('buttonsDivId');
		showdiv('loginPageDivId');
	} else {
		document.getElementById("bookingsForm").submit();
	}
}
function pgSubmitAction(path, formObj) {
	var pgObj;
	var pgchk = false;
	for(var i=1; i<=3; i++) {
		pgObj = document.getElementById(("pgId"+i));
		if(pgObj == null) {
			break;
		} else if(pgObj.checked == true) {
			pgchk = true;
			break;
		}
	}
	if(pgchk) {
		alert("Please select payment gateway to continue.");
		return false;
	}
	if(document.getElementById("termsChk").checked == false) {
		alert("Please accept terms and conditions.");
		return false;
	}
	formObj.action = path;
	formObj.submit();
}
function printTickets(formObj) {
	printPageByDiv("TktPrintDivID_0");
	divObj = document.getElementById("TktPrintDivID_1");
	if(divObj != null) {
		printPageByDiv("TktPrintDivID_1");
	}
}
function divFlipFlop(divName, obj) {
	var dObj = document.getElementById(divName);
	var v = dObj.style.display;
	if(v == null || v == '' || v == 'none' || !(v)) {
		obj.className = 'modifyBkgSelect';
		dObj.style.display = 'block';
	}
	/* else {
		obj.className = 'modifyBkgCS';
		dObj.style.display = 'none';
	}*/
	hidediv('fwInfoLeftId');
	hidediv('retInfoLeftId');
	hidediv('ForwardAvailableServicesDiv');
	hidediv('ReturnAvailableServicesDiv');
}
function setAccomodationDetails(actName, id, ac, price) {
	document.getElementById(("accomodationId" + actName)).value = id;
	document.getElementById(("acFlag" + actName)).value = ac;
	if(price !=''){
		accomPrice = price;
		calculateTotalFare(actName);
	} else {
		accomPrice = 0;
		calculateTotalFare(actName);
	}
	if(id == '') {
		document.getElementById("acmdtPrice" + actName).value = 0.00;
	}
}

function setTtdAccomodationAmount(actName) {
	calculateTotalFare(actName);

}

function searchTtdAccDetails(path, divName, requestType){
	var ttdAccJourneyDate, serviceId;
	var aPax = 0, cPax = 0, totPax = 0;
	var max = parseInt(document.getElementById("maxAgeCh").value);
	for(var i = 0; i < 20; i++) {
		ob = document.getElementById(("passengerAge" + requestType + i));
		if(ob != null) {
			
			if(ob.value != null && ob.value != "" && ob.value <= max) {
				document.getElementById(("categoryCodeId" + requestType + i)).value = CHILD_ID;
				++cPax;
			} else {
				document.getElementById(("categoryCodeId" + requestType + i)).value = ADULT_ID;
				++aPax;
			}
			if(!isNumber(ob)) {
				continue;
			}
		}
	}
	totPax = aPax;
	if(totPax == 0){
		alert("Please select seat..");
		return false;
	}
	var Obj = document.getElementById("ttdAccJourneyDate");
	if(Obj == null) {
		alert("Please select date to continue..");
		return false;
	} else {
		ttdAccJourneyDate = Obj.value;
	}

	if(ttdAccJourneyDate == ""){
		alert("Please select Darshan Date.");
		return false;
	}

	Obj = document.getElementById("ForwardServiceId");
	if(Obj != null){
		serviceId = Obj.value;
	}
	if(requestType == 'Return'){
		Obj = document.getElementById("ReturnServiceId");
		if(ob != null){
			serviceId = Obj.value;
		}
	}
	
	path =  path +"?serviceId=" +serviceId
	+ "&ttdAccJourneyDate=" + ttdAccJourneyDate
	+"&totalNoPassengers="+totPax
	+"&RequestType="+requestType;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function setTtdAccomodationDetails(requestType, ttdAccId, slot) {

	if(ttdAccId == 0){
		if(document.getElementById('ttdAccommodationId') != null)
			document.getElementById('ttdAccommodationId').value = "";
		
		if(document.getElementById('totalTtdAccAmount') != null){
			document.getElementById('totalTtdAccAmount').value = 0;
			setTtdAccomodationAmount('Forward');
			document.getElementById('TtdAccomadationDiv').style.display = "none";
		}
		return false;
	}
	
if(requestType == 'Forward'){
	document.getElementById('ttdAccFlag').value = 0;
}else{
	document.getElementById('ttdAccFlag').value = 1;
}
	divName = "TtdAccomadationDiv";
	var ttdAccJourneyDate, serviceId;
	var Obj = document.getElementById("ttdAccJourneyDate");
	if(Obj != null) {
		ttdAccJourneyDate = Obj.value;
	}

	if(ttdAccJourneyDate == ""){
		alert("Please select Darshan Date.");
		return false;
	}

	Obj = document.getElementById("ForwardServiceId");
	if(Obj != null){
		serviceId = Obj.value;
	}
	
	var aPax = 0, cPax = 0, totPax = 0;
	var max = parseInt(document.getElementById("maxAgeCh").value);
	for(var i = 0; i < 20; i++) {
		ob = document.getElementById(("passengerAge" + requestType + i));
		if(ob != null) {
			
			if(ob.value != null && ob.value != "" && ob.value <= max) {
				document.getElementById(("categoryCodeId" + requestType + i)).value = CHILD_ID;
				++cPax;
			} else {
				document.getElementById(("categoryCodeId" + requestType + i)).value = ADULT_ID;
				++aPax;
			}
			if(!isNumber(ob)) {
				continue;
			}
		}
	}
	totPax = aPax;
	document.getElementById('ttdAccommodationId').value = ttdAccId;
	var path =  "/ttd/search/slot.do?ttdAccommodationId=" + ttdAccId
	+"&ttdSlot=" + slot
	+"&totalNoPassengers="+totPax
	+"&ttdAccJourneyDate=" + ttdAccJourneyDate
	+"&serviceId=" + serviceId
	+ "&arrivalDateStr=" + document.getElementById('arrivalDateStr').value;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	/*if(price !=''){
		accomPrice = price;
		calculateTotalFare(actName);
	} else {
		accomPrice = 0;
		calculateTotalFare(actName);
	}
	if(id == '') {
		document.getElementById("acmdtPrice" + actName).value = 0.00;
	}*/
}
function displaySelectedSearchPage(val) {
	autocompletePlace("#fromPlaceName","#startPlaceId");
	autocompletePlace("#toPlaceName","#endPlaceId");
	
	$('#txtJourneyDate').datepicker({ numberOfMonths: 2
			, dateFormat: 'dd/mm/yy'
			, minDate: '0'
			, maxDate: "+30d"
			,  onSelect: function(selected) {$("#txtReturnJourneyDate").datepicker("option","minDate", selected);}
			}).val();
	
	$('#txtReturnJourneyDate').datepicker({ numberOfMonths: 2
			, dateFormat: 'dd/mm/yy'
			, minDate: '0'
			, maxDate: "+30d" 
			
		}).val();

	
	setHelpText('From', 'fromPlaceName');
	setHelpText('To', 'toPlaceName');
}
function submitUserForm(formObj){
	var user = document.getElementById("error");
	if(user != null) { 
		if(user.value == 'true') {
			alert("Login Name Already Exist!");
			return false;
		}
	}
	var email = document.getElementById("flag");
	if(email != null) { 
		if(email.value == 'true') {
	    	alert("Email ID Already Exist!");
	    	return false;	
	    }
    }
	var mobileNo = document.getElementById("flag1");
	if(mobileNo != null) { 
		if(mobileNo.value == 'true') {
	    	alert("Mobile Number Already Exist!");
	    	return false;	
	    }
    }
	formObj.submit();
}
function populatePaxDetails(chk) {
	var oj = 'Forward';
	var rt = 'Return';
	var indx = parseInt(document.getElementById("currSeatIndex" + rt).value);
    var curIdx = 0;    
	for(var i = 0; i < 10 ; i++) {
		if(document.getElementById("categoryCodeId" + rt + i) != null
			&& document.getElementById("categoryCodeId" + oj + i) != null) {
			if(chk == true) {
				document.getElementById("categoryCodeId" + rt + i).value = document.getElementById("categoryCodeId" + oj + i).value;
				document.getElementById("genderCodeId" + rt + i).value = document.getElementById("genderCodeId" + oj + i).value;
				document.getElementById("passengerName" + rt + i).value = document.getElementById("passengerName" + oj + i).value;
				document.getElementById("passengerAge" + rt + i).value = document.getElementById("passengerAge" + oj + i).value;				
			}  else {
				document.getElementById("passengerName" + rt + i).value = "";
				document.getElementById("passengerAge" + rt + i).value = "";
				
			}
			document.getElementById("categoryCodeId" + rt + i).value = document.getElementById("categoryCodeId" + oj + i).value;
			curIdx++;
		}
		if(curIdx == indx)  {
			break;
		}
	}//  end of for loop
	calculateTotalFare(rt);
}

function showNewsDiv(subect,i) {
	var dv = document.getElementById('nwDiv');
	dv.style.display = 'block';
    dv.style.opacity = 2;
    var btn = "<a haref=# class=nwsHrefCs onclick=hidediv(\'nwDiv\')>close x</a>";
	var aTxt = "<table class=newsbodyTbl><tr><td>" + btn + "</td></tr>"
			+ "<tr><td class=newsSubject>" + document.getElementById("subjectCode"+i).innerHTML+ "</td>"
			+ "<tr><td>"+ document.getElementById("textMessage"+i).innerHTML 
			+ "</td></tr></table>" ;
	dv.innerHTML = aTxt ;
}
function showClassification() {
	var s = document.getElementById("classTextDiv").className;
	
	if(s == 'showClasTxt') {
		s = "hideClasTxt";
	} else {
		s = "showClasTxt";
	}
	document.getElementById("classTextDiv").className = s;
}
function changeDivClss(id,s) {
	document.getElementById(id).className = s;
}
function showfac(a) {
	var s = document.getElementById(a).className;
	if(s == 'showClasTxt') {
		s = "hideClasTxt";
	} else {
		s = "showClasTxt";
	}

	document.getElementById(a).className = s;
}

function confirmCancellation(path, formObj) {
	var a = confirm("ALERT: Do you want to cancel the ticket?");
	if (a) {
		submitFormAction(path, formObj);
	}
}
/** DOM PRINTER END * */
/** AutoComplete place details **/
function autocompletePlace(ele,dataEle) {
	$(ele).autocomplete({
	    source: jsondata,
	    minLength: 3,
	    autoFocus: true,
	    select: function (event, ui) { 
	        $(ele).val( ui.item.value );
	        $(dataEle).val(ui.item.id);	 
	    }
	});	
}

function autocomplete(ele,dataEle,data) {
	$(ele).autocomplete({
	    source: data,
	    autoFocus: true,
	    select: function (event, ui) { 
	        $(ele).val( ui.item.value );
	        $(dataEle).val(ui.item.id);	 
	    }
	});	
}
function resetTxt(o, v) {
	if(o != null) {
		o.value = v;
	}
	$('#txtJourneyDate').datepicker({ numberOfMonths: 2
		, dateFormat: 'dd/mm/yy'
		, minDate: '0'
		, maxDate: "+30d"
		}).val();
}
function clearHelpText(txt, name) {
	var temp = new Array();
	temp = txt.split(",");
	var obj = document.getElementById(name);
	var cs = obj.className;
	if(cs == 'placesRequired') {
		cs = cs.replace("placesRequiredGray",  "placesRequired");
		obj.className = cs;
	}
	if(obj.value == temp[0] || (temp.length > 1 && obj.value == temp[1])) {
		obj.value = '';
	}
}

function setHelpText(txt, name) {
	var obj = document.getElementById(name);
	var cs = obj.className;
	if(cs == 'placesRequiredGray') {
		cs = cs.replace("placesRequired",  "placesRequiredGray");
		obj.className = cs;
	}
	if(obj.value == '') {
		obj.value = txt;
	}
}
/* For package tours display */
function showDetailsPack(showId) {
	hidediv("maintableId");
	hidediv("srisailDivId");
	hidediv("arakuDivId");
	hidediv("niamDivId");
	hidediv("hanumaDivId");
	hidediv("hydDivId");	
	hidediv("kadapaDivId");
	hidediv("yaganDivId");
	hidediv("lepakDivId");
	hidediv("nachDivId");
	hidediv("tiruDivId");
	hidediv("basaraDivId");
	showdiv(showId);
	showdiv("buttonId");
}

function showMainPack() {
	showdiv("maintableId");
	//hidediv("papiDivId");
	hidediv("kaniDivId");
	hidediv("srisailDivId");
	hidediv("arakuDivId");
	hidediv("niamDivId");
	hidediv("hanumaDivId");
	hidediv("kadapaDivId");
	hidediv("hydDivId");
	hidediv("kadapaDivId");
	hidediv("yaganDivId");
	hidediv("lepakDivId");
	hidediv("nachDivId");
	hidediv("tiruDivId");
	hidediv("basaraDivId");
	hidediv("buttonId");
}
function calendarMnYrSelect(id) {
	$('#'+id).datepicker({ numberOfMonths: 1, dateFormat: 'dd/mm/yy', changeMonth: true
	, changeYear: true, yearRange: '1945:2020'}).val();
}

function populateSearch(fId,fnm,tId,tnm) {
	var ob = document.getElementById("startPlaceId");
	if(ob != null) {
		ob.value = fId;
	}
	ob = document.getElementById("fromPlaceName");
	if(ob != null) {
		ob.value = fnm;
	}
	
	ob = document.getElementById("endPlaceId");
	if(ob != null) {
		ob.value = tId;
	}
	ob = document.getElementById("toPlaceName");
	if(ob != null) {
		ob.value = tnm;
	}
	$("#txtJourneyDate").datepicker('show');
}
function removePaxRow(act, idx, divId) {

	$('#'+ act +  idx + "tr" ).detach();
}

function addNewPaxRow(act, idx, divId) {
	var _rEle;
	var nStr = act + idx ;
	_rEle = '<tr id="' + nStr + "tr" + '"><td>' 
				+ '<input type="hidden" name="categoryCodeId" id="categoryCodeId' + nStr + '" value="'+ ADULT_ID +'" />'
				+ '<select name="genderCodeId" id="genderCodeId' + nStr + '" class="requiredfield">'
				+ '<option value="24">MALE</option>'
				+ '<option value="25">FEMALE</option>'
				+ '</select>'
			+ '</td><td>'
				+ '<input type="text" name="passengerName" id="passengerName' + nStr + '" maxlength="150" size="16" class="requiredfield" onkeyup="validateAlphabet(this, this.name);">'
			+ '</td>'
			+ '<td>'
				+ '<input type="text" name="passengerAge" id="passengerAge' + nStr + '" maxlength="2" size="2" class="requiredfield" onkeyup="calculateTotalFare(\''+act+'\');">'
			+ '</td>'
			+ '<td>'
				+ '<input type="text" name="seatDetails" id="seatDetails' + nStr + '" size="1" class="seatNormalField" readonly="readonly">'
			+ '</td>'
			+ '</tr>'
		;
		
	$('#'+divId+' tr:last').after(_rEle);
}

function setTotalSeatsDetails(t) {
	var services = 0, seats = 0;
	var ob;
	
	ob = document.getElementById(t + "TotalServices");
	if(ob != null) {
		services = parseInt(ob.value);
	}
	
	
	ob = document.getElementById(t + "TotalSeats");
	if(ob != null) {
		seats = parseInt(ob.value);
	}
	
	if(document.getElementById(t + "TotalServicesId") != null)
		document.getElementById(t + "TotalServicesId").innerHTML = services;
	if(document.getElementById(t + "TotalSeatsId") != null)
		document.getElementById(t + "TotalSeatsId").innerHTML = seats;
}

/* FILTERs for listing page */
function delFil(filterTypeid, clrType, position) {
    if (position === undefined || position == 1) var position = '';
    if (clrType == "ClearAll") {
        $('.FilSearch').each(function() {
            if ($(this).attr("title") == filterTypeid) {
                $(this).prop('checked', false);
                $("#ActFil" + $(this).value).hide();
            }
        });
        $("." + filterTypeid + "Active").remove();
        if (position == '2') {
            if (filterTypeid == "TravelsNameR")
                opf2 = 0;
            else if (filterTypeid == "BustypesR")
                btf2 = 0;
            else if (filterTypeid == "BoardingPointR")
                bpf2 = 0;
            else if (filterTypeid == "DroppingPointR")
                dpf2 = 0;
        } else {
            if (filterTypeid == "TravelsName")
                opf = 0;
            else if (filterTypeid == "Bustypes")
                btf = 0;
            else if (filterTypeid == "BoardingPoint")
                bpf = 0;
            else if (filterTypeid == "DroppingPoint")
                dpf = 0;
        }
    } else {
        $("#" + clrType + filterTypeid).prop('checked', false);
        if (position == '2')
            $("#ActFil2" + clrType + filterTypeid).remove();
        else
            $("#ActFil" + clrType + filterTypeid).remove();
        if (position == '2')
            chekfils2(clrType, -1);
        else
            chekfils(clrType, -1);
    }
    FilSearch('ClearAll', '', '', position);
}

function chekfils(filtype, val) {
    if (filtype == "TravelsName")
        opf = opf + val;
    else if (filtype == "Bustypes")
        btf = btf + val;
    else if (filtype == "BoardingPoint")
        bpf = bpf + val;
    else if (filtype == "DroppingPoint")
        dpf = dpf + val;
}

function chekfils2(filtype, val) {
    if (filtype == "TravelsNameR")
        opf2 = opf2 + val;
    else if (filtype == "BustypesR")
        btf2 = btf2 + val;
    else if (filtype == "BoardingPointR")
        bpf2 = bpf2 + val;
    else if (filtype == "DroppingPointR")
        dpf2 = dpf2 + val;
}

function FilSearch(thisname, val, Checked, position) {
	var rSet = '.rSet';
    if (position === undefined || position == 1) var position = '';
	
	if(position == 2){ 
		rSet = rSet + "Return";
	} else {
		rSet = rSet + "Forward";
	}
    if (thisname != 'ClearAll') {
        if (Checked.substring(0, 4) == "CHKD") {
            if (position == '2')
                $("#ACTIVEFILTERS2").append('<span id="ActFil2' + Checked.substring(4) + val + '" class="' + Checked.substring(4) + 'Active" onclick="delFil(\'' + val + '\',\'' + Checked.substring(4) + '\',\'' + position + '\');" style="padding-right:10px; cursor: pointer; color:#000; padding:2px 5px;">' + thisname + '<span style="color:#FF0000;padding-left:3px;">x</span></span>&nbsp;');
            else
                $("#ACTIVEFILTERS").append('<span id="ActFil' + Checked.substring(4) + val + '" class="' + Checked.substring(4) + 'Active" onclick="delFil(\'' + val + '\',\'' + Checked.substring(4) + '\',\'' + position + '\');" style="padding-right:10px; cursor: pointer; color:#000; padding:2px 5px;">' + thisname + '<span style="color:#FF0000;padding-left:3px;">x</span></span>&nbsp;');
            if (position == '2')
                chekfils2(Checked.substring(4), 1);
            else
                chekfils(Checked.substring(4), 1);
        } else {
            if (position == '2') {
                if ($("#ActFil2" + Checked + val))
                    $("#ActFil2" + Checked + val).remove();
            } else {
                if ($("#ActFil" + Checked + val))
                    $("#ActFil" + Checked + val).remove();
            }
            if (position == '2')
                chekfils2(Checked, -1);
            else
                chekfils(Checked, -1);
        }
    }
    $("#seatSelect" + position).hide();
    var bustp_filter = "";
    var travNm_filter = "";
    var brdpnts_filter = "";
    var drppnts_filter = "";
    $(".FilSearch").each(function() {
        tempval = '';
        if (position == '2') {
            if ($(this).attr("title") == "BustypesR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '') {
                    bustp_filter = bustp_filter + tempval + ",";
                }
            }
            if ($(this).attr("title") == "TravelsNameR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    travNm_filter = travNm_filter + tempval + ",";
            }
            if ($(this).attr("title") == "BoardingPointR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    brdpnts_filter = brdpnts_filter + tempval + ",";
            }
            if ($(this).attr("title") == "DroppingPointR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    drppnts_filter = drppnts_filter + tempval + ",";
            }
        } else {
            if ($(this).attr("title") == "Bustypes") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '') {
                    bustp_filter = bustp_filter + tempval + ",";
                }
            }
            if ($(this).attr("title") == "TravelsName") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    travNm_filter = travNm_filter + tempval + ",";
            }
            if ($(this).attr("title") == "BoardingPoint") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    brdpnts_filter = brdpnts_filter + tempval + ",";
            }
            if ($(this).attr("title") == "DroppingPoint") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    drppnts_filter = drppnts_filter + tempval + ",";
            }
        }
    });
    bustp_filter = bustp_filter.substring(0, bustp_filter.length - 1);
    travNm_filter = travNm_filter.substring(0, travNm_filter.length - 1);
    brdpnts_filter = brdpnts_filter.substring(0, brdpnts_filter.length - 1);
    drppnts_filter = drppnts_filter.substring(0, drppnts_filter.length - 1);
	
    $(rSet).each(function(i, service) {
        var bps = $(service).attr('brdp');
        var dps = $(service).attr('drpp');
        var bt = $(service).attr('bt');
        var travNm = $(service).attr('tn');
        var show1 = true;
        var show2 = true;
        var show3 = true;
        var show4 = true;
        if (bustp_filter != "") {
            var bty_filters = bustp_filter.split(",");
            var a = $.inArray(bt, bty_filters);
            if (a >= 0) {} else
                show1 = false;
        }
        if (travNm_filter != "") {
            var tnm_filters = travNm_filter.split(",");
            var a = $.inArray(travNm, tnm_filters);
            if (a >= 0) {} else
                show2 = false;
        }
        if (brdpnts_filter != "") {
            var bpoints_chek = bps.split(",");
            var a = 0;
            var brdpnts_filters = brdpnts_filter.split(",");
            for (var i = 0; i < brdpnts_filters.length; i++) {
                a = -1;
                a = $.inArray(brdpnts_filters[i], bpoints_chek);
                if (a >= 0)
                    break;
            }
            if (a >= 0) {} 
            else show3 = false;
        }
        if (drppnts_filter != "") {
            var dpoints_chek = dps.split(",");
            var b;
            var drppnts_filters = drppnts_filter.split(",");
            for (var i = 0; i < drppnts_filters.length; i++) {
                b = -1;
                b = $.inArray(drppnts_filters[i], dpoints_chek);
                if (b >= 0)
                    break;
            }
            if (b >= 0) {} else
                show4 = false;
        }
        if (show1 && show2 && show3 && show4)
            $(this).show();
        else
            $(this).hide();
    });
    if (position == "2") {
        if (opf2 > 0 || btf2 > 0 || bpf2 > 0 || dpf2 > 0)
            $("#ACTIVEFILTERS2").show();
        else
            $("#ACTIVEFILTERS2").hide();
        if (opf2 > 0) {
            $("#OpFid2").css("background-color", "#ffd672 ");
            $(".TravelsNameRActive").css("background-color", "#ffd672 ");
        } else
            $("#OpFid2").css("background-color", "#FFFFFF");
        if (btf2 > 0) {
            $("#BtFid2").css("background-color", "#89d283");
            $(".BustypesRActive").css("background-color", "#89d283");
        } else
            $("#BtFid2").css("background-color", "#FFFFFF");
        if (bpf2 > 0) {
            $("#BpFid2").css("background-color", "#fdd2ff");
            $(".BoardingPointRActive").css("background-color", "#fdd2ff");
        } else
            $("#BpFid2").css("background-color", "#FFFFFF");
        if (dpf2 > 0) {
            $("#DpFid2").css("background-color", "#ffd672");
            $(".DroppingPointRActive").css("background-color", "#ffd672");
        } else
            $("#DpFid2").css("background-color", "#FFFFFF");
    } else {
        if (opf > 0 || btf > 0 || bpf > 0 || dpf > 0) {
            if ($("#ACTIVEFILTERS"))
                $("#ACTIVEFILTERS").show();
        } else {
            if ($("#ACTIVEFILTERS"))
                $("#ACTIVEFILTERS").hide();
        }
        if (opf > 0) {
            $("#OpFid").css("background-color", "#ffd672 ");
            $(".TravelsNameActive").css("background-color", "#ffd672 ");
        } else
            $("#OpFid").css("background-color", "#FFFFFF");
        if (btf > 0) {
            $("#BtFid").css("background-color", "#89d283");
            $(".BustypesActive").css("background-color", "#89d283");
        } else
            $("#BtFid").css("background-color", "#FFFFFF");
        if (bpf > 0) {
            $("#BpFid").css("background-color", "#fdd2ff");
            $(".BoardingPointActive").css("background-color", "#fdd2ff");
        } else
            $("#BpFid").css("background-color", "#FFFFFF");
        if (dpf > 0) {
            $("#DpFid").css("background-color", "#ffd672");
            $(".DroppingPointActive").css("background-color", "#ffd672");
        } else
            $("#DpFid").css("background-color", "#FFFFFF");
    }
}

function enableSelectBoxes(position) {
	var srvListDiv;
    if (position == 2) srvListDiv = "#ReturnAvailableServicesDiv ";
    else srvListDiv = "#ForwardAvailableServicesDiv ";
    $(srvListDiv + 'div.selectBoxs' + position).each(function() {

        $(this).children('span.selected').html($(this).children('div.selectOptions').find('span.Clear').attr("value"));
        $(this).attr('value', $(this).children('div.selectOptions').children('label.selectOption:first').attr('value'));
        $(this).children('span.selected,span.selectArrow').click(function() {
            if ($(this).parent().children('div.selectOptions').css('display') == 'none') {
                $(srvListDiv + 'div.selectOptions').css('display', 'none');
                $('.p1').show();
                $('.p2').hide();
                $(this).parent().children('div.selectOptions').css('display', 'block');
                $(this).parent().find('.p1').hide();
                $(this).parent().find('.p2').show();
            } else {
                $(this).parent().children('div.selectOptions').css('display', 'none');
                $(this).parent().find('.p1').show();
                $(this).parent().find('.p2').hide();
            }
        });
    });
    $(srvListDiv + ".FilSearch").change(function() {
        if ($(this).prop("checked"))
            var Checked = 'CHKD' + $(this).attr("title");
        else
            var Checked = $(this).attr("title");
        if ($(this).attr("position")) var pos = $(this).attr("position");
        else var pos = '';

        FilSearch($(this).attr("name"), $(this).val(), Checked, pos)
    });
}

function enableSelectBoxesLink(position) {
	var srvListDiv;
    if (position == 2) srvListDiv = "#ReturnLinkServiceDiv ";
    else srvListDiv = "#ForwardLinkServiceDiv ";
    $(srvListDiv + 'div.selectBoxs' + position).each(function() {

        $(this).children('span.selected').html($(this).children('div.selectOptions').find('span.Clear').attr("value"));
        $(this).attr('value', $(this).children('div.selectOptions').children('label.selectOption:first').attr('value'));
        $(this).children('span.selected,span.selectArrow').click(function() {
            if ($(this).parent().children('div.selectOptions').css('display') == 'none') {
                $(srvListDiv + 'div.selectOptions').css('display', 'none');
                $('.p1').show();
                $('.p2').hide();
                $(this).parent().children('div.selectOptions').css('display', 'block');
                $(this).parent().find('.p1').hide();
                $(this).parent().find('.p2').show();
            } else {
                $(this).parent().children('div.selectOptions').css('display', 'none');
                $(this).parent().find('.p1').show();
                $(this).parent().find('.p2').hide();
            }
        });
    });
    $(srvListDiv + ".FilSearch").change(function() {
        if ($(this).prop("checked"))
            var Checked = 'CHKD' + $(this).attr("title");
        else
            var Checked = $(this).attr("title");
        if ($(this).attr("position")) var pos = $(this).attr("position");
        else var pos = '';

        FilSearch($(this).attr("name"), $(this).val(), Checked, pos)
    });
}
function closeModifySearch(divId, fwDate, retDate) {
	hidediv(divId);
	var ob = document.getElementById("txtJourneyDate");
	if(ob != null && validateDate(fwDate)) {
		ob.value = fwDate;
		showdiv('ForwardAvailableServicesDiv');
		showdiv('fwInfoLeftId');
	}
	
	var ob = document.getElementById("txtReturnJourneyDate");
	if(ob != null && validateDate(retDate)) {
		ob.value = retDate;
		showdiv('ReturnAvailableServicesDiv');
		showdiv('retInfoLeftId');
	}
	
	var uc = 'unSelectedDivCs';
	addRemoveCss('fwInfoLeftId', uc, false);
	addRemoveCss('retInfoLeftId', uc, true);
}
function setSelectedColor() {
	document.getElementById("ebs").className = "pgw-ebs";
	document.getElementById("hdfc").className = "pgw-hdfc";
	var cs = 'pgw-selected';
	var v = document.getElementById("pgId").value;
	if(v == '4') {
		document.getElementById("hdfc").className = cs;
	} else if(v == '1') {
		document.getElementById("ebs").className = cs;
	}
}
function setSelectedPg(v) {
	document.getElementById("pgId").value = v;
	setSelectedColor();
}

function continueReturnBkg() {
	if(!validateSubmitBookingLayout()) {
		return false;
	}
	alert("Now, please select the return journey service.");
	
	hidediv('ForwardAvailableServicesDiv');
	showdiv('ReturnAvailableServicesDiv');
	
	var uc = 'unSelectedDivCs';
	addRemoveCss('fwInfoLeftId', uc, true);
	addRemoveCss('retInfoLeftId', uc, false);
	accomPrice=0;// For return set this one to zero value.
}



function addRemoveCss(divId, cssName, adOrR) {
	$( "#" + divId ).toggleClass( cssName, adOrR );
}

function validateMyTicket(formObj, fmId) {
	var v = document.getElementById("id").value;
	if(v == null || v == '' || v == '0') {
		alert("Please enter valid ticket number to continue.");
		return false;
	}
	
	if(!validateMobileNo(document.getElementById("mobileNo"))) {
		return false;
	}
	submitFormAction(formObj.action, fmId);
}

function copyPrimaryPaxName() {
	var ob = document.getElementById("bookedByName");
	if(!validateAlphabet(ob, "Primary Passenger Name")) {
		return false;
	}
	if(document.getElementById(("passengerNameForward0")) != null) {
		document.getElementById(("passengerNameForward0")).value = ob.value;
	}
}
/** DOM PRINTER END * */

function calculateTotalFare(requestType) {
	var basic = 0, totFare = 0, acc = 0, dinner=0, totConc = 0, concCount = 0, retConc=0;
	
	var toll = parseFloat(document.getElementById(requestType + "TollsPrice").value);
	var srt = parseFloat(document.getElementById(requestType + "SrtFee").value);
	var aBasic = parseFloat(document.getElementById(requestType + "AdultFare").value);
	var cBasic = parseFloat(document.getElementById(requestType + "ChildFare").value);
	
	var aLevy = parseFloat(document.getElementById(requestType + "AdultLevyFare").value);
	var cLevy = parseFloat(document.getElementById(requestType + "ChildLevyFare").value);
	var bTxn = parseFloat(document.getElementById(requestType + "BnkTxnAmt").value);
	
	var conc = parseFloat(document.getElementById("concessionPercent").value);
	var concNo = parseFloat(document.getElementById("concNoPassengers").value);
	var concPrice = 0;
	if(document.getElementById("concPrice"+requestType) != null && document.getElementById("concPrice"+requestType).value != "")
		concPrice = parseFloat(document.getElementById("concPrice"+requestType).value);
	if(document.getElementById('mTotPrice'+requestType) != null)
		dinner = parseFloat(document.getElementById('mTotPrice'+requestType).value);
	if(document.getElementById("retConc") != null)
		retConc = document.getElementById("retConc").value;
	var srvcConcPax = parseFloat(document.getElementById("srvcConcPax").value);
	
	var max = parseInt(document.getElementById("maxAgeCh").value);
	var ob;
	var aPax = 0, cPax = 0, totPax = 0;
	for(var i = 0; i < 20; i++) {
		ob = document.getElementById(("passengerAge" + requestType + i));
		if(ob != null) {
			
			if(ob.value != null && ob.value != "" && ob.value <= max) {
				document.getElementById(("categoryCodeId" + requestType + i)).value = CHILD_ID;
				++cPax;
			} else {
				document.getElementById(("categoryCodeId" + requestType + i)).value = ADULT_ID;
				++aPax;
			}
			if(!isNumber(ob)) {
				continue;
			}
		}
	}
	
	
	// Dynamic Seat Calculation starts here....
    var selectedSeats = document.getElementsByName('seatDetails');
    var oneWaySeatCount = parseInt(selectedSeats.length / 2);
    var forwardSeatNos = new Array();
    var returnSeatNos = new Array();
    var forwardDynSeat = "";
    var returnDynSeat = "";
    if(document.getElementById("forwardDynFareDetails") != null)
        forwardDynSeat = document.getElementById("forwardDynFareDetails").value;
    
    if(document.getElementById("returnDynFareDetails") != null)
        returnDynSeat = document.getElementById("returnDynFareDetails").value;
    for(var i = 0; i < selectedSeats.length; i++){
        if(document.getElementById("seatDetailsForward" + i) != null)
            forwardSeatNos[i] = document.getElementById("seatDetailsForward" + i).value;
        else if(document.getElementById("seatDetailsReturn" + parseInt(i - oneWaySeatCount)) != null)
            returnSeatNos[parseInt(i - oneWaySeatCount)] = document.getElementById("seatDetailsReturn" + parseInt(i - oneWaySeatCount)).value; 
    }
    var oneWaySeatDetails = forwardSeatNos;
    if(returnDynSeat.length > 0){
        oneWaySeatDetails = returnSeatNos;
        forwardDynSeat = returnDynSeat;
    }
    
    
    var seatNo = "";
    var seatDiscAmt = "";
    var dynSeatCount = 0;
    var dynamicConc = 0;
    var dynChildSeat = 0;
    var dynAdultSeat = 0;
    for(var i = 0; i < oneWaySeatDetails.length; i++){
    	var seatDetails = forwardDynSeat.split("T");
            for(var count = 0; count < seatDetails.length; count++){
            	//get seat no's
                var seats = seatDetails[count].split("S");
                if(seats[0] == oneWaySeatDetails[i]){
                	
                    var dynamicFareDetailsArray = seats[1].split(",");
                            
                    var considerOtherCon = dynamicFareDetailsArray[0];
                  //get discount amount
                    var discountAmount = dynamicFareDetailsArray[1];
                    
                    var obj = document.getElementById(("passengerAge" + requestType + i));
                    var isChild = false;
            		if(obj != null) {
            			if(obj.value != null && obj.value != "" && obj.value <= max) {
            				isChild = true;
            			}
            		}
                   //check percentage(%), or fixed discount amount
                    if (discountAmount.indexOf("P") == -1) {
                        seatDiscAmt = parseFloat(discountAmount);
                    } else {
                        discountAmount = discountAmount.substring(0, discountAmount.length - 1);
                        if(isChild)
                        	seatDiscAmt = parseFloat(parseFloat(cBasic) * parseFloat(discountAmount)) / 100;
                        else
                        	seatDiscAmt = parseFloat(parseFloat(aBasic) * parseFloat(discountAmount)) / 100;  
                        
                    }
                    //If not to consider other concession, and if seat has concession, which ever is high.
                    dynamicConc += Math.floor(parseFloat(-seatDiscAmt));
                    dynSeatCount++;
                } 
            }
     
        }
    
    // Dynamic Seat Calculation ends here....
	totPax = cPax + aPax;
	basic = (aBasic*aPax) + (cBasic*cPax);
	levies = (aLevy*aPax) + (cLevy*cPax);
	
	if(parseFloat(accomPrice) > 0){
		acc = parseFloat(totPax*accomPrice);
	}
	
	if(aPax>concNo) {
		concCount = concNo;
	} else {
		concCount = aPax;
	}
	// Card concessions
	totConc = Math.floor((aBasic*concCount*conc)/ 100 );
	
	//Group or Return concession
	if(( (totPax >= srvcConcPax) || (requestType == 'Return' && retConc == '1') )
			&& totConc == 0) {
		var aConc = 0, cConc = 0;

		aConc = Math.floor(aBasic*concPrice/ 100) * aPax;
		cConc = Math.floor(cBasic*concPrice/ 100) * cPax; 
		
		totConc = parseFloat(aConc) + parseFloat(cConc);
	}
	if(parseFloat(dynamicConc) > parseFloat(totConc)){
		totConc = parseFloat(dynamicConc);
	}	
	srt = (srt*totPax);
	toll = (toll*totPax);
	 
	totFare = (basic + srt + toll + levies + acc + dinner) ;
	if(totConc > 0) {
		basic = basic-totConc;
		totFare = totFare - totConc;
	}
	if(document.getElementById('totalTtdAccAmount') != null){
		var ttdAccAmount = document.getElementById('totalTtdAccAmount').value;
		totFare = parseFloat(parseFloat(totFare) + parseFloat(ttdAccAmount));
	}
	//bTxn = parseFloat((parseFloat((totFare * bTxn ) / 100)).toFixed(0));
	bTxn = Math.ceil((totFare * bTxn ) / 100);
	totFare = totFare + bTxn;
	
	document.getElementById(requestType + "BasicFare").innerHTML = basic;
	document.getElementById(requestType + "SRT").innerHTML = srt;
	document.getElementById(requestType + "Toll").innerHTML = toll;
	document.getElementById(requestType + "Levies").innerHTML = levies;
	if(document.getElementById(requestType + "Accomdation") != null) {
		document.getElementById(requestType + "Accomdation").innerHTML = acc;
	}
	if(document.getElementById(requestType + "Dinner") != null) {
		document.getElementById(requestType + "Dinner").innerHTML = dinner;
	}
	
	if(document.getElementById(requestType + "Concession") != null) {
		document.getElementById(requestType + "Concession").innerHTML = totConc;
	}
	document.getElementById(requestType + "BankTransact").innerHTML = bTxn;
	
	document.getElementById(requestType+'totFare').innerHTML = totFare;
	
	var origBasicFare = parseFloat(basic) + parseFloat(totConc);
	
	document.getElementById(requestType+ "OrigBasicFare").innerHTML = origBasicFare;
}

function calculateDinner(requestType,size) {	
	amt = 0;
	for(var i = 0; i < size; i++) { 
		if(document.getElementById('mQty'+requestType+i).value != ''){
			amt = amt + parseFloat(document.getElementById('mPrice'+requestType+i).value*
					document.getElementById('mQty'+requestType+i).value);
		}
	}
	document.getElementById('mTotPrice'+requestType).value = amt;
	calculateTotalFare(requestType);
}

function swapValues() {
	var temp = document.getElementById("fromPlaceName").value;
	var tempStartPlcId = document.getElementById("startPlaceId").value;
	var tempStartPlcCode = document.getElementById("startPlaceId").value;
	
	if(document.getElementById("toPlaceName").value != 'To'){
		document.getElementById("fromPlaceName").value = document.getElementById("toPlaceName").value ;
		document.getElementById("startPlaceId").value = document.getElementById("endPlaceId").value ;
		document.getElementById("fromPlaceCode").value = document.getElementById("toPlaceCode").value ;
	} else{
		document.getElementById("fromPlaceName").value = 'From';
		document.getElementById("startPlaceId").value = '' ;
		document.getElementById("fromPlaceCode").value = '' ;
	}
	if(temp != 'From'){
		document.getElementById("toPlaceName").value = temp;
		document.getElementById("endPlaceId").value = tempStartPlcId;
		document.getElementById("toPlaceCode").value = tempStartPlcCode;
	} else{
		document.getElementById("toPlaceName").value = 'To';
	}
}

function getWalletCash(divName){
	var walletObj;
	walletObj = document.getElementById("addWalletAmount");
	var amount;
	if(walletObj != null){
		amount = walletObj.value;
		walletObj.readOnly = true;
	} else{
		walletObj.readOnly = false;
	}
	var path =  "/wallet/addPaymentList.do?addWalletAmount=" + amount;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function pgWalletSubmitAction(path, formObj) {
	var pgObj;
	var pgchk = false;
	for(var i=1; i<=3; i++) {
		pgObj = document.getElementById(("pgId"+i));
		if(pgObj == null) {
			break;
		} else if(pgObj.checked == true) {
			pgchk = true;
			break;
		}
	}
	if(pgchk) {
		alert("Please select payment gateway to continue.");
		return false;
	}
	if(document.getElementById("termsChk").checked == false) {
		alert("Please accept terms and conditions.");
		return false;
	}
	path = path +"?addWalletAmount=" + document.getElementById("addWalletAmount").value;
	
	formObj.action = path;
	formObj.submit();
}

function cancelCouponUsage(divName){
	var couponUsageIdObj;
	var cashbackCoupon;
	couponUsageObj = document.getElementById("couponUsageId");
	if(couponUsageObj != null){
		couponUsageId = couponUsageObj.value;
	}
	var path =  "/ajax/wallet/couponUsage/cancel.do?couponUsageId=" + couponUsageId;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function isValidNumber(txtObj) {
	var val = txtObj.value;
	if(txtObj.value == "0.00") {
		return false;
	}
	if(validNumber(val)) {
		return true;
	} else {
		txtObj.value = "0";
		txtObj.focus();
		alert("Please enter valid number.");
		return false;
	}
}
function showWalletDetails(walBal){
	
	var bookingAmt = 0.0, onwardTotalAmt = 0.0, retTotalAmt = 0.0;
	var bankTranxAmt = 0.0, onwardBanTranxAmt = 0.0, retBankTranxAmt = 0.0;
	if(document.getElementById("totalAmountHid") != null)
		onwardTotalAmt = parseFloat(document.getElementById("totalAmountHid").value);
	
	if(document.getElementById("retTotalAmountHid") != null)
		retTotalAmt = parseFloat(document.getElementById("retTotalAmountHid").value);
	
	bookingAmt = onwardTotalAmt + retTotalAmt;
	
	if(document.getElementById("bankTxnAmountHid") != null)
		onwardBanTranxAmt = parseFloat(document.getElementById("bankTxnAmountHid").value);
	
	if(document.getElementById("retBankTxnAmountHid") != null)
		retBankTranxAmt = parseFloat(document.getElementById("retBankTxnAmountHid").value);
	
	bankTranxAmt = onwardBanTranxAmt + retBankTranxAmt;
	
	document.getElementById('termsChk').checked = true;
	
	if(document.getElementById('walletChk') !=null
			&& document.getElementById('walletChk').checked == true) {
		if(parseFloat(walBal) > parseFloat(bookingAmt) ) {//wallet
			showdiv("walletid");
			hidediv("pggwid");
			bookingAmt = parseFloat(bookingAmt) - parseFloat(bankTranxAmt);
			var walletSaveAmt = bankTranxAmt;
			var displayAmt = bookingAmt;
			document.getElementById("walletBkngAmt").innerHTML = '<table class = "cashbackInnerTable"><tr><td>You Saved Amount:&nbsp;</td><td><h3><span class="couponSuccessMsg">'
				+parseFloat(walletSaveAmt).toFixed(2) +'</span></h3></td></tr><tr><td>'
				+'From Wallet :&nbsp;</td><td><h3>'+ Math.ceil(displayAmt).toFixed(2)+'</h3></tr></table>';
		} else {
			showdiv("walletid");
			showdiv('pggwid');
			var walletSaveAmt = Math.ceil(parseFloat(parseFloat(walBal) * parseFloat(2.5))/parseFloat(100));
			var walletAndSaveAmt = parseFloat(parseFloat(walBal) +  parseFloat(walletSaveAmt));
			var displayAmt = 0;
			if(parseFloat(bookingAmt) > parseFloat(walletAndSaveAmt)){
				displayAmt = parseFloat(parseFloat(bookingAmt) - parseFloat(walletAndSaveAmt));
				document.getElementById("walletBkngAmt").innerHTML = '<table class = "cashbackInnerTable"><tr><td>You Saved Amount:&nbsp;</td><td><h3> <span class="couponSuccessMsg">'
					  + parseFloat(walletSaveAmt).toFixed(2) +'</span></h3></td></tr><tr><td>'
					  +'From Wallet :&nbsp;</td><td><h3>'+ parseFloat(walBal).toFixed(2) +'</h3></tr>'
					  +'<tr><td>From Payment Gateway:&nbsp;</td><td><h3>'+parseFloat(displayAmt).toFixed(2)
					  +'</h3></td></tr></table>';
			} else {
				displayAmt = parseFloat(parseFloat(bookingAmt) - parseFloat(walBal));
				walBal = parseFloat(parseFloat(walBal) - parseFloat(walletSaveAmt)); 
				document.getElementById("walletBkngAmt").innerHTML = '<table class = "cashbackInnerTable"><tr><td>You Saved Amount:&nbsp;</td><td><h3> <span class="couponSuccessMsg">'
					  + parseFloat(walletSaveAmt).toFixed(2) +'</span></h3></td></tr><tr><td>'
					  +'From Wallet :&nbsp;</td><td><h3>'+ parseFloat(walBal).toFixed(2) +'</h3></tr>'
					  +'<tr><td>From Payment Gateway:&nbsp;</td><td><h3>'+parseFloat(displayAmt).toFixed(2)
					  +'</h3></td></tr></table>';
			}		
		}		
		
	} else {
			showdiv("walletid");
			showdiv("pggwid");
			document.getElementById("walletBkngAmt").innerHTML = '';
	}
}

function openTrackBus() {
	var srvcCode = "";
	if(document.getElementById('serviceCode') != null) {
		srvcCode = document.getElementById('serviceCode').value;
	}
	var url = 'http://www.apsrtclivetrack.com/#/apsrtc_service_no/' + srvcCode;
	popUpWin(url, '_trackBus');
}

function disableResend(button, disableTime) {
	var oldValue = button.value;
	//convert to milliseconds
	disableTime = parseFloat(disableTime) * 1000;
	button.setAttribute('disabled', true);
	button.className='resendBtn';
    setTimeout(function(){
        button.value = oldValue;
        button.removeAttribute('disabled');        
        button.className='resendBtnEn';
    }, disableTime)
}
function lockoutSubmit(button, disableTime) {
    disableResend(button, disableTime);
    var path =  "/wallet/walletLoginOTP.do?otpType=3";
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function calendarMnYrDate(id) {
	$('#'+id).datepicker({ numberOfMonths: 1
		, dateFormat: 'dd/mm/yy'
		, minDate: '0'
		, changeMonth: true
		, changeYear: true
		, yearRange: '1945:2020'}).val();
}

function continueLinkReturnBkg() {
	if(!validateSubmitBookingLayout()) {
		return false;
	}
	alert("Now, please select the return journey service.");
	
	hidediv('ForwardLinkServiceDiv');
	showdiv('ReturnLinkServiceDiv');
	
	var uc = 'unSelectedDivCs';
	addRemoveCss('fwInfoLeftId', uc, true);
	addRemoveCss('retInfoLeftId', uc, false);
	accomPrice=0;// For return set this one to zero value.
}

function setTextRewardPoints(value){
	if(document.getElementById("eligibleRewardPointsHid") != null)
		document.getElementById("eligibleRewardPointsHid").value = value;
}
function checkRedeemRewardEnable(){
	if(document.getElementById("OTPSuccessDiv") != null && document.getElementById("OTPSuccessDiv").style.display != 'none'){
		var otp = document.getElementById("otpCode");
		if(otp == null || otp.value == ""){
			alert("Please Enter OTP that you received on the Mobile Number provided then click on Submit to continue");
			return false;
		}
	}
	if(document.getElementById("redeemCheck") != null && document.getElementById("redeemCheck").checked == false
			&& document.getElementById("redeemRewardPoints") != null){
		document.getElementById("redeemRewardPoints").value = 0;
	}
	return true;
}

function validateTTDDarsanPassengers(requestType){
	var aPax = 0, cPax = 0, totPax = 0, remainingCapacity = 0;
	var max = parseInt(document.getElementById("maxAgeCh").value);
	for(var i = 0; i < 20; i++) {
		ob = document.getElementById(("passengerAge" + requestType + i));
		if(ob != null) {
			
			if(ob.value != null && ob.value != "" && ob.value <= max) {
				document.getElementById(("categoryCodeId" + requestType + i)).value = CHILD_ID;
				++cPax;
			} else {
				document.getElementById(("categoryCodeId" + requestType + i)).value = ADULT_ID;
				++aPax;
			}
			if(!isNumber(ob)) {
				continue;
			}
		}
	}
	totPax = aPax;
	if(document.getElementById("remainingCapacity") != null)
		remainingCapacity = parseInt(document.getElementById("remainingCapacity").value);
	if(document.getElementById("totalTtdAccAmount") != null && totPax > remainingCapacity){
		alert("selected seats more than ttd capacity, please select other date");
		return false;
	}
	return true;
}

function rewardDisableResend(button, disableTime) {
	var oldValue = button.value;
	//convert to milliseconds
	disableTime = parseFloat(disableTime) * 1000;
	button.setAttribute('disabled', true);
	button.className='resendBtn';
    setTimeout(function(){
        button.value = oldValue;
        button.removeAttribute('disabled');        
        button.className='resendBtnEn';
    }, disableTime)
}