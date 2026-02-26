// Core utilities: Cursor, Theme Toggle, Smooth Scroll, Project View Hover

// CURSOR
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor follower
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    // Add variables for smooth movement
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    // Update cursor position with smooth animation
    function updateCursor() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Update target position on mouse move
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Hide cursor on project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0';
        });

        img.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0.7';
        });
    });

    // Keep existing mouse enter/leave handlers for window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });
});

// VIEW PROJECTS - Hover text for project images
document.addEventListener('DOMContentLoaded', function() {
    // Create hover text element for projects
    const hoverText = document.createElement('div');
    hoverText.className = 'hover-text';
    hoverText.textContent = 'View Project';
    document.body.appendChild(hoverText);

    // Get all project images
    const projectImages = document.querySelectorAll('.project-image img');
    let mousePos = { x: 0, y: 0 };
    let targetPos = { x: 0, y: 0 };
    let isHovering = false;
    let animationFrame;

    function updatePosition() {
        if (isHovering) {
            // Smoothly interpolate between current and target position
            mousePos.x += (targetPos.x - mousePos.x) * 0.2;
            mousePos.y += (targetPos.y - mousePos.y) * 0.2;
            
            hoverText.style.left = mousePos.x + 'px';
            hoverText.style.top = mousePos.y + 'px';
            
            animationFrame = requestAnimationFrame(updatePosition);
        }
    }

    projectImages.forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            isHovering = true;
            // Initialize position to current mouse position
            mousePos.x = targetPos.x = e.clientX;
            mousePos.y = targetPos.y = e.clientY;
            hoverText.style.left = mousePos.x + 'px';
            hoverText.style.top = mousePos.y + 'px';
            
            // Show text immediately at cursor position
            hoverText.classList.add('active');
            
            // Start animation
            if (!animationFrame) {
                animationFrame = requestAnimationFrame(updatePosition);
            }
        });

        img.addEventListener('mousemove', (e) => {
            if (isHovering) {
                targetPos.x = e.clientX;
                targetPos.y = e.clientY;
            }
        });

        img.addEventListener('mouseleave', () => {
            isHovering = false;
            hoverText.classList.remove('active');
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
        });
    });
});

// THEME TOGGLE
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// SMOOTH SCROLL USING LENIS
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            autoRaf: true,
        });

        lenis.on('scroll', (e) => {
            console.log(e);
        });

        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
        }
    }
});
