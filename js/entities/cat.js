var Cat = function(game, position){
	var texture = game.textureManager.getTexture("cat");
	var map = game.textureManager.getMap("cat");
	var animatedTexture = new MapTextureAnimator(texture, map, "idle"); // texture, #horiz, #vert, #total, duration.
	// this.animatedDefault = animatedTexture;
	// this.animatedRun = new TextureAnimator( texture_run, 1, 10, 10, 75 );
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: true } );
	var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);

    mesh.scale.x = -1;
	Entity.call(this, Cat, mesh, animatedTexture, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2, position);

	
}

Cat.prototype = Object.create(Entity.prototype);


Cat.prototype.hit = function() {
    // game.audioManager.play(AUDIO_CRASH);
    // game.removeEntity(this);
}

Cat.prototype.interactWith = function(entity, failed) {
    if(failed){
        entity.damage(150);
        this.animatedTexture.setStatus("hurt");
    }else{
        this.animatedTexture.setStatus("dead");
        entity.giveScore(100);

    }

}

Cat.prototype.update = function(game, lapsedMillis) {
    // this.updateStatus();
    Entity.prototype.update.call(this, game, lapsedMillis);
}
