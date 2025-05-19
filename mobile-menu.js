// mobile-menu.js - Version corrigée
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navPremium = document.getElementById('nav-premium');
    const header = document.querySelector('.header-sticky');

    // Mode sombre avec persistance
    if (darkModeToggle) {
        // Restaurer le mode au chargement
        if (localStorage.getItem('darkMode') === 'true') {
            body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        // Basculer le mode
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
    }

    // Effet de défilement de l'en-tête
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Menu mobile
    if (mobileMenuBtn && navPremium) {
        function toggleMenu() {
            const isOpen = navPremium.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
            body.classList.toggle('menu-open');
            body.style.overflow = isOpen ? 'hidden' : '';
        }

        // Bouton menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Fermer en cliquant sur les liens
        document.querySelectorAll('.nav-premium a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        // Fermer en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (navPremium.classList.contains('show') && 
                !navPremium.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                toggleMenu();
            }
        });

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navPremium.classList.contains('show')) {
                toggleMenu();
            }
        });

        // Fermer au redimensionnement
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navPremium.classList.contains('show')) {
                toggleMenu();
            }
        });
    }
});
