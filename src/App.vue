<script setup lang="ts">
import { ref } from 'vue';

const darkMode = ref(false);

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <div class="switch">
          <input type="checkbox" id="darkModeSwitch" @change="toggleDarkMode" :checked="darkMode">
          <label for="darkModeSwitch">{{ darkMode ? '' : '' }}</label>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

input[type="text"], input[type="number"], .medicine-list li {
  color: black; /* Setzt die Textfarbe aller Input-Felder und Listenelemente auf Schwarz /
}

input[type="text"]:focus, input[type="number"]:focus {
  color: black; / Stellt sicher, dass der Text auch beim Fokussieren der Felder schwarz bleibt /
}

.medicine-list li {
  color: black; / Stellt sicher, dass der Text in der Liste der Medikamente immer schwarz ist */
}
.switch {
  position: relative;
  display: inline-block;
  width: 40px; /* Reduzierte Breite */
  height: 20px; /* Reduzierte Höhe */
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.switch label:before {
  height: 16px; /* Reduzierte Höhe des Schiebereglers */
  width: 16px; /* Reduzierte Breite des Schiebereglers */
}

input:checked + label {
  background-color: #2196F3;
}

input:checked + label:before {
  transform: translateX(20px); /* Reduzierter Versatz des Schiebereglers */
}

body.dark-mode nav a.router-link-exact-active {
  color: #ffffff; /* Weißer Text im Dark Mode */
}

</style>
