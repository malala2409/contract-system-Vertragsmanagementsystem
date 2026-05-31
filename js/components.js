/* ═══════════════════════════════════════════
   COMPONENTS — Shared UI: nav, modals, helpers
   ═══════════════════════════════════════════ */

/* ── HTML escaping ── */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(str) {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ── Date formatting ── */
function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    var d = new Date(isoStr);
    return d.toLocaleDateString(state.lang === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  } catch(_) { return isoStr; }
}

function formatDateShort(isoStr) {
  if (!isoStr) return '—';
  try {
    var d = new Date(isoStr);
    return d.toLocaleDateString(state.lang === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  } catch(_) { return isoStr; }
}

/* ── Navigation bar ── */
function renderNav() {
  var route = getRoute();
  var isHome = route.path === 'home';
  var isTemplates = route.path === 'templates' || route.path === 'editor';
  var isSales = route.path === 'sales';
  var isReview = route.path === 'review';

  return '<nav class="bg-brand-700 text-white shadow-lg">' +
    '<div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">' +
      '<a href="#/home" class="text-xl font-bold tracking-tight" onclick="navigate(\'#/home\')">' +
        '<span class="text-brand-200">📄</span> ' + t('app_name') +
      '</a>' +
      '<div class="flex items-center gap-1 text-sm font-medium">' +
        '<a href="#/home" class="px-3 py-2 rounded transition ' + (isHome ? 'bg-brand-600' : 'hover:bg-brand-600') + '" onclick="navigate(\'#/home\')">' + t('nav_home') + '</a>' +
        '<a href="#/templates" class="px-3 py-2 rounded transition ' + (isTemplates ? 'bg-brand-600' : 'hover:bg-brand-600') + '" onclick="navigate(\'#/templates\')">' + t('nav_templates') + '</a>' +
        '<a href="#/sales" class="px-3 py-2 rounded transition ' + (isSales ? 'bg-brand-600' : 'hover:bg-brand-600') + '" onclick="navigate(\'#/sales\')">' + t('home_sales_title') + '</a>' +
        '<a href="#/review" class="px-3 py-2 rounded transition ' + (isReview ? 'bg-brand-600' : 'hover:bg-brand-600') + '" onclick="navigate(\'#/review\')">' + t('nav_review') + '</a>' +
        '<span class="mx-1 text-brand-400">|</span>' +
        '<button id="btnDE" class="px-1 ' + (state.lang === 'de' ? 'font-bold underline' : '') + '" onclick="setLang(\'de\')">DE</button>' +
        '<button id="btnEN" class="px-1 ' + (state.lang === 'en' ? 'font-bold underline' : '') + '" onclick="setLang(\'en\')">EN</button>' +
      '</div>' +
    '</div>' +
  '</nav>';
}

/* ── Flash messages ── */
function renderFlash() {
  if (!state.flashMessage) return '';
  var bg = state.flashMessage.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700';
  var html = '<div class="max-w-6xl mx-auto px-4 mt-3"><div class="' + bg + ' border px-4 py-3 rounded relative">' +
    '<span class="block sm:inline">' + escHtml(state.flashMessage.text) + '</span>' +
    '<span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onclick="this.parentElement.parentElement.remove()">&times;</span>' +
  '</div></div>';
  state.flashMessage = null; // Clear after render
  return html;
}

/* ── Modal helpers ── */
function showModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function hideModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

/* ── Status badge ── */
function statusBadge(status) {
  var colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  var color = colors[status] || 'bg-gray-100 text-gray-800';
  return '<span class="inline-block px-2 py-0.5 rounded-full text-xs font-medium ' + color + '">' + t('status_' + status) + '</span>';
}

/* ── Build a table from array of objects ── */
function dataTable(headers, rows, rowRenderer, emptyText) {
  if (!rows || rows.length === 0) {
    return '<div class="text-center py-8 text-gray-400">' + (emptyText || t('no_submissions')) + '</div>';
  }
  var html = '<div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b-2 border-gray-200">';
  headers.forEach(function(h) {
    html += '<th class="text-left py-3 px-4 font-semibold text-gray-600">' + h + '</th>';
  });
  html += '</tr></thead><tbody>';
  rows.forEach(function(row, i) {
    html += '<tr class="border-b border-gray-100 hover:bg-gray-50 transition">';
    rowRenderer(row, i).forEach(function(cell) {
      html += '<td class="py-3 px-4">' + cell + '</td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

/* ── Category filter pills ── */
function renderCategoryPills(activeId) {
  var cats = getCategories();
  var html = '<div class="flex flex-wrap gap-2 mb-4">';
  html += '<a href="#/templates" class="px-3 py-1 rounded-full text-sm font-medium transition ' +
    (!activeId ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200') +
    '" onclick="navigate(\'#/templates\')">' + t('label_all') + '</a>';
  cats.forEach(function(c) {
    html += '<a href="#/templates?category=' + c.id + '" class="px-3 py-1 rounded-full text-sm font-medium transition ' +
      (activeId === c.id ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200') +
      '" onclick="navigate(\'#/templates?category=\' + ' + c.id + ')">' +
      (state.lang === 'de' ? c.name_de : c.name_en) + '</a>';
  });
  html += '</div>';
  return html;
}
