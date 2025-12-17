/*!
 * Knusperhäuschen Landing Page - Main JavaScript
 * Navigation, Scroll Reveals, Form Validation
 */

(function() {
  'use strict';

  // ============================================
  // NAVIGATION
  // ============================================

  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu-link');

  // Sticky Navigation on Scroll
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    lastScrollY = window.scrollY;
  });

  // Mobile Menu Toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('is-active');
      navToggle.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', isActive);
      navToggle.setAttribute('aria-label', isActive ? 'Navigation schließen' : 'Navigation öffnen');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-active');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Navigation öffnen');
      document.body.style.overflow = '';
    });
  });

  // Smooth Scroll with offset for sticky nav
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navHeight = nav.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active Navigation State based on scroll position
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.scrollY + nav.offsetHeight + 50;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('is-active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Initial call

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: unobserve after reveal
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ============================================
  // FORM VALIDATION UTILITIES
  // ============================================

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const showError = (inputId, message) => {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`error-${inputId}`);

    if (input && errorElement) {
      input.classList.add('error');
      errorElement.textContent = message;
    }
  };

  const clearError = (inputId) => {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`error-${inputId}`);

    if (input && errorElement) {
      input.classList.remove('error');
      errorElement.textContent = '';
    }
  };

  const clearAllErrors = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
    inputs.forEach(input => {
      clearError(input.id);
    });
  };

  // ============================================
  // GEWINNSPIEL FORM
  // ============================================

  const gewinnspielForm = document.getElementById('gewinnspielForm');
  const contestSuccess = document.getElementById('contestSuccess');

  if (gewinnspielForm) {
    gewinnspielForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous errors
      clearAllErrors('gewinnspielForm');

      let isValid = true;

      // Name validation
      const name = document.getElementById('contest-name').value.trim();
      if (!name) {
        showError('contest-name', 'Bitte gib deinen Namen ein.');
        isValid = false;
      }

      // Age validation
      const age = parseInt(document.getElementById('contest-age').value);
      if (!age || age < 1 || age > 120) {
        showError('contest-age', 'Bitte gib ein gültiges Alter ein.');
        isValid = false;
      }

      // Persons validation
      const persons = parseInt(document.getElementById('contest-persons').value);
      if (!persons || persons < 1 || persons > 4) {
        showError('contest-persons', 'Bitte wähle zwischen 1 und 4 Personen.');
        isValid = false;
      }

      // Email validation
      const email = document.getElementById('contest-email').value.trim();
      if (!email) {
        showError('contest-email', 'Bitte gib deine E-Mail-Adresse ein.');
        isValid = false;
      } else if (!validateEmail(email)) {
        showError('contest-email', 'Bitte gib eine gültige E-Mail-Adresse ein.');
        isValid = false;
      }

      // Guess validation
      const guess = parseInt(document.getElementById('contest-guess').value);
      if (!guess || guess < 1) {
        showError('contest-guess', 'Bitte gib deine Schätzung ein.');
        isValid = false;
      }

      // Terms validation
      const terms = document.getElementById('contest-terms').checked;
      if (!terms) {
        showError('contest-terms', 'Bitte akzeptiere die Teilnahmebedingungen.');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // TODO: Submit form data to backend
      console.log('Gewinnspiel submission:', {
        name,
        age,
        persons,
        email,
        phone: document.getElementById('contest-phone').value,
        guess,
        terms
      });

      // Show success message
      gewinnspielForm.style.display = 'none';
      contestSuccess.style.display = 'block';

      // Scroll to success message
      contestSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Real-time validation
    const contestInputs = gewinnspielForm.querySelectorAll('.form-input');
    contestInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value.trim()) {
          clearError(input.id);
        }
      });
    });
  }

  // ============================================
  // ORDER MODAL
  // ============================================

  const orderModal = document.getElementById('orderModal');
  const openOrderFormBtn = document.getElementById('openOrderForm');
  const closeOrderModalBtn = document.getElementById('closeOrderModal');
  const orderForm = document.getElementById('orderForm');
  const orderSuccess = document.getElementById('orderSuccess');

  if (openOrderFormBtn) {
    openOrderFormBtn.addEventListener('click', () => {
      orderModal.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      // Update order summary with configuration
      updateOrderSummary();
    });
  }

  if (closeOrderModalBtn) {
    closeOrderModalBtn.addEventListener('click', () => {
      orderModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    });
  }

  // Close modal on overlay click
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', () => {
      orderModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal && orderModal.classList.contains('is-visible')) {
      orderModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  });

  // Order form submission
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous errors
      clearAllErrors('orderForm');

      let isValid = true;

      // Email validation
      const email = document.getElementById('order-email').value.trim();
      if (!email) {
        showError('order-email', 'Bitte gib deine E-Mail-Adresse ein.');
        isValid = false;
      } else if (!validateEmail(email)) {
        showError('order-email', 'Bitte gib eine gültige E-Mail-Adresse ein.');
        isValid = false;
      }

      // First name validation
      const firstname = document.getElementById('order-firstname').value.trim();
      if (!firstname) {
        showError('order-firstname', 'Bitte gib deinen Vornamen ein.');
        isValid = false;
      }

      // Last name validation
      const lastname = document.getElementById('order-lastname').value.trim();
      if (!lastname) {
        showError('order-lastname', 'Bitte gib deinen Nachnamen ein.');
        isValid = false;
      }

      // Address validation
      const address = document.getElementById('order-address').value.trim();
      if (!address) {
        showError('order-address', 'Bitte gib deine Adresse ein.');
        isValid = false;
      }

      // ZIP validation
      const zip = document.getElementById('order-zip').value.trim();
      if (!zip) {
        showError('order-zip', 'Bitte gib deine PLZ ein.');
        isValid = false;
      }

      // City validation
      const city = document.getElementById('order-city').value.trim();
      if (!city) {
        showError('order-city', 'Bitte gib deinen Ort ein.');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // TODO: Submit order to backend
      console.log('Order submission:', {
        email,
        firstname,
        lastname,
        address,
        zip,
        city,
        phone: document.getElementById('order-phone').value,
        message: document.getElementById('order-message').value,
        configuration: window.getConfiguration ? window.getConfiguration() : null
      });

      // Show success message
      orderForm.style.display = 'none';
      orderSuccess.style.display = 'block';

      // Reset and close after 3 seconds
      setTimeout(() => {
        orderModal.classList.remove('is-active');
        document.body.style.overflow = '';
        orderForm.style.display = 'block';
        orderSuccess.style.display = 'none';
        orderForm.reset();
      }, 3000);
    });
  }

  // Update order summary function (called from configurator.js)
  window.updateOrderSummary = () => {
    const orderSummary = document.getElementById('orderSummary');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if (!orderSummary || !window.getConfiguration) return;

    const config = window.getConfiguration();

    const sizeLabels = {
      'small': 'Klein',
      'medium': 'Mittel',
      'large': 'Groß'
    };

    const assemblyLabels = {
      'diy': 'DIY-Box (Selbst aufbauen)',
      'prebuilt': 'Fertig aufgebaut'
    };

    const styleLabels = {
      'classic': 'Klassisch',
      'modern': 'Modern',
      'winter': 'Schneehüsli ❄️'
    };

    const toppingLabels = {
      'snow': 'Schnee',
      'lights': 'LED-Lichter',
      'figures': 'Figuren'
    };

    // Build product details HTML
    let detailsHTML = `
      <div class="checkout-product-item">
        <div class="checkout-product-info">
          <div class="checkout-product-name">Lebkuchenhaus - ${sizeLabels[config.size]}</div>
          <div class="checkout-product-details">
            ${assemblyLabels[config.assembly]}<br>
            Style: ${styleLabels[config.style]}
          </div>
        </div>
        <div class="checkout-product-price">CHF ${config.price.base}.-</div>
      </div>
    `;

    // Add toppings if any
    if (config.toppings && config.toppings.length > 0) {
      config.toppings.forEach(topping => {
        const prices = { snow: 5, lights: 8, figures: 6 };
        detailsHTML += `
          <div class="checkout-product-item">
            <div class="checkout-product-info">
              <div class="checkout-product-name">${toppingLabels[topping]}</div>
            </div>
            <div class="checkout-product-price">CHF ${prices[topping]}.-</div>
          </div>
        `;
      });
    }

    // Add custom text if present
    if (config.customText && config.customText.trim()) {
      detailsHTML += `
        <div class="checkout-product-item">
          <div class="checkout-product-info">
            <div class="checkout-product-name">Personalisierung</div>
            <div class="checkout-product-details">"${config.customText}"</div>
          </div>
          <div class="checkout-product-price">CHF 3.-</div>
        </div>
      `;
    }

    orderSummary.innerHTML = detailsHTML;

    // Update totals
    const shipping = 8.50;
    const subtotal = config.price.total;
    const total = subtotal + shipping;

    if (checkoutSubtotal) checkoutSubtotal.textContent = `CHF ${subtotal.toFixed(2)}`;
    if (checkoutShipping) checkoutShipping.textContent = `CHF ${shipping.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `CHF ${total.toFixed(2)}`;
  };

  // ============================================
  // PARALLAX EFFECT (subtle)
  // ============================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;

      // Subtle parallax on hero
      const heroOverlay = document.querySelector('.hero-overlay');
      if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // ============================================
  // LEGAL POPUPS
  // ============================================

  const legalLinks = document.querySelectorAll('.legal-link');
  const legalPopups = document.querySelectorAll('.legal-popup');

  // Open popup
  legalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const popupId = link.getAttribute('data-popup');
      const popup = document.getElementById(popupId);

      if (popup) {
        popup.classList.add('is-active');
        document.body.classList.add('popup-open');
      }
    });
  });

  // Close popup functionality
  const closePopup = (popup) => {
    popup.classList.remove('is-active');
    document.body.classList.remove('popup-open');
  };

  // Close buttons
  legalPopups.forEach(popup => {
    const closeBtn = popup.querySelector('.legal-popup-close');
    const overlay = popup.querySelector('.legal-popup-overlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closePopup(popup);
      });
    }

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', () => {
        closePopup(popup);
      });
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      legalPopups.forEach(popup => {
        if (popup.classList.contains('is-active')) {
          closePopup(popup);
        }
      });
    }
  });

})();
