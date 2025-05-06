from flask import Blueprint, request, jsonify
import hashlib

def auth_routes(mysql):
    auth_routes = Blueprint("auth", __name__)

    @auth_routes.route("/register", methods=["POST"])
    def register():
        data = request.get_json()
        email = data.get("email")
        password = hashlib.sha256(data.get("password").encode()).hexdigest()  # Hash du mot de passe

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            return jsonify({"error": "Cet email est déjà utilisé"}), 400

        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Utilisateur créé avec succès"}), 201

    @auth_routes.route("/login", methods=["POST"])
    def login():
        data = request.get_json()
        email = data.get("email")
        password = hashlib.sha256(data.get("password").encode()).hexdigest()  # Hash du mot de passe

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            # Convertir le tuple en dictionnaire
            user_dict = {
                "id": user[0],
                "email": user[1],
                "password": user[2],
            }
            if user_dict["password"] == password:
                return jsonify({"message": "Connexion réussie", "token": "fake-jwt-token"}), 200
            else:
                return jsonify({"error": "Email ou mot de passe incorrect"}), 401
        else:
            return jsonify({"error": "Email ou mot de passe incorrect"}), 401

    return auth_routes