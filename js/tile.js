var Tile = function (textureManager, type, x, y) {

  // //TODO do this outside
  switch(type) {
    case Tile.TYPES.TYPE0:
      this.floor = new Floor(textureManager, "default", x, y);
      this.wall = new Wall(textureManager, FLOWER_SHOP, x, y);
	  this.entities = [new Ball(game, new THREE.Vector3(x, y, PLAYER_INIT_Z))];
      break;
    case Tile.TYPES.TYPE1:
      this.floor = new Floor(textureManager, "default", x, y);
      this.wall = new Wall(textureManager, BAKERY_SHOP, x, y);
      break;
    case Tile.TYPES.TYPE2:
      this.floor = new Floor(textureManager, "red", x, y);
      this.wall = new Wall(textureManager, BAKERY_SHOP, x, y);
      break;
    default:

  }

}


Tile.prototype.addToScene = function (scene) {
	scene.add(this.floor.plane);
	scene.add(this.wall.plane);
}

Tile.prototype.removeFromScene = function (scene) {
	scene.remove(this.floor.plane);
	scene.remove(this.wall.plane);
}

Tile.prototype.getCollidable = function () {
  return this.floor.plane;
}

Tile.prototype.getTrigger = function () {
  return this.floor;
}

Tile.TYPES = {
    TYPE0: 0,
    TYPE1: 1,
    TYPE2: 2
}
