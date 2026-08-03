// =========================
// MateSonidos
// Nivel 2 - Ordenar secuencias
// =========================

let pregunta = 1;
let aciertos = 0;
let errores = 0;

let numeros = [];
let respuestaCorrecta = [];

let seleccionada = null;
let tarjetaSeleccionada = null;
let indiceSeleccionado = 0;
//----------------------------
// Generar nueva secuencia
//----------------------------

function nuevaSecuencia() {

    seleccionada = null;
    tarjetaSeleccionada = null;

    numeros = [];

    while (numeros.length < 3) {

        let n = Math.floor(Math.random() * 9) + 1;

        if (!numeros.includes(n)) {
            numeros.push(n);
        }

    }

    respuestaCorrecta = [...numeros].sort((a, b) => a - b);

    dibujarTarjetas();

    actualizarBarra();

}

//----------------------------
// Dibujar tarjetas
//----------------------------

function dibujarTarjetas() {

    const contenedor = document.getElementById("secuencia");
    const respuesta = document.getElementById("respuestaTarjetas");

    contenedor.innerHTML = "";
    respuesta.innerHTML = "";
    indiceSeleccionado = 0;
seleccionada = null;
tarjetaSeleccionada = null;

numeros.forEach((numero, indice) => {
        const tarjeta = document.createElement("button");

        tarjeta.className = "tarjetaNumero";

        tarjeta.textContent = numero;
        tarjeta.dataset.indice = indice;

        tarjeta.onclick = function () {

            seleccionada = numero;
            tarjetaSeleccionada = tarjeta;

seleccionarTarjeta(indice);
        };

        contenedor.appendChild(tarjeta);
    });

    for (let i = 0; i < 3; i++) {

        const casilla = document.createElement("button");

        casilla.className = "casilla";
casilla.onclick = function () {

    // Si la casilla ya tiene un número, lo devuelve
    if (casilla.textContent != "") {

        let numeroDevuelto = casilla.textContent;

        document.querySelectorAll(".tarjetaNumero").forEach(tarjeta => {

            if (tarjeta.textContent == numeroDevuelto) {

                tarjeta.style.visibility = "visible";

            }

        });

        casilla.textContent = "";

        hablar("Número quitado.");

        return;
      
    }

    // Si no hay un número seleccionado
    if (seleccionada == null) {

        hablar("Primero selecciona un número.");

        return;

    }

    // Coloca el número en la casilla
    casilla.textContent = seleccionada;

    tarjetaSeleccionada.style.visibility = "hidden";

    hablar(seleccionada + " colocado.");

    seleccionada = null;
    tarjetaSeleccionada = null;

};
        respuesta.appendChild(casilla);

    }
seleccionarTarjeta(0);
}

//----------------------------
// Escuchar
//----------------------------

function repetir() {

    hablar("Ordena los números: " + numeros.join(", "));

}

//----------------------------
// Comprobar
//----------------------------

function comprobar() {

    let respuestaUsuario = [];

    document.querySelectorAll(".casilla").forEach(c => {

        respuestaUsuario.push(Number(c.textContent));

    });

    let correcta = true;

    for (let i = 0; i < respuestaCorrecta.length; i++) {

        if (respuestaUsuario[i] !== respuestaCorrecta[i]) {

            correcta = false;

        }

    }

    if (correcta) {

        hablar("Correcto");

        document.getElementById("resultado").textContent =
            "✅ ¡Muy bien!";

        aciertos++;

        document.getElementById("aciertos").textContent =
            "⭐ Aciertos: " + aciertos;

        siguientePregunta();

    } else {

        hablar("Incorrecto");

        document.getElementById("resultado").textContent =
            "❌ Intenta nuevamente.";

        errores++;

        document.getElementById("errores").textContent =
            "❌ Errores: " + errores;

    }

}

//----------------------------
// Siguiente pregunta
//----------------------------

function siguientePregunta() {

    if (pregunta >= 10) {

        finalizar();

        return;

    }

    pregunta++;

    actualizarBarra();

    setTimeout(function () {

        document.getElementById("resultado").textContent = "";

        nuevaSecuencia();
        guardarDato("ultimoNivel", 2);

    }, 1000);

}

//----------------------------
// Barra
//----------------------------

function actualizarBarra() {

    document.getElementById("pregunta").textContent =
        "📘 Pregunta " + pregunta + " de 10";

    document.getElementById("barra").style.width =
        (pregunta / 10) * 100 + "%";

}

//----------------------------
// Final
//----------------------------

function finalizar() {

    hablar("Felicitaciones. Terminaste el nivel.");

    document.querySelector("main").innerHTML = `
        <h1>🎉 ¡Felicitaciones!</h1>

        <h2>Terminaste el Nivel 2</h2>

        <p>⭐ Aciertos: ${aciertos}</p>

        <p>❌ Errores: ${errores}</p>

        <button onclick="location.reload()">
            🔄 Jugar otra vez
        </button>

        <br><br>

        <button onclick="window.location='index.html'">
            🏠 Volver al inicio
        </button>
    `;

}

//----------------------------
// Voz
//----------------------------

function hablar(texto) {

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    voz.rate = 0.9;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}
function seleccionarTarjeta(indice){

    const tarjetas = document.querySelectorAll(".tarjetaNumero");

    tarjetas.forEach(function(tarjeta){

        tarjeta.classList.remove("activa");

    });

    tarjetas[indice].classList.add("activa");

    indiceSeleccionado = indice;
tarjetaSeleccionada = tarjetas[indice];
seleccionada = Number(tarjetas[indice].textContent);
    hablar(tarjetas[indice].textContent);

}
//----------------------------
// Inicio
//----------------------------

nuevaSecuencia();
document.addEventListener("keydown", function(e){

    const tarjetas = document.querySelectorAll(".tarjetaNumero");

    if(e.key === "ArrowRight"){

        let nuevo = indiceSeleccionado + 1;

        if(nuevo >= tarjetas.length){

            nuevo = 0;

        }

        seleccionarTarjeta(nuevo);

    }

    if(e.key === "ArrowLeft"){

        let nuevo = indiceSeleccionado - 1;

        if(nuevo < 0){

            nuevo = tarjetas.length - 1;

        }

        seleccionarTarjeta(nuevo);

    }

});
document.addEventListener("keydown", function(e){

    if(e.key !== "Enter") return;

    if(seleccionada == null){

        hablar("Primero selecciona un número.");

        return;

    }

    const casillas = document.querySelectorAll(".casilla");

    for(let casilla of casillas){

        if(casilla.textContent === ""){

            casilla.click();

            return;

        }

    }

    hablar("Todas las posiciones están ocupadas.");

});