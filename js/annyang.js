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
		}
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
}


/**
 * Search for command in the command dictionary 
 * and execute the associated function
 */
function executeCommand(command) {
	console.log("Cmd: " + command);
	// define the commands
	var commands = {
		'hola':		execCmdHello,
		'gira':		function () {execCmdSetTurn(true);},
		'para':		function () {execCmdSetTurn(false);},
		'rojo':		function () {execCmdCubeColor(0xff0000);},
		'verde':	function () {execCmdCubeColor(0x00ff00);},
		'azul':		function () {execCmdCubeColor(0x0000ff);},
		'bang': 	execCmdShoot,
		'comienza': execCmdStart,
		'círculo':	execCmdCircle,
		'cuadrado': execCmdSquare,
	};
	
	if (command in commands) {
		commands[command]();
	}
	
}


function execCmdHello() {
	console.log("HOLA");
	alert('Hello world!');
}

function execCmdSetTurn(turning) {
	console.log("Girar: " + turning);
	rotationEnabled = turning;
}

function execCmdCubeColor(color) {
	console.log("CubeColor: " + color);
	cube.material.color.setHex( color );
}

function execCmdShoot() {
	console.log("bang");
	if (speakPoint.position.x - circle.position.x >= 10) {
		circle.position.set(startPos.x, startPos.y, startPos.z);
		score += 1;
	}
}

function execCmdStart() {
	console.log("comienza");
	scene.remove(circle);
	circle.position.set(startPos.x, startPos.y, startPos.z);
	scene.add(circle);
	score = 0;
}

function execCmdCircle() {
	console.log("circulo");
	scene.getObjectByName('player').geometry = new THREE.SphereGeometry( 20, 30, 30 );
}

function execCmdSquare() {
	console.log("cuadrado");
	scene.getObjectByName('player').geometry = new THREE.BoxGeometry(30, 30, 30);
}