var Wall = function (textureManager, type, x, y) {

  // //TODO do this outside
  switch(type) {
    case 'flower_shop':
      this.texture = textureManager.getTexture("flower_shop");
      break;
    case 'bakery_shop':
      this.texture = textureManager.getTexture("bakery_shop");
      break;
    default:
      this.texture = textureManager.getTexture("flower_shop");
  }

  var ratio = this.texture.image.height / this.texture.image.width;
  var cityWidth = SCREEN_WIDTH/10;
  var cityHeight = SCREEN_WIDTH/10 * ratio;
  this.geometry = new THREE.PlaneGeometry(cityWidth , cityHeight);
  this.material = new THREE.MeshLambertMaterial( {map: this.texture, side: THREE.DoubleSide, transparent: true, depthTest: false} );
  this.plane = new THREE.Mesh(this.geometry, this.material);
  this.plane.position.set(x, y + cityHeight / 2, 0);

}

Wall.prototype.changeColor = function (color) {
  this.color = color;
  this.material.setValues ({color: this.color});
}

Wall.prototype.changeType = function (type) {
  // this.material.setValues ({color: color});
  console.log("WORK IN PROGRESS!!")
}
