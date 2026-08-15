(function () {
  "use strict";

  var THEMES = ["green", "orange", "blue", "purple", "red"];
  var CYCLE_MS = 60000;
  var FAVICON_SELECTOR = 'link[rel="icon"]';
  var THEME_COLORS = {
    green: { phosphor: "#68e878", dim: "#183820", ink: "#d8efe0" },
    orange: { phosphor: "#d88030", dim: "#803018", ink: "#f3e4d4" },
    blue: { phosphor: "#4d82ff", dim: "#101830", ink: "#d4def5" },
    purple: { phosphor: "#7850f0", dim: "#301850", ink: "#e6dcf5" },
    red: { phosphor: "#d83030", dim: "#601018", ink: "#f5dcdc" },
  };

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  var ambientPaused = reducedMotion;
  var cycleTimer = null;
  var typingStarted = false;

  function assetRoot() {
    var root = document.documentElement.getAttribute("data-asset-root") || "";
    if (root && root.charAt(root.length - 1) !== "/") root += "/";
    return root;
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "green";
  }

  function nextTheme(from) {
    var i = THEMES.indexOf(from);
    if (i < 0) i = 0;
    return THEMES[(i + 1) % THEMES.length];
  }

  function brandSrc(kind, theme) {
    return assetRoot() + "assets/brand/jamesware-" + kind + "-" + theme + ".png";
  }

  function preloadBrands() {
    var kinds = {};
    document.querySelectorAll("[data-logo]").forEach(function (el) {
      kinds[el.getAttribute("data-logo") || "square"] = true;
    });
    THEMES.forEach(function (theme) {
      Object.keys(kinds).forEach(function (kind) {
        var img = new Image();
        img.src = brandSrc(kind, theme);
      });
    });
  }

  function paintLogos(theme, immediate) {
    document.querySelectorAll("[data-logo]").forEach(function (el) {
      var kind = el.getAttribute("data-logo") || "square";
      var nextSrc = brandSrc(kind, theme);
      var a = el.querySelector(".logo-swap__a");
      var b = el.querySelector(".logo-swap__b");
      if (!a || !b) return;

      if (!a.getAttribute("src")) {
        a.src = nextSrc;
        b.src = nextSrc;
        el.classList.remove("is-b");
        return;
      }

      var showingB = el.classList.contains("is-b");
      var visible = showingB ? b : a;
      var hidden = showingB ? a : b;

      if (visible.getAttribute("src") === nextSrc) return;

      function reveal() {
        if (immediate) {
          visible.src = nextSrc;
          hidden.src = nextSrc;
          return;
        }
        el.classList.toggle("is-b", !showingB);
      }

      hidden.onload = function () {
        hidden.onload = null;
        reveal();
      };
      hidden.src = nextSrc;
      if (hidden.complete) {
        hidden.onload = null;
        reveal();
      }
    });
  }

  function paintFavicon(theme) {
    var colors = THEME_COLORS[theme] || THEME_COLORS.green;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect x="3" y="3" width="58" height="58" rx="15" fill="' +
      colors.dim +
      '" stroke="' +
      colors.ink +
      '" stroke-width="3"/>' +
      '<path d="M16 17h10v24c0 7-4 11-11 11-2 0-4-.4-5-1v-8c1 .5 2 .8 4 .8 2.4 0 3-1.6 3-4.1V17Z" fill="' +
      colors.phosphor +
      '"/>' +
      '<path d="m28 26 7 17 6-12 6 12 7-17v24H44l-3-7-3 7h-8Z" fill="' +
      colors.ink +
      '"/>' +
      "</svg>";
    var href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    var link = document.querySelector(FAVICON_SELECTOR);
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.href = href;
  }

  function paintDots(theme) {
    document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
      var on = btn.getAttribute("data-theme-pick") === theme;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function applyTheme(theme, options) {
    options = options || {};
    if (THEMES.indexOf(theme) < 0) theme = "green";
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("jamesware-theme", theme);
    } catch (e) {}
    paintLogos(theme, !!options.immediate);
    paintDots(theme);
    requestAnimationFrame(function () {
      paintFavicon(theme);
    });
    if (options.pauseAmbient) {
      ambientPaused = true;
      stopCycle();
    }
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  function startCycle() {
    stopCycle();
    if (ambientPaused) return;
    cycleTimer = setInterval(function () {
      applyTheme(nextTheme(currentTheme()));
    }, CYCLE_MS);
  }

  /* ---------- terminal typing ---------- */

  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  async function typeText(el, text, speed) {
    var i;
    var fromHero = !!(el && (el.id === "hero-term" || (el.closest && el.closest("#hero-term"))));
    for (i = 0; i < text.length; i += 1) {
      el.appendChild(document.createTextNode(text.charAt(i)));
      if (fromHero) pressKeyForChar(text.charAt(i));
      await sleep(speed);
    }
  }

  function pressKeyForChar(ch) {
    if (reducedMotion) return;
    var keys = document.querySelectorAll(".keys__row span");
    if (!keys.length) return;
    var target = null;
    if (ch === " ") {
      target = document.querySelector(".keys__row--space span:nth-child(2)");
    }
    if (!target) {
      target = keys[Math.floor(Math.random() * keys.length)];
    }
    target.classList.add("is-down");
    setTimeout(function () {
      target.classList.remove("is-down");
    }, 90);
  }

  function cursorNode() {
    var span = document.createElement("span");
    span.className = "term-cursor";
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  function lastLoginStamp() {
    var d = new Date();
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return (
      days[d.getDay()] +
      " " +
      months[d.getMonth()] +
      " " +
      pad(d.getDate()) +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds())
    );
  }

  function lineSpan(el, cls) {
    var span = document.createElement("span");
    span.className = "term-line term-line--" + cls;
    el.appendChild(span);
    return span;
  }

  async function playTerm(el, script) {
    el.textContent = "";
    if (reducedMotion) {
      script.forEach(function (step, i) {
        if (i) el.appendChild(document.createTextNode("\n"));
        lineSpan(el, step.cls).textContent = step.text;
      });
      el.appendChild(cursorNode());
      return;
    }
    var i;
    for (i = 0; i < script.length; i += 1) {
      var step = script[i];
      if (i) el.appendChild(document.createTextNode("\n"));
      var span = lineSpan(el, step.cls);
      if (step.cls === "cmd") {
        await typeText(span, step.text, 28);
        await sleep(200);
      } else {
        span.textContent = step.text;
        await sleep(280);
      }
    }
    el.appendChild(cursorNode());
  }

  async function runHeroTerm() {
    var el = document.getElementById("hero-term");
    if (!el) return;
    var session = [
      { cls: "cmd", text: "jamesware@dev:~$ whoami" },
      { cls: "out", text: "JamesWare" },
      { cls: "cmd", text: "jamesware@dev:~$ mission" },
      { cls: "out", text: "Building useful things with care." },
      { cls: "cmd", text: "jamesware@dev:~$ status" },
      { cls: "out", text: "Currently making software." },
      { cls: "cmd", text: "jamesware@dev:~$ " },
    ];
    el.textContent = "";
    if (reducedMotion) {
      await playTerm(el, session);
      return;
    }
    await typeText(lineSpan(el, "muted"), "JW-BIOS 2.4 ... 64K RAM OK", 6);
    await sleep(260);
    el.appendChild(document.createTextNode("\n"));
    await typeText(lineSpan(el, "muted"), "LOADING JAMESWARE.SYS ...", 6);
    await sleep(420);
    await playTerm(el, session);
  }

  async function runCareTerm() {
    var el = document.getElementById("care-term");
    if (!el) return;
    await playTerm(el, [
      { cls: "muted", text: "Last login: " + lastLoginStamp() + " on ttys001" },
      { cls: "cmd", text: "$ whoami" },
      { cls: "out", text: "JamesWare" },
      { cls: "cmd", text: "$ mission" },
      { cls: "out", text: "Building useful things with care." },
      { cls: "cmd", text: "$ status" },
      { cls: "out", text: "Currently making software." },
      { cls: "cmd", text: "$ " },
    ]);
  }

  function startTyping() {
    if (typingStarted) return;
    typingStarted = true;
    runHeroTerm();
    var care = document.getElementById("care-term");
    if (!care) return;
    if (reducedMotion) {
      runCareTerm();
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            io.disconnect();
            runCareTerm();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(care);
  }

  function bindSwitcher() {
    document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(btn.getAttribute("data-theme-pick"), { pauseAmbient: true });
      });
    });
  }

  function bindProductShots() {
    document.querySelectorAll(".device__photo").forEach(function (img) {
      function show() {
        img.hidden = false;
        if (img.parentElement) img.parentElement.classList.add("has-photo");
      }
      img.addEventListener("load", show);
      img.addEventListener("error", function () {
        img.hidden = true;
      });
      if (img.complete && img.naturalWidth) show();
    });
  }

  function ready() {
    document.documentElement.classList.add("theme-ready");
    preloadBrands();
    applyTheme(currentTheme(), { immediate: true });
    bindSwitcher();
    bindProductShots();
    startCycle();
    startTyping();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
