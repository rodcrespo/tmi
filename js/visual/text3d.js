var Text3D = function(text, position, color, size, font){

	var materials = [
		new THREE.MeshBasicMaterial( { color: color, overdraw: 0.5 } ),
		new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } )
	];

	var textGeom = new THREE.TextGeometry( text, {
			font: font,
			size: size,
			height: 20,
			curveSegments: 2
	});
	this.mesh = new THREE.Mesh( textGeom, materials[0] );


	textGeom.computeBoundingBox();
	textGeom.textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	var centerOffset = -0.5 * ( textGeom.boundingBox.max.x - textGeom.boundingBox.min.x );
	this.mesh.position.x = position.x;
	this.mesh.position.y = position.y;
	this.mesh.position.z = position.z;
	this.mesh.rotation.x = -Math.PI/8;
	this.mesh.rotation.y = Math.PI * 2;
}


Text3D.prototype.init = function(){
}

Text3D.prototype.setPosition = function(position) {
	this.mesh.position = position;
}

Text3D.prototype.getPosition = function() {
	return this.mesh.position.clone();
}


Text3D.prototype.update = function(lapsedMillis) {
	var variation_r = 10;
	var positionVariation = 0.05;
	var npos = new THREE.Vector3(this.mesh.position.x + (Math.random() * variation_r - variation_r/2), this.mesh.position.y + (Math.random() *  variation_r - variation_r/2), this.mesh.position.z + (Math.random() *  variation_r - variation_r/2));
	this.mesh.position.lerp(npos, positionVariation)
}
