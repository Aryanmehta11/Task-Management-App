from backend.extensions import db
from datetime import datetime

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entity_name = db.Column(db.String(100), nullable=False)
    task_type = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    contact_person = db.Column(db.String(100), nullable=False)
    note = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='open')
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
