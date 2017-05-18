var Floor = function (textureManager, tile, type, x, y, event) {
  this.tile = tile;
  var eventFactory = new EventFactory ();

  //TODO do this outside
  switch(type) {
    case 'default':
      this.color = 0xf4a460;
      this.hitpoint = null;
      break;
    case 'event':
      this.color = 0x550000;
      this.hitpoint = new Hitpoint(eventFactory.getRandomEvent(this.tile));
      break;
    default:
      this.color = 0xf4a460;
      this.hitpoint = null;
  }

  this.texture = textureManager.getTexture("floor");

  var ratio = this.texture.image.height / this.texture.image.width;

  this.geometry = new THREE.PlaneGeometry(FLOOR_WIDTH , FLOOR_HEIGHT);

  this.material = new THREE.MeshLambertMaterial( {map: this.texture, side: THREE.DoubleSide, transparent: true, depthTest: false} );
  this.plane = new THREE.Mesh(this.geometry, this.material);
  this.plane.position.set(x, y, FLOOR_Z);
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
  if (entity.name == PLAYER && this.hitpoint !== null) {
    this.hitpoint.start();
  }
}

Floor.prototype.onTriggerStay = function (entity) {
  if (entity.name == PLAYER) {
  }
}


Floor.prototype.onTriggerExit = function (entity) {
  if (entity.name == PLAYER) {
  }
}
