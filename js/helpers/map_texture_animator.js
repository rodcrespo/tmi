var MapTextureAnimator = function (texture, map, defaultStatus)
{
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    this.currentDisplayTime = 0;
    this.currentTile = 0;

    this.update = function(milliSec) {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > map[this.status].duration) {
            this.currentDisplayTime -= map[this.status].duration;
            this.currentTile++;
            if (this.currentTile >= map[this.status].tiles.length) {
                this.currentTile = 0;
            }
            texture.offset.x = map[this.status].tiles[this.currentTile].x/map.width ;
            texture.offset.y = 1 - (map[this.status].tiles[this.currentTile].y + map[this.status].height)/map.height ;
        }
    };

    this.setStatus = function(status) {
      this.status = status;
      texture.repeat.set(map[status].width/map.width, map[status].height/map.height);
    }

    this.setStatus(defaultStatus);
}
