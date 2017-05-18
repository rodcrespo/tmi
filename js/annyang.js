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
	},
	resume: function resume () {
		annyang.resume();
	},
	pause: function pause () {
		annyang.pause();
	},
	right: function right () {return ["derecha", "delante", "muévete", "anda", "corre"]},
	left: function left () {return ["izquierda", "atrás"]},
	jump: function jump () {return ["salta", "arriba", "elévate", "brinca"]},
	shot: function shot () {return ["dispara", "lanza"]},
	stop: function stop () {return ["stop", "para", "quieto"]},
}



/**
 * Take a string containing an arbitrary number of words
 * and break it into individual commands
 */
function parseCommands(commandString) {
	console.log("CmdString: " + commandString);
	var commands = commandString.toLowerCase().split(" ");
	commands.forEach(executeCommand);
	game.wordCloud.addWords(commands.join(" "));
}


/**
 * Search for command in the command dictionary
 * and execute the associated function
 */
function executeCommand(command) {
	console.log("Cmd: " + command);
	// define the commands
	/*var commands = {
		'hola':		execCmdHello,
		'gira':		function () {execCmdSetTurn(true);},
		'rojo':		function () {execCmdCubeColor(0xff0000);},
		'verde':	function () {execCmdCubeColor(0x00ff00);},
		'azul':		function () {execCmdCubeColor(0x0000ff);},
		'comienza': execCmdStart,
		'círculo':	execCmdCircle,
		'cuadrado': execCmdSquare,

		'derecha':  execCmdRight,
		'izquierda':execCmdLeft,
		'dispara': 	execCmdShoot,
		'para':		execCmdStop,
		'salta':	execCmdJump,
	};*/

	if (!game.pauseEvent) {
		//if (command in commands) {
			//commands[command]();
			if (ANNYANG.right().includes(command)) {
				execCmdRight();
			}
			else if (ANNYANG.left().includes(command)) {
				execCmdLeft();
			}
			else if (ANNYANG.jump().includes(command)) {
				execCmdJump();
			}
			else if (ANNYANG.shot().includes(command)) {
				execCmdShoot();
			}
			else if (ANNYANG.stop().includes(command)) {
				execCmdStop();
			}
		//}
	}
	else {
		game.event.checkAnswer(command);
	}
}


function execCmdRight() {
	game.player.startMovingRight();
}

function execCmdLeft() {
	game.player.startMovingLeft();
}

function execCmdShoot() {
	game.player.shoot();
}

/*function execCmdShoot() {
	console.log("bang");
	if (speakPoint.position.x - circle.position.x >= 10) {
		circle.position.set(startPos.x, startPos.y, startPos.z);
		score += 1;
	}
}*/

function execCmdStop() {
	game.player.stopHorizontally();
}

function execCmdJump() {
	game.player.jumpHigh();
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
