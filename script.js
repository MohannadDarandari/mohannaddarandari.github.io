// ==========================================
// MOHANNAD DARANDARI - PORTFOLIO 2026
// Epic JavaScript Functionality
// ==========================================

// ===== EPIC PRELOADER =====
(function () {
    document.body.classList.add('loading');

    const canvas = document.getElementById('preloaderCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const statusEl = document.getElementById('preloaderStatus');
    const preloader = document.getElementById('preloader');

    // Status messages
    const statusMessages = [
        'Initializing neural pathways...',
        'Loading AI modules...',
        'Connecting synapses...',
        'Training neural network...',
        'Compiling intelligence...',
        'Rendering interface...',
        'Almost ready...'
    ];

    // Canvas particles
    let particles = [];
    let animFrameId;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        if (!canvas) return;
        particles = [];
        const count = Math.min(60, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.4 + 0.1
            });
        }
    }

    function drawParticles() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 217, 255, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw & update particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 217, 255, ${p.alpha})`;
            ctx.fill();
        });

        animFrameId = requestAnimationFrame(drawParticles);
    }

    // Progress animation
    let progress = 0;
    let statusIndex = 0;

    function updateProgress() {
        if (!preloader) return;

        const increment = Math.random() * 3 + 0.5;
        progress = Math.min(progress + increment, 90); // Cap at 90 until page loads

        if (progressFill) progressFill.style.width = progress + '%';
        if (progressPercent) progressPercent.textContent = Math.floor(progress) + '%';

        // Update status messages
        const newIndex = Math.min(Math.floor(progress / 15), statusMessages.length - 1);
        if (newIndex !== statusIndex && statusEl) {
            statusIndex = newIndex;
            statusEl.style.opacity = '0';
            setTimeout(() => {
                statusEl.textContent = statusMessages[statusIndex];
                statusEl.style.opacity = '1';
            }, 200);
        }

        if (progress < 90) {
            setTimeout(updateProgress, 50 + Math.random() * 80);
        }
    }

    // Init
    resizeCanvas();
    createParticles();
    drawParticles();
    updateProgress();
    window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });

    // Finish on page load
    window.addEventListener('load', () => {
        // Quickly fill to 100
        const finishProgress = () => {
            progress += 3;
            if (progress > 100) progress = 100;
            if (progressFill) progressFill.style.width = progress + '%';
            if (progressPercent) progressPercent.textContent = Math.floor(progress) + '%';

            if (progress < 100) {
                requestAnimationFrame(finishProgress);
            } else {
                if (statusEl) {
                    statusEl.style.opacity = '0';
                    setTimeout(() => {
                        statusEl.textContent = 'Welcome.';
                        statusEl.style.opacity = '1';
                    }, 200);
                }
                // Fade out preloader after a beat
                setTimeout(() => {
                    if (preloader) preloader.classList.add('fade-out');
                    cancelAnimationFrame(animFrameId);
                    setTimeout(() => {
                        if (preloader) preloader.style.display = 'none';
                        document.body.classList.remove('loading');
                    }, 800);
                }, 600);
            }
        };
        setTimeout(finishProgress, 300);
    });
})();

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== TYPING ANIMATION =====
const typingTexts = [
    'AI Engineer',
    'LLM & RAG Systems Builder',
    'Automation Engineer',
    'MCP Platform Developer',
    'RPA Specialist'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    setTimeout(type, typingDelay);
}

// Start typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate counters
            if (entry.target.classList.contains('stat-item')) {
                const counterElement = entry.target.querySelector('h3');
                if (counterElement && !counterElement.classList.contains('counted')) {
                    counterElement.classList.add('counted');
                    const targetValue = parseInt(counterElement.textContent);
                    animateCounter(counterElement, targetValue);
                }
            }

            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const percentage = entry.target.querySelector('.skill-percentage').textContent;
                if (progressBar) {
                    progressBar.style.width = percentage;
                }
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section > .container');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => observer.observe(item));

    // Observe skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => observer.observe(item));
});

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// ===== FORM VALIDATION & MAILTO =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Please fill in all fields!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        // Open email client with pre-filled data
        const mailtoBody = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
        const mailtoLink = `mailto:mohannad.ai@ieee.org?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
        window.open(mailtoLink, '_blank');
        
        // Show success & reset
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Opening Email Client...';
        btn.style.background = 'var(--secondary)';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ===== THEME TOGGLE (OPTIONAL) =====
const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        // Change icon
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PARALLAX EFFECT FOR FLOATING ICONS =====
document.addEventListener('mousemove', (e) => {
    const icons = document.querySelectorAll('.floating-icons .icon-item');

    icons.forEach((icon, index) => {
        const speed = (index + 1) * 0.01;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        icon.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Welcome to Mohannad Darandari Portfolio!', 'color: #00D9FF; font-size: 20px; font-weight: bold;');
console.log('%c Built with ❤️ in 2026', 'color: #FF6B6B; font-size: 14px;');
console.log('%c Interested in collaborating? Let\'s connect!', 'color: #FFE66D; font-size: 14px;');

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
