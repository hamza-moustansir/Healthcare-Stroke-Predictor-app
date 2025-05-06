from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
from config import MYSQL_CONFIG
from models.q_learning_model import QLearningModel
from routes.auth import auth_routes
from routes.patient import patient_routes
from routes.dashboard import dashboard_routes

app = Flask(__name__)
CORS(app)

# Configuration de MySQL
app.config["MYSQL_HOST"] = MYSQL_CONFIG["host"]
app.config["MYSQL_USER"] = MYSQL_CONFIG["user"]
app.config["MYSQL_PASSWORD"] = MYSQL_CONFIG["password"]
app.config["MYSQL_DB"] = MYSQL_CONFIG["database"]
mysql = MySQL(app)

# Initialisation du modèle Q-Learning
model = QLearningModel("data/healthcare-dataset.csv")
model.train(episodes=1)

# Enregistrement des routes avec la connexion MySQL et le modèle
app.register_blueprint(auth_routes(mysql))
app.register_blueprint(patient_routes(mysql, model))  # Passer le modèle ici
app.register_blueprint(dashboard_routes(mysql))

if __name__ == "__main__":
    app.run(debug=True)