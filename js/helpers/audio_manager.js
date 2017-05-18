var AudioManager = function() {
	//these are created and played full length, multiple can be
	//played at the same time
	this.effects = {
		bounce: {
			type: "wav"
		},
		jump: {
			type: "wav"
		},
		shoot: {
			type: "wav"
		},
		death: {
			type: "wav"
		}
	};
	
	//these are loaded once and only one instance exists
	//use them for background music
	this.music = {
		background: {
			type: ".mp3",
			sound: null
		},
	};
	
	for (var song in this.music) {
		console.log(AUDIO_FOLDER + song + this.music[song].type)
		var audio = new Audio(AUDIO_FOLDER + song);
		audio.loop = true;
		this.music[song].sound = audio;
	}
}

AudioManager.prototype.play = function(name){
	var item = this.effects[name];
	var audio = new Audio(AUDIO_FOLDER + name + "." + item.type);
	audio.play();
}

AudioManager.prototype.startMusic = function(name) {
	var song = this.music[name];
	song.sound.pause();
	song.sound.currentTime = 0;
	song.sound.play();
}

AudioManager.prototype.pauseMusic = function(name) {
	var song = this.music[name];
	song.sound.pause();
}

AudioManager.prototype.resumeMusic = function(name) {
	var song = this.music[name];
	song.sound.play();
}