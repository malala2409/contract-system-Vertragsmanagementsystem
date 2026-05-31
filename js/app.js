/* ═══════════════════════════════════════════
   APP — Main render dispatcher + init
   ═══════════════════════════════════════════ */

function render() {
  var route = getRoute();
  var path = route.path;
  var id = route.id;
  var appEl = document.getElementById('app');
  if (!appEl) return;

  var html = '';

  switch (path) {
    case 'home':
      html = renderHome();
      break;
    case 'templates':
      if (route.subpath === 'create') {
        html = renderTemplateEditor();
      } else {
        html = renderTemplates();
      }
      break;
    case 'fill':
      html = renderFill(id, { existingData: null, backUrl: '#/templates', submitLabel: t('btn_submit'), formAction: 'fill' });
      setTimeout(attachLivePreviewListeners, 100);
      break;
    case 'sales':
      if (route.subpath === 'fill') {
        html = renderSalesFill(id);
      } else if (route.subpath === 'preview') {
        html = renderSalesPreview(id);
      } else if (route.subpath === 'view') {
        html = renderSalesView(id);
      } else if (route.subpath === 'edit') {
        html = renderSalesEdit(id);
      } else {
        html = renderSalesHome();
      }
      break;
    case 'review':
      if (id !== null) {
        html = renderReviewDetail(id);
      } else {
        html = renderReviewList();
      }
      break;
    default:
      html = renderHome();
  }
  appEl.innerHTML = html;

  // Scroll to top after render
  window.scrollTo(0, 0);

  // Update lang toggle buttons if they exist
  var btnDE = document.getElementById('btnDE');
  var btnEN = document.getElementById('btnEN');
  if (btnDE) { btnDE.classList.toggle('font-bold', state.lang === 'de'); btnDE.classList.toggle('underline', state.lang === 'de'); }
  if (btnEN) { btnEN.classList.toggle('font-bold', state.lang === 'en'); btnEN.classList.toggle('underline', state.lang === 'en'); }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  initStore();
  initRouter();
});
