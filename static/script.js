/**
 * Contract Management System — Client-side interactivity.
 * Handles: fill/free mode toggle, live preview, modified-flag tracking.
 */

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('contract-form')) {
        attachPreviewListeners();
    }
});

function toggleMode() {
    const isFree = document.getElementById('mode-toggle').checked;
    const fillFields = document.querySelectorAll('.fill-fields');
    const freeFields = document.querySelectorAll('.free-fields');
    const freeHint = document.getElementById('free-hint');
    const modeInput = document.getElementById('mode-input');

    fillFields.forEach(el => el.classList.toggle('hidden', isFree));
    freeFields.forEach(el => el.classList.toggle('hidden', !isFree));
    if (freeHint) freeHint.classList.toggle('hidden', !isFree);
    modeInput.value = isFree ? 'free' : 'fill';

    if (isFree) {
        document.querySelectorAll('.modified-flag').forEach(f => f.value = '1');
    }

    updatePreview();
}

function attachPreviewListeners() {
    document.querySelectorAll('input, textarea, select').forEach(el => {
        if (!el.closest('#mode-toggle') && !el.classList.contains('free-textarea')) {
            el.addEventListener('input', updatePreview);
        }
    });
    document.querySelectorAll('.free-textarea').forEach(el => {
        el.addEventListener('input', function () {
            const flag = this.parentElement.querySelector('.modified-flag');
            if (flag) flag.value = '1';
            updatePreview();
        });
    });
}

function updatePreview() {
    const isFree = document.getElementById('mode-toggle')?.checked || false;
    const sections = document.querySelectorAll('[id^="preview-section-"]');

    sections.forEach((previewSection, i) => {
        const textEl = previewSection.querySelector('.preview-text');
        if (!textEl) return;

        if (isFree) {
            const textarea = document.querySelector(`textarea[name="section_content_${i}"]`);
            if (textarea) textEl.textContent = textarea.value;
        } else {
            const formPanel = document.getElementById('form-panel');
            if (!formPanel) return;
            const sectionDivs = formPanel.querySelectorAll('.bg-white.rounded-xl.shadow-sm.border');
            const sectionDiv = sectionDivs[i];
            if (!sectionDiv) return;

            let content = textEl.textContent;
            const inputs = sectionDiv.querySelectorAll('.fill-fields input, .fill-fields textarea, .fill-fields select');
            inputs.forEach(input => {
                const name = input.name;
                const match = name.match(/field_\d+_(.+)/);
                if (match) {
                    const key = match[1];
                    const value = input.value || '___';
                    const placeholder = '{{' + key + '}}';
                    content = content.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'),
                                              '<span style="background:#dbeafe;color:#1e40af;padding:1px 4px;border-radius:4px;font-weight:500">' + value + '</span>');
                }
            });
            previewSection.querySelector('.preview-text').innerHTML = content;
        }
    });
}
