/* ═══════════════════════════════════════════
   ROUTER — Hash-based routing
   ═══════════════════════════════════════════ */

function parseHash() {
  // #/templates?category=1  or  #/fill/3  or  #/review/detail/5
  var hash = location.hash.slice(1) || 'home'; // Remove #
  var qIdx = hash.indexOf('?');
  var query = '';
  if (qIdx >= 0) {
    query = hash.slice(qIdx + 1);
    hash = hash.slice(0, qIdx);
  }
  var parts = hash.split('/').filter(Boolean);
  var params = {};
  if (query) {
    query.split('&').forEach(function(pair) {
      var kv = pair.split('=');
      if (kv.length === 2) params[kv[0]] = decodeURIComponent(kv[1]);
    });
  }
  var id = null;
  var subpath = null;
  if (parts.length === 2) {
    // #/fill/3 or #/review/5
    var num = parseInt(parts[1]);
    if (!isNaN(num)) {
      id = num;
    } else {
      subpath = parts[1];
    }
  } else if (parts.length >= 3) {
    // #/sales/fill/3 or #/review/detail/5
    subpath = parts[1];
    var num2 = parseInt(parts[2]);
    if (!isNaN(num2)) id = num2;
  }
  return {
    path: parts[0] || 'home',
    subpath: subpath,
    id: id,
    query: params
  };
}

function navigate(hash) {
  location.hash = hash;
}

function initRouter() {
  window.addEventListener('hashchange', function() {
    render();
  });
  // Initial render
  if (!location.hash) {
    location.hash = '#/home';
  } else {
    render();
  }
}

function getRoute() {
  return parseHash();
}
