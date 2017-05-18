var Salmorejo = function(game, position){
	var texture = game.textureManager.getTexture(SALMOREJO);
	var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var geometry = new THREE.PlaneGeometry(SALMOREJO_WIDTH, SALMOREJO_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(geometry, material);
	
	Entity.call(this, SALMOREJO, mesh, texture, SALMOREJO_WIDTH, SALMOREJO_HEIGHT, position);
	
	this.physics.setFriction(1);
	this.physics.setElasticity(0);
}

Salmorejo.prototype = Object.create(Entity.prototype);

Salmorejo.prototype.interactWith = function(entity) {
	entity.heal(10);
	this.removeFromGame();
	game.audioManager.play(AUDIO_EAT);
	//to be implemented by child class, or left like this if nothing is to happen when a collision occurs
	//for now "entity" is always be the player, collisions between objects are not called
}