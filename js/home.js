/* ═══════════════════════════════════════════
   HOME — Landing page with 3 portal cards
   ═══════════════════════════════════════════ */

function renderHome() {
  var cats = getCategories();
  var lang = state.lang;

  var html = renderNav();
  html += renderFlash();

  // Masthead
  html += '<div class="text-center py-8 md:py-12">';
  html += '<h1 class="text-3xl md:text-4xl font-bold text-brand-700 mb-2">' + t('home_title') + '</h1>';
  html += '<p class="text-gray-500 max-w-xl mx-auto px-4">' + t('home_subtitle') + '</p>';
  html += '</div>';

  // 3 Portal Cards
  html += '<div class="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto px-4">';
  // Template Management
  html += '<a href="#/templates" onclick="navigate(\'#/templates\')" class="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100 hover:border-brand-300">';
  html += '<div class="text-5xl mb-4">📁</div>';
  html += '<h2 class="text-xl font-bold text-brand-700 mb-2">' + t('home_templates_title') + '</h2>';
  html += '<p class="text-gray-500 text-sm">' + t('home_templates_desc') + '</p>';
  html += '<span class="inline-block mt-4 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium">' + t('btn_enter') + '</span>';
  html += '</a>';

  // Sales Portal
  html += '<a href="#/sales" onclick="navigate(\'#/sales\')" class="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100 hover:border-brand-300">';
  html += '<div class="text-5xl mb-4">✍️</div>';
  html += '<h2 class="text-xl font-bold text-brand-700 mb-2">' + t('home_sales_title') + '</h2>';
  html += '<p class="text-gray-500 text-sm">' + t('home_sales_desc') + '</p>';
  html += '<span class="inline-block mt-4 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium">' + t('btn_enter') + '</span>';
  html += '</a>';

  // Review
  html += '<a href="#/review" onclick="navigate(\'#/review\')" class="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100 hover:border-brand-300">';
  html += '<div class="text-5xl mb-4">✅</div>';
  html += '<h2 class="text-xl font-bold text-brand-700 mb-2">' + t('home_review_title') + '</h2>';
  html += '<p class="text-gray-500 text-sm">' + t('home_review_desc') + '</p>';
  html += '<span class="inline-block mt-4 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium">' + t('btn_enter') + '</span>';
  html += '</a>';
  html += '</div>';

  // Category Grid
  html += '<div class="max-w-5xl mx-auto mt-12 px-4">';
  html += '<h3 class="text-lg font-semibold text-brand-700 mb-4">' + t('nav_templates') + ':</h3>';
  html += '<div class="grid md:grid-cols-2 gap-3">';
  cats.forEach(function(cat) {
    html += '<a href="#/templates?category=' + cat.id + '" onclick="navigate(\'#/templates?category=\' + ' + cat.id + ')" class="flex items-center gap-3 bg-white rounded-lg border p-3 hover:shadow transition">';
    html += '<span class="text-2xl">📄</span>';
    html += '<div>';
    html += '<div class="font-medium text-brand-700 text-sm">' + escHtml(lang === 'de' ? cat.name_de : cat.name_en) + '</div>';
    html += '<div class="text-gray-400 text-xs">' + escHtml(lang === 'en' ? cat.name_en : cat.name_de) + '</div>';
    html += '</div></a>';
  });
  html += '</div></div>';

  // Footer
  html += '<footer class="max-w-6xl mx-auto mt-16 px-4 py-8 text-center text-sm text-gray-400 border-t border-gray-100">';
  html += '<span class="font-serif italic text-gray-500 text-base">Yihan Ma</span>';
  html += '</footer>';

  return html;
}
