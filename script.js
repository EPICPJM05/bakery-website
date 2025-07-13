// Navbar scroll effect with opacity change
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.backdropFilter = 'none';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
});

// Smooth scrolling for all anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animation for progress bars
                if (entry.target.classList.contains('progress-bar')) {
                    const width = entry.target.getAttribute('aria-valuenow');
                    entry.target.style.width = `${width}%`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Back to top button with fade effect
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced camera feed simulation with realistic face detection
function simulateFaceDetection() {
    const cameraFeed = document.querySelector('.face-detection-overlay');
    const statusIndicator = document.querySelector('.status-indicator');
    
    // Create initial detection boxes
    const createDetectionBox = (x, y, width, height) => {
        const box = document.createElement('div');
        box.className = 'detection-box';
        box.style.left = `${x}%`;
        box.style.top = `${y}%`;
        box.style.width = `${width}px`;
        box.style.height = `${height}px`;
        box.style.borderColor = `hsl(${Math.random() * 120 + 100}, 80%, 50%)`;
        cameraFeed.appendChild(box);
        return box;
    };
    
    // Initial boxes
    const boxes = [
        createDetectionBox(20, 20, 80, 100),
        createDetectionBox(60, 40, 70, 90),
        createDetectionBox(40, 60, 60, 80)
    ];
    
    // Animate boxes
    const animateBoxes = () => {
        boxes.forEach(box => {
            // Random slight movement
            const currentLeft = parseFloat(box.style.left);
            const currentTop = parseFloat(box.style.top);
            
            box.style.left = `${currentLeft + (Math.random() * 2 - 1)}%`;
            box.style.top = `${currentTop + (Math.random() * 2 - 1)}%`;
            
            // Pulse animation
            box.style.transform = `scale(${1 + Math.random() * 0.05})`;
            box.style.opacity = 0.7 + Math.random() * 0.3;
        });
        
        // Occasionally add new faces
        if (Math.random() > 0.95 && boxes.length < 6) {
            const newBox = createDetectionBox(
                Math.random() * 70 + 10,
                Math.random() * 70 + 10,
                60 + Math.random() * 60,
                80 + Math.random() * 60
            );
            boxes.push(newBox);
            
            // Remove some boxes occasionally to simulate faces leaving
            if (boxes.length > 4 && Math.random() > 0.7) {
                const removeIndex = Math.floor(Math.random() * boxes.length);
                boxes[removeIndex].remove();
                boxes.splice(removeIndex, 1);
            }
        }
        
        // Status indicator animation
        statusIndicator.style.opacity = Math.random() > 0.1 ? '1' : '0.5';
    };
    
    setInterval(animateBoxes, 100);
}

// Initialize camera simulation
simulateFaceDetection();

// Form handling with validation and feedback
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Simulate form submission
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
        
        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check-circle"></i> Success!';
            submitButton.classList.add('btn-success');
            
            // Create confirmation message
            const confirmation = document.createElement('div');
            confirmation.className = 'alert alert-success mt-3';
            confirmation.innerHTML = 'Thank you for your request! Our team will contact you shortly.';
            form.appendChild(confirmation);
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.classList.remove('btn-success');
                confirmation.remove();
            }, 3000);
        }, 1500);
    });
});

// Interactive feature cards with tilt effect
const initFeatureCards = () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
};

// Initialize feature cards
initFeatureCards();

// Dynamic counter animation for metrics
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target.toLocaleString();
            
            // Add "+" if the number is rounded
            if (counter.classList.contains('approx')) {
                counter.innerText = `+${counter.innerText}`;
            }
        }
    });
};

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Theme switcher (optional)
const initThemeSwitcher = () => {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'btn btn-sm btn-outline-secondary theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
};

// Initialize theme switcher
initThemeSwitcher();

// Tooltips initialization
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'hover focus'
    });
});

// Add ripple effect to buttons
const addRippleEffect = () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
};

// Initialize ripple effects
addRippleEffect();

// Add CSS for ripple effect dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// --- Enhanced Footer Interactivity ---

document.addEventListener('DOMContentLoaded', function() {
    // Fade in footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.opacity = 0;
        footer.style.transform = 'translateY(40px)';
        setTimeout(() => {
            footer.style.transition = 'opacity 1.2s cubic-bezier(.4,0,.2,1), transform 1.2s cubic-bezier(.4,0,.2,1)';
            footer.style.opacity = 1;
            footer.style.transform = 'translateY(0)';
        }, 200);
    }

    // Animate social icons on hover
    document.querySelectorAll('.social-links a').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('footer-icon-glow');
        });
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('footer-icon-glow');
        });
    });

    // Glowing effect for newsletter subscribe button
    const subscribeBtn = document.querySelector('.newsletter-signup .btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('mouseenter', () => {
            subscribeBtn.classList.add('footer-btn-glow');
        });
        subscribeBtn.addEventListener('mouseleave', () => {
            subscribeBtn.classList.remove('footer-btn-glow');
        });
    }
});

// Add CSS for enhanced glow effects dynamically
const footerEnhanceStyle = document.createElement('style');
footerEnhanceStyle.textContent = `
.footer-icon-glow {
    box-shadow: 0 0 16px #4facfe, 0 0 32px #764ba2, 0 0 8px #fff;
    filter: brightness(1.2) drop-shadow(0 0 8px #4facfe);
}
.footer-btn-glow {
    box-shadow: 0 0 24px #4facfe, 0 0 32px #764ba2, 0 0 8px #fff;
    filter: brightness(1.1);
}
`;
document.head.appendChild(footerEnhanceStyle);
