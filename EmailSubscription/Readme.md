# GAS - Email Subscription

## Description

This has a single HTTP endpoint. You provide it with an email address and it adds the address to a Google Spreadsheet if it isn't already present.

You can use this endpoint on a website to give your users a 'subscribe to our emails' option.

The script also checks the email addresses match a standard email regex format.

## Important Values to Change

There is one value you need to set in the `Subscibe.js` script in this directory, which is the `SPREADSHEET_ID`.

This should be the id of the spreadsheet where the list will be stored.

To set this: Create a new Google Spreadsheet in Google Drive. Right click on the file, click 'Get Shareable Link'. This will give you a URL. After the last `/` in the URL, there will be a string of numbers/letters/symbols. This is the spreadsheet ID you need to use for this variable. Once you've got the ID you can disable link sharing on the spreadsheet again to keep the contents safe.

The emails will be stored in the first sheet going down the first column.


## How to Deploy

To deploy the script first login to your Google Account and navigate to Google Drive. 

If you haven't used Google Apps Script before, you'll need to connect the app to your Google Drive account. Press the 'New' button, select 'More' and press '+ Connect More Apps'. Then enter 'Google Apps Script' into the search field and select '+ Connect'.

In Google Drive press 'New', then 'More', and select 'Google Apps Script'. In the top left, select 'Untitled Project' and enter a new name for the project e.g. 'Send Email Script'. (The name just appears in Google Drive and does not matter).

Copy the Code from one of the `.js` files into your browser and press the save button. Make sure the correct values have been entered into the variables at the top the file.

Then to deploy the app, press 'Publish', and selet 'Deploy as Web App'. Then in the `Who has access to the app` field, change the value to `Anyone, even Anonymous`. Select 'Deploy'.

Once you've hit the 'Deploy' button, you'll be given a URL which looks something like: `https://script.google.com/macros/s/...`

## How to Use

To use the script simply send a HTTP POST request to the endpoint URL. The post request needs to include form data. This form data should be a single field with key 'email' and the value as the email address you want to add to the mailing list.

The response body will be in plaintext and will consist of one of the following:  
`Success` - The email was added to the mailing list  
`Duplicate` - The email has already been added to the mailing list  
`Bad Regex` - The format of the email was not valid  

To test the code I recommend you try [Curl It](https://curlit.jam-es.com). Set the method to POST, enter the URL, allow at least 1 redirect, and add the `email` parameter.

You can also test the code using a more complete HTTP Client like [Postman](https://www.getpostman.com/). Using Postman, create a new request, simply set the URL to your endpoint URL, set the HTTP Method to POST, and in the Body tab select `x-www-form-urlencoded` and enter the `email` parameter.

Note: Google Apps Script endpoints will return a 301 and redirect you to the response page. So if you want to check the response, make sure you allow redirects in your HTTP Client or code.