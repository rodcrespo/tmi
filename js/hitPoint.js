var HitPoint = function(event) {
    this.event = event;
    this.done = false;
}

HitPoint.prototype.start = function () {
    if (!this.done) {
        this.done = true;
        this.event.start();
    }
}