<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api/api';

interface FormData {
  id?: number;
  name: string;
  quantity: number;
  dose: number;
  period: string;
}

interface MedicationData extends FormData {
  id: number; // ID sollte immer gesetzt sein
}

const name = ref('');
const quantity = ref(0);
const dose = ref(0);
const period = ref('');
const submittedMedication = ref<MedicationData[]>([]);
const errorMessage = ref('');

const fetchFormData = async () => {
  try {
    const response = await api.getFormData();
    submittedMedication.value = response.data.map(item => ({
      id: item.id!,
      name: item.name,
      quantity: item.quantity,
      dose: item.dose,
      period: item.period
    }));
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
    const response = await api.submitForm(formData);
    const newMedication: MedicationData = { ...formData, id: response.data.id! }; // Stelle sicher, dass die ID korrekt gesetzt wird
    submittedMedication.value.push(newMedication); // Aktualisiere die lokale Liste, ohne erneut zu laden
    name.value = '';
    quantity.value = 0;
    dose.value = 0;
    period.value = '';
  } catch (error) {
    console.error('Error submitting form:', error);
    errorMessage.value = 'Failed to submit form.';
  }
};


const deleteMedication = async (id: number) => {
  try {
    await api.deleteFormData(id);
    submittedMedication.value = submittedMedication.value.filter(medication => medication.id !== id);
  } catch (error) {
    console.error('Error deleting medication:', error);
    errorMessage.value = 'Failed to delete medication.';
  }
};

onMounted(fetchFormData);


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
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="form in submittedMedication" :key="form.id">
        <td>{{ form.name }}</td>
        <td>{{ form.quantity }}</td>
        <td>{{ form.dose }}</td>
        <td>{{ form.period }}</td>
        <td>
          <button @click="deleteMedication(form.id)">Delete</button>
        </td>
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