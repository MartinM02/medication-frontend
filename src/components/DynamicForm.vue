<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api/api';

interface FormData {
  id?: number;
  name: string;
  quantity: string;
  dose: number;
  period: string;
}

interface MedicationData extends FormData {
  id: number;
}

const name = ref('');
const quantity = ref('');
const dose = ref(0);
const period = ref('');
const submittedMedication = ref<MedicationData[]>([]);
const errorMessage = ref('');
const editingMedication = ref<MedicationData | null>(null);

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
    if (editingMedication.value) {
      const response = await api.updateForm(editingMedication.value.id, formData);
      const index = submittedMedication.value.findIndex(med => med.id === editingMedication.value!.id);
      submittedMedication.value[index] = { ...formData, id: response.data.id! };
      editingMedication.value = null;
    } else {
      const response = await api.submitForm(formData);
      const newMedication: MedicationData = { ...formData, id: response.data.id! };
      submittedMedication.value.push(newMedication);
    }
    name.value = '';
    quantity.value = '';
    dose.value = 0;
    period.value = '';
  } catch (error) {
    console.error('Error submitting form:', error);
    errorMessage.value = 'Failed to submit form.';
  }
};

const editMedication = (medication: MedicationData) => {
  name.value = medication.name;
  quantity.value = medication.quantity;
  dose.value = medication.dose;
  period.value = medication.period;
  editingMedication.value = medication;
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

const sortDirectionName = ref('asc');
const sortDirectionDose = ref('asc');

const sortByName = () => {
  if (sortDirectionName.value === 'asc') {
    submittedMedication.value.sort((a, b) => a.name.localeCompare(b.name));
    sortDirectionName.value = 'desc';
  } else {
    submittedMedication.value.sort((a, b) => b.name.localeCompare(a.name));
    sortDirectionName.value = 'asc';
  }
};

const sortByDose = () => {
  if (sortDirectionDose.value === 'asc') {
    submittedMedication.value.sort((a, b) => a.dose - b.dose);
    sortDirectionDose.value = 'desc';
  } else {
    submittedMedication.value.sort((a, b) => b.dose - a.dose);
    sortDirectionDose.value = 'asc';
  }
};

onMounted(fetchFormData);
</script>

<template>
  <div>
    <h2>Enter Your Details:</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Name" />
      <input v-model="quantity" placeholder="Quantity" />
      <input v-model="dose" placeholder="Dose" />
      <input v-model="period" placeholder="Period" />
      <button type="submit" class="submit">{{ editingMedication ? 'Update' : 'Submit' }}</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <h2>Submitted Forms:</h2>
    <table>
      <thead>
      <tr>
        <th @click="sortByName" role="button">Name</th>
        <th>Quantity</th>
        <th @click="sortByDose" role="button">Dose (in mg)</th>
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
          <button @click="editMedication(form)" class="edit">Edit</button>
          <button @click="deleteMedication(form.id)" class="delete">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

button {
  background-color: var(--color-background); /* Hintergrundfarbe der App */
  border: none;
  color: #2b2b2c; /* Textfarbe der Buttons */
  padding: 8px 16px; /* kleinere Größe */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}

button.submit {
  background-color: #006400; /* Dunkleres Grün */
}

button.edit {
  background-color: #1462de; /* Dunkleres Blau */
}

button.delete {
  background-color: #8B0000; /* Dunkleres Rot */
}

button.submit:hover, button.edit:hover, button.delete:hover {
  background-color: #000000; /* Schwarz beim Überfahren mit der Maus */
}

button:hover {
  background-color: black;
}


input {
  display: block;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px; /* Fügt abgerundete Ecken hinzu */
  background-color: #f0f0f0; /* Setzt den Hintergrund auf ein einheitliches Hellgrau */
  color: #000000; /* Setzt die Textfarbe auf Schwarz */
}

input:focus {
  outline: none; /* Entfernt den blauen Fokus-Rahmen */
  border-color: #006400; /* Setzt die Rahmenfarbe beim Fokussieren auf Dunkelgrün */
}

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
}

th[role="button"] {
  cursor: pointer;
  text-decoration: underline;
}
</style>