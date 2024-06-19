// src/api/api.ts
import axios from 'axios'

interface medicationData {
  name: string;
  quantity: string;
  dose: number;
  period: number;
}

interface medicationResponse {
  id: number;
  quantity: string;
  dose: number;
  period: number;
}

interface FormData {
  name: string;
  quantity: number;
  dose: number;
  period: string;
}

const apiClient = axios.create({
  baseURL: 'https://medication-spring-boot.onrender.com', // URL deines Backends
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getRoot() {
    return apiClient.get('/')
  },
  getMedications() {
    return apiClient.get<medicationResponse[]>('api/medication') // Pfad zum Endpoint für Medikamente
  },
  postMedication() {
    return apiClient.get<medicationData[]>('api/medication') // Pfad zum Endpoint für Medikamente
  },
  submitForm(formData: FormData) {
    return apiClient.post('/api/medication', formData);
  },
  getFormData() {
    return apiClient.get<FormData[]>('/api/formData'); // Pfad angepasst an deinen Server-Endpoint
  },
}