// ======================================
// MateSonidos - Nivel 3.4
// Comparo números
// Voz accesible y controlada
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
// INICIO
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarJuego
);


function iniciarJuego() {

    actualizarBarra();

    nuevaPregunta();

}


// ======================================
// NUEVA PREGUNTA
// ======================================

function nuevaPregunta() {

    // Números del 1 al 5

    numero1 =
        Math.floor(
            Math.random() * 5
        ) + 1;


    numero2 =
        Math.floor(
            Math.random() * 5
        ) + 1;


    // Tipo de pregunta

    const tipos = [
        "mayor",
        "menor",
        "igual"
    ];


    tipoPregunta =
        tipos[
            Math.floor(
                Math.random() *
                tipos.length
            )
        ];


    // ==================================
    // RESPUESTA CORRECTA
    // ==================================

    if (
        tipoPregunta === "mayor"
    ) {

        respuestaCorrecta =
            Math.max(
                numero1,
                numero2
            ).toString();

    }

    else if (
        tipoPregunta === "menor"
    ) {

        respuestaCorrecta =
            Math.min(
                numero1,
                numero2
            ).toString();

    }

    else {

        respuestaCorrecta =
            numero1 === numero2
                ? "si"
                : "no";

    }


    // ==================================
    // MOSTRAR NÚMEROS
    // ==================================

    document
        .getElementById("numeros")
        .textContent =
        numero1 +
        "     " +
        numero2;


    // ==================================
    // MOSTRAR CONSIGNA
    // ==================================

    const consigna =
        document.getElementById(
            "consigna"
        );


    if (
        tipoPregunta === "mayor"
    ) {

        consigna.textContent =
            "¿Cuál es mayor?";

    }

    else if (
        tipoPregunta === "menor"
    ) {

        consigna.textContent =
            "¿Cuál es menor?";

    }

    else {

        consigna.textContent =
            "¿Son iguales? Escribe sí o no.";

    }


    // ==================================
    // LIMPIAR
    // ==================================

    document
        .getElementById("respuesta")
        .value = "";


    document
        .getElementById("resultado")
        .textContent = "";


    actualizarBarra();


    document
        .getElementById("respuesta")
        .focus();


    // ==================================
    // LECTURA AUTOMÁTICA
    // ==================================

    setTimeout(
        function () {

            presentarPregunta();

        },
        700
    );

}


// ======================================
// PRESENTAR PREGUNTA
// ======================================

function presentarPregunta() {

    detenerVoz();


    // Primero presentamos el contexto

    decir(
        "Nivel 3.4. Comparo números."
    );


    esperar(
        1800,
        function () {

            decir(
                "Escucha."
            );


            esperar(
                1200,
                function () {

                    decir(
                        "Primer número: " +
                        numeroEnPalabra(numero1)
                    );


                    esperar(
                        1800,
                        function () {

                            decir(
                                "Segundo número: " +
                                numeroEnPalabra(numero2)
                            );


                            esperar(
                                1800,
                                function () {

                                    decirConsigna();

                                }
                            );

                        }
                    );

                }
            );

        }
    );

}


// ======================================
// CONSIGNA
// ======================================

function decirConsigna() {

    let texto = "";


    if (
        tipoPregunta === "mayor"
    ) {

        texto =
            "¿Cuál es mayor? " +
            "Escribe el número mayor.";

    }

    else if (
        tipoPregunta === "menor"
    ) {

        texto =
            "¿Cuál es menor? " +
            "Escribe el número menor.";

    }

    else {

        texto =
            "¿Son iguales? " +
            "Escribe sí o no.";

    }


    decir(texto);


    esperar(
        1200,
        function () {

            decir(
                "Presiona Enter para comprobar."
            );

        }
    );

}


// ======================================
// DECIR
// ======================================

function decir(texto) {

    detenerSoloTemporizador();


    const voz =
        new SpeechSynthesisUtterance(
            texto
        );


    voz.lang = "es-ES";

    // Muy lento

    voz.rate = 0.45;

    voz.pitch = 1;

    voz.volume = 1;


    window.speechSynthesis.speak(
        voz
    );

}


// ======================================
// ESPERAR
// ======================================

function esperar(
    tiempo,
    funcion
) {

    detenerSoloTemporizador();


    temporizadorNivel3 =
        setTimeout(
            funcion,
            tiempo
        );

}


// Variable propia del Nivel 3

let temporizadorNivel3 = null;


// ======================================
// DETENER VOZ
// ======================================

function detenerVoz() {

    if (
        temporizadorNivel3 !== null
    ) {

        clearTimeout(
            temporizadorNivel3
        );

        temporizadorNivel3 = null;

    }


    window.speechSynthesis.cancel();

}


// ======================================
// DETENER SOLO TEMPORIZADOR
// ======================================

function detenerSoloTemporizador() {

    if (
        temporizadorNivel3 !== null
    ) {

        clearTimeout(
            temporizadorNivel3
        );

        temporizadorNivel3 = null;

    }

}


// ======================================
// REPETIR
// ======================================

function repetir() {

    presentarPregunta();

}


// ======================================
// NÚMERO EN PALABRA
// ======================================

function numeroEnPalabra(numero) {

    const palabras = [

        "",

        "uno",

        "dos",

        "tres",

        "cuatro",

        "cinco"

    ];


    return palabras[numero];

}


// ======================================
// BARRA
// ======================================

function actualizarBarra() {

    document
        .getElementById("pregunta")
        .textContent =
        "📘 Pregunta " +
        pregunta +
        " de " +
        totalPreguntas;


    document
        .getElementById("barra")
        .style.width =
        (
            pregunta /
            totalPreguntas *
            100
        ) +
        "%";

}


// ======================================
// CORREGIR
// ======================================

function corregir() {

    detenerVoz();


    const respuesta =
        document
            .getElementById("respuesta")
            .value
            .trim()
            .toLowerCase();


    // ==================================
    // SIN RESPUESTA
    // ==================================

    if (
        respuesta === ""
    ) {

        decir(
            "Escribe una respuesta."
        );

        return;

    }


    let respuestaUsuario = "";


    // ==================================
    // IGUAL
    // ==================================

    if (
        tipoPregunta === "igual"
    ) {

        if (
            respuesta === "si" ||
            respuesta === "sí"
        ) {

            respuestaUsuario =
                "si";

        }

        else if (
            respuesta === "no"
        ) {

            respuestaUsuario =
                "no";

        }

        else {

            decir(
                "Responde sí o no."
            );

            return;

        }

    }


    // ==================================
    // MAYOR / MENOR
    // ==================================

    else {

        const numero =
            Number(respuesta);


        if (
            Number.isNaN(numero)
        ) {

            decir(
                "Escribe un número."
            );

            return;

        }


        respuestaUsuario =
            numero.toString();

    }


    // ==================================
    // CORRECTO
    // ==================================

    if (
        respuestaUsuario ===
        respuestaCorrecta
    ) {

        aciertos++;


        document
            .getElementById("resultado")
            .textContent =
            "✅ Correcto";


        document
            .getElementById("aciertos")
            .textContent =
            "⭐ Aciertos: " +
            aciertos;


        decir(
            "Muy bien. " +
            "Respuesta correcta."
        );

    }


    // ==================================
    // INCORRECTO
    // ==================================

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


        decir(
            "Incorrecto. " +
            "Intenta nuevamente."
        );


        return;

    }


    // ==================================
    // FINAL
    // ==================================

    if (
        pregunta >=
        totalPreguntas
    ) {

        setTimeout(
            terminarNivel,
            1800
        );


        return;

    }


    // ==================================
    // SIGUIENTE
    // ==================================

    pregunta++;


    guardarDato(
        "ultimoNivel",
        3
    );


    setTimeout(
        nuevaPregunta,
        1800
    );

}


// ======================================
// TERMINAR NIVEL
// ======================================

function terminarNivel() {

    detenerVoz();


    decir(
        "Felicitaciones. " +
        "Terminaste el Nivel 3.4. " +
        "Comparo números. " +
        "Tuviste " +
        aciertos +
        " aciertos de " +
        totalPreguntas +
        "."
    );


    document
        .querySelector("main")
        .innerHTML =

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

        "<button onclick=\"volverMenu()\">" +

        "🏠 Volver al menú principal" +

        "</button>";

}


// ======================================
// VOLVER AL MENÚ
// ======================================

function volverMenu() {

    detenerVoz();


    window.location.href =
        "index.html";

}


// ======================================
// ENTER
// ======================================

document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key === "Enter"
        ) {

            const respuesta =
                document.getElementById(
                    "respuesta"
                );


            if (
                respuesta &&
                document.activeElement ===
                respuesta
            ) {

                e.preventDefault();

                corregir();

            }

        }

    }
);