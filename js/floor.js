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

var SpecialFloor = function (textureManager, colorFloor) {
    var texture = textureManager.getTexture("skyline");
    var ratio = texture.image.height / texture.image.width;
    var cityWidth = SCREEN_WIDTH/10;
    var cityHeight = SCREEN_WIDTH * ratio;
    this.geometry = new THREE.PlaneGeometry( cityWidth , cityHeight);
    this.material = new THREE.MeshBasicMaterial( {color: colorFloor, side: THREE.DoubleSide, transparent: true} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.position.set(150, -50, -5);
    this.plane.rotation.set(Math.PI/2, 0, 0);

    this.hitPoint = new HitPoint(testEvent(this));
}

SpecialFloor.prototype.changeColor = function (colorFloor) {
    this.material.setValues ({color:colorFloor});
}

SpecialFloor.prototype.onTriggerEnter = function (entity) {
    if (entity.name == "player") {
        this.hitPoint.start();
    }
}
