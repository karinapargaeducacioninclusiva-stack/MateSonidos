// =====================================
// MateSonidos
// Navegación accesible del menú
// =====================================

document.addEventListener("DOMContentLoaded", iniciarMenu);
console.log("menu.js cargado");
let botones = [];
let opcion = 0;

function iniciarMenu() {

    botones = [

        {
            elemento: document.querySelector("button[onclick=\"location.href='numeros.html'\"]"),
            texto: "Nivel 1. Conozco los números."
        },

        {
            elemento: document.querySelector("button[onclick=\"location.href='secuencias.html'\"]"),
            texto: "Nivel 2. Ordena los números."
        }

    ];

    seleccionar(0);

    setTimeout(function () {

        hablar("Bienvenido a MateSonidos.");

    },500);

}

function hablar(texto){

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang="es-ES";

    voz.rate=0.75;

    speechSynthesis.speak(voz);

}

function seleccionar(indice){

    botones.forEach(function(b){

        b.elemento.classList.remove("menuActivo");

    });

    opcion = indice;

    botones[opcion].elemento.classList.add("menuActivo");

    hablar(botones[opcion].texto);

}

document.addEventListener("keydown",function(e){

    if(e.key=="ArrowDown"){

        let nuevo = opcion + 1;

        if(nuevo>=botones.length){

            nuevo=0;

        }

        seleccionar(nuevo);

    }

    if(e.key=="ArrowUp"){

        let nuevo = opcion - 1;

        if(nuevo<0){

            nuevo=botones.length-1;

        }

        seleccionar(nuevo);

    }

    if(e.key=="Enter"){

        botones[opcion].elemento.click();

    }

});