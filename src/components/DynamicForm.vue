<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- Form fields here -->
    </form>
    <div v-if="submittedMedication.length">
      <div v-for="medication in submittedMedication" :key="medication.id">
        {{ medication.name }}
      </div>
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  data() {
    return {
      submittedMedication: [],
      errorMessage: '',
      name: '',
      quantity: '',
      dose: '',
      period: ''
    }
  },
  methods: {
    async fetchFormData() {
      try {
        const response = await apiClient.get('/medications')
        this.submittedMedication = response.data
      } catch (error) {
        this.errorMessage = 'Failed to load form data.'
      }
    },
    async submitForm() {
      try {
        const response = await apiClient.post('/medications', {
          name: this.name,
          quantity: this.quantity,
          dose: this.dose,
          period: this.period
        })
        this.submittedMedication.push(response.data)
      } catch (error) {
        this.errorMessage = 'Failed to submit form.'
      }
    },
    editMedication(medication) {
      this.name = medication.name
      this.quantity = medication.quantity
      this.dose = medication.dose
      this.period = medication.period
    },
    async deleteMedication(id) {
      try {
        await apiClient.delete(`/medications/${id}`)
        this.submittedMedication = this.submittedMedication.filter(med => med.id !== id)
      } catch (error) {
        this.errorMessage = 'Failed to delete medication.'
      }
    }
  },
  mounted() {
    this.fetchFormData()
  }
}
</script>
