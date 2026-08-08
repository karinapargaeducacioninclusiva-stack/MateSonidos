// ======================================
// MateSonidos
// Sistema de voz accesible
// ======================================

let vozActual = null;

// --------------------------------------
// Hablar
// --------------------------------------

function hablar(texto) {

    // Detener cualquier voz anterior
    window.speechSynthesis.cancel();

    // Crear nueva voz
    vozActual =
        new SpeechSynthesisUtterance(texto);

    vozActual.lang = "es-ES";

    // Más lenta para favorecer la comprensión
    vozActual.rate = 0.45;

    vozActual.pitch = 1;

    vozActual.volume = 1;

    // Esperar un instante antes de reproducir
    setTimeout(function () {

        window.speechSynthesis.speak(vozActual);

    }, 100);

}


// --------------------------------------
// Limpiar voz
// --------------------------------------

function limpiarVoz() {

    window.speechSynthesis.cancel();

    vozActual = null;

}