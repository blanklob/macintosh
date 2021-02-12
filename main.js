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
    if(window.innerWidth > 699){
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
    drag(el2, el1, foo) {
        // Declaring positions
        let pos1 = 0, pos2 = 0, pos3, pos4;
        // I've used a defined function in order to remove the event when needed with removeEve..

        el1.addEventListener('mousedown', function handleMouseDown(e) { 
            // focusing an element when is dragged for the :focus selector
            el2.focus();

            // basic Event management
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // This is to prevent the window object from sticking to the mouse cursor. 
            document.onmouseup = (e) => {
                document.onmouseup = null;
                document.onmousemove = null;                          
            };

            // move the windom with mouse coords
            document.onmousemove = (e) => {
                // basic Event management
                e = e || window.event;
                e.preventDefault();

                /* Here is when the magic happens we take the mouse coordinates within doc interface
                then we substract the old ones to get the dx and dy then we take the diffrence and 
                add it to the top and left css properties to move the window with position absolute of course.
                */
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // Here we update top and left attributes
                // We prevent the window from get outside the main with a ternary.s
                el2.style.top = el2.offsetTop < 0 ? "0" : `${el2.offsetTop - pos2}px`;
                el2.style.left = `${el2.offsetLeft - pos1}px`;
            };
            if(foo) el1.removeEventListener('mousedown', handleMouseDown);
        });
    };

    // Show el window when it's clicked
    showWindow(){
        // We define the event if the icon trigger is in the main or the header
        /* bisacly iif click an icon in the main the event should be a double click because
        we dont want to open the window when we try to move the icon, on the other side
        the anchor tag that lunches apps on the menu dropdown in the header it's more convenient to
        lunch an app when we click a menu item not when double clicking it */
        let eve = main.contains(this.icon) ? 'dblclick' : 'click';
        // We create an event listner for the window 
        this.icon.addEventListener(eve, () => {
            // if the window is already open add a bouncing animation to show to the user that
            // the window is already open.
            if(this.window.style.display === "block") {
                this.window.classList.add('anim-bounce');
                setTimeout(() => {
                    this.window.classList.remove('anim-bounce');
                }, 2000);
            } else {
                // If the window is not open we open it with display proprety set to 'block'.
                this.window.style.display = "block";
                // if the window deosn't have a close btn we close when we click on the overlay 
                // just like a bootstrap modal.
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
            // Reset the z-index 
            this.window.style.zIndex = "1";  
        };  
    };

    resizeWindow(){
        // Resize the window with a sample transform scale animation saved within a class called 'anim-resize'
        this.resizeBtn.onclick = (e) => {this.window.classList.toggle('anim-resize');};
    };

    // This thing has a fucking bug 
    isActive(){
        this.window.onmousedown = () => {
            this.window.style.zIndex = "3";
            /* Updating windows z-index so if a window is clicked it becomes when 
            the bigger z-index in order.*/
            setInterval((e)=>{
                if(this.window !== document.activeElement) {
                    this.window.style.zIndex = "1";
                };
            }, 100);
        };  
    };

    // Close the el window when overlay is clicked
    closeWindowUsingBackground(){
        // only for windows that dont have a close btn
        overlay.onclick = () => {
            if (this.window){
                this.window.style.display = "none";
            };
        };
    };

    // Runs every other method
    run() {
        // Here we call every other method if a window object have certain properties.
        this.drag(this.icon, this.icon, false);
        this.isActive();
        this.resizeBtn ? this.resizeWindow() : {};
        this.windowDraggable ? this.drag(this.window, this.window) : this.drag(this.window, this.windowHeader); 
        setInterval(() => {
            this.windowDraggable ? this.drag(this.window, this.window, true) : this.window.offsetTop < 200 || this.window.offsetLeft < 0 ? 
            this.drag(this.window, this.window, true) : this.drag(this.window, this.windowHeader, true);
        }, 100);
        this.window ? this.isActive(): {};
        this.window ? this.showWindow() : {};
        this.closeBtn ? this.closeWindowUsingBtn() : this.closeWindowUsingBackground();
    };
};



// Creating apps and window 
system = new Window('system');
folder = new Window('folder');
finder = new Window('finder');
alarm = new Window('alarm');
notePad = new Window('note-pad', false);
paint = new Window('paint', false);
trash = new Window('trash');
calculator = new Window('calculator', false);
snake = new Window('snake', false);
puzzle = new Window('puzzle');
control = new Window('control');
search = new Window('search');
files = new Window('files');
list = new Window('list');

// Running All the apps I know there is a better way to do this :(
system.run();
folder.run();
finder.run();
alarm.run();
notePad.run();
paint.run();
trash.run();
snake.run();
calculator.run();
puzzle.run();
control.run();
search.run();
files.run()
list.run();

// Full screen mode
// when we click menu item in the view dropdow menu we change to full screen mode 
const fullScreen = document.getElementById('full-screen');
fullScreen.addEventListener('click', (e) => {
    document.documentElement.requestFullscreen().then(()=>{
        fullScreen.innerText = "Remove Full Screen";
        fullScreen.addEventListener('click', (e) => {
            document.exitFullscreen();
            // We change the innerText two to make it more comprehensive.
            fullScreen.innerText = "Enter Full Screen";
        });
    });
});

// Desktop Pattern
const pattern = document.getElementById('desktop-pattern');
pattern.onmousedown = (e) => {
    // 1984 Macintosh dark mode version ;)
    document.body.classList.toggle('squares_pattern');
};

// Time app
var time = document.getElementById('time'),
date = document.getElementById('date');
const switcher = document.querySelector('.icon.switch');

(function() {
    // Here we define our time parametres
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;  

        // to get current date in this format dd-mm-yyyy
        var today = new Date(),
        // From stackoverflow ###################
            dd = String(today.getDate()).padStart(2, '0'),
            mm = String(today.getMonth() + 1).padStart(2, '0'),
            yyyy = today.getFullYear();
        // ############################

        today = dd + '-' + mm + '-' + yyyy;
        date.innerText = today;

        switcher.onclick = (e) => {
            // Here we show the date when switcher in the time app is clicked u should check it !!
            document.querySelector('.alarm > .window-body').classList.toggle('d-block');
            switcher.classList.toggle('rotate-180');
        }
    
        setInterval(() => {    
            // Here we run out time machine 
            // We get the time from the navigator in ms 
            let now = new Date().getTime() + hour;
            // We apply our filters to get the current time we add + hour for utc+1 'Paris time' :)
            time.innerText = 
            Math.floor((now % (day)) / (hour)) + ":" 
            + Math.floor((now % (hour)) / (minute)) + ":"
            + Math.floor((now % (minute)) / second);
        },  1000)
}());

// Now the HARDCORE Stuff HTML5 CANVAS
// Paint App -------------------------------------
// we create a paint canvas 
const canvas = document.getElementById('paint-canvas'),
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mission control
// We select all the btns from the paint mission control system
const strokeBtns = document.querySelectorAll('.paint-stroke > .btn'),
    clearBtn = document.querySelector('.paint-cmd > .clear.btn'),
    eraserBtn = document.querySelector('.paint-cmd > .eraser.btn'),
    lineBtn = document.querySelector('.paint-cmd > .line.btn'),
    penBtn =document.querySelector('.paint-cmd > .pen.btn'),
    sprayBtn =document.querySelector('.paint-cmd > .spray.btn'),
    multilinesBtn =document.querySelector('.paint-cmd > .multilines.btn');

// Coords
// Here we define the pen previous coords
let isDrawing = false,
isOut = false,
eraseMode = false,
lastX = 0,
lastY = 0,
lastLY,
lastLX;

// Draw modes
// Bisacly we have 4 drawing modes listed below when we click a btn we switch between modes
// exept for the clean mode we use a white stroke style to erase everything since the canvas is by default white.
let drawMode = 'pen';
lineBtn.onclick = (e) => {drawMode = 'line'; ctx.strokeStyle = '#000'; isOut=true; eraseMode = false;};
penBtn.onclick = () => { drawMode = 'pen'; ctx.strokeStyle = '#000'; eraseMode = false;};
sprayBtn.onclick = () => {drawMode = 'spray'; ctx.strokeStyle = '#000'; eraseMode = false;};
multilinesBtn.onclick = () => {drawMode = 'multilines'; ctx.strokeStyle = '#000'; eraseMode = false; isOut=true;};
eraserBtn.onclick = () => {drawMode = 'pen'; ctx.strokeStyle = '#fff'; eraseMode = true;};

ctx.lineWidth = "2";

// Clear canvas on one click.
clearBtn.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isOut = true;  
};

// Stroke styles
// Here we difine stroke width modes we pass the mode using btn id's.
ctx.strokeStyle = '#000';
ctx.lineCap = 'round';
for (let btn of strokeBtns) {
    btn.onclick = (e) => {
        ctx.lineWidth = btn.id;
        eraseMode ? ctx.strokeStyle = '#fff' : ctx.strokeStyle = '#000';
    };
};

// Mouse events
/* When mouse is moving over the canvas, we check if we are on drawing mode
if not we get out of the event handler, otherwise, we start drawing using 'move to' and
'line to' 2D canvas methodes the stroke method fill the lines with stroke style color
we pass mouse coords as parametres for these methodes just like I did with the drag method
for the window remember.
*/ 
canvas.onmousemove = (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    if (drawMode === 'pen'){
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (drawMode === 'spray') {
        /* Spray mode is very intresting because we use random rect generateur 
        to draw multiple rects in every mousemove using a for loop, this a cool
        mode too, I wish you could try it, it's way better than Window's Paint.
        */
        for (let i = 30; i>0; i--) { 
            // I use parsint because by default ctx.linewidth is a string
            ctx.rect(lastX + Math.random() * parseInt(ctx.lineWidth)*2 - 10, 
                    lastY + Math.random() * parseInt(ctx.lineWidth)*2 - 10, 1, 1);
            ctx.fill();
        };   
    } else if (drawMode === 'multilines') {
        // I descoverd this mode by chance it's really cool 
        // SO no comments here ?
        // Well we have linewidth = 1px and same as pen mode but here the we dont update
        // LastX and LastY so the paint draws multiple lines while staying in one place. REALLY COOL!
        ctx.moveTo(lastLX, lastLY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineWidth = '1';
        ctx.stroke();
    }
    [lastX, lastY] = [e.offsetX, e.offsetY];
};

canvas.onmousedown = (e) => {
    /* When we click on the mouse we switch to drawing mode the LastX LastY updates everytime
    to connect the drawing*/
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    /* If we are out of the line mode the last x and last y are valued to current mouse position
    which means that 
                    ctx.moveTo(lastLX=e.offsetX, lastLY=e.offsetY);
                    ctx.lineTo(e.offsetX, e.offsetY);
    this will draw a point instead of connecting a line to the last position.
    */
    if(isOut)[lastLX, lastLY] = [e.offsetX, e.offsetY];
    if (drawMode === 'line'){
        ctx.beginPath();
        ctx.moveTo(lastLX, lastLY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    };
};

canvas.addEventListener('mouseup', (e) => {
    // Here when mouse is up we get out of the drawing mode 
    isDrawing = false;
    // We are out of the line mode 
    isOut = false;
    // we update the coords to make lines from the last coords to the new coords
    [lastLX, lastLY] = [e.offsetX, e.offsetY];
});
// If mouse coords are out of the scree we stop the drawing to stop the screen from drawin vertical 
// lines when the mouse is other apps for exmple.
canvas.addEventListener('mouseout', () => (isDrawing = false));
// End Paint App -------------------------------------


// Snake App -------------------------------------

(function(){  
    // Snake Properties
    var snake,
    snakeDir,
	snakeNextDir,
    snakeSpeed = 100,
    // Food object
    food = {x: 0, y: 0},
    
    // Creating the snake canvas and selecting html nodes
    snakeCanvas = document.getElementById("snake-canvas"),
    ctx = snakeCanvas.getContext("2d"),

    // We only have two screens gameover and new game screens
    screenMenu = document.getElementById("snake-menu"),
    screenGameOver = document.getElementById("gameover"),

    // Selecing both new game btns in the two gameover and new game screens
    btnNewgame = document.getElementById("newgame_menu"),
    btnGameOver = document.getElementById("newgame_gameover"),

    // Score
    score,
    // Selecting the score element 
    scoreEl = document.getElementById("score_value");
    
    // Drawing the rectangles for both snake and the food
    var draw = (x, y) => {
        ctx.fillStyle = "#000";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    };

    // Changing snake directions depending on keyboard events
    var changeDir = (key) => {
        // Keyboard ascii codes !! 
        if(key == 38 && snakeDir != 2){
            snakeNextDir = 0;
        } else {
            if (key == 39 && snakeDir != 3){
                snakeNextDir = 1;
            } else {
                if (key == 40 && snakeDir != 0){
                    snakeNextDir = 2;
                } else {
                    if(key == 37 && snakeDir != 1){
                        snakeNextDir = 3;
    }; }; }; };};

    // Adding food rects randomly when there is no food
    var addFood = () => {
        food.x = Math.floor(Math.random() * ((snakeCanvas.width / 10) - 1));
        food.y = Math.floor(Math.random() * ((snakeCanvas.height / 10) - 1));
        for(var i = 0; i < snake.length; i++){
            if(checkBlock(food.x, food.y, snake[i].x, snake[i].y)){
                addFood();
            };
        };
    };
    
    // Check if snake eat food aka check if snake coords are the same as food ones.
    var checkBlock = (x, y, _x, _y) => {
        return (x == _x && y == _y) ? true : false;
    };

    // Update the snake game score    
    var altScore = (scoreVal) => {
        scoreEl.innerHTML = String(scoreVal);
    };
    
    var mainLoop = () => {
            var _x = snake[0].x;
            var _y = snake[0].y;
            // We get the next direction from the changeDir function above 
			snakeDir = snakeNextDir;

            // 0 - Up, 1 - Right, 2 - Down, 3 - Left
            switch(snakeDir){
                case 0: _y--; break;
                case 1: _x++; break;
                case 2: _y++; break;
                case 3: _x--; break;
            };

            // CHanging direction
            snake.pop();
            snake.unshift({x: _x, y: _y});

            // When snake hits the wall
            if (snake[0].x < 0 || snake[0].x == snakeCanvas.width / 10 || snake[0].y < 0 || snake[0].y == snakeCanvas.height / 10 ){
                showScreen(2);
                // getting out of the loop (the function)
                return;
            };
            
        // When snake eats himself
        for(var i = 1; i < snake.length; i++){
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                // Show the game over screen
                showScreen(2);
                // getting out of the loop (the function)
                return;
            };
        };
        
        // When snake eats food (if snake.x && snake.y === food.x && food.y)
        if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)){
            snake[snake.length] = {x: snake[0].x, y: snake[0].y};
            score += 1;
            altScore(score);
            addFood();
            draw(food.x, food.y);
        };
        
        // Clearing the canvas 
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
        // Drawing all the snake parts 
        for(var i = 0; i < snake.length; i++){
            draw(snake[i].x, snake[i].y);
        };
    
        // Drawing the foos 
        draw(food.x, food.y);

        // main loop
        setTimeout(mainLoop, snakeSpeed);
    };

    /* Before every new game we have to reset some stuff like the score, the snake, 
    it's direction...
    */
    var newGame = () => { 
        showScreen(0);
        snakeCanvas.focus();
      
        // Reset the snake parts to an empty array
        snake = [];
        // Creating the baby snake
        for(var i = 4; i >= 0; i--){
            snake.push({x: i, y: 15});
        };
      
        // Initial direction
        snakeNextDir = 1;
        
        // Reset the score and update the score element
        score = 0;
        altScore(score);
        
        // Adding food 
        addFood();

        // Get keyboard direction codes 
        snakeCanvas.onkeydown = (e) => {
            e = e || window.event;
            changeDir(e.keyCode);
        };
        // Run the freaking game
        mainLoop();         
    };

    // 0 for the game
    // 1 for the main menu
    // 2 for the game over screen
    var showScreen = (screen_opt) => {
        switch(screen_opt){  
            case 0:  snakeCanvas.style.display = "block";
                     screenMenu.style.display = "none";
                     screenGameOver.style.display = "none";
                     break;
                
            case 1:  snakeCanvas.style.display = "none";
                     screenMenu.style.display = "block";
                     
                     screenGameOver.style.display = "none";
                     break; 

            case 2: snakeCanvas.style.display = "none";
                    screenMenu.style.display = "none";
                    screenGameOver.style.display = "block";
                    break;
        };
    };
     
    // Event listeners for both newgale btns
    btnNewgame.onclick = function(){newGame();};
    btnGameOver.onclick = function(){newGame();}; 
    
    // Ability to start the game using space keyboard btn (hidden feature)
    document.onkeydown = (evt) => {
        if(screenGameOver.style.display == "block"){
            evt = evt || window.event;
            if(evt.keyCode == 32){
                newGame();
            };
        };
    };
})();
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