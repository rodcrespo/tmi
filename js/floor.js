var Floor = function(textureManager){

    var texture = textureManager.getTexture("skyline");
    var ratio = texture.image.height / texture.image.width;
    var cityWidth = SCREEN_WIDTH;
    var cityHeight = SCREEN_WIDTH * ratio;
    this.geometry = new THREE.PlaneGeometry( cityWidth , cityHeight);
    this.material = new THREE.MeshBasicMaterial( {color: 0xf4a460, side: THREE.DoubleSide, transparent: true} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.position.set(0, -50, -5);
    this.plane.rotation.set(Math.PI/2, 0, 0);

}
