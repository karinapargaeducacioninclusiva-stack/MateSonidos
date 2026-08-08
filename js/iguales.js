// ======================================
// MateSonidos - Nivel 3.3
// ¿Son iguales?
// Números del 1 al 3
// ======================================

let numero1 = 0;
let numero2 = 0;

let respuestaCorrecta = "";

let pregunta = 1;
let aciertos = 0;
let errores = 0;

const totalPreguntas = 5;


// --------------------------------------
// Nueva pregunta
// --------------------------------------

function nuevaPregunta(){

    numero1 =
        Math.floor(Math.random() * 3) + 1;

    numero2 =
        Math.floor(Math.random() * 3) + 1;


    if(numero1 === numero2){

        respuestaCorrecta = "si";

    }else{

        respuestaCorrecta = "no";

    }


    document.getElementById("numeros").textContent =
        numero1 + "     " + numero2;


    document.getElementById("consigna").textContent =
        "¿Son iguales?";


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
        "¿Son iguales? Responde sí o no.";


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
            .trim()
            .toLowerCase();


    if(respuesta === ""){

        limpiarVoz();

        hablar("Escribe sí o no.");

        return;

    }


    // Aceptamos sí, si y no

    let respuestaUsuario = "";


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
            "Escribe sí o no."
        );

        return;

    }


    // ----------------------------------
    // Comprobar
    // ----------------------------------

    if(respuestaUsuario === respuestaCorrecta){

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


    // ----------------------------------
    // Final
    // ----------------------------------

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
        "Felicitaciones. Terminaste la actividad. ¿Son iguales?"
    );


    document.querySelector("main").innerHTML = `

        <h1>🎉 ¡Muy bien!</h1>

        <h2>Terminaste Nivel 3.3</h2>

        <p>¿Son iguales?</p>

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