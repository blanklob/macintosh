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
    }
});

main.addEventListener('click', () => {
    for (item of items){
        item.classList.remove('menu-item');
    }
});

// Making icons draggable
class Window {
    constructor(selector, windowDraggable = true){
        this.icon = document.getElementById(selector);
        this.window = document.querySelector('.window.' + selector);
        this.closeBtn = document.querySelector('.close_btn.' + selector);
        this.windowDraggable = windowDraggable;
        if(!this.windowDraggable) this.windowHeader = this.window.children[0];
    }

    // drag just like in jquery ;)
    drag(el2, el1, windowType=true) {
        let pos1 = 0, pos2 = 0, pos3, pos4;
        el1.addEventListener('mousedown', function handleMouseDown(e) { 
            if(!windowType) el1.focus();
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
        };  
    };

    // Close the el window when background is clicked
    closeWindowUsingBackground(){
        overlay.onclick = (e) => {
            if (this.window){
                this.window.style.display = "none";
                overlay.style.display = "none";
            };
        };
    };

    // Runs every other method
    run(){
        this.drag(this.icon, this.icon, false);
        this.windowDraggable ? this.drag(this.window, this.window) : this.drag(this.window, this.windowHeader);
        this.window ? this.showWindow() : {};
        this.closeBtn ? this.closeWindowUsingBtn() : this.closeWindowUsingBackground();
    };
};

trash = new Window('trash');
computer = new Window('computer');
system = new Window('system');
folder = new Window('folder');
finder = new Window('finder');
alarm = new Window('alarm');
notePad = new Window('note-pad', false);
paint = new Window('paint', false);


trash.run();
computer.run();
system.run();
folder.run();
finder.run();
alarm.run();
notePad.run();
paint.run();

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
        }, 0)
}());

// Paint App
const canvas = document.getElementById('paint-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Stroke styles
ctx.strokeStyle = '#000';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.onmousemove = (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
};

canvas.onmousedown = (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
};

canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

// todo: finish paint app
// todo: finish snake
// todo: finish the making windows smaller 
// Fix note pad issue