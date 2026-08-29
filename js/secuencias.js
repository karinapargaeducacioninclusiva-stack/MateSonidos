// ======================================
// MateSonidos - Nivel 2
// Ordena los números
// Sistema de voz accesible
// ======================================

let numeros = [];
let ordenCorrecto = [];

let pregunta = 1;
let aciertos = 0;
let errores = 0;

const totalPreguntas = 10;


// ======================================
// NUEVA SECUENCIA
// ======================================

function nuevaSecuencia(){

    numeros = [];

    // Generar 3 números diferentes
    // del 1 al 9

    while(numeros.length < 3){

        const n =
            Math.floor(Math.random() * 9) + 1;

        if(!numeros.includes(n)){

            numeros.push(n);

        }

    }


    // Orden correcto
    ordenCorrecto =
        [...numeros].sort(
            (a,b) => a-b
        );


    // Mostrar visualmente

    document
        .getElementById("numeros")
        .textContent =
        numeros.join(" - ");


    // Limpiar respuesta

    document
        .getElementById("respuesta")
        .value = "";


    // Limpiar resultado

    document
        .getElementById("resultado")
        .textContent = "";


    // Actualizar progreso

    actualizarBarra();


    // Llevar foco

    document
        .getElementById("respuesta")
        .focus();


    // Leer automáticamente

    setTimeout(
        function(){

            presentarSecuencia();

        },
        500
    );

}


// ======================================
// PRESENTAR SECUENCIA
// UNA SOLA VOZ
// ======================================

function presentarSecuencia(){

    limpiarVoz();


    const texto =

        "Nivel 2. Ordena los números. " +

        "Voy a decir tres números, uno por vez. " +

        "Primer número: " +
        numeroEnPalabra(numeros[0]) +
        ". " +

        "Segundo número: " +
        numeroEnPalabra(numeros[1]) +
        ". " +

        "Tercer número: " +
        numeroEnPalabra(numeros[2]) +
        ". " +

        "Repaso. " +

        numeroEnPalabra(numeros[0]) +
        ". " +

        numeroEnPalabra(numeros[1]) +
        ". " +

        numeroEnPalabra(numeros[2]) +
        ". " +

        "Ahora ordénalos de menor a mayor. " +

        "Escribe primero el número más pequeño. " +

        "Después escribe el número del medio. " +

        "Por último, escribe el número más grande. " +

        "Separa los números con espacios. " +

        "Presiona Enter cuando termines.";


    hablar(texto);

}


// ======================================
// REPETIR TODA LA SECUENCIA
// ======================================

function repetir(){

    presentarSecuencia();

}


// ======================================
// ESCUCHAR UN NÚMERO INDIVIDUAL
// ======================================

function escucharNumero(posicion){

    if(
        numeros[posicion] === undefined
    ){

        return;

    }


    limpiarVoz();


    const numero =
        numeros[posicion];


    const texto =

        "Número " +
        (posicion + 1) +
        ": " +
        numeroEnPalabra(numero) +
        ".";


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

        "cinco",

        "seis",

        "siete",

        "ocho",

        "nueve"

    ];


    return palabras[numero];

}


// ======================================
// BARRA DE PROGRESO
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
            .trim();


    if(respuesta === ""){

        limpiarVoz();

        hablar(
            "Debes escribir tres números."
        );

        return;

    }


    const usuario =

        respuesta
            .split(/\s+/)
            .map(Number);


    let correcto = true;


    if(usuario.length !== 3){

        correcto = false;

    }

    else{

        for(
            let i = 0;
            i < 3;
            i++
        ){

            if(
                usuario[i] !==
                ordenCorrecto[i]
            ){

                correcto = false;

                break;

            }

        }

    }


    // ==================================
    // CORRECTO
    // ==================================

    if(correcto){

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
            terminarJuego,
            1800
        );

        return;

    }


    pregunta++;


    guardarDato(
        "ultimoNivel",
        2
    );


    setTimeout(
        nuevaSecuencia,
        1800
    );

}


// ======================================
// FINAL DEL NIVEL
// ======================================

function terminarJuego(){

    limpiarVoz();


    hablar(
        "Felicitaciones. " +
        "Terminaste el Nivel 2. " +
        "Tuviste " +
        aciertos +
        " aciertos de " +
        totalPreguntas +
        "."
    );


    document
        .querySelector("main")
        .innerHTML = `

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


// ======================================
// VOLVER AL MENÚ
// ======================================

function volverMenu(){

    const salir =
        confirm(
            "¿Desea volver al menú principal?\n\n" +
            "Se perderá el progreso de esta partida."
        );


    if(salir){

        limpiarVoz();

        window.location.href =
            "index.html";

    }

}


// ======================================
// TECLADO
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const respuesta =
            document.getElementById(
                "respuesta"
            );


        if(respuesta){

            respuesta.addEventListener(
                "keydown",
                function(e){

                    if(e.key === "Enter"){

                        e.preventDefault();

                        corregir();

                    }

                }
            );

        }

    }
);


// ======================================
// ATAJOS ACCESIBLES
// ======================================

document.addEventListener(
    "keydown",
    function(e){

        const respuesta =
            document.getElementById(
                "respuesta"
            );


        // Espacio:
        // repetir toda la secuencia

        if(e.key === " "){

            if(
                document.activeElement !==
                respuesta
            ){

                e.preventDefault();

                repetir();

            }

        }


        // 1 = primer número

        if(e.key === "1"){

            escucharNumero(0);

        }


        // 2 = segundo número

        if(e.key === "2"){

            escucharNumero(1);

        }


        // 3 = tercer número

        if(e.key === "3"){

            escucharNumero(2);

        }

    }
);


// ======================================
// INICIO
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        actualizarBarra();

        nuevaSecuencia();

    }
);