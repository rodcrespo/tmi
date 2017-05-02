var testEvent = function () {
    event = new Event (10, [KEYCODE_A, KEYCODE_D], 3);
    event.setFunctions(
        [
            function() {
            console.log("Cosas para hacer antes del evento.");
            },
            function () {
                console.log("Pulsa A para responder bien");
            },
            function () {
                console.log("También puedes pulsar D")
            }
        ],
        function () {
            console.log("\nEstoy en el evento\n");
        },
        function () {
            console.log("Se ejecuta bien: Se ha respondido bien");
        },
        function() {
            console.log("Se ejecuta mal; No se ha respondido bien")
        });
    return event;
}