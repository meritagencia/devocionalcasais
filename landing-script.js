const countdownNodes = document.querySelectorAll("[data-countdown], .timer");
let secondsLeft = 12 * 60; // 12 minutes countdown

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateCountdown() {
  countdownNodes.forEach((node) => {
    node.textContent = formatTime(secondsLeft);
  });

  secondsLeft = secondsLeft > 0 ? secondsLeft - 1 : 12 * 60;
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll(".faq details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll(".faq details").forEach((otherDetail) => {
      if (otherDetail !== detail) {
        otherDetail.removeAttribute("open");
      }
    });
  });
});

const tickerTrack = document.querySelector(".ticker__track");
if (tickerTrack) {
  // Duplicate ticker for infinite loop
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

// Infinite Carousel for Book Gallery
function initInfiniteBookGallery() {
  const containers = document.querySelectorAll('.book-gallery-container');
  containers.forEach((container) => {
    const gallery = container.querySelector('.book-gallery');
    if (!gallery || container.dataset.initialized === "true") return;
    container.dataset.initialized = "true";

    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    // Duplicate images to create an infinite loop
    const originalChildren = Array.from(gallery.children);
    if (originalChildren.length === 0) return;

    originalChildren.forEach((child) => {
      gallery.appendChild(child.cloneNode(true));
    });

    let isPaused = false;
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let resumeTimeout = null;
    const speed = 0.8; // pixels per frame

    function step() {
      if (!isPaused && !isDown) {
        gallery.scrollLeft += speed;
        const halfWidth = gallery.scrollWidth / 2;
        if (gallery.scrollLeft >= halfWidth) {
          gallery.scrollLeft -= halfWidth;
        } else if (gallery.scrollLeft <= 0) {
          gallery.scrollLeft += halfWidth;
        }
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // Pause on hover
    gallery.addEventListener('mouseenter', () => { isPaused = true; });
    gallery.addEventListener('mouseleave', () => {
      isPaused = false;
      isDown = false;
    });

    // Touch support (Mobile)
    gallery.addEventListener('touchstart', () => {
      isPaused = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
    }, { passive: true });

    gallery.addEventListener('touchend', () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isPaused = false;
      }, 1500);
    }, { passive: true });

    // Touch/scroll wrap check
    gallery.addEventListener('scroll', () => {
      const halfWidth = gallery.scrollWidth / 2;
      if (gallery.scrollLeft >= halfWidth) {
        gallery.scrollLeft -= halfWidth;
      } else if (gallery.scrollLeft <= 0) {
        gallery.scrollLeft += halfWidth;
      }
    }, { passive: true });

    // Mouse drag support (Desktop)
    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      isPaused = true;
      startX = e.pageX - gallery.offsetLeft;
      startScrollLeft = gallery.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          isPaused = false;
        }, 1200);
      }
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = startScrollLeft - walk;
    });

    // Navigation buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', initInfiniteBookGallery);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initInfiniteBookGallery();
}
