// Set the following variables:

// This must be set to the ID of a Google Spreadsheet where you want the value to be stored.
// The value will be a 0 or 1 stored in the top left cell of the first sheet.
//   You can find the ID of a spreadsheet by temporarily enabling a sharing link (the id is the string after the last "/" in the link url)
var SPREADSHEET_ID = "SPREADSHEET_ID";


/*
	When deployed as a Google Script Web App this code will wait for a HTTP POST request.
	When a HTTP POST request is received the code will be executed.
	The request will provide it with a value, which will be 'true' or 'false'.
	Then the value in the spreadsheet will be set to 1 (for 'true') and 0 (for 'false').
	
	Use the 'GetValue.js' script in the is directory to retreive the value that has been set.

	For more info see:
	https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/SetBoolean
*/

function doPost (e) {
	var value = "" + e.parameters.value;
	var valueInt = -1;

	if (value.toUpperCase() == "TRUE" || value == "1") {
		valueInt = 1;
	}

	if (value.toUpperCase() == "FALSE" || value == "0") {
		valueInt = 0;
	}

	if (valueInt == -1) {
		return ContentService.createTextOutput("Error");
	}

	// Open spreadsheet and set value
	var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
	var sheet = spreadsheet.getSheets()[0];
	var range = sheet.getRange(1, 1);
	range.setValue(valueInt);

	return ContentService.createTextOutput("Success");
}