"""Contract Management System — Flask Application."""
import os
import json
import re
from datetime import datetime, timezone

from flask import (Flask, render_template, request, redirect,
                   url_for, session, send_from_directory, flash)
from werkzeug.utils import secure_filename

from models import db, Category, Template, Submission
from database import init_db, load_seed_templates
from i18n import TRANSLATIONS

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(
    os.path.dirname(os.path.abspath(__file__)), 'contract.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'docx', 'doc', 'pdf', 'json'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

init_db(app)
load_seed_templates(app)


# ── i18n helpers ──
def t(key):
    lang = session.get('lang', 'de')
    if lang not in TRANSLATIONS:
        lang = 'de'
    return TRANSLATIONS[lang].get(key, key)


def current_lang():
    return session.get('lang', 'de')


@app.context_processor
def inject_translations():
    return dict(t=t, current_lang=current_lang)


# ── Routes ──

@app.route('/')
def home():
    categories = Category.query.order_by(Category.id).all()
    return render_template('home.html', categories=categories)


@app.route('/lang/<lang>')
def set_language(lang):
    if lang in ('de', 'en'):
        session['lang'] = lang
    return redirect(request.referrer or url_for('home'))


# ═══════════════════════════════════════════════
# TEMPLATE MANAGEMENT (Admin/Staff)
# ═══════════════════════════════════════════════

@app.route('/templates', methods=['GET', 'POST'])
def manage_templates():
    if request.method == 'POST':
        file = request.files.get('file')
        title_de = request.form.get('title_de', '')
        title_en = request.form.get('title_en', '')
        category_id = request.form.get('category_id', type=int)
        sections_json = request.form.get('sections', '')

        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            file_path = filename
        else:
            file_path = None

        sections = []
        if sections_json:
            try:
                sections = json.loads(sections_json)
            except json.JSONDecodeError:
                sections = []

        if title_de and category_id:
            template = Template(
                category_id=category_id,
                title_de=title_de,
                title_en=title_en or title_de,
                sections=sections,
                file_path=file_path,
            )
            db.session.add(template)
            db.session.commit()
            flash(t('upload_success'))

    category_filter = request.args.get('category', type=int)
    query = Template.query.order_by(Template.created_at.desc())
    if category_filter:
        query = query.filter_by(category_id=category_filter)

    templates = query.all()
    categories = Category.query.order_by(Category.id).all()
    return render_template('manage.html', templates=templates,
                           categories=categories, category_filter=category_filter)


@app.route('/templates/<int:id>/download')
def download_template(id):
    template = Template.query.get_or_404(id)
    if template.file_path:
        return send_from_directory(app.config['UPLOAD_FOLDER'], template.file_path)
    flash('No file attached to this template.')
    return redirect(url_for('manage_templates'))


@app.route('/templates/<int:id>/delete', methods=['POST'])
def delete_template(id):
    password = request.form.get('password', '')
    if password != '1111':
        flash(t('wrong_password'))
        return redirect(url_for('manage_templates'))

    template = Template.query.get_or_404(id)
    if template.file_path:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], template.file_path)
        if os.path.exists(file_path):
            os.remove(file_path)
    db.session.delete(template)
    db.session.commit()
    flash(t('delete_success'))
    return redirect(url_for('manage_templates'))


@app.route('/templates/<int:id>/update', methods=['POST'])
def update_template(id):
    """Update an existing template with new metadata and sections."""
    template = Template.query.get_or_404(id)

    title_de = request.form.get('title_de', '').strip()
    title_en = request.form.get('title_en', '').strip()
    category_id = request.form.get('category_id', type=int)
    sections_json = request.form.get('sections', '')
    file = request.files.get('file')

    if title_de:
        template.title_de = title_de
    if title_en:
        template.title_en = title_en
    if category_id:
        template.category_id = category_id

    # Parse sections from either JSON or form fields
    sections = None
    if sections_json:
        try:
            sections = json.loads(sections_json)
        except json.JSONDecodeError:
            pass

    # If no JSON, try the visual editor form fields
    if not sections:
        sections = parse_section_fields()

    if sections and isinstance(sections, list) and len(sections) > 0:
        template.sections = sections

    if file and file.filename and allowed_file(file.filename):
        # Remove old file if exists
        if template.file_path:
            old_path = os.path.join(app.config['UPLOAD_FOLDER'], template.file_path)
            if os.path.exists(old_path):
                os.remove(old_path)
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        template.file_path = filename

    db.session.commit()
    flash(t('template_updated'))
    return redirect(url_for('manage_templates'))


@app.route('/templates/create', methods=['GET', 'POST'])
def create_template_wizard():
    """Wizard for creating new contract templates with drag-and-drop sections."""
    categories = Category.query.order_by(Category.id).all()

    if request.method == 'POST':
        title_de = request.form.get('title_de', '').strip()
        title_en = request.form.get('title_en', '').strip()
        category_id = request.form.get('category_id', type=int)
        sections_json = request.form.get('sections', '')

        if title_de and category_id and sections_json:
            try:
                sections = json.loads(sections_json)
                if isinstance(sections, list) and len(sections) > 0:
                    template = Template(
                        category_id=category_id,
                        title_de=title_de,
                        title_en=title_en or title_de,
                        sections=sections,
                    )
                    db.session.add(template)
                    db.session.commit()
                    flash(t('upload_success'))
                    return redirect(url_for('manage_templates'))
            except json.JSONDecodeError:
                flash('Ungültiges JSON-Format.')

    return render_template('template_editor.html', categories=categories)


# ═══════════════════════════════════════════════
# REVIEW (Legal/Management)
# ═══════════════════════════════════════════════

@app.route('/review')
def review_list():
    status_filter = request.args.get('status', '')
    query = Submission.query.order_by(Submission.submitted_at.desc())
    if status_filter and status_filter in ('pending', 'approved', 'rejected'):
        query = query.filter_by(status=status_filter)

    submissions = query.all()
    return render_template('review_list.html', submissions=submissions,
                           status_filter=status_filter)


@app.route('/review/<int:id>', methods=['GET', 'POST'])
def review_detail(id):
    submission = Submission.query.get_or_404(id)

    if request.method == 'POST':
        action = request.form.get('action')
        comment = request.form.get('comment', '')
        now = datetime.now(timezone.utc)

        # Initialize review_notes if None (use a copy to trigger SQLAlchemy change tracking)
        notes = list(submission.review_notes or [])

        if action == 'approve':
            submission.status = 'approved'
            submission.reviewed_at = now
        elif action == 'reject':
            submission.status = 'rejected'
            submission.reviewed_at = now
        elif action == 'pending':
            submission.status = 'pending'
            submission.reviewed_at = now

        if action == 'add_note' or comment:
            # Record timestamped note in history
            status_labels = {'approve': 'approved', 'reject': 'rejected', 'pending': 'pending'}
            note = {
                'action': status_labels.get(action, 'note'),
                'comment': comment,
                'timestamp': now.strftime('%Y-%m-%d %H:%M'),
            }
            notes.append(note)
            submission.review_notes = notes  # Reassign to trigger change tracking
            if comment:
                submission.review_comment = comment

        db.session.commit()
        flash(t('review_success'))
        return redirect(url_for('review_detail', id=id))

    lang = session.get('lang', 'de')
    rendered_sections = render_submission_sections(submission, lang)
    return render_template('review_detail.html', submission=submission,
                           rendered_sections=rendered_sections)


# ═══════════════════════════════════════════════
# SALESPERSON PORTAL
# ═══════════════════════════════════════════════

@app.route('/sales', methods=['GET', 'POST'], strict_slashes=False)
def sales_home():
    """Salesperson dashboard: set name, browse templates, view own submissions."""
    if request.method == 'POST':
        if request.form.get('submitter_name'):
            session['submitter_name'] = request.form.get('submitter_name', '').strip()
            return redirect(url_for('sales_home'))
        elif request.form.get('logout'):
            session.pop('submitter_name', None)
            return redirect(url_for('sales_home'))

    submitter = session.get('submitter_name', '')
    categories = Category.query.order_by(Category.id).all()
    templates = Template.query.order_by(Template.created_at.desc()).all()

    # Only show this salesperson's own submissions
    my_submissions = []
    if submitter:
        my_submissions = Submission.query\
            .filter_by(submitter_name=submitter)\
            .order_by(Submission.submitted_at.desc()).all()

    return render_template('sales_home.html',
                           submitter=submitter,
                           categories=categories,
                           templates=templates,
                           my_submissions=my_submissions)


@app.route('/sales/fill/<int:id>', methods=['GET', 'POST'])
def sales_fill(id):
    """Fill form for salesperson. POST saves data to session, redirects to preview."""
    if not session.get('submitter_name'):
        flash('Bitte zuerst Namen eingeben / Please enter your name first.')
        return redirect(url_for('sales_home'))

    template = Template.query.get_or_404(id)

    if request.method == 'POST':
        # Save filled data to session for preview
        filled_data = build_filled_data(template)
        session['preview_data'] = filled_data
        session['preview_template_id'] = id
        return redirect(url_for('sales_preview', id=id))

    # Pass existing preview data so user can go back and edit without losing data
    existing_data = session.get('preview_data') if session.get('preview_template_id') == id else None
    return render_template('fill.html', template=template,
                           existing_data=existing_data,
                           back_url=url_for('sales_home'),
                           submit_label=t('btn_review'),
                           form_action=url_for('sales_fill', id=id))


@app.route('/sales/preview/<int:id>', methods=['GET', 'POST'])
def sales_preview(id):
    """Overview of contract before final submission."""
    if not session.get('submitter_name'):
        return redirect(url_for('sales_home'))

    template = Template.query.get_or_404(id)
    filled_data = session.get('preview_data')
    if not filled_data:
        flash('Keine Daten vorhanden. Bitte Vertrag ausfüllen.')
        return redirect(url_for('sales_fill', id=id))

    if request.method == 'POST':
        # Final submit
        submission = Submission(
            template_id=id,
            filled_data=filled_data,
            status='pending',
            submitter_name=session.get('submitter_name', ''),
        )
        db.session.add(submission)
        db.session.commit()
        session.pop('preview_data', None)
        session.pop('preview_template_id', None)
        flash(t('submit_success'))
        return redirect(url_for('sales_home'))

    lang = session.get('lang', 'de')
    rendered_sections = render_filled_sections(template, filled_data, lang)
    return render_template('sales_overview.html',
                           template=template,
                           rendered_sections=rendered_sections)


@app.route('/sales/view/<int:sub_id>')
def sales_view(sub_id):
    """View a submitted contract (read-only)."""
    submission = Submission.query.get_or_404(sub_id)
    if submission.submitter_name != session.get('submitter_name', ''):
        flash('Kein Zugriff / Access denied.')
        return redirect(url_for('sales_home'))

    lang = session.get('lang', 'de')
    rendered_sections = render_submission_sections(submission, lang)
    return render_template('sales_view.html', submission=submission,
                           rendered_sections=rendered_sections)


@app.route('/sales/edit/<int:sub_id>', methods=['GET', 'POST'])
def sales_edit(sub_id):
    """Edit a rejected (or still pending) submission."""
    submission = Submission.query.get_or_404(sub_id)
    if submission.submitter_name != session.get('submitter_name', ''):
        flash('Kein Zugriff / Access denied.')
        return redirect(url_for('sales_home'))

    if submission.status not in ('rejected', 'pending'):
        flash('Nur abgelehnte oder ausstehende Verträge können bearbeitet werden.')
        return redirect(url_for('sales_home'))

    template = submission.template

    if request.method == 'POST':
        # Resubmit with updated data (keep reviewer comment visible)
        filled_data = build_filled_data(template)
        submission.filled_data = filled_data
        submission.status = 'pending'
        submission.submitted_at = datetime.now(timezone.utc)
        db.session.commit()
        flash(t('submit_success'))
        return redirect(url_for('sales_home'))

    return render_template('fill.html', template=template,
                           existing_data=submission.filled_data,
                           submission=submission,
                           back_url=url_for('sales_home'),
                           submit_label=t('btn_submit'),
                           form_action=url_for('sales_edit', sub_id=sub_id))


# ── Fill (original, for staff) ──

@app.route('/fill/<int:id>', methods=['GET', 'POST'])
def fill_contract(id):
    template = Template.query.get_or_404(id)

    if request.method == 'POST':
        filled_data = build_filled_data(template)
        submission = Submission(
            template_id=id,
            filled_data=filled_data,
            status='pending',
        )
        db.session.add(submission)
        db.session.commit()
        flash(t('submit_success'))
        return redirect(url_for('home'))

    return render_template('fill.html', template=template,
                           back_url=url_for('manage_templates'),
                           submit_label=t('btn_submit'),
                           form_action=url_for('fill_contract', id=id))


# ── Helpers ──

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def parse_section_fields():
    """Parse section data from visual editor form fields (section_N_title_de etc.)."""
    sections = []
    i = 0
    while True:
        title_de = request.form.get(f'section_{i}_title_de', '').strip()
        content_de = request.form.get(f'section_{i}_content_de', '')
        if not title_de and not content_de:
            break

        title_en = request.form.get(f'section_{i}_title_en', '').strip()
        content_en = request.form.get(f'section_{i}_content_en', '')

        # Parse field metadata from form
        fields = []
        field_count = request.form.get(f'section_{i}_field_count', type=int) or 0
        for fi in range(field_count):
            key = request.form.get(f'section_{i}_field_{fi}_key', '').strip()
            if not key:
                continue
            ftype = request.form.get(f'section_{i}_field_{fi}_type', 'text')
            label_de = request.form.get(f'section_{i}_field_{fi}_label_de', '').strip() or key
            label_en = request.form.get(f'section_{i}_field_{fi}_label_en', '').strip() or key
            options_str = request.form.get(f'section_{i}_field_{fi}_options', '').strip()
            options = [o.strip() for o in options_str.split(',') if o.strip()] if options_str else []
            fields.append({
                'key': key,
                'type': ftype,
                'label_de': label_de,
                'label_en': label_en,
                'options': options,
                'required': False,
            })

        # If no explicit fields, auto-extract from content
        if not fields:
            seen = set()
            for match in re.findall(r'\{\{(\w+)\}\}', content_de + content_en):
                if match not in seen:
                    seen.add(match)
                    fields.append({
                        'key': match, 'label_de': match, 'label_en': match,
                        'type': 'text', 'required': False,
                    })

        sections.append({
            'title_de': title_de,
            'title_en': title_en or title_de,
            'content_de': content_de,
            'content_en': content_en or content_de,
            'fields': fields,
        })
        i += 1
    return sections if sections else None


def build_filled_data(template):
    """Extract filled_data dict from POST request for a given template."""
    filled_data = {'sections': []}
    for i in range(len(template.sections)):
        is_modified = request.form.get(f'modified_{i}') == '1'
        section_entry = {'index': i, 'modified': is_modified}
        if is_modified:
            section_entry['content'] = request.form.get(f'section_content_{i}', '')
        else:
            section_entry['fields'] = {}
            for field in template.sections[i].get('fields', []):
                key = field['key']
                section_entry['fields'][key] = request.form.get(f'field_{i}_{key}', '')
        filled_data['sections'].append(section_entry)
    return filled_data


def render_submission_sections(submission, lang):
    """Pre-render a submission's sections with filled values for display."""
    return render_filled_sections(submission.template, submission.filled_data, lang)


def render_filled_sections(template, filled_data, lang):
    """Pre-render template sections filled with data. Returns list of dicts."""
    result = []
    sections_data = filled_data.get('sections', []) if filled_data else []

    for i, section in enumerate(template.sections):
        sec_data = sections_data[i] if i < len(sections_data) else None
        is_modified = bool(sec_data and sec_data.get('modified'))
        content_template = section['content_de'] if lang == 'de' else section['content_en']

        if is_modified:
            rendered_html = sec_data.get('content', '')
            original = content_template
        else:
            rendered_html = content_template
            if sec_data and sec_data.get('fields'):
                for key, value in sec_data['fields'].items():
                    placeholder = '{{' + key + '}}'
                    fill = value or '___'
                    rendered_html = rendered_html.replace(
                        placeholder,
                        '<span class="bg-blue-100 text-blue-800 px-1 rounded font-medium">' + fill + '</span>'
                    )
            original = ''

        result.append({
            'title_de': section['title_de'],
            'title_en': section['title_en'],
            'is_modified': is_modified,
            'rendered_html': rendered_html,
            'original': original,
        })

    return result


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
