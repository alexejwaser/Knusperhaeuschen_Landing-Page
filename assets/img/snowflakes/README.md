# Schneeflocken für Story-Section

## Aktueller Status
Derzeit werden die Schneeflocken als **weiße Kreise** (CSS `border-radius: 50%`) dargestellt.

## Schneeflocken-Bilder hinzufügen

Um die Kreise durch echte Schneeflocken-Bilder zu ersetzen:

### 1. Bilder vorbereiten
- Format: **WebP** (optimal für Web-Performance)
- Hintergrund: **Transparent**
- Größe: Ca. **32x32px** bis **64x64px**
- Dateinamen: `snowflake-1.webp`, `snowflake-2.webp`, etc.
- Empfohlen: 3-5 verschiedene Schneeflocken-Designs für Variation

### 2. Bilder in diesen Ordner hochladen
Pfad: `assets/img/snowflakes/`

### 3. CSS anpassen

In `css/sections.css` die `.snowflake` Klasse ändern:

**Vorher (aktuelle Kreise):**
```css
.snowflake {
  position: absolute;
  top: -10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
  animation: snowfall linear infinite;
  will-change: transform, opacity;
}
```

**Nachher (mit Bildern):**
```css
.snowflake {
  position: absolute;
  top: -10px;
  /* background-color und border-radius entfernen */
  pointer-events: none;
  animation: snowfall linear infinite;
  will-change: transform, opacity;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
```

### 4. JavaScript anpassen

In `js/snow.js` die `createSnowflake()` Funktion erweitern:

**Zeile ~40-50 ersetzen durch:**
```javascript
// Schneeflocke erstellen
function createSnowflake() {
  const flake = document.createElement('div');
  flake.className = 'snowflake';

  // Zufälliges Schneeflocken-Bild auswählen
  const snowflakeImages = [
    'assets/img/snowflakes/snowflake-1.webp',
    'assets/img/snowflakes/snowflake-2.webp',
    'assets/img/snowflakes/snowflake-3.webp',
    'assets/img/snowflakes/snowflake-4.webp',
    'assets/img/snowflakes/snowflake-5.webp',
  ];
  const randomImage = snowflakeImages[Math.floor(Math.random() * snowflakeImages.length)];
  flake.style.backgroundImage = `url('${randomImage}')`;

  // Zufällige Größe
  const size = random(config.minSize, config.maxSize);
  flake.style.width = `${size}px`;
  flake.style.height = `${size}px`;

  // ... Rest bleibt gleich
}
```

### 5. Konfiguration anpassen

Optional: Größen-Range für Bilder anpassen in `js/snow.js`:

```javascript
const config = {
  flakeCount: 30,
  minSize: 16, // Größer für sichtbare Details
  maxSize: 32, // Anpassen je nach Bildgröße
  // ... Rest bleibt gleich
};
```

## Beispiel-Bilder

Kostenlose Schneeflocken-Ressourcen:
- [Flaticon Snowflakes](https://www.flaticon.com/search?word=snowflake)
- [FreePik Snowflakes](https://www.freepik.com/search?format=search&query=snowflake)
- Eigene Designs in Figma/Illustrator erstellen

## Performance-Tipps

- Bilder optimieren mit Tools wie [Squoosh](https://squoosh.app/)
- Nicht mehr als 5 verschiedene Bilder verwenden
- Dateigröße pro Bild: < 5KB
- Bei schlechter Performance: `flakeCount` in `js/snow.js` reduzieren
