# Google Apps Script - Useful Scripts
Here are some useful Google Apps Script scripts which you can copy and deploy through Google Drive.

I may add to this in the future. Please open pull requests if you have your own scripts you want to add.

Note: The scripts for sending emails will not work on a large scale (especially if deployed through free Gmail accounts) as there are limits of how many emails you can send, which you might hit quite quickly.

## Send Email

This script acts as a HTTP Post endpoint and sends an email from your gmail address, when you provide it with a recipient address, subject, and HTML body.

[See how to use it here.](https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/SendEmail)

## Set Boolean

This consists of 2 scripts. One sets a value in a Google Spreadsheet to true or false, the other simply retrieves the value. Both act as HTTP Endpoints.

This has a variety of uses. For example, when I want to turn on my PC when I'm away from home, I can use my phone to set the value to true. I have a raspberry pi which calls the retreive endpoint regularily. As soon as it sees a 'true', it sets the value back to false and sends a Wake on Lan packet to my PC to turn it on. (This avoids forwarding a http port to my pi)

[See how to use it here.](https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/SetBoolean)

## Contact Form Submission

If you want to put a contact form on a static website, where you can't post the values to a php/node/go/dotnet backend, post the values to this Google Apps Script endpoint instead. It will log all entries in a Google Spreadsheet, and send you an email whenever someone submits something.

[See how to use it here.](https://github.com/James231/GoogleAppScript-UsefulScripts/tree/master/ContactForm)

## License

All scripts are released under MIT license so you can use them for anything you like, for both personal and commercial use.