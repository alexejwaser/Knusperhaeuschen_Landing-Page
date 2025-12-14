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

    // Initialize price
    updatePrice();
  };

  // ============================================
  // PRICE CALCULATION
  // ============================================

  const updatePrice = () => {
    // Calculate base price from size
    state.price.base = pricing.size[state.size] || 25;

    // Calculate extras price
    let extrasPrice = 0;

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
