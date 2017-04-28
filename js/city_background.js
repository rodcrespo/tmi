var CityBackground = function(textureManager){

    var texture = textureManager.getTexture("skyline");
    var ratio = texture.image.height / texture.image.width;
    var cityWidth = SCREEN_WIDTH / 1.6 ;
    var cityHeight = SCREEN_WIDTH / 1.6 * ratio;
    this.geometry = new THREE.PlaneGeometry( cityWidth , cityHeight);
    this.material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.position.set(0, cityHeight /2 , -30);

}
