from flask_mysqldb import MySQL

def create_patient(mysql, data):
    cursor = mysql.connection.cursor()
    query = """
    INSERT INTO patients (nom, prenom, age, hypertension, heart_disease, avg_glucose_level, bmi, ever_married, work_type, stroke)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        data["nom"], data["prenom"], data["age"], data["hypertension"],
        data["heart_disease"], data["avg_glucose_level"], data["bmi"],
        data["ever_married"], data["work_type"], data["stroke"]
    ))
    mysql.connection.commit()
    cursor.close()

def get_all_patients(mysql):
    cursor = mysql.connection.cursor()
    query = "SELECT * FROM patients"
    cursor.execute(query)
    patients = cursor.fetchall()
    cursor.close()
    return patients