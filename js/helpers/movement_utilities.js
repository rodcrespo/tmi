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



function isBboxColliding(entity1, entity2) {
	var maxLowX = Math.max(
		entity1.mesh.position.x - entity1.width / 2, 
		entity2.mesh.position.x - entity2.width / 2);
	var minHighX = Math.min(
		entity1.mesh.position.x + entity1.width / 2, 
		entity2.mesh.position.x + entity2.width / 2);
	
	if (maxLowX > minHighX)
		return false;	//entities do not overlap on the x axis, dont even bother to check y
	
	var maxLowY = Math.max(
		entity1.mesh.position.y - entity1.height / 2, 
		entity2.mesh.position.y - entity2.height / 2);
	var minHighY = Math.min(              
		entity1.mesh.position.y + entity1.height / 2, 
		entity2.mesh.position.y + entity2.height / 2);
	
	if (maxLowY > minHighY)
		return false;	//entities do not overlap on the y axis
	
	return true;	//entities overlap on both x and y axis: collision!!
}