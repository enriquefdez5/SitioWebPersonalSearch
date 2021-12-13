function search() {
    let input = $("#searchInput").val()
    let map = {}
    $("#search").load("index.html #main", function (data){
        recursiveEach($(data))
    })

    function recursiveEach(element){
        element.children().each(function () {
            var currentElement = $(this);
            for (let elem of currentElement) {
                if (elem != undefined && elem.innerText.toLowerCase().includes(input.toLowerCase()) ) {
                    console.log("elem")
                    console.log(elem)
                    console.log("elem.innerText")
                    console.log(elem.innerText)
                    console.log("closest")
                    console.log(elem.closest("section"))
                    // $(elem).attr("refe")
                    // objeto.add({
                    //     "contenido": elem.innerText.length > 20 ? elem.innerText.substr(0, 20) : elem.innerText,
                    //     "referencia": input + i.toString
                    // })
                }
            }
            // Loop her children
            recursiveEach(currentElement);
        });
    }
}

