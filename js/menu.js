// ======================================
// MateSonidos
// Menú principal accesible
// Teclado + mouse + celular
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarMenu
);


let opcion = 0;


// ======================================
// OPCIONES DEL MENÚ
// ======================================

const opciones = [

    {
        id: "nivel1",

        texto:
            "Nivel 1. Conozco los números.",

        accion: function(){

            window.location.href =
                "numeros.html";

        }

    },


    {
        id: "nivel2",

        texto:
            "Nivel 2. Ordena los números.",

        accion: function(){

            window.location.href =
                "secuencias.html";

        }

    },


    {
        id: "nivel3",

        texto:
            "Nivel 3. Comparo números.",

        accion: function(){

            window.location.href =
                "comparar.html";

        }

    },


    {
        id: "nivel4",

        texto:
            "Nivel 4. Número y cantidad.",

        accion: function(){

            // IMPORTANTE:
            // Nivel 4 abre primero
            // su submenú.

            window.location.href =
                "nivel4.html";

        }

    },


    {
        id: "configuracion",

        texto:
            "Configuración. Próximamente.",

        accion: function(){

            hablar(
                "Configuración. Próximamente."
            );

        }

    },


    {
        id: "ayuda",

        texto:
            "Ayuda. Próximamente.",

        accion: function(){

            hablar(
                "Ayuda. Próximamente."
            );

        }

    }

];


// ======================================
// INICIAR MENÚ
// ======================================

function iniciarMenu(){

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


            // ==============================
            // MOUSE
            // ==============================

            elemento.addEventListener(
                "mouseenter",
                function(){

                    opcion = indice;

                    actualizarSeleccion();

                }
            );


            // ==============================
            // CLICK / CELULAR
            // ==============================

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
// ACTUALIZAR SELECCIÓN
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
// SELECCIONAR OPCIÓN
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
// ACTIVAR OPCIÓN
// ======================================

function activar(){

    const seleccion =
        opciones[opcion];


    if(
        seleccion &&
        seleccion.accion
    ){

        seleccion.accion();

    }

}


// ======================================
// TECLADO
// ======================================

document.addEventListener(
    "keydown",
    function(e){

        // ------------------------------
        // FLECHA ABAJO
        // ------------------------------

        if(e.key === "ArrowDown"){

            e.preventDefault();

            seleccionar(
                opcion + 1
            );

        }


        // ------------------------------
        // FLECHA ARRIBA
        // ------------------------------

        if(e.key === "ArrowUp"){

            e.preventDefault();

            seleccionar(
                opcion - 1
            );

        }


        // ------------------------------
        // ESPACIO
        // ------------------------------

        if(e.key === " "){

            e.preventDefault();

            hablar(
                opciones[opcion].texto
            );

        }


        // ------------------------------
        // ENTER
        // ------------------------------

        if(e.key === "Enter"){

            e.preventDefault();

            activar();

        }

    }
);