// Инициализация AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Мобильное меню
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ аккордеон
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Закрываем все активные элементы
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
        });
        
        // Если элемент не был активен, открываем его
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Анимация навигации при скролле
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Скролл вниз
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Скролл вверх
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Валидация формы подписки
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (validateEmail(email)) {
            // Здесь можно добавить отправку данных на сервер
            showNotification('Спасибо за подписку!', 'success');
            newsletterForm.reset();
        } else {
            showNotification('Пожалуйста, введите корректный email', 'error');
        }
    });
}

// Вспомогательные функции
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Плавное появление секций при скролле
function revealOnScroll() {
    const revealEls = document.querySelectorAll('section, .gallery-item, .product-card, .benefit-item, .philosophy-item, .review-card, .faq-item, .qr-feature');
    const windowHeight = window.innerHeight;
    revealEls.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 60) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Затемнение фона при открытом мобильном меню
const menuBackdrop = document.querySelector('.menu-backdrop');
function updateMenuBackdrop() {
    if (navMenu.classList.contains('active')) {
        menuBackdrop.classList.add('active');
    } else {
        menuBackdrop.classList.remove('active');
    }
}
burgerMenu.addEventListener('click', updateMenuBackdrop);
menuBackdrop.addEventListener('click', () => {
    navMenu.classList.remove('active');
    burgerMenu.classList.remove('active');
    updateMenuBackdrop();
});
// Закрытие по клику на ссылку
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        burgerMenu.classList.remove('active');
        updateMenuBackdrop();
    });
});

// Плавная прокрутка (если вдруг не работает)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Улучшенный показ уведомлений
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
} 