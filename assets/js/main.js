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
class App {
    constructor(selector){
        this.icon = document.getElementById(selector);
        this.window = document.querySelector('.window.' + selector);
        this.closeBtn = document.querySelector('.close_btn.' + selector);
    }

    // drag just like in jquery ;)
    drag(el) {
        let pos1 = 0, pos2 = 0, pos3, pos4;
        el.addEventListener('mousedown', function handleMouseDown(e) { 
            el.focus();
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

                el.style.top = el.offsetTop < 0 ? "0" : `${el.offsetTop - pos2}px`;
                el.style.left = `${el.offsetLeft - pos1}px`;
            };

            // Apperently inputs dont work while listening to mousedown event 
            // So I will have to delete it for now 
            if(el.classList.contains('note-pad')) {
                el.removeEventListener("mousedown", handleMouseDown); 
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
        this.drag(this.icon);
        this.window ? this.drag(this.window) : {};
        this.window ? this.showWindow() : {};
        this.closeBtn ? this.closeWindowUsingBtn() : this.closeWindowUsingBackground();
    };
};

trash = new App('trash');
computer = new App('computer');
system = new App('system');
folder = new App('folder');
finder = new App('finder');
alarm = new App('alarm');
notePad = new App('note-pad');
paint = new App('paint');


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
