// ======================================
// MateSonidos - Nivel 3.4
// Comparo números
// Diseño accesible para persona ciega
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

    console.log(
        "COMPARO 3.4 CARGADO"
    );


    actualizarBarra();


    nuevaPregunta();

}


// ======================================
// NUEVA PREGUNTA
// ======================================

function nuevaPregunta(){

    // Generar números del 1 al 5

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


    const posicion =
        Math.floor(
            Math.random() *
            tipos.length
        );


    tipoPregunta =
        tipos[posicion];


    // ==================================
    // RESPUESTA CORRECTA
    // ==================================

    if(
        tipoPregunta === "mayor"
    ){

        if(numero1 > numero2){

            respuestaCorrecta =
                numero1.toString();

        }

        else{

            respuestaCorrecta =
                numero2.toString();

        }

    }


    else if(
        tipoPregunta === "menor"
    ){

        if(numero1 < numero2){

            respuestaCorrecta =
                numero1.toString();

        }

        else{

            respuestaCorrecta =
                numero2.toString();

        }

    }


    else{

        if(numero1 === numero2){

            respuestaCorrecta =
                "si";

        }

        else{

            respuestaCorrecta =
                "no";

        }

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

    if(
        tipoPregunta === "mayor"
    ){

        document
            .getElementById("consigna")
            .textContent =

            "¿Cuál es mayor?";

    }


    else if(
        tipoPregunta === "menor"
    ){

        document
            .getElementById("consigna")
            .textContent =

            "¿Cuál es menor?";

    }


    else{

        document
            .getElementById("consigna")
            .textContent =

            "¿Son iguales? " +
            "Escribe sí o no.";

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


    // Foco

    document
        .getElementById("respuesta")
        .focus();


    // Leer automáticamente

    setTimeout(
        function(){

            presentarPregunta();

        },
        500
    );

}


// ======================================
// PRESENTAR PREGUNTA
// UNA SOLA REPRODUCCIÓN
// ======================================

function presentarPregunta(){

    limpiarVoz();


    let texto =

        "Nivel 3. " +
        "Comparo números. ";


    texto +=
        "Escucha. ";


    texto +=
        "Primer número: " +
        numeroEnPalabra(numero1) +
        ". ";


    texto +=
        "Segundo número: " +
        numeroEnPalabra(numero2) +
        ". ";


    if(
        tipoPregunta === "mayor"
    ){

        texto +=
            "¿Cuál es mayor? " +
            "Escribe el número mayor.";

    }


    else if(
        tipoPregunta === "menor"
    ){

        texto +=
            "¿Cuál es menor? " +
            "Escribe el número menor.";

    }


    else{

        texto +=
            "¿Son iguales? " +
            "Escribe sí o no.";

    }


    texto +=
        " Presiona Enter para comprobar.";


    hablar(texto);

}


// ======================================
// REPETIR
// ======================================

function repetir(){

    presentarPregunta();

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

function corregir(){

    const respuesta =

        document
            .getElementById("respuesta")
            .value
            .trim()
            .toLowerCase();


    // ==================================
    // SIN RESPUESTA
    // ==================================

    if(
        respuesta === ""
    ){

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

    if(
        tipoPregunta === "igual"
    ){

        if(
            respuesta === "si" ||
            respuesta === "sí"
        ){

            respuestaUsuario =
                "si";

        }


        else if(
            respuesta === "no"
        ){

            respuestaUsuario =
                "no";

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


        if(
            Number.isNaN(numero)
        ){

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

    if(
        pregunta >=
        totalPreguntas
    ){

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
// FINAL DEL NIVEL
// ======================================

function terminarNivel(){

    limpiarVoz();


    hablar(
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
// BOTÓN ESCUCHAR
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const boton =
            document.getElementById(
                "botonEscuchar"
            );


        if(boton){

            boton.addEventListener(
                "click",
                function(){

                    repetir();

                }
            );

        }

    }
);


// ======================================
// ENTER
// ======================================

document.addEventListener(
    "keydown",
    function(e){

        if(
            e.key === "Enter"
        ){

            const respuesta =
                document.getElementById(
                    "respuesta"
                );


            if(
                respuesta &&
                document.activeElement ===
                respuesta
            ){

                e.preventDefault();

                corregir();

            }

        }

    }
);


// ======================================
// VOLVER AL MENÚ
// ======================================

function volverMenu(){

    limpiarVoz();


    window.location.href =
        "index.html";

}