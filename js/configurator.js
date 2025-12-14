/*!
 * Knusperhäuschen Landing Page - Configurator
 * Interactive house configuration with live preview
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION STATE
  // ============================================

  const state = {
    size: 'small',
    style: 'classic',
    toppings: [],
    customText: ''
  };

  // Configuration mapping to image layers
  // TODO: Replace with actual image paths once assets are available
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
  // EVENT LISTENERS
  // ============================================

  // Size selection
  const sizeInputs = document.querySelectorAll('input[name="size"]');
  sizeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      state.size = e.target.value;
      updatePreview();
    });
  });

  // Style selection
  const styleInputs = document.querySelectorAll('input[name="style"]');
  styleInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      state.style = e.target.value;
      updatePreview();
    });
  });

  // Toppings selection
  const toppingInputs = document.querySelectorAll('input[name="toppings"]');
  toppingInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!state.toppings.includes(e.target.value)) {
          state.toppings.push(e.target.value);
        }
      } else {
        state.toppings = state.toppings.filter(t => t !== e.target.value);
      }
      updatePreview();
    });
  });

  // Custom text
  const customTextInput = document.getElementById('customText');
  if (customTextInput) {
    customTextInput.addEventListener('input', (e) => {
      state.customText = e.target.value;
      // No visual preview for text yet, but stored in state
    });
  }

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
  // PUBLIC API
  // ============================================

  // Expose configuration getter for order form
  window.getConfiguration = () => {
    return { ...state };
  };

  // Initial preview
  updatePreview();

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
