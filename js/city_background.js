var CityBackground = function(textureManager){

    var texture = textureManager.getTexture("skyline");
    console.dir(texture.material);
    var ratio = texture.height / texture.width;
    var cityWidth = SCREEN_WIDTH / 2.5;
    var cityHeight = SCREEN_WIDTH / 2.5 * ratio;
    this.geometry = new THREE.PlaneGeometry( cityWidth , cityHeight);
    this.material = texture.material;
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.position.set(0, cityHeight /2, -5);

}

