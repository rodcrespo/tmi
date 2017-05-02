var Event = function(time, goodAnswer, opportunities){
    this.time = time; // seconds
    this.timer = 0;
    this.running = false;
    this.goodAnswer = goodAnswer;
    this.correct = false;
    this.end = false;
    this.ready = false;
    this.opportunities = opportunities;
    this.count = 0;
}

Event.prototype.setFunctions = function (beforeEvent, event, afterSuccess, afterWrong, badAnswer) {
    this.beforeEvent = beforeEvent;
    this.event = event;
    this.afterSuccess = afterSuccess;
    this.afterWrong = afterWrong;
    this.ready = true;
    this.badAnswer = badAnswer;
}

Event.prototype.start = function() {
    if (this.ready) {
        if (this.beforeEvent != null){
            this.callFunctions(this.beforeEvent);
        }
        this.running = true;
        game.pauseEvent = true;
    }
}

Event.prototype.update = function (deltaTime) {
    if (this.running) {
        this.timer += deltaTime;

        if (this.timer >= this.time) {
            this.end = true;
            this.afterEvent();
            this.running = false;
            game.pauseEvent = false;
        }
        else {
            this.callFunctions(this.event);
        }
    }
}

Event.prototype.afterEvent = function () {
    if (this.end) {
        if (this.correct) {
            this.success();
        }
        else {
            this.wrong();
        }
    }
}

Event.prototype.success = function () {
    if (this.end) {
        if (this.afterSuccess != null) {
            this.callFunctions(this.afterSuccess);
        }
    }
}

Event.prototype.wrong = function () {
    if (this.end) {
        if (this.afterWrong != null) {
            this.callFunctions(this.afterWrong);
        }
    }
}

Event.prototype.callFunctions = function (f) {
    if (Array.isArray(f)) {
        for (var i = 0; i < f.length; i++) {
            f[i].call();
        }
    }
    else {
        f.call();
    }
}

Event.prototype.checkAnswer = function (answer) {
    if (this.running && !game.pause) {
        if (Array.isArray(this.goodAnswer)) {
            if (this.goodAnswer.includes(answer)) {
                this.correct = true;
                this.timer = this.time;
            }
        }
        else {
            if (this.goodAnswer == answer) {
                this.correct = true;
                this.timer = this.time;
            }
        }

        if (!this.correct && this.badAnswer != null) {
            this.callFunctions(this.badAnswer);
        }

        if (this.opportunities > 0) {
            this.count += 1;
            if (this.count >= this.opportunities) {
                this.timer = this.time;
            }
        }
    }  
}


