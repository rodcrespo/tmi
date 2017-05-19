var CuteGirl = function(game, position){
	var texture = game.textureManager.getTexture("cute_girl");
	this.map = game.textureManager.getMap("cute_girl");
	var animatedTexture = new MapTextureAnimator(texture, this.map, "idle"); // texture, #horiz, #vert, #total, duration.
	// this.animatedDefault = animatedTexture;
	// this.animatedRun = new TextureAnimator( texture_run, 1, 10, 10, 75 );
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: true } );
	var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);

    mesh.scale.x = -1;
	Entity.call(this, CuteGirl, mesh, animatedTexture, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2, position);

	
}

CuteGirl.prototype = Object.create(Entity.prototype);


CuteGirl.prototype.hit = function() {
    // game.audioManager.play(AUDIO_CRASH);
    this.animatedTexture.setStatus("idle");
    // game.removeEntity(this);
}

CuteGirl.prototype.interactWith = function(entity, failed) {
    var context = this;
    if(failed){
        entity.damage(PLAYER_MAX_HEALTH / NUM_HEARTS);
        this.animatedTexture.setStatus("jump");
        setTimeout(game.removeEntity(context), context.map["jump"].duration * context.map["jump"].tiles.length);
    }else{
        this.animatedTexture.setStatus("dead");
        entity.giveScore(100);
        setTimeout(game.removeEntity(context), context.map["dead"].duration * context.map["jump"].tiles.length);
    }




}

CuteGirl.prototype.update = function(game, lapsedMillis) {
    // this.updateStatus();
    Entity.prototype.update.call(this, game, lapsedMillis);
}
