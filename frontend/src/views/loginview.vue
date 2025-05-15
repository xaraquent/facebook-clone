<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const message = ref('');

const router = useRouter();

function login(event) {
  fetch('http://localhost:3000/facebook/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_email: email.value,
      user_password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        localStorage.setItem('user_ID', data.user_ID);
        localStorage.setItem('user_name', data.user_name);
        router.push(`homeview/${data.user_ID}`);
      } else {
        //Sätter message till det felmeddelande som man får från backend
        message.value = data.message;
      }
    });
}
</script>

<template>
  <h1>Logga in</h1>
  <section class="login-container">
    <form @submit.prevent="login" class="login">
      <label for="email-input">Skriv in din mail:</label>
      <input type="email" id="email-input" name="email" v-model="email" />
      <label for="password-input">Skriv in ditt lösenord:</label>
      <input type="password" name="password" id="password-input" v-model="password" />
      <input type="submit" value="Logga in" />
      <p v-if="message !== ''">{{ message }}</p>
    </form>
  </section>
</template>

<style scoped>
.login-container {
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

.login {
  background: white;
  margin-top: 20px;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  display: flex;
  flex-direction: column;
}

.login label {
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
}

.login input[type="email"],
.login input[type="password"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.login input[type="submit"] {
  margin-top: 15px;
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.login input[type="submit"]:hover {
  background-color: #145dd1;
}

.login p {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
