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
let numerosDisponibles = [];


// -------------------------------
// Voz
// -------------------------------
function hablar(texto) {

    speechSynthesis.cancel();

    const voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    // Velocidad accesible
    voz.rate = 0.75;

    voz.pitch = 1;

    voz.volume = 1;

    speechSynthesis.speak(voz);

}


// -------------------------------
// Crear lista 1 al 10
// sin repetir
// -------------------------------
function prepararNumeros() {

    numerosDisponibles = [
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10
    ];

    // Mezclar la lista
    for (
        let i = numerosDisponibles.length - 1;
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


// -------------------------------
// Generar nuevo número
// -------------------------------
function nuevoNumero() {

    // Tomar el siguiente número
    // de la lista mezclada

    numeroCorrecto =
        numerosDisponibles[pregunta - 1];


    document
        .getElementById("numero")
        .textContent =
        numeroCorrecto;


    hablar(
        "Número: " +
        numeroCorrecto +
        ". ¿Qué número es?"
    );


    const circulo =
        document.querySelector(".circulo");


    if (circulo) {

        circulo.style.animation = "none";

        circulo.offsetHeight;

        circulo.style.animation =
            "aparecer .3s";

    }


    document
        .getElementById("respuesta")
        .value = "";


    document
        .getElementById("respuesta")
        .focus();

}


// -------------------------------
// Repetir consigna
// -------------------------------
function repetir() {

    hablar(
        "Número: " +
        numeroCorrecto +
        ". ¿Qué número es?"
    );

}


// -------------------------------
// Actualizar barra
// -------------------------------
function actualizarBarra() {

    let porcentaje =
        (pregunta / 10) * 100;


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


// -------------------------------
// Terminar juego
// -------------------------------
function terminarJuego() {

    hablar(
        "Felicitaciones. " +
        "Terminaste el Nivel 1."
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


// -------------------------------
// Corregir respuesta
// -------------------------------
function corregir() {

    let respuesta =
        document
            .getElementById("respuesta")
            .value
            .trim();


    if (respuesta == "") {

        hablar(
            "Escribe un número."
        );

        return;

    }


    if (
        Number(respuesta) ===
        numeroCorrecto
    ) {

        hablar(
            "Correcto."
        );


        document
            .getElementById("resultado")
            .textContent =
            "✅ ¡Correcto!";


        aciertos++;


        document
            .getElementById("aciertos")
            .textContent =
            "⭐ Aciertos: " +
            aciertos;

    }

    else {

        hablar(
            "Incorrecto."
        );


        document
            .getElementById("resultado")
            .textContent =
            "❌ Incorrecto";


        errores++;


        document
            .getElementById("errores")
            .textContent =
            "❌ Errores: " +
            errores;

    }


    // ---------------------------
    // Fin de las 10 preguntas
    // ---------------------------

    if (pregunta >= 10) {

        setTimeout(
            terminarJuego,
            1200
        );

        return;

    }


    pregunta++;


    actualizarBarra();


    guardarDato(
        "ultimoNivel",
        1
    );


    setTimeout(
        function() {

            document
                .getElementById("resultado")
                .textContent = "";


            nuevoNumero();

        },
        1200
    );

}


// -------------------------------
// Eventos
// -------------------------------
document
    .getElementById("respuesta")
    .addEventListener(
        "keydown",
        function(e) {

            if (e.key === "Enter") {

                e.preventDefault();

                corregir();

            }

        }
    );


// -------------------------------
// Volver al menú
// -------------------------------
function volverMenu() {

    const salir =
        confirm(
            "¿Desea volver al menú principal?\n\n" +
            "Se perderá el progreso de esta partida."
        );


    if (salir) {

        window.location.href =
            "index.html";

    }

}


// -------------------------------
// Inicio
// -------------------------------

prepararNumeros();

actualizarBarra();

nuevoNumero();

document
    .getElementById("respuesta")
    .focus();