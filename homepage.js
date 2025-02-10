const mobile = document.querySelector('.mobile');
const navLinks = document.querySelector('.nav_links');
mobile.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
const navItems = document.querySelectorAll('.nav_links li');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
// dark mode
const darkModeToggle = document.querySelector('.fa-moon');
const body = document.body;

//user preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// Toggle event listener & save user pref
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});