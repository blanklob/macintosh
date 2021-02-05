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
const logoMenu = document.querySelector('.dropdown.logo');
const logo = document.getElementById('logo')

window.document.addEventListener('click', () => {
    console.log(document.activeElement);
    
    if(document.activeElement === logo) {
        logoMenu.classList.add('d-block');
    } else if(document.activeElement !== logo 
        || document.activeElement !== logoMenu) {
        logoMenu.classList.remove('d-block');
    };
});