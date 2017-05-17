var Hitpoint = function(event) {
    this.event = event;
    this.done = false;
}

Hitpoint.prototype.start = function () {
    if (!this.done) {
        this.done = this.event.start();
    }
}