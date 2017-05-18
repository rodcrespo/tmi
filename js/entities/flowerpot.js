var FlowerPot = function(game, position){
	this.texture = game.textureManager.getTexture(FLOWERPOT);
	var material = new THREE.MeshBasicMaterial( { map: this.texture, side: THREE.DoubleSide, transparent: true, depthTest: true } );
	var geometry = new THREE.PlaneGeometry(FLOWER_WIDTH, FLOWER_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(geometry, material);
	
	Entity.call(this, FLOWERPOT, mesh, this.texture, FLOWER_WIDTH, FLOWER_HEIGHT, position);
	
	this.physics.setFriction(1);
	this.physics.setElasticity(0);
}

FlowerPot.prototype = Object.create(Entity.prototype);

FlowerPot.prototype.hit = function() {
	game.audioManager.play(AUDIO_CRASH);
	var pos = this.getPosition();
	for (var i = 0; i < 20; i++) {
		game.addEntity(new Particle(game, new THREE.Vector3(pos.x, pos.y, pos.z+5), this.texture));
	}
	game.removeEntity(this);
}

FlowerPot.prototype.interactWith = function(entity) {
	entity.damage(10);
	this.hit();
}