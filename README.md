# Knusperhäuschen Landing Page

Märchenhafte One-Page-Landingpage für Knusperhäuschen - handgemachte Lebkuchenhäuser aus Luzern.

## 🎯 Projektübersicht

Eine interaktive, märchenhafte Landingpage für "Knusperhäuschen", die das Weihnachtserlebnis am Marktstand in Luzern präsentiert. Die Seite bietet einen interaktiven Konfigurator, Gewinnspiel-Integration und ein warmherziges Design mit Papiertexturen und handgemachtem Look.

## 📁 Projektstruktur

```
Knusperhaeuschen_Landing-Page/
├── index.html              # Haupt-HTML-Datei
├── favicon.png             # Favicon
├── css/
│   ├── base.css           # CSS-Variablen, Reset, Typografie
│   ├── components.css     # Wiederverwendbare Komponenten
│   └── sections.css       # Section-spezifische Styles
├── js/
│   ├── main.js           # Navigation, Formulare, Scroll-Reveals
│   ├── intro.js          # Loading Screen Animation
│   └── configurator.js   # Interaktiver Häuschen-Konfigurator
├── assets/
│   ├── fonts/            # Summer Font Bold
│   ├── img/              # Bilder und Illustrationen
│   └── video/            # Videos und Animationen
└── Knusperhaeuschen Vorgaben/
    ├── Keyvisuals/
    ├── Papiertexturen/
    └── Summer Font Bold.otf
```

## 🎨 Design System

### Farben (CSS-Variablen)

```css
--c-bg: #181B1C;           /* Haupt-Hintergrund */
--c-text-on-dark: #DADADA; /* Fließtext auf dunklem Grund */
--c-accent: #EED070;       /* Akzente, CTAs, Highlights */
--c-soft: #FFFEFA;         /* Headlines, heller Text */
--c-hover: #C5A347;        /* Hover-States */
```

### Typografie

- **Headlines (H1-H3):** Summer Bold
- **Body Text & Navigation:** Poppins Regular
- **Buttons/CTAs:** Poppins Semibold

### Features

- **Paper Texture Look:** Noise-Overlays und dezente Texturen
- **Micro-Animations:** Scroll-Reveals, Hover-Glows, Parallax
- **Handmade Feel:** Leichte Rotationen, imperfekte Kanten
- **Reduced Motion Support:** Respektiert prefers-reduced-motion

## 📄 Sections

Die Landingpage besteht aus folgenden Abschnitten:

0. **Loading Screen** - Intro-Animation mit Skip-Button
1. **Hero** - Hauptbereich mit Video/Animation und CTAs
2. **Angebot** - 3 Erlebnisvarianten als Cards
3. **Story / Über uns** - USPs und Team-Vorstellung
4. **Konfigurator** - Interaktiver Häuschen-Designer
5. **Standort** - Markthalle Luzern mit Google Maps
6. **Community** - Social Grid und Instagram-Integration
7. **Gewinnspiel** - Teilnahmeformular mit Validierung
8. **Footer** - Kontakt, Links, Social Media

## ⚙️ Funktionen

### Navigation
- Sticky Navigation mit transparentem → solidem Übergang
- Smooth Scroll zu Sections
- Active State basierend auf Scroll-Position
- Mobile-optimiert mit Hamburger-Menü

### Konfigurator
- Live-Auswahl von Größe, Deko-Style und Extras
- Preview-System (vorbereitet für PNG-Overlays)
- State Management mit JavaScript
- Modal für Bestellformular

### Formulare
- **Gewinnspiel:** Vollständige Validierung (Name, Alter, Personen, E-Mail, Schätzfrage)
- **Bestellformular:** E-Mail-Validierung, Success-States
- Inline-Fehlermeldungen
- Clear Success-UX

### Animationen
- **Scroll Reveals:** IntersectionObserver für fade-in Effekte
- **Parallax:** Subtile Bewegung auf Hero-Section
- **Hover-States:** Glow-Effekte auf Buttons, Card-Transforms
- **Loading Screen:** Haus-Animation mit Skip-Funktion

## 🚀 Installation & Deployment

### Lokale Entwicklung

1. Repository klonen
2. Dateien in einem lokalen Webserver öffnen (z.B. Live Server in VS Code)
3. `index.html` im Browser öffnen

### FTP-Upload (Linux-Schulserver)

1. Alle Dateien (außer `Knusperhaeuschen Vorgaben/` und `.git/`) hochladen
2. Ordnerstruktur beibehalten
3. `index.html` muss im Root-Verzeichnis liegen

### Wichtige Hinweise

- **Keine Backend-Abhängigkeiten:** Reines Frontend-Projekt
- **Formulare:** Derzeit nur Frontend-Validierung. Backend-Integration über `TODO`-Kommentare markiert
- **Assets:** Platzhalter für Videos und einige Bilder vorhanden (siehe TODOs)

## 🔧 Anpassungen & TODOs

### Assets hinzufügen

**Hero Video:**
```html
<!-- Aktuell auskommentiert in index.html, Zeile 84-86 -->
<video class="hero-video" autoplay muted loop playsinline>
  <source src="assets/video/hero.mp4" type="video/mp4">
</video>
```

**Erklärvideo:**
```html
<!-- Platzhalter in index.html, Zeile 173-176 -->
<!-- Ersetze das Placeholder-Div durch ein <video> oder <iframe> Element -->
```

**Konfigurator Preview-Bilder:**
1. Füge Basis-Häuschen-Bild hinzu: `assets/img/house-base.png`
2. Erstelle Overlay-PNGs für verschiedene Optionen
3. Aktualisiere `layerMap` in `js/configurator.js`
4. Kommentiere die TODO-Sektion in `updatePreview()` aus (Zeile 96-136)

**Team-Fotos:**
```html
<!-- Aktuell Gradient-Platzhalter in index.html, Zeilen 224-254 -->
<!-- Ersetze style-Attribut durch: -->
<img src="assets/img/team/anna.jpg" alt="Anna" class="story-team-photo">
```

**Community Grid:**
```html
<!-- Aktuell Emoji-Platzhalter in index.html, Zeilen 433-444 -->
<!-- Ersetze durch echte Instagram-Bilder oder Social-Feed-Integration -->
```

### Backend-Integration

**Formulare:**

Die Formulare haben derzeit Platzhalter-Actions. Für echte Submissions:

1. Gewinnspiel-Formular (`gewinnspielForm`):
   - Zeile 182 in `js/main.js`
   - Implementiere AJAX-Request zu Backend-Endpoint

2. Bestellformular (`orderForm`):
   - Zeile 265 in `js/main.js`
   - Implementiere AJAX-Request zu Backend-Endpoint

Beispiel-Integration:
```javascript
// Statt console.log():
fetch('/api/gewinnspiel', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, age, persons, email, guess, terms })
})
.then(response => response.json())
.then(data => {
  // Show success
})
.catch(error => {
  // Show error
});
```

### Konfigurator erweitern

1. **Neue Optionen hinzufügen:**
   - Füge HTML in `index.html` (Section Konfigurator) hinzu
   - Erweitere `state` in `js/configurator.js`
   - Füge Event-Listener hinzu

2. **Preview-System aktivieren:**
   - Kommentiere Zeilen 96-136 in `js/configurator.js` aus
   - Stelle sicher, dass `layerMap` korrekte Bild-Pfade enthält

## 📱 Responsiveness

Die Seite ist fully responsive mit Breakpoints:

- **Mobile:** 360px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

Wichtige responsive Features:
- Grid-Layouts passen sich automatisch an
- Navigation wird zu Hamburger-Menü auf Mobile
- Konfigurator wechselt von Two-Column zu Single-Column
- Touch-optimierte Buttons und Interaktionen

## ♿ Accessibility

- Semantisches HTML (section, nav, main, footer, article)
- ARIA-Labels und -Attributes
- Skip-Link zum Hauptinhalt
- Fokus-States auf allen interaktiven Elementen
- Prefers-Reduced-Motion Support
- Kontrastverhältnisse WCAG-konform

## 🎨 Customization Guide

### Farben ändern

Passe die CSS-Variablen in `css/base.css` (Zeilen 11-16) an:

```css
:root {
  --c-bg: #181B1C;           /* Deine Hintergrundfarbe */
  --c-accent: #EED070;       /* Deine Akzentfarbe */
  /* ... */
}
```

### Fonts austauschen

1. Ersetze `assets/fonts/Summer Font Bold.otf`
2. Aktualisiere `@font-face` in `css/base.css` (Zeilen 52-57)
3. Passe `--font-heading` Variable an

### Texturen anpassen

Paper-Texturen werden via SVG generiert. Anpassung in:
- `css/base.css` Zeile 80 (Body-Hintergrund)
- `css/components.css` Zeile 97 (Card-Hintergrund)

## 🐛 Bekannte Limitationen

- **Kein Backend:** Formulare speichern Daten nur clientseitig (Console-Log)
- **Placeholder-Assets:** Videos, einige Bilder und Team-Fotos fehlen noch
- **Konfigurator-Preview:** Funktioniert erst mit echten Overlay-Bildern
- **Google Maps:** Verwendet generische Koordinaten (muss angepasst werden)

## 📄 Lizenz

Alle Rechte vorbehalten © 2024 Knusperhäuschen Luzern

## 👥 Credits

- **Design & Entwicklung:** Claude Code
- **Fonts:** Summer Bold, Poppins (Google Fonts)
- **Icons:** Emoji (system)
- **Framework:** Vanilla HTML/CSS/JS

---

**Viel Erfolg mit deiner märchenhaften Landingpage! 🏠✨**

Bei Fragen oder Problemen: Überprüfe die TODO-Kommentare im Code oder kontaktiere den Entwickler.
