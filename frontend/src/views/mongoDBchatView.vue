<script setup>
import { ref } from 'vue';

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
  <section class="chat-container">
    <p>Antal meddelande: {{ numberOfMessages }}</p>
    <p v-for="message in messages" :key="message._id">{{ message.message_content }}</p>
  </section>
</template>
