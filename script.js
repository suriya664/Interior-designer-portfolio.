// ============================================
// CONCRETE CHIC - INTERIOR DESIGNER PORTFOLIO
// JavaScript Functionality
// ============================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Close mobile menu on scroll
window.addEventListener('scroll', function() {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Allow normal navigation for external page links (login.html, register.html, dashboard.html, etc.)
        // Only prevent default for anchor links (#)
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // For page links (.html), allow normal navigation by not preventing default
    });
});

// CTA button scroll
const ctaBtnNav = document.querySelector('.cta-btn-nav');
if (ctaBtnNav) {
    ctaBtnNav.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// PORTFOLIO FILTER FUNCTIONALITY
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const viewDetailsButtons = document.querySelectorAll('.view-details');

viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
        const imageSrc = this.getAttribute('data-image');
        lightboxImage.setAttribute('src', imageSrc);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
}

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// BEFORE/AFTER SLIDER FUNCTIONALITY
// ============================================

const sliders = document.querySelectorAll('.comparison-slider .slider');

sliders.forEach(slider => {
    slider.addEventListener('input', function() {
        const value = this.value;
        const beforeAfter = this.closest('.before-after');
        const after = beforeAfter.querySelector('.after');
        
        after.style.clipPath = `inset(0 0 0 ${value}%)`;
    });
});

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');
const testimonialDots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
    
    currentTestimonial = index;
}

if (prevTestimonial) {
    prevTestimonial.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
}

if (nextTestimonial) {
    nextTestimonial.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        showTestimonial(index);
    });
});

// Auto-play testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Pause on hover
const testimonialsCarousel = document.getElementById('testimonialsCarousel');
if (testimonialsCarousel) {
    testimonialsCarousel.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialsCarousel.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
}

// ============================================
// ANIMATED COUNTERS
// ============================================

const statValues = document.querySelectorAll('.stat-value');
let hasAnimated = false;

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

function checkStatsVisibility() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && !hasAnimated) {
        statValues.forEach(stat => {
            animateCounter(stat);
        });
        hasAnimated = true;
    }
}

window.addEventListener('scroll', checkStatsVisibility);
checkStatsVisibility(); // Check on load

// ============================================
// FORM VALIDATION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const projectType = document.getElementById('projectType').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let isValid = true;
        const errors = [];
        
        if (!name) {
            errors.push('Name is required');
            isValid = false;
        }
        
        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }
        
        if (!projectType) {
            errors.push('Please select a project type');
            isValid = false;
        }
        
        if (!budget) {
            errors.push('Please select a budget range');
            isValid = false;
        }
        
        if (!message) {
            errors.push('Message is required');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showFormMessage('Thank you! Your consultation request has been submitted. We will contact you soon.', 'success');
            contactForm.reset();
        } else {
            // Show error message
            showFormMessage(errors.join('<br>'), 'error');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border: 2px solid ${type === 'success' ? '#C9A961' : '#ff4444'};
        background: ${type === 'success' ? 'rgba(201, 169, 97, 0.1)' : 'rgba(255, 68, 68, 0.1)'};
        color: ${type === 'success' ? '#C9A961' : '#ff4444'};
        text-align: center;
    `;
    
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value.trim();
        
        if (email && isValidEmail(email)) {
            showFormMessage('Thank you for subscribing!', 'success');
            this.reset();
        } else {
            showFormMessage('Please enter a valid email address', 'error');
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function parallaxEffect() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Stats parallax
    const statsImage = document.querySelector('.stats-image');
    if (statsImage) {
        const statsSection = document.getElementById('stats');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                statsImage.style.transform = `translateY(${(rect.top - window.innerHeight) * 0.3}px)`;
            }
        }
    }
}

window.addEventListener('scroll', parallaxEffect);

// ============================================
// IMAGE LAZY LOADING
// ============================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in-up');
        }, index * 100);
    });
});

// ============================================
// HOVER EFFECTS FOR CARDS
// ============================================

const cards = document.querySelectorAll('.service-card, .portfolio-item, .style-card, .award-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cConcrete Chic Portfolio', 'font-size: 20px; font-weight: bold; color: #C9A961;');
console.log('%cDesigned with precision and elegance', 'font-size: 12px; color: #2E2E2E;');


