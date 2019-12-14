# GAS - Send Email

## Description

This script acts as a HTTP Post endpoint and sends an email from your gmail address, when you provide it with a recipient address, subject, and HTML body.

## Important Values to Change

The code you need is within the `SendEmail.js` file in this directory.

When copying the code into Google Drive make sure you set the following values at the top of the file:

`SENDER_NAME` - When the recipient receives the email, this is the name which shows up next to the email address. Choose any name you like, it could be your own name, or a company name, or product name, etc.

`REPLY_TO_ADDRESS` - If you want your email to have a different 'reply-to' address, then enter it here. Otherwise leave this blank.


## How to Deploy

Login to your Google Account and navigate to Google Drive. 

If you haven't used Google Apps Script before, you'll need to connect the app to your Google Drive account. Press the 'New' button, select 'More' and press '+ Connect More Apps'. Then enter 'Google Apps Script' into the search field and select '+ Connect'.

In Google Drive press 'New', then 'More', and select 'Google Apps Script'. In the top left, select 'Untitled Project' and enter a new name for the project e.g. 'Send Email Script'. (The name just appears in Google Drive and does not matter).

Copy the Code from the `SendEmail.js` file into your browser and press the save button. Make sure the correct values have been entered into the variables at the top the file.

Then to deploy the app, press 'Publish', and selet 'Deploy as Web App'. Then in the `Who has access to the app` field, change the value to `Anyone, even Anonymous`. Select 'Deploy'.

## How to Use

Once you've hit the 'Deploy' button, you'll be given a URL which looks something like: `https://script.google.com/macros/s/...`

This is the URL you'll need to send a HTTP Post request to. The body of the request should be in `www-form-urlencoded` format with 3 parameters:
`address` - The email address to send the email to  
`subject` - The subject of the email  
`message` - The message (in html format) to send

To test the code I recommend you try [Curl It](https://curlit.jam-es.com). Set the method to POST, enter the URL, allow at least 1 redirect, and add the 3 post parameters.

You can also test the code using a more complete HTTP Client like [Postman](https://www.getpostman.com/). Using Postman, create a new request, simply set the URL to your endpoint URL, set the HTTP Method to POST, and in the Body tab select `x-www-form-urlencoded` and enter the 3 keys listed above with appropriate values.

Note: Google Apps Script endpoints will return a 301 and redirect you to the response page. So if you want to check the response, make sure you allow redirects in your HTTP Client or code.