/* ============================================================
   The Daily Portfolio — wire service ticker + edition toggle
   LIGHT EDITION — The CW's THE FLASH (Central City, 2014)
   DARK EDITION  — The CW's ARROW (Starling City, 2012)
   ============================================================ */

(function () {
  "use strict";

  // ------------------------------ LATE BULLETIN ------------------------------
  // Barry's opening monologue, filed to the wire
  const BULLETINS = {
    light: [
      "MY NAME IS MEGARSHITH — AND I AM THE FASTEST CODER ALIVE",
      "TO THE OUTSIDE WORLD I'M AN ORDINARY STUDENT, BUT SECRETLY I USE THE SPEED FORCE TO SHIP CODE",
      "STRUCK BY LIGHTNING: PARTICLE ACCELERATOR EXPLOSION ROCKS CENTRAL CITY",
      "S.T.A.R. LABS WIRE: METAHUMAN ACTIVITY REPORTED AT THE KEYBOARD",
      "THE ENLIGHTENMENT BEGINS — THE SKY TURNS VIOLET OVER CENTRAL CITY",
      "CCPD CONFIRMS — THE VIOLET SPEEDSTER ANSWERS EVERY TICKET AT SUPERHUMAN PACE",
      "I AM THE FLASH",
    ],
    // Oliver's opening monologue, filed to the wire
    dark: [
      "MY NAME IS MEGARSHITH — AFTER FIVE YEARS IN FRONT OF A SCREEN, I RETURNED HOME WITH ONLY ONE GOAL",
      "TO SAVE MY CITY — AND ITS SEMICOLONS",
      "THE HOOD STRIKES AGAIN: STARLING CITY BUG COUNT DROPS OVERNIGHT",
      "QUEEN CONSOLIDATED WIRE: FOUNDERS' CODE VAULT BREACHED — TARGET ACQUIRED",
      "YOU HAVE FAILED THIS CITY — SEGMENTATION FAULT AT LINE 42",
      "I AM THE GREEN ARROW",
    ],
  };

  const ticker = document.getElementById("ticker");
  let bulletins = BULLETINS.light;
  let index = 0;
  let timer = null;

  function showBulletin(i) {
    if (ticker) ticker.textContent = bulletins[i];
  }

  function rotate() {
    if (!ticker || bulletins.length < 2) return;
    ticker.classList.add("fading");
    setTimeout(function () {
      index = (index + 1) % bulletins.length;
      showBulletin(index);
      ticker.classList.remove("fading");
    }, 380);
  }

  function startTicker() {
    if (timer) clearInterval(timer);
    timer = null;
    if (ticker && bulletins.length > 1) {
      timer = setInterval(rotate, 4200);
    }
  }

  // --------------------------- ACTIVE SECTION MARK ---------------------------
  const links = Array.prototype.slice.call(
    document.querySelectorAll(".nav a[href^='#']")
  );

  function markActive() {
    let currentId = null;
    const offset = window.scrollY + 120;

    links.forEach(function (link) {
      const target = document.querySelector(link.getAttribute("href"));
      if (target && target.offsetTop <= offset) {
        currentId = link.getAttribute("href");
      }
    });

    links.forEach(function (link) {
      if (link.getAttribute("href") === currentId) {
        link.style.borderBottomColor = "var(--accent1)";
        link.style.color = "var(--accent1)";
      } else {
        link.style.borderBottomColor = "";
        link.style.color = "";
      }
    });
  }

  if (links.length) {
    window.addEventListener("scroll", markActive, { passive: true });
    markActive();
  }

  // -------------------------- EDITION (THEME) TOGGLE -------------------------
  const editionName = document.querySelector(".edition-name");
  const editionToggle = document.querySelector(".edition-toggle");
  const mastheadDate = document.querySelector(".masthead-date");
  const mastheadTag = document.querySelector(".masthead-tag");
  const mastheadPrice = document.querySelector(".masthead-price");
  const tickerLabel = document.querySelector(".ticker-label");

  function applyEdition(mode) {
    const dark = mode === "dark";
    document.body.classList.toggle("dark", dark);

    if (editionName) {
      editionName.textContent = dark ? "STARLING CITY EDITION" : "CENTRAL CITY EDITION";
    }
    if (editionToggle) {
      editionToggle.textContent = dark ? "▲ ARROW EDITION" : "⚡ FLASH EDITION";
      editionToggle.setAttribute("aria-pressed", dark ? "true" : "false");
      editionToggle.title = dark
        ? "Switch to the Flash edition"
        : "Switch to the Arrow edition";
    }
    if (mastheadDate) {
      mastheadDate.textContent = dark
        ? "EST. MMXII — STARLING CITY"
        : "EST. MMXIV — CENTRAL CITY, MO";
    }
    if (mastheadTag) {
      mastheadTag.textContent = dark
        ? "ALL THE CODE THAT'S FIT TO HUNT"
        : "ALL THE CODE THAT'S FIT TO OUTRUN";
    }
    if (mastheadPrice) {
      mastheadPrice.textContent = dark
        ? "PRICE: ONE MARKED ARROW"
        : "PRICE: 1 SPEED FORCE";
    }
    if (tickerLabel) {
      tickerLabel.textContent = dark ? "STARLING CITY WIRE" : "CENTRAL CITY WIRE";
    }

    // swap the wire copy for the new city
    bulletins = dark ? BULLETINS.dark : BULLETINS.light;
    index = 0;
    showBulletin(index);
    startTicker();

    try {
      localStorage.setItem("edition-theme", dark ? "dark" : "light");
    } catch (e) {}
  }

  let stored = "light";
  try {
    stored = localStorage.getItem("edition-theme") || "light";
  } catch (e) {}
  applyEdition(stored);

  if (editionToggle) {
    editionToggle.addEventListener("click", function () {
      applyEdition(document.body.classList.contains("dark") ? "light" : "dark");
    });
    editionToggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        editionToggle.click();
      }
    });
  }
})();
