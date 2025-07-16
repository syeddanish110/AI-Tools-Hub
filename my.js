document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // --- Mobile Navigation Toggle (Hamburger Icon) ---
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Optional: for animating the hamburger icon

            // Close all dropdowns when main mobile menu is toggled off
            if (!mainNav.classList.contains('active')) {
                document.querySelectorAll('.main-nav .dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    // Hide the dropdown content as well
                    const dropdownContent = dropdown.querySelector('.dropdown-content');
                    if (dropdownContent) {
                        dropdownContent.style.display = 'none';
                    }
                });
            }
        });
    }

    // --- Smooth Scroll (Optional, if you add anchor links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') { // Ensure targetId is not null or empty or just '#'
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open after clicking an anchor link
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
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
                entry.target.classList.add('is-visible'); // Add a class for CSS transition
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

    // --- Dropdown Menu Toggle (for mobile/small screens) ---
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior for dropdown button

                // Determine if we are on a mobile view (based on the mainNav's active state or screen width)
                // Use the media query breakpoint (768px)
                const isMobileView = window.innerWidth <= 768; 

                // If in mobile view, or if JavaScript is needed for toggle (e.g., for accessibility or specific desktop behavior)
                if (isMobileView) { // Only toggle with JS if it's a mobile view
                    dropdown.classList.toggle('active'); // Toggles the JS 'active' class

                    if (dropdown.classList.contains('active')) {
                        dropdownContent.style.display = 'block';
                    } else {
                        dropdownContent.style.display = 'none';
                    }

                    // Close other open dropdowns when one is opened (useful for mobile)
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                            otherDropdown.classList.remove('active');
                            otherDropdown.querySelector('.dropdown-content').style.display = 'none';
                        }
                    });
                }
            });
        }
    });

    // Close dropdowns if clicked outside the navigation area (for both desktop and mobile)
    document.addEventListener('click', (event) => {
        const isClickInsideNav = event.target.closest('.main-nav');
        
        // If click is outside navigation, close all dropdowns
        if (!isClickInsideNav) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                // Ensure dropdown content is hidden if JS actively manages it (mobile)
                if (dropdownContent && window.innerWidth <= 768) { 
                    dropdownContent.style.display = 'none';
                }
            });
        }
    });

    // Handle window resize to ensure dropdowns and mobile menu behave correctly
    window.addEventListener('resize', () => {
        // If resizing from mobile to desktop, ensure mobile menu closes and dropdowns reset
        if (window.innerWidth > 768) {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
            // For desktop, ensure dropdown content is hidden if JS set it to block
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active'); // Remove JS active class
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) dropdownContent.style.display = ''; // Let CSS handle display
            });
        } else { // If resizing from desktop to mobile, ensure dropdowns are hidden unless explicitly active
            dropdowns.forEach(dropdown => {
                if (!dropdown.classList.contains('active')) {
                    const dropdownContent = dropdown.querySelector('.dropdown-content');
                    if (dropdownContent) {
                        dropdownContent.style.display = 'none';
                    }
                }
            });
        }
    });

});
