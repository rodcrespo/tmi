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
    ANNYANG.init();
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
  this.soundOn = true;
  this.wordCloud = new WordCloud();
}

Game.prototype.setStatus = function(status){
    this.status = status;
}
Game.prototype.toggleSound = function(){
    this.soundOn = !this.soundOn;
    if(this.soundOn){
        this.audioManager.resumeMusic("background");
    }else{
        this.audioManager.pauseMusic("background");
    }
}


Game.prototype.updateHud = function() {
	this.updateScore();
	this.updateLives();
}

Game.prototype.updateScore = function(){
    $(".score .value").html(('000' + this.player.getScore()).slice(-4));
}

Game.prototype.showMessage = function(failed){
    if(failed){
        var text = KO_MESSAGES[Math.floor((Math.random() * KO_MESSAGES.length))];
        $(".message").addClass("wrong").removeClass("right").html(text);
    }else{
        var text = OK_MESSAGES[Math.floor((Math.random() * OK_MESSAGES.length))];
        $(".message").addClass("right").removeClass("wrong").html(text);
    }
    $(".message").fadeIn(2000)
    $(".message").fadeOut(2000)

}

Game.prototype.updateLives = function(){
	this.lives = Math.round(NUM_HEARTS * this.player.getHealth() / PLAYER_MAX_HEALTH);

    $.each($(".hud .lives .fa"), function( index, item ) {
        if(this.lives <= index){
            $(item).removeClass("fa-heart").addClass("fa-heart-o");
        } else {
			$(item).removeClass("fa-heart-o").addClass("fa-heart");
		}
    }.bind(this));

    if(this.player.getHealth() <= PLAYER_MIN_HEALTH && this.status != GAME_FINISHED){
        console.log("Game over")
        this.setStatus(GAME_FINISHED)
        //TODO Game over
        //TODO Play sound
        game.cameraEffects.getEffect(ZOOM_AND_ROLL).call();
        //TODO Transition to final screen

    }
}

function end(words) { console.log(JSON.stringify(words)); }

Game.prototype.init = function(){
    // console.log(this)


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
            var tile = getRandomTile(this.textureManager, x, 0); //new Tile(this.textureManager, Math.floor((Math.random() * Object.keys(Tile.TYPES).length)), x, 0);
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
		// console.log(guiElements[i]);
		this.scene.add(guiElements[i]);
	}


  window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

};

Game.prototype.onWindowResize = function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.render();
	}

Game.prototype.addTile = function(tile) {
	this.player.addTrigger(tile.getTrigger());
	this.tiles.push(tile);

	this.scene.remove(this.player.mesh);

	tile.addToScene(this.scene);

	if (typeof(tile.entities) !== 'undefined') {
		for (var i = 0; i < tile.entities.length; i++) {
			this.addEntity(tile.entities[i]);
		}
	}

	this.scene.add(this.player.mesh);

	this.collidables.push(tile.getCollidable());
};

Game.prototype.render = function(){
    this.renderer.render( this.scene, this.camera );
};

Game.prototype.update = function(){
    var delta = this.clock.getDelta();
    if(this.status == GAME_FINISHED){
        
    }


    //updates all entities on screen (including the player)
    for (var i = 0; i < this.entities.length; i++) {
        if (!this.pause && !this.pauseEvent) {
            this.entities[i].update(this, 1000 * delta);
        }
        if (!this.pause) {
            this.entities[i].updateAnimation (1000 * delta);
        }
    }


    if (!this.pause) {
        if (!this.pauseEvent) {
            if (rotationEnabled){
				otation += 0.05;
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
        var tile = getRandomTile(this.textureManager, x, 0); //new Tile(this.textureManager, Math.floor((Math.random() * Object.keys(Tile.TYPES).length)), x, 0);

		this.addTile(tile);
        this.collidables.shift();
    }

};

Game.prototype.animate = function(){
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
    this.update();
};
