let enlaces = []
let str = "<h2>Resultados de la búsqueda</h2><div id='resultados' class='container'>"

window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search)
    let input = urlParams.get("input")
    // let str = "<h2>Resultados de la búsqueda</h2><div id='resultados' class='container'>"
    $("#search").load("index.html #main", function (data) {
        recursiveEach($(data), enlaces, input)
        console.log("enlaces 1")
        console.log(enlaces)
        console.log("#search 1")
        console.log($("#search"))
        $("#search").load("aficiones.html #main", function (data2) {
            recursiveEach($(data2), enlaces, input)
            console.log("enlaces 2")
            console.log(enlaces)
            console.log("#search 2")
            console.log($("#search"))
            $("#search").load("musica.html #main", function (data3) {
                recursiveEach($(data3), enlaces, input)
                console.log("enlaces 4")
                console.log(enlaces)
                console.log("#search 3")
                console.log($("#search"))
                $("#search").load("pueblo.html #main", function (data4) {
                    recursiveEach($(data4), enlaces, input)
                    console.log("enlaces 4")
                    console.log(enlaces)
                    console.log("#search 4")
                    console.log($("#search"))
                    for (enlace of enlaces) {
                        str = str.concat("<div class='container'><a href='" + enlace.enlace + "'>" + enlace.enlace + "</a><p>" + enlace.contenido + "</p></div>")
                        // $("#main2").append("<div class='container'><a href='" + enlace.enlace + "'>" + enlace.enlace + "</a><p>" + enlace.contenido + "</p></div>")
                    }
                    str.concat("</div)")
                    console.log("ey")
                    console.log(str)
                    $("#main2").append(str.toString())
                })
            })
        })
    })
})
function search() {
    let input = $("#searchInput").val()
    window.location.href = "busquedas.html?input="+input

    // let input = $("#searchInput").val()
    // $("#search").load("index.html #main", function (data) {
    //     recursiveEach($(data), enlaces, input)
    // })
    // window.location.href = "busquedas.html"
}

function recursiveEach(element, enlaces, input){
    element.children().each(function () {
        var currentElement = $(this);
        for (let elem of currentElement) {
            // console.log(elem.innerText.toLowerCase())
            // console.log(input.toLowerCase())
            // console.log(elem.innerText.toLowerCase().includes(input.toLowerCase()))
            if (elem.innerText.toLowerCase().includes(input.toLowerCase()) ) {
                if (elem.closest("section") !== undefined && elem.closest("section") != null) {
                    enlaces.push({
                        contenido: elem.innerText,
                        enlace: "index.html#"+elem.closest("section").getAttribute("id")
                    })
                }
                else if (elem.closest("footer") !== undefined && elem.closest("footer") != null) {
                    enlaces.push({
                        contenido: elem.innerText,
                        enlace: "index.html#"+elem.closest("footer").getAttribute("id")
                    })
                }
                else {
                    enlaces.push({
                        contenido: elem.innerText,
                        enlace: "index.html#main"
                    })
                }
            }
        }
        // Loop her children
        recursiveEach(currentElement, enlaces, input);
    });
}

