(function () {
  "use strict";

  var THEMES = ["green", "orange", "blue", "purple", "red"];
  var FAVICON_SELECTOR = 'link[rel="icon"]';
  var THEME_COLORS = {
    green: { phosphor: "#72f05d", dim: "#224b26", ink: "#f0edd7" },
    orange: { phosphor: "#ffad54", dim: "#5d3218", ink: "#f6eadb" },
    blue: { phosphor: "#6d9cff", dim: "#1a2b52", ink: "#e2e8f5" },
    purple: { phosphor: "#a77aff", dim: "#37215d", ink: "#eee5f8" },
    red: { phosphor: "#f05d62", dim: "#541f26", ink: "#f5e2df" },
  };

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  var typingStarted = false;

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "green";
  }

  function brandSrc(kind, theme) {
    return "assets/brand/jamesware-" + kind + "-" + theme + ".png";
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
    paintLogos(theme, !!options.immediate);
    paintDots(theme);
    requestAnimationFrame(function () {
      paintFavicon(theme);
    });
    if (options.persist) {
      try {
        localStorage.setItem("jamesware-theme", theme);
      } catch (e) {}
    }
  }

  /* ---------- terminal typing ---------- */

  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  async function typeText(el, text, speed) {
    var i;
    for (i = 0; i < text.length; i += 1) {
      el.appendChild(document.createTextNode(text.charAt(i)));
      await sleep(speed);
    }
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

  async function runHeroTerm() {
    var el = document.getElementById("hero-term");
    if (!el) return;
    var boot = [
      "JW-BIOS 2.4 ... 64K RAM OK",
      "LOADING JAMESWARE.SYS ...",
    ];
    var lines = [
      "JamesWare Terminal v1.0",
      "-----------------------",
      "> Welcome to JamesWare",
      "> Building software with",
      "  timeless design and",
      "  modern engineering.",
      "> ",
    ];
    el.textContent = "";
    if (reducedMotion) {
      el.textContent = lines.join("\n");
      el.appendChild(cursorNode());
      return;
    }
    var i;
    for (i = 0; i < boot.length; i += 1) {
      await typeText(el, (i ? "\n" : "") + boot[i], 6);
      await sleep(260);
    }
    await sleep(420);
    el.textContent = "";
    for (i = 0; i < lines.length; i += 1) {
      await typeText(el, (i ? "\n" : "") + lines[i], i < 2 ? 10 : 18);
      await sleep(i === 1 ? 320 : 160);
    }
    el.appendChild(cursorNode());
  }

  async function runCareTerm() {
    var el = document.getElementById("care-term");
    if (!el) return;
    var script = [
      { cls: "muted", text: "Last login: " + lastLoginStamp() + " on ttys001" },
      { cls: "cmd", text: "$ whoami" },
      { cls: "out", text: "jamesware" },
      { cls: "cmd", text: "$ what_do_you_build" },
      { cls: "out", text: "Thoughtful software with timeless design." },
      { cls: "cmd", text: "$ cat philosophy.txt" },
      { cls: "out", text: "  Simplicity is complex." },
      { cls: "out", text: "  Details matter." },
      { cls: "out", text: "  Build it like it's yours." },
      { cls: "cmd", text: "$ " },
    ];
    el.textContent = "";

    function lineSpan(cls) {
      var span = document.createElement("span");
      span.className = "term-line term-line--" + cls;
      el.appendChild(span);
      return span;
    }

    if (reducedMotion) {
      script.forEach(function (step, i) {
        if (i) el.appendChild(document.createTextNode("\n"));
        lineSpan(step.cls).textContent = step.text;
      });
      el.appendChild(cursorNode());
      return;
    }

    var i;
    for (i = 0; i < script.length; i += 1) {
      var step = script[i];
      if (i) el.appendChild(document.createTextNode("\n"));
      var span = lineSpan(step.cls);
      if (step.cls === "cmd") {
        await typeText(span, step.text, 30);
        await sleep(200);
      } else {
        span.textContent = step.text;
        await sleep(300);
      }
    }
    el.appendChild(cursorNode());
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
        applyTheme(btn.getAttribute("data-theme-pick"), { persist: true });
      });
    });
  }

  function ready() {
    document.documentElement.classList.add("theme-ready");
    preloadBrands();
    applyTheme(currentTheme(), { immediate: true });
    bindSwitcher();
    startTyping();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
