/**
 * Contract Management System — Client-side interactivity.
 * Per-section free-edit toggle + live preview.
 */

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('contract-form')) {
        attachPreviewListeners();
    }
});

/**
 * Toggle a single section between fill mode and free-edit mode.
 */
function toggleSectionMode(sectionIndex) {
    const fillDiv = document.getElementById('fill-fields-' + sectionIndex);
    const freeDiv = document.getElementById('free-fields-' + sectionIndex);
    const modifiedFlag = document.getElementById('modified-' + sectionIndex);
    const toggleBtn = document.getElementById('toggle-btn-' + sectionIndex);
    const sectionBlock = document.querySelector('[data-section="' + sectionIndex + '"]');

    const currentlyFree = !freeDiv.classList.contains('hidden');
    // Detect language from button text
    const isEn = toggleBtn.textContent.includes('Free Edit') || toggleBtn.textContent.includes('Back');

    if (currentlyFree) {
        // Switch back to fill mode
        freeDiv.classList.add('hidden');
        fillDiv.classList.remove('hidden');
        modifiedFlag.value = '0';
        toggleBtn.innerHTML = '✏️ ' + (isEn ? 'Free Edit' : 'Freitext bearbeiten');
        toggleBtn.classList.remove('bg-orange-500', 'text-white', 'border-orange-500');
        toggleBtn.classList.add('border-orange-400', 'text-orange-600', 'hover:bg-orange-50');
        if (sectionBlock) {
            sectionBlock.classList.remove('border-orange-400', 'bg-orange-50');
        }
    } else {
        // Switch to free-edit mode
        freeDiv.classList.remove('hidden');
        fillDiv.classList.add('hidden');
        modifiedFlag.value = '1';
        toggleBtn.innerHTML = '↩ ' + (isEn ? 'Back to Form' : 'Zurück zum Formular');
        toggleBtn.classList.add('bg-orange-500', 'text-white', 'border-orange-500');
        toggleBtn.classList.remove('border-orange-400', 'text-orange-600', 'hover:bg-orange-50');
        if (sectionBlock) {
            sectionBlock.classList.add('border-orange-400', 'bg-orange-50');
        }
    }

    updatePreview();
}

function attachPreviewListeners() {
    document.querySelectorAll('.fill-fields input, .fill-fields textarea, .fill-fields select').forEach(el => {
        el.addEventListener('input', updatePreview);
    });
    document.querySelectorAll('.free-textarea').forEach(el => {
        el.addEventListener('input', updatePreview);
    });
}

function updatePreview() {
    const sections = document.querySelectorAll('[id^="preview-section-"]');

    sections.forEach((previewSection, i) => {
        const textEl = previewSection.querySelector('.preview-text');
        if (!textEl) return;

        const freeDiv = document.getElementById('free-fields-' + i);
        const isFree = freeDiv && !freeDiv.classList.contains('hidden');

        if (isFree) {
            const textarea = document.querySelector('textarea[name="section_content_' + i + '"]');
            if (textarea) {
                textEl.innerHTML = '<span style="background:#fff3cd;padding:2px 4px;border-radius:4px;border:1px solid #ffc107">' + escapeHtml(textarea.value) + '</span>';
            }
        } else {
            const fillDiv = document.getElementById('fill-fields-' + i);
            if (!fillDiv) return;

            let content = textEl.textContent;
            const inputs = fillDiv.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                const name = input.name;
                const match = name.match(/field_\d+_(.+)/);
                if (match) {
                    const key = match[1];
                    const value = input.value || '___';
                    const placeholder = '{{' + key + '}}';
                    content = content.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'),
                        '<span style="background:#dbeafe;color:#1e40af;padding:1px 4px;border-radius:4px;font-weight:500">' + escapeHtml(value) + '</span>');
                }
            });
            textEl.innerHTML = content;
        }
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
