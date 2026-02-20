/**
 * Portfolio MOROU Salahou dine
 * JavaScript principal - Interactions sobres et fonctionnelles
 */

(function() {
    'use strict';

    // ========================================
    // NAVIGATION
    // ========================================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Gestion du scroll pour la navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Toggle menu mobile
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Fermer le menu au clic sur un lien
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners navigation
    window.addEventListener('scroll', handleScroll);
    
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Fermer le menu au clic sur les liens
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // ========================================
    // FILTRES PROJETS
    // ========================================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-detail');

    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategories = card.dataset.category || '';
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Mettre à jour l'état actif des boutons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
    }

    // Event listeners filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.filter;
            filterProjects(category);
        });
    });

    // ========================================
    // FORMULAIRE DE CONTACT
    // ========================================

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Validation simple
            if (!data.name || !data.email || !data.subject || !data.message) {
                e.preventDefault();
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                e.preventDefault();
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Désactiver le bouton pendant l'envoi
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';

            // Le formulaire sera soumis à Formspree
            // Formspree redirigera automatiquement vers une page de confirmation
        });
    }

    // Notification simple
    function showNotification(message, type = 'info') {
        // Supprimer les notifications existantes
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Créer la notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <p>${message}</p>
            <button class="notification-close" aria-label="Fermer">&times;</button>
        `;

        // Styles inline pour la notification
        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            max-width: 400px;
            padding: 16px 20px;
            background-color: ${type === 'success' ? '#D1FAE5' : type === 'error' ? '#FEE2E2' : '#DBEAFE'};
            color: ${type === 'success' ? '#059669' : type === 'error' ? '#DC2626' : '#1E40AF'};
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        notification.querySelector('p').style.margin = '0';
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: inherit;
            opacity: 0.7;
        `;

        // Ajouter au DOM
        document.body.appendChild(notification);

        // Fermer au clic
        closeBtn.addEventListener('click', () => notification.remove());

        // Auto-fermer après 5 secondes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ========================================
    // SCROLL SMOOTH POUR LES ANCRES
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // ANIMATION AU SCROLL (Intersection Observer)
    // ========================================

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.overview-card, .project-card, .skill-card, .approach-step, .hackathon-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    };

    // Initialiser les animations au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateOnScroll);
    } else {
        animateOnScroll();
    }

    // ========================================
    // BARRE DE PROGRESSION DE LECTURE
    // ========================================

    const createReadingProgress = () => {
        // Seulement sur les pages avec beaucoup de contenu
        if (!document.querySelector('.project-detail') && !document.querySelector('.about-main')) {
            return;
        }

        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary));
            width: 0%;
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };

    createReadingProgress();

    // ========================================
    // GESTION DU THÈME (préparé pour dark mode)
    // ========================================

    // Le dark mode est géré automatiquement via CSS @media (prefers-color-scheme: dark)
    // Cette fonction permet d'ajouter un toggle manuel si nécessaire

    const initTheme = () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    };

    initTheme();

    // Écouter les changements de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });

    // ========================================
    // UTILITAIRES
    // ========================================

    // Debounce pour optimiser les événements fréquents
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Appliquer debounce au scroll
    const debouncedScroll = debounce(handleScroll, 10);
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debouncedScroll);

    // ========================================
    // ACCESSIBILITÉ
    // ========================================

    // Gestion du focus au clavier
    document.addEventListener('keydown', (e) => {
        // Fermer le menu mobile avec Escape
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
            navToggle.focus();
        }
    });

    // Indiquer si l'utilisateur navigue au clavier
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });

    // ========================================
    // INITIALISATION
    // ========================================

    console.log('Portfolio MOROU Salahou dine - Chargé avec succès');

})();

// Style pour les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    body.using-mouse *:focus {
        outline: none;
    }
    
    .project-detail {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
