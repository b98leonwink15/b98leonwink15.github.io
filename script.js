/* ==========================================================================
   Leon — Portfolio
   Vanilla JS, keine Abhängigkeiten.

   Inhalt:
     1. Hilfsfunktionen & Speicher
     2. Theme (Dark Mode)
     3. Akzentfarbe
     4. Bewegung reduzieren
     5. Sidebar ein-/ausklappen
     6. Mobile Schublade
     7. Router (Unterseiten über #/pfad)
     8. Scroll-Animationen & Zähler
     9. Skill-Balken
    10. Projekt-Filter
    11. Tastaturkürzel
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;

  /* ======================================================================
     1. HILFSFUNKTIONEN
     ====================================================================== */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* localStorage kann blockiert sein (Privatmodus) — deshalb gekapselt */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* addEventListener auf MediaQueryList kennen ältere Safari-Versionen nicht */
  function onMedia(query, handler) {
    var mq = window.matchMedia(query);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else if (mq.addListener) mq.addListener(handler);
    return mq;
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function motionOff() {
    return root.getAttribute("data-motion") === "reduced" ||
           (prefersReducedMotion && root.getAttribute("data-motion") !== "full");
  }

  /* SVG-Icons für den Theme-Button */
  var ICON = {
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
  };


  /* ======================================================================
     2. THEME
     ====================================================================== */
  var themeBtn    = $("#themeBtn");
  var themeIcon   = $("#themeIcon");
  var themeLabel  = $("#themeLabel");
  var themeSwitch = $("#themeSwitch");

  function isDark() { return root.classList.contains("dark"); }

  function paintTheme() {
    var dark = isDark();
    if (themeIcon)  themeIcon.innerHTML = dark ? ICON.sun : ICON.moon;
    if (themeLabel) themeLabel.textContent = dark ? "Light Mode" : "Dark Mode";
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(dark));
      themeBtn.setAttribute("data-label", dark ? "Light Mode" : "Dark Mode");
    }
    if (themeSwitch) themeSwitch.setAttribute("aria-checked", String(dark));

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#08080a" : "#0f0f0f");
  }

  function setTheme(dark) {
    root.classList.toggle("dark", dark);
    store.set("darkMode", String(dark));
    paintTheme();
  }

  if (themeBtn)    themeBtn.addEventListener("click", function () { setTheme(!isDark()); });
  if (themeSwitch) themeSwitch.addEventListener("click", function () { setTheme(!isDark()); });

  /* Systemwechsel übernehmen, solange der Nutzer nichts eigenes gewählt hat.
     Der Erst-Anwendung passiert schon im <head>, damit nichts aufblitzt. */
  onMedia("(prefers-color-scheme: dark)", function (e) {
    if (store.get("darkMode") === null) {
      root.classList.toggle("dark", e.matches);
      paintTheme();
    }
  });

  paintTheme();


  /* ======================================================================
     3. AKZENTFARBE
     ====================================================================== */
  var swatches = $$(".swatch");

  function setAccent(name) {
    if (name && name !== "lime") {
      root.setAttribute("data-accent", name);
      store.set("accent", name);
    } else {
      root.removeAttribute("data-accent");
      store.del("accent");
      name = "lime";
    }
    swatches.forEach(function (s) {
      s.setAttribute("aria-checked", String(s.dataset.accent === name));
    });
  }

  swatches.forEach(function (s) {
    s.addEventListener("click", function () { setAccent(s.dataset.accent); });
  });

  setAccent(store.get("accent") || "lime");


  /* ======================================================================
     4. BEWEGUNG REDUZIEREN
     ====================================================================== */
  var motionSwitch = $("#motionSwitch");

  function setMotion(reduced) {
    root.setAttribute("data-motion", reduced ? "reduced" : "full");
    store.set("reduceMotion", String(reduced));
    if (motionSwitch) motionSwitch.setAttribute("aria-checked", String(reduced));
  }

  if (motionSwitch) {
    motionSwitch.addEventListener("click", function () {
      setMotion(motionSwitch.getAttribute("aria-checked") !== "true");
    });
  }

  var savedMotion = store.get("reduceMotion");
  if (savedMotion !== null) {
    setMotion(savedMotion === "true");
  } else if (prefersReducedMotion && motionSwitch) {
    motionSwitch.setAttribute("aria-checked", "true");
  }


  /* ======================================================================
     5. SIDEBAR EIN-/AUSKLAPPEN (Desktop)
     ====================================================================== */
  var collapseBtn   = $("#collapseBtn");
  var collapseLabel = $("#collapseLabel");

  function paintCollapse() {
    var open = root.classList.contains("nav-expanded");
    if (collapseLabel) collapseLabel.textContent = open ? "Einklappen" : "Ausklappen";
    if (collapseBtn) {
      collapseBtn.setAttribute("aria-expanded", String(open));
      collapseBtn.setAttribute("data-label", open ? "Einklappen" : "Ausklappen");
    }
  }

  if (collapseBtn) {
    collapseBtn.addEventListener("click", function () {
      var open = root.classList.toggle("nav-expanded");
      store.set("sidebarExpanded", String(open));
      paintCollapse();
    });
  }

  paintCollapse();


  /* ======================================================================
     6. MOBILE SCHUBLADE
     ====================================================================== */
  var burger   = $("#burger");
  var backdrop = $("#backdrop");
  var sidebar  = $("#sidebar");

  function openMenu() {
    body.classList.add("menu-open", "no-scroll");
    if (backdrop) {
      backdrop.hidden = false;
      requestAnimationFrame(function () { backdrop.classList.add("show"); });
    }
    if (burger) {
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Menü schließen");
    }
    var first = $(".nav-item", sidebar);
    if (first) first.focus();
  }

  function closeMenu() {
    if (!body.classList.contains("menu-open")) return;
    body.classList.remove("menu-open", "no-scroll");
    if (backdrop) {
      backdrop.classList.remove("show");
      window.setTimeout(function () { backdrop.hidden = true; }, motionOff() ? 0 : 280);
    }
    if (burger) {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Menü öffnen");
      burger.focus();
    }
  }

  if (burger) {
    burger.addEventListener("click", function () {
      body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
  }

  if (backdrop) backdrop.addEventListener("click", closeMenu);

  /* Fokus bleibt in der offenen Schublade (Fokusfalle) */
  document.addEventListener("keydown", function (e) {
    if (!body.classList.contains("menu-open")) return;

    if (e.key === "Escape") { closeMenu(); return; }
    if (e.key !== "Tab") return;

    var focusable = $$('a[href], button:not([disabled])', sidebar);
    if (!focusable.length) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* Beim Wechsel auf Desktop-Breite aufräumen */
  onMedia("(min-width: 861px)", function (e) { if (e.matches) closeMenu(); });


  /* ======================================================================
     7. ROUTER — Unterseiten ohne Neuladen
     ====================================================================== */
  var PAGES = {
    home:     { title: "Home",          sub: "Willkommen auf meiner Seite 👋" },
    about:    { title: "Über mich",     sub: "Wer ich bin und was ich mache" },
    projects: { title: "Projekte",      sub: "Woran ich bisher gearbeitet habe" },
    skills:   { title: "Skills",        sub: "Was ich kann — und was noch kommt" },
    contact:  { title: "Kontakt",       sub: "So erreichst du mich" },
    settings: { title: "Einstellungen", sub: "Aussehen der Seite anpassen" }
  };

  var DEFAULT_PAGE = "home";
  var pageTitle = $("#pageTitle");
  var pageSub   = $("#pageSub");
  var navItems  = $$(".nav-item");
  var sections  = $$(".page");

  function currentRoute() {
    var hash = (location.hash || "").replace(/^#\/?/, "");
    return PAGES[hash] ? hash : DEFAULT_PAGE;
  }

  function showPage(name, isInitial) {
    var target = PAGES[name] ? name : DEFAULT_PAGE;

    sections.forEach(function (sec) {
      var match = sec.dataset.page === target;
      sec.hidden = !match;
      sec.classList.toggle("is-entering", match && !isInitial && !motionOff());
    });

    navItems.forEach(function (item) {
      var active = item.dataset.page === target;
      item.classList.toggle("active", active);
      if (active) { item.setAttribute("aria-current", "page"); }
      else { item.removeAttribute("aria-current"); }
    });

    if (pageTitle) pageTitle.textContent = PAGES[target].title;
    if (pageSub)   pageSub.textContent   = PAGES[target].sub;
    document.title = "Leon — " + PAGES[target].title;

    if (!isInitial) {
      window.scrollTo({ top: 0, behavior: motionOff() ? "auto" : "smooth" });
    }

    closeMenu();
    revealIn(document.getElementById("page-" + target));
    runSkillBars();
  }

  window.addEventListener("hashchange", function () { showPage(currentRoute(), false); });


  /* ======================================================================
     8. SCROLL-ANIMATIONEN & ZÄHLER
     ====================================================================== */
  var observer = null;

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
        countUp(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  }

  function revealIn(scope) {
    if (!scope) return;
    var items = $$(".reveal", scope);

    if (!observer || motionOff()) {
      items.forEach(function (el) { el.classList.add("is-visible"); countUp(el); });
      return;
    }

    items.forEach(function (el, i) {
      if (el.classList.contains("is-visible")) { countUp(el); return; }
      el.style.transitionDelay = Math.min(i * 55, 300) + "ms";
      observer.observe(el);
    });
  }

  /* Zahlen von 0 hochzählen */
  function countUp(scope) {
    $$("[data-count]", scope).forEach(function (el) {
      if (el.dataset.counted === "1") return;
      el.dataset.counted = "1";

      var target = parseInt(el.dataset.count, 10) || 0;

      if (motionOff()) { el.textContent = String(target); return; }

      var start = performance.now();
      var dur = 900;

      (function step(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      })(start);
    });
  }


  /* ======================================================================
     9. SKILL-BALKEN
     ====================================================================== */
  function runSkillBars() {
    $$(".skill").forEach(function (skill) {
      var fill = $(".skill-fill", skill);
      if (!fill) return;

      var level = Math.max(0, Math.min(100, parseInt(skill.dataset.level, 10) || 0));

      /* Nur füllen, wenn die Seite gerade sichtbar ist */
      var page = skill.closest(".page");
      if (page && page.hidden) { fill.style.width = "0%"; return; }

      /* kurzer Versatz, damit die Transition greift */
      window.setTimeout(function () { fill.style.width = level + "%"; }, motionOff() ? 0 : 120);

      var bar = $(".skill-bar", skill);
      if (bar && !bar.hasAttribute("role")) {
        bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-valuenow", String(level));
        bar.setAttribute("aria-valuemin", "0");
        bar.setAttribute("aria-valuemax", "100");
        var name = $(".skill-head span", skill);
        if (name) bar.setAttribute("aria-label", name.textContent.trim());
      }
    });
  }


  /* ======================================================================
     10. PROJEKT-FILTER
     ====================================================================== */
  var filters    = $("#projectFilters");
  var projects   = $$(".project");
  var emptyState = $("#emptyState");

  if (filters) {
    filters.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;

      var filter = chip.dataset.filter;
      $$(".chip", filters).forEach(function (c) { c.classList.toggle("is-active", c === chip); });

      var visible = 0;
      projects.forEach(function (p) {
        var cats = (p.dataset.cat || "").split(/\s+/);
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        p.hidden = !show;
        if (show) visible++;
      });

      if (emptyState) emptyState.hidden = visible !== 0;
    });
  }


  /* ======================================================================
     11. TASTATURKÜRZEL
     ====================================================================== */
  document.addEventListener("keydown", function (e) {
    /* nicht auslösen, während getippt wird */
    var t = e.target;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

    /* Shift + D  →  Theme wechseln */
    if (e.shiftKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      setTheme(!isDark());
      return;
    }

    /* Shift + B  →  Sidebar ein-/ausklappen */
    if (e.shiftKey && e.key.toLowerCase() === "b" && collapseBtn) {
      e.preventDefault();
      collapseBtn.click();
    }
  });


  /* ======================================================================
     ZURÜCKSETZEN
     ====================================================================== */
  var resetBtn = $("#resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      ["darkMode", "accent", "sidebarExpanded", "reduceMotion"].forEach(store.del);
      root.classList.remove("dark", "nav-expanded");
      root.removeAttribute("data-accent");
      root.removeAttribute("data-motion");
      setAccent("lime");
      if (motionSwitch) motionSwitch.setAttribute("aria-checked", "false");
      paintTheme();
      paintCollapse();
      resetBtn.textContent = "Zurückgesetzt ✓";
      window.setTimeout(function () { resetBtn.textContent = "Zurücksetzen"; }, 1800);
    });
  }


  /* ======================================================================
     START
     ====================================================================== */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  showPage(currentRoute(), true);
})();
