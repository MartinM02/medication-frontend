import axios from 'axios';

interface FormData {
  id?: number;
  name: string;
  quantity: string;
  dose: number;
  period: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  submitForm(formData: FormData) {
    return apiClient.post('/api/medication', formData);
  },
  getFormData() {
    return apiClient.get<FormData[]>('/api/medication');
  },
  deleteFormData(id: number) {
    return apiClient.delete(`/api/medication/${id}`);
  },

  updateForm(id: number, formData: FormData) {
    return apiClient.put(`/api/medication/${id}`, formData);
  },
};
