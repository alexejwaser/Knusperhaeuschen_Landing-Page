/*!
 * Knusperhäuschen Landing Page - Intro Animation
 * Loading screen with skip functionality
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Get elements
  const intro = document.getElementById('intro');
  const introSkip = document.getElementById('introSkip');
  const introVideo = document.getElementById('introVideo');

  if (!intro) return;

  // Auto-hide intro after 3 seconds or immediately if reduced motion
  const autoHideDuration = prefersReducedMotion ? 100 : 3000;

  const hideIntro = () => {
    intro.classList.add('is-hidden');

    // Remove from DOM after transition
    setTimeout(() => {
      intro.style.display = 'none';
      // Allow page scrolling
      document.body.style.overflow = '';
    }, 800);
  };

  // Prevent scrolling during intro
  if (!prefersReducedMotion) {
    document.body.style.overflow = 'hidden';
  }

  // Auto-hide timeout
  let autoHideTimeout = setTimeout(hideIntro, autoHideDuration);

  // Listen for video end event
  if (introVideo) {
    introVideo.addEventListener('ended', () => {
      clearTimeout(autoHideTimeout);
      hideIntro();
    });
  }

  // Skip button click handler
  if (introSkip) {
    introSkip.addEventListener('click', () => {
      clearTimeout(autoHideTimeout);
      hideIntro();
    });
  }

  // Skip on any key press
  document.addEventListener('keydown', (e) => {
    if (intro.classList.contains('is-hidden')) return;

    clearTimeout(autoHideTimeout);
    hideIntro();
  }, { once: true });

})();
