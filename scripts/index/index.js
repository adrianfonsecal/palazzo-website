// 1. Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// 2. Cerrar menú móvil al hacer click en un link
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// 3. Scroll Fade-in Animation Observer
// Esto hace que los elementos aparezcan suavemente al bajar
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Solo animar una vez
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Phone Number formatter

// In your script:
var phoneInput = document.getElementById('phone');
var maskOptions = {
    mask: '(000) 000-0000', // Defines the pattern
    lazy: false, // Shows the mask always
};
var mask = IMask(phoneInput, maskOptions);
// HTML input: <input type="tel" id="phone" placeholder="(XXX) XXX-XXXX">