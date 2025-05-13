document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Toggle ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('#main-header .main-nav ul');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // For animating the hamburger icon itself
            // ARIA attribute for accessibility
            const isExpanded = mainNav.classList.contains('active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- Smooth Scroll for internal links (optional but nice) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.closest('.main-nav ul')) { // Exclude nav links if page changes
            anchor.addEventListener('click', function (e) {
                const hrefAttribute = this.getAttribute('href');
                // Ensure it's a valid selector and not just "#"
                if (hrefAttribute && hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                    e.preventDefault();
                    document.querySelector(hrefAttribute).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // --- Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form Validation (Example for contact.html) ---
    const contactForm = document.getElementById('contact-form'); // Add this ID to your form in contact.html
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for now

            const nameInput = document.getElementById('form-name'); // Add IDs to your form inputs
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            if (nameInput.value.trim() === '') {
                displayError(nameInput, 'Name is required.');
                isValid = false;
            }
            if (emailInput.value.trim() === '') {
                displayError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }
            if (messageInput.value.trim() === '') {
                displayError(messageInput, 'Message is required.');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                alert('Thank you for your message, Hilda will get back to you soon! (This is a demo)');
                contactForm.reset();
            }
        });
    }

    function displayError(inputElement, message) {
        // Assuming you have a <span class="error-message"></span> next to each input
        let errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        } else { // Fallback if no dedicated error span
            inputElement.insertAdjacentHTML('afterend', `<span class="error-message" style="color: red; font-size: 0.8em;">${message}</span>`);
        }
        inputElement.classList.add('input-error'); // Add class for styling invalid input
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}); // End DOMContentLoaded