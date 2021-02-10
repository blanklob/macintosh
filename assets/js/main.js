// Splash page
const welcome = document.querySelector('.welcome');
const macIcon = document.querySelector('.mac_loader');
const main = document.getElementById('main');
const header = document.getElementById('header');
const overlay = document.querySelector('.window-overlay');

window.addEventListener("load", function(event) {
    setTimeout(function() {
        macIcon.remove();
        welcome.classList.add('anim-show');
        welcome.addEventListener('animationend', () => {
        document.getElementById('splash').remove();
    });}, 2000);  
});

// Dropdown menu
const items = document.querySelectorAll('.mac_menu > li');

header.addEventListener('click', () => {
    for (item of items){
        item.classList.add('menu-item');
    };
});

main.addEventListener('click', () => {
    for (item of items){
        item.classList.remove('menu-item');
    };
});

// Making icons draggable
class Window {
    constructor(selector, windowDraggable = true){
        this.icon = document.getElementById(selector);
        this.window = document.querySelector('.window.' + selector);
        
        this.windowDraggable = windowDraggable;
        this.closeBtn = document.querySelector('.close_btn.' + selector);
        this.resizeBtn = document.querySelector('.resize_btn.' + selector);
        if(!this.windowDraggable) this.windowHeader = this.window.children[0];
    }

    get windowObj(){
        return this.window;
    }

    // drag just like in jquery ;)
    drag(el2, el1) {
        let pos1 = 0, pos2 = 0, pos3, pos4;
        el1.addEventListener('mousedown', function handleMouseDown(e) { 
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
        // document.onclick = () => {
        //     let el = this.windowObj;
        //     if(el === document.activeElement){
        //         el.style.zIndex = "3";
        //     } else {
        //         el.style.zIndex = "1";
        //     };
        // };
        {}
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
    run(){
        this.drag(this.icon, this.icon);
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
snake = new Window('snake', false);
calculator = new Window('calculator', false);

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
var time = document.getElementById('time');
var date = document.getElementById('date');
const switcher = document.querySelector('.icon.switch');

(function() {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;  

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

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
        },  0)
}());

// Paint App -------------------------------------
const canvas = document.getElementById('paint-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mission control
const strokeBtns = document.querySelectorAll('.paint-stroke > .btn');
const clearBtn = document.querySelector('.paint-cmd > .clear.btn');
const eraserBtn = document.querySelector('.paint-cmd > .eraser.btn');
const lineBtn = document.querySelector('.paint-cmd > .line.btn');
const penBtn =document.querySelector('.paint-cmd > .pen.btn');
const sprayBtn =document.querySelector('.paint-cmd > .spray.btn');
const multilinesBtn =document.querySelector('.paint-cmd > .multilines.btn');

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
        for (let i = 20; i>0; i--) { 
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
class Screen {
    constructor() {
        // creates a canvas for each app
        this.canvas = document.getElementById('snake-canvas');
        this.canvas.width = window.innerWidth;;
        this.canvas.height = window.innerHeight;
        this.rows = this.canvas.height/1000;
        this.columns = this.canvas.width/1000;
        this.ctx = this.canvas.getContext('2d');
    }
    
    clear() {
        // clear the canvas screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Snake {
    constructor() {
        // initiate snake attributes
        this.part = 10;
        this.speedChange = 10;
        this.speedX = 0;
        this.speedY = this.speedChange * -1;
        this.screen = new Screen();
        //this.x = this.screen.canvas.width/2;
        //this.y = this.screen.canvas.height - 20;
        this.tail= [{x: this.screen.canvas.width/2, y: this.screen.canvas.height - 20}]
        this.foodX = 50;
        this.foodY = 50;
        this.score= 0;
        this.direction= '';
    }

    draw() {
        // draw the snake on the screen
        this.screen.clear();

        // const head = {x: this.tail[0].x + this.speedX, y: this.tail[0].y + this.speedY};
        // this.tail.unshift(head);

        this.screen.ctx.fillStyle = 'black';
        for(var i= 0; i< this.tail.length; i++){
            this.screen.ctx.fillRect(this.tail[i].x, this.tail[i].y, this.part, this.part ); 
        }
        this.constraints();
        this.update();
    }
    drawFood(){
        this.screen.ctx.fillStyle = 'red';
        this.screen.ctx.fillRect(this.foodX, this.foodY, this.part,this.part);
    }
    randFood() {
        this.foodX=Math.round((Math.random() * (this.screen.canvas.width-10) ) / 10) * 10;
        this.foodY=Math.round((Math.random() * (this.screen.canvas.height-10) ) / 10) * 10;
    }

    update() {
        // updates snake's coords
        //this.x += this.speedX;
        //this.y += this.speedY;
        
        var add = {x: this.tail[0].x + this.speedX, y: this.tail[0].y + this.speedY};
        this.tail.unshift(add);
        this.hasEaten();
        this.tail.pop();
    }
    hasEaten(){
        for(var i= 0; i< this.tail.length; i++){
            if(this.tail[i].x === this.foodX && this.tail[i].y===this.foodY){
                this.score+=5;
                //console.log(this.score)
                //document.getElementById('score').innerHTML= this.score;
                this.tail.push(this.tail[0]);
                this.randFood();

            }else{
                
            }
        }
    }

    changeDirection(direction) {
        switch(direction) {
            case 'Up':
                if(this.direction == 'Down'){break;}
                this.speedX = 0;
                this.speedY = this.speedChange * -1;
                this.direction= 'Up';
                break;
            case 'Down':
                if(this.direction == 'Up'){break;}
                this.speedX = 0;
                this.speedY = this.speedChange * 1;
                this.direction= 'Down';
                break;
            case 'Right':
                if(this.direction== 'Left'){break;}
                this.speedY = 0;
                this.speedX = this.speedChange * 1;
                this.direction= 'Right';
                break;
            case 'Left':
                if(this.direction == 'Right'){break;}
                this.speedY = 0;
                this.speedX = this.speedChange * -1;
                this.direction= 'Left';
                break;
        }
    }

    constraints () {
        for(var i=4; i<this.tail.length; i++){
            if(this.tail[i].x == this.tail[0].x && this.tail[i].y == this.tail[0].y ){
                //location.reload();
                this.gameOver();
                clearInterval(intervalID);
            }
        }
        if ((this.tail[0].x > this.screen.canvas.width-10 || this.tail[0].x < 0) || 
        (this.tail[0].y > this.screen.canvas.height-10 || this.tail[0].y < 0)){
            // this.tail[0].x = this.screen.canvas.width/2;
            // this.tail[0].y = this.screen.canvas.height/2;
            // this.speedX = 0;
            // this.speedY = 0;
            this.gameOver();
            //location.reload();
        }
        
    }
    gameOver(){
        this.screen.clear();
        this.screen.ctx.fillStyle = 'red';
        this.screen.ctx.font = '50px serif';
        this.screen.ctx.textAlign = "center";
        this.screen.ctx.fillText('Game Over', this.screen.canvas.width/2, this.screen.canvas.height/2);
        this.screen.ctx.fillStyle = 'black';
        this.screen.ctx.font = '25px serif';
        this.screen.ctx.fillText('Score: '+ this.score, this.screen.canvas.width/2, this.screen.canvas.height/2+50);
    }
}

const snak = new Snake();

var intervalID = window.setInterval(() => {
   // snake.screen.clear();
    //snake.update();
    //snake.constraints();
    snak.draw();
    snak.drawFood();       
}, 200); 

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    console.log(direction)
    snak.changeDirection(direction);
}));
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

