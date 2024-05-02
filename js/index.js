// Importing utility function for preloading images
import { preloadImages, preloadVideo } from './utils.js';

// Variable to store the Lenis smooth scrolling object
let lenis;

// Selecting content elements that contain SVG
const contentWithSVG = Array.from(document.querySelectorAll('.content')).filter(element => {
    return element.querySelector(':scope svg') !== null;
});

// Selecting all clipPath elements on the document
const clipElements = [...document.querySelectorAll('clipPath')];

// Initializes Lenis for smooth scrolling with specific properties
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.2, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};

// Define functions for custom effects
const applyCustomEffect_1 = (contentElement) => {
    
    // Select relevant elements for the effect
    const clipPath = contentElement.querySelectorAll('svg clipPath');
    const poster = contentElement.querySelectorAll('.poster');
    const posterInner = contentElement.querySelectorAll('.poster__inner');

    // Animation logic for each clipPath element
    [...clipPath].forEach((clipPathEl, pos) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: poster[pos], // Triggers based on poster element
                start: 'top bottom', // Start animation when poster is at top of viewport
                end: 'bottom top', // End animation when poster is at bottom of viewport
                scrub: true, // Allows smooth scrubbing effect
            }
        })
        .fromTo(clipPathEl, {
            xPercent: pos === 0 ? 40 : -80 // Initial xPercent value based on position
        }, {
            ease: 'none',
            xPercent: pos === 0 ? -40 : 20 // Target xPercent value based on position
        }, 0)
        .fromTo(posterInner[pos], {
            xPercent: pos === 0 ? -5 : 5, // Initial xPercent value based on position
            yPercent: pos === 0 ? -5 : 5 // Initial yPercent value based on position
        }, {
            xPercent: pos === 0 ? 5 : -5, // Target xPercent value based on position
            yPercent: pos === 0 ? 5 : -5 // Target yPercent value based on position
        }, 0);
    });

};

const applyCustomEffect_2 = (contentElement) => {
    
    const clipPath = contentElement.querySelectorAll('svg clipPath');
    const poster = contentElement.querySelectorAll('.poster');
    const posterInner = contentElement.querySelectorAll('.poster__inner');

    [...clipPath].forEach((clipPathEl, pos) => {

        const texts = clipPathEl.querySelectorAll('text');

        gsap.timeline({
            scrollTrigger: {
                trigger: poster[pos],
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })
        .fromTo(clipPathEl, {
            xPercent: pos === 0 ? 0 : -100 
        }, {
            ease: 'none',
            xPercent: pos === 0 ? -100 : 0
        }, 0)
        .fromTo(poster[pos], {
            filter: 'brightness(200%)',
            skewX: pos === 0 ? -5 : 5
        }, {
            ease: 'sine',
            filter: 'brightness(15%)',
            skewX: pos === 0 ? 5 : -5
        }, 0)
        .fromTo(posterInner[pos], {
            scale: 2.7
        }, {
            scale: 1
        }, 0)
        .fromTo(texts, {
            transformOrigin: pos ? '50% 100%' : '50% 0%',
            scaleX: 0.8,
            scaleY: 0
        }, {
            duration: 0.2,
            stagger: pos ? -0.01 : 0.01,
            scaleX: 1,
            scaleY: 1
        }, 0);

    });

};



const applyCustomEffect_9 = (contentElement) => {
    
    const clipPath = contentElement.querySelectorAll('svg clipPath');
    const poster = contentElement.querySelectorAll('.poster');
    const posterInner = contentElement.querySelectorAll('.poster__inner');
    const texts = clipPath[0].querySelectorAll('text');

    gsap.timeline({
        defaults: {
            ease: 'none'
        },
        scrollTrigger: {
            trigger: poster[0],
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    })
    .fromTo(clipPath, {
        xPercent: 400,
    }, {
        xPercent: 200
    }, 0)
    .fromTo(poster, {
        filter: 'brightness(140%) hue-rotate(300deg)',
        rotation: -7
    }, {
        filter: 'brightness(10%) hue-rotate(0deg)',
        rotation: 7
    }, 0)
    .fromTo(posterInner, {
        scale: 0.8
    }, {
        scale: 1
    }, 0)
    .fromTo(texts, {
        transformOrigin: '0% 0%',
        scaleX: 1,
    }, {
        ease: 'none',
        scale: () => gsap.utils.random(0, 0.5),
        yPercent: () => gsap.utils.random(-20, 40),
        rotation: () => gsap.utils.random(-15, 15)
    }, 0);

};

// Update the scroll function to call the respective applyCustomEffect_N functions
const scroll = () => {
    contentWithSVG.forEach((contentElement, position) => {
        switch (position) {
            case 0:
                applyCustomEffect_1(contentElement);
                break;
            case 1:
                applyCustomEffect_2(contentElement);
                break;
            case 2:
                applyCustomEffect_3(contentElement);
                break;
            case 8:
                applyCustomEffect_9(contentElement);
                break;
            default:
                // Handle other positions if needed
                break;
        }
    });
};

// Initialization function
const init = () => {
    initSmoothScrolling(); // Initialize Lenis for smooth scrolling
    scroll(); // Apply scroll-triggered animations to items
};

// Preloading all images specified by the selector
Promise.all([preloadImages('.poster__inner'), preloadVideo('img/dragon.mp4')]).then(() => {
    // Once images are preloaded, remove the 'loading' indicator/class from the body
    document.body.classList.remove('loading');
    init();
});