// commands.js has the commands and operational logic

const fs = require("fs");

// Write out data
function done(output) {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
	//parses the user input to understand which command was typed
	const userInputArray = userInput.split(" ");
	const command = userInputArray[0];
	switch (command) {
		case "echo":
			//we will add the functionality of echo within the object commandLibrary
			commandLibrary.echo(userInputArray.slice(1).join(" "));
			break;
		case "cat":
			commandLibrary.cat(userInputArray.slice(1));
			break;
		case "head":
			commandLibrary.head(userInputArray.slice(1));
			break;	
		case "tail":
			commandLibrary.tail(userInputArray.slice(1));	
		default: 	
			commandLibrary.errorHandler(userInputArray.join(" "));
	}
}

//where we will store the logic of our commands - commandLibrary object

const commandLibrary = {

	"echo": function(userInput) {
		done(userInput);
	},

	"cat": function(fullPath) {
		const fileName = fullPath[0];
		fs.readFile(fileName, (err, data) =>  {
			if(err) throw err;
			done(data);
		});
	},

	"head": function(userInput) {
		let fileName = userInput[1];
		let numLinesArr = userInput[0].split('-');
		let numLinesToPrint = numLinesArr[1];

        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let dataArr = data.toString().split("\n");
            done(dataArr.slice(0,`${numLinesToPrint}`).join("\n"));
        });
    },

    "tail": function(userInput) {
    	let fileName = userInput[1];
    	let numLinesArr = userInput[0].split('-');
    	let numLinesToPrint = numLinesArr[1];

    	fs.readFile(fileName, (err, data) => {
    		if(err) throw err;
    		let dataArr = data.toString().split("\n");
    		let lastIndex = dataArr.length-1;
    		let startLineToPrint = lastIndex-numLinesToPrint;
    		done(dataArr.slice(`${startLineToPrint}`).join("\n"));
    	});
    },

    "errorHandler": (userInput) => {
    	done("-bash: " + userInput + ": command not found");
    }	
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;















