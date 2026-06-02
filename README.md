# 📋 Vertragsmanagementsystem · Contract Management System

<div align="center">

**Eine webbasierte Anwendung zur Verwaltung, Befüllung und Prüfung von Vertragsvorlagen nach deutschem Zivilrecht (BGB).**

*A web-based application for managing, filling, and reviewing contract templates under German civil law (BGB).*

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-demo-orange)](https://github.com/malala2409/contract-system-Vertragsmanagementsystem)
[![Python](https://img.shields.io/badge/python-3.9+-blue)](https://python.org)
[![Flask](https://img.shields.io/badge/flask-3.1-red)](https://flask.palletsprojects.com/)

</div>

---

## 📖 Inhaltsverzeichnis · Table of Contents

- [✨ Übersicht · Overview](#-übersicht--overview)
- [📸 Screenshots](#-screenshots)
- [🚀 Quick Start](#-quick-start)
- [⚡ Zwei Versionen · Two Versions](#-zwei-versionen--two-versions)
- [📁 Vertragstypen · Contract Types](#-vertragstypen--contract-types)
- [🔄 Workflow](#-workflow)
- [🌐 Internationalisierung · Internationalization](#-internationalisierung--internationalization)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Projektstruktur · Project Structure](#-projektstruktur--project-structure)
- [🔀 Routen · Routes](#-routen--routes)
- [📄 Lizenz · License](#-lizenz--license)

---

## ✨ Übersicht · Overview

Das **Vertragsmanagementsystem** ist eine vollständige Webanwendung für die Vertragsverwaltung in Kanzleien und Rechtsabteilungen. Es bildet den gesamten Lebenszyklus eines Vertrags ab: von der **Vorlagenverwaltung** über die **Befüllung durch den Vertrieb** bis hin zur **rechtlichen Prüfung und Freigabe**.

**Kernfunktionen auf einen Blick:**

| Funktion | Beschreibung |
|----------|-------------|
| 📁 **Vorlagenverwaltung** | 7 BGB-Vertragstypen, Upload/Download, Kategorie-Filter |
| ✍️ **Vertriebsportal** | Ausfüllen mit Formular- oder Freitextmodus, Vorschau, Einreichung |
| 🔍 **Prüfungs-Workflow** | Status-Automation (Eingereicht → Genehmigt/Abgelehnt), Prüfnotizen mit Verlauf |
| 🛠 **Template-Editor** | Visueller Editor + Drag-and-Drop-Assistent für neue Vorlagen |
| 🌐 **Zweisprachigkeit** | Vollständige DE/EN-Internationalisierung (164+ Übersetzungsschlüssel) |
| 📎 **Dokumenten-Upload** | Word (.docx) und PDF-Anhänge zu jeder Vorlage |

---

## 📸 Screenshots

> Alle Screenshots zeigen die **Static-Version** (`index.html`) — läuft komplett im Browser, kein Server nötig.

### 🏠 Startseite · Home

<div align="center">
  <img src="docs/screenshots/01-home-de.png" alt="Startseite Deutsch" width="48%">
  <img src="docs/screenshots/02-home-en.png" alt="Home English" width="48%">
  <p><em>Dreiportal-Navigation (Vorlagen · Vertrieb · Prüfung) — vollständig zweisprachig DE/EN</em></p>
</div>

---

### 📁 Vorlagenverwaltung · Template Management

<div align="center">
  <img src="docs/screenshots/03-template-management.png" alt="Vorlagenverwaltung" width="90%">
  <p><em>Übersicht aller Vertragsvorlagen mit Kategorie-Filter — Daten persistent in localStorage</em></p>
</div>

---

### 🛠 Template-Editor · Template Editor

<div align="center">
  <img src="docs/screenshots/04-template-editor.png" alt="Template Editor" width="90%">
  <p><em>Drag-and-Drop-Assistent zum Erstellen neuer Vorlagen aus vordefinierten Bausteinen</em></p>
</div>

---

### ✍️ Vertrag ausfüllen · Fill Contract

<div align="center">
  <img src="docs/screenshots/05-fill-contract.png" alt="Vertrag ausfüllen" width="90%">
  <p><em>Direktes Ausfüllen eines Vertrags: strukturiertes Formular mit Feldern aus der Vorlage</em></p>
</div>

---

### 🛒 Vertriebsportal · Sales Portal

<div align="center">
  <img src="docs/screenshots/06-sales-home.png" alt="Vertriebsportal Dashboard" width="90%">
  <p><em>Personalisiertes Dashboard mit eigenen eingereichten Verträgen und ausfüllbaren Vorlagen</em></p>
</div>

<table>
<tr>
<td width="50%"><img src="docs/screenshots/07-sales-fill.png" alt="Vertrag ausfüllen (Vertrieb)"><br><em>Ausfüllprozess mit Formular- und Freitextmodus</em></td>
<td width="50%"><img src="docs/screenshots/08-sales-preview.png" alt="Vorschau vor Einreichung"><br><em>Vorschauseite mit farblich hervorgehobenen Platzhaltern vor der Einreichung</em></td>
</tr>
</table>

<div align="center">
  <img src="docs/screenshots/09-sales-submissions.png" alt="Eingereichte Verträge" width="90%">
  <p><em>Status-Übersicht aller eingereichten Verträge (ausstehend / genehmigt / abgelehnt)</em></p>
</div>

---

### 🔍 Prüfungs-Workflow · Review Workflow

<table>
<tr>
<td width="50%"><img src="docs/screenshots/10-review-dashboard.png" alt="Prüfungs-Dashboard"><br><em>Übersicht aller eingereichten Verträge mit Status-Filter</em></td>
<td width="50%"><img src="docs/screenshots/11-review-detail.png" alt="Prüfungs-Detailansicht"><br><em>Detailprüfung mit additiven Notizen, Historie und Genehmigung/Ablehnung</em></td>
</tr>
</table>

---

## 🚀 Quick Start

### ⚡ Static-Version (keine Installation)

Die Static-Version läuft vollständig im Browser mit localStorage — kein Server nötig.

```bash
# Einfach im Browser öffnen:
open index.html

# Oder mit jedem HTTP-Server:
python3 -m http.server 8080
# → http://localhost:8080
```

🌍 **Live-Demo:** [malala2409.github.io/contract-system](https://malala2409.github.io/contract-system/)

---

### 🐍 Flask-Version (mit Backend)

```bash
# 1. Abhängigkeiten installieren
pip install -r requirements.txt

# 2. Anwendung starten
python app.py

# 3. Im Browser öffnen
open http://localhost:5000
```

Die Datenbank wird beim ersten Start automatisch mit 7 BGB-Vertragsvorlagen befüllt.

---

## ⚡ Zwei Versionen · Two Versions

| Eigenschaft | Static | Flask |
|------------|--------|-------|
| **Technologie** | Vanilla JS (ES6), localStorage | Python 3.9+, Flask, SQLAlchemy |
| **Datenbank** | localStorage (clientseitig) | SQLite (serverseitig) |
| **Installation** | Keine — `open index.html` | `pip install -r requirements.txt` |
| **Deployment** | Browser (`file://`) oder GitHub Pages | Jeder WSGI-Server |
| **Multi-User** | Nein (eine Browser-Session) | Ja (gemeinsame DB) |
| **Datei-Upload** | Nein | Ja (.docx, .pdf) |
| **Empfohlen für** | Demo, Einzelplatz, schnelles Testen | Produktion, Team-Einsatz |

Beide Versionen teilen sich dieselbe Codebasis für Templates, Logik und Internationalisierung.

---

## 📁 Vertragstypen · Contract Types

Das System enthält **7 BGB-Vertragsvorlagen** — jede mit detaillierten, zweisprachigen Abschnitten und ausfüllbaren Feldern:

| # | Vertragstyp | BGB-Vorschriften | Typische Felder |
|---|------------|-------------------|-----------------|
| 1 | **Kaufvertrag** | §§ 433 ff. BGB | Parteien, Kaufgegenstand, Kaufpreis, Lieferung, Gefahrübergang, Mängelhaftung |
| 2 | **Mietvertrag** | §§ 535 ff. BGB | Parteien, Mietsache, Miete, Betriebskosten, Kaution, Kündigungsfristen |
| 3 | **Dienstvertrag** | §§ 611 ff. BGB | Parteien, Leistungsumfang, Vergütung, Haftung, Kündigung |
| 4 | **Werkvertrag / Auftrag** | §§ 631 ff. BGB | Parteien, Werkerfolg, Vergütung, Abnahme, Mängelansprüche |
| 5 | **Darlehensvertrag** | §§ 488 ff. BGB | Parteien, Darlehensbetrag, Zinssatz, Tilgung, Sicherheiten |
| 6 | **Arbeitsvertrag** | §§ 611a ff. BGB | Parteien, Tätigkeit, Arbeitszeit, Vergütung, Urlaub, Kündigung |
| 7 | **Geheimhaltungsvereinbarung (NDA)** | §§ 280, 823 BGB | Parteien, Geheimnisdefinition, Nutzungsbeschränkung, Laufzeit, Vertragsstrafe |

Jede Vorlage kann über den **Template-Editor** angepasst oder durch eigene ersetzt werden.

---

## 🔄 Workflow

```mermaid
flowchart LR
    A["🗂 Vorlagenverwaltung\n(Admin / Staff)"] --> B["✏️ Ausfüllen & Einreichen\n(Vertriebsportal)"]
    B --> C["⚖️ Rechtliche Prüfung\n(Compliance-Team)"]
    B --> D["❌ Ablehnung\nmit Kommentar → Überarb."]
    C --> E["✅ Genehmigt\nProzess abgeschlossen"]
    C --> D
    D --> B
```

1. **Vorlagen anlegen** — Admin/Staff erstellt und pflegt Vertragsvorlagen (Template-Editor)
2. **Vertrag ausfüllen** — Vertrieb wählt Vorlage, füllt Felder aus (strukturiert oder Freitext), sieht Vorschau und reicht ein
3. **Prüfung** — Rechtsabteilung prüft den eingereichten Vertrag:
   - ✅ **Genehmigen** — Vertrag ist freigegeben
   - ❌ **Ablehnen** — mit Kommentar und Prüfnotizen → Vertrieb überarbeitet und reicht erneut ein
4. **Prüfhistorie** — Jeder Schritt wird mit Zeitstempel dokumentiert

---

## 🌐 Internationalisierung · Internationalization

- **164+ Übersetzungsschlüssel** in DE und EN
- Session-basierte Sprachumschaltung (`/lang/de` ↔ `/lang/en`)
- Vorlageninhalte vollständig zweisprachig (deutsche und englische Klauseltexte)
- UI-Elemente, Statusbezeichnungen, Flash-Messages — alles übersetzt
- Eigenes, leichtgewichtiges i18n-System (keine externen Abhängigkeiten)

---

## 🛠 Tech Stack

| Ebene | Technologie |
|-------|------------|
| **Backend** | Python 3.9+, Flask 3.1, Jinja2 |
| **ORM** | SQLAlchemy + Flask-SQLAlchemy |
| **Datenbank** | SQLite |
| **Frontend** | Jinja2 Templates, Tailwind CSS (CDN), Vanilla JS (ES6) |
| **Static Alt.** | localStorage, SessionStorage, Hash-basierter SPA-Router |
| **Fonts** | DM Sans, DM Serif Display, DM Mono (Google Fonts) |
| **i18n** | Eigenes Session-basiertes System (DE/EN), 164+ Keys |

---

## 📂 Projektstruktur · Project Structure

```
Vertragsmanagementsystem/
│
├── app.py                      # Flask-Anwendung (Routen, Helpers, MIME-Upload)
├── models.py                   # SQLAlchemy-Modelle (Category, Template, Submission)
├── database.py                 # DB-Initialisierung & Seed-Templates (7 Vertragstypen)
├── i18n.py                     # DE/EN-Übersetzungstabelle (164+ Keys)
├── requirements.txt            # Python-Abhängigkeiten
├── index.html                  # Entry-Point für die Static-Version (SPA)
│
├── templates/                  # Jinja2 HTML-Templates (Flask-Version)
│   ├── base.html               # Basis-Layout mit Navbar & Footer
│   ├── home.html               # Startseite mit 3-Portal-Navigation
│   ├── manage.html             # Vorlagenverwaltung (Upload, Filter, Download)
│   ├── template_editor.html    # Drag-and-Drop Vorlagen-Assistent
│   ├── fill.html               # Vertragsformular (strukturiert + Freitext)
│   ├── sales_home.html         # Vertriebsportal-Dashboard
│   ├── sales_overview.html     # Vorschau vor Einreichung
│   ├── sales_view.html         # Eingereichten Vertrag einsehen (read-only)
│   ├── review_list.html        # Prüfungs-Dashboard mit Status-Filter
│   └── review_detail.html      # Detailprüfung mit Notizen & Historie
│
├── js/                         # JavaScript-Module (Static-Version)
│   ├── app.js                  # Main Render Dispatcher & Init
│   ├── router.js               # Hash-basierter SPA-Router
│   ├── store.js                # localStorage CRUD-Operationen
│   ├── data.js                 # Seed-Daten (Kategorien & Templates)
│   ├── i18n.js                 # Client-seitige Übersetzungen
│   ├── components.js           # Wiederverwendbare UI-Komponenten
│   ├── home.js                 # Startseite
│   ├── templates.js            # Vorlagenverwaltung
│   ├── editor.js               # Template-Editor
│   ├── fill.js                 # Vertragsformular
│   ├── sales.js                # Vertriebsportal
│   └── review.js               # Prüfungs-Workflow
│
├── seed_data/                  # Flask-Seed-Daten (JSON)
│   ├── kaufvertrag.json        # Kaufvertrag (§§ 433 ff. BGB)
│   ├── mietvertrag.json        # Mietvertrag (§§ 535 ff. BGB)
│   ├── dienstvertrag.json      # Dienstvertrag (§§ 611 ff. BGB)
│   ├── auftrag.json            # Werkvertrag / Auftrag (§§ 631 ff. BGB)
│   ├── darlehensvertrag.json   # Darlehensvertrag (§§ 488 ff. BGB)
│   ├── arbeitsvertrag.json     # Arbeitsvertrag (§§ 611a ff. BGB)
│   └── nda.json                # Geheimhaltungsvereinbarung (NDA)
│
├── static/
│   └── script.js               # Client-seitige Logik (Flask-Version)
│
├── uploads/                    # Hochgeladene Dokumente (.docx, .pdf)
├── docs/
│   └── screenshots/            # Screenshots für README
│
└── .github/workflows/
    └── static.yml              # GitHub Pages Deployment
```

---

## 🔀 Routen · Routes

### Startseite

| Route | Beschreibung |
|-------|-------------|
| `/` | Startseite mit Drei-Portal-Navigation (Vorlagen · Vertrieb · Prüfung) |
| `/lang/<de\|en>` | Sprache wechseln |

### Vorlagenverwaltung (Admin / Staff)

| Route | Methode | Beschreibung |
|-------|---------|-------------|
| `/templates` | `GET` | Alle Vorlagen mit Kategorie-Filter anzeigen |
| `/templates` | `POST` | Neue Vorlage hochladen (Word/PDF) |
| `/templates/create` | `GET/POST` | Drag-and-Drop-Assistent für neue Vorlagen |
| `/templates/<id>/update` | `POST` | Vorlage bearbeiten (Metadaten, Abschnitte) |
| `/templates/<id>/download` | `GET` | Angehängte Datei herunterladen |
| `/templates/<id>/delete` | `POST` | Vorlage löschen (Passwort: `1111`) |

### Vertriebsportal

| Route | Methode | Beschreibung |
|-------|---------|-------------|
| `/sales` | `GET/POST` | Login & persönliches Dashboard |
| `/sales/fill/<id>` | `GET/POST` | Vertrag ausfüllen (Formular- + Freitextmodus) |
| `/sales/preview/<id>` | `GET/POST` | Vorschau vor Einreichung → Einreichen |
| `/sales/view/<sub_id>` | `GET` | Eingereichten Vertrag einsehen (read-only) |
| `/sales/edit/<sub_id>` | `GET/POST` | Abgelehnten Vertrag überarbeiten & neu einreichen |

### Prüfungs-Workflow

| Route | Methode | Beschreibung |
|-------|---------|-------------|
| `/review` | `GET` | Prüfungs-Dashboard mit Status-Filter |
| `/review/<id>` | `GET/POST` | Detailprüfung: Genehmigen, Ablehnen, Notizen hinzufügen |

### Staff (direkt)

| Route | Beschreibung |
|-------|-------------|
| `/fill/<id>` | Vertrag direkt ausfüllen (ohne Vertriebsportal) |

---

## 🔑 Standard-Passwort

Das Löschen von Vorlagen erfordert ein Passwort. Standard: **`1111`**

> ⚠️ Das Passwort sollte in einer Produktivumgebung über die App-Konfiguration geändert werden.

---

## 📄 Lizenz · License

MIT License — siehe [LICENSE](LICENSE)

---

<div align="center">

**Entwickelt mit Python Flask, SQLAlchemy & Tailwind CSS**

<sub>7 BGB-Vertragstypen · 164+ i18n-Keys · Zweisprachig DE/EN · Static + Flask</sub>

</div>
