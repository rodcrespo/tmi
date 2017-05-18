var Particle = function(game, position, texture){
	var material = new THREE.MeshBasicMaterial({color:"red", depthTest: true});
	var geometry = new THREE.BoxGeometry(PARTICLE_WIDTH, PARTICLE_WIDTH, PARTICLE_WIDTH); //new THREE.PlaneGeometry(PARTICLE_WIDTH, PARTICLE_WIDTH, 1, 1);
	
	var mesh = new THREE.Mesh(geometry, material);
	
	Entity.call(this, PARTICLE, mesh, null, PARTICLE_WIDTH, PARTICLE_WIDTH, position);
	
	this.physics.setFriction(0.8);
	this.physics.setElasticity(0.2);
	this.setHorizontalVelocity(Math.random() * 500.0 - 250);
	this.setVerticalVelocity(Math.random() * 250.0);
}

Particle.prototype = Object.create(Entity.prototype);

Particle.prototype.hit = function() {
	game.removeEntity(this);
}

