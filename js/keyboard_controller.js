var leftHeld = false;
var rightHeld = false;


var onKeyDown = function(e) {
	var keyCode = e.which;
	if (!game.pauseEvent) {
		switch(keyCode) {
		case KEYCODE_LEFT:
			game.player.startMovingLeft();
			leftHeld = true;
			break;
		case KEYCODE_RIGHT:
			game.player.startMovingRight();
			rightHeld = true;
			break;
		case KEYCODE_UP:
			game.player.jumpHigh();
			break;
		case KEYCODE_R:
			console.log("RESUME")
			ANNYANG.resume();
			break;
		case KEYCODE_P:
			game.pause = !game.pause;
			break;
		case KEYCODE_E:
			game.player.shoot();
			break;
		case KEYCODE_V:
			var words = ['Er Zevillano', 'Deberias', 'decir', 'algo', 'o', 'no', 'saldran', 'palabras'].join(',')
			console.log(words)
			if(game.wordCloud && game.wordCloud.words.length > 0) {
				words = game.wordCloud.words.join(',')
			}
			window.location.href = '/visual.html?words=' + words;
			break;
		case KEYCODE_PLUS:
			game.player.heal(10);
			game.player.giveScore(1);
			break;
		case KEYCODE_MINUS:
			game.player.damage(10);
			break;
		}
	}
	else {
		if (keyCode == KEYCODE_P) {
			game.pause = !game.pause;
		}
		else  {
			game.event.checkAnswer(keyCode);
		}
	}
}


var onKeyUp = function(e) {

	var keyCode = e.which;
	switch(keyCode) {
		case KEYCODE_LEFT:
			if (!rightHeld)
				game.player.stopHorizontally();
			leftHeld = false;
			break;
		case KEYCODE_RIGHT:
			if (!leftHeld)
				game.player.stopHorizontally();
			rightHeld = false;
			break;
		case KEYCODE_UP:
			//nothing yet
			break;
		case KEYCODE_R:
			console.log("PAUSE")
			ANNYANG.pause();
			break;
	}
}
