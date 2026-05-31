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
