// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-240px';
    } else {
        sidebar.style.left = '0';
    }
});

// Sakura Blossoms Animation
function createSakuraPetal() {
    const sakura = document.querySelector('.sakura');
    const petal = document.createElement('div');
    petal.classList.add('petal');
    sakura.appendChild(petal);
    
    // Remove the petal after animation
    setTimeout(() => {
        sakura.removeChild(petal);
    }, 5000);
}

// Create petals every 300ms
setInterval(createSakuraPetal, 300);