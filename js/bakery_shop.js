var BakeryShop = function(textureManager){

    var texture = textureManager.getTexture("bakery_shop");
    var ratio = texture.image.height / texture.image.width;
    var cityWidth = SCREEN_WIDTH/10;
    var cityHeight = SCREEN_WIDTH/10 * ratio;
    this.geometry = new THREE.PlaneGeometry( cityWidth , cityHeight);
    this.material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.position.set(-SCREEN_WIDTH/10, cityHeight /2, -5);

}
