var Floor = function (textureManager, type, x, y) {

  //TODO do this outside
  switch(type) {
    case 'default':
      this.color = 0xf4a460;
      this.hitpoint = null;
      break;
    case 'red':
      this.color = 0x550000;
      this.hitpoint = new Hitpoint(testEvent(this));
      break;
    default:
      this.color = 0xf4a460;
      this.hitpoint = null;
  }

  //TODO add textures
  // var texture = textureManager.getTexture("skyline");
  // var ratio = texture.image.height / texture.image.width;
  var cityWidth = SCREEN_WIDTH/10;
  var cityHeight = SCREEN_WIDTH/10 * 4;
  this.geometry = new THREE.PlaneGeometry(cityWidth , cityHeight);

  this.material = new THREE.MeshBasicMaterial( {color: this.color, side: THREE.DoubleSide, transparent: true} );
  this.plane = new THREE.Mesh(this.geometry, this.material);
  this.plane.position.set(x, y - 50, -5);
  this.plane.rotation.set(Math.PI/2, 0, 0);
}

Floor.prototype.changeColor = function (color) {
  this.color = color;
  this.material.setValues ({color: this.color});
}

Floor.prototype.changeType = function (type) {
  // this.material.setValues ({color: color});
  console.log("WORK IN PROGRESS!!")
}

Floor.prototype.onTriggerEnter = function (entity) {
  if (entity.name == "player" && this.hitpoint !== null) {
    this.hitpoint.start();
  }
}

Floor.prototype.onTriggerStay = function (entity) {
  if (entity.name == "player") {
  }
}


Floor.prototype.onTriggerExit = function (entity) {
  if (entity.name == "player") {
  }
}
