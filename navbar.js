/* ============================================
   Shared Navbar
   Injects the sidebar into every page.
   All paths are relative to the wiki root.
   ============================================ */

(function () {
  var script = document.currentScript;
  if (!script) return;

  // Derive root path from this script's src
  var src = script.getAttribute('src');
  var root = src.replace(/navbar\.js$/, '') || './';

  // Resolve a path from root
  function fromRoot(path) {
    if (root === './' || root === '' || root === '.') return path;
    return root + path;
  }

  var sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';
  sidebar.innerHTML =
    '<button class="sidebar-toggle" id="sidebar-toggle" title="Toggle sidebar">☰</button>' +
    '<nav class="navbar">' +
    '<ul class="nav-list">' +
    '<li class="nav-item">' +
    '<a href="' + fromRoot('pages/StreetFighterVI/SF6_Main.html') + '" class="nav-label">' +
    '<span class="nav-line">街头霸王6</span>' +
    '<span class="nav-line">Street Fighter VI</span>' +
    '</a>' +
    '</li>' +
    '<li class="nav-item">' +
    '<a href="' + fromRoot('pages/BlazblueCenteralFiction/BBCF_Main.html') + '" class="nav-label">' +
    '<span class="nav-line">苍翼默示录:神观之梦</span>' +
    '<span class="nav-line">Blazblue: Central Fiction</span>' +
    '</a>' +
    '</li>' +
    '</ul>' +
    '</nav>';

  document.body.insertBefore(sidebar, document.body.firstChild);
})();
