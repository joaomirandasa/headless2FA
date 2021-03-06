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
		Funciton to askToken from user
	*/
	function askToken(questionText) {
		console.log("[Token] - Asking token from user input");
	  	return new Promise((resolve, reject) => {
	    	rl.question("\nWhat is the token received over SMS?", (input) => {
	    		rl.close();
	    		resolve(input);
	    	});
	  	});
	}

	/*
		Lauching Puppeter to get page and send Token over SMS
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

