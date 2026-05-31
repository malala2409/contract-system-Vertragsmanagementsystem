/* ═══════════════════════════════════════════
   SALES — Sales portal: login, fill, preview, submit, view, edit
   ═══════════════════════════════════════════ */

function renderSalesHome() {
  var lang = state.lang;
  var submitter = state.submitterName;

  var html = renderNav();
  html += renderFlash();

  html += '<div class="max-w-6xl mx-auto px-4 py-6">';
  html += '<h2 class="text-2xl font-bold text-brand-700 mb-1">' + t('sales_title') + '</h2>';
  html += '<p class="text-gray-500 mb-6">' + t('sales_subtitle') + '</p>';

  if (!submitter) {
    // Show name entry form
    html += '<div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">';
    html += '<p class="text-sm text-yellow-800 mb-3 font-medium">' + t('sales_enter_name') + '</p>';
    html += '<form onsubmit="handleSalesLogin(event)" class="flex gap-2">';
    html += '<input type="text" id="submitterNameInput" placeholder="' + t('sales_name_placeholder') + '" required class="flex-1 border rounded-lg px-3 py-2">';
    html += '<button type="submit" class="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition">' + t('btn_enter') + '</button>';
    html += '</form></div>';
  } else {
    // Dashboard
    html += '<div class="flex items-center gap-3 mb-6 bg-white border rounded-lg p-3">';
    html += '<span class="text-sm text-gray-500">' + t('sales_logged_in') + ':</span>';
    html += '<span class="font-semibold text-brand-700">' + escHtml(submitter) + '</span>';
    html += '<button onclick="handleSalesLogout()" class="ml-auto text-sm text-red-500 hover:text-red-700">' + t('sales_logout') + '</button>';
    html += '</div>';

    // Template selection grid
    html += '<h3 class="text-lg font-semibold text-brand-700 mb-3">' + t('sales_select_template') + '</h3>';
    var allTemplates = getTemplates();
    if (allTemplates.length === 0) {
      html += '<p class="text-gray-400 text-center py-8">' + t('no_templates') + '</p>';
    } else {
      html += '<div class="grid md:grid-cols-3 gap-4 mb-8">';
      allTemplates.forEach(function(tmpl) {
        html += '<a href="#/sales/fill/' + tmpl.id + '" onclick="navigate(\'#/sales/fill/' + tmpl.id + '\')" class="block bg-white rounded-lg border p-4 hover:shadow transition">';
        html += '<h4 class="font-semibold text-brand-700 text-sm mb-1">' + escHtml(lang === 'de' ? tmpl.title_de : tmpl.title_en) + '</h4>';
        html += '<p class="text-xs text-gray-400">' + (tmpl.sections ? tmpl.sections.length : 0) + ' ' + (lang === 'de' ? 'Abschnitte' : 'sections') + '</p>';
        html += '<span class="inline-block mt-3 text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded">' + t('btn_fill') + '</span>';
        html += '</a>';
      });
      html += '</div>';
    }

    // My Submissions
    html += '<h3 class="text-lg font-semibold text-brand-700 mb-3">' + t('sales_my_contracts') + '</h3>';
    var mySubs = getSubmissions({ submitterName: submitter });
    if (mySubs.length === 0) {
      html += '<p class="text-gray-400 text-center py-8">' + t('sales_no_contracts') + '</p>';
    } else {
      var headers = ['ID', lang === 'de' ? 'Vorlage' : 'Template', t('label_submitted'), 'Status', t('label_comment'), ''];
      html += dataTable(headers, mySubs, function(sub) {
        var tmpl = getTemplate(sub.template_id);
        var tmplName = tmpl ? (lang === 'de' ? tmpl.title_de : tmpl.title_en) : '—';
        var actionHtml = '';
        if (sub.status === 'rejected' || sub.status === 'pending') {
          actionHtml += '<a href="#/sales/edit/' + sub.id + '" class="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded hover:bg-brand-100 mr-1">' + t('btn_edit') + '</a>';
        }
        actionHtml += '<a href="#/sales/view/' + sub.id + '" class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200">' + t('btn_view') + '</a>';
        return [
          '#' + sub.id,
          escHtml(tmplName),
          formatDateShort(sub.submitted_at),
          statusBadge(sub.status),
          escHtml((sub.review_comment || '').substring(0, 50)),
          actionHtml
        ];
      }, t('sales_no_contracts'));
      html += '</div>';
    }
  }

  html += '</div>';
  return html;
}

function handleSalesLogin(e) {
  e.preventDefault();
  var name = document.getElementById('submitterNameInput').value.trim();
  if (name) {
    setSubmitter(name);
    render();
  }
}

function handleSalesLogout() {
  clearSubmitter();
  clearPreview();
  render();
}

/* ── Sales Fill ── */
function renderSalesFill(id) {
  if (!state.submitterName) {
    saveFlash(state.lang === 'de' ? 'Bitte zuerst Namen eingeben.' : 'Please enter your name first.', 'error');
    navigate('#/sales');
    return '';
  }
  var html = renderFill(id, {
    existingData: null,
    backUrl: '#/sales',
    submitLabel: t('btn_review'),
    formAction: 'salesFill'
  });
  // After render, attach preview listeners
  setTimeout(attachLivePreviewListeners, 100);
  return html;
}

/* ── Sales Preview ── */
function renderSalesPreview(id) {
  if (!state.submitterName) {
    navigate('#/sales');
    return '';
  }
  var previewData = loadPreview();
  if (!previewData || previewData.template_id !== id) {
    saveFlash(state.lang === 'de' ? 'Keine Daten vorhanden.' : 'No data available.', 'error');
    navigate('#/sales/fill/' + id);
    return '';
  }
  var tmpl = getTemplate(id);
  if (!tmpl) return '';

  var lang = state.lang;
  var rendered = renderFilledSections(tmpl, previewData.filled_data, lang);
  var html = renderNav();
  html += renderFlash();

  html += '<div class="max-w-4xl mx-auto px-4 py-6">';
  html += '<a href="#/sales/fill/' + id + '" onclick="navigate(\'#/sales/fill/' + id + '\')" class="text-brand-600 hover:text-brand-800 text-sm mb-3 inline-block">&larr; ' + t('btn_back') + '</a>';
  html += '<h2 class="text-2xl font-bold text-brand-700 mb-1">' + t('sales_overview_title') + '</h2>';
  html += '<p class="text-sm text-gray-500 mb-6">' + escHtml(lang === 'de' ? tmpl.title_de : tmpl.title_en) + '</p>';

  html += '<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-sm text-yellow-800">⚠️ ' + t('sales_overview_hint') + '</div>';

  // Rendered sections
  html += '<div class="bg-white border rounded-xl p-6 mb-6">';
  rendered.forEach(function(rs, idx) {
    html += '<div class="mb-4 pb-3 border-b border-gray-100' + (rs.is_modified ? ' border-l-4 border-l-orange-400 pl-3 bg-orange-50/50 rounded' : '') + '">';
    html += '<h4 class="font-semibold text-brand-700 text-sm mb-1">' + (idx + 1) + '. ' + escHtml(lang === 'de' ? rs.title_de : rs.title_en);
    if (rs.is_modified) html += ' <span class="text-xs text-orange-500 ml-1">' + t('modified_warning') + '</span>';
    html += '</h4>';
    html += '<div class="text-sm text-gray-700">' + rs.rendered_html + '</div>';
    html += '</div>';
  });
  html += '</div>';

  // Action buttons
  html += '<div class="flex gap-3 justify-end">';
  html += '<a href="#/sales/fill/' + id + '" onclick="navigate(\'#/sales/fill/' + id + '\')" class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">' + t('sales_revise') + '</a>';
  html += '<button onclick="confirmSalesSubmit(' + id + ')" class="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition">' + t('btn_confirm_submit') + '</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function confirmSalesSubmit(id) {
  var previewData = loadPreview();
  if (!previewData) return;
  var sub = {
    template_id: id,
    filled_data: previewData.filled_data,
    status: 'pending',
    submitter_name: state.submitterName,
    review_comment: null,
    review_notes: [],
    reviewed_at: null
  };
  saveSubmission(sub);
  clearPreview();
  saveFlash(t('submit_success'), 'success');
  navigate('#/sales');
}

/* ── Sales View (read-only) ── */
function renderSalesView(subId) {
  if (!state.submitterName) { navigate('#/sales'); return ''; }
  var sub = getSubmission(subId);
  if (!sub || sub.submitter_name !== state.submitterName) {
    saveFlash(state.lang === 'de' ? 'Kein Zugriff.' : 'Access denied.', 'error');
    navigate('#/sales');
    return '';
  }
  var tmpl = getTemplate(sub.template_id);
  if (!tmpl) return '';

  var lang = state.lang;
  var rendered = renderFilledSections(tmpl, sub.filled_data, lang);
  var html = renderNav();
  html += renderFlash();

  html += '<div class="max-w-4xl mx-auto px-4 py-6">';
  html += '<a href="#/sales" onclick="navigate(\'#/sales\')" class="text-brand-600 hover:text-brand-800 text-sm mb-3 inline-block">&larr; ' + t('btn_back') + '</a>';
  html += '<div class="flex items-center justify-between mb-4">';
  html += '<h2 class="text-2xl font-bold text-brand-700">' + escHtml(lang === 'de' ? tmpl.title_de : tmpl.title_en) + '</h2>';
  html += statusBadge(sub.status);
  html += '</div>';
  html += '<p class="text-sm text-gray-500 mb-4">' + t('label_submitted') + ': ' + formatDate(sub.submitted_at);
  if (sub.reviewed_at) html += ' | ' + t('label_reviewed') + ': ' + formatDate(sub.reviewed_at);
  html += '</p>';

  // Rendered sections
  html += '<div class="bg-white border rounded-xl p-6 mb-6">';
  rendered.forEach(function(rs, idx) {
    html += '<div class="mb-4 pb-3 border-b border-gray-100' + (rs.is_modified ? ' border-l-4 border-l-orange-400 pl-3 bg-orange-50/50 rounded' : '') + '">';
    html += '<h4 class="font-semibold text-brand-700 text-sm mb-1">' + (idx + 1) + '. ' + escHtml(lang === 'de' ? rs.title_de : rs.title_en);
    if (rs.is_modified) html += ' <span class="text-xs text-orange-500 ml-1">' + t('modified_warning') + '</span>';
    html += '</h4>';
    html += '<div class="text-sm text-gray-700">' + rs.rendered_html + '</div>';
    html += '</div>';
  });
  html += '</div>';

  // Review history
  if (sub.review_notes && sub.review_notes.length > 0) {
    html += '<div class="bg-white border rounded-xl p-6 mb-6">';
    html += '<h3 class="font-semibold text-brand-700 mb-3">' + t('review_history') + '</h3>';
    var notes = sub.review_notes.slice().reverse();
    notes.forEach(function(n) {
      var color = n.action === 'approved' ? 'border-green-400' : (n.action === 'rejected' ? 'border-red-400' : 'border-gray-400');
      html += '<div class="border-l-2 ' + color + ' pl-3 mb-2 text-sm"><span class="text-gray-500 text-xs">' + n.timestamp + '</span><br>' + escHtml(n.comment) + '</div>';
    });
    html += '</div>';
  }

  if (sub.status === 'rejected') {
    html += '<div class="text-right"><a href="#/sales/edit/' + subId + '" onclick="navigate(\'#/sales/edit/' + subId + '\')" class="inline-block px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition">' + t('sales_revise') + '</a></div>';
  }
  html += '</div>';
  return html;
}

/* ── Sales Edit (resubmit rejected/pending) ── */
function renderSalesEdit(subId) {
  if (!state.submitterName) { navigate('#/sales'); return ''; }
  var sub = getSubmission(subId);
  if (!sub || sub.submitter_name !== state.submitterName) {
    saveFlash(state.lang === 'de' ? 'Kein Zugriff.' : 'Access denied.', 'error');
    navigate('#/sales');
    return '';
  }
  if (sub.status !== 'rejected' && sub.status !== 'pending') {
    saveFlash(state.lang === 'de' ? 'Nur abgelehnte oder ausstehende Verträge können bearbeitet werden.' : 'Only rejected or pending contracts can be edited.', 'error');
    navigate('#/sales');
    return '';
  }
  window._editSubmissionId = subId;
  var html = renderFill(sub.template_id, {
    existingData: sub.filled_data,
    submission: sub,
    backUrl: '#/sales',
    submitLabel: t('btn_submit'),
    formAction: 'salesEdit'
  });
  setTimeout(attachLivePreviewListeners, 100);
  return html;
}
