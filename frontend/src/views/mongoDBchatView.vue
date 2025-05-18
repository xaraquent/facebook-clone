<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const user_ID = localStorage.getItem('user_ID');
const numberOfMessages = ref('');
const messages = ref([]);
const newMessage = ref(''); //Användarens textinmatining

function fetchMessages() {
  fetch('http://localhost:3000/facebook/messages')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      numberOfMessages.value = data.length;
      messages.value = data;
    });
}

fetchMessages();

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  const newMessageData = {
    chatID: 10,
    messageID: Date.now(),
    messageUserID: Number(user_ID),
    messageContent: newMessage.value,
    messageReaction: '',
  };

  fetch('http://localhost:3000/facebook/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMessageData),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Fel vid sändning');
      return res.json();
    })
    .then(() => {
      newMessage.value = '';
      fetchMessages();
    })
    .catch((err) => console.error(err));
};
</script>

<template>
  <header>
    <h1>Facebook-klon</h1>
    <nav class="navbar">
      <div class="nav-left">
        <router-link :to="`/homeview/${user_ID}`" class="nav-link">Inlägg</router-link>
        <router-link :to="`/messages/${user_ID}`" class="nav-link">Chatt</router-link>
      </div>
      <div class="nav-right">
        <router-link to="/" class="log-out-button">Logga ut</router-link>
      </div>
    </nav>
  </header>
  <main>
    <section class="chat-container">
      <router-link :to="`/homeview/${user_ID}`" class="Home-button">tillbaka</router-link>
      <p>Antal meddelande: {{ numberOfMessages }}</p>
      <p v-for="message in messages" :key="message._id">
        {{ message.message_content }} {{ message.message_reaction }}
      </p>
      <!-- <p v-for="message in messages" :key="message._id">{{ message.message_reaction }}</p> -->
    </section>
    <section class="input-text">
      <div class="input-section">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Skriv ett meddelande"
          class="message-input"
        />
        <button @click="sendMessage" class="send-button">Skicka</button>
      </div>
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
.input-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-right: 10px;
  outline: none;
}

.send-button {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
