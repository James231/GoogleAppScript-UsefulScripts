// Set the following variables:

// This must be set to the ID of a Google Spreadsheet where you want the mailing list to be stored.
// The list will be stored in the first column of the first sheet on the spreadsheet.
//   You can find the ID of a spreadsheet by temporarily enabling a sharing link (the id is the string after the last "/" in the link url)
var SPREADSHEET_ID = "SPREADSHEET_ID";


/*
	When deployed as a Google Script Web App this code will wait for a HTTP POST or GET request.
	When a HTTP POST or GET request is received the code will be executed.
	The request will provide it with an email address as a form parameter.
	The email will be checked against a regular expression to make sure it is in a valid format.
	Then it will be removed from the mailing list if it is present.
	
	For more info see:
	https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/EmailSubscription
*/

function doGet (e) {
	var emailAddress = "" + e.parameters.email;
	return unsubscribe(emailAddress);
}

function doPost (e) {
	var emailAddress = "" + e.parameters.email;
	return unsubscribe(emailAddress);
}

function unsubscribe(emailAddress) {
	var emailAddress = "" + e.parameters.email;
	emailAddress = emailAddress.toLowerCase().trim();

	if (!validateEmail(emailAddress)) {
		return ContentService.createTextOutput("Bad Regex");
	}

	// Open spreadsheet and look for email addresses
	var foundRowNum = -1;
	var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
	var sheet = spreadsheet.getSheets()[0];
	var range = sheet.getDataRange();
	var values = range.getValues();
	var numRows = range.getNumRows();
	for (i = 0; i < numRows; i++) {
		if (values[i][0] == emailAddress) {
			foundRowNum = i;
		}
	}

	if (foundRowNum == -1) {
		return ContentService.createTextOutput("Not Found");
	}

	sheet.deleteRow(foundRowNum + 1);
	return ContentService.createTextOutput("Successfully Unsubscribed");
}


/*
	Checks email address string against regular expression and returns a bool.
	Source: https://stackoverflow.com/a/46181
*/
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}