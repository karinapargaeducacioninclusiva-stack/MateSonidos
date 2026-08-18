// ======================================
// MateSonidos
// Menú Nivel 4
// Número y cantidad
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarMenuNivel4
);


let opcion = 0;


const opciones = [

    {
        id: "nivel41",

        texto:
            "Nivel 4.1. " +
            "Reconozco cantidades.",

        accion: function(){

            window.location.href =
                "cantidad.html";

        }

    },


    {
        id: "nivel42",

        texto:
            "Nivel 4.2. " +
            "Relaciono número y cantidad.",

        accion: function(){

            window.location.href =
                "relaciona.html";

        }

    },


    {
    
    id: "nivel43",

    texto:
        "Nivel 4.3. " +
        "Cuántos hay.",

    accion: function(){

        window.location.href =
            "cuantos.html";


},

    },

       {
    id: "nivel44",

    texto:
        "Nivel 4.4. " +
        "Antes y después.",

    accion: function(){

        window.location.href =
            "antesdespues.html";

    }



    },


    {
        id: "volver",

        texto:
            "Volver al menú principal.",

        accion: function(){

            window.location.href =
                "index.html";

        }

    }

];


// ======================================
// INICIAR
// ======================================

function iniciarMenuNivel4(){

    actualizarSeleccion();


    opciones.forEach(
        function(op, indice){

            const elemento =
                document.getElementById(
                    op.id
                );


            if(!elemento){

                return;

            }


            // Mouse

            elemento.addEventListener(
                "mouseenter",
                function(){

                    opcion = indice;

                    actualizarSeleccion();

                }
            );


            // Click / celular

            elemento.addEventListener(
                "click",
                function(){

                    opcion = indice;

                    actualizarSeleccion();

                    activar();

                }
            );

        }
    );

}


// ======================================
// SELECCIÓN VISUAL
// ======================================

function actualizarSeleccion(){

    opciones.forEach(
        function(op){

            const elemento =
                document.getElementById(
                    op.id
                );


            if(elemento){

                elemento.classList.remove(
                    "menuActivo"
                );

            }

        }
    );


    const actual =
        document.getElementById(
            opciones[opcion].id
        );


    if(actual){

        actual.classList.add(
            "menuActivo"
        );

    }

}


// ======================================
// SELECCIONAR
// ======================================

function seleccionar(indice){

    if(
        indice >=
        opciones.length
    ){

        indice = 0;

    }


    if(indice < 0){

        indice =
            opciones.length - 1;

    }


    opcion = indice;


    actualizarSeleccion();


    hablar(
        opciones[opcion].texto
    );

}


// ======================================
// ACTIVAR
// ======================================

function activar(){

    const seleccion =
        opciones[opcion];


    if(seleccion.accion){

        seleccion.accion();

    }

}


// ======================================
// TECLADO
// ======================================

document.addEventListener(
    "keydown",
    function(e){

        if(e.key === "ArrowDown"){

            e.preventDefault();

            seleccionar(
                opcion + 1
            );

        }


        if(e.key === "ArrowUp"){

            e.preventDefault();

            seleccionar(
                opcion - 1
            );

        }


        if(e.key === " "){

            e.preventDefault();

            hablar(
                opciones[opcion].texto
            );

        }


        if(e.key === "Enter"){

            e.preventDefault();

            activar();

        }

    }
);