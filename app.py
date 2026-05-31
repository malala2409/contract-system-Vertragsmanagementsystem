"""Contract Management System — Flask Application."""
import os
import json
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


# ── Template Management ──

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


# ── Fill Contract ──

@app.route('/fill/<int:id>', methods=['GET', 'POST'])
def fill_contract(id):
    template = Template.query.get_or_404(id)

    if request.method == 'POST':
        filled_data = {
            'sections': [],
        }
        section_count = len(template.sections)
        for i in range(section_count):
            is_modified = request.form.get(f'modified_{i}') == '1'
            section_entry = {
                'index': i,
                'modified': is_modified,
            }
            if is_modified:
                # Free-edit mode: store the full section text
                section_entry['content'] = request.form.get(f'section_content_{i}', '')
            else:
                # Fill mode: store individual field values
                section_entry['fields'] = {}
                section = template.sections[i]
                for field in section.get('fields', []):
                    key = field['key']
                    section_entry['fields'][key] = request.form.get(f'field_{i}_{key}', '')
            filled_data['sections'].append(section_entry)

        submission = Submission(
            template_id=id,
            filled_data=filled_data,
            status='pending',
        )
        db.session.add(submission)
        db.session.commit()
        flash(t('submit_success'))
        return redirect(url_for('home'))

    return render_template('fill.html', template=template)


# ── Review ──

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
        if action == 'approve':
            submission.status = 'approved'
        elif action == 'reject':
            submission.status = 'rejected'
        submission.review_comment = request.form.get('comment', '')
        submission.reviewed_at = datetime.now(timezone.utc)
        db.session.commit()
        flash(t('review_success'))
        return redirect(url_for('review_list'))

    return render_template('review_detail.html', submission=submission)


# ── Helpers ──

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
