document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Copyright Year dynamically
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileBtn && navList) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = mobileBtn.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Client-side Form Validation
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop default submission to validate first
            
            let isValid = true;
            
            // Inputs
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const mensaje = document.getElementById('mensaje');
            
            // Reset all errors first
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('has-error');
            });
            
            // Validate Nombre
            if (!nombre.value.trim()) {
                showError(nombre);
                isValid = false;
            }
            
            // Validate Correo
            if (!correo.value.trim() || !isValidEmail(correo.value)) {
                showError(correo);
                isValid = false;
            }
            
            // Validate Mensaje
            if (!mensaje.value.trim()) {
                showError(mensaje);
                isValid = false;
            }
            
            // If valid, submit the form to Formspree
            if (isValid) {
                // To submit natively without AJAX:
                form.submit();
                
                // Note: Normally with Ajax you would do fetch() here, 
                // but for simplicity and since it's a basic Formspree integration, 
                // we let the native HTML form submission handle it after validation passes.
            }
        });
        
        // Remove error state on input
        const inputs = form.querySelectorAll('input, document');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.closest('.form-group').classList.remove('has-error');
            });
        });
    }

    // Helper Functions
    function showError(inputElement) {
        inputElement.closest('.form-group').classList.add('has-error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
