var TextureManager = function(onLoad){
    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = function ( item, loaded, total ) {
        console.log( 'Loading file: ' + item + '.\nLoaded ' + loaded + ' of ' + total + ' files.' );
    };

    this.manager.onLoad = onLoad;

    this.textureLoader = new THREE.ImageLoader( this.manager );
    this.textures = {
        skyline: {
            type: "png",
        },
        run: {
            type: "png"
        }
    };

    
}

TextureManager.prototype.load = function(){
    for(var name in this.textures){
        var item = this.textures[name];
        this.textureLoader.load('img/' + name + "." + item.type, function ( texture ) {
            console.log(texture)
            this.context.textures[this.name].material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
            this.context.textures[this.name].width = texture.width;
            this.context.textures[this.name].height = texture.height;
        }.bind({context: this, name: name}));
    }
}

TextureManager.prototype.getTexture = function(textureName){
    return this.textures[textureName];
}
