var TextureManager = function(onLoad){
    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = function ( item, loaded, total ) {
        console.log( 'Loading file: ' + item + '.\nLoaded ' + loaded + ' of ' + total + ' files.' );
    };

    this.manager.onLoad = onLoad;

    this.textureLoader = new THREE.TextureLoader( this.manager );
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
            this.context.textures[this.name].texture = texture;
        }.bind({context: this, name: name}));
    }
}

TextureManager.prototype.getTexture = function(textureName){
    return this.textures[textureName].texture;
}
