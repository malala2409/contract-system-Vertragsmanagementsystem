/* ═══════════════════════════════════════════
   TEMPLATES — Management list, upload/edit/delete modals
   ═══════════════════════════════════════════ */

let editSectionCounter = 0;

function renderTemplates() {
  var route = getRoute();
  var catId = route.query.category ? parseInt(route.query.category) : null;
  var cats = getCategories();
  var templates = getTemplates(catId);
  var lang = state.lang;

  var html = renderNav();
  html += renderFlash();

  // Header
  html += '<div class="max-w-6xl mx-auto px-4 py-6">';
  html += '<div class="flex items-center justify-between mb-4">';
  html += '<h2 class="text-2xl font-bold text-brand-700">' + t('nav_templates') + '</h2>';
  html += '<div class="flex gap-2">';
  html += '<button onclick="navigate(\'#/templates/create\')" class="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition">+ ' + t('btn_create_template') + '</button>';
  html += '<button onclick="showModal(\'uploadModal\')" class="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-600 transition">' + t('btn_upload') + '</button>';
  html += '</div></div>';

  // Category filter
  html += renderCategoryPills(catId);

  // Template list
  if (templates.length === 0) {
    html += '<div class="text-center py-12 text-gray-400">' + t('no_templates') + '</div>';
  } else {
    html += '<div class="grid md:grid-cols-2 gap-4">';
    templates.forEach(function(tmpl) {
      var cat = cats.find(function(c) { return c.id === tmpl.category_id; });
      var catName = cat ? (lang === 'de' ? cat.name_de : cat.name_en) : '—';
      var sectionNames = (tmpl.sections || []).slice(0, 8).map(function(s) {
        return '<span class="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs mr-1 mb-1">' + escHtml(lang === 'de' ? s.title_de : s.title_en) + '</span>';
      }).join('');
      var moreCount = (tmpl.sections || []).length > 8 ? '<span class="text-xs text-gray-400">+' + ((tmpl.sections || []).length - 8) + '</span>' : '';

      html += '<div class="bg-white rounded-lg border p-4 hover:shadow transition">';
      html += '<div class="flex items-start justify-between mb-2">';
      html += '<div><h3 class="font-semibold text-brand-700">' + escHtml(lang === 'de' ? tmpl.title_de : tmpl.title_en) + '</h3>';
      html += '<span class="text-xs text-gray-400">' + escHtml(catName) + '</span></div>';
      html += '<div class="flex gap-1">';
      html += '<button onclick="openEditModal(' + tmpl.id + ')" class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition" title="' + t('btn_edit_template') + '">✏️</button>';
      if (tmpl.fileData) {
        html += '<button onclick="downloadTemplateFile(' + tmpl.id + ')" class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition" title="' + t('btn_download') + '">📥</button>';
      }
      html += '<button onclick="openDeleteModal(' + tmpl.id + ', \'' + escAttr(lang === 'de' ? tmpl.title_de : tmpl.title_en) + '\')" class="text-xs bg-gray-100 hover:bg-red-100 px-2 py-1 rounded transition" title="' + t('btn_delete') + '">🗑️</button>';
      html += '</div></div>';
      html += '<div class="mb-3">' + sectionNames + moreCount + '</div>';
      html += '<div class="flex gap-2">';
      html += '<a href="#/fill/' + tmpl.id + '" onclick="navigate(\'#/fill/' + tmpl.id + '\')" class="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded hover:bg-brand-100 transition">' + t('btn_fill') + '</a>';
      html += '</div></div>';
    });
    html += '</div>';
  }
  html += '</div>';

  // Upload Modal
  html += renderUploadModal(cats);
  // Edit Modal (placeholder, filled by JS)
  html += '<div id="editModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-y-auto" onclick="if(event.target===this)hideModal(\'editModal\')">';
  html += '<div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 my-8" onclick="event.stopPropagation()">';
  html += '<div id="editModalContent" class="p-6"></div>';
  html += '</div></div>';
  // Delete Modal
  html += '<div id="deleteModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onclick="if(event.target===this)hideModal(\'deleteModal\')">';
  html += '<div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6" onclick="event.stopPropagation()">';
  html += '<h3 class="text-lg font-bold text-red-600 mb-4">' + t('confirm_delete') + '</h3>';
  html += '<p id="deleteTargetName" class="text-gray-700 mb-4"></p>';
  html += '<label class="block text-sm text-gray-600 mb-2">' + t('password_prompt') + '</label>';
  html += '<input type="password" id="deletePassword" class="w-full border rounded-lg px-3 py-2 mb-4" placeholder="1111">';
  html += '<div class="flex gap-2 justify-end">';
  html += '<button onclick="hideModal(\'deleteModal\')" class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">' + t('btn_back') + '</button>';
  html += '<button onclick="confirmDelete()" class="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">' + t('btn_delete') + '</button>';
  html += '</div></div></div>';

  return html;
}

/* ── Upload Modal ── */
function renderUploadModal(cats) {
  var html = '<div id="uploadModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-y-auto" onclick="if(event.target===this)hideModal(\'uploadModal\')">';
  html += '<div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 my-8 p-6" onclick="event.stopPropagation()">';
  html += '<h3 class="text-xl font-bold text-brand-700 mb-4">' + t('btn_upload') + '</h3>';
  html += '<form onsubmit="handleUpload(event)" class="space-y-4">';
  html += '<div class="grid grid-cols-2 gap-4">';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">Titel (DE)</label><input name="title_de" required class="w-full border rounded-lg px-3 py-2"></div>';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label><input name="title_en" class="w-full border rounded-lg px-3 py-2"></div>';
  html += '</div>';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">' + t('label_category') + '</label><select name="category_id" required class="w-full border rounded-lg px-3 py-2">';
  cats.forEach(function(c) {
    html += '<option value="' + c.id + '">' + escHtml(c.name_de) + ' / ' + escHtml(c.name_en) + '</option>';
  });
  html += '</select></div>';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">' + t('label_sections_json') + '</label>';
  html += '<textarea name="sections" rows="8" class="w-full border rounded-lg px-3 py-2 font-mono text-sm" placeholder=\'[{"title_de":"...","title_en":"...","content_de":"...","content_en":"...","fields":[...]}]\'></textarea></div>';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">Datei (optional, DOCX/PDF/JSON)</label><input type="file" name="file" accept=".docx,.doc,.pdf,.json" class="w-full border rounded-lg px-3 py-2"></div>';
  html += '<div class="flex gap-2 justify-end">';
  html += '<button type="button" onclick="hideModal(\'uploadModal\')" class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">' + t('btn_back') + '</button>';
  html += '<button type="submit" class="px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700">' + t('btn_upload') + '</button>';
  html += '</div></form></div></div>';
  return html;
}

/* ── Upload handler ── */
function handleUpload(e) {
  e.preventDefault();
  var form = e.target;
  var titleDe = form.title_de.value.trim();
  var titleEn = form.title_en.value.trim() || titleDe;
  var catId = parseInt(form.category_id.value);
  var sectionsStr = form.sections.value.trim();
  var sections = [];
  if (sectionsStr) {
    try { sections = JSON.parse(sectionsStr); } catch(_) { saveFlash('Invalid JSON format.', 'error'); render(); return; }
  }
  var fileInput = form.file;
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();
    reader.onload = function() {
      var tmpl = {
        category_id: catId,
        title_de: titleDe,
        title_en: titleEn,
        sections: sections,
        fileData: reader.result,
        fileName: fileInput.files[0].name
      };
      saveTemplate(tmpl);
      saveFlash(t('upload_success'), 'success');
      hideModal('uploadModal');
      render();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    var tmpl = {
      category_id: catId,
      title_de: titleDe,
      title_en: titleEn,
      sections: sections,
      fileData: null,
      fileName: null
    };
    saveTemplate(tmpl);
    saveFlash(t('upload_success'), 'success');
    hideModal('uploadModal');
    render();
  }
}

/* ── Edit Modal ── */
function openEditModal(id) {
  editSectionCounter = 0;
  var tmpl = getTemplate(id);
  if (!tmpl) return;
  var cats = getCategories();
  var lang = state.lang;

  var html = '<h3 class="text-xl font-bold text-brand-700 mb-4">' + t('btn_edit_template') + '</h3>';
  html += '<form onsubmit="handleEdit(event, ' + id + ')" class="space-y-4">';
  html += '<div class="grid grid-cols-2 gap-4">';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">Titel (DE)</label><input name="title_de" value="' + escAttr(tmpl.title_de) + '" required class="w-full border rounded-lg px-3 py-2"></div>';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label><input name="title_en" value="' + escAttr(tmpl.title_en) + '" class="w-full border rounded-lg px-3 py-2"></div>';
  html += '</div>';
  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">' + t('label_category') + '</label><select name="category_id" class="w-full border rounded-lg px-3 py-2">';
  cats.forEach(function(c) {
    html += '<option value="' + c.id + '"' + (c.id === tmpl.category_id ? ' selected' : '') + '>' + escHtml(c.name_de) + ' / ' + escHtml(c.name_en) + '</option>';
  });
  html += '</select></div>';

  // Visual Section Editor
  html += '<div class="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">';
  html += '<h4 class="font-semibold text-gray-700 mb-3">' + t('label_sections_json') + '</h4>';
  html += '<div id="sectionEditor">';
  if (tmpl.sections && tmpl.sections.length > 0) {
    tmpl.sections.forEach(function(sec) {
      html += buildSectionEditor(sec);
    });
  }
  html += '</div>';
  html += '<button type="button" onclick="addSectionEditor()" class="mt-3 text-sm bg-brand-100 text-brand-700 px-3 py-1 rounded hover:bg-brand-200 transition">+ ' + t('add_section') + '</button>';
  html += '</div>';

  html += '<div><label class="block text-sm font-medium text-gray-700 mb-1">Datei ersetzen (optional)</label><input type="file" name="file" accept=".docx,.doc,.pdf,.json" class="w-full border rounded-lg px-3 py-2"></div>';
  html += '<input type="hidden" name="sections" id="editSectionsJSON">';
  html += '<div class="flex gap-2 justify-end">';
  html += '<button type="button" onclick="hideModal(\'editModal\')" class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">' + t('btn_back') + '</button>';
  html += '<button type="submit" class="px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700">' + t('btn_save_changes') + '</button>';
  html += '</div></form>';

  document.getElementById('editModalContent').innerHTML = html;
  showModal('editModal');
}

function buildSectionEditor(sec) {
  var idx = editSectionCounter++;
  var html = '<div class="bg-white border rounded-lg p-3 mb-3" id="secBlock' + idx + '">';
  html += '<div class="flex justify-between items-center mb-2">';
  html += '<span class="text-sm font-medium text-gray-600">' + t('section_title') + ' ' + (idx + 1) + '</span>';
  html += '<button type="button" onclick="document.getElementById(\'secBlock' + idx + '\').remove()" class="text-xs text-red-500 hover:text-red-700">' + t('remove_section') + '</button>';
  html += '</div>';
  html += '<div class="grid grid-cols-2 gap-2 mb-2">';
  html += '<input name="sec' + idx + '_title_de" value="' + escAttr(sec.title_de || '') + '" placeholder="Titel (DE)" class="border rounded px-2 py-1 text-sm">';
  html += '<input name="sec' + idx + '_title_en" value="' + escAttr(sec.title_en || '') + '" placeholder="Title (EN)" class="border rounded px-2 py-1 text-sm">';
  html += '</div>';
  html += '<textarea name="sec' + idx + '_content_de" rows="3" placeholder="' + t('content_de') + '" class="w-full border rounded px-2 py-1 text-sm mb-1">' + escHtml(sec.content_de || '') + '</textarea>';
  html += '<textarea name="sec' + idx + '_content_en" rows="3" placeholder="' + t('content_en') + '" class="w-full border rounded px-2 py-1 text-sm mb-2">' + escHtml(sec.content_en || '') + '</textarea>';

  // Fields
  html += '<div id="secFields' + idx + '" class="ml-2">';
  if (sec.fields && sec.fields.length > 0) {
    sec.fields.forEach(function(f, fi) {
      html += buildFieldEditor(idx, fi, f);
    });
  }
  html += '</div>';
  html += '<input type="hidden" name="sec' + idx + '_field_count" id="secFieldCount' + idx + '" value="' + (sec.fields ? sec.fields.length : 0) + '">';
  html += '<button type="button" onclick="addFieldEditor(' + idx + ')" class="text-xs text-brand-600 hover:text-brand-800 mt-1">+ ' + t('add_field') + '</button>';
  html += '</div>';
  return html;
}

function buildFieldEditor(secIdx, fieldIdx, f) {
  return '<div class="flex gap-2 items-start mb-1" id="fieldBlock' + secIdx + '_' + fieldIdx + '">' +
    '<input name="sec' + secIdx + '_field' + fieldIdx + '_key" value="' + escAttr(f.key || '') + '" placeholder="' + t('field_key') + '" class="border rounded px-1 py-0.5 text-xs w-24">' +
    '<select name="sec' + secIdx + '_field' + fieldIdx + '_type" class="border rounded px-1 py-0.5 text-xs">' +
      '<option value="text"' + (f.type === 'text' ? ' selected' : '') + '>text</option>' +
      '<option value="textarea"' + (f.type === 'textarea' ? ' selected' : '') + '>textarea</option>' +
      '<option value="date"' + (f.type === 'date' ? ' selected' : '') + '>date</option>' +
      '<option value="select"' + (f.type === 'select' ? ' selected' : '') + '>select</option>' +
    '</select>' +
    '<input name="sec' + secIdx + '_field' + fieldIdx + '_label_de" value="' + escAttr(f.label_de || '') + '" placeholder="Label DE" class="border rounded px-1 py-0.5 text-xs w-24">' +
    '<input name="sec' + secIdx + '_field' + fieldIdx + '_label_en" value="' + escAttr(f.label_en || '') + '" placeholder="Label EN" class="border rounded px-1 py-0.5 text-xs w-24">' +
    '<input name="sec' + secIdx + '_field' + fieldIdx + '_options" value="' + escAttr(f.options ? f.options.join(',') : '') + '" placeholder="Options (comma-sep)" class="border rounded px-1 py-0.5 text-xs w-32">' +
    '<button type="button" onclick="document.getElementById(\'fieldBlock' + secIdx + '_' + fieldIdx + '\').remove();updateFieldCount(' + secIdx + ')" class="text-xs text-red-400 hover:text-red-600">✕</button>' +
    '</div>';
}

function addSectionEditor() {
  var container = document.getElementById('sectionEditor');
  var div = document.createElement('div');
  div.innerHTML = buildSectionEditor({ title_de:'', title_en:'', content_de:'', content_en:'', fields:[] });
  container.appendChild(div.firstElementChild);
}

function addFieldEditor(secIdx) {
  var container = document.getElementById('secFields' + secIdx);
  var fc = parseInt(document.getElementById('secFieldCount' + secIdx).value) || 0;
  var div = document.createElement('div');
  div.innerHTML = buildFieldEditor(secIdx, fc, { key:'', type:'text', label_de:'', label_en:'', options:[] });
  container.appendChild(div.firstElementChild);
  document.getElementById('secFieldCount' + secIdx).value = fc + 1;
}

function updateFieldCount(secIdx) {
  var container = document.getElementById('secFields' + secIdx);
  var blocks = container.querySelectorAll('[id^="fieldBlock' + secIdx + '_"]');
  document.getElementById('secFieldCount' + secIdx).value = blocks.length;
}

function buildEditSectionsJSON() {
  var sections = [];
  var i = 0;
  while (true) {
    var titleDeEl = document.getElementsByName('sec' + i + '_title_de')[0];
    var contentDeEl = document.getElementsByName('sec' + i + '_content_de')[0];
    if (!titleDeEl && !contentDeEl) break;
    var titleDe = (titleDeEl && titleDeEl.value || '').trim();
    var contentDe = (contentDeEl && contentDeEl.value || '');
    if (!titleDe && !contentDe) { i++; continue; }
    var titleEnEl = document.getElementsByName('sec' + i + '_title_en')[0];
    var contentEnEl = document.getElementsByName('sec' + i + '_content_en')[0];
    var titleEn = (titleEnEl && titleEnEl.value || '').trim() || titleDe;
    var contentEn = (contentEnEl && contentEnEl.value || '') || contentDe;

    var fc = parseInt((document.getElementById('secFieldCount' + i) || {}).value) || 0;
    if (fc === 0) {
      // Check DOM for actual field blocks
      var fieldBlocks = document.querySelectorAll('[id^="fieldBlock' + i + '_"]');
      fc = fieldBlocks.length;
    }
    var fields = [];
    for (var fi = 0; fi < fc; fi++) {
      var keyEl = document.getElementsByName('sec' + i + '_field' + fi + '_key')[0];
      if (!keyEl || !keyEl.value.trim()) continue;
      var typeEl = document.getElementsByName('sec' + i + '_field' + fi + '_type')[0];
      var labelDeEl = document.getElementsByName('sec' + i + '_field' + fi + '_label_de')[0];
      var labelEnEl = document.getElementsByName('sec' + i + '_field' + fi + '_label_en')[0];
      var optsEl = document.getElementsByName('sec' + i + '_field' + fi + '_options')[0];
      var opts = (optsEl && optsEl.value || '').split(',').map(function(o) { return o.trim(); }).filter(Boolean);
      fields.push({
        key: keyEl.value.trim(),
        type: (typeEl && typeEl.value) || 'text',
        label_de: (labelDeEl && labelDeEl.value || '').trim() || keyEl.value.trim(),
        label_en: (labelEnEl && labelEnEl.value || '').trim() || keyEl.value.trim(),
        options: opts,
        required: false
      });
    }
    sections.push({
      title_de: titleDe, title_en: titleEn,
      content_de: contentDe, content_en: contentEn,
      fields: fields
    });
    i++;
  }
  var el = document.getElementById('editSectionsJSON');
  if (el) el.value = JSON.stringify(sections);
  return JSON.stringify(sections);
}

function handleEdit(e, id) {
  e.preventDefault();
  var form = e.target;
  var tmpl = getTemplate(id);
  if (!tmpl) return;
  tmpl.title_de = form.title_de.value.trim();
  tmpl.title_en = (form.title_en.value || '').trim() || tmpl.title_de;
  tmpl.category_id = parseInt(form.category_id.value);

  var sectionsJson = buildEditSectionsJSON();
  var sections = JSON.parse(sectionsJson);
  if (sections.length > 0) tmpl.sections = sections;

  var fileInput = form.file;
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();
    reader.onload = function() {
      tmpl.fileData = reader.result;
      tmpl.fileName = fileInput.files[0].name;
      saveTemplate(tmpl);
      saveFlash(t('template_updated'), 'success');
      hideModal('editModal');
      render();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    saveTemplate(tmpl);
    saveFlash(t('template_updated'), 'success');
    hideModal('editModal');
    render();
  }
}

/* ── Delete ── */
function openDeleteModal(id, name) {
  document.getElementById('deleteTargetName').textContent = name;
  document.getElementById('deletePassword').value = '';
  window._deleteTargetId = id;
  showModal('deleteModal');
}

function confirmDelete() {
  var pw = document.getElementById('deletePassword').value;
  if (pw !== '1111') {
    saveFlash(t('wrong_password'), 'error');
    hideModal('deleteModal');
    render();
    return;
  }
  deleteTemplate(window._deleteTargetId);
  saveFlash(t('delete_success'), 'success');
  hideModal('deleteModal');
  window._deleteTargetId = null;
  render();
}

/* ── Download file ── */
function downloadTemplateFile(id) {
  var tmpl = getTemplate(id);
  if (!tmpl || !tmpl.fileData) return;
  var a = document.createElement('a');
  a.href = tmpl.fileData;
  a.download = tmpl.fileName || 'template';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
