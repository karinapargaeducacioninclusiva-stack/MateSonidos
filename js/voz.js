// =========================
// Sistema de voz MateSonidos
// =========================

let vozActiva = true;

function hablar(texto){

    if(!vozActiva) return;

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

voz.rate = 0.7;

    speechSynthesis.speak(voz);

}

function activarVoz(){

    vozActiva = true;

}

function desactivarVoz(){

    vozActiva = false;

}

function cambiarVelocidad(valor){

    window.velocidadVoz = valor;

}