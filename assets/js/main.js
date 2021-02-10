// Splash page
// We declare nodes from the splash page 
const welcome = document.querySelector('.welcome'),
    macIcon = document.querySelector('.mac_loader'),
    main = document.getElementById('main'),
    header = document.getElementById('header'),
    overlay = document.querySelector('.window-overlay'),
    errorMsg = document.querySelector('.error_mobile'),
    splash = document.getElementById('splash');

// Here we listen when the doc and all assets are loaded
window.addEventListener("load", function(e) {
    // If the user is on large devices
    if(window.innerWidth > 599){
        setTimeout(function() {
            // Remove the first mac icon
            macIcon.remove();
            // Then show the 'welcome to Macintosh message' with a cool anim
            welcome.classList.add('anim-show');
            // If the animation is ended, and the screen is loaded we show the website
            welcome.addEventListener('animationend', () => {
            splash.remove();
            // Two seconds for the animation to end 
        });}, 2000); 
    } else {
        // If the user is on small devices
        {setTimeout(function() {
            // We change the icon
            macIcon.style.backgroundImage = "url(/assets/icons/sadmac.svg)";
            // We remove its bouncing animation
            macIcon.classList.remove('anim-load');
            // Change the background color and show an error message!
            splash.style.background = "#000";
            errorMsg.innerHTML = "Sorry, a system error occured. <br> macOs deosn't work on small devices."; 
            // Fake it until you make it ;)
        }, 8000);}
    };
});

// Dropdown menu
// We select all the menus el from the header ['file', 'edit', 'view', 'special']
const items = document.querySelectorAll('.mac_menu > li');
// When the user clicks the header we add the class 'menu-item'
// Bref: when the header is on focus, we can see the howver effect when it's not we cant hover over it 
header.addEventListener('click', () => {
    for (item of items){
        item.classList.add('menu-item');
    };
});
// if the user clicks the main content the header is no longer active so the hover effect
// is disabled, it's a mac thing!!!
main.addEventListener('click', () => {
    for (item of items){
        item.classList.remove('menu-item');
    };
});

// Making icons draggable
// Real stuff!
class Window {
    /* Creating window and all of it's nodes : header, body, close btn, resize btn, icon
    Each window has an btn (this.icon) which opens the window and 
    First time wotking with JS but this how we do it in Pyhton ;)
    There is many window types, I decided to create one class with no subclasses for simplicity
    I used ternary and arguments for this.
    */ 
    constructor(selector, windowDraggable = true){
        this.icon = document.getElementById(selector);
        this.window = document.querySelector('.window.' + selector);
        this.windowDraggable = windowDraggable;
        this.closeBtn = document.querySelector('.close_btn.' + selector);
        this.resizeBtn = document.querySelector('.resize_btn.' + selector);
        if(!this.windowDraggable) this.windowHeader = this.window.children[0];
    }

    // drag just like in jquery ;)
    drag(el2, el1) {
        // Declaring positions
        let pos1 = 0, pos2 = 0, pos3, pos4;
        // I've used a defined function in order to remove the event when needed with removeEve..
        el1.addEventListener('mousedown', function handleMouseDown(e) { 
            // focusing an element when is dragged for the :focus selector
            el2.focus();
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = (e) => {
                document.onmouseup = null;
                document.onmousemove = null;                          
            };
            
            document.onmousemove = (e) => {
                e = e || window.event;
                e.preventDefault();

                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                el2.style.top = el2.offsetTop < 0 ? "0" : `${el2.offsetTop - pos2}px`;
                el2.style.left = `${el2.offsetLeft - pos1}px`;
            };
        });
    };

    // Show el window when it's clicked
    showWindow(){
        let eve = main.contains(this.icon) ? 'dblclick' : 'click';
        this.icon.addEventListener(eve, () => {
            if(this.window.style.display === "block") {
                this.window.classList.add('anim-bounce');
                setTimeout(() => {
                    this.window.classList.remove('anim-bounce');
                }, 2000);
            } else {
                this.window.style.display = "block";
                if(!(this.closeBtn)){
                    overlay.style.display = "block";
                };
            };
        });
    };

    // Close the el window when btn close is clicked
    closeWindowUsingBtn(){
        this.closeBtn.onclick = (e) => {
            this.window.style.display = "none"; 
            this.window.style.zIndex = "1";  
        };  
    };

    resizeWindow(){
        this.resizeBtn.onclick = (e) => {this.window.classList.toggle('anim-resize');};
    };

    // This thing has a fucking bug 
    isActive(){
        document.onclick = () => {
            // For debug
            // console.log('this.window:')
            // console.log(this.window);
            // console.log('document.activeElement:')
            // console.log(document.activeElement);

            if(this.window === document.activeElement){
                this.window.style.zIndex = "3";
            } else {
                this.window.style.zIndex = "1";
            };
        };
    };

    // Close the el window when background is clicked
    closeWindowUsingBackground(){
        overlay.onclick = (e) => {
            if (this.window){
                this.window.style.display = "none";
            };
        };
    };

    // Runs every other method
    run() {
        this.drag(this.icon, this.icon);
        this.isActive();
        this.resizeBtn ? this.resizeWindow() : {};
        this.windowDraggable ? this.drag(this.window, this.window) : this.drag(this.window, this.windowHeader);
        this.window ? this.isActive(): {};
        this.window ? this.showWindow() : {};
        this.closeBtn ? this.closeWindowUsingBtn() : this.closeWindowUsingBackground();
    };
};

computer = new Window('computer');
system = new Window('system');
folder = new Window('folder');
finder = new Window('finder');
alarm = new Window('alarm');
notePad = new Window('note-pad', false);
paint = new Window('paint', false);
trash = new Window('trash');
calculator = new Window('calculator', false);
snake = new Window('snake', false);

computer.run();
system.run();
folder.run();
finder.run();
alarm.run();
notePad.run();
paint.run();
trash.run();

snake.run();
calculator.run();

// Full screen mode
const fullScreen = document.getElementById('full-screen');
fullScreen.addEventListener('click', (e) => {
    document.documentElement.requestFullscreen().then(()=>{
        fullScreen.innerText = "Remove Full Screen";
        fullScreen.addEventListener('click', (e) => {
            document.exitFullscreen();
            fullScreen.innerText = "Enter Full Screen";
        });
    });
});

// Desktop Pattern
const pattern = document.getElementById('desktop-pattern');
pattern.onmousedown = (e) => {
    document.body.classList.toggle('squares_pattern');
};

// Time app
var time = document.getElementById('time'),
date = document.getElementById('date');
const switcher = document.querySelector('.icon.switch');

(function() {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;  

        var today = new Date(),
            dd = String(today.getDate()).padStart(2, '0'),
            mm = String(today.getMonth() + 1).padStart(2, '0'),
            yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        date.innerText = today;

        switcher.onclick = (e) => {
            document.querySelector('.alarm > .window-body').classList.toggle('d-block');
            switcher.classList.toggle('rotate-180');
        }
    
        setInterval(() => {    
            let now = new Date().getTime() + hour;
            

            time.innerText = 
            Math.floor((now % (day)) / (hour)) + ":" 
            + Math.floor((now % (hour)) / (minute)) + ":"
            + Math.floor((now % (minute)) / second);
        },  1000)
}());

// Paint App -------------------------------------
const canvas = document.getElementById('paint-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mission control
const strokeBtns = document.querySelectorAll('.paint-stroke > .btn'),
    clearBtn = document.querySelector('.paint-cmd > .clear.btn'),
    eraserBtn = document.querySelector('.paint-cmd > .eraser.btn'),
    lineBtn = document.querySelector('.paint-cmd > .line.btn'),
    penBtn =document.querySelector('.paint-cmd > .pen.btn'),
    sprayBtn =document.querySelector('.paint-cmd > .spray.btn'),
    multilinesBtn =document.querySelector('.paint-cmd > .multilines.btn');

// Coords
let isDrawing = false,
lastX = 0,
lastY = 0,
lastLY = 0,
lastLX = 0;

// Draw modes
let drawMode = 'pen';
lineBtn.onclick = () => {drawMode = 'line'; ctx.strokeStyle = '#000';};
penBtn.onclick = () => { drawMode = 'pen'; ctx.strokeStyle = '#000';};
sprayBtn.onclick = () => {drawMode = 'spray'; ctx.strokeStyle = '#000';};
multilinesBtn.onclick = () => {drawMode = 'multilines'; ctx.strokeStyle = '#000';};
eraserBtn.onclick = (e) => {drawMode = 'pen'; ctx.strokeStyle = '#fff'; };


// Clear Canvas
clearBtn.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    [lastLX, lastLY] = [canvas.offsetX, canvas.offsetY];
};

// Stroke styles
ctx.strokeStyle = '#000';
ctx.lineCap = 'round';
for (let btn of strokeBtns) {
    btn.onclick = (e) => {
        ctx.lineWidth = btn.id;
        ctx.strokeStyle = '#000';
    };
};

// Mouse events
canvas.onmousemove = (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    if (drawMode === 'pen'){
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (drawMode === 'spray') {
        for (let i = 30; i>0; i--) { 
            ctx.rect(lastX + Math.random() * parseInt(ctx.lineWidth)*2 - 10, 
                    lastY + Math.random() * parseInt(ctx.lineWidth)*2 - 10, 1, 1);
            ctx.fill();
        };   
    } else if (drawMode === 'multilines') {
        ctx.moveTo(lastLX, lastLY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineWidth = '1';
        ctx.stroke();
    }
    [lastX, lastY] = [e.offsetX, e.offsetY];
};

canvas.onmousedown = (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    if (drawMode === 'line'){
        ctx.moveTo(lastLX, lastLY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    };
};

canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
    [lastLX, lastLY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseout', () => (isDrawing = false));
// End Paint App -------------------------------------

// Snake App -------------------------------------
// Creating the canvas
const snakeCanvas = document.getElementById('snake-canvas'),
    snakeCtx = snakeCanvas.getContext('2d'),
    gameMenu = document.getElementById('snake-menu'),
    startBtn = document.querySelector('.start-game'),
    settingsBtn = document.querySelector('.game-settings');

// setup the canvas for the snake game
snakeCanvas.width = window.innerWidth;
snakeCanvas.height = window.innerHeight;
// Creating the game grid 20*20
var canvasRows = snakeCanvas.height/20,
canvasColumns = snakeCanvas.width/20;
console.log(gameMenu)
// Starting the game 
startBtn.addEventListener('click', (e)=>{
    // We hide the menu and display the canvas 
    gameMenu.style.display = 'none';
    snakeCanvas.style.display = 'block';
    // We create a snake for the player
    var snakeGame = new Snake();
    // Refresh the screen every now and then
    window.setInterval(() => {
        snakeGame.draw();     
     }, 100);   
});

// Blue print for our handsome snake
class Snake {
    constructor() {
        // Initiate snake 
        this.part = 10;
        this.speed = 10;
        this.speedX = 0;
        this.speedY = this.speed * -1;
        this.tail= [{x: this.screen.canvas.width/2, y: this.screen.canvas.height - 20}]
        this.score= 0;
        this.direction= null;
    };

    draw() {
        // draw the snake on the screen
        // We clear the canvas first
        snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height); 
        snakeCtx.fillStyle = 'black';
        for(var i= 0; i< this.tail.length; i++){
            snakeCtx.fillRect(this.tail[i].x, this.tail[i].y, this.part, this.part ); 
        };
    };
};

// End Snake App ---------------------------------------

// Calculator App -----------------------------------
var display = document.getElementById('calc-res'), // input/output button
  numbers = document.querySelectorAll('.num'), // number buttons
  operators = document.querySelectorAll('.operator'), // operator buttons
  resultbtn = document.getElementById('equal'), // equal button
  clearbtn = document.getElementById('clear'), // clear button
  eraseLastBtn = document.getElementById('erase-last'), // erase last element btn
  resultDisplayed = false; // flag to keep an eye on what output is displayed


// adding click handlers to number buttons
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", (e) => {
    // storing current input string and its last character in variables 
    var currentString = display.innerHTML,
    lastChar = currentString[currentString.length - 1];

    // if result is not displayed, just keep adding
    if (resultDisplayed === false) {
        if(display.innerHTML.length < 11) display.innerHTML += e.target.value;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      if(display.innerHTML.length < 11) display.innerHTML += e.target.value;
      resultDisplayed = false;
      display.innerHTML += e.target.value;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the display string and add the new input to start the new opration
      resultDisplayed = false;
      display.innerHTML = "";
      display.innerHTML += e.target.value;
    };
  });
};

// adding click handlers to operator buttons
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", (e) => {
    // storing current input string and its last character in variables - used later
    var currentString = display.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.value;
      display.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first!");
    } else {
      // else just add the operator pressed to the input
      display.innerHTML += e.target.value;
    };
  });
};

// From stackoverflow ######
// This function calculate number of digits in a giver decimal number
function digitCount(value, afterDecimal = true) {
    if(Math.floor(value) === value) return 0;
    if(afterDecimal){return value.toString().split(".")[1].length || 0;}
    else{return(value.toString().split(".").join('').length)};  
};
// ############

// on click of 'equal' button
resultbtn.addEventListener("click", (e) => {
    // this is the string that we will be processing eg. -10+26+33-56*34/23
    var inputString = display.innerHTML;

    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbersArr = inputString.split(/\+|\-|\*|\//g);
    // forming an array of operators. for above string it will be: operators = ["+", "-", "*", "/"]
    var operatorsArr = inputString.replace(/[0-9]|\./g, "").split("");

    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output

    let divide = operatorsArr.indexOf("/");
    while (divide != -1) {
        numbersArr.splice(divide, 2, numbersArr[divide] / numbersArr[divide + 1]);
        operatorsArr.splice(divide, 1);
        divide = operatorsArr.indexOf("/");
    };

    let multiply = operatorsArr.indexOf("*");
    while (multiply != -1) {
        numbersArr.splice(multiply, 2, numbersArr[multiply] * numbersArr[multiply + 1]);
        operatorsArr.splice(multiply, 1);
        multiply = operatorsArr.indexOf("*");
    };

    let subtract = operatorsArr.indexOf("-");
    while (subtract != -1) {
        numbersArr.splice(subtract, 2, numbersArr[subtract] - numbersArr[subtract + 1]);
        operatorsArr.splice(subtract, 1);
        subtract = operatorsArr.indexOf("-");
    };

    let add = operatorsArr.indexOf("+");
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbersArr.splice(add, 2, parseFloat(numbersArr[add]) + parseFloat(numbersArr[add + 1]));
        operatorsArr.splice(add, 1);
        add = operatorsArr.indexOf("+");
    };

    // displaying the output
    digitCount(numbersArr[0]) > 3 ? display.innerHTML = numbersArr[0].toFixed(3) : display.innerHTML = numbersArr[0];

    resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clearbtn.addEventListener("click", () => {
  display.innerHTML = "";
});

// Erase last element pressed byt the user
eraseLastBtn.addEventListener("click", () => {
    display.innerHTML = display.innerHTML.slice(0, -1);
});


// // todo: Add some folders to the trash and others

