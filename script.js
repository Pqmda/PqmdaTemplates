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

//HOVER Capabilities
document.addEventListener('DOMContentLoaded', function() {
    const capabilities = document.querySelectorAll('.capability-item');
    
    capabilities.forEach(item => {
        const image = item.querySelector('.capability-image');
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

//HOVER Capability Headers

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(SplitText);

  const headers = document.querySelectorAll('.capability-header h3');

  headers.forEach(header => {

    const originalText = header.querySelector('.text-original');
    const hoverText = header.querySelector('.text-hover');

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

//CURSOR
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
//END

//VIEW PROJECTS
// Add active class to the current navigation item based on scroll position
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

    // Update active class on scroll
    window.addEventListener('scroll', function() {
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
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
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

    //SMOOTH SCROLL USING LENIS
    const lenis = new Lenis({
    autoRaf: true,
    });

    lenis.on('scroll', (e) => {
    console.log(e);
    });

    lenis.on('scroll', ScrollTrigger.update);
});

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger,SplitText,Observer,TextPlugin);
        

        let seemore = new SplitText(['.More-text h2, .More-text h6'], {
            type:'chars',
        })

        let capabilities = new SplitText(['.capabilities-list h3, .capabilities-wrapper h2, .capability-number, .capability-divider'], {
            type:'lines',
        })

        let seemore2 = new SplitText('.More-text p, .More-text button', {
            type:'chars',
        })

        let prfl = new SplitText('.profile-cards h1',{
            type:'words',
        })

        let exppprfltxt = new SplitText(['.experience-profile-text h2', '.experience-profile-text p'], {
            type:'lines',
        })

        gsap.to('.Home',{
            scrollTrigger:{
                trigger:'.Home',
                start:'bottom bottom',
                end:'bottom top',
                scrub:1,
                pin:true,
                pinSpacing: false,
            },
            scale:0.5,
            rotation: -5,
            borderRadius: 100,
            filter: 'blur(10px)',
            ease:'power1.inOut',
        });

        gsap.to('.projects-card',{
            scrollTrigger:{
                trigger:'.projects-card',
                start:'top center',
                end:'top top',
                scrub:1,
            },
            y:80,
            ease:'power1.inOut',
        });

        gsap.to('.experience-card',{
            scrollTrigger:{
                trigger:'.experience-card',
                start:'top 30%',
                end:'top 5%',
                scrub:2,
            },
            y:90,
            ease:'power1.inOut',
        });

        gsap.to('.profile-illustration',{
            scrollTrigger:{
                trigger:'.profile-illustration',
                start:'top 30%',
                end:'top 5%',
                scrub:1,
            },
            y:-10,
            ease:'power1.inOut',
        });

        gsap.to('.headline2',{
            scrollTrigger:{
                trigger:'.headline2',
                start:'bottom 40%',
                end:'bottom bottom',
                scrub:2,
            },
            y:70,
        });  

        gsap.to('.horizontal', {
            scrollTrigger:{
                trigger:'.horizontal',
                start:'bottom 60%',
                pin:'.About',
                end:'+=2000',
                scrub:1,
            },
            x:-1500,
            ease:'power1.inOut',
            
        }); 
        gsap.from('.horizontal2', {
            scrollTrigger:{
                trigger:'.horizontal2',
                start:'40 center',
                end:'+=2000',
                scrub:1,
            },
            x:-1500,
            ease:'power1.inOut',
        }); 

        gsap.from(exppprfltxt.lines,{
            stagger:0.08,
            scrollTrigger:{
                trigger:'.experience-profile-text',
                start:'top bottom',
                end:'top 30%',
                scrub:1,
            },
            opacity:0,
            y:100,
            ease:'power2.inOut',
        })

        gsap.from('.experience-profile-text', {
            scrollTrigger:{
                trigger:'.experience-profile-text',
                start:'top bottom',
                end:'top 30%',
                scrub:1,
            },
            opacity:0,
            borderColor: '#f8b400',
            y:100,
            ease:'power2.inOut',
        });

        let tl = gsap.timeline({
            scrollTrigger:{
                trigger:'.capabilities-wrapper',
                start:'top 80%',
                end:'bottom bottom',
                scrub:2,
            },
            });
            tl.to(".experience-profile-pic",{
                x:1100,
                y:900,
                scale: 0.4,
            })

        gsap.to('.profile-cards-container',{
                scrollTrigger:{
                    trigger:'.profile-cards-container',
                    start:'bottom 94%',
                    end:'+=3000',
                    scrub:2,
                    pin:'.profile-cards',
            }, 
        });
window.addEventListener('resize', restrictProfilePicAnimation);
window.addEventListener('DOMContentLoaded', restrictProfilePicAnimation);
//COUNTER
gsap.fromTo(".stat .number-percent", {

    innerText: 0
}, {
    innerText: 98,
    duration: 2,
    snap: { innerText: 1 },
    scrollTrigger: {
        trigger: ".stat h3",
        start: "top 80%",
        once: true
    }
});

gsap.fromTo(".stat .number", {

    innerText: 0
}, {
    innerText: 70,
    duration: 2,
    snap: { innerText: 1 },
    scrollTrigger: {
        trigger: ".stat h3",
        start: "top 80%",
        once: true
    }
});

//END COUNTER
        gsap.from(prfl.words,{
            stagger:0.2,
            scrollTrigger:{
                trigger:'.profile-cards-container',
                start:'15% bottom',
                end:'15% 30%',
                scrub:1,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })
        gsap.from(capabilities.lines,{
            stagger:0.02,
            scrollTrigger:{
                trigger:'.capabilities-wrapper',
                start:'top 80%',
                end:'bottom bottom',
                scrub:1.5,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })

        gsap.to('.left-project-pic1',{
            scrollTrigger:{
                trigger:'.left-project-pic1',
                start:'top 80%',
                end:'bottom 40%',
                scrub:1,
            },
            x:150,
            rotation:5,
            ease:'power1.inOut',
        });

        gsap.to('.right-project-pic1',{
            scrollTrigger:{
                trigger:'.right-project-pic1',
                start:'top bottom',
                end:'bottom 20%',
                scrub:1,
            },
            x:-150,
            y:-100,
            rotation:-5,
            ease:'power1.inOut',
        });

        gsap.to('.left-project-pic2',{
            scrollTrigger:{
                trigger:'.left-project-pic2',
                start:'top 80%',
                end:'20% 10%',
                scrub:1,
            },
            x:300,
            y:200,
            rotation:-10,
            ease:'power1.inOut',
        });

        gsap.to('.right-project-pic2',{
            scrollTrigger:{
                trigger:'.right-project-pic2',
                start:'top bottom',
                end:'top 20%',
                scrub:1,
            },
            x:150,
            rotation:10,
            ease:'power1.inOut',
        });

        gsap.to('.left-project-pic3',{
            scrollTrigger:{
                trigger:'.left-project-pic3',
                start:'top bottom',
                end:'top 20%',
                scrub:1,
            },
            x:150,
            rotation:10,
            ease:'power1.inOut',
        });

        let moreexp = gsap.timeline({
            scrollTrigger:{
                trigger:'.More-container',
                start:'top bottom',
                end:'bottom bottom',
                scrub:2,
            },
            });
            moreexp.from(".More-container video",{
                scale:0.8,
                borderRadius: 100,
                rotation: -10,
                ease:'power1.inOut',
            })

        gsap.from(seemore.chars,{
            stagger:0.2,
            scrollTrigger:{
                trigger:'.More-container video',
                start:'20% 60%',
                end:'bottom bottom',
                scrub:1,
            },
            opacity:0,
            y:-100,
            ease:'power1.inOut',
        })

        gsap.from(seemore2.chars,{
            stagger:0.1,
            scrollTrigger:{
                trigger:'.More-container video',
                start:'center 60%',
                end:'90% bottom',
                scrub:1,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })

        gsap.from('.More-text button',{
            scrollTrigger:{
                trigger:'.More-container video',
                start:'center 60%',
                end:'90% bottom',
                scrub:1,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })

        const testimonial = gsap.timeline({
        scrollTrigger: {
            trigger: '.More-container',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1,
            pin: '.More-container',
        }
        });

        // Animate the testimonials container
        testimonial.from('.testimonials', {
        y: 500,
        scaleX: 0.7,
        rotation: 10,
        borderRadius: 100,
        duration: 3,
        ease: 'power1.inOut'
        });

        // Animate testimonial cards with stagger
        testimonial.from('.testimonial-card', {
        opacity: 0,
        y: 200,
        ease: 'power1.inOut',
        stagger: 0.1,
        duration: 1,
        },'-=0.5');

// Navigation Animation
const menuButton = document.querySelector('.menu-button');
const navPopup = document.querySelector('.nav-popup');
const navContent = document.querySelector('.nav-content');
const navLinks = document.querySelectorAll('.nav-link',);
const navslider = document.querySelector('.image-slider');
const socialLinks = document.querySelectorAll(['.nav-social a']);

let navTimeline = gsap.timeline({ paused: true });
let maintl = gsap.timeline();
let mainanim = new SplitText(['.Home','.Contact', '.About', '.experience-profile-text', '.experience-profile-pic',], {


    type:'lines',
})

    maintl.from(mainanim.lines,{
        stagger:0.05,
        y:100,
        duration: 1,
        opacity: 0,
        ease:'power1.inOut',
    },0.4)

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
    },0.1)

    .to(navContent, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    },0)

    .from(navLinks, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: 'power2.out'
    },0.5)

    .from(socialLinks, {
        y: 50,
        opacity: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: 'power2.out'
    },0.5)

// Project Page Transitions
function initProjectTransitions() {
    const transition = document.querySelector('.project-transition');
    const title = document.querySelector('.project-transition-title');
    const subtitle = document.querySelector('.project-transition-subtitle');
    const projectLinks = document.querySelectorAll(['.project-image a', '.services-button a', '.learn-more-link']);

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
                opacity: 0 , 
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
//END


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

// Image Slider
const navLink = document.querySelectorAll('.nav-link');
const imageContainer = document.querySelector('.image-slider');

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

// LOOPING TEXT
const scrollingText = gsap.utils.toArray('.rail h4');

const obs = horizontalLoop(scrollingText, {
  repeat: -1,
  paddingRight: 30,
});

Observer.create({
  onChangeY(self) {
    let factor = 2.5;
    if (self.deltaY < 0) {
      factor *= -1;
    } 
    gsap.timeline({
      defaults: {
        ease: "none",
      }
    })
      .to(obs, { timeScale: factor * 2.5, duration: 0.2, overwrite: true, })
      .to(obs, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
  }
});

function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), 
		totalWidth, curX, distanceToStart, distanceToLoop, item, i;
	gsap.set(items, { 
		xPercent: (i, el) => {
			let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
			xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
			return xPercents[i];
		}
	});
	gsap.set(items, {x: 0});
	totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = xPercents[i] / 100 * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
		  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
		  .add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) { 
			vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = vars => toIndex(curIndex+1, vars);
	tl.previous = vars => toIndex(curIndex-1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.times = times;
	tl.progress(1, true).progress(0, true); 
	if (config.reversed) {
	  tl.vars.onReverseComplete();
	  tl.reverse();
	}
	return tl;
}

//STROKE effect
        let svg = document.querySelector(".svg-container svg");
        let path = svg.querySelector("path");

        const pathLength = path.getTotalLength();

        console.log(pathLength);

        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
        
        gsap.to(path, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: '.svg-container',  
                start: 'top center',         
                end: '=+3500px',
                scrub: 1.5,
            },
        });


// hover left pic1
        let leftpic1 = document.querySelector(".left-project-pic1");
        let hoverLpic1 = gsap.to(".left-project-pic1", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,
    })

        leftpic1.addEventListener("mouseenter", () => hoverLpic1.play());
        leftpic1.addEventListener("mouseleave", () => hoverLpic1.reverse());

// hover left pic2
        let leftpic2 = document.querySelector(".left-project-pic2");
        let hoverLpic2 = gsap.to(".left-project-pic2", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,
        })

        leftpic2.addEventListener("mouseenter", () => hoverLpic2.play());
        leftpic2.addEventListener("mouseleave", () => hoverLpic2.reverse());

// hover right pic1

        let rightpic1 = document.querySelector(".right-project-pic1");
        let hoverRpic1 = gsap.to(".right-project-pic1", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,

    })

        rightpic1.addEventListener("mouseenter", () => hoverRpic1.play());
        rightpic1.addEventListener("mouseleave", () => hoverRpic1.reverse());

//hover right pic2
        let rightpic2 = document.querySelector(".right-project-pic2");
        let hoverRpic2 = gsap.to(".right-project-pic2", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,

        })

        rightpic2.addEventListener("mouseenter", () => hoverRpic2.play());
        rightpic2.addEventListener("mouseleave", () => hoverRpic2.reverse());

//hover left pic3
        let Lpic3 = document.querySelector(".left-project-pic3");
        let hoverLpic3 = gsap.to(".left-project-pic3", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,

        })

        Lpic3.addEventListener("mouseenter", () => hoverLpic3.play());
        Lpic3.addEventListener("mouseleave", () => hoverLpic3.reverse());
});

// RESTRICTIONS

function restrictProfilePicAnimation() {
  if (window.innerWidth <= 1100) {
    gsap.killTweensOf('.experience-profile-pic');
    gsap.set('.experience-profile-pic', { clearProps: 'all' });
  } else {
    // Run your GSAP animation as usual
    tl.to('.experience-profile-pic', {                 
        x:1100,
        y:900,
        scale: 0.4, });
  }
}

function restrictProjectCardAnimation() {
  if (window.innerWidth > 740) {
    tl.to('.left-project-pic1', { x: 150, rotation: 5, ease: 'power1.inOut' });
    tl.to('.left-project-pic2', { x: 150, rotation: 5, ease: 'power1.inOut' }); 
  } else {
    gsap.killTweensOf('.left-project-pic1');
    gsap.set('.left-project-pic1', { clearProps: 'all' });
    gsap.killTweensOf('.left-project-pic2');
    gsap.set('.left-project-pic2', { clearProps: 'all' });
    gsap.killTweensOf('.left-project-pic3');
    gsap.set('.left-project-pic3', { clearProps: 'all' });
  }
}

function restrictProjectCardAnimation2() {
  if (window.innerWidth > 740) {
    tl.to('.right-project-pic1', { x: -150, y: -100, rotation: -5, ease: 'power1.inOut' });
    tl.to('.right-project-pic2', { x: -150, y: -100, rotation: -5, ease: 'power1.inOut' }); 
  } else {
    gsap.killTweensOf('.right-project-pic1');
    gsap.set('.right-project-pic1', { clearProps: 'all' });
    gsap.killTweensOf('.right-project-pic2');
    gsap.set('.right-project-pic2', { clearProps: 'all' });
  }
}

window.addEventListener('resize', function() {
  restrictProjectCardAnimation();
  restrictProjectCardAnimation2();
});

document.addEventListener('DOMContentLoaded', function() {
  restrictProjectCardAnimation();
  restrictProjectCardAnimation2();
});

function setupProfileCardsScrollTrigger() {
let endValue;
if (window.innerWidth <= 500) {
  endValue = '+=1300';
} else if (window.innerWidth <= 1024) {
  endValue = '+=1300';
} else if (window.innerWidth <= 1440) {
  endValue = '+=2800';
} else {
  endValue = '+=3000';
}
  let triggers = ScrollTrigger.getAll().filter(trigger => trigger.trigger && trigger.trigger.classList.contains('profile-cards-container'));
  if (triggers.length > 0) {
    // Update the end value dynamically
    triggers.forEach(trigger => {
      trigger.vars.end = endValue;
      trigger.refresh();
    });
  } else {
    gsap.to('.profile-cards-container', {
      scrollTrigger: {
        trigger: '.profile-cards-container',
        start: 'bottom 94%',
        end: endValue,
        scrub: 2,
        pin: '.profile-cards',
        markers: true
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', setupProfileCardsScrollTrigger);
window.addEventListener('resize', setupProfileCardsScrollTrigger);
// ... existing code ...


function restrictSVGPathAnimation() {
  let svg = document.querySelector('.svg-container svg');
  if (!svg) return;
  let path = svg.querySelector('path');
  if (!path) return;
  const pathLength = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  });
  if (window.innerWidth > 1024) {
    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '.svg-container',
        start: 'top center',
        end: '+=3500px',
        scrub: 1.5,
      },
    });
    } else {
    gsap.killTweensOf(path);
    gsap.set(path, { strokeDashoffset: pathLength });
  }
}
window.addEventListener('resize', restrictSVGPathAnimation);
window.addEventListener('DOMContentLoaded', restrictSVGPathAnimation);



// END Restrictions

// Preloader with counter integration
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.querySelector('.preloader');
  const counter = document.getElementById('preloader-counter');

  // Force preloader to be visible and reset its state
  preloader.style.display = 'flex';
  preloader.classList.remove('slide-out');
  preloader.style.transform = '';
  if (counter) counter.textContent = '0%';

  function animateCounter(duration) {
    let start = 0;
    const end = 100;
    const stepTime = duration / end;
    const timer = setInterval(() => {
      start++;
      counter.textContent = start + '%';
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Handle both initial load and back navigation
  function handlePageShow() {
    animateCounter(1500);
    setTimeout(function() {
      preloader.classList.add('slide-out');
      preloader.addEventListener('transitionend', function hidePreloader() {
        preloader.style.display = 'none';
        preloader.removeEventListener('transitionend', hidePreloader);
      });
    }, 1500);
  }

  // Listen for both load and pageshow events
  window.addEventListener('load', handlePageShow);
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      handlePageShow();
    }
  });


//HOME 
console.clear();

gsap.registerPlugin(Observer);

const scrollingText = gsap.utils.toArray('.marquee-text h4');

const tl = horizontalLoop(scrollingText, {
  repeat: -1,
  paddingRight: 30,
});

Observer.create({
  onChangeY(self) {
    let factor = 2.5;
    if (self.deltaY < 0) {
      factor *= -1;
    } 
    gsap.timeline({
      defaults: {
        ease: "none",
      }
    })
      .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true, })
      .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
  }
});

function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		totalWidth, curX, distanceToStart, distanceToLoop, item, i;
	gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
		xPercent: (i, el) => {
			let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
			xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
			return xPercents[i];
		}
	});
	gsap.set(items, {x: 0});
	totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = xPercents[i] / 100 * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
		  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
		  .add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = vars => toIndex(curIndex+1, vars);
	tl.previous = vars => toIndex(curIndex-1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.times = times;
	tl.progress(1, true).progress(0, true); // pre-render for performance
	if (config.reversed) {
	  tl.vars.onReverseComplete();
	  tl.reverse();
	}
	return tl;
}
});