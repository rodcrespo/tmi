var AudioManager = function() {
	this.audios = {
		bounce: {
			type: "wav"
		},
		jump: {
			type: "wav"
		},
		shoot: {
			type: "wav"
		},
		
	};
}

AudioManager.prototype.play = function(name){
	var item = this.audios[name];
	var audio = new Audio('sound/' + name + "." + item.type);
	audio.play();
}