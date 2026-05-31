/* ═══════════════════════════════════════════
   REVIEW — Review dashboard + detail
   ═══════════════════════════════════════════ */

function renderReviewList() {
  var route = getRoute();
  var statusFilter = route.query.status || '';
  var lang = state.lang;

  var filter = {};
  if (statusFilter && (statusFilter === 'pending' || statusFilter === 'approved' || statusFilter === 'rejected')) {
    filter.status = statusFilter;
  }
  var submissions = getSubmissions(filter);

  var html = renderNav();
  html += renderFlash();

  html += '<div class="max-w-6xl mx-auto px-4 py-6">';
  html += '<h2 class="text-2xl font-bold text-brand-700 mb-4">' + t('nav_review') + '</h2>';

  // Status filter pills
  html += '<div class="flex flex-wrap gap-2 mb-6">';
  var pills = [
    { status: '', label: t('label_all'), color: 'bg-brand-600 text-white', inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
    { status: 'pending', label: t('status_pending'), color: 'bg-yellow-500 text-white', inactive: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
    { status: 'approved', label: t('status_approved'), color: 'bg-green-600 text-white', inactive: 'bg-green-50 text-green-700 hover:bg-green-100' },
    { status: 'rejected', label: t('status_rejected'), color: 'bg-red-600 text-white', inactive: 'bg-red-50 text-red-700 hover:bg-red-100' },
  ];
  pills.forEach(function(p) {
    var isActive = statusFilter === p.status;
    html += '<a href="#/review' + (p.status ? '?status=' + p.status : '') + '" class="px-3 py-1 rounded-full text-sm font-medium transition ' + (isActive ? p.color : p.inactive) + '">' + p.label + '</a>';
  });
  html += '</div>';

  if (submissions.length === 0) {
    html += '<div class="text-center py-12 text-gray-400">' + t('no_submissions') + '</div>';
  } else {
    var headers = ['ID', lang === 'de' ? 'Vorlage' : 'Template', t('label_submitted'), lang === 'de' ? 'Einreicher' : 'Submitter', 'Status', ''];
    html += dataTable(headers, submissions, function(sub) {
      var tmpl = getTemplate(sub.template_id);
      var tmplName = tmpl ? (lang === 'de' ? tmpl.title_de : tmpl.title_en) : '—';
      return [
        '#' + sub.id,
        escHtml(tmplName),
        formatDateShort(sub.submitted_at),
        escHtml(sub.submitter_name || '—'),
        statusBadge(sub.status),
        '<a href="#/review/' + sub.id + '" onclick="navigate(\'#/review/' + sub.id + '\')" class="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded hover:bg-brand-100">' + t('btn_enter') + '</a>'
      ];
    }, t('no_submissions'));
  }
  html += '</div>';
  return html;
}

/* ── Review Detail ── */
function renderReviewDetail(id) {
  var sub = getSubmission(id);
  if (!sub) {
    saveFlash('Submission not found.', 'error');
    navigate('#/review');
    return '';
  }
  var tmpl = getTemplate(sub.template_id);
  if (!tmpl) return '';

  var lang = state.lang;
  var rendered = renderFilledSections(tmpl, sub.filled_data, lang);

  var html = renderNav();
  html += renderFlash();

  html += '<div class="max-w-6xl mx-auto px-4 py-4">';
  html += '<a href="#/review" onclick="navigate(\'#/review\')" class="text-brand-600 hover:text-brand-800 text-sm mb-3 inline-block">&larr; ' + t('btn_back') + '</a>';
  html += '</div>';

  html += '<div class="max-w-6xl mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-6">';

  // LEFT: Contract content (2/3)
  html += '<div class="lg:w-2/3">';
  html += '<div class="bg-white border rounded-xl p-6">';
  html += '<div class="flex items-center justify-between mb-4">';
  html += '<h2 class="text-xl font-bold text-brand-700">' + escHtml(lang === 'de' ? tmpl.title_de : tmpl.title_en) + '</h2>';
  html += statusBadge(sub.status);
  html += '</div>';
  html += '<p class="text-sm text-gray-500 mb-4">';
  html += t('label_submitted') + ': ' + formatDate(sub.submitted_at);
  if (sub.submitter_name) html += ' | ' + (lang === 'de' ? 'Einreicher' : 'Submitter') + ': ' + escHtml(sub.submitter_name);
  if (sub.reviewed_at) html += ' | ' + t('label_reviewed') + ': ' + formatDate(sub.reviewed_at);
  html += '</p>';

  // Sections
  rendered.forEach(function(rs, idx) {
    html += '<div class="mb-6 pb-4 border-b border-gray-100' + (rs.is_modified ? ' border-l-4 border-l-red-400 pl-4 bg-red-50/30 rounded-r' : '') + '">';
    html += '<h4 class="font-semibold text-brand-700 mb-2">' + (idx + 1) + '. ' + escHtml(lang === 'de' ? rs.title_de : rs.title_en);
    if (rs.is_modified) html += ' <span class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded ml-1">' + t('modified_warning') + '</span>';
    html += '</h4>';
    html += '<div class="text-sm text-gray-700 leading-relaxed">' + rs.rendered_html + '</div>';
    if (rs.is_modified && rs.original) {
      html += '<details class="mt-2"><summary class="text-xs text-gray-400 cursor-pointer">' + (lang === 'de' ? 'Originaltext anzeigen' : 'Show original') + '</summary>';
      html += '<div class="text-xs text-gray-500 mt-1 p-2 bg-gray-50 rounded">' + escHtml(rs.original) + '</div></details>';
    }
    html += '</div>';
  });
  html += '</div></div>';

  // RIGHT: Review panel (1/3)
  html += '<div class="lg:w-1/3">';
  html += '<div class="bg-white border rounded-xl p-6 sticky top-4 space-y-6">';

  // Status actions
  html += '<div>';
  html += '<h4 class="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">' + (lang === 'de' ? 'Status ändern' : 'Change Status') + '</h4>';
  html += '<div class="flex flex-wrap gap-2">';
  if (sub.status !== 'approved') {
    html += '<button onclick="reviewAction(' + id + ', \'approve\')" class="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition">' + t('btn_approve') + '</button>';
  }
  if (sub.status !== 'rejected') {
    html += '<button onclick="reviewAction(' + id + ', \'reject\')" class="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition">' + t('btn_reject') + '</button>';
  }
  if (sub.status !== 'pending') {
    html += '<button onclick="reviewAction(' + id + ', \'pending\')" class="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">' + t('btn_set_pending') + '</button>';
  }
  html += '</div></div>';

  // Add note
  html += '<div>';
  html += '<h4 class="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">' + t('btn_add_note') + '</h4>';
  html += '<textarea id="reviewComment" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm" placeholder="' + t('label_comment') + '..."></textarea>';
  html += '<button onclick="reviewAction(' + id + ', \'add_note\')" class="mt-2 px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition">' + t('btn_add_note') + '</button>';
  html += '</div>';

  // Review history
  html += '<div>';
  html += '<h4 class="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">' + t('review_history') + '</h4>';
  if (sub.review_notes && sub.review_notes.length > 0) {
    var notes = sub.review_notes.slice().reverse();
    notes.forEach(function(n) {
      var borderColor = n.action === 'approved' ? 'border-green-400' : (n.action === 'rejected' ? 'border-red-400' : (n.action === 'pending' ? 'border-yellow-400' : 'border-gray-400'));
      var bgColor = n.action === 'approved' ? 'bg-green-50/50' : (n.action === 'rejected' ? 'bg-red-50/50' : 'bg-gray-50/50');
      html += '<div class="border-l-2 ' + borderColor + ' pl-3 mb-3 text-sm ' + bgColor + ' p-2 rounded-r">';
      html += '<span class="text-xs text-gray-400">' + n.timestamp + ' — ' + n.action + '</span><br>';
      html += escHtml(n.comment);
      html += '</div>';
    });
  } else {
    html += '<p class="text-sm text-gray-400 italic">' + (lang === 'de' ? 'Noch keine Einträge.' : 'No entries yet.') + '</p>';
  }
  html += '</div>';

  html += '</div></div></div>';
  return html;
}

/* ── Review action handler ── */
function reviewAction(id, action) {
  var sub = getSubmission(id);
  if (!sub) return;
  var comment = (document.getElementById('reviewComment') || {}).value || '';
  var now = new Date();
  var timestamp = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0');

  var notes = (sub.review_notes || []).slice(); // copy to trigger reassignment

  if (action === 'approve') {
    sub.status = 'approved';
    sub.reviewed_at = now.toISOString();
    notes.push({ action: 'approved', comment: comment, timestamp: timestamp });
    sub.review_comment = comment || sub.review_comment;
  } else if (action === 'reject') {
    sub.status = 'rejected';
    sub.reviewed_at = now.toISOString();
    notes.push({ action: 'rejected', comment: comment, timestamp: timestamp });
    sub.review_comment = comment || sub.review_comment;
  } else if (action === 'pending') {
    sub.status = 'pending';
    sub.reviewed_at = now.toISOString();
    notes.push({ action: 'pending', comment: comment, timestamp: timestamp });
    sub.review_comment = comment || sub.review_comment;
  } else if (action === 'add_note') {
    notes.push({ action: 'note', comment: comment, timestamp: timestamp });
    if (comment) sub.review_comment = comment;
  }

  sub.review_notes = notes;
  saveSubmission(sub);
  saveFlash(t('review_success'), 'success');
  render();
}
