var Floor = function(textureManager){

    var texture = textureManager.getTexture("skyline");
    var ratio = texture.height / texture.width;
    var cityWidth = SCREEN_WIDTH / 2.5;
    var cityHeight = SCREEN_WIDTH / 2.5;
    this.geometry = new THREE.PlaneGeometry( cityWidth , cityHeight);
    this.material = new THREE.MeshBasicMaterial( {color: 0xFF0000, side: THREE.DoubleSide, transparent: true} );
    this.plane = new THREE.Mesh( this.eometry, this.material );
    this.plane.position.set(0, cityHeight /2, -5);
    this.plane.rotation.set(Math.PI/2, 1, 1);

}

