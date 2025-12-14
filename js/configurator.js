/*!
 * Knusperhäuschen Landing Page - Configurator
 * Interactive house configuration with two flows: Onsite reservation & Delivery order
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION STATE
  // ============================================

  const state = {
    mode: null, // 'onsite' or 'delivery'
    size: 'small',
    assembly: 'diy', // 'diy' or 'prebuilt'
    style: 'classic',
    toppings: [],
    customText: '',
    price: {
      base: 25,
      extras: 0,
      total: 25
    }
  };

  // Price configuration
  const pricing = {
    size: {
      small: 25,
      medium: 40,
      large: 60
    },
    toppings: {
      snow: 5,
      lights: 8,
      figures: 6
    },
    customText: 3
  };

  // Configuration mapping to image layers
  const layerMap = {
    size: {
      small: 'assets/img/layers/size-small.png',
      medium: 'assets/img/layers/size-medium.png',
      large: 'assets/img/layers/size-large.png'
    },
    style: {
      classic: 'assets/img/layers/style-classic.png',
      modern: 'assets/img/layers/style-modern.png',
      winter: 'assets/img/layers/style-winter.png'
    },
    toppings: {
      snow: 'assets/img/layers/topping-snow.png',
      lights: 'assets/img/layers/topping-lights.png',
      figures: 'assets/img/layers/topping-figures.png'
    }
  };

  // ============================================
  // DOM ELEMENTS
  // ============================================

  const modeSelection = document.getElementById('modeSelection');
  const onsiteFlow = document.getElementById('onsiteFlow');
  const deliveryFlow = document.getElementById('deliveryFlow');
  const modeBtns = document.querySelectorAll('.konfigurator-mode-btn');
  const backFromOnsite = document.getElementById('backFromOnsite');
  const backFromDelivery = document.getElementById('backFromDelivery');

  // ============================================
  // MODE SWITCHING
  // ============================================

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      switchToMode(mode);
    });
  });

  const switchToMode = (mode) => {
    state.mode = mode;

    // Hide mode selection
    modeSelection.style.display = 'none';

    // Show appropriate flow
    if (mode === 'onsite') {
      onsiteFlow.style.display = 'block';
      deliveryFlow.style.display = 'none';
    } else if (mode === 'delivery') {
      onsiteFlow.style.display = 'none';
      deliveryFlow.style.display = 'block';
      initDeliveryFlow();
    }

    // Scroll to configurator section
    setTimeout(() => {
      const konfigurator = document.getElementById('konfigurator');
      if (konfigurator) {
        konfigurator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Back buttons
  if (backFromOnsite) {
    backFromOnsite.addEventListener('click', () => {
      returnToModeSelection();
    });
  }

  if (backFromDelivery) {
    backFromDelivery.addEventListener('click', () => {
      returnToModeSelection();
    });
  }

  const returnToModeSelection = () => {
    state.mode = null;
    modeSelection.style.display = 'block';
    onsiteFlow.style.display = 'none';
    deliveryFlow.style.display = 'none';

    // Scroll to configurator section
    setTimeout(() => {
      const konfigurator = document.getElementById('konfigurator');
      if (konfigurator) {
        konfigurator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // ============================================
  // STEP NAVIGATION
  // ============================================

  let currentStep = 1;
  const totalSteps = 5;

  const goToStep = (stepNumber) => {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    // Hide all steps
    const allSteps = deliveryFlow.querySelectorAll('.konfigurator-step');
    allSteps.forEach(step => step.classList.remove('active'));

    // Show target step
    const targetStep = deliveryFlow.querySelector(`.konfigurator-step[data-step="${stepNumber}"]`);
    if (targetStep) {
      targetStep.classList.add('active');
    }

    // Update progress indicator
    const progressSteps = deliveryFlow.querySelectorAll('.konfigurator-progress-step');
    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      if (stepNum < stepNumber) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (stepNum === stepNumber) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });

    currentStep = stepNumber;

    // Update price display
    updatePrice();

    // Scroll to top of configurator
    setTimeout(() => {
      const konfigurator = document.getElementById('konfigurator');
      if (konfigurator) {
        konfigurator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // ============================================
  // DELIVERY FLOW - CONFIGURATION & PRICING
  // ============================================

  const initDeliveryFlow = () => {
    // Size selection
    const sizeInputs = deliveryFlow.querySelectorAll('input[name="size"]');
    sizeInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        state.size = e.target.value;
        updatePrice();
        updatePreview();
      });
    });

    // Assembly selection (DIY vs Pre-built)
    const assemblyInputs = deliveryFlow.querySelectorAll('input[name="assembly"]');
    assemblyInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        state.assembly = e.target.value;
        updatePrice();
        updatePreview();
      });
    });

    // Style selection (including Schneehüsli with price)
    const styleInputs = deliveryFlow.querySelectorAll('input[name="style"]');
    styleInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        state.style = e.target.value;
        updatePrice(); // Update price for Schneehüsli
        updatePreview();
      });
    });

    // Toppings selection
    const toppingInputs = deliveryFlow.querySelectorAll('input[name="toppings"]');
    toppingInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!state.toppings.includes(e.target.value)) {
            state.toppings.push(e.target.value);
          }
        } else {
          state.toppings = state.toppings.filter(t => t !== e.target.value);
        }
        updatePrice();
        updatePreview();
      });
    });

    // Custom text
    const customTextInput = deliveryFlow.querySelector('#customText');
    if (customTextInput) {
      customTextInput.addEventListener('input', (e) => {
        state.customText = e.target.value;
        updatePrice();
      });
    }

    // Step Navigation Buttons
    // Step 1
    const nextStep1 = deliveryFlow.querySelector('#nextStep1');
    if (nextStep1) {
      nextStep1.addEventListener('click', () => goToStep(2));
    }

    // Step 2
    const prevStep2 = deliveryFlow.querySelector('#prevStep2');
    const nextStep2 = deliveryFlow.querySelector('#nextStep2');
    if (prevStep2) {
      prevStep2.addEventListener('click', () => goToStep(1));
    }
    if (nextStep2) {
      nextStep2.addEventListener('click', () => goToStep(3));
    }

    // Step 3
    const prevStep3 = deliveryFlow.querySelector('#prevStep3');
    const nextStep3 = deliveryFlow.querySelector('#nextStep3');
    if (prevStep3) {
      prevStep3.addEventListener('click', () => goToStep(2));
    }
    if (nextStep3) {
      nextStep3.addEventListener('click', () => goToStep(4));
    }

    // Step 4
    const prevStep4 = deliveryFlow.querySelector('#prevStep4');
    const nextStep4 = deliveryFlow.querySelector('#nextStep4');
    if (prevStep4) {
      prevStep4.addEventListener('click', () => goToStep(3));
    }
    if (nextStep4) {
      nextStep4.addEventListener('click', () => goToStep(5));
    }

    // Step 5
    const prevStep5 = deliveryFlow.querySelector('#prevStep5');
    const finishConfig = deliveryFlow.querySelector('#finishConfig');
    if (prevStep5) {
      prevStep5.addEventListener('click', () => goToStep(4));
    }
    if (finishConfig) {
      finishConfig.addEventListener('click', () => {
        // Open order form modal
        const orderModal = document.getElementById('orderModal');
        if (orderModal) {
          orderModal.classList.add('is-visible');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    // Initialize price
    updatePrice();

    // Initialize first step
    goToStep(1);
  };

  // ============================================
  // PRICE CALCULATION
  // ============================================

  const updatePrice = () => {
    // Calculate base price from size
    state.price.base = pricing.size[state.size] || 25;

    // Calculate extras price
    let extrasPrice = 0;

    // Add assembly price (Pre-built)
    const selectedAssembly = deliveryFlow?.querySelector('input[name="assembly"]:checked');
    if (selectedAssembly && selectedAssembly.dataset.price) {
      extrasPrice += parseInt(selectedAssembly.dataset.price);
    }

    // Add style price (Schneehüsli)
    const selectedStyle = deliveryFlow?.querySelector('input[name="style"]:checked');
    if (selectedStyle && selectedStyle.dataset.price) {
      extrasPrice += parseInt(selectedStyle.dataset.price);
    }

    // Add topping prices
    state.toppings.forEach(topping => {
      extrasPrice += pricing.toppings[topping] || 0;
    });

    // Add custom text price
    if (state.customText && state.customText.trim().length > 0) {
      extrasPrice += pricing.customText;
    }

    state.price.extras = extrasPrice;
    state.price.total = state.price.base + state.price.extras;

    // Update UI
    updatePriceDisplay();
  };

  const updatePriceDisplay = () => {
    // Update current price in steps area
    const currentPriceDisplay = document.getElementById('currentPriceDisplay');
    if (currentPriceDisplay) {
      currentPriceDisplay.textContent = `CHF ${state.price.total}.-`;
    }

    // Update price breakdown in preview area
    const priceBase = document.getElementById('priceBase');
    const priceExtras = document.getElementById('priceExtras');
    const priceExtrasRow = document.getElementById('priceExtrasRow');
    const priceTotal = document.getElementById('priceTotal');

    if (priceBase) {
      priceBase.textContent = `CHF ${state.price.base}.-`;
    }

    if (priceExtras && priceExtrasRow) {
      if (state.price.extras > 0) {
        priceExtras.textContent = `CHF ${state.price.extras}.-`;
        priceExtrasRow.style.display = 'flex';
      } else {
        priceExtrasRow.style.display = 'none';
      }
    }

    if (priceTotal) {
      priceTotal.textContent = `CHF ${state.price.total}.-`;
    }
  };

  // ============================================
  // PREVIEW UPDATE
  // ============================================

  const updatePreview = () => {
    console.log('Configuration updated:', state);

    // TODO: Update preview canvas with actual images
    // For now, this is a placeholder implementation

    // Example of how to toggle layers:
    /*
    const canvas = document.getElementById('previewCanvas');

    // Clear existing overlays
    const existingOverlays = canvas.querySelectorAll('.preview-overlay');
    existingOverlays.forEach(overlay => overlay.remove());

    // Add base house
    const baseLayer = document.createElement('img');
    baseLayer.src = 'assets/img/house-base.png';
    baseLayer.className = 'konfigurator-preview-layer';
    baseLayer.alt = 'Lebkuchenhaus Basis';
    canvas.appendChild(baseLayer);

    // Add size layer
    if (layerMap.size[state.size]) {
      const sizeLayer = document.createElement('img');
      sizeLayer.src = layerMap.size[state.size];
      sizeLayer.className = 'konfigurator-preview-layer preview-overlay';
      canvas.appendChild(sizeLayer);
    }

    // Add style layer
    if (layerMap.style[state.style]) {
      const styleLayer = document.createElement('img');
      styleLayer.src = layerMap.style[state.style];
      styleLayer.className = 'konfigurator-preview-layer preview-overlay';
      canvas.appendChild(styleLayer);
    }

    // Add topping layers
    state.toppings.forEach(topping => {
      if (layerMap.toppings[topping]) {
        const toppingLayer = document.createElement('img');
        toppingLayer.src = layerMap.toppings[topping];
        toppingLayer.className = 'konfigurator-preview-layer preview-overlay';
        canvas.appendChild(toppingLayer);
      }
    });
    */

    // Update order summary if modal is open
    if (window.updateOrderSummary) {
      window.updateOrderSummary();
    }
  };

  // ============================================
  // ONSITE FLOW - RESERVATION FORM
  // ============================================

  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('res-name').value,
        email: document.getElementById('res-email').value,
        date: document.getElementById('res-date').value,
        time: document.getElementById('res-time').value,
        persons: document.getElementById('res-persons').value,
        notes: document.getElementById('res-notes').value
      };

      console.log('Reservation submitted:', formData);

      // TODO: Send to backend
      // For now, show success message
      alert('Vielen Dank für deine Reservation! Wir senden dir eine Bestätigung per E-Mail.');

      // Reset form
      reservationForm.reset();

      // Return to mode selection
      returnToModeSelection();
    });
  }

  // ============================================
  // PUBLIC API
  // ============================================

  // Expose configuration getter for order form
  window.getConfiguration = () => {
    return { ...state };
  };

  // ============================================
  // VISUAL FEEDBACK
  // ============================================

  // Add subtle animation when options are selected
  const optionLabels = document.querySelectorAll('.konfigurator-option-label');
  optionLabels.forEach(label => {
    label.addEventListener('click', () => {
      // Small "pop" animation
      label.style.transform = 'scale(0.95)';
      setTimeout(() => {
        label.style.transform = '';
      }, 100);
    });
  });

})();
