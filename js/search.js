/**
 * Función que formatea un enlace
 * @param enlace Enlace que formatear
 * @returns {string} Enlace formateado
 */
function mostrarEnlace(enlace) {
    switch (true){
        // Si incluye index
        case enlace.includes("index"):
            return "Perfil";
            break;
        // Si incluye aficiones
        case enlace.includes("aficiones"):
            return "Aficiones";
            break;
        // Si incluye musica
        case enlace.includes("musica"):
            return "Música";
            break;
        // Si incluye pueblo
        case enlace.includes("pueblo"):
            return "Pueblo";
            break;
        // En cualquier otro caso
        default:
            return "Link";
            break;
    }
}

// Lista de objectos que contendrán el contenido y enlace que se mostrará al usuario.
let enlaces = []
// Se inicializa el contenido del str que será devuelto al usuario.
let str = "<div class='container'> <h2>Resultados de la búsqueda</h2>"

// Al cargar la ventana busquedas.html (on -> load)
window.addEventListener("load", () => {
    // solo para la ventana busquedas
    if (window.location.href.includes("busquedas")) {
        // obtenemos el parámetro que contiene el campo de búsqueda
        const urlParams = new URLSearchParams(window.location.search)
        let input = urlParams.get("input")
        // cargamos los html y vamos guardando los elementos de texto qeu coinciden con el campo de búsqueda.
        // Esto se produce por cada html
        $("#search").load("index.html #main", function (data) {
            // Búsqueda recursiva en los datos cargados.
            recursiveEach($(data), enlaces, input, "index.html")
            $("#search").load("aficiones.html #main", function (data2) {
                recursiveEach($(data2), enlaces, input, "aficiones.html")
                $("#search").load("musica.html #main", function (data3) {
                    recursiveEach($(data3), enlaces, input, "musica.html")
                    $("#search").load("pueblo.html #main", function (data4) {
                        recursiveEach($(data4), enlaces, input, "pueblo.html")
                        // Si no se ha encontrado ningún resultado.
                        if (enlaces.length == 0) {
                            // Se forma la cadena de texto que se devolverá
                            str = str.concat("<p>No se ha encontrado ningún resultado...</p></div>")
                        }
                        // Si se han encontrado resultados
                        else {
                            // Se forma la cadena de texto que se devolverá
                            str = str.concat("<p>Se han encontrado " + enlaces.length + " resultados</p><div id='resultados' class='container'>")
                            // Para cada enlace se devuelve un link y un resumen del contenido
                            for (enlace of enlaces) {
                                // mostrarEnlace es una función para formatear el link.
                                str = str.concat("<div class='container searchresult'><a class='grande' href='" + enlace.enlace + "'>" + mostrarEnlace(enlace.enlace) + "</a><p>" + enlace.contenido + "</p></div>")
                            }
                            // Se termina la cadena que se devovlerá al usuario.
                            str.concat("</div></div>")
                        }
                        // Se añade el texto a la vista html
                        $("#main2").append(str.toString())
                        // Se elimina el elemento sobre el que se cargan los html para mejorar la accesibilidad.
                        // Al volver a cargar el documento volverá a estar, pero nunca se llegará a visualizar al usuario.
                        $("#search").remove()
                    })
                })
            })
        })
    }
})


/**
 * Función que es llamada por el botón al haber hecho click sobre él
 * Recupera el contenido del campo de búsqueda y carga el html sobre el que aparecerán los resultados de la búsqueda
 * (busquedas.html). Además pasa como parámetro el valor del input ?input=+input.
 * Al cargar la ventana se produce un evento que cargará el código escrito antes de esta función.
 */
function search() {
    let input = $("#searchInput").val()
    window.location.href = "busquedas.html?input="+input
}

/**
 * Función que realiza la búsqueda recursiva.
 * @param element. Elemento sobre el que buscar, o bien en sus hijos, o bien en su contenido
 * @param enlaces. Lista de objetos sobre la que se añadirán enalces y contenido de cada enlace.
 * @param input. Parámetro de búsqueda.
 * @param link. Enlace del documento para formatear el enlace
 */
function recursiveEach(element, enlaces, input, link){
    // Por cada hijo del elemento
    element.children().each(function () {
        var currentElement = $(this);
        // Por todos los elementos del elemento
        for (let elem of currentElement) {
            // Si está repetido (Coincide un substring formateado sin grandes espacios)
            if (enlaces.filter(e => {
                return e.contenido.split(/\s+/).join(' ').substring(0, 40).trim()
                    .includes(elem.innerText.split(/\s+/).join(' ').substring(0, 40).trim())}).length > 0) {

            }
            // Si no está repetido
            else {
                // Se comprueba que incluya el campo de búsqueda.
                if (elem.innerText.toLowerCase().includes(input.toLowerCase())) {
                    // Si tiene un padre section se añade el id de esa sección para devolver un enlace más preciso.
                    if (elem.closest("section") !== undefined && elem.closest("section") != null) {
                        enlaces.push({
                            contenido: elem.innerText.split(/\s+/).join(' ').substring(0, 40) + "...",
                            enlace: link + elem.closest("section").getAttribute("id")
                        })
                    }
                    // Si tiene un padre footer se añade el id de ese footer para devolver un enlace más preciso.
                    else if (elem.closest("footer") !== undefined && elem.closest("footer") != null) {
                        enlaces.push({
                            contenido: elem.innerText.split(/\s+/).join(' ').substring(0, 40) + "...",
                            enlace: link + elem.closest("footer").getAttribute("id")
                        })
                    }
                    // En cualquier otro caso, se devuelve el enlace del documento sin precisión.
                    else {
                        enlaces.push({
                            contenido: elem.innerText.split(/\s+/).join(' ').substring(0, 40) + "...",
                            enlace: link
                        })
                    }
                }
            }
        }
        // Recursividad aquí.
        recursiveEach(currentElement, enlaces, input, link);
    });
}

