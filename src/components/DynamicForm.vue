<template>
  <div class="container">
    <h2>Medikament hinzufügen</h2>
    <form @submit.prevent="addMedicine">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="medicine.name" required>
      </div>
      <div class="form-group">
        <label for="quantity">Menge:</label>
        <input type="number" id="quantity" v-model.number="medicine.quantity" required>
      </div>
      <div class="form-group">
        <label for="dose">Dosis:</label>
        <input type="text" id="dose" v-model="medicine.dose" required>
      </div>
      <div class="form-group">
        <label for="period">Zeitraum:</label>
        <input type="text" id="period" v-model="medicine.period" required>
      </div>
      <button type="submit" class="btn">Hinzufügen</button>
    </form>
    <h3>Medikamente:</h3>
    <ul class="medicine-list">
      <li v-for="(med, index) in medicines" :key="index">
        {{ med.name }} - Menge: {{ med.quantity }}, Dosis: {{ med.dose }}, Zeitraum: {{ med.period }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      medicine: {
        name: '',
        quantity: 0,
        dose: '',
        period: ''
      },
      medicines: []
    };
  },
  mounted() {
    this.fetchMedicines();
  },
  methods: {
    addMedicine() {
      api.addMedication(this.medicine)
        .then(response => {
          this.medicines.push(response.data);
          this.medicine.name = '';
          this.medicine.quantity = 0;
          this.medicine.dose = '';
          this.medicine.period = '';
          alert('Medicine added successfully!');
        })
        .catch(error => {
          console.error('Error while adding medication:', error);
        });
    },
    fetchMedicines() {
      api.getMedications()
        .then(response => {
          this.medicines = response.data;
          console.log('Medikamente geladen:', this.medicines);
        })
        .catch(error => {
          console.error('Fehler beim Laden der Medikamente:', error);
        });
    }
  }
};
</script>

<style scoped>
</style>