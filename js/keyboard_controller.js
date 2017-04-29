var onKeyDown = function(e) {
	var keyCode = e.which;
	switch(keyCode) {
		case KEYCODE_LEFT: 
			game.player.startMovingLeft();
			break;
		case KEYCODE_RIGHT: 
			game.player.startMovingRight();
			break;
		case KEYCODE_UP: 
			game.player.jumpHigh();
			break;
		case KEYCODE_R: 
			console.log("RESUME")
			ANNYANG.resume();
			break;	
	}
}


var onKeyUp = function(e) {
	
	var keyCode = e.which;
	switch(keyCode) {
		case KEYCODE_LEFT: 
			game.player.stopHorizontally();
			break;
		case KEYCODE_RIGHT: 
			game.player.stopHorizontally();
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