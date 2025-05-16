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
  <section class="chat-container">
    <router-link :to="`/homeview/${user_ID}`" class="Home-button">till backa</router-link>
    <p>Antal meddelande: {{ numberOfMessages }}</p>
    <p v-for="message in messages" :key="message._id">{{ message.message_content }} {{ message.message_reaction }}</p>
    <!-- <p v-for="message in messages" :key="message._id">{{ message.message_reaction }}</p> -->
  </section>
</template>
