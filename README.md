# Vertragsmanagementsystem (Contract Management System)

Eine webbasierte Anwendung zur Verwaltung, Befüllung und Prüfung von Vertragsvorlagen nach deutschem Zivilrecht (BGB). In zwei Versionen verfügbar.

| Version | Technologie | Deployment |
|---------|------------|------------|
| **Static** (empfohlen) | Vanilla JS, localStorage | Browser (file://) oder GitHub Pages |
| Flask | Python Flask, SQLite | `python app.py` |

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-demo-orange)

---

## 🚀 Quick Start

### Static (keine Installation)

```bash
open index.html
```

Oder direkt: **[GitHub Pages Demo](https://malala2409.github.io/contract-system/)**

### Flask (klassisch)

```bash
pip install -r requirements.txt
python app.py  # → http://localhost:5000
```

---

## ✨ Funktionen

### 📁 Vorlagenverwaltung
- **7 BGB-Vertragstypen** mit zweisprachigen (DE/EN), detaillierten Vorlagen:
  - Kaufvertrag (§§ 433 ff. BGB)
  - Mietvertrag (§§ 535 ff. BGB)
  - Dienstvertrag (§§ 611 ff. BGB)
  - Werkvertrag / Auftrag (§§ 631 ff. BGB)
  - Darlehensvertrag (§§ 488 ff. BGB)
  - Arbeitsvertrag (§§ 611a ff. BGB)
  - Geheimhaltungsvereinbarung (NDA)
- **Upload & Download** von Word/PDF-Dateien als Anhänge
- **Kategorie-Filter** zur Übersicht

### ✍️ Vertriebsportal (Sales Portal)
- Zweistufiger Ausfüllprozess: **Ausfüllen → Vorschau → Einreichen**
- **Dualer Füllmodus**: Strukturiertes Formular + Freitextbearbeitung
- Modifizierte Abschnitte werden bei der Prüfung **rot markiert**
- Personalisierte Übersicht eigener eingereichter Verträge

### 🔍 Prüfungs-Workflow
- Status-Automation: `Eingereicht → Genehmigt / Abgelehnt`
- **Additive Prüfnotizen** mit Zeitstempel und Verlauf
- Ablehnung mit Kommentar → Überarbeitung durch Vertrieb → erneute Einreichung
- Prüfhistorie für jeden Vertrag nachvollziehbar

### 🛠 Template-Editor
- **Visueller Section-Editor** — Abschnitte direkt im Browser bearbeiten
- **Drag-and-Drop-Assistent** — neue Vorlagen aus Bausteinen zusammenstellen
- JSON-basierte Abschnittsspeicherung mit Feldextraktion

### 🌐 Internationalisierung
- Vollständige **DE/EN-Zweisprachigkeit** mit Session-Management
- Alle UI-Texte, Vorlagen und Statusbezeichnungen zweisprachig

---

## 🛠 Tech Stack

| Ebene | Technologie |
|-------|------------|
| Backend | Python 3.9+, Flask, SQLAlchemy ORM |
| Datenbank | SQLite |
| Frontend | Jinja2 Templates, Tailwind CSS (CDN) |
| JavaScript | Vanilla JS (ES6), Fetch API |
| 18n | Eigenes Session-basiertes System (DE/EN) |

---

## 🚀 Quick Start

```bash
# 1. Abhängigkeiten installieren
pip install -r requirements.txt

# 2. Anwendung starten
python app.py
```

Öffnen: **[http://localhost:5000](http://localhost:5000)**

Die Seed-Datenbank wird beim ersten Start automatisch mit 7 BGB-Vertragsvorlagen befüllt.

---

## 📂 Projektstruktur

```
contract-system/
├── app.py                  # Flask-Anwendung (Routes, Helpers)
├── models.py               # SQLAlchemy-Modelle (Category, Template, Submission)
├── database.py             # DB-Initialisierung & Seed-Templates
├── i18n.py                 # DE/EN-Übersetzungen (164+ Keys)
├── requirements.txt        # Python-Abhängigkeiten
├── templates/              # Jinja2 HTML-Templates
│   ├── base.html           # Basis-Layout
│   ├── home.html           # Startseite mit Navigation
│   ├── manage.html         # Vorlagenverwaltung (Admin/Staff)
│   ├── template_editor.html # Visueller Template-Editor
│   ├── fill.html           # Vertrag ausfüllen
│   ├── sales_*.html        # Vertriebsportal-Seiten
│   └── review_*.html       # Prüfungs-Dashboard
├── static/
│   └── script.js           # Client-seitige Logik
├── seed_data/              # 7 BGB-Vertragsvorlagen (JSON)
└── uploads/                # Hochgeladene Dateien
```

---

## 🔀 URL-Struktur

| Route | Zweck |
|-------|-------|
| `/` | Startseite mit Navigation (3 Portale) |
| `/templates` | Vorlagenverwaltung (Upload, Download, Bearbeiten) |
| `/templates/create` | Drag-and-Drop Vorlagen-Assistent |
| `/templates/<id>/update` | Abschnitte & Metadaten aktualisieren |
| `/sales` | Vertriebsportal (Login, Übersicht) |
| `/sales/fill/<id>` | Vertrag ausfüllen |
| `/sales/preview/<id>` | Vorschau vor Einreichung |
| `/sales/view/<sub_id>` | Eingereichten Vertrag einsehen |
| `/sales/edit/<sub_id>` | Abgelehnten Vertrag bearbeiten |
| `/fill/<id>` | Direkt ausfüllen (Staff) |
| `/review` | Prüfungs-Dashboard |
| `/review/<id>` | Vertrag prüfen (genehmigen/ablehnen/notieren) |
| `/lang/<de\|en>` | Sprache wechseln |

---

## 🔑 Standard-Passwort

Das Löschen von Vorlagen erfordert ein Passwort:
```
1111
```

---

## 📸 Screenshots

| Seite | Beschreibung |
|-------|-------------|
| Startseite | 3-Portal-Navigation (Vorlagen, Vertrieb, Prüfung) mit Kategorien |
| Vorlagenverwaltung | Upload, Download, Filter, visueller Editor |
| Vertriebsportal | Ausfüllen mit Formular-/Freitextmodus, Vorschau |
| Prüfungs-Dashboard | Status-Filter, Prüfverlauf, additive Notizen |

---

## 📄 Lizenz

MIT License — siehe [LICENSE](LICENSE)

---

<p align="center">
  <sub>Entwickelt mit Python Flask, SQLAlchemy & Tailwind CSS</sub>
</p>
