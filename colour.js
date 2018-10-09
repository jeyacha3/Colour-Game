var numSquares = 6;
var colours = [];
var selectedColour;
var squares = document.getElementsByClassName("square");
var colourDisplay = document.getElementById("colourCode");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetColours = document.getElementById("reset");
var diffMode = document.getElementsByClassName("mode");

//load everything when page loads
init();

function init() {
   setDiffModeBtn();
    setSquares();
    reset();
}

//difficulty modes event listeners
function setDiffModeBtn() {
    for(var i = 0; i < diffMode.length; i++) {
        diffMode[i].addEventListener("click", function(){
            diffMode[0].classList.remove("selected");
            diffMode[1].classList.remove("selected");
            diffMode[2].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy") {
                numSquares = 3;
            }
            else if (this.textContent === "Normal") {
                numSquares = 6;
            }
            else {
                numSquares = 9;
            }
            reset();
        });
    }
}

function setSquares() {
    for(var i = 0; i < squares.length; i++) {
        //add event listeners (click)
        squares[i].addEventListener("click", function(){
        //find colour value of clicked square
        var pickedColour = this.style.backgroundColor;
        //compare colour value of square to selected colour
        if (pickedColour === selectedColour){
            //display message
            messageDisplay.textContent = "Correct!";
            //change all squares to correct colour
            correctDisplay(selectedColour);
            //change h1 to correct colour
            h1.style.backgroundColor = selectedColour;
            //change text on reset button
            resetColours.textContent = "Play Again?"
        }
        else {
            //fade out incorrect square and display message
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
        });
    }
}

function reset(){
    //generate new colours
    colours = generateRandomColours(numSquares);
    //pick new colour to guess
    selectedColour = pickedColour();
    //change displayed rgb value
    colourDisplay.textContent = selectedColour;
    resetColours.textContent = "New Colours";
    messageDisplay.textContent = "";
    //change colour of squares
    for (var i = 0; i < squares.length; i ++){
        if(colours[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colours[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "#121212";
}

//reset colours
resetColours.addEventListener("click", function(){
    reset();
})

function correctDisplay(colour){
    //change colours to match correct colour
    for(var i = 0; i < colours.length; i++) {
        squares[i].style.backgroundColor = colour;
    }
}

function pickedColour(){
    //pick random number to be used to pick colour
    var random = Math.floor(Math.random() * colours.length);
    return colours[random];
}

function generateRandomColours(x){
    var colourArray = [];
    //push x number of colours to array
    for(var i = 0; i < x; i++){
        colourArray.push(randomColour());
    }
    return colourArray;
}

function randomColour(){
    //pick a random red value (0 - 255)
    var red = Math.floor(Math.random() * 256);
    //pick a random green value (0 - 255)
    var green = Math.floor(Math.random() * 256);
    //pick a random blue value (0 - 255)
    var blue = Math.floor(Math.random() * 256);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}