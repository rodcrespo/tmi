var FlowerPot = function(game, position){
	var texture = game.textureManager.getTexture(FLOWERPOT);
	var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var geometry = new THREE.PlaneGeometry(FLOWER_WIDTH, FLOWER_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(geometry, material);
	
	Entity.call(this, FLOWERPOT, mesh, texture, FLOWER_WIDTH, FLOWER_HEIGHT, position);
	
	this.physics.setFriction(1);
	this.physics.setElasticity(0);
}

FlowerPot.prototype = Object.create(Entity.prototype);

FlowerPot.prototype.hit = function() {
	game.audioManager.play(AUDIO_CRASH);
	game.removeEntity(this);
}

FlowerPot.prototype.interactWith = function(entity) {
	entity.damage(10);
	this.removeFromGame();
	game.audioManager.play(AUDIO_CRASH);
	//to be implemented by child class, or left like this if nothing is to happen when a collision occurs
	//for now "entity" is always be the player, collisions between objects are not called
}