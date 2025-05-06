from flask import Blueprint, request, jsonify
from datetime import datetime

def patient_routes(mysql, model):  # Ajouter `model` comme paramètre
    patient_routes = Blueprint("patient", __name__)

    @patient_routes.route("/predict", methods=["POST"])
    def predict():
        try:
            data = request.get_json()
            patient_data = (
                float(data["age"]),
                int(data["hypertension"]),
                int(data["heart_disease"]),
                float(data["avg_glucose_level"]),
                float(data["bmi"]),
                int(data["ever_married"]),
                int(data["work_type"])
            )
            result = model.predict_and_recommend(patient_data)  # Utiliser le modèle

            # Ajouter le patient à la base de données
            cursor = mysql.connection.cursor()
            cursor.execute("""
                INSERT INTO patients (nom, prenom, age, hypertension, heart_disease, avg_glucose_level, bmi, ever_married, work_type, stroke)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                data["nom"], data["prenom"], data["age"], data["hypertension"],
                data["heart_disease"], data["avg_glucose_level"], data["bmi"],
                data["ever_married"], data["work_type"], result["stroke"]
            ))
            mysql.connection.commit()
            cursor.close()

            return jsonify(result)
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @patient_routes.route("/patients", methods=["GET"])
    def get_patients():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM patients")
        patients = cursor.fetchall()
        cursor.close()

        # Convertir les tuples en dictionnaires
        patients_list = []
        for patient in patients:
            patients_list.append({
                "id": patient[0],
                "nom": patient[1],
                "prenom": patient[2],
                "age": patient[3],
                "hypertension": patient[4],
                "heart_disease": patient[5],
                "avg_glucose_level": patient[6],
                "bmi": patient[7],
                "ever_married": patient[8],
                "work_type": patient[9],
                "stroke": patient[10],
                "timestamp": patient[11],
            })

        return jsonify(patients_list)

    return patient_routes