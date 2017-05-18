var EventFactory = function () {
    this.eventTypes = ["boss"];
}

EventFactory.prototype.getEvent = function (event, parameters) {
    switch(event) {
        case "test": return this.testEvent(parameters);
        case "boss": return this.bossEvent(parameters);
    }
}

EventFactory.prototype.getRandomEvent = function (parameters) {
    var index = Math.floor(Math.random() * (this.eventTypes.length));
    return this.getEvent(this.eventTypes[index], parameters);
}

EventFactory.prototype.testEvent = function (tile) {
    var event = new Event (10, [KEYCODE_A, KEYCODE_D], 2);
    event.setFunctions(
        [
            function() {
				//console.log("Cosas para hacer antes del evento.");
            },
            function () {
                //console.log("Pulsa A para responder bien");
            },
            function () {
                //console.log("También puedes pulsar D")
                game.switchSpotLight();
            },
        ],
        function () {
            //console.log("\nEstoy en el evento\n");
        },
        function () {
            //console.log("Se ejecuta bien: Se ha respondido bien");
            // floor.changeColor(0x00ff00);
            game.switchSpotLight();
        },
        function() {
            //console.log("Se ejecuta mal; No se ha respondido bien, se ha fallado el evento");
            // floor.changeColor(0xff0000);
            game.switchSpotLight();
        },
        function() {
            //console.log("Has respondido mal, pero no tiene porque haber fallado el evento");
        });
    return event;
}

EventFactory.prototype.bossEvent = function (tile) {
    var event = new Event (10, [KEYCODE_A, KEYCODE_D], 2);
    event.setFunctions(
        [
            function() {
				//console.log("Cosas para hacer antes del evento.");
                game.switchSpotLight();
                //TODO Start counter and update progress bar
                //TODO render dialog
                populateDialog(tile.question, tile.options);
                $(".dialog").css("visibility", "visible");

            },
            function () {
                //console.log("Pulsa A para responder bien");
            },
            function () {
                //console.log("También puedes pulsar D")

            },
            //TODO stick camera to look ahead
			game.cameraEffects.getEffect(LOOK_AHEAD)
        ],
        function () {
            //console.log("\nEstoy en el evento\n");
            //TODO wait for annyang command
        },
        function () {
            //console.log("Se ejecuta bien: Se ha respondido bien");
            // floor.changeColor(0x00ff00);
            game.switchSpotLight();
        },
        function() {
            //console.log("Se ejecuta mal; No se ha respondido bien, se ha fallado el evento");
            // floor.changeColor(0xff0000);
            game.switchSpotLight();
        },
        function() {
            //console.log("Has respondido mal, pero no tiene porque haber fallado el evento");
            //TODO restore camera to normal position
            $(".dialog").css("visibility", "hidden");
        });
    return event;
}

var populateDialog = function(question, options){
    $(".dialog .question").html(question);
    for(var i = 0; i < options.length; i++){
        $($(".dialog .option")[i]).html(options[i]);
    }
}