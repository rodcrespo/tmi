var testEvent = function (floor) {
    this.badAnswer = "Has respondido mal ";
    this.cont = 0;
    event = new Event (10, [KEYCODE_A, KEYCODE_D], 2);
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
            //animation2Start(10, 2)
        ],
        function () {
            //console.log("\nEstoy en el evento\n");
        },
        function () {
            //console.log("Se ejecuta bien: Se ha respondido bien");
            floor.changeColor(0x00ff00);
            game.switchSpotLight();
        },
        function() {
            //console.log("Se ejecuta mal; No se ha respondido bien");
            floor.changeColor(0xff0000);
            game.switchSpotLight();
        },
        function() {
            this.cont += 1;
            //console.log(this.badAnswer + this.cont + " veces");
        });
    return event;
}