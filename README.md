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
