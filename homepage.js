const mobile = document.querySelector('.mobile');
const navLinks = document.querySelector('.nav_links');

mobile.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const navItems = document.querySelectorAll('.nav_links li');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active'); // Hide the navigation menu
    });
});