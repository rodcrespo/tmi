var Light = function () {
    this.light = new THREE.AmbientLight(LIGHT_COLOR);
    this.spotLight = new THREE.SpotLight( LIGHT_COLOR, 1 );
    this.spotLight.angle = 180 * Math.PI / 180;
    this.spotLight.penumbra = 1;
    this.spotLight.decay = 2;
    this.spotLight.castShadow = false;
    this.spotLightOn = false;
}

Light.prototype.getAmbientLight = function () {
    return this.light;
}

Light.prototype.turnOnSpotLight = function (center, game) {
    this.spotLight.position.set(center.x, center.y, center.z + 100);
    this.spotLight.target.position.set(center.x, center.y, center.z);
    this.light.color.setHex (LIGHT_DARK);
    this.spotLightOn = true;
    game.scene.add (this.spotLight);
}

Light.prototype.turnOffSpotLight = function (game) {
    this.light.color.setHex (LIGHT_COLOR);
    this.spotLightOn = false;
    game.scene.remove (this.spotLight);
}