<template>
  <div id="app">
    <header>
      <h1>Facebook-clone</h1>
    </header>

    <main class="feed">
      <!-- skapa inlägg -->
      <section class="new-post">
        <h2>Skapa ett inlägg</h2>
        <textarea
          v-model="newPost"
          placeholder="Vad gör du just nu?"
        ></textarea>
        <button @click="publishPost">Publicera</button>
      </section>

      <!-- alla inlägg -->
      <section
        v-for="post in posts"
        :key="post.id"
        class="post"
      >
        <div class="post-header">
          <strong class="post-user">{{ post.user }}</strong>
          <small class="post-date">{{ formatDate(post.date) }}</small>
        </div>
        <p class="post-content">{{ post.content }}</p>
      </section>
    </main>
  </div>
</template>


<script setup>
import { ref } from 'vue';

// hur får vi andra användare??
const newPost = ref('');
const posts = ref([
  { id: 1, user: 'Sara Johansson', content: 'frukost', date: new Date() },
  { id: 2, user: 'Johan Andersson', content: 'hej hej', date: new Date() }
]);

function publishPost() {
  if (newPost.value.trim() === '') return;

  const post = {
    id: posts.value.length + 1,
    user: 'Du?',
    content: newPost.value,
    date: new Date()
  };

  // Nyaste inlägg överst
  posts.value.unshift(post); 
  newPost.value = '';
}

function formatDate(date) {
  return new Date(date).toLocaleString('sv-SE');
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
}

header {
  background-color: #1877f2;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 20px;
}

.feed {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.new-post textarea {
  background-color: #fff;
  color: #888;
  width: 100%;
  height: 60px;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
}

.new-post button {
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.post-user {
  color: #1877f2;
}

.post-date {
  color: #888;
  font-size: 12px;
}

.post-content {
  color: black;
  margin: 0;
  font-size: 15px;
}
</style>