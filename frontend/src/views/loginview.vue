<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const router = useRouter();

function login() {
  fetch('http://localhost:3000/login', {
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
      if (data.sucess) {
        localStorage.setItem('userID', data.userID);
        localStorage.setItem(userName, data.userName);
        router.push(`homeview/${data.userID}`);
      }
    });
}
</script>

<template>
  <h1>Logga in</h1>
  <section class="login-container">
    <form action="homeview/:userID" class="login">
      <label for="email-input">Skriv in din mail:</label>
      <input type="email" id="email-input" name="email" v-model="email" />
      <label for="password-input">Skriv in ditt lösenord:</label>
      <input type="password" name="password" id="password-input" v-model="password" />
      <input type="submit" @click="login" />
    </form>
  </section>
</template>

<style scoped>
.login-container {
  margin: auto;
}
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

section {
  position: relative;
  width: 300px;
  height: 490px;
  padding: 2rem 1.2rem;
  background: #ffffff;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  margin: auto;
}

section:after {
  content: '';
  position: absolute;
  top: -20%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: #fdb813;
  border-radius: 50%;
}

.required {
  color: #e34;
}

.heading p {
  font-size: 0.8rem;
}

form {
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 0.9rem;
}

.input {
  position: relative;
  display: flex;
  flex-direction: column;
}

.label {
  display: flex;
  align-items: center;
}

.label .requirement {
  margin-left: 8px;
  color: #e34;
  font-size: 1.2rem;
}

.input input {
  position: relative;
  height: 40px;
  margin: 0.8rem 0;
  outline: none;
  border-radius: 4px;
  border: 3px solid #5d329f;
  background: #eae9e9;
  padding: 0 2rem;
  transition: 0.5s ease;
}

.input input:focus {
  background: transparent;
  border-color: #4f2722;
}

.btn button {
  height: 40px;
  margin: 0.8rem 0;
  cursor: pointer;
  font-family: sans-serif;
  color: #ffffff;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 4px;
}*/
</style>
