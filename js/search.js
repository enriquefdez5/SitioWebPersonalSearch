let enlaces = []
window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search)
    let input = urlParams.get("input")
    $("#search").load("index.html #main", function (data) {
        recursiveEach($(data), enlaces, input)
        for (enlace of enlaces) {
            $("#main2").append("<div class='container'><a href='" + enlace.enlace + "'>" + enlace.enlace + "</a><p>" + enlace.contenido + "</p></div>")
        }
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
            console.log(elem.innerText.toLowerCase())
            console.log(input.toLowerCase())
            console.log(elem.innerText.toLowerCase().includes(input.toLowerCase()))
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

