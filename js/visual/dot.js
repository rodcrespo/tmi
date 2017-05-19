var Dot = function(position){

  var radius   = 7,
      segments = 30,
      material = new THREE.LineBasicMaterial( { color: 0xffffff } ),
      geometry = new THREE.CircleGeometry( radius, segments );

  geometry.vertices.shift();

  this.mesh = new THREE.Group();

  for (var i = 0; i < 36; i++){
    var line = new THREE.Line( geometry, material );
    line.rotateY(i * 10);
    this.mesh.add(line);
  }

  if (position) {
		this.mesh.position.set(position.x, position.y, position.z);
	}



}


Dot.prototype.init = function(){
}

Dot.prototype.setPosition = function(position) {
	this.mesh.position = position;
}

Dot.prototype.getPosition = function() {
	return this.mesh.position.clone();
}


Dot.prototype.update = function(lapsedMillis) {
	// var positionVariation = 0.05;
	// var variation_r = 10;
	// var npos = new THREE.Vector3(this.mesh.position.x + (Math.random() * variation_r - variation_r/2), this.mesh.position.y + (Math.random() *  variation_r - variation_r/2), this.mesh.position.z + (Math.random() *  variation_r - variation_r/2));
  //
	// this.mesh.position.lerp(npos, positionVariation)

}
