// src/api/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://medication-spring-boot.onrender.com', // URL deines Backends
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getRoot() {
    return apiClient.get('/');
  },
  getMedications() {
    return apiClient.get('/medication'); // Pfad zum Endpoint für Medikamente
  }
};