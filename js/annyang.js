const ANNYANG = {
	init: function init(){
		if (annyang) {
			// This captures the whole voice command then sends it over for processing
			var commands = {
				'*text_var': parseCommands,
			};

			// Add our commands to annyang
			annyang.addCommands(commands);
			annyang.setLanguage("es-ES");
			// Start listening.
			annyang.start();
			annyang.pause();
		}
	},

	pause: function pause() {
		annyang.pause();
	},

	resume: function resume() {
		annyang.resume();
	}
}


/**
 * Take a string containing an arbitrary number of words
 * and break it into individual commands
 */
function parseCommands(commandString) {
	console.log("CmdString: " + commandString);
	var commands = commandString.split(" ");
	commands.forEach(executeCommand);
	/*for (var command in commands) {
		executeCommand(command);
	}*/
}


/**
 * Search for command in the command dictionary
 * and execute the associated function
 */
function executeCommand(command) {
	console.log("Cmd: " + command);
	// Let's define a command.
	var commands = {
		'hola': function() {
			console.log("HOLA");
			alert('Hello world!');
		},
		'gira': function() {
			console.log("Gira");
			rotationEnabled = true;
		},
		'para' : function() {
			console.log("Para");
			rotationEnabled = false;
		},
		'rojo': function() {
			console.log("rojo");
			cube.material.color.setHex( 0xff0000 );
		},
		'verde': function() {
			console.log("verde");
			cube.material.color.setHex( 0x00ff00 );
		},
		'azul': function() {
			console.log("azul");
			cube.material.color.setHex( 0x0000ff );
		},
		'bang': function() {
			console.log("bang");
			if (speakPoint.position.x - circle.position.x >= 10) {
				circle.position.set(startPos.x, startPos.y, startPos.z);
				score += 1;
			}
		},
		'comienza': function() {
			console.log("comienza");
			scene.remove(circle);
			circle.position.set(startPos.x, startPos.y, startPos.z);
			scene.add(circle);
			score = 0;
		},
		'circulo': function() {
			console.log("circulo");
			scene.getObjectByName('player').geometry = new THREE.SphereGeometry( 20, 30, 30 );
		},
		'cuadrado': function() {
			console.log("cuadrado");
			scene.getObjectByName('player').geometry = new THREE.BoxGeometry(30, 30, 30);
		},
	};

	if (command in commands) {
		commands[command]();
	}

}
