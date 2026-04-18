/* ============================================================
   js/main.js — App Initialization & Live Clock
   ============================================================ */

/** Updates the header clock every second. */
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.toTimeString().slice(0, 8) + ' UTC';
}

/** Initializes the application. */
function init() {
  renderCases('all');
  updateClock();
  setInterval(updateClock, 1000);
}

// Boot
document.addEventListener('DOMContentLoaded', init);
