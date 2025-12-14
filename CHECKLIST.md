# Knusperhäuschen - Launch Checklist ✓

## ✅ Bereits implementiert

- [x] Vollständige HTML-Struktur mit 9 Sections
- [x] Design System (CI-Farben, Typografie, Komponenten)
- [x] Responsive CSS (Mobile, Tablet, Desktop)
- [x] Loading Screen mit Animation
- [x] Sticky Navigation mit Smooth Scroll
- [x] Scroll Reveal Animationen
- [x] Interaktiver Konfigurator (State Management)
- [x] Formular-Validierung (Gewinnspiel & Bestellung)
- [x] Modal-Funktionalität
- [x] Accessibility Features (ARIA, Skip Links, Reduced Motion)
- [x] README & Dokumentation

## 📝 Noch zu erledigen

### 1. Assets hinzufügen

#### Bilder (Priorität: HOCH)
- [ ] Logo/Wortmarke in Navigation einfügen
- [ ] Basis-Lebkuchenhaus für Konfigurator (`assets/img/house-base.png`)
- [ ] Konfigurator Overlay-PNGs (9 Stück, siehe `assets/img/README.md`)
- [ ] Team-Fotos (4 Stück: Anna, Thomas, Sophie, Lukas)
- [ ] Community/Social-Grid Bilder (4-8 Stück)
- [ ] Favicon anpassen (optional, aktuell Platzhalter vorhanden)

#### Videos (Priorität: MITTEL)
- [ ] Hero-Video (`assets/video/hero.mp4` + `.webm`)
- [ ] Erklärvideo für Angebot-Section
- [ ] Optional: Intro-Animation (wenn CSS-Version nicht ausreicht)

#### Papiertexturen (Priorität: NIEDRIG)
- [ ] Aus Vorgaben-Ordner verwenden
- [ ] Als Hintergrund-Layer in CSS einbinden (optional)

### 2. Inhalte finalisieren

#### Texte (Priorität: HOCH)
- [ ] Alle Platzhaltertexte durchgehen und anpassen
- [ ] Öffnungszeiten verifizieren
- [ ] Kontaktdaten eintragen (E-Mail, Telefon)
- [ ] Team-Namen und Rollen prüfen
- [ ] Instagram-Handle anpassen (@knusperhaueschen_luzern)

#### Links (Priorität: HOCH)
- [ ] Social Media Links im Footer aktualisieren
- [ ] Impressum & Datenschutz-Seiten erstellen/verlinken
- [ ] Google Maps Koordinaten korrigieren (Zeile 408 in index.html)
- [ ] Teilnahmebedingungen für Gewinnspiel verlinken

### 3. Backend-Integration

#### Formulare (Priorität: HOCH)
- [ ] Backend-Endpoint für Gewinnspiel erstellen
- [ ] Backend-Endpoint für Bestellformular erstellen
- [ ] AJAX-Requests in `js/main.js` implementieren (Zeilen 182 & 265)
- [ ] E-Mail-Versand konfigurieren
- [ ] Datenbank-Integration (optional)

#### Optional
- [ ] CAPTCHA/reCAPTCHA gegen Spam
- [ ] Analytics (Google Analytics, Matomo, etc.)
- [ ] Cookie-Banner (falls Tracking verwendet wird)

### 4. Testing

#### Funktionalität (Priorität: HOCH)
- [ ] Alle Links testen
- [ ] Formular-Validierung in allen Browsern testen
- [ ] Konfigurator durchklicken
- [ ] Mobile Navigation testen
- [ ] Modal öffnen/schließen testen

#### Cross-Browser (Priorität: MITTEL)
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (Desktop + Mobile)
- [ ] Ältere Browser (IE11 falls nötig)

#### Responsive (Priorität: HOCH)
- [ ] iPhone SE (360px)
- [ ] iPhone 12/13 (390px)
- [ ] iPad (768px)
- [ ] Desktop (1440px)
- [ ] Ultrawide (1920px+)

#### Performance (Priorität: MITTEL)
- [ ] Bilder komprimieren (WebP-Format nutzen)
- [ ] Videos optimieren (< 5MB)
- [ ] Lighthouse-Audit durchführen
- [ ] Lazy Loading für Bilder (optional)

#### Accessibility (Priorität: MITTEL)
- [ ] Screen Reader testen (NVDA/VoiceOver)
- [ ] Keyboard-Navigation durchgehen
- [ ] Kontraste prüfen (WCAG-Tools)
- [ ] WAVE-Audit durchführen

### 5. Deployment

#### Vor dem Upload (Priorität: HOCH)
- [ ] Alle TODO-Kommentare im Code durchgehen
- [ ] Console.logs entfernen (oder kommentieren)
- [ ] Versionsnummer/Datum aktualisieren
- [ ] robots.txt erstellen (falls SEO wichtig)
- [ ] sitemap.xml erstellen (optional)

#### FTP-Upload (Priorität: HOCH)
- [ ] Dateien auf Server hochladen
- [ ] Ordnerstruktur prüfen
- [ ] index.html im Root-Verzeichnis
- [ ] Dateiberechtigungen setzen (644 für Dateien, 755 für Ordner)

#### Nach dem Launch (Priorität: MITTEL)
- [ ] Live-URL in allen Browsern testen
- [ ] SSL-Zertifikat prüfen (HTTPS)
- [ ] 404-Seite erstellen
- [ ] Formular-Submissions testen
- [ ] Google Search Console einrichten (optional)

### 6. Optional / Nice-to-Have

- [ ] SEO-Optimierung (Meta-Tags, Open Graph, Schema.org)
- [ ] Preloading für kritische Assets
- [ ] Service Worker für Offline-Support
- [ ] Progressive Web App (PWA) Features
- [ ] A/B-Testing Setup
- [ ] Newsletter-Integration
- [ ] Live-Chat Widget
- [ ] Instagram Feed Integration (API)

## 🎯 Quick Wins (Sofort umsetzbar)

1. **Logo einfügen:** Wortmarke aus Vorgaben in Navigation
2. **Team-Fotos:** 4 Bilder hochladen und in HTML einbinden
3. **Google Maps:** Korrekte Koordinaten eingeben
4. **Kontaktdaten:** E-Mail & Telefon aktualisieren
5. **Social Links:** Instagram, Facebook URLs einfügen

## 📞 Support

Bei Problemen oder Fragen:
1. Überprüfe die TODO-Kommentare im Code
2. Lies das README.md
3. Konsultiere die asset-spezifischen READMEs in `assets/img/` und `assets/video/`

---

**Stand:** 14.12.2024
**Version:** 1.0
**Status:** Bereit für Asset-Integration & Testing
