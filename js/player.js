var Player = function(textureManager){
    this.texture = textureManager.getTexture("run");
}

Player.prototype.init = function(){

    this.animatedTexture = new TextureAnimator( this.texture, 10, 1, 10, 75 ); // texture, #horiz, #vert, #total, duration.
    var runnerMaterial = new THREE.MeshBasicMaterial( { map: this.texture, side: THREE.DoubleSide, transparent: true } );
    var runnerGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
    this.runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
    this.runner.position.set(0, 0, 0);
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;

    this.update = function( milliSec )
    {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
}
