// ======================================
// MateSonidos - Nivel 3.4
// Comparo números
// ======================================

let numero1 = 0;
let numero2 = 0;

let tipoPregunta = "";

let respuestaCorrecta = "";

let pregunta = 1;
let aciertos = 0;
let errores = 0;

const totalPreguntas = 5;


// ======================================
// INICIAR
// ======================================

document.addEventListener("DOMContentLoaded", iniciarJuego);


function iniciarJuego() {

    console.log("COMPARO 3.4 CARGADO");

    actualizarBarra();

    nuevaPregunta();
}


// ======================================
// NUEVA PREGUNTA
// ======================================

function nuevaPregunta() {

    numero1 = Math.floor(Math.random() * 10) + 1;

    numero2 = Math.floor(Math.random() * 10) + 1;


    const tipos = [
        "mayor",
        "menor",
        "igual"
    ];

    const posicion =
        Math.floor(Math.random() * tipos.length);

    tipoPregunta = tipos[posicion];


    // Determinar respuesta correcta

    if (tipoPregunta === "mayor") {

        respuestaCorrecta =
            numero1 > numero2
                ? numero1.toString()
                : numero2.toString();

    }


    if (tipoPregunta === "menor") {

        respuestaCorrecta =
            numero1 < numero2
                ? numero1.toString()
                : numero2.toString();

    }


    if (tipoPregunta === "igual") {

        respuestaCorrecta =
            numero1 === numero2
                ? "si"
                : "no";

    }


    // Mostrar números

    document.getElementById("numeros").textContent =
        numero1 + "     " + numero2;


    // Mostrar consigna

    if (tipoPregunta === "mayor") {

        document.getElementById("consigna").textContent =
            "¿Cuál es mayor?";

    }


    if (tipoPregunta === "menor") {

        document.getElementById("consigna").textContent =
            "¿Cuál es menor?";

    }


    if (tipoPregunta === "igual") {

        document.getElementById("consigna").textContent =
            "¿Son iguales? Escribe sí o no.";

    }


    // Limpiar respuesta

    document.getElementById("respuesta").value = "";

    document.getElementById("resultado").textContent = "";

    actualizarBarra();
}


// ======================================
// REPETIR PREGUNTA
// ======================================

function repetir() {

    // Detener cualquier voz anterior
    window.speechSynthesis.cancel();

    // Esperar a que Chrome termine de cancelar la voz anterior
    setTimeout(function () {

        let texto =
            "Primer número: " +
            numero1 +
            ". Segundo número: " +
            numero2 +
            ". ";

        if (tipoPregunta === "mayor") {

            texto += "¿Cuál es mayor?";

        }

        if (tipoPregunta === "menor") {

            texto += "¿Cuál es menor?";

        }

        if (tipoPregunta === "igual") {

            texto +=
                "¿Son iguales? Responde sí o no.";

        }

        const voz =
            new SpeechSynthesisUtterance(texto);

        voz.lang = "es-ES";
        voz.rate = 0.45;
        voz.pitch = 1;
        voz.volume = 1;

        window.speechSynthesis.speak(voz);

    }, 400);
}

// ======================================
// ACTUALIZAR PROGRESO
// ======================================

function actualizarBarra() {

    document.getElementById("pregunta").textContent =
        "📘 Pregunta " +
        pregunta +
        " de " +
        totalPreguntas;


    document.getElementById("barra").style.width =
        (pregunta / totalPreguntas * 100) + "%";
}


// ======================================
// CORREGIR
// ======================================

function corregir() {

    const campo =
        document.getElementById("respuesta");

    const respuesta =
        campo.value.trim().toLowerCase();


    if (respuesta === "") {

        hablar("Escribe una respuesta.");

        return;
    }


    let respuestaUsuario = "";


    // Pregunta de igualdad

    if (tipoPregunta === "igual") {

        if (
            respuesta === "si" ||
            respuesta === "sí"
        ) {

            respuestaUsuario = "si";

        } else if (respuesta === "no") {

            respuestaUsuario = "no";

        } else {

            hablar(
                "Responde sí o no."
            );

            return;
        }

    }


    // Pregunta de mayor o menor

    else {

        const numero =
            Number(respuesta);


        if (Number.isNaN(numero)) {

            hablar(
                "Escribe un número."
            );

            return;
        }


        respuestaUsuario =
            numero.toString();
    }


    // ==================================
    // RESPUESTA CORRECTA
    // ==================================

    if (
        respuestaUsuario ===
        respuestaCorrecta
    ) {

        aciertos++;


        document.getElementById("resultado").textContent =
            "✅ Correcto";


        document.getElementById("aciertos").textContent =
            "⭐ Aciertos: " +
            aciertos;


        hablar(
            "Muy bien. Respuesta correcta."
        );

    }


    // ==================================
    // RESPUESTA INCORRECTA
    // ==================================

    else {

        errores++;


        document.getElementById("resultado").textContent =
            "❌ Incorrecto";


        document.getElementById("errores").textContent =
            "❌ Errores: " +
            errores;


        hablar(
            "Incorrecto. Intenta nuevamente."
        );


        return;
    }


    // ==================================
    // SIGUIENTE PREGUNTA
    // ==================================

    if (pregunta >= totalPreguntas) {

        setTimeout(
            terminarNivel,
            2000
        );

        return;
    }


    pregunta++;


    setTimeout(
        nuevaPregunta,
        2000
    );
}


// ======================================
// FINAL DEL NIVEL
// ======================================

function terminarNivel() {

    limpiarVoz();


    hablar(
        "Felicitaciones. " +
        "Terminaste el Nivel 3.4. " +
        "Comparo números."
    );


    document.querySelector("main").innerHTML =

        "<h1>🎉 ¡Muy bien!</h1>" +

        "<h2>Terminaste Nivel 3.4</h2>" +

        "<p>Comparo números</p>" +

        "<p>⭐ Aciertos: " +
        aciertos +
        "</p>" +

        "<p>❌ Errores: " +
        errores +
        "</p>" +

        "<br>" +

        "<button onclick=\"location.reload()\">" +
        "🔄 Volver a jugar" +
        "</button>" +

        "<br><br>" +

        "<button onclick=\"window.location='index.html'\">" +
        "🏠 Volver al menú principal" +
        "</button>";
}


// ======================================
// VOLVER AL MENÚ
// ======================================

function volverMenu() {

    limpiarVoz();

    window.location.href =
        "index.html";
}


// ======================================
// ENTER
// ======================================

document.addEventListener(
    "keydown",
    function(e) {

        if (e.key === "Enter") {

            const respuesta =
                document.getElementById("respuesta");


            if (
                document.activeElement ===
                respuesta
            ) {

                e.preventDefault();

                corregir();
            }
        }
    }
);