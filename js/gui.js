Gui = function() {
	//create health display
	var geometry = new THREE.BoxGeometry(1,10,10);
    var material = new THREE.MeshBasicMaterial({color:"red"});
	
	this.guiElements = {
		healthBar: {
			mesh: new THREE.Mesh(geometry, material),
			offset: new THREE.Vector3(0, PLAYER_HEIGHT / 2 + 10, 0),
		},
	};
	
	
}

Gui.prototype.update = function(lapsedMillis) {
	var playerPos = game.player.getPosition();
	var playerHealth = game.player.getHealth();
	//update individual properties
	this.guiElements.healthBar.mesh.scale.x = playerHealth;	//set size according to health
	var hue = playerHealth * 0.33 / 100.0;  				//go from green (lots of life) to red (almost dead)
	this.guiElements.healthBar.mesh.material.color.setHSL(hue, 1, 0.5);
	
	//update positions of gui elements
	for (var element in this.guiElements) {
		var offset = this.guiElements[element].offset;
		var mesh = this.guiElements[element].mesh;
		mesh.position.set(playerPos.x + offset.x, playerPos.y + offset.y, playerPos.z + offset.z);
	}
}

Gui.prototype.getDrawableElements = function() {
	var elements = [];
	for (var element in this.guiElements) {
		elements.push(this.guiElements[element].mesh);
	}
	return elements;
}