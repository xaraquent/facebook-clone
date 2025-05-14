<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const now = new Date();
const error = ref('');

let user_created_date = now.toISOString().slice(0, 10);

const router = useRouter();

function registerNewUser(event) {
  fetch('http://localhost:3000/facebook/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_name: name.value,
      user_email: email.value,
      user_password: password.value,
      user_created_date: user_created_date,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        localStorage.setItem('user_ID', data.data.user_ID);
        localStorage.setItem('user_name', data.data.user_name);
        router.push(`homeview/${data.data.user_ID}`);
      } else {
        error.value = data.message;
      }
    });
}
</script>

<template>
  <h1>Skapa ditt konto</h1>
  <section class="sign-up-container">
    <form @submit.prevent="registerNewUser" class="sign-up">
      <label for="name-input">Skriv in ditt namn:</label>
      <input type="text" id="name-input" name="name" v-model="name" />
      <label for="email-input">Skriv in din mail:</label>
      <input type="email" id="email-input" name="email" v-model="email" />
      <label for="password-input">Skriv in ditt lösenord:</label>
      <input type="password" name="password" id="password-input" v-model="password" />
      <input type="submit" value="Registera konto" />
      <p v-if="error !== ''">{{ error }}</p>
    </form>
  </section>
</template>

<style scoped></style>
