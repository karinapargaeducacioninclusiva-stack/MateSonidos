// ======================================
// MateSonidos
// Sistema de voz
// ======================================

let colaVoz = [];
let hablando = false;

// -------------------------------
// Hablar
// -------------------------------

function hablar(texto){

    colaVoz.push(texto);

    if(!hablando){

        siguienteMensaje();

    }

}

// -------------------------------
// Leer siguiente mensaje
// -------------------------------

function siguienteMensaje(){

    if(colaVoz.length === 0){

        hablando = false;
        return;

    }

    hablando = true;

    const mensaje = colaVoz.shift();

    const voz = new SpeechSynthesisUtterance(mensaje);

    voz.lang = "es-ES";
    voz.rate = 0.75;
    voz.pitch = 1;

    voz.onend = function(){

        siguienteMensaje();

    };

    speechSynthesis.speak(voz);

}

// -------------------------------
// Limpiar voz
// -------------------------------

function limpiarVoz(){

    speechSynthesis.cancel();

    colaVoz = [];

    hablando = false;

}