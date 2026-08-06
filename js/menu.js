// =====================================
// MateSonidos
// Menú accesible
// =====================================

document.addEventListener("DOMContentLoaded", iniciarMenu);

let botones = [];
let opcion = 0;
let bienvenidaDicha = false;

function iniciarMenu() {

    console.log("menu.js cargado");

    botones = [

        {
            elemento: document.querySelector("button[onclick=\"location.href='numeros.html'\"]"),
            texto: "Nivel 1. Conozco los números."
        },

        {
            elemento: document.querySelector("button[onclick=\"location.href='secuencias.html'\"]"),
            texto: "Nivel 2. Ordena los números."
        },

        {
            elemento: document.querySelector("button[onclick='continuar()']"),
            texto: "Continuar el último nivel jugado."
        }

    ];

    // Elimina botones inexistentes
    botones = botones.filter(function(b){
        return b.elemento != null;
    });

    if(botones.length == 0){
        return;
    }

    opcion = 0;

    botones[0].elemento.classList.add("menuActivo");

}

function hablar(texto){

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";
    voz.rate = 0.65;

    speechSynthesis.speak(voz);

}

document.addEventListener("keydown", function(e){

    // Primera interacción del usuario
    if(!bienvenidaDicha){

        bienvenidaDicha = true;

        hablar("Bienvenido a MateSonidos. Usa las flechas arriba y abajo para elegir un nivel. Presiona Enter para comenzar.");

        return;
    }

    if(e.key == "ArrowDown"){

        botones[opcion].elemento.classList.remove("menuActivo");

        opcion++;

        if(opcion >= botones.length){
            opcion = 0;
        }

        botones[opcion].elemento.classList.add("menuActivo");

        hablar(botones[opcion].texto);

    }

    if(e.key == "ArrowUp"){

        botones[opcion].elemento.classList.remove("menuActivo");

        opcion--;

        if(opcion < 0){
            opcion = botones.length - 1;
        }

        botones[opcion].elemento.classList.add("menuActivo");

        hablar(botones[opcion].texto);

    }

    if(e.key == "Enter"){

        botones[opcion].elemento.click();

    }

});