// Set the following variables:

// This must be set to the ID of a Google Spreadsheet where you want data to be logged.
//   You can find the ID of a spreadsheet by temporarily enabling a sharing link (the id is the string after the last "/" in the link url)
var SPREADSHEET_ID = "SPREADSHEET_ID";


/*
	When deployed as a Google Script Web App this code will wait for a HTTP POST request.
	When a HTTP POST request is received the code will be executed.
	The request will provide it with a encoded POST parameter with key `data` and the value containing your data to be logged.
	These data will be added to a new row of the spreadsheet (with the ID provided above).

	For more info see:
	https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/AppendLog
*/

function doPost (e) {
	var full_name = "" + e.parameters.data;

	var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
	var sheet = spreadsheet.getSheets()[0];
	sheet.appendRow([data]);

	return ContentService.createTextOutput("Success");
}