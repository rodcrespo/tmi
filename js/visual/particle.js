var Particle = function(position){

  var angler = Math.PI*2 / 3;
  var v1 = new THREE.Vector3(Math.sin(angler*2 + Math.PI), Math.cos(angler*2 + Math.PI), 0);
  var v2 = new THREE.Vector3(Math.sin(angler + Math.PI), Math.cos(angler + Math.PI), 0);
  var v3 = new THREE.Vector3(Math.sin(angler*3 + Math.PI), Math.cos(angler*3 + Math.PI), 0);

  var v4 = new THREE.Vector3(Math.sin(angler*2), Math.cos(angler*2), 0);
  var v5 = new THREE.Vector3(Math.sin(angler), Math.cos(angler), 0);
  var v6 = new THREE.Vector3(Math.sin(angler*3), Math.cos(angler*3), 0);

  var geom = new THREE.Geometry();
  geom.vertices.push(v1);
  geom.vertices.push(v2);
  geom.vertices.push(v3);
  geom.vertices.push(v4);
  geom.vertices.push(v5);
  geom.vertices.push(v6);

  geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom.faces.push( new THREE.Face3( 3, 4, 5 ) );

  this.mesh = new THREE.Mesh( geom, new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.7}) );
	if (position) {
		this.mesh.position.set(position.x, position.y, position.z);
	}

	this.flip = true;

}


Particle.prototype.init = function(){
}

Particle.prototype.setPosition = function(position) {
	this.mesh.position = position;
}

Particle.prototype.getPosition = function() {
	return this.mesh.position.clone();
}


Particle.prototype.update = function(lapsedMillis) {
	var scaleVariation = 2;

	var newScale = this.mesh.scale.y + (this.flip ? -scaleVariation : scaleVariation);
	this.mesh.scale.y = newScale;
	if (newScale >= 1 || newScale <= -1) {
		this.flip = !this.flip;
	}

	var positionVariation = 0.05;
	var variation_r = 10;
	var npos = new THREE.Vector3(this.mesh.position.x + (Math.random() * variation_r - variation_r/2), this.mesh.position.y + (Math.random() *  variation_r - variation_r/2), this.mesh.position.z + (Math.random() *  variation_r - variation_r/2));

	this.mesh.position.lerp(npos, positionVariation)

}
