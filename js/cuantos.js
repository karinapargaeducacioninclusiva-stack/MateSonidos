// ======================================
// MateSonidos - Nivel 4.3
// ¿Cuántos hay?
// ======================================

let cantidad = 0;

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

    cantidad =
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

    // Respuesta correcta

    opciones.push(cantidad);


    // Completar con números diferentes

    while(opciones.length < 3){

        const numero =
            Math.floor(Math.random() * 5) + 1;


        if(!opciones.includes(numero)){

            opciones.push(numero);

        }

    }


    // Mezclar opciones

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
// ESCUCHAR CANTIDAD
// ======================================

function repetir(){

    limpiarVoz();


    let texto =
        "Escucha. ";


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
        "¿Cuántos hay? " +
        "Elige una opción.";


    hablar(texto);

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


    if(
        seleccion === cantidad
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
            "Hay " +
            numeroEnPalabra(cantidad) +
            "."
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
            "Escucha nuevamente."
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
        "Terminaste el Nivel 4.3. " +
        "¿Cuántos hay? " +
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

        "<h2>Terminaste Nivel 4.3</h2>" +

        "<p>¿Cuántos hay?</p>" +

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
        "🏠 Volver al menú del Nivel 4" +
        "</button>";

}


// ======================================
// VOLVER AL MENÚ NIVEL 4
// ======================================

function volverMenu(){

    limpiarVoz();

    window.location.href =
        "nivel4.html";

}