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

document.addEventListener(
    "DOMContentLoaded",
    iniciarJuego
);


function iniciarJuego(){

    console.log("COMPARO 3.4 CARGADO");

    actualizarBarra();

    nuevaPregunta();

}


// ======================================
// NUEVA PREGUNTA
// ======================================

function nuevaPregunta(){

    numero1 =
        Math.floor(Math.random() * 3) + 1;

    numero2 =
        Math.floor(Math.random() * 3) + 1;


    const tipos = [
        "mayor",
        "menor",
        "igual"
    ];


    const posicion =
        Math.floor(
            Math.random() * tipos.length
        );


    tipoPregunta =
        tipos[posicion];


    // ==================================
    // RESPUESTA CORRECTA
    // ==================================

    if(tipoPregunta === "mayor"){

        if(numero1 > numero2){

            respuestaCorrecta =
                numero1.toString();

        }else{

            respuestaCorrecta =
                numero2.toString();

        }

    }


    else if(tipoPregunta === "menor"){

        if(numero1 < numero2){

            respuestaCorrecta =
                numero1.toString();

        }else{

            respuestaCorrecta =
                numero2.toString();

        }

    }


    else{

        if(numero1 === numero2){

            respuestaCorrecta = "si";

        }else{

            respuestaCorrecta = "no";

        }

    }


    // ==================================
    // MOSTRAR NÚMEROS
    // ==================================

    document
        .getElementById("numeros")
        .textContent =
        numero1 + "     " + numero2;


    // ==================================
    // MOSTRAR CONSIGNA
    // ==================================

    if(tipoPregunta === "mayor"){

        document
            .getElementById("consigna")
            .textContent =
            "¿Cuál es mayor?";

    }

    else if(tipoPregunta === "menor"){

        document
            .getElementById("consigna")
            .textContent =
            "¿Cuál es menor?";

    }

    else{

        document
            .getElementById("consigna")
            .textContent =
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

}


// ======================================
// ESCUCHAR NUEVAMENTE
// ======================================

function repetir()function repetir(){

    limpiarVoz();

    let texto = "";

    if(tipoPregunta === "mayor"){

        texto =
            "Primer número: " +
            numero1 +
            ". " +
            "Segundo número: " +
            numero2 +
            ". " +
            "¿Cuál es mayor?";

    }

    else if(tipoPregunta === "menor"){

        texto =
            "Primer número: " +
            numero1 +
            ". " +
            "Segundo número: " +
            numero2 +
            ". " +
            "¿Cuál es menor?";

    }

    else{

        texto =
            "Primer número: " +
            numero1 +
            ". " +
            "Segundo número: " +
            numero2 +
            ". " +
            "¿Son iguales? " +
            "Responde sí o no.";

    }

    hablar(texto);

}

    const voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    // Velocidad lenta
    voz.rate = 0.50;

    voz.pitch = 1;

    voz.volume = 1;


    // Una única reproducción
    window.speechSynthesis.speak(voz);

}

// ======================================
// BARRA
// ======================================

function actualizarBarra(){

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
        (pregunta / totalPreguntas * 100) +
        "%";

}


// ======================================
// CORREGIR
// ======================================

function corregir(){

    const respuesta =
        document
            .getElementById("respuesta")
            .value
            .trim()
            .toLowerCase();


    if(respuesta === ""){

        limpiarVoz();

        hablar(
            "Escribe una respuesta."
        );

        return;

    }


    let respuestaUsuario = "";


    // ==================================
    // IGUAL
    // ==================================

    if(tipoPregunta === "igual"){

        if(
            respuesta === "si" ||
            respuesta === "sí"
        ){

            respuestaUsuario = "si";

        }

        else if(respuesta === "no"){

            respuestaUsuario = "no";

        }

        else{

            limpiarVoz();

            hablar(
                "Responde sí o no."
            );

            return;

        }

    }


    // ==================================
    // MAYOR / MENOR
    // ==================================

    else{

        const numero =
            Number(respuesta);


        if(Number.isNaN(numero)){

            limpiarVoz();

            hablar(
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

    if(
        respuestaUsuario ===
        respuestaCorrecta
    ){

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


        limpiarVoz();

        hablar(
            "Muy bien. " +
            "Respuesta correcta."
        );

    }


    // ==================================
    // INCORRECTO
    // ==================================

    else{

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


        limpiarVoz();

        hablar(
            "Incorrecto. " +
            "Intenta nuevamente."
        );


        return;

    }


    // ==================================
    // FINAL
    // ==================================

    if(pregunta >= totalPreguntas){

        setTimeout(
            terminarNivel,
            2500
        );

        return;

    }


    pregunta++;


    setTimeout(
        nuevaPregunta,
        2500
    );

}


// ======================================
// FINAL DEL NIVEL
// ======================================

function terminarNivel(){

    limpiarVoz();


    hablar(
        "Felicitaciones. " +
        "Terminaste el Nivel 3.4. " +
        "Comparo números."
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

        "<button onclick=\"window.location='index.html'\">" +
        "🏠 Volver al menú principal" +
        "</button>";

}


// ======================================
// VOLVER AL MENÚ
// ======================================

function volverMenu(){

    limpiarVoz();

    window.location.href =
        "index.html";

}
// ======================================
// VOLVER AL MENÚ
// ======================================

function volverMenu(){

    limpiarVoz();

    window.location.href =
        "index.html";

}


// ======================================
// BOTÓN ESCUCHAR
// ======================================

document
    .getElementById("botonEscuchar")
    .addEventListener("click", function(){

        repetir();

    });
// ======================================
// ENTER
// ======================================

document.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Enter"){

            const respuesta =
                document.getElementById(
                    "respuesta"
                );


            if(
                document.activeElement ===
                respuesta
            ){

                e.preventDefault();

                corregir();

            }

        }

    }
);