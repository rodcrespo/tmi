var TextureManager = function(onLoad){
    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = function ( item, loaded, total ) {
        console.log( 'Loading file: ' + item + '.\nLoaded ' + loaded + ' of ' + total + ' files.' );
    };

    this.manager.onLoad = onLoad;

    this.textureLoader = new THREE.TextureLoader(this.manager);
    this.fileLoader = new THREE.FileLoader(this.manager);
    this.textures = {
        skyline: {
            type: "jpg",
            url: "img/skyline.jpg"
        },
        floor: {
            type: "jpg",
            url: "img/floor.jpg"
        },
        runner: {
            type: "png",
            url: "img/runner.png"
        },
        ball: {
            type: "png",
            url: "img/ball.png"
        },
        building0: {
            type: "jpg",
            url: "img/buildings/building0.jpg"
        },
        building1: {
            type: "jpg",
            url: "img/buildings/building1.jpg"
        },
        building2: {
            type: "jpg",
            url: "img/buildings/building2.jpg"
        },
        building3: {
            type: "jpg",
            url: "img/buildings/building3.jpg"
        },
        building4: {
            type: "jpg",
            url: "img/buildings/building4.jpg"
        },
        building5: {
            type: "jpg",
            url: "img/buildings/building5.jpg"
        },
        building6: {
            type: "jpg",
            url: "img/buildings/building6.jpg"
        },
        building7: {
            type: "jpg",
            url: "img/buildings/building7.jpg"
        },
        building8: {
            type: "png",
            url: "img/buildings/building8.png"
        },
        player: {
            type: "png",
            url: "img/player/sprite.png",
            map_url: "img/player/map.json"
        },
    };

}

TextureManager.prototype.load = function(){
    for(var name in this.textures){
        var item = this.textures[name];
        console.log(item.url);
        this.textureLoader.load(item.url, function ( texture ) {
            this.context.textures[this.name].texture = texture;
        }.bind({context: this, name: name}));

        if ('map_url' in item) {
          console.log(item.map_url);
          this.fileLoader.load(item.map_url, function (map) {
              this.context.textures[this.name].map = JSON.parse(map);
          }.bind({context: this, name: name}));
        } else {
          this.textures[name].map = false;
        }
    }
}

TextureManager.prototype.getTexture = function(textureName){
    return this.textures[textureName].texture;
}

TextureManager.prototype.getMap = function(textureName){
    return this.textures[textureName].map;
}
