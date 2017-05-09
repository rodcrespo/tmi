var raycaster = new THREE.Raycaster();

function getNearestCollisionFrom(points, direction, collidables) {
	var distance = null;

	for (i = 0; i < points.length; i++) {
		raycaster.set(points[i], direction);
		var c = raycaster.intersectObjects( collidables ) [0];
		if (c) {
			if (!distance || distance > c.distance) {
				distance = c.distance;
			}
		}
	}
	return distance;
}

function getDirectionalMovement(lapsedMillis, velocity, distanceLow, distanceHigh, positionOffset) {
	var movement;
	if (velocity > 0) { //going towards positive coords!!
		movement = getAbsoluteMovement(distanceHigh, velocity, lapsedMillis, positionOffset);
	} else { //going towards negative coords
		movement = -getAbsoluteMovement(distanceLow, -velocity, lapsedMillis, positionOffset);
	}
	return movement;
}


function getAbsoluteMovement(distance, velocity, lapsedMillis, positionOffset) {
	var intendedMovement = velocity * lapsedMillis / 1000;
	var movement = 0;
	if (!distance || distance > intendedMovement + positionOffset) {
		movement = intendedMovement;
	} else { //HIT!
		movement = distance - positionOffset;
	}
	return movement;
}

function triggerCollision(lapsedMillis, velocity, distanceLow, distanceHigh, positionOffset) {
	if (velocity > 0) { //going towards positive coords!!
		return checkTriggerCollision(distanceHigh, velocity, lapsedMillis, positionOffset);
	} else { //going towards negative coords
		return checkTriggerCollision(distanceLow, -velocity, lapsedMillis, positionOffset);
	}
}


function checkTriggerCollision(distance, velocity, lapsedMillis, positionOffset) {
	var intendedMovement = velocity * lapsedMillis / 1000;
	if (!distance || distance > intendedMovement + positionOffset) {
		return false;
	} else { //HIT!
		return true;
	}
}
