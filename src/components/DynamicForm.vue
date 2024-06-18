<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api/api';

interface FormData {
  name: string;
  quantity: number;
  dose: number;
  period: string;
}

const name = ref('');
const quantity = ref(0);
const dose = ref(0);
const period = ref('');
const submittedForms = ref<FormData[]>([]);
const errorMessage = ref('');

const fetchFormData = async () => {
  try {
    const response = await api.getFormData();
    submittedForms.value = response.data;
  } catch (error) {
    console.error("Failed to fetch form data", error);
    errorMessage.value = "Failed to load form data.";
  }
};

const submitForm = async () => {
  try {
    const formData: FormData = {
      name: name.value,
      quantity: quantity.value,
      dose: dose.value,
      period: period.value
    };
    await api.submitForm(formData);
    submittedForms.value.push(formData); // Aktualisiere die lokale Liste, ohne erneut zu laden
    name.value = '';
    quantity.value = 0;
    dose.value = 0;
    period.value = '';
  } catch (error) {
    console.error('Error submitting form:', error);
    errorMessage.value = 'Failed to submit form.';
  }
};

onMounted(fetchFormData);
</script>

<template>
  <div>
    <h2>Enter Your Details:</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Name" />
      <input type="number" v-model="quantity" placeholder="Quantity" />
      <input type="number" v-model="dose" placeholder="Dose" />
      <input v-model="period" placeholder="Period" />
      <button type="submit">Submit</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <h2>Submitted Forms:</h2>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Dose</th>
        <th>Period</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(form, index) in submittedForms" :key="index">
        <td>{{ form.name }}</td>
        <td>{{ form.quantity }}</td>
        <td>{{ form.dose }}</td>
        <td>{{ form.period }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
input, button {
  display: block;
  margin: 10px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
}
</style>