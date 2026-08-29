// ===============================
// MATESONIDOS - NIVEL 1
// Conozco los números
// ===============================

// Variables

let numeroCorrecto;

let pregunta = 1;

let aciertos = 0;

let errores = 0;


// Números del 1 al 10
// Se utilizan todos una sola vez

let numerosDisponibles = [];


// ===============================
// VOZ
// ===============================

function hablar(texto) {

    speechSynthesis.cancel();


    const voz =
        new SpeechSynthesisUtterance(texto);


    voz.lang =
        "es-ES";


    // Lectura lenta

    voz.rate =
        0.45;


    voz.pitch =
        1;


    voz.volume =
        1;


    speechSynthesis.speak(
        voz
    );

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


    // Mostrar visualmente

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


    // Llevar foco

    document
        .getElementById("respuesta")
        .focus();


    // Presentar el número

    presentarNumero();

}


// ===============================
// PRESENTAR NÚMERO
// ===============================

function presentarNumero() {

    speechSynthesis.cancel();


    // Primera voz:
    // solamente anuncia que debe escuchar

    const aviso =
        new SpeechSynthesisUtterance(
            "Escucha."
        );


    aviso.lang =
        "es-ES";


    aviso.rate =
        0.45;


    aviso.pitch =
        1;


    aviso.volume =
        1;


    aviso.onend =
        function() {

            // Pausa real antes del número

            setTimeout(
                function() {

                    decirNumero();

                },
                1200
            );

        };


    speechSynthesis.speak(
        aviso
    );

}


// ===============================
// DECIR NÚMERO
// ===============================

function decirNumero() {

    speechSynthesis.cancel();


    const vozNumero =
        new SpeechSynthesisUtterance(
            numeroEnPalabra(
                numeroCorrecto
            )
        );


    vozNumero.lang =
        "es-ES";


    vozNumero.rate =
        0.45;


    vozNumero.pitch =
        1;


    vozNumero.volume =
        1;


    vozNumero.onend =
        function() {

            // Pausa larga después
            // de decir el número

            setTimeout(
                function() {

                    decirConsigna();

                },
                2000
            );

        };


    speechSynthesis.speak(
        vozNumero
    );

}


// ===============================
// CONSIGNA
// ===============================

function decirConsigna() {

    speechSynthesis.cancel();


    hablar(
        "Escribe el número que escuchaste."
    );

}


// ===============================
// REPETIR
// ===============================

function repetir() {

    presentarNumero();

}


// ===============================
// NÚMERO EN PALABRA
// ===============================

function numeroEnPalabra(numero) {

    const palabras = [

        "",

        "uno",

        "dos",

        "tres",

        "cuatro",

        "cinco",

        "seis",

        "siete",

        "ocho",

        "nueve",

        "diez"

    ];


    return palabras[numero];

}


// ===============================
// BARRA
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
// CORREGIR
// ===============================

function corregir() {

    const respuesta =
        document
            .getElementById("respuesta")
            .value
            .trim();


    // Sin respuesta

    if (
        respuesta === ""
    ) {

        speechSynthesis.cancel();


        hablar(
            "Escribe un número."
        );


        return;

    }


    // =============================
    // CORRECTO
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
    // INCORRECTO
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
    // FIN
    // =============================

    if (
        pregunta >= 10
    ) {

        setTimeout(
            terminarJuego,
            1800
        );


        return;

    }


    // =============================
    // SIGUIENTE
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
        1800
    );

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


    if (
        aciertos == 10
    ) {

        mensaje =
            "🏆 ¡Excelente trabajo!";

    }

    else if (
        aciertos >= 8
    ) {

        mensaje =
            "🌟 ¡Muy bien!";

    }

    else if (
        aciertos >= 6
    ) {

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
// ENTER
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