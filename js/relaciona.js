// ======================================
// MateSonidos - Nivel 4.2
// Relaciono número y cantidad
// ======================================

let numeroObjetivo = 0;

let opciones = [];

let opcionActual = 0;

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

    nuevaPregunta();

}


// ======================================
// NUEVA PREGUNTA
// ======================================

function nuevaPregunta(){

    numeroObjetivo =
        Math.floor(Math.random() * 5) + 1;


    generarOpciones();

    mostrarOpciones();

    actualizarBarra();

}


// ======================================
// GENERAR OPCIONES
// ======================================

function generarOpciones(){

    opciones = [];


    // Agregar respuesta correcta

    opciones.push(numeroObjetivo);


    // Agregar números diferentes

    while(opciones.length < 3){

        const numero =
            Math.floor(Math.random() * 5) + 1;


        if(!opciones.includes(numero)){

            opciones.push(numero);

        }

    }


    // Mezclar

    opciones.sort(
        () => Math.random() - 0.5
    );


    opcionActual = 0;

}


// ======================================
// MOSTRAR OPCIONES
// ======================================

function mostrarOpciones(){

    const contenedor =
        document.getElementById("opciones");


    contenedor.innerHTML = "";


    opciones.forEach(
        function(numero, indice){

            const boton =
                document.createElement("button");


            boton.type = "button";

            boton.className =
                "opcionCantidad";


            boton.textContent =
                "Opción " +
                (indice + 1) +
                ": " +
                numeroEnPalabra(numero);


            boton.setAttribute(
                "aria-label",
                "Opción " +
                (indice + 1) +
                ": " +
                numeroEnPalabra(numero)
            );


            boton.addEventListener(
                "click",
                function(){

                    opcionActual = indice;

                    seleccionar();

                }
            );


            contenedor.appendChild(boton);

        }
    );


    actualizarSeleccion();

}


// ======================================
// ACTUALIZAR SELECCIÓN
// ======================================

function actualizarSeleccion(){

    const botones =
        document.querySelectorAll(
            ".opcionCantidad"
        );


    botones.forEach(
        function(boton, indice){

            boton.classList.remove(
                "menuActivo"
            );


            if(indice === opcionActual){

                boton.classList.add(
                    "menuActivo"
                );

            }

        }
    );

}


// ======================================
// LEER OPCIÓN
// ======================================

function leerOpcion(){

    const numero =
        opciones[opcionActual];


    hablar(
        "Opción " +
        (opcionActual + 1) +
        ": " +
        numeroEnPalabra(numero)
    );

}


// ======================================
// ESCUCHAR PREGUNTA
// ======================================

function repetir(){

    limpiarVoz();


    hablar(
        "Escucha el número: " +
        numeroEnPalabra(numeroObjetivo) +
        ". " +
        "Elige la opción que representa " +
        numeroEnPalabra(numeroObjetivo) +
        "."
    );


    setTimeout(
        function(){

            leerOpcion();

        },
        2500
    );

}


// ======================================
// SELECCIONAR
// ======================================

function seleccionar(){

    actualizarSeleccion();

    leerOpcion();

}


// ======================================
// CORREGIR
// ======================================

function corregir(){

    const seleccion =
        opciones[opcionActual];


    if(seleccion === numeroObjetivo){

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
            numeroEnPalabra(seleccion) +
            " es la respuesta correcta."
        );


        siguientePregunta();

    }

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
            "Escucha nuevamente las opciones."
        );

    }

}


// ======================================
// SIGUIENTE PREGUNTA
// ======================================

function siguientePregunta(){

    if(pregunta >= totalPreguntas){

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
// TECLADO
// ======================================

document.addEventListener(
    "keydown",
    function(e){

        if(e.key === "ArrowDown"){

            e.preventDefault();

            opcionActual++;

            if(
                opcionActual >=
                opciones.length
            ){

                opcionActual = 0;

            }

            actualizarSeleccion();

            leerOpcion();

        }


        if(e.key === "ArrowUp"){

            e.preventDefault();

            opcionActual--;

            if(opcionActual < 0){

                opcionActual =
                    opciones.length - 1;

            }

            actualizarSeleccion();

            leerOpcion();

        }


        if(e.key === " "){

            e.preventDefault();

            repetir();

        }


        if(e.key === "Enter"){

            e.preventDefault();

            corregir();

        }

    }
);


// ======================================
// FINAL
// ======================================

function terminarNivel(){

    limpiarVoz();


    hablar(
        "Felicitaciones. " +
        "Terminaste el Nivel 4.2. " +
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

        "<h2>Terminaste Nivel 4.2</h2>" +

        "<p>Relaciono número y cantidad</p>" +

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