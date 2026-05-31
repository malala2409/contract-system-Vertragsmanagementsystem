/* ═══════════════════════════════════════════
   EDITOR — Drag-and-drop template creation wizard
   Ported from template_editor.html
   ═══════════════════════════════════════════ */

let editorSections = [];
let draggedModule = null;

/* ── Pre-built modules (from template_editor.html MODULES object) ── */
const MODULES = {
  common: [
    { title_de: 'Parteien', title_en: 'Parties', content_de: 'Zwischen {{party_a_name}}, {{party_a_address}} (nachfolgend "Partei A") und {{party_b_name}}, {{party_b_address}} (nachfolgend "Partei B") wird folgender Vertrag geschlossen.', content_en: 'Between {{party_a_name}}, {{party_a_address}} (hereinafter "Party A") and {{party_b_name}}, {{party_b_address}} (hereinafter "Party B") the following agreement is made.', fields: [] },
    { title_de: 'Präambel', title_en: 'Preamble', content_de: 'Die Parteien beabsichtigen, eine vertragliche Zusammenarbeit im Bereich {{scope_of_cooperation}} zu vereinbaren.', content_en: 'The parties intend to establish a contractual cooperation in the field of {{scope_of_cooperation}}.', fields: [] },
    { title_de: 'Vertragsgegenstand', title_en: 'Subject Matter', content_de: 'Gegenstand dieses Vertrages ist {{contract_subject}}. Die näheren Einzelheiten ergeben sich aus den nachfolgenden Bestimmungen.', content_en: 'The subject matter of this agreement is {{contract_subject}}. Further details are set out in the following provisions.', fields: [] },
    { title_de: 'Laufzeit', title_en: 'Term', content_de: 'Dieser Vertrag beginnt am {{start_date}} und läuft bis zum {{end_date}}. Er verlängert sich automatisch um {{renewal_period}}, sofern er nicht mit einer Frist von {{notice_period}} gekündigt wird.', content_en: 'This agreement commences on {{start_date}} and continues until {{end_date}}. It shall automatically renew for {{renewal_period}} unless terminated with {{notice_period}} notice.', fields: [] },
    { title_de: 'Vergütung', title_en: 'Remuneration', content_de: 'Die Vergütung beträgt {{amount}} {{currency}} ({{tax_note}}). Die Zahlung ist fällig innerhalb von {{payment_days}} Tagen nach Rechnungsstellung.', content_en: 'The remuneration amounts to {{amount}} {{currency}} ({{tax_note}}). Payment is due within {{payment_days}} days of invoicing.', fields: [] },
    { title_de: 'Haftung', title_en: 'Liability', content_de: 'Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, soweit gesetzlich zulässig. Die Haftungshöchstsumme beträgt {{liability_cap}} {{currency}}.', content_en: 'Liability is limited to intent and gross negligence to the extent permitted by law. The maximum liability amount is {{liability_cap}} {{currency}}.', fields: [] },
    { title_de: 'Vertraulichkeit', title_en: 'Confidentiality', content_de: 'Die Parteien verpflichten sich, alle im Rahmen dieses Vertrages erhaltenen Informationen vertraulich zu behandeln. Diese Verpflichtung gilt für einen Zeitraum von {{confidentiality_years}} Jahren nach Vertragsende.', content_en: 'The parties undertake to treat all information received under this agreement as confidential. This obligation continues for {{confidentiality_years}} years after termination.', fields: [] },
    { title_de: 'Schlussbestimmungen', title_en: 'Final Provisions', content_de: 'Änderungen dieses Vertrages bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam. Es gilt deutsches Recht. Gerichtsstand ist {{court_location}}.', content_en: 'Amendments to this agreement require written form. If any provision is invalid, the remainder of the agreement remains effective. German law applies. Place of jurisdiction is {{court_location}}.', fields: [] },
  ],
  kaufvertrag: [
    { title_de: 'Kaufgegenstand', title_en: 'Purchase Object', content_de: 'Der Verkäufer verkauft an den Käufer: {{item_description}}, Menge: {{quantity}} {{quantity_unit}}.', content_en: 'The seller sells to the buyer: {{item_description}}, quantity: {{quantity}} {{quantity_unit}}.', fields: [] },
    { title_de: 'Kaufpreis', title_en: 'Purchase Price', content_de: 'Der Kaufpreis beträgt {{purchase_price}} {{currency}} zzgl. {{vat_rate}}% USt. Zahlungsbedingung: {{payment_method}}.', content_en: 'The purchase price is {{purchase_price}} {{currency}} plus {{vat_rate}}% VAT. Payment terms: {{payment_method}}.', fields: [] },
    { title_de: 'Gefahrübergang', title_en: 'Transfer of Risk', content_de: 'Die Gefahr geht auf den Käufer über mit {{risk_transfer_point}}. Lieferbedingung: {{incoterm}}.', content_en: 'Risk passes to the buyer upon {{risk_transfer_point}}. Delivery terms: {{incoterm}}.', fields: [] },
    { title_de: 'Eigentumsvorbehalt', title_en: 'Retention of Title', content_de: 'Die Ware bleibt bis zur vollständigen Bezahlung Eigentum des Verkäufers ({{retention_of_title}}).', content_en: 'The goods remain the property of the seller until full payment ({{retention_of_title}}).', fields: [] },
  ],
  mietvertrag: [
    { title_de: 'Mietgegenstand', title_en: 'Leased Property', content_de: 'Vermietet wird {{property_description}}, bestehend aus {{rooms}} Räumen mit einer Gesamtfläche von {{area}} m².', content_en: 'The leased property is {{property_description}}, consisting of {{rooms}} rooms with a total area of {{area}} m².', fields: [] },
    { title_de: 'Mietzins', title_en: 'Rent', content_de: 'Die monatliche Miete beträgt {{cold_rent}} {{currency}} zzgl. {{utilities_advance}} {{currency}} Nebenkostenvorauszahlung. Die Miete ist jeweils bis zum {{rent_payment_day}}. des Monats zu zahlen.', content_en: 'The monthly rent is {{cold_rent}} {{currency}} plus {{utilities_advance}} {{currency}} utility advance. Rent is payable by the {{rent_payment_day}} of each month.', fields: [] },
    { title_de: 'Kaution', title_en: 'Deposit', content_de: 'Die Mietsicherheit beträgt {{deposit_months}} Monatskaltmieten ({{deposit_method}}).', content_en: 'The security deposit is {{deposit_months}} months cold rent ({{deposit_method}}).', fields: [] },
    { title_de: 'Nutzung', title_en: 'Use', content_de: 'Die Mietsache darf genutzt werden als {{lease_purpose}}. Tierhaltung: {{pets_allowed}}.', content_en: 'The property may be used as {{lease_purpose}}. Pets: {{pets_allowed}}.', fields: [] },
  ],
  dienstvertrag: [
    { title_de: 'Leistungsbeschreibung', title_en: 'Service Description', content_de: 'Der Auftragnehmer erbringt folgende Dienstleistungen: {{service_description}}. Die Leistungen werden nach dem anerkannten Stand der Technik ausgeführt.', content_en: 'The contractor provides the following services: {{service_description}}. Services are performed according to the recognized state of the art.', fields: [] },
    { title_de: 'Mitwirkungspflichten', title_en: 'Obligations to Cooperate', content_de: 'Der Auftraggeber stellt folgende Informationen und Zugänge bereit: {{client_obligations}}.', content_en: 'The client shall provide the following information and access: {{client_obligations}}.', fields: [] },
    { title_de: 'Abnahme', title_en: 'Acceptance', content_de: 'Die Abnahme der Leistungen erfolgt nach {{acceptance_procedure}}. Abnahmefrist: {{acceptance_period}} Tage.', content_en: 'Acceptance of services follows {{acceptance_procedure}}. Acceptance period: {{acceptance_period}} days.', fields: [] },
  ],
  darlehensvertrag: [
    { title_de: 'Darlehensbetrag', title_en: 'Loan Amount', content_de: 'Der Darlehensgeber gewährt dem Darlehensnehmer ein Darlehen in Höhe von {{loan_amount}} {{currency}}.', content_en: 'The lender grants the borrower a loan in the amount of {{loan_amount}} {{currency}}.', fields: [] },
    { title_de: 'Zinsen', title_en: 'Interest', content_de: 'Der Zinssatz beträgt {{interest_rate}}% p.a. ({{interest_calculation_method}}). Zinsbindung: {{interest_fix_period}}.', content_en: 'The interest rate is {{interest_rate}}% p.a. ({{interest_calculation_method}}). Fixed interest period: {{interest_fix_period}}.', fields: [] },
    { title_de: 'Rückzahlung', title_en: 'Repayment', content_de: 'Die Rückzahlung erfolgt in {{installment_count}} Raten zu je {{installment_amount}} {{currency}} beginnend am {{first_payment_date}}.', content_en: 'Repayment is made in {{installment_count}} installments of {{installment_amount}} {{currency}} each, starting on {{first_payment_date}}.', fields: [] },
  ],
  nda: [
    { title_de: 'Vertrauliche Informationen', title_en: 'Confidential Information', content_de: '"Vertrauliche Informationen" umfassen alle Informationen, die eine Partei der anderen offenlegt, unabhängig von der Form der Übermittlung. Dies umfasst insbesondere {{confidential_info_examples}}.', content_en: '"Confidential Information" includes all information disclosed by one party to the other, regardless of the form of transmission. This includes in particular {{confidential_info_examples}}.', fields: [] },
    { title_de: 'Nutzungsbeschränkung', title_en: 'Use Restriction', content_de: 'Die empfangende Partei darf vertrauliche Informationen ausschließlich zum Zweck {{purpose_of_disclosure}} nutzen.', content_en: 'The receiving party may use confidential information solely for the purpose of {{purpose_of_disclosure}}.', fields: [] },
    { title_de: 'Vertragsstrafe', title_en: 'Contractual Penalty', content_de: 'Für jeden Fall der schuldhaften Verletzung dieser Vereinbarung verpflichtet sich die verletzende Partei zur Zahlung einer Vertragsstrafe in Höhe von {{nda_penalty_amount}} {{nda_penalty_currency}}.', content_en: 'For each culpable breach of this agreement, the breaching party undertakes to pay a contractual penalty of {{nda_penalty_amount}} {{nda_penalty_currency}}.', fields: [] },
  ],
  arbeitsvertrag: [
    { title_de: 'Tätigkeitsbeschreibung', title_en: 'Job Description', content_de: 'Der Arbeitnehmer wird als {{job_title}} eingestellt. Zu seinen Aufgaben gehören insbesondere: {{job_duties}}.', content_en: 'The employee is hired as {{job_title}}. Duties include in particular: {{job_duties}}.', fields: [] },
    { title_de: 'Arbeitszeit', title_en: 'Working Hours', content_de: 'Die regelmäßige wöchentliche Arbeitszeit beträgt {{weekly_hours}} Stunden. Arbeitszeitmodell: {{working_time_model}}. Gleitzeit: {{flexitime}}. Home-Office: {{home_office_policy}}.', content_en: 'Regular weekly working hours are {{weekly_hours}} hours. Working time model: {{working_time_model}}. Flexitime: {{flexitime}}. Home office: {{home_office_policy}}.', fields: [] },
    { title_de: 'Vergütung', title_en: 'Compensation', content_de: 'Das Bruttogehalt beträgt {{salary}} {{currency}} pro Monat. 13. Gehalt: {{bonus_13th}}. Gehaltsüberprüfung: {{salary_review}}.', content_en: 'The gross salary is {{salary}} {{currency}} per month. 13th salary: {{bonus_13th}}. Salary review: {{salary_review}}.', fields: [] },
    { title_de: 'Urlaub', title_en: 'Vacation', content_de: 'Der jährliche Urlaubsanspruch beträgt {{vacation_days}} Arbeitstage. Unbezahlter Urlaub: {{unpaid_leave}}.', content_en: 'The annual vacation entitlement is {{vacation_days}} working days. Unpaid leave: {{unpaid_leave}}.', fields: [] },
  ],
  auftrag: [
    { title_de: 'Auftragsumfang', title_en: 'Mandate Scope', content_de: 'Der Auftraggeber beauftragt den Auftragnehmer mit {{mandate_type}} im Bereich {{area_of_mandate}}.', content_en: 'The client mandates the contractor with {{mandate_type}} in the area of {{area_of_mandate}}.', fields: [] },
    { title_de: 'Weisungsrecht', title_en: 'Right of Instruction', content_de: 'Der Auftragnehmer handelt nach den Weisungen des Auftraggebers ({{instruction_form}}).', content_en: 'The contractor acts according to the instructions of the client ({{instruction_form}}).', fields: [] },
    { title_de: 'Berichterstattung', title_en: 'Reporting', content_de: 'Der Auftragnehmer berichtet dem Auftraggeber {{reporting_frequency}} über den Fortschritt.', content_en: 'The contractor reports to the client {{reporting_frequency}} on progress.', fields: [] },
  ],
};

/* ── Current category slug for module filtering ── */
let editorCategorySlug = 'kaufvertrag';

function renderTemplateEditor() {
  var cats = getCategories();
  var lang = state.lang;

  var html = renderNav();
  html += renderFlash();

  html += '<div class="max-w-6xl mx-auto px-4 py-6">';
  html += '<a href="#/templates" onclick="navigate(\'#/templates\')" class="text-brand-600 hover:text-brand-800 text-sm mb-3 inline-block">&larr; ' + t('btn_back') + '</a>';
  html += '<h2 class="text-2xl font-bold text-brand-700 mb-4">' + t('create_template_title') + '</h2>';

  // Three-column layout
  html += '<div class="flex flex-col lg:flex-row gap-4">';

  // LEFT: Module palette
  html += '<div class="lg:w-64 flex-shrink-0">';
  html += '<div class="bg-white border rounded-xl p-4">';
  html += '<h4 class="font-semibold text-gray-700 mb-2 text-sm">' + t('module_palette') + '</h4>';
  html += '<select onchange="filterEditorModules(this.value)" class="w-full border rounded-lg px-2 py-1 text-sm mb-3">';
  cats.forEach(function(c) {
    html += '<option value="' + c.slug + '"' + (c.slug === editorCategorySlug ? ' selected' : '') + '>' + escHtml(lang === 'de' ? c.name_de : c.name_en) + '</option>';
  });
  html += '</select>';
  html += '<div id="moduleList" class="space-y-2 max-h-96 overflow-y-auto">';
  html += renderModuleList(editorCategorySlug, lang);
  html += '</div></div></div>';

  // CENTER: Editor drop zone
  html += '<div class="flex-1">';
  html += '<div class="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 min-h-[500px]" id="editorDropZone" ondragover="allowDrop(event)" ondrop="handleDrop(event)">';
  html += '<h4 class="font-semibold text-gray-700 mb-4">' + t('drag_here') + '</h4>';
  html += '<div id="editorSectionList">';
  html += renderEditorSections(lang);
  html += '</div>';
  html += '<div id="editorEmpty" class="text-center py-12 text-gray-400 text-sm' + (editorSections.length > 0 ? ' hidden' : '') + '">' +
    (lang === 'de' ? 'Module aus der linken Palette hierher ziehen' : 'Drag modules from the left palette here') + '</div>';
  html += '</div></div>';

  // RIGHT: Table of Contents
  html += '<div class="lg:w-56 flex-shrink-0">';
  html += '<div class="bg-white border rounded-xl p-4 sticky top-4">';
  html += '<h4 class="font-semibold text-gray-700 mb-2 text-sm">' + t('toc') + '</h4>';
  html += '<ol id="tocList" class="text-sm text-gray-600 space-y-1 list-decimal list-inside">';
  if (editorSections.length === 0) {
    html += '<li class="text-gray-400 italic">' + (lang === 'de' ? 'Leer' : 'Empty') + '</li>';
  } else {
    editorSections.forEach(function(sec, i) {
      html += '<li class="truncate">' + escHtml(lang === 'de' ? sec.title_de : sec.title_en) + '</li>';
    });
  }
  html += '</ol></div></div>';
  html += '</div>';

  // Preview modal
  html += '<div id="editorPreviewModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-y-auto" onclick="if(event.target===this)hideModal(\'editorPreviewModal\')">';
  html += '<div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 my-8 p-6" onclick="event.stopPropagation()">';
  html += '<h3 class="text-xl font-bold text-brand-700 mb-4">' + t('preview_title') + '</h3>';
  html += '<div id="editorPreviewContent" class="space-y-4 text-sm text-gray-700"></div>';
  html += '<div class="flex gap-2 justify-end mt-4">';
  html += '<button onclick="hideModal(\'editorPreviewModal\')" class="px-4 py-2 border rounded-lg text-sm">' + t('btn_back') + '</button>';
  html += '</div></div></div>';

  // Bottom action bar
  html += '<div class="max-w-6xl mx-auto px-4 mt-6 flex gap-3 justify-end">';
  html += '<button onclick="editorPreview()" class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">' + t('preview_title') + '</button>';
  html += '<button onclick="saveEditorTemplate()" class="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition">' + t('btn_save_changes') + '</button>';
  html += '</div>';

  // Hidden form for category_id
  html += '<form id="editorSaveForm" style="display:none">';
  html += '<input type="hidden" name="title_de" id="editorTitleDe">';
  html += '<input type="hidden" name="title_en" id="editorTitleEn">';
  html += '<input type="hidden" name="category_id" id="editorCatId">';
  html += '<input type="hidden" name="sections" id="editorSectionsJson">';
  html += '</form>';

  html += '</div>';
  return html;
}

function renderModuleList(slug, lang) {
  var mods = MODULES[slug] || MODULES.common || [];
  var allMods = mods.concat(MODULES.common || []);
  var html = '';
  allMods.forEach(function(m, i) {
    var moduleId = slug + '_' + i;
    html += '<div class="border rounded-lg p-2 text-sm cursor-grab hover:shadow hover:border-brand-300 transition bg-gray-50" draggable="true" ondragstart="dragStart(event, \'' + moduleId + '\')" ondragend="dragEnd(event)" data-module="' + moduleId + '">';
    html += '<div class="font-medium text-brand-700 text-xs">' + escHtml(lang === 'de' ? m.title_de : m.title_en) + '</div>';
    html += '<div class="text-gray-400 text-xs mt-1 truncate">' + escHtml((lang === 'de' ? m.content_de : m.content_en).substring(0, 50)) + '...</div>';
    html += '</div>';
  });
  return html;
}

function renderEditorSections(lang) {
  var html = '';
  editorSections.forEach(function(sec, i) {
    html += '<div class="bg-gray-50 border rounded-lg p-4 mb-3" id="editorSec' + i + '">';
    html += '<div class="flex items-center justify-between mb-2">';
    html += '<input class="font-semibold text-sm text-brand-700 bg-transparent border-b border-gray-200 w-2/3" value="' + escAttr(lang === 'de' ? sec.title_de : sec.title_en) + '" onchange="updateEditorSectionTitle(' + i + ', this.value, \'' + lang + '\')">';
    html += '<div class="flex gap-1">';
    html += '<button onclick="moveEditorSection(' + i + ', -1)" class="text-xs text-gray-400 hover:text-gray-600 px-1">▲</button>';
    html += '<button onclick="moveEditorSection(' + i + ', 1)" class="text-xs text-gray-400 hover:text-gray-600 px-1">▼</button>';
    html += '<button onclick="removeEditorSection(' + i + ')" class="text-xs text-red-400 hover:text-red-600 px-1">✕</button>';
    html += '</div></div>';
    html += '<textarea rows="4" class="w-full border rounded px-2 py-1 text-sm" onchange="updateEditorSectionContent(' + i + ', this.value, \'' + lang + '\')">' + escHtml(lang === 'de' ? sec.content_de : sec.content_en) + '</textarea>';
    html += '</div>';
  });
  return html;
}

function filterEditorModules(slug) {
  editorCategorySlug = slug;
  document.getElementById('moduleList').innerHTML = renderModuleList(slug, state.lang);
}

function dragStart(e, moduleId) {
  draggedModule = moduleId;
  e.dataTransfer.effectAllowed = 'copy';
  e.target.style.opacity = '0.5';
}

function dragEnd(e) {
  e.target.style.opacity = '1';
  draggedModule = null;
}

function allowDrop(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
  e.preventDefault();
  if (!draggedModule) return;
  // Parse module ID: slug_index
  var parts = draggedModule.split('_');
  var idx = parseInt(parts.pop());
  var slug = parts.join('_');
  var mods = MODULES[slug] || MODULES.common || [];
  var mod = mods[idx];
  if (!mod) {
    // Try common modules
    mods = MODULES.common || [];
    mod = mods[idx];
  }
  if (!mod) return;
  editorSections.push({
    title_de: mod.title_de,
    title_en: mod.title_en,
    content_de: mod.content_de,
    content_en: mod.content_en,
    fields: []
  });
  updateEditorUI();
}

function addEditorSectionFromMod(mod) {
  editorSections.push({
    title_de: mod.title_de,
    title_en: mod.title_en,
    content_de: mod.content_de,
    content_en: mod.content_en,
    fields: []
  });
  updateEditorUI();
}

function removeEditorSection(i) {
  editorSections.splice(i, 1);
  updateEditorUI();
}

function moveEditorSection(i, dir) {
  var j = i + dir;
  if (j < 0 || j >= editorSections.length) return;
  var tmp = editorSections[i];
  editorSections[i] = editorSections[j];
  editorSections[j] = tmp;
  updateEditorUI();
}

function updateEditorSectionTitle(i, value, lang) {
  if (lang === 'de') editorSections[i].title_de = value;
  else editorSections[i].title_en = value;
}

function updateEditorSectionContent(i, value, lang) {
  if (lang === 'de') editorSections[i].content_de = value;
  else editorSections[i].content_en = value;
}

function updateEditorUI() {
  var lang = state.lang;
  // Update section list
  var listEl = document.getElementById('editorSectionList');
  if (listEl) listEl.innerHTML = renderEditorSections(lang);
  // Update TOC
  var tocEl = document.getElementById('tocList');
  if (tocEl) {
    if (editorSections.length === 0) {
      tocEl.innerHTML = '<li class="text-gray-400 italic">' + (lang === 'de' ? 'Leer' : 'Empty') + '</li>';
    } else {
      tocEl.innerHTML = editorSections.map(function(s) {
        return '<li class="truncate">' + escHtml(lang === 'de' ? s.title_de : s.title_en) + '</li>';
      }).join('');
    }
  }
  // Update empty placeholder
  var emptyEl = document.getElementById('editorEmpty');
  if (emptyEl) emptyEl.classList.toggle('hidden', editorSections.length > 0);
}

function editorPreview() {
  var lang = state.lang;
  var html = '';
  editorSections.forEach(function(sec, i) {
    html += '<div class="border-b pb-3">';
    html += '<h4 class="font-semibold text-brand-700">' + (i + 1) + '. ' + escHtml(lang === 'de' ? sec.title_de : sec.title_en) + '</h4>';
    html += '<p class="text-gray-600 mt-1">' + escHtml(lang === 'de' ? sec.content_de : sec.content_en) + '</p>';
    html += '</div>';
  });
  document.getElementById('editorPreviewContent').innerHTML = html || '<p class="text-gray-400">' + (lang === 'de' ? 'Keine Abschnitte.' : 'No sections.') + '</p>';
  showModal('editorPreviewModal');
}

function saveEditorTemplate() {
  if (editorSections.length === 0) {
    saveFlash(state.lang === 'de' ? 'Bitte mindestens einen Abschnitt hinzufügen.' : 'Please add at least one section.', 'error');
    render();
    return '';
  }
  var cats = getCategories();
  var cat = cats.find(function(c) { return c.slug === editorCategorySlug; });
  var catId = cat ? cat.id : 1;
  var catName = cat ? (state.lang === 'de' ? cat.name_de : cat.name_en) : '';

  // Auto-extract fields from {{placeholders}}
  var sections = editorSections.map(function(sec) {
    var seen = {};
    var fields = [];
    var re = /\{\{(\w+)\}\}/g;
    var match;
    var combined = (sec.content_de || '') + (sec.content_en || '');
    while ((match = re.exec(combined)) !== null) {
      if (!seen[match[1]]) {
        seen[match[1]] = true;
        fields.push({ key: match[1], label_de: match[1], label_en: match[1], type: 'text', required: false });
      }
    }
    return {
      title_de: sec.title_de,
      title_en: sec.title_en,
      content_de: sec.content_de,
      content_en: sec.content_en,
      fields: fields
    };
  });

  var tmpl = {
    category_id: catId,
    title_de: catName + ' (Custom)',
    title_en: catName + ' (Custom)',
    sections: sections,
    fileData: null,
    fileName: null
  };
  saveTemplate(tmpl);
  editorSections = [];
  saveFlash(t('upload_success'), 'success');
  navigate('#/templates');
  return '';
}
