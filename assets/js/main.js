// Splash page
const welcome = document.querySelector('.welcome');
const macIcon = document.querySelector('.mac_loader');

macIcon.addEventListener('animationend', () => {
    macIcon.remove();
    welcome.addEventListener('animationend', () => {
        document.getElementById('splash').remove();
    });
})

// Dropdown menu
// const items = document.getElementsByClassName('menu-item');
// const dropdownMenus = document.getElementsByClassName('dropdown');

// window.document.addEventListener('click', () => {
//     for (const item of items) {
//         for(let i=0; i < dropdownMenus.length; i++){
//             if(document.activeElement === item && dropdownMenus[i].classList.contains('logo')) {
//                 dropdownMenus[i].classList.toggle('d-block');
//             };
//         };    
//     };
// });

