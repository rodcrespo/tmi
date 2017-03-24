// MAIN

// standard global variables
var container, scene, camera, renderer, cube, stats, circle, speakPoint;
var clock = new THREE.Clock();

// custom global variables
var annie, boomer; // animators
var rotation = 0;
var rotationEnabled = false;
var circleSpeed = new THREE.Vector3 (-1, 0, 0);
var startPos, endPos;
var score = 0;

const SCENE = {
    init: function(){
        init();
        animate();
    },
    render: function render(){
        renderer.render( scene, camera );
    }
}


// FUNCTIONS
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45;
    var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
    var NEAR = 0.1;
    var FAR = 20000;

    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);



    // RENDERER
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setClearColor(0xDDDDDD, 1);
    document.body.appendChild(renderer.domElement);

    //CUBE

    var boxGeometry = new THREE.BoxGeometry(30, 30, 30);
    var basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD});
    cube = new THREE.Mesh(boxGeometry, basicMaterial);
    cube.name = 'player';
    scene.add(cube);

    // CIRCLE
    var circleGeometry = new THREE.CircleGeometry(5, 32, 0.65 * Math.PI * 2, 0.75 * Math.PI * 2);
    var circleMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    circle = new THREE.Mesh( circleGeometry, circleMaterial );
    //alert(screen2WorldPoint(camera, new THREE.Vector3(0 + 20, window.innerHeight, 0)).x);
    startPos = screen2WorldPoint(camera, new THREE.Vector3(window.innerWidth*1.5, window.innerHeight, 0));
    endPos = new THREE.Vector3(0, startPos.y, startPos.z);
    circle.position.set (startPos.x, startPos.y, startPos.z);
    circle.name = 'enemy';
    scene.add(circle);

    // SPEAKPOINT
    var speakPointGeometry = new THREE.BoxGeometry(0.5, 60, 0.5)
    var speakPointMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    speakPointMaterial.side = THREE.DoubleSide;
    //speakPointMaterial.wireframe = true;
    speakPoint = new THREE.Mesh( speakPointGeometry, speakPointMaterial );
    speakPoint.position.set (cube.position.x + 120, 0, cube.position.z);
    scene.add(speakPoint);

    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    // FLOOR

    ////////////
    // CUSTOM //
    ////////////

    // MESHES WITH ANIMATED TEXTURES!

    var runnerTexture = new THREE.ImageUtils.loadTexture( 'img/run.png' );
    annie = new TextureAnimator( runnerTexture, 10, 1, 10, 75 ); // texture, #horiz, #vert, #total, duration.
    var runnerMaterial = new THREE.MeshBasicMaterial( { map: runnerTexture, side: THREE.DoubleSide } );
    var runnerGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
    var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
    runner.position.set(-100,25,0);
    scene.add(runner);

}

function animate()
{
    requestAnimationFrame( animate );
    render();
    update();
}

function update()
{
    var delta = clock.getDelta();
    if (rotationEnabled){
        rotation += 0.05;
        cube.rotation.set(0.4, rotation, 0);
    }

    if (scene.getObjectByName('enemy')) {
        circle.position.x += circleSpeed.x;
        if (circle.position.distanceToManhattan(endPos) <= 5) {
            scene.remove(circle);
            alert ("Game Over!\nScore: " + score );
        }
    }



    annie.update(1000 * delta);
}

function render()
{
    renderer.render( scene, camera );
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;

    this.update = function( milliSec )
    {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
}