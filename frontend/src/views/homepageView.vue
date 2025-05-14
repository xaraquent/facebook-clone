<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="start-page">
    <header class="start-header">
      <h1>Facebook-Klon</h1>
    </header>

    <main class="start-box">
      <h2>Välkommen!</h2>
      <p>Vänligen logga in eller skapa ett nytt konto.</p>

      <div class="start-actions">
        <router-link to="/users" class="action-btn">Skapa Konto</router-link>
        <router-link to="/login" class="action-btn">Logga In</router-link>
      </div>
    </main>
  </div>
</template>

<style scoped>
.start-page {
  background-color: #f0f2f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-header {
  background-color: #1877f2;
  color: white;
  padding: 20px;
  width: 100%;
  text-align: center;
  font-size: 24px;
}

.start-box {
  background: white;
  margin-top: 50px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
}

.start-box h2 {
  margin-bottom: 10px;
}

.start-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-btn {
  background-color: #1877f2;
  color: white;
  padding: 10px 0;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: #145dd1;
}
</style>
