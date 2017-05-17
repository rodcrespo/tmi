const AXIS_X = "x";
const AXIS_Y = "y";
const AXIS_Z = "z";

var CameraEffects = function() {
	this.effects = {
		zoomroll: effect_animation2Start(10, 2),
		lookahead: effect_lookaxis(60, 2000, 100, AXIS_Y),
		lookup: effect_lookaxis(-30, 2000, 100, AXIS_X)
	};
	
}

CameraEffects.prototype.getEffect = function(effectName) {
	return this.effects[effectName];
}

/**
 *	Pan in and out while rotating
 */
var effect_animation2Start = function(speed, nGyros) {
    return function () {
        game.pause = true;
        var initialFocal = game.camera.getFocalLength();
        var tick = function (angulo, focalLength) {
                return function () {
                    game.camera.rotation.z = angulo * Math.PI / 180;
                    game.camera.setFocalLength(game.camera.getFocalLength() - focalLength);
                }
        };
        for (var i = 0; i <= nGyros * 360; i+=speed) {
            if (i <= (nGyros * 360) / 2) {
                setTimeout(tick(i, -1), 2 * i);
            }
            else {
                setTimeout(tick(i, 1), 2 * i);
            }
            
        }
        setTimeout(function () {
                    game.pause = false;
                    game.camera.rotation.z = 0; 
                    game.camera.setFocalLength(initialFocal)
                }, 2 * nGyros * 360);
    };
}

/**
 *	Look rotating in an axis 
 */
var effect_lookaxis = function(degrees, time, steps, axis) {
    return function () {
		//pause the game
        game.pause = true;
		var initialRot = saveRotation(game.camera, axis); //save initial rotation
		var increment = degrees / steps / 2;
		var interval = time / steps / 2;
		
        for (var i = 0; i < steps; i++) {
			if (i < steps/2) {
				setTimeout(rotateAngleInAxisFunction(axis, game.camera, -increment * i, initialRot), interval * i);
			} else {
				setTimeout(rotateAngleInAxisFunction(axis, game.camera, -increment * (steps - i), initialRot), time / 2 + interval * i);
			}
        }
        setTimeout(restoreGameFunction(axis, game.camera, initialRot), time);
    };
}



function saveRotation(camera, axis) {
	switch (axis) {
		case AXIS_X: return camera.rotation.x;
		case AXIS_Y: return camera.rotation.y;
		case AXIS_Z: return camera.rotation.z;
	}
}

function rotateAngleInAxisFunction(axis, camera, angle, reference) {
	return function () {
		switch (axis) {
			case AXIS_X: camera.rotation.x = reference + angle * 2 * Math.PI / 180; break;
			case AXIS_Y: camera.rotation.y = reference + angle * 2 * Math.PI / 180; break;
			case AXIS_Z: camera.rotation.z = reference + angle * 2 * Math.PI / 180; break;
		}
	}
}

function restoreGameFunction(axis, camera, reference) {
	return function () {
		game.pause = false;
		switch (axis) {
			case AXIS_X: camera.rotation.x = reference; break;
			case AXIS_Y: camera.rotation.y = reference; break;
			case AXIS_Z: camera.rotation.z = reference; break;
		}
	}
}


