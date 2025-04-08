// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(20px)';
    });
    
    testimonialSlides[index].style.display = 'block';
    setTimeout(() => {
        testimonialSlides[index].style.opacity = '1';
        testimonialSlides[index].style.transform = 'translateY(0)';
    }, 50);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

// Initialize slider
if (testimonialSlides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.product-card, .cert-item, .service-card, .faq-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.product-card, .cert-item, .service-card, .faq-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}

// Product image hover effect
const productImages = document.querySelectorAll('.product-card img');
productImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Comment form submission
const commentForms = document.querySelectorAll('.comment-form');
commentForms.forEach(form => {
    const textarea = form.querySelector('textarea');
    const button = form.querySelector('button');
    
    if (textarea && button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (textarea.value.trim() !== '') {
                // Create new comment element
                const commentList = form.nextElementSibling;
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                
                const today = new Date();
                const dateString = today.toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                });
                
                newComment.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">Anda</span>
                        <span class="comment-date">${dateString}</span>
                    </div>
                    <p>${textarea.value}</p>
                `;
                
                // Add animation
                newComment.style.opacity = '0';
                newComment.style.transform = 'translateY(20px)';
                
                // Add to DOM
                commentList.insertBefore(newComment, commentList.firstChild);
                
                // Trigger animation
                setTimeout(() => {
                    newComment.style.opacity = '1';
                    newComment.style.transform = 'translateY(0)';
                }, 50);
                
                // Clear form
                textarea.value = '';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Komentar Anda telah ditambahkan!';
                successMsg.style.color = '#2ecc71';
                successMsg.style.marginTop = '10px';
                successMsg.style.fontSize = '0.9rem';
                
                form.appendChild(successMsg);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }
        });
    }
}); 
