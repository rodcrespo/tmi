var Event = function(time, goodAnswer, badAnswers, opportunities){
    this.time = time; // seconds
    this.timer = 0;
    this.running = false;
   
    this.goodAnswer = goodAnswer == undefined ? [] : goodAnswer;
    if (!Array.isArray(this.goodAnswer)) {
        this.goodAnswer = [badAnswers];
    }
    
    this.badAnswers = badAnswers == undefined ? [] : badAnswers;
    if (!Array.isArray(this.badAnswers)) {
        this.badAnswers = [badAnswers];
    }
    this.correct = false;
    this.end = false;
    this.ready = false;
    this.opportunities = opportunities == undefined ? 1 : opportunities;
    this.count = 0;
    this.answer = null;
}

Event.prototype.setFunctions = function (beforeEvent, event, afterSuccess, afterWrong, badAnswer) {
    this.beforeEvent = beforeEvent == undefined ? null : beforeEvent;
    this.event = event == undefined ? null : event;
    this.afterSuccess = afterSuccess == undefined ? null : afterSuccess;
    this.afterWrong = afterWrong == undefined ? null : afterWrong;
    this.ready = true;
    this.badAnswer = badAnswer == undefined ? null : badAnswer;
}

Event.prototype.start = function() {
    if (this.ready && game.event == null) {
        if (this.beforeEvent != null){
            this.callFunctions(this.beforeEvent);
        }
        this.running = true;
        game.event = this;
        game.pauseEvent = true;
        return true;
    }

    return false
}

Event.prototype.update = function (deltaTime) {
    if (this.running && !game.pause) {
        this.timer += deltaTime;

        if (this.timer >= this.time) {
            this.end = true;
            this.afterEvent();
            this.running = false;
            game.pauseEvent = false;
            game.event = null;
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
        this.answer = answer;
        if (this.badAnswers.length > 0) {
            this.checkLimitAnswers();
        }
        else {
            this.checkUnlimitAnswers();
        }
    }  
}

Event.prototype.checkLimitAnswers = function () {
    if (this.answer != null) {
        if (this.goodAnswer.includes(this.answer) || this.badAnswers.includes(this.answer)) {
            this.checkUnlimitAnswers();
        }
        else {
            this.answer = null;
        }
    }
}

Event.prototype.checkUnlimitAnswers = function () {
    if (this.answer != null) {
        if (this.goodAnswer.includes(this.answer)) {
            this.correct = true;
            this.timer = this.time;
            $(".cloud-wrapper").css("color","green");
            $(".cloud-wrapper").fadeOut(2000);

        }

        this.answer = null;

        if (!this.correct && this.badAnswer != null) {
            $(".cloud-wrapper").css("color","red");
            $(".cloud-wrapper").fadeOut(2000);
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


