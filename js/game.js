// MAIN


// standard global variables
var container, scene, camera, renderer, cube, stats, circle, speakPoint;


// custom global variables
var annie, boomer; // animators
var rotation = 0;
var rotationEnabled = false;
var circleSpeed = new THREE.Vector3 (-1, 0, 0);
var startPos, endPos;
var score = 0;

var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
var VIEW_ANGLE = 45;
var NEAR = 0.1;
var FAR = 20000;

var Game = function(){
    this.clock = new THREE.Clock();
};

Game.prototype.load = function(){
    this.textureManager = new TextureManager(function () {
        console.log("All loaded")
        // console.log(this.textureManager.textures)
        this.init();
        this.animate();
    }.bind(this));
    this.textureManager.load();
	this.collidables = [];
}

Game.prototype.init = function(){
    // console.log(this)
  	ANNYANG.init();

      this.pause = false;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(0, 150, 400);
    this.camera.lookAt(new THREE.Vector3(0,50,0));

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(0x87CEEB, 1);
    this.renderer.sortObjects = false;
    document.body.appendChild(this.renderer.domElement);

    this.floor= new Floor(this.textureManager);
    this.scene.add( this.floor.plane );
	this.collidables.push(this.floor.plane);

    
    this.city= new CityBackground(this.textureManager);
    this.scene.add( this.city.plane );

    this.player = new Player(this.textureManager);
    this.player.init();
    // console.log(this.player);
    this.scene.add(this.player.runner);

    this.bakery_shop = new BakeryShop(this.textureManager);
    this.scene.add( this.bakery_shop.plane );


    this.flower_shop = new FlowerShop(this.textureManager);
    this.scene.add( this.flower_shop.plane );







    //CUBE

    // var boxGeometry = new THREE.BoxGeometry(30, 30, 30);
    // var basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD});
    // cube = new THREE.Mesh(boxGeometry, basicMaterial);
    // cube.name = 'player';
    // this.scene.add(cube);

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
    this.light = new THREE.PointLight(0xffffff);
    this.light.position.set(0,250,0);
    this.scene.add(this.light);




};

Game.prototype.render = function(){
    this.renderer.render( this.scene, this.camera );
};

Game.prototype.update = function(){
    var delta = this.clock.getDelta();
    // console.log(delta)
    if (!this.pause) {
        if (rotationEnabled){
        rotation += 0.05;
        cube.rotation.set(0.4, rotation, 0);
        }

        if (this.scene.getObjectByName('enemy')) {
            circle.position.x += circleSpeed.x;
            if (circle.position.distanceToManhattan(endPos) <= 5) {
                this.scene.remove(circle);
                alert ("Game Over!\nScore: " + score );
            }
        }
        this.player.update(1000 * delta, this.collidables);
    }
    
};

Game.prototype.animate = function(){
    // console.log(this)
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
    this.update();
};
