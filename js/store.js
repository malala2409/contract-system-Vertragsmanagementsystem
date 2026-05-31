/* ═══════════════════════════════════════════
   STORE — localStorage CRUD operations
   ═══════════════════════════════════════════ */

const KEYS = {
  CATEGORIES: 'cm.categories',
  TEMPLATES: 'cm.templates',
  SUBMISSIONS: 'cm.submissions',
  NEXT_IDS: 'cm.nextIds',
  LANG: 'cm.lang',
  SUBMITTER: 'cm.submitter',
};

/* ── State ── */
let state = {
  lang: 'de',
  submitterName: '',
  previewData: null,
  flashMessage: null,
};

function loadState() {
  try {
    state.lang = localStorage.getItem(KEYS.LANG) || 'de';
    state.submitterName = localStorage.getItem(KEYS.SUBMITTER) || '';
  } catch(_) {
    state.lang = 'de';
    state.submitterName = '';
  }
}

function saveFlash(msg, type) {
  state.flashMessage = { text: msg, type: type || 'success' };
}

/* ── Init ── */
function initStore() {
  try {
    // Seed categories if empty
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }
    // Seed templates if empty (first run)
    if (!localStorage.getItem(KEYS.TEMPLATES)) {
      localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(SEED_TEMPLATES));
    }
    // Seed next IDs
    if (!localStorage.getItem(KEYS.NEXT_IDS)) {
      localStorage.setItem(KEYS.NEXT_IDS, JSON.stringify({ templateId: 8, submissionId: 1 }));
    }
    // Set language default
    if (!localStorage.getItem(KEYS.LANG)) {
      localStorage.setItem(KEYS.LANG, 'de');
    }
  } catch(_) {
    // localStorage unavailable
  }
  loadState();
}

/* ── Categories ── */
function getCategories() {
  try { return JSON.parse(localStorage.getItem(KEYS.CATEGORIES) || '[]'); }
  catch(_) { return []; }
}

/* ── Templates ── */
function getTemplates(categoryId) {
  try {
    var templates = JSON.parse(localStorage.getItem(KEYS.TEMPLATES) || '[]');
    if (categoryId) {
      templates = templates.filter(function(t) { return t.category_id === categoryId; });
    }
    return templates.sort(function(a, b) {
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });
  } catch(_) { return []; }
}

function getTemplate(id) {
  var templates = getTemplates();
  for (var i = 0; i < templates.length; i++) {
    if (templates[i].id === id) return templates[i];
  }
  return null;
}

function saveTemplate(t) {
  var templates = getTemplates();
  if (t.id) {
    // Update existing
    for (var i = 0; i < templates.length; i++) {
      if (templates[i].id === t.id) {
        templates[i] = t;
        break;
      }
    }
  } else {
    // Create new
    t.id = nextId('template');
    t.createdAt = new Date().toISOString();
    templates.unshift(t);
  }
  try { localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(templates)); } catch(_) {}
  return t;
}

function deleteTemplate(id) {
  var templates = getTemplates();
  var filtered = templates.filter(function(t) { return t.id !== id; });
  try { localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(filtered)); } catch(_) {}
  return true;
}

/* ── Submissions ── */
function getSubmissions(filter) {
  try {
    var submissions = JSON.parse(localStorage.getItem(KEYS.SUBMISSIONS) || '[]');
    if (filter) {
      if (filter.status) {
        submissions = submissions.filter(function(s) { return s.status === filter.status; });
      }
      if (filter.submitterName) {
        submissions = submissions.filter(function(s) { return s.submitter_name === filter.submitterName; });
      }
    }
    return submissions.sort(function(a, b) {
      return (b.submitted_at || '').localeCompare(a.submitted_at || '');
    });
  } catch(_) { return []; }
}

function getSubmission(id) {
  var submissions = getSubmissions();
  for (var i = 0; i < submissions.length; i++) {
    if (submissions[i].id === id) return submissions[i];
  }
  return null;
}

function saveSubmission(s) {
  var submissions = getSubmissions();
  if (s.id) {
    for (var i = 0; i < submissions.length; i++) {
      if (submissions[i].id === s.id) {
        submissions[i] = s;
        break;
      }
    }
  } else {
    s.id = nextId('submission');
    s.submitted_at = new Date().toISOString();
    submissions.unshift(s);
  }
  try { localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(submissions)); } catch(_) {}
  return s;
}

/* ── ID generator ── */
function nextId(type) {
  try {
    var ids = JSON.parse(localStorage.getItem(KEYS.NEXT_IDS) || '{"templateId":8,"submissionId":1}');
    var key = type === 'template' ? 'templateId' : 'submissionId';
    var id = ids[key];
    ids[key] = id + 1;
    localStorage.setItem(KEYS.NEXT_IDS, JSON.stringify(ids));
    return id;
  } catch(_) { return Date.now(); }
}

/* ── Preview (sessionStorage, transient) ── */
function savePreview(data) {
  try { sessionStorage.setItem('cm.preview', JSON.stringify(data)); } catch(_) {}
}

function loadPreview() {
  try { return JSON.parse(sessionStorage.getItem('cm.preview')); } catch(_) { return null; }
}

function clearPreview() {
  try { sessionStorage.removeItem('cm.preview'); } catch(_) {}
}

/* ── Submitter ── */
function setSubmitter(name) {
  state.submitterName = name;
  try { localStorage.setItem(KEYS.SUBMITTER, name); } catch(_) {}
}

function clearSubmitter() {
  state.submitterName = '';
  try { localStorage.removeItem(KEYS.SUBMITTER); } catch(_) {}
}

/* ── Reset (for testing) ── */
function resetAllData() {
  try {
    Object.values(KEYS).forEach(function(k) { localStorage.removeItem(k); });
  } catch(_) {}
}
