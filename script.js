const container = document.querySelector(".squareContainer");
let eraserActive = false;
createGrid(16);

function getSquares(){
    const allSquareSelector = document.querySelectorAll(".square");
    return allSquareSelector;
}

function createGrid(sideLength){

    for(const oneSquare of getSquares()){
        oneSquare.remove();
    }

    const totalSquareNum = sideLength * sideLength;

    container.style.gridTemplateColumns = `repeat(${sideLength},1fr)`;
    container.style.gridTemplateRows = `repeat(${sideLength},1fr)`;

    for(let i = 0; i < totalSquareNum; i++){

        const square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("borderToggle");
        square.setAttribute("draggable",false);

        square.addEventListener("mousedown", (e) => {
            if(eraserActive === false){ 
                e.target.classList.add("changed");
            }
            else{
                e.target.classList.remove("changed");
            } 
        })
        square.addEventListener("mouseenter", function(e) { // changes all other squares when dragging
            if(e.buttons == 1){
                if(eraserActive === false){ 
                    e.target.classList.add("changed");
                }
                else{
                    e.target.classList.remove("changed");
                } 
            }
        })

        container.appendChild(square);

    }

}

// "Eraser" Button
const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", () => { 
    eraserButton.classList.toggle("buttonSelected");
    if(eraserActive === true){
        eraserActive = false;
    }
    else{
        eraserActive = true;
    } 
})

// "Toggle Border Boxes" Button
const borderButton = document.querySelector("#borders");
borderButton.addEventListener("click", () => { 
    for(const oneSquare of getSquares()){
        oneSquare.classList.toggle("borderToggle");
    }
})

// "Clear" Button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    for(const oneSquare of getSquares()){
        oneSquare.classList.remove("changed");
    }
})

// "New Grid" Button
const newGridButton = document.querySelector("#newGrid");
newGridButton.addEventListener("click", () => {

    let rawInput = prompt("Enter a new side length: (please only use whole numbers)");
    const convertedInput = parseInt(rawInput);

    if(convertedInput <= 100 && convertedInput >= 1){
        createGrid(convertedInput);
    }

})

