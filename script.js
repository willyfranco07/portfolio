// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set the current date and login information
    const currentDateElem = document.querySelector('.footer-text p:last-child');
    if (currentDateElem) {
        currentDateElem.textContent = 'Last updated: April 23, 2025';
    }
    
    const loginElem = document.querySelector('.footer-login p');
    if (loginElem) {
        loginElem.textContent = 'Login: willyfranco07';
    }
    
    // Preloader
    const loader = document.querySelector('.loader');
    
    // Hide loader after page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Start animations after loader is hidden
            initAnimations();
        }, 500);
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    const scrollTop = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollTop) scrollTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            if (scrollTop) scrollTop.classList.remove('show');
        }
        
        // AOS-like scroll animations
        handleScrollAnimations();
    });
    
    // Scroll to top
    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const roles = [
            'GoHighLevel Expert',
            'Virtual Assistant',
            'Social Media Manager',
            'Video Editor',
            'Administrative Assistant'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 150;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Deleting text
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 75;
            } else {
                // Typing text
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 150;
            }
            
            // When finished typing
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = 1500; // Pause at end
            }
            
            // When finished deleting
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500; // Pause before typing again
            }
            
            setTimeout(typeEffect, typingDelay);
        }
        
        // Start typing effect
        setTimeout(typeEffect, 1000);
    }
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialTrack && testimonials.length > 0 && dotsContainer) {
        let currentSlide = 0;
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        function goToSlide(index) {
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Auto slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        }
        
        // Change slide every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto slide when hovering
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Simulate form submission
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-circle-notch fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Initialize skill bars animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-per');
        
        skillBars.forEach(skill => {
            const percentage = skill.getAttribute('per');
            skill.style.width = percentage + '%';
        });
    }
    
    // Count up animation for stats
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const stepTime = 50; // Update every 50ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }
    
    // AOS-like scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Delay to ensure everything is loaded
        setTimeout(() => {
            initSkillBars();
            handleScrollAnimations();
            
            // Initialize counters when stats section is in view
            const statsSection = document.getElementById('stats');
            if (statsSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            initCounters();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(statsSection);
            }
        }, 300);
    }
    
    // Update footer with date & time
    const footerDateElem = document.querySelector('.footer-text p:last-child');
    if (footerDateElem) {
        footerDateElem.textContent = 'Last updated: April 23, 2025';
    }
    
    // Dynamic current time display
    function createTimeElement() {
        const timeElem = document.createElement('div');
        timeElem.classList.add('current-time');
        timeElem.textContent = 'April 23, 2025 - 21:29:16';
        document.querySelector('.footer').appendChild(timeElem);
    }
    createTimeElement();
});
