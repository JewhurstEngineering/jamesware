(function () {
  "use strict";

  var THEMES = ["green", "orange", "blue", "purple", "red"];
  var CYCLE_MS = 60000;
  var FAVICON_SELECTOR = 'link[rel="icon"]';
  var THEME_COLORS = {
    green: { phosphor: "#5cff7a", dim: "#0c2410", ink: "#cff6d6" },
    orange: { phosphor: "#ffa23d", dim: "#3a1d08", ink: "#f6dec0" },
    blue: { phosphor: "#4d9cff", dim: "#0b1b3a", ink: "#cfe0fa" },
    purple: { phosphor: "#a366ff", dim: "#260c3a", ink: "#e4d4fa" },
    red: { phosphor: "#ff5252", dim: "#3a0c0c", ink: "#f8d6d6" },
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
    var ls = document.getElementById("hero-ls");
    var session = [
      { cls: "cmd", text: "guest@jamesware:~$ whoami" },
      { cls: "out", text: "independent software studio — apps, tools, useful things" },
      { cls: "cmd", text: "guest@jamesware:~$ cat mission.txt" },
      { cls: "out", text: "Useful over impressive. Ship the small thing that works." },
      { cls: "cmd", text: "guest@jamesware:~$ ls" },
    ];
    el.textContent = "";
    if (reducedMotion) {
      await playTerm(el, session);
      return;
    }
    if (ls) ls.style.opacity = "0";
    await typeText(lineSpan(el, "muted"), "JW-BIOS 2.6 ... 64K RAM OK", 6);
    await sleep(260);
    el.appendChild(document.createTextNode("\n"));
    await typeText(lineSpan(el, "muted"), "LOADING JAMESWARE.SYS ...", 6);
    await sleep(420);
    await playTerm(el, session);
    if (ls) {
      await sleep(150);
      ls.style.opacity = "1";
    }
  }

  async function runCareTerm() {
    var el = document.getElementById("care-term");
    if (!el) return;
    await playTerm(el, [
      { cls: "muted", text: "Last login: " + lastLoginStamp() + " on ttys001" },
      { cls: "cmd", text: "guest@jamesware:~$ cat approach.md" },
      { cls: "out", text: "Useful over impressive." },
      { cls: "out", text: "Ship the small thing that works." },
      { cls: "cmd", text: "guest@jamesware:~$ background" },
      { cls: "out", text: "Software architecture, automotive" },
      { cls: "out", text: "systems, developer tooling, APIs." },
      { cls: "cmd", text: "guest@jamesware:~$ " },
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

  /* ---------- hero console ---------- */

  var HERO_PROJECTS = [
    { slug: "ai-meter", name: "ai meter", href: "ai-meter/index.html", desc: "local-first usage meter" },
    { slug: "daily-on-plan", name: "daily on plan", href: "daily-on-plan/index.html", desc: "on-device nutrition sheet" },
    { slug: "budmath", name: "budmath", href: "budmath/index.html", desc: "ounces to grams, portions" },
    { slug: "glauncher", name: "glauncher", href: "glauncher/index.html", desc: "windows group launcher" },
    { slug: "doteq", name: "doteq", href: "doteq/index.html", desc: ".env sync for local dev" },
  ];

  var HERO_HELP = [
    "commands:",
    "  help              this list",
    "  whoami            who is jamesware",
    "  about             jump to the about section",
    "  work | ls         list projects",
    "  open <project>    open a project page (alias: cd)",
    "  theme <color>     green | orange | blue | purple | red",
    "  contact           github + email",
    "  clear             clear the screen",
    "  exit              log out and reset",
  ];

  function outLine(cls, text) {
    var div = document.createElement("div");
    div.className = "shell__out-line" + (cls ? " shell__out-line--" + cls : "");
    div.textContent = text;
    return div;
  }

  function findProject(name) {
    var q = (name || "").toLowerCase().replace(/\/$/, "");
    var matches = HERO_PROJECTS.filter(function (p) {
      return p.slug === q || p.name === q || p.slug.replace(/-/g, "") === q.replace(/[\s-]/g, "");
    });
    return matches[0] || null;
  }

  function runHeroCommand(raw, ctx) {
    var input = raw.trim();
    var parts = input.split(/\s+/).filter(Boolean);
    var cmd = (parts[0] || "").toLowerCase();
    var arg = parts.slice(1).join(" ");
    var lines = [];

    switch (cmd) {
      case "":
        break;
      case "help":
        HERO_HELP.forEach(function (t) {
          lines.push(outLine("out", t));
        });
        break;
      case "whoami":
        lines.push(outLine("out", "guest"));
        break;
      case "about":
        lines.push(outLine("out", "Independent software studio of James Jewhurst."));
        lines.push(outLine("muted", "scrolling to about ..."));
        ctx.scrollToId("about");
        break;
      case "work":
      case "ls":
      case "projects":
        HERO_PROJECTS.forEach(function (p) {
          var name = p.slug + "/";
          var pad = name.length < 20 ? new Array(20 - name.length).join(" ") : " ";
          lines.push(outLine("out", "drwxr-xr-x  " + name + pad + p.desc));
        });
        lines.push(outLine("out", "-rw-r--r--  about.md            more about jamesware"));
        lines.push(outLine("out", "lrwxrwxrwx  github              source, follow along"));
        lines.push(outLine("muted", "type: open <project> | about | contact"));
        break;
      case "open":
      case "cd":
        var proj = findProject(arg);
        if (proj) {
          lines.push(outLine("out", "opening " + proj.slug + " ..."));
          ctx.navigate(proj.href);
        } else if (!arg) {
          lines.push(outLine("err", "usage: " + cmd + " <project>. try 'work' to list them"));
        } else {
          lines.push(outLine("err", "no such project: " + arg + ". try 'work'"));
        }
        break;
      case "theme":
        var t = arg.toLowerCase();
        if (THEMES.indexOf(t) >= 0) {
          applyTheme(t, { pauseAmbient: true });
          lines.push(outLine("out", "phosphor set to " + t));
        } else {
          lines.push(outLine("err", "usage: theme <green|orange|blue|purple|red>"));
        }
        break;
      case "contact":
        lines.push(outLine("out", "github: github.com/JewhurstEngineering"));
        lines.push(outLine("out", "email:  jameswaredotdev@gmail.com"));
        break;
      case "date":
        lines.push(outLine("out", new Date().toString()));
        break;
      case "sudo":
        lines.push(outLine("err", "Ha, yeah right, you are not in the sudoers file. this incident will be recorded and reported."));
        break;
      case "clear":
        return null;
      case "exit":
      case "quit":
      case "logout":
        lines.push(outLine("muted", "logging out ..."));
        ctx.exit();
        break;
      default:
        lines.push(outLine("err", cmd + ": command not found. try 'help'"));
    }
    return lines;
  }

  function bindHeroConsole() {
    var form = document.getElementById("hero-form");
    var input = document.getElementById("hero-input");
    var output = document.getElementById("hero-output");
    var consoleEl = document.getElementById("hero-console");
    var intro = document.getElementById("hero-intro");
    if (!form || !input || !output) return;

    var history = [];
    var historyIndex = -1;

    var ctx = {
      scrollToId: function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      },
      navigate: function (href) {
        setTimeout(function () {
          window.location.href = href;
        }, reducedMotion ? 0 : 320);
      },
      exit: function () {
        input.disabled = true;
        setTimeout(function () {
          window.location.reload();
        }, reducedMotion ? 0 : 420);
      },
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = input.value;
      input.value = "";
      if (history[history.length - 1] !== val && val.trim()) history.push(val);
      historyIndex = -1;
      if (!val.trim()) return;

      if (intro && !intro.hidden) intro.hidden = true;

      output.textContent = "";
      output.appendChild(outLine("cmd", "guest@jamesware:~$ " + val));
      var result = runHeroCommand(val, ctx);
      if (result === null) {
        output.textContent = "";
      } else {
        result.forEach(function (line) {
          output.appendChild(line);
        });
      }
      output.scrollTop = output.scrollHeight;

      if (!reducedMotion) {
        output.classList.remove("is-flash");
        void output.offsetWidth;
        output.classList.add("is-flash");
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") {
        if (!history.length) return;
        historyIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || "";
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (!history.length) return;
        if (historyIndex < 0) return;
        historyIndex = historyIndex + 1 >= history.length ? -1 : historyIndex + 1;
        input.value = historyIndex < 0 ? "" : history[historyIndex];
        e.preventDefault();
      }
    });

    if (consoleEl) {
      consoleEl.addEventListener("click", function (e) {
        if (e.target !== input) input.focus();
      });
    }
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
    bindHeroConsole();
    startCycle();
    startTyping();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
