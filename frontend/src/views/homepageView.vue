<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <h1>Välkommen till Facebook-clone</h1>
  <section>
    <div class="signup">
      <label for="signup-btn" name="sign up">Skapa Konto</label>
      <button id="signup-btn"><router-link to="/users">Skapa Konto</router-link></button>
    </div>
    <div class="login">
      <label for="login-btn" name="login">Logga In</label>
      <button id="login-btn"><router-link to="/login">Logga In</router-link></button>
    </div>
  </section>
</template>

<style scoped></style>
