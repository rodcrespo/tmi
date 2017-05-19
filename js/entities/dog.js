var Dog = function(game, position){
	var texture = game.textureManager.getTexture("dog");
	var map = game.textureManager.getMap("dog");
	var animatedTexture = new MapTextureAnimator(texture, map, "idle"); // texture, #horiz, #vert, #total, duration.
	// this.animatedDefault = animatedTexture;
	// this.animatedRun = new TextureAnimator( texture_run, 1, 10, 10, 75 );
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: true } );
	var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);

    mesh.scale.x = -1;
	Entity.call(this, Dog, mesh, animatedTexture, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2, position);

	
}

Dog.prototype = Object.create(Entity.prototype);


Dog.prototype.hit = function() {
    // game.audioManager.play(AUDIO_CRASH);
    // game.removeEntity(this);
}

Dog.prototype.interactWith = function(entity, failed) {
    if(failed){
        entity.damage(PLAYER_MAX_HEALTH / NUM_HEARTS);
        this.animatedTexture.setStatus("hurt");
    }else{
        this.animatedTexture.setStatus("dead");
        entity.giveScore(100);

    }

}

Dog.prototype.update = function(game, lapsedMillis) {
    // this.updateStatus();
    Entity.prototype.update.call(this, game, lapsedMillis);
}
