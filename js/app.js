// ======================================
// MateSonidos
// Aplicación principal
// ======================================

window.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp() {

    mostrarUltimoNivel();

}


// --------------------------------------
// Mostrar último nivel
// --------------------------------------

function mostrarUltimoNivel() {

    const mensaje = document.getElementById("ultimoNivel");

    if (!mensaje) return;

    let ultimoNivel = 1;

    // Intentamos recuperar el último nivel
    if (typeof leerDato === "function") {

        ultimoNivel = leerDato("ultimoNivel", 1);

    }

    mensaje.textContent =
        "Último nivel jugado: Nivel " + ultimoNivel;

}


// --------------------------------------
// Continuar
// --------------------------------------

function continuar() {

    window.location.href = "numeros.html";

}