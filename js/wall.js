var Wall = function (textureManager, type, x, y) {

  this.texture = textureManager.getTexture(type);

  var ratio = this.texture.image.height / this.texture.image.width;
  var cityWidth = FLOOR_WIDTH;
  var cityHeight = FLOOR_WIDTH * ratio;
  this.geometry = new THREE.PlaneGeometry(cityWidth , cityHeight);
  this.material = new THREE.MeshLambertMaterial( {map: this.texture, side: THREE.DoubleSide, transparent: true, depthTest: true} );
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
