# 🖤 Leon — Portfolio

> Persönliches Portfolio mit Dashboard-Optik.
> Reines HTML, CSS und JavaScript. Keine Frameworks, keine Build-Tools, keine Abhängigkeiten.

**Live:** https://b98leonwink15.github.io

---

## ✨ Features

| | |
|---|---|
| 🧭 **Unterseiten ohne Reload** | Home, Über mich, Projekte, Skills, Kontakt, Einstellungen — per Hash-Routing (`#/projects`), also auch direkt verlinkbar |
| 📱 **Voll responsiv** | Auf Mobile wird die Sidebar zur Schublade mit Burger-Menü, Backdrop und Fokusfalle |
| 🌙 **Dark Mode** | Folgt beim ersten Besuch der Systemeinstellung, danach der eigenen Wahl — ohne weißes Aufblitzen beim Laden |
| 🎨 **5 Akzentfarben** | Limette, Violett, Blau, Orange, Pink — umschaltbar unter Einstellungen |
| ♿ **Barrierefrei gedacht** | Sprunglink, sichtbarer Tastaturfokus, ARIA-Rollen, `prefers-reduced-motion`, geprüfte Kontraste |
| 🎬 **Animationen** | Einblenden beim Scrollen, hochzählende Zahlen, animierte Skill-Balken |
| 🏷️ **Projekt-Filter** | Karten nach Kategorie filtern |
| 🖨️ **Druck-Stylesheet** | Alle Seiten werden gedruckt, Navigation fällt weg |

---

## 📁 Dateien

```
📦 Projekt
 ┣ 📄 index.html   → Struktur, alle Seiten, Anti-Flash-Script im <head>
 ┣ 🎨 style.css    → Design Tokens, Layout, Responsive, Animationen
 ┣ ⚙️ script.js    → Router, Theme, Menü, Filter, Animationen
 ┗ 📖 README.md    → diese Datei
```

---

## ✏️ Inhalte anpassen

Alle Stellen, an denen eigene Inhalte hin müssen, sind in `index.html` markiert:

```html
<!-- PLATZHALTER: ... -->
```

Einfach im Editor nach `PLATZHALTER` suchen (`Strg + F`) — dann findest du der Reihe nach:

1. **Über-mich-Text** — die zwei Absätze auf der Seite „Über mich"
2. **Projekte** — drei Beispielkarten. Nicht gebrauchte Karten einfach löschen, das Raster passt sich an.
3. **Skills** — die Prozentwerte stehen in `data-level="65"` *und* im Text daneben. Beide ändern.
4. **Kontakt** — bei Instagram, Discord und LinkedIn das `href="#"` ersetzen (und `aria-disabled` sowie `contact-card--todo` entfernen), sonst die Karte löschen.
5. **Zahlen auf der Startseite** — stehen in `data-count="4"`.

---

## ⌨️ Tastaturkürzel

| Taste | Funktion |
|---|---|
| `Shift` + `D` | Dark Mode umschalten |
| `Shift` + `B` | Sidebar ein-/ausklappen |
| `Esc` | Mobiles Menü schließen |
| `Tab` | Navigation — der Sprunglink oben kommt zuerst |

---

## 🎨 Design

| | |
|---|---|
| Farbschema | Dunkle Sidebar, heller Content-Bereich |
| Akzent (Standard) | `#c8ff00` — Electric Lime |
| Schriften | DM Sans (Text), Space Grotesk (Überschriften) |
| Radien | 8 – 28 px, je nach Bausteingröße |
| Übergänge | 160 / 280 / 500 ms, `cubic-bezier(.4, 0, .2, 1)` |
| Speicherung | Theme, Farbe, Sidebar & Animationen via `localStorage` |

Farben und Maße stecken alle als CSS-Variablen ganz oben in `style.css`. Wer das
komplette Farbschema ändern will, muss nur dort ran — nicht durch die ganze Datei.

---

## 🚀 Lokal starten

```bash
git clone https://github.com/b98leonwink15/b98leonwink15.github.io.git
cd b98leonwink15.github.io
```

Dann `index.html` im Browser öffnen. Fertig — es muss nichts gebaut oder installiert werden.

> 💡 Tipp: In VS Code die Erweiterung **Live Server** installieren, dann lädt der
> Browser bei jeder Änderung automatisch neu.

---

## 📌 Roadmap

- [x] Mobiles Menü
- [x] Echte Unterseiten
- [x] Seitenübergänge animieren
- [x] Akzentfarbe wählbar
- [ ] Eigene Projekte eintragen
- [ ] Eigenes Foto statt Buchstaben-Avatar
- [ ] Kontaktformular (braucht einen Dienst wie Formspree, GitHub Pages kann kein PHP)
- [ ] Blog- oder Notizen-Bereich

---

## 🧑‍💻 Autor

**Leon** — [@b98leonwink15](https://github.com/b98leonwink15)

---

<p align="center">Made with 🖤 and vanilla JS</p>
