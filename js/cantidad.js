// ======================================
// MateSonidos - Nivel 4.1
// Reconozco cantidades
// ======================================

let cantidad = 0;

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

    actualizarBarra();

    nuevaPregunta();

}


// ======================================
// NUEVA PREGUNTA
// ======================================

function nuevaPregunta(){

    // Generar cantidad entre 1 y 5

    cantidad =
        Math.floor(Math.random() * 5) + 1;


    document
        .getElementById("respuesta")
        .value = "";


    document
        .getElementById("resultado")
        .textContent = "";


    actualizarBarra();

}


// ======================================
// ESCUCHAR CANTIDAD
// ======================================

function repetir(){

    limpiarVoz();


    let texto =
        "Escucha. ";


    // Contar la cantidad lentamente

    for(
        let i = 1;
        i <= cantidad;
        i++
    ){

        texto +=
            numeroEnPalabra(i) +
            ". ";

    }


    texto +=
        "¿Cuántos escuchaste? " +
        "Escribe el número y presiona Enter.";


    hablar(texto);

}


// ======================================
// NÚMERO EN PALABRA
// ======================================

function numeroEnPalabra(numero){

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
// CORREGIR
// ======================================

function corregir(){

    const respuesta =
        document
            .getElementById("respuesta")
            .value
            .trim();


    if(respuesta === ""){

        limpiarVoz();

        hablar(
            "Escribe un número."
        );

        return;

    }


    const numero =
        Number(respuesta);


    if(
        !Number.isInteger(numero) ||
        numero < 1 ||
        numero > 5
    ){

        limpiarVoz();

        hablar(
            "Escribe un número entre uno y cinco."
        );

        return;

    }


    // ==================================
    // CORRECTO
    // ==================================

    if(numero === cantidad){

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
            "Escuchaste " +
            numeroEnPalabra(cantidad) +
            "."
        );


        siguientePregunta();

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
            "No es correcto. " +
            "Intenta nuevamente."
        );

    }

}


// ======================================
// SIGUIENTE PREGUNTA
// ======================================

function siguientePregunta(){

    if(
        pregunta >= totalPreguntas
    ){

        setTimeout(
            terminarNivel,
            1800
        );

        return;

    }


    pregunta++;


    setTimeout(
        nuevaPregunta,
        1800
    );

}


// ======================================
// BARRA DE PROGRESO
// ======================================

function actualizarBarra(){

    document
        .getElementById("pregunta")
        .textContent =
        "Pregunta " +
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
// FINAL
// ======================================

function terminarNivel(){

    limpiarVoz();


    hablar(
        "Felicitaciones. " +
        "Terminaste el Nivel 4.1. " +
        "Reconozco cantidades. " +
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

        "<h2>Terminaste Nivel 4.1</h2>" +

        "<p>Reconozco cantidades</p>" +

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

function volverMenu(){

    limpiarVoz();

    window.location.href =
        "index.html";

}


// ======================================
// ENTER
// ======================================

document.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Enter"){

            e.preventDefault();

            corregir();

        }

    }
);