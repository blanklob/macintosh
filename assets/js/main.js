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
(() => {
    let icon = document.querySelector('.icon.system');
    let pos1 = 0, pos2 = 0;
    icon.onmousedown = (e) => {
        icon.focus();
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

        icon.style.top = icon.offsetTop < 0 ? "0" : `${icon.offsetTop - pos2}px`;
        icon.style.left = `${icon.offsetLeft - pos1}px`;
        };
    };
})();

(() => {
    let icon = document.querySelector('.icon.trash');
    let pos1 = 0, pos2 = 0;
    icon.onmousedown = (e) => {
        icon.focus();
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

        icon.style.top = icon.offsetTop < 0 ? "0" : `${icon.offsetTop - pos2}px`;
        icon.style.left = `${icon.offsetLeft - pos1}px`;
        };
    };
})();

(() => {
    let icon = document.querySelector('.icon.folder');
    let pos1 = 0, pos2 = 0;
    icon.onmousedown = (e) => {
        icon.focus();
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

        icon.style.top = icon.offsetTop < 0 ? "0" : `${icon.offsetTop - pos2}px`;
        icon.style.left = `${icon.offsetLeft - pos1}px`;
        };
    };
})();

(() => {
    let icon = document.querySelector('.icon.computer');
    let pos1 = 0, pos2 = 0;
    icon.onmousedown = (e) => {
        icon.focus();
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

        icon.style.top = icon.offsetTop < 0 ? "0" : `${icon.offsetTop - pos2}px`;
        icon.style.left = `${icon.offsetLeft - pos1}px`;
        };
    };
})();


// Working with windows
const trashIcon = document.querySelector('.icon.trash');
const trashWin = document.querySelector('.window.trash');
const closeTrash = document.querySelector('.window.trash .window-close_btn');

trashIcon.ondblclick = (e) => {
    if(trashWin.style.visibility === "visible") {
        trashWin.classList.add('anim-bounce');
        setTimeout(function(){
            trashWin.classList.remove('anim-bounce');
        },2000);
    } else {
        trashWin.style.visibility = "visible";
    }
};

closeTrash.onmousedown = (e) => {
    console.log('closed');
    trashWin.style.visibility = "hidden";      
};


(() => {
    let icon = document.querySelector('.window');
    let pos1 = 0, pos2 = 0;
    icon.onmousedown = (e) => {
        icon.focus();
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

        icon.style.top = icon.offsetTop < 0 ? "0" : `${icon.offsetTop - pos2}px`;
        icon.style.left = `${icon.offsetLeft - pos1}px`;
        };
    };
})();