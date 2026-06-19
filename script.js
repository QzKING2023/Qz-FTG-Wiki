/* ============================================
   Sidebar Collapse Toggle
   ============================================ */

(function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');

  if (!sidebar || !toggleBtn) return;

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('collapsed');

    // Switch icon: ☰ when open, » when collapsed
    if (sidebar.classList.contains('collapsed')) {
      toggleBtn.textContent = '»';  // »
    } else {
      toggleBtn.textContent = '☰';  // ☰
    }
  });
})();

/* ============================================
   Nav-Label Line Equalizer
   Splits text at "/" into separate lines,
   adjusts font-size so each line has roughly
   equal visual width.

   Scales shorter lines UP and longer lines
   DOWN to meet near the geometric mean,
   clamped to [0.7×, 1.4×] base font size.
   ============================================ */

(function () {
  const BASE_FONT_SIZE = 16; // px, matches browser default

  function equalizeOneLabel(label) {
    const lines = label.querySelectorAll('.nav-line');
    if (lines.length <= 1) return;

    // Temporarily reset all lines to base font size for measuring
    lines.forEach(function (l) { l.style.fontSize = ''; });

    // Measure natural widths
    var maxWidth = 0;
    var minWidth = Infinity;
    var widths = [];
    lines.forEach(function (l) {
      var w = l.getBoundingClientRect().width;
      widths.push(w);
      if (w > maxWidth) maxWidth = w;
      if (w < minWidth) minWidth = w;
    });

    if (maxWidth === 0 || minWidth === Infinity) return;

    // Use geometric mean as target — balances both directions
    var targetWidth = Math.sqrt(minWidth * maxWidth);
    var MIN_SCALE = 0.7;
    var MAX_SCALE = 1.4;

    lines.forEach(function (l, i) {
      var ratio = targetWidth / widths[i];
      var clamped = Math.min(Math.max(ratio, MIN_SCALE), MAX_SCALE);
      l.style.fontSize = (BASE_FONT_SIZE * clamped).toFixed(2) + 'px';
    });
  }

  function equalizeAll() {
    var labels = document.querySelectorAll('.nav-label');
    for (var i = 0; i < labels.length; i++) {
      equalizeOneLabel(labels[i]);
    }
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', equalizeAll);
  } else {
    equalizeAll();
  }

  // Also run after fonts have likely loaded
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(equalizeAll);
  }

  // Re-run when sidebar toggles (width change may affect wrapping)
  var toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      // Wait for CSS transition to finish
      setTimeout(equalizeAll, 300);
    });
  }

  // Re-run on window resize (debounced)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(equalizeAll, 150);
  });
})();

