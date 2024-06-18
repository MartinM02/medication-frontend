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
  postMedication(medication: medicationData) {
    return apiClient.post('api/medication', medication) // Pfad zum Endpoint für Medikamente
  },
}