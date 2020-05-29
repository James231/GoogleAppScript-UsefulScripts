// Set the following variables:

// Use this to disable sending emails to yourself on every contact form submission if you want
var SEND_EMAILS = true;

// This is email address where emails will be sent when the contact form is submitted
var YOUR_EMAIL_ADDRESS = "Your Name";

// This must be set to the ID of a Google Spreadsheet where you want contact form entries to be added.
//   You can find the ID of a spreadsheet by temporarily enabling a sharing link (the id is the string after the last "/" in the link url)
var SPREADSHEET_ID = "SPREADSHEET_ID";

// This should the set to the recaptcha secret for your website
var RECAPTHCA_SECRET = "RECAPTHCA_SECRET"


/*
    When deployed as a Google Script Web App this code will wait for a HTTP POST request.
    When a HTTP POST request is received the code will be executed.
    The request will provide it with a full_name, email, message and token (meant to be from a contact form).
    The token comes from client side recaptcha v2.
    These values will be added to a spreadsheet (with the ID provided above).
        And if SEND_EMAILS is true, an email will be sent to your address with the provided information.

    For more info see:
    https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/ContactForm
    And recaptcha docs:
    https://developers.google.com/recaptcha/docs/display
*/

function doPost (e) {
    var full_name = "" + e.parameters.full_name;
    var email = "" + e.parameters.email;
    var message = "" + e.parameters.message;
    var ctoken = "" + e.parameters.token;

    // Check none of the data is empty
    if ((full_name) && (email) && (message)) {

        if (!validateEmail(email)) {
            return ContentService.createTextOutput("Invalid Email");
        }

        if (ctoken.length < 10) {
            return ContentService.createTextOutput("Invalid Captcha");
        }

        // Check recaptcha token is valid:
        var formData = {
            'secret': RECAPTHCA_SECRET,
            'response': ctoken
        };
        var options = {
            'method' : 'post',
            'payload' : formData
        };
        var response = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', options);
        var respObj = JSON.parse(response.getContentText());
        if (!respObj.success) {
            return ContentService.createTextOutput("Invalid Captcha");
        }

        // Send email if enabled
        if (SEND_EMAILS) {
            var emailMessage = "Someone has submitted a contact form on your website!\n\nFull Name: " + full_name + "\n\nEmail: " + email + "\n\nMessage:\n" + message;
            MailApp.sendEmail(YOUR_EMAIL_ADDRESS, "Contact Form Submitted", emailMessage);
        }

        // Add to spreadsheet
        var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        var sheet = spreadsheet.getSheets()[0];
        sheet.appendRow([full_name, email, message, ctoken]);

        return ContentService.createTextOutput("Success");
    }

    return ContentService.createTextOutput("Error");
}

/*
  Checks email address string against regular expression and returns a bool.
  Source: https://stackoverflow.com/a/46181
*/
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}