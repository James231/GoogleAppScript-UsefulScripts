// Set the following variables:

var SENDER_NAME = "Your Name";

// If you want your email to have a different 'reply-to' address, then enter it here
//   otherwise leave this empty
var REPLY_TO_ADDRESS = "";

/*
	When deployed as a Google Script Web App this code will wait for a HTTP POST request.
	When a HTTP POST request is received the code will be executed.
	The request will provide it with a recipient address, subject, and body (html)
		which will form an email that will be sent (from your gmail address).

	For more info see:
*/

function doPost (e) {
	var recipient_address = "" + e.parameters.address;
	var subject = "" + e.parameters.subject;
	var message = "" + e.parameters.message;

	// Check recipient_address is not empty
	if (recipient_address) {

		// Send the email
		if (REPLY_TO_ADDRESS) {
			MailApp.sendEmail(recipient_address, REPLY_TO_ADDRESS, subject, "", {
				name: SENDER_NAME,
				htmlBody: message,
			});
		} else {
			MailApp.sendEmail(recipient_address, subject, "", {
				name: SENDER_NAME,
				htmlBody: message,
			});
		}

		return ContentService.createTextOutput("Success");
	}

	return ContentService.createTextOutput("Error");
}