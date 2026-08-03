// ======================================
// MateSonidos
// Aplicación principal
// ======================================

window.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp(){

    mostrarUltimoNivel();

}

function mostrarUltimoNivel(){

    const ultimoNivel = leerDato("ultimoNivel", 1);

    const mensaje = document.getElementById("ultimoNivel");

    if(!mensaje) return;

    mensaje.textContent =
        "Último nivel jugado: Nivel " + ultimoNivel;

}

function continuar(){

    const ultimoNivel = leerDato("ultimoNivel", 1);

    switch(ultimoNivel){

        case 1:
            window.location = "numeros.html";
            break;

        case 2:
            window.location = "secuencias.html";
            break;

        default:
            window.location = "numeros.html";

    }

}