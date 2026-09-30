/* ============================================================
   The Daily Portfolio — wire service ticker + active section marker
   ============================================================ */

(function () {
  "use strict";

  // ------------------------------ LATE BULLETIN ------------------------------
  const BULLETINS = [
    "Carpe diem et carpe noctem",
  ];

  const ticker = document.getElementById("ticker");
  let index = 0;

  function rotate() {
    if (!ticker) return;
    ticker.classList.add("fading");
    setTimeout(function () {
      index = (index + 1) % BULLETINS.length;
      ticker.textContent = BULLETINS[index];
      ticker.classList.remove("fading");
    }, 380);
  }

  if (ticker) {
    ticker.textContent = BULLETINS[0];
    if (BULLETINS.length > 1) {
      setInterval(rotate, 4200);
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
        link.style.borderBottomColor = "var(--stamp)";
        link.style.color = "var(--stamp)";
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
})();
