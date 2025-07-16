document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // --- Mobile Navigation Toggle ---
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Smooth Scroll (Optional, if you add anchor links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- "Animate on Scroll" functionality ---
    // This will make elements fade in and slide up as they enter the viewport
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- Newsletter Form Submission (Client-side) ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const subscribeButton = newsletterForm.querySelector('button[type="submit"]');
        const emailInput = newsletterForm.querySelector('input[type="email"]');

        subscribeButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default form submission

            const email = emailInput.value.trim();
            if (email && email.includes('@') && email.includes('.')) {
                alert('Success! You\'ve subscribed to AI Tools Hub for cutting-edge insights!');
                emailInput.value = ''; // Clear the input field
                // In a real application, you'd send this email to a server
            } else {
                alert('Please enter a valid email address to subscribe.');
            }
        });
    }

    // --- Simple Hover Effects with JS (Alternative to pure CSS if needed for complexity) ---
    // (Currently handled well by CSS, but keeping this as an example for future use)
    // const featureCards = document.querySelectorAll('.feature-card');
    // featureCards.forEach(card => {
    //     card.addEventListener('mouseenter', () => {
    //         card.style.transform = 'translateY(-10px) scale(1.03)';
    //         card.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
    //     });
    //     card.addEventListener('mouseleave', () => {
    //         card.style.transform = 'translateY(0) scale(1)';
    //         card.style.boxShadow = '0 6px 20px rgba(0,0,0,0.05)';
    //     });
    // });
});