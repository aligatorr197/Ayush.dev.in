/**
 * Advanced Portfolio Controller
 * Features: Magnetic Cursor, Scroll Reveal, Active Nav, Dynamic Typing
 */
class PortfolioController {
    constructor() {
        // Wait for the HTML to fully load before running scripts
        document.addEventListener('DOMContentLoaded', () => {
            this.initCursor();
            this.initScrollReveal();
            this.initActiveNav();
            this.initTypingEffect();
        });
    }

    /**
     * 1. Advanced Magnetic Cursor
     * Includes a smooth trailing effect and magnetic pull on buttons.
     */
    initCursor() {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        
        if (!cursorDot || !cursorOutline) return;

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Instant dot movement
            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            
            // Smooth outline movement
            cursorOutline.animate({
                transform: `translate(${posX}px, ${posY}px)`
            }, { duration: 400, fill: "forwards" });
        });

        // Hover effects for all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .hover-target');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform += ' scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                cursorOutline.style.borderColor = 'transparent';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(56, 189, 248, 0.5)';
            });
        });
    }

    /**
     * 2. High-Performance Scroll Reveal
     * Fades elements in cleanly as they enter the screen.
     */
    initScrollReveal() {
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
        hiddenElements.forEach(el => observer.observe(el));
    }

    /**
     * 3. Active Navigation Highlighting
     * Updates the navigation menu to show which section you are currently reading.
     */
    initActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    /**
     * 4. Dynamic Terminal Typing Effect
     * Showcases your specific tech stack expertise.
     */
    initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        // Customized for high-demand development stacks
        const words = [
            'MERN Stack Developer.', 
            'T3 Stack Enthusiast.', 
            'Problem Solver.', 
            'UI/UX Designer.'
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            const speed = isDeleting ? 40 : 80;

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at the end of the word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before the next word starts
            } else {
                setTimeout(type, speed);
            }
        };

        type(); // Start the animation loop
    }
}

// Initialize the entire portfolio logic
const myPortfolio = new PortfolioController();
const fades=document.querySelectorAll(".fade");

window.addEventListener("scroll",()=>{
fades.forEach(f=>{
let position=f.getBoundingClientRect().top;
let screen=window.innerHeight;

if(position<screen-100){
f.classList.add("show");
}
});
});
