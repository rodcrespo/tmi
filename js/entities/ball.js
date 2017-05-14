var Ball = function(game){
	var texture = game.textureManager.getTexture(BALL);
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var runnerGeometry = new THREE.PlaneGeometry(BALL_WIDTH, BALL_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);
	
	Entity.call(this, BALL, mesh, texture, BALL_WIDTH, BALL_HEIGHT, game.player.getPosition());
	
	this.physics.setFriction(1);
	this.physics.setElasticity(1);
	this.setHorizontalVelocity(Math.random() * 1000.0 - 500);
	this.setVerticalVelocity(Math.random() * 1000.0 - 500);
}

Ball.prototype = Object.create(Entity.prototype);

Ball.prototype.hit = function() {
	game.audioManager.play(BOUNCE);
}