Healthcare Stroke Predictor �⚕️
Predict stroke risk based on health data using Machine Learning (ML) with Flask API and React frontend.


📌 Features
Machine Learning Model: Predicts stroke risk based on input parameters (age, hypertension, heart disease, glucose levels, etc.).

Flask API: Backend server handling predictions.

React Frontend: User-friendly interface to input data and view predictions.

🚀 Technologies Used
Frontend: React.js, TailwindCSS, shadcn

Backend: Python, Flask, JWT

Machine Learning: Scikit-learn, Pandas, NumPy

Database: mySQL

⚙️ Installation & Setup

Python 3.8+

Node.js 16+

pip & npm installed

1. Clone the Repository
bash
git clone https://github.com/yourusername/Healthcare-Stroke-Predictor-app.git

cd Healthcare-Stroke-Predictor-app

3. Backend Setup (Flask)

cd backend

python -m venv venv

source venv/bin/activate  # Linux/Mac

venv\Scripts\activate     # Windows

pip install -r requirements.txt

flask run
(The API will run at http://localhost:5000)

3. Frontend Setup (React)

cd frontend

npm install

npm start
(The app will run at http://localhost:3000)

📊 ML Model Details

Algorithm: Q-Learning

Features Used:
Age,
Hypertension,
Heart Disease,
Avg. Glucose Level,
BMI,
Smoking Status.


📜 License
MIT License. See LICENSE.
