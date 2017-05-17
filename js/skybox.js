Skybox = function(imagePrefix, imageSuffix) {
	this.imagePrefix = imagePrefix;
	this.imageSuffix = imageSuffix;
	
	var textures  = [SKYBOX_XPOS, SKYBOX_XNEG, SKYBOX_YPOS, SKYBOX_YNEG, SKYBOX_ZPOS, SKYBOX_ZNEG];
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: game.textureManager.getTexture(textures[i]),
			side: THREE.BackSide
		}));
		
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyGeometry = new THREE.CubeGeometry( SKYBOX_SIZE, SKYBOX_SIZE, SKYBOX_SIZE );	
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	this.mesh = skyBox;
}


Skybox.prototype.getMesh = function() {
	return this.mesh;
}


Skybox.prototype.update = function(position) {
	this.mesh.position.x = position.x;
}