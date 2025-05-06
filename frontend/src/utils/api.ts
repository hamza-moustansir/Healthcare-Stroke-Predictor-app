import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

interface LoginResponse {
  token: string;
}

interface PatientData {
  nom: string;
  prenom: string;
  age: number;
  hypertension: number;
  heart_disease: number;
  avg_glucose_level: number;
  bmi: number;
  ever_married: number;
  work_type: number;
}

interface PatientResponse {
  stroke: boolean; // Risque d'AVC (true = élevé, false = faible)
  recommendations?: string[]; // Recommandations (optionnel)
}

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

export const addPatient = async (patientData: PatientData): Promise<PatientResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, patientData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Failed to add patient" };
  }
};

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients`);
    console.log("Patients data from API:", response.data); // Ajoutez ce log
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Failed to fetch patients" };
  }
};

export const fetchStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};