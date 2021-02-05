// Splash page
const welcome = document.querySelector('.welcome');
const macIcon = document.querySelector('.mac_loader');

macIcon.addEventListener('animationend', () => {
    macIcon.remove();
    welcome.addEventListener('animationend', () => {
        document.getElementById('splash').remove();
    });
})

// Time counter

