// MAIN


// standard global variables
var container, scene, camera, renderer, cube, stats, circle, speakPoint;


// custom global variables
var rotation = 0;
var rotationEnabled = false;
var circleSpeed = new THREE.Vector3 (-1, 0, 0);
var startPos, endPos;




var Game = function(){
    this.clock = new THREE.Clock();
    this.status = GAME_IDLE;
};


Game.prototype.load = function(){
  this.textureManager = new TextureManager(function () {
      console.log("All loaded")
      // console.log(this.textureManager.textures)
      this.init();
      this.animate();
  }.bind(this));
  this.audioManager = new AudioManager();
  this.cameraEffects = new CameraEffects();
  this.updateCamera = true;
  this.gui = new Gui();
  this.textureManager.load();
  this.collidables = [];
  this.entities = [];
}

Game.prototype.setStatus = function(status){
    this.status = status;
}


Game.prototype.updateHud = function() {
	this.updateScore();
	this.updateLives();
}

Game.prototype.updateScore = function(){
    $(".score .value").html(this.player.getScore());
}

Game.prototype.updateLives = function(){
	lives = Math.round(5 * this.player.getHealth() / PLAYER_MAX_HEALTH)
    $.each($(".hud .lives .fa"), function( index, item ) {
        if(lives <= index){
            $(item).removeClass("fa-heart").addClass("fa-heart-o");
        } else {
			$(item).removeClass("fa-heart-o").addClass("fa-heart");
		}
    }.bind(this));
}

Game.prototype.init = function(){
    // console.log(this)
  	ANNYANG.init();

    this.pause = false;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(CAMERA_INIT_X, CAMERA_INIT_Y, CAMERA_INIT_Z);
    this.camera.lookAt(new THREE.Vector3(PLAYER_INIT_X,PLAYER_INIT_Y,PLAYER_INIT_Z));

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(BACKGROUND_COLOR, 1);
    this.renderer.sortObjects = false;
    document.body.appendChild(this.renderer.domElement);


	this.skybox = new Skybox("img/skybox/skybox", ".png");
	this.scene.add(this.skybox.getMesh());
	
	this.city= new CityBackground(this.textureManager);
    this.scene.add( this.city.plane );
	

	//initialize entities
	this.player = new Player(this);
    this.player.init();
	this.addEntity(this.player);
	
    //Initialize tiles
    this.tiles = [];
    var x = TILES_START;
	
    for (var i = 0; i < TILES_NUMBER; i++) {
        if(i < TILES_NUMBER / 2){
            var tile = new Tile(this.textureManager, Tile.TYPES.TYPE0, x, 0);
        }else{
            var tile = new Tile(this.textureManager, Math.floor((Math.random() * Object.keys(Tile.TYPES).length)), x, 0);
        }

		x += TILE_WIDTH;
		this.addTile(tile);
    }

    // Event
    this.event = null;
    this.pauseEvent = false;


    // LIGHT
    this.light = new Light ();
    this.scene.add(this.light.getAmbientLight()); 
	
	
	//AudioManager
	this.audioManager.startMusic(AUDIO_BACKGROUND);
	
	//Gui
	var guiElements = this.gui.getDrawableElements();
	for (var i = 0; i < guiElements.length; i++) {
		console.log(guiElements[i]);
		this.scene.add(guiElements[i]);
	}
	

};

Game.prototype.addTile = function(tile) {
	this.player.addTrigger(tile.getTrigger());
	this.tiles.push(tile);

	this.scene.remove(this.player.mesh);
	tile.addToScene(this.scene);
	this.scene.add(this.player.mesh);
	
	this.collidables.push(tile.getCollidable());
};

Game.prototype.render = function(){
    this.renderer.render( this.scene, this.camera );
};

Game.prototype.update = function(){
    var delta = this.clock.getDelta();
    if (!this.pause) {
        if (!this.pauseEvent) {
            if (rotationEnabled){
				otation += 0.05;
            }
            if (this.scene.getObjectByName('enemy')) {
                circle.position.x += circleSpeed.x;
                if (circle.position.distanceToManhattan(endPos) <= 5) {
                    this.scene.remove(circle);
                    alert ("Game Over!\nScore: " + score );
                }
            }
			//updates all entities on screen (including the player)
			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].update(this, 1000 * delta);
			}
            this.cameraUpdate();
            this.city.update(this.player.mesh.position);
			this.skybox.update(this.player.mesh.position);
            this.tilesUpdate();
			this.gui.update(1000 * delta);
			this.updateHud();
        }
        else {
            this.event.update(delta);
        }
    }

};

Game.prototype.switchSpotLight = function () {
    if (this.light.spotLightOn) {
        this.light.turnOffSpotLight(this);
    }
    else {
        var playerPosition = this.player.getPosition();
        this.light.turnOnSpotLight(new THREE.Vector3(playerPosition.x + PLAYER_DEFAULT_VELOCITY / 3, playerPosition.y, playerPosition.z), this);
    }
    
}

Game.prototype.addEntity = function(entity) {
	this.entities.push(entity);
	this.scene.add(entity.mesh);
};

Game.prototype.removeEntity = function(entity) {
	var index = this.entities.indexOf(entity);
	if (index > -1) {
		this.entities.splice(index, 1);
	}
	this.scene.remove(entity.mesh);
}

Game.prototype.getEntities = function() {
	return this.entities;
}

Game.prototype.disableCameraUpdate = function() {
	this.updateCamera = false;
}

Game.prototype.enableCameraUpdate = function() {
	this.updateCamera = true;
}

Game.prototype.cameraUpdate = function(){
	if (this.updateCamera) {
		var playerPosition = this.player.mesh.position;
		this.camera.position.set(this.camera.position.x + (playerPosition.x - this.camera.position.x), 150, 400);
		this.camera.lookAt(playerPosition);
	}
};

Game.prototype.tilesUpdate = function(){
    var playerPosition = this.player.mesh.position;
    if(playerPosition.x > this.tiles[TILES_NUMBER - 5].floor.plane.position.x){
        var x = this.tiles[TILES_NUMBER - 1].floor.plane.position.x + TILE_WIDTH;
        this.tiles.shift().removeFromScene(this.scene);
        var tile = new Tile(this.textureManager, Math.floor((Math.random() * Object.keys(Tile.TYPES).length)), x, 0);
		
		this.addTile(tile);
		if (typeof(tile.entities) !== 'undefined') {
			for (var i = 0; i < tile.entities.length; i++) {
				this.addEntity(tile.entities[i]);
			}
		}
        this.collidables.shift();
    }

};

Game.prototype.animate = function(){
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
    this.update();
};
