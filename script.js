(function() {
  function getBarColor(pct, reversed) {
    var effective = reversed ? (100 - pct) : pct;
    var hue = 10 + effective * 1.1;
    var sat = 90;
    var light = 30 + effective * 0.05;
    return 'linear-gradient(90deg,'
      + ' hsl(' + hue + ', ' + sat + '%, ' + (light - 8) + '%) 0%,'
      + ' hsl(' + hue + ', ' + sat + '%, ' + light + '%) 100%)';
  }

  function autoFillRatingBars() {
    var items = document.querySelectorAll('.rating-item');
    for (var i = 0; i < items.length; i++) {
      var scoreEl = items[i].querySelector('.rating-score');
      var bar = items[i].querySelector('.rating-bar-fill');
      if (!scoreEl || !bar) continue;

      var rawText = scoreEl.textContent.trim();
      var score = parseFloat(rawText);
      if (isNaN(score) || score < 0) continue;
      if (score > 10) score = 10;

      var pct = score * 10;
      bar.style.width = pct + '%';
      scoreEl.textContent = score + '/10';
    }
  }

  function applyRatingColors() {
    var bars = document.querySelectorAll('.rating-bar-fill');
    for (var i = 0; i < bars.length; i++) {
      var bar = bars[i];
      var pct = parseFloat(bar.style.width);
      if (isNaN(pct) || pct <= 0) continue;
      var reversed = bar.hasAttribute('data-reversed');
      bar.style.background = getBarColor(pct, reversed);
    }
  }

  function setupPageNav() {
    var navBars = document.querySelectorAll('.page-nav-bar');
    if (navBars.length === 0) return;

    var path = location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1);
    var match = filename.match(/^(.+)_([^_]+)\.html$/);
    if (!match) return;

    var prefix = match[1];
    var currentSection = match[2];

    for (var i = 0; i < navBars.length; i++) {
      var buttons = navBars[i].querySelectorAll('.page-nav-btn');
      for (var j = 0; j < buttons.length; j++) {
        var btn = buttons[j];
        var section = btn.textContent.trim();
        var target = prefix + '_' + section + '.html';
        btn.setAttribute('href', target);
        if (section === currentSection) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    }
  }

  function runAll() {
    autoFillRatingBars();
    applyRatingColors();
    setupPageNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }
})();
