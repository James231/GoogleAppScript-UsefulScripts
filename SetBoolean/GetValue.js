// Set the following variables:

// This must be set to the ID of a Google Spreadsheet where you want the value to be stored.
// The value will be a 0 or 1 stored in the top left cell of the first sheet.
//   You can find the ID of a spreadsheet by temporarily enabling a sharing link (the id is the string after the last "/" in the link url)
var SPREADSHEET_ID = "SPREADSHEET_ID";


/*
	When deployed as a Google Script Web App this code will wait for a HTTP POST request.
	When a HTTP POST request is received the code will be executed.
	The request does not require any inputs.
	The response body will be in plaintext either consisting of 'true' or 'false', depending on the value stored in the spreadsheet.
	
	Use the 'SetValue.js' script in the is directory to set the value.

	For more info see:
	https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/SetBoolean
*/

function doPost (e) {

	// Open spreadsheet and set value
	var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
	var sheet = spreadsheet.getSheets()[0];
	var range = sheet.getRange(1, 1);
	var values = range.getValues();

	var returnValue = "error";
	if ("" + values[0][0] == "1") {
		returnValue = "true";
	}
	if ("" + values[0][0] == "0") {
		returnValue = "false";
	}

	return ContentService.createTextOutput(returnValue);
}