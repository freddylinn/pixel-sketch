/* Setup */

const container = document.querySelector(".squareContainer");

// color picker related
let currColor = "#000000";
const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("input", (e) => { currColor = e.target.value; })

// setting up color modes
let currMode = "single";
const defaultMode = document.querySelector("#single");
updateMode(defaultMode);

createGrid(16);


/* Functions */

function getSquares(){  // returns a nodelist of every square
    const allSquareSelector = document.querySelectorAll(".square");
    return allSquareSelector;
}


function randomRGBA(){   // generates a random rgba value
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const alpha = Math.random() + 0.1;
    return `rgba(${red},${blue},${green},${alpha})`;
}


function createGrid(sideLength){    // creates the initial grid and updates when a new one is made

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

        square.addEventListener("mousedown", (e) => {   // changes first square when pressed down on
            if(currMode == "single"){ 
                e.target.style.backgroundColor = currColor;
                e.target.classList.remove("rainbowed");
            }
            else if(currMode == "rainbow"){
                if(!e.target.classList.contains("rainbowed")){
                    e.target.style.backgroundColor = randomRGBA();
                    e.target.classList.add("rainbowed");
                }
            }
            else if(currMode == "eraser"){
                e.target.style.backgroundColor = "white";
                e.target.classList.remove("rainbowed");
            }
        })
        square.addEventListener("mouseenter", (e) => { // changes all other squares when dragging
            if(e.buttons == 1){

                if(currMode == "single"){ 
                    e.target.style.backgroundColor = currColor;
                    e.target.classList.remove("rainbowed");
                }
                else if(currMode == "rainbow"){
                    if(!e.target.classList.contains("rainbowed")){
                        e.target.style.backgroundColor = randomRGBA();
                        e.target.classList.add("rainbowed");
                    }
                }
                else if(currMode == "eraser"){
                    e.target.style.backgroundColor = "white";
                    e.target.classList.remove("rainbowed");
                }
            }
        })

        container.appendChild(square);

    }

}


function updateMode(pressedButton){ // updates the selected button for visual clarity and switches modes for logic

    const colorsClass = document.querySelector(".colors");
    const modeButtons = colorsClass.children;

    for(const button of modeButtons){
        button.classList.remove("buttonSelected")
    }

    pressedButton.classList.add("buttonSelected");
    currMode = pressedButton.id;

}


/* Buttons */

// "Single Color Mode" Button
const singleButton = document.querySelector("#single");
singleButton.addEventListener("click", () => { updateMode(singleButton); })


// "Rainbow Mode" Button
const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", () => { updateMode(rainbowButton); })


// "Eraser" Button
const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", () => { updateMode(eraserButton); })


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
        oneSquare.style.backgroundColor = "white";
        oneSquare.classList.remove("rainbowed");
    }
})


// "New Grid" Button
const newGridButton = document.querySelector("#newGrid");
newGridButton.addEventListener("click", () => {

    let rawInput = prompt("Enter a new side length:");
    const convertedInput = parseInt(rawInput);

    if(convertedInput <= 100 && convertedInput >= 1){
        createGrid(convertedInput);
    }
    else{
        alert("Invalid input. Please try again.");
    }

})

