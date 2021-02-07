// Splash page
const welcome = document.querySelector('.welcome');
const macIcon = document.querySelector('.mac_loader');
window.addEventListener("load", function(event) {
    setTimeout(function() {
        macIcon.remove();
        welcome.classList.add('anim-show');
        welcome.addEventListener('animationend', () => {
        document.getElementById('splash').remove();
        console.log('docloaded');
    });}, 2000);  
});

// Dropdown menu
const items = document.querySelectorAll('.mac_menu > li');
const header = document.querySelector('header');
const main = document.querySelector('main');

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
        console.log(this.icon);
        console.log(this.window);
        console.log(this.closeBtn);
    }

    // drag just like in jquery ;)
    drag(el) {
        let pos1 = 0, pos2 = 0, pos3, pos4;
        el.onmousedown = (e) => {
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
        };
    };

    // Show el window when it's clicked
    showWindow(){
        this.icon.ondblclick = (e) => {
            if(this.window.style.visibility === "visible") {
                this.window.classList.add('anim-bounce');
                setTimeout(function(){
                    this.window.classList.remove('anim-bounce');
                },2000);
            } else {
                this.window.style.visibility = "visible";
            }
        };
    };

    // Close the el window when btn close is clicked
    closeWindow(){
        this.closeBtn.onmousedown = (e) => {
            this.window.style.visibility = "hidden";      
        };
    };

    run(){
        this.drag(this.icon);
        this.window ? this.drag(this.window) : {};
        this.window ? this.showWindow() : {};
        this.window ? this.closeWindow() : {};
    }

};

trash = new App('trash');
computer = new App('computer');
system = new App('system');
folder = new App('folder');

trash.run();
computer.run();
system.run();
folder.run();

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

