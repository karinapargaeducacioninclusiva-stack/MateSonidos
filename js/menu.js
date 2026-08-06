// =====================================
// MateSonidos
// Menú accesible 2.0
// =====================================

document.addEventListener("DOMContentLoaded", iniciarMenu);

let opcion = 0;

const opciones = [
    {
        id: "continuar",
        texto: "Continuar el último nivel jugado.",
        accion: continuar
    },
    {
        id: "nivel1",
        texto: "Nivel 1. Conozco los números.",
        accion: function () {
            location.href = "numeros.html";
        }
    },
    {
        id: "nivel2",
        texto: "Nivel 2. Ordena los números.",
        accion: function () {
            location.href = "secuencias.html";
        }
    },
    {
        id: "configuracion",
        texto: "Configuración. Próximamente."
    },
    {
        id: "ayuda",
        texto: "Ayuda. Próximamente."
    }
];

function iniciarMenu() {

    actualizarSeleccion();

}

function actualizarSeleccion() {

    opciones.forEach(function(op){

        document.getElementById(op.id).classList.remove("menuActivo");

    });

    document.getElementById(opciones[opcion].id)
        .classList.add("menuActivo");

}

function hablar(texto){

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";
    voz.rate = 0.70;

    speechSynthesis.speak(voz);

}

document.addEventListener("keydown", function(e){

    if(e.key === "ArrowDown"){

        opcion++;

        if(opcion >= opciones.length){

            opcion = 0;

        }

        actualizarSeleccion();

        hablar(opciones[opcion].texto);

    }

    if(e.key === "ArrowUp"){

        opcion--;

        if(opcion < 0){

            opcion = opciones.length - 1;

        }

        actualizarSeleccion();

        hablar(opciones[opcion].texto);

    }

    if(e.key === " "){

        e.preventDefault();

        hablar(opciones[opcion].texto);

    }

    if(e.key === "Enter"){

        if(opciones[opcion].accion){

            opciones[opcion].accion();

        }

    }

});