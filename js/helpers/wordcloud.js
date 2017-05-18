var WordCloud = function() {
	this.reset();
}

WordCloud.prototype.update = function() {
	parseText(this.words.join(" "));
}

WordCloud.prototype.addWords = function(word) {
	this.words.push(word);
	this.update();
}

WordCloud.prototype.reset = function() {
	this.words = [];
	this.update();
}
