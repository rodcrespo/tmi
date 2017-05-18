var Maquina = function(game, position){
	var texture = game.textureManager.getTexture("maquina");
	var map = game.textureManager.getMap("maquina");
	var animatedTexture = new MapTextureAnimator(texture, map, "idle"); // texture, #horiz, #vert, #total, duration.
	// this.animatedDefault = animatedTexture;
	// this.animatedRun = new TextureAnimator( texture_run, 1, 10, 10, 75 );
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH, PLAYER_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);

    mesh.scale.x = -1;
	Entity.call(this, MAQUINA, mesh, animatedTexture, PLAYER_WIDTH, PLAYER_HEIGHT, position);

	
}

Maquina.prototype = Object.create(Entity.prototype);


Maquina.prototype.hit = function() {
    // game.audioManager.play(AUDIO_CRASH);
    this.animatedTexture.setStatus("idle");
    // game.removeEntity(this);
}

Maquina.prototype.interactWith = function(entity, failed) {
    if(failed){
        entity.damage(200);
        this.animatedTexture.setStatus("melee");
        setTimeout(game.removeEntity(this), 100)
    }else{
        this.animatedTexture.setStatus("dead");
        entity.giveScore(100);

    }




}

Maquina.prototype.update = function(game, lapsedMillis) {
    // this.updateStatus();
    Entity.prototype.update.call(this, game, lapsedMillis);
}
