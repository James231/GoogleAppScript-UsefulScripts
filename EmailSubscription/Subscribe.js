// Set the following variables:

// This must be set to the ID of a Google Spreadsheet where you want the mailing list to be stored.
// The list will be stored in the first column of the first sheet on the spreadsheet.
//   You can find the ID of a spreadsheet by temporarily enabling a sharing link (the id is the string after the last "/" in the link url)
var SPREADSHEET_ID = "SPREADSHEET_ID";


/*
	When deployed as a Google Script Web App this code will wait for a HTTP POST request.
	When a HTTP POST request is received the code will be executed.
	The request will provide it with an email address as a form parameter.
	The email will be checked against a regular expression to make sure it is in a valid format.
	Then it will be added to the spreadsheet if it is not already present.
	
	For more info see:
	https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/EmailSubscription
*/

function doPost (e) {
	var emailAddress = "" + e.parameters.email;
	emailAddress = emailAddress.toLowerCase();

	if (!validateEmail(emailAddress)) {
		return ContentService.createTextOutput("Bad Regex");
	}

	// Open spreadsheet and check against existing email addresses
	var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
	var sheet = spreadsheet.getSheets()[0];
	var range = sheet.getDataRange();
	var values = range.getValues();
	var numRows = range.getNumRows();
	for (i = 0; i < numRows; i++) {
	  if (values[i][0] == emailAddress) {
	  	return ContentService.createTextOutput("Duplicate");
	  }
	} 

	sheet.appendRow([emailAddress]);

	return ContentService.createTextOutput("Success");
}


/*
	Checks email address string against regular expression and returns a bool.
	Source: https://stackoverflow.com/a/46181
 */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}