/*
 * Author		: Rajasekhar
 * Description 	: Dojo Ajax JavaScripts for Abhibus OPRS Project
 */

/** ************************ Jquery AJAX stuff start ************************** */



var sortTermGlobal;	

var DIV_DEFAULT_WIDTH = "100%",DIV_DEFAULT_HEIGHT = "100%";
// refreshId -- refresh id is used to get the information of current page
var selectedIds = "", refreshId = "",parameter1 = "", parameter2 = "";
var _TAB = '9', _ESC = '27',_ETR = '13', _DEL = '46';
var _Z0 = 48, _N9 = 57, _A = 65, _Z = 90, _BSPC = 8, _SPC = 32;
var refreshInt = 3;
var divPosition = 'relative';
function getCurrentIndex(curIdx, divName) {
	if(curIdx > 0)
		return curIdx;
	// modify the display content as per regular expression matching string
	var table = document.getElementById(divName+"Tbl");
	var row, col;
	var found = false;
	for (var i = 0; table != null && (row = table.rows[i]); i++) {
	   //iterate through rows
	   //rows would be accessed using the "row" variable assigned in the for loop
	   for (var j = 0; (col = row.cells[j]); j++) {
		   //iterate through columns
		   //columns would be accessed using the "col" variable assigned in the for loop
		   if(col.style.display != 'none') {
			   return i;
		   }
	   }
	}// end of rows for loop
	return 0;
}

function respHandlerAjaxJS(txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName) {
	var found = false, t, aStr;
	var rexp = "";
	var tgtId;
	if(window.event) {
		// IE
		tgtId = window.event.srcElement.id;
	} else {
		tgtId = eventObj.target.id;
	}
	rexp = document.getElementById(tgtId).value;
	if(rexp == null || rexp == '') {
		return found;
	}
	rexp = LTrim(RTrim(rexp));
	var pat = new RegExp(rexp.toUpperCase());
	var tStr = "", len = rexp.length;
	// modify the display content as per regular expression matching string
	var table = document.getElementById(divName+"Tbl");
	var row, col;
	for (var i = 0; table != null && (row = table.rows[i]); i++) {
	   //iterate through rows
	   //rows would be accessed using the "row" variable assigned in the for loop
	   for (var j = 0; (col = row.cells[j]); j++) {
		   //iterate through columns
		   //columns would be accessed using the "col" variable assigned in the for loop
		   aStr = col.innerHTML;
		   var vAry = aStr.split("&nbsp;");
		   tStr = LTrim(RTrim(vAry[0]));
		   if(tStr.length == 0) 
			   continue;
		   if(tStr.length > len) {
			   tStr = tStr.substring(0, len);
		   }
		   t = pat.test(tStr);
		   
		   if(t) {
			   found = true;
			   col.style.display = 'block';
			   showdiv(divName);
		   } else {
			   // remove the items from response div display
			   col.style.display = 'none';
		   }
	   }
	}// end of rows for loop
	return found;
}


/**
 * This function is used to submit an ajax action. This method takes path and
 * division names as parameter.
 */
function submitCommonAjaxAction(path, lookupId, divName) {
	var	divWidth = "100%";
	var vHeight = "30%";
	// set the given lookupId to submit in ajax action
	selectedIds = lookupId;

	ajaxCommonActionSubmit(path, divName, divWidth, vHeight);
}// end of submitCommonAjaxAction(?, ?);

/**
 * This function is used to submit an ajax action. This method takes path and
 * division names as parameter.
 */
function submitAjaxAction(path, divName) {
	var	divWidth = "100%";
	var vHeight = "30%";

	ajaxCommonActionSubmit(path, divName, divWidth, vHeight);
}// end of submitAjaxAction(?, ?);

/**
 * This function is used to submit an ajax action. This method takes path and
 * division names as parameter.
 */
function submitAjaxActionDefaultWidth(path, divName) {
	vHEIGHT = "100%";
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, vHEIGHT);
}// end of submitAjaxActionDefaultWidth(?, ?);


function showLoadingTxt(vHeight, divWidth, divName) {
	var pgr = document.getElementById('progressBarDiv');
	if(pgr != null 
			&& pgr.style.display == 'block') {
		return false;
	}
	$(divName).innerHTML = "<span class='loadingBgClr'>Loading...</span>";
	$(divName).style.overflow = 'auto';
	$(divName).style.height = vHeight;
	$(divName).style.width = divWidth;
	$(divName).style.position = divPosition;
	showdiv(divName);
}


// this method is used to process the add product details action
function processCommonAjaxResponse(response, divName, vWidth, vHeight) {
	
	if(document.getElementById("progressBarDiv") != null) {
		hidediv("progressBarDiv");
	}
	$(divName).show();	
	
	divPosition='relative';
}// end of processCommonAjaxResponse();
/** *******************************  ******************************* **/
/** **************** COMMON AJAX actions ends here ***************** **/
/** *******************************  ******************************* **/
/**
 * This method is used to set the sort details of the a form, and calls the ajax
 * action submit method.
 */
function ajaxSort(path, sortId,  divName) {
	
	var previousId = document.getElementById("sortId").value;
	var previousOrder = document.getElementById("sortOrder").value;
	var nextId = sortId;
	var nextOrder = "ASC";
	
	if ((previousId != null) && (previousId == nextId)) {
		if ((previousOrder != null) && (previousOrder == "ASC")) {
			nextOrder = "DESC";
		} else {
			nextOrder = "ASC";
		}
	}
	
	// set the required parameters.
	parameter1 = nextId;
	parameter2 = nextOrder;
	
	if(document.getElementById("startIndex") != null) {
		// set the start index
		startIndexValue = document.getElementById("startIndex").value;
	} else {
		startIndexValue = "0";
	}
	
	// submit the pagination action to get the next page.
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}// end of ajaxSort()

/**
 * Ajax function to get the next page based on the index value.
 * 
 * @param path --
 *            the action path that needs to be submited
 * @param indexVal --
 *            the starting inedex value where the page starts
 * @param divName --
 *            division name
 */
function ajaxGotoIndex(path, indexVal, divName) {
	// get the start index value.
	startIndexValue = indexVal;

	// submit the pagination action to get the next page.
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}// end of ajaxGotoIndex()

/**
 * Ajax function to get the next page based on the index value.
 * 
 * @param path --
 *            the action path that needs to be submited
 * @param indexVal --
 *            the starting inedex value where the page starts
 * @param divName --
 *            division name
 */
function ajaxGotoNext20PageIndex(path, indexVal, next20page, divName) {
	// get the start index value.
	startIndexValue = indexVal;
	parameter1 = next20page;
	
	// submit the pagination action to get the next page.
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}// end of ajaxGotoIndex()

/*
 * This function used for paging based on the start index
 */
function ajaxGotoNext20Index(startIdx, path, divName) {
	if (startIdx.length < 1) {
		startIdx = 0;
	}
	// next 20 page value as start index value
	parameter1 = startIdx;
	// set the start index value
	startIndexValue = (startIdx - 1) * 10;
	// submit the ajax action
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

/*
 * This function used for paging based on the start index
 */
function ajaxGotoPrevious20Index(startIdx, path, divName) {
	if (startIdx.length < 1) {
		startIdx = 0;
	}
	// set next 20 page value with new value
	parameter1 = startIdx - 19;
	// set the start index value
	startIndexValue = (startIdx - 20) * 10;
	// submit the ajax action
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}
/** ************************************************************************** **/


/**
 * Function to replace all single quotes back
 */
function replaceAllSingleQuotes(str2Replace) {
	while(str2Replace.search("###") != -1) {
		str2Replace = str2Replace.replace("###", "\'");
	}
	return str2Replace;
}

//function to test the value is empty or not
function isEmpty(val) {
	if(val == '' || val.length < 1) {
		return true;
	}
	return false;
}// end of is empty function.

function hideDivision(divName) {
	
	if($(divName) == null || $(divName) == "") {
		return false;
	}

 	if ($(divName).style.display == 'block' || $(divName).style.display == '') {
			// hide the given form
			$(divName).style.display = 'none';
	}
 	//////////////////////////////////////////////
 	// get all the elements within the division.
 	var childNodeArry = $(divName).childNodes;
	for (var i = 0; i < childNodeArry.length; i++) {
		if(childNodeArry[i].id != null ||  childNodeArry[i].id != "") {
			// remove elements in the division.
			if(childNodeArry[i].parentNode != null)
				childNodeArry[i].parentNode.removeChild(childNodeArry[i]);
		}
	}
	
}// end of hideDivision() method

function showdiv(id) {
	if(document.getElementById(id) == null) {
		return false;
	}
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';
	} else {
		if (document.layers) { // Netscape 4
			document.id.display = 'block';
		} else { // IE 4
			document.all.id.style.display = 'block';
		}
	}
}

function hidediv(id) {
	if(document.getElementById(id) == null) {
		return false;
	}
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	} else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}

function isRadioButtonChecked(formObj) {
	var inputArray = document.getElementsByTagName("input");
	var size = inputArray.length;
	var checked = false;
	for (var j=0; j < size;j++) {
		if (inputArray[j].type == "radio") {
			checked = inputArray[j].checked;
			if(checked == true) {
				return checked;
			}
		}
	}// end of for loop
	return checked;
}// end of checkRadioChecked()

function showProgressBar(divName, bgDiv) {
	var waitDisplayDiv = document.getElementById(divName); // progress bar division
	if(waitDisplayDiv == null) { return false; } 
	waitDisplayDiv.style.left = (document.body.clientWidth/2) - 200;
	waitDisplayDiv.style.display = '';
	document.body.scrollTop = 0;
  
	showBackground(bgDiv);
}

function showBackground(bgDivName) {
	var waitDiv = document.getElementById(bgDivName); // background Division
    if (! document.body) {
      	waitDiv.style.height = 100;
      	waitDiv.style.width = 200;
    } else {
		waitDiv.style.height = document.body.clientHeight;
		waitDiv.style.width = document.body.clientWidth;
    }
    waitDiv.style.display = '';
    document.body.scrollTop = 0;
}


function getVersionList(val,path,divName){
	selectedIds = LTrim(RTrim(val));
	submitAjaxAction(path,divName);
}

function setVersionList(val,divName) {
	document.getElementById("versionNo").value = val;
	hideDivision(divName);
}

function setRowDataFromAjaxDiv(charCode, divName, txtIdDest, txtObjSrc, txtNameDest) {
	
	var currentIdenx = document.getElementById("currentIndex").value;
	if(document.getElementById("maxSize") == null || document.getElementById("maxSize").value == "") {
		// alert("Property \"maxSize\" is not defined.");
		return false;
	} 
		
	var maxSize = parseInt(document.getElementById("maxSize").value);
	if(maxSize == 0) {
		alert("Property \"maxSize\" value not set.");
		return false;
	}
	var curIdx;
	
	if(currentIdenx == null || currentIdenx == "") {
		curIdx = -1; 
	} else {
		curIdx = parseInt(currentIdenx);
	}
	
	
	if(charCode == '40') {
		curIdx = ++curIdx;
	} else { 
		curIdx = --curIdx;
	}
	
	if(curIdx >= maxSize) {	
		curIdx = --curIdx;
	} else if (curIdx < 0)  {
		curIdx = 0;
	}
	
	document.getElementById("currentIndex").value = curIdx;
	if(document.getElementById(("ajxId_" + curIdx)) == null) {
		return false;
	}
	document.getElementById(txtIdDest).value = document.getElementById(("ajxId_" + curIdx)).value;
	if(txtNameDest != "") {
		document.getElementById(txtNameDest).value = document.getElementById(("ajxName_" + curIdx)).value;
//		document.getElementById(txtNameDest).focus();
	}
	txtObjSrc.value = document.getElementById(("ajxCode_" + curIdx)).value;
}

function populateTextBoxValues(id, codeVal, nameVal, divName) {
	var txtIdDestName = document.getElementById("txtIDSrc").value;
	var txtCodeDestName = document.getElementById("txtCodeSrc").value;
	var txtNameDestName = "";
	
	if(document.getElementById("txtNameSrc") != null) {
		txtNameDestName = LTrim(document.getElementById("txtNameSrc").value);
	}
	
	document.getElementById(txtIdDestName).value = id;
	document.getElementById(txtCodeDestName).value = codeVal;
	
	if(txtNameDestName != "" && txtNameDestName.length > 0 && document.getElementById(txtNameDestName) != null) {
		document.getElementById(txtNameDestName).value = nameVal;
	} else {
		document.getElementById(txtCodeDestName).focus();
	}
	hideDivision(divName);
}

function defaultToCurrentIdexValue(curIdx, txtCodeSrc, txtIdDest, txtNameDest, divName) {

	var txtObjSrc = document.getElementById(txtCodeSrc);
	curIdx = getCurrentIndex(curIdx, divName);
	if(document.getElementById(("ajxId_" + curIdx)) == null || txtObjSrc.value == "") {
		return false;
	}
	
	
	if(document.getElementById(txtIdDest).value != "") {
		return false;
	}
	document.getElementById(txtIdDest).value = document.getElementById(("ajxId_" + curIdx)).value;
	txtObjSrc.value = document.getElementById(("ajxCode_" + curIdx)).value;
	
	if(txtNameDest != "" && document.getElementById(txtNameDest) != null) {
		document.getElementById(txtNameDest).value = document.getElementById(("ajxName_" + curIdx)).value;
//		document.getElementById(txtNameDest).focus();
	}
	hideDivision(divName);
}

function isNonFnKeyPress(charCode) {
	var intCode = parseInt(charCode);
	if((intCode >= _Z0 && intCode <= _N9)
			|| (intCode >= _A && intCode <= _Z)
			|| intCode == _SPC || intCode == _BSPC)
		return false;
	return true;
}
function isNOajaxAction(txtCodeSrc, txtNameDest, lenChek) {
	var length = 0;
	var ob = document.getElementById(txtCodeSrc);
	if(ob != null) {
		length = ob.value.length;
	}
	if(length == 0) {
		ob = document.getElementById(txtNameDest);
		if(ob != null)
			length = ob.value.length;
	}
	if(lenChek == ""){lenChek = 2;}
	if(length == 0 || length < lenChek){return true;}
	return false;
}
function commonAutoCompleteAction(path, txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName) {
	
	var txtObjSrc = document.getElementById(txtCodeSrc);
	var lookupId = txtObjSrc.value;
	
	var charCode = (eventObj.which) ? eventObj.which : event.keyCode;
	if(charCode == _TAB || charCode == _ETR) {
		var idVal = document.getElementById(txtIdDest).value;
		if(idVal == "")
			setTextValuesByIndex(0, txtIdDest, txtCodeSrc, txtNameDest, '', divName);
		return true;
	} else if(charCode == _ESC) {
		document.getElementById(txtIdDest).value = "";
		document.getElementById(txtCodeSrc).value = "";
		document.getElementById(txtNameDest).value = "";
		hideDivision(divName);
		return false;
	} else if((charCode != _BSPC && charCode != _DEL) && isNonFnKeyPress(charCode)) {
		return false;
	}
	document.getElementById(txtIdDest).value = "";
	if(isNOajaxAction(txtCodeSrc, txtNameDest, refreshInt)) {
		return false;
	}
	// set the given lookupId to submit in ajax action
	selectedIds = lookupId;// 
	if(path.indexOf("?") > 0) {
		path += "&";
	} else {
		path += "?";
	}
	path = path + "txtIDSrc=" +  txtIdDest
			+ "&txtCodeSrc=" + txtObjSrc.name
			+ "&txtNameSrc=" + txtNameDest
	;
	var vWIDTH = "200px", vHEIGHT = "30%";
	divPosition='absolute';
	if(respHandlerAjaxJS(txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName)) {
		return false;
	}
	// submit ajax action to set the states list.
	ajaxCommonActionSubmit(path, divName, vWIDTH, vHEIGHT); 
}// end of commonAutoCompleteAction()

function populateTextMoreValues(indx, divName) {
	var txtIdDest = document.getElementById("txtIDSrc").value;
	var txtCodeSrc = document.getElementById("txtCodeSrc").value;
	var txtNameDest = document.getElementById("txtNameSrc").value;
	var otherNames = document.getElementById("otherNames").value;
	setTextValuesByIndex(indx, txtIdDest, txtCodeSrc, txtNameDest, otherNames, divName);
}
function setTextValuesByIndex(curIdx, txtIdDest, txtCodeSrc, txtNameDest, otherNames, divName) {
	var txtObjSrc = document.getElementById(txtCodeSrc);
	curIdx = getCurrentIndex(curIdx, divName);
	document.getElementById(txtIdDest).value = document.getElementById(("ajxId_" + curIdx)).value;
	if(txtNameDest != "") {
		document.getElementById(txtNameDest).value = document.getElementById(("ajxName_" + curIdx)).value;
	}
	txtObjSrc.value = document.getElementById(("ajxCode_" + curIdx)).value;
	if(otherNames.length > 0) {
		if(otherNames.indexOf(",") > 0) {
			otherNameArray = otherNames.split(",");
			otherValueArray = (document.getElementById(("ajxOthers_" + curIdx)).value).split(",");
			for(var j = 0; j < otherNameArray.length; j++) {
				if(document.getElementById(otherNameArray[j]) != null) {
					document.getElementById(otherNameArray[j]).value = otherValueArray[j];
				}
			}
		} else {
			if(document.getElementById(otherNames) != null) {
				document.getElementById(otherNames).value = document.getElementById(("ajxOthers_" + curIdx)).value;
			}
		}
	}
	hideDivision(divName);
}
function manyParamsAutoCompleteAction(path, txtIdDest, txtCodeSrc, txtNameDest, otherNames, eventObj, divName) {
	
	var txtObjSrc = document.getElementById(txtCodeSrc);
	var charCode = (eventObj.which) ? eventObj.which : event.keyCode;
	if(charCode == _TAB || charCode == _ETR) {
		var idVal = document.getElementById(txtIdDest).value;
		if(idVal == "")
			setTextValuesByIndex(0, txtIdDest, txtCodeSrc, txtNameDest, otherNames, divName);
		return false;
	} else if(charCode == _ESC) {
		document.getElementById(txtIdDest).value = "";
		document.getElementById(txtCodeSrc).value = "";
		document.getElementById(txtNameDest).value = "";
		hideDivision(divName);
		return false;
	} else if(isNonFnKeyPress(charCode)) {
		return false;
	}
	document.getElementById(txtIdDest).value = "";
	
	if(path.indexOf("?") > 0) {
		path += "&";
	} else {
		path += "?";
	}
	path = path + "txtIDSrc=" +  txtIdDest
			+ "&txtCodeSrc=" + txtObjSrc.name
			+ "&txtNameSrc=" + txtNameDest
			+ "&otherNames=" + otherNames
	;
	var vWIDTH = "960px", vHEIGHT = "30%";
	divPosition='absolute';
	// submit ajax action to set the states list.
	ajaxCommonActionSubmit(path, divName, vWIDTH, vHEIGHT); 
}// end of manyParamsAutoCompleteAction()
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSelectedRadio(buttonGroup) {
   // returns the array number of the selected radio button or -1 if no button is selected
   if (buttonGroup[0]) { // if the button group is an array (one button is not an array)
      for (var i=0; i<buttonGroup.length; i++) {
         if (buttonGroup[i].checked) {
            return i;
         }
      }
   } else {
      if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero
   }
   // if we get to this point, no radio button is selected
   return -1;
} // Ends the "getSelectedRadio" function

function getSelectedRadioValue(buttonGroup) {
   // returns the value of the selected radio button or "" if no button is selected
   var i = getSelectedRadio(buttonGroup);
   if (i == -1) {
      return "";
   } else {
      if (buttonGroup[i]) { // Make sure the button group is an array (not just one button)
         return buttonGroup[i].value;
      } else { // The button group is just the one button, and it is checked
         return buttonGroup.value;
      }
   }
   return "";
} // Ends the "getSelectedRadioValue" function

function getBookingPlacesList(path, eventObj, divName, txtIdDest, txtCodeSrc, txtNameDest) {
	path = path + "&startPlaceId=" + document.getElementById("startPlaceId").value;
	commonAutoCompleteAction(path, txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName);
}

function getAvailableServiceList(actType, searchType) {
	DIV_DEFAULT_WIDTH = "100%";
	var paramStr = "";
	
	paramStr = "?txtJourneyDate=" + document.getElementById("txtJourneyDate").value
	;
	showdiv("progressBarDiv");
	var divName = "ForwardAvailableServicesDiv";
	if(actType == '1') {
		path = "/return/booking/avail/services.do";
		// return journey parameters
		paramStr = paramStr 
					+ "&startPlaceId=" + document.getElementById("endPlaceId").value
					+ "&endPlaceId=" + document.getElementById("startPlaceId").value
					+ "&txtReturnJourneyDate=" + document.getElementById("txtReturnJourneyDate").value
					+ "&ajaxAction=ret"
					
				;
		divName = "ReturnAvailableServicesDiv";
	} else {
		// forward journey parameters
		path = "/forward/booking/avail/services.do";
		paramStr = paramStr
				+ "&startPlaceId=" + document.getElementById("startPlaceId").value
				+ "&endPlaceId=" + document.getElementById("endPlaceId").value
				+ "&txtLinkJourneyDate=" + document.getElementById("txtLinkJourneyDate").value
				+ "&ajaxAction=fw"
				;
	}
	path = path + paramStr + "&qryType=" + searchType;
	
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getBookingSearchType() {
	var searchType = "";
	if(document.getElementById("searchType") != null) {
		searchType = document.getElementById("searchType").value;
	} else if(document.getElementById("searchType_1").checked == true) {
		searchType = document.getElementById("searchType_1").value;
	} else if(document.getElementById("searchType_2").checked == true) {
		searchType = document.getElementById("searchType_2").value;
	} else if(document.getElementById("searchType_3") != null) {
		searchType = document.getElementById("searchType_3").value;
	}
	return searchType;
}

function ajaxShowBoardingPoints(srid, sid, scId, rtPid, act, idx) {
	
	if(document.getElementById("isLinkTicket") != null){
		document.getElementById("isLinkTicket").value = 0;
	}
	if(document.getElementById("startPlaceCode") != null){
		document.getElementById("startPlaceCode").checked = false;
	}
	var path, divName, dt, startId, endId;
	if(act == "Return") {
		divName = "ReturnBoardPtsDiv";
		dt = document.getElementById("txtReturnJourneyDate").value;
		path = "/ajax/return/layout/boardPoints.do?ajaxAction=rt&txtReturnJourneyDate=" + dt;
		startId = document.getElementById("endPlaceId").value;
		endId = document.getElementById("startPlaceId").value;
	} else {
		startId = document.getElementById("startPlaceId").value;
		endId = document.getElementById("endPlaceId").value;
		divName = "ForwardBoardPtsDiv";
		dt = document.getElementById("txtJourneyDate").value;
		path = "/ajax/forward/layout/boardPoints.do?ajaxAction=fw&txtJourneyDate=" + dt;
	}
	
	document.getElementById(act + "ServiceId").value = sid;
	document.getElementById("srvcRtId" + act).value = srid;
	document.getElementById("categoryId" + act).value = scId;
	
	path = path + "&serviceId=" + sid + "&startPlaceId=" + startId  + "&routeCode=" + srid + "&endPlaceId=" + endId + "&serviceCategoryId=" + scId;
	
	var remName = document.getElementById(act).value;
	removeDiv(remName, divName);
	var divTag = createDiv(divName);
    document.getElementById(("Layout" + act + idx)).appendChild(divTag);
    document.getElementById(act).value = ("Layout" + act + idx);
    showdiv("progressBarDiv");
    accomPrice=0;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);	
}




function displayLayoutDiv(actName) {
	
	
	var ajaxAction = "fw";
	var path = "/ajax/forward/layout/view.do?ajaxAction=" + ajaxAction;
	var journeyDate = document.getElementById("txtJourneyDate").value;
	var adultMale = 0, adultFemale = 0, childMale = 0, childFemale = 0;
	var stockNo = "", concessionId = "", srvcTypeCatgId = "";
	var divName = "ShowLayoutDiv";
	
	
	var sid = document.getElementById(actName + "ServiceId").value;
	var srid = document.getElementById("srvcRtId" + actName).value;
	var boardId = "", dropId = "";
	var t, searchType ;
	if(document.getElementById("txtReturnJourneyDate") != null)
		t = document.getElementById("txtReturnJourneyDate").value;
	
	if(t =! null && t != "" && t != "For Roundtrip" && validateDate(t)) {
		searchType = '1';
	} else {
		searchType = "0";
	}
	var isLinkTicket = 0, linkPlaceId = 0, linkStartPlaceId = 0, linkEndPlaceId = 0;
	if(document.getElementById("isLinkTicket") != null)
		isLinkTicket = document.getElementById("isLinkTicket").value;
	if(actName == "Return") {
		boardId = document.getElementById(actName + "BoardId").value;
		dropId = document.getElementById(actName + "DroppingId").value;
		if(document.getElementById("linkPlaceIdRet") != null)
			linkPlaceId = document.getElementById("linkPlaceIdRet").value;
		
		if(document.getElementById("startPlaceId") != null)
			linkStartPlaceId = document.getElementById("startPlaceId").value;
		
		if(document.getElementById("endPlaceId") != null)
			linkEndPlaceId = document.getElementById("endPlaceId").value;
		
		path = "/ajax/return/layout/view.do?ajaxAction=rt"
				+ "&startPlaceId=" + boardId
				+ "&endPlaceId=" + dropId
				+ "&isLinkTicket=" + isLinkTicket
				+ "&linkPlaceId=" + linkPlaceId
				+ "&linkStartPlaceId=" + linkEndPlaceId
				+ "&linkEndPlaceId=" + linkStartPlaceId
				;
    	divName = "ShowReturnLayoutDiv";
    	journeyDate = document.getElementById("txtReturnJourneyDate").value;
    } else {
		boardId = document.getElementById(actName + "BoardId").value;
		dropId = document.getElementById(actName + "DroppingId").value;
		if(document.getElementById("linkPlaceId") != null)
			linkPlaceId = document.getElementById("linkPlaceId").value;
		
		if(document.getElementById("startPlaceId") != null)
			linkStartPlaceId = document.getElementById("startPlaceId").value;
		
		if(document.getElementById("endPlaceId") != null)
			linkEndPlaceId = document.getElementById("endPlaceId").value;
		
		path = path + "&endPlaceId=" + dropId
					+ "&startPlaceId=" + boardId
					+ "&isLinkTicket=" + isLinkTicket
					+ "&linkPlaceId=" + linkPlaceId
					+ "&linkStartPlaceId=" + linkStartPlaceId
					+ "&linkEndPlaceId=" + linkEndPlaceId
					;
	}
	var retJourneyDate = "";
	if(document.getElementById("txtReturnJourneyDate") != null)
		retJourneyDate = document.getElementById("txtReturnJourneyDate").value;
	if(retJourneyDate == null || retJourneyDate == "" || retJourneyDate == "For Roundtrip") {
		retJourneyDate = "";
	}
	if(document.getElementById("concessionId") != null)
		concessionId = document.getElementById("concessionId").value;
		
	if(document.getElementById("serviceCategoryId") != null)
		srvcTypeCatgId = document.getElementById("serviceCategoryId").value;
	
	if(boardId == null || boardId == "") {
		alert("Please select boarding point to continue.");
		return false;
	}
	if(dropId == null || dropId == "") {
		alert("Please select dropping point to continue.");
		return false;
	}
	if(concessionId == null || concessionId == "") {
		alert("Please select a concession to continue.");
		return false;
	}
	var forwardDynMap = "";
	var returnDynMap = "";
	if(document.getElementById("forwardDynFareDetails") != null){
		forwardDynMap = document.getElementById("forwardDynFareDetails").value;
	}
	if(document.getElementById("returnDynFareDetails") != null){
		returnDynMap = document.getElementById("returnDynFareDetails").value;
	}
	var layoutId = "";
	var returnLayoutId = "";
	if(document.getElementById("layoutId") != null){
		layoutId = document.getElementById("layoutId").value;
	}
	if(document.getElementById("returnLayoutId") != null){
		returnLayoutId = document.getElementById("returnLayoutId").value;
	}
	showdiv("progressBarDiv");
	
    path = path + "&searchType=" + searchType
			+ "&concessionId=" + concessionId
    		+ "&serviceCategoryId=" + document.getElementById("categoryId" + actName).value
    		+ "&serviceId=" + document.getElementById(actName + "ServiceId").value
    		+ "&txtJourneyDate=" + journeyDate
    		+ "&txtReturnJourneyDate=" + retJourneyDate
    		+ "&srvcTypeCatgId=" + srvcTypeCatgId
    		+ "&layoutId=" + layoutId
    		+ "&returnLayoutId=" + returnLayoutId
    		+ "&returnDynFareDetails=" + returnDynMap
    		+ "&forwardDynFareDetails=" + forwardDynMap
    ;
    ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function showCancellServices() {
	var path = '/ajax/cancel/services/load.do?txtJourneyDate='
		+ document.getElementById('txtJourneyDate').value; 
	var divName = 'CancelledServiceDivId';
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function showCancellTicketsPage(val, mob) {
	var path = '/ajax/cancel/details/load.do'; 
	var divName = 'BookedTicketsDivId';
	if(document.getElementById("id") != null) {
		document.getElementById("id").value = val;
	}
	path = path + "?searchType=0"
				+ "&id=" + val
				+ "&mobileNo=" + mob
	;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function showTicketDetailsPage(divName) {
	var txtJourneyDate = "";
	if(document.getElementById("txtJourneyDate") != null)
		txtJourneyDate = document.getElementById("txtJourneyDate").value;
	var path = "/ajax/ticket/alter/load.do?searchType=0&id=" + document.getElementById("id").value
		+ "&stockKey=" + document.getElementById("stockKey").value
		+ "&stockNumber=" + document.getElementById("stockNumber").value
		+ "&txtJourneyDate=" + txtJourneyDate
	;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getRefundDetails(divName) {
	var i=0; 
	var obj, mPrice = "", qty = "";
	while(true) {
		obj = document.getElementById("mPrice"+i);
		if(obj == null) break;
		if(i > 0) {mPrice += ","; qty += ",";}
		mPrice += obj.value;
		qty += document.getElementById("mQty"+i).value;
		i++;
	}
	i=0;
	var ob, seats = "";
	while(true) {
		ob = document.getElementById("seatNos" + i);
		if(ob == null) break;
		else if(ob.checked == true) {
			if(seats.length > 0) seats += ",";
			seats += ob.value;
		}
		i++;
	}
	if(seats.length == 0) {
		alert("Atleast one seat must be selected for partial cancellation.");
		seats = document.getElementById("seatNos0").value;
		document.getElementById("seatNos0").checked = true;
	} 
	document.getElementById("seatNosForward").value = seats;
	
	var uid = "";
	if(document.getElementById("uidNumber") != null) {
		uid = document.getElementById("uidNumber").value ;
	}
	var mobile = "";
	if(document.getElementById("mobileNo") != null) {
		mobile = document.getElementById("mobileNo").value ;
	}
	var path = "/ticket/cancel/refund/calc.do?searchType=1"
		+ "&id=" + document.getElementById("id").value
		+ "&seats=" + seats
		+ "&mPricLs=" + mPrice
		+ "&mSelQty=" + qty
		+ "&showLayout=false"
		+ "&uidNumber=" + uid
		+ "&mobileNo=" + mobile
	;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	showdiv(divName);
}
function showStaffDetailDiv(counterId) {
	var roleId = document.getElementById("roleId").value;
	var path = '/ajax/booking/counters/load.do?blockedType=1';
	if(roleId == 1002) {
		path = path + "&roleId=" + roleId 
				    + "&counterId=" + counterId;
		// enable this code when counter's is in use
		// submitAjaxAction(path, 'CountersDivId');
		showdiv("agentDetailsDivId");
	} else {
		hidediv("agentDetailsDivId");
	}
}
function validateFields(srcName, path, divId) {
	var srcObj = document.getElementById(srcName);
	if(path.indexOf("?") > 0) {
		path += "&";
	} else {
		path += "?";
	}
	path = path + srcName + "=" + srcObj.value;
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

/* ************************** JQUERY Realted calls ************************** */
   /**
    * This function is used to take the divisiotn width, height as parameter along
    * with the path, division name. This function can be used for all types of ajax
    * action with six parameters, (can be extended in future if required).
    */
function ajaxCommonActionSubmit(path, divName, divWidth, vHeight) {
   	divPosition = 'relative';
   	//showLoadingTxt(vHeight, divWidth, divName);   	
   	
   	// get context path
   	var contextPath = document.getElementById("contextPath").value;
   	var rNum = new Date().getTime() + Math.floor((Math.random()*100)+1);
   	// form the exact url to be performed
   	var realPath =  contextPath + path + "&X=" + rNum;
   	var actionType = document.getElementById("ajaxAction").value;   	
   	
   	$.ajax({
        url: realPath,
        type: "POST",
        cache: false,
        data: ({parameter1: rNum, 
				parameter2: parameter2,
				actionType: actionType
				}),
        dataType: "html",        
        success: function(data) {
				$('#'+divName).html(data);        		
				processCommonAjaxResponse(data, divName, divWidth, vHeight);				
			}
   	});

}

function transferWalletMoney(path, divId){
	var mobileNo = '', email = '', walletTranserAmount = '', description  = '';
	var obj = document.getElementById("mobileNo");
	if(obj != null && obj.value != ""){
		mobileNo = obj.value;
		
	}
	obj = document.getElementById("email");
	if(obj != null && obj.value != ""){
		email = obj.value;
		
	}
	obj = document.getElementById("walletTranserAmount");
	if(obj != null && obj.value != ""){
		walletTranserAmount = obj.value;
		if(!isValidNumber(obj)) {
			return false;
		}
	}
	path = path + "?mobileNo=" + mobileNo
				+ "&email=" + email
				+ "&walletTranserAmount=" + walletTranserAmount;
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function validateTransferOTP(divName){
	
	var path = "/ajax/wallet/transfer/generateOTP.do?otpType=2";
	ajaxCommonActionSubmit(path, divName);
}

function pgwAmountAddToWallet(path, divId){
	
	var i=0; 
	var obj, mPrice = "", qty = "";
	while(true) {
		obj = document.getElementById("mPrice"+i);
		if(obj == null) break;
		if(i > 0) {mPrice += ","; qty += ",";}
		mPrice += obj.value;
		qty += document.getElementById("mQty"+i).value;
		i++;
	}
	i=0;
	var ob, seats = "";
	while(true) {
		ob = document.getElementById("seatNos" + i);
		if(ob == null) break;
		else if(ob.checked == true) {
			if(seats.length > 0) seats += ",";
			seats += ob.value;
		}
		i++;
	}
	if(seats.length == 0 && document.getElementById("seatNos0") != null) {
		seats = document.getElementById("seatNos0").value;
		document.getElementById("seatNos0").checked = true;
	} 
	document.getElementById("seatNosForward").value = seats;
	
	var uid = "";
	if(document.getElementById("uidNumber") != null) {
		uid = document.getElementById("uidNumber").value ;
	}
	var mobile = "";
	if(document.getElementById("mobileNo") != null) {
		mobile = document.getElementById("mobileNo").value ;
	}
	var walletRefundAmount = 0,pgwRefundAmount = 0, refundTotalAmount = 0;
	if(document.getElementById("checkPgwRefundToWallet").checked){
		checkPgwRefundToWallet = 1;
	} else {
		checkPgwRefundToWallet = 0;
	}
	path = path + "?searchType=1"
			+ "&id=" + document.getElementById("id").value
			+ "&seats=" + seats
			+ "&mPricLs=" + mPrice
			+ "&mSelQty=" + qty
			+ "&showLayout=false"
			+ "&uidNumber=" + uid
			+ "&mobileNo=" + mobile
			+ "&checkPgwRefundToWallet=" + checkPgwRefundToWallet;
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function cashbackValidation(path,divId){
	var onwardTotalFare = 0.0, totalAmount = 0.0, returnTotalFare = 0.0;
	
	var onwardTotalFareVal = document.getElementById("totalAmountHid");
	if(onwardTotalFareVal != null){
			onwardTotalFare = onwardTotalFareVal.value;
	}
	
	var retTotalFareVal = document.getElementById("retTotalAmountHid");
	if(retTotalFareVal != null){
		returnTotalFare = retTotalFareVal.value;
			
	}
	totalAmount = parseFloat(onwardTotalFare) + parseFloat(returnTotalFare);
	
	var cashbackCouponObj = document.getElementById('cashbackCoupon');
	var cashbackCoupon;
	if(cashbackCouponObj != null){
		cashbackCoupon = cashbackCouponObj.value;
	}
	var cashbackCouponObj = document.getElementById('bankRefNo');
	var bankRefNo;
	if(cashbackCouponObj != null){
		bankRefNo = cashbackCouponObj.value;
	}
	
	var concessionAmoun = 0.0, dynamicDiscountFare = 0.0;
	/*if(document.getElementById("totalAmountHid") != null)
	totalAmount = parseFloat(document.getElementById("totalAmountHid").value);*/
	if(document.getElementById("concessionAmountHid") != null)
		concessionAmoun = parseFloat(document.getElementById("concessionAmountHid").value);
	if(document.getElementById("dynamicDiscountFareHid") != null)
		dynamicDiscountFare = parseFloat(document.getElementById("dynamicDiscountFareHid").value);
	
	path = path + "?cashbackCoupon="+ cashbackCoupon
				+ "&bankRefNo="+ bankRefNo
				+ "&totalAmount="+ totalAmount
				+ "&concessionAmount="+ concessionAmoun
				+ "&dynamicDiscountFare="+ dynamicDiscountFare
				;

	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	//document.getElementById('cashbackCoupon').
}

function getSearchLinkTicketList(path, divName) { 
	var txtJourneyDate, endPlaceId, startPlaceId, txtReturnJourneyDate = "";
	hidediv("ForwardLinkServiceDiv");
	hidediv("ReturnLinkServiceDiv");
	showdiv("populateLinkPlacesDiv");
	if(document.getElementById("startPlaceId") != null && document.getElementById("startPlaceId").value){
		startPlaceId = document.getElementById("startPlaceId").value;
	} else {
		alert("Please enter start place..");
		return false;
	}
	if(document.getElementById("endPlaceId") != null && document.getElementById("endPlaceId").value){
		endPlaceId = document.getElementById("endPlaceId").value;
	}else {
		alert("Please enter end place..");
		return false;
	}

	
	if(document.getElementById("txtJourneyDate") != null && document.getElementById("txtJourneyDate").value){
		txtJourneyDate = document.getElementById("txtJourneyDate").value;
	}else {
		alert("Please select journey date..");
		return false;
	}
	if(document.getElementById("txtReturnJourneyDate") != null && document.getElementById("txtReturnJourneyDate").value){
		txtReturnJourneyDate = document.getElementById("txtReturnJourneyDate").value;
	}
	/*if(document.getElementById("searchType_3") != null 
			&& document.getElementById("searchType_3").checked == true){
		if(document.getElementById("txtReturnJourneyDate") != null && document.getElementById("txtReturnJourneyDate").value){
			txtReturnJourneyDate = document.getElementById("txtReturnJourneyDate").value;
		}else {
			alert("Please select return journey date..");
			return false;
		}
	}*/
	
	path = path + "?txtJourneyDate=" + txtJourneyDate
				+ "&txtReturnJourneyDate=" + txtReturnJourneyDate
	            + "&endPlaceId=" + endPlaceId
	            + "&startPlaceId=" + startPlaceId
				;
	showdiv("progressBarDiv");
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getLinkAvailableServiceList(path, linkType, linkPlaceId, offlinePlace, linkRouteId, divName){
	
	/*hidediv("ForwardAvailableServicesDiv");
	hidediv("ReturnAvailableServicesDiv");*/
	hidediv("fwInfoLeftId");
	hidediv("retInfoLeftId");
	showdiv("ForwardLinkServiceDiv");
	showdiv("ReturnLinkServiceDiv");
	hidediv("populateLinkPlacesDiv");
	// forward journey parameters
	var arrivalDay = 0;
	var startPlaceId = 0, endPlaceId = 0;
	// Exaple :hyd---tpt---knpm  actual route
	//hyd--->sart, tpt--->end
	//tpt--->start, hyd--->end
	if(document.getElementById("isLinkTicket") != null)
		document.getElementById("isLinkTicket").value = 1;
	
	if(linkType == 'Forward'){
		if(document.getElementById("linkPlaceId") != null)
			document.getElementById("linkPlaceId").value = linkPlaceId;
		
		if(document.getElementById("offlinePlaceFw") != null)
			document.getElementById("offlinePlaceFw").value = offlinePlace;
		if(offlinePlace == 1){
			startPlaceId = linkPlaceId;
			if(document.getElementById("endPlaceId") != null)
				endPlaceId = document.getElementById("endPlaceId").value;

			if(document.getElementById("startPlaceId") != null)
				linkPlaceId = document.getElementById("startPlaceId").value;
		} else {
			if(document.getElementById("startPlaceId") != null)
				startPlaceId = document.getElementById("startPlaceId").value;
			
			endPlaceId = linkPlaceId;
			if(document.getElementById("endPlaceId") != null)
				linkPlaceId = document.getElementById("endPlaceId").value;

		}

	} else if(offlinePlace == 1){
		if(document.getElementById("offlinePlaceRt") != null)
			document.getElementById("offlinePlaceRt").value = offlinePlace;
		
		if(document.getElementById("linkPlaceIdRet") != null)
			document.getElementById("linkPlaceIdRet").value = linkPlaceId;
		
		startPlaceId = linkPlaceId;

		if(document.getElementById("startPlaceId") != null)
			endPlaceId = document.getElementById("startPlaceId").value;
		
		if(document.getElementById("endPlaceId") != null)
			linkPlaceId = document.getElementById("endPlaceId").value;


	} else {
		if(document.getElementById("offlinePlaceRt") != null)
			document.getElementById("offlinePlaceRt").value = offlinePlace;
		
		if(document.getElementById("linkPlaceIdRet") != null)
			document.getElementById("linkPlaceIdRet").value = linkPlaceId;
		
		if(document.getElementById("endPlaceId") != null)
			startPlaceId = document.getElementById("endPlaceId").value;
		
		endPlaceId = linkPlaceId;
		
		if(document.getElementById("startPlaceId") != null)
			linkPlaceId = document.getElementById("startPlaceId").value;

	}
	if(linkType == 'Forward'){
		if(document.getElementById("linkRouteId") != null)
			document.getElementById("linkRouteId").value = linkRouteId;
	} else {
		if(document.getElementById("linkRouteIdRet") != null)
			document.getElementById("linkRouteIdRet").value = linkRouteId;
	}
	if(linkType == 'Forward'){
		path = path + "?startPlaceId=" + startPlaceId
		+ "&endPlaceId=" + endPlaceId
		+ "&linkPlaceId=" + linkPlaceId
		+ "&txtJourneyDate=" + document.getElementById("txtJourneyDate").value
		+"&arrivalDay=" + arrivalDay 
		+ "&isLinkTicket=1"
		+ "&linkType=fw"
		+ "&ajaxAction=fw"
		+ "&offlinePlaceFw=" + offlinePlace
		+ "&linkRouteId=" + linkRouteId
		;
	} else {
		path = path +"?startPlaceId=" + startPlaceId
		+ "&endPlaceId=" + endPlaceId
		+ "&linkPlaceId=" + linkPlaceId
		+ "&txtJourneyDate=" + document.getElementById("txtJourneyDate").value
		+ "&txtReturnJourneyDate=" + document.getElementById("txtReturnJourneyDate").value
		+"&arrivalDay=" + arrivalDay 
		+ "&isLinkTicket=1"
		+ "&linkType=rt"
		+ "&ajaxAction=rt"
		+ "&offlinePlaceRt=" + offlinePlace
		+ "&linkRouteId=" + linkRouteId
		;
	}

	showdiv("progressBarDiv");
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
	showdiv('modifySearchId');
	return true;
	
}

function ajaxShowLinkBoardingPoints(srid, sid, scId, rtPid, act, idx) {
	var path, divName, dt, startId, endId;
	if(document.getElementById("isLinkTicket") != null){
		document.getElementById("isLinkTicket").value = 1;
	}
	if(document.getElementById("startPlaceCode") != null){
		document.getElementById("startPlaceCode").checked = true;
	}
	
	if(act == "Return") {
		divName = "ReturnBoardPtsDiv";
		dt = document.getElementById("txtReturnJourneyDate").value;
		path = "/ajax/return/layout/boardPoints.do?ajaxAction=rt&txtReturnJourneyDate=" + dt;
		/*startId = document.getElementById("endPlaceId").value;
		endId = document.getElementById("startPlaceId").value;*/
		if(document.getElementById("offlinePlaceRt") != null)
			offlinePlace = document.getElementById("offlinePlaceRt").value;
		if(offlinePlace == 1){

			if(document.getElementById("linkPlaceIdRet") != null)
				linkPlaceId = document.getElementById("linkPlaceIdRet").value;

			startId = linkPlaceId;

			if(document.getElementById("startPlaceId") != null)
				endId = document.getElementById("startPlaceId").value;

		} else {
	
			if(document.getElementById("linkPlaceIdRet") != null)
				linkPlaceId = document.getElementById("linkPlaceIdRet").value;

			if(document.getElementById("endPlaceId") != null)
				startId = document.getElementById("endPlaceId").value;

			endId = linkPlaceId;

		}
	} else {
		/*startId = document.getElementById("startPlaceId").value;
		endId = document.getElementById("endPlaceId").value;*/
		
		if(document.getElementById("txtReturnJourneyDate").value != '' && document.getElementById("endPlaceCodeRet") != null 
				&& document.getElementById("endPlaceCodeRet").checked == false){
			alert("Please Select Return service list..");
			return false;
			
		}
		if(document.getElementById("linkPlaceId") != null)
			linkPlaceId = document.getElementById("linkPlaceId").value;
		
		if(document.getElementById("offlinePlaceFw") != null)
			offlinePlace = document.getElementById("offlinePlaceFw").value;
		if(offlinePlace == 1){
			startId = linkPlaceId;
			if(document.getElementById("endPlaceId") != null)
				endId = document.getElementById("endPlaceId").value;
			
		} else {
			if(document.getElementById("startPlaceId") != null)
				startId = document.getElementById("startPlaceId").value;
			
			endId = linkPlaceId;

		}
		divName = "ForwardBoardPtsDiv";
		dt = document.getElementById("txtJourneyDate").value;
		path = "/ajax/forward/layout/boardPoints.do?ajaxAction=fw&txtJourneyDate=" + dt;
	}
	
	document.getElementById(act + "ServiceId").value = sid;
	document.getElementById("srvcRtId" + act).value = srid;
	document.getElementById("categoryId" + act).value = scId;
	
	path = path + "&serviceId=" + sid 
				+ "&startPlaceId=" + startId 
				+ "&routeCode=" + srid 
				+ "&endPlaceId=" + endId 
				+ "&serviceCategoryId=" + scId
				+ "&isLinkTicket=1";
	
	var remName = document.getElementById(act).value;
	removeDiv(remName, divName);
	var divTag = createDiv(divName);
    document.getElementById(("LTLayout" + act + idx)).appendChild(divTag);
    document.getElementById(act).value = ("LTLayout" + act + idx);
    showdiv("progressBarDiv");
    accomPrice=0;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);	
}

function redeemRewardPoints(path, divName){
	showdiv(divName);
	var rewardPoints = 0, retTotalAmountHid = 0.0, updatedRewardPoints = 0, eligibleRewardPoints = 0;
	if(document.getElementById("eligibleRewardPointsHid") != null && document.getElementById("eligibleRewardPointsHid").value != ''
		&& document.getElementById("eligibleRewardPointsHid").value != 0){
		updatedRewardPoints = document.getElementById("eligibleRewardPointsHid").value;
	} else {
		alert("Reward Points are not Zero..");
		return false;
	}
	
	if(document.getElementById("eligibleRewardPoints") != null){
		eligibleRewardPoints = document.getElementById("eligibleRewardPoints").value;
	}
	if(parseInt(updatedRewardPoints) > parseInt(eligibleRewardPoints)){
		alert("Please enter eligible reward points..");
		return false;
	}
	
	var ForwardOrigBasicFare = 0.0, ReturnOrigBasicFare = 0.0, basicFareHid = 0.0, basicFareHidRet = 0.0;
	if(document.getElementById("ForwardOrigBasicFare") != null){
		ForwardOrigBasicFare = document.getElementById("ForwardOrigBasicFare").innerHTML;
	}
	if(document.getElementById("ReturnOrigBasicFare") != null){
		ReturnOrigBasicFare = document.getElementById("ReturnOrigBasicFare").innerHTML;
	}
	//basicFareHid = parseFloat(ForwardOrigBasicFare) + parseFloat(ReturnOrigBasicFare);
	
	var mobileNum = null;
	if(document.getElementById("mobileNo")){
		mobileNum = document.getElementById("mobileNo").value;
	}
	basicFareHid = parseFloat(ForwardOrigBasicFare);
	basicFareHidRet = parseFloat(ReturnOrigBasicFare);
	path = path + "?eligibleRewardPoints="+eligibleRewardPoints
	            + "&basicFareHid=" + basicFareHid
	            + "&retTotalPrice=" + basicFareHidRet
	            + "&mobileNo=" + mobileNum
	            + "&updatedRewardPoints=" + updatedRewardPoints;

	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function cancelRedeemPoints(path, divName){
	showdiv(divName);
	hidediv("redeemSuccessDiv");
	var rewardPoints = 0;
	if(document.getElementById("rewardPoints") != null && document.getElementById("rewardPoints").value != ''
		&& document.getElementById("rewardPoints").value != 0){
		rewardPoints = document.getElementById("rewardPoints").value;
	} 
	var ForwardOrigBasicFare = 0.0, ReturnOrigBasicFare = 0.0, basicFareHid = 0.0, basicFareHidRet = 0.0;
	if(document.getElementById("ForwardOrigBasicFare") != null){
		ForwardOrigBasicFare = document.getElementById("ForwardOrigBasicFare").innerHTML;
	}
	if(document.getElementById("ReturnOrigBasicFare") != null){
		ReturnOrigBasicFare = document.getElementById("ReturnOrigBasicFare").innerHTML;
	}
	basicFareHid = parseFloat(ForwardOrigBasicFare);
	basicFareHidRet = parseFloat(ReturnOrigBasicFare);
	path = path + "?rewardPoints="+rewardPoints
				+ "&basicFareHid=" + basicFareHid
				+ "&retTotalPrice=" + basicFareHidRet
				;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}


function getOTPToMobile(path, divName){
	hidediv("ShowBtnRedeemDivID");
	showdiv("OTPSuccessDiv");
	var mobileNum = document.getElementById("mobileNo").value;
	if(mobileNum == "" || mobileNum == null){
		alert("Please Enter the Mobile Number");
		return false;
	}
	path = path + "?mobileNo="+mobileNum;
    ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function reSendOTP(path, divName, button, disableTime){
	rewardDisableResend(button, disableTime);
	hidediv("ShowBtnRedeemDivID");
	showdiv("OTPSuccessDiv");
	var mobileNum = document.getElementById("mobileNo").value;
	/*if(mobileNum == "" || mobileNum == null){
		alert("Please Enter the Mobile Number");
		return false;
	}*/
	path = path + "?mobileNo="+mobileNum;
    ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function validateAndSubmitOtp(path, divName){
	var otp = document.getElementById("otpCode").value;
	if(otp.trim().length < 6){
		alert("Please Enter Valid OTP..");
		return false;
	}
	hidediv("OTPSuccessDiv");
	var mobileNum = document.getElementById("mobileNo").value;
	
	var ForwardOrigBasicFare = 0.0, ReturnOrigBasicFare = 0.0, basicFareHid = 0.0, basicFareHidRet = 0.0;
	if(document.getElementById("ForwardOrigBasicFare") != null){
		ForwardOrigBasicFare = document.getElementById("ForwardOrigBasicFare").innerHTML;
	}
	if(document.getElementById("ReturnOrigBasicFare") != null){
		ReturnOrigBasicFare = document.getElementById("ReturnOrigBasicFare").innerHTML;
	}
	basicFareHid = parseFloat(ForwardOrigBasicFare);
	basicFareHidRet = parseFloat(ReturnOrigBasicFare);
	path = path + "?otpCode="+otp+ "&mobileNo= " + mobileNum 
	+ "&basicFareHid= " + basicFareHid
	+ "&retTotalPrice= " + basicFareHidRet
	;
    ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getRewardRedeem(obj, divName){
	if(obj.checked == true){
		var selectedSeats = document.getElementsByName('seatDetails');
		if(parseInt(selectedSeats.length) < 1){
			alert("Please select seat to continue.");
			obj.checked = false;
			return false;
		}
		
		if(document.getElementById('PaxTblReturn') != null && document.getElementById("seatDetailsReturn0") == null){
			alert("Please select seat to continue.");
			obj.checked = false;
			return false;
		}
		
		showdiv(divName);
		hidediv("OTPSuccessDiv");
		var ForwardOrigBasicFare = 0.0, ReturnOrigBasicFare = 0.0, basicFareHid = 0.0, basicFareHidRet = 0.0;
		/*var mobileNo;
		if(document.getElementById("mobileNo") != null){
			mobileNo = document.getElementById("mobileNo").value;
		} else {
			alert("Please enter mobile No..")
			return false;
		}*/
		
		if(document.getElementById("ForwardOrigBasicFare") != null && document.getElementById("ForwardOrigBasicFare").innerHTML != ''){
			ForwardOrigBasicFare = document.getElementById("ForwardOrigBasicFare").innerHTML;
		}
		if(document.getElementById("ReturnOrigBasicFare") != null && document.getElementById("ReturnOrigBasicFare").innerHTML != ''){
			ReturnOrigBasicFare = document.getElementById("ReturnOrigBasicFare").innerHTML;
		}
		basicFareHid = parseFloat(ForwardOrigBasicFare);
		basicFareHidRet = parseFloat(ReturnOrigBasicFare);
		path = "/ajax/booking/showRedeemAmount.do?mobileNo="+mobileNo 
		+ "&basicFareHid=" + basicFareHid
		+"&retTotalPrice=" + basicFareHidRet;
	    ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	} else{
		hidediv(divName);
		hidediv("OTPSuccessDiv");
		hidediv("redeemSuccessDiv");
	}
	
}





