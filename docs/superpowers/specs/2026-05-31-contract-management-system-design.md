# Contract Management System — Design Specification

**Date:** 2026-05-31
**Status:** Design Approved, Ready for Implementation Planning

---

## 1. Project Summary

A web-based contract template management and review system for internal company use. Built with Python Flask + SQLite + Tailwind CSS (CDN). Supports German civil law (BGB) contract types with English/German bilingual UI.

## 2. Requirements

### 2.1 User Roles
- **Staff (Admin):** Upload/download contract templates, manage categories
- **Colleagues (Fillers):** Open templates, fill in blanks or freely modify, submit
- **Reviewers:** Review submitted contracts, approve or reject with comments

### 2.2 Contract Types (7 initial)
1. Kaufvertrag (Purchase Agreement) — §§ 433 ff. BGB
2. Mietvertrag (Lease/Rental) — §§ 535 ff. BGB
3. Dienstvertrag (Service Contract) — §§ 611 ff. BGB
4. Darlehensvertrag (Loan Agreement) — §§ 488 ff. BGB
5. NDA (Confidentiality) — § 241 II BGB
6. Arbeitsvertrag (Employment) — §§ 611a ff. BGB
7. Auftrag (Agency/Mandate) — §§ 662 ff. BGB

### 2.3 Key Features
- **Template Management:** Upload/download, categorized browsing, search
- **Fill Mode A (Standard):** Fill predefined fields in each section
- **Fill Mode B (Free Edit):** Edit entire sections freely; modifications tracked and red-flagged for reviewer
- **Review Workflow:** pending → approved | rejected (with comment)
- **Bilingual:** EN/DE toggle via Flask session, all UI text translated
- **No Authentication (MVP):** Entries separated by URL paths (`/templates`, `/fill/<id>`, `/review`)

## 3. Architecture

### 3.1 Tech Stack
- **Backend:** Flask (Python 3)
- **Database:** SQLite (via SQLAlchemy)
- **Templates:** Jinja2 + Tailwind CSS CDN
- **Client JS:** Vanilla JavaScript (form preview, mode toggle, diff tracking)
- **No build tools, no npm, no Node.js required**

### 3.2 URL Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/` | GET | Home / navigation |
| `/templates` | GET, POST | Template management (list, upload) |
| `/templates/<id>/download` | GET | Download template file |
| `/templates/<id>/delete` | POST | Delete template |
| `/fill/<id>` | GET, POST | Fill + submit contract |
| `/review` | GET | Review dashboard (list) |
| `/review/<id>` | GET, POST | Review detail + approve/reject |
| `/lang/<lang>` | GET | Switch language (EN/DE) |

### 3.3 Data Model
```python
categories (id, name_de, name_en, slug, created_at)
templates  (id, category_id FK, title_de, title_en, sections JSON, file_path, created_at)
submissions (id, template_id FK, filled_data JSON, status, review_comment, submitted_at, reviewed_at)
```

### 3.4 File Structure
```
contract-system/
├── app.py              # Flask routes + logic
├── models.py           # SQLAlchemy models
├── database.py         # DB init + seed data
├── i18n.py             # EN/DE translations dict
├── requirements.txt    # Flask, SQLAlchemy, python-docx
├── templates/
│   ├── base.html       # Layout + nav + lang toggle
│   ├── home.html       # Home page
│   ├── manage.html     # Template management
│   ├── fill.html       # Fill form (dual mode)
│   ├── review_list.html    # Review dashboard
│   └── review_detail.html  # Review detail + approve/reject
├── static/
│   └── script.js       # Client-side logic
├── uploads/            # Uploaded files
└── seed_data/          # Built-in template JSONs
```

## 4. Core Design Details

### 4.1 Template Structure (JSON)
Each template consists of an ordered list of sections:
```json
{
  "sections": [
    {
      "title_de": "Parteien",
      "title_en": "Parties",
      "content_de": "Zwischen {{seller_name}} (Verkäufer) und {{buyer_name}} (Käufer)...",
      "content_en": "Between {{seller_name}} (Seller) and {{buyer_name}} (Buyer)...",
      "fields": [
        {"key": "seller_name", "label_de": "Verkäufer", "label_en": "Seller", "type": "text", "required": true},
        {"key": "buyer_name", "label_de": "Käufer", "label_en": "Buyer", "type": "text", "required": true}
      ]
    }
  ]
}
```

### 4.2 Dual Fill Mode
- **Fill Mode:** Each `{{placeholder}}` renders as an input field. User fills values.
- **Free Edit Mode:** Each section's content becomes a textarea pre-filled with the rendered text. User edits freely.
- **Tracking:** Content sections modified in Free Edit mode are stored with `modified: true` in the JSON.
- **Review display:** Modified sections get a red border/background and a warning badge "⚠ User-modified".

### 4.3 Review Workflow
```
submission → status: pending
                      ├→ approved (✔ with timestamp)
                      └→ rejected (✘ with comment → back to pending on resubmit)
```

### 4.4 Bilingual Implementation
- Translation dictionary in `i18n.py` (DE ↔ EN, ~60 keys)
- Flask session stores current language
- Jinja2 templates use `{{ t('key') }}` helper
- Template sections contain both `content_de` and `content_en`

## 5. Development Priorities
| P | Feature | Est. |
|---|---------|------|
| P0 | Project skeleton: Flask + SQLite + Tailwind + i18n + base.html | 1h |
| P1 | Template management: 7 categories + 7 templates + upload/download | 2h |
| P2 | Fill form: dual mode + live preview + submit | 3h |
| P3 | Review backend: dashboard list + detail + red marking + approve/reject | 2h |
| P4 | Seed data: Complete sample texts for all 7 contract types | 1h |
| P5 | Polish: responsive, error handling, README | 1h |

## 6. Future Extensions
- Multi-level review workflow
- User authentication (login system)
- Email notifications
- Cloud deployment
- DOCX import/export with python-docx
- Contract version history
