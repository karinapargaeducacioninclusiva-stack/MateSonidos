// ===============================
// MATESONIDOS - NIVEL 1
// Conozco los números
// ===============================

// Variables
let numeroCorrecto;
let pregunta = 1;
let aciertos = 0;
let errores = 0;

// -------------------------------
// Voz
// -------------------------------
function hablar(texto) {
    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-ES";
    voz.rate = 0.9;

    speechSynthesis.speak(voz);
}

// -------------------------------
// Generar nuevo número
// -------------------------------
function nuevoNumero() {

    numeroCorrecto = Math.floor(Math.random() * 10) + 1;

    document.getElementById("numero").textContent = numeroCorrecto;

    hablar("¿Qué número es este? " + numeroCorrecto);

    const circulo = document.querySelector(".circulo");

    if (circulo) {
        circulo.style.animation = "none";
        circulo.offsetHeight;
        circulo.style.animation = "aparecer .3s";
    }

    document.getElementById("respuesta").value = "";
    document.getElementById("respuesta").focus();
}

// -------------------------------
// Actualizar barra
// -------------------------------
function actualizarBarra() {

    let porcentaje = (pregunta / 10) * 100;

    document.getElementById("barra").style.width = porcentaje + "%";

    document.getElementById("pregunta").textContent =
        "📘 Pregunta: " + pregunta + " de 10";

}

// -------------------------------
// Terminar juego
// -------------------------------
function terminarJuego() {

    hablar("Felicitaciones. Terminaste el nivel.");

    let mensaje = "";

    if (aciertos == 10) {
        mensaje = "🏆 ¡Excelente trabajo!";
    } else if (aciertos >= 8) {
        mensaje = "🌟 ¡Muy bien!";
    } else if (aciertos >= 6) {
        mensaje = "👍 ¡Buen trabajo! Sigue practicando.";
    } else {
        mensaje = "💪 ¡No te rindas! Cada intento te ayuda a aprender.";
    }

    document.querySelector("main").innerHTML = `
<h1>🎉 ¡Felicitaciones!</h1>

<h2>Terminaste el Nivel 1</h2>

<p>${mensaje}</p>

<p>⭐ Aciertos: ${aciertos}</p>

<p>❌ Errores: ${errores}</p>

<br>

<button onclick="location.reload()">
🔄 Jugar otra vez
</button>

<br><br>

<button onclick="window.location='index.html'">
🏠 Volver al inicio
</button>
`;

}

// -------------------------------
// Corregir respuesta
// -------------------------------
function corregir() {

    let respuesta = document.getElementById("respuesta").value.trim();

    if (respuesta == "") {
        return;
    }

    if (respuesta == numeroCorrecto) {

        hablar("Correcto");

        document.getElementById("resultado").textContent =
            "✅ ¡Correcto!";

        aciertos++;

        document.getElementById("aciertos").textContent =
            "⭐ Aciertos: " + aciertos;

    } else {

        hablar("Incorrecto");

        document.getElementById("resultado").textContent =
            "❌ Incorrecto";

        errores++;

        document.getElementById("errores").textContent =
            "❌ Errores: " + errores;

    }

    if (pregunta == 10) {

        setTimeout(terminarJuego, 1000);
        return;

    }

    pregunta++;

    actualizarBarra();

    setTimeout(function () {

        document.getElementById("resultado").textContent = "";

        nuevoNumero();
        guardarDato("ultimoNivel", 1);

    }, 1000);

}

// -------------------------------
// Eventos
// -------------------------------

document.getElementById("respuesta").addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        corregir();
    }

});

document.getElementById("respuesta").focus();

// -------------------------------
// Inicio
// -------------------------------

actualizarBarra();
nuevoNumero();
// ----------------------------
// Volver al menú
// ----------------------------

function volverMenu(){

    const salir = confirm(
        "¿Desea volver al menú principal?\n\nSe perderá el progreso de esta partida."
    );

    if(salir){

        window.location.href = "index.html";

    }

}