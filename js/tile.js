var Tile = function (textureManager, type, x, y) {

  // //TODO do this outside
  console.log("Type " + type);
  switch(type) {
    case Tile.TYPES.TYPE0:
    case Tile.TYPES.TYPE4:
    case Tile.TYPES.TYPE5:
    case Tile.TYPES.TYPE6:
    case Tile.TYPES.TYPE7:
    case Tile.TYPES.TYPE8:
      this.floor = new Floor(textureManager, "default", x, y);
      this.wall = new Wall(textureManager, "building" + type, x, y);
      break;
    case Tile.TYPES.TYPE1:
      this.floor = new Floor(textureManager, "default", x, y);
      this.wall = new Wall(textureManager, "building2", x, y);
      this.entities = [new Ball(game, new THREE.Vector3(x, y, PLAYER_INIT_Z))];
      break;
    case Tile.TYPES.TYPE2:
      this.floor = new Floor(textureManager, "default", x, y);
      this.wall = new Wall(textureManager, "building3", x, y);
      break;
    case Tile.TYPES.TYPE3:
        this.floor = new Floor(textureManager, "red", x, y);
        this.wall = new Wall(textureManager, "building4", x, y);
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
    TYPE2: 2,
    TYPE3: 3,
    TYPE4: 4,
    TYPE5: 5,
    TYPE6: 6,
    TYPE7: 7,
    TYPE8: 8,
}
