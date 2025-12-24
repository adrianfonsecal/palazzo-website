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

// 4. Form Handler (Simulado)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = "Enviando...";
    btn.classList.add('opacity-75');

    // Simular envío
    setTimeout(() => {
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
        this.reset();
        btn.innerText = "Mensaje Enviado";
        btn.style.backgroundColor = "var(--color-sand)";

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.classList.remove('opacity-75');
        }, 3000);
    }, 1500);
});