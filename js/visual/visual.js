var Visual = function(){
    this.clock = new THREE.Clock();
};


Visual.prototype.load = function(){

  var loader = new THREE.FontLoader();

loader.load( 'fonts/Baloo_Regular.json', function ( font ) {

    this.font = font;
    this.init();
    this.animate();

}.bind(this) );
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
        this.particles[i] = new Particle(new THREE.Vector3((Math.random() * particles_radius - particles_radius/2), (Math.random() * particles_radius - particles_radius/2), (Math.random() * particles_radius - particles_radius/2)));
        this.scene.add(this.particles[i].mesh);
    }

    // Text
    this.texts_amount = 20;
    var texts_radius = 500;
    var text_array = ['Er Zevillano', 'Hello', 'World', 'Choose']
    this.texts = [];
    for (var i = 0; i < this.texts_amount; i++) {
        this.texts[i] = new Text3D(text_array[Math.floor(Math.random() * text_array.length)], new THREE.Vector3((Math.random() * texts_radius - texts_radius/2), (Math.random() * texts_radius - texts_radius/2), (Math.random() * texts_radius - texts_radius/2)), Math.random() * 0xffffff, Math.random() * 30 - 10, this.font);
        this.scene.add(this.texts[i].mesh);
    }


    this.dots_group_amount = Math.random() * 10 + 5;
    this.dots_group_radius = 800;
    this.dots_group = []
    //Dots group
    for (var j = 0; j < this.dots_group_amount; j++) {
      var lines_geo = new THREE.Geometry();

      var group_position = new THREE.Vector3(( (Math.random() * this.dots_group_radius - this.dots_group_radius/2)), (Math.random() * this.dots_group_radius - this.dots_group_radius/2 ), (Math.random() * this.dots_group_radius - this.dots_group_radius/2))
      // Dots
      this.dots_amount = Math.random() * 10;
      var dots_radius = 100;
      this.dots_group[j] = {
        dots: []
      };
      for (var i = 0; i < this.dots_amount; i++) {
          var position = new THREE.Vector3((group_position.x + Math.random() * dots_radius - dots_radius / 2), (group_position.y + Math.random() * dots_radius - dots_radius / 2), (group_position.z + Math.random() * dots_radius - dots_radius / 2)) ;
          this.dots_group[j].dots[i] = new Dot(position);
          lines_geo.vertices.push(position);
          this.scene.add(this.dots_group[j].dots[i].mesh);
      }

      var line = new THREE.Line( lines_geo, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.5 } ) );
      this.scene.add( line );

    }


    // LIGHT
    // this.light = new Light ();
    // this.scene.add(this.light.getAmbientLight());

    this.controls = new THREE.TrackballControls( this.camera );
    this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;
		this.controls.noZoom = false;
		this.controls.noPan = false;
		this.controls.staticMoving = true;
		this.controls.dynamicDampingFactor = 0.3;
		this.controls.keys = [ 65, 83, 68 ];
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
};

Visual.prototype.render = function(){
    this.renderer.render( this.scene, this.camera );
};

Visual.prototype.update = function(){
    var delta = this.clock.getDelta();
    for (var i = 0; i < this.particles_amount; i++) {
        this.particles[i].update(delta)
    }
    for (var i = 0; i < this.texts_amount; i++) {
        this.texts[i].update(delta)
    }
}

Visual.prototype.onWindowResize = function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.controls.handleResize();
		this.render();
	}

Visual.prototype.animate = function(){
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
    this.update();
    this.controls.update()
}
