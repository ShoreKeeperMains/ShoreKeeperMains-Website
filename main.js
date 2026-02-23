/* =========================================================================
   SKM - SHOREKEEPERMAINS 
   TETHYS SYSTEM TERMINAL LOGIC
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
    initMobileNav();
    initTypewriterEffects();
    initGlitchText();
});

/**
 * Boot Sequence Animation for Linux Kernel Style Intro
 */
function initBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    if (!bootScreen) return;

    // Only show once per session
    if (sessionStorage.getItem('booted')) {
        bootScreen.style.display = 'none';
        return;
    }

    const lines = [
        "INITIALIZING TETHYS SYSTEM KERNEL...",
        "LOADING MEMORY BANKS... OK",
        "ESTABLISHING SECURE CONNECTION...",
        "DECRYPTING BLACK SHORES ARCHIVES... OK",
        "VERIFYING CLEARANCE LEVEL... LEVEL 1 CONFIRMED",
        "ACCESSING TARGET DATA: SHOREKEEPER",
        "WARNING: HIGH CONCENTRATION OF REMNANT ENERGY DETECTED",
        "STABILIZING CONNECTION...",
        "SYSTEM BOOT SUCCESSFUL."
    ];

    const content = document.getElementById('boot-content');
    let lineIndex = 0;

    function showNextLine() {
        if (lineIndex < lines.length) {
            const p = document.createElement('p');
            p.textContent = lines[lineIndex];
            p.className = 'boot-line';
            content.appendChild(p);
            lineIndex++;
            setTimeout(showNextLine, 100 + Math.random() * 200); // Random delay for typing effect
        } else {
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                    sessionStorage.setItem('booted', 'true');
                }, 500); // wait for fade out
            }, 800);
        }
    }

    // Start sequence slightly after load
    setTimeout(showNextLine, 300);
}

/**
 * Initializes the mobile navigation toggle
 */
function initMobileNav() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle text of button
            if (navLinks.classList.contains('active')) {
                mobileBtn.textContent = '[ CLOSE ]';
            } else {
                mobileBtn.textContent = '[ MENU ]';
            }
        });
    }
}

/**
 * Finds all elements with data-typewriter attribute and animates them
 */
function initTypewriterEffects() {
    const elements = document.querySelectorAll('[data-typewriter]');

    elements.forEach(el => {
        const text = el.getAttribute('data-typewriter') || el.textContent;
        const speed = el.getAttribute('data-speed') || 30; // ms per char
        const delay = el.getAttribute('data-delay') || 0;

        // Clear content initially
        el.textContent = '';
        el.style.opacity = '1';

        setTimeout(() => {
            typeText(el, text, speed);
        }, delay);
    });
}

/**
 * Recursive function to type out text character by character
 */
function typeText(element, text, speed, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);

        // Add random slight delay variation for realism
        const variedSpeed = speed + (Math.random() * 20 - 10);

        setTimeout(() => {
            typeText(element, text, speed, index + 1);
        }, variedSpeed);
    } else {
        // Once done typing, optionally remove the cursor class if present
        element.classList.remove('typewriter');
    }
}

/**
 * Advanced glitch effect for elements with data-glitch class
 */
function initGlitchText() {
    // This could optionally augment the CSS hover effect by scrambling text sporadically
    // leaving as a placeholder for heavier JS animations if needed.
    const glitchElements = document.querySelectorAll('.glitch-text');

    const cryptChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'; // Matrix-style chars

    glitchElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            if (el.dataset.isGlitching === 'true') return;
            el.dataset.isGlitching = 'true';

            const originalText = el.getAttribute('data-text') || el.textContent;
            let iterations = 0;
            const maxIterations = 10;

            const interval = setInterval(() => {
                el.textContent = originalText.split('')
                    .map((letter, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return cryptChars[Math.floor(Math.random() * cryptChars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    el.dataset.isGlitching = 'false';
                    el.textContent = originalText;
                }

                iterations += 1 / 3; // Controls decode speed
            }, 30);
        });
    });
}
