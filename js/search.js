function mostrarEnlace(enlace) {
    console.log("enlace")
    console.log(enlace)
    console.log(enlace.includes("index"))
    let retstr = ""
    switch (enlace){
        case enlace.includes("index"): console.log("ey"); retstr = "Perfil"; break;
        case enlace.includes("aficiones"): retstr = "Aficiones"; break;
        case enlace.includes("musica"): retstr = "Música"; break;
        case enlace.includes("pueblo"): retstr = "Pueblo"; break;
    }
    return retstr
}

let enlaces = []
let str = "<h2>Resultados de la búsqueda</h2><div id='resultados' class='container'>"

window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search)
    let input = urlParams.get("input")
    // let str = "<h2>Resultados de la búsqueda</h2><div id='resultados' class='container'>"
    $("#search").load("index.html #main", function (data) {
        recursiveEach($(data), enlaces, input, "index.html")
        $("#search").load("aficiones.html #main", function (data2) {
            recursiveEach($(data2), enlaces, input, "aficiones.html")
            $("#search").load("musica.html #main", function (data3) {
                recursiveEach($(data3), enlaces, input, "musica.html")
                $("#search").load("pueblo.html #main", function (data4) {
                    recursiveEach($(data4), enlaces, input, "pueblo.html")
                    for (enlace of enlaces) {
                        str = str.concat("<div class='container'><a href='" + enlace.enlace + "'>" + mostrarEnlace(enlace.enlace) + "</a><p>" + enlace.contenido + "</p></div>")
                    }
                    str.concat("</div)")
                    $("#main2").append(str.toString())
                })
            })
        })
    })
})
function search() {
    let input = $("#searchInput").val()
    window.location.href = "busquedas.html?input="+input
}

function recursiveEach(element, enlaces, input, link){
    element.children().each(function () {
        var currentElement = $(this);
        for (let elem of currentElement) {
            if (enlaces.filter(e => e.contenido === elem.innerText).length > 0) {
                console.log("repe!")
            }
            else {
                if (elem.innerText.toLowerCase().includes(input.toLowerCase())) {
                    if (elem.closest("section") !== undefined && elem.closest("section") != null) {
                        enlaces.push({
                            contenido: elem.innerText.substr(0, 40),
                            enlace: link + elem.closest("section").getAttribute("id")
                        })
                    } else if (elem.closest("footer") !== undefined && elem.closest("footer") != null) {
                        enlaces.push({
                            contenido: elem.innerText.substring(0, 40),
                            enlace: link + elem.closest("footer").getAttribute("id")
                        })
                    } else {
                        enlaces.push({
                            contenido: elem.innerText.substring(0, 40),
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

