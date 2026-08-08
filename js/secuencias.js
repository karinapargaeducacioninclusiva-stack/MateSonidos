// ======================================
// MateSonidos - Nivel 2
// Ordena los números
// ======================================

// Variables

let numeros = [];
let ordenCorrecto = [];

let pregunta = 1;
let aciertos = 0;
let errores = 0;

const totalPreguntas = 10;


// --------------------------------------
// Nueva secuencia
// --------------------------------------

function nuevaSecuencia(){

    numeros = [];

    // Generar 3 números diferentes del 1 al 9

    while(numeros.length < 3){

        const n =
            Math.floor(Math.random() * 9) + 1;

        if(!numeros.includes(n)){

            numeros.push(n);

        }

    }


    // Orden correcto: menor a mayor

    ordenCorrecto =
        [...numeros].sort((a,b) => a-b);


    // Mostrar los números en pantalla

    document.getElementById("numeros").textContent =
        numeros.join(" - ");


    // Limpiar respuesta

    document.getElementById("respuesta").value = "";


    // Limpiar resultado

    document.getElementById("resultado").textContent = "";


    // Llevar el foco al campo

    document.getElementById("respuesta").focus();


    // Actualizar progreso

    actualizarBarra();


    // Leer la consigna

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
        numeros[0] +
        ". " +

        "Segundo número: " +
        numeros[1] +
        ". " +

        "Tercer número: " +
        numeros[2] +
        ". " +

        "Ahora escribe los números de menor a mayor, " +
        "separados por espacios.";


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


    // No hay respuesta

    if(respuesta === ""){

        limpiarVoz();

        hablar(
            "Debes escribir tres números."
        );

        return;

    }


    // Convertir respuesta en números

    const usuario =

        respuesta
            .split(/\s+/)
            .map(Number);


    let correcto = true;


    // Verificar cantidad

    if(usuario.length !== 3){

        correcto = false;

    }

    else{

        // Verificar cada número

        for(let i = 0; i < 3; i++){

            if(usuario[i] !== ordenCorrecto[i]){

                correcto = false;

                break;

            }

        }

    }


    // ----------------------------------
    // Respuesta correcta
    // ----------------------------------

    if(correcto){

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


    // ----------------------------------
    // Respuesta incorrecta
    // ----------------------------------

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
    // Final del nivel
    // ----------------------------------

    if(pregunta >= totalPreguntas){

        setTimeout(function(){

            terminarJuego();

        }, 1500);

        return;

    }


    // ----------------------------------
    // Siguiente pregunta
    // ----------------------------------

    pregunta++;

    guardarDato("ultimoNivel", 2);


    setTimeout(function(){

        nuevaSecuencia();

    }, 1500);

}


// --------------------------------------
// Final
// --------------------------------------

function terminarJuego(){

    limpiarVoz();


    hablar(
        "Felicitaciones. Terminaste el Nivel 2."
    );


    document.querySelector("main").innerHTML = `

        <h1>🎉 ¡Felicitaciones!</h1>

        <h2>Terminaste el Nivel 2</h2>

        <p>
            ⭐ Aciertos: ${aciertos}
        </p>

        <p>
            ❌ Errores: ${errores}
        </p>

        <br>

        <button onclick="location.reload()">
            🔄 Jugar otra vez
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

    const salir = confirm(
        "¿Desea volver al menú principal?\n\n" +
        "Se perderá el progreso de esta partida."
    );


    if(salir){

        limpiarVoz();

        window.location.href =
            "index.html";

    }

}


// --------------------------------------
// Enter para comprobar
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

nuevaSecuencia();