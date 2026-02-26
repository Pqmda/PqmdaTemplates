// GSAP Animations: ScrollTrigger animations, counters, restrictions, looping text

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, SplitText, Observer, TextPlugin);

    // SPLIT TEXT SETUP
    let seemore = new SplitText(['.More-text h2, .More-text h6'], {
        type: 'chars',
    });

    let capabilities = new SplitText(['.capabilities-list h3, .capabilities-wrapper h2, .capability-number, .capability-divider'], {
        type: 'lines',
    });

    let seemore2 = new SplitText('.More-text p, .More-text button', {
        type: 'chars',
    });

    let prfl = new SplitText('.profile-cards h1', {
        type: 'words',
    });

    let exppprfltxt = new SplitText(['.experience-profile-text h2', '.experience-profile-text p'], {
        type: 'lines',
    });

    // HOME SECTION ANIMATION
    gsap.to('.Home', {
        scrollTrigger: {
            trigger: '.Home',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1,
            pin: true,
            pinSpacing: false,
        },
        scale: 0.5,
        rotation: -5,
        borderRadius: 100,
        filter: 'blur(10px)',
        ease: 'power1.inOut',
    });

    // STAT CARDS ANIMATIONS
    gsap.to('.projects-card', {
        scrollTrigger: {
            trigger: '.projects-card',
            start: 'top center',
            end: 'top top',
            scrub: 1,
        },
        y: 80,
        ease: 'power1.inOut',
    });

    gsap.to('.experience-card', {
        scrollTrigger: {
            trigger: '.experience-card',
            start: 'top 30%',
            end: 'top 5%',
            scrub: 2,
        },
        y: 90,
        ease: 'power1.inOut',
    });

    gsap.to('.profile-illustration', {
        scrollTrigger: {
            trigger: '.profile-illustration',
            start: 'top 30%',
            end: 'top 5%',
            scrub: 1,
        },
        y: -10,
        ease: 'power1.inOut',
    });

    gsap.to('.headline2', {
        scrollTrigger: {
            trigger: '.headline2',
            start: 'bottom 40%',
            end: 'bottom bottom',
            scrub: 2,
        },
        y: 70,
    });

    // HORIZONTAL SCROLL SECTIONS
    gsap.to('.horizontal', {
        scrollTrigger: {
            trigger: '.horizontal',
            start: 'bottom 60%',
            pin: '.About',
            end: '+=2000',
            scrub: 1,
        },
        x: -1500,
        ease: 'power1.inOut',
    });

    gsap.from('.horizontal2', {
        scrollTrigger: {
            trigger: '.horizontal2',
            start: '40 center',
            end: '+=2000',
            scrub: 1,
        },
        x: -1500,
        ease: 'power1.inOut',
    });

    // EXPERIENCE PROFILE ANIMATIONS
    gsap.from(exppprfltxt.lines, {
        stagger: 0.08,
        scrollTrigger: {
            trigger: '.experience-profile-text',
            start: 'top bottom',
            end: 'top 30%',
            scrub: 1,
        },
        opacity: 0,
        y: 100,
        ease: 'power2.inOut',
    });

    gsap.from('.experience-profile-text', {
        scrollTrigger: {
            trigger: '.experience-profile-text',
            start: 'top bottom',
            end: 'top 30%',
            scrub: 1,
        },
        opacity: 0,
        borderColor: '#f8b400',
        y: 100,
        ease: 'power2.inOut',
    });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.capabilities-wrapper',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 2,
        },
    });
    tl.to(".experience-profile-pic", {
        x: 1100,
        y: 900,
        scale: 0.4,
    });

    gsap.to('.profile-cards-container', {
        scrollTrigger: {
            trigger: '.profile-cards-container',
            start: 'bottom 94%',
            end: '+=3000',
            scrub: 2,
            pin: '.profile-cards',
        },
    });

    window.addEventListener('resize', restrictProfilePicAnimation);
    window.addEventListener('DOMContentLoaded', restrictProfilePicAnimation);

    // COUNTER ANIMATIONS
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

    // PROFILE CARDS ANIMATION
    gsap.from(prfl.words, {
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.profile-cards-container',
            start: '15% bottom',
            end: '15% 30%',
            scrub: 1,
        },
        opacity: 0,
        y: 100,
        ease: 'power1.inOut',
    });

    gsap.from(capabilities.lines, {
        stagger: 0.02,
        scrollTrigger: {
            trigger: '.capabilities-wrapper',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1.5,
        },
        opacity: 0,
        y: 100,
        ease: 'power1.inOut',
    });

    // PROJECT PICTURES ANIMATIONS
    gsap.to('.left-project-pic1', {
        scrollTrigger: {
            trigger: '.left-project-pic1',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
        },
        x: 150,
        rotation: 5,
        ease: 'power1.inOut',
    });

    gsap.to('.right-project-pic1', {
        scrollTrigger: {
            trigger: '.right-project-pic1',
            start: 'top bottom',
            end: 'bottom 20%',
            scrub: 1,
        },
        x: -150,
        y: -100,
        rotation: -5,
        ease: 'power1.inOut',
    });

    gsap.to('.left-project-pic2', {
        scrollTrigger: {
            trigger: '.left-project-pic2',
            start: 'top 80%',
            end: '20% 10%',
            scrub: 1,
        },
        x: 300,
        y: 200,
        rotation: -10,
        ease: 'power1.inOut',
    });

    gsap.to('.right-project-pic2', {
        scrollTrigger: {
            trigger: '.right-project-pic2',
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1,
        },
        x: 150,
        rotation: 10,
        ease: 'power1.inOut',
    });

    gsap.to('.left-project-pic3', {
        scrollTrigger: {
            trigger: '.left-project-pic3',
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1,
        },
        x: 150,
        rotation: 10,
        ease: 'power1.inOut',
    });

    // MORE SECTION ANIMATIONS
    let moreexp = gsap.timeline({
        scrollTrigger: {
            trigger: '.More-container',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 2,
        },
    });
    moreexp.from(".More-container video", {
        scale: 0.8,
        borderRadius: 100,
        rotation: -10,
        ease: 'power1.inOut',
    });

    gsap.from(seemore.chars, {
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.More-container video',
            start: '20% 60%',
            end: 'bottom bottom',
            scrub: 1,
        },
        opacity: 0,
        y: -100,
        ease: 'power1.inOut',
    });

    gsap.from(seemore2.chars, {
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.More-container video',
            start: 'center 60%',
            end: '90% bottom',
            scrub: 1,
        },
        opacity: 0,
        y: 100,
        ease: 'power1.inOut',
    });

    gsap.from('.More-text button', {
        scrollTrigger: {
            trigger: '.More-container video',
            start: 'center 60%',
            end: '90% bottom',
            scrub: 1,
        },
        opacity: 0,
        y: 100,
        ease: 'power1.inOut',
    });

    // TESTIMONIALS ANIMATION
    const testimonial = gsap.timeline({
        scrollTrigger: {
            trigger: '.More-container',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1,
            pin: '.More-container',
        }
    });

    testimonial.from('.testimonials', {
        y: 500,
        scaleX: 0.7,
        rotation: 10,
        borderRadius: 100,
        duration: 3,
        ease: 'power1.inOut'
    });

    testimonial.from('.testimonial-card', {
        opacity: 0,
        y: 200,
        ease: 'power1.inOut',
        stagger: 0.1,
        duration: 1,
    }, '-=0.5');

    // SVG STROKE ANIMATION
    let svg = document.querySelector(".svg-container svg");
    if (svg) {
        let path = svg.querySelector("path");
        if (path) {
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
        }
    }

    // LOOPING TEXT
    const scrollingText = gsap.utils.toArray('.rail h4');

    if (scrollingText.length > 0) {
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
    }
});

// HORIZONTAL LOOP FUNCTION
function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
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
    gsap.set(items, { x: 0 });
    totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex + 1, vars);
    tl.previous = vars => toIndex(curIndex - 1, vars);
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

// RESTRICTIONS
function restrictProfilePicAnimation() {
    if (window.innerWidth <= 1100) {
        gsap.killTweensOf('.experience-profile-pic');
        gsap.set('.experience-profile-pic', { clearProps: 'all' });
    } else {
        // Run your GSAP animation as usual
        tl.to('.experience-profile-pic', {
            x: 1100,
            y: 900,
            scale: 0.4,
        });
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
