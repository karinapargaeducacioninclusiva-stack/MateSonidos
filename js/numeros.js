// ===============================
// MATESONIDOS - NIVEL 1
// Conozco los números
// ===============================

// Variables

let numeroCorrecto;

let pregunta = 1;

let aciertos = 0;

let errores = 0;


// Lista de números del 1 al 10
// Se mezclan al comenzar
// y no se repiten durante la partida

let numerosDisponibles = [];


// ===============================
// VOZ
// ===============================

function hablar(texto) {

    speechSynthesis.cancel();

    const voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    // Velocidad lenta
    // Pensada para facilitar
    // la identificación auditiva

    voz.rate = 0.50;

    voz.pitch = 1;

    voz.volume = 1;

    speechSynthesis.speak(voz);

}


// ===============================
// PREPARAR NÚMEROS
// ===============================

function prepararNumeros() {

    numerosDisponibles = [

        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10

    ];


    // Mezclar los números
    // sin eliminar ninguno

    for (
        let i =
            numerosDisponibles.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            numerosDisponibles[i],
            numerosDisponibles[j]

        ] = [

            numerosDisponibles[j],
            numerosDisponibles[i]

        ];

    }

}


// ===============================
// NUEVO NÚMERO
// ===============================

function nuevoNumero() {

    numeroCorrecto =
        numerosDisponibles[
            pregunta - 1
        ];


    // Mostrar número visualmente

    document
        .getElementById("numero")
        .textContent =
        numeroCorrecto;


    // Animación

    const circulo =
        document.querySelector(
            ".circulo"
        );


    if (circulo) {

        circulo.style.animation =
            "none";

        circulo.offsetHeight;

        circulo.style.animation =
            "aparecer .3s";

    }


    // Limpiar respuesta

    document
        .getElementById("respuesta")
        .value = "";


    // Limpiar resultado

    document
        .getElementById("resultado")
        .textContent = "";


    // Actualizar progreso

    actualizarBarra();


    // Llevar foco al campo

    document
        .getElementById("respuesta")
        .focus();


    // Leer automáticamente

    leerNumero();

}


// ===============================
// LEER NÚMERO
// ===============================

function leerNumero() {

    speechSynthesis.cancel();


    const vozNumero =
        new SpeechSynthesisUtterance(
            "Número: " +
            numeroCorrecto +
            "."
        );


    vozNumero.lang =
        "es-ES";


    // Muy lento y claro

    vozNumero.rate =
        0.50;


    vozNumero.pitch =
        1;


    vozNumero.volume =
        1;


    // Cuando termina de decir
    // el número, esperamos
    // un segundo antes de
    // hacer la pregunta.

    vozNumero.onend =
        function() {

            setTimeout(
                function() {

                    const vozPregunta =
                        new SpeechSynthesisUtterance(
                            "¿Qué número es?"
                        );


                    vozPregunta.lang =
                        "es-ES";


                    vozPregunta.rate =
                        0.50;


                    vozPregunta.pitch =
                        1;


                    vozPregunta.volume =
                        1;


                    speechSynthesis.speak(
                        vozPregunta
                    );

                },
                1000
            );

        };


    speechSynthesis.speak(
        vozNumero
    );

}


// ===============================
// REPETIR
// ===============================

function repetir() {

    leerNumero();

}


// ===============================
// ACTUALIZAR BARRA
// ===============================

function actualizarBarra() {

    const porcentaje =
        (
            pregunta /
            10
        ) * 100;


    document
        .getElementById("barra")
        .style.width =
        porcentaje + "%";


    document
        .getElementById("pregunta")
        .textContent =
        "📘 Pregunta " +
        pregunta +
        " de 10";

}


// ===============================
// TERMINAR JUEGO
// ===============================

function terminarJuego() {

    speechSynthesis.cancel();


    hablar(
        "Felicitaciones. " +
        "Terminaste el Nivel 1. " +
        "Tuviste " +
        aciertos +
        " aciertos de 10."
    );


    let mensaje = "";


    if (aciertos == 10) {

        mensaje =
            "🏆 ¡Excelente trabajo!";

    }

    else if (aciertos >= 8) {

        mensaje =
            "🌟 ¡Muy bien!";

    }

    else if (aciertos >= 6) {

        mensaje =
            "👍 ¡Buen trabajo! " +
            "Sigue practicando.";

    }

    else {

        mensaje =
            "💪 ¡No te rindas! " +
            "Cada intento te ayuda a aprender.";

    }


    document
        .querySelector("main")
        .innerHTML = `

<h1>🎉 ¡Felicitaciones!</h1>

<h2>Terminaste el Nivel 1</h2>

<p>${mensaje}</p>

<p>⭐ Aciertos: ${aciertos}</p>

<p>❌ Errores: ${errores}</p>

<br>

<button onclick="location.reload()">
🔄 Jugar otra vez
</button>

<br><br>

<button onclick="window.location='index.html'">
🏠 Volver al menú principal
</button>

`;

}


// ===============================
// CORREGIR RESPUESTA
// ===============================

function corregir() {

    const respuesta =
        document
            .getElementById("respuesta")
            .value
            .trim();


    // No escribió nada

    if (respuesta === "") {

        speechSynthesis.cancel();


        hablar(
            "Escribe un número."
        );


        return;

    }


    // =============================
    // RESPUESTA CORRECTA
    // =============================

    if (
        Number(respuesta) ===
        numeroCorrecto
    ) {

        aciertos++;


        document
            .getElementById("resultado")
            .textContent =
            "✅ ¡Correcto!";


        document
            .getElementById("aciertos")
            .textContent =
            "⭐ Aciertos: " +
            aciertos;


        speechSynthesis.cancel();


        hablar(
            "Correcto."
        );

    }


    // =============================
    // RESPUESTA INCORRECTA
    // =============================

    else {

        errores++;


        document
            .getElementById("resultado")
            .textContent =
            "❌ Incorrecto";


        document
            .getElementById("errores")
            .textContent =
            "❌ Errores: " +
            errores;


        speechSynthesis.cancel();


        hablar(
            "Incorrecto."
        );

    }


    // =============================
    // FIN DE LAS 10 PREGUNTAS
    // =============================

    if (pregunta >= 10) {

        setTimeout(
            terminarJuego,
            1500
        );


        return;

    }


    // =============================
    // SIGUIENTE PREGUNTA
    // =============================

    pregunta++;


    guardarDato(
        "ultimoNivel",
        1
    );


    actualizarBarra();


    setTimeout(
        function() {

            nuevoNumero();

        },
        1500
    );

}


// ===============================
// ENTER PARA RESPONDER
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const respuesta =
            document.getElementById(
                "respuesta"
            );


        if (respuesta) {

            respuesta.addEventListener(
                "keydown",
                function(e) {

                    if (
                        e.key === "Enter"
                    ) {

                        e.preventDefault();

                        corregir();

                    }

                }
            );

        }

    }
);


// ===============================
// VOLVER AL MENÚ
// ===============================

function volverMenu() {

    const salir =
        confirm(
            "¿Desea volver al menú principal?\n\n" +
            "Se perderá el progreso de esta partida."
        );


    if (salir) {

        speechSynthesis.cancel();


        window.location.href =
            "index.html";

    }

}


// ===============================
// INICIO
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        prepararNumeros();

        actualizarBarra();

        nuevoNumero();

    }
);