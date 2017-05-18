// standard global variables
var container, scene, camera, renderer;


var Visual = function(){
    this.clock = new THREE.Clock();
};


Visual.prototype.load = function(){

  var loader = new THREE.FontLoader();

loader.load( 'fonts/Baloo_Regular.json', function ( font ) {

    // your code here
    this.font = font;
    this.init();
    this.animate();

}.bind(this) );
  // this.textureManager = new TextureManager(function () {
  //     console.log("All loaded")
      // this.init();
      // this.animate();
  // }.bind(this));
  // this.audioManager = new AudioManager();
  // this.cameraEffects = new CameraEffects();
  // this.updateCamera = true;
  // this.gui = new Gui();
  // this.textureManager.load();
  // this.collidables = [];
  // this.entities = [];
}


Visual.prototype.init = function(){
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(CAMERA_INIT_X, CAMERA_INIT_Y, CAMERA_INIT_Z);
    this.camera.lookAt(new THREE.Vector3(PLAYER_INIT_X,PLAYER_INIT_Y,PLAYER_INIT_Z));

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(0x090909, 1);
    this.renderer.sortObjects = false;
    document.body.appendChild(this.renderer.domElement);



    //Particles

    this.particles_amount = 1000;
    var particles_radius = 800;

    this.particles = [];
    for (var i = 0; i < this.particles_amount; i++) {
        this.particles[i] = new Particle(new THREE.Vector3((Math.random() * particles_radius - particles_radius/2), (Math.random() * particles_radius - particles_radius/2), 0));
        this.scene.add(this.particles[i].mesh);
    }

    // Text

    var materials = [
      new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
      new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } )
    ];

    var textGeom = new THREE.TextGeometry( 'Er Zevillano', {
        font: this.font,
        size: 20,
        height: 20,
        curveSegments: 2
    });
    var textMesh = new THREE.Mesh( textGeom, materials[0] );

    this.scene.add( textMesh );

    textGeom.computeBoundingBox();
    textGeom.textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    var centerOffset = -0.5 * ( textGeom.boundingBox.max.x - textGeom.boundingBox.min.x );
    textMesh.position.x = centerOffset;
    textMesh.position.y = 0;
    textMesh.position.z = 0;
    textMesh.rotation.x = -Math.PI/8;
    textMesh.rotation.y = Math.PI * 2;








    // LIGHT
    // this.light = new Light ();
    // this.scene.add(this.light.getAmbientLight());

};

Visual.prototype.render = function(){
    this.renderer.render( this.scene, this.camera );
};

Visual.prototype.update = function(){
    var delta = this.clock.getDelta();
    for (var i = 0; i < this.particles_amount; i++) {
        this.particles[i].update(delta)
    }


}

Visual.prototype.animate = function(){
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
    this.update();
};
