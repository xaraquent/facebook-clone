<script setup>
import { ref } from 'vue';
import {RouterLink} from "vue-router";
const user_ID= localStorage.getItem("user_ID")
const numberOfMessages = ref('');
const messages = ref([]);

fetch('http://localhost:3000/facebook/messages')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    numberOfMessages.value = data.length;
    messages.value = data;
  });
</script>

<template>
  <header>
      <h1>Facebook-klon</h1>
      <nav class="navbar">
    <div class="nav-left">
      <router-link :to="`/homeview/${userId}`" class="nav-link">Inlägg</router-link>
      <router-link :to="`/messages/${userId}`" class="nav-link">Chatt</router-link>
    </div>
    <div class="nav-right">
      <router-link to="/" class="log-out-button">Logga ut</router-link>
    </div>
  </nav>
    </header>
    <main>
  <section class="chat-container">
    <p>Antal meddelande: {{ numberOfMessages }}</p>
    <p v-for="message in messages" :key="message._id">{{ message.message_content }} {{ message.message_reaction }}</p>
    <!-- <p v-for="message in messages" :key="message._id">{{ message.message_reaction }}</p> -->
  </section>
  </main>
</template>

<style scoped>
header {
  background-color: #1877f2;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 20px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 100px 20px 100px;
  border-bottom: 1px solid #ccc;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #abbbe4;
}

.log-out-button {
  background-color: #e53935;
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.log-out-button:hover {
  background-color: #c62828;
}
main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Chattsektion */
.chat-container {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Antal meddelanden */
.chat-container p:first-of-type {
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 16px;
}

/* Varje meddelande */
.chat-container p:not(:first-of-type) {
  background-color: #f0f2f5;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 1.4;
  color: #333;
  word-wrap: break-word;
}
</style>