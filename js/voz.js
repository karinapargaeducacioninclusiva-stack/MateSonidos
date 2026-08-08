// ======================================
// MateSonidos - Voz
// ======================================

function hablar(texto) {

    if (!("speechSynthesis" in window)) {

        console.log("El navegador no permite síntesis de voz.");

        return;

    }

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";
    voz.rate = 0.75;
    voz.pitch = 1;

    speechSynthesis.speak(voz);

}


// ======================================
// Detener voz
// ======================================

function limpiarVoz() {

    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

    }

}