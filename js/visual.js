// standard global variables
var container, scene, camera, renderer;


var Visual = function(){
    this.clock = new THREE.Clock();
};


Visual.prototype.load = function(){
  // this.textureManager = new TextureManager(function () {
  //     console.log("All loaded")
      this.init();
      this.animate();
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





    //CUBE


    this.particles_amount = 1000;
    var particles_radius = 800;

    this.particles = [];
    for (var i = 0; i < this.particles_amount; i++) {
        this.particles[i] = new Particle(new THREE.Vector3((Math.random() * particles_radius - particles_radius/2), (Math.random() * particles_radius - particles_radius/2), 0));
        this.scene.add(this.particles[i].mesh);
    }


    // // CIRCLE
    // var circleGeometry = new THREE.CircleGeometry(5, 32, 0.65 * Math.PI * 2, 0.75 * Math.PI * 2);
    // var circleMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    // circle = new THREE.Mesh( circleGeometry, circleMaterial );
    // //alert(screen2WorldPoint(camera, new THREE.Vector3(0 + 20, window.innerHeight, 0)).x);
    // startPos = screen2WorldPoint(camera, new THREE.Vector3(window.innerWidth*1.5, window.innerHeight, 0));
    // endPos = new THREE.Vector3(0, startPos.y, startPos.z);
    // circle.position.set (startPos.x, startPos.y, startPos.z);
    // circle.name = 'enemy';
    // this.scene.add(circle);

    // SPEAKPOINT
    // var speakPointGeometry = new THREE.BoxGeometry(0.5, 60, 0.5)
    // var speakPointMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    // speakPointMaterial.side = THREE.DoubleSide;
    // //speakPointMaterial.wireframe = true;
    // speakPoint = new THREE.Mesh( speakPointGeometry, speakPointMaterial );
    // speakPoint.position.set (cube.position.x + 120, 0, cube.position.z);
    // this.scene.add(speakPoint);

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
