from flask_mysqldb import MySQL

def create_user(mysql, email, password):
    cursor = mysql.connection.cursor()
    query = "INSERT INTO users (email, password) VALUES (%s, %s)"
    cursor.execute(query, (email, password))
    mysql.connection.commit()
    cursor.close()

def get_user_by_email(mysql, email):
    cursor = mysql.connection.cursor()
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    user = cursor.fetchone()
    cursor.close()
    return user