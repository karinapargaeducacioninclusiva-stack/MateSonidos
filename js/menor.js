// ======================================
// MateSonidos - Nivel 3.2
// ¿Cuál es menor?
// Números del 1 al 3
// ======================================

let numero1 = 0;
let numero2 = 0;

let respuestaCorrecta = 0;

let pregunta = 1;
let aciertos = 0;
let errores = 0;

const totalPreguntas = 5;


// --------------------------------------
// Nueva pregunta
// --------------------------------------

function nuevaPregunta(){

    do {

        numero1 =
            Math.floor(Math.random() * 3) + 1;

        numero2 =
            Math.floor(Math.random() * 3) + 1;

    } while(numero1 === numero2);


    respuestaCorrecta =
        Math.min(numero1, numero2);


    document.getElementById("numeros").textContent =
        numero1 + "     " + numero2;


    document.getElementById("consigna").textContent =
        "¿Cuál es menor?";


    document.getElementById("respuesta").value = "";

    document.getElementById("resultado").textContent = "";

    document.getElementById("respuesta").focus();


    actualizarBarra();

    repetir();

}


// --------------------------------------
// Leer nuevamente
// --------------------------------------

function repetir(){

    limpiarVoz();


    const texto =
        "Escucha atentamente. " +
        "Primer número: " +
        numero1 +
        ". " +
        "Segundo número: " +
        numero2 +
        ". " +
        "¿Cuál es menor?";


    hablar(texto);

}


// --------------------------------------
// Barra de progreso
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
// Corregir
// --------------------------------------

function corregir(){

    const respuesta =
        document
            .getElementById("respuesta")
            .value
            .trim();


    if(respuesta === ""){

        limpiarVoz();

        hablar("Escribe un número.");

        return;

    }


    const usuario =
        Number(respuesta);


    if(usuario === respuestaCorrecta){

        limpiarVoz();

        hablar(
            "Muy bien. Respuesta correcta."
        );


        document
            .getElementById("resultado")
            .textContent =
            "✅ Correcto";


        aciertos++;


        document
            .getElementById("aciertos")
            .textContent =
            "⭐ Aciertos: " + aciertos;

    }

    else{

        limpiarVoz();

        hablar(
            "Incorrecto. Intenta nuevamente."
        );


        document
            .getElementById("resultado")
            .textContent =
            "❌ Incorrecto";


        errores++;


        document
            .getElementById("errores")
            .textContent =
            "❌ Errores: " + errores;

    }


    if(pregunta >= totalPreguntas){

        setTimeout(function(){

            terminarNivel();

        }, 1500);

        return;

    }


    pregunta++;


    setTimeout(function(){

        nuevaPregunta();

    }, 1800);

}


// --------------------------------------
// Final
// --------------------------------------

function terminarNivel(){

    limpiarVoz();

    hablar(
        "Felicitaciones. Terminaste la actividad. ¿Cuál es menor?"
    );


    document.querySelector("main").innerHTML = `

        <h1>🎉 ¡Muy bien!</h1>

        <h2>Terminaste Nivel 3.2</h2>

        <p>¿Cuál es menor?</p>

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
    .addEventListener(
        "keydown",
        function(e){

            if(e.key === "Enter"){

                e.preventDefault();

                corregir();

            }

        }
    );


// --------------------------------------
// Inicio
// --------------------------------------

actualizarBarra();

nuevaPregunta();