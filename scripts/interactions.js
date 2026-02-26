// Hover Effects: Capabilities, Capability Headers, Project Images

// HOVER CAPABILITIES
document.addEventListener('DOMContentLoaded', function() {
    const capabilities = document.querySelectorAll('.capability-item');
    
    capabilities.forEach(item => {
        const image = item.querySelector('.capability-image');
        if (!image) return;
        
        let hoverAnimation;

        // Set initial states
        gsap.set(image, {
            opacity: 0,
            scale: 0.8,
            transformOrigin: 'center center'
        });

        item.addEventListener('mouseenter', (e) => {
            if (hoverAnimation) hoverAnimation.kill();
            
            // Set initial position
            gsap.set(image, {
                left: e.clientX + 20,
                top: e.clientY - 200,
                opacity: 0,
                scale: 0.8
            });
            
            // Play hover animation immediately
            hoverAnimation = gsap.to(image, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power4.inOut'
            });
        });

        item.addEventListener('mousemove', (e) => {
            if (image) {
                gsap.to(image, {
                    left: e.clientX + 20,
                    top: e.clientY - 200,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            if (hoverAnimation) {
                hoverAnimation.kill();
            }
            
            // Quick fade out for image
            gsap.to(image, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                ease: 'power2.in'
            });
        });
    });
});

// HOVER CAPABILITY HEADERS
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(SplitText);

    const headers = document.querySelectorAll('.capability-header h3');

    headers.forEach(header => {
        const originalText = header.querySelector('.text-original');
        const hoverText = header.querySelector('.text-hover');

        if (!originalText || !hoverText) return;

        // Split text into chars
        const splitOriginal = new SplitText(originalText, { type: 'chars' });
        const splitHover = new SplitText(hoverText, { type: 'chars' });

        // Set initial states
        gsap.set(splitHover.chars, { y: '100%', opacity: 0 });

        // Create timeline
        const tl = gsap.timeline({ paused: true });

        tl.to(splitOriginal.chars, {
            y: '-100%',
            opacity: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: 'power4.out'
        }, 0);

        tl.to(splitHover.chars, {
            y: '-200%',
            opacity: 1,
            stagger: 0.02,
            duration: 0.5,
            ease: 'power4.out'
        }, 0);

        header.addEventListener('mouseenter', () => tl.restart());
        header.addEventListener('mouseleave', () => tl.reverse());
    });
});

// HOVER PROJECT IMAGES - Scale Effects
document.addEventListener('DOMContentLoaded', () => {
    // Hover left pic1
    let leftpic1 = document.querySelector(".left-project-pic1");
    if (leftpic1) {
        let hoverLpic1 = gsap.to(".left-project-pic1", {
            paused: true,
            ease: 'power4.inOut',
            scale: 1.2,
            duration: 0.7,
        });

        leftpic1.addEventListener("mouseenter", () => hoverLpic1.play());
        leftpic1.addEventListener("mouseleave", () => hoverLpic1.reverse());
    }

    // Hover left pic2
    let leftpic2 = document.querySelector(".left-project-pic2");
    if (leftpic2) {
        let hoverLpic2 = gsap.to(".left-project-pic2", {
            paused: true,
            ease: 'power4.inOut',
            scale: 1.2,
            duration: 0.7,
        });

        leftpic2.addEventListener("mouseenter", () => hoverLpic2.play());
        leftpic2.addEventListener("mouseleave", () => hoverLpic2.reverse());
    }

    // Hover right pic1
    let rightpic1 = document.querySelector(".right-project-pic1");
    if (rightpic1) {
        let hoverRpic1 = gsap.to(".right-project-pic1", {
            paused: true,
            ease: 'power4.inOut',
            scale: 1.2,
            duration: 0.7,
        });

        rightpic1.addEventListener("mouseenter", () => hoverRpic1.play());
        rightpic1.addEventListener("mouseleave", () => hoverRpic1.reverse());
    }

    // Hover right pic2
    let rightpic2 = document.querySelector(".right-project-pic2");
    if (rightpic2) {
        let hoverRpic2 = gsap.to(".right-project-pic2", {
            paused: true,
            ease: 'power4.inOut',
            scale: 1.2,
            duration: 0.7,
        });

        rightpic2.addEventListener("mouseenter", () => hoverRpic2.play());
        rightpic2.addEventListener("mouseleave", () => hoverRpic2.reverse());
    }

    // Hover left pic3
    let Lpic3 = document.querySelector(".left-project-pic3");
    if (Lpic3) {
        let hoverLpic3 = gsap.to(".left-project-pic3", {
            paused: true,
            ease: 'power4.inOut',
            scale: 1.2,
            duration: 0.7,
        });

        Lpic3.addEventListener("mouseenter", () => hoverLpic3.play());
        Lpic3.addEventListener("mouseleave", () => hoverLpic3.reverse());
    }
});
