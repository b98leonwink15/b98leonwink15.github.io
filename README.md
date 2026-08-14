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
| 🐙 **Projekte direkt von GitHub** | Die Projektseite lädt alle öffentlichen Repos über die GitHub-API — neue Projekte erscheinen von selbst |
| 🏷️ **Automatische Filter** | Die Filterleiste entsteht aus den tatsächlich gefundenen Programmiersprachen |
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

## 🐙 Projekte kommen von GitHub

Die Projektseite pflegt sich selbst. Beim Laden holt sie alle öffentlichen Repos
von `api.github.com` und baut daraus die Karten — mit Sprache, Sternen, Themen
und Datum der letzten Änderung. **Ein neues Repo auf GitHub taucht automatisch auf.**

Damit das gut aussieht, lohnt es sich, auf GitHub bei jedem Repo unter
*About → Description* einen Satz einzutragen. Alternativ geht es lokal: ganz oben
in `script.js` steht ein Abschnitt `REPO_INFO`, der die GitHub-Beschreibung überschreibt.

```js
var REPO_INFO = {
  "carryMobs": {
    titel: "Carry Mobs",                    // optional: anderer Anzeigename
    beschreibung: "Minecraft-Plugin, ...",  // Text auf der Karte
    demo: "https://...",                    // optional: Link zur Live-Version
    hervorheben: true                       // optional: steht dann ganz vorne
  }
};
```

Weitere Schalter direkt darüber:

| Einstellung | Bedeutung |
|---|---|
| `GITHUB_USER` | Von welchem Konto geladen wird |
| `REPO_AUSBLENDEN` | Liste von Repo-Namen, die nicht erscheinen sollen |
| `FORKS_ZEIGEN` | Ob geforkte Repos mitgezählt werden (Standard: nein) |
| `CACHE_MINUTEN` | Wie lange die Antwort zwischengespeichert wird (Standard: 30) |

**Wenn GitHub mal nicht antwortet**, bleiben die fest eingebauten Karten aus
`index.html` stehen und ein Hinweis erscheint. Die Seite ist also nie leer.

> GitHub erlaubt 60 Anfragen pro Stunde und Besucher-IP. Durch den Zwischenspeicher
> kommt eine normale Portfolio-Seite da nie in die Nähe.

---

## ✏️ Restliche Inhalte anpassen

Alle Stellen, an denen noch eigene Inhalte hin müssen, sind in `index.html` markiert:

```html
<!-- PLATZHALTER: ... -->
```

Einfach im Editor nach `PLATZHALTER` suchen (`Strg + F`) — dann findest du der Reihe nach:

1. **Über-mich-Text** — die zwei Absätze auf der Seite „Über mich"
2. **Skills** — die Prozentwerte stehen in `data-level="65"` *und* im Text daneben. Beide ändern.
3. **Kontakt** — bei Instagram, Discord und LinkedIn das `href="#"` ersetzen (und `aria-disabled` sowie `contact-card--todo` entfernen), sonst die Karte löschen.
4. **Zahlen auf der Startseite** — stehen in `data-count="4"`. Die Projekt-Zahl wird automatisch von GitHub überschrieben.

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
- [x] Projekte automatisch von GitHub laden
- [ ] Beschreibungen für `carryMobs` und `Ticket.py` eintragen
- [ ] Eigenes Foto statt Buchstaben-Avatar
- [ ] Kontaktformular (braucht einen Dienst wie Formspree, GitHub Pages kann kein PHP)
- [ ] Blog- oder Notizen-Bereich

---

## 🧑‍💻 Autor

**Leon** — [@b98leonwink15](https://github.com/b98leonwink15)

---

<p align="center">Made with 🖤 and vanilla JS</p>
