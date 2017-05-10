var Tile = function (textureManager, type, x, y) {

  // //TODO do this outside
  switch(type) {
    case 0:
      this.floor = new Floor(textureManager, "default", x, y);
      this.wall = new Wall(textureManager, "flower_shop", x, y);
      break;
    case 1:
      this.floor = new Floor(textureManager, "default", x, y);
      this.wall = new Wall(textureManager, "bakery_shop", x, y);
      break;
    case 2:
      this.floor = new Floor(textureManager, "red", x, y);
      this.wall = new Wall(textureManager, "bakery_shop", x, y);
      break;
    default:

  }

}


Tile.prototype.addToScene = function (scene) {
  scene.add(this.floor.plane);
  scene.add(this.wall.plane);
}

Tile.prototype.getCollidable = function () {
  return this.floor.plane;
}

Tile.prototype.getTrigger = function () {
  return this.floor;
}
