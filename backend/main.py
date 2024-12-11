from flask import Flask
from extensions import db
from routes import routes

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Register routes
app.register_blueprint(routes)

# Ensure database is created
@app.before_request
def create_tables():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
