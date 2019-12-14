# GAS - Set Boolean

## Description

This consists of 2 scripts. One sets a value in a Google Spreadsheet to true or false, the other simply retrieves the value. Both act as HTTP Endpoints.

This has a variety of uses. For example, when I want to turn on my PC when I'm away from home, I can use my phone to set the value to true. I have a raspberry pi which calls the retreive endpoint regularily. As soon as it sees a 'true', it sets the value back to false and sends a Wake on Lan packet to my PC to turn it on. (This avoids forwarding a http port to my pi)

## Important Values to Change

There is one value you need to set in both `GetValue.js` and `SetValue.js` in this directory, which is the `SPREADSHEET_ID`.

This should be the id of the spreadsheet where the boolean value will be stored.

To set this: Create a new Google Spreadsheet in Google Drive. Right click on the file, click 'Get Shareable Link'. This will give you a URL. After the last `/` in the URL, there will be a string of numbers/letters/symbols. This is the spreadsheet ID you need to use for this variable. Once you've got the ID you can disable link sharing on the spreadsheet again to keep the contents safe.

The boolean value will be stored in the top left cell on the first sheet of the spreadsheet as a 0 or 1.


## How to Deploy

For each of the two scripts you will need to do the following. (This will give you 2 endpoint URLs, one for each script.)

Login to your Google Account and navigate to Google Drive. 

If you haven't used Google Apps Script before, you'll need to connect the app to your Google Drive account. Press the 'New' button, select 'More' and press '+ Connect More Apps'. Then enter 'Google Apps Script' into the search field and select '+ Connect'.

In Google Drive press 'New', then 'More', and select 'Google Apps Script'. In the top left, select 'Untitled Project' and enter a new name for the project e.g. 'Send Email Script'. (The name just appears in Google Drive and does not matter).

Copy the Code from one of the `.js` files into your browser and press the save button. Make sure the correct values have been entered into the variables at the top the file.

Then to deploy the app, press 'Publish', and selet 'Deploy as Web App'. Then in the `Who has access to the app` field, change the value to `Anyone, even Anonymous`. Select 'Deploy'.

Once you've hit the 'Deploy' button, you'll be given a URL which looks something like: `https://script.google.com/macros/s/...`

## How to Use

For the GetValue script, just send a POST request to the endpoint URL. It does not need to include any specific content.

The response (after following redirects) will have a body consisting of of 'true' or 'false', telling you the value of the boolean.

For the SetValue script, send a POST request to the endpoint URL. This time the request needs to include form data. (i.e. the body of the request should be in `www-form-urlencoded` format). The form needs one value with key `value` and the value can be the string `true` or `false` depending on what you want to set the boolean to.

To test the code I recommend you try [Curl It](https://curlit.jam-es.com). Set the method to POST, enter the URL, allow at least 1 redirect, and (for set) add the `value` parameter.

You can also test the code using a more complete HTTP Client like [Postman](https://www.getpostman.com/). Using Postman, create a new request, simply set the URL to your endpoint URL, set the HTTP Method to POST, and in the Body tab select `x-www-form-urlencoded` and (for set) enter the parameter.

Note: Google Apps Script endpoints will return a 301 and redirect you to the response page. So if you want to check the response, make sure you allow redirects in your HTTP Client or code.