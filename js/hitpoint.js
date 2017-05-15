var Hitpoint = function(event) {
    this.event = event;
    this.done = false;
}

Hitpoint.prototype.start = function () {
    if (!this.done) {
        this.done = true;
        this.event.start();
    }
}

function animation2Start (speed, nGyros) {
    if (nGyros <= 0 || speed == undefined || nGyros == undefined) {
        return function () {};
    }
    return function () {
        game.pause = true;
        var initialFocal = game.camera.getFocalLength();
        var tick = function (angulo, focalLength) {
                return function () {
                    game.camera.rotation.z = angulo * Math.PI / 180;
                    game.camera.setFocalLength(game.camera.getFocalLength() - focalLength);
                }
        };
        for (var i = 0; i <= nGyros * 360; i+=speed) {
            if (i <= (nGyros * 360) / 2) {
                setTimeout(tick(i, -1), 2 * i);
            }
            else {
                setTimeout(tick(i, 1), 2 * i);
            }
            
        }
        setTimeout(function () {
                    game.pause = false;
                    game.camera.rotation.z = 0; 
                    game.camera.setFocalLength(initialFocal)
                }, 2 * nGyros * 360);
    };
}