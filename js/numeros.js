
let numeroCorrecto;

let aciertos = 0;

let errores = 0;
let pregunta = 1;

function nuevoNumero(){

    numeroCorrecto = Math.floor(Math.random()*10)+1;

    document.getElementById("numero").textContent = numeroCorrecto;
hablar("¿Qué número es este? " + numeroCorrecto);const circulo = document.querySelector(".circulo");

circulo.style.animation = "none";

circulo.offsetHeight; // fuerza el reinicio de la animación

circulo.style.animation = "aparecer .3s";
}

function corregir(){

    let respuesta = document.getElementById("respuesta").value;

    if(respuesta == numeroCorrecto){

        document.getElementById("resultado").textContent="✅ ¡Muy bien!";
aciertos++;

document.getElementById("aciertos").textContent =
"⭐ Aciertos: " + aciertos;
if(pregunta < 10){

    pregunta++;

    document.getElementById("pregunta").textContent =
    "📘 Pregunta: " + pregunta + " de 10";

}else{

    hablar("Felicitaciones. Terminaste el nivel.");
let mensaje = "";

if(aciertos == 10){
    mensaje = "🏆 ¡Excelente trabajo!";
}else if(aciertos >= 8){
    mensaje = "🌟 ¡Muy bien!";
}else if(aciertos >= 6){
    mensaje = "👍 ¡Buen trabajo! Sigue practicando.";
}else{
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
if(pregunta < 10){

    setTimeout(function(){

        nuevoNumero();

        document.getElementById("respuesta").value="";

        document.getElementById("resultado").textContent="";

        document.getElementById("respuesta").focus();

    },1000);

}

    }else{

        document.getElementById("resultado").textContent="❌ Intenta nuevamente.";
errores++;

document.getElementById("errores").textContent =
"❌ Errores: " + errores;
        document.getElementById("respuesta").focus();

    }
    document.getElementById("respuesta").addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        corregir();

    }

});

}
function hablar(texto){

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    voz.rate = 0.9;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}
nuevoNumero();

document.getElementById("respuesta").focus();
document.getElementById("respuesta").addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        corregir();

    }

});
