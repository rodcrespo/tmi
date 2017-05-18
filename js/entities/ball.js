var Ball = function(game, position){
	var texture = game.textureManager.getTexture(BALL);
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var runnerGeometry = new THREE.PlaneGeometry(BALL_WIDTH, BALL_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);
	
	Entity.call(this, BALL, mesh, texture, BALL_WIDTH, BALL_HEIGHT, position);
	
	this.physics.setFriction(0.8);
	this.physics.setElasticity(0.8);
	this.setHorizontalVelocity(Math.random() * 1000.0 - 500);
	this.setVerticalVelocity(Math.random() * 1000.0 - 500);
}

Ball.prototype = Object.create(Entity.prototype);

Ball.prototype.hit = function() {

}

Ball.prototype.interactWith = function(entity, failed) {
    if(failed){
        game.audioManager.play(AUDIO_BOUNCE);
    	game.audioManager.play(AUDIO_BOUNCE);
        entity.damage(10);
    }else{
    	entity.giveScore(20);
	}
}