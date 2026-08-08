// ======================================
// MATESONIDOS - NIVEL 3.1
// ¿Cuál es mayor?
// Números del 1 al 3
// ======================================

// --------------------------------------
// Variables
// --------------------------------------

let numero1 = 0;
let numero2 = 0;

let respuestaCorrecta = 0;

let pregunta = 1;
let aciertos = 0;
let errores = 0;

const totalPreguntas = 5;


// --------------------------------------
// Generar pregunta
// --------------------------------------

function nuevaPregunta(){

    // Generar dos números diferentes
    do {

        numero1 =
            Math.floor(Math.random() * 3) + 1;

        numero2 =
            Math.floor(Math.random() * 3) + 1;

    } while(numero1 === numero2);


    // Determinar cuál es mayor
    respuestaCorrecta =
        Math.max(numero1, numero2);


    // Mostrar los números
    document.getElementById("numeros").textContent =
        numero1 + "     " + numero2;


    // Mostrar consigna
    document.getElementById("consigna").textContent =
        "¿Cuál es mayor?";


    // Limpiar respuesta
    document.getElementById("respuesta").value = "";

    document.getElementById("resultado").textContent = "";


    // Llevar foco al campo
    document.getElementById("respuesta").focus();


    actualizarBarra();

    repetir();

}


// --------------------------------------
// Repetir consigna
// --------------------------------------

function repetir(){

    limpiarVoz();

    hablar("Escucha atentamente.");

    setTimeout(function(){

        hablar("Primer número.");

    }, 700);


    setTimeout(function(){

        hablar(numero1.toString());

    }, 1400);


    setTimeout(function(){

        hablar("Segundo número.");

    }, 2100);


    setTimeout(function(){

        hablar(numero2.toString());

    }, 2800);


    setTimeout(function(){

        hablar("¿Cuál es mayor?");

    }, 3500);

}


// --------------------------------------
// Actualizar barra
// --------------------------------------

function actualizarBarra(){

    document.getElementById("pregunta").textContent =
        "📘 Pregunta " +
        pregunta +
        " de " +
        totalPreguntas;


    document.getElementById("barra").style.width =
        (pregunta / totalPreguntas * 100) + "%";

}


// --------------------------------------
// Corregir respuesta
// --------------------------------------

function corregir(){

    const respuesta =
        document.getElementById("respuesta")
        .value
        .trim();


    if(respuesta === ""){

        limpiarVoz();

        hablar("Escribe un número.");

        return;

    }


    const usuario =
        Number(respuesta);


    // ----------------------------------
    // Respuesta correcta
    // ----------------------------------

    if(usuario === respuestaCorrecta){

        limpiarVoz();

        hablar("Muy bien. Respuesta correcta.");


        document.getElementById("resultado")
            .textContent =
            "✅ Correcto";


        aciertos++;


        document.getElementById("aciertos")
            .textContent =
            "⭐ Aciertos: " + aciertos;

    }


    // ----------------------------------
    // Respuesta incorrecta
    // ----------------------------------

    else{

        limpiarVoz();

        hablar("Incorrecto. Intenta nuevamente.");


        document.getElementById("resultado")
            .textContent =
            "❌ Incorrecto";


        errores++;


        document.getElementById("errores")
            .textContent =
            "❌ Errores: " + errores;

    }


    // ----------------------------------
    // Final
    // ----------------------------------

    if(pregunta >= totalPreguntas){

        setTimeout(function(){

            terminarNivel();

        }, 1500);

        return;

    }


    // ----------------------------------
    // Siguiente pregunta
    // ----------------------------------

    pregunta++;


    setTimeout(function(){

        nuevaPregunta();

    }, 1800);

}


// --------------------------------------
// Final del nivel
// --------------------------------------

function terminarNivel(){

    limpiarVoz();

    hablar("Felicitaciones. Terminaste esta actividad.");


    document.querySelector("main").innerHTML = `

        <h1>🎉 ¡Muy bien!</h1>

        <h2>Terminaste Nivel 3.1</h2>

        <p>¿Cuál es mayor?</p>

        <p>
            ⭐ Aciertos: ${aciertos}
        </p>

        <p>
            ❌ Errores: ${errores}
        </p>

        <br>

        <button onclick="location.reload()">
            🔄 Volver a jugar
        </button>

        <br><br>

        <button onclick="window.location='index.html'">
            🏠 Volver al menú principal
        </button>

    `;

}


// --------------------------------------
// Volver al menú
// --------------------------------------

function volverMenu(){

    const salir =
        confirm(
            "¿Desea volver al menú principal?"
        );


    if(salir){

        limpiarVoz();

        window.location.href =
            "index.html";

    }

}


// --------------------------------------
// Enter
// --------------------------------------

document
    .getElementById("respuesta")
    .addEventListener("keydown", function(e){

        if(e.key === "Enter"){

            e.preventDefault();

            corregir();

        }

    });


// --------------------------------------
// Inicio
// --------------------------------------

actualizarBarra();

nuevaPregunta();