// Navigation: Menu animation, Nav link hovers, Image slider, Project transitions

// NAV LINK HOVER ANIMATION
document.addEventListener("DOMContentLoaded", (event) => {
    // Select all nav links instead of the container
    const navLink = document.querySelectorAll('.nav-link');
    
    // Loop through each link directly
    navLink.forEach(link => {
        // Create SplitText instance for each link
        let sticky = new SplitText(link, {
            type: "chars",
            charsClass: "char"
        });

        let hoversticky = gsap.timeline({
            paused: true,
            defaults: {
                duration: 1,
                ease: "power2.out"
            }
        });

        // Set initial state
        gsap.set(sticky.chars, {
            y: 0,
            opacity: 1
        });

        hoversticky.to(sticky.chars, {
            y: -20,
            opacity: 0,
            stagger: 0.02,
            duration: 0.2
        })
        .to(sticky.chars, {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.2
        }, 0.2);

        link.addEventListener("mouseenter", () => {
            hoversticky.restart();
        });
    });
});

// MENU NAVIGATION ANIMATION
document.addEventListener("DOMContentLoaded", (event) => {
    const menuButton = document.querySelector('.menu-button');
    const navPopup = document.querySelector('.nav-popup');
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const navslider = document.querySelector('.image-slider');
    const socialLinks = document.querySelectorAll('.nav-social a');

    if (!menuButton || !navPopup) return;

    let navTimeline = gsap.timeline({ paused: true });
    let maintl = gsap.timeline();
    let mainanim = new SplitText(['.Home', '.Contact', '.About', '.experience-profile-text', '.experience-profile-pic'], {
        type: 'lines',
    });

    maintl.from(mainanim.lines, {
        stagger: 0.05,
        y: 100,
        duration: 1,
        opacity: 0,
        ease: 'power1.inOut',
    }, 0.4);

    // Initialize the navigation animation
    navTimeline
        .to(navPopup, {
            height: '100vh',
            duration: 0.5,
            ease: 'power2.inOut'
        })
        .from(navslider, {
            y: -100,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, 0.1)
        .to(navContent, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
        }, 0)
        .from(navLinks, {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.3,
            ease: 'power2.out'
        }, 0.5)
        .from(socialLinks, {
            y: 50,
            opacity: 0,
            stagger: 0.02,
            duration: 0.3,
            ease: 'power2.out'
        }, 0.5);

    // Toggle menu on click
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        if (menuButton.classList.contains('active')) {
            navTimeline.play();
        } else {
            navTimeline.reverse();
            maintl.restart();
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('active');
            navTimeline.reverse();
            maintl.restart();
        });
    });
});

// IMAGE SLIDER IN NAV
document.addEventListener("DOMContentLoaded", () => {
    const navLink = document.querySelectorAll('.nav-link');
    const imageContainer = document.querySelector('.image-slider');

    if (!imageContainer) return;

    let currentTween = null;

    navLink.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const imgSrc = link.getAttribute('data-img-src');
            if (!imgSrc) return;

            if (currentTween) currentTween.kill();

            // Fade out current image
            currentTween = gsap.to(imageContainer, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    // Change background image
                    imageContainer.style.backgroundImage = `url('${imgSrc}')`;
                    // Fade in new image
                    currentTween = gsap.to(imageContainer, { opacity: 1, duration: 0.3 });
                }
            });
        });

        link.addEventListener('mouseleave', () => {
            if (currentTween) currentTween.kill();
            // Optionally fade out or revert to default image
            currentTween = gsap.to(imageContainer, { opacity: 1, duration: 0.3 });
        });
    });
});

// PROJECT PAGE TRANSITIONS
document.addEventListener("DOMContentLoaded", () => {
    function initProjectTransitions() {
        const transition = document.querySelector('.project-transition');
        const title = document.querySelector('.project-transition-title');
        const subtitle = document.querySelector('.project-transition-subtitle');
        const projectLinks = document.querySelectorAll('.project-image a, .services-button a, .learn-more-link');

        if (!transition) return;

        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const url = link.getAttribute('href');
                const projectTitle = link.getAttribute('data-project-title') || 'Project';
                
                // Update transition text
                title.textContent = projectTitle;
                subtitle.textContent = 'Loading...';
                
                // Animation timeline
                const tl = gsap.timeline();
                
                tl.set(transition, { 
                    opacity: 0, 
                    scale: 0.5
                })
                .set([title, subtitle], { 
                    opacity: 0, 
                    y: 30 
                })
                .to(transition, { 
                    opacity: 1, 
                    duration: 0.7, 
                    scale: 1,
                    ease: 'power4.out' 
                })
                .to(title, { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    ease: 'power2.out' 
                }, 0.3)
                .to(subtitle, { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.4, 
                    ease: 'power2.out' 
                }, 0.5)
                .to([title, subtitle], { 
                    opacity: 0, 
                    y: -30, 
                    duration: 0.4, 
                    ease: 'power2.in' 
                }, 1.2)
                .call(() => {
                    window.location.href = url;
                }, null, 1.8);
            });
        });
    }

    initProjectTransitions();
});
