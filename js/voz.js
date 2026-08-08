// ======================================
// MateSonidos
// Sistema de voz accesible
// ======================================


// --------------------------------------
// Hablar
// --------------------------------------

function hablar(texto){

    speechSynthesis.cancel();

    const voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    // Velocidad lenta
    voz.rate = 0.50;

    voz.pitch = 1;

    voz.volume = 1;

    speechSynthesis.speak(voz);

}


// --------------------------------------
// Limpiar voz
// --------------------------------------

function limpiarVoz(){

    speechSynthesis.cancel();

}