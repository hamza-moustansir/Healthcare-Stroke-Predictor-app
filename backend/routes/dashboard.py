from flask import Blueprint, jsonify

def dashboard_routes(mysql):
    dashboard_routes = Blueprint("dashboard", __name__)

    @dashboard_routes.route("/stats", methods=["GET"])
    def get_stats():
     cursor = mysql.connection.cursor()

    # Anciennes statistiques
     cursor.execute("SELECT COUNT(*) FROM patients")
     total_patients = cursor.fetchone()[0]

     cursor.execute("SELECT COUNT(*) FROM patients WHERE hypertension = 1")
     hypertension_count = cursor.fetchone()[0]

     cursor.execute("SELECT COUNT(*) FROM patients WHERE heart_disease = 1")
     heart_disease_count = cursor.fetchone()[0]

     cursor.execute("SELECT COUNT(*) FROM patients WHERE avg_glucose_level > 180")
     high_glucose_count = cursor.fetchone()[0]

     cursor.execute("SELECT COUNT(*) FROM patients WHERE bmi > 30")
     high_bmi_count = cursor.fetchone()[0]

    # Nouvelles statistiques
     cursor.execute("SELECT COUNT(*) FROM patients WHERE stroke = 1")
     stroke_count = cursor.fetchone()[0]

     cursor.execute("SELECT work_type, COUNT(*) FROM patients GROUP BY work_type")
     work_type_distribution = {str(k): v for k, v in cursor.fetchall()}

     cursor.execute("SELECT ever_married, COUNT(*) FROM patients GROUP BY ever_married")
     married_distribution = {str(k): v for k, v in cursor.fetchall()}

     cursor.execute("SELECT AVG(age), AVG(avg_glucose_level), AVG(bmi) FROM patients")
     avg_results = cursor.fetchone()

     cursor.execute("""
        SELECT DATE(timestamp) as date, COUNT(*) 
        FROM patients 
        WHERE stroke = 1 
        GROUP BY DATE(timestamp) 
        ORDER BY date
    """)
     stroke_trend = [{"date": row[0], "count": row[1]} for row in cursor.fetchall()]
     
      # 🆕 Ajouter les AVC par work_type
     cursor.execute("SELECT work_type, COUNT(*) FROM patients WHERE stroke = 1 GROUP BY work_type")
     stroke_by_work_type = {str(k): v for k, v in cursor.fetchall()}

    # 🆕 Ajouter les AVC par statut marital (ever_married)
     cursor.execute("SELECT ever_married, COUNT(*) FROM patients WHERE stroke = 1 GROUP BY ever_married")
     stroke_by_married = {str(k): v for k, v in cursor.fetchall()}

     cursor.close()

     return jsonify({
        # Anciennes statistiques
        "total_patients": total_patients,
        "hypertension_count": hypertension_count,
        "heart_disease_count": heart_disease_count,
        "high_glucose_count": high_glucose_count,
        "high_bmi_count": high_bmi_count,

        # Nouvelles statistiques
        "stroke_count": stroke_count,
        "work_type_distribution": work_type_distribution,
        "married_distribution": married_distribution,
        "stroke_by_work_type": stroke_by_work_type,  # 🆕 Ajouté
        "stroke_by_married": stroke_by_married, 
        "averages": {
            "age": round(avg_results[0], 1),
            "glucose": round(avg_results[1], 1),
            "bmi": round(avg_results[2], 1)
        },
        "stroke_trend": stroke_trend
    })

    return dashboard_routes
