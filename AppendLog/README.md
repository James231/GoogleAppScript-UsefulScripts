# GAS - Append-Only Log

## Description

Single script `AppendLog.js` acting as HTTP endpoint. Receives data using a HTTP Post parameter with key `data`. Appends the submitted data to a new line in a Google Spreadsheet.

Useful for application telemetry.


## Important Values to Change

Set the `SPREADSHEET_ID` in `AppendLog.js`.

This should be the id of the spreadsheet where the boolean value will be stored.

To set this: Create a new Google Spreadsheet in Google Drive. Right click on the file, click 'Get Shareable Link'. This will give you a URL. After the last `/` in the URL, there will be a string of numbers/letters/symbols. This is the spreadsheet ID you need to use for this variable. Once you've got the ID you can disable link sharing on the spreadsheet again to keep the contents safe.

The data submitted to this enpoint will be added in the first cell of a new row appended to the bottom of the sheet.


## How to Deploy

Login to your Google Account and navigate to Google Drive. 

If you haven't used Google Apps Script before, you'll need to connect the app to your Google Drive account. Press the 'New' button, select 'More' and press '+ Connect More Apps'. Then enter 'Google Apps Script' into the search field and select '+ Connect'.

In Google Drive press 'New', then 'More', and select 'Google Apps Script'. In the top left, select 'Untitled Project' and enter a new name for the project e.g. 'Telemetry Logging'. (The name just appears in Google Drive and does not matter).

Copy the Code from the `AppendLog.js` file into your browser and press the save button. Make sure the correct values have been entered into the variables at the top the file.

Then to deploy the app, press 'Publish', and selet 'Deploy as Web App'. Then in the `Who has access to the app` field, change the value to `Anyone, even Anonymous`. Select 'Deploy'.

Once you've hit the 'Deploy' button, you'll be given a URL which looks something like: `https://script.google.com/macros/s/...`

## How to Use

Just send a POST request to the endpoint URL. It should have body content with content-type `application/x-www-form-urlencoded`, consisting of a single parameter with key `data` and the value containing the data you want to append to the sheet.

The response (after following redirects) will have a body consisting of of 'Success', telling you the data was appended correctly.

To test the code I recommend you try [Curl It](https://curlit.jam-es.com). Set the method to POST, enter the URL, allow at least 1 redirect, and (for set) add the `value` parameter.

You can also test the code using a more complete HTTP Client like [Postman](https://www.getpostman.com/). Using Postman, create a new request, simply set the URL to your endpoint URL, set the HTTP Method to POST, and in the Body tab select `x-www-form-urlencoded` and (for set) enter the parameter.

Note: Google Apps Script endpoints will return a 301 and redirect you to the response page. So if you want to check the response, make sure you allow redirects in your HTTP Client or code.
