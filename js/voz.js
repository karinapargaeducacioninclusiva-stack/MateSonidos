// ======================================
// MateSonidos
// Sistema de voz accesible
// ======================================

let vozActual = null;
let temporizadorVoz = null;


// ======================================
// HABLAR
// ======================================

function hablar(texto){

    // Cancelar cualquier lectura pendiente
    if(temporizadorVoz !== null){

        clearTimeout(temporizadorVoz);

        temporizadorVoz = null;

    }

    // Detener voz anterior
    window.speechSynthesis.cancel();


    vozActual =
        new SpeechSynthesisUtterance(texto);

    vozActual.lang = "es-ES";

    // Velocidad base de MateSonidos
    vozActual.rate = 0.50;

    vozActual.pitch = 1;

    vozActual.volume = 1;


    // Pequeña pausa antes de comenzar
    temporizadorVoz = setTimeout(function(){

        window.speechSynthesis.speak(vozActual);

        temporizadorVoz = null;

    }, 250);

}


// ======================================
// LIMPIAR VOZ
// ======================================

function limpiarVoz(){

    if(temporizadorVoz !== null){

        clearTimeout(temporizadorVoz);

        temporizadorVoz = null;

    }

    window.speechSynthesis.cancel();

    vozActual = null;

}