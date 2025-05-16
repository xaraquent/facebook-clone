<script setup>
import { ref } from 'vue';
fetch('http://localhost:3000/facebook/messages')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
</script>

<template>
  <section class="chat-container">
    <h1>hej</h1>
  </section>
</template>
