/*!
 * Knusperhäuschen - Schnee Partikel System
 * Dezenter Schneefall-Effekt für die Story-Section
 */

(function () {
  'use strict';

  // Prüfen ob reduced motion aktiv ist
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    return; // Keine Animation wenn reduced motion aktiviert ist
  }

  const snowContainer = document.getElementById('storySnow');
  if (!snowContainer) return;

  // Schneeflocken-Bilder Array
  const snowflakeImages = [
    'assets/img/snowflakes/schneeflocke01.webp',
    'assets/img/snowflakes/schneeflocke02.webp',
    'assets/img/snowflakes/schneeflocke03.webp',
    'assets/img/snowflakes/schneeflocke04.webp',
    'assets/img/snowflakes/schneeflocke05.webp',
    'assets/img/snowflakes/schneeflocke06.webp',
    'assets/img/snowflakes/schneeflocke07.webp',
    'assets/img/snowflakes/schneeflocke08.webp',
    'assets/img/snowflakes/schneeflocke09.webp',
    'assets/img/snowflakes/schneeflocke10.webp',
    'assets/img/snowflakes/schneeflocke11.webp',
  ];

  // Dynamische Berechnung der Containerhöhe
  function getContainerHeight() {
    return snowContainer.offsetHeight;
  }

  // Berechne Falldauer basierend auf Containerhöhe
  // Formel: Höhe (px) / Geschwindigkeit (px/s) = Dauer (s)
  function calculateDuration(containerHeight) {
    const fallSpeedMin = 25; // px pro Sekunde (langsam)
    const fallSpeedMax = 40; // px pro Sekunde (schneller)

    // Zufällige Geschwindigkeit wählen
    const speed = random(fallSpeedMin, fallSpeedMax);

    // Berechne Dauer: Strecke / Geschwindigkeit + Extra-Zeit für Fade
    // +100px für Start oberhalb und Ende unterhalb
    const duration = (containerHeight + 100) / speed;

    return duration;
  }

  // Konfiguration
  const config = {
    flakeCount: 60, // Anzahl der Schneeflocken
    minSize: 16, // Minimale Größe in px
    maxSize: 32, // Maximale Größe in px
    minDrift: -50, // Minimale horizontale Drift in px
    maxDrift: 50, // Maximale Drift in px
  };

  // Hilfsfunktion: Zufallswert zwischen min und max
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Schneeflocke erstellen
  function createSnowflake() {
    const flake = document.createElement('div');
    flake.className = 'snowflake';

    // Zufälliges Schneeflocken-Bild auswählen
    const randomImage =
      snowflakeImages[Math.floor(Math.random() * snowflakeImages.length)];
    flake.style.backgroundImage = `url('${randomImage}')`;

    // Zufällige Größe
    const size = random(config.minSize, config.maxSize);
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;

    // Zufällige horizontale Position
    flake.style.left = `${random(0, 100)}%`;

    // Dynamische Animationsdauer basierend auf Containerhöhe
    const containerHeight = getContainerHeight();
    const duration = calculateDuration(containerHeight);
    flake.style.animationDuration = `${duration}s`;

    // Setze die Falldistanz als CSS Custom Property
    const fallDistance = containerHeight + 100; // Container-Höhe + 100px Extra
    flake.style.setProperty('--fall-distance', `${fallDistance}px`);

    // Zufällige Verzögerung für gestaffelten Start
    const maxDelay = duration * 1.5; // Verzögerung über 1.5x der Dauer verteilt
    const delay = random(0, maxDelay);
    flake.style.animationDelay = `-${delay}s`;

    // Zufällige horizontale Drift
    const drift = random(config.minDrift, config.maxDrift);
    flake.style.setProperty('--horizontal-drift', `${drift}px`);

    // Leichte Variation in der Opazität für mehr Tiefe
    const opacity = random(0.5, 0.85);
    flake.style.setProperty('opacity', opacity.toString());

    return flake;
  }

  // Alle Schneeflocken generieren
  function initSnow() {
    // Fragment für bessere Performance
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < config.flakeCount; i++) {
      fragment.appendChild(createSnowflake());
    }

    snowContainer.appendChild(fragment);
  }

  // Initialisierung
  initSnow();

  // Bei Resize neu initialisieren für korrekte Höhe
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Container leeren und neu befüllen
      snowContainer.innerHTML = '';
      initSnow();
    }, 250); // Debounce: warte 250ms nach letztem Resize
  });
})();
