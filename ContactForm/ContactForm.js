// Set the following variables:

// Use this to disable sending emails to yourself on every contact form submission if you want
var SEND_EMAILS = true;

// This is email address where emails will be sent when the contact form is submitted
var YOUR_EMAIL_ADDRESS = "Your Name";

// This must be set to the ID of a Google Spreadsheet where you want contact form entries to be added.
//   You can find the ID of a spreadsheet by temporarily enabling a sharing link (the id is the string after the last "/" in the link url)
var SPREADSHEET_ID = "SPREADSHEET_ID";


/*
	When deployed as a Google Script Web App this code will wait for a HTTP POST request.
	When a HTTP POST request is received the code will be executed.
	The request will provide it with a full_name, email, and message (meant to be from a contact form).
	These values will be added to a spreadsheet (with the ID provided above).
		And if SEND_EMAILS is true, an email will be sent to your address with the provided information.

	For more info see:
	https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/ContactForm
*/

function doPost (e) {
	var full_name = "" + e.parameters.full_name;
	var email = "" + e.parameters.email;
	var message = "" + e.parameters.message;

	// Check none of the data is empty
	if ((full_name) && (email) && (message)) {

		// Send email if enabled
		if (SEND_EMAILS) {
			var emailMessage = "Someone has submitted a contact form on your website!\n\nFull Name: " + full_name + "\n\nEmail: " + email + "\n\nMessage:\n" + message;
    		MailApp.sendEmail(YOUR_EMAIL_ADDRESS, "Contact Form Submitted", emailMessage);
		}

		// Add to spreadsheet
		var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
		var sheet = spreadsheet.getSheets()[0];
		sheet.appendRow([full_name, email, message]);

		return ContentService.createTextOutput("Success");
	}

	return ContentService.createTextOutput("Error");
}