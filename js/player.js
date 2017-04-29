var Player = function(textureManager){
    this.texture = textureManager.getTexture("runner");
}

Player.prototype.init = function(){

    this.animatedTexture = new TextureAnimator( this.texture, 5, 2, 10, 75 ); // texture, #horiz, #vert, #total, duration.
    var runnerMaterial = new THREE.MeshBasicMaterial( { map: this.texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
    var runnerGeometry = new THREE.PlaneGeometry(75, 75 * 1.375, 1, 1);
    this.runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
    this.runner.position.set(0, 0, 5);
}


