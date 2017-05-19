var CityBackground = function(textureManager){

    var texture = textureManager.getTexture(SKYLINE);
    var ratio = texture.image.height / texture.image.width;
    var cityWidth = CITY_WIDTH;
    var cityHeight = CITY_WIDTH * ratio;
    this.geometry = new THREE.PlaneGeometry( cityWidth , cityHeight);
    this.material = new THREE.MeshLambertMaterial( {map: texture, side: THREE.DoubleSide, transparent: true, depthTest: true} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.position.set(CITY_X, cityHeight /2 + CITY_Y_OFFSET, CITY_Z);

}

CityBackground.prototype.update = function(playerPosition){
    this.plane.position.x = this.plane.position.x + (playerPosition.x - this.plane.position.x)
}
