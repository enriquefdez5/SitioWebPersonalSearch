function mostrarEnlace(enlace) {
    switch (true){
        case enlace.includes("index"):
            return "Perfil";
            break;
        case enlace.includes("aficiones"):
            return "Aficiones";
            break;
        case enlace.includes("musica"):
            return "Música";
            break;
        case enlace.includes("pueblo"):
            return "Pueblo";
            break;
        default:
            return "holita";
            break;
    }
}

// Lista de objectos que contendrán el contenido y enlace que se mostrará al usuario.
let enlaces = []
// Se inicializa el contenido del str que será devuelto al usuario.
let str = "<div class='container'> <h2>Resultados de la búsqueda</h2>"

// Al cargar la ventana
window.addEventListener("load", () => {
    if (window.location.href.includes("busquedas")) {
        const urlParams = new URLSearchParams(window.location.search)
        let input = urlParams.get("input")
        $("#search").load("index.html #main", function (data) {
            recursiveEach($(data), enlaces, input, "index.html")
            $("#search").load("aficiones.html #main", function (data2) {
                recursiveEach($(data2), enlaces, input, "aficiones.html")
                $("#search").load("musica.html #main", function (data3) {
                    recursiveEach($(data3), enlaces, input, "musica.html")
                    $("#search").load("pueblo.html #main", function (data4) {
                        recursiveEach($(data4), enlaces, input, "pueblo.html")
                        if (enlaces.length == 0) {
                            str = str.concat("<p>No se ha encontrado ningún resultado...</p></div>")
                        }
                        else {
                            str = str.concat("<p>Se han encontrado " + enlaces.length + " resultados</p><div id='resultados' class='container'>")
                            for (enlace of enlaces) {
                                str = str.concat("<div class='container searchresult'><a class='grande' href='" + enlace.enlace + "'>" + mostrarEnlace(enlace.enlace) + "</a><p>" + enlace.contenido + "</p></div>")
                            }
                            str.concat("</div></div>")
                        }
                        $("#main2").append(str.toString())
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

function recursiveEach(element, enlaces, input, link){
    element.children().each(function () {
        var currentElement = $(this);
        for (let elem of currentElement) {
            if (enlaces.filter(e => {
                return e.contenido.split(/\s+/).join(' ').substring(0, 40).trim()
                    .includes(elem.innerText.split(/\s+/).join(' ').substring(0, 40).trim())}).length > 0) {

            }
            else {
                if (elem.innerText.toLowerCase().includes(input.toLowerCase())) {
                    if (elem.closest("section") !== undefined && elem.closest("section") != null) {
                        enlaces.push({
                            contenido: elem.innerText.split(/\s+/).join(' ').substring(0, 40) + "...",
                            enlace: link + elem.closest("section").getAttribute("id")
                        })
                    } else if (elem.closest("footer") !== undefined && elem.closest("footer") != null) {
                        enlaces.push({
                            contenido: elem.innerText.split(/\s+/).join(' ').substring(0, 40) + "...",
                            enlace: link + elem.closest("footer").getAttribute("id")
                        })
                    } else {
                        enlaces.push({
                            contenido: elem.innerText.split(/\s+/).join(' ').substring(0, 40) + "...",
                            enlace: link
                        })
                    }
                }
            }
        }
        // Loop her children
        recursiveEach(currentElement, enlaces, input, link);
    });
}

