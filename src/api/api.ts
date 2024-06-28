import axios from 'axios';

interface FormData {
  id?: number;
  name: string;
  quantity: number;
  dose: number;
  period: string;
}

const apiClient = axios.create({
  baseURL: 'https://medication-spring-boot.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  submitForm(formData: FormData) {
    return apiClient.post('/api/medication', formData);
  },
  getFormData() {
    return apiClient.get<FormData[]>('/api/medication'); // Pfad angepasst an deinen Server-Endpoint
  },
  deleteFormData(id: number) {
    return apiClient.delete(`/api/medication/${id}`);
  },
};
