const documentHeight = document.documentElement.scrollHeight;
const windowHeight = window.innerHeight || document.documentElement.clientHeight;

function customScrollTo(targetY, duration = 500) {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t;
    }

    function scrollStep(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startY + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);
}

const sections = [
    0,
    windowHeight * 1,
    windowHeight * 2,
    windowHeight * 3,
    windowHeight * 4,
];

const duration = 700;
let lastScrollY = window.scrollY;
let scrollDirection = null;
let isSnapping = false;

// Update scroll direction
window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    scrollDirection = currentY > lastScrollY ? 'down' : currentY < lastScrollY ? 'up' : null;
    lastScrollY = currentY;
}, { passive: true });

function getNearestSection(currentY) {
    return sections.reduce((nearest, offset) =>
        Math.abs(offset - currentY) < Math.abs(nearest - currentY) ? offset : nearest
    );
}

function getNextSectionOffset(currentY, direction) {
    if (direction === 'down') {
        return sections.find(offset => offset > currentY) ?? sections[sections.length - 1];
    } else if (direction === 'up') {
        return [...sections].reverse().find(offset => offset < currentY) ?? sections[0];
    }
    return currentY;
}

const isOnMobile = window.matchMedia("(max-width: 768px)").matches;

document.onscrollend = () => {
    if (isOnMobile) return;
    if (isSnapping || !scrollDirection) return;

    const currentY = window.scrollY;
    const nearest = getNearestSection(currentY);

    if (currentY > sections[sections.length - 1]) return;

    // Snap to nearest if within 200px
    const shouldSnapToNearest = Math.abs(currentY - nearest) < 300;
    const targetY = shouldSnapToNearest
        ? nearest
        : getNextSectionOffset(currentY, scrollDirection);

    if (Math.abs(currentY - targetY) < 2) return; // Already snapped

    isSnapping = true;
    customScrollTo(targetY, duration);

    setTimeout(() => {
        isSnapping = false;
        scrollDirection = null;
    }, duration + 50);
};



const heroFg = document.getElementById("hero-fg");
const heroScroll = document.getElementById("hero-scroll");

document.onscroll = function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    if (scrollTop > sections[sections.length - 1]) {
        document.querySelector(".bg-1").style.position = "fixed";
    } else {
        document.querySelector(".bg-1").style.position = "absolute";
    }

    const singleWindowScrollPercent = Math.min(scrollTop / windowHeight * 100, 100);
    heroFg.style.transform = `translateX(-${singleWindowScrollPercent}%)`;
    if (singleWindowScrollPercent > 1) {
        heroScroll.classList.add("hidden");
    } else {
        heroScroll.style.animationDelay = `0`;
        heroScroll.classList.remove("hidden");
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const backgrounds = document.querySelectorAll(".project .bg");
    backgrounds.forEach((bg) => {
        bg.remove();
    });
});