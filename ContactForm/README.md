# GAS - Contact Form

## Description

If you want to put a contact form on a static website, where you can't post the values to a php/node/go/dotnet backend, post the values to this Google Apps Script endpoint instead. It will log all entries in a Google Spreadsheet, and send you an email whenever someone submits something.

## Important Values to Change

The code you need is within the `ContactForm.js` file in this directory.

When copying the code into Google Drive make sure you set the following values at the top of the file:

`SEND_EMAILS` - I recommend leaving this as `true`. But if you want to disable receiving emails on every contact form submission then set this to `false`.

`YOUR_EMAIL_ADDRESS` - Enter the email address where you want to receive an email on every contact form submission. This can be any email address, it doesn't have to be the address for the Google account you are using.

`SPREADSHEET_ID` - Create a new Google Spreadsheet in Google Drive. Right click on the file, click 'Get Shareable Link'. This will give you a URL. After the last `/` in the URL, there will be a string of numbers/letters/symbols. This is the spreadsheet ID you need to use for this variable. Once you've got the ID you can disable link sharing on the spreadsheet again to keep the contents safe. This spreadsheet is where contact form entries will be added so you don't have to rely on emails alone.


## How to Deploy

Login to your Google Account and navigate to Google Drive. 

If you haven't used Google Apps Script before, you'll need to connect the app to your Google Drive account. Press the 'New' button, select 'More' and press '+ Connect More Apps'. Then enter 'Google Apps Script' into the search field and select '+ Connect'.

In Google Drive press 'New', then 'More', and select 'Google Apps Script'. In the top left, select 'Untitled Project' and enter a new name for the project e.g. 'Send Email Script'. (The name just appears in Google Drive and does not matter).

Copy the Code from the `ContactForm.js` file into your browser and press the save button. Make sure the correct values have been entered into the variables at the top the file.

Then to deploy the app, press 'Publish', and selet 'Deploy as Web App'. Then in the `Who has access to the app` field, change the value to `Anyone, even Anonymous`. Select 'Deploy'.

## How to Use

[Your contact form should consist of 3 fields: Full Name, Email Address, and Message.]

Once you've hit the 'Deploy' button, you'll be given a URL which looks something like: `https://script.google.com/macros/s/...`

This is the URL you'll need to send a HTTP Post request to. The body of the request should be in `www-form-urlencoded` format with 3 parameters:  
`full_name` - The full name entered in the contact form  
`email` - The email address entered in the contact form  
`message` - The message entered in the contact form  

You'll need to write some JavaScript code for your website, to retrieve the values from the contact form and send the HTTP Post request on submission. 

To test the code I recommend you try [Curl It](https://curlit.jam-es.com). Set the method to POST, enter the URL, allow at least 1 redirect, and add enter some test values for 3 post parameters (you cannot leave them blank!).

You can also test the code using a more complete HTTP Client like [Postman](https://www.getpostman.com/). Using Postman, create a new request, simply set the URL to your endpoint URL, set the HTTP Method to POST, and in the Body tab select `x-www-form-urlencoded` and enter the 3 keys listed above with appropriate values.

Note: Google Apps Script endpoints will return a 301 and redirect you to the response page. So if you want to check the response, make sure you allow redirects in your HTTP Client or code.