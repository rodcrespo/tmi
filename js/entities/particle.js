var Particle = function(game, position, parentTexture){
	var texture = parentTexture.clone();
	texture.needsUpdate = true;
	texture.offset.x = Math.random();
	texture.offset.y = Math.random();
	texture.repeat.x = 0.1;
	texture.repeat.y = 0.1;
//	var material = new THREE.MeshBasicMaterial({color:"red", depthTest: true});
//	var geometry = new THREE.BoxGeometry(PARTICLE_WIDTH, PARTICLE_WIDTH, PARTICLE_WIDTH); //new THREE.PlaneGeometry(PARTICLE_WIDTH, PARTICLE_WIDTH, 1, 1);
	
	var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: true } );
	var geometry = new THREE.PlaneGeometry(PARTICLE_WIDTH, PARTICLE_WIDTH, 1, 1);

	var mesh = new THREE.Mesh(geometry, material);
	
	Entity.call(this, PARTICLE, mesh, null, PARTICLE_WIDTH, PARTICLE_WIDTH, position);
	
	this.physics.setFriction(0.9);
	this.physics.setElasticity(0.2);
	this.setHorizontalVelocity(Math.random() * 500.0 - 250);
	this.setVerticalVelocity(Math.random() * 250.0);
}

Particle.prototype = Object.create(Entity.prototype);

Particle.prototype.hit = function() {
	game.removeEntity(this);
}

