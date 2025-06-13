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
        localStorage.setItem('user_id', data.data.user_id);
        localStorage.setItem('user_name', data.data.user_name);
        router.push(`homeview/${data.data.user_id}`);
      } else {
        error.value = data.message;
      }
    });
}
</script>

<template>
  <h1>Skapa konto</h1>
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

<style scoped>
.sign-up-container {
  background-color: #f0f2f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  color: #1877f2;
  margin-top: 40px;
  font-size: 28px;
}

.sign-up {
  background: white;
  margin-top: 20px;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  display: flex;
  flex-direction: column;
}

.sign-up label {
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
}

.sign-up input[type='text'],
.sign-up input[type='email'],
.sign-up input[type='password'] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.sign-up input[type='submit'] {
  margin-top: 15px;
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.sign-up input[type='submit']:hover {
  background-color: #145dd1;
}

p {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
