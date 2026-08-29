// ======================================
// MateSonidos
// Menú principal accesible
// Teclado + mouse + celular
// Primer borrador: Niveles 1, 2 y 3
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

    // ----------------------------------
    // NIVEL 1
    // ----------------------------------

    {
        id: "nivel1",

        texto:
            "Nivel 1. Conozco los números.",

        accion: function(){

            window.location.href =
                "numeros.html";

        }

    },


    // ----------------------------------
    // NIVEL 2
    // ----------------------------------

    {
        id: "nivel2",

        texto:
            "Nivel 2. Ordena los números.",

        accion: function(){

            window.location.href =
                "secuencias.html";

        }

    },


    // ----------------------------------
    // NIVEL 3
    // ----------------------------------

    {
        id: "nivel3",

        texto:
            "Nivel 3. Comparo números.",

        accion: function(){

            window.location.href =
                "comparar.html";

        }

    },


    // ----------------------------------
    // CONFIGURACIÓN
    // ----------------------------------

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


    // ----------------------------------
    // AYUDA
    // ----------------------------------

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

        if(
            e.key === "ArrowDown"
        ){

            e.preventDefault();

            seleccionar(
                opcion + 1
            );

        }


        // ------------------------------
        // FLECHA ARRIBA
        // ------------------------------

        if(
            e.key === "ArrowUp"
        ){

            e.preventDefault();

            seleccionar(
                opcion - 1
            );

        }


        // ------------------------------
        // ESPACIO
        // ------------------------------

        if(
            e.key === " "
        ){

            e.preventDefault();

            hablar(
                opciones[opcion].texto
            );

        }


        // ------------------------------
        // ENTER
        // ------------------------------

        if(
            e.key === "Enter"
        ){

            e.preventDefault();

            activar();

        }

    }
);