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
  methods: {
    addMedicine() {
      this.medicines.push({...this.medicine});
      this.medicine.name = '';
      this.medicine.quantity = 0;
      this.medicine.dose = '';
      this.medicine.period = '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 750px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #444;
}

input[type="text"], input[type="number"] {
  width: 100%;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
}

.btn:hover {
  background-color: #218838;
}

.medicine-list {
  list-style-type: none;
  padding: 0;
}

.medicine-list li {
  padding: 8px;
  margin-bottom: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: black; /* Text in Schwarz */
}
</style>