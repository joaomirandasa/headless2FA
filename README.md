# Headless 2FA

- install modules using NPM `$ npm install`
- run debug `$ node debug.js`
- follow the instructions

## Motivation
Sometimes you need to run headless tasks into some webservices or websites with 2FA authentication, like SMS or e-mail. Thus you feel stucked at some point how to run this routines into headless, this tiny snnipet allow you to do it.

If you are recurrent visitor on my repositories you will realize i always use TotalJS for structure my codes, and develop what i want as an module of this, that way it's easy to import on another project.

Check that routine into: 
```bash
> /modules/headless2FA.js
```

```node
//EMBEDED LIBRARIES
const readline = require("readline");
const puppeteer = require('puppeteer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
Waiting all TotalJS configurations be ready 
*/
ON('ready', function() { 

	/*
	Function to askToken from user
	*/
	function askToken(questionText) {
		console.log("[Token] - Asking token from user input");
	  	return new Promise((resolve, reject) => {
	    	rl.question("\nWhat is the token received?", (input) => {
	    		rl.close();
	    		resolve(input);
	    	});
	  	});
	}

	/*
	Lauching Puppeter to get page and send Token
	*/
	puppeteer.launch({headless : false}).then(async browser => {
	  	const page = await browser.newPage();
		console.log("[Browser] - Opening");
	  	await page.goto('https://www.google.com');
	  	await page.setViewport({width: 800, height: 600});
		console.log("[Browser] - Page is open and start operations to take token");
	  	const token = await askToken();
		console.log("\n[Token] - configured token is: "+token);
		console.log("[Browser] - KeepGoing with alredy configured token");
		/*
			USE HERE YOUR ALREDY CONFIGURED GLOBAL TOKEN TO CONTINUE
			YOUR CODE EXECUTION
		*/
		console.log("[Browser] - Closing");
	  	await browser.close();
	});

});
```