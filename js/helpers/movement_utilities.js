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
		movement = getAbsoluteMovement(distanceLow, -velocity, lapsedMillis, positionOffset);
		movement.movement = -movement.movement;
	}
	return movement;
}

/**
 * Returns a dictionary containing the movement as well as if the object collided with something
 */
function getAbsoluteMovement(distance, velocity, lapsedMillis, positionOffset) {
	var intendedMovement = velocity * lapsedMillis / 1000;
	var mov = intendedMovement;
	var coll = false;
	//if (!distance || distance > intendedMovement + positionOffset) {
		
	//} else { //HIT!
	if (distance && distance <= intendedMovement + positionOffset) {
		mov = distance - positionOffset;
		coll = true;
	}
	return {
		movement: mov,
		hit: coll
	};
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
