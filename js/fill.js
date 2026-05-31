/* ═══════════════════════════════════════════
   FILL — Contract fill form with dual mode + live preview
   ═══════════════════════════════════════════ */

function renderFill(id, opts) {
  opts = opts || {};
  var tmpl = getTemplate(id);
  if (!tmpl) return renderNav() + '<div class="max-w-6xl mx-auto p-8 text-center text-gray-400">Template not found.</div>';

  var lang = state.lang;
  var existingData = opts.existingData || null;
  var submission = opts.submission || null;
  var backUrl = opts.backUrl || '#/templates';
  var submitLabel = opts.submitLabel || t('btn_submit');
  var formAction = opts.formAction || 'fill';

  var html = renderNav();
  html += renderFlash();

  // Back button + title
  html += '<div class="max-w-6xl mx-auto px-4 py-4">';
  html += '<a href="' + backUrl + '" onclick="navigate(\'' + backUrl + '\')" class="text-brand-600 hover:text-brand-800 text-sm mb-3 inline-block">&larr; ' + t('btn_back') + '</a>';
  html += '<h2 class="text-2xl font-bold text-brand-700 mb-1">' + escHtml(lang === 'de' ? tmpl.title_de : tmpl.title_en) + '</h2>';

  var cat = getCategories().find(function(c) { return c.id === tmpl.category_id; });
  if (cat) html += '<p class="text-sm text-gray-500 mb-4">' + escHtml(lang === 'de' ? cat.name_de : cat.name_en) + '</p>';

  // Reviewer feedback (for resubmit)
  if (submission && submission.review_notes && submission.review_notes.length > 0) {
    html += '<div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">';
    html += '<h4 class="font-semibold text-orange-700 mb-2">' + t('review_history') + '</h4>';
    var notes = submission.review_notes.slice().reverse();
    notes.forEach(function(n) {
      var borderColor = n.action === 'approved' ? 'border-green-400' : (n.action === 'rejected' ? 'border-red-400' : 'border-gray-400');
      html += '<div class="border-l-2 ' + borderColor + ' pl-3 mb-2 text-sm"><span class="text-gray-500 text-xs">' + n.timestamp + '</span><br>' + escHtml(n.comment) + '</div>';
    });
    if (submission.review_comment) {
      html += '<p class="text-sm text-gray-600 mt-2"><strong>' + t('label_reviewer_note') + ':</strong> ' + escHtml(submission.review_comment) + '</p>';
    }
    html += '</div>';
  }
  html += '</div>';

  // Main content: form (left) + preview (right)
  html += '<div class="max-w-6xl mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-6">';
  // Left: Form
  html += '<div class="lg:w-1/2">';
  html += '<form id="fillForm" onsubmit="return handleFillSubmit(event, ' + id + ', \'' + formAction + '\')">';

  (tmpl.sections || []).forEach(function(sec, si) {
    var secData = (existingData && existingData.sections && existingData.sections[si]) ? existingData.sections[si] : null;
    var isModified = secData && secData.modified;
    var placeholders = extractPlaceholders(sec);

    html += '<div class="bg-white border rounded-lg p-4 mb-4" id="fillSection' + si + '">';
    html += '<div class="flex items-center justify-between mb-3">';
    html += '<h4 class="font-semibold text-brand-700">' + (si + 1) + '. ' + escHtml(lang === 'de' ? sec.title_de : sec.title_en) + '</h4>';
    html += '<button type="button" onclick="toggleSectionMode(' + si + ')" class="text-xs px-2 py-1 rounded border text-gray-500 hover:text-brand-600 transition" id="toggleBtn' + si + '">' +
      (isModified ? t('toggle_fill_mode') : t('toggle_free_edit')) + '</button>';
    html += '</div>';
    html += '<input type="hidden" name="modified_' + si + '" id="modified_' + si + '" value="' + (isModified ? '1' : '0') + '">';

    // Fill mode
    html += '<div id="fillFields' + si + '"' + (isModified ? ' style="display:none"' : '') + '>';
    if (sec.fields && sec.fields.length > 0) {
      sec.fields.forEach(function(f) {
        var val = (secData && secData.fields && secData.fields[f.key]) ? secData.fields[f.key] : '';
        html += '<div class="mb-3"><label class="block text-sm font-medium text-gray-600 mb-1">' +
          escHtml(lang === 'de' ? f.label_de : f.label_en) +
          (f.required ? '' : ' <span class="text-gray-400 text-xs">' + t('optional_hint') + '</span>') +
          '</label>';
        if (f.type === 'textarea') {
          html += '<textarea name="field_' + si + '_' + f.key + '" class="w-full border rounded-lg px-3 py-2 text-sm" rows="3">' + escHtml(val) + '</textarea>';
        } else if (f.type === 'date') {
          html += '<input type="date" name="field_' + si + '_' + f.key + '" value="' + escAttr(val) + '" class="w-full border rounded-lg px-3 py-2 text-sm">';
        } else if (f.type === 'select' && f.options && f.options.length > 0) {
          html += '<select name="field_' + si + '_' + f.key + '" class="w-full border rounded-lg px-3 py-2 text-sm">';
          html += '<option value="">—</option>';
          f.options.forEach(function(o) {
            html += '<option value="' + escAttr(o) + '"' + (val === o ? ' selected' : '') + '>' + escHtml(o) + '</option>';
          });
          html += '</select>';
        } else {
          html += '<input type="text" name="field_' + si + '_' + f.key + '" value="' + escAttr(val) + '" class="w-full border rounded-lg px-3 py-2 text-sm">';
        }
        html += '</div>';
      });
    } else if (placeholders.length > 0) {
      placeholders.forEach(function(ph) {
        var val = (secData && secData.fields && secData.fields[ph]) ? secData.fields[ph] : '';
        html += '<div class="mb-3"><label class="block text-sm font-medium text-gray-600 mb-1">' + escHtml(ph) + '</label>';
        html += '<input type="text" name="field_' + si + '_' + ph + '" value="' + escAttr(val) + '" class="w-full border rounded-lg px-3 py-2 text-sm"></div>';
      });
    } else {
      html += '<p class="text-sm text-gray-400 italic">' + escHtml((lang === 'de' ? sec.content_de : sec.content_en) || '').substring(0, 100) + '...</p>';
    }
    html += '</div>';

    // Free-edit mode
    var freeContent = (secData && secData.modified && secData.content) ? secData.content : (lang === 'de' ? sec.content_de : sec.content_en);
    html += '<div id="freeFields' + si + '"' + (isModified ? '' : ' style="display:none"') + '>';
    html += '<textarea name="section_content_' + si + '" rows="5" class="w-full border-2 border-orange-300 rounded-lg px-3 py-2 text-sm bg-orange-50">' + escHtml(freeContent) + '</textarea>';
    html += '<p class="text-xs text-orange-600 mt-1">' + t('mode_free_hint') + '</p>';
    html += '</div>';
    html += '</div>';
  });

  html += '<button type="submit" class="w-full bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition">' + submitLabel + '</button>';
  html += '</form></div>';

  // Right: Live Preview
  html += '<div class="lg:w-1/2">';
  html += '<div class="sticky top-4 bg-white border rounded-xl p-6 shadow-sm" id="livePreview">';
  html += '<h3 class="text-lg font-bold text-brand-700 mb-4">' + t('preview_title') + '</h3>';
  html += '<div id="previewContent">';
  html += buildPreviewHTML(tmpl, existingData, lang);
  html += '</div></div></div></div>';

  return html;
}

/* ── Extract {{placeholders}} from content ── */
function extractPlaceholders(sec) {
  var seen = {};
  var placeholders = [];
  var re = /\{\{(\w+)\}\}/g;
  var match;
  var text = (sec.content_de || '') + (sec.content_en || '');
  while ((match = re.exec(text)) !== null) {
    if (!seen[match[1]]) { seen[match[1]] = true; placeholders.push(match[1]); }
  }
  return placeholders;
}

/* ── Preview HTML ── */
function buildPreviewHTML(tmpl, existingData, lang) {
  var html = '';
  (tmpl.sections || []).forEach(function(sec, si) {
    var secData = (existingData && existingData.sections && existingData.sections[si]) ? existingData.sections[si] : null;
    var isModified = secData && secData.modified;
    var content = lang === 'de' ? sec.content_de : sec.content_en;
    var title = lang === 'de' ? sec.title_de : sec.title_en;

    html += '<div class="mb-4 pb-3 border-b border-gray-100" id="previewSection' + si + '">';
    html += '<h5 class="font-semibold text-sm text-brand-700 mb-1">' + (si + 1) + '. ' + escHtml(title) + '</h5>';
    if (isModified) {
      html += '<div class="bg-orange-50 border border-orange-200 rounded p-2" id="previewFree' + si + '"><span class="text-xs text-orange-500 font-medium">' + t('modified_warning') + '</span><br><span class="text-sm">' + escHtml(secData.content || '') + '</span></div>';
    } else {
      html += '<div class="text-sm text-gray-700" id="previewFill' + si + '" data-original="' + escAttr(content) + '">';
      html += escHtml(content); // Will be live-updated by JS
      html += '</div>';
    }
    html += '</div>';
  });
  return html;
}

/* ── Toggle section between fill/free-edit mode ── */
function toggleSectionMode(si) {
  var isModified = document.getElementById('modified_' + si).value === '1';
  var newModified = !isModified;
  document.getElementById('modified_' + si).value = newModified ? '1' : '0';
  document.getElementById('fillFields' + si).style.display = newModified ? 'none' : 'block';
  document.getElementById('freeFields' + si).style.display = newModified ? 'block' : 'none';
  document.getElementById('toggleBtn' + si).textContent = newModified ? t('toggle_fill_mode') : t('toggle_free_edit');

  var sectionEl = document.getElementById('fillSection' + si);
  if (newModified) {
    sectionEl.classList.add('border-orange-300');
  } else {
    sectionEl.classList.remove('border-orange-300');
  }
  updateLivePreview();
}

/* ── Live preview update ── */
function updateLivePreview() {
  var previewEl = document.getElementById('previewContent');
  if (!previewEl) return;

  // Walk through preview sections
  var sections = previewEl.querySelectorAll('[id^="previewSection"]');
  sections.forEach(function(secEl) {
    var si = parseInt(secEl.id.replace('previewSection', ''));
    var modifiedEl = document.getElementById('modified_' + si);
    if (!modifiedEl) return;
    var isModified = modifiedEl.value === '1';

    var fillDiv = document.getElementById('previewFill' + si);
    var freeDiv = document.getElementById('previewFree' + si);

    if (isModified) {
      if (fillDiv) fillDiv.style.display = 'none';
      // Update free-edit preview
      var textarea = document.getElementsByName('section_content_' + si)[0];
      if (freeDiv && textarea) {
        freeDiv.innerHTML = '<span class="text-xs text-orange-500 font-medium">' + t('modified_warning') + '</span><br><span class="text-sm">' + escHtml(textarea.value) + '</span>';
        freeDiv.style.display = 'block';
      } else if (!freeDiv && textarea) {
        // Create free preview div
        var newFreeDiv = document.createElement('div');
        newFreeDiv.id = 'previewFree' + si;
        newFreeDiv.className = 'bg-orange-50 border border-orange-200 rounded p-2';
        newFreeDiv.innerHTML = '<span class="text-xs text-orange-500 font-medium">' + t('modified_warning') + '</span><br><span class="text-sm">' + escHtml(textarea.value) + '</span>';
        if (fillDiv) fillDiv.parentNode.insertBefore(newFreeDiv, fillDiv.nextSibling);
        fillDiv.style.display = 'none';
      }
    } else {
      if (freeDiv) freeDiv.style.display = 'none';
      if (fillDiv) {
        fillDiv.style.display = 'block';
        // Replace placeholders with field values
        var original = fillDiv.getAttribute('data-original') || '';
        var html = escHtml(original);
        // Find all field inputs for this section
        var fields = document.querySelectorAll('[name^="field_' + si + '_"]');
        fields.forEach(function(input) {
          var key = input.name.replace('field_' + si + '_', '');
          var val = input.value || '___';
          var placeholder = '{{' + key + '}}';
          html = html.split(escHtml(placeholder)).join('<span class="bg-blue-100 text-blue-800 px-1 rounded font-medium text-xs">' + escHtml(val) + '</span>');
        });
        fillDiv.innerHTML = html;
      }
    }
  });
}

// Attach input listeners for live preview
function attachLivePreviewListeners() {
  setTimeout(function() {
    var form = document.getElementById('fillForm');
    if (!form) return;
    form.addEventListener('input', function() { updateLivePreview(); });
    updateLivePreview();
  }, 50);
}

/* ── Build filled_data from form ── */
function buildFilledData(tmpl) {
  var data = { sections: [] };
  (tmpl.sections || []).forEach(function(sec, si) {
    var isModified = (document.getElementById('modified_' + si) || {}).value === '1';
    var entry = { index: si, modified: isModified };
    if (isModified) {
      var ta = document.getElementsByName('section_content_' + si)[0];
      entry.content = ta ? ta.value : '';
    } else {
      entry.fields = {};
      var inputs = document.querySelectorAll('[name^="field_' + si + '_"]');
      inputs.forEach(function(inp) {
        var key = inp.name.replace('field_' + si + '_', '');
        entry.fields[key] = inp.value;
      });
    }
    data.sections.push(entry);
  });
  return data;
}

/* ── Form submit handler ── */
function handleFillSubmit(e, id, action) {
  e.preventDefault();
  var tmpl = getTemplate(id);
  if (!tmpl) return false;
  var filledData = buildFilledData(tmpl);

  if (action === 'fill') {
    // Direct submit (staff mode)
    var sub = {
      template_id: id,
      filled_data: filledData,
      status: 'pending',
      submitter_name: state.submitterName || null,
      review_comment: null,
      review_notes: [],
      reviewed_at: null
    };
    saveSubmission(sub);
    saveFlash(t('submit_success'), 'success');
    navigate('#/home');
  } else if (action === 'salesFill') {
    // Save to sessionStorage, go to preview
    savePreview({ template_id: id, filled_data: filledData });
    navigate('#/sales/preview/' + id);
  } else if (action === 'salesEdit') {
    // Resubmit
    var subId = window._editSubmissionId;
    var sub = getSubmission(subId);
    if (sub) {
      sub.filled_data = filledData;
      sub.status = 'pending';
      sub.submitted_at = new Date().toISOString();
      saveSubmission(sub);
      saveFlash(t('submit_success'), 'success');
      clearPreview();
      navigate('#/sales');
    }
  }
  return false;
}

/* ── Render filled sections (for review & preview pages) ── */
function renderFilledSections(tmpl, filledData, lang) {
  var result = [];
  var sectionsData = (filledData && filledData.sections) ? filledData.sections : [];

  (tmpl.sections || []).forEach(function(sec, i) {
    var secData = sectionsData[i] || null;
    var isModified = secData ? secData.modified : false;
    var contentTmpl = lang === 'de' ? sec.content_de : sec.content_en;

    var renderedHtml;
    if (isModified) {
      renderedHtml = secData.content || '';
    } else {
      renderedHtml = escHtml(contentTmpl);
      var fields = (secData && secData.fields) ? secData.fields : {};
      for (var key in fields) {
        if (fields.hasOwnProperty(key)) {
          var val = fields[key] || '___';
          renderedHtml = renderedHtml.split(escHtml('{{' + key + '}}')).join(
            '<span class="bg-blue-100 text-blue-800 px-1 rounded font-medium">' + escHtml(val) + '</span>'
          );
        }
      }
    }
    result.push({
      title_de: sec.title_de,
      title_en: sec.title_en,
      is_modified: isModified,
      rendered_html: renderedHtml,
      original: isModified ? contentTmpl : ''
    });
  });
  return result;
}
