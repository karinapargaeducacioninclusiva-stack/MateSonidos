// =====================================
// MateSonidos
// Sistema de guardado
// =====================================

// Guarda un dato
function guardarDato(clave, valor) {

    localStorage.setItem(clave, JSON.stringify(valor));

}

// Lee un dato
function leerDato(clave, valorPorDefecto = null) {

    const dato = localStorage.getItem(clave);

    if (dato === null) {

        return valorPorDefecto;

    }

    return JSON.parse(dato);

}

// Borra un dato
function borrarDato(clave) {

    localStorage.removeItem(clave);

}

// Borra todo el progreso
function borrarTodo() {

    localStorage.clear();

}