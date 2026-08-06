// ======================================
// MateSonidos - Nivel 2
// Ordena los números
// ======================================

// Variables

let numeros = [];
let ordenCorrecto = [];
let modoOrden = "";
let pregunta = 1;
let aciertos = 0;
let errores = 0;

// -------------------------------
// Nueva secuencia
// -------------------------------

function nuevaSecuencia(){

    numeros = [];

    while(numeros.length < 3){

        const n = Math.floor(Math.random()*9)+1;

        if(!numeros.includes(n)){

            numeros.push(n);

        }

    }

    // Elegir el modo aleatoriamente
    if(Math.random() < 0.5){

        modoOrden = "menor";

        ordenCorrecto = [...numeros].sort((a,b)=>a-b);

    }else{

        modoOrden = "mayor";

        ordenCorrecto = [...numeros].sort((a,b)=>b-a);

    }

    document.getElementById("numeros").textContent =
        numeros.join(" - ");

    document.getElementById("respuesta").value = "";

    document.getElementById("respuesta").focus();

    // Mostrar la consigna en pantalla
    document.getElementById("consigna").textContent =
        (modoOrden === "menor")
        ? "📌 Ordena de menor a mayor"
        : "📌 Ordena de mayor a menor";

    repetir();

}

// -------------------------------
// Leer nuevamente
// -------------------------------

function repetir(){

    limpiarVoz();

    hablar("Escucha atentamente.");

    hablar("Primer número.");
    hablar(numeros[0].toString());

    hablar("Segundo número.");
    hablar(numeros[1].toString());

    hablar("Tercer número.");
    hablar(numeros[2].toString());

    if(modoOrden==="menor"){

        hablar("Ahora escribe los números ordenados de menor a mayor, separados por espacios.");

    }else{

        hablar("Ahora escribe los números ordenados de mayor a menor, separados por espacios.");

    }

}
// -------------------------------
// Barra
// -------------------------------

function actualizarBarra(){

    document.getElementById("pregunta").textContent =
        "📘 Pregunta " + pregunta + " de 10";

    document.getElementById("barra").style.width =
        (pregunta*10) + "%";

}

// -------------------------------
// Corregir
// -------------------------------

function corregir(){

    const respuesta = document
        .getElementById("respuesta")
        .value
        .trim();

    if(respuesta===""){

        limpiarVoz();

        hablar("Debes escribir tres números.");

        return;

    }

    const usuario = respuesta
        .split(/\s+/)
        .map(Number);

    let correcto = true;

    if(usuario.length !== 3){

        correcto = false;

    }else{

        for(let i=0;i<3;i++){

            if(usuario[i] !== ordenCorrecto[i]){

                correcto = false;
                break;

            }

        }

    }

    if(correcto){

        limpiarVoz();

        hablar("Muy bien. Respuesta correcta.");

        document.getElementById("resultado").textContent =
            "✅ Correcto";

        aciertos++;

        document.getElementById("aciertos").textContent =
            "⭐ Aciertos: " + aciertos;

    }else{

        limpiarVoz();

        hablar("Incorrecto. Intenta nuevamente.");

        document.getElementById("resultado").textContent =
            "❌ Incorrecto";

        errores++;

        document.getElementById("errores").textContent =
            "❌ Errores: " + errores;

    }

    if(pregunta >= 10){

        terminarJuego();
        return;

    }

    pregunta++;

    actualizarBarra();

    guardarDato("ultimoNivel",2);

    setTimeout(function(){

        document.getElementById("resultado").textContent = "";

        nuevaSecuencia();

    },1500);

}

// -------------------------------
// Final
// -------------------------------

function terminarJuego(){

    limpiarVoz();

    hablar("Felicitaciones. Terminaste el nivel.");

    document.querySelector("main").innerHTML = `

<h1>🎉 ¡Felicitaciones!</h1>

<h2>Terminaste el Nivel 2</h2>

<p>⭐ Aciertos: ${aciertos}</p>

<p>❌ Errores: ${errores}</p>

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

// -------------------------------
// Volver
// -------------------------------

function volverMenu(){

    const salir = confirm(
        "¿Desea volver al menú principal?\n\nSe perderá el progreso de esta partida."
    );

    if(salir){

        limpiarVoz();

        window.location.href = "index.html";

    }

}

// -------------------------------
// Enter
// -------------------------------

document.getElementById("respuesta").addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        corregir();

    }

});

// -------------------------------
// Inicio
// -------------------------------

actualizarBarra();

nuevaSecuencia();