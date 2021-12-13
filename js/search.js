function search() {
    let input = $("#searchInput").val()
    let enlaces = []
    $("#search").load("index.html #main", function (data) {
        recursiveEach($(data), enlaces, input)
        for (enlace of enlaces)
        console.log("enlaces")
        console.log(enlaces)
    })

}

function recursiveEach(element, enlaces, input){
    element.children().each(function () {
        var currentElement = $(this);
        for (let elem of currentElement) {
            if (elem != undefined && elem.innerText.toLowerCase().includes(input.toLowerCase()) ) {
                console.log("elem")
                console.log(elem)
                console.log("elem.innerText")
                console.log(elem.innerText)
                if (elem.closest("section") != undefined && elem.closest("section") != null) {
                    console.log("closest")
                    console.log(elem.closest("section"))
                    enlaces.push({
                        contenido: elem.innerText,
                        enlace: "index.html#"+elem.closest("section").getAttribute("id")
                    })
                }
                else if (elem.closest("footer") != undefined && elem.closest("footer") != null) {
                    console.log("closest")
                    console.log(elem.closest("footer"))
                    enlaces.push({
                        contenido: elem.innerText,
                        enlace: "index.html#"+elem.closest("footer").getAttribute("id")
                    })
                }
                else {
                    console.log("closest")
                    console.log(elem.closest("main"))
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

