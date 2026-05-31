# Contract Management System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Flask+SQLite web app for managing German civil law contract templates, filling them via web forms, and reviewing submissions — with EN/DE bilingual UI.

**Architecture:** Single-file Flask app with SQLAlchemy ORM, Jinja2 server-rendered templates styled with Tailwind CSS CDN, vanilla JS for client interactivity. Three URL-based sections (/templates, /fill, /review) with no authentication. EN/DE language toggle via Flask session.

**Tech Stack:** Python 3.9+, Flask, Flask-SQLAlchemy, SQLite, Jinja2, Tailwind CSS (CDN), vanilla JavaScript

---

## File Structure (what we build)

```
contract-system/
├── app.py              # Flask app: routes, logic, i18n helper
├── models.py           # SQLAlchemy models: Category, Template, Submission
├── database.py         # DB init + seed_data() function
├── requirements.txt    # Flask, Flask-SQLAlchemy, Werkzeug
├── templates/
│   ├── base.html       # HTML shell: <head>, nav, lang toggle, Tailwind CDN
│   ├── home.html       # Landing page: 3 cards → /templates, /fill (pick a template), /review
│   ├── manage.html     # Template management: upload, category filter, template cards
│   ├── fill.html       # Dual-mode fill form + live preview
│   ├── review_list.html    # Review dashboard: table with status filters
│   └── review_detail.html  # Single submission review + approve/reject
├── static/
│   └── script.js       # fill.html live preview, free-edit tracking, UI toggles
├── seed_data/          # 7 JSON template files (one per contract type)
│   ├── kaufvertrag.json
│   ├── mietvertrag.json
│   ├── dienstvertrag.json
│   ├── darlehensvertrag.json
│   ├── nda.json
│   ├── arbeitsvertrag.json
│   └── auftrag.json
├── uploads/            # Upload directory (created at startup)
└── README.md
```

---

### Task 0: Project scaffold + dependencies

**Files:**
- Create: `requirements.txt`

- [ ] **Step 1: Write requirements.txt**

```bash
cat > requirements.txt << 'EOF'
Flask==3.1.2
Flask-SQLAlchemy==3.1.1
Werkzeug==3.1.3
EOF
```

- [ ] **Step 2: Install dependencies**

Run: `pip3 install -r requirements.txt`
Expected: All 3 packages install without errors.

- [ ] **Step 3: Create empty subdirectories**

Run:
```bash
mkdir -p templates static seed_data uploads
```

- [ ] **Step 4: Commit**

```bash
git add requirements.txt
git commit -m "chore: add project scaffold with dependencies"
```

---

### Task 1: Data models (models.py)

**Files:**
- Create: `models.py`

- [ ] **Step 1: Write models.py**

```python
"""Data models for the Contract Management System."""
from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name_de = db.Column(db.String(100), nullable=False)
    name_en = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    templates = db.relationship('Template', backref='category', lazy=True,
                                cascade='all, delete-orphan')


class Template(db.Model):
    __tablename__ = 'templates'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    title_de = db.Column(db.String(200), nullable=False)
    title_en = db.Column(db.String(200), nullable=False)
    sections = db.Column(db.JSON, nullable=False)
    file_path = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    submissions = db.relationship('Submission', backref='template', lazy=True,
                                  cascade='all, delete-orphan')


class Submission(db.Model):
    __tablename__ = 'submissions'

    id = db.Column(db.Integer, primary_key=True)
    template_id = db.Column(db.Integer, db.ForeignKey('templates.id'), nullable=False)
    filled_data = db.Column(db.JSON, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    review_comment = db.Column(db.Text, nullable=True)
    submitted_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    reviewed_at = db.Column(db.DateTime, nullable=True)
```

- [ ] **Step 2: Verify the module loads**

Run: `python3 -c "from models import db, Category, Template, Submission; print('Models OK')"`
Expected: `Models OK`

- [ ] **Step 3: Commit**

```bash
git add models.py
git commit -m "feat: add data models (Category, Template, Submission)"
```

---

### Task 2: Database initialization + seed (database.py)

**Files:**
- Create: `database.py`

- [ ] **Step 1: Write database.py**

```python
"""Database initialization and seed data."""
from models import db, Category, Template
import json
import os


def init_db(app):
    """Create all tables and seed default categories."""
    db.init_app(app)
    with app.app_context():
        db.create_all()
        seed_categories(app)


def seed_categories(app):
    """Insert the 7 default BGB contract categories if not present."""
    categories = [
        ('Kaufvertrag', 'Purchase Agreement', 'kaufvertrag'),
        ('Mietvertrag', 'Lease/Rental Agreement', 'mietvertrag'),
        ('Dienstvertrag', 'Service Contract', 'dienstvertrag'),
        ('Darlehensvertrag', 'Loan Agreement', 'darlehensvertrag'),
        ('Vertraulichkeitsvereinbarung (NDA)', 'Non-Disclosure Agreement', 'nda'),
        ('Arbeitsvertrag', 'Employment Contract', 'arbeitsvertrag'),
        ('Auftrag / Geschäftsbesorgung', 'Agency/Mandate Agreement', 'auftrag'),
    ]
    for name_de, name_en, slug in categories:
        if not Category.query.filter_by(slug=slug).first():
            db.session.add(Category(name_de=name_de, name_en=name_en, slug=slug))
    db.session.commit()


def load_seed_templates(app):
    """Load seed template JSON files from seed_data/ into the database."""
    seed_dir = os.path.join(app.root_path, 'seed_data')
    if not os.path.isdir(seed_dir):
        return
    with app.app_context():
        for filename in os.listdir(seed_dir):
            if filename.endswith('.json'):
                filepath = os.path.join(seed_dir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                slug = filename.replace('.json', '')
                category = Category.query.filter_by(slug=slug).first()
                if category and not Template.query.filter_by(
                        category_id=category.id, title_de=data['title_de']).first():
                    template = Template(
                        category_id=category.id,
                        title_de=data['title_de'],
                        title_en=data['title_en'],
                        sections=data['sections'],
                    )
                    db.session.add(template)
        db.session.commit()
```

- [ ] **Step 2: Verify module loads**

Run: `python3 -c "from database import init_db, load_seed_templates; print('Database OK')"`
Expected: `Database OK` (Flask app context warning is fine)

- [ ] **Step 3: Commit**

```bash
git add database.py
git commit -m "feat: add database init and category seeding"
```

---

### Task 3: i18n translations (i18n.py)

**Files:**
- Create: `i18n.py`

- [ ] **Step 1: Write i18n.py with ~60 translation keys**

```python
"""English/German translations for the Contract Management System."""
TRANSLATIONS = {
    'de': {
        'app_name': 'Vertragsmanager',
        'nav_templates': 'Vorlagen',
        'nav_review': 'Prüfung',
        'nav_home': 'Start',
        'home_title': 'Willkommen im Vertragsmanager',
        'home_subtitle': 'Verwalten Sie Vertragsvorlagen, füllen Sie Verträge aus und prüfen Sie Einreichungen.',
        'home_templates_title': 'Vorlagenverwaltung',
        'home_templates_desc': 'Laden Sie Vertragsvorlagen hoch, durchsuchen Sie Kategorien und laden Sie Dokumente herunter.',
        'home_fill_title': 'Vertrag ausfüllen',
        'home_fill_desc': 'Öffnen Sie eine Vorlage, füllen Sie die Felder aus und reichen Sie sie zur Prüfung ein.',
        'home_review_title': 'Prüfung',
        'home_review_desc': 'Prüfen Sie eingereichte Verträge, genehmigen Sie sie oder senden Sie sie zur Überarbeitung zurück.',
        'btn_enter': 'Öffnen',
        'btn_submit': 'Einreichen',
        'btn_approve': 'Genehmigen',
        'btn_reject': 'Ablehnen',
        'btn_save_draft': 'Entwurf speichern',
        'btn_download': 'Herunterladen',
        'btn_delete': 'Löschen',
        'btn_upload': 'Vorlage hochladen',
        'btn_back': 'Zurück',
        'btn_fill': 'Ausfüllen',
        'status_pending': 'Ausstehend',
        'status_approved': 'Genehmigt',
        'status_rejected': 'Abgelehnt',
        'label_category': 'Kategorie',
        'label_all': 'Alle',
        'label_search': 'Suchen...',
        'label_filter': 'Filtern',
        'label_submitted': 'Eingereicht am',
        'label_reviewed': 'Geprüft am',
        'label_comment': 'Kommentar',
        'label_reviewer_note': 'Anmerkung des Prüfers',
        'mode_fill': 'Formularmodus',
        'mode_free': 'Freitext-Modus',
        'mode_free_hint': 'Im Freitext-Modus bearbeitete Abschnitte werden bei der Prüfung rot markiert.',
        'section_parties': 'Parteien',
        'section_subject': 'Vertragsgegenstand',
        'section_price': 'Vergütung / Preis',
        'section_delivery': 'Leistung / Lieferung',
        'section_warranty': 'Gewährleistung',
        'section_liability': 'Haftung / Vertragsstrafe',
        'section_term': 'Laufzeit / Kündigung',
        'section_disputes': 'Streitbeilegung',
        'section_signature': 'Unterschrift',
        'preview_title': 'Vorschau',
        'confirm_delete': 'Wirklich löschen?',
        'no_templates': 'Keine Vorlagen in dieser Kategorie.',
        'no_submissions': 'Keine Einreichungen vorhanden.',
        'upload_success': 'Vorlage erfolgreich hochgeladen.',
        'submit_success': 'Vertrag erfolgreich eingereicht.',
        'review_success': 'Prüfung abgeschlossen.',
        'modified_warning': '⚠ Vom Benutzer geändert',
    },
    'en': {
        'app_name': 'Contract Manager',
        'nav_templates': 'Templates',
        'nav_review': 'Review',
        'nav_home': 'Home',
        'home_title': 'Welcome to Contract Manager',
        'home_subtitle': 'Manage contract templates, fill out contracts, and review submissions.',
        'home_templates_title': 'Template Management',
        'home_templates_desc': 'Upload contract templates, browse categories, and download documents.',
        'home_fill_title': 'Fill Contract',
        'home_fill_desc': 'Open a template, fill in the fields, and submit for review.',
        'home_review_title': 'Review',
        'home_review_desc': 'Review submitted contracts, approve them or send them back for revision.',
        'btn_enter': 'Enter',
        'btn_submit': 'Submit',
        'btn_approve': 'Approve',
        'btn_reject': 'Reject',
        'btn_save_draft': 'Save Draft',
        'btn_download': 'Download',
        'btn_delete': 'Delete',
        'btn_upload': 'Upload Template',
        'btn_back': 'Back',
        'btn_fill': 'Fill',
        'status_pending': 'Pending',
        'status_approved': 'Approved',
        'status_rejected': 'Rejected',
        'label_category': 'Category',
        'label_all': 'All',
        'label_search': 'Search...',
        'label_filter': 'Filter',
        'label_submitted': 'Submitted',
        'label_reviewed': 'Reviewed',
        'label_comment': 'Comment',
        'label_reviewer_note': 'Reviewer Note',
        'mode_fill': 'Fill Mode',
        'mode_free': 'Free Edit Mode',
        'mode_free_hint': 'Sections edited in free-edit mode will be highlighted in red during review.',
        'section_parties': 'Parties',
        'section_subject': 'Subject Matter',
        'section_price': 'Price / Payment',
        'section_delivery': 'Delivery / Performance',
        'section_warranty': 'Warranty',
        'section_liability': 'Liability / Penalties',
        'section_term': 'Term / Termination',
        'section_disputes': 'Dispute Resolution',
        'section_signature': 'Signature',
        'preview_title': 'Preview',
        'confirm_delete': 'Really delete?',
        'no_templates': 'No templates in this category.',
        'no_submissions': 'No submissions yet.',
        'upload_success': 'Template uploaded successfully.',
        'submit_success': 'Contract submitted successfully.',
        'review_success': 'Review completed.',
        'modified_warning': '⚠ User-modified',
    }
}
```

- [ ] **Step 2: Verify module loads**

Run: `python3 -c "from i18n import TRANSLATIONS; assert len(TRANSLATIONS['de']) == len(TRANSLATIONS['en']); print(f'{len(TRANSLATIONS[\"de\"])} keys each, OK')"`
Expected: `N keys each, OK`

- [ ] **Step 3: Commit**

```bash
git add i18n.py
git commit -m "feat: add EN/DE i18n translations (~55 keys)"
```

---

### Task 4: app.py — core Flask app with routes

**Files:**
- Create: `app.py`

- [ ] **Step 1: Write app.py (full Flask application)**

```python
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
    """Return translation for `key` in the current session language."""
    lang = session.get('lang', 'de')
    if lang not in TRANSLATIONS:
        lang = 'de'
    return TRANSLATIONS[lang].get(key, key)


def current_lang():
    return session.get('lang', 'de')


# Make `t` and `current_lang` available in all Jinja2 templates
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
    template = Template.query.get_or_404(id)
    if template.file_path:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], template.file_path)
        if os.path.exists(file_path):
            os.remove(file_path)
    db.session.delete(template)
    db.session.commit()
    return redirect(url_for('manage_templates'))


# ── Fill Contract ──

@app.route('/fill/<int:id>', methods=['GET', 'POST'])
def fill_contract(id):
    template = Template.query.get_or_404(id)

    if request.method == 'POST':
        mode = request.form.get('mode', 'fill')
        filled_data = {
            'mode': mode,
            'sections': [],
        }
        section_count = len(template.sections)
        for i in range(section_count):
            section_entry = {
                'index': i,
                'modified': request.form.get(f'modified_{i}') == '1',
            }
            if mode == 'fill':
                section_entry['fields'] = {}
                section = template.sections[i]
                for field in section.get('fields', []):
                    key = field['key']
                    section_entry['fields'][key] = request.form.get(f'field_{i}_{key}', '')
            else:
                section_entry['content'] = request.form.get(f'section_content_{i}', '')
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
```

- [ ] **Step 2: Verify app starts**

Run: `python3 app.py` (in background or separate terminal)
Expected: Flask starts on `http://127.0.0.1:5000`, SQLite file `contract.db` is created.

- [ ] **Step 3: Stop the server** (Ctrl+C after verifying it starts)

- [ ] **Step 4: Commit**

```bash
git add app.py
git commit -m "feat: add Flask app with all routes (templates, fill, review, i18n)"
```

---

### Task 5: base.html — shared layout

**Files:**
- Create: `templates/base.html`

- [ ] **Step 1: Write templates/base.html**

```html
<!DOCTYPE html>
<html lang="{{ current_lang() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ t('app_name') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: { 50: '#f0f4f8', 100: '#d9e2ec', 500: '#2E5A88', 700: '#1B3A5C', 900: '#0F2236' }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50 min-h-screen flex flex-col">
    <!-- Navigation -->
    <nav class="bg-brand-700 text-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="text-xl font-bold tracking-tight">🏠 {{ t('app_name') }}</a>
            <div class="flex items-center gap-4 text-sm font-medium">
                <a href="{{ url_for('manage_templates') }}" class="hover:text-blue-200 transition">{{ t('nav_templates') }}</a>
                <a href="{{ url_for('review_list') }}" class="hover:text-blue-200 transition">{{ t('nav_review') }}</a>
                <span class="mx-1 text-brand-300">|</span>
                {% set lang = current_lang() %}
                <a href="{{ url_for('set_language', lang='en') }}"
                   class="px-2 py-1 rounded {% if lang == 'en' %}bg-brand-500 text-white{% else %}text-brand-200 hover:text-white{% endif %} transition">EN</a>
                <a href="{{ url_for('set_language', lang='de') }}"
                   class="px-2 py-1 rounded {% if lang == 'de' %}bg-brand-500 text-white{% else %}text-brand-200 hover:text-white{% endif %} transition">DE</a>
            </div>
        </div>
    </nav>

    <!-- Flash Messages -->
    {% with messages = get_flashed_messages() %}
    {% if messages %}
    <div class="max-w-6xl mx-auto px-4 pt-4">
        {% for msg in messages %}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-2 text-sm">{{ msg }}</div>
        {% endfor %}
    </div>
    {% endif %}
    {% endwith %}

    <!-- Main Content -->
    <main class="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
        {% block content %}{% endblock %}
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t text-center text-xs text-gray-400 py-4">
        {{ t('app_name') }} &middot; Built with Flask & Tailwind CSS
    </footer>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add templates/base.html
git commit -m "feat: add base layout template with nav, lang toggle, Tailwind CDN"
```

---

### Task 6: home.html — landing page

**Files:**
- Create: `templates/home.html`

- [ ] **Step 1: Write templates/home.html**

```html
{% extends "base.html" %}
{% block content %}
<div class="text-center py-12">
    <h1 class="text-3xl font-bold text-brand-700 mb-2">{{ t('home_title') }}</h1>
    <p class="text-gray-500 max-w-xl mx-auto">{{ t('home_subtitle') }}</p>
</div>

<div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
    <!-- Templates Card -->
    <a href="{{ url_for('manage_templates') }}" class="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100 hover:border-brand-300">
        <div class="text-5xl mb-4">📁</div>
        <h2 class="text-xl font-bold text-brand-700 mb-2">{{ t('home_templates_title') }}</h2>
        <p class="text-gray-500 text-sm">{{ t('home_templates_desc') }}</p>
        <span class="inline-block mt-4 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium">{{ t('btn_enter') }}</span>
    </a>

    <!-- Fill Card -->
    <a href="{{ url_for('manage_templates') }}" class="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100 hover:border-brand-300">
        <div class="text-5xl mb-4">✍️</div>
        <h2 class="text-xl font-bold text-brand-700 mb-2">{{ t('home_fill_title') }}</h2>
        <p class="text-gray-500 text-sm">{{ t('home_fill_desc') }}</p>
        <span class="inline-block mt-4 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium">{{ t('btn_enter') }}</span>
    </a>

    <!-- Review Card -->
    <a href="{{ url_for('review_list') }}" class="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100 hover:border-brand-300">
        <div class="text-5xl mb-4">✅</div>
        <h2 class="text-xl font-bold text-brand-700 mb-2">{{ t('home_review_title') }}</h2>
        <p class="text-gray-500 text-sm">{{ t('home_review_desc') }}</p>
        <span class="inline-block mt-4 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium">{{ t('btn_enter') }}</span>
    </a>
</div>

<!-- Template Quick-Select by Category -->
<div class="max-w-4xl mx-auto mt-12">
    <h3 class="text-lg font-semibold text-brand-700 mb-4">{{ t('nav_templates') }}:</h3>
    <div class="grid md:grid-cols-2 gap-3">
        {% for cat in categories %}
        <a href="{{ url_for('manage_templates', category=cat.id) }}"
           class="flex items-center gap-3 bg-white rounded-lg border p-3 hover:shadow transition">
            <span class="text-2xl">📄</span>
            <div>
                <div class="font-medium text-brand-700 text-sm">{{ cat.name_de }}</div>
                <div class="text-gray-400 text-xs">{{ cat.name_en }}</div>
            </div>
        </a>
        {% endfor %}
    </div>
</div>
{% endblock %}
```

- [ ] **Step 2: Commit**

```bash
git add templates/home.html
git commit -m "feat: add landing page with 3 role cards and category quick-links"
```

---

### Task 7: manage.html — template management page

**Files:**
- Create: `templates/manage.html`

- [ ] **Step 1: Write templates/manage.html**

```html
{% extends "base.html" %}
{% block content %}
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold text-brand-700">{{ t('nav_templates') }}</h1>
    <button onclick="document.getElementById('upload-modal').classList.remove('hidden')"
            class="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition">
        + {{ t('btn_upload') }}
    </button>
</div>

<!-- Category Filter -->
<div class="flex flex-wrap gap-2 mb-6">
    <a href="{{ url_for('manage_templates') }}"
       class="px-3 py-1 rounded-full text-sm {% if not category_filter %}bg-brand-500 text-white{% else %}bg-gray-200 text-gray-600 hover:bg-gray-300{% endif %} transition">
        {{ t('label_all') }}
    </a>
    {% for cat in categories %}
    <a href="{{ url_for('manage_templates', category=cat.id) }}"
       class="px-3 py-1 rounded-full text-sm {% if category_filter == cat.id %}bg-brand-500 text-white{% else %}bg-gray-200 text-gray-600 hover:bg-gray-300{% endif %} transition">
        {{ cat.name_de }}
    </a>
    {% endfor %}
</div>

<!-- Template Cards -->
{% if templates %}
<div class="grid gap-4">
    {% for tmpl in templates %}
    <div class="bg-white rounded-xl shadow-sm border p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex-1">
            <h2 class="font-bold text-brand-700 text-lg">
                {% if current_lang() == 'en' %}{{ tmpl.title_en }}{% else %}{{ tmpl.title_de }}{% endif %}
            </h2>
            <span class="inline-block bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded mt-1">
                {{ tmpl.category.name_de }} / {{ tmpl.category.name_en }}
            </span>
            {% if tmpl.sections %}
            <div class="flex flex-wrap gap-1 mt-2">
                {% for sec in tmpl.sections[:6] %}
                <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    {{ sec.title_de }}
                </span>
                {% endfor %}
                {% if tmpl.sections|length > 6 %}
                <span class="text-xs text-gray-400">+{{ tmpl.sections|length - 6 }} more</span>
                {% endif %}
            </div>
            {% endif %}
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
            <a href="{{ url_for('fill_contract', id=tmpl.id) }}"
               class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition">
                📝 {{ t('btn_fill') }}
            </a>
            {% if tmpl.file_path %}
            <a href="{{ url_for('download_template', id=tmpl.id) }}"
               class="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition">
                📥 {{ t('btn_download') }}
            </a>
            {% endif %}
            <form method="POST" action="{{ url_for('delete_template', id=tmpl.id) }}"
                  onsubmit="return confirm('{{ t('confirm_delete') }}')" class="inline">
                <button class="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition">
                    🗑
                </button>
            </form>
        </div>
    </div>
    {% endfor %}
</div>
{% else %}
<div class="text-center py-16 text-gray-400">
    <p class="text-5xl mb-4">📭</p>
    <p>{{ t('no_templates') }}</p>
</div>
{% endif %}

<!-- Upload Modal -->
<div id="upload-modal" class="hidden fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-brand-700">{{ t('btn_upload') }}</h2>
            <button onclick="document.getElementById('upload-modal').classList.add('hidden')"
                    class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>
        <form method="POST" enctype="multipart/form-data" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titel (DE)</label>
                <input type="text" name="title_de" required
                       class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
                <input type="text" name="title_en"
                       class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('label_category') }}</label>
                <select name="category_id" required
                        class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
                    <option value="">{{ t('label_all') }}</option>
                    {% for cat in categories %}
                    <option value="{{ cat.id }}">{{ cat.name_de }} ({{ cat.name_en }})</option>
                    {% endfor %}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Sections (JSON)</label>
                <textarea name="sections" rows="4"
                          class="w-full border rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none"
                          placeholder='[{"title_de":"Parteien","title_en":"Parties","content_de":"...","content_en":"...","fields":[...]}]'></textarea>
                <p class="text-xs text-gray-400 mt-1">Optional: JSON array of section objects.</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">File (DOCX/PDF)</label>
                <input type="file" name="file" accept=".docx,.doc,.pdf,.json"
                       class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100">
            </div>
            <div class="flex gap-3 justify-end pt-2">
                <button type="button" onclick="document.getElementById('upload-modal').classList.add('hidden')"
                        class="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">{{ t('btn_back') }}</button>
                <button type="submit"
                        class="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-700">{{ t('btn_upload') }}</button>
            </div>
        </form>
    </div>
</div>
{% endblock %}
```

- [ ] **Step 2: Commit**

```bash
git add templates/manage.html
git commit -m "feat: add template management page with upload modal and category filter"
```

---

### Task 8: fill.html — dual-mode contract fill page

**Files:**
- Create: `templates/fill.html`

- [ ] **Step 1: Write templates/fill.html**

```html
{% extends "base.html" %}
{% block content %}
<div class="mb-4">
    <a href="{{ url_for('manage_templates') }}" class="text-brand-500 hover:text-brand-700 text-sm">&larr; {{ t('btn_back') }}</a>
</div>

<h1 class="text-2xl font-bold text-brand-700 mb-1">
    {% if current_lang() == 'en' %}{{ template.title_en }}{% else %}{{ template.title_de }}{% endif %}
</h1>
<p class="text-sm text-gray-400 mb-6">{{ template.category.name_de }} / {{ template.category.name_en }}</p>

<!-- Mode Toggle -->
<div class="bg-white rounded-xl shadow-sm border p-4 mb-6">
    <div class="flex items-center gap-4 flex-wrap">
        <span class="text-sm font-medium text-gray-600">{{ t('mode_fill') }}</span>
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="mode-toggle" class="sr-only peer"
                   onchange="toggleMode()">
            <div class="w-11 h-6 bg-brand-500 rounded-full peer-checked:bg-orange-500 transition-colors
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:after:translate-x-full"></div>
        </label>
        <span class="text-sm font-medium text-gray-600">{{ t('mode_free') }}</span>
        <span class="text-xs text-orange-500 ml-2 hidden" id="free-hint">⚠ {{ t('mode_free_hint') }}</span>
    </div>
</div>

<form method="POST" id="contract-form">
    <input type="hidden" name="mode" id="mode-input" value="fill">

    <div class="grid lg:grid-cols-2 gap-6">
        <!-- LEFT: Form Fields -->
        <div class="space-y-6" id="form-panel">
            {% for section in template.sections %}
            <div class="bg-white rounded-xl shadow-sm border p-5">
                <h2 class="font-bold text-brand-700 mb-3">
                    <span class="text-brand-300 text-sm mr-2">{{ loop.index }}.</span>
                    {% if current_lang() == 'en' %}{{ section.title_en }}{% else %}{{ section.title_de }}{% endif %}
                </h2>

                <!-- Fill Mode: individual fields -->
                <div class="fill-fields space-y-3">
                    {% for field in section.get('fields', []) %}
                    <div>
                        <label class="block text-xs font-medium text-gray-500 mb-1">
                            {% if current_lang() == 'en' %}{{ field.label_en }}{% else %}{{ field.label_de }}{% endif %}
                            {% if field.required %}<span class="text-red-400">*</span>{% endif %}
                        </label>
                        {% if field.type == 'textarea' %}
                        <textarea name="field_{{ loop.parent.loop.index0 }}_{{ field.key }}"
                                  class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none"
                                  rows="3">{{ field.get('default', '') }}</textarea>
                        {% elif field.type == 'date' %}
                        <input type="date" name="field_{{ loop.parent.loop.index0 }}_{{ field.key }}"
                               class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
                        {% elif field.type == 'select' %}
                        <select name="field_{{ loop.parent.loop.index0 }}_{{ field.key }}"
                                class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
                            <option value="">—</option>
                            {% for opt in field.get('options', []) %}
                            <option value="{{ opt }}">{{ opt }}</option>
                            {% endfor %}
                        </select>
                        {% else %}
                        <input type="text" name="field_{{ loop.parent.loop.index0 }}_{{ field.key }}"
                               class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none"
                               value="{{ field.get('default', '') }}" placeholder="...">
                        {% endif %}
                    </div>
                    {% endfor %}
                </div>

                <!-- Free Edit Mode: textarea (hidden by default) -->
                <div class="free-fields hidden">
                    <textarea name="section_content_{{ loop.index0 }}"
                              class="free-textarea w-full border rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                              rows="6">{{ section.content_de if current_lang() == 'de' else section.content_en }}</textarea>
                    <input type="hidden" name="modified_{{ loop.index0 }}" value="0" class="modified-flag">
                </div>
            </div>
            {% endfor %}
        </div>

        <!-- RIGHT: Live Preview -->
        <div class="lg:sticky lg:top-6 self-start">
            <div class="bg-white rounded-xl shadow-sm border p-5">
                <h2 class="font-bold text-brand-700 mb-3">👁 {{ t('preview_title') }}</h2>
                <div id="preview-content" class="prose prose-sm max-w-none text-gray-700 text-sm leading-relaxed space-y-4">
                    {% for section in template.sections %}
                    <div id="preview-section-{{ loop.index0 }}" class="pb-3 border-b last:border-0">
                        <h3 class="font-semibold text-brand-700 text-xs uppercase tracking-wide mb-1">
                            {{ section.title_de if current_lang() == 'de' else section.title_en }}
                        </h3>
                        <p class="preview-text whitespace-pre-wrap">{{ section.content_de if current_lang() == 'de' else section.content_en }}</p>
                    </div>
                    {% endfor %}
                </div>
            </div>
        </div>
    </div>

    <!-- Submit -->
    <div class="text-center mt-8 pb-8">
        <button type="submit"
                class="bg-brand-700 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-brand-900 transition shadow-lg">
            📤 {{ t('btn_submit') }}
        </button>
    </div>
</form>
{% endblock %}
```

- [ ] **Step 2: Commit**

```bash
git add templates/fill.html
git commit -m "feat: add dual-mode fill page with live preview panel"
```

---

### Task 9: review_list.html — review dashboard

**Files:**
- Create: `templates/review_list.html`

- [ ] **Step 1: Write templates/review_list.html**

```html
{% extends "base.html" %}
{% block content %}
<h1 class="text-2xl font-bold text-brand-700 mb-6">{{ t('nav_review') }}</h1>

<!-- Status Filter -->
<div class="flex flex-wrap gap-2 mb-6">
    <a href="{{ url_for('review_list') }}"
       class="px-3 py-1 rounded-full text-sm {% if not status_filter %}bg-brand-500 text-white{% else %}bg-gray-200 text-gray-600 hover:bg-gray-300{% endif %} transition">
        {{ t('label_all') }}
    </a>
    <a href="{{ url_for('review_list', status='pending') }}"
       class="px-3 py-1 rounded-full text-sm {% if status_filter == 'pending' %}bg-yellow-500 text-white{% else %}bg-yellow-50 text-yellow-700 hover:bg-yellow-100{% endif %} transition">
        🟡 {{ t('status_pending') }}
    </a>
    <a href="{{ url_for('review_list', status='approved') }}"
       class="px-3 py-1 rounded-full text-sm {% if status_filter == 'approved' %}bg-green-500 text-white{% else %}bg-green-50 text-green-700 hover:bg-green-100{% endif %} transition">
        🟢 {{ t('status_approved') }}
    </a>
    <a href="{{ url_for('review_list', status='rejected') }}"
       class="px-3 py-1 rounded-full text-sm {% if status_filter == 'rejected' %}bg-red-500 text-white{% else %}bg-red-50 text-red-700 hover:bg-red-100{% endif %} transition">
        🔴 {{ t('status_rejected') }}
    </a>
</div>

<!-- Submissions Table -->
{% if submissions %}
<div class="bg-white rounded-xl shadow-sm border overflow-hidden">
    <table class="w-full text-sm">
        <thead>
            <tr class="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                <th class="px-4 py-3">#</th>
                <th class="px-4 py-3">Template</th>
                <th class="px-4 py-3">{{ t('label_submitted') }}</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y">
            {% for sub in submissions %}
            <tr class="hover:bg-gray-50 transition">
                <td class="px-4 py-3 text-gray-400">{{ sub.id }}</td>
                <td class="px-4 py-3 font-medium text-brand-700">
                    {% if current_lang() == 'en' %}{{ sub.template.title_en }}{% else %}{{ sub.template.title_de }}{% endif %}
                </td>
                <td class="px-4 py-3 text-gray-500 text-xs">
                    {{ sub.submitted_at.strftime('%Y-%m-%d %H:%M') if sub.submitted_at else '—' }}
                </td>
                <td class="px-4 py-3">
                    {% if sub.status == 'pending' %}
                    <span class="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">🟡 {{ t('status_pending') }}</span>
                    {% elif sub.status == 'approved' %}
                    <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">🟢 {{ t('status_approved') }}</span>
                    {% elif sub.status == 'rejected' %}
                    <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">🔴 {{ t('status_rejected') }}</span>
                    {% endif %}
                </td>
                <td class="px-4 py-3 text-right">
                    <a href="{{ url_for('review_detail', id=sub.id) }}"
                       class="text-brand-500 hover:text-brand-700 font-medium text-xs">
                        {{ t('btn_enter') }} →
                    </a>
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
</div>
{% else %}
<div class="text-center py-16 text-gray-400">
    <p class="text-5xl mb-4">📋</p>
    <p>{{ t('no_submissions') }}</p>
</div>
{% endif %}
{% endblock %}
```

- [ ] **Step 2: Commit**

```bash
git add templates/review_list.html
git commit -m "feat: add review dashboard with status filter table"
```

---

### Task 10: review_detail.html — review with red-flagged modifications

**Files:**
- Create: `templates/review_detail.html`

- [ ] **Step 1: Write templates/review_detail.html**

```html
{% extends "base.html" %}
{% block content %}
<div class="mb-4">
    <a href="{{ url_for('review_list') }}" class="text-brand-500 hover:text-brand-700 text-sm">&larr; {{ t('btn_back') }}</a>
</div>

<div class="bg-white rounded-xl shadow-sm border p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
        <div>
            <h1 class="text-xl font-bold text-brand-700">
                {% if current_lang() == 'en' %}{{ submission.template.title_en }}{% else %}{{ submission.template.title_de }}{% endif %}
            </h1>
            <p class="text-xs text-gray-400 mt-1">
                {{ t('label_submitted') }}: {{ submission.submitted_at.strftime('%Y-%m-%d %H:%M') if submission.submitted_at else '—' }}
                {% if submission.reviewed_at %}
                &middot; {{ t('label_reviewed') }}: {{ submission.reviewed_at.strftime('%Y-%m-%d %H:%M') }}
                {% endif %}
            </p>
        </div>
        <div>
            {% if submission.status == 'pending' %}
            <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">🟡 {{ t('status_pending') }}</span>
            {% elif submission.status == 'approved' %}
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">🟢 {{ t('status_approved') }}</span>
            {% elif submission.status == 'rejected' %}
            <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">🔴 {{ t('status_rejected') }}</span>
            {% endif %}
        </div>
    </div>

    <!-- Contract Content with Red-Flagged Sections -->
    <div class="space-y-4 mt-6">
        {% for section in submission.template.sections %}
        {% set sec_data = submission.filled_data.sections[loop.index0] if submission.filled_data and submission.filled_data.get('sections') and loop.index0 < submission.filled_data.sections|length else None %}
        {% set is_modified = sec_data and sec_data.get('modified') == True %}

        <div class="border rounded-lg p-4 {% if is_modified %}border-red-300 bg-red-50{% endif %}">
            <div class="flex items-center gap-2 mb-2">
                <span class="text-brand-300 text-sm">{{ loop.index }}.</span>
                <h3 class="font-semibold text-brand-700 text-sm">
                    {% if current_lang() == 'en' %}{{ section.title_en }}{% else %}{{ section.title_de }}{% endif %}
                </h3>
                {% if is_modified %}
                <span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{{ t('modified_warning') }}</span>
                {% endif %}
            </div>

            {% if is_modified %}
            <!-- Show user's modified content with red highlight -->
            <div class="border-2 border-red-400 bg-white rounded-lg p-3">
                <p class="text-sm text-gray-800 whitespace-pre-wrap">{{ sec_data.get('content', '') }}</p>
            </div>
            <p class="text-xs text-red-500 mt-1">
                Original: {{ section.content_de if current_lang() == 'de' else section.content_en }}
            </p>
            {% else %}
            <!-- Show filled fields inline -->
            <p class="text-sm text-gray-700 whitespace-pre-wrap">
                {% set content = section.content_de if current_lang() == 'de' else section.content_en %}
                {% if sec_data and sec_data.get('fields') %}
                    {% set rendered = content %}
                    {% for key, value in sec_data.fields.items() %}
                        {% set placeholder = '{{' + key + '}}' %}
                        {% set rendered = rendered | replace(placeholder, '<span class="bg-blue-100 text-blue-800 px-1 rounded font-medium">' + (value or '___') + '</span>') %}
                    {% endfor %}
                    {{ rendered | safe }}
                {% else %}
                    {{ content }}
                {% endif %}
            </p>
            {% endif %}
        </div>
        {% endfor %}
    </div>

    <!-- Review Actions (only for pending) -->
    {% if submission.status == 'pending' %}
    <div class="mt-8 border-t pt-6">
        <form method="POST" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('label_comment') }}</label>
                <textarea name="comment" rows="3"
                          class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none"
                          placeholder="{{ t('label_reviewer_note') }}...">{{ submission.review_comment or '' }}</textarea>
            </div>
            <div class="flex gap-3">
                <button type="submit" name="action" value="approve"
                        class="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition">
                    ✅ {{ t('btn_approve') }}
                </button>
                <button type="submit" name="action" value="reject"
                        class="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition">
                    ✗ {{ t('btn_reject') }}
                </button>
            </div>
        </form>
    </div>
    {% elif submission.review_comment %}
    <div class="mt-8 border-t pt-6">
        <h3 class="text-sm font-semibold text-gray-500 mb-2">{{ t('label_reviewer_note') }}:</h3>
        <p class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">{{ submission.review_comment }}</p>
    </div>
    {% endif %}
</div>
{% endblock %}
```

- [ ] **Step 2: Commit**

```bash
git add templates/review_detail.html
git commit -m "feat: add review detail page with red-flagged modified sections"
```

---

### Task 11: static/script.js — client-side interactivity

**Files:**
- Create: `static/script.js`

- [ ] **Step 1: Write static/script.js**

```javascript
/**
 * Contract Management System — Client-side interactivity.
 * Handles: fill/free mode toggle, live preview, modified-flag tracking.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Fill page: attach input listeners for live preview
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

    // Mark all sections as modified when switching to free mode
    if (isFree) {
        document.querySelectorAll('.modified-flag').forEach(f => f.value = '1');
    }

    updatePreview();
}

function attachPreviewListeners() {
    // Listen to all form inputs for live preview updates
    document.querySelectorAll('input, textarea, select').forEach(el => {
        if (!el.closest('#mode-toggle') && !el.classList.contains('free-textarea')) {
            el.addEventListener('input', updatePreview);
        }
    });
    // Free textareas should also trigger preview
    document.querySelectorAll('.free-textarea').forEach(el => {
        el.addEventListener('input', function () {
            // Mark as modified when content changes from original
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
            // Rebuild filled content from individual fields
            // Read the original template content from the data attribute or the preview
            // For simplicity, we update filled values in place
            const formPanel = document.getElementById('form-panel');
            const sectionDivs = formPanel.querySelectorAll('.bg-white.rounded-xl.shadow-sm.border');
            const sectionDiv = sectionDivs[i];
            if (!sectionDiv) return;

            let content = textEl.textContent;
            const inputs = sectionDiv.querySelectorAll('.fill-fields input, .fill-fields textarea, .fill-fields select');
            inputs.forEach(input => {
                const name = input.name; // field_{sectionIndex}_{key}
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
```

- [ ] **Step 2: Add script reference to base.html <head>**

Edit `templates/base.html` — after the Tailwind `<script>` block, add:

```html
    <script src="{{ url_for('static', filename='script.js') }}"></script>
```

- [ ] **Step 3: Commit**

```bash
git add static/script.js templates/base.html
git commit -m "feat: add client-side JS for mode toggle and live preview"
```

---

### Task 12: Seed data — 7 contract templates (JSON)

**Files:**
- Create: `seed_data/kaufvertrag.json`
- Create: `seed_data/mietvertrag.json`
- Create: `seed_data/dienstvertrag.json`
- Create: `seed_data/darlehensvertrag.json`
- Create: `seed_data/nda.json`
- Create: `seed_data/arbeitsvertrag.json`
- Create: `seed_data/auftrag.json`

- [ ] **Step 1: Write seed_data/kaufvertrag.json**

```json
{
  "title_de": "Standard-Kaufvertrag",
  "title_en": "Standard Purchase Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{seller_name}}, {{seller_address}} (im Folgenden \"Verkäufer\") und {{buyer_name}}, {{buyer_address}} (im Folgenden \"Käufer\") wird folgender Kaufvertrag geschlossen:",
      "content_en": "Between {{seller_name}}, {{seller_address}} (hereinafter \"Seller\") and {{buyer_name}}, {{buyer_address}} (hereinafter \"Buyer\") the following purchase agreement is concluded:",
      "fields": [
        {"key": "seller_name", "label_de": "Name des Verkäufers", "label_en": "Seller Name", "type": "text", "required": true},
        {"key": "seller_address", "label_de": "Adresse des Verkäufers", "label_en": "Seller Address", "type": "text", "required": true},
        {"key": "buyer_name", "label_de": "Name des Käufers", "label_en": "Buyer Name", "type": "text", "required": true},
        {"key": "buyer_address", "label_de": "Adresse des Käufers", "label_en": "Buyer Address", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Kaufgegenstand",
      "title_en": "Subject Matter",
      "content_de": "Der Verkäufer verkauft und der Käufer kauft: {{goods_description}}, Menge: {{quantity}} Stück.",
      "content_en": "The Seller sells and the Buyer purchases: {{goods_description}}, quantity: {{quantity}} units.",
      "fields": [
        {"key": "goods_description", "label_de": "Beschreibung der Kaufsache", "label_en": "Description of Goods", "type": "textarea", "required": true},
        {"key": "quantity", "label_de": "Menge", "label_en": "Quantity", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Kaufpreis und Zahlungsbedingungen",
      "title_en": "Price and Payment Terms",
      "content_de": "Der Kaufpreis beträgt {{price}} EUR. Zahlungsziel: {{payment_days}} Tage nach Rechnungsstellung. Zahlungsart: {{payment_method}}.",
      "content_en": "The purchase price is {{price}} EUR. Payment term: {{payment_days}} days after invoice. Payment method: {{payment_method}}.",
      "fields": [
        {"key": "price", "label_de": "Kaufpreis (EUR)", "label_en": "Price (EUR)", "type": "text", "required": true},
        {"key": "payment_days", "label_de": "Zahlungsziel (Tage)", "label_en": "Payment Term (Days)", "type": "text", "required": true},
        {"key": "payment_method", "label_de": "Zahlungsart", "label_en": "Payment Method", "type": "select", "required": true, "options": ["Überweisung", "Lastschrift", "Barzahlung"]}
      ]
    },
    {
      "title_de": "Lieferung und Gefahrübergang",
      "title_en": "Delivery and Transfer of Risk",
      "content_de": "Die Lieferung erfolgt bis zum {{delivery_date}}. Lieferort: {{delivery_place}}. Der Gefahrübergang erfolgt mit Übergabe an den Käufer. Versandkosten trägt {{shipping_cost_bearer}}.",
      "content_en": "Delivery shall be made by {{delivery_date}}. Place of delivery: {{delivery_place}}. Risk passes upon handover to the Buyer. Shipping costs are borne by {{shipping_cost_bearer}}.",
      "fields": [
        {"key": "delivery_date", "label_de": "Lieferdatum", "label_en": "Delivery Date", "type": "date", "required": true},
        {"key": "delivery_place", "label_de": "Lieferort", "label_en": "Place of Delivery", "type": "text", "required": true},
        {"key": "shipping_cost_bearer", "label_de": "Versandkosten trägt", "label_en": "Shipping Costs Borne By", "type": "select", "required": true, "options": ["Verkäufer", "Käufer"]}
      ]
    },
    {
      "title_de": "Gewährleistung",
      "title_en": "Warranty",
      "content_de": "Die Gewährleistungsfrist beträgt {{warranty_period}} Monate ab Lieferung. Der Verkäufer haftet für Sachmängel nach §§ 434 ff. BGB. Bei Mängeln hat der Käufer Anspruch auf Nacherfüllung (§ 439 BGB).",
      "content_en": "The warranty period is {{warranty_period}} months from delivery. The Seller is liable for material defects in accordance with §§ 434 ff. BGB. In case of defects, the Buyer is entitled to subsequent performance (§ 439 BGB).",
      "fields": [
        {"key": "warranty_period", "label_de": "Gewährleistungsfrist (Monate)", "label_en": "Warranty Period (Months)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Haftung und Vertragsstrafe",
      "title_en": "Liability and Penalties",
      "content_de": "Bei Lieferverzug schuldet der Verkäufer eine Vertragsstrafe in Höhe von {{penalty_percent}}% des Kaufpreises pro angefangener Woche, maximal {{penalty_max}}% des Kaufpreises. Die Haftung auf Schadensersatz richtet sich nach den gesetzlichen Bestimmungen. Die Haftung für leichte Fahrlässigkeit ist auf {{liability_cap}} EUR beschränkt. Von der Haftung ausgenommen sind Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.",
      "content_en": "In case of delivery delay, the Seller shall pay a contractual penalty of {{penalty_percent}}% of the purchase price per commenced week, up to a maximum of {{penalty_max}}% of the purchase price. Liability for damages is governed by statutory provisions. Liability for slight negligence is limited to {{liability_cap}} EUR. Excluded from this limitation are damages arising from injury to life, body or health.",
      "fields": [
        {"key": "penalty_percent", "label_de": "Vertragsstrafe (% pro Woche)", "label_en": "Penalty (% per Week)", "type": "text", "required": true},
        {"key": "penalty_max", "label_de": "Maximale Vertragsstrafe (%)", "label_en": "Maximum Penalty (%)", "type": "text", "required": true},
        {"key": "liability_cap", "label_de": "Haftungsobergrenze (EUR)", "label_en": "Liability Cap (EUR)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court}}. Es gilt deutsches Recht. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam. Änderungen bedürfen der Schriftform. Ort: {{place}}, Datum: {{date}}",
      "content_en": "Place of jurisdiction is {{court}}. German law applies. Should any provision be invalid, the remainder of the contract shall remain effective. Amendments require written form. Place: {{place}}, Date: {{date}}",
      "fields": [
        {"key": "court", "label_de": "Gerichtsstand", "label_en": "Place of Jurisdiction", "type": "text", "required": true},
        {"key": "place", "label_de": "Ort", "label_en": "Place", "type": "text", "required": true},
        {"key": "date", "label_de": "Datum", "label_en": "Date", "type": "date", "required": true}
      ]
    }
  ]
}
```

- [ ] **Step 2: Write seed_data/mietvertrag.json** (similar structure, rental-specific sections)

```json
{
  "title_de": "Standard-Mietvertrag",
  "title_en": "Standard Lease Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{landlord_name}}, {{landlord_address}} (im Folgenden \"Vermieter\") und {{tenant_name}}, {{tenant_address}} (im Folgenden \"Mieter\") wird folgender Mietvertrag geschlossen:",
      "content_en": "Between {{landlord_name}}, {{landlord_address}} (hereinafter \"Landlord\") and {{tenant_name}}, {{tenant_address}} (hereinafter \"Tenant\") the following lease agreement is concluded:",
      "fields": [
        {"key": "landlord_name", "label_de": "Name des Vermieters", "label_en": "Landlord Name", "type": "text", "required": true},
        {"key": "landlord_address", "label_de": "Adresse des Vermieters", "label_en": "Landlord Address", "type": "text", "required": true},
        {"key": "tenant_name", "label_de": "Name des Mieters", "label_en": "Tenant Name", "type": "text", "required": true},
        {"key": "tenant_address", "label_de": "Adresse des Mieters", "label_en": "Tenant Address", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Mietgegenstand",
      "title_en": "Leased Property",
      "content_de": "Vermietet wird: {{property_description}}, gelegen in {{property_address}}, bestehend aus {{rooms}} Räumen mit einer Gesamtfläche von ca. {{area}} m². Die Nutzung erfolgt als {{usage_type}}.",
      "content_en": "The leased property is: {{property_description}}, located at {{property_address}}, consisting of {{rooms}} rooms with a total area of approx. {{area}} m². The property shall be used as {{usage_type}}.",
      "fields": [
        {"key": "property_description", "label_de": "Beschreibung des Mietobjekts", "label_en": "Property Description", "type": "textarea", "required": true},
        {"key": "property_address", "label_de": "Adresse des Mietobjekts", "label_en": "Property Address", "type": "text", "required": true},
        {"key": "rooms", "label_de": "Anzahl der Räume", "label_en": "Number of Rooms", "type": "text", "required": true},
        {"key": "area", "label_de": "Fläche (m²)", "label_en": "Area (m²)", "type": "text", "required": true},
        {"key": "usage_type", "label_de": "Nutzungsart", "label_en": "Usage Type", "type": "select", "required": true, "options": ["Wohnnutzung", "Gewerbliche Nutzung", "Gemischt"]}
      ]
    },
    {
      "title_de": "Miete und Nebenkosten",
      "title_en": "Rent and Operating Costs",
      "content_de": "Die monatliche Nettokaltmiete beträgt {{cold_rent}} EUR. Zusätzlich sind Nebenkostenvorauszahlungen in Höhe von {{utilities_advance}} EUR monatlich zu leisten. Die Gesamtmiete beträgt somit {{total_rent}} EUR/Monat. Die Miete ist bis zum {{payment_day}}. Werktag des Monats zu zahlen. Die Kaution beträgt {{deposit}} EUR (§ 551 BGB).",
      "content_en": "The monthly net cold rent is {{cold_rent}} EUR. In addition, an advance payment for operating costs of {{utilities_advance}} EUR per month shall be made. The total rent is therefore {{total_rent}} EUR/month. Rent is payable by the {{payment_day}} working day of each month. The security deposit is {{deposit}} EUR (§ 551 BGB).",
      "fields": [
        {"key": "cold_rent", "label_de": "Nettokaltmiete (EUR/Monat)", "label_en": "Net Cold Rent (EUR/Month)", "type": "text", "required": true},
        {"key": "utilities_advance", "label_de": "Nebenkostenvorauszahlung (EUR)", "label_en": "Operating Cost Advance (EUR)", "type": "text", "required": true},
        {"key": "total_rent", "label_de": "Gesamtmiete (EUR/Monat)", "label_en": "Total Rent (EUR/Month)", "type": "text", "required": true},
        {"key": "payment_day", "label_de": "Zahlung bis zum (Werktag)", "label_en": "Payment by (Working Day)", "type": "text", "required": true},
        {"key": "deposit", "label_de": "Kaution (EUR)", "label_en": "Deposit (EUR)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Mietdauer und Kündigung",
      "title_en": "Lease Term and Termination",
      "content_de": "Das Mietverhältnis beginnt am {{start_date}} und wird auf {{term_type}} geschlossen. Die Kündigungsfrist beträgt {{notice_period}} Monate (§ 573c BGB). Eine ordentliche Kündigung durch den Vermieter setzt ein berechtigtes Interesse voraus (§ 573 BGB).",
      "content_en": "The lease commences on {{start_date}} and is concluded for {{term_type}}. The notice period is {{notice_period}} months (§ 573c BGB). Ordinary termination by the Landlord requires a legitimate interest (§ 573 BGB).",
      "fields": [
        {"key": "start_date", "label_de": "Mietbeginn", "label_en": "Start Date", "type": "date", "required": true},
        {"key": "term_type", "label_de": "Vertragslaufzeit", "label_en": "Term Type", "type": "select", "required": true, "options": ["unbefristet", "befristet auf 1 Jahr", "befristet auf 2 Jahre"]},
        {"key": "notice_period", "label_de": "Kündigungsfrist (Monate)", "label_en": "Notice Period (Months)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Instandhaltung und Schönheitsreparaturen",
      "title_en": "Maintenance and Cosmetic Repairs",
      "content_de": "Der Mieter ist für {{tenant_repairs}} verantwortlich. Schönheitsreparaturen werden nach {{renovation_schedule}} durchgeführt. Der Vermieter trägt die Kosten für {{landlord_maintenance}}.",
      "content_en": "The Tenant is responsible for {{tenant_repairs}}. Cosmetic repairs are carried out according to {{renovation_schedule}}. The Landlord bears the costs for {{landlord_maintenance}}.",
      "fields": [
        {"key": "tenant_repairs", "label_de": "Instandhaltungspflichten des Mieters", "label_en": "Tenant Maintenance Duties", "type": "textarea", "required": true},
        {"key": "renovation_schedule", "label_de": "Renovierungsintervall", "label_en": "Renovation Schedule", "type": "text", "required": true},
        {"key": "landlord_maintenance", "label_de": "Instandhaltung durch Vermieter", "label_en": "Landlord Maintenance", "type": "textarea", "required": true}
      ]
    },
    {
      "title_de": "Haftung",
      "title_en": "Liability",
      "content_de": "Der Vermieter haftet für anfängliche Mängel nach § 536a BGB. Der Mieter haftet für schuldhafte Beschädigungen der Mietsache. Die Haftung des Vermieters für leichte Fahrlässigkeit ist auf {{liability_cap_rental}} EUR beschränkt.",
      "content_en": "The Landlord is liable for initial defects pursuant to § 536a BGB. The Tenant is liable for culpable damage to the leased property. The Landlord's liability for slight negligence is limited to {{liability_cap_rental}} EUR.",
      "fields": [
        {"key": "liability_cap_rental", "label_de": "Haftungsobergrenze (EUR)", "label_en": "Liability Cap (EUR)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_rental}}. Es gilt deutsches Recht. Änderungen und Ergänzungen bedürfen der Schriftform. Ort: {{place_rental}}, Datum: {{date_rental}}",
      "content_en": "Place of jurisdiction is {{court_rental}}. German law applies. Amendments and supplements require written form. Place: {{place_rental}}, Date: {{date_rental}}",
      "fields": [
        {"key": "court_rental", "label_de": "Gerichtsstand", "label_en": "Place of Jurisdiction", "type": "text", "required": true},
        {"key": "place_rental", "label_de": "Ort", "label_en": "Place", "type": "text", "required": true},
        {"key": "date_rental", "label_de": "Datum", "label_en": "Date", "type": "date", "required": true}
      ]
    }
  ]
}
```

- [ ] **Step 3: Write seed_data/dienstvertrag.json**

```json
{
  "title_de": "Standard-Dienstvertrag",
  "title_en": "Standard Service Contract",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{client_name}}, {{client_address}} (im Folgenden \"Auftraggeber\") und {{contractor_name}}, {{contractor_address}} (im Folgenden \"Auftragnehmer\") wird folgender Dienstvertrag geschlossen:",
      "content_en": "Between {{client_name}}, {{client_address}} (hereinafter \"Client\") and {{contractor_name}}, {{contractor_address}} (hereinafter \"Contractor\") the following service contract is concluded:",
      "fields": [
        {"key": "client_name", "label_de": "Name des Auftraggebers", "label_en": "Client Name", "type": "text", "required": true},
        {"key": "client_address", "label_de": "Adresse des Auftraggebers", "label_en": "Client Address", "type": "text", "required": true},
        {"key": "contractor_name", "label_de": "Name des Auftragnehmers", "label_en": "Contractor Name", "type": "text", "required": true},
        {"key": "contractor_address", "label_de": "Adresse des Auftragnehmers", "label_en": "Contractor Address", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Leistungsbeschreibung",
      "title_en": "Scope of Services",
      "content_de": "Der Auftragnehmer verpflichtet sich zur Erbringung folgender Dienste: {{service_description}}. Die Leistungserbringung erfolgt {{service_location}}.",
      "content_en": "The Contractor undertakes to provide the following services: {{service_description}}. The services shall be performed {{service_location}}.",
      "fields": [
        {"key": "service_description", "label_de": "Beschreibung der Dienstleistung", "label_en": "Service Description", "type": "textarea", "required": true},
        {"key": "service_location", "label_de": "Ort der Leistungserbringung", "label_en": "Place of Performance", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Vergütung",
      "title_en": "Remuneration",
      "content_de": "Die Vergütung beträgt {{service_fee}} EUR. Zahlungsweise: {{payment_schedule}}. Die Vergütung ist innerhalb von {{payment_days_service}} Tagen nach Rechnungsstellung fällig.",
      "content_en": "The remuneration amounts to {{service_fee}} EUR. Payment schedule: {{payment_schedule}}. Payment is due within {{payment_days_service}} days of invoicing.",
      "fields": [
        {"key": "service_fee", "label_de": "Vergütung (EUR)", "label_en": "Fee (EUR)", "type": "text", "required": true},
        {"key": "payment_schedule", "label_de": "Zahlungsweise", "label_en": "Payment Schedule", "type": "select", "required": true, "options": ["Einmalig nach Abschluss", "Monatlich", "Nach Meilensteinen"]},
        {"key": "payment_days_service", "label_de": "Zahlungsfrist (Tage)", "label_en": "Payment Term (Days)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Laufzeit und Kündigung",
      "title_en": "Term and Termination",
      "content_de": "Der Vertrag beginnt am {{contract_start}} und endet am {{contract_end}}. Die Kündigungsfrist beträgt {{notice_period_service}} Wochen. Eine außerordentliche Kündigung aus wichtigem Grund bleibt unberührt (§ 626 BGB).",
      "content_en": "The contract begins on {{contract_start}} and ends on {{contract_end}}. The notice period is {{notice_period_service}} weeks. The right to extraordinary termination for good cause remains unaffected (§ 626 BGB).",
      "fields": [
        {"key": "contract_start", "label_de": "Vertragsbeginn", "label_en": "Contract Start", "type": "date", "required": true},
        {"key": "contract_end", "label_de": "Vertragsende", "label_en": "Contract End", "type": "date", "required": true},
        {"key": "notice_period_service", "label_de": "Kündigungsfrist (Wochen)", "label_en": "Notice Period (Weeks)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Haftung",
      "title_en": "Liability",
      "content_de": "Der Auftragnehmer haftet für Vorsatz und grobe Fahrlässigkeit unbeschränkt. Für leichte Fahrlässigkeit ist die Haftung auf {{service_liability_cap}} EUR beschränkt. Von der Haftungsbeschränkung ausgenommen sind Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.",
      "content_en": "The Contractor is liable without limitation for intent and gross negligence. For slight negligence, liability is limited to {{service_liability_cap}} EUR. Excluded from this limitation are damages arising from injury to life, body or health.",
      "fields": [
        {"key": "service_liability_cap", "label_de": "Haftungsobergrenze (EUR)", "label_en": "Liability Cap (EUR)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_service}}. Es gilt deutsches Recht. Ort: {{place_service}}, Datum: {{date_service}}",
      "content_en": "Place of jurisdiction is {{court_service}}. German law applies. Place: {{place_service}}, Date: {{date_service}}",
      "fields": [
        {"key": "court_service", "label_de": "Gerichtsstand", "label_en": "Place of Jurisdiction", "type": "text", "required": true},
        {"key": "place_service", "label_de": "Ort", "label_en": "Place", "type": "text", "required": true},
        {"key": "date_service", "label_de": "Datum", "label_en": "Date", "type": "date", "required": true}
      ]
    }
  ]
}
```

- [ ] **Step 4: Write seed_data/darlehensvertrag.json**

```json
{
  "title_de": "Standard-Darlehensvertrag",
  "title_en": "Standard Loan Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{lender_name}}, {{lender_address}} (im Folgenden \"Darlehensgeber\") und {{borrower_name}}, {{borrower_address}} (im Folgenden \"Darlehensnehmer\") wird folgender Darlehensvertrag geschlossen:",
      "content_en": "Between {{lender_name}}, {{lender_address}} (hereinafter \"Lender\") and {{borrower_name}}, {{borrower_address}} (hereinafter \"Borrower\") the following loan agreement is concluded:",
      "fields": [
        {"key": "lender_name", "label_de": "Name des Darlehensgebers", "label_en": "Lender Name", "type": "text", "required": true},
        {"key": "lender_address", "label_de": "Adresse des Darlehensgebers", "label_en": "Lender Address", "type": "text", "required": true},
        {"key": "borrower_name", "label_de": "Name des Darlehensnehmers", "label_en": "Borrower Name", "type": "text", "required": true},
        {"key": "borrower_address", "label_de": "Adresse des Darlehensnehmers", "label_en": "Borrower Address", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Darlehenssumme und Zinsen",
      "title_en": "Loan Amount and Interest",
      "content_de": "Der Darlehensgeber gewährt dem Darlehensnehmer ein Darlehen in Höhe von {{loan_amount}} EUR. Der jährliche Zinssatz beträgt {{interest_rate}}%. Der effektive Jahreszins beträgt {{effective_rate}}%.",
      "content_en": "The Lender grants the Borrower a loan in the amount of {{loan_amount}} EUR. The annual interest rate is {{interest_rate}}%. The effective annual interest rate is {{effective_rate}}%.",
      "fields": [
        {"key": "loan_amount", "label_de": "Darlehenssumme (EUR)", "label_en": "Loan Amount (EUR)", "type": "text", "required": true},
        {"key": "interest_rate", "label_de": "Zinssatz (% p.a.)", "label_en": "Interest Rate (% p.a.)", "type": "text", "required": true},
        {"key": "effective_rate", "label_de": "Effektiver Jahreszins (%)", "label_en": "Effective Annual Rate (%)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Rückzahlung",
      "title_en": "Repayment",
      "content_de": "Die Rückzahlung erfolgt in {{installments}} monatlichen Raten zu je {{installment_amount}} EUR. Die erste Rate ist am {{first_payment_date}} fällig. Vorzeitige Rückzahlung ist {{early_repayment}} zulässig (§ 489 BGB).",
      "content_en": "Repayment shall be made in {{installments}} monthly installments of {{installment_amount}} EUR each. The first installment is due on {{first_payment_date}}. Early repayment is {{early_repayment}} permitted (§ 489 BGB).",
      "fields": [
        {"key": "installments", "label_de": "Anzahl der Raten", "label_en": "Number of Installments", "type": "text", "required": true},
        {"key": "installment_amount", "label_de": "Ratenhöhe (EUR)", "label_en": "Installment Amount (EUR)", "type": "text", "required": true},
        {"key": "first_payment_date", "label_de": "Datum der ersten Rate", "label_en": "First Payment Date", "type": "date", "required": true},
        {"key": "early_repayment", "label_de": "Vorzeitige Rückzahlung", "label_en": "Early Repayment", "type": "select", "required": true, "options": ["jederzeit", "nur mit Zustimmung", "ausgeschlossen"]}
      ]
    },
    {
      "title_de": "Sicherheiten",
      "title_en": "Collateral",
      "content_de": "Der Darlehensnehmer stellt folgende Sicherheiten: {{collateral_description}}. Der Sicherungszweck umfasst alle bestehenden und künftigen Forderungen des Darlehensgebers aus diesem Vertrag.",
      "content_en": "The Borrower provides the following collateral: {{collateral_description}}. The security purpose covers all existing and future claims of the Lender arising from this agreement.",
      "fields": [
        {"key": "collateral_description", "label_de": "Beschreibung der Sicherheiten", "label_en": "Collateral Description", "type": "textarea", "required": true}
      ]
    },
    {
      "title_de": "Kündigung und Verzug",
      "title_en": "Termination and Default",
      "content_de": "Der Darlehensgeber kann das Darlehen bei Zahlungsverzug von mehr als {{default_months}} Monaten kündigen (§ 498 BGB). Bei Verzug fallen Verzugszinsen in Höhe von {{default_interest}}% über dem Basiszinssatz an (§ 288 BGB).",
      "content_en": "The Lender may terminate the loan if default in payment exceeds {{default_months}} months (§ 498 BGB). In case of default, default interest of {{default_interest}}% above the base rate shall apply (§ 288 BGB).",
      "fields": [
        {"key": "default_months", "label_de": "Verzugsmonate bis Kündigung", "label_en": "Default Months Until Termination", "type": "text", "required": true},
        {"key": "default_interest", "label_de": "Verzugszins (% über Basiszinssatz)", "label_en": "Default Interest (% Above Base Rate)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_loan}}. Es gilt deutsches Recht (§§ 488 ff. BGB). Ort: {{place_loan}}, Datum: {{date_loan}}",
      "content_en": "Place of jurisdiction is {{court_loan}}. German law applies (§§ 488 ff. BGB). Place: {{place_loan}}, Date: {{date_loan}}",
      "fields": [
        {"key": "court_loan", "label_de": "Gerichtsstand", "label_en": "Place of Jurisdiction", "type": "text", "required": true},
        {"key": "place_loan", "label_de": "Ort", "label_en": "Place", "type": "text", "required": true},
        {"key": "date_loan", "label_de": "Datum", "label_en": "Date", "type": "date", "required": true}
      ]
    }
  ]
}
```

- [ ] **Step 5: Write seed_data/nda.json**

```json
{
  "title_de": "Vertraulichkeitsvereinbarung (NDA)",
  "title_en": "Non-Disclosure Agreement (NDA)",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{disclosing_name}}, {{disclosing_address}} (im Folgenden \"Offenlegende Partei\") und {{receiving_name}}, {{receiving_address}} (im Folgenden \"Empfangende Partei\") wird folgende Vertraulichkeitsvereinbarung geschlossen:",
      "content_en": "Between {{disclosing_name}}, {{disclosing_address}} (hereinafter \"Disclosing Party\") and {{receiving_name}}, {{receiving_address}} (hereinafter \"Receiving Party\") the following confidentiality agreement is concluded:",
      "fields": [
        {"key": "disclosing_name", "label_de": "Name der offenlegenden Partei", "label_en": "Disclosing Party Name", "type": "text", "required": true},
        {"key": "disclosing_address", "label_de": "Adresse der offenlegenden Partei", "label_en": "Disclosing Party Address", "type": "text", "required": true},
        {"key": "receiving_name", "label_de": "Name der empfangenden Partei", "label_en": "Receiving Party Name", "type": "text", "required": true},
        {"key": "receiving_address", "label_de": "Adresse der empfangenden Partei", "label_en": "Receiving Party Address", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Vertrauliche Informationen",
      "title_en": "Confidential Information",
      "content_de": "Vertrauliche Informationen umfassen: {{confidential_scope}}. Die Informationen sind als vertraulich zu kennzeichnen oder mündlich unter Hinweis auf die Vertraulichkeit mitzuteilen.",
      "content_en": "Confidential information includes: {{confidential_scope}}. Information must be marked as confidential or communicated orally with reference to confidentiality.",
      "fields": [
        {"key": "confidential_scope", "label_de": "Umfang der vertraulichen Informationen", "label_en": "Scope of Confidential Information", "type": "textarea", "required": true}
      ]
    },
    {
      "title_de": "Pflichten der empfangenden Partei",
      "title_en": "Obligations of Receiving Party",
      "content_de": "Die empfangende Partei verpflichtet sich, die vertraulichen Informationen geheim zu halten, nicht an Dritte weiterzugeben und nur für {{purpose_nda}} zu verwenden. Die Geheimhaltungspflicht gilt für die Dauer von {{nda_term}} Jahren nach Vertragsende.",
      "content_en": "The Receiving Party undertakes to keep the confidential information secret, not to disclose it to third parties, and to use it only for {{purpose_nda}}. The confidentiality obligation applies for {{nda_term}} years after contract termination.",
      "fields": [
        {"key": "purpose_nda", "label_de": "Verwendungszweck", "label_en": "Purpose", "type": "textarea", "required": true},
        {"key": "nda_term", "label_de": "Dauer der Geheimhaltung (Jahre)", "label_en": "Confidentiality Term (Years)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Ausnahmen",
      "title_en": "Exceptions",
      "content_de": "Die Geheimhaltungspflicht gilt nicht für Informationen, die (a) bereits öffentlich bekannt sind, (b) der empfangenden Partei bereits vorher bekannt waren, (c) von Dritten ohne Geheimhaltungspflicht erlangt wurden, oder (d) aufgrund gesetzlicher Verpflichtung offengelegt werden müssen.",
      "content_en": "The confidentiality obligation does not apply to information that (a) is already publicly known, (b) was already known to the Receiving Party, (c) was obtained from third parties without a confidentiality obligation, or (d) must be disclosed due to a legal obligation.",
      "fields": []
    },
    {
      "title_de": "Vertragsstrafe",
      "title_en": "Contractual Penalty",
      "content_de": "Für jeden Fall der schuldhaften Verletzung der Geheimhaltungspflicht verpflichtet sich die empfangende Partei zur Zahlung einer Vertragsstrafe in Höhe von {{nda_penalty}} EUR. Weitergehende Schadensersatzansprüche bleiben unberührt.",
      "content_en": "For each case of culpable breach of the confidentiality obligation, the Receiving Party undertakes to pay a contractual penalty of {{nda_penalty}} EUR. Further claims for damages remain unaffected.",
      "fields": [
        {"key": "nda_penalty", "label_de": "Vertragsstrafe (EUR)", "label_en": "Contractual Penalty (EUR)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_nda}}. Es gilt deutsches Recht. Ort: {{place_nda}}, Datum: {{date_nda}}",
      "content_en": "Place of jurisdiction is {{court_nda}}. German law applies. Place: {{place_nda}}, Date: {{date_nda}}",
      "fields": [
        {"key": "court_nda", "label_de": "Gerichtsstand", "label_en": "Place of Jurisdiction", "type": "text", "required": true},
        {"key": "place_nda", "label_de": "Ort", "label_en": "Place", "type": "text", "required": true},
        {"key": "date_nda", "label_de": "Datum", "label_en": "Date", "type": "date", "required": true}
      ]
    }
  ]
}
```

- [ ] **Step 6: Write seed_data/arbeitsvertrag.json**

```json
{
  "title_de": "Standard-Arbeitsvertrag",
  "title_en": "Standard Employment Contract",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{employer_name}}, {{employer_address}} (im Folgenden \"Arbeitgeber\") und {{employee_name}}, {{employee_address}} (im Folgenden \"Arbeitnehmer\") wird folgender Arbeitsvertrag geschlossen:",
      "content_en": "Between {{employer_name}}, {{employer_address}} (hereinafter \"Employer\") and {{employee_name}}, {{employee_address}} (hereinafter \"Employee\") the following employment contract is concluded:",
      "fields": [
        {"key": "employer_name", "label_de": "Name des Arbeitgebers", "label_en": "Employer Name", "type": "text", "required": true},
        {"key": "employer_address", "label_de": "Adresse des Arbeitgebers", "label_en": "Employer Address", "type": "text", "required": true},
        {"key": "employee_name", "label_de": "Name des Arbeitnehmers", "label_en": "Employee Name", "type": "text", "required": true},
        {"key": "employee_address", "label_de": "Adresse des Arbeitnehmers", "label_en": "Employee Address", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Tätigkeit und Arbeitsort",
      "title_en": "Position and Place of Work",
      "content_de": "Der Arbeitnehmer wird als {{position}} eingestellt. Die Tätigkeit umfasst: {{job_description}}. Arbeitsort: {{work_location}}.",
      "content_en": "The Employee is employed as {{position}}. The duties include: {{job_description}}. Place of work: {{work_location}}.",
      "fields": [
        {"key": "position", "label_de": "Position", "label_en": "Position", "type": "text", "required": true},
        {"key": "job_description", "label_de": "Tätigkeitsbeschreibung", "label_en": "Job Description", "type": "textarea", "required": true},
        {"key": "work_location", "label_de": "Arbeitsort", "label_en": "Place of Work", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Arbeitszeit und Vergütung",
      "title_en": "Working Hours and Remuneration",
      "content_de": "Die wöchentliche Arbeitszeit beträgt {{working_hours}} Stunden. Das monatliche Bruttogehalt beträgt {{salary}} EUR. Urlaubsanspruch: {{vacation_days}} Werktage pro Jahr (§ 3 BUrlG).",
      "content_en": "The weekly working hours are {{working_hours}} hours. The monthly gross salary is {{salary}} EUR. Vacation entitlement: {{vacation_days}} working days per year (§ 3 BUrlG).",
      "fields": [
        {"key": "working_hours", "label_de": "Wöchentliche Arbeitszeit (Stunden)", "label_en": "Weekly Working Hours", "type": "text", "required": true},
        {"key": "salary", "label_de": "Monatliches Bruttogehalt (EUR)", "label_en": "Monthly Gross Salary (EUR)", "type": "text", "required": true},
        {"key": "vacation_days", "label_de": "Urlaubstage pro Jahr", "label_en": "Vacation Days per Year", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Vertragsdauer und Kündigung",
      "title_en": "Contract Duration and Termination",
      "content_de": "Das Arbeitsverhältnis beginnt am {{employment_start}}. Probezeit: {{probation_months}} Monate. Die Kündigungsfrist beträgt {{notice_period_emp}} Wochen (§ 622 BGB). Der Vertrag ist {{contract_type_emp}}.",
      "content_en": "The employment commences on {{employment_start}}. Probationary period: {{probation_months}} months. The notice period is {{notice_period_emp}} weeks (§ 622 BGB). The contract is {{contract_type_emp}}.",
      "fields": [
        {"key": "employment_start", "label_de": "Arbeitsbeginn", "label_en": "Start Date", "type": "date", "required": true},
        {"key": "probation_months", "label_de": "Probezeit (Monate)", "label_en": "Probation Period (Months)", "type": "text", "required": true},
        {"key": "notice_period_emp", "label_de": "Kündigungsfrist (Wochen)", "label_en": "Notice Period (Weeks)", "type": "text", "required": true},
        {"key": "contract_type_emp", "label_de": "Vertragsart", "label_en": "Contract Type", "type": "select", "required": true, "options": ["unbefristet", "befristet", "Teilzeit"]}
      ]
    },
    {
      "title_de": "Verschwiegenheit und Wettbewerb",
      "title_en": "Confidentiality and Competition",
      "content_de": "Der Arbeitnehmer verpflichtet sich zur Verschwiegenheit über Betriebsgeheimnisse. Jede {{external_activity}} Tätigkeit bedarf der vorherigen Zustimmung des Arbeitgebers.",
      "content_en": "The Employee undertakes to maintain confidentiality regarding trade secrets. Any {{external_activity}} activity requires the prior consent of the Employer.",
      "fields": [
        {"key": "external_activity", "label_de": "Nebentätigkeit", "label_en": "External Activity", "type": "select", "required": true, "options": ["wettbewerbsrelevante", "sonstige", "jede"]}
      ]
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_emp}}. Es gilt deutsches Recht. Ort: {{place_emp}}, Datum: {{date_emp}}",
      "content_en": "Place of jurisdiction is {{court_emp}}. German law applies. Place: {{place_emp}}, Date: {{date_emp}}",
      "fields": [
        {"key": "court_emp", "label_de": "Gerichtsstand", "label_en": "Place of Jurisdiction", "type": "text", "required": true},
        {"key": "place_emp", "label_de": "Ort", "label_en": "Place", "type": "text", "required": true},
        {"key": "date_emp", "label_de": "Datum", "label_en": "Date", "type": "date", "required": true}
      ]
    }
  ]
}
```

- [ ] **Step 7: Write seed_data/auftrag.json**

```json
{
  "title_de": "Standard-Auftrag / Geschäftsbesorgungsvertrag",
  "title_en": "Standard Agency/Mandate Agreement",
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{principal_name}}, {{principal_address}} (im Folgenden \"Auftraggeber\") und {{agent_name}}, {{agent_address}} (im Folgenden \"Beauftragter\") wird folgender Auftrag/Geschäftsbesorgungsvertrag geschlossen:",
      "content_en": "Between {{principal_name}}, {{principal_address}} (hereinafter \"Principal\") and {{agent_name}}, {{agent_address}} (hereinafter \"Agent\") the following agency/mandate agreement is concluded:",
      "fields": [
        {"key": "principal_name", "label_de": "Name des Auftraggebers", "label_en": "Principal Name", "type": "text", "required": true},
        {"key": "principal_address", "label_de": "Adresse des Auftraggebers", "label_en": "Principal Address", "type": "text", "required": true},
        {"key": "agent_name", "label_de": "Name des Beauftragten", "label_en": "Agent Name", "type": "text", "required": true},
        {"key": "agent_address", "label_de": "Adresse des Beauftragten", "label_en": "Agent Address", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Auftrag",
      "title_en": "Mandate",
      "content_de": "Der Auftraggeber beauftragt den Beauftragten mit der Besorgung folgender Geschäfte: {{mandate_description}}. Der Beauftragte nimmt den Auftrag an und verpflichtet sich zur ordnungsgemäßen Durchführung (§ 662 BGB).",
      "content_en": "The Principal instructs the Agent to carry out the following business: {{mandate_description}}. The Agent accepts the mandate and undertakes to carry it out properly (§ 662 BGB).",
      "fields": [
        {"key": "mandate_description", "label_de": "Beschreibung des Auftrags", "label_en": "Mandate Description", "type": "textarea", "required": true}
      ]
    },
    {
      "title_de": "Weisungsrecht und Berichtspflicht",
      "title_en": "Right of Instruction and Reporting Obligation",
      "content_de": "Der Auftraggeber ist weisungsberechtigt (§ 665 BGB). Der Beauftragte hat dem Auftraggeber auf Verlangen Auskunft zu erteilen und nach Beendigung des Auftrags Rechenschaft abzulegen (§ 666 BGB).",
      "content_en": "The Principal has the right to issue instructions (§ 665 BGB). The Agent shall provide information upon request and render account after termination of the mandate (§ 666 BGB).",
      "fields": []
    },
    {
      "title_de": "Vergütung und Aufwendungsersatz",
      "title_en": "Remuneration and Reimbursement",
      "content_de": "Die Vergütung beträgt {{mandate_fee}} EUR. Ist keine Vergütung vereinbart, gilt sie als stillschweigend vereinbart, wenn die Geschäftsbesorgung den Umständen nach nur gegen eine Vergütung zu erwarten ist (§ 612 BGB). Aufwendungen werden nach § 670 BGB ersetzt.",
      "content_en": "The remuneration amounts to {{mandate_fee}} EUR. If no remuneration is agreed, it is deemed to be tacitly agreed if the service can only be expected against remuneration under the circumstances (§ 612 BGB). Expenses are reimbursed pursuant to § 670 BGB.",
      "fields": [
        {"key": "mandate_fee", "label_de": "Vergütung (EUR)", "label_en": "Remuneration (EUR)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Beendigung",
      "title_en": "Termination",
      "content_de": "Der Auftrag kann jederzeit vom Auftraggeber widerrufen oder vom Beauftragten gekündigt werden (§ 671 BGB). Die Kündigung hat {{termination_notice}} Tage vorher zu erfolgen, um dem Auftraggeber die Möglichkeit zur anderweitigen Vorsorge zu geben.",
      "content_en": "The mandate may be revoked by the Principal or terminated by the Agent at any time (§ 671 BGB). Termination must be given {{termination_notice}} days in advance to allow the Principal to make alternative arrangements.",
      "fields": [
        {"key": "termination_notice", "label_de": "Kündigungsfrist (Tage)", "label_en": "Termination Notice (Days)", "type": "text", "required": true}
      ]
    },
    {
      "title_de": "Herausgabepflicht",
      "title_en": "Obligation to Return",
      "content_de": "Der Beauftragte ist verpflichtet, dem Auftraggeber alles, was er zur Ausführung des Auftrags erhält und was er aus der Geschäftsbesorgung erlangt, herauszugeben (§ 667 BGB).",
      "content_en": "The Agent is obliged to return to the Principal everything he receives for the execution of the mandate and everything he obtains from the business management (§ 667 BGB).",
      "fields": []
    },
    {
      "title_de": "Schlussbestimmungen",
      "title_en": "Final Provisions",
      "content_de": "Gerichtsstand ist {{court_mandate}}. Es gilt deutsches Recht (§§ 662 ff. BGB). Ort: {{place_mandate}}, Datum: {{date_mandate}}",
      "content_en": "Place of jurisdiction is {{court_mandate}}. German law applies (§§ 662 ff. BGB). Place: {{place_mandate}}, Date: {{date_mandate}}",
      "fields": [
        {"key": "court_mandate", "label_de": "Gerichtsstand", "label_en": "Place of Jurisdiction", "type": "text", "required": true},
        {"key": "place_mandate", "label_de": "Ort", "label_en": "Place", "type": "text", "required": true},
        {"key": "date_mandate", "label_de": "Datum", "label_en": "Date", "type": "date", "required": true}
      ]
    }
  ]
}
```

- [ ] **Step 8: Commit all seed data**

```bash
git add seed_data/
git commit -m "feat: add 7 contract template seed files (DE/EN BGB types)"
```

---

### Task 13: README.md — project documentation

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README.md**

```markdown
# Vertragsmanagementsystem / Contract Management System

A web-based contract template management and review system for German civil law (BGB) contracts.
Built with Flask + SQLite + Tailwind CSS.

## Quick Start

```bash
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000 in your browser.

## Features

- **7 German BGB contract types** with bilingual templates (DE/EN)
- **Dual fill mode:** Structured form + free-text editing with modification tracking
- **Review workflow:** pending → approved/rejected with comments
- **Template management:** Upload, download, category filtering
- **EN/DE language toggle** (session-based)
- **Red-flagged modifications:** Free-edited sections highlighted for reviewer attention

## URL Structure

| Route | Purpose |
|-------|---------|
| `/` | Home / navigation |
| `/templates` | Template management (upload/download) |
| `/fill/<id>` | Fill contract form |
| `/review` | Review dashboard |
| `/review/<id>` | Review detail + approve/reject |

## Project Structure

```
contract-system/
├── app.py              # Flask application
├── models.py           # SQLAlchemy models
├── database.py         # DB init + seeding
├── i18n.py             # EN/DE translations
├── templates/          # Jinja2 HTML templates
├── static/             # JavaScript
├── seed_data/          # 7 built-in contract templates (JSON)
└── uploads/            # Uploaded files
```

## Built With

- Python 3.9+
- Flask 3.x
- SQLAlchemy + SQLite
- Tailwind CSS (CDN)
- Vanilla JavaScript

## License

Internal use — project for demonstration/interview purposes.
```

- [ ] **Step 2: Add .gitignore**

```bash
cat > .gitignore << 'EOF'
__pycache__/
*.pyc
contract.db
uploads/*
!uploads/.gitkeep
.DS_Store
EOF
touch uploads/.gitkeep
```

- [ ] **Step 3: Commit**

```bash
git add README.md .gitignore uploads/.gitkeep
git commit -m "docs: add README and .gitignore"
```

---

### Task 14: End-to-end verification

- [ ] **Step 1: Start the app**

Run: `python3 app.py`
Expected: `* Running on http://127.0.0.1:5000`

- [ ] **Step 2: Verify home page**

Open `http://localhost:5000/` in browser.
Expected: Landing page with 3 cards + 7 category links. Nav bar shows EN/DE toggle.

- [ ] **Step 3: Verify template management**

Navigate to `http://localhost:5000/templates`.
Expected: 7 template cards shown (loaded from seed_data). Category filter pills work.

- [ ] **Step 4: Verify fill form**

Click "Fill" on any template.
Expected: Dual-mode form with fields on left, preview on right. Toggle between fill mode and free edit mode works.

- [ ] **Step 5: Fill and submit a contract**

Fill in all required fields and click Submit.
Expected: Redirect to home with success flash message.

- [ ] **Step 6: Verify review dashboard**

Navigate to `http://localhost:5000/review`.
Expected: Table shows the submission with status "Pending" (yellow).

- [ ] **Step 7: Verify review detail and approve**

Click "Enter →" on the submission. Click "Approve".
Expected: Status changes to "Approved" (green). Comment saved if entered.

- [ ] **Step 8: Verify language toggle**

Click "EN" in nav, then "DE".
Expected: All UI text switches between English and German.

- [ ] **Step 9: Test free-edit mode and red flagging**

Fill a contract, toggle to Free Edit mode, modify a section, submit.
On review detail page: Expected modified section highlighted with red border and "⚠ User-modified" badge.

- [ ] **Step 10: Final commit**

```bash
git add -A
git commit -m "chore: finalize implementation with all verifications passing"
```

---

## Implementation Notes

1. **Run order:** Tasks are sequential — do not skip ahead. Each task depends on previous files existing.
2. **Python version:** Requires Python 3.9+ (tested on 3.9.6).
3. **Tailwind CDN:** Uses Play CDN for development. For production, replace with built CSS.
4. **Secret key:** The app uses a hardcoded dev secret key. Change before any production deployment.
5. **File uploads:** Uploaded files stored in `uploads/`. No file size limits set — add validation for production.
6. **Jinja2 `|replace` filter:** Used in review_detail.html to replace placeholders with filled values. Works for simple cases; complex HTML in values may need `|safe` handling.
7. **Resubmission:** Currently, rejected contracts cannot be resubmitted. This would require a separate resubmission flow (future enhancement).
