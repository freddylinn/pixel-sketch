const container = document.querySelector(".squareContainer");

for(let i = 0; i < 256; i++){

    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("draggable",false);

    square.addEventListener("mousedown", (e) => { e.target.classList.add("changed"); }) // ensures the first square clicked changes
    square.addEventListener("mouseenter", function(e) { // changes all other squares when dragging
        if(e.buttons == 1){ 
            e.target.classList.add("changed"); 
        }
    })

    container.appendChild(square);

}